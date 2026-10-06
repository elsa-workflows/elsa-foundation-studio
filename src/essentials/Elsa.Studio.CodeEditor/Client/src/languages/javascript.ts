import type { StudioCodeLanguageAdapter } from "../types";

export const javaScriptLanguageAdapter: StudioCodeLanguageAdapter = {
  language: "javascript",
  displayName: "JavaScript",
  async loadEditor() {
    const module = await import("../engines/CodeMirrorStudioCodeEditor");
    return { default: module.CodeMirrorStudioCodeEditor };
  },
  async loadSupport() {
    return { language: "javascript" };
  },
  async loadFormatter() {
    const module = await import("./javascriptFormatting");
    return module.formatJavaScript;
  },
  async loadPreviewHighlighter(grammarProfile) {
    const module = await import("../engines/javascriptPreview");
    return module.createJavaScriptPreviewHighlighter(grammarProfile);
  }
};
