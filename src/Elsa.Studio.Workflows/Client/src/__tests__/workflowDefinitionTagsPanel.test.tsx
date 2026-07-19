import React from "react";
import { flushSync } from "react-dom";
import { createRoot, type Root } from "react-dom/client";
import { afterEach, describe, expect, it, vi } from "vitest";
import type { StudioEndpointContext } from "@elsa-workflows/studio-sdk";
import { clearApiCapabilityCache } from "../api/capabilities";
import { WorkflowDefinitionTagsPanel } from "../workflow-editor/WorkflowDefinitionTagsPanel";

let active: Root | null = null;

afterEach(() => {
  if (active) flushSync(() => active?.unmount());
  active = null;
  clearApiCapabilityCache();
});

describe("workflow definition marker tag panel", () => {
  it("keeps an assigned retired tag enabled so it can be removed", async () => {
    const getJson = vi.fn(async (url: string) => url === "/capabilities" ? {
      capabilities: [
        { id: "elsa.api.tagging", contractVersion: "1", links: [{ rel: "tag-definitions", href: "tagging/definitions" }] },
        { id: "elsa.api.workflow-design", contractVersion: "1", links: [{ rel: "workflow-definition-tags", href: "design/workflows/definitions/{definitionId}/tags", templated: true }] }
      ]
    } : url === "/tagging/definitions" ? {
      items: [
        { id: "retired-assigned", canonicalKey: "legacy", displayName: "Legacy", status: "Retired", revision: "\"tag-v1\"" },
        { id: "retired-unassigned", canonicalKey: "deprecated", displayName: "Deprecated", status: "Retired", revision: "\"tag-v2\"" }
      ]
    } : {
      workflowDefinitionId: "definition-1", revision: "\"tags-v3\"", canAssign: true,
      assertions: [{ tagDefinitionId: "retired-assigned", origin: "manual" }]
    });
    const context = { baseUrl: "https://studio.example", http: { getJson } } as unknown as StudioEndpointContext;
    const container = document.createElement("div");
    active = createRoot(container);
    flushSync(() => active?.render(<WorkflowDefinitionTagsPanel context={context} definitionId="definition-1" />));

    await vi.waitFor(() => expect(container.textContent).toContain("Legacy"));
    const checkboxFor = (name: string) => [...container.querySelectorAll("label")].find(label => label.textContent?.includes(name))?.querySelector<HTMLInputElement>("input");
    expect(checkboxFor("Legacy")).toMatchObject({ checked: true, disabled: false });
    expect(checkboxFor("Deprecated")).toMatchObject({ checked: false, disabled: true });
  });
});
