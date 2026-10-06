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
  await exerciseLiquidDepth(page, hostPair, compactLiquid, draft, traffic);
  await replaceEditorSource(page, compactLiquid, `{{ customerName }} {{ predecessor.${draft.outputName} }}`);
  await page.getByRole("button", { name: `Open expanded ${draft.inputName} editor` }).click();
  const expandedLiquid = page.getByRole("dialog").locator(".studio-code-editor-rich-expanded .cm-content");
  await expect(expandedLiquid).toContainText("customerName");
  await exerciseWorkflowAssistance(page, hostPair, expandedLiquid, draft, traffic, "Liquid");
  await exerciseLiquidDepth(page, hostPair, expandedLiquid, draft, traffic, true);
  await replaceEditorSource(page, expandedLiquid, `{{ customerName }} {{ predecessor.${draft.outputName} | string }}`);
  await page.getByRole("dialog").getByRole("button", { name: `Close ${draft.inputName} editor` }).click();
  await expect(page.getByRole("button", { name: "Liquid expression. Activate to edit." })).toContainText("string");

  await page.getByRole("button", { name: "Save", exact: true }).click();
  await expect.poll(() => readPersistedSource(page, hostPair, draft)).toEqual(`{{ customerName }} {{ predecessor.${draft.outputName} | string }}`);

  for (const relation of ["/expression-tooling/context", "/expression-tooling/validate"]) {
    await expect.poll(() => hasSuccessfulRequest(traffic, relation, "Liquid")).toBe(true);
  }
  for (const relation of ["/expression-tooling/completions", "/expression-tooling/hover"]) {
    await expect.poll(() => hasSuccessfulRequest(traffic, relation, "JavaScript")).toBe(true);
  }
  await expect.poll(() => hasSuccessfulRequest(traffic, "/capabilities")).toBe(true);
  await expect.poll(() => hasSuccessfulRequest(traffic, "/expression-tooling/descriptors")).toBe(true);
  expect(consoleErrors).toEqual([]);
});

completeTest("normal-host expression previews and help remain readable in Light, Dark and Dim at narrow width", async ({ page, hostPair, signInToStudio, recordSafeBackendTraffic, recordSafeConsoleErrors }) => {
  const traffic = recordSafeBackendTraffic(page, hostPair);
  const consoleErrors = recordSafeConsoleErrors(page);
  await signInToStudio(page, hostPair);
  const draft = await createPersistedExpressionDraft(page, hostPair);
  await openWorkflowDraft(page, hostPair, draft);
  await selectWorkflowTarget(page, draft);
  const syntax = page.getByRole("button", { name: `${draft.inputName} expression syntax` });
  // A preview may load a static parser, but it must not create a rich editor session.
  const firstPreview = page.getByRole("button", { name: "JavaScript expression. Activate to edit." });
  await expect(firstPreview.locator("[class*='studio-code-token-']").first()).toBeVisible();
  await expect(page.locator(".studio-code-editor-rich .cm-editor")).toHaveCount(0);

  for (const language of ["JavaScript", "Liquid"] as const) {
    if (language === "Liquid") {
      await syntax.click();
      await page.getByRole("option", { name: language, exact: true }).click();
    }
    const preview = page.getByRole("button", { name: `${language} expression. Activate to edit.` });
    await preview.click();
    const editor = page.locator(".studio-code-editor-rich-compact .cm-content");
    const source = language === "JavaScript" ? "Math.abs(-2)" : "{{ customerName | append: 'x' }}";
    const sourcePhase = await replacePersistedWorkflowSource(page, hostPair, editor, draft, traffic, language, source);
    // Leaving the compact editor returns to the same lazy preview without editing the value.
    await syntax.focus();
    await expect(preview).toBeVisible();
    for (const mode of ["Light", "Dark", "Dim"] as const) {
      // The existing bottom panel overlaps the shell's colour control at narrow width.
      // Use its real desktop control, then measure every authoring surface at narrow width.
      await page.setViewportSize({ width: 1280, height: 720 });
      await page.getByRole("radiogroup", { name: "Colour mode" }).getByRole("radio", { name: mode, exact: true }).click();
      await expect(page.locator("html")).toHaveAttribute("data-theme-appearance", mode.toLowerCase());
      await page.setViewportSize({ width: 390, height: 844 });
      await expect(preview.locator("[class*='studio-code-token-']").first()).toBeVisible();
      await expectReadableCodeSurface(preview);
      await expect.poll(() => readPersistedSource(page, hostPair, draft)).toBe(source);
      await preview.focus();
      await expect(editor).toBeVisible();
      await expect(editor).toBeFocused();
      await expect(editor.locator("[class*='studio-code-token-']").first()).toBeVisible();
      await expectReadableCodeSurface(editor, { focused: true });
      await editor.press("ControlOrMeta+A");
      await expect.poll(() => editor.evaluate(element => {
        const selection = window.getSelection();
        return !!selection && !selection.isCollapsed && element.contains(selection.anchorNode);
      })).toBe(true);
      await expectReadableCodeSurface(editor, { focused: true, selected: true });

      const position = language === "JavaScript" ? source.indexOf("abs") + 4 : source.indexOf("append") + 6;
      await moveEditorCursor(editor, source, position);
      const section = editor.locator("xpath=ancestor::section[@data-studio-code-editor='true'][1]");
      const signature = section.locator(".studio-code-editor-signature");
      await expect(signature).toContainText(language === "JavaScript" ? "abs(x): Number" : "append(value): String");
      await expectReadableCodeSurface(signature);
      await moveEditorCursor(editor, source, language === "JavaScript" ? source.indexOf("abs") + 3 : position);
      await expect(async () => {
        await editor.press("Alt+i");
        const hover = page.getByRole("status", { name: "Hover information" });
        await expect(hover).toBeVisible({ timeout: 1_000 });
        await expectReadableCodeSurface(hover);
      }).toPass({ timeout: 15_000 });
      await editor.press("Escape");
      await moveEditorCursor(editor, source, language === "JavaScript" ? source.indexOf("abs") + 2 : position);
      await expect(async () => {
        await editor.press("Control+Space");
        const menu = page.locator(".cm-tooltip-autocomplete");
        await expect(menu).toBeVisible({ timeout: 1_000 });
        await expectReadableCodeSurface(menu.locator('[aria-selected="true"]'));
      }).toPass({ timeout: 15_000 });
      await editor.press("Escape");
      if (mode === "Light") {
        // Prove this language's current-source help is backed by successful version-matched
        // assistance; later repeated help may legitimately reuse that authorized metadata.
        await expect.poll(() => language === "Liquid"
          ? hasFreshCatalog(traffic.slice(sourcePhase.start), draft, language, sourcePhase.previousRevision)
          : hasFreshAssistance(traffic.slice(sourcePhase.start), draft, language,
            "/expression-tooling/hover", sourcePhase.previousRevision)).toBe(true);
      }
      await expect.poll(() => readEditorSource(editor)).toBe(source);
      await expect.poll(() => readPersistedSource(page, hostPair, draft)).toBe(source);
      await replacePersistedWorkflowSource(page, hostPair, editor, draft, traffic, language,
        language === "JavaScript" ? "if (" : "{{ customerName");
      const diagnostics = section.locator(".studio-code-editor-diagnostics");
      await expect(diagnostics).toContainText(`${language}/Syntax`);
      await expectReadableCodeSurface(diagnostics);
      await editor.press("ControlOrMeta+Z");
      await expect.poll(() => readEditorSource(editor)).toBe(source);
      await expect.poll(() => readPersistedSource(page, hostPair, draft)).toBe(source);
      // Actual keyboard exit is preserved even after help and completion were dismissed.
      await editor.press("Escape");
      await editor.press("Tab");
      await expect(syntax).toBeFocused();
      await expect(preview).toBeVisible();
      await expectReadableCodeSurface(preview);
      // Expanded rendering uses the same theme roles and exact source, not a separate engine.
      await expectExpandedSourceContinuity(page, hostPair, draft, source);
      await expect(preview).toBeVisible();
      // A multiline preview stays a real button on keyboard focus rather than activating.
      await preview.click();
      await expect(editor).toBeVisible();
      const multilineSource = `${source}\n`;
      await replacePersistedWorkflowSource(page, hostPair, editor, draft, traffic, language, multilineSource);
      await editor.press("Escape");
      await editor.press("Tab");
      await expect(syntax).toBeFocused();
      await syntax.press("Shift+Tab");
      await expect(preview).toBeFocused();
      await expect.poll(() => preview.evaluate(element => element.matches(":focus-visible"))).toBe(true);
      await expect(page.locator(".studio-code-editor-rich .cm-editor")).toHaveCount(0);
      await expectReadableCodeSurface(preview, { focused: true });
      await expect.poll(() => readPersistedSource(page, hostPair, draft)).toBe(multilineSource);
      await preview.press("Enter");
      const expanded = page.getByRole("dialog").locator(".studio-code-editor-rich-expanded .cm-content");
      await expect(expanded).toBeFocused();
      await expect.poll(() => readEditorSource(expanded)).toBe(multilineSource);
      await replacePersistedWorkflowSource(page, hostPair, expanded, draft, traffic, language, source);
      await page.getByRole("dialog").getByRole("button", { name: `Close ${draft.inputName} editor` }).click();
      await expect(preview).toBeVisible();
    }

    await page.setViewportSize({ width: 1280, height: 720 });
    await expectExpandedSourceContinuity(page, hostPair, draft, source);
    await expect(preview).toBeVisible();
    await expect.poll(() => readPersistedSource(page, hostPair, draft)).toBe(source);
  }
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

async function expectExpandedSourceContinuity(page: Page, pair: NormalHostPair,
  draft: PersistedExpressionDraft, source: string) {
  await page.getByRole("button", { name: `Open expanded ${draft.inputName} editor` }).click();
  const dialog = page.getByRole("dialog");
  const expanded = dialog.locator(".studio-code-editor-rich-expanded .cm-content");
  await expect.poll(() => readEditorSource(expanded)).toBe(source);
  await expectReadableCodeSurface(expanded);
  await dialog.getByRole("button", { name: `Close ${draft.inputName} editor` }).click();
  await expect(dialog).toHaveCount(0);
  await expect.poll(() => readPersistedSource(page, pair, draft)).toBe(source);
}

async function expectReadableCodeSurface(surface: Locator, options: { focused?: boolean; selected?: boolean } = {}) {
  await expect(surface).toBeVisible();
  const measurements = await surface.evaluate((element, selected) => {
    const canvas = document.createElement("canvas");
    canvas.width = canvas.height = 1;
    const context = canvas.getContext("2d", { willReadFrequently: true });
    if (!context) throw new Error("Canvas color conversion is unavailable.");
    const rgba = (color: string) => {
      context.clearRect(0, 0, 1, 1);
      context.fillStyle = color;
      context.fillRect(0, 0, 1, 1);
      return Array.from(context.getImageData(0, 0, 1, 1).data);
    };
    const blend = (front: number[], back: number[]) => front.slice(0, 3)
      .map((channel, index) => channel * front[3] / 255 + back[index] * (1 - front[3] / 255));
    const luminance = (rgb: number[]) => rgb.slice(0, 3).map(channel => {
      const normalized = channel / 255;
      return normalized <= 0.04045 ? normalized / 12.92 : ((normalized + 0.055) / 1.055) ** 2.4;
    }).reduce((total, channel, index) => total + channel * [0.2126, 0.7152, 0.0722][index], 0);
    const contrast = (foreground: number[], background: number[]) => {
      const a = luminance(blend(foreground, background));
      const b = luminance(background);
      return (Math.max(a, b) + 0.05) / (Math.min(a, b) + 0.05);
    };
    const backgroundOf = (node: Element) => {
      const ancestors: Element[] = [];
      for (let current: Element | null = node; current; current = current.parentElement) ancestors.push(current);
      return ancestors.reverse().reduce((background, ancestor) =>
        blend(rgba(getComputedStyle(ancestor).backgroundColor), background), [255, 255, 255]);
    };
    // Measure each actual text parent's foreground: diagnostics/docs may override the container.
    // Read only colors and classes, never authored text, into the returned evidence.
    const nodes = new Set<Element>();
    const walker = document.createTreeWalker(element, NodeFilter.SHOW_TEXT);
    for (let text = walker.nextNode(); text; text = walker.nextNode()) {
      if (text.textContent?.trim() && text.parentElement) nodes.add(text.parentElement);
    }
    const ratios = [...nodes].map(node => {
      const style = getComputedStyle(node, selected ? "::selection" : null);
      const tokenStyle = selected ? getComputedStyle(node) : undefined;
      const accent = tokenStyle?.getPropertyValue("--studio-accent").trim();
      const onAccent = tokenStyle?.getPropertyValue("--studio-accent-text").trim();
      const accentRgba = accent ? rgba(accent) : undefined;
      const onAccentRgba = onAccent ? rgba(onAccent) : undefined;
      const selectionBackground = selected ? rgba(style.backgroundColor) : undefined;
      const foreground = rgba(style.color);
      const background = selectionBackground ? blend(selectionBackground, backgroundOf(node)) : backgroundOf(node);
      return { className: node.className, contrast: contrast(foreground, background),
        selectionAlpha: selectionBackground?.[3],
        selectionTokenOwned: selected && !!accentRgba && !!onAccentRgba &&
          selectionBackground?.every((channel, index) => channel === accentRgba[index]) &&
          foreground.every((channel, index) => channel === onAccentRgba[index]) };
    });
    const bounds = element.getBoundingClientRect();
    const pane = element.closest(".wf-properties");
    const paneBounds = pane?.getBoundingClientRect();
    const editor = element.closest(".cm-editor");
    const focusSurface = editor ?? element.closest(".studio-code-editor-preview");
    const focusStyle = focusSurface && getComputedStyle(focusSurface);
    return {
      ratios, left: bounds.left, right: bounds.right, viewportWidth: window.innerWidth,
      pane: pane && paneBounds ? { left: paneBounds.left, right: paneBounds.right,
        scrollWidth: pane.scrollWidth, clientWidth: pane.clientWidth } : null,
      focus: focusSurface && focusStyle ? { width: parseFloat(focusStyle.outlineWidth), style: focusStyle.outlineStyle,
        contrast: contrast(rgba(focusStyle.outlineColor), backgroundOf(focusSurface.parentElement ?? focusSurface)) } : null
    };
  }, options.selected === true);
  expect(measurements.ratios.length).toBeGreaterThan(0);
  for (const measurement of measurements.ratios) {
    expect(measurement.contrast, `Text contrast for ${measurement.className}`).toBeGreaterThanOrEqual(4.5);
    if (options.selected) {
      expect(measurement.selectionAlpha).toBeGreaterThan(0);
      expect(measurement.selectionTokenOwned, `Selection tokens for ${measurement.className}`).toBe(true);
    }
  }
  expect(measurements.left).toBeGreaterThanOrEqual(-1);
  expect(measurements.right).toBeLessThanOrEqual(measurements.viewportWidth + 1);
  if (measurements.pane) {
    expect(measurements.pane.left).toBeGreaterThanOrEqual(-1);
    expect(measurements.pane.right).toBeLessThanOrEqual(measurements.viewportWidth + 1);
    expect(measurements.pane.scrollWidth).toBeLessThanOrEqual(measurements.pane.clientWidth + 1);
  }
  if (options.focused) {
    expect(measurements.focus?.style).toBe("solid");
    expect(measurements.focus?.width).toBeGreaterThanOrEqual(2);
    expect(measurements.focus?.contrast).toBeGreaterThanOrEqual(3);
  }
}

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
    expect(syntax === "Liquid"
      ? hasFreshCatalog(traffic.slice(phase.start), draft, syntax, phase.previousRevision)
      : hasFreshAssistance(traffic.slice(phase.start), draft, syntax, "/expression-tooling/completions", phase.previousRevision)).toBe(true);
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
    expect(syntax === "Liquid"
      ? hasFreshCatalog(traffic.slice(phase.start), draft, syntax, phase.previousRevision)
      : hasFreshAssistance(traffic.slice(phase.start), draft, syntax, "/expression-tooling/hover", phase.previousRevision)).toBe(true);
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
  await expect(page.locator(".wf-status")).toHaveText("Autosaving...");
  await expect(page.locator(".wf-status")).toHaveText("Autosaved");
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

async function exerciseLiquidDepth(page: Page, pair: NormalHostPair, editor: Locator,
  draft: PersistedExpressionDraft, traffic: SafeBackendTraffic[], expanded = false) {
  for (const { marked, label } of [
    // Inserting a newline in compact mode intentionally expands the editor.
    { marked: `{{ customerName${expanded ? "\n" : " "} | up¦XX }}`, label: "upcase" },
    { marked: "{% i¦XX customerName %}ok{% endif %}", label: "if" }
  ]) {
    const position = marked.indexOf("¦");
    const source = marked.replace("¦", "");
    const accepted = source.replace(label === "if" ? "iXX" : "upXX", label);
    const phase = await replacePersistedWorkflowSource(page, pair, editor, draft, traffic, "Liquid", source);
    const interactionStart = traffic.length;
    await expect(async () => {
      await moveEditorCursor(editor, source, position);
      await editor.press("Control+Space");
      const menu = page.locator(".cm-tooltip-autocomplete");
      const option = menu.getByRole("option").filter({ has: page.locator(".cm-completionLabel", { hasText: new RegExp(`^${label}$`) }) });
      await expect(option).toHaveCount(1, { timeout: 1_000 });
      for (const denied of ["date", "include", "render"]) {
        await expect(menu.getByRole("option").locator(".cm-completionLabel", { hasText: new RegExp(`^${denied}$`) }))
          .toHaveCount(0);
      }
      expect(hasFreshCatalog(traffic.slice(interactionStart), draft, "Liquid", phase.previousRevision)).toBe(true);
      const selected = menu.locator('[aria-selected="true"]');
      for (let step = 0; step < await menu.getByRole("option").count(); step++) {
        if ((await selected.locator(".cm-completionLabel").textContent()) === label) break;
        await editor.press("ArrowDown");
      }
      await expect(selected.locator(".cm-completionLabel")).toHaveText(label);
    }).toPass({ timeout: 15_000 });
    await expect(async () => {
      await editor.press("Enter");
      await expect.poll(() => readEditorSource(editor), { timeout: 1_000 }).toBe(accepted);
    }).toPass({ timeout: 5_000 });
    await expect.poll(() => readPersistedSource(page, pair, draft)).toBe(accepted);
    await editor.press("ControlOrMeta+Z");
    await expect.poll(() => readEditorSource(editor)).toBe(source);
    await expect.poll(() => readPersistedSource(page, pair, draft)).toBe(source);
  }

  const marked = "{{ customerName | append¦: 'x' }}";
  const source = marked.replace("¦", "");
  const phase = await replacePersistedWorkflowSource(page, pair, editor, draft, traffic, "Liquid", source);
  const interactionStart = traffic.length;
  await moveEditorCursor(editor, source, marked.indexOf("¦"));
  const section = editor.locator("xpath=ancestor::section[@data-studio-code-editor='true'][1]");
  await expect(section.locator(".studio-code-editor-signature")).toContainText("append(value): String");
  await editor.press("Alt+i");
  await expect(page.getByRole("status", { name: "Hover information" }))
    .toContainText("Appends the argument to the input text.");
  await expect.poll(() => hasFreshCatalog(traffic.slice(interactionStart), draft, "Liquid", phase.previousRevision)).toBe(true);
  await editor.press("Escape");

  const template = "Hello !";
  await replacePersistedWorkflowSource(page, pair, editor, draft, traffic, "Liquid", template);
  await expect(async () => {
    await moveEditorCursor(editor, template, template.length - 1);
    await editor.press("Control+Space");
    await expect(page.locator(".cm-tooltip-autocomplete").getByRole("option").locator(".cm-completionLabel"))
      .toHaveText(["{{ }}"], { timeout: 1_000 });
  }).toPass({ timeout: 15_000 });
  await expect(async () => {
    await editor.press("Enter");
    await expect.poll(() => readEditorSource(editor), { timeout: 1_000 }).toBe("Hello {{ value }}!");
  }).toPass({ timeout: 5_000 });
  await expect.poll(() => readPersistedSource(page, pair, draft)).toBe("Hello {{ value }}!");
  await editor.press("ControlOrMeta+Z");
  await expect.poll(() => readEditorSource(editor)).toBe(template);
  await expect.poll(() => readPersistedSource(page, pair, draft)).toBe(template);
}

async function readEditorSource(editor: Locator) {
  // CodeMirror renders each logical line separately; preserve literal whitespace.
  return editor.locator(".cm-line").evaluateAll(lines => lines.map(line => line.textContent ?? "").join("\n"));
}

async function moveEditorCursor(editor: Locator, source: string, position: number) {
  await editor.press("ControlOrMeta+End");
  for (let step = position; step < source.length; step++) await editor.press("ArrowLeft");
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

function hasFreshCatalog(traffic: SafeBackendTraffic[], draft: PersistedExpressionDraft, syntax: string, previousRevision: number) {
  const context = traffic.filter(request => request.path.endsWith("/expression-tooling/context") && request.isCatalogSearch &&
    matchesDraftLocation(request, draft, syntax)).at(-1);
  return context?.status === 200 && context.outcomeState === 0 &&
    context.documentRevision !== undefined && Number(context.documentRevision) > previousRevision &&
    context.responseDocumentRevision === context.documentRevision && context.responseContextRevision !== undefined &&
    (context.contextRevision === undefined || context.contextRevision === context.responseContextRevision);
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
