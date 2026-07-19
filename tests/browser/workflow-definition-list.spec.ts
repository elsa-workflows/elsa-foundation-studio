import { expect, test } from "@playwright/test";

test("workflow definitions use bounded server requests for paging, search, scope, and sort", async ({ page }) => {
  await page.goto("/?theme=light&mode=workflow-definitions");

  const requests = page.getByLabel("Workflow definition requests");
  await expect(page.getByText("Page 1 of 6")).toBeVisible();
  await expect(requests).toContainText("/design/workflows/definitions?state=active&page=1&pageSize=10&sortBy=name&sortDirection=asc");
  await expect(page.getByLabel("Tags: Environment").first()).toBeVisible();

  await page.getByLabel("Environment marker tag filter").selectOption("exists");
  await expect(requests).toContainText("markerTagClauses=tag-environment%3Aexists");
  await expect(page).toHaveURL(/markerTag=tag-environment%3Aexists/);
  await expect(page.getByText("Page 1 of 6")).toBeVisible();

  await page.getByRole("checkbox", { name: "Select workflow definition Active workflow 1", exact: true }).check();
  await expect(page.getByText("1 selected")).toBeVisible();

  await page.getByRole("button", { name: "Next" }).click();
  await expect(page.getByText("Active workflow 11")).toBeVisible();
  await expect(requests).toContainText("/design/workflows/definitions?state=active&page=2&pageSize=10&sortBy=name&sortDirection=asc");
  await expect(page.getByText("1 selected")).toBeVisible();

  await page.getByLabel("Sort workflow definitions").selectOption("lastModifiedAt:desc");
  await expect(page.getByText("Page 1 of 6")).toBeVisible();
  await expect(requests).toContainText("/design/workflows/definitions?state=active&page=1&pageSize=10&sortBy=lastModifiedAt&sortDirection=desc");
  await expect(page.getByText("1 selected")).toBeVisible();

  await page.getByLabel("Rows").selectOption("100");
  await expect(requests).toContainText("/design/workflows/definitions?state=active&page=1&pageSize=100&sortBy=lastModifiedAt&sortDirection=desc");
  await expect(page.getByText("1 selected")).toBeVisible();

  await page.getByPlaceholder("Search definitions").fill("workflow 1");
  await expect(requests).toContainText("/design/workflows/definitions?state=active&searchTerm=workflow+1&page=1&pageSize=100&sortBy=lastModifiedAt&sortDirection=desc");
  await expect(page.getByText("1 selected")).toBeHidden();

  await page.getByRole("checkbox", { name: "Select workflow definition Active workflow 1", exact: true }).check();
  await expect(page.getByText("1 selected")).toBeVisible();

  await page.getByRole("button", { name: "Deleted" }).click();
  await expect(requests).toContainText("/design/workflows/definitions?state=deleted&searchTerm=workflow+1&page=1&pageSize=100&sortBy=lastModifiedAt&sortDirection=desc");
  await expect(page.getByText("1 selected")).toBeHidden();
});

test("controlled tags persist value filters and render disjunctive facets, groups, and value colors", async ({ page }) => {
  await page.goto("/?theme=light&mode=workflow-definitions");

  const requests = page.getByLabel("Workflow definition requests");
  await expect(page.getByLabel("Region controlled tag value mode")).toBeVisible();
  await expect(page.getByRole("option", { name: "East (21)" })).toBeAttached();
  await expect(page.getByLabel("Tags: Environment, Region: East").first()).toBeVisible();

  const eastChipColor = page.getByTitle("Region: East").first().locator(".wf-tag-chip-color");
  await expect(eastChipColor).toHaveCSS("background-color", "rgb(14, 165, 233)");

  await page.getByLabel("Region controlled tag value mode").selectOption("anyOf");
  await page.getByLabel("Region controlled tag values").selectOption(["value-east"]);
  await expect(requests).toContainText("controlledTagClauses=tag-region%3AanyOf%3Avalue-east");
  await expect(page).toHaveURL(/controlledTag=tag-region%3AanyOf%3Avalue-east/);

  await page.getByLabel("Region controlled tag presence").selectOption("exists");
  await expect(requests).toContainText("controlledTagClauses=tag-region%3Aexists");
  await expect(requests).toContainText("controlledTagClauses=tag-region%3AanyOf%3Avalue-east");

  await page.getByLabel("Group workflow definitions by controlled tag").selectOption("tag-region");
  await expect(requests).toContainText("groupByControlledTagDefinitionId=tag-region");
  await expect(page).toHaveURL(/groupByControlledTag=tag-region/);
  await expect(page.getByText("East", { exact: true }).first()).toBeVisible();
  await expect(page.getByText("Untagged", { exact: true }).first()).toBeVisible();
  await expect(page.getByText("Conflicted", { exact: true }).first()).toBeVisible();

  await page.reload();
  await expect(page.getByLabel("Region controlled tag value mode")).toHaveValue("anyOf");
  await expect(page.getByLabel("Region controlled tag values")).toHaveValues(["value-east"]);
  await expect(page.getByLabel("Region controlled tag presence")).toHaveValue("exists");
  await expect(page.getByLabel("Group workflow definitions by controlled tag")).toHaveValue("tag-region");
});
