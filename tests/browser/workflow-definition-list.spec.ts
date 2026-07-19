import { expect, test } from "@playwright/test";

test("workflow definitions use bounded server requests for paging, search, scope, and sort", async ({ page }) => {
  await page.goto("/?theme=light&mode=workflow-definitions");

  const requests = page.getByLabel("Workflow definition requests");
  await expect(page.getByText("Page 1 of 6")).toBeVisible();
  await expect(requests).toContainText("/design/workflows/definitions?state=active&page=1&pageSize=10&sortBy=name&sortDirection=asc");

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
