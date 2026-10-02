// @vitest-environment node

import { readdirSync, readFileSync } from "node:fs";
import { describe, expect, it } from "vitest";

const srcDir = new URL("../", import.meta.url);
const read = (url: URL) => readFileSync(url, "utf8").replace(/\/\*[\s\S]*?\*\//g, "");
const declarations = (css: string) => [...css.matchAll(/(--[\w-]+)\s*:([^;{}]+);/g)].map(([, name, value]) => ({ name, value }));

/** Every call to a function whose name matches `fn`, with balanced parentheses. */
function calls(css: string, fn: RegExp) {
  const found: string[] = [];
  for (const match of css.matchAll(new RegExp(`(?:${fn.source})\\(`, "g"))) {
    let depth = 0;
    let end = match.index;
    for (; end < css.length; end++) {
      if (css[end] === "(") depth++;
      else if (css[end] === ")" && --depth === 0) break;
    }
    found.push(css.slice(match.index, end + 1));
  }
  return found;
}

// The host's glass/material surface recipes that are gradient or image stacks, not colours,
// following aliases such as `--studio-material-row-bg: var(--studio-material-panel-bg-soft)`.
const hostTokens = declarations(read(new URL("../../../../../apps/Elsa.Studio.Web/Client/src/app/ui/tokens.css", import.meta.url)))
  .filter(({ name }) => /^--studio-(glass|material)-/.test(name));
const imageTokens = new Set(hostTokens.filter(({ value }) => /gradient\(|url\(/.test(value)).map(({ name }) => name));
for (let grew = true; grew;) {
  grew = false;
  for (const { name, value } of hostTokens) {
    if (!imageTokens.has(name) && [...imageTokens].some(token => value.includes(`var(${token})`))) {
      imageTokens.add(name);
      grew = true;
    }
  }
}

const stylesheets = readdirSync(srcDir, { recursive: true })
  .filter(file => file.endsWith(".css"))
  .map(file => ({ file, css: read(new URL(file, srcDir)) }));
const styles = stylesheets.find(({ file }) => file === "styles.css")!.css;

// The glass and material remaps of the module's own --wf-* / --xy-* tokens.
const themeScopes = [...styles.matchAll(/html\[data-theme(?:="black-glass"|-material)\] \.wf-page,[^{]*\{([^}]*)\}/g)]
  .map(([, body]) => declarations(body));
for (const { name, value } of themeScopes.flat()) {
  if (/gradient\(|url\(/.test(value) || [...imageTokens].some(token => value.trim() === `var(${token})`)) imageTokens.add(name);
}

const usesImageToken = (css: string) => [...imageTokens].some(token => css.includes(`var(${token})`));

describe("glass and material theme surface contracts", () => {
  it("knows which module surfaces become gradient stacks", () => {
    expect([...imageTokens]).toEqual(expect.arrayContaining([
      "--studio-glass-bg", "--studio-material-panel-bg", "--studio-material-row-bg",
      "--wf-panel", "--wf-panel-muted", "--wf-surface", "--wf-row"
    ]));
  });

  it("never passes a gradient-valued surface to color-mix() or a gradient colour stop", () => {
    // color-mix() and gradient stops only accept colours: a gradient argument invalidates the
    // whole declaration at computed-value time and the element loses its background entirely.
    const offenders = stylesheets.flatMap(({ file, css }) =>
      calls(css, /color-mix|(?:repeating-)?(?:linear|radial|conic)-gradient/)
        .filter(usesImageToken)
        .map(call => `${file}: ${call.replace(/\s+/g, " ")}`));

    expect(offenders).toEqual([]);
  });

  it("never paints a gradient-valued surface into a colour-only property", () => {
    const colourProperty = /^(?:color|background-color|border(?:-[\w-]+)?|outline(?:-color)?|box-shadow|text-shadow|fill|stroke|caret-color|accent-color|column-rule(?:-color)?)$/;
    const offenders = stylesheets.flatMap(({ file, css }) =>
      [...css.matchAll(/([\w-]+)\s*:([^;{}]+);/g)]
        .filter(([, property, value]) => colourProperty.test(property) && usesImageToken(value))
        .map(([declaration]) => `${file}: ${declaration.replace(/\s+/g, " ")}`));

    expect(offenders).toEqual([]);
  });

  it("gives every gradient-valued panel tier a flat colour tone in the same theme scope", () => {
    expect(themeScopes).toHaveLength(2);
    for (const scope of themeScopes) {
      const value = (name: string) => scope.find(declaration => declaration.name === name)?.value.trim();
      for (const tier of ["--wf-panel", "--wf-panel-muted"]) {
        const tone = value(`${tier}-tone`);
        expect(tone, `${tier}-tone`).toBeDefined();
        expect(usesImageToken(tone!), `${tier}-tone: ${tone}`).toBe(false);
      }
    }
  });
});
