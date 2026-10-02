// @vitest-environment node

import { describe, expect, it } from "vitest";
import { builtInPropertyEditors } from "../app/propertyEditors";
import type { StudioActivityInputDescriptor } from "../sdk";
import { read } from "./themeTestUtils";

// The Workflows properties panel names the masked editor by id across the module boundary and gives a masked
// literal to no other editor, so a rename on either side would hide every masked literal there.
describe("masked property editor id", () => {
  it("is the id of the editor the registry resolves for a password-hinted text input", () => {
    const descriptor: StudioActivityInputDescriptor = { name: "ApiToken", typeName: "System.String", uiHint: "password" };
    const panel = read("../../../../../essentials/Elsa.Studio.Workflows/Client/src/ActivityPropertiesPanel.tsx");
    const panelEditorId = /const maskedPropertyEditorId = "([^"]+)";/.exec(panel)?.[1];
    const resolvedEditorId = [...builtInPropertyEditors]
      .sort((left, right) => (left.order ?? 500) - (right.order ?? 500))
      .find(editor => editor.supports(descriptor, { activity: {}, expressionDescriptors: [], scope: "element" }))?.id;

    expect(panelEditorId).toBe(resolvedEditorId);
  });
});
