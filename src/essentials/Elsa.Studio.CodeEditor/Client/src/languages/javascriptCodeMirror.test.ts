import { syntaxTree } from "@codemirror/language";
import { EditorState } from "@codemirror/state";
import { describe, expect, it } from "vitest";
import { collectCodeMirrorSyntaxDiagnostics } from "../engines/codeMirrorSyntaxDiagnostics";
import type { StudioCodeGrammarProfile } from "../types";
import { createJavaScriptCodeMirrorExtensions } from "./javascriptCodeMirror";

describe("JavaScript CodeMirror grammar profiles", () => {
  it.each([
    ["({ result: input })", "object expression"],
    ["function (value) { return value + 1; }", "function expression with a return statement"],
    ["(value) => value + 1", "arrow expression"]
  ])("accepts %s as a JavaScript expression", source => {
    expect(expressionDiagnostics(source)).toEqual([]);
  });

  it.each([
    ["(value: number) => value", "typed arrow parameter"],
    ["value as number", "type assertion"],
    ["value as const", "const type assertion"],
    ["(value?: number) => value", "optional typed parameter"],
    ["function<T>(value: T) { return value; }", "generic function expression"],
    ["value!", "non-null assertion"],
    ["<Widget value={1} />", "JSX expression"],
    ["const value = 1;", "top-level declaration"],
    ["if (value) { value + 1; }", "statement body"],
    ["return value;", "top-level return statement"]
  ])("reports %s as unsupported in expression mode", source => {
    expect(expressionDiagnostics(source)).toEqual(expect.arrayContaining([
      expect.objectContaining({ severity: "error" })
    ]));
  });

  it.each(["value as const", "value!"])("uses a distinct advisory code for unsupported JavaScript-expression syntax: %s", source => {
    expect(expressionDiagnostics(source)).toEqual(expect.arrayContaining([
      expect.objectContaining({
        code: "STUDIO-EXPRESSION-SYNTAX",
        message: "TypeScript syntax is not supported in JavaScript expressions."
      })
    ]));
  });

  it("does not treat JavaScript property names that resemble TypeScript nodes as TypeScript", () => {
    expect(expressionDiagnostics("({ TypeName: value, TypeAnnotation: other, as: 3, satisfies: test })")).toEqual([]);
    expect(expressionDiagnostics("data.TypeName")).toEqual([]);
  });

  it("keeps valid JavaScript class expressions and class fields available", () => {
    expect(expressionDiagnostics("class { field = 1; method() { return this.field; } }")).toEqual([]);
  });

  it("keeps incomplete expressions editable and clears local diagnostics when completed", () => {
    const state = createState("input.", "expression");
    expect(collectCodeMirrorSyntaxDiagnostics(state, "expression")).not.toEqual([]);

    const completed = state.update({ changes: { from: state.doc.length, insert: "total" } }).state;
    expect(completed.doc.toString()).toBe("input.total");
    expect(collectCodeMirrorSyntaxDiagnostics(completed, "expression")).toEqual([]);
  });

  it("retains the broad JavaScript, TypeScript, JSX and program grammar by default", () => {
    const state = createState("import { value } from './module.js'; const View = (input: number) => <Widget value={input} />;", "program");

    expect(syntaxTree(state).topNode.name).toBe("Script");
    expect(collectCodeMirrorSyntaxDiagnostics(state)).toEqual([]);
  });

  it("uses a single-expression parse root only for the explicit expression profile", () => {
    expect(syntaxTree(createState("value + 1", "expression")).topNode.name).toBe("SingleExpression");
    expect(syntaxTree(createState("value + 1", "program")).topNode.name).toBe("Script");
  });

  it("does not install the program adapter's statement completion sources in expression mode", () => {
    expect(createState("", "program").languageDataAt("autocomplete", 0).length).toBeGreaterThan(0);
    expect(createState("", "expression").languageDataAt("autocomplete", 0)).toEqual([]);
  });
});

function expressionDiagnostics(source: string) {
  return collectCodeMirrorSyntaxDiagnostics(createState(source, "expression"), "expression");
}

function createState(source: string, grammarProfile: StudioCodeGrammarProfile) {
  return EditorState.create({
    doc: source,
    extensions: createJavaScriptCodeMirrorExtensions(grammarProfile)
  });
}
