// @vitest-environment node

import { describe, expect, it } from "vitest";
import { getTheme, getThemeModeDefinition } from "../app/themes/presets";
import { read, ruleDeclarations } from "./themeTestUtils";

const drift = getTheme("drift")!;
const variants = ["drift-coast", "drift-sand", "drift-ink"] as const;
const selector = 'html:is([data-theme="drift"], [data-theme="drift-coast"], [data-theme="drift-sand"], [data-theme="drift-ink"])';

describe("Drift palettes", () => {
  it.each(variants)("%s retains Drift's shape, typography and floating layout", id => {
    const theme = getTheme(id)!;
    expect(theme.shape).toEqual(drift.shape);
    expect(theme.typography).toEqual(drift.typography);
    expect(theme.layout).toBe(drift.layout);
    for (const mode of ["light", "dark", "dim"] as const) {
      expect(getThemeModeDefinition(theme, mode)!.primary).not.toEqual(getThemeModeDefinition(drift, mode)!.primary);
    }
  });

  it("shares Drift's soft elevation recipe across the palette family", () => {
    const recipe = ruleDeclarations(read("../app/ui/tokens.css"), selector);
    expect(recipe["--shadow-xl"]).toContain("32px 72px -14px");
    expect(recipe["--studio-surface-raised"]).toBe("var(--card)");
    expect(recipe["--studio-accent-soft"]).toContain("var(--primary)");
  });
});
