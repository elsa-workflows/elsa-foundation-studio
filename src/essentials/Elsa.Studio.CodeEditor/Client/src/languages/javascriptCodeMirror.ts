import { javascript, javascriptLanguage, localCompletionSource } from "@codemirror/lang-javascript";
import { snippetCompletion, type CompletionSource } from "@codemirror/autocomplete";
import { LanguageSupport, syntaxTree } from "@codemirror/language";
import type { Extension } from "@codemirror/state";
import type { StudioCodeGrammarProfile } from "../types";

export function createJavaScriptCodeMirrorExtensions(grammarProfile?: StudioCodeGrammarProfile): Extension[] {
  return [createJavaScriptCodeMirrorLanguageSupport(grammarProfile)];
}

/** Shared parser construction for rich editing and parser-only previews. */
export function createJavaScriptCodeMirrorLanguageSupport(grammarProfile?: StudioCodeGrammarProfile): LanguageSupport {
  if (grammarProfile === "expression") {
    // Avoid javascript() here: it adds statement-oriented completion snippets as well as
    // the broad Script grammar. Expression tooling remains an opt-in adapter profile.
    const language = javascriptLanguage.configure({ top: "SingleExpression" });
    return new LanguageSupport(language, [language.data.of({ studioExpressionCompletion: expressionLocalCompletion })]);
  }

  return javascript({ jsx: true, typescript: true });
}

type SyntaxNode = ReturnType<typeof syntaxTree>["topNode"];
const lexicalScopes = new Set(["SingleExpression", "Block", "FunctionExpression", "FunctionDeclaration", "ArrowFunction", "MethodDeclaration", "ForStatement"]);
const nonCodeNodes = new Set(["String", "TemplateString", "RegExp", "LineComment", "BlockComment"]);
const identifier = "[\\p{L}_$][\\p{L}\\p{Nd}_$]*";
const memberPrefix = new RegExp(`(${identifier}(?:\\s*\\.\\s*${identifier})*)\\s*\\.\\s*(${identifier})?$`, "u");
const expressionSnippets = [
  snippetCompletion("(${value}) => ${value}", { label: "arrow function", type: "function", detail: "JavaScript expression" }),
  snippetCompletion("function (${value}) { return ${value}; }", { label: "function expression", type: "function", detail: "JavaScript expression" })
];

/** Advisory syntax-only help: no ambient library, execution, aliases or inferred dynamic shapes. */
const expressionLocalCompletion: CompletionSource = async context => {
  if (context.state.doc.length > 100_000) return null;
  const tree = syntaxTree(context.state);
  if (tree.topNode.name !== "SingleExpression") return null;
  const node = tree.resolveInner(context.pos, -1);
  for (let ancestor: SyntaxNode | null = node; ancestor; ancestor = ancestor.parent) {
    if (nonCodeNodes.has(ancestor.name)) return null;
  }

  const prefix = context.state.sliceDoc(0, context.pos);
  const match = memberPrefix.exec(prefix);
  if (!match) {
    const locals = await localCompletionSource(context);
    return locals && context.explicit ? { ...locals, options: [...locals.options, ...expressionSnippets] } : locals;
  }
  // A suffix of a call/computed/member expression is not an independently declared local.
  if (/[.\])\p{L}\p{Nd}_$]/u.test(prefix[match.index - 1] ?? "")) return null;
  const path = match[1].split(/\s*\.\s*/);
  if (path.length > 4) return null;
  const text = (item: SyntaxNode) => context.state.sliceDoc(item.from, item.to);
  let budget = 2_000;
  let initializer: SyntaxNode | null = null;
  for (let scope: SyntaxNode | null = node; scope; scope = scope.parent) {
    if (!lexicalScopes.has(scope.name)) continue;
    let definition: SyntaxNode | null = null;
    const scan = (current: SyntaxNode) => {
      if (--budget < 0) return;
      if (current !== scope && lexicalScopes.has(current.name)) return;
      if (current.name === "VariableDefinition" && text(current) === path[0]) definition = current;
      for (let child = current.firstChild; child && budget >= 0; child = child.nextSibling) scan(child);
    };
    scan(scope);
    if (budget < 0) return null;
    if (!definition) continue;
    const declaration: SyntaxNode = definition;
    const parent = declaration.parent;
    // A parameter/destructuring/dynamic initializer shadows any outer shape.
    if (parent?.name !== "VariableDeclaration" || parent.firstChild?.name !== "const" || parent.from >= context.pos) return null;
    const value = declaration.nextSibling?.nextSibling;
    if (declaration.nextSibling?.name !== "Equals" || value?.name !== "ObjectExpression") return null;
    initializer = value;
    break;
  }
  if (!initializer) return null;

  const properties = (object: SyntaxNode) => {
    const result: { name: string; value: SyntaxNode | null }[] = [];
    for (let child = object.firstChild; child; child = child.nextSibling) {
      if (--budget < 0 || result.length >= 100) return null;
      if (child.name === "Spread") return null;
      if (child.name !== "Property") continue;
      const key = child.firstChild;
      if (key?.name !== "PropertyDefinition") return null;
      result.push({ name: text(key), value: key.nextSibling?.nextSibling ?? null });
    }
    return result;
  };
  let object: SyntaxNode = initializer;
  for (const segment of path.slice(1)) {
    const value: SyntaxNode | null | undefined = properties(object)?.find(property => property.name === segment)?.value;
    if (value?.name !== "ObjectExpression") return null;
    object = value;
  }
  const members = properties(object);
  if (!members?.length) return null;
  return {
    from: context.pos - (match[2]?.length ?? 0),
    options: members.map(member => ({ label: member.name, type: "property" })),
    validFor: /^[\p{L}\p{Nd}_$]*$/u
  };
};
