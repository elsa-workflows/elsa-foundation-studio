import { autocompletion, closeCompletion, completionStatus, insertCompletionText, pickedCompletion, snippetCompletion, type Completion, type CompletionSource } from "@codemirror/autocomplete";
import { temporarilySetTabFocusMode } from "@codemirror/commands";
import { StateEffect, StateField, type Extension } from "@codemirror/state";
import { EditorView, hoverTooltip, panels, showPanel, ViewPlugin, type Panel, type ViewUpdate } from "@codemirror/view";
import { sanitizeStudioCodeMarkdown } from "../StudioCodeDocumentation";
import type {
  StudioCodeCompletion,
  StudioCodeCompletionProvider,
  StudioCodeDocument,
  StudioCodeHover,
  StudioCodeHoverProvider,
  StudioCodeSignature,
  StudioCodeSignatureInfo,
  StudioCodeSignatureProvider
} from "../types";

export interface StudioCodeIntelligenceOptions {
  document: StudioCodeDocument;
  completions?: StudioCodeCompletion[];
  completionProvider?: StudioCodeCompletionProvider;
  hoverProvider?: StudioCodeHoverProvider;
  signatureProvider?: StudioCodeSignatureProvider;
}

const completionRequestSets = new WeakMap<EditorView, Set<AbortController>>();

/** Translates the public, engine-neutral intelligence contract into CodeMirror extensions. */
export function createCodeMirrorCodeIntelligenceExtensions(options: StudioCodeIntelligenceOptions): Extension[] {
  const completionRequests = new Set<AbortController>();
  const completionSource = createCompletionSource(options, completionRequests);
  const extensions: Extension[] = [
    autocompletion({ override: [completionSource] }),
    ViewPlugin.fromClass(class {
      constructor(private readonly view: EditorView) {
        completionRequestSets.set(view, completionRequests);
      }

      destroy() {
        for (const controller of completionRequests) controller.abort();
        completionRequests.clear();
        completionRequestSets.delete(this.view);
      }
    })
  ];

  if (options.hoverProvider) {
    extensions.push(hoverTooltip((view, position) => {
      const controller = new AbortController();
      trackPointerHoverRequest(view, controller);
      const source = view.state.doc.toString();
      return Promise.resolve(options.hoverProvider!({ ...options.document, value: view.state.doc.toString() }, position, controller.signal))
        .then(hover => {
          if (!hover || controller.signal.aborted || view.state.doc.toString() !== source) return null;
          const dom = document.createElement("div");
          dom.className = "studio-code-editor-hover";
          dom.textContent = sanitizeStudioCodeMarkdown(hover.documentation.markdown);
          return {
            pos: hover.range?.from ?? position,
            end: hover.range?.to ?? position,
            above: true,
            create: () => ({ dom })
          };
        })
        .catch(() => null)
        .finally(() => untrackPointerHoverRequest(view, controller));
    }));
    extensions.push(...createKeyboardHoverExtensions());
  }

  if (options.signatureProvider) {
    extensions.push(...createSignatureHelpExtensions(options));
  }

  return extensions;
}

const setKeyboardHover = StateEffect.define<StudioCodeHover | null>();
const keyboardHoverField = StateField.define<StudioCodeHover | null>({
  create: () => null,
  update(value, transaction) {
    for (const effect of transaction.effects) if (effect.is(setKeyboardHover)) return effect.value;
    return transaction.docChanged || transaction.selection ? null : value;
  },
  provide: field => showPanel.from(field, hover => hover ? createKeyboardHoverPanel(hover) : null)
});
const keyboardHoverRequests = new WeakMap<EditorView, AbortController>();
const pointerHoverRequests = new WeakMap<EditorView, Set<AbortController>>();

function trackPointerHoverRequest(view: EditorView, controller: AbortController) {
  const requests = pointerHoverRequests.get(view) ?? new Set<AbortController>();
  requests.add(controller);
  pointerHoverRequests.set(view, requests);
}

function untrackPointerHoverRequest(view: EditorView, controller: AbortController) {
  const requests = pointerHoverRequests.get(view);
  if (!requests) return;
  requests.delete(controller);
  if (requests.size === 0) pointerHoverRequests.delete(view);
}

function createKeyboardHoverExtensions(): Extension[] {
  return [
    panels(),
    keyboardHoverField
  ];
}

export async function requestCodeMirrorKeyboardHover(
  view: EditorView,
  options: StudioCodeIntelligenceOptions
) {
  keyboardHoverRequests.get(view)?.abort();
  const controller = new AbortController();
  keyboardHoverRequests.set(view, controller);
  const source = view.state.doc.toString();
  try {
    const hover = await options.hoverProvider!(
      { ...options.document, value: source },
      view.state.selection.main.head,
      controller.signal
    );
    if (controller.signal.aborted || view.state.doc.toString() !== source) return;
    view.dispatch({ effects: setKeyboardHover.of(hover) });
  } catch {
    if (!controller.signal.aborted) {
      try {
        view.dispatch({ effects: setKeyboardHover.of(null) });
      } catch {
        // The editor was destroyed while the request was in flight.
      }
    }
  } finally {
    if (keyboardHoverRequests.get(view) === controller) keyboardHoverRequests.delete(view);
  }
}

function createKeyboardHoverPanel(hover: StudioCodeHover) {
  return () => {
    const dom = document.createElement("div");
    dom.className = "studio-code-editor-hover studio-code-editor-keyboard-hover";
    dom.setAttribute("role", "status");
    dom.setAttribute("aria-live", "polite");
    dom.setAttribute("aria-label", "Hover information");
    dom.textContent = sanitizeStudioCodeMarkdown(hover.documentation.markdown);
    return { dom, top: false };
  };
}

const setSignature = StateEffect.define<StudioCodeSignature | null>();
const signatureHelpRequests = new WeakMap<EditorView, AbortController>();
const selectedSignatures = new WeakMap<EditorView, { identity: string; index: number }>();
const signatureField = StateField.define<StudioCodeSignature | null>({
  create: () => null,
  update(value, transaction) {
    for (const effect of transaction.effects) if (effect.is(setSignature)) return effect.value;
    return transaction.docChanged || transaction.selection !== undefined ? null : value;
  },
  provide: field => showPanel.from(field, signature => signature ? signaturePanel : null)
});

const signaturePanel = (view: EditorView): Panel => {
  const dom = document.createElement("div");
  dom.className = "studio-code-editor-signature";
  dom.setAttribute("role", "status");
  dom.setAttribute("aria-live", "polite");
  const label = document.createElement("span");
  label.className = "studio-code-editor-signature-label";
  const documentation = document.createElement("span");
  documentation.className = "studio-code-editor-signature-documentation";
  const parameter = document.createElement("div");
  parameter.className = "studio-code-editor-signature-parameter";
  const navigation = document.createElement("div");
  navigation.className = "studio-code-editor-signature-navigation";
  const previous = document.createElement("button");
  previous.type = "button";
  previous.className = "studio-code-editor-signature-previous";
  previous.setAttribute("aria-label", "Previous signature");
  previous.textContent = "Previous";
  const count = document.createElement("span");
  count.className = "studio-code-editor-signature-count";
  const next = document.createElement("button");
  next.type = "button";
  next.className = "studio-code-editor-signature-next";
  next.setAttribute("aria-label", "Next signature");
  next.textContent = "Next";
  navigation.append(previous, count, next);
  dom.append(label, documentation, parameter, navigation);

  const move = (delta: number) => moveSignature(view, delta);
  previous.addEventListener("click", () => move(-1));
  next.addEventListener("click", () => move(1));
  navigation.addEventListener("keydown", event => {
    if (event.key === "Escape") {
      event.preventDefault();
      event.stopPropagation();
      returnCodeMirrorFocusForExit(view);
      return;
    }
    if (event.key !== "ArrowLeft" && event.key !== "ArrowRight") return;
    event.preventDefault();
    move(event.key === "ArrowLeft" ? -1 : 1);
  });

  const panel: Panel = {
    dom,
    top: false,
    update: () => renderSignaturePanel(view, { label, documentation, parameter, navigation, previous, count, next })
  };
  renderSignaturePanel(view, { label, documentation, parameter, navigation, previous, count, next });
  return panel;
};

interface SignaturePanelElements {
  label: HTMLSpanElement;
  documentation: HTMLSpanElement;
  parameter: HTMLDivElement;
  navigation: HTMLDivElement;
  previous: HTMLButtonElement;
  count: HTMLSpanElement;
  next: HTMLButtonElement;
}

function createSignatureHelpExtensions(options: StudioCodeIntelligenceOptions): Extension[] {
  return [
    panels(),
    signatureField,
    ViewPlugin.fromClass(class {
      constructor(private readonly view: EditorView) {
        void this.refresh(view);
      }

      update(update: ViewUpdate) {
        if (update.docChanged || update.selectionSet) void this.refresh(update.view);
      }

      destroy() {
        const controller = signatureHelpRequests.get(this.view);
        controller?.abort();
        signatureHelpRequests.delete(this.view);
        selectedSignatures.delete(this.view);
      }

      private async refresh(view: EditorView) {
        signatureHelpRequests.get(view)?.abort();
        const controller = new AbortController();
        signatureHelpRequests.set(view, controller);
        const source = view.state.doc.toString();
        const position = view.state.selection.main.head;
        try {
          const signature = await options.signatureProvider!(
            { ...options.document, value: source },
            position,
            controller.signal
          );
          if (controller.signal.aborted || signatureHelpRequests.get(view) !== controller ||
              view.state.doc.toString() !== source || view.state.selection.main.head !== position) return;
          const normalized = normalizeSignature(signature);
          if (!normalized) {
            view.dispatch({ effects: setSignature.of(null) });
            return;
          }
          const identity = signatureCatalogKey(options.document, normalized);
          const remembered = selectedSignatures.get(view);
          const selectedIndex = remembered?.identity === identity ? remembered.index : normalized.activeSignature ?? 0;
          const selected = selectSignature(normalized, selectedIndex);
          selectedSignatures.set(view, { identity, index: selected.activeSignature ?? 0 });
          view.dispatch({ effects: setSignature.of(selected) });
        } catch {
          if (!controller.signal.aborted && signatureHelpRequests.get(view) === controller) {
            view.dispatch({ effects: setSignature.of(null) });
          }
        } finally {
          if (signatureHelpRequests.get(view) === controller) signatureHelpRequests.delete(view);
        }
      }
    })
  ];
}

function renderSignaturePanel(view: EditorView, elements: SignaturePanelElements) {
  const signature = view.state.field(signatureField, false);
  if (!signature) return;
  const signatures = signature.signatures;
  const index = signature.activeSignature ?? 0;
  const selected = signatures?.[index] ?? signature;
  elements.label.textContent = selected.label;
  elements.documentation.textContent = selected.documentation
    ? sanitizeStudioCodeMarkdown(selected.documentation.markdown)
    : "";
  const activeParameter = validActiveParameter(selected);
  const parameterInfo = activeParameter === undefined ? undefined : selected.parameters?.[activeParameter];
  elements.parameter.textContent = parameterInfo
    ? parameterInfo.documentation
      ? `${parameterInfo.name} — ${sanitizeStudioCodeMarkdown(parameterInfo.documentation)}`
      : parameterInfo.name
    : "";
  const count = signatures?.length ?? 1;
  const hasNavigation = count > 1;
  elements.navigation.hidden = !hasNavigation;
  // Native disabled buttons drop focus in Chromium and would release compact editing.
  // Keep the same focusable controls; the bounded move handler makes unavailable actions no-ops.
  elements.previous.setAttribute("aria-disabled", String(index <= 0));
  elements.next.setAttribute("aria-disabled", String(index >= count - 1));
  elements.count.textContent = `${index + 1} of ${count}`;
}

function moveSignature(view: EditorView, delta: number) {
  const current = view.state.field(signatureField, false);
  if (!current) return;
  const signatures = current.signatures;
  if (!signatures || signatures.length < 2) return;
  const index = current.activeSignature ?? 0;
  const nextIndex = Math.max(0, Math.min(signatures.length - 1, index + delta));
  if (nextIndex === index) return;
  const selected = selectSignature(current, nextIndex);
  selectedSignatures.set(view, {
    identity: selectedSignatures.get(view)?.identity ?? "",
    index: nextIndex
  });
  view.dispatch({ effects: setSignature.of(selected) });
}

function normalizeSignature(signature: StudioCodeSignature | null): StudioCodeSignature | null {
  if (!signature) return null;
  if (signature.signatures && signature.signatures.length === 0) return null;
  const signatures = signature.signatures?.map(normalizeSignatureInfo);
  const activeSignature = signatures
    ? Number.isInteger(signature.activeSignature) && signature.activeSignature! >= 0 && signature.activeSignature! < signatures.length
      ? signature.activeSignature
      : 0
    : undefined;
  const selected = signatures?.[activeSignature ?? 0] ?? normalizeSignatureInfo(signature);
  return {
    ...selected,
    ...(signatures ? { signatures, activeSignature } : {}),
    ...(signature.callableId === undefined ? {} : { callableId: signature.callableId })
  };
}

function normalizeSignatureInfo(signature: StudioCodeSignatureInfo): StudioCodeSignatureInfo {
  const activeParameter = validActiveParameter(signature);
  return {
    label: signature.label,
    parameters: signature.parameters,
    returnShapeId: signature.returnShapeId,
    documentation: signature.documentation,
    ...(activeParameter === undefined ? {} : { activeParameter })
  };
}

function validActiveParameter(signature: StudioCodeSignatureInfo) {
  return Number.isInteger(signature.activeParameter) && signature.activeParameter! >= 0 &&
    signature.activeParameter! < (signature.parameters?.length ?? 0)
    ? signature.activeParameter
    : undefined;
}

function selectSignature(signature: StudioCodeSignature, index: number): StudioCodeSignature {
  const signatures = signature.signatures;
  if (!signatures?.length) return signature;
  const selectedIndex = Math.max(0, Math.min(signatures.length - 1, Number.isInteger(index) ? index : 0));
  const selected = signatures[selectedIndex]!;
  return {
    ...selected,
    signatures,
    activeSignature: selectedIndex,
    ...(signature.callableId === undefined ? {} : { callableId: signature.callableId })
  };
}

function signatureCatalogKey(document: Pick<StudioCodeDocument, "uri" | "language">, signature: StudioCodeSignature) {
  const infos = signature.signatures ?? [normalizeSignatureInfo(signature)];
  return JSON.stringify([
    document.uri,
    document.language,
    signature.callableId ?? signature.label,
    infos.map(info => ({
      label: info.label,
      documentation: info.documentation?.markdown,
      returnShapeId: info.returnShapeId,
      parameters: info.parameters?.map(parameter => ({
        name: parameter.name,
        documentation: parameter.documentation,
        shapeId: parameter.shapeId,
        optional: parameter.optional
      }))
    }))
  ]);
}

/** Returns an internal action's focus to the editor and lets the next native Tab leave. */
export function returnCodeMirrorFocusForExit(view: EditorView) {
  dismissCodeMirrorIntelligence(view);
  view.focus();
  temporarilySetTabFocusMode(view);
}

/** Dismisses completion, keyboard-hover, or signature UI before Escape arms Tab-focus escape. */
export function dismissCodeMirrorIntelligence(view: EditorView) {
  const completion = completionStatus(view.state);
  if (completion) closeCompletion(view);
  // A pending query has no visible UI to dismiss. Cancel it so it cannot reopen after Escape,
  // but still let this Escape arm keyboard focus exit.
  let dismissed = completion === "active";
  const keyboardHoverRequest = keyboardHoverRequests.get(view);
  if (keyboardHoverRequest) {
    keyboardHoverRequest.abort();
    keyboardHoverRequests.delete(view);
    dismissed = true;
  }
  const signatureHelpRequest = signatureHelpRequests.get(view);
  if (signatureHelpRequest) {
    signatureHelpRequest.abort();
    signatureHelpRequests.delete(view);
  }
  const effects: StateEffect<unknown>[] = [];
  if (view.state.field(keyboardHoverField, false)) {
    effects.push(setKeyboardHover.of(null));
    dismissed = true;
  }
  if (view.state.field(signatureField, false)) {
    effects.push(setSignature.of(null));
    selectedSignatures.delete(view);
    dismissed = true;
  }
  if (effects.length > 0) view.dispatch({ effects });
  return dismissed;
}

/** Cancels every source-bearing request owned by a view before it is destroyed or revoked. */
export function cancelCodeMirrorIntelligence(view: EditorView) {
  for (const controller of completionRequestSets.get(view) ?? []) controller.abort();
  completionRequestSets.delete(view);
  if (completionStatus(view.state)) closeCompletion(view);
  keyboardHoverRequests.get(view)?.abort();
  keyboardHoverRequests.delete(view);
  signatureHelpRequests.get(view)?.abort();
  signatureHelpRequests.delete(view);
  selectedSignatures.delete(view);
  if (view.state.field(signatureField, false)) {
    try {
      view.dispatch({ effects: setSignature.of(null) });
    } catch {
      // The view may already be in teardown; its state field is about to disappear.
    }
  }
  for (const controller of pointerHoverRequests.get(view) ?? []) controller.abort();
  pointerHoverRequests.delete(view);
}

function createCompletionSource(
  options: StudioCodeIntelligenceOptions,
  completionRequests: Set<AbortController>
): CompletionSource {
  return context => {
    const word = context.matchBefore(/[\p{L}\p{Nd}_$]*/u);
    if (!word && !context.explicit) return null;
    const defaultFrom = word?.from ?? context.pos;
    const controller = new AbortController();
    completionRequests.add(controller);
    context.addEventListener("abort", () => controller.abort(), { onDocChange: true });
    const document = { ...options.document, value: context.state.doc.toString() };
    const supplied = options.completionProvider ? Promise.resolve(options.completionProvider({
      document,
      position: context.pos,
      explicit: context.explicit,
      signal: controller.signal
    })).catch(() => options.completions) : Promise.resolve(options.completions);
    // Only explicit expression-profile sources participate, never the program grammar's
    // generic autocomplete sources (which include snippets and ambient assumptions).
    const local = context.state.languageDataAt<CompletionSource>("studioExpressionCompletion", context.pos)
      .map(source => Promise.resolve().then(() => source(context)).catch(() => null));
    return Promise.all([supplied, Promise.all(local)])
      .then(([authorized, results]) => {
        if (controller.signal.aborted || context.aborted) return null;
        const replacement = authorized?.find(item => item.range)?.range;
        const from = replacement?.from ?? defaultFrom;
        const replacementTo = replacement?.to ?? context.pos;
        const suffixLength = Math.max(0, replacementTo - context.pos);
        const to = suffixLength ? context.pos : replacementTo;
        const merged = new Map<string, Completion>();
        for (const result of results) {
          if (result?.from !== defaultFrom) continue;
          for (const item of result.options) merged.set(item.label, item);
        }
        // Authoritative documentation/application wins collisions with syntax-only help.
        // Only explicitly ranged authority owns the suffix; local help keeps its prefix span.
        for (const item of authorized ?? []) {
          const completion = toCodeMirrorCompletion(item);
          const apply = completion.apply ?? completion.label;
          merged.set(item.label, suffixLength && item.range ? {
            ...completion,
            apply: (view, selected, applyFrom, applyTo) => {
              if (typeof apply === "function") apply(view, selected, applyFrom, applyTo + suffixLength);
              else view.dispatch({
                ...insertCompletionText(view.state, apply, applyFrom, applyTo + suffixLength),
                annotations: pickedCompletion.of(selected)
              });
            }
          } satisfies Completion : completion);
        }
        if (!merged.size) return null;
        const completions = [...merged.values()];
        if (!suffixLength) return { from, to, options: completions, validFor: /^[\p{L}\p{Nd}_$]*$/u };

        // CodeMirror filters the result's from/to text, so filter only the cursor prefix.
        // Application still replaces the full parser token, including its untyped suffix.
        // Requery after every document edit instead of reusing position-dependent apply closures.
        return {
          from,
          to,
          map: () => null,
          options: completions
        };
      })
      .finally(() => completionRequests.delete(controller));
  };
}

function toCodeMirrorCompletion(completion: StudioCodeCompletion) {
  const item = {
    label: completion.label,
    detail: completion.detail,
    type: completion.kind,
    apply: completion.apply,
    boost: completion.boost,
    info: completion.documentation
      ? () => {
          const dom = document.createElement("div");
          dom.className = "studio-code-editor-completion-documentation";
          dom.textContent = sanitizeStudioCodeMarkdown(completion.documentation!.markdown);
          return dom;
        }
      : undefined
  };
  return completion.snippet && completion.apply
    ? snippetCompletion(completion.apply, item)
    : item;
}
