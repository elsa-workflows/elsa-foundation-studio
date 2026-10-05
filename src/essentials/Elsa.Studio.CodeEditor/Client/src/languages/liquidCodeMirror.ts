import { liquid, liquidLanguage } from "@codemirror/lang-liquid";
import type { Extension } from "@codemirror/state";

export function createLiquidCodeMirrorExtensions(): Extension[] {
  return [liquid()];
}

/** Internal parser bridge. Syntax nodes stay inside CodeEditor and never cross the neutral cursor seam. */
export function parseLiquidSource(source: string) {
  return liquidLanguage.parser.parse(source);
}
