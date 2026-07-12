import { expect, test } from "@playwright/test";

for (const theme of ["light", "black-glass"] as const) {
  test(`Expression Type options remain reachable in a constrained inspector (${theme})`, async ({ page }) => {
    await page.setViewportSize({ width: 900, height: 600 });
    await page.goto(`/?theme=${theme}`);

    const inspector = page.getByRole("complementary", { name: "Activity inspector" });
    const trigger = page.getByRole("button", { name: "Path expression syntax" });
    await expect(inspector).toBeVisible();
    await trigger.click();

    const listbox = page.getByRole("listbox", { name: "Path expression syntax" });
    await expect(listbox).toBeVisible();
    await expect(listbox.getByRole("option")).toHaveCount(7);
    const popover = listbox.locator("..");
    await expect(popover).toHaveAttribute("data-placement", "top");
    expect(await popover.evaluate(element => element.parentElement === document.body)).toBe(true);

    const box = await popover.boundingBox();
    expect(box).not.toBeNull();
    expect(box!.x).toBeGreaterThanOrEqual(0);
    expect(box!.y).toBeGreaterThanOrEqual(0);
    expect(box!.x + box!.width).toBeLessThanOrEqual(900);
    expect(box!.y + box!.height).toBeLessThanOrEqual(600);
    expect(await popover.evaluate(element => element.scrollHeight > element.clientHeight)).toBe(true);

    await page.getByRole("option", { name: "Variable" }).click();
    await expect(trigger).toHaveText("Variable");

    await trigger.press("ArrowDown");
    await expect(listbox.getByRole("option", { name: "Variable", exact: true })).toBeFocused();
    await page.keyboard.press("Home");
    await expect(listbox.getByRole("option", { name: "Input", exact: true })).toBeFocused();
    await page.keyboard.press("Escape");
    await expect(listbox).toBeHidden();
    await expect(trigger).toBeFocused();
  });
}
