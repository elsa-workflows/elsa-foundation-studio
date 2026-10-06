import { javascript, javascriptLanguage } from "@codemirror/lang-javascript";
import { LanguageSupport } from "@codemirror/language";
import type { Extension } from "@codemirror/state";
import type { StudioCodeGrammarProfile } from "../types";

export function createJavaScriptCodeMirrorExtensions(grammarProfile?: StudioCodeGrammarProfile): Extension[] {
  if (grammarProfile === "expression") {
    // Avoid javascript() here: it adds statement-oriented completion snippets as well as
    // the broad Script grammar. Expression tooling remains an opt-in adapter profile.
    return [new LanguageSupport(javascriptLanguage.configure({ top: "SingleExpression" }))];
  }

  return [javascript({ jsx: true, typescript: true })];
}
