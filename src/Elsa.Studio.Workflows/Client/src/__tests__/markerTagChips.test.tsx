import React from "react";
import { flushSync } from "react-dom";
import { createRoot, type Root } from "react-dom/client";
import { afterEach, describe, expect, it } from "vitest";
import { MarkerTagChips } from "../workflow-editor/WorkflowDefinitions";

let active: { root: Root; container: HTMLDivElement } | null = null;

afterEach(() => {
  if (active) flushSync(() => active?.root.unmount());
  active = null;
});

describe("marker tag chips", () => {
  it("reveals overflow tags with a keyboard-accessible disclosure", () => {
    const container = document.createElement("div");
    const root = createRoot(container);
    active = { root, container };
    flushSync(() => root.render(<MarkerTagChips definition={{ markerTags: [
      { tagDefinitionId: "one", canonicalKey: "one", displayName: "One" },
      { tagDefinitionId: "two", canonicalKey: "two", displayName: "Two" },
      { tagDefinitionId: "three", canonicalKey: "three", displayName: "Three" }
    ] }} />));

    const button = container.querySelector<HTMLButtonElement>("button");
    expect(button?.getAttribute("aria-expanded")).toBe("false");
    expect(button?.getAttribute("aria-controls")).toBeTruthy();
    expect(container.textContent).not.toContain("Three");

    flushSync(() => button?.click());
    expect(button?.getAttribute("aria-expanded")).toBe("true");
    expect(container.querySelector("[role='list']")?.textContent).toContain("Three");
  });
});
