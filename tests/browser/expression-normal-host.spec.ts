import { completeTest, createPersistedExpressionDraft, discoverActivityVersion, expect, missingJavaScriptEditorTest, missingLiquidProviderTest, readActivityDefinitionDraft, readAuthenticatedBackendJson, type NormalHostPair, type PersistedExpressionDraft, type SafeBackendTraffic } from "./expression-normal-host-fixtures";
import type { Locator, Page } from "@playwright/test";

completeTest("persisted workflow drafts use live JavaScript and Liquid assistance on the normal host", async ({ page, hostPair, signInToStudio, recordSafeBackendTraffic, recordSafeConsoleErrors }) => {
  const traffic = recordSafeBackendTraffic(page, hostPair);
  const consoleErrors = recordSafeConsoleErrors(page);
  await signInToStudio(page, hostPair);
  const draft = await createPersistedExpressionDraft(page, hostPair);
  await openWorkflowDraft(page, hostPair, draft);
  await selectWorkflowTarget(page, draft);

  const syntax = page.getByRole("button", { name: `${draft.inputName} expression syntax` });
  await expect(syntax).toBeVisible();
  const javascriptPreview = page.getByRole("button", { name: "JavaScript expression. Activate to edit." });
  await expect(javascriptPreview).toContainText("predecessor");
  await javascriptPreview.click();
  const compactJavaScript = page.locator(".studio-code-editor-rich-compact .cm-content");
  await expect(compactJavaScript).toBeVisible();

  await exerciseWorkflowAssistance(page, hostPair, compactJavaScript, draft, traffic, "JavaScript");
  await exerciseJavaScriptDepth(page, hostPair, compactJavaScript, draft, traffic);
  await exerciseJavaScriptConformance(page, hostPair, compactJavaScript, draft, traffic, [
    { source: "(value: number) => value", code: "JavaScript/Syntax" },
    { source: "<span />", code: "JavaScript/Syntax" },
    { source: "const value = 1; value", code: "JavaScript/Syntax" }
  ]);

  await replaceEditorSource(page, compactJavaScript, `args.customerName + args.predecessor.${draft.outputName}`);
  const expandedButton = page.getByRole("button", { name: `Open expanded ${draft.inputName} editor` });
  await expandedButton.click();
  const expandedJavaScript = page.getByRole("dialog").locator(".studio-code-editor-rich-expanded .cm-content");
  await expect(expandedJavaScript).toContainText("args.customerName");
  await exerciseWorkflowAssistance(page, hostPair, expandedJavaScript, draft, traffic, "JavaScript");
  await exerciseJavaScriptDepth(page, hostPair, expandedJavaScript, draft, traffic);
  await exerciseJavaScriptConformance(page, hostPair, expandedJavaScript, draft, traffic, [
    { source: "Math.random()", code: "JavaScript/AmbientCapability" }
  ]);
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
  await exerciseWorkflowAssistance(page, hostPair, compactLiquid, draft, traffic, "Liquid");
  await replaceEditorSource(page, compactLiquid, `{{ customerName }} {{ predecessor.${draft.outputName} }}`);
  await page.getByRole("button", { name: `Open expanded ${draft.inputName} editor` }).click();
  const expandedLiquid = page.getByRole("dialog").locator(".studio-code-editor-rich-expanded .cm-content");
  await expect(expandedLiquid).toContainText("customerName");
  await exerciseWorkflowAssistance(page, hostPair, expandedLiquid, draft, traffic, "Liquid");
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

  await page.goto(new URL("/workflows/activity-definitions", hostPair.studioUrl).toString());
  await expect(page.getByRole("heading", { name: "Activity Definitions" })).toBeVisible();
  await page.getByRole("button", { name: "Create Activity Definition" }).click();
  const createDialog = page.getByRole("dialog", { name: "Create Activity Definition" });
  await expect(createDialog).toBeVisible();
  await createDialog.getByRole("radio", { name: "Flowchart" }).check();
  await createDialog.getByRole("textbox", { name: "Display name" }).fill("Expression authoring browser definition");
  await createDialog.getByRole("button", { name: "Create definition" }).click();
  await expect(page.getByRole("tab", { name: "Designer" })).toHaveAttribute("aria-selected", "true");
  const saveStatus = page.locator(".ad-save-chip");
  await expect(saveStatus).toHaveText(/^Saved revision \d+$/);
  const initialSavedStatus = await saveStatus.textContent();
  await page.getByRole("button", { name: "Add activity" }).click();
  const writeLineOption = page.locator(`[role="option"][id$="-option-${writeLine.versionId}"]`);
  await expect(writeLineOption).toBeVisible();
  await writeLineOption.click();
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
  await expect(saveStatus).not.toHaveText(initialSavedStatus ?? "");
  await expect(saveStatus).toHaveText(/^Saved revision \d+$/);

  const currentUrl = new URL(page.url());
  const activityDraftId = currentUrl.searchParams.get("draft");
  expect(activityDraftId).toBeTruthy();
  await expect.poll(async () => {
    const savedDraft = await readActivityDefinitionDraft(page, hostPair, activityDraftId!);
    const payload = savedDraft?.provider?.payload;
    if (!payload) throw new Error("The fresh Activity Definition read omitted the provider payload.");
    const root = payload.rootActivity;
    if (!root) throw new Error("The fresh Activity Definition provider payload omitted the root activity.");
    const children = root.structure?.payload?.activities;
    if (!Array.isArray(children)) throw new Error("The fresh Activity Definition root omitted its child activity collection.");
    const savedActivity = Array.isArray(children)
      ? children.find((activity: { activityVersionId?: string }) => activity.activityVersionId === writeLine.versionId)
      : null;
    const savedInput = savedActivity?.inputs?.find((input: { referenceKey?: string }) => input.referenceKey === textInput.referenceKey);
    return { expressionType: savedInput?.value?.expressionType, source: savedInput?.value?.value };
  }).toEqual({ expressionType: "Liquid", source: "{{ customerName | string }}" });
  // Reopen through the normal API facade, not just the already-mounted editor state.
  await page.reload();
  await expect(page.getByRole("tab", { name: "Designer" })).toHaveAttribute("aria-selected", "true");
  await expect(page.locator(".ad-save-chip")).toHaveText(/^Saved revision \d+$/);
  await page.getByRole("button", { name: "Fit View", exact: true }).click();
  // Native canvas keyboard selection is not obscured by the small-viewport minimap.
  await page.locator(".react-flow__node").filter({ hasText: writeLine.displayName }).press("Enter", { timeout: 30_000 });
  await expect(page.getByRole("button", { name: "Liquid expression. Activate to edit." }))
    .toContainText("{{ customerName | string }}");
  expect(traffic.some(request => request.path === "/capabilities" && request.status === 200)).toBe(true);
  expect(consoleErrors).toEqual([]);
});

missingJavaScriptEditorTest("missing JavaScript editor leaves generic source editing and Liquid rich editing available", async ({ page, hostPair, signInToStudio, recordSafeBackendTraffic, recordSafeConsoleErrors }) => {
  const traffic = recordSafeBackendTraffic(page, hostPair);
  const consoleErrors = recordSafeConsoleErrors(page);
  await signInToStudio(page, hostPair);
  const draft = await createPersistedExpressionDraft(page, hostPair);
  await openWorkflowDraft(page, hostPair, draft);
  await selectWorkflowTarget(page, draft);

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
  const expandedLiquid = dialog.locator(".studio-code-editor-rich-expanded .cm-content");
  await expect(expandedLiquid).toBeVisible();
  await exerciseWorkflowAssistance(page, hostPair, expandedLiquid, draft, traffic, "Liquid");
  await replaceEditorSource(page, expandedLiquid, "{{ customerName }}");
  await dialog.getByRole("button", { name: `Close ${draft.inputName} editor` }).click();
  await page.getByRole("button", { name: "Liquid expression. Activate to edit." }).click();
  await expect(page.locator(".studio-code-editor-rich-compact .cm-content")).toBeVisible();
  await expect.poll(() => hasSuccessfulRequest(traffic, "/expression-tooling/context", "Liquid")).toBe(true);
  await expect.poll(() => hasSuccessfulRequest(traffic, "/expression-tooling/descriptors")).toBe(true);
  expect(consoleErrors).toEqual([]);
});

missingLiquidProviderTest("missing Liquid provider preserves authored Liquid and keeps JavaScript assistance available", async ({ page, hostPair, signInToStudio, recordSafeBackendTraffic, recordSafeConsoleErrors }) => {
  const traffic = recordSafeBackendTraffic(page, hostPair);
  const consoleErrors = recordSafeConsoleErrors(page);
  await signInToStudio(page, hostPair);
  const draft = await createPersistedExpressionDraft(page, hostPair, "Liquid");
  await openWorkflowDraft(page, hostPair, draft);
  await selectWorkflowTarget(page, draft);

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
  await selectWorkflowTarget(page, javascriptDraft);
  await page.getByRole("button", { name: "JavaScript expression. Activate to edit." }).click();
  await page.getByRole("button", { name: `Open expanded ${javascriptDraft.inputName} editor` }).click();
  await expect(page.getByRole("dialog").getByText("Runtime assistance: available for JavaScript.")).toBeVisible();
  await exerciseWorkflowAssistance(page, hostPair,
    page.getByRole("dialog").locator(".studio-code-editor-rich-expanded .cm-content"), javascriptDraft, traffic, "JavaScript");

  // Reopen the exact Liquid draft after checking JavaScript in an independent persisted draft.
  await openWorkflowDraft(page, hostPair, draft);
  await selectWorkflowTarget(page, draft);
  await expect(page.getByRole("button", { name: "Liquid expression. Activate to edit." })).toContainText(preservedLiquid);
  await expect.poll(() => hasSuccessfulRequest(traffic, "/expression-tooling/descriptors")).toBe(true);
  await expect.poll(() => readPersistedSource(page, hostPair, draft)).toEqual(preservedLiquid);
  expect(consoleErrors).toEqual([]);
});

async function openWorkflowDraft(page: Page, pair: NormalHostPair, draft: PersistedExpressionDraft) {
  await page.goto(new URL(`/workflows/definitions?definition=${encodeURIComponent(draft.definitionId)}`, pair.studioUrl).toString());
  await expect(workflowTargetNode(page, draft)).toBeVisible();
}

function workflowTargetNode(page: Page, draft: PersistedExpressionDraft) {
  return page.locator(`.wf-canvas .react-flow__node[data-id="${draft.targetNodeId}"] .wf-node`);
}

async function selectWorkflowTarget(page: Page, draft: PersistedExpressionDraft) {
  await workflowTargetNode(page, draft).click();
  await expect(page.getByRole("button", { name: /expression syntax$/ })).toBeVisible();
}

async function replaceEditorSource(page: Page, editor: Locator, source: string) {
  await editor.click();
  await editor.press("ControlOrMeta+A");
  await page.keyboard.insertText(source);
}

async function exerciseWorkflowAssistance(
  page: Page,
  pair: NormalHostPair,
  editor: Locator,
  draft: PersistedExpressionDraft,
  traffic: SafeBackendTraffic[],
  syntax: "JavaScript" | "Liquid"
) {
  // Leading whitespace deliberately changes the seeded JavaScript source as well.
  const completionSource = syntax === "JavaScript" ? " args.predecessor." : "{{ predecessor.";
  let phase = await replacePersistedWorkflowSource(page, pair, editor, draft, traffic, syntax, completionSource);
  await expect(editor.locator("xpath=ancestor::section[@data-studio-code-editor='true'][1]")
    .locator(".studio-code-editor-diagnostics")).toContainText(`${syntax}/Syntax`);
  // Source replacement refreshes context asynchronously. Retry the hotkey with its result,
  // rather than treating an earlier context request as readiness for this document.
  await expect(async () => {
    await editor.press("End");
    await editor.press("Control+Space");
    const menu = page.locator(".cm-tooltip-autocomplete");
    await expect(menu).toContainText(draft.outputName, { timeout: 1_000 });
    expect(hasFreshAssistance(traffic.slice(phase.start), draft, syntax, "/expression-tooling/completions", phase.previousRevision)).toBe(true);
    // The runtime output need not sort first among provider functions. Navigate the
    // actual completion collection before testing Enter, rather than accepting any row.
    const selected = menu.locator('[aria-selected="true"]');
    for (let step = 0; step < await menu.getByRole("option").count(); step++) {
      if ((await selected.textContent({ timeout: 1_000 }))?.includes(draft.outputName)) break;
      await editor.press("ArrowDown");
    }
    await expect(selected).toContainText(draft.outputName, { timeout: 1_000 });
  }).toPass({ timeout: 15_000 });
  // CodeMirror deliberately suppresses acceptance during its short interaction guard.
  // Retry the same real key action without restarting completion or forcing an editor delay.
  await expect(async () => {
    await editor.press("Enter");
    await expect(editor).toContainText(draft.outputName, { timeout: 1_000 });
  }).toPass({ timeout: 5_000 });

  phase = await replacePersistedWorkflowSource(page, pair, editor, draft, traffic, syntax, syntax === "JavaScript"
    ? `args.predecessor.${draft.outputName}` : `{{ predecessor.${draft.outputName} }}`);
  await expect(async () => {
    await editor.press("End");
    if (syntax === "Liquid") {
      // Move over the closing ` }}` to the discovered output token on each retry.
      for (let step = 0; step < 3; step++) await editor.press("ArrowLeft");
    }
    await editor.press("Alt+i");
    await expect(page.getByRole("status", { name: "Hover information" })).toContainText(draft.outputName, { timeout: 1_000 });
    expect(hasFreshAssistance(traffic.slice(phase.start), draft, syntax, "/expression-tooling/hover", phase.previousRevision)).toBe(true);
  }).toPass({ timeout: 15_000 });
  await editor.press("Escape");
  await expect(page.getByRole("status", { name: "Hover information" })).not.toBeVisible();
  await expect(editor).toBeVisible();

  phase = await replacePersistedWorkflowSource(page, pair, editor, draft, traffic, syntax,
    syntax === "JavaScript" ? "if (" : "{{ customerName");
  const diagnosticCode = `${syntax}/Syntax`;
  await expect.poll(() => hasFreshAssistance(traffic.slice(phase.start), draft, syntax, "/expression-tooling/validate",
    phase.previousRevision, { diagnosticCode }),
    { timeout: 15_000 }).toBe(true);
  await expect(editor.locator("xpath=ancestor::section[@data-studio-code-editor='true'][1]")
    .locator(".studio-code-editor-diagnostics")).toContainText(diagnosticCode);
}

async function replacePersistedWorkflowSource(page: Page, pair: NormalHostPair, editor: Locator,
  draft: PersistedExpressionDraft, traffic: SafeBackendTraffic[], syntax: string, source: string) {
  const phase = captureAssistancePhase(traffic, draft, syntax);
  await replaceEditorSource(page, editor, source);
  await expect(page.locator(".wf-editor-save-status")).toHaveText("Autosaving...");
  await expect(page.locator(".wf-editor-save-status")).toHaveText("Autosaved");
  await expect.poll(() => readPersistedSource(page, pair, draft)).toEqual(source);
  // Both context and validation change provider identities. Opening assistance before
  // either settles would race the legitimate cancellation of pre-save results.
  await expect.poll(() => {
    const phaseTraffic = traffic.slice(phase.start);
    const saveIndex = phaseTraffic.findLastIndex(request => request.method === "PUT" && request.status === 200 &&
      request.path === `/design/workflows/drafts/${draft.draftId}`);
    return saveIndex >= 0 && hasFreshAssistance(phaseTraffic.slice(saveIndex + 1), draft, syntax,
      "/expression-tooling/validate", phase.previousRevision, { allowSupportedEmpty: true });
  }, { timeout: 30_000 }).toBe(true);
  return phase;
}

async function exerciseJavaScriptDepth(page: Page, pair: NormalHostPair, editor: Locator,
  draft: PersistedExpressionDraft, traffic: SafeBackendTraffic[]) {
  for (const { marked, labels } of [
    { marked: "(customer) => { const total = 1; return |; }", labels: ["customer", "total", "Math"] },
    { marked: "(() => { const order = { address: { city: 1 } }; return order.address.|; })()", labels: ["city"] }
  ]) {
    const position = marked.indexOf("|");
    const source = marked.replace("|", "");
    await replacePersistedWorkflowSource(page, pair, editor, draft, traffic, "JavaScript", source);
    await expect(async () => {
      await editor.press("End");
      for (let step = position; step < source.length; step++) await editor.press("ArrowLeft");
      await editor.press("Control+Space");
      const menu = page.locator(".cm-tooltip-autocomplete");
      for (const label of labels) {
        await expect(menu.getByRole("option").locator(".cm-completionLabel", { hasText: new RegExp(`^${label}$`) }))
          .toHaveCount(1, { timeout: 1_000 });
      }
      await expect(menu).not.toContainText(/\b(Date|fetch|window|process|import)\b/);
    }).toPass({ timeout: 15_000 });
    await editor.press("Escape");
    await expect(editor).toContainText(source);
  }

  const source = "Math.abs(-2)";
  await replacePersistedWorkflowSource(page, pair, editor, draft, traffic, "JavaScript", source);
  await editor.press("End");
  for (let step = 0; step < 3; step++) await editor.press("ArrowLeft");
  await expect(editor.locator("xpath=ancestor::section[@data-studio-code-editor='true'][1]")
    .locator(".studio-code-editor-signature")).toContainText("abs(x): Number");
  await expect(editor).toContainText(source);
}

async function exerciseJavaScriptConformance(page: Page, pair: NormalHostPair, editor: Locator,
  draft: PersistedExpressionDraft, traffic: SafeBackendTraffic[], cases: { source: string; code: string }[]) {
  const diagnostics = editor.locator("xpath=ancestor::section[@data-studio-code-editor='true'][1]")
    .locator(".studio-code-editor-diagnostics");
  for (const { source, code } of cases) {
    const phase = await replacePersistedWorkflowSource(page, pair, editor, draft, traffic, "JavaScript", source);
    await expect.poll(() => hasFreshAssistance(traffic.slice(phase.start), draft, "JavaScript",
      "/expression-tooling/validate", phase.previousRevision, { diagnosticCode: code }),
    { timeout: 15_000 }).toBe(true);
    await expect(diagnostics).toContainText(code);
    // Known errors are advisory while authoring: the exact source is still persisted.
    await expect(editor).toContainText(source);
  }

  // Runtime expression grammar still permits a function body containing return.
  // These deterministic globals are tested against the real Foundation profile.
  const source = "(() => { return JSON.stringify({ total: Math.abs(-2) }); })()";
  const phase = await replacePersistedWorkflowSource(page, pair, editor, draft, traffic, "JavaScript", source);
  await expect.poll(() => hasFreshAssistance(traffic.slice(phase.start), draft, "JavaScript",
    "/expression-tooling/validate", phase.previousRevision, { allowSupportedEmpty: true }),
  { timeout: 15_000 }).toBe(true);
  await expect(diagnostics.filter({ hasText: "JavaScript/Syntax" })).toHaveCount(0);
  await expect(diagnostics.filter({ hasText: "JavaScript/AmbientCapability" })).toHaveCount(0);
  await expect(editor).toContainText(source);
}

function matchesDraftLocation(request: SafeBackendTraffic, draft: PersistedExpressionDraft, syntax: string) {
  return request.workflowDraftId === draft.draftId && request.expressionType === syntax &&
    request.nodeId === draft.targetNodeId && request.propertyKey === draft.propertyKey;
}

function captureAssistancePhase(traffic: SafeBackendTraffic[], draft: PersistedExpressionDraft, syntax: string) {
  return {
    start: traffic.length,
    previousRevision: Math.max(0, ...traffic.filter(request => request.path.endsWith("/expression-tooling/context") &&
      matchesDraftLocation(request, draft, syntax) && request.documentRevision !== undefined)
      .map(request => Number(request.documentRevision)).filter(Number.isFinite))
  };
}

function hasFreshAssistance(traffic: SafeBackendTraffic[], draft: PersistedExpressionDraft,
  syntax: string, relation: string, previousRevision: number,
  { diagnosticCode, allowSupportedEmpty = false }: { diagnosticCode?: string; allowSupportedEmpty?: boolean } = {}) {
  const context = traffic.filter(request => request.path.endsWith("/expression-tooling/context") &&
    matchesDraftLocation(request, draft, syntax)).at(-1);
  return traffic.some(request => request.path.endsWith(relation) && request.status === 200 &&
    (request.outcomeState === 0 || (allowSupportedEmpty && relation === "/expression-tooling/validate" && request.outcomeState === 1)) &&
    matchesDraftLocation(request, draft, syntax) &&
    request.contextRevision !== undefined && request.responseContextRevision === request.contextRevision &&
    request.responseDocumentRevision === request.documentRevision && Number(request.documentRevision) > previousRevision &&
    (diagnosticCode === undefined || request.diagnosticCodes?.includes(diagnosticCode)) &&
    context?.status === 200 && context.outcomeState === 0 &&
      context.responseDocumentRevision === request.documentRevision && context.documentRevision === request.documentRevision &&
      context.responseContextRevision === request.contextRevision);
}

function hasSuccessfulRequest(traffic: SafeBackendTraffic[], relation: string, expressionType?: string) {
  return traffic.some(request => request.path.endsWith(relation) && request.status === 200 && (expressionType === undefined || request.expressionType === expressionType));
}

async function readPersistedSource(page: Page, pair: NormalHostPair, draft: PersistedExpressionDraft) {
  const record = await readAuthenticatedBackendJson(page, pair, `/design/workflows/drafts/${encodeURIComponent(draft.draftId)}`);
  const target = record?.state?.rootActivity?.structure?.payload?.activities?.find(
    (activity: { nodeId?: string }) => activity.nodeId === draft.targetNodeId
  );
  const input = target?.inputs?.find(
    (candidate: { referenceKey?: string }) => candidate.referenceKey === draft.propertyKey
  );
  return input?.value?.value ?? null;
}
