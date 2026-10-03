import type {
  StudioCodeToolingAuthoringContext,
  StudioCodeToolingLanguageProjection,
  StudioCodeToolingSymbol
} from "@elsa-workflows/studio-code-editor";

const identifierPattern = String.raw`[\p{L}_$][\p{L}\p{Nd}_$]*`;
const memberPathPattern = new RegExp(
  `(${identifierPattern}(?:\\(\\))?(?:\\.(?:${identifierPattern})?)+)$`,
  "u"
);

/** JavaScript owns the spelling of workflow facts; the shared editor only traverses projected symbols. */
export const javaScriptToolingProjection: StudioCodeToolingLanguageProjection = {
  projectContext: context => {
    const contextual = contextualSymbols(context);
    const contextualKeys = symbolKeys(contextual);
    const engineRoots = (context?.rootSymbols ?? []).filter(symbol => !contextualKeys.has(symbol.id) && !contextualKeys.has(symbol.name));
    const values = mergeSymbols(context?.workflowInputs ?? [], context?.visibleActivityOutputs ?? []);
    const variables = [...(context?.visibleVariables ?? [])];
    const getterSymbols = variables.filter(symbol => isIdentifier(symbol.name)).map(symbol => ({
      id: `javascript:getter:${symbol.id ?? symbol.name}`,
      name: getterName(symbol.name),
      kind: "function",
      documentation: symbol.documentation,
      shapeId: symbol.shapeId,
      signatures: [{ label: `${getterName(symbol.name)}()` }]
    }));
    return mergeSymbols(
      context?.target ? [context.target] : [],
      engineRoots,
      values.length > 0 ? [{
        id: "javascript:args",
        name: "args",
        kind: "variable",
        documentation: "Workflow inputs and visible activity outputs.",
        children: values
      }] : [],
      variables.length > 0 ? [{
        id: "javascript:variables",
        name: "variables",
        kind: "variable",
        documentation: "Visible workflow variables.",
        children: variables
      }, {
        id: "javascript:getVariable",
        name: "getVariable",
        kind: "function",
        documentation: "Gets a visible workflow variable by name.",
        signatures: [{ label: "getVariable(name)" }]
      }, ...getterSymbols] : []
    );
  },
  projectCatalog: (symbols, context) => {
    const contextualKeys = symbolKeys(contextualSymbols(context));
    return symbols.filter(symbol => !contextualKeys.has(symbol.id) && !contextualKeys.has(symbol.name));
  },
  callableNameAt,
  memberPathAt: (source, position, includeCurrentWord) => {
    const prefix = source.slice(0, Math.min(Math.max(0, position), source.length));
    const match = prefix.match(memberPathPattern);
    if (!match) return undefined;
    const segments = match[1]!.split(".").map(segment => segment.endsWith("()") ? segment.slice(0, -2) : segment);
    if (segments.some(segment => segment !== "" && !isIdentifier(segment))) return undefined;
    if (!includeCurrentWord && segments.at(-1) !== "") return undefined;
    return segments;
  }
};

/** Bounded lexical call-path help, not type checking or execution. Unknown syntax stays unknown. */
function callableNameAt(source: string, position: number) {
  const end = Math.min(Math.max(0, position), source.length);
  if (end > 100_000) return undefined;
  const calls: (string | undefined)[] = [];
  const callable = new RegExp(`(${identifierPattern}(?:\\s*\\.\\s*${identifierPattern})*)\\s*$`, "u");
  for (let index = 0; index < end; index++) {
    const character = source[index];
    if (character === "`") return undefined; // Template interpolation needs a parser-owned proof.
    if (character === "'" || character === '"') {
      const quote = character;
      let closed = false;
      while (++index < end) {
        if (source[index] === "\\") index++;
        else if (source[index] === quote) { closed = true; break; }
      }
      if (!closed) return undefined;
    } else if (character === "/") {
      if (source[index + 1] === "/") {
        const newline = source.indexOf("\n", index + 2);
        if (newline < 0 || newline >= end) return undefined;
        index = newline;
      } else if (source[index + 1] === "*") {
        const close = source.indexOf("*/", index + 2);
        if (close < 0 || close + 2 > end) return undefined;
        index = close + 1;
      } else return undefined; // Division/regex ambiguity is not a callable-path proof.
    } else if (character === "(") {
      if (calls.length >= 100) return undefined;
      const prefix = source.slice(0, index);
      const match = callable.exec(prefix);
      const preceding = match ? prefix[match.index - 1] ?? "" : "";
      calls.push(match && !/[.\])\p{L}\p{Nd}_$]/u.test(preceding) ? match[1].replace(/\s/g, "") : undefined);
    } else if (character === ")") calls.pop();
  }
  return calls.at(-1);
}

function contextualSymbols(context?: StudioCodeToolingAuthoringContext) {
  return mergeSymbols(
    context?.workflowInputs ?? [],
    context?.visibleVariables ?? [],
    context?.visibleActivityOutputs ?? []
  );
}

function symbolKeys(symbols: readonly StudioCodeToolingSymbol[]) {
  return new Set(symbols.flatMap(symbol => [symbol.id, symbol.name].filter(Boolean)));
}

function getterName(name: string) {
  const first = name.charAt(0);
  const upper = first.toUpperCase();
  return `get${upper.length === 1 ? upper : first}${name.slice(1)}`;
}

function isIdentifier(value: string) {
  return !/[\uD800-\uDFFF]/.test(value) &&
    /^[\p{L}_$][\p{L}\p{Nd}_$]*$/u.test(value);
}

function mergeSymbols(...groups: readonly (readonly StudioCodeToolingSymbol[])[]) {
  const symbols = new Map<string, StudioCodeToolingSymbol>();
  for (const symbol of groups.flat()) symbols.set(symbol.id ?? symbol.name, symbol);
  return [...symbols.values()];
}
