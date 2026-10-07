import { describe, expect, it } from "vitest";
import { createJavaScriptCallSignatureClassifier } from "./javascriptCallSignature";

describe("JavaScript call signature classification", () => {
  const classify = createJavaScriptCallSignatureClassifier();

  it("counts only direct argument separators while classifying the innermost call", async () => {
    const cursor = marked("outer({ values: [first, second] }, nested(inner(a, |b), { flags: [one, two] }), last)");

    await expect(classify(cursor.source, cursor.position)).resolves.toEqual({
      callableName: "inner",
      argumentOrdinal: 1
    });
  });

  it.each([
    { markedSource: "f(\"left,|right\", next)", description: "string argument" },
    { markedSource: "f(/left,|right/, next)", description: "regular-expression argument" },
    { markedSource: "f(`left,|right`, next)", description: "template argument" },
    { markedSource: "f(/* left,|right */ value, next)", description: "comment before an argument" }
  ])("keeps the enclosing call position through a $description", async ({ markedSource }) => {
    const cursor = marked(markedSource);

    await expect(classify(cursor.source, cursor.position)).resolves.toEqual({
      callableName: "f",
      argumentOrdinal: 0
    });
  });

  it("classifies the empty slot after a direct comma in an unfinished call", async () => {
    const cursor = marked("Math.pow(2, |");

    await expect(classify(cursor.source, cursor.position)).resolves.toEqual({
      callableName: "Math.pow",
      argumentOrdinal: 1
    });
  });

  it.each([
    { markedSource: "f('unfinished|", description: "an unfinished string" },
    { markedSource: "f(value)| + other", description: "a cursor after the call" },
    { markedSource: "('f(')|", description: "a call-shaped string" },
    { markedSource: "(value)[|", description: "an unsupported computed call path" }
  ])("leaves $description unknown", async ({ markedSource }) => {
    const cursor = marked(markedSource);
    await expect(classify(cursor.source, cursor.position)).resolves.toBeNull();
  });

  it("does not parse oversized expression documents for signature help", async () => {
    const source = `f(${" ".repeat(100_001)}`;
    await expect(classify(source, source.length)).resolves.toBeNull();
  });
});

function marked(markedSource: string) {
  const position = markedSource.indexOf("|");
  if (position < 0) throw new Error("A cursor marker is required.");
  return { source: markedSource.replace("|", ""), position };
}
