// @vitest-environment node

import { describe, expect, it } from "vitest";
import { read } from "./themeTestUtils";

// The SDK package is type-only at the module boundary, so three extensions keep hand-maintained copies of
// the declarations they consume. A flag the canonical SDK exposes but a copy omits is invisible to that
// extension's editors, so each copy must carry the activity-declared sensitivity flags (FR-015).
const typingSources = {
  "canonical SDK": "../sdk/index.ts",
  "Secrets copy": "../../../../../extensions/Elsa.Studio.Secrets/Client/src/studio-sdk.d.ts",
  "JavaScript copy": "../../../../../extensions/Elsa.Studio.ExpressionEditors.JavaScript/Client/src/studio-sdk.d.ts",
  "Liquid copy": "../../../../../extensions/Elsa.Studio.ExpressionEditors.Liquid/Client/src/studio-sdk.d.ts"
};

/** The text between the braces of `interface <name>`, or empty when it is not declared. */
function interfaceBody(source: string, name: string) {
  const start = source.search(new RegExp(`interface ${name}\\b`));
  if (start < 0) return "";
  const open = source.indexOf("{", start);
  let depth = 0;
  for (let index = open; index < source.length; index++) {
    if (source[index] === "{") depth++;
    else if (source[index] === "}" && --depth === 0) return source.slice(open + 1, index);
  }
  return "";
}

describe("StudioActivityInputDescriptor typing copies", () => {
  it.each(Object.entries(typingSources))("%s declares isSensitive? and isCredential?", (_label, path) => {
    const body = interfaceBody(read(path), "StudioActivityInputDescriptor");

    expect(body).toMatch(/^\s*isSensitive\?: boolean \| null;/m);
    expect(body).toMatch(/^\s*isCredential\?: boolean \| null;/m);
  });
});
