import type { Extension } from "@codemirror/state";
import type { StudioCodeGrammarProfile } from "../types";

export async function loadCodeMirrorLanguageExtensions(
  language: string,
  grammarProfile?: StudioCodeGrammarProfile
): Promise<Extension[]> {
  const normalized = language.trim().toLowerCase();
  if (normalized === "javascript" || normalized === "typescript") {
    const module = await import("../languages/javascriptCodeMirror");
    return module.createJavaScriptCodeMirrorExtensions(grammarProfile);
  }

  if (normalized === "liquid") {
    const module = await import("../languages/liquidCodeMirror");
    return module.createLiquidCodeMirrorExtensions();
  }

  return [];
}
