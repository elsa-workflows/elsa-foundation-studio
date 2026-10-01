import { readFileSync } from "node:fs";

/** Reads a source file relative to this directory, for tests that assert on stylesheet and token text. */
export const read = (path: string) => readFileSync(new URL(path, import.meta.url), "utf8");

export function parseOklch(value: string) {
  const [lightness, chroma, hue] = value.match(/^oklch\(([\d.]+) ([\d.]+) ([\d.]+)\)$/)!.slice(1).map(Number);
  return { lightness, chroma, hue };
}

/** The declarations of the first rule whose selector is exactly `selector`, as a property to value map. */
export function ruleDeclarations(css: string, selector: string): Record<string, string> {
  const start = css.indexOf(`${selector} {`);
  if (start < 0) return {};
  const body = css.slice(css.indexOf("{", start) + 1, css.indexOf("}", start));
  return Object.fromEntries([...body.matchAll(/(--[\w-]+):\s*([^;]+);/g)].map(match => [match[1], match[2].trim()]));
}
