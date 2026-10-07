import type { StudioCodeGrammarProfile, StudioCodePreviewHighlighter } from "../types";
import { createJavaScriptCodeMirrorLanguageSupport } from "../languages/javascriptCodeMirror";
import { collectStudioCodeSyntaxSpans } from "./syntaxHighlightSpans";
import { MAX_PREVIEW_SOURCE_LENGTH } from "./syntaxTokens";

export function createJavaScriptPreviewHighlighter(grammarProfile?: StudioCodeGrammarProfile): StudioCodePreviewHighlighter {
  const parser = createJavaScriptCodeMirrorLanguageSupport(grammarProfile).language.parser;

  return (source, signal) => {
    if (signal.aborted || source.length > MAX_PREVIEW_SOURCE_LENGTH) return [];
    return collectStudioCodeSyntaxSpans(parser.parse(source), signal);
  };
}
