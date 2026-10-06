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
  await exerciseExplicitFormatting(page, hostPair, compactJavaScript, draft, traffic, "JavaScript", "button");
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
  await exerciseExplicitFormatting(page, hostPair, expandedJavaScript, draft, traffic, "JavaScript", "shortcut");
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
  await exerciseExplicitFormatting(page, hostPair, compactLiquid, draft, traffic, "Liquid", "button");
  await replaceEditorSource(page, compactLiquid, `{{ customerName }} {{ predecessor.${draft.outputName} }}`);
  await page.getByRole("button", { name: `Open expanded ${draft.inputName} editor` }).click();
  const expandedLiquid = page.getByRole("dialog").locator(".studio-code-editor-rich-expanded .cm-content");
  await expect(expandedLiquid).toContainText("customerName");
  await exerciseWorkflowAssistance(page, hostPair, expandedLiquid, draft, traffic, "Liquid");
  await exerciseLiquidDepth(page, hostPair, expandedLiquid, draft, traffic, true);
  await exerciseExplicitFormatting(page, hostPair, expandedLiquid, draft, traffic, "Liquid", "shortcut");
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

completeTest("normal-host expression previews and help remain readable in Light, Dark and Dim at narrow width", async ({ page, headless, hostPair, signInToStudio, recordSafeBackendTraffic, recordSafeConsoleErrors }) => {
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
  await page.getByRole("button", { name: "Collapse bottom panel", exact: true }).click();
  await expect(page.getByRole("button", { name: "Expand bottom panel", exact: true })).toBeVisible();
  // Use the existing inspector-only UI instead of squeezing the desktop three-pane grid.
  await page.getByRole("button", { name: "Maximize inspector panel", exact: true }).click();
  await expect(page.locator(".wf-editor-body")).toHaveClass(/inspector-maximized/);
  // The existing horizontal strip must keep every navigation control keyboard-reachable.
  await page.setViewportSize({ width: 390, height: 844 });
  const workflowUrl = page.url();
  const sidebar = page.locator(".sidebar");
  const brand = sidebar.locator(".brand");
  await brand.focus();
  await expect(brand).toBeInViewport({ ratio: 1 });
  await page.keyboard.press("Tab");
  const search = sidebar.getByRole("searchbox", { name: "Search modules" });
  await expect(search).toBeFocused();
  await expect(search).toBeInViewport({ ratio: 1 });
  const navigationLinks = sidebar.locator(".nav-section a");
  const navigationCount = await navigationLinks.count();
  expect(navigationCount).toBeGreaterThan(0);
  for (let index = 0; index < navigationCount; index++) {
    await page.keyboard.press("Tab");
    await expect(navigationLinks.nth(index)).toBeFocused();
    await expect(navigationLinks.nth(index)).toBeInViewport({ ratio: 1 });
  }
  const navigationRow = await navigationLinks.evaluateAll(links => {
    const boxes = links.map(link => link.getBoundingClientRect());
    return { span: Math.max(...boxes.map(box => box.bottom)) - Math.min(...boxes.map(box => box.top)),
      largestLink: Math.max(...boxes.map(box => box.height)) };
  });
  expect(navigationRow.span, "Narrow navigation must remain one horizontal row")
    .toBeLessThanOrEqual(navigationRow.largestLink + 1);
  expect(page.url()).toBe(workflowUrl);
  await firstPreview.scrollIntoViewIfNeeded();
  await expect(firstPreview).toBeInViewport();
  await page.setViewportSize({ width: 1280, height: 720 });

  for (const language of ["JavaScript", "Liquid"] as const) {
    if (language === "Liquid") {
      await syntax.click();
      await page.getByRole("option", { name: language, exact: true }).click();
    }
    const preview = page.getByRole("button", { name: `${language} expression. Activate to edit.` });
    await preview.click();
    const editor = page.locator(".studio-code-editor-rich-compact .cm-content");
    const source = language === "JavaScript" ? "Math.abs(-2)"
      : "{{ customerName | append: 'theme-aware compact source remains readable at narrow inspector width' }}";
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
      // Highlighting deliberately stops offscreen; bring the actual property into the viewport.
      await preview.scrollIntoViewIfNeeded();
      await expect(preview).toBeInViewport();
      await expect(preview.locator("[class*='studio-code-token-']").first()).toBeVisible();
      const previewTransition = await preview.evaluate(element => {
        const style = getComputedStyle(element);
        return { property: style.transitionProperty, duration: style.transitionDuration };
      });
      // Syntax roles switch immediately. An inherited button color/background transition
      // would pair the new foreground with an intermediate old surface and lose contrast.
      expect(previewTransition, "Preview theme colors must change atomically").toEqual({ property: "none", duration: "0s" });
      await expectReadableCodeSurface(preview);
      await expect.poll(() => readPersistedSource(page, hostPair, draft)).toBe(source);
      await preview.focus();
      await expect(editor).toBeVisible();
      await expect(editor).toBeFocused();
      await expect(editor.locator("[class*='studio-code-token-']").first()).toBeVisible();
      await expectReadableCodeSurface(editor, { focused: true });
      if (language === "Liquid") await expectHorizontalEditorNavigation(editor, source);
      await editor.press("ControlOrMeta+A");
      await expect.poll(() => editor.evaluate(element => {
        const selection = window.getSelection();
        return !!selection && !selection.isCollapsed && element.contains(selection.anchorNode);
      })).toBe(true);
      await expectReadableCodeSurface(editor, { focused: true, selected: true });

      const position = language === "JavaScript" ? source.indexOf("abs") + 4 : source.indexOf("append") + 6;
      await moveEditorCursor(editor, source, position);
      const section = editor.locator("xpath=ancestor::section[@data-studio-code-editor='true'][1]");
      await expectReadableCodeSurface(section.locator(".studio-code-editor-actions"));
      const signature = section.locator(".studio-code-editor-signature");
      await expect(signature).toContainText(language === "JavaScript" ? "abs(x): Number" : "append(value): String");
      await expectReadableCodeSurface(signature);
      await moveEditorCursor(editor, source, language === "JavaScript" ? source.indexOf("abs") + 3 : position);
      await expect(async () => {
        await editor.press("Alt+i");
        const hover = page.getByRole("status", { name: "Hover information" });
        await expect(hover).toBeVisible({ timeout: 1_000 });
      }).toPass({ timeout: 15_000 });
      await expectReadableCodeSurface(page.getByRole("status", { name: "Hover information" }));
      await editor.press("Escape");
      await expect(page.locator(".wf-editor-body")).toHaveClass(/inspector-maximized/);
      const completionPosition = language === "JavaScript" ? source.indexOf("abs") + 2 : position;
      await moveEditorCursor(editor, source, completionPosition);
      await expect.poll(() => readNativeEditorCaret(editor)).toEqual({ offset: completionPosition, visible: true });
      if (language === "Liquid") {
        // Preserve the actual T036 fallback precondition: clipped token start, same-row
        // visible caret. A later layout change must not turn this into a vacuous anchor test.
        await expect.poll(() => readCompletionAnchorPrecondition(editor, source.indexOf("append")))
          .toEqual({ startClipped: true, sameRow: true });
      }
      await expect(async () => {
        await editor.press("Control+Space");
        const menu = page.locator(".cm-tooltip-autocomplete");
        await expect(menu).toBeVisible({ timeout: 1_000 });
      }).toPass({ timeout: 15_000 });
      await expectReadableCodeSurface(page.locator('.cm-tooltip-autocomplete [aria-selected="true"]'));
      await expect.poll(() => readNativeEditorCaret(editor)).toEqual({ offset: completionPosition, visible: true });
      await editor.press("Escape");
      await expect(page.locator(".wf-editor-body")).toHaveClass(/inspector-maximized/);
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
      if (mode === "Light") {
        // Exercise the real narrow inspector control, its editor-return path, and the
        // existing native Tab escape without inventing a live overload catalog.
        await exerciseExplicitFormatting(page, hostPair, editor, draft, traffic, language, "button", { syntax, preview });
        await expect.poll(() => readEditorSource(editor)).toBe(source);
        await expect.poll(() => readPersistedSource(page, hostPair, draft)).toBe(source);
      }
      await replacePersistedWorkflowSource(page, hostPair, editor, draft, traffic, language,
        language === "JavaScript" ? "if (" : "{{ customerName");
      const diagnostics = section.locator(".studio-code-editor-diagnostics");
      await expect(diagnostics).toContainText(`${language}/Syntax`);
      await diagnostics.scrollIntoViewIfNeeded();
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
      let multilineSource: string;
      if (mode === "Light") {
        // Use only this isolated Playwright context's synthetic clipboard. A trusted paste
        // event distinguishes the browser paste path from keyboard.insertText/newline typing.
        const pasteText = language === "JavaScript" ? " + 1\n  + 2 " : "\n  exact\t whitespace  \n";
        multilineSource = source + pasteText;
        await moveEditorCursor(editor, source, source.length);
        await pasteFromIsolatedTestClipboard(page, editor, pasteText, headless);
      } else {
        multilineSource = `${source}\n`;
        await replacePersistedWorkflowSource(page, hostPair, editor, draft, traffic, language, multilineSource);
      }
      // Inserting a newline intentionally expands compact editing. Close that real dialog
      // before checking the multiline preview's non-activating keyboard focus.
      const dialog = page.getByRole("dialog");
      const expanded = dialog.locator(".studio-code-editor-rich-expanded .cm-content");
      await expect(expanded).toBeFocused();
      await expect.poll(() => readEditorSource(expanded)).toBe(multilineSource);
      if (mode === "Light") {
        await expect.poll(() => readNativeEditorCaret(expanded)).toEqual({ offset: multilineSource.length, visible: true });
        await expect.poll(() => readPersistedSource(page, hostPair, draft)).toBe(multilineSource);
        await expanded.press("ControlOrMeta+Z");
        await expect.poll(() => readEditorSource(expanded)).toBe(source);
        await expect.poll(() => readNativeEditorCaret(expanded)).toEqual({ offset: source.length, visible: true });
        await expect.poll(() => readPersistedSource(page, hostPair, draft)).toBe(source);
        await expanded.press("ControlOrMeta+Shift+Z");
        await expect.poll(() => readEditorSource(expanded)).toBe(multilineSource);
        await expect.poll(() => readNativeEditorCaret(expanded)).toEqual({ offset: multilineSource.length, visible: true });
        await expect.poll(() => readPersistedSource(page, hostPair, draft)).toBe(multilineSource);
      }
      await dialog.getByRole("button", { name: `Close ${draft.inputName} editor` }).click();
      await expect(dialog).toHaveCount(0);
      // The row deliberately restores its expand button on the next animation frame.
      await expect(page.getByRole("button", { name: `Open expanded ${draft.inputName} editor` })).toBeFocused();
      await syntax.focus();
      await expect(syntax).toBeFocused();
      await syntax.press("Shift+Tab");
      await expect(preview).toBeFocused();
      await expect.poll(() => preview.evaluate(element => element.matches(":focus-visible"))).toBe(true);
      await expect(page.locator(".studio-code-editor-rich .cm-editor")).toHaveCount(0);
      await expectReadableCodeSurface(preview, { focused: true });
      await expect.poll(() => readPersistedSource(page, hostPair, draft)).toBe(multilineSource);
      await preview.press("Enter");
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
  await expectReadableCodeSurface(dialog.locator(".cm-gutters"));
  await dialog.getByRole("button", { name: `Close ${draft.inputName} editor` }).click();
  await expect(dialog).toHaveCount(0);
  await expect.poll(() => readPersistedSource(page, pair, draft)).toBe(source);
}

async function expectReadableCodeSurface(surface: Locator, options: { focused?: boolean; selected?: boolean } = {}) {
  await expect(surface).toBeVisible();
  await expect(surface).toBeInViewport();
  if (await surface.evaluate(element => element.matches(".cm-content"))) {
    await expect(surface.locator("xpath=ancestor::*[contains(@class, 'cm-scroller')][1]"))
      .toBeInViewport({ ratio: 1 });
  }
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
      return { className: node.className, foreground, background, contrast: contrast(foreground, background),
        selectionAlpha: selectionBackground?.[3],
        selectionTokenOwned: selected && !!accentRgba && !!onAccentRgba &&
          selectionBackground?.every((channel, index) => channel === accentRgba[index]) &&
          foreground.every((channel, index) => channel === onAccentRgba[index]) };
    });
    // CodeMirror's single-line content may be wider than its clipped viewport. Measure
    // the actual code viewport, not the intrinsic text box; other surfaces keep their own bounds.
    const codeScroller = element.matches(".cm-content") ? element.closest(".cm-scroller") : null;
    const bounds = (codeScroller ?? element).getBoundingClientRect();
    const contentBounds = element.getBoundingClientRect();
    const pane = element.closest(".wf-properties");
    const paneBounds = pane?.getBoundingClientRect();
    const editor = element.closest(".cm-editor");
    const scrollGeometry = (node: Element | null) => {
      if (!node) return null;
      const rectangle = node.getBoundingClientRect();
      return { left: rectangle.left, right: rectangle.right, clientWidth: node.clientWidth,
        scrollWidth: node.scrollWidth, scrollLeft: node.scrollLeft, overflowX: getComputedStyle(node).overflowX };
    };
    const focusSurface = editor ?? element.closest(".studio-code-editor-preview");
    const focusStyle = focusSurface && getComputedStyle(focusSurface);
    return {
      ratios, left: bounds.left, right: bounds.right, viewportWidth: window.innerWidth,
      contentOverflows: !!codeScroller && (contentBounds.left < bounds.left - 1 || contentBounds.right > bounds.right + 1),
      editorGeometry: scrollGeometry(editor), scrollerGeometry: scrollGeometry(element.closest(".cm-scroller")),
      pane: pane && paneBounds ? { left: paneBounds.left, right: paneBounds.right,
        scrollWidth: pane.scrollWidth, clientWidth: pane.clientWidth } : null,
      focus: focusSurface && focusStyle ? { width: parseFloat(focusStyle.outlineWidth), style: focusStyle.outlineStyle,
        contrast: contrast(rgba(focusStyle.outlineColor), backgroundOf(focusSurface.parentElement ?? focusSurface)) } : null
    };
  }, options.selected === true);
  expect(measurements.ratios.length).toBeGreaterThan(0);
  for (const measurement of measurements.ratios) {
    expect(measurement.contrast, `Text contrast for ${measurement.className} (${JSON.stringify({
      foreground: measurement.foreground, background: measurement.background
    })})`).toBeGreaterThanOrEqual(4.5);
    if (options.selected) {
      expect(measurement.selectionAlpha).toBeGreaterThan(0);
      expect(measurement.selectionTokenOwned, `Selection tokens for ${measurement.className}`).toBe(true);
    }
  }
  expect(measurements.left).toBeGreaterThanOrEqual(-1);
  expect(measurements.right, JSON.stringify({ left: measurements.left, right: measurements.right,
    viewportWidth: measurements.viewportWidth, editor: measurements.editorGeometry,
    scroller: measurements.scrollerGeometry, pane: measurements.pane }))
    .toBeLessThanOrEqual(measurements.viewportWidth + 1);
  if (measurements.contentOverflows) {
    expect(["auto", "scroll", "hidden"]).toContain(measurements.scrollerGeometry?.overflowX);
    expect(measurements.editorGeometry?.scrollWidth).toBeLessThanOrEqual((measurements.editorGeometry?.clientWidth ?? 0) + 1);
  }
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

async function expectHorizontalEditorNavigation(editor: Locator, source: string) {
  const scroller = editor.locator("xpath=ancestor::*[contains(@class, 'cm-scroller')][1]");
  const overflows = await scroller.evaluate(element => element.scrollWidth > element.clientWidth + 1);
  expect(overflows, "The long Liquid source must exercise horizontal navigation").toBe(true);
  const caretPosition = () => readNativeEditorCaret(editor);
  // A restored session may already have its caret at the end; move it before requesting End.
  await editor.press("Home");
  await expect.poll(caretPosition).toEqual({ offset: 0, visible: true });
  const initialScroll = await scroller.evaluate(element => element.scrollLeft);
  await editor.press("End");
  await expect.poll(caretPosition).toEqual({ offset: source.length, visible: true });
  await expect.poll(() => scroller.evaluate(element => element.scrollLeft)).toBeGreaterThan(initialScroll);
  const endScroll = await scroller.evaluate(element => element.scrollLeft);
  await editor.press("Home");
  await expect.poll(caretPosition).toEqual({ offset: 0, visible: true });
  await expect.poll(() => scroller.evaluate(element => element.scrollLeft)).toBeLessThan(endScroll);
  await expect.poll(() => readEditorSource(editor)).toBe(source);
}

async function readCompletionAnchorPrecondition(editor: Locator, position: number) {
  return editor.evaluate((element, offset) => {
    const viewport = element.closest(".cm-scroller")?.getBoundingClientRect();
    const selection = window.getSelection();
    if (!viewport || !selection?.isCollapsed || !selection.rangeCount || !element.contains(selection.anchorNode)) return null;
    const caret = selection.getRangeAt(0).getBoundingClientRect();
    const walker = document.createTreeWalker(element, NodeFilter.SHOW_TEXT);
    let remaining = offset;
    for (let node = walker.nextNode(); node; node = walker.nextNode()) {
      const length = node.textContent?.length ?? 0;
      if (remaining > length) { remaining -= length; continue; }
      const range = document.createRange();
      range.setStart(node, remaining);
      range.collapse(true);
      const start = range.getBoundingClientRect();
      return { startClipped: start.left < viewport.left || start.right > viewport.right,
        sameRow: Math.abs(start.top - caret.top) < 1 && Math.abs(start.bottom - caret.bottom) < 1 };
    }
    return null;
  }, position);
}

async function readNativeEditorCaret(editor: Locator) {
  return editor.evaluate(element => {
    const selection = window.getSelection();
    const viewport = element.closest(".cm-scroller")?.getBoundingClientRect();
    if (!selection?.isCollapsed || !selection.rangeCount || !element.contains(selection.anchorNode) || !viewport) return null;
    const focusNode = selection.focusNode;
    if (!focusNode) return null;
    const focusLine = focusNode instanceof Element ? focusNode.closest(".cm-line") : focusNode.parentElement?.closest(".cm-line");
    if (!focusLine) return null;
    const lines = Array.from(element.querySelectorAll(".cm-line"));
    const focusLineIndex = lines.indexOf(focusLine);
    if (focusLineIndex < 0) return null;
    const prefix = document.createRange();
    prefix.selectNodeContents(focusLine);
    prefix.setEnd(focusNode, selection.focusOffset);
    const offset = lines.slice(0, focusLineIndex)
      .reduce((total, line) => total + (line.textContent?.length ?? 0) + 1, 0) + prefix.toString().length;
    const caretRange = document.createRange();
    caretRange.setStart(focusNode, selection.focusOffset);
    caretRange.collapse(true);
    const nativeRange = caretRange.getBoundingClientRect();
    // Chromium exposes no collapsed Range rectangle at the start of an empty
    // CodeMirror line. Only that exact native-selection shape may use its BR
    // anchor; text-backed and offscreen carets retain the strict Range check.
    const emptyLineAnchor = focusNode === focusLine && selection.focusOffset === 0 &&
      !focusLine.textContent && focusLine.childNodes.length === 1 &&
      focusLine.firstChild instanceof HTMLBRElement && caretRange.getClientRects().length === 0 &&
      nativeRange.left === 0 && nativeRange.right === 0 && nativeRange.top === 0 && nativeRange.bottom === 0
      ? focusLine.firstChild.getBoundingClientRect() : null;
    const caret = emptyLineAnchor ?? nativeRange;
    return { offset,
      visible: caret.height > 0 && caret.left >= viewport.left - 1 && caret.right <= viewport.right + 1 &&
        caret.top >= viewport.top - 1 && caret.bottom <= viewport.bottom + 1 };
  });
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

  const source = "Math.pow(2, 3)";
  await replacePersistedWorkflowSource(page, pair, editor, draft, traffic, "JavaScript", source);
  await moveEditorCursor(editor, source, source.indexOf("3"));
  const signature = editor.locator("xpath=ancestor::section[@data-studio-code-editor='true'][1]")
    .locator(".studio-code-editor-signature");
  await expect(signature).toContainText("pow(base, exponent): Number");
  await expect(signature.locator(".studio-code-editor-signature-parameter")).toContainText("exponent");
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
  // The filter name is not an argument. Only its explicit colon argument proves parameter0.
  await expect(section.locator(".studio-code-editor-signature-parameter")).toHaveText("");
  await moveEditorCursor(editor, source, source.indexOf("'x'") + 1);
  await expect(section.locator(".studio-code-editor-signature-parameter")).toContainText("value");
  await moveEditorCursor(editor, source, marked.indexOf("¦"));
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

async function exerciseExplicitFormatting(page: Page, pair: NormalHostPair, editor: Locator,
  draft: PersistedExpressionDraft, traffic: SafeBackendTraffic[], language: "JavaScript" | "Liquid", action: "button" | "shortcut",
  focusExit?: { syntax: Locator; preview: Locator }) {
  const source = language === "JavaScript" ? "args.customerName+ '!'" : "  Hello {{customerName|append: '  exact  '}}!  ";
  const formatted = language === "JavaScript" ? "args.customerName + '!'" : "  Hello {{customerName | append: '  exact  '}}!  ";
  const previousSource = await readEditorSource(editor);
  await replacePersistedWorkflowSource(page, pair, editor, draft, traffic, language, source);
  const section = editor.locator("xpath=ancestor::section[@data-studio-code-editor='true'][1]");
  const format = section.getByRole("button", { name: "Format source", exact: true });
  await expect(format).toBeEnabled();
  await expect(format).toBeVisible();
  await expect(format).toBeInViewport();
  await expectReadableCodeSurface(format);
  // Mere availability must not normalize source or create an extra history entry.
  await expect.poll(() => readEditorSource(editor)).toBe(source);
  const caretToken = language === "JavaScript" ? "customerName" : "exact";
  const sourceCaretOffset = source.indexOf(caretToken) + 2;
  const formattedCaretOffset = formatted.indexOf(caretToken) + 2;
  await moveEditorCursor(editor, source, sourceCaretOffset);
  await expect.poll(() => readNativeEditorCaret(editor)).toEqual({ offset: sourceCaretOffset, visible: true });
  const nativeEditor = await editor.elementHandle();
  if (action === "button") {
    await format.focus();
    await expect(format).toBeFocused();
    await expect(editor).toBeVisible();
    await format.press("Enter");
    await expect(format).toBeFocused();
  } else await editor.press("Alt+Shift+f");
  await expect.poll(() => readEditorSource(editor)).toBe(formatted);
  await expect.poll(() => readPersistedSource(page, pair, draft)).toBe(formatted);
  expect(await editor.evaluate((element, original) => element === original, nativeEditor)).toBe(true);
  const formattingStatus = section.getByRole("status")
    .filter({ hasText: /^Source formatted\. Undo restores the original source\.$/ });
  await expect(formattingStatus).toBeVisible();
  await expectReadableCodeSurface(formattingStatus);
  await editor.focus();
  await expect.poll(() => readNativeEditorCaret(editor)).toEqual({ offset: formattedCaretOffset, visible: true });

  if (focusExit) {
    await format.focus();
    await expect(format).toBeFocused();
    await format.press("Escape");
    await expect(editor).toBeFocused();
    await editor.press("Tab");
    await expect(focusExit.syntax).toBeFocused();
    await expect(focusExit.preview).toBeVisible();
    await expect(page.locator(".studio-code-editor-rich .cm-editor")).toHaveCount(0);
    await focusExit.syntax.press("Shift+Tab");
    // Single-line preview focus activates the rich editor through the real native path.
    await expect(editor).toBeFocused();
    await expect.poll(() => readEditorSource(editor)).toBe(formatted);
    await expect.poll(() => readPersistedSource(page, pair, draft)).toBe(formatted);
    await expect.poll(() => readNativeEditorCaret(editor)).toEqual({ offset: formattedCaretOffset, visible: true });
  }
  // One undo restores the exact pre-format source/caret, including after actual exit.
  await editor.press("ControlOrMeta+Z");
  await expect.poll(() => readEditorSource(editor)).toBe(source);
  await expect.poll(() => readPersistedSource(page, pair, draft)).toBe(source);
  await expect.poll(() => readNativeEditorCaret(editor)).toEqual({ offset: sourceCaretOffset, visible: true });
  if (focusExit) await replacePersistedWorkflowSource(page, pair, editor, draft, traffic, language, previousSource);
  await nativeEditor?.dispose();
}

async function pasteFromIsolatedTestClipboard(page: Page, editor: Locator, text: string, headless: boolean) {
  // Headless Chromium uses an in-memory clipboard. Never run this helper on the
  // user's headed browser or read the platform clipboard to preserve/restore it.
  // Desktop device presets override userAgent even when the browser is headless.
  expect(headless,
    "Synthetic clipboard paste requires the isolated headless browser").toBe(true);
  const origin = new URL(page.url()).origin;
  await page.context().grantPermissions(["clipboard-write"], { origin });
  await page.evaluate(async value => navigator.clipboard.writeText(value), text);
  const nativeEditor = await editor.elementHandle();
  if (!nativeEditor) throw new Error("The native paste target is unavailable");
  try {
    await nativeEditor.evaluate((element, expectedText) => {
      const target = element as HTMLElement & {
        expressionTestPaste?: { trusted: boolean; exact: boolean };
      };
      target.expressionTestPaste = undefined;
      target.addEventListener("paste", event => {
        const clipboardEvent = event as ClipboardEvent;
        target.expressionTestPaste = {
          trusted: clipboardEvent.isTrusted,
          exact: clipboardEvent.clipboardData?.getData("text/plain") === expectedText
        };
      }, { once: true });
    }, text);
    await editor.press("ControlOrMeta+V");
    // Multiline paste replaces compact DOM with the expanded view; retain the event target.
    await expect.poll(() => nativeEditor.evaluate(element =>
      (element as HTMLElement & { expressionTestPaste?: { trusted: boolean; exact: boolean } })
        .expressionTestPaste ?? null)).toEqual({ trusted: true, exact: true });
  } finally {
    await nativeEditor.dispose();
  }
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
