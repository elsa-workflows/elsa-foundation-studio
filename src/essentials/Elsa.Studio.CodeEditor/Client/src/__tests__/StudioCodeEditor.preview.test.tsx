import { flushSync } from "react-dom";
import { describe, expect, it, vi } from "vitest";
import { javaScriptLanguageAdapter } from "../languages/javascript";
import { liquidLanguageAdapter } from "../languages/liquid";
import type { StudioCodeLanguageAdapter } from "../types";
import {
  codeDocument,
  renderEditor,
  settleReactUpdates,
  setupStudioCodeEditorTestLifecycle,
  waitFor
} from "./StudioCodeEditor.testSupport";

type PreviewTestKind = "keyword" | "tag" | "string" | "number" | "variable";
type PreviewTestSpan = { from: number; to: number; kind: PreviewTestKind };
type PreviewTestHighlighter = (source: string, signal: AbortSignal) => readonly PreviewTestSpan[] | Promise<readonly PreviewTestSpan[]>;

setupStudioCodeEditorTestLifecycle();

describe("StudioCodeEditor compact preview syntax", () => {
  it("keeps a plain fallback visible while lazily loading compact syntax without mounting an editor", async () => {
    let resolvePreviewHighlighter!: (highlighter: PreviewTestHighlighter) => void;
    const loadPreviewHighlighter = vi.fn(() => new Promise<PreviewTestHighlighter>(resolve => {
      resolvePreviewHighlighter = resolve;
    }));
    const loadEditor = vi.fn(javaScriptLanguageAdapter.loadEditor!);
    const languageAdapter = { ...javaScriptLanguageAdapter, loadEditor, loadPreviewHighlighter };
    const document = codeDocument({ value: "total + 1" });
    const { container, unmount } = renderEditor({ document, languageAdapter, profile: "compact" });
    const preview = container.querySelector<HTMLButtonElement>(".studio-code-editor-preview")!;

    expect(preview.textContent).toBe("total + 1");
    expect(container.querySelector(".cm-editor")).toBeNull();
    expect(loadEditor).not.toHaveBeenCalled();
    await waitFor(() => loadPreviewHighlighter.mock.calls.length === 1);

    resolvePreviewHighlighter(source => source === document.value
      ? [{ from: 0, to: 5, kind: "string" }]
      : []);
    await waitFor(() => !!preview.querySelector(".studio-code-token-string"));

    expect(preview.querySelector(".studio-code-token-string")?.textContent).toBe("total");
    expect(container.querySelector(".cm-editor")).toBeNull();
    expect(loadEditor).not.toHaveBeenCalled();
    unmount();
  });

  it("renders highlighted preview source as escaped text and keeps the newline marker", async () => {
    const document = codeDocument({ value: "<img src=x onerror=alert(1)>\nnext" });
    const { adapter: languageAdapter } = previewAdapter(() => [{ from: 0, to: 4, kind: "tag" }]);
    const { container, unmount } = renderEditor({ document, languageAdapter, profile: "compact" });

    await waitFor(() => !!container.querySelector(".studio-code-token-tag"));

    const preview = container.querySelector<HTMLButtonElement>(".studio-code-editor-preview")!;
    expect(preview.querySelector("img")).toBeNull();
    expect(preview.textContent).toBe("<img src=x onerror=alert(1)> ↵ next↗");
    expect(preview.querySelector(".studio-code-token-tag")?.textContent).toBe("<img");
    unmount();
  });

  it("uses the real JavaScript parser and shared syntax classes without creating a rich editor", async () => {
    const source = "const total = 1;";
    const { container, unmount } = renderEditor({
      document: codeDocument({ value: source }),
      languageAdapter: javaScriptLanguageAdapter,
      profile: "compact"
    });

    await waitFor(() => !!container.querySelector(".studio-code-token-keyword"));

    expect(container.querySelector(".studio-code-token-keyword")?.textContent).toBe("const");
    expect(container.querySelector(".studio-code-token-number")?.textContent).toBe("1");
    expect(container.querySelector(".cm-editor")).toBeNull();
    unmount();
  });

  it("uses the existing Liquid parser for static previews without mounting an editor", async () => {
    const source = "{{ total }}";
    const { container, unmount } = renderEditor({
      document: codeDocument({ language: "liquid", value: source }),
      languageAdapter: liquidLanguageAdapter,
      profile: "compact"
    });

    await waitFor(() => container.querySelectorAll('[class^="studio-code-token-"]').length > 0);

    const highlightedText = [...container.querySelectorAll<HTMLElement>('[class^="studio-code-token-"]')]
      .map(element => element.textContent)
      .join("");
    expect(highlightedText).toContain("total");
    expect(container.querySelector(".cm-editor")).toBeNull();
    unmount();
  });

  it("keeps unsupported and failed static preview highlighting as plaintext", async () => {
    const unsupported = renderEditor({
      document: codeDocument({ value: "plain source" }),
      languageAdapter: { language: "unknown", displayName: "Unknown" },
      profile: "compact"
    });
    expect(unsupported.container.querySelector(".studio-code-editor-preview")?.textContent).toBe("plain source");
    expect(unsupported.container.querySelector(".studio-code-token-keyword")).toBeNull();
    unsupported.unmount();

    const loadPreviewHighlighter = vi.fn(async () => {
      throw new Error("parser chunk unavailable");
    });
    const failed = renderEditor({
      document: codeDocument({ value: "plain source" }),
      languageAdapter: { ...javaScriptLanguageAdapter, loadPreviewHighlighter },
      profile: "compact"
    });
    await waitFor(() => loadPreviewHighlighter.mock.calls.length === 1);
    await settleReactUpdates();

    expect(failed.container.querySelector(".studio-code-editor-preview")?.textContent).toBe("plain source");
    expect(failed.container.querySelector(".studio-code-token-keyword")).toBeNull();
    expect(failed.container.querySelector(".cm-editor")).toBeNull();
    failed.unmount();
  });

  it("rejects malformed or excessive preview spans as a whole", async () => {
    const cases: readonly { source: string; spans: readonly PreviewTestSpan[] }[] = [
      { source: "12345", spans: [{ from: 0, to: 6, kind: "number" }] },
      {
        source: "x".repeat(2_001),
        spans: Array.from({ length: 2_001 }, (_, from) => ({ from, to: from + 1, kind: "variable" as const }))
      }
    ];

    for (const testCase of cases) {
      const { adapter: languageAdapter } = previewAdapter(() => testCase.spans);
      const editor = renderEditor({ document: codeDocument({ value: testCase.source }), languageAdapter, profile: "compact" });
      await waitFor(() => languageAdapter.loadPreviewHighlighter?.mock.calls.length === 1);
      await settleReactUpdates();

      expect(editor.container.querySelector(".studio-code-token-number")).toBeNull();
      expect(editor.container.querySelector(".studio-code-token-variable")).toBeNull();
      expect(editor.container.querySelector(".studio-code-editor-preview")?.textContent).toContain(testCase.source.slice(0, 32));
      editor.unmount();
    }
  });

  it("drops preview spans resolved for an older source", async () => {
    let resolveOld!: (spans: readonly PreviewTestSpan[]) => void;
    let oldSignal: AbortSignal | undefined;
    const { adapter: languageAdapter } = previewAdapter((source, signal) => {
      if (source !== "old source") return [{ from: 0, to: 3, kind: "string" }];
      oldSignal = signal;
      return new Promise<readonly PreviewTestSpan[]>(resolve => { resolveOld = resolve; });
    });
    const editor = renderEditor({ document: codeDocument({ value: "old source" }), languageAdapter, profile: "compact" });
    await waitFor(() => !!resolveOld);

    editor.rerender({ document: codeDocument({ value: "new source" }), languageAdapter, profile: "compact" });
    await waitFor(() => !!editor.container.querySelector(".studio-code-token-string"));
    resolveOld([{ from: 0, to: 3, kind: "tag" }]);
    await settleReactUpdates();

    expect(oldSignal?.aborted).toBe(true);
    expect(editor.container.querySelector(".studio-code-token-tag")).toBeNull();
    expect(editor.container.querySelector(".studio-code-token-string")?.textContent).toBe("new");
    editor.unmount();
  });

  it.each(["URI", "version", "session key"] as const)("aborts pending spans when the same-source %s identity changes", async identity => {
    let resolveOld!: (spans: readonly PreviewTestSpan[]) => void;
    let oldSignal: AbortSignal | undefined;
    let requestCount = 0;
    const highlighter = vi.fn((_source: string, signal: AbortSignal) => {
      requestCount++;
      if (requestCount === 1) {
        oldSignal = signal;
        return new Promise<readonly PreviewTestSpan[]>(resolve => { resolveOld = resolve; });
      }
      return [{ from: 0, to: 4, kind: "string" as const }];
    });
    const { adapter: languageAdapter } = previewAdapter(highlighter);
    const original = codeDocument({ value: "same source" });
    const editor = renderEditor({ document: original, languageAdapter, profile: "compact", sessionKey: "stable-session" });
    await waitFor(() => !!resolveOld);

    const nextDocument = identity === "URI"
      ? { ...original, uri: "elsa://expressions/next.js" }
      : identity === "version"
        ? { ...original, version: 2 }
        : original;
    const sessionKey = identity === "session key" ? "next-session" : "stable-session";
    editor.rerender({ document: nextDocument, languageAdapter, profile: "compact", sessionKey });
    await waitFor(() => !!editor.container.querySelector(".studio-code-token-string"));
    resolveOld([{ from: 0, to: 4, kind: "tag" }]);
    await settleReactUpdates();

    expect(oldSignal?.aborted).toBe(true);
    expect(editor.container.querySelector(".studio-code-token-tag")).toBeNull();
    expect(editor.container.querySelector(".studio-code-token-string")?.textContent).toBe("same");
    editor.unmount();
  });

  it("aborts old language work and passes the current grammar profile to its loader", async () => {
    let resolveOld!: (spans: readonly PreviewTestSpan[]) => void;
    let oldSignal: AbortSignal | undefined;
    const loadOldHighlighter = vi.fn(async () => (_source: string, signal: AbortSignal) => {
      oldSignal = signal;
      return new Promise<readonly PreviewTestSpan[]>(resolve => { resolveOld = resolve; });
    });
    const javascriptAdapter = {
      ...javaScriptLanguageAdapter,
      grammarProfile: "program" as const,
      loadPreviewHighlighter: loadOldHighlighter
    };
    const { adapter: liquidAdapter, loadPreviewHighlighter: loadLiquidHighlighter } = previewAdapter(
      () => [{ from: 0, to: 4, kind: "string" }]
    );
    liquidAdapter.grammarProfile = "expression";
    const editor = renderEditor({
      document: codeDocument({ value: "same source" }),
      languageAdapter: javascriptAdapter,
      profile: "compact"
    });
    await waitFor(() => !!resolveOld);

    editor.rerender({
      document: codeDocument({ language: "liquid", value: "same source" }),
      languageAdapter: liquidAdapter,
      profile: "compact"
    });
    await waitFor(() => !!editor.container.querySelector(".studio-code-token-string"));
    resolveOld([{ from: 0, to: 4, kind: "tag" }]);
    await settleReactUpdates();

    expect(oldSignal?.aborted).toBe(true);
    expect(loadLiquidHighlighter).toHaveBeenCalledWith("expression");
    expect(editor.container.querySelector(".studio-code-token-tag")).toBeNull();
    expect(editor.container.querySelector(".studio-code-token-string")?.textContent).toBe("same");
    editor.unmount();
  });

  it("aborts pending preview work when the component unmounts", async () => {
    let resolvePending!: (spans: readonly PreviewTestSpan[]) => void;
    let previewSignal: AbortSignal | undefined;
    const { adapter: languageAdapter } = previewAdapter((_source, signal) => {
      previewSignal = signal;
      return new Promise<readonly PreviewTestSpan[]>(resolve => { resolvePending = resolve; });
    });
    const editor = renderEditor({ document: codeDocument(), languageAdapter, profile: "compact" });
    await waitFor(() => !!resolvePending);

    editor.unmount();
    resolvePending([{ from: 0, to: 4, kind: "tag" }]);
    await settleReactUpdates();

    expect(previewSignal?.aborted).toBe(true);
  });

  it("aborts preview work and hides its source when authorization is revoked", async () => {
    let resolvePending!: (spans: readonly PreviewTestSpan[]) => void;
    let previewSignal: AbortSignal | undefined;
    const { adapter: languageAdapter } = previewAdapter((_source, signal) => {
      previewSignal = signal;
      return new Promise<readonly PreviewTestSpan[]>(resolve => { resolvePending = resolve; });
    });
    const { container, unmount } = renderEditor({
      document: codeDocument({ value: "protected expression" }),
      languageAdapter,
      profile: "compact"
    });
    await waitFor(() => !!resolvePending);

    flushSync(() => window.dispatchEvent(new Event("elsa:auth-session-ended")));
    resolvePending([{ from: 0, to: 9, kind: "tag" }]);
    await settleReactUpdates();

    expect(previewSignal?.aborted).toBe(true);
    expect(container.textContent).not.toContain("protected expression");
    expect(container.querySelector(".studio-code-token-tag")).toBeNull();
    unmount();
  });

  it("does not load preview parser support for oversized or offscreen fields", async () => {
    const highlighter = vi.fn(() => [{ from: 0, to: 5, kind: "string" as const }]);
    const oversizedAdapter = previewAdapter(highlighter);
    const oversized = renderEditor({
      document: codeDocument({ value: "x".repeat(20_001) }),
      languageAdapter: oversizedAdapter.adapter,
      profile: "compact"
    });
    await Promise.resolve();
    expect(oversizedAdapter.loadPreviewHighlighter).not.toHaveBeenCalled();
    oversized.unmount();

    vi.stubGlobal("IntersectionObserver", class {
      constructor(private readonly callback: IntersectionObserverCallback) {}
      observe(target: Element) {
        this.callback([{ isIntersecting: false, target } as IntersectionObserverEntry], this as unknown as IntersectionObserver);
      }
      disconnect() {}
      unobserve() {}
      takeRecords() { return []; }
    });
    const offscreenAdapter = previewAdapter(highlighter);
    const offscreen = renderEditor({ document: codeDocument(), languageAdapter: offscreenAdapter.adapter, profile: "compact" });
    await Promise.resolve();

    expect(offscreenAdapter.loadPreviewHighlighter).not.toHaveBeenCalled();
    expect(highlighter).not.toHaveBeenCalled();
    offscreen.unmount();
  });

  it("aborts a preview scrolled offscreen and highlights only after it becomes visible again", async () => {
    let observerCallback: IntersectionObserverCallback | undefined;
    let observedTarget: Element | undefined;
    vi.stubGlobal("IntersectionObserver", class {
      constructor(callback: IntersectionObserverCallback) { observerCallback = callback; }
      observe(target: Element) { observedTarget = target; }
      disconnect() {}
      unobserve() {}
      takeRecords() { return []; }
    });

    let resolveFirst!: (spans: readonly PreviewTestSpan[]) => void;
    let firstSignal: AbortSignal | undefined;
    let requests = 0;
    const highlighter = vi.fn((_source: string, signal: AbortSignal) => {
      requests++;
      if (requests === 1) {
        firstSignal = signal;
        return new Promise<readonly PreviewTestSpan[]>(resolve => { resolveFirst = resolve; });
      }
      return [{ from: 0, to: 5, kind: "string" as const }];
    });
    const { adapter: languageAdapter } = previewAdapter(highlighter);
    const editor = renderEditor({ document: codeDocument({ value: "value" }), languageAdapter, profile: "compact" });
    const notifyVisibility = (isIntersecting: boolean) => {
      observerCallback?.([{ target: observedTarget!, isIntersecting } as IntersectionObserverEntry], {} as IntersectionObserver);
    };

    notifyVisibility(true);
    await waitFor(() => !!resolveFirst);
    notifyVisibility(false);
    resolveFirst([{ from: 0, to: 5, kind: "tag" }]);
    await settleReactUpdates();

    expect(firstSignal?.aborted).toBe(true);
    expect(editor.container.querySelector(".studio-code-token-tag")).toBeNull();
    notifyVisibility(true);
    await waitFor(() => !!editor.container.querySelector(".studio-code-token-string"));
    expect(editor.container.querySelector(".studio-code-token-string")?.textContent).toBe("value");
    editor.unmount();
  });
});

function previewAdapter(highlighter: PreviewTestHighlighter) {
  const loadEditor = vi.fn(javaScriptLanguageAdapter.loadEditor!);
  const loadPreviewHighlighter = vi.fn(async (_profile?: StudioCodeLanguageAdapter["grammarProfile"]) => highlighter);
  return {
    adapter: { ...javaScriptLanguageAdapter, loadEditor, loadPreviewHighlighter },
    loadEditor,
    loadPreviewHighlighter
  };
}
