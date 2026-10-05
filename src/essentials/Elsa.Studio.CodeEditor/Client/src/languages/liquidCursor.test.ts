import { describe, expect, it } from "vitest";
import { createLiquidCursorClassifier } from "./liquidCursor";

describe("Liquid cursor classification", () => {
  it("classifies values, filter names and tag names from parser positions and exact ranges", async () => {
    const classify = createLiquidCursorClassifier();
    const valueSource = "{{\n  customer.profile }}";
    const valuePosition = valueSource.indexOf("profile") + 3;
    const value = await classify(valueSource, valuePosition);

    expect(value).toMatchObject({
      region: "value",
      from: valueSource.indexOf("profile"),
      to: valueSource.indexOf("profile") + "profile".length,
      prefix: "pro",
      valuePath: ["customer", "profile"]
    });

    const filterSource = "{{ customer |\n  safeFilter }}";
    const filterPosition = filterSource.indexOf("safeFilter") + 4;
    expect(await classify(filterSource, filterPosition)).toMatchObject({
      region: "filter",
      from: filterSource.indexOf("safeFilter"),
      to: filterSource.indexOf("safeFilter") + "safeFilter".length,
      prefix: "safe"
    });

    const tagSource = "{%- custTag\n  customer -%}";
    const tagPosition = tagSource.indexOf("custTag") + 4;
    expect(await classify(tagSource, tagPosition)).toMatchObject({
      region: "tag",
      from: tagSource.indexOf("custTag"),
      to: tagSource.indexOf("custTag") + "custTag".length,
      prefix: "cust"
    });
  });

  it("keeps quoted strings, raw blocks and comment blocks quiet", async () => {
    const classify = createLiquidCursorClassifier();
    const source = [
      '{{ "customer.email | date" }}',
      "{% raw %}",
      "{{ customer.email | date }}",
      "{% endraw %}",
      "{% comment %}",
      "{{ customer.email | date }}",
      "{% endcomment %}"
    ].join("\n");

    for (const token of ["customer.email", "date"]) {
      const position = source.indexOf(token) + 2;
      expect(await classify(source, position)).toMatchObject({ region: "quiet" });
    }
    const rawPosition = source.indexOf("customer.email", source.indexOf("{% raw %}")) + 3;
    const commentPosition = source.indexOf("customer.email", source.indexOf("{% comment %}")) + 3;
    expect(await classify(source, rawPosition)).toMatchObject({ region: "quiet" });
    expect(await classify(source, commentPosition)).toMatchObject({ region: "quiet" });

    const rawStart = source.indexOf("{% raw %}") + "{% raw %}".length;
    const rawEnd = source.indexOf("{% endraw %}");
    const commentStart = source.indexOf("{% comment %}") + "{% comment %}".length;
    const commentEnd = source.indexOf("{% endcomment %}");
    for (const position of [rawStart, rawEnd - 1, rawEnd + 3, commentStart, commentEnd - 1, commentEnd + 3]) {
      expect(await classify(source, position)).toMatchObject({ region: "quiet" });
    }
  });

  it("classifies unfinished multiline filter and tag names without guessing call shape", async () => {
    const classify = createLiquidCursorClassifier();
    const filterSource = "{{ customer |\n  safe";
    expect(await classify(filterSource, filterSource.length)).toMatchObject({
      region: "filter",
      from: filterSource.indexOf("safe"),
      to: filterSource.length,
      prefix: "safe"
    });

    const tagSource = "{%- custom";
    expect(await classify(tagSource, tagSource.length)).toMatchObject({
      region: "tag",
      from: tagSource.indexOf("custom"),
      to: tagSource.length,
      prefix: "custom"
    });
  });

  it("uses parsed built-in tag-name bounds so tag arguments remain value positions", async () => {
    const classify = createLiquidCursorClassifier();
    const source = "{%- if customer -%}";
    const valueFrom = source.indexOf("customer");
    expect(await classify(source, valueFrom + 3)).toMatchObject({
      region: "value",
      from: valueFrom,
      to: valueFrom + "customer".length,
      prefix: "cus",
      valuePath: ["customer"]
    });

    const tagFrom = source.indexOf("if");
    expect(await classify(source, tagFrom + 1)).toMatchObject({
      region: "tag",
      from: tagFrom,
      to: tagFrom + 2,
      prefix: "i"
    });
  });

  it("starts empty trim-tag completion after the opener and whitespace", async () => {
    const classify = createLiquidCursorClassifier();
    const source = "{%- ";
    expect(await classify(source, source.length)).toMatchObject({
      region: "tag",
      from: source.length,
      to: source.length,
      prefix: ""
    });
  });

  it("keeps the full parsed name range when completion, hover and signatures start mid-token", async () => {
    const classify = createLiquidCursorClassifier();
    const source = "{{ customer | safeFilter }}";
    const from = source.indexOf("safeFilter");
    const cursor = from + 3;
    expect(await classify(source, cursor)).toMatchObject({
      region: "filter",
      from,
      to: from + "safeFilter".length,
      prefix: "saf"
    });
  });

  it("uses a zero-width range in plaintext and refuses oversized documents", async () => {
    const classify = createLiquidCursorClassifier();
    expect(await classify("plain text", 5)).toMatchObject({ region: "text", from: 5, to: 5, prefix: "" });
    expect(await classify("x".repeat(100_001), 1)).toMatchObject({ region: "quiet" });
  });

  it("keeps deep and computed member paths quiet instead of falling back to root values", async () => {
    const classify = createLiquidCursorClassifier();
    const deepSource = `{{ customer.${Array.from({ length: 7 }, (_, index) => `level${index}`).join(".")}. }}`;
    expect(await classify(deepSource, deepSource.indexOf("}", deepSource.indexOf("customer")))).toMatchObject({ region: "quiet" });

    const computedSource = "{{ customer[0]. }}";
    expect(await classify(computedSource, computedSource.indexOf("}", computedSource.indexOf("customer")))).toMatchObject({ region: "quiet" });
  });
});
