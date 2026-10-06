import { flushSync } from "react-dom";
import { describe, expect, it, vi } from "vitest";
import {
  codeDocument,
  renderEditor,
  settleReactUpdates,
  setupStudioCodeEditorTestLifecycle,
  waitFor
} from "./StudioCodeEditor.testSupport";

const chunk = vi.hoisted(() => ({ attempted: false }));
vi.mock("../StudioCodePreview", () => {
  chunk.attempted = true;
  throw new Error("preview presentation chunk unavailable");
});

setupStudioCodeEditorTestLifecycle();

describe("StudioCodeEditor unavailable preview presentation", () => {
  it("keeps the same escaped, current-source button and hides it on authorization revocation", async () => {
    const initialDocument = codeDocument({ value: "<img>\nold" });
    const editor = renderEditor({ document: initialDocument, profile: "compact" });
    const button = editor.container.querySelector<HTMLButtonElement>(".studio-code-editor-preview")!;
    flushSync(() => button.focus());

    await waitFor(() => chunk.attempted);
    await settleReactUpdates();
    expect(editor.container.querySelector(".studio-code-editor-preview")).toBe(button);
    expect(document.activeElement).toBe(button);
    expect(button.querySelector("img")).toBeNull();
    expect(button.textContent).toBe("<img> ↵ old↗");
    expect(editor.container.querySelector(".cm-editor")).toBeNull();

    editor.rerender({ document: { ...initialDocument, value: "<svg>\nnew", version: 2 }, profile: "compact" });
    await settleReactUpdates();
    expect(editor.container.querySelector(".studio-code-editor-preview")).toBe(button);
    expect(button.querySelector("svg")).toBeNull();
    expect(button.textContent).toBe("<svg> ↵ new↗");

    flushSync(() => window.dispatchEvent(new Event("elsa:auth-session-ended")));
    await settleReactUpdates();
    expect(editor.container.querySelector(".studio-code-editor-preview")).toBeNull();
    expect(editor.container.textContent).not.toContain("<svg>");
    expect(editor.container.textContent).toContain("authorization session changed");
  });
});
