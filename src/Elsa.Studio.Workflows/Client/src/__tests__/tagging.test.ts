import { afterEach, describe, expect, it, vi } from "vitest";
import type { StudioEndpointContext } from "@elsa-workflows/studio-sdk";
import { clearApiCapabilityCache } from "../api/capabilities";
import { getWorkflowDefinitionTags, listTagDefinitions, replaceWorkflowDefinitionTags, updateTagDefinition } from "../api/tagging";

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
    const requestJson = vi.fn().mockRejectedValue(Object.assign(new Error("Conflict"), {
      status: 409,
      response: { code: "tag-set-revision-conflict" }
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
});
