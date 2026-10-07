import React from "react";
import { flushSync } from "react-dom";
import { createRoot } from "react-dom/client";
import { afterEach, describe, expect, it } from "vitest";
import { useSidePanelLayout, type SidePanelLayoutStorageKeys } from "../workflow-editor/useSidePanelLayout";

const cleanups: Array<() => void> = [];
let storageScope = 0;

afterEach(() => {
  for (const cleanup of cleanups.splice(0)) cleanup();
});

describe("side panel layout", () => {
  it.each(["palette", "inspector"] as const)("keeps the maximized %s open when a nested control handles Escape", side => {
    const { container } = mountSidePanelLayout(side);
    const maximizeButton = container.querySelector<HTMLButtonElement>("[data-maximize-panel]")!;
    flushSync(() => maximizeButton.click());

    const handledControl = container.querySelector<HTMLTextAreaElement>("[data-handled-escape]")!;
    const handledEscape = new KeyboardEvent("keydown", { key: "Escape", bubbles: true, cancelable: true });

    flushSync(() => handledControl.dispatchEvent(handledEscape));

    expect(handledEscape.defaultPrevented).toBe(true);
    expect(container.querySelector("[data-maximized-side-panel]")?.textContent).toBe(side);

    const outsideEditor = container.querySelector<HTMLButtonElement>("[data-outside-editor]")!;
    const unhandledEscape = new KeyboardEvent("keydown", { key: "Escape", bubbles: true, cancelable: true });
    flushSync(() => outsideEditor.dispatchEvent(unhandledEscape));

    expect(unhandledEscape.defaultPrevented).toBe(false);
    expect(container.querySelector("[data-maximized-side-panel]")?.textContent).toBe("");
  });
});

function mountSidePanelLayout(side: "palette" | "inspector") {
  const storageKeys = createStorageKeys();
  const container = document.createElement("div");
  document.body.appendChild(container);
  const root = createRoot(container);
  cleanups.push(() => {
    flushSync(() => root.unmount());
    container.remove();
    for (const key of Object.values(storageKeys)) window.localStorage.removeItem(key);
  });
  flushSync(() => root.render(<SidePanelLayoutHarness side={side} storageKeys={storageKeys} />));

  return { container };
}

function createStorageKeys(): SidePanelLayoutStorageKeys {
  const scope = `test-side-panel-layout-${++storageScope}`;
  return {
    paletteWidth: `${scope}-palette-width`,
    inspectorWidth: `${scope}-inspector-width`,
    paletteCollapsed: `${scope}-palette-collapsed`,
    inspectorCollapsed: `${scope}-inspector-collapsed`,
    maximized: `${scope}-maximized`
  };
}

function SidePanelLayoutHarness({ side, storageKeys }: { side: "palette" | "inspector"; storageKeys: SidePanelLayoutStorageKeys }) {
  const layout = useSidePanelLayout(storageKeys);
  return (
    <section>
      <button type="button" data-maximize-panel onClick={() => layout.toggleSidePanelMaximized(side)}>Maximize</button>
      <output data-maximized-side-panel>{layout.maximizedSidePanel ?? ""}</output>
      <textarea aria-label="Nested Escape consumer" data-handled-escape onKeyDown={event => {
        if (event.key === "Escape") event.preventDefault();
      }} />
      <button type="button" data-outside-editor>Outside editor</button>
    </section>
  );
}
