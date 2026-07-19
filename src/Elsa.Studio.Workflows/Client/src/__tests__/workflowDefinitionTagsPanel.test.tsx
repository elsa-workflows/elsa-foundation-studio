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

  it("assigns one controlled value without dropping an existing marker assignment", async () => {
    const requestJson = vi.fn().mockResolvedValue({
      workflowDefinitionId: "definition-1", revision: "\"tags-v4\"", canAssign: true,
      assertions: [
        { tagDefinitionId: "tag-critical", controlledValueId: null, origin: "manual" },
        { tagDefinitionId: "tag-environment", controlledValueId: "value-production", origin: "manual" }
      ]
    });
    const getJson = vi.fn(async (url: string) => url === "/capabilities" ? {
      capabilities: [
        { id: "elsa.api.tagging", contractVersion: "1", links: [
          { rel: "tag-definitions", href: "tagging/definitions" },
          { rel: "tag-definition-values", href: "tagging/definitions/{tagDefinitionId}/values", templated: true }
        ] },
        { id: "elsa.api.workflow-design", contractVersion: "1", links: [{ rel: "workflow-definition-tags", href: "design/workflows/definitions/{definitionId}/tags", templated: true }] }
      ]
    } : url === "/tagging/definitions" ? {
      items: [
        { id: "tag-critical", canonicalKey: "critical", displayName: "Critical", valueMode: "Marker", cardinality: "Single", status: "Active", revision: "\"tag-v1\"" },
        { id: "tag-environment", canonicalKey: "environment", displayName: "Environment", valueMode: "Controlled", cardinality: "Single", status: "Active", revision: "\"tag-v1\"" }
      ]
    } : url === "/tagging/definitions/tag-environment/values?activeOnly=false" ? {
      items: [
        { id: "value-staging", tagDefinitionId: "tag-environment", canonicalKey: "staging", displayName: "Staging", sortOrder: 10, status: "Active", revision: "\"value-v1\"" },
        { id: "value-legacy", tagDefinitionId: "tag-environment", canonicalKey: "legacy", displayName: "Legacy", sortOrder: 20, status: "Retired", revision: "\"value-v1\"" }
      ]
    } : {
      workflowDefinitionId: "definition-1", revision: "\"tags-v3\"", canAssign: true,
      assertions: [{ tagDefinitionId: "tag-critical", controlledValueId: null, origin: "manual" }]
    });
    const context = { baseUrl: "https://studio.example", http: { getJson, requestJson } } as unknown as StudioEndpointContext;
    const container = document.createElement("div");
    active = createRoot(container);
    flushSync(() => active?.render(<WorkflowDefinitionTagsPanel context={context} definitionId="definition-1" />));

    const picker = await vi.waitFor(() => {
      const element = container.querySelector<HTMLSelectElement>("select[aria-label='Environment controlled value']");
      expect(element).not.toBeNull();
      return element!;
    });
    expect([...picker.options].map(option => option.text)).toEqual(["No value", "Staging"]);
    picker.value = "value-staging";
    picker.dispatchEvent(new Event("change", { bubbles: true }));

    await vi.waitFor(() => expect(requestJson).toHaveBeenCalledWith("/design/workflows/definitions/definition-1/tags", expect.objectContaining({
      body: "{\"tagDefinitionIds\":[\"tag-critical\"],\"controlledValues\":[{\"tagDefinitionId\":\"tag-environment\",\"controlledValueId\":\"value-staging\"}]}"
    })));
  });

  it("edits only the manual slice without promoting policy assertions to manual assignments", async () => {
    const requestJson = vi.fn().mockResolvedValue({
      workflowDefinitionId: "definition-1", revision: "\"tags-v4\"", canAssign: true,
      assertions: []
    });
    const getJson = vi.fn(async (url: string) => url === "/capabilities" ? {
      capabilities: [
        { id: "elsa.api.tagging", contractVersion: "1", links: [
          { rel: "tag-definitions", href: "tagging/definitions" },
          { rel: "tag-definition-values", href: "tagging/definitions/{tagDefinitionId}/values", templated: true }
        ] },
        { id: "elsa.api.workflow-design", contractVersion: "1", links: [{ rel: "workflow-definition-tags", href: "design/workflows/definitions/{definitionId}/tags", templated: true }] }
      ]
    } : url === "/tagging/definitions" ? {
      items: [
        { id: "tag-critical", canonicalKey: "critical", displayName: "Critical", valueMode: "Marker", cardinality: "Single", status: "Active", revision: "\"tag-v1\"" },
        { id: "tag-policy", canonicalKey: "policy", displayName: "Policy", valueMode: "Marker", cardinality: "Single", status: "Active", revision: "\"tag-v1\"" },
        { id: "tag-environment", canonicalKey: "environment", displayName: "Environment", valueMode: "Controlled", cardinality: "Single", status: "Active", revision: "\"tag-v1\"" },
        { id: "tag-region", canonicalKey: "region", displayName: "Region", valueMode: "Controlled", cardinality: "Single", status: "Active", revision: "\"tag-v1\"" }
      ]
    } : url === "/tagging/definitions/tag-environment/values?activeOnly=false" ? {
      items: [
        { id: "value-production", tagDefinitionId: "tag-environment", canonicalKey: "production", displayName: "Production", sortOrder: 10, status: "Active", revision: "\"value-v1\"" },
        { id: "value-staging", tagDefinitionId: "tag-environment", canonicalKey: "staging", displayName: "Staging", sortOrder: 20, status: "Active", revision: "\"value-v1\"" }
      ]
    } : url === "/tagging/definitions/tag-region/values?activeOnly=false" ? {
      items: [
        { id: "value-east", tagDefinitionId: "tag-region", canonicalKey: "east", displayName: "East", sortOrder: 10, status: "Active", revision: "\"value-v1\"" }
      ]
    } : {
      workflowDefinitionId: "definition-1", revision: "\"tags-v3\"", canAssign: true,
      assertions: [
        { tagDefinitionId: "tag-critical", controlledValueId: null, origin: "manual" },
        { tagDefinitionId: "tag-policy", controlledValueId: null, origin: "policy" },
        { tagDefinitionId: "tag-environment", controlledValueId: "value-production", origin: "policy" },
        { tagDefinitionId: "tag-region", controlledValueId: "value-east", origin: "manual" }
      ]
    });
    const context = { baseUrl: "https://studio.example", http: { getJson, requestJson } } as unknown as StudioEndpointContext;
    const container = document.createElement("div");
    active = createRoot(container);
    flushSync(() => active?.render(<WorkflowDefinitionTagsPanel context={context} definitionId="definition-1" />));

    const picker = await vi.waitFor(() => {
      const element = container.querySelector<HTMLSelectElement>("select[aria-label='Environment controlled value']");
      expect(element).not.toBeNull();
      return element!;
    });
    expect(picker.value).toBe("");
    picker.value = "value-staging";
    picker.dispatchEvent(new Event("change", { bubbles: true }));

    await vi.waitFor(() => expect(requestJson).toHaveBeenCalledWith("/design/workflows/definitions/definition-1/tags", expect.objectContaining({
      body: "{\"tagDefinitionIds\":[\"tag-critical\"],\"controlledValues\":[{\"tagDefinitionId\":\"tag-region\",\"controlledValueId\":\"value-east\"},{\"tagDefinitionId\":\"tag-environment\",\"controlledValueId\":\"value-staging\"}]}"
    })));
  });
});
