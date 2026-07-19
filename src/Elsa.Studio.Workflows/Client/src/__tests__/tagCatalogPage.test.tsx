import React from "react";
import { flushSync } from "react-dom";
import { createRoot, type Root } from "react-dom/client";
import { afterEach, describe, expect, it, vi } from "vitest";
import type { StudioEndpointContext } from "@elsa-workflows/studio-sdk";
import { clearApiCapabilityCache } from "../api/capabilities";
import { TagCatalogPage } from "../TagCatalogPage";

let active: Root | null = null;

afterEach(() => {
  if (active) flushSync(() => active?.unmount());
  active = null;
  clearApiCapabilityCache();
});

describe("marker tag catalog", () => {
  it("edits presentation fields and retires tags using the listed quoted revision", async () => {
    const requestJson = vi.fn().mockResolvedValue({
      id: "tag-environment", canonicalKey: "environment", displayName: "Environment", description: "Deployment target", color: "#0ea5e9", status: "Retired", revision: "\"tag-v2\""
    });
    const getJson = vi.fn(async (url: string) => url === "/capabilities" ? {
      capabilities: [{ id: "elsa.api.tagging", contractVersion: "1", links: [{ rel: "tag-definitions", href: "tagging/definitions" }] }]
    } : {
      canManage: true,
      items: [{ id: "tag-environment", canonicalKey: "environment", displayName: "Environment", description: "Deployment target", color: "#0ea5e9", status: "Active", revision: "\"tag-v1\"" }]
    });
    const context = { baseUrl: "https://studio.example", http: { getJson, requestJson } } as unknown as StudioEndpointContext;
    const container = document.createElement("div");
    active = createRoot(container);
    flushSync(() => active?.render(<TagCatalogPage context={context} />));

    await vi.waitFor(() => expect(container.textContent).toContain("Environment"));
    expect(container.textContent).toContain("Retire");
    expect(container.textContent).not.toContain("Delete");

    const edit = [...container.querySelectorAll("button")].find(button => button.textContent?.includes("Edit"));
    flushSync(() => edit?.click());
    expect(container.querySelector<HTMLInputElement>("#tag-name-tag-environment")?.value).toBe("Environment");
    expect(container.querySelector<HTMLInputElement>("#tag-color-tag-environment")?.value).toBe("#0ea5e9");

    const cancel = [...container.querySelectorAll("button")].find(button => button.textContent?.includes("Cancel"));
    flushSync(() => cancel?.click());

    const retire = [...container.querySelectorAll("button")].find(button => button.textContent?.includes("Retire"));
    flushSync(() => retire?.click());
    await vi.waitFor(() => expect(requestJson).toHaveBeenCalledWith("/tagging/definitions/tag-environment", {
      method: "PATCH",
      headers: { "Content-Type": "application/json", Accept: "application/json", "If-Match": "\"tag-v1\"" },
      body: "{\"status\":\"Retired\"}"
    }));
  });
});
