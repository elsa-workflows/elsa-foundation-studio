import { EditorView } from "@codemirror/view";
import { afterEach, describe, expect, it, vi } from "vitest";
import { cancelCodeMirrorIntelligence, createCodeMirrorCodeIntelligenceExtensions } from "./codeMirrorCodeIntelligence";
import type { StudioCodeSignatureProvider } from "../types";

const views: EditorView[] = [];

afterEach(() => {
  for (const view of views.splice(0)) view.destroy();
  document.body.replaceChildren();
});

describe("CodeMirror signature help", () => {
  it("navigates authorized signatures without querying again or replacing the focused native control", async () => {
    const signatureProvider = vi.fn<StudioCodeSignatureProvider>(async () => ({
      label: "format(first)",
      parameters: [{ name: "first", documentation: "First value." }],
      activeParameter: 0,
      signatures: [
        { label: "format(first)", parameters: [{ name: "first", documentation: "First value." }], activeParameter: 0 },
        { label: "format(first, second)", parameters: [{ name: "first" }, { name: "second", documentation: "Second value." }], activeParameter: 1 }
      ],
      activeSignature: 0,
      callableId: "catalog:format"
    }));
    const view = mount(signatureProvider);
    const firstPanel = await waitForSignature("format(first)");
    const content = view.contentDOM;
    const next = firstPanel.querySelector<HTMLButtonElement>('[aria-label="Next signature"]')!;
    expect(firstPanel.textContent).toContain("First value.");
    next.focus();
    const keyboardMove = new KeyboardEvent("keydown", { key: "ArrowRight", bubbles: true, cancelable: true });
    next.dispatchEvent(keyboardMove);

    await waitFor(() => firstPanel.textContent?.includes("format(first, second)"));
    expect(signatureProvider).toHaveBeenCalledTimes(1);
    expect(keyboardMove.defaultPrevented).toBe(true);
    expect(document.activeElement).toBe(next);
    // Native disabled buttons lose focus in Chromium; use a focus-preserving unavailable
    // action at the boundary, with the move handler still preventing out-of-range changes.
    expect(next.disabled).toBe(false);
    expect(next.getAttribute("aria-disabled")).toBe("true");
    expect(firstPanel.querySelector('[aria-label="Next signature"]')).toBe(next);
    expect(firstPanel.textContent).toContain("Second value.");
    expect(view.contentDOM).toBe(content);
  });

  it("keeps a legacy single signature and hides an explicitly empty catalog", async () => {
    const legacy = mount(async () => ({ label: "legacy(value)" }));
    expect((await waitForSignature("legacy(value)")).textContent).toContain("legacy(value)");
    legacy.destroy();
    views.splice(views.indexOf(legacy), 1);
    document.body.replaceChildren();

    mount(async () => ({ label: "not-authorized()", signatures: [] }));
    await settle();
    expect(document.querySelector(".studio-code-editor-signature")).toBeNull();
  });

  it("retains the selected overload across a fresh response for the same callable catalog", async () => {
    const signatureProvider = vi.fn<StudioCodeSignatureProvider>(async () => ({
      label: "lookup(key)",
      signatures: [
        { label: "lookup(key)", parameters: [{ name: "key" }] },
        { label: "lookup(key, fallback)", parameters: [{ name: "key" }, { name: "fallback" }] }
      ],
      activeSignature: 0,
      callableId: "catalog:lookup"
    }));
    const view = mount(signatureProvider);
    const panel = await waitForSignature("lookup(key)");
    panel.querySelector<HTMLButtonElement>('[aria-label="Next signature"]')!.click();
    await waitFor(() => panel.textContent?.includes("lookup(key, fallback)"));

    view.dispatch({ selection: { anchor: 7 } });
    await waitFor(() => signatureProvider.mock.calls.length === 2);
    await waitFor(() => document.querySelector(".studio-code-editor-signature")?.textContent?.includes("lookup(key, fallback)"));
    expect(signatureProvider).toHaveBeenCalledTimes(2);
  });

  it("resets the selected overload when metadata changes for the same callable and labels", async () => {
    const catalog = (firstDocumentation: string) => ({
      label: "f(x)",
      signatures: [
        { label: "f(x)", documentation: { markdown: firstDocumentation }, parameters: [{ name: "x" }] },
        { label: "f(x, y)", parameters: [{ name: "x" }, { name: "y" }] }
      ],
      activeSignature: 0,
      callableId: "catalog:f"
    });
    const provider = vi.fn<StudioCodeSignatureProvider>()
      .mockResolvedValueOnce(catalog("Old metadata."))
      .mockResolvedValue(catalog("Updated metadata."));
    const view = mount(provider);
    const panel = await waitForSignature("f(x)");
    panel.querySelector<HTMLButtonElement>('[aria-label="Next signature"]')!.click();
    await waitFor(() => panel.textContent?.includes("f(x, y)"));

    view.dispatch({ selection: { anchor: 2 } });
    await waitFor(() => provider.mock.calls.length === 2);
    await waitFor(() => document.querySelector(".studio-code-editor-signature")?.textContent?.includes("f(x)") &&
      document.querySelector(".studio-code-editor-signature")?.textContent?.includes("1 of 2"));
    expect(document.querySelector(".studio-code-editor-signature")?.textContent).toContain("Updated metadata.");
  });

  it("does not carry an overload choice to a different callable identity", async () => {
    const catalog = (callableId: string) => ({
      label: "f(x)",
      signatures: [
        { label: "f(x)", parameters: [{ name: "x" }] },
        { label: "f(x, y)", parameters: [{ name: "x" }, { name: "y" }] }
      ],
      activeSignature: 0,
      callableId
    });
    const provider = vi.fn<StudioCodeSignatureProvider>()
      .mockResolvedValueOnce(catalog("catalog:old-f"))
      .mockResolvedValue(catalog("catalog:new-f"));
    const view = mount(provider);
    const panel = await waitForSignature("f(x)");
    panel.querySelector<HTMLButtonElement>('[aria-label="Next signature"]')!.click();
    await waitFor(() => panel.textContent?.includes("f(x, y)"));

    view.dispatch({ selection: { anchor: 2 } });
    await waitFor(() => provider.mock.calls.length === 2);
    await waitFor(() => document.querySelector(".studio-code-editor-signature")?.textContent?.includes("f(x)") &&
      document.querySelector(".studio-code-editor-signature")?.textContent?.includes("1 of 2"));
  });

  it("drops a revoked overload on refresh and ignores a late response from the old catalog", async () => {
    const fullCatalog = {
      label: "f(x, y)",
      parameters: [{ name: "x" }, { name: "y", documentation: "Second argument." }],
      activeParameter: 1,
      signatures: [
        { label: "f(x, y)", parameters: [{ name: "x" }, { name: "y", documentation: "Second argument." }], activeParameter: 1 },
        { label: "f(x)", parameters: [{ name: "x" }] }
      ],
      activeSignature: 0,
      callableId: "catalog:f"
    };
    const reducedCatalog = {
      label: "f(x)",
      parameters: [{ name: "x" }],
      signatures: [{ label: "f(x)", parameters: [{ name: "x" }] }],
      activeSignature: 0,
      callableId: "catalog:f"
    };
    let resolveOldCatalog: ((value: typeof fullCatalog) => void) | undefined;
    const requestSignals: AbortSignal[] = [];
    const provider = vi.fn((_document, _position, signal: AbortSignal) => {
      requestSignals.push(signal);
      if (provider.mock.calls.length === 1) return Promise.resolve(fullCatalog);
      if (provider.mock.calls.length === 2) {
        return new Promise<typeof fullCatalog>(resolve => { resolveOldCatalog = resolve; });
      }
      return Promise.resolve(reducedCatalog);
    });
    const view = mount(provider, "f(x, y)");
    const panel = await waitForSignature("f(x, y)");
    expect(panel.querySelector(".studio-code-editor-signature-parameter")?.textContent).toContain("Second argument.");
    panel.querySelector<HTMLButtonElement>('[aria-label="Next signature"]')!.click();
    await waitFor(() => panel.textContent?.includes("f(x)") && panel.textContent.includes("2 of 2"));
    expect(panel.querySelector(".studio-code-editor-signature-parameter")?.textContent).toBe("");

    view.dispatch({ selection: { anchor: 2 } });
    view.dispatch({ selection: { anchor: 5 } });
    const reducedPanel = await waitForSignature("f(x)");
    expect(requestSignals[1]?.aborted).toBe(true);
    expect(reducedPanel.textContent).not.toContain("f(x, y)");
    expect(reducedPanel.textContent).toContain("1 of 1");
    expect(reducedPanel.querySelector(".studio-code-editor-signature-parameter")?.textContent).toBe("");
    expect(reducedPanel.querySelector<HTMLDivElement>(".studio-code-editor-signature-navigation")?.hidden).toBe(true);

    resolveOldCatalog?.(fullCatalog);
    await settle();
    expect(document.querySelector(".studio-code-editor-signature")?.textContent).toContain("f(x)");
    expect(document.querySelector(".studio-code-editor-signature")?.textContent).not.toContain("f(x, y)");
  });

  it("clears synchronously on cancellation and ignores a late stale position response", async () => {
    let resolveStale: ((value: { label: string }) => void) | undefined;
    let firstSignal: AbortSignal | undefined;
    const provider = vi.fn((_document, _position, signal: AbortSignal) => {
      if (provider.mock.calls.length === 1) {
        firstSignal = signal;
        return new Promise<{ label: string }>(resolve => { resolveStale = resolve; });
      }
      return Promise.resolve({ label: "fresh()" });
    });
    const view = mount(provider);
    view.dispatch({ selection: { anchor: 2 } });
    await waitForSignature("fresh()");
    expect(firstSignal?.aborted).toBe(true);
    resolveStale?.({ label: "stale()" });
    await settle();
    expect(document.querySelector(".studio-code-editor-signature")?.textContent).toContain("fresh()");

    cancelCodeMirrorIntelligence(view);
    expect(document.querySelector(".studio-code-editor-signature")).toBeNull();
  });
});

function mount(signatureProvider: StudioCodeSignatureProvider, source = "format(value)") {
  const parent = document.createElement("div");
  document.body.append(parent);
  const view = new EditorView({
    parent,
    doc: source,
    extensions: createCodeMirrorCodeIntelligenceExtensions({
      document: { uri: "elsa://signature-test", language: "javascript", value: source, version: 1 },
      signatureProvider
    })
  });
  views.push(view);
  return view;
}

async function waitForSignature(label: string) {
  await waitFor(() => document.querySelector(".studio-code-editor-signature")?.textContent?.includes(label));
  return document.querySelector<HTMLElement>(".studio-code-editor-signature")!;
}

async function waitFor(predicate: () => unknown) {
  for (let attempt = 0; attempt < 50; attempt++) {
    if (predicate()) return;
    await new Promise(resolve => setTimeout(resolve, 0));
  }
  throw new Error("The expected signature panel state was not reached.");
}

async function settle() {
  await new Promise(resolve => setTimeout(resolve, 0));
  await Promise.resolve();
}
