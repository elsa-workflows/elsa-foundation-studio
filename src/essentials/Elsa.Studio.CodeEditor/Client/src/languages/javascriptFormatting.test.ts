import { describe, expect, it } from "vitest";
import type { StudioCodeFormatRequest, StudioCodeGrammarProfile } from "../types";
import { formatJavaScript } from "./javascriptFormatting";

function javascriptRequest(
  value: string,
  grammarProfile: StudioCodeGrammarProfile = "expression",
  signal: AbortSignal = new AbortController().signal
): StudioCodeFormatRequest {
  return {
    document: { uri: "test://javascript", language: "javascript", value },
    grammarProfile,
    selection: { ranges: [{ anchor: 0, head: 0 }], mainIndex: 0 },
    signal
  };
}

describe("JavaScript conservative formatting", () => {
  it("collapses only inter-token horizontal gaps and preserves opaque and line-ending bytes", () => {
    const source = "  order\t  + \"text  exact\"\r\n";

    const result = formatJavaScript(javascriptRequest(source));

    expect(result).toEqual({
      state: "ready",
      edits: [
        { from: 7, to: 10, insert: " " }
      ]
    });
    if (result.state !== "ready") throw new Error("Expected supported expression formatting");
    const formatted = [...result.edits].reverse().reduce(
      (value, edit) => value.slice(0, edit.from) + edit.insert + value.slice(edit.to),
      source
    );
    expect(formatted).toBe("  order + \"text  exact\"\r\n");
  });

  it("adds spaces around a parser-proven binary operator without changing its tokenization", () => {
    const source = "args.order+ 2";
    const result = formatJavaScript(javascriptRequest(source));

    expect(result).toEqual({
      state: "ready",
      edits: [{ from: 10, to: 10, insert: " " }]
    });
    if (result.state !== "ready") throw new Error("Expected supported expression formatting");
    const formatted = result.edits.reduce(
      (value, edit) => value.slice(0, edit.from) + edit.insert + value.slice(edit.to),
      source
    );
    expect(formatted).toBe("args.order + 2");
  });

  it("keeps strings, template contents, regexes, comments, and original line endings byte-exact", () => {
    const template = "`raw  ${1+2}`";
    const regex = "/a  + b/";
    const comment = "// comment  exact";
    const source = ` \t({  text\t:\t${template},   regex\t:\t${regex} })\t ${comment}\r\n`;
    const result = formatJavaScript(javascriptRequest(source, "program"));

    expect(result.state).toBe("ready");
    if (result.state !== "ready") throw new Error("Expected supported JavaScript program formatting");
    const formatted = [...result.edits].reverse().reduce(
      (value, edit) => value.slice(0, edit.from) + edit.insert + value.slice(edit.to),
      source
    );
    expect(formatted.startsWith(" \t(" )).toBe(true);
    expect(formatted).toContain(template);
    expect(formatted).toContain(regex);
    expect(formatted).toContain(comment);
    expect(formatted.endsWith("\r\n")).toBe(true);
  });

  it("keeps expression and program parser profiles separate", () => {
    const source = "const value=1;";

    expect(formatJavaScript(javascriptRequest(source, "expression"))).toEqual({ state: "unsupported" });
    expect(formatJavaScript(javascriptRequest(source, "program")).state).toBe("ready");
  });

  it.each(["const value: number= 1;", "const element= <span />;"])("declines non-runtime program syntax: %s", source => {
    expect(formatJavaScript(javascriptRequest(source, "program"))).toEqual({ state: "unsupported" });
  });

  it("declines malformed, aborted, oversized, and over-deep input", () => {
    const aborted = new AbortController();
    aborted.abort();

    expect(formatJavaScript(javascriptRequest("const =", "program"))).toEqual({ state: "unsupported" });
    expect(formatJavaScript(javascriptRequest("value+1", "expression", aborted.signal))).toEqual({ state: "unsupported" });
    expect(formatJavaScript(javascriptRequest("x".repeat(100_001)))).toEqual({ state: "unsupported" });
    const nested = `${"(".repeat(300)}value${")".repeat(300)}`;
    expect(formatJavaScript(javascriptRequest(nested))).toEqual({ state: "unsupported" });
  });

  it("declines a flat program that exceeds the syntax-node budget", () => {
    const statements = `${"value;".repeat(7_000)}`;

    expect(formatJavaScript(javascriptRequest(statements, "program"))).toEqual({ state: "unsupported" });
  });
});
