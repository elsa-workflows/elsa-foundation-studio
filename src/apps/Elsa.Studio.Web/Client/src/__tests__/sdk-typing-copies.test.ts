// @vitest-environment node

import { describe, expect, it } from "vitest";
import { read } from "./themeTestUtils";

// The SDK package is type-only at the module boundary, so three extensions keep hand-maintained copies of
// the declarations they consume. A flag the canonical SDK exposes but a copy omits is invisible to that
// extension's editors, so each copy must carry the activity-declared sensitivity flags, and each copy that
// declares the property editor context must carry the edited activity's id.
const canonicalSdk = "../sdk/index.ts";
const typingCopies = {
  "Secrets copy": "../../../../../extensions/Elsa.Studio.Secrets/Client/src/studio-sdk.d.ts",
  "JavaScript copy": "../../../../../extensions/Elsa.Studio.ExpressionEditors.JavaScript/Client/src/studio-sdk.d.ts",
  "Liquid copy": "../../../../../extensions/Elsa.Studio.ExpressionEditors.Liquid/Client/src/studio-sdk.d.ts"
};
const typingSources = { "canonical SDK": canonicalSdk, ...typingCopies };

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

const editorContextBody = (path: string) => interfaceBody(read(path), "StudioActivityPropertyEditorContext");
const activityIdMember = /^\s*activityId\?: string \| null;/m;

describe("StudioActivityPropertyEditorContext typing copies", () => {
  it("is declared with activityId? in the canonical SDK", () => {
    expect(editorContextBody(canonicalSdk)).toMatch(activityIdMember);
  });

  // A copy declares the context only when its extension consumes it.
  it.each(Object.entries(typingCopies).filter(([, path]) => editorContextBody(path) !== ""))("%s declares activityId?", (_label, path) => {
    expect(editorContextBody(path)).toMatch(activityIdMember);
  });
});
