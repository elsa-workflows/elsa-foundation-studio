import React, { useRef } from "react";
import { flushSync } from "react-dom";
import { createRoot } from "react-dom/client";
import { afterEach, describe, expect, it, vi } from "vitest";
import { useDialogFocus } from "../workflow-editor/useDialogFocus";

const cleanups: Array<() => void> = [];

afterEach(() => {
  for (const cleanup of cleanups.splice(0)) cleanup();
  vi.restoreAllMocks();
});

describe("dialog focus management", () => {
  it("does not close for an Escape already handled by a nested control", () => {
    const { container, onEscape } = mountDialog();
    const button = container.querySelector("button")!;
    const handledEscape = new KeyboardEvent("keydown", { key: "Escape", bubbles: true, cancelable: true });
    handledEscape.preventDefault();
    button.dispatchEvent(handledEscape);
    expect(handledEscape.defaultPrevented).toBe(true);
    expect(onEscape).not.toHaveBeenCalled();

    button.dispatchEvent(new KeyboardEvent("keydown", { key: "Escape", bubbles: true, cancelable: true }));
    expect(onEscape).toHaveBeenCalledTimes(1);
  });

  it("focuses the first control, contains Shift+Tab from the dialog itself, handles Escape, and restores the opener", () => {
    const { container, opener, onEscape, unmount } = mountDialog();
    const dialog = container.querySelector<HTMLElement>("[role='dialog']")!;
    const buttons = container.querySelectorAll("button");
    expect(document.activeElement).toBe(buttons[0]);

    dialog.focus();
    dialog.dispatchEvent(new KeyboardEvent("keydown", { key: "Tab", shiftKey: true, bubbles: true }));
    expect(document.activeElement).toBe(buttons[1]);

    window.dispatchEvent(new KeyboardEvent("keydown", { key: "Escape", bubbles: true }));
    expect(onEscape).toHaveBeenCalledTimes(1);

    unmount();
    expect(document.activeElement).toBe(opener);
  });

  it("does not replace focus already placed inside before initial focus runs", () => {
    const { container, runInitialFocus } = mountDialog(true);
    const buttons = container.querySelectorAll("button");
    buttons[1].focus();
    runInitialFocus?.(0);
    expect(document.activeElement).toBe(buttons[1]);
  });
});

function mountDialog(deferInitialFocus = false) {
  let runInitialFocus: FrameRequestCallback | undefined;
  vi.spyOn(window, "requestAnimationFrame").mockImplementation(callback => {
    if (deferInitialFocus) {
      runInitialFocus = callback;
      return 1;
    }
    callback(0);
    return 1;
  });
  vi.spyOn(window, "cancelAnimationFrame").mockImplementation(() => undefined);

  const opener = document.createElement("button");
  const container = document.createElement("div");
  document.body.append(opener, container);
  opener.focus();
  const onEscape = vi.fn();
  const root = createRoot(container);
  let mounted = true;
  const unmount = () => {
    if (!mounted) return;
    mounted = false;
    flushSync(() => root.unmount());
  };

  cleanups.push(() => {
    unmount();
    opener.remove();
    container.remove();
  });
  flushSync(() => root.render(<Dialog onEscape={onEscape} />));

  return { container, opener, onEscape, unmount, runInitialFocus };
}

function Dialog({ onEscape }: { onEscape(): void }) {
  const ref = useRef<HTMLElement>(null);
  useDialogFocus(ref, onEscape);
  return <section ref={ref} role="dialog" tabIndex={-1}><button type="button">Publish</button><button type="button">Cancel</button></section>;
}
