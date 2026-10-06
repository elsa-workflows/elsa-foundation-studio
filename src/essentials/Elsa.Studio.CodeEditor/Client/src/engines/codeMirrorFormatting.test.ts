import { history, undo } from "@codemirror/commands";
import { EditorSelection, EditorState } from "@codemirror/state";
import { EditorView } from "@codemirror/view";
import { afterEach, describe, expect, it, vi } from "vitest";
import { CodeMirrorFormatter } from "./codeMirrorFormatting";
import type { StudioCodeEditorEngineProps, StudioCodeFormatResult, StudioCodeFormatter } from "../types";

const cleanup = new Set<() => void>();
afterEach(() => { for (const dispose of cleanup) dispose(); cleanup.clear(); vi.restoreAllMocks(); });

function fixture(provider: StudioCodeFormatter, source = "a+ b") {
  const host = document.createElement("div");
  document.body.append(host);
  const props: StudioCodeEditorEngineProps = {
    document: { uri: "elsa://format", language: "javascript", value: source, version: 1 },
    grammarProfile: "expression", session: { id: "format" }, profile: "compact", readOnly: false,
    theme: "studio", minHeight: "0", ariaLabel: "Format test", diagnostics: [], onChange: vi.fn(),
    loadFormatter: async () => provider
  };
  const status = vi.fn();
  let active = true;
  const view = new EditorView({ parent: host, state: EditorState.create({
    doc: source, selection: { anchor: 1 }, extensions: [history(), EditorState.allowMultipleSelections.of(true),
      EditorView.updateListener.of(update => {
        if (update.docChanged || update.selectionSet) formatter.invalidate();
        if (update.docChanged) props.onChange({ ...props.document, value: update.state.doc.toString() });
      })]
  }) });
  const formatter = new CodeMirrorFormatter(view, () => props, () => active, status);
  cleanup.add(() => { formatter.invalidate(); view.destroy(); host.remove(); });
  return { view, props, formatter, status, deactivate: () => { active = false; }, park: () => { active = false; formatter.invalidate(); } };
}

function deferred() {
  let resolve!: (result: StudioCodeFormatResult) => void;
  const provider: StudioCodeFormatter = () => new Promise(done => { resolve = done; });
  return { provider, resolve: (result: StudioCodeFormatResult) => resolve(result) };
}

const formatted: StudioCodeFormatResult = { state: "ready", edits: [{ from: 0, to: 4, insert: "a + b" }] };

describe("explicit engine formatting", () => {
  it("keeps a completed result announced through host acknowledgement but clears it on a new edit", async () => {
    const { view, formatter, props, status } = fixture(() => formatted);
    await formatter.request();
    props.document = { ...props.document, value: view.state.doc.toString(), version: 2 };
    formatter.invalidate(true);
    expect(status).toHaveBeenLastCalledWith("Source formatted. Undo restores the original source.");
    view.dispatch({ changes: { from: view.state.doc.length, insert: " " } });
    expect(status).toHaveBeenLastCalledWith("");
  });

  it("captures live source and full selection and applies one normal undoable change", async () => {
    const provider = vi.fn<StudioCodeFormatter>(() => formatted);
    const { view, formatter, props } = fixture(provider);
    view.dispatch({ changes: { from: 4, insert: " " } });
    await formatter.request();
    expect(provider.mock.calls[0]![0].document.value).toBe("a+ b ");
    expect(provider.mock.calls[0]![0].selection).toEqual({ ranges: [{ anchor: 1, head: 1 }], mainIndex: 0 });
    expect(view.state.doc.toString()).toBe("a + b ");
    expect(props.onChange).toHaveBeenLastCalledWith({ ...props.document, value: "a + b " });
    expect(undo(view)).toBe(true);
    expect(view.state.doc.toString()).toBe("a+ b ");
  });

  it("captures multiple selections and preserves the requested main range", async () => {
    const provider = vi.fn<StudioCodeFormatter>(() => ({ state: "ready", edits: [{ from: 1, to: 1, insert: " " }],
      selection: { ranges: [{ anchor: 0, head: 0 }, { anchor: 4, head: 5 }], mainIndex: 1 } }));
    const { view, formatter } = fixture(provider);
    view.dispatch({ selection: EditorSelection.create([EditorSelection.cursor(0), EditorSelection.range(3, 4)], 1) });
    await formatter.request();
    expect(provider.mock.calls[0]![0].selection).toEqual({ ranges: [{ anchor: 0, head: 0 }, { anchor: 3, head: 4 }], mainIndex: 1 });
    expect(view.state.selection.mainIndex).toBe(1);
    expect(view.state.selection.main.anchor).toBe(4);
    expect(view.state.selection.main.head).toBe(5);
  });

  it("rejects equal-source undo ABA even if abort signaling does not work", async () => {
    vi.spyOn(AbortController.prototype, "abort").mockImplementation(() => {});
    const pending = deferred();
    const { view, formatter } = fixture(pending.provider);
    const request = formatter.request();
    await Promise.resolve(); await Promise.resolve();
    view.dispatch({ changes: { from: 0, insert: "x" } });
    undo(view);
    expect(view.state.doc.toString()).toBe("a+ b");
    pending.resolve(formatted);
    await request;
    expect(view.state.doc.toString()).toBe("a+ b");
  });

  it.each(["selection", "source", "undoABA", "park", "inactiveview", "readonly", "profile", "version", "language", "uri", "session", "loader", "provider", "hostvalue"])(
    "rejects late work after %s changes", async transition => {
      const pending = deferred();
      const { view, formatter, props, park, deactivate } = fixture(pending.provider);
      const request = formatter.request();
      await Promise.resolve();
      await Promise.resolve();
      if (transition === "selection") view.dispatch({ selection: { anchor: 2 } });
      if (transition === "source" || transition === "undoABA") view.dispatch({ changes: { from: 0, insert: "x" } });
      if (transition === "undoABA") undo(view);
      if (transition === "park") park();
      if (transition === "inactiveview") deactivate();
      if (transition === "readonly") props.readOnly = true;
      if (transition === "profile") props.grammarProfile = "program";
      if (transition === "version") props.document = { ...props.document, version: 2 };
      if (transition === "language") props.document = { ...props.document, language: "liquid" };
      if (transition === "uri") props.document = { ...props.document, uri: "elsa://replacement" };
      if (transition === "hostvalue") props.document = { ...props.document, value: "replacement" };
      if (transition === "session") props.session = { id: "replacement" };
      if (transition === "loader") props.loadFormatter = async () => pending.provider;
      if (transition === "provider") props.signatureProvider = async () => null;
      const before = view.state.doc.toString();
      const selection = view.state.selection;
      pending.resolve(formatted);
      await request;
      expect(view.state.doc.toString()).toBe(before);
      expect(view.state.selection).toBe(selection);
    }
  );

  it.each([
    [{ from: -1, to: 1, insert: "x" }],
    [{ from: 1.5, to: 2, insert: "x" }],
    [{ from: 0, to: 9, insert: "x" }],
    [{ from: 1, to: 0, insert: "x" }],
    [{ from: 0, to: 2, insert: "x" }, { from: 1, to: 3, insert: "y" }],
    [{ from: 2, to: 2, insert: "x" }, { from: 2, to: 2, insert: "y" }],
    [{ from: 3, to: 4, insert: "x" }, { from: 0, to: 1, insert: "y" }]
  ].map(edits => ({ edits })))("rejects an invalid edit set atomically: %j", async ({ edits }) => {
    const { view, formatter, props } = fixture(() => ({ state: "ready", edits }));
    await formatter.request();
    expect(view.state.doc.toString()).toBe("a+ b");
    expect(props.onChange).not.toHaveBeenCalled();
    expect(undo(view)).toBe(false);
  });

  it("rejects edits and returned selections that split a surrogate pair", async () => {
    const first = fixture(() => ({ state: "ready", edits: [{ from: 1, to: 1, insert: "x" }] }), "😀a");
    await first.formatter.request();
    expect(first.view.state.doc.toString()).toBe("😀a");
    const second = fixture(() => ({ state: "ready", edits: [{ from: 2, to: 3, insert: "b" }],
      selection: { ranges: [{ anchor: 1, head: 2 }], mainIndex: 0 } }), "😀a");
    await second.formatter.request();
    expect(second.view.state.doc.toString()).toBe("😀a");
  });

  it.each([
    { ranges: [], mainIndex: 0 },
    { ranges: [{ anchor: 0, head: 99 }], mainIndex: 0 },
    { ranges: [{ anchor: 0, head: 1 }], mainIndex: 1 },
    { ranges: [{ anchor: 0.5, head: 1 }], mainIndex: 0 }
  ])("rejects malformed post-selection atomically: %j", async selection => {
    const { formatter, view } = fixture(() => ({ ...formatted, state: "ready", edits: formatted.state === "ready" ? formatted.edits : [], selection }));
    await formatter.request();
    expect(view.state.doc.toString()).toBe("a+ b");
  });

  it.each(["ready", "unsupported"] as const)("leaves %s no-change source/selection/history untouched and reports honestly", async state => {
    const { view, formatter, status } = fixture(() => state === "ready" ? { state, edits: [],
      selection: { ranges: [{ anchor: 0, head: 0 }], mainIndex: 0 } } : { state });
    const selection = view.state.selection;
    await formatter.request();
    expect(view.state.selection).toBe(selection);
    expect(view.state.doc.toString()).toBe("a+ b");
    expect(undo(view)).toBe(false);
    expect(status).toHaveBeenLastCalledWith(state === "ready" ? "Source is already normalized." : "No safe formatting is available for this source.");
  });
});
