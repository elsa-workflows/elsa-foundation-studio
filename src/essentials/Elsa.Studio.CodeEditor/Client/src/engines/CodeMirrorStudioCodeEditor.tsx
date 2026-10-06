import { acceptCompletion, closeCompletion, completionKeymap, completionStatus, selectedCompletion } from "@codemirror/autocomplete";
import {
  defaultKeymap,
  history,
  historyKeymap,
  indentLess,
  indentMore,
  temporarilySetTabFocusMode,
  toggleTabFocusMode
} from "@codemirror/commands";
import { bracketMatching, foldGutter, indentOnInput, syntaxHighlighting } from "@codemirror/language";
import { Compartment, EditorState, Prec, Transaction } from "@codemirror/state";
import { EditorView, highlightActiveLine, highlightActiveLineGutter, keymap, lineNumbers, type KeyBinding, type ViewUpdate } from "@codemirror/view";
import { useEffect, useLayoutEffect, useRef, useState } from "react";
import { applyCodeMirrorDiagnostics } from "./codeMirrorDiagnostics";
import { collectCodeMirrorSyntaxDiagnostics } from "./codeMirrorSyntaxDiagnostics";
import {
  cancelCodeMirrorIntelligence,
  createCodeMirrorCodeIntelligenceExtensions,
  dismissCodeMirrorIntelligence,
  requestCodeMirrorKeyboardHover,
  returnCodeMirrorFocusForExit
} from "./codeMirrorCodeIntelligence";
import { loadCodeMirrorLanguageExtensions } from "./codeMirrorLanguages";
import {
  getStudioCodeEditorSessionEntry,
  setStudioCodeEditorSessionEntry,
  subscribeToStudioCodeEditorSessionRevocation
} from "../sessions/studioCodeEditorSessions";
import type { StudioCodeDiagnostic, StudioCodeEditorEngineProps } from "../types";
import { studioCodeHighlightStyle } from "./syntaxHighlightStyle";
import { CodeMirrorFormatter } from "./codeMirrorFormatting";

interface CodeMirrorSessionEntry {
  state: EditorState;
  runtime: CodeMirrorRuntime;
  presentation: Compartment;
  editability: Compartment;
  language: Compartment;
}

interface CodeMirrorRuntime {
  props: StudioCodeEditorEngineProps;
  lastEmittedValue?: string;
  tabEscapeArmed?: boolean;
  languageLoadGeneration: number;
  intelligenceGeneration: number;
  formatting?: CodeMirrorFormatter;
}

// Compact fields are mutually exclusive. Parking the outgoing view until React mounts the incoming
// compact field lets us reparent one CodeMirror DOM tree instead of rebuilding an engine on every
// field switch. A microtask disposal still releases it when focus truly leaves the compact surface.
let parkedCompactView: { view: EditorView; disposeTimer: ReturnType<typeof setTimeout> } | undefined;
const activeCodeMirrorViews = new Set<EditorView>();
const formattingControllers = new WeakMap<EditorView, CodeMirrorFormatter>();
let authorizationGeneration = 0;

const codeMirrorBaseTheme = EditorView.theme({
  "&&": {
    background: "var(--studio-surface-muted)",
    border: "1px solid var(--studio-border)",
    borderRadius: "var(--studio-radius-sm)",
    color: "var(--studio-text)",
    fontFamily: "var(--studio-font-mono)",
    inlineSize: "100%"
  },
  "&&:focus-within": {
    outline: "2px solid var(--studio-focus-strong, var(--studio-text))",
    outlineOffset: "2px"
  },
  "& .cm-scroller": {
    fontFamily: "var(--studio-font-mono)"
  },
  "&& .cm-activeLine, && .cm-activeLineGutter": {
    background: "var(--studio-accent-soft)"
  },
  "&& .cm-gutters": {
    background: "var(--studio-surface-muted)",
    borderColor: "var(--studio-border)",
    color: "var(--studio-text-muted)"
  },
  "& .cm-content::selection, & .cm-content ::selection": {
    background: "var(--studio-accent)",
    color: "var(--studio-accent-text)"
  },
  "& .cm-tooltip": {
    background: "var(--studio-surface-raised)",
    border: "1px solid var(--studio-border)",
    boxSizing: "border-box",
    color: "var(--studio-text)",
    maxInlineSize: "min(32rem, calc(100vw - 2rem))",
    overflowWrap: "anywhere",
    whiteSpace: "normal"
  },
  "&& .cm-panels": {
    background: "var(--studio-surface-raised)",
    borderColor: "var(--studio-border)",
    color: "var(--studio-text)"
  },
  "& .cm-panel, & .studio-code-editor-hover": {
    color: "var(--studio-text)",
    maxBlockSize: "min(18rem, 50vh)",
    maxInlineSize: "min(32rem, calc(100vw - 2rem))",
    overflow: "auto",
    overflowWrap: "anywhere",
    whiteSpace: "normal"
  },
  "& .cm-tooltip-autocomplete ul": {
    maxBlockSize: "min(16rem, 40vh)",
    maxInlineSize: "min(32rem, calc(100vw - 2rem))",
    minInlineSize: "0",
    overflow: "auto",
    whiteSpace: "normal"
  },
  "& .cm-tooltip-autocomplete li": {
    overflowWrap: "anywhere",
    textOverflow: "clip",
    whiteSpace: "normal"
  },
  '& .cm-tooltip-autocomplete li[aria-selected="true"]': {
    background: "var(--studio-accent)",
    color: "var(--studio-accent-text)"
  },
  '& .cm-tooltip-autocomplete li[aria-selected="true"] :is(.cm-completionDetail, .cm-completionMatchedText)': {
    color: "inherit"
  },
  "& .cm-completionSection": {
    borderColor: "var(--studio-border)",
    color: "var(--studio-text-muted)"
  },
  "& .cm-tooltip-hover, & .cm-completionInfo": {
    maxBlockSize: "min(18rem, 50vh)",
    maxInlineSize: "min(32rem, calc(100vw - 2rem))",
    overflow: "auto",
    overflowWrap: "anywhere",
    whiteSpace: "normal"
  }
});

const codeMirrorCompactTheme = EditorView.theme({
  "&&&": {
    minBlockSize: "2.25rem"
  },
  "&& .cm-scroller": {
    maxBlockSize: "2.25rem",
    overflow: "hidden"
  }
});

subscribeToStudioCodeEditorSessionRevocation(() => {
  authorizationGeneration++;
  destroyParkedCompactView();
  for (const view of activeCodeMirrorViews) {
    activeCodeMirrorViews.delete(view);
    destroyCodeMirrorView(view);
  }
});

export function CodeMirrorStudioCodeEditor(props: StudioCodeEditorEngineProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const viewRef = useRef<EditorView | undefined>(undefined);
  const entryRef = useRef<CodeMirrorSessionEntry | undefined>(undefined);
  const [formatStatus, setFormatStatus] = useState("");

  const entry = resolveEntry(props);
  if (entryRef.current && entryRef.current !== entry) entryRef.current.runtime.intelligenceGeneration++;
  updateRuntimeProps(entry.runtime, props);
  entryRef.current = entry;

  useLayoutEffect(() => {
    const container = containerRef.current;
    if (!container) return;
    const mountedAuthorizationGeneration = authorizationGeneration;

    const view = claimCompactView(entry, props.profile, container)
      ?? new EditorView({ state: entry.state, parent: container });
    activeCodeMirrorViews.add(view);
    const formatting = new CodeMirrorFormatter(view, () => entry.runtime.props,
      () => activeCodeMirrorViews.has(view) && entryRef.current === entry, setFormatStatus);
    entry.runtime.formatting = formatting;
    formattingControllers.set(view, formatting);
    viewRef.current = view;
    view.dispatch({
      effects: entry.presentation.reconfigure(presentationExtensions(props.profile))
    });
    if (props.autoFocus) view.focus();
    applyDiagnostics(view, entry.runtime.props.diagnostics, entry.runtime.props.grammarProfile);
    void loadLanguageSupport(view, props.document.language, props.grammarProfile, entry);

    return () => {
      formatting.invalidate();
      if (entry.runtime.formatting === formatting) entry.runtime.formatting = undefined;
      cancelCodeMirrorIntelligence(view);
      entry.runtime.tabEscapeArmed = false;
      entry.runtime.languageLoadGeneration++;
      entry.state = view.state;
      setStudioCodeEditorSessionEntry(props.session, props.document.uri, entry);
      if (activeCodeMirrorViews.delete(view)) {
        if (props.profile === "compact" && mountedAuthorizationGeneration === authorizationGeneration) {
          parkCompactView(view);
        } else {
          destroyCodeMirrorView(view);
        }
      }
      viewRef.current = undefined;
    };
  // A session survives profile remounts. A changed URI/session intentionally mounts a new view.
  }, [entry, props.autoFocus, props.document.language, props.document.uri, props.grammarProfile, props.profile, props.session]);

  useLayoutEffect(() => {
    const view = viewRef.current;
    const current = entryRef.current;
    if (!view || !current) return;
    current.runtime.formatting?.invalidate(true);

    if (props.document.value !== view.state.doc.toString() && props.document.value !== current.runtime.lastEmittedValue) {
      view.dispatch({
        changes: { from: 0, to: view.state.doc.length, insert: props.document.value },
        annotations: Transaction.addToHistory.of(false)
      });
    }
    applyDiagnostics(view, props.diagnostics, props.grammarProfile);
  }, [props.document.value, props.document.version, props.diagnostics, props.grammarProfile]);

  useEffect(() => {
    const view = viewRef.current;
    const current = entryRef.current;
    if (!view || !current) return;
    view.dispatch({
      effects: current.editability.reconfigure(editabilityExtensions(props.readOnly, props.ariaLabel))
    });
  }, [props.ariaLabel, props.readOnly]);

  useLayoutEffect(() => {
    entry.runtime.formatting?.invalidate(true);
  }, [entry, props.document.version, props.loadFormatter, props.readOnly]);

  useLayoutEffect(() => {
    const view = viewRef.current;
    if (!view) return;
    entryRef.current?.runtime.formatting?.invalidate(true);
    const focused = view.dom.ownerDocument.activeElement;
    if (focused && view.dom.querySelector(".studio-code-editor-signature")?.contains(focused)) view.focus();
    cancelCodeMirrorIntelligence(view);
    closeCompletion(view);
    // Signature help is selection-driven. Re-dispatch the current selection when a delayed
    // authoring context replaces the initial local-only providers so the visible document can
    // immediately acquire the newly available signature.
    view.dispatch({ selection: view.state.selection });
  }, [props.completionProvider, props.completions, props.document.value, props.document.version, props.hoverProvider, props.signatureProvider]);

  return (
    <>
      {props.loadFormatter ? <div className="studio-code-editor-actions">
        <button type="button" disabled={props.readOnly} onClick={() => void entry.runtime.formatting?.request()}
          onKeyDown={event => {
            const view = viewRef.current;
            if (event.key !== "Escape" || !view) return;
            event.preventDefault();
            event.stopPropagation();
            entry.runtime.formatting?.invalidate();
            returnCodeMirrorFocusForExit(view);
          }}
          aria-label="Format source" title="Format source (Alt Shift F)">Format</button>
        <span role="status" aria-live="polite">{formatStatus}</span>
      </div> : null}
      <div
        ref={containerRef}
        aria-label={props.ariaLabel}
        className={`studio-code-editor-rich studio-code-editor-rich-${props.profile}`}
        data-profile={props.profile}
        data-theme={props.theme}
        style={{ minHeight: props.minHeight }}
      />
    </>
  );
}

function claimCompactView(entry: CodeMirrorSessionEntry, profile: StudioCodeEditorEngineProps["profile"], container: HTMLElement) {
  if (profile !== "compact" || !parkedCompactView) return undefined;
  const { view, disposeTimer } = parkedCompactView;
  clearTimeout(disposeTimer);
  parkedCompactView = undefined;
  // Always install the target entry before reparenting. This replaces document, history, language
  // extensions and event handlers together, so a parked view can never expose the previous field.
  view.setState(entry.state);
  container.append(view.dom);
  return view;
}

function parkCompactView(view: EditorView) {
  cancelCodeMirrorIntelligence(view);
  if (parkedCompactView) {
    clearTimeout(parkedCompactView.disposeTimer);
    destroyCodeMirrorView(parkedCompactView.view);
  }
  // Detach instead of hiding the DOM: no unfocused field retains a mounted rich editor, while a
  // same-turn or near-immediate field activation can reuse the already initialized engine.
  view.dom.remove();
  const disposeTimer = setTimeout(() => {
    if (parkedCompactView?.view !== view) return;
    parkedCompactView = undefined;
    destroyCodeMirrorView(view);
  }, 1_000);
  parkedCompactView = { view, disposeTimer };
}

export function destroyParkedCompactView() {
  if (!parkedCompactView) return;
  clearTimeout(parkedCompactView.disposeTimer);
  destroyCodeMirrorView(parkedCompactView.view);
  parkedCompactView = undefined;
}

function destroyCodeMirrorView(view: EditorView) {
  // CodeMirror's destroy releases editor resources but intentionally leaves its DOM in place.
  // Removing it first guarantees source disappears synchronously on authorization revocation.
  formattingControllers.get(view)?.invalidate();
  formattingControllers.delete(view);
  cancelCodeMirrorIntelligence(view);
  view.dom.remove();
  view.destroy();
}

function resolveEntry(props: StudioCodeEditorEngineProps): CodeMirrorSessionEntry {
  const existing = getStudioCodeEditorSessionEntry<CodeMirrorSessionEntry>(props.session, props.document.uri);
  if (existing) {
    if (props.document.value !== existing.state.doc.toString() &&
        props.document.value !== existing.runtime.lastEmittedValue) {
      existing.state = existing.state.update({
        changes: { from: 0, to: existing.state.doc.length, insert: props.document.value },
        annotations: Transaction.addToHistory.of(false)
      }).state;
    }
    return existing;
  }

  const runtime: CodeMirrorRuntime = { props, languageLoadGeneration: 0, intelligenceGeneration: 0 };
  const presentation = new Compartment();
  const editability = new Compartment();
  const language = new Compartment();
  const entry = {} as CodeMirrorSessionEntry;
  const state = EditorState.create({
      doc: props.document.value,
      extensions: [
        history(),
        presentation.of(presentationExtensions(props.profile)),
        editability.of(editabilityExtensions(props.readOnly, props.ariaLabel)),
        language.of([]),
        indentOnInput(),
        bracketMatching(),
        syntaxHighlighting(studioCodeHighlightStyle, { fallback: true }),
        Prec.highest(keymap.of(editorKeymap(runtime))),
        createCodeMirrorCodeIntelligenceExtensions({
          document: props.document,
          completionProvider: request => runCurrentIntelligence(runtime, request.signal, () => runtime.props.completionProvider
            ? runtime.props.completionProvider({ ...request, document: { ...runtime.props.document, value: request.document.value } })
            : runtime.props.completions ?? null),
          hoverProvider: (document, position, signal) => runCurrentIntelligence(runtime, signal,
            () => runtime.props.hoverProvider?.({ ...runtime.props.document, value: document.value }, position, signal) ?? null),
          signatureProvider: (document, position, signal) => runCurrentIntelligence(runtime, signal,
            () => runtime.props.signatureProvider?.({ ...runtime.props.document, value: document.value }, position, signal) ?? null)
        }),
        EditorView.domEventHandlers({
          focus: () => {
            runtime.props.onFocus?.();
            return false;
          },
          blur: () => {
            runtime.tabEscapeArmed = false;
            runtime.props.onBlur?.();
            return false;
          },
          keydown: event => {
            if (event.key !== "Escape" && event.key !== "Tab") runtime.tabEscapeArmed = false;
            return false;
          }
        }),
        EditorView.updateListener.of(update => handleUpdate(update, entry))
      ]
    });
  entry.runtime = runtime;
  entry.state = state;
  entry.presentation = presentation;
  entry.editability = editability;
  entry.language = language;
  setStudioCodeEditorSessionEntry(props.session, props.document.uri, entry);
  return entry;
}

function updateRuntimeProps(runtime: CodeMirrorRuntime, props: StudioCodeEditorEngineProps) {
  const previous = runtime.props;
  // Invalidate responses at render time, before passive cleanup can run. Equal-source ABA and
  // changed authority must not briefly publish old metadata between commit and that cleanup.
  if (previous.document.uri !== props.document.uri || previous.document.language !== props.document.language ||
      previous.document.version !== props.document.version || previous.document.value !== props.document.value ||
      previous.session !== props.session || previous.readOnly !== props.readOnly || previous.grammarProfile !== props.grammarProfile ||
      previous.completionProvider !== props.completionProvider || previous.completions !== props.completions ||
      previous.hoverProvider !== props.hoverProvider || previous.signatureProvider !== props.signatureProvider) runtime.intelligenceGeneration++;
  runtime.props = props;
}

async function runCurrentIntelligence<T>(runtime: CodeMirrorRuntime, signal: AbortSignal, request: () => T | Promise<T>): Promise<T | null> {
  const generation = runtime.intelligenceGeneration;
  const result = await request();
  return signal.aborted || runtime.intelligenceGeneration !== generation ? null : result;
}

function presentationExtensions(profile: StudioCodeEditorEngineProps["profile"]) {
  return [
    codeMirrorBaseTheme,
    ...(profile === "expanded"
      ? [lineNumbers(), foldGutter(), highlightActiveLineGutter(), highlightActiveLine()]
      : [codeMirrorCompactTheme])
  ];
}

function editabilityExtensions(readOnly: boolean, ariaLabel: string) {
  return [
    EditorView.editable.of(!readOnly),
    EditorState.readOnly.of(readOnly),
    EditorView.contentAttributes.of({
      "aria-label": ariaLabel,
      "aria-readonly": String(readOnly)
    })
  ];
}

function editorKeymap(runtime: CodeMirrorRuntime): KeyBinding[] {
  const standard = [...completionKeymap, ...defaultKeymap, ...historyKeymap, { key: "Ctrl-m", run: toggleTabFocusMode }];
  const hoverHelp = ["Ctrl-Shift-h", "F1", "Alt-i"].map(key => ({
    key,
    run: (view: EditorView) => {
      if (!runtime.props.hoverProvider) return false;
      void requestCodeMirrorKeyboardHover(view, {
        document: runtime.props.document,
        hoverProvider: (document, position, signal) => runCurrentIntelligence(runtime, signal,
          () => runtime.props.hoverProvider?.(document, position, signal) ?? null)
      });
      return true;
    }
  }));
  return [
    ...hoverHelp,
    {
      key: "Alt-Shift-f",
      run: () => {
        if (!runtime.props.loadFormatter || runtime.props.readOnly || !runtime.formatting) return false;
        void runtime.formatting.request();
        return true;
      }
    },
    {
      key: "Enter",
      run: view => {
        if (acceptCompletion(view)) return true;
        // CodeMirror blocks acceptance during its interaction delay and while a query is pending.
        // Keep the visible selection in place instead of expanding compact mode or inserting a newline.
        if (selectedCompletion(view.state) || completionStatus(view.state) === "pending") return true;
        return runtime.props.profile === "compact" ? requestExpansion(runtime) : false;
      }
    },
    {
      key: "Escape",
      run: view => {
        if (dismissCodeMirrorIntelligence(view)) return true;
        runtime.tabEscapeArmed = true;
        return temporarilySetTabFocusMode(view);
      }
    },
    {
      key: "Tab",
      run: view => {
        if (runtime.tabEscapeArmed) {
          runtime.tabEscapeArmed = false;
          return false;
        }
        return indentMore(view);
      }
    },
    {
      key: "Shift-Tab",
      run: indentLess
    },
    ...standard.filter(binding => binding.key !== "Tab" && binding.key !== "Shift-Tab")
  ];
}

function handleUpdate(update: ViewUpdate, entry: CodeMirrorSessionEntry) {
  entry.state = update.state;
  const { runtime } = entry;
  if (update.docChanged || update.selectionSet) runtime.formatting?.invalidate(
    !update.docChanged && update.startState.selection.eq(update.state.selection));
  if (!update.docChanged) return;

  let insertedNewline = false;
  update.changes.iterChanges((_fromA, _toA, _fromB, _toB, inserted) => {
    insertedNewline ||= inserted.toString().includes("\n");
  });
  const document = { ...runtime.props.document, value: update.state.doc.toString() };
  runtime.lastEmittedValue = document.value;
  runtime.props.onChange(document);
  if (insertedNewline) {
    runtime.props.onNewline?.();
    if (runtime.props.profile === "compact") runtime.props.onExpand?.();
  }
}

function requestExpansion(runtime: CodeMirrorRuntime) {
  runtime.props.onExpand?.();
  return true;
}

async function loadLanguageSupport(
  view: EditorView,
  language: string,
  grammarProfile: StudioCodeEditorEngineProps["grammarProfile"],
  entry: CodeMirrorSessionEntry
) {
  const generation = ++entry.runtime.languageLoadGeneration;
  const extensions = await loadCodeMirrorLanguageExtensions(language, grammarProfile);
  if (generation !== entry.runtime.languageLoadGeneration) return;
  try {
    view.dispatch({ effects: entry.language.reconfigure(extensions) });
    applyDiagnostics(view, entry.runtime.props.diagnostics, entry.runtime.props.grammarProfile);
  } catch {
    // The component was unmounted while the optional language chunk was loading.
  }
}

function applyDiagnostics(view: EditorView, diagnostics: StudioCodeDiagnostic[], grammarProfile: StudioCodeEditorEngineProps["grammarProfile"]) {
  applyCodeMirrorDiagnostics(view, [
    ...diagnostics,
    ...collectCodeMirrorSyntaxDiagnostics(view.state, grammarProfile)
  ]);
}
