import { describe, expect, it } from "vitest";
import type { StudioCodeFormatRequest } from "../types";
import { formatLiquid } from "./liquidFormatting";

function liquidRequest(value: string): StudioCodeFormatRequest {
  return {
    document: { uri: "test://liquid", language: "liquid", value },
    grammarProfile: "program",
    selection: { ranges: [{ anchor: 0, head: 0 }], mainIndex: 0 },
    signal: new AbortController().signal
  };
}

describe("Liquid conservative formatting", () => {
  it("spaces a parser-proven filter pipe while preserving literal and text bytes", () => {
    const source = "  Hello {{customer|append: '  exact  '}}!\n";

    const result = formatLiquid(liquidRequest(source));

    expect(result).toEqual({
      state: "ready",
      edits: [
        { from: 18, to: 18, insert: " " },
        { from: 19, to: 19, insert: " " }
      ]
    });
    if (result.state !== "ready") throw new Error("Expected supported Liquid interpolation formatting");
    const formatted = [...result.edits].reverse().reduce(
      (value, edit) => value.slice(0, edit.from) + edit.insert + value.slice(edit.to),
      source
    );
    expect(formatted).toBe("  Hello {{customer | append: '  exact  '}}!\n");
  });

  it("returns a ready no-op for plaintext and keeps it distinct from unsupported", () => {
    expect(formatLiquid(liquidRequest("Plain text only\r\n"))).toEqual({ state: "ready", edits: [] });
    expect(formatLiquid({ ...liquidRequest("{{customer}}"), grammarProfile: "expression" })).toEqual({ state: "ready", edits: [] });
  });

  it.each([
    "{% if customer %}{{customer}}{% endif %}",
    "{% raw %}{{ customer }}{% endraw %}",
    "{% comment %}not formatter-owned{% endcomment %}",
    "{{- customer | upcase -}}",
    "{{customer|}}"
  ])("declines Liquid tags and parser errors (%s)", source => {
    expect(formatLiquid(liquidRequest(source))).toEqual({ state: "unsupported" });
  });
});
