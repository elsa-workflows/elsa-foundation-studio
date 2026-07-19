import React from "react";
import { flushSync } from "react-dom";
import { createRoot, type Root } from "react-dom/client";
import { afterEach, describe, expect, it, vi } from "vitest";
import type { StudioAiContributionApi, StudioEndpointContext } from "@elsa-workflows/studio-sdk";
import { clearApiCapabilityCache } from "../api/capabilities";
import { WorkflowDefinitions } from "../workflow-editor/WorkflowDefinitions";

let active: Root | null = null;

afterEach(() => {
  if (active) flushSync(() => active?.unmount());
  active = null;
  clearApiCapabilityCache();
  window.history.replaceState({}, "", "/");
});

describe("workflow definition marker tag filters", () => {
  it("clears persisted clauses and never sends them when assignment capability is absent", async () => {
    window.history.replaceState({}, "", "/workflows?markerTag=tag-risk%3Aexists");
    const requestedUrls: string[] = [];
    const getJson = vi.fn(async (url: string) => {
      requestedUrls.push(url);
      if (url === "/capabilities") {
        return {
          capabilities: [
            {
              id: "elsa.api.workflow-design",
              contractVersion: "1",
              links: [{ rel: "workflow-definitions", href: "design/workflows/definitions" }]
            },
            {
              id: "elsa.api.tagging",
              contractVersion: "1",
              links: [{ rel: "tag-definitions", href: "tagging/definitions" }]
            }
          ]
        };
      }
      if (url === "/tagging/definitions") {
        return {
          items: [{
            id: "tag-risk",
            canonicalKey: "risk",
            displayName: "Risk",
            status: "Active",
            revision: "\"tag-v1\""
          }]
        };
      }
      if (url.startsWith("/design/workflows/definitions?")) {
        return { items: [], page: 1, pageSize: 25, totalCount: 0 };
      }
      throw new Error(`Unexpected URL: ${url}`);
    });
    const context = {
      baseUrl: "https://studio.example",
      http: { getJson }
    } as unknown as StudioEndpointContext;
    const container = document.createElement("div");
    active = createRoot(container);

    flushSync(() => active?.render(
      <WorkflowDefinitions
        context={context}
        ai={{ promptActions: { list: () => [] } } as unknown as StudioAiContributionApi}
        onOpen={() => undefined}
      />));

    await vi.waitFor(() => {
      expect(window.location.search).not.toContain("markerTag");
      expect(requestedUrls.some(url => url.startsWith("/design/workflows/definitions?"))).toBe(true);
    });
    expect(requestedUrls
      .filter(url => url.startsWith("/design/workflows/definitions?"))
      .every(url => !url.includes("markerTagClauses")))
      .toBe(true);
    expect(container.querySelector(".wf-tag-filters")).toBeNull();
  });

  it("keeps a referenced retired filter visible so it can be cleared", async () => {
    window.history.replaceState({}, "", "/workflows?markerTag=tag-legacy%3Aexists");
    const definitionRequests: string[] = [];
    const getJson = vi.fn(async (url: string) => {
      if (url === "/capabilities") {
        return {
          capabilities: [
            {
              id: "elsa.api.workflow-design",
              contractVersion: "1",
              links: [
                { rel: "workflow-definitions", href: "design/workflows/definitions" },
                {
                  rel: "workflow-definition-tags",
                  href: "design/workflows/definitions/{definitionId}/tags",
                  templated: true
                }
              ]
            },
            {
              id: "elsa.api.tagging",
              contractVersion: "1",
              links: [{ rel: "tag-definitions", href: "tagging/definitions" }]
            }
          ]
        };
      }
      if (url === "/tagging/definitions") {
        return {
          items: [{
            id: "tag-legacy",
            canonicalKey: "legacy",
            displayName: "Legacy",
            status: "Retired",
            revision: "\"tag-v2\""
          }]
        };
      }
      if (url.startsWith("/design/workflows/definitions?")) {
        definitionRequests.push(url);
        return { items: [], page: 1, pageSize: 25, totalCount: 0 };
      }
      throw new Error(`Unexpected URL: ${url}`);
    });
    const context = {
      baseUrl: "https://studio.example",
      http: { getJson }
    } as unknown as StudioEndpointContext;
    const container = document.createElement("div");
    active = createRoot(container);
    flushSync(() => active?.render(
      <WorkflowDefinitions
        context={context}
        ai={{ promptActions: { list: () => [] } } as unknown as StudioAiContributionApi}
        onOpen={() => undefined}
      />));

    const filter = await vi.waitFor(() => {
      const element = container.querySelector<HTMLSelectElement>(
        "select[aria-label='Legacy (Retired) marker tag filter']");
      expect(element).not.toBeNull();
      expect(definitionRequests.some(url => url.includes("markerTagClauses=tag-legacy%3Aexists"))).toBe(true);
      return element!;
    });

    filter.value = "";
    filter.dispatchEvent(new Event("change", { bubbles: true }));

    await vi.waitFor(() => expect(window.location.search).not.toContain("markerTag"));
    expect(container.querySelector(".wf-tag-filters")).toBeNull();
  });
});
