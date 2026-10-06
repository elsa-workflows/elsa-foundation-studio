import { isolateHistory } from "@codemirror/commands";
import { ChangeSet, EditorSelection, Text, Transaction } from "@codemirror/state";
import type { EditorView } from "@codemirror/view";
import type { StudioCodeEditorEngineProps, StudioCodeFormatResult, StudioCodeSelectionSet } from "../types";

const maxSourceLength = 100_000;
const maxOutputLength = 200_000;
const maxEdits = 10_000;

export class CodeMirrorFormatter {
  private generation = 0;
  private controller?: AbortController;
  constructor(
    private readonly view: EditorView,
    private readonly getProps: () => StudioCodeEditorEngineProps,
    private readonly isActive: () => boolean,
    private readonly reportStatus: (status: string) => void
  ) {}
  invalidate(preserveCompletedStatus = false) {
    const pending = this.controller !== undefined;
    this.generation++;
    this.controller?.abort();
    this.controller = undefined;
    // Host acknowledgement/metadata refresh must cancel pending work, but must not erase
    // an already completed action's live announcement. Source/selection edits still clear it.
    if (!preserveCompletedStatus || pending) this.reportStatus("");
  }

  async request() {
    this.invalidate();
    const props = this.getProps();
    const loader = props.loadFormatter;
    if (!loader || props.readOnly || this.view.state.readOnly || !this.isActive()) return;
    const source = this.view.state.doc.toString();
    if (source.length > maxSourceLength) {
      this.reportStatus("No safe formatting is available for this source.");
      return;
    }
    const document = Object.freeze({ ...props.document, value: source });
    const hostValue = props.document.value;
    const grammarProfile = props.grammarProfile ?? "program";
    const selection = selectionSet(this.view.state.selection);
    const session = props.session;
    const sessionId = session.id;
    const authorityProviders = [props.completionProvider, props.completions, props.hoverProvider, props.signatureProvider];
    const generation = this.generation;
    const controller = this.controller = new AbortController();
    const current = () => {
      const latest = this.getProps();
      const latestProviders = [latest.completionProvider, latest.completions, latest.hoverProvider, latest.signatureProvider];
      return !controller.signal.aborted && generation === this.generation && this.isActive() &&
        !latest.readOnly && !this.view.state.readOnly && latest.loadFormatter === loader && latest.session === session && latest.session.id === sessionId &&
        authorityProviders.every((provider, index) => provider === latestProviders[index]) &&
        latest.document.uri === document.uri && latest.document.language === document.language &&
        latest.document.version === document.version && latest.document.value === hostValue &&
        (latest.grammarProfile ?? "program") === grammarProfile && this.view.state.doc.toString() === source &&
        sameSelection(selection, selectionSet(this.view.state.selection));
    };
    this.reportStatus("Formatting…");
    try {
      const formatter = await loader(grammarProfile);
      if (!current()) return;
      const result = await formatter(Object.freeze({ document, grammarProfile, selection, signal: controller.signal }));
      if (!current()) return;
      const validated = validateResult(source, this.view.state.selection, result);
      if (!validated) {
        this.reportStatus("No safe formatting is available for this source.");
        return;
      }
      if (validated.changes.empty || validated.source === source) {
        this.reportStatus("Source is already normalized.");
        return;
      }
      this.view.dispatch({
        changes: validated.changes,
        selection: validated.selection,
        annotations: [Transaction.userEvent.of("input.format"), isolateHistory.of("full")]
      });
      this.reportStatus("Source formatted. Undo restores the original source.");
    } catch {
      if (current()) this.reportStatus("No safe formatting is available for this source.");
    } finally {
      if (this.controller === controller) this.controller = undefined;
    }
  }
}

function selectionSet(selection: EditorSelection): StudioCodeSelectionSet {
  return Object.freeze({
    ranges: Object.freeze(selection.ranges.map(range => Object.freeze({ anchor: range.anchor, head: range.head }))),
    mainIndex: selection.mainIndex
  });
}

function sameSelection(a: StudioCodeSelectionSet, b: StudioCodeSelectionSet) {
  return a.mainIndex === b.mainIndex && a.ranges.length === b.ranges.length &&
    a.ranges.every((range, index) => range.anchor === b.ranges[index]!.anchor && range.head === b.ranges[index]!.head);
}

function validBoundary(source: string, position: number) {
  if (!Number.isInteger(position) || position < 0 || position > source.length) return false;
  const before = source.charCodeAt(position - 1), after = source.charCodeAt(position);
  return !(before >= 0xd800 && before <= 0xdbff && after >= 0xdc00 && after <= 0xdfff);
}

function validateSelection(source: string, selection: StudioCodeSelectionSet) {
  if (!selection || !Array.isArray(selection.ranges) || !selection.ranges.length || selection.ranges.length > maxEdits ||
      !Number.isInteger(selection.mainIndex) || selection.mainIndex < 0 || selection.mainIndex >= selection.ranges.length) return null;
  let previousEnd = -1;
  for (const range of selection.ranges) {
    if (!range || !validBoundary(source, range.anchor) || !validBoundary(source, range.head)) return null;
    const from = Math.min(range.anchor, range.head), to = Math.max(range.anchor, range.head);
    if (from <= previousEnd) return null;
    previousEnd = to;
  }
  return EditorSelection.create(selection.ranges.map(range => EditorSelection.range(range.anchor, range.head)), selection.mainIndex);
}

function validateResult(source: string, originalSelection: EditorSelection, result: StudioCodeFormatResult) {
  if (!result || result.state !== "ready" || !Array.isArray(result.edits) || result.edits.length > maxEdits) return null;
  let previousEnd = -1;
  let previousFrom = -1;
  let length = source.length;
  for (const edit of result.edits) {
    if (!edit || typeof edit.insert !== "string" || !validBoundary(source, edit.from) || !validBoundary(source, edit.to) ||
        edit.to < edit.from || edit.from < previousEnd || edit.from === previousFrom) return null;
    previousFrom = edit.from;
    previousEnd = edit.to;
    length += edit.insert.length - (edit.to - edit.from);
    if (length > maxOutputLength) return null;
  }
  const changes = ChangeSet.of(result.edits, source.length);
  const output = changes.apply(Text.of(source.split("\n"))).toString();
  const selection = validateSelection(output, result.selection ?? selectionSet(originalSelection.map(changes)));
  return selection ? { changes, selection, source: output } : null;
}
