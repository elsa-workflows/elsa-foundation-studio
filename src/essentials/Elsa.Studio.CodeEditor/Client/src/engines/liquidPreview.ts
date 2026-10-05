import type { StudioCodePreviewHighlighter } from "../types";
import { parseLiquidSource } from "../languages/liquidCodeMirror";
import { collectStudioCodeSyntaxSpans } from "./syntaxHighlightSpans";
import { MAX_PREVIEW_SOURCE_LENGTH } from "./syntaxTokens";

export function createLiquidPreviewHighlighter(): StudioCodePreviewHighlighter {
  return (source, signal) => {
    if (signal.aborted || source.length > MAX_PREVIEW_SOURCE_LENGTH) return [];
    return collectStudioCodeSyntaxSpans(parseLiquidSource(source), signal);
  };
}
