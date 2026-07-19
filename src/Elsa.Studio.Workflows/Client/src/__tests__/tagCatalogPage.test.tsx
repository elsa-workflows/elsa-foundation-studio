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

  it("manages controlled values through the advertised nested catalog relation", async () => {
    const postJson = vi.fn().mockResolvedValue({
      id: "value-production", tagDefinitionId: "tag-environment", canonicalKey: "production", displayName: "Production",
      sortOrder: 10, status: "Active", revision: "\"value-v1\""
    });
    const getJson = vi.fn(async (url: string) => url === "/capabilities" ? {
      capabilities: [{ id: "elsa.api.tagging", contractVersion: "1", links: [
        { rel: "tag-definitions", href: "tagging/definitions" },
        { rel: "tag-definition-values", href: "tagging/definitions/{tagDefinitionId}/values", templated: true }
      ] }]
    } : url === "/tagging/definitions" ? {
      canManage: true,
      items: [{
        id: "tag-environment", canonicalKey: "environment", displayName: "Environment", valueMode: "Controlled", cardinality: "Single",
        status: "Active", revision: "\"tag-v1\""
      }]
    } : { canManage: true, items: [] });
    const context = { baseUrl: "https://studio.example", http: { getJson, postJson, requestJson: vi.fn() } } as unknown as StudioEndpointContext;
    const container = document.createElement("div");
    active = createRoot(container);
    flushSync(() => active?.render(<TagCatalogPage context={context} />));

    await vi.waitFor(() => expect(container.textContent).toContain("Controlled values"));
    const forms = [...container.querySelectorAll("form")];
    const valueForm = forms.find(form => form.textContent?.includes("Create value"));
    const inputs = valueForm?.querySelectorAll<HTMLInputElement>("input");
    if (!inputs) throw new Error("Expected controlled value form inputs.");
    setInputValue(inputs[0], "production");
    setInputValue(inputs[1], "Production");
    flushSync(() => valueForm?.dispatchEvent(new Event("submit", { bubbles: true, cancelable: true })));

    await vi.waitFor(() => expect(postJson).toHaveBeenCalledWith("/tagging/definitions/tag-environment/values", expect.objectContaining({
      canonicalKey: "production", displayName: "Production", sortOrder: 0
    })));
  });
});

function setInputValue(input: HTMLInputElement, value: string) {
  const setter = Object.getOwnPropertyDescriptor(HTMLInputElement.prototype, "value")!.set!;
  flushSync(() => {
    setter.call(input, value);
    input.dispatchEvent(new Event("input", { bubbles: true }));
  });
}
