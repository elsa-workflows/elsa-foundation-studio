import { expect, test } from "@playwright/test";

test("controlled catalog lifecycle and exactly-one workflow assignment use stable identities", async ({ page }) => {
  await page.goto("/?theme=light&mode=controlled-tag-authoring");

  const catalog = page.getByLabel("Environment controlled values");
  const requests = page.getByLabel("Controlled tag authoring requests");
  const picker = page.getByLabel("Environment controlled value", { exact: true });

  await expect(catalog.getByText("Legacy", { exact: true })).toBeVisible();
  await expect(catalog.getByRole("button", { name: "Reactivate" })).toBeVisible();
  await expect(picker.getByRole("option", { name: "Legacy (Retired)" })).toBeAttached();
  await expect(picker).toHaveValue("value-legacy");

  await catalog.getByRole("button", { name: "Reactivate" }).click();
  await expect(requests).toContainText(
    "PATCH /tagging/definitions/tag-environment/values/value-legacy {\"status\":\"Active\"}");

  const createForm = catalog.locator("form");
  await createForm.getByLabel("Key").fill("staging");
  await createForm.getByLabel("Name").fill("Staging");
  await createForm.getByRole("button", { name: "Create value" }).click();
  await expect(requests).toContainText(
    "POST /tagging/definitions/tag-environment/values");
  await expect(catalog.getByText("Staging", { exact: true })).toBeVisible();

  await picker.selectOption("value-production");
  await expect(requests).toContainText(
    "PUT /design/workflows/definitions/definition-1/tags {\"tagDefinitionIds\":[],\"controlledValues\":[{\"tagDefinitionId\":\"tag-environment\",\"controlledValueId\":\"value-production\"}]}");
});
