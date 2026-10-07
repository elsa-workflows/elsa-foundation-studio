import { highlightTree } from "@lezer/highlight";
import type { StudioCodeSyntaxSpan } from "../types";
import { studioCodeSyntaxKindFromClasses, MAX_PREVIEW_SYNTAX_SPANS } from "./syntaxTokens";
import { studioCodeHighlightStyle } from "./syntaxHighlightStyle";

export function collectStudioCodeSyntaxSpans(tree: Parameters<typeof highlightTree>[0], signal: AbortSignal) {
  if (signal.aborted) return [];
  const spans: StudioCodeSyntaxSpan[] = [];
  let exceededLimit = false;
  highlightTree(tree, studioCodeHighlightStyle, (from, to, classes) => {
    if (exceededLimit) return;
    const kind = studioCodeSyntaxKindFromClasses(classes);
    if (!kind || from === to) return;
    if (spans.length === MAX_PREVIEW_SYNTAX_SPANS) {
      exceededLimit = true;
      return;
    }
    spans.push({ from, to, kind });
  });
  return exceededLimit ? [] : spans;
}
