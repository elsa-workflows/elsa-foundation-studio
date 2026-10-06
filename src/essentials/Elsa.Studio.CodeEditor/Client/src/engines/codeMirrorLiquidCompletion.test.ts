import { acceptCompletion, currentCompletions, setSelectedCompletion, startCompletion } from "@codemirror/autocomplete";
import { history, undo } from "@codemirror/commands";
import { EditorState, type Extension } from "@codemirror/state";
import { EditorView } from "@codemirror/view";
import { afterEach, describe, expect, it, vi } from "vitest";
import { createCodeMirrorCodeIntelligenceExtensions } from "./codeMirrorCodeIntelligence";
import type { StudioCodeCompletionProvider } from "../types";

const views = new Set<EditorView>();

afterEach(() => {
  vi.restoreAllMocks();
  for (const view of views) {
    const host = view.dom.parentElement;
    view.destroy();
    host?.remove();
  }
  views.clear();
});

describe("CodeMirror Liquid completion mapping", () => {
  it.each([
    { source: "{{ customerName  | upXX }}", token: "upXX", prefixLength: 2, label: "upcase" },
    { source: "{% iXX customerName %}ok{% endif %}", token: "iXX", prefixLength: 1, label: "if" }
  ])("replaces the full $token token while filtering only the cursor prefix", async ({ source, token, prefixLength, label }) => {
    const tokenFrom = source.indexOf(token);
    const tokenTo = tokenFrom + token.length;
    const position = tokenFrom + prefixLength;
    const view = createView(source, position, () => [{
      label,
      apply: label,
      range: { from: tokenFrom, to: tokenTo }
    }]);
    const clock = vi.spyOn(Date, "now").mockReturnValue(1_000);
    startCompletion(view);
    await waitForCompletion(view);
    view.dispatch({ effects: setSelectedCompletion(0) });
    clock.mockReturnValue(1_100);
    expect(acceptCompletion(view)).toBe(true);
    expect(view.state.doc.toString()).toBe(source.replace(token, label));
    expect(undo(view)).toBe(true);
    expect(view.state.doc.toString()).toBe(source);
    expect(view.state.selection.main).toMatchObject({ anchor: position, head: position });
  });

  it("requeries after an edit inside the token instead of reusing stale replacement positions", async () => {
    const source = "{{ customerName | upXX }}";
    const from = source.indexOf("upXX");
    const provider = vi.fn<StudioCodeCompletionProvider>(({ document: current }) => [{
      label: "upcase",
      range: { from, to: current.value.indexOf(" }}") }
    }]);
    const view = createView(source, from + 2, provider);
    const clock = vi.spyOn(Date, "now").mockReturnValue(1_000);
    startCompletion(view);
    await waitForCompletion(view);
    expect(provider).toHaveBeenCalledTimes(1);
    view.dispatch({ changes: { from: from + 2, insert: "c" }, selection: { anchor: from + 3 }, userEvent: "input.type" });
    await vi.waitFor(() => expect(provider).toHaveBeenCalledTimes(2));
    await waitForCompletion(view);
    view.dispatch({ effects: setSelectedCompletion(0) });
    clock.mockReturnValue(1_100);
    expect(acceptCompletion(view)).toBe(true);
    expect(view.state.doc.toString()).toBe("{{ customerName | upcase }}");
  });

  it.each([
    { label: "upLocal", expected: "upLocalXX" },
    { label: "upcase", expected: "upcase" }
  ])("keeps replacement ownership with the selected $label completion when local help is merged", async ({ label, expected }) => {
    const source = "upXX";
    const view = createView(source, 2, () => [{ label: "upcase", range: { from: 0, to: 4 } }], [
      EditorState.languageData.of(() => [{ studioExpressionCompletion: () => ({
        from: 0,
        options: [{ label: "upLocal" }, { label: "upcase", apply: "localCollision" }]
      }) }])
    ]);
    const clock = vi.spyOn(Date, "now").mockReturnValue(1_000);
    startCompletion(view);
    await waitForCompletion(view);
    const selected = currentCompletions(view.state).findIndex(completion => completion.label === label);
    expect(selected).toBeGreaterThanOrEqual(0);
    view.dispatch({ effects: setSelectedCompletion(selected) });
    clock.mockReturnValue(1_100);
    expect(acceptCompletion(view)).toBe(true);
    expect(view.state.doc.toString()).toBe(expected);
    expect(undo(view)).toBe(true);
    expect(view.state.doc.toString()).toBe(source);
    expect(view.state.selection.main).toMatchObject({ anchor: 2, head: 2 });
  });

  it("replaces a mid-token suffix with a snippet and preserves its tab stop and undo", async () => {
    const source = "{{ customXX }}";
    const from = source.indexOf("customXX");
    const view = createView(source, from + 3, () => [{
      label: "customFilter",
      apply: "${1:value}",
      snippet: true,
      range: { from, to: from + "customXX".length }
    }]);
    const clock = vi.spyOn(Date, "now").mockReturnValue(1_000);
    startCompletion(view);
    await waitForCompletion(view);
    view.dispatch({ effects: setSelectedCompletion(0) });
    clock.mockReturnValue(1_100);
    expect(acceptCompletion(view)).toBe(true);
    expect(view.state.doc.toString()).toBe("{{ value }}");
    expect(view.state.selection.main).toMatchObject({ anchor: from, head: from + 5 });
    expect(undo(view)).toBe(true);
    expect(view.state.doc.toString()).toBe(source);
    expect(view.state.selection.main).toMatchObject({ anchor: from + 3, head: from + 3 });
  });

  it("maps an explicit Liquid interpolation snippet to a CodeMirror tab stop", async () => {
    const view = createView("Hello", 5, () => [{
      label: "{{ }}",
      apply: "{{ ${1:value} }}",
      snippet: true,
      range: { from: 5, to: 5 }
    }]);
    const clock = vi.spyOn(Date, "now").mockReturnValue(1_000);
    startCompletion(view);
    await waitForCompletion(view);
    view.dispatch({ effects: setSelectedCompletion(0) });
    clock.mockReturnValue(1_100);
    expect(acceptCompletion(view)).toBe(true);
    expect(view.state.doc.toString()).toBe("Hello{{ value }}");
    expect(view.state.selection.main).toMatchObject({ anchor: 8, head: 13 });
    expect(undo(view)).toBe(true);
    expect(view.state.doc.toString()).toBe("Hello");
    expect(view.state.selection.main).toMatchObject({ anchor: 5, head: 5 });
  });
});

function createView(source: string, position: number, completionProvider: StudioCodeCompletionProvider, extensions: Extension[] = []) {
  const host = document.createElement("div");
  document.body.appendChild(host);
  const view = new EditorView({
    parent: host,
    state: EditorState.create({
      doc: source,
      selection: { anchor: position },
      extensions: [...extensions, history(), createCodeMirrorCodeIntelligenceExtensions({
        document: { uri: "elsa://liquid/test", language: "liquid", value: source },
        completionProvider
      })]
    })
  });
  view.focus();
  views.add(view);
  return view;
}

async function waitForCompletion(view: EditorView) {
  for (let attempt = 0; attempt < 100; attempt++) {
    if (currentCompletions(view.state).length > 0) return;
    await new Promise(resolve => setTimeout(resolve, 5));
  }
  throw new Error("Timed out waiting for CodeMirror completion.");
}
