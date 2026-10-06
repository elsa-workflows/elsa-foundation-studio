import { flushSync } from "react-dom";
import { undo } from "@codemirror/commands";
import { syntaxTree } from "@codemirror/language";
import type { Extension } from "@codemirror/state";
import { createRoot } from "react-dom/client";
import { EditorView } from "@codemirror/view";
import { describe, expect, it, vi } from "vitest";
import { StudioCodeEditor } from "../StudioCodeEditor";
import * as codeMirrorLanguages from "../engines/codeMirrorLanguages";
import { javaScriptLanguageAdapter } from "../languages/javascript";
import {
  activateRichEditor,
  click,
  codeDocument,
  editorInput,
  fill,
  key,
  renderEditor,
  setupStudioCodeEditorTestLifecycle,
  waitFor
} from "./StudioCodeEditor.testSupport";
import type { StudioCodeCompletion, StudioCodeFormatResult } from "../types";

setupStudioCodeEditorTestLifecycle();

describe("StudioCodeEditor", () => {
  it("returns focus to compact editing before replacing displayed signature authority", async () => {
    const onBlur = vi.fn();
    const props = { profile: "compact" as const, document: codeDocument({ value: "f(a, b)" }),
      languageAdapter: javaScriptLanguageAdapter, onBlur };
    const { container, rerender } = renderEditor({ ...props,
      signatureProvider: async () => ({ label: "f(x)", signatures: [{ label: "f(x)" }, { label: "f(x, y)" }] }) });
    const content = await activateRichEditor(container, "compact");
    await waitFor(() => !!container.querySelector('[aria-label="Next signature"]'));
    container.querySelector<HTMLButtonElement>('[aria-label="Next signature"]')!.focus();
    rerender({ ...props, signatureProvider: async () => null });
    expect(container.querySelector(".studio-code-editor-signature")).toBeNull();
    expect(document.activeElement).toBe(content);
    expect(onBlur).not.toHaveBeenCalled();
    expect(container.querySelector(".cm-content")).toBe(content);
  });

  it.each(["format", "overload"])("exits a %s control with Escape then native Tab without releasing compact ownership early", async control => {
    const onBlur = vi.fn();
    const { container } = renderEditor({ profile: "compact", document: codeDocument({ value: "f(a, b)" }),
      languageAdapter: javaScriptLanguageAdapter, onBlur,
      signatureProvider: async () => ({ label: "f(x)", signatures: [{ label: "f(x)" }, { label: "f(x, y)" }] }) });
    const content = await activateRichEditor(container, "compact");
    const selector = control === "format" ? '[aria-label="Format source"]' : '[aria-label="Next signature"]';
    await waitFor(() => !!container.querySelector(selector));
    const next = container.querySelector<HTMLButtonElement>(selector)!;
    next.focus();
    click(next);
    expect(document.activeElement).toBe(next);
    key(next, "Escape");
    expect(document.activeElement).toBe(content);
    expect(container.querySelector(".studio-code-editor-signature")).toBeNull();
    expect(onBlur).not.toHaveBeenCalled();
    expect(key(content, "Tab").defaultPrevented).toBe(false);
  });

  it.each(["uri", "session"])("rejects an old pending format after the mounted %s changes", async transition => {
    let resolve!: (result: StudioCodeFormatResult) => void;
    const formatter = vi.fn(() => new Promise<StudioCodeFormatResult>(done => { resolve = done; }));
    const adapter = { ...javaScriptLanguageAdapter, grammarProfile: "expression" as const, loadFormatter: async () => formatter };
    const onChange = vi.fn();
    const document = codeDocument({ value: "a+ b" });
    const props = { profile: "expanded" as const, document, languageAdapter: adapter, onChange, sessionKey: "before" };
    const { container, rerender } = renderEditor(props);
    await activateRichEditor(container, "expanded");
    click(container.querySelector<HTMLButtonElement>('[aria-label="Format source"]')!);
    await waitFor(() => formatter.mock.calls.length === 1);
    rerender({ ...props, document: transition === "uri" ? { ...document, uri: "elsa://other" } : document,
      sessionKey: transition === "session" ? "after" : props.sessionKey });
    resolve({ state: "ready", edits: [{ from: 0, to: 4, insert: "a + b" }] });
    await new Promise(done => setTimeout(done, 0));
    expect(container.querySelector(".cm-content")?.textContent).toBe("a+ b");
    expect(onChange).not.toHaveBeenCalled();
  });

  it.each(["button", "shortcut"])("formats only on the explicit %s action and restores exact source in one undo", async action => {
    const onBlur = vi.fn();
    const onChange = vi.fn();
    const formatter = vi.fn(() => ({ state: "ready" as const, edits: [{ from: 0, to: 4, insert: "a + b" }] }));
    const adapter = { ...javaScriptLanguageAdapter, grammarProfile: "expression" as const, loadFormatter: async () => formatter };
    const { container } = renderEditor({ profile: "compact", document: codeDocument({ value: "a+ b" }), languageAdapter: adapter, onBlur, onChange });
    const content = await activateRichEditor(container, "compact");
    const view = EditorView.findFromDOM(content)!;
    expect(formatter).not.toHaveBeenCalled();
    if (action === "button") {
      const button = container.querySelector<HTMLButtonElement>('[aria-label="Format source"]')!;
      button.focus();
      click(button);
    } else key(content, "f", { altKey: true, shiftKey: true });
    await waitFor(() => view.state.doc.toString() === "a + b");
    expect(formatter).toHaveBeenCalledTimes(1);
    expect(onBlur).not.toHaveBeenCalled();
    expect(onChange).toHaveBeenLastCalledWith(expect.objectContaining({ value: "a + b" }));
    expect(container.querySelector(".cm-content")).toBe(content);
    expect(undo(view)).toBe(true);
    expect(view.state.doc.toString()).toBe("a+ b");
  });

  it("retains compact ownership on an internal control and blurs once on external exit", async () => {
    const onBlur = vi.fn();
    const { container } = renderEditor({
      profile: "compact", languageAdapter: javaScriptLanguageAdapter, onBlur
    });
    await activateRichEditor(container, "compact");
    const content = container.querySelector<HTMLElement>(".cm-content")!;
    content.focus();
    const control = globalThis.document.createElement("button");
    control.textContent = "Internal editor action";
    container.querySelector(".studio-code-editor")!.append(control);
    control.focus();
    await new Promise(resolve => queueMicrotask(() => resolve(undefined)));
    expect(onBlur).not.toHaveBeenCalled();
    expect(container.querySelector(".cm-content")).toBe(content);
    expect(globalThis.document.activeElement).toBe(control);

    const external = globalThis.document.createElement("button");
    globalThis.document.body.append(external);
    try {
      external.focus();
      await waitFor(() => !!container.querySelector(".studio-code-editor-preview"));
      expect(onBlur).toHaveBeenCalledTimes(1);
    } finally {
      external.remove();
    }
  });

  it("renders the fallback editor for unsupported languages and emits document changes", () => {
    const document = codeDocument({ language: "liquid", value: "{{ total }}" });
    const onChange = vi.fn();
    const { container, unmount } = renderEditor({ document, onChange });

    const textarea = editorInput(container);
    expect(textarea.value).toBe("{{ total }}");
    expect(textarea.getAttribute("aria-label")).toBe("Global JavaScript function");
    expect(container.querySelector(".studio-code-editor")?.getAttribute("data-language")).toBe("liquid");

    fill(textarea, "{{ subtotal }}");

    expect(onChange).toHaveBeenCalledWith({ ...document, value: "{{ subtotal }}" });
    expect(container.querySelector(".studio-code-editor-rich")).toBeNull();
    unmount();
  });

  it("keeps readonly documents selectable without emitting changes", () => {
    const onChange = vi.fn();
    const { container, unmount } = renderEditor({ document: codeDocument({ language: "liquid" }), readOnly: true, onChange });
    const textarea = editorInput(container);

    expect(textarea.readOnly).toBe(true);
    expect(textarea.getAttribute("aria-readonly")).toBe("true");

    fill(textarea, "changed");

    expect(onChange).not.toHaveBeenCalled();
    unmount();
  });

  it("removes source from an already mounted editor when authorization is revoked", () => {
    const { container, unmount } = renderEditor({
      document: codeDocument({ language: "liquid", value: "sensitive expression" })
    });

    expect(editorInput(container).value).toBe("sensitive expression");
    flushSync(() => window.dispatchEvent(new Event("elsa:auth-session-ended")));

    expect(container.querySelector("textarea")).toBeNull();
    expect(container.textContent).not.toContain("sensitive expression");
    expect(container.textContent).toContain("authorization session changed");
    unmount();
  });

  it("keeps source hidden when an editor remounts in a tooling-revoked workflow scope", () => {
    const sessionKey = "workflow-revoked\u001felsa://expressions/secret";
    const document = codeDocument({ language: "liquid", value: "sensitive expression" });
    const first = renderEditor({ document, sessionKey });

    flushSync(() => window.dispatchEvent(new CustomEvent("elsa:expression-tooling-authorization-revoked", {
      detail: { scope: "workflow-revoked" }
    })));
    expect(first.container.textContent).not.toContain("sensitive expression");
    first.unmount();

    window.dispatchEvent(new Event("elsa:auth-session-started"));
    const second = renderEditor({ document, sessionKey });
    expect(second.container.querySelector("textarea")).toBeNull();
    expect(second.container.textContent).not.toContain("sensitive expression");
    expect(second.container.textContent).toContain("authorization session changed");

    flushSync(() => window.dispatchEvent(new CustomEvent("elsa:expression-tooling-authorization-restored", {
      detail: { scope: "workflow-revoked" }
    })));
    expect(editorInput(second.container).value).toBe("sensitive expression");
    second.unmount();
  });

  it("destroys active and parked rich source immediately when authorization is revoked", async () => {
    const { container, unmount } = renderEditor({
      document: codeDocument({ value: "sensitiveRichExpression" }),
      languageAdapter: javaScriptLanguageAdapter,
      profile: "compact"
    });

    click(container.querySelector<HTMLButtonElement>(".studio-code-editor-preview")!);
    await waitFor(() => !!container.querySelector(".cm-content"));

    window.dispatchEvent(new Event("elsa:auth-session-ended"));

    expect(container.querySelector(".cm-editor")).toBeNull();
    expect(container.textContent).not.toContain("sensitiveRichExpression");
    await waitFor(() => container.textContent?.includes("authorization session changed") ?? false);
    unmount();
  }, 20000);

  it("destroys parked rich source immediately when authorization is revoked", async () => {
    const { container, unmount } = renderEditor({
      document: codeDocument({ value: "parkedSensitiveRichExpression" }),
      languageAdapter: javaScriptLanguageAdapter,
      profile: "compact"
    });

    click(container.querySelector<HTMLButtonElement>(".studio-code-editor-preview")!);
    await waitFor(() => !!container.querySelector(".cm-content"));
    container.querySelector<HTMLElement>(".cm-content")!.blur();
    await waitFor(() => !!container.querySelector(".studio-code-editor-preview"));

    window.dispatchEvent(new Event("elsa:auth-session-ended"));

    expect(container.querySelector(".cm-editor")).toBeNull();
    await waitFor(() => container.textContent?.includes("authorization session changed") ?? false);
    expect(container.textContent).not.toContain("parkedSensitiveRichExpression");
    unmount();
  }, 20000);

  it("renders only diagnostics for the active document", () => {
    const { container, unmount } = renderEditor({
      document: codeDocument({ uri: "elsa://functions/tax.liquid", language: "liquid" }),
      diagnostics: [
        { uri: "elsa://functions/tax.liquid", severity: "warning", code: "LQ001", message: "Check this expression.", startLineNumber: 2, startColumn: 4 },
        { uri: "elsa://functions/other.liquid", severity: "error", code: "LQ999", message: "Wrong document." },
        { severity: "info", message: "General editor hint." }
      ]
    });

    expect(container.textContent).toContain("LQ001");
    expect(container.textContent).toContain("2:4");
    expect(container.textContent).toContain("Check this expression.");
    expect(container.textContent).toContain("General editor hint.");
    expect(container.textContent).not.toContain("Wrong document.");
    expect(container.querySelector(".studio-code-editor-diagnostics")?.getAttribute("role")).toBe("status");
    unmount();
  });

  it.each([
    [["warning", "error", "error"], 1],
    [["info", "warning", "warning"], 1],
    [["info", "info"], 0]
  ] as const)("keeps the first highest-priority compact diagnostic for %j", (severities, expectedIndex) => {
    const { container } = renderEditor({
      profile: "compact",
      diagnostics: severities.map((severity, index) => ({ severity, message: `Diagnostic ${index}` }))
    });
    expect(container.querySelectorAll(".studio-code-editor-diagnostic")).toHaveLength(1);
    expect(container.querySelector(".studio-code-editor-diagnostic")?.textContent).toBe(`Diagnostic ${expectedIndex}`);
  });

  it("uses language adapter metadata without exposing engine-specific details", () => {
    const { container, unmount } = renderEditor({
      languageAdapter: {
        language: "liquid",
        displayName: "Liquid"
      },
      document: codeDocument({ language: "liquid" })
    });

    expect(container.querySelector(".studio-code-editor-header")?.textContent).toContain("Liquid");
    expect(container.querySelector(".studio-code-editor")?.getAttribute("data-language")).toBe("liquid");
    unmount();
  });

  it("activates a compact preview on focus and keeps pasted newlines while requesting expansion", () => {
    const onChange = vi.fn();
    const onExpand = vi.fn();
    const onNewline = vi.fn();
    const { container, unmount } = renderEditor({
      document: codeDocument({ language: "liquid", value: "{{ total }}" }),
      profile: "compact",
      onChange,
      onExpand,
      onNewline
    });

    const preview = container.querySelector<HTMLButtonElement>(".studio-code-editor-preview")!;
    expect(preview.textContent).toContain("{{ total }}");
    click(preview);

    const textarea = editorInput(container);
    fill(textarea, "{{ total }}\n{{ tax }}");

    expect(onChange).toHaveBeenCalledWith(expect.objectContaining({ value: "{{ total }}\n{{ tax }}" }));
    expect(onNewline).toHaveBeenCalledOnce();
    expect(onExpand).toHaveBeenCalledOnce();
    unmount();
  });

  it("uses Enter to expand, Tab to indent, and both documented shortcuts to leave a compact fallback editor", () => {
    const onExpand = vi.fn();
    const { container, unmount } = renderEditor({
      document: codeDocument({ language: "liquid" }),
      profile: "compact",
      onExpand
    });

    click(container.querySelector<HTMLButtonElement>(".studio-code-editor-preview")!);
    const textarea = editorInput(container);
    const enter = new KeyboardEvent("keydown", { key: "Enter", bubbles: true, cancelable: true });
    textarea.dispatchEvent(enter);
    const tab = new KeyboardEvent("keydown", { key: "Tab", bubbles: true, cancelable: true });
    textarea.dispatchEvent(tab);
    const escape = new KeyboardEvent("keydown", { key: "Escape", bubbles: true, cancelable: true });
    textarea.dispatchEvent(escape);
    const escapeTab = new KeyboardEvent("keydown", { key: "Tab", bubbles: true, cancelable: true });
    textarea.dispatchEvent(escapeTab);
    const controlM = new KeyboardEvent("keydown", { key: "m", ctrlKey: true, bubbles: true, cancelable: true });
    textarea.dispatchEvent(controlM);
    const controlMTab = new KeyboardEvent("keydown", { key: "Tab", bubbles: true, cancelable: true });
    textarea.dispatchEvent(controlMTab);

    expect(onExpand).toHaveBeenCalledOnce();
    expect(enter.defaultPrevented).toBe(true);
    expect(tab.defaultPrevented).toBe(true);
    expect(escapeTab.defaultPrevented).toBe(false);
    expect(controlM.defaultPrevented).toBe(true);
    expect(controlMTab.defaultPrevented).toBe(false);
    unmount();
  });

  it.each(["compact", "expanded"] as const)("accepts the selected rich %s completion on Enter", async profile => {
    const onChange = vi.fn();
    const onExpand = vi.fn();
    const completionProvider = vi.fn(() => [{ label: "total", apply: "total" }]);
    const { container, unmount } = renderEditor({
      document: codeDocument({ uri: `elsa://functions/enter-selected-${profile}.js`, value: "" }),
      languageAdapter: javaScriptLanguageAdapter,
      profile,
      completionProvider,
      onChange,
      onExpand
    });

    try {
      const content = await activateRichEditor(container, profile);
      const clock = vi.spyOn(Date, "now").mockReturnValue(1_000);
      try {
        key(content, " ", { code: "Space", ctrlKey: true });
        await waitFor(() => !!container.querySelector(".cm-tooltip-autocomplete"));

        expect(container.querySelector(".cm-tooltip-autocomplete")?.textContent).toContain("total");

        const earlyEnter = key(content, "Enter");
        expect(earlyEnter.defaultPrevented).toBe(true);
        expect(onExpand).not.toHaveBeenCalled();
        expect(onChange).not.toHaveBeenCalled();

        clock.mockReturnValue(1_075);
        expect(key(content, "Enter").defaultPrevented).toBe(true);
        expect(onChange).toHaveBeenCalledWith(expect.objectContaining({ value: "total" }));
        expect(onExpand).not.toHaveBeenCalled();
      } finally {
        clock.mockRestore();
      }
    } finally {
      unmount();
    }
  }, 20000);

  it("does not expand a compact editor while its completion request is pending", async () => {
    let resolveCompletions: ((value: StudioCodeCompletion[]) => void) | undefined;
    const completionProvider = vi.fn(() => new Promise<StudioCodeCompletion[]>(resolve => {
      resolveCompletions = resolve;
    }));
    const onExpand = vi.fn();
    const { container, unmount } = renderEditor({
      document: codeDocument({ uri: "elsa://functions/enter-pending-compact.js", value: "" }),
      languageAdapter: javaScriptLanguageAdapter,
      profile: "compact",
      completionProvider,
      onExpand
    });

    try {
      const content = await activateRichEditor(container, "compact");
      key(content, " ", { code: "Space", ctrlKey: true });
      await waitFor(() => completionProvider.mock.calls.length === 1);

      expect(key(content, "Enter").defaultPrevented).toBe(true);
      expect(onExpand).not.toHaveBeenCalled();

      resolveCompletions?.([{ label: "total", apply: "total" }]);
      await waitFor(() => !!container.querySelector(".cm-tooltip-autocomplete"));
    } finally {
      unmount();
    }
  }, 20000);

  it.each(["compact", "expanded"] as const)("merges safe expression locals with authoritative runtime help in %s", async profile => {
    const source = "(customer) => { const total = 1; return ; }";
    const { container } = renderEditor({
      document: codeDocument({ uri: `elsa://expressions/local-merge-${profile}`, value: source }),
      languageAdapter: { ...javaScriptLanguageAdapter, grammarProfile: "expression" },
      profile,
      completionProvider: () => [
        { label: "total", detail: "authorized metadata", apply: "total" },
        { label: "Math", kind: "value" }
      ]
    });
    const content = await activateRichEditor(container, profile);
    const view = EditorView.findFromDOM(content)!;
    view.dispatch({ selection: { anchor: source.indexOf("return ") + "return ".length } });
    key(content, " ", { code: "Space", ctrlKey: true });
    await waitFor(() => !!container.querySelector(".cm-tooltip-autocomplete"));
    const items = [...container.querySelectorAll(".cm-tooltip-autocomplete li")].map(item => item.textContent ?? "");
    const labels = [...container.querySelectorAll(".cm-completionLabel")].map(item => item.textContent);
    expect(items.filter(item => item.startsWith("total"))).toHaveLength(1);
    expect(items.join(" ")).toContain("authorized metadata");
    expect(labels).toEqual(expect.arrayContaining(["customer", "total", "Math"]));
    expect(items.join(" ")).not.toMatch(/\b(Date|fetch|window|import)\b/);
  }, 20000);

  it.each(["compact", "expanded"] as const)("keeps rich %s Enter behavior when no completion is active", async profile => {
    const onChange = vi.fn();
    const onExpand = vi.fn();
    const { container, unmount } = renderEditor({
      document: codeDocument({ uri: `elsa://functions/enter-empty-${profile}.js`, value: "" }),
      languageAdapter: javaScriptLanguageAdapter,
      profile,
      onChange,
      onExpand
    });

    try {
      const content = await activateRichEditor(container, profile);
      expect(key(content, "Enter").defaultPrevented).toBe(true);

      if (profile === "compact") {
        expect(onExpand).toHaveBeenCalledOnce();
        expect(onChange).not.toHaveBeenCalled();
      } else {
        expect(onExpand).not.toHaveBeenCalled();
        expect(onChange).toHaveBeenCalledWith(expect.objectContaining({ value: "\n" }));
      }
    } finally {
      unmount();
    }
  }, 20000);

  it("preserves selected fallback source while indenting and outdenting complete lines", () => {
    const onIndent = vi.fn();
    const indented = renderEditor({
      document: codeDocument({ language: "liquid", value: "one\ntwo" }),
      onChange: onIndent
    });
    const indentInput = editorInput(indented.container);
    indentInput.setSelectionRange(0, indentInput.value.length);
    indentInput.dispatchEvent(new KeyboardEvent("keydown", {
      key: "Tab",
      bubbles: true,
      cancelable: true
    }));
    expect(onIndent).toHaveBeenLastCalledWith(expect.objectContaining({ value: "  one\n  two" }));
    indented.unmount();

    const onOutdent = vi.fn();
    const outdented = renderEditor({
      document: codeDocument({ language: "liquid", value: "  one\n  two" }),
      onChange: onOutdent
    });
    const outdentInput = editorInput(outdented.container);
    outdentInput.setSelectionRange(0, outdentInput.value.length);
    outdentInput.dispatchEvent(new KeyboardEvent("keydown", {
      key: "Tab",
      shiftKey: true,
      bubbles: true,
      cancelable: true
    }));
    expect(onOutdent).toHaveBeenLastCalledWith(expect.objectContaining({ value: "one\ntwo" }));
    outdented.unmount();
  });

  it("lazy-loads the rich editor for JavaScript documents", async () => {
    const { container, unmount } = renderEditor({
      document: codeDocument({ language: "javascript", value: "return total;" }),
      languageAdapter: javaScriptLanguageAdapter,
      theme: "dark"
    });

    expect(editorInput(container).value).toBe("return total;");
    await waitFor(() => !!container.querySelector(".cm-gutters"));

    expect(container.querySelector(".studio-code-editor-rich")).toBeTruthy();
    expect(container.querySelector("[aria-label='Global JavaScript function']")).toBeTruthy();
    expect(container.querySelector(".studio-code-editor-header")?.textContent).toContain("JavaScript");
    expect(container.querySelector(".studio-code-editor")?.getAttribute("data-theme")).toBe("dark");
    expect(container.querySelector(".studio-code-editor")?.getAttribute("data-studio-code-editor")).toBe("true");
    expect(container.querySelector(".cm-gutters")).toBeTruthy();
    unmount();
  }, 20000);

  it("reconfigures an existing JavaScript session when its adapter grammar profile changes", async () => {
    const expressionAdapter = { ...javaScriptLanguageAdapter, grammarProfile: "expression" as const };
    const document = codeDocument({ value: "(total: number) => total" });
    const editor = renderEditor({ document, languageAdapter: expressionAdapter });

    await waitFor(() => !!editor.container.querySelector(".cm-lintRange-error"));
    expect(editor.container.querySelector(".cm-content")?.textContent).toBe(document.value);

    editor.rerender({ document, languageAdapter: javaScriptLanguageAdapter });
    await waitFor(() => !editor.container.querySelector(".cm-lintRange-error"));
    expect(editor.container.querySelector(".cm-content")?.textContent).toBe(document.value);

    editor.rerender({ document, languageAdapter: expressionAdapter });
    await waitFor(() => !!editor.container.querySelector(".cm-lintRange-error"));
    expect(editor.container.querySelector(".cm-content")?.textContent).toBe(document.value);
    editor.unmount();
  }, 20000);

  it("preserves authored source and undo history across JavaScript grammar-profile switches", async () => {
    const expressionAdapter = { ...javaScriptLanguageAdapter, grammarProfile: "expression" as const };
    const document = codeDocument({ value: "input" });
    const onChange = vi.fn();
    const editor = renderEditor({ document, languageAdapter: expressionAdapter, onChange });
    await waitFor(() => !!editor.container.querySelector(".cm-content"));

    let content = editor.container.querySelector<HTMLElement>(".cm-content")!;
    let view = EditorView.findFromDOM(content)!;
    view.dispatch({ changes: { from: view.state.doc.length, insert: ".total" } });
    expect(onChange).toHaveBeenLastCalledWith({ ...document, value: "input.total" });

    const editedDocument = { ...document, value: "input.total" };
    editor.rerender({ document: editedDocument, languageAdapter: javaScriptLanguageAdapter, onChange });
    await waitFor(() => !editor.container.querySelector(".cm-lintRange-error"));
    editor.rerender({ document: editedDocument, languageAdapter: expressionAdapter, onChange });
    await waitFor(() => editor.container.querySelector(".cm-content")?.textContent === "input.total");
    content = editor.container.querySelector<HTMLElement>(".cm-content")!;
    view = EditorView.findFromDOM(content)!;

    expect(undo(view)).toBe(true);
    expect(view.state.doc.toString()).toBe("input");
    expect(onChange).toHaveBeenLastCalledWith({ ...document, value: "input" });
    editor.unmount();
  }, 20000);

  it("ignores a stale asynchronous language load after a newer grammar profile wins", async () => {
    const pendingLoads: Array<{
      grammarProfile: string | undefined;
      resolve(extensions: Extension[]): void;
    }> = [];
    const loadLanguageExtensions = codeMirrorLanguages.loadCodeMirrorLanguageExtensions;
    const loadSpy = vi.spyOn(codeMirrorLanguages, "loadCodeMirrorLanguageExtensions")
      .mockImplementation((_language, grammarProfile) => new Promise(resolve => {
        pendingLoads.push({ grammarProfile, resolve });
      }));
    let unmount: (() => void) | undefined;

    try {
      const expressionAdapter = { ...javaScriptLanguageAdapter, grammarProfile: "expression" as const };
      const document = codeDocument({ value: "(total: number) => total" });
      const editor = renderEditor({ document, languageAdapter: expressionAdapter, profile: "compact" });
      unmount = editor.unmount;
      click(editor.container.querySelector<HTMLButtonElement>(".studio-code-editor-preview")!);
      await waitFor(() => pendingLoads.length === 1 && !!editor.container.querySelector(".cm-content"));
      const expressionView = EditorView.findFromDOM(editor.container.querySelector<HTMLElement>(".cm-content")!)!;

      editor.rerender({ document, languageAdapter: javaScriptLanguageAdapter, profile: "compact" });
      await waitFor(() => pendingLoads.length === 2);
      expect(pendingLoads.map(load => load.grammarProfile)).toEqual(["expression", undefined]);
      const programView = EditorView.findFromDOM(editor.container.querySelector<HTMLElement>(".cm-content")!)!;
      expect(programView).toBe(expressionView);

      pendingLoads[1].resolve(await loadLanguageExtensions("javascript"));
      await waitFor(() => !editor.container.querySelector(".cm-lintRange-error"));
      expect(syntaxTree(programView.state).topNode.name).toBe("Script");
      expect(editor.container.querySelector(".cm-content")?.textContent).toBe(document.value);

      pendingLoads[0].resolve(await loadLanguageExtensions("javascript", "expression"));
      await new Promise(resolve => setTimeout(resolve, 0));

      expect(syntaxTree(programView.state).topNode.name).toBe("Script");
      expect(editor.container.querySelector(".cm-lintRange-error")).toBeNull();
      expect(editor.container.querySelector(".cm-content")?.textContent).toBe(document.value);
    } finally {
      unmount?.();
      loadSpy.mockRestore();
    }
  }, 20000);

  it("shows keyboard-accessible signature help in the rich editor", async () => {
    const { container, unmount } = renderEditor({
      document: codeDocument({ value: "formatTotal(" }),
      languageAdapter: javaScriptLanguageAdapter,
      signatureProvider: async () => ({ label: "formatTotal(value)", documentation: { markdown: "Formats a total." } })
    });

    await waitFor(() => !!container.querySelector(".studio-code-editor-signature"));

    const signature = container.querySelector(".studio-code-editor-signature")!;
    expect(signature.textContent).toContain("formatTotal(value)");
    expect(signature.getAttribute("role")).toBe("status");
    unmount();
  }, 20000);

  it("shows and announces hover help from the keyboard before Escape arms focus exit", async () => {
    const { container, unmount } = renderEditor({
      document: codeDocument({ value: "formatTotal" }),
      languageAdapter: javaScriptLanguageAdapter,
      hoverProvider: async () => ({ documentation: { markdown: "Formats a total." } })
    });

    await waitFor(() => !!container.querySelector<HTMLElement>(".cm-content"));
    const content = container.querySelector<HTMLElement>(".cm-content")!;
    content.dispatchEvent(new KeyboardEvent("keydown", {
      key: "i",
      altKey: true,
      bubbles: true,
      cancelable: true
    }));
    await waitFor(() => !!container.querySelector(".studio-code-editor-keyboard-hover"));

    const hover = container.querySelector(".studio-code-editor-keyboard-hover")!;
    expect(hover.textContent).toBe("Formats a total.");
    expect(hover.getAttribute("role")).toBe("status");
    expect(key(content, "Escape").defaultPrevented).toBe(true);
    await waitFor(() => !container.querySelector(".studio-code-editor-keyboard-hover"));
    expect(key(content, "Tab").defaultPrevented).toBe(true);
    unmount();
  }, 20000);

  it("cancels in-flight keyboard hover help on Escape", async () => {
    let resolveHover: ((value: { documentation: { markdown: string } }) => void) | undefined;
    const hoverProvider = vi.fn((_document, _position, signal: AbortSignal) =>
      new Promise<{ documentation: { markdown: string } }>((resolve, reject) => {
        resolveHover = resolve;
        signal.addEventListener("abort", () => reject(signal.reason), { once: true });
      }));
    const { container, unmount } = renderEditor({
      document: codeDocument({ value: "formatTotal" }),
      languageAdapter: javaScriptLanguageAdapter,
      hoverProvider
    });

    await waitFor(() => !!container.querySelector<HTMLElement>(".cm-content"));
    const content = container.querySelector<HTMLElement>(".cm-content")!;
    content.dispatchEvent(new KeyboardEvent("keydown", {
      key: "i",
      altKey: true,
      bubbles: true,
      cancelable: true
    }));
    await waitFor(() => hoverProvider.mock.calls.length === 1);

    expect(key(content, "Escape").defaultPrevented).toBe(true);
    resolveHover?.({ documentation: { markdown: "Must stay hidden." } });
    await Promise.resolve();
    expect(container.querySelector(".studio-code-editor-keyboard-hover")).toBeNull();
    expect(key(content, "Tab").defaultPrevented).toBe(true);
    unmount();
  }, 20000);

  it("cancels in-flight hover help when authorization is revoked", async () => {
    let requestSignal: AbortSignal | undefined;
    const hoverProvider = vi.fn((_document, _position, signal: AbortSignal) => {
      requestSignal = signal;
      return new Promise<{ documentation: { markdown: string } }>(() => {});
    });
    const { container, unmount } = renderEditor({
      document: codeDocument({ value: "sensitiveHoverTarget" }),
      languageAdapter: javaScriptLanguageAdapter,
      hoverProvider
    });

    await waitFor(() => !!container.querySelector<HTMLElement>(".cm-content"));
    container.querySelector<HTMLElement>(".cm-content")!.dispatchEvent(new KeyboardEvent("keydown", {
      key: "i",
      altKey: true,
      bubbles: true,
      cancelable: true
    }));
    await waitFor(() => !!requestSignal);

    window.dispatchEvent(new Event("elsa:auth-session-ended"));

    expect(requestSignal?.aborted).toBe(true);
    expect(container.querySelector(".cm-editor")).toBeNull();
    unmount();
  }, 20000);

  it("cancels in-flight completion when authorization is revoked", async () => {
    let requestSignal: AbortSignal | undefined;
    const completionProvider = vi.fn((request: { signal: AbortSignal }) => {
      requestSignal = request.signal;
      return new Promise<never>(() => {});
    });
    const { container, unmount } = renderEditor({
      document: codeDocument({ value: "sensitiveCompletionTarget" }),
      languageAdapter: javaScriptLanguageAdapter,
      completionProvider
    });

    await waitFor(() => !!container.querySelector<HTMLElement>(".cm-content"));
    container.querySelector<HTMLElement>(".cm-content")!.dispatchEvent(new KeyboardEvent("keydown", {
      key: " ",
      code: "Space",
      ctrlKey: true,
      bubbles: true,
      cancelable: true
    }));
    await waitFor(() => !!requestSignal);

    window.dispatchEvent(new Event("elsa:auth-session-ended"));

    expect(requestSignal?.aborted).toBe(true);
    expect(container.querySelector(".cm-editor")).toBeNull();
    unmount();
  }, 20000);

  it("cancels in-flight signature help on Escape", async () => {
    let resolveSignature: ((value: { label: string }) => void) | undefined;
    const signatureProvider = vi.fn((_document, _position, signal: AbortSignal) =>
      new Promise<{ label: string }>((resolve, reject) => {
        resolveSignature = resolve;
        signal.addEventListener("abort", () => reject(signal.reason), { once: true });
      }));
    const { container, unmount } = renderEditor({
      document: codeDocument({ value: "formatTotal(" }),
      languageAdapter: javaScriptLanguageAdapter,
      signatureProvider
    });

    await waitFor(() => !!container.querySelector<HTMLElement>(".cm-content"));
    await waitFor(() => signatureProvider.mock.calls.length > 0);
    const content = container.querySelector<HTMLElement>(".cm-content")!;

    expect(key(content, "Escape").defaultPrevented).toBe(true);
    resolveSignature?.({ label: "Must stay hidden." });
    await Promise.resolve();
    expect(container.querySelector(".studio-code-editor-signature")).toBeNull();
    expect(key(content, "Tab").defaultPrevented).toBe(false);
    unmount();
  }, 20000);

  it("keeps line numbers out of compact CodeMirror fields", async () => {
    const { container, unmount } = renderEditor({
      document: codeDocument(),
      languageAdapter: javaScriptLanguageAdapter,
      profile: "compact"
    });

    click(container.querySelector<HTMLButtonElement>(".studio-code-editor-preview")!);
    await waitFor(() => !!container.querySelector(".studio-code-editor-rich"));

    expect(container.querySelector(".cm-gutters")).toBeNull();
    unmount();
  }, 20000);

  it("opens an existing multiline compact document in the expanded surface", () => {
    const onExpand = vi.fn();
    const { container, unmount } = renderEditor({
      document: codeDocument({ value: "first line\nsecond line" }),
      languageAdapter: javaScriptLanguageAdapter,
      profile: "compact",
      onExpand
    });

    const preview = container.querySelector<HTMLButtonElement>(".studio-code-editor-preview")!;
    preview.focus();
    expect(onExpand).not.toHaveBeenCalled();

    click(preview);

    expect(onExpand).toHaveBeenCalledOnce();
    expect(container.querySelector(".studio-code-editor-rich")).toBeNull();
    unmount();
  });

  it.each(["compact", "expanded"] as const)("indents rich %s CodeMirror fields and lets Escape then Tab leave", async profile => {
    const { container, unmount } = renderEditor({
      document: codeDocument({ value: profile === "compact" ? "return total;" : "if (total) {\nreturn total;\n}" }),
      languageAdapter: javaScriptLanguageAdapter,
      profile
    });

    if (profile === "compact") click(container.querySelector<HTMLButtonElement>(".studio-code-editor-preview")!);
    await waitFor(() => !!container.querySelector<HTMLElement>(".cm-content"));

    const content = container.querySelector<HTMLElement>(".cm-content")!;
    const tab = key(content, "Tab");
    const escape = key(content, "Escape");
    const escapeTab = key(content, "Tab");

    expect(tab.defaultPrevented).toBe(true);
    expect(escape.defaultPrevented).toBe(true);
    expect(escapeTab.defaultPrevented).toBe(false);
    unmount();
  }, 20000);

  it("uses the documented Control M shortcut to let Tab leave an expanded editor", async () => {
    const { container, unmount } = renderEditor({
      document: codeDocument(),
      languageAdapter: javaScriptLanguageAdapter,
      profile: "expanded"
    });

    await waitFor(() => !!container.querySelector<HTMLElement>(".cm-content"));

    const content = container.querySelector<HTMLElement>(".cm-content")!;
    const toggle = key(content, "m", { ctrlKey: true });
    const tab = key(content, "Tab");

    expect(toggle.defaultPrevented).toBe(true);
    expect(tab.defaultPrevented).toBe(false);
    unmount();
  }, 20000);

  it("reconfigures read-only state on an existing rich editor session", async () => {
    const props = {
      document: codeDocument(),
      languageAdapter: javaScriptLanguageAdapter,
      profile: "expanded" as const
    };
    const { container, rerender, unmount } = renderEditor(props);

    await waitFor(() => !!container.querySelector<HTMLElement>(".cm-content"));
    expect(container.querySelector<HTMLElement>(".cm-content")?.getAttribute("contenteditable")).toBe("true");

    rerender({ ...props, readOnly: true });
    expect(container.querySelector<HTMLElement>(".cm-content")?.getAttribute("contenteditable")).toBe("false");

    rerender({ ...props, readOnly: false });
    expect(container.querySelector<HTMLElement>(".cm-content")?.getAttribute("contenteditable")).toBe("true");
    unmount();
  }, 20000);

  it("keeps compact language rendering stable across repeated activations", async () => {
    const { container, unmount } = renderEditor({
      document: codeDocument({ value: "const total = 1;" }),
      languageAdapter: javaScriptLanguageAdapter,
      profile: "compact"
    });

    click(container.querySelector<HTMLButtonElement>(".studio-code-editor-preview")!);
    await waitFor(() => !!container.querySelector<HTMLElement>(".cm-content"));
    await waitFor(() => container.querySelectorAll(".cm-content span").length > 0);
    const initialTokenCount = container.querySelectorAll(".cm-content span").length;
    container.querySelector<HTMLElement>(".cm-content")!.blur();
    await waitFor(() => !!container.querySelector(".studio-code-editor-preview"));

    click(container.querySelector<HTMLButtonElement>(".studio-code-editor-preview")!);
    await waitFor(() => !!container.querySelector<HTMLElement>(".cm-content"));

    expect(container.querySelectorAll(".cm-content span")).toHaveLength(initialTokenCount);
    unmount();
  }, 20000);

  it("hands a compact view to the next field without retaining source, session, or focus", async () => {
    const host = document.createElement("div");
    document.body.appendChild(host);
    const root = createRoot(host);
    const first = codeDocument({ uri: "elsa://expressions/first.js", value: "firstValue" });
    const second = codeDocument({ uri: "elsa://expressions/second.js", value: "secondValue" });
    flushSync(() => root.render(<>
      <StudioCodeEditor ariaLabel="First expression" document={first} languageAdapter={javaScriptLanguageAdapter} profile="compact" sessionKey="first" onChange={vi.fn()} />
      <StudioCodeEditor ariaLabel="Second expression" document={second} languageAdapter={javaScriptLanguageAdapter} profile="compact" sessionKey="second" onChange={vi.fn()} />
    </>));

    click(host.querySelector<HTMLButtonElement>("[aria-label='First expression. Activate to edit.']")!);
    await waitFor(() => !!host.querySelector(".studio-code-editor-rich-compact .cm-content"));
    click(host.querySelector<HTMLButtonElement>("[aria-label='Second expression. Activate to edit.']")!);
    await waitFor(() => host.querySelectorAll(".studio-code-editor-rich-compact .cm-content").length === 1 &&
      host.querySelector<HTMLElement>(".studio-code-editor-rich-compact .cm-content")?.textContent === "secondValue");

    const content = host.querySelector<HTMLElement>(".studio-code-editor-rich-compact .cm-content")!;
    expect(host.querySelectorAll(".studio-code-editor-rich-compact")).toHaveLength(1);
    expect(document.activeElement).toBe(content);
    expect(host.querySelector("[aria-label='First expression. Activate to edit.']")?.textContent).toContain("firstValue");
    root.unmount();
    host.remove();
  }, 20000);
});
