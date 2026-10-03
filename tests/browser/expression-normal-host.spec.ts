import { completeTest, createPersistedExpressionDraft, discoverActivityVersion, expect, missingJavaScriptEditorTest, missingLiquidProviderTest, readActivityDefinitionDraft, type NormalHostPair, type PersistedExpressionDraft, type SafeBackendTraffic } from "./expression-normal-host-fixtures";
import type { Locator, Page } from "@playwright/test";

completeTest("persisted workflow drafts use live JavaScript and Liquid assistance on the normal host", async ({ page, hostPair, signInToStudio, recordSafeBackendTraffic, recordSafeConsoleErrors }) => {
  const traffic = recordSafeBackendTraffic(page, hostPair);
  const consoleErrors = recordSafeConsoleErrors(page);
  await signInToStudio(page, hostPair);
  const draft = await createPersistedExpressionDraft(page, hostPair);
  await openWorkflowDraft(page, hostPair, draft);
  await selectActivity(page, "WriteLine");

  const syntax = page.getByRole("button", { name: `${draft.inputName} expression syntax` });
  await expect(syntax).toBeVisible();
  const javascriptPreview = page.getByRole("button", { name: "JavaScript expression. Activate to edit." });
  await expect(javascriptPreview).toContainText("predecessor");
  await javascriptPreview.click();
  const compactJavaScript = page.locator(".studio-code-editor-rich-compact .cm-content");
  await expect(compactJavaScript).toBeVisible();

  await expect.poll(() => hasSuccessfulRequest(traffic, "/expression-tooling/context", "JavaScript")).toBe(true);
  await compactJavaScript.press("End");
  await compactJavaScript.press("Control+Space");
  await expect(page.locator(".cm-tooltip-autocomplete")).toContainText(draft.outputName);
  await compactJavaScript.press("Enter");
  await expect(compactJavaScript).toContainText(draft.outputName);
  await expect.poll(() => hasSuccessfulRequest(traffic, "/expression-tooling/completions", "JavaScript")).toBe(true);

  await replaceEditorSource(page, compactJavaScript, `args.predecessor.${draft.outputName}`);
  await compactJavaScript.press("End");
  await compactJavaScript.press("Alt+i");
  await expect(page.getByRole("status", { name: "Hover information" })).toBeVisible();
  await expect.poll(() => hasSuccessfulRequest(traffic, "/expression-tooling/hover", "JavaScript")).toBe(true);
  await page.keyboard.press("Escape");

  await replaceEditorSource(page, compactJavaScript, "if (");
  await expect.poll(() => hasSuccessfulRequest(traffic, "/expression-tooling/validate", "JavaScript")).toBe(true);
  await expect(page.locator(".studio-code-editor-diagnostics")).toBeVisible();

  await replaceEditorSource(page, compactJavaScript, `args.customerName + args.predecessor.${draft.outputName}`);
  const expandedButton = page.getByRole("button", { name: `Open expanded ${draft.inputName} editor` });
  await expandedButton.click();
  const expandedJavaScript = page.getByRole("dialog").locator(".studio-code-editor-rich-expanded .cm-content");
  await expect(expandedJavaScript).toContainText("args.customerName");
  await replaceEditorSource(page, expandedJavaScript, `args.customerName + args.predecessor.${draft.outputName} + '!'`);
  await page.getByRole("dialog").getByRole("button", { name: `Close ${draft.inputName} editor` }).click();
  await expect(page.getByRole("button", { name: "JavaScript expression. Activate to edit." })).toContainText("args.customerName");

  await syntax.click();
  await page.getByRole("option", { name: "Liquid", exact: true }).click();
  const liquidPreview = page.getByRole("button", { name: "Liquid expression. Activate to edit." });
  await expect(liquidPreview).toBeVisible();
  await liquidPreview.click();
  const compactLiquid = page.locator(".studio-code-editor-rich-compact .cm-content");
  await expect(compactLiquid).toBeVisible();
  await expect.poll(() => hasSuccessfulRequest(traffic, "/expression-tooling/context", "Liquid")).toBe(true);
  await replaceEditorSource(page, compactLiquid, "{{ predecessor.");
  await compactLiquid.press("Control+Space");
  await expect(page.locator(".cm-tooltip-autocomplete")).toContainText(draft.outputName);
  await compactLiquid.press("Enter");
  await expect.poll(() => hasSuccessfulRequest(traffic, "/expression-tooling/completions", "Liquid")).toBe(true);
  await replaceEditorSource(page, compactLiquid, `{{ predecessor.${draft.outputName} }}`);
  await compactLiquid.press("End");
  // Step back over the closing ` }}` so hover targets the discovered output token.
  await compactLiquid.press("ArrowLeft");
  await compactLiquid.press("ArrowLeft");
  await compactLiquid.press("ArrowLeft");
  await compactLiquid.press("Alt+i");
  await expect(page.getByRole("status", { name: "Hover information" })).toBeVisible();
  await expect.poll(() => hasSuccessfulRequest(traffic, "/expression-tooling/hover", "Liquid")).toBe(true);
  await page.keyboard.press("Escape");
  await replaceEditorSource(page, compactLiquid, "{{ customerName");
  await expect.poll(() => hasSuccessfulRequest(traffic, "/expression-tooling/validate", "Liquid")).toBe(true);
  await expect(page.locator(".studio-code-editor-diagnostics")).toBeVisible();
  await replaceEditorSource(page, compactLiquid, `{{ customerName }} {{ predecessor.${draft.outputName} }}`);
  await page.getByRole("button", { name: `Open expanded ${draft.inputName} editor` }).click();
  const expandedLiquid = page.getByRole("dialog").locator(".studio-code-editor-rich-expanded .cm-content");
  await expect(expandedLiquid).toContainText("customerName");
  await replaceEditorSource(page, expandedLiquid, `{{ customerName }} {{ predecessor.${draft.outputName} | string }}`);
  await page.getByRole("dialog").getByRole("button", { name: `Close ${draft.inputName} editor` }).click();
  await expect(page.getByRole("button", { name: "Liquid expression. Activate to edit." })).toContainText("string");

  await page.getByRole("button", { name: "Save", exact: true }).click();
  await expect.poll(() => readPersistedSource(page, hostPair, draft)).toEqual(`{{ customerName }} {{ predecessor.${draft.outputName} | string }}`);

  for (const relation of ["/expression-tooling/context", "/expression-tooling/completions", "/expression-tooling/hover", "/expression-tooling/validate"]) {
    await expect.poll(() => hasSuccessfulRequest(traffic, relation, "Liquid")).toBe(true);
  }
  await expect.poll(() => hasSuccessfulRequest(traffic, "/capabilities")).toBe(true);
  await expect.poll(() => hasSuccessfulRequest(traffic, "/expression-tooling/descriptors")).toBe(true);
  expect(consoleErrors).toEqual([]);
});

completeTest("Activity Definition graph authoring edits a persisted activity expression through both editor sizes", async ({ page, hostPair, signInToStudio, recordSafeBackendTraffic, recordSafeConsoleErrors }) => {
  const traffic = recordSafeBackendTraffic(page, hostPair);
  const consoleErrors = recordSafeConsoleErrors(page);
  await signInToStudio(page, hostPair);
  const writeLine = await discoverActivityVersion(page, hostPair, "Elsa.Activities.Primitives.Activities.WriteLine");
  const textInput = writeLine.inputs.find(input => String(input.name).toLowerCase() === "text");
  if (!textInput?.name || !textInput.referenceKey) throw new Error("The live WriteLine version does not expose its text contract input.");

  await page.goto(new URL("/studio/workflows/activity-definitions", hostPair.studioUrl).toString());
  await expect(page.getByRole("heading", { name: "Activity Definitions" })).toBeVisible();
  await page.getByRole("button", { name: "Create Activity Definition" }).click();
  const createDialog = page.getByRole("dialog", { name: "Create Activity Definition" });
  await expect(createDialog).toBeVisible();
  await createDialog.getByRole("radio", { name: "Flowchart" }).check();
  await createDialog.getByRole("textbox", { name: "Display name" }).fill("Expression authoring browser definition");
  await createDialog.getByRole("button", { name: "Create definition" }).click();
  await expect(page.getByRole("tab", { name: "Designer" })).toHaveAttribute("aria-selected", "true");
  await page.getByRole("button", { name: "Add activity" }).click();
  await page.getByRole("option", { name: writeLine.displayName, exact: true }).click();
  await page.locator(".wf-node").filter({ hasText: writeLine.displayName }).click();

  const syntax = page.getByRole("button", { name: `${textInput.name} expression syntax` });
  await expect(syntax).toBeVisible();
  await syntax.click();
  await page.getByRole("option", { name: "JavaScript", exact: true }).click();
  await page.getByRole("button", { name: "JavaScript expression. Activate to edit." }).click();
  const compactJavaScript = page.locator(".studio-code-editor-rich-compact .cm-content");
  await expect(compactJavaScript).toBeVisible();
  await replaceEditorSource(page, compactJavaScript, "args.customerName");
  await page.getByRole("button", { name: `Open expanded ${textInput.name} editor` }).click();
  const expandedJavaScript = page.getByRole("dialog").locator(".studio-code-editor-rich-expanded .cm-content");
  await expect(expandedJavaScript).toContainText("customerName");
  await replaceEditorSource(page, expandedJavaScript, "args.customerName + ' from activity definition'");
  await page.getByRole("dialog").getByRole("button", { name: `Close ${textInput.name} editor` }).click();

  await page.getByRole("button", { name: `${textInput.name} expression syntax` }).click();
  await page.getByRole("option", { name: "Liquid", exact: true }).click();
  await page.getByRole("button", { name: "Liquid expression. Activate to edit." }).click();
  const compactLiquid = page.locator(".studio-code-editor-rich-compact .cm-content");
  await expect(compactLiquid).toBeVisible();
  await replaceEditorSource(page, compactLiquid, "{{ customerName }}");
  await page.getByRole("button", { name: `Open expanded ${textInput.name} editor` }).click();
  const expandedLiquid = page.getByRole("dialog").locator(".studio-code-editor-rich-expanded .cm-content");
  await expect(expandedLiquid).toContainText("customerName");
  await replaceEditorSource(page, expandedLiquid, "{{ customerName | string }}");
  await page.getByRole("dialog").getByRole("button", { name: `Close ${textInput.name} editor` }).click();
  await page.getByRole("button", { name: "Save now" }).click();
  await expect(page.locator(".ad-save-chip")).toContainText("Saved revision");

  const currentUrl = new URL(page.url());
  const activityDraftId = currentUrl.searchParams.get("draft");
  expect(activityDraftId).toBeTruthy();
  const savedDraft = await readActivityDefinitionDraft(page, hostPair, activityDraftId!);
  const root = savedDraft?.provider?.payload?.rootActivity;
  const children = root?.structure?.payload?.activities;
  const savedActivity = Array.isArray(children)
    ? children.find((activity: { activityVersionId?: string }) => activity.activityVersionId === writeLine.versionId)
    : null;
  const savedInput = savedActivity?.inputs?.find((input: { referenceKey?: string }) => input.referenceKey === textInput.referenceKey);
  expect(savedInput?.value?.expressionType).toBe("Liquid");
  expect(savedInput?.value?.value).toBe("{{ customerName | string }}");
  expect(traffic.some(request => request.path === "/capabilities" && request.status === 200)).toBe(true);
  expect(consoleErrors).toEqual([]);
});

missingJavaScriptEditorTest("missing JavaScript editor leaves generic source editing and Liquid rich editing available", async ({ page, hostPair, signInToStudio, recordSafeBackendTraffic, recordSafeConsoleErrors }) => {
  const traffic = recordSafeBackendTraffic(page, hostPair);
  const consoleErrors = recordSafeConsoleErrors(page);
  await signInToStudio(page, hostPair);
  const draft = await createPersistedExpressionDraft(page, hostPair);
  await openWorkflowDraft(page, hostPair, draft);
  await selectActivity(page, "WriteLine");

  const javascriptInput = page.getByRole("textbox", { name: `${draft.inputName} expression` });
  await expect(javascriptInput).toHaveValue("args.predecessor.");
  await javascriptInput.fill(`args.predecessor.${draft.outputName}`);
  await page.getByRole("button", { name: `Open expanded ${draft.inputName} editor` }).click();
  const dialog = page.getByRole("dialog");
  await expect(dialog.getByText("rich editor unavailable; generic text editing remains available")).toBeVisible();
  await expect(dialog.getByText("Runtime assistance: available for JavaScript.")).toBeVisible();
  await expect(dialog.getByRole("textbox", { name: `${draft.inputName} expanded value` })).toHaveValue(`args.predecessor.${draft.outputName}`);
  await dialog.getByRole("button", { name: `${draft.inputName} expression syntax` }).click();
  await page.getByRole("option", { name: "Liquid", exact: true }).click();
  await expect(dialog.locator(".studio-code-editor-rich-expanded .cm-content")).toBeVisible();
  await dialog.getByRole("button", { name: `Close ${draft.inputName} editor` }).click();
  await page.getByRole("button", { name: "Liquid expression. Activate to edit." }).click();
  await expect(page.locator(".studio-code-editor-rich-compact .cm-content")).toBeVisible();
  await expect.poll(() => hasSuccessfulRequest(traffic, "/expression-tooling/context", "JavaScript")).toBe(true);
  await expect.poll(() => hasSuccessfulRequest(traffic, "/expression-tooling/descriptors")).toBe(true);
  expect(consoleErrors).toEqual([]);
});

missingLiquidProviderTest("missing Liquid provider preserves authored Liquid and keeps JavaScript assistance available", async ({ page, hostPair, signInToStudio, recordSafeBackendTraffic, recordSafeConsoleErrors }) => {
  const traffic = recordSafeBackendTraffic(page, hostPair);
  const consoleErrors = recordSafeConsoleErrors(page);
  await signInToStudio(page, hostPair);
  const draft = await createPersistedExpressionDraft(page, hostPair, "Liquid");
  await openWorkflowDraft(page, hostPair, draft);
  await selectActivity(page, "WriteLine");

  const liquidPreview = page.getByRole("button", { name: "Liquid expression. Activate to edit." });
  await expect(liquidPreview).toContainText("customerName");
  await liquidPreview.click();
  const compactLiquid = page.locator(".studio-code-editor-rich-compact .cm-content");
  await expect(compactLiquid).toContainText("{{ customerName }}");
  await replaceEditorSource(page, compactLiquid, "{{ customerName }}!");
  await page.getByRole("button", { name: `Open expanded ${draft.inputName} editor` }).click();
  const dialog = page.getByRole("dialog");
  await expect(dialog.getByText("Runtime assistance: not installed for Liquid.")).toBeVisible();
  const expandedLiquid = dialog.locator(".studio-code-editor-rich-expanded .cm-content");
  await expect(expandedLiquid).toContainText("{{ customerName }}!");
  await replaceEditorSource(page, expandedLiquid, "{{ customerName | string }}!");
  await dialog.getByRole("button", { name: `Close ${draft.inputName} editor` }).click();
  await page.getByRole("button", { name: "Save", exact: true }).click();
  const preservedLiquid = "{{ customerName | string }}!";
  await expect.poll(() => readPersistedSource(page, hostPair, draft)).toEqual(preservedLiquid);

  // A separate persisted JavaScript draft proves the independent provider remains available.
  const javascriptDraft = await createPersistedExpressionDraft(page, hostPair, "JavaScript");
  await openWorkflowDraft(page, hostPair, javascriptDraft);
  await selectActivity(page, "WriteLine");
  await page.getByRole("button", { name: "JavaScript expression. Activate to edit." }).click();
  await page.getByRole("button", { name: `Open expanded ${javascriptDraft.inputName} editor` }).click();
  await expect(page.getByRole("dialog").getByText("Runtime assistance: available for JavaScript.")).toBeVisible();

  // Reopen the exact Liquid draft after checking JavaScript in an independent persisted draft.
  await openWorkflowDraft(page, hostPair, draft);
  await selectActivity(page, "WriteLine");
  await expect(page.getByRole("button", { name: "Liquid expression. Activate to edit." })).toContainText(preservedLiquid);
  await expect.poll(() => hasSuccessfulRequest(traffic, "/expression-tooling/descriptors")).toBe(true);
  await expect.poll(() => readPersistedSource(page, hostPair, draft)).toEqual(preservedLiquid);
  expect(consoleErrors).toEqual([]);
});

async function openWorkflowDraft(page: Page, pair: NormalHostPair, draft: PersistedExpressionDraft) {
  await page.goto(new URL(`/studio/workflows/definitions?definition=${encodeURIComponent(draft.definitionId)}`, pair.studioUrl).toString());
  await expect(page.locator(".wf-node").filter({ hasText: "WriteLine" }).first()).toBeVisible();
}

async function selectActivity(page: Page, label: string) {
  await page.locator(".wf-node").filter({ hasText: label }).click();
  await expect(page.getByRole("button", { name: /expression syntax$/ })).toBeVisible();
}

async function replaceEditorSource(page: Page, editor: Locator, source: string) {
  await editor.click();
  await editor.press("ControlOrMeta+A");
  await page.keyboard.insertText(source);
}

function hasSuccessfulRequest(traffic: SafeBackendTraffic[], relation: string, expressionType?: string) {
  return traffic.some(request => request.path.endsWith(relation) && request.status === 200 && (expressionType === undefined || request.expressionType === expressionType));
}

async function readPersistedSource(page: Page, pair: NormalHostPair, draft: PersistedExpressionDraft) {
  const response = await page.request.get(new URL(`/design/workflows/drafts/${encodeURIComponent(draft.draftId)}`, pair.foundationUrl).toString());
  if (!response.ok()) return null;
  const record = await response.json();
  const input = record?.state?.rootActivity?.structure?.payload?.activities?.[1]?.inputs?.find(
    (candidate: { referenceKey?: string }) => candidate.referenceKey === draft.propertyKey
  );
  return input?.value?.value ?? null;
}
