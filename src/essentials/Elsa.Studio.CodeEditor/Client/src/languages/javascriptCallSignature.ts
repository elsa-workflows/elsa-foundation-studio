/** Plain parser-position data. Lezer syntax nodes never leave this module. */
export interface StudioCodeJavaScriptCallSignatureContext {
  callableName: string;
  argumentOrdinal?: number;
}

export type StudioCodeJavaScriptCallSignatureClassifier = (
  source: string,
  position: number
) => Promise<StudioCodeJavaScriptCallSignatureContext | null>;

const maximumSourceLength = 100_000;
const maximumPathSegments = 8;

interface SyntaxNode {
  name: string;
  from: number;
  to: number;
  parent: SyntaxNode | null;
  firstChild: SyntaxNode | null;
  nextSibling: SyntaxNode | null;
  getChild(name: string): SyntaxNode | null;
  enterUnfinishedNodesBefore(position: number): SyntaxNode;
}

interface SyntaxTree {
  resolveInner(position: number, side: number): SyntaxNode;
}

type Parser = (source: string) => SyntaxTree;

/** Uses the same single-expression grammar as the editor's JavaScript expression profile. */
export function createJavaScriptCallSignatureClassifier(): StudioCodeJavaScriptCallSignatureClassifier {
  let parser: Parser | undefined;
  let parserPromise: Promise<Parser> | undefined;
  let cachedSource: string | undefined;
  let cachedTree: SyntaxTree | undefined;

  return async (source, position) => {
    if (source.length > maximumSourceLength) return null;
    const cursor = Math.max(0, Math.min(position, source.length));
    parserPromise ??= import("@codemirror/lang-javascript").then(({ javascriptLanguage }) => {
      const expressionLanguage = javascriptLanguage.configure({ top: "SingleExpression" });
      return (input: string) => expressionLanguage.parser.parse(input) as SyntaxTree;
    });
    parser ??= await parserPromise;

    if (cachedSource !== source || !cachedTree) {
      cachedSource = source;
      cachedTree = parser(source);
    }

    const active = cachedTree.resolveInner(cursor, -1).enterUnfinishedNodesBefore(cursor);
    if (insideMalformedString(active)) return null;
    const argumentList = enclosingNode(active, "ArgList");
    if (!argumentList || !insideArgumentList(argumentList, cursor)) return null;
    const call = argumentList.parent;
    if (!call || call.name !== "CallExpression") return null;
    const directArguments = firstChildNamed(call, "ArgList");
    if (!directArguments || directArguments.from !== argumentList.from || directArguments.to !== argumentList.to) return null;
    const callee = firstChildNamed(call, "VariableName", "MemberExpression");
    if (!callee) return null;
    const callableName = expressionPath(callee, source);
    if (!callableName) return null;

    let argumentOrdinal = 0;
    for (let child = argumentList.firstChild; child; child = child.nextSibling) {
      if (child.name === ")") break;
      if (child.name === "," && child.to <= cursor) argumentOrdinal++;
    }

    return { callableName, argumentOrdinal };
  };
}

function insideMalformedString(node: SyntaxNode) {
  for (let current: SyntaxNode | null = node; current; current = current.parent) {
    if (current.name !== "String") continue;
    for (let child = current.firstChild; child; child = child.nextSibling) {
      if (child.name === "⚠") return true;
    }
  }
  return false;
}

function enclosingNode(node: SyntaxNode, name: string) {
  for (let current: SyntaxNode | null = node; current; current = current.parent) {
    if (current.name === name) return current;
  }
  return undefined;
}

function insideArgumentList(argumentList: SyntaxNode, position: number) {
  const open = argumentList.getChild("(");
  const close = argumentList.getChild(")");
  if (!open || position < open.to) return false;
  // The insertion point immediately before ')' belongs to the final argument; the point
  // after ')' does not. Unfinished lists have no close token and remain classifiable.
  return !close || position <= close.from;
}

function firstChildNamed(node: SyntaxNode, ...names: string[]) {
  for (let child = node.firstChild; child; child = child.nextSibling) {
    if (names.includes(child.name)) return child;
  }
  return undefined;
}

function expressionPath(node: SyntaxNode, source: string) {
  const segments: string[] = [];
  let current: SyntaxNode | undefined = node;
  while (current) {
    if (segments.length >= maximumPathSegments) return undefined;
    if (current.name === "VariableName") {
      const name = source.slice(current.from, current.to);
      if (!isIdentifier(name)) return undefined;
      segments.push(name);
      break;
    }
    if (current.name !== "MemberExpression" || current.getChild(".") === null) return undefined;
    const property = current.getChild("PropertyName");
    const base = firstChildNamed(current, "VariableName", "MemberExpression");
    if (!property || !base) return undefined;
    const name = source.slice(property.from, property.to);
    if (!isIdentifier(name)) return undefined;
    segments.push(name);
    current = base;
  }
  if (current?.name !== "VariableName" || segments.length === 0) return undefined;
  return segments.reverse().join(".");
}

function isIdentifier(value: string) {
  return /^[\p{L}_$][\p{L}\p{Nd}_$]*$/u.test(value);
}
