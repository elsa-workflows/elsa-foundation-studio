import type { StudioCodeSyntaxKind, StudioCodeSyntaxSpan } from "../types";

export const studioCodeSyntaxKinds: readonly StudioCodeSyntaxKind[] = [
  "keyword",
  "operator",
  "literal",
  "number",
  "string",
  "comment",
  "variable",
  "property",
  "type",
  "tag",
  "function"
];

export const MAX_PREVIEW_SOURCE_LENGTH = 20_000;
export const MAX_PREVIEW_SYNTAX_SPANS = 2_000;

const validKinds = new Set<string>(studioCodeSyntaxKinds);

export function studioCodeSyntaxClass(kind: StudioCodeSyntaxKind) {
  return `studio-code-token-${kind}`;
}

export function studioCodeSyntaxKindFromClasses(classes: string): StudioCodeSyntaxKind | undefined {
  let result: StudioCodeSyntaxKind | undefined;
  for (const className of classes.split(/\s+/)) {
    if (!className.startsWith("studio-code-token-")) continue;
    const candidate = className.slice("studio-code-token-".length);
    if (validKinds.has(candidate)) result = candidate as StudioCodeSyntaxKind;
  }
  return result;
}

export function validatePreviewSyntaxSpans(spans: readonly StudioCodeSyntaxSpan[], sourceLength: number) {
  if (!Array.isArray(spans) || spans.length > MAX_PREVIEW_SYNTAX_SPANS) return [];
  let previousEnd = 0;
  const validated: StudioCodeSyntaxSpan[] = [];
  for (const span of spans) {
    if (!span || !Number.isInteger(span.from) || !Number.isInteger(span.to) || span.from < previousEnd ||
        span.to <= span.from || span.to > sourceLength || !validKinds.has(span.kind)) return [];
    validated.push({ from: span.from, to: span.to, kind: span.kind });
    previousEnd = span.to;
  }
  return validated;
}
