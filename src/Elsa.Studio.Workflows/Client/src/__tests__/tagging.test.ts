import { afterEach, describe, expect, it, vi } from "vitest";
import type { StudioEndpointContext } from "@elsa-workflows/studio-sdk";
import { StudioHttpError } from "@elsa-workflows/studio-sdk";
import { clearApiCapabilityCache } from "../api/capabilities";
import {
  createControlledTagValue,
  getWorkflowDefinitionTags,
  listControlledTagValues,
  listTagDefinitions,
  replaceWorkflowDefinitionTags,
  updateControlledTagValue,
  updateTagDefinition
} from "../api/tagging";

afterEach(clearApiCapabilityCache);

function context(getJson: ReturnType<typeof vi.fn>, requestJson = vi.fn()) {
  return { baseUrl: "https://server.example/shell", http: { getJson, requestJson } } as unknown as StudioEndpointContext;
}

describe("workflow definition marker tags", () => {
  it("uses advertised tagging and definition-tag links without guessing routes", async () => {
    const getJson = vi.fn(async (url: string) => url === "/capabilities" ? {
      capabilities: [
        { id: "elsa.api.tagging", contractVersion: "1", links: [{ rel: "tag-definitions", href: "tagging/definitions" }] },
        { id: "elsa.api.workflow-design", contractVersion: "1", links: [{ rel: "workflow-definition-tags", href: "design/workflows/definitions/{definitionId}/tags", templated: true }] }
      ]
    } : url === "/tagging/definitions" ? { items: [{ id: "tag-prod", canonicalKey: "environment", displayName: "Environment", status: "Active", revision: "\"tag-v2\"" }] } : {
      workflowDefinitionId: "definition/1",
      revision: "\"tags-v3\"",
      canAssign: true,
      assertions: [{ tagDefinitionId: "tag-prod", origin: "manual" }]
    });
    const value = context(getJson);

    await expect(listTagDefinitions(value)).resolves.toMatchObject({ items: [{ id: "tag-prod", key: "environment", revision: "\"tag-v2\"", status: "Active" }] });
    await expect(getWorkflowDefinitionTags(value, "definition/1")).resolves.toMatchObject({ revision: "\"tags-v3\"", assertions: [{ tagDefinitionId: "tag-prod", origin: "manual" }] });

    expect(getJson).toHaveBeenCalledWith("/tagging/definitions");
    expect(getJson).toHaveBeenCalledWith("/design/workflows/definitions/definition%2F1/tags");
  });

  it("keeps each catalog item's quoted revision and uses it for mutable catalog updates", async () => {
    const requestJson = vi.fn().mockResolvedValue({
      id: "tag-prod", canonicalKey: "environment", displayName: "Production environment", status: "Active", revision: "\"tag-v3\""
    });
    const value = context(vi.fn().mockResolvedValue({ capabilities: [
      { id: "elsa.api.tagging", contractVersion: "1", links: [{ rel: "tag-definitions", href: "tagging/definitions" }] }
    ] }), requestJson);

    await expect(updateTagDefinition(value, "tag-prod", "\"tag-v2\"", { displayName: "Production environment", color: "#0ea5e9" }))
      .resolves.toMatchObject({ displayName: "Production environment", revision: "\"tag-v3\"" });

    expect(requestJson).toHaveBeenCalledWith("/tagging/definitions/tag-prod", {
      method: "PATCH",
      headers: { "Content-Type": "application/json", Accept: "application/json", "If-Match": "\"tag-v2\"" },
      body: "{\"displayName\":\"Production environment\",\"color\":\"#0ea5e9\"}"
    });
  });

  it("sends the quoted revision through If-Match and exposes structured revision conflicts", async () => {
    const requestJson = vi.fn().mockRejectedValue(new StudioHttpError(409, "Conflict", null, {
      code: "tag-set-revision-conflict"
    }));
    const value = context(vi.fn().mockResolvedValue({ capabilities: [
      { id: "elsa.api.workflow-design", contractVersion: "1", links: [{ rel: "workflow-definition-tags", href: "design/workflows/definitions/{definitionId}/tags", templated: true }] }
    ] }), requestJson);

    await expect(replaceWorkflowDefinitionTags(value, "definition-1", "\"tags-v3\"", ["tag-prod"])).rejects.toMatchObject({
      code: "tag-set-revision-conflict"
    });
    expect(requestJson).toHaveBeenCalledWith("/design/workflows/definitions/definition-1/tags", {
      method: "PUT",
      headers: { "Content-Type": "application/json", Accept: "application/json", "If-Match": "\"tags-v3\"" },
      body: "{\"tagDefinitionIds\":[\"tag-prod\"]}"
    });
  });

  it.each([
    { workflowDefinitionId: "definition-1", revision: "tags-v3", canAssign: true, assertions: [] },
    { workflowDefinitionId: "another-definition", revision: "\"tags-v3\"", canAssign: true, assertions: [] },
    {
      workflowDefinitionId: "definition-1",
      revision: "\"tags-v3\"",
      canAssign: true,
      assertions: [{ tagDefinitionId: "tag-rule", origin: "" }]
    }
  ])("fails closed for an invalid tag-set response", async response => {
    const value = context(vi.fn(async (url: string) => url === "/capabilities" ? {
      capabilities: [{ id: "elsa.api.workflow-design", contractVersion: "1", links: [{ rel: "workflow-definition-tags", href: "design/workflows/definitions/{definitionId}/tags", templated: true }] }]
    } : response));

    await expect(getWorkflowDefinitionTags(value, "definition-1")).rejects.toThrow("invalid workflow definition tag set");
  });

  it("maps canonical catalog fields and sends their canonical spelling on mutations", async () => {
    const postJson = vi.fn().mockResolvedValue({ id: "tag-risk", canonicalKey: "risk", displayName: "Risk", status: "Active", revision: "\"tag-v1\"" });
    const value = { baseUrl: "https://server.example/shell", http: {
      getJson: vi.fn().mockResolvedValue({ capabilities: [{ id: "elsa.api.tagging", contractVersion: "1", links: [{ rel: "tag-definitions", href: "tagging/definitions" }] }] }),
      postJson
    } } as unknown as StudioEndpointContext;
    const { createTagDefinition } = await import("../api/tagging");

    await expect(createTagDefinition(value, { canonicalKey: "risk", displayName: "Risk" })).resolves.toMatchObject({ key: "risk", status: "Active" });
    expect(postJson).toHaveBeenCalledWith("/tagging/definitions", { canonicalKey: "risk", displayName: "Risk" });
  });

  it("discovers controlled values through the templated catalog relation and preserves stable identity", async () => {
    const postJson = vi.fn().mockResolvedValue({
      id: "value-production", tagDefinitionId: "tag-environment", canonicalKey: "production", displayName: "Production",
      color: "#22c55e", sortOrder: 20, status: "Active", revision: "\"value-v2\""
    });
    const requestJson = vi.fn().mockResolvedValue({
      id: "value-production", tagDefinitionId: "tag-environment", canonicalKey: "production", displayName: "Prod",
      color: "#16a34a", sortOrder: 10, status: "Active", revision: "\"value-v3\""
    });
    const getJson = vi.fn(async (url: string) => url === "/capabilities" ? {
      capabilities: [{
        id: "elsa.api.tagging", contractVersion: "1", links: [
          { rel: "tag-definition-values", href: "tagging/definitions/{tagDefinitionId}/values", templated: true }
        ]
      }]
    } : {
      canManage: true,
      items: [{
        id: "value-production", tagDefinitionId: "tag-environment", canonicalKey: "production", displayName: "Production",
        color: "#22c55e", sortOrder: 20, status: "Active", revision: "\"value-v1\""
      }]
    });
    const value = { baseUrl: "https://server.example/shell", http: { getJson, postJson, requestJson } } as unknown as StudioEndpointContext;

    await expect(listControlledTagValues(value, "tag-environment")).resolves.toMatchObject({
      canManage: true,
      items: [{ id: "value-production", tagDefinitionId: "tag-environment", key: "production", sortOrder: 20 }]
    });
    await expect(createControlledTagValue(value, "tag-environment", { canonicalKey: "production", displayName: "Production", sortOrder: 20 }))
      .resolves.toMatchObject({ id: "value-production", revision: "\"value-v2\"" });
    await expect(updateControlledTagValue(value, "tag-environment", "value-production", "\"value-v2\"", { displayName: "Prod", sortOrder: 10 }))
      .resolves.toMatchObject({ displayName: "Prod", sortOrder: 10, revision: "\"value-v3\"" });

    expect(getJson).toHaveBeenCalledWith("/tagging/definitions/tag-environment/values");
    expect(postJson).toHaveBeenCalledWith("/tagging/definitions/tag-environment/values", { canonicalKey: "production", displayName: "Production", sortOrder: 20 });
    expect(requestJson).toHaveBeenCalledWith("/tagging/definitions/tag-environment/values/value-production", expect.objectContaining({
      method: "PATCH",
      headers: expect.objectContaining({ "If-Match": "\"value-v2\"" })
    }));
  });

  it("sends controlled-value assignments alongside marker assignment identities", async () => {
    const requestJson = vi.fn().mockResolvedValue({
      workflowDefinitionId: "definition-1", revision: "\"tags-v4\"", canAssign: true,
      assertions: [
        { tagDefinitionId: "tag-critical", controlledValueId: null, origin: "manual" },
        { tagDefinitionId: "tag-environment", controlledValueId: "value-production", origin: "manual" }
      ]
    });
    const value = context(vi.fn().mockResolvedValue({ capabilities: [{
      id: "elsa.api.workflow-design", contractVersion: "1", links: [{ rel: "workflow-definition-tags", href: "design/workflows/definitions/{definitionId}/tags", templated: true }]
    }] }), requestJson);

    const saved = await replaceWorkflowDefinitionTags(value, "definition-1", "\"tags-v3\"", ["tag-critical"], [{ tagDefinitionId: "tag-environment", controlledValueId: "value-production" }]);
    expect(saved.assertions).toContainEqual(expect.objectContaining({ controlledValueId: "value-production" }));

    expect(requestJson).toHaveBeenCalledWith("/design/workflows/definitions/definition-1/tags", expect.objectContaining({
      body: "{\"tagDefinitionIds\":[\"tag-critical\"],\"controlledValues\":[{\"tagDefinitionId\":\"tag-environment\",\"controlledValueId\":\"value-production\"}]}"
    }));
  });
});
