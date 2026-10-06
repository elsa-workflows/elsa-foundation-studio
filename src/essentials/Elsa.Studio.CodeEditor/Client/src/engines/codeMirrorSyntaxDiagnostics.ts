import { ensureSyntaxTree, syntaxTree } from "@codemirror/language";
import type { EditorState } from "@codemirror/state";
import type { StudioCodeDiagnostic, StudioCodeGrammarProfile } from "../types";

const expressionTypeScriptMessage = "TypeScript syntax is not supported in JavaScript expressions.";
const typeSyntaxNodeNames = new Set([
  "TypeAnnotation",
  "TypeParamList",
  "TypeArgList",
  "TypePredicate",
  "TypeDefinition",
  "Optional",
  "Privacy"
]);

export function collectCodeMirrorSyntaxDiagnostics(
  state: EditorState,
  grammarProfile?: StudioCodeGrammarProfile
): StudioCodeDiagnostic[] {
  const diagnostics: StudioCodeDiagnostic[] = [];
  const tree = ensureSyntaxTree(state, state.doc.length) ?? syntaxTree(state);

  tree.iterate({
    enter(node) {
      if (node.type.isError) {
        diagnostics.push(toDiagnostic(state, node.from, node.to, "Syntax error."));
        return;
      }

      if (grammarProfile !== "expression") return;
      const operator = unsupportedTypeScriptOperator(state, node.name, node.node);
      if (operator) {
        diagnostics.push(toDiagnostic(state, operator.from, operator.to, expressionTypeScriptMessage, "STUDIO-EXPRESSION-SYNTAX"));
        return;
      }

      if (!isUnsupportedTypeScriptNode(node)) return;
      diagnostics.push(toDiagnostic(state, node.from, node.to, expressionTypeScriptMessage, "STUDIO-EXPRESSION-SYNTAX"));
    }
  });

  const parserDiagnostics = diagnostics.filter(diagnostic => diagnostic.code !== "STUDIO-EXPRESSION-SYNTAX");
  const typeDiagnostics = diagnostics
    .filter(diagnostic => diagnostic.code === "STUDIO-EXPRESSION-SYNTAX")
    .map(diagnostic => ({ diagnostic, range: rangeOf(state, diagnostic) }))
    .sort((left, right) => left.range.from - right.range.from || right.range.to - left.range.to);
  const conciseTypeDiagnostics: StudioCodeDiagnostic[] = [];
  let containingRange: { from: number; to: number } | undefined;
  for (const candidate of typeDiagnostics) {
    if (containingRange && candidate.range.from >= containingRange.from && candidate.range.to <= containingRange.to) continue;
    conciseTypeDiagnostics.push(candidate.diagnostic);
    containingRange = candidate.range;
  }
  return [...parserDiagnostics, ...conciseTypeDiagnostics];
}

function isUnsupportedTypeScriptNode(node: { name: string; type: { is(name: string): boolean } }) {
  return node.type.is("Type") || typeSyntaxNodeNames.has(node.name);
}

function unsupportedTypeScriptOperator(state: EditorState, name: string, node: SyntaxNodeLike) {
  if (name === "BinaryExpression") {
    for (let child = node.firstChild; child; child = child.nextSibling) {
      if (child.name === "as" || child.name === "satisfies") return child;
    }
  }

  if (name === "PostfixExpression") {
    for (let child = node.firstChild; child; child = child.nextSibling) {
      if (child.name === "LogicOp" && state.sliceDoc(child.from, child.to) === "!") return child;
    }
  }

  return undefined;
}

interface SyntaxNodeLike {
  name: string;
  from: number;
  to: number;
  firstChild: SyntaxNodeLike | null;
  nextSibling: SyntaxNodeLike | null;
}

function toDiagnostic(
  state: EditorState,
  from: number,
  to: number,
  message: string,
  code = "STUDIO-SYNTAX"
): StudioCodeDiagnostic {
  const startLine = state.doc.lineAt(from);
  const endLine = state.doc.lineAt(to);
  return {
    severity: "error",
    code,
    message,
    startLineNumber: startLine.number,
    startColumn: from - startLine.from + 1,
    endLineNumber: endLine.number,
    endColumn: Math.max(to - endLine.from + 1, endLine.number === startLine.number ? from - startLine.from + 2 : 1)
  };
}

function rangeOf(state: EditorState, diagnostic: StudioCodeDiagnostic) {
  const from = offsetAt(state, diagnostic.startLineNumber, diagnostic.startColumn);
  const to = offsetAt(state, diagnostic.endLineNumber, diagnostic.endColumn);
  return { from, to };
}

function offsetAt(state: EditorState, lineNumber = 1, column = 1) {
  const line = state.doc.line(Math.min(Math.max(1, lineNumber), state.doc.lines));
  return Math.min(line.from + Math.max(0, column - 1), line.to);
}
