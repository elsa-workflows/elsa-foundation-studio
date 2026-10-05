import { useLayoutEffect, useState } from "react";
import type { RefObject } from "react";
import type {
  StudioCodeGrammarProfile,
  StudioCodePreviewHighlighter,
  StudioCodeSyntaxSpan
} from "./types";
import { MAX_PREVIEW_SOURCE_LENGTH, validatePreviewSyntaxSpans } from "./engines/syntaxTokens";

interface StudioCodePreviewSyntaxOptions {
  enabled: boolean;
  authorized: boolean;
  source: string;
  language: string;
  uri: string;
  version?: string | number;
  session: string;
  grammarProfile?: StudioCodeGrammarProfile;
  loadHighlighter?: (grammarProfile?: StudioCodeGrammarProfile) => Promise<StudioCodePreviewHighlighter>;
}

export function useStudioCodePreviewSyntax(
  previewRef: RefObject<HTMLButtonElement | null>,
  options: StudioCodePreviewSyntaxOptions
) {
  const [spans, setSpans] = useState<readonly StudioCodeSyntaxSpan[]>([]);
  const {
    enabled,
    authorized,
    source,
    language,
    uri,
    version,
    session,
    grammarProfile,
    loadHighlighter
  } = options;

  useLayoutEffect(() => {
    setSpans([]);
    const preview = previewRef.current;
    if (!enabled || !authorized || !preview || !loadHighlighter || source.length > MAX_PREVIEW_SOURCE_LENGTH) return;

    let cancelled = false;
    let started = false;
    let controller: AbortController | undefined;
    const startHighlighting = () => {
      if (cancelled || started) return;
      started = true;
      controller = new AbortController();
      const signal = controller.signal;
      void (async () => {
        try {
          const highlighter = await loadHighlighter(grammarProfile);
          if (cancelled || signal.aborted) return;
          const nextSpans = await highlighter(source, signal);
          if (cancelled || signal.aborted) return;
          setSpans(validatePreviewSyntaxSpans(nextSpans, source.length));
        } catch {
          // Static syntax is optional. Keep the escaped plaintext preview on parser failure.
        }
      })();
    };

    if (typeof IntersectionObserver === "undefined") {
      startHighlighting();
    } else {
      const observer = new IntersectionObserver(entries => {
        const isVisible = entries.some(entry => entry.target === preview && entry.isIntersecting);
        if (isVisible) {
          startHighlighting();
        } else if (controller) {
          controller.abort();
          controller = undefined;
          started = false;
          setSpans([]);
        }
      });
      observer.observe(preview);
      return () => {
        cancelled = true;
        observer.disconnect();
        controller?.abort();
      };
    }

    return () => {
      cancelled = true;
      controller?.abort();
    };
  }, [authorized, enabled, grammarProfile, language, loadHighlighter, previewRef, session, source, uri, version]);

  return spans;
}
