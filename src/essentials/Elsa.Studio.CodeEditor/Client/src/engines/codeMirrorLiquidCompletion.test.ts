import { acceptCompletion, currentCompletions, setSelectedCompletion, startCompletion } from "@codemirror/autocomplete";
import { history, undo } from "@codemirror/commands";
import { EditorState, type Extension } from "@codemirror/state";
import { EditorView, getTooltip, showTooltip, type Rect, type Tooltip } from "@codemirror/view";
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

  it.each([
    { edge: "visible", wordStart: 40, wordStartTop: 24, caret: 60, caretTop: 24, expected: 40, expectedTop: 24 },
    { edge: "left", wordStart: -41.5, wordStartTop: 24, caret: 5.3, caretTop: 24, expected: 5.3, expectedTop: 24 },
    // RTL-like coordinates exercise a word start clipped at the opposite edge.
    { edge: "right", wordStart: 400, wordStartTop: 24, caret: 350, caretTop: 24.75, expected: 350, expectedTop: 24.75 }
  ])("uses the visible same-line $edge completion anchor without changing replacement behavior", async ({ wordStart, wordStartTop, caret, caretTop, expected, expectedTop }) => {
    const source = "{{ customerName | upXX }}";
    const from = source.indexOf("upXX");
    const to = from + "upXX".length;
    const position = from + 2;
    const view = createView(source, position, () => [{ label: "upcase", apply: "upcase", range: { from, to } }]);
    stubCompletionGeometry(view, new Map<number, Rect | null>([[from, at(wordStart, wordStartTop)], [position, at(caret, caretTop)]]));
    const clock = vi.spyOn(Date, "now").mockReturnValue(1_000);
    startCompletion(view);
    await waitForCompletion(view);

    const { tooltip, tooltipView } = activeCompletionTooltip(view);
    const anchor = tooltipView.getCoords ? tooltipView.getCoords(tooltip.pos) : view.coordsAtPos(tooltip.pos);
    expect(tooltip.pos).toBe(from);
    expect(anchor).toMatchObject({ left: expected, top: expectedTop });
    expect(view.state.doc.toString()).toBe(source);
    expect(view.state.selection.main).toMatchObject({ anchor: position, head: position });

    view.dispatch({ effects: setSelectedCompletion(0) });
    clock.mockReturnValue(1_100);
    expect(acceptCompletion(view)).toBe(true);
    expect(view.state.doc.toString()).toBe("{{ customerName | upcase }}");
    expect(undo(view)).toBe(true);
    expect(view.state.doc.toString()).toBe(source);
    expect(view.state.selection.main).toMatchObject({ anchor: position, head: position });
  });

  it.each([
    { reason: "the caret is also horizontally offscreen", wordStart: at(-41.5), caret: at(400), expected: at(-41.5) },
    { reason: "the caret is on another visual line", wordStart: at(-41.5), caret: at(5.3, 50), expected: at(-41.5) },
    { reason: "the caret has no coordinates", wordStart: at(-41.5), caret: null, expected: at(-41.5) },
    { reason: "the word start has no coordinates", wordStart: null, caret: at(5.3), expected: null }
  ])("keeps native clipping when $reason", async ({ wordStart, caret, expected }) => {
    const source = "{{ customerName | upXX }}";
    const from = source.indexOf("upXX");
    const position = from + 2;
    const view = createView(source, position, () => [{ label: "upcase", range: { from, to: from + 4 } }]);
    stubCompletionGeometry(view, new Map<number, Rect | null>([[from, wordStart], [position, caret]]));
    startCompletion(view);
    await waitForCompletion(view);

    const { tooltip, tooltipView } = activeCompletionTooltip(view);
    const anchor = tooltipView.getCoords ? tooltipView.getCoords(tooltip.pos) : view.coordsAtPos(tooltip.pos);
    expect(tooltip.pos).toBe(from);
    if (expected) expect(anchor).toMatchObject(expected);
    else expect(anchor).toBeNull();
    expect(view.state.doc.toString()).toBe(source);
    expect(view.state.selection.main).toMatchObject({ anchor: position, head: position });
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

function activeCompletionTooltip(view: EditorView) {
  const tooltip = view.state.facet(showTooltip).find((candidate): candidate is Tooltip =>
    candidate !== null && getTooltip(view, candidate)?.dom.classList.contains("cm-tooltip-autocomplete") === true
  );
  if (!tooltip) throw new Error("CodeMirror did not create a completion tooltip.");
  const tooltipView = getTooltip(view, tooltip);
  if (!tooltipView) throw new Error("CodeMirror did not mount the completion tooltip view.");
  return { tooltip, tooltipView };
}

function stubCompletionGeometry(view: EditorView, positions: ReadonlyMap<number, Rect | null>) {
  vi.spyOn(view, "coordsAtPos").mockImplementation(position =>
    positions.has(position) ? positions.get(position) ?? null : at(100)
  );
  vi.spyOn(view.scrollDOM, "getBoundingClientRect").mockReturnValue(new DOMRect(0, 0, 365, 120));
}

function at(left: number, top = 24): Rect {
  return { left, right: left + 1, top, bottom: top + 20 };
}
