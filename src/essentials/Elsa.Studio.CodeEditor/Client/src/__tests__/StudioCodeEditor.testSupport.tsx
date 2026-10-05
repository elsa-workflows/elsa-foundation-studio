import { flushSync } from "react-dom";
import { createRoot } from "react-dom/client";
import { afterAll, afterEach, beforeAll, beforeEach, vi } from "vitest";
import { StudioCodeEditor } from "../StudioCodeEditor";
import type { StudioCodeDocument, StudioCodeEditorProps } from "../types";

const mountedEditors = new Set<() => void>();
const rangeGetClientRects = Object.getOwnPropertyDescriptor(Range.prototype, "getClientRects");

export function setupStudioCodeEditorTestLifecycle() {
  afterEach(() => {
    for (const unmount of mountedEditors) unmount();
    window.dispatchEvent(new Event("elsa:auth-session-ended"));
    vi.unstubAllGlobals();
  });

  beforeEach(() => {
    window.dispatchEvent(new Event("elsa:auth-session-started"));
  });

  beforeAll(() => Object.defineProperty(Range.prototype, "getClientRects", {
    configurable: true,
    value: () => [] as unknown as DOMRectList
  }));

  afterAll(() => {
    if (rangeGetClientRects) Object.defineProperty(Range.prototype, "getClientRects", rangeGetClientRects);
    else Reflect.deleteProperty(Range.prototype, "getClientRects");
  });
}

export function renderEditor(props: Partial<StudioCodeEditorProps> = {}) {
  const host = document.createElement("div");
  document.body.appendChild(host);
  const root = createRoot(host);
  const defaultProps: StudioCodeEditorProps = {
    document: codeDocument(),
    ariaLabel: "Global JavaScript function",
    onChange: vi.fn()
  };

  const render = (nextProps: Partial<StudioCodeEditorProps>) => {
    flushSync(() => root.render(<StudioCodeEditor {...defaultProps} {...nextProps} />));
  };
  render(props);

  const unmount = () => {
    if (!mountedEditors.delete(unmount)) return;
    flushSync(() => root.unmount());
    host.remove();
  };
  mountedEditors.add(unmount);

  return { container: host, rerender: render, unmount };
}

export function editorInput(container: HTMLElement) {
  return container.querySelector<HTMLTextAreaElement>(".studio-code-editor-input")!;
}

export async function activateRichEditor(container: HTMLElement, profile: "compact" | "expanded") {
  if (profile === "compact") click(container.querySelector<HTMLButtonElement>(".studio-code-editor-preview")!);
  await waitFor(() => !!container.querySelector<HTMLElement>(".cm-content"));
  return container.querySelector<HTMLElement>(".cm-content")!;
}

export function fill(element: HTMLTextAreaElement, value: string) {
  flushSync(() => {
    const valueSetter = Object.getOwnPropertyDescriptor(HTMLTextAreaElement.prototype, "value")?.set;
    valueSetter?.call(element, value);
    element.dispatchEvent(new Event("input", { bubbles: true }));
  });
}

export function click(element: HTMLElement) {
  flushSync(() => element.dispatchEvent(new MouseEvent("click", { bubbles: true })));
}

export function key(element: HTMLElement, value: string, init: KeyboardEventInit = {}) {
  const keyCode = value === "Escape" ? 27 : value === "Tab" ? 9 : 0;
  const event = new KeyboardEvent("keydown", { key: value, keyCode, bubbles: true, cancelable: true, ...init });
  element.dispatchEvent(event);
  return event;
}

export function codeDocument(overrides: Partial<StudioCodeDocument> = {}): StudioCodeDocument {
  return {
    uri: "elsa://functions/global.js",
    language: "javascript",
    value: "return total;",
    ...overrides
  };
}

export async function waitFor(predicate: () => boolean) {
  for (let i = 0; i < 200; i++) {
    if (predicate()) return;
    await new Promise(resolve => setTimeout(resolve, 5));
    flushSync(() => {});
  }
  throw new Error("Timed out waiting for predicate.");
}

export async function settleReactUpdates() {
  await new Promise(resolve => setTimeout(resolve, 0));
  flushSync(() => {});
}
