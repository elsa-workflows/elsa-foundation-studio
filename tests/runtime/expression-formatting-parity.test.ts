import { spawnSync } from "node:child_process";
import { resolve } from "node:path";
import { expect, it } from "vitest";
import { formatJavaScript } from "../../src/essentials/Elsa.Studio.CodeEditor/Client/src/languages/javascriptFormatting";
import { formatLiquid } from "../../src/essentials/Elsa.Studio.CodeEditor/Client/src/languages/liquidFormatting";
import type { StudioCodeFormatRequest } from "../../src/essentials/Elsa.Studio.CodeEditor/Client/src/types";

const foundationRevision = "5cd44d6312d9de85b13f4619fc7aa972a557d033";
const fixtures = [
  { id: "js-arithmetic", language: "javascript", profile: "expression", before: "args.order+ 2", arguments: { order: 3 }, expected: 5, changed: true },
  { id: "js-opaque", language: "javascript", profile: "expression", before: '["a  b",/a  b/.test("a  b"),`x  ${1+2}`]', arguments: {}, expected: ["a  b", true, "x  3"] },
  { id: "js-program", language: "javascript", profile: "program", before: "const x= 1+2;\nreturn x", arguments: {}, expected: 3, changed: true },
  { id: "js-asi", language: "javascript", profile: "program", before: "return\n1+2", arguments: {}, expected: null, expectedUndefined: true },
  { id: "js-null", language: "javascript", profile: "program", before: "return null", arguments: {}, expected: null },
  { id: "liquid-filter", language: "liquid", profile: "program", before: "  Hello {{customer|append: '  exact  '}}!\n", arguments: { customer: "Ada" }, expected: "  Hello Ada  exact  !\n", changed: true },
  { id: "liquid-trim-quiet", language: "liquid", profile: "program", before: " L  {{-customer|upcase-}}  R\r\n", arguments: { customer: "Ada" }, expected: " LADAR\r\n", unsupported: true },
  { id: "liquid-if-quiet", language: "liquid", profile: "program", before: "{% if customer %} Ada {% endif %}", arguments: { customer: "Ada" }, expected: " Ada ", unsupported: true },
  { id: "liquid-raw-quiet", language: "liquid", profile: "program", before: "{% raw %} {{ exact  source }} {% endraw %}", arguments: {}, expected: " {{ exact  source }} ", unsupported: true },
  { id: "liquid-comment-quiet", language: "liquid", profile: "program", before: " A {% comment %} exact  source {% endcomment %} B ", arguments: {}, expected: " A  B ", unsupported: true }
] as const;

it("proves actual formatter outputs against pinned registered Jint and Fluid production services", () => {
  const foundation = process.env.ELSA_FOUNDATION_WORKTREE;
  expect(foundation, "ELSA_FOUNDATION_WORKTREE must identify the pinned source checkout").toBeTruthy();
  const actualRevision = spawnSync("git", ["-C", foundation!, "rev-parse", "HEAD"], { encoding: "utf8" });
  expect(actualRevision.status).toBe(0);
  expect(actualRevision.stdout.trim()).toBe(foundationRevision);
  const sourceStatus = spawnSync("git", ["-C", foundation!, "status", "--porcelain"], { encoding: "utf8" });
  expect(sourceStatus.status).toBe(0);
  expect(sourceStatus.stdout, "Pinned Foundation source must also be clean").toBe("");
  const payload = fixtures.map(fixture => {
    const request: StudioCodeFormatRequest = {
      document: { uri: `elsa://synthetic-parity/${fixture.id}`, language: fixture.language, value: fixture.before },
      grammarProfile: fixture.profile,
      selection: { ranges: [{ anchor: 0, head: 0 }], mainIndex: 0 }, signal: new AbortController().signal
    };
    const result = fixture.language === "javascript" ? formatJavaScript(request) : formatLiquid(request);
    const unsupported = "unsupported" in fixture && fixture.unsupported;
    expect(result.state, fixture.id).toBe(unsupported ? "unsupported" : "ready");
    let after: string = fixture.before;
    if (result.state === "ready") for (const edit of [...result.edits].reverse())
      after = after.slice(0, edit.from) + edit.insert + after.slice(edit.to);
    if ("changed" in fixture && fixture.changed) expect(after, fixture.id).not.toBe(fixture.before);
    if (unsupported) expect(after, fixture.id).toBe(fixture.before);
    return { ...fixture, after };
  });
  const project = resolve("tests/ExpressionFormattingParity/ExpressionFormattingParity.csproj");
  const foundationProperty = `-p:ElsaFoundationRoot=${resolve(foundation!)}`;
  const build = spawnSync("dotnet", ["build", project, "-c", "Release", foundationProperty, "-p:RestoreLockedMode=true"], {
    encoding: "utf8", timeout: 240_000, maxBuffer: 2_000_000
  });
  expect(build.error, "Parity build must finish, including any build-slot queue wait").toBeUndefined();
  expect(build.status, `${build.stdout}\n${build.stderr}`).toBe(0);
  const parity = spawnSync("dotnet", [resolve("tests/ExpressionFormattingParity/bin/Release/net10.0/ExpressionFormattingParity.dll")], {
    encoding: "utf8", input: JSON.stringify(payload), timeout: 30_000, maxBuffer: 2_000_000
  });
  // Static fixture ids/build diagnostics only: never dump source-bearing stdin or runtime outputs.
  expect(parity.error, "Parity command must finish").toBeUndefined();
  expect(parity.status, parity.stderr).toBe(0);
  expect(parity.stdout).toContain(`Registered Jint/Fluid parity: ${fixtures.length} fixtures passed.`);
});
