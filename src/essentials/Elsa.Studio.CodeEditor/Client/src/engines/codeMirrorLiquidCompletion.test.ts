import { acceptCompletion, currentCompletions, setSelectedCompletion, startCompletion } from "@codemirror/autocomplete";
import { history, undo } from "@codemirror/commands";
import { EditorState } from "@codemirror/state";
import { EditorView } from "@codemirror/view";
import { afterEach, describe, expect, it, vi } from "vitest";
import { createCodeMirrorCodeIntelligenceExtensions } from "./codeMirrorCodeIntelligence";

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
  it("replaces the exact parser-derived token range when the cursor is mid-token", async () => {
    const source = "{{ safTail }}";
    const tokenFrom = source.indexOf("safTail");
    const tokenTo = tokenFrom + "safTail".length;
    const view = createView(source, tokenFrom + 3, () => [{
      label: "safTail",
      apply: "replaced",
      range: { from: tokenFrom, to: tokenTo }
    }]);
    const clock = vi.spyOn(Date, "now").mockReturnValue(1_000);
    startCompletion(view);
    await waitForCompletion(view);
    view.dispatch({ effects: setSelectedCompletion(0) });
    clock.mockReturnValue(1_100);
    expect(acceptCompletion(view)).toBe(true);
    expect(view.state.doc.toString()).toBe("{{ replaced }}");
    expect(undo(view)).toBe(true);
    expect(view.state.doc.toString()).toBe(source);
    expect(view.state.selection.main).toMatchObject({ anchor: tokenFrom + 3, head: tokenFrom + 3 });
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

function createView(source: string, position: number, completionProvider: NonNullable<Parameters<typeof createCodeMirrorCodeIntelligenceExtensions>[0]["completionProvider"]>) {
  const host = document.createElement("div");
  document.body.appendChild(host);
  const view = new EditorView({
    parent: host,
    state: EditorState.create({
      doc: source,
      selection: { anchor: position },
      extensions: [history(), createCodeMirrorCodeIntelligenceExtensions({
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
