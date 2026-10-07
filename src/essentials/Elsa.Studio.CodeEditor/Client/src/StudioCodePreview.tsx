import { useRef } from "react";
import type { ReactNode } from "react";
import { studioCodeSyntaxClass } from "./engines/syntaxTokens";
import { formatPreviewText } from "./previewText";
import type { StudioCodeDocument, StudioCodeLanguageAdapter, StudioCodeSyntaxSpan } from "./types";
import { useStudioCodePreviewSyntax } from "./useStudioCodePreviewSyntax";

export interface StudioCodePreviewProps {
  document: StudioCodeDocument;
  sessionKey: string;
  languageAdapter?: StudioCodeLanguageAdapter;
}

/** Deferred static presentation only. The eager shell owns the button, focus and authorization. */
export default function StudioCodePreview({ document, sessionKey, languageAdapter }: StudioCodePreviewProps) {
  const previewRef = useRef<HTMLSpanElement | null>(null);
  const spans = useStudioCodePreviewSyntax(previewRef, {
    enabled: true,
    authorized: true,
    source: document.value,
    language: document.language,
    uri: document.uri,
    version: document.version,
    session: sessionKey,
    grammarProfile: languageAdapter?.grammarProfile,
    loadHighlighter: languageAdapter?.loadPreviewHighlighter
  });
  return <span ref={previewRef}>{renderPreviewValue(document.value, spans)}</span>;
}

function renderPreviewValue(value: string, spans: readonly StudioCodeSyntaxSpan[]) {
  if (!value || spans.length === 0) return formatPreviewText(value) || "Expression";
  const content: ReactNode[] = [];
  let position = 0;
  for (const span of spans) {
    if (span.from > position) content.push(formatPreviewText(value.slice(position, span.from)));
    content.push(
      <span className={studioCodeSyntaxClass(span.kind)} key={`${span.from}-${span.to}`}>
        {formatPreviewText(value.slice(span.from, span.to))}
      </span>
    );
    position = span.to;
  }
  if (position < value.length) content.push(formatPreviewText(value.slice(position)));
  return content;
}
