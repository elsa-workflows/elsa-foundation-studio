import type { StudioThemeLayout } from "../../sdk";
import type { StudioThemeDefinition, ThemeModeDefinition, ThemeTypography } from "./presets";

/*
 * The signature Elsa Studio 4 themes. Each defines all four modes — Light, Dark, Dim and High
 * contrast — plus its own typography, corner radii and layout. Elevation (shadow) recipes, which are not
 * colour tokens, live beside them in ui/tokens.css under `html[data-theme="<id>"]`.
 *
 * This module only builds plain definitions (no calls into presets.ts) so the two can import each
 * other's types without an evaluation-order cycle.
 */

const oklch = (lightness: number, chroma: number, hue: number) => `oklch(${lightness} ${chroma} ${hue})`;
const black = oklch(0, 0, 0);
const white = oklch(0.99, 0, 0);

type Scheme = "light" | "dark" | "dim" | "high-contrast";

/** Status fills and the text that sits on them, tuned per mode for AA on the fill. */
const status: Record<Scheme, Pick<ThemeModeDefinition,
  "success" | "successForeground" | "warning" | "warningForeground" | "danger" | "dangerForeground">> = {
  light: {
    success: oklch(0.53, 0.14, 150), successForeground: white,
    warning: oklch(0.76, 0.16, 70), warningForeground: oklch(0.22, 0.04, 70),
    danger: oklch(0.56, 0.2, 27), dangerForeground: white
  },
  dark: {
    success: oklch(0.72, 0.15, 150), successForeground: oklch(0.17, 0.03, 150),
    warning: oklch(0.79, 0.15, 75), warningForeground: oklch(0.19, 0.04, 70),
    danger: oklch(0.67, 0.19, 25), dangerForeground: oklch(0.16, 0.03, 25)
  },
  dim: {
    success: oklch(0.75, 0.14, 150), successForeground: oklch(0.18, 0.03, 150),
    warning: oklch(0.82, 0.14, 75), warningForeground: oklch(0.2, 0.04, 70),
    danger: oklch(0.7, 0.18, 25), dangerForeground: oklch(0.17, 0.03, 25)
  },
  "high-contrast": {
    success: oklch(0.86, 0.19, 150), successForeground: black,
    warning: oklch(0.9, 0.17, 95), warningForeground: black,
    danger: oklch(0.74, 0.2, 25), dangerForeground: black
  }
};

/** Chart series: the theme accent, then one hue per activity family, at a mode-appropriate lightness. */
const chartLightness: Record<Scheme, [number, number]> = {
  light: [0.6, 0.16],
  dark: [0.72, 0.14],
  dim: [0.75, 0.13],
  "high-contrast": [0.85, 0.17]
};

interface ModeSpec {
  scheme: Scheme;
  /** Neutral ladder hue and chroma; text uses at most 0.015 chroma so it never reads tinted. */
  hue: number;
  chroma: number;
  background: number;
  card: number;
  muted: number;
  border: number;
  input: number;
  sidebar: number;
  foreground: number;
  mutedForeground: number;
  primary: string;
  primaryForeground: string;
  /** Opaque accent wash used for hover rows and the active navigation item. */
  wash: string;
  activeForeground: string;
  overrides?: Partial<ThemeModeDefinition>;
}

function mode(spec: ModeSpec): ThemeModeDefinition {
  const surface = (lightness: number) => oklch(lightness, lightness === 0 || lightness === 1 ? 0 : spec.chroma, spec.hue);
  const text = (lightness: number) => oklch(lightness, Math.min(spec.chroma, 0.015), spec.hue);
  const foreground = text(spec.foreground);
  const [chartL, chartC] = chartLightness[spec.scheme];

  return {
    primary: spec.primary,
    primaryForeground: spec.primaryForeground,
    secondary: surface(spec.muted),
    secondaryForeground: foreground,
    accent: spec.wash,
    accentForeground: foreground,
    ...status[spec.scheme],
    background: surface(spec.background),
    foreground,
    card: surface(spec.card),
    cardForeground: foreground,
    muted: surface(spec.muted),
    mutedForeground: text(spec.mutedForeground),
    border: surface(spec.border),
    input: surface(spec.input),
    sidebar: surface(spec.sidebar),
    sidebarForeground: foreground,
    sidebarActive: spec.wash,
    sidebarActiveForeground: spec.activeForeground,
    ring: spec.primary,
    chartColors: [spec.primary, ...[155, 75, 295, 20].map(hue => oklch(chartL, chartC, hue))],
    ...spec.overrides
  };
}

/**
 * High contrast is deliberately shared in shape across themes: pure black ground and cards, white
 * hairlines, white text and a single bright accent that also marks the active navigation item.
 * Depth comes from borders alone; the only lifted tier is the recessed `muted` surface.
 * Only the accent changes, so each theme keeps its identity without trading away legibility.
 */
function highContrast(accent: string, accentHue: number, overrides: Partial<ThemeModeDefinition> = {}): ThemeModeDefinition {
  return mode({
    scheme: "high-contrast",
    hue: 0,
    chroma: 0,
    background: 0,
    card: 0,
    muted: 0.16,
    border: 1,
    input: 0,
    sidebar: 0,
    foreground: 1,
    mutedForeground: 0.9,
    primary: accent,
    primaryForeground: black,
    wash: oklch(0.3, 0.07, accentHue),
    activeForeground: black,
    overrides: { sidebarActive: accent, accentForeground: oklch(1, 0, 0), ...overrides }
  });
}

const monoFallback = 'ui-monospace, "SF Mono", Menlo, Consolas, "Liberation Mono", monospace';
const sansFallback = '"Segoe UI", system-ui, -apple-system, BlinkMacSystemFont, sans-serif';

function definition(
  id: string,
  name: string,
  description: string,
  typography: ThemeTypography,
  shape: StudioThemeDefinition["shape"],
  layout: StudioThemeLayout,
  modes: Required<StudioThemeDefinition["modes"]>
): StudioThemeDefinition {
  return {
    id,
    name,
    description,
    source: "built-in",
    version: 1,
    enabled: true,
    published: true,
    supportedModes: ["light", "dark", "dim", "high-contrast"],
    typography,
    shape,
    layout,
    modes
  };
}

/** Material surfaces use tonal layering for depth; elevation stays quiet and high contrast stays flat. */
function materialSurfaceRoles(scheme: Scheme): Record<string, string> {
  const highContrast = scheme === "high-contrast";
  const dark = scheme === "dark" || scheme === "dim";
  const shadow = highContrast
    ? "0 0 0 0 transparent"
    : dark
      ? "0 1px 2px color-mix(in srgb, black 24%, transparent), 0 8px 24px color-mix(in srgb, black 22%, transparent)"
      : "0 1px 2px color-mix(in srgb, black 5%, transparent), 0 8px 24px color-mix(in srgb, black 7%, transparent)";
  const strongShadow = highContrast
    ? "0 0 0 0 transparent"
    : dark
      ? "0 2px 6px color-mix(in srgb, black 28%, transparent), 0 16px 36px color-mix(in srgb, black 26%, transparent)"
      : "0 2px 6px color-mix(in srgb, black 7%, transparent), 0 16px 36px color-mix(in srgb, black 9%, transparent)";
  const noInset = "0 0 0 0 transparent";

  return {
    "--studio-material-body-bg": "var(--studio-bg)",
    "--studio-material-content-bg": "var(--studio-bg)",
    "--studio-material-canvas-bg": "var(--studio-bg)",
    "--studio-material-panel-bg": "var(--studio-surface)",
    "--studio-material-panel-bg-strong": "color-mix(in srgb, var(--studio-surface-raised) 94%, var(--studio-accent) 6%)",
    "--studio-material-panel-bg-soft": "color-mix(in srgb, var(--studio-surface-muted) 96%, var(--studio-accent) 4%)",
    "--studio-material-node-bg": "var(--studio-surface-raised)",
    "--studio-material-node-shadow": shadow,
    "--studio-material-edge": "var(--studio-border)",
    "--studio-material-edge-strong": "color-mix(in srgb, var(--studio-accent) 42%, var(--studio-border))",
    "--studio-material-shadow": shadow,
    "--studio-material-shadow-strong": strongShadow,
    "--studio-material-grid-size": "32px 32px",
    "--studio-material-radius": "var(--studio-radius-lg)",
    "--studio-material-body-bg-size": "auto",
    "--studio-material-content-bg-size": "auto",
    "--studio-material-canvas-bg-size": "auto",
    "--studio-material-panel-bg-size": "auto",
    "--studio-material-node-bg-size": "auto",
    "--studio-material-control-bg": "var(--studio-material-panel-bg-soft)",
    "--studio-material-hover-bg": "color-mix(in srgb, var(--studio-accent) 10%, var(--studio-surface-muted))",
    "--studio-material-active-bg": "color-mix(in srgb, var(--studio-accent) 16%, var(--studio-surface))",
    "--studio-material-inset": noInset,
    "--studio-material-inset-low": noInset,
    "--studio-material-send-bg": "var(--studio-accent)",
    "--studio-material-send-text": "var(--studio-accent-text)",
    "--studio-material-row-bg": "var(--studio-material-panel-bg-soft)",
    "--studio-material-row-bg-size": "auto",
    "--studio-material-well-bg": "color-mix(in srgb, var(--studio-surface-muted) 96%, black 4%)",
    "--studio-material-well-bg-size": "auto",
    "--studio-material-well-shadow": noInset
  };
}

function materialMode(spec: ModeSpec): ThemeModeDefinition {
  return { ...mode(spec), material: { cssVariables: materialSurfaceRoles(spec.scheme) } };
}

function materialHighContrast(): ThemeModeDefinition {
  return { ...highContrast(oklch(0.88, 0.18, 258), 258), material: { cssVariables: materialSurfaceRoles("high-contrast") } };
}

/** Convert the approved preview swatches into the OKLCH token format used by the contrast audit. */
function previewColor(hex: string): string {
  if (!/^#[\da-f]{6}$/i.test(hex)) {
    throw new Error(`Expected a six-digit hex colour, received ${hex}`);
  }

  const linearize = (part: string) => {
    const channel = parseInt(part, 16) / 255;
    return channel <= 0.04045
      ? channel / 12.92
      : ((channel + 0.055) / 1.055) ** 2.4;
  };
  const [red, green, blue] = [hex.slice(1, 3), hex.slice(3, 5), hex.slice(5, 7)].map(linearize) as [number, number, number];
  const l = (0.4122214708 * red + 0.5363325363 * green + 0.0514459929 * blue) ** (1 / 3);
  const m = (0.2119034982 * red + 0.6806995451 * green + 0.1073969566 * blue) ** (1 / 3);
  const s = (0.0883024619 * red + 0.2817188376 * green + 0.6299787005 * blue) ** (1 / 3);
  const lightness = 0.2104542553 * l + 0.793617785 * m - 0.0040720468 * s;
  const a = 1.9779984951 * l - 2.428592205 * m + 0.4505937099 * s;
  const b = 0.0259040371 * l + 0.7827717662 * m - 0.808675766 * s;
  const chroma = Math.hypot(a, b);
  const hue = (Math.atan2(b, a) * 180 / Math.PI + 360) % 360;

  return oklch(Number(lightness.toFixed(6)), Number(chroma.toFixed(6)), Number(hue.toFixed(4)));
}

interface PreviewPalette {
  page: string;
  surface: string;
  surface2: string;
  nav: string;
  canvas: string;
  input: string;
  ink: string;
  secondary: string;
  muted: string;
  line: string;
  accent: string;
  accentInk: string;
  accentSoft: string;
  good: string;
  goodInk: string;
  dot: string;
  lightShadow: string;
  darkShadow: string;
}

function previewMode(scheme: Scheme, palette: PreviewPalette): ThemeModeDefinition {
  const primary = previewColor(palette.accent);
  const activeForeground = primary;

  return mode({
    scheme,
    hue: 0,
    chroma: 0,
    background: 0.96,
    card: 0.99,
    muted: 0.93,
    border: 0.88,
    input: 0.96,
    sidebar: 0.92,
    foreground: 0.22,
    mutedForeground: 0.48,
    primary,
    primaryForeground: previewColor(palette.accentInk),
    wash: previewColor(palette.accentSoft),
    activeForeground,
    overrides: {
      primary,
      primaryForeground: previewColor(palette.accentInk),
      secondary: previewColor(palette.surface2),
      secondaryForeground: previewColor(palette.secondary),
      accent: previewColor(palette.accentSoft),
      accentForeground: previewColor(palette.ink),
      success: previewColor(palette.good),
      successForeground: previewColor(palette.goodInk),
      background: previewColor(palette.page),
      foreground: previewColor(palette.ink),
      card: previewColor(palette.surface),
      cardForeground: previewColor(palette.ink),
      muted: previewColor(palette.surface2),
      mutedForeground: previewColor(palette.muted),
      border: previewColor(palette.line),
      input: previewColor(palette.input),
      sidebar: previewColor(palette.nav),
      sidebarForeground: previewColor(palette.ink),
      sidebarActive: previewColor(palette.accentSoft),
      sidebarActiveForeground: activeForeground,
      ring: primary
    }
  });
}

/** Flat shared Material roles let opt-in modules read a complete surface ladder without texture or inset effects. */
function previewMaterialRoles(scheme: Scheme, palette?: PreviewPalette): Record<string, string> {
  const noShadow = "0 0 0 0 transparent";
  const shadow = scheme === "high-contrast" || !palette
    ? noShadow
    : scheme === "light" ? palette.lightShadow : palette.darkShadow;

  return {
    ...materialSurfaceRoles(scheme),
    "--studio-material-canvas-bg": palette ? previewColor(palette.canvas) : "var(--studio-bg)",
    "--studio-material-panel-bg": "var(--studio-surface)",
    "--studio-material-panel-bg-strong": "var(--studio-surface)",
    "--studio-material-panel-bg-soft": "var(--studio-surface-muted)",
    "--studio-material-node-bg": "var(--studio-surface)",
    "--studio-material-node-shadow": shadow,
    "--studio-material-shadow": shadow,
    "--studio-material-shadow-strong": shadow,
    "--studio-material-grid-size": "20px 20px",
    "--studio-material-dot": palette ? previewColor(palette.dot) : "var(--studio-border)",
    "--studio-material-control-bg": "var(--input)",
    "--studio-material-hover-bg": "var(--accent)",
    "--studio-material-active-bg": "var(--accent)",
    "--studio-material-well-bg": "var(--input)"
  };
}

function previewMaterialMode(scheme: Scheme, palette: PreviewPalette): ThemeModeDefinition {
  return { ...previewMode(scheme, palette), material: { cssVariables: previewMaterialRoles(scheme, palette) } };
}

function previewHighContrast(accent: string, hue: number): ThemeModeDefinition {
  return { ...highContrast(previewColor(accent), hue), material: { cssVariables: previewMaterialRoles("high-contrast") } };
}

const geistTypography: ThemeTypography = {
  sans: `"Geist Variable", "Geist", ${sansFallback}`,
  mono: `"Geist Mono Variable", "Geist Mono", ${monoFallback}`
};

const materialTypography: ThemeTypography = {
  sans: `"Roboto", ${sansFallback}`,
  mono: monoFallback
};

const meridian = definition(
  "meridian",
  "Meridian",
  "Crisp, neutral precision with a single indigo accent. The Elsa Studio 4 default.",
  geistTypography,
  { radiusSm: "5px", radius: "7px", radiusMd: "9px", radiusLg: "12px", radiusXl: "14px" },
  "classic",
  {
    light: mode({
      scheme: "light", hue: 265, chroma: 0.006,
      background: 0.985, card: 1, muted: 0.965, border: 0.91, input: 1, sidebar: 1, foreground: 0.22, mutedForeground: 0.49,
      primary: oklch(0.52, 0.2, 268), primaryForeground: white,
      wash: oklch(0.95, 0.035, 268), activeForeground: oklch(0.45, 0.2, 268)
    }),
    dark: mode({
      scheme: "dark", hue: 265, chroma: 0.008,
      background: 0.155, card: 0.185, muted: 0.225, border: 0.28, input: 0.17, sidebar: 0.185, foreground: 0.95, mutedForeground: 0.72,
      primary: oklch(0.56, 0.19, 268), primaryForeground: white,
      wash: oklch(0.29, 0.07, 268), activeForeground: oklch(0.82, 0.1, 268)
    }),
    dim: mode({
      scheme: "dim", hue: 262, chroma: 0.016,
      background: 0.265, card: 0.295, muted: 0.335, border: 0.38, input: 0.28, sidebar: 0.295, foreground: 0.94, mutedForeground: 0.78,
      primary: oklch(0.55, 0.17, 268), primaryForeground: white,
      wash: oklch(0.37, 0.07, 268), activeForeground: oklch(0.86, 0.08, 268)
    }),
    highContrast: highContrast(oklch(0.91, 0.18, 100), 100)
  }
);

const material = definition(
  "material",
  "Material",
  "A familiar workflow workspace with blue tonal surfaces, readable evidence and gently rounded actions.",
  materialTypography,
  { radiusSm: "12px", radius: "16px", radiusMd: "18px", radiusLg: "20px", radiusXl: "24px" },
  "classic",
  {
    light: materialMode({
      scheme: "light", hue: 258, chroma: 0.012,
      background: 0.965, card: 0.99, muted: 0.93, border: 0.865, input: 0.99, sidebar: 0.965, foreground: 0.22, mutedForeground: 0.48,
      primary: oklch(0.5, 0.18, 258), primaryForeground: white,
      wash: oklch(0.93, 0.045, 258), activeForeground: oklch(0.34, 0.12, 258)
    }),
    dark: materialMode({
      scheme: "dark", hue: 258, chroma: 0.012,
      background: 0.145, card: 0.19, muted: 0.245, border: 0.32, input: 0.165, sidebar: 0.16, foreground: 0.95, mutedForeground: 0.74,
      primary: oklch(0.76, 0.14, 258), primaryForeground: oklch(0.18, 0.04, 258),
      wash: oklch(0.3, 0.06, 258), activeForeground: oklch(0.92, 0.08, 258)
    }),
    dim: materialMode({
      scheme: "dim", hue: 258, chroma: 0.018,
      background: 0.265, card: 0.31, muted: 0.365, border: 0.43, input: 0.285, sidebar: 0.245, foreground: 0.95, mutedForeground: 0.79,
      primary: oklch(0.78, 0.15, 258), primaryForeground: oklch(0.19, 0.04, 258),
      wash: oklch(0.39, 0.07, 258), activeForeground: oklch(0.94, 0.08, 258)
    }),
    highContrast: materialHighContrast()
  }
);

const driftTypography: ThemeTypography = {
  sans: `"Manrope Variable", "Manrope", ${sansFallback}`,
  mono: `"DM Mono", ${monoFallback}`
};

const driftShape: StudioThemeDefinition["shape"] = {
  radiusSm: "8px", radius: "12px", radiusMd: "14px", radiusLg: "18px", radiusXl: "22px"
};

function driftTheme(
  id: string,
  name: string,
  description: string,
  modes: Required<StudioThemeDefinition["modes"]>
): StudioThemeDefinition {
  return definition(id, name, description, driftTypography, driftShape, "floating", modes);
}

const drift = driftTheme(
  "drift",
  "Drift",
  "Soft, rounded surfaces that float over a calm canvas, with a jade accent.",
  {
    light: mode({
      scheme: "light", hue: 195, chroma: 0.008,
      background: 0.958, card: 0.997, muted: 0.95, border: 0.915, input: 0.955, sidebar: 0.997, foreground: 0.23, mutedForeground: 0.49,
      primary: oklch(0.5, 0.1, 172), primaryForeground: white,
      wash: oklch(0.94, 0.04, 172), activeForeground: oklch(0.42, 0.1, 172)
    }),
    dark: mode({
      scheme: "dark", hue: 200, chroma: 0.013,
      background: 0.17, card: 0.215, muted: 0.25, border: 0.29, input: 0.25, sidebar: 0.215, foreground: 0.95, mutedForeground: 0.74,
      primary: oklch(0.74, 0.12, 172), primaryForeground: oklch(0.19, 0.03, 180),
      wash: oklch(0.3, 0.05, 172), activeForeground: oklch(0.84, 0.11, 172)
    }),
    dim: mode({
      scheme: "dim", hue: 205, chroma: 0.022,
      background: 0.3, card: 0.345, muted: 0.38, border: 0.42, input: 0.38, sidebar: 0.345, foreground: 0.96, mutedForeground: 0.81,
      primary: oklch(0.77, 0.12, 172), primaryForeground: oklch(0.2, 0.03, 180),
      wash: oklch(0.4, 0.05, 172), activeForeground: oklch(0.88, 0.1, 172)
    }),
    highContrast: highContrast(oklch(0.88, 0.15, 175), 175)
  }
);

const driftCoast = driftTheme(
  "drift-coast",
  "Drift Coast",
  "Drift’s floating surfaces in cool blue slate, with a clear ocean-blue accent.",
  {
    light: mode({
      scheme: "light", hue: 225, chroma: 0.012,
      background: 0.958, card: 0.997, muted: 0.948, border: 0.9, input: 0.955, sidebar: 0.997, foreground: 0.22, mutedForeground: 0.43,
      primary: oklch(0.45, 0.13, 245), primaryForeground: white,
      wash: oklch(0.94, 0.035, 245), activeForeground: oklch(0.35, 0.1, 245)
    }),
    dark: mode({
      scheme: "dark", hue: 225, chroma: 0.016,
      background: 0.17, card: 0.215, muted: 0.25, border: 0.3, input: 0.235, sidebar: 0.215, foreground: 0.95, mutedForeground: 0.74,
      primary: oklch(0.73, 0.13, 235), primaryForeground: oklch(0.18, 0.03, 235),
      wash: oklch(0.3, 0.055, 235), activeForeground: oklch(0.87, 0.075, 235)
    }),
    dim: mode({
      scheme: "dim", hue: 230, chroma: 0.022,
      background: 0.3, card: 0.345, muted: 0.38, border: 0.43, input: 0.365, sidebar: 0.345, foreground: 0.96, mutedForeground: 0.78,
      primary: oklch(0.76, 0.12, 235), primaryForeground: oklch(0.2, 0.03, 235),
      wash: oklch(0.4, 0.06, 235), activeForeground: oklch(0.9, 0.08, 235)
    }),
    highContrast: highContrast(oklch(0.88, 0.15, 235), 235)
  }
);

const driftSand = driftTheme(
  "drift-sand",
  "Drift Sand",
  "Drift’s floating surfaces in warm paper and taupe, with a restrained bronze accent.",
  {
    light: mode({
      scheme: "light", hue: 72, chroma: 0.018,
      background: 0.955, card: 0.996, muted: 0.944, border: 0.89, input: 0.955, sidebar: 0.993, foreground: 0.22, mutedForeground: 0.43,
      primary: oklch(0.44, 0.085, 58), primaryForeground: white,
      wash: oklch(0.94, 0.03, 68), activeForeground: oklch(0.34, 0.07, 58)
    }),
    dark: mode({
      scheme: "dark", hue: 67, chroma: 0.014,
      background: 0.17, card: 0.215, muted: 0.25, border: 0.3, input: 0.235, sidebar: 0.215, foreground: 0.95, mutedForeground: 0.74,
      primary: oklch(0.75, 0.105, 65), primaryForeground: oklch(0.19, 0.035, 65),
      wash: oklch(0.3, 0.045, 65), activeForeground: oklch(0.88, 0.07, 65)
    }),
    dim: mode({
      scheme: "dim", hue: 65, chroma: 0.022,
      background: 0.3, card: 0.345, muted: 0.38, border: 0.43, input: 0.365, sidebar: 0.345, foreground: 0.96, mutedForeground: 0.78,
      primary: oklch(0.78, 0.105, 65), primaryForeground: oklch(0.2, 0.035, 65),
      wash: oklch(0.4, 0.05, 65), activeForeground: oklch(0.9, 0.07, 65)
    }),
    highContrast: highContrast(oklch(0.89, 0.13, 68), 68)
  }
);

const driftInk = driftTheme(
  "drift-ink",
  "Drift Ink",
  "Drift’s floating surfaces in neutral graphite and silver, with a quiet monochrome accent.",
  {
    light: mode({
      scheme: "light", hue: 255, chroma: 0.004,
      background: 0.958, card: 0.997, muted: 0.948, border: 0.9, input: 0.955, sidebar: 0.997, foreground: 0.2, mutedForeground: 0.43,
      primary: oklch(0.34, 0.012, 255), primaryForeground: white,
      wash: oklch(0.94, 0.008, 255), activeForeground: oklch(0.3, 0.014, 255)
    }),
    dark: mode({
      scheme: "dark", hue: 255, chroma: 0.006,
      background: 0.17, card: 0.215, muted: 0.25, border: 0.3, input: 0.235, sidebar: 0.215, foreground: 0.95, mutedForeground: 0.74,
      primary: oklch(0.8, 0.008, 255), primaryForeground: oklch(0.17, 0.004, 255),
      wash: oklch(0.3, 0.01, 255), activeForeground: oklch(0.91, 0.006, 255)
    }),
    dim: mode({
      scheme: "dim", hue: 255, chroma: 0.009,
      background: 0.3, card: 0.345, muted: 0.38, border: 0.43, input: 0.365, sidebar: 0.345, foreground: 0.96, mutedForeground: 0.78,
      primary: oklch(0.83, 0.01, 255), primaryForeground: oklch(0.2, 0.005, 255),
      wash: oklch(0.4, 0.012, 255), activeForeground: oklch(0.94, 0.008, 255)
    }),
    highContrast: highContrast(oklch(0.91, 0.01, 255), 255)
  }
);

const schematic = definition(
  "schematic",
  "Schematic",
  "An engineering workbench: squared corners, blueprint neutrals and a signal-orange accent.",
  {
    sans: `"IBM Plex Sans", ${sansFallback}`,
    mono: `"IBM Plex Mono", ${monoFallback}`
  },
  { radiusSm: "2px", radius: "3px", radiusMd: "4px", radiusLg: "4px", radiusXl: "6px" },
  "workbench",
  {
    light: mode({
      scheme: "light", hue: 245, chroma: 0.014,
      background: 0.962, card: 0.992, muted: 0.95, border: 0.86, input: 0.992, sidebar: 0.992, foreground: 0.24, mutedForeground: 0.46,
      primary: oklch(0.57, 0.19, 42), primaryForeground: white,
      wash: oklch(0.93, 0.02, 245), activeForeground: oklch(0.24, 0.04, 255)
    }),
    dark: mode({
      scheme: "dark", hue: 255, chroma: 0.026,
      background: 0.17, card: 0.205, muted: 0.24, border: 0.3, input: 0.185, sidebar: 0.205, foreground: 0.94, mutedForeground: 0.73,
      primary: oklch(0.74, 0.16, 58), primaryForeground: oklch(0.19, 0.04, 55),
      wash: oklch(0.28, 0.035, 255), activeForeground: oklch(0.94, 0.01, 240)
    }),
    // Dim is a cyanotype: saturated blueprint blue with near-white linework.
    dim: mode({
      scheme: "dim", hue: 258, chroma: 0.085,
      background: 0.3, card: 0.335, muted: 0.37, border: 0.45, input: 0.315, sidebar: 0.335, foreground: 0.97, mutedForeground: 0.86,
      primary: oklch(0.82, 0.15, 78), primaryForeground: oklch(0.22, 0.05, 70),
      wash: oklch(0.42, 0.08, 258), activeForeground: oklch(0.97, 0.01, 240)
    }),
    highContrast: highContrast(oklch(0.82, 0.17, 65), 65)
  }
);

const atelierSans = `"Instrument Sans Variable", "Instrument Sans", ${sansFallback}`;

const atelier = definition(
  "atelier",
  "Atelier",
  "Warm, editorial calm: paper neutrals, serif titles and a plum accent.",
  {
    sans: atelierSans,
    display: `"Instrument Serif", Georgia, "Times New Roman", serif`,
    mono: `"JetBrains Mono Variable", "JetBrains Mono", ${monoFallback}`
  },
  { radiusSm: "6px", radius: "9px", radiusMd: "10px", radiusLg: "14px", radiusXl: "16px" },
  "editorial",
  {
    light: mode({
      scheme: "light", hue: 78, chroma: 0.012,
      background: 0.955, card: 0.993, muted: 0.952, border: 0.895, input: 0.993, sidebar: 0.955, foreground: 0.23, mutedForeground: 0.48,
      primary: oklch(0.45, 0.13, 350), primaryForeground: white,
      wash: oklch(0.94, 0.025, 350), activeForeground: oklch(0.23, 0.015, 78),
      overrides: { sidebarActive: oklch(0.993, 0.012, 78) }
    }),
    dark: mode({
      scheme: "dark", hue: 60, chroma: 0.009,
      background: 0.155, card: 0.2, muted: 0.235, border: 0.285, input: 0.18, sidebar: 0.155, foreground: 0.94, mutedForeground: 0.74,
      primary: oklch(0.72, 0.12, 350), primaryForeground: oklch(0.19, 0.04, 350),
      wash: oklch(0.29, 0.04, 350), activeForeground: oklch(0.94, 0.009, 60),
      overrides: { sidebarActive: oklch(0.245, 0.009, 60) }
    }),
    dim: mode({
      scheme: "dim", hue: 55, chroma: 0.016,
      background: 0.27, card: 0.32, muted: 0.355, border: 0.395, input: 0.3, sidebar: 0.27, foreground: 0.95, mutedForeground: 0.8,
      primary: oklch(0.77, 0.1, 350), primaryForeground: oklch(0.2, 0.04, 350),
      wash: oklch(0.38, 0.04, 350), activeForeground: oklch(0.95, 0.015, 55),
      overrides: { sidebarActive: oklch(0.365, 0.016, 55) }
    }),
    highContrast: highContrast(oklch(0.86, 0.12, 345), 345)
  }
);

// Elsa Cloud: near-black neutral surfaces, a hot-pink accent and mono eyebrow labels. Dark is the faithful
// reproduction of the Elsa Cloud console; Light, Dim and High contrast are derived from the same tokens.
// Hue 4 is the console's button pink, measured from its own screenshot, and stays the same in every mode.
// Dim lifts the pink and gives it dark text: the console's white-on-pink reads at 2.6:1 as text on Dim's
// lighter cards, where Dark's (3.7:1) matches the source design.
const cloudHue = 4;
const cloudNeutralHue = 285;
const cloudMint = (lightness: number, chroma = 0.14) => oklch(lightness, chroma, 160);

const elsaCloud = definition(
  "elsa-cloud",
  "Elsa Cloud",
  "The Elsa Cloud console look: near-black surfaces, a hot-pink accent and mono eyebrow labels.",
  geistTypography,
  { radiusSm: "6px", radius: "8px", radiusMd: "10px", radiusLg: "12px", radiusXl: "16px" },
  "classic",
  {
    light: mode({
      scheme: "light", hue: cloudNeutralHue, chroma: 0.004,
      background: 0.985, card: 1, muted: 0.965, border: 0.91, input: 1, sidebar: 0.985, foreground: 0.2, mutedForeground: 0.48,
      primary: oklch(0.55, 0.23, cloudHue), primaryForeground: white,
      wash: oklch(0.96, 0.03, cloudHue), activeForeground: oklch(0.2, 0.004, cloudNeutralHue),
      overrides: { sidebarActive: oklch(1, 0, 0), success: cloudMint(0.53) }
    }),
    dark: mode({
      scheme: "dark", hue: cloudNeutralHue, chroma: 0.004,
      background: 0.14, card: 0.175, muted: 0.22, border: 0.275, input: 0.16, sidebar: 0.14, foreground: 0.96, mutedForeground: 0.7,
      primary: oklch(0.57, 0.235, cloudHue), primaryForeground: white,
      wash: oklch(0.27, 0.05, cloudHue), activeForeground: oklch(0.97, 0.004, cloudNeutralHue),
      overrides: { sidebarActive: oklch(0.2, 0.004, cloudNeutralHue), success: cloudMint(0.78) }
    }),
    dim: mode({
      scheme: "dim", hue: cloudNeutralHue, chroma: 0.01,
      background: 0.25, card: 0.285, muted: 0.325, border: 0.37, input: 0.27, sidebar: 0.25, foreground: 0.95, mutedForeground: 0.78,
      primary: oklch(0.75, 0.16, cloudHue), primaryForeground: oklch(0.2, 0.04, cloudHue),
      wash: oklch(0.37, 0.06, cloudHue), activeForeground: oklch(0.97, 0.004, cloudNeutralHue),
      overrides: { sidebarActive: oklch(0.325, 0.01, cloudNeutralHue), success: cloudMint(0.8) }
    }),
    highContrast: highContrast(oklch(0.83, 0.16, cloudHue), cloudHue, { success: cloudMint(0.86, 0.19) })
  }
);

// Signal: an instrument panel. Olive-tinted neutrals, hairline borders, tight corners, mono labels and a single
// phosphor-lime accent (hue 125). Light shifts to hue 135, a deeper ink-green, because the lime itself washes out on a
// pale ground; the accent keeps its identity without matching the dark modes exactly. Mono is carried by the display
// face, so titles read like panel legends. Density comes from smaller type-size tokens (tokens.css); the mono eyebrow
// labels and status chips are a small scoped stylesheet (signal.css).
const signalHue = 125;
const signalLightHue = 135;

const signal = definition(
  "signal",
  "Signal",
  "An instrument panel: hairline borders, tight corners, mono legends and one phosphor-lime accent.",
  {
    sans: `"Geist Variable", "Geist", ${sansFallback}`,
    display: `"JetBrains Mono Variable", "JetBrains Mono", ${monoFallback}`,
    mono: `"JetBrains Mono Variable", "JetBrains Mono", ${monoFallback}`
  },
  { radiusSm: "2px", radius: "3px", radiusMd: "3px", radiusLg: "4px", radiusXl: "6px" },
  "classic",
  {
    light: mode({
      scheme: "light", hue: signalHue, chroma: 0.01,
      background: 0.972, card: 0.999, muted: 0.948, border: 0.875, input: 0.999, sidebar: 0.955, foreground: 0.2, mutedForeground: 0.48,
      primary: oklch(0.5, 0.15, signalLightHue), primaryForeground: white,
      wash: oklch(0.93, 0.05, signalHue), activeForeground: oklch(0.34, 0.1, signalLightHue)
    }),
    dark: mode({
      scheme: "dark", hue: signalHue, chroma: 0.014,
      background: 0.15, card: 0.185, muted: 0.225, border: 0.285, input: 0.165, sidebar: 0.165, foreground: 0.94, mutedForeground: 0.72,
      primary: oklch(0.88, 0.22, signalHue), primaryForeground: oklch(0.19, 0.05, signalHue),
      wash: oklch(0.3, 0.075, signalHue), activeForeground: oklch(0.92, 0.17, signalHue)
    }),
    dim: mode({
      scheme: "dim", hue: signalHue, chroma: 0.02,
      background: 0.27, card: 0.305, muted: 0.34, border: 0.4, input: 0.285, sidebar: 0.25, foreground: 0.95, mutedForeground: 0.79,
      primary: oklch(0.84, 0.2, signalHue), primaryForeground: oklch(0.2, 0.05, signalHue),
      wash: oklch(0.39, 0.08, signalHue), activeForeground: oklch(0.93, 0.14, signalHue)
    }),
    highContrast: highContrast(oklch(0.92, 0.22, signalHue), signalHue)
  }
);

// Dusk: dim-first. Violet slate with an amber highlight. Dim is the hero mode (a lifted violet ground, amber accent
// and amber-filled active navigation); Light and Dark share the violet and keep it as the accent.
const duskHue = 292;
const duskAmberHue = 80;
const duskAmber = oklch(0.83, 0.15, duskAmberHue);
const duskAmberInk = oklch(0.2, 0.05, 70);

const dusk = definition(
  "dusk",
  "Dusk",
  "Dim-first: violet slate with an amber highlight, tuned for long low-light sessions.",
  {
    sans: `"Instrument Sans Variable", "Instrument Sans", ${sansFallback}`,
    mono: `"JetBrains Mono Variable", "JetBrains Mono", ${monoFallback}`
  },
  { radiusSm: "7px", radius: "10px", radiusMd: "12px", radiusLg: "16px", radiusXl: "20px" },
  "classic",
  {
    light: mode({
      scheme: "light", hue: duskHue, chroma: 0.014,
      background: 0.966, card: 0.998, muted: 0.945, border: 0.89, input: 0.998, sidebar: 0.945, foreground: 0.22, mutedForeground: 0.5,
      primary: oklch(0.5, 0.2, 288), primaryForeground: white,
      wash: oklch(0.93, 0.04, duskHue), activeForeground: oklch(0.4, 0.2, 288)
    }),
    dark: mode({
      scheme: "dark", hue: duskHue, chroma: 0.024,
      background: 0.14, card: 0.18, muted: 0.22, border: 0.28, input: 0.16, sidebar: 0.155, foreground: 0.95, mutedForeground: 0.73,
      primary: oklch(0.7, 0.17, 290), primaryForeground: oklch(0.17, 0.05, 290),
      wash: oklch(0.29, 0.07, duskHue), activeForeground: oklch(0.86, 0.1, 290)
    }),
    dim: mode({
      scheme: "dim", hue: duskHue, chroma: 0.04,
      background: 0.265, card: 0.31, muted: 0.35, border: 0.415, input: 0.285, sidebar: 0.24, foreground: 0.95, mutedForeground: 0.8,
      primary: duskAmber, primaryForeground: duskAmberInk,
      wash: oklch(0.4, 0.07, duskHue), activeForeground: duskAmberInk,
      overrides: { sidebarActive: duskAmber }
    }),
    highContrast: highContrast(oklch(0.86, 0.17, duskAmberHue), duskAmberHue)
  }
);

const porcelainSans = `"Instrument Sans Variable", "Instrument Sans", ${sansFallback}`;
const porcelainDisplay = `"Instrument Serif", Georgia, "Times New Roman", serif`;
const nordicSans = `"Manrope Variable", "Manrope", ${sansFallback}`;
const existingMono = `"JetBrains Mono Variable", "JetBrains Mono", ${monoFallback}`;
const porcelainElevation = {
  lightShadow: "0 2px 5px #49301d09, 0 12px 32px #49301d06",
  darkShadow: "0 2px 5px #0002, 0 12px 32px #0001"
} satisfies Pick<PreviewPalette, "lightShadow" | "darkShadow">;
const nordicElevation = {
  lightShadow: "0 2px 5px #233c5206, 0 12px 32px #233c5205",
  darkShadow: "0 2px 5px #0002, 0 12px 32px #0001"
} satisfies Pick<PreviewPalette, "lightShadow" | "darkShadow">;
const obsidianElevation = {
  lightShadow: "0 0 0 0 transparent",
  darkShadow: "0 0 0 0 transparent"
} satisfies Pick<PreviewPalette, "lightShadow" | "darkShadow">;

const porcelain = definition(
  "porcelain",
  "Porcelain",
  "Warm ivory paper, ink and restrained terracotta with an editorial serif display face.",
  { sans: porcelainSans, display: porcelainDisplay, mono: existingMono },
  { radiusSm: "7px", radius: "12px", radiusMd: "14px", radiusLg: "16px", radiusXl: "18px" },
  "classic",
  {
    light: previewMaterialMode("light", {
      page: "#f5f2ed", surface: "#fffcf8", surface2: "#eee8df", nav: "#eae3d8", canvas: "#f8f5ef", input: "#f4efe7",
      ink: "#2b2926", secondary: "#625b52", muted: "#6c6358", line: "#ded6ca", accent: "#8e5341", accentInk: "#fffaf5",
      accentSoft: "#f1e0d6", good: "#377257", goodInk: "#ffffff", dot: "#cfc6b9", ...porcelainElevation
    }),
    dark: previewMaterialMode("dark", {
      page: "#211e1a", surface: "#2b2722", surface2: "#332e27", nav: "#25211c", canvas: "#24211c", input: "#24201b",
      ink: "#f4ebe0", secondary: "#d4c6b5", muted: "#b6a897", line: "#4c4237", accent: "#e3aa8f", accentInk: "#372219",
      accentSoft: "#4b352c", good: "#9dc3a9", goodInk: "#283b2e", dot: "#463d31", ...porcelainElevation
    }),
    dim: previewMaterialMode("dim", {
      page: "#302922", surface: "#3d352e", surface2: "#494036", nav: "#393129", canvas: "#352f28", input: "#352e26",
      ink: "#f3e8db", secondary: "#d1c1b1", muted: "#c0ab96", line: "#63564a", accent: "#e0a58a", accentInk: "#39251b",
      accentSoft: "#544034", good: "#9cc2a8", goodInk: "#243a2c", dot: "#55493a", ...porcelainElevation
    }),
    highContrast: previewHighContrast("#ffb99e", 40)
  }
);

const nordic = definition(
  "nordic",
  "Nordic",
  "Cool mist, slate and muted blue with calm tonal layers and soft geometry.",
  { sans: nordicSans, display: nordicSans, mono: existingMono },
  { radiusSm: "9px", radius: "16px", radiusMd: "18px", radiusLg: "20px", radiusXl: "24px" },
  "classic",
  {
    light: previewMaterialMode("light", {
      page: "#edf3f6", surface: "#fbfdff", surface2: "#eaf0f5", nav: "#e1eaf0", canvas: "#f1f6f9", input: "#eef3f7",
      ink: "#233545", secondary: "#4b6375", muted: "#586d7e", line: "#d4e0e9", accent: "#386b96", accentInk: "#ffffff",
      accentSoft: "#e0edf7", good: "#316c5c", goodInk: "#ffffff", dot: "#c6d7e3", ...nordicElevation
    }),
    dark: previewMaterialMode("dark", {
      page: "#19222c", surface: "#25313e", surface2: "#2c3946", nav: "#1e2a36", canvas: "#1d2833", input: "#202c37",
      ink: "#e9f1f8", secondary: "#b9ccdc", muted: "#9db3c5", line: "#3c5062", accent: "#96c0e3", accentInk: "#142b3f",
      accentSoft: "#2a465e", good: "#a0ccba", goodInk: "#2a423b", dot: "#354958", ...nordicElevation
    }),
    dim: previewMaterialMode("dim", {
      page: "#22303c", surface: "#324354", surface2: "#3d5062", nav: "#293a4b", canvas: "#273745", input: "#2c3c4d",
      ink: "#edf3f7", secondary: "#bfceda", muted: "#b6c7d6", line: "#536879", accent: "#a0c9e9", accentInk: "#1b344a",
      accentSoft: "#394f63", good: "#a4cbb9", goodInk: "#263d36", dot: "#4b6071", ...nordicElevation
    }),
    highContrast: previewHighContrast("#abd6fa", 242)
  }
);

const obsidian = definition(
  "obsidian",
  "Obsidian",
  "Quiet graphite, warm off-white and amber with crisp steel hairlines and compact controls.",
  { sans: geistTypography.sans, display: geistTypography.sans, mono: geistTypography.mono },
  { radiusSm: "4px", radius: "6px", radiusMd: "6px", radiusLg: "8px", radiusXl: "10px" },
  "classic",
  {
    light: previewMaterialMode("light", {
      page: "#f0f0ed", surface: "#fafaf7", surface2: "#e8e8e3", nav: "#e0e0da", canvas: "#f4f4f0", input: "#ededE7",
      ink: "#262721", secondary: "#57594f", muted: "#64675b", line: "#d3d4cb", accent: "#7f5b20", accentInk: "#ffffff",
      accentSoft: "#ede3cb", good: "#326e53", goodInk: "#ffffff", dot: "#d1d1c7", ...obsidianElevation
    }),
    dark: previewMaterialMode("dark", {
      page: "#171819", surface: "#232527", surface2: "#2b2e30", nav: "#1c1e20", canvas: "#1a1c1e", input: "#1d1f21",
      ink: "#efefeb", secondary: "#c0c1bb", muted: "#a2a69f", line: "#3e4141", accent: "#d7b877", accentInk: "#2c2313",
      accentSoft: "#403829", good: "#9ec9b1", goodInk: "#253a30", dot: "#35383b", ...obsidianElevation
    }),
    dim: previewMaterialMode("dim", {
      page: "#202224", surface: "#303336", surface2: "#393d40", nav: "#242729", canvas: "#272a2c", input: "#292c2e",
      ink: "#f0f0ec", secondary: "#c5c7c1", muted: "#a9ada6", line: "#575b5c", accent: "#e0c481", accentInk: "#2d2517",
      accentSoft: "#4a4031", good: "#a3c7b2", goodInk: "#283c32", dot: "#46494b", ...obsidianElevation
    }),
    highContrast: previewHighContrast("#f3cc7f", 85)
  }
);

export const foundationThemeIds = ["meridian", "material", "drift", "drift-coast", "drift-sand", "drift-ink", "schematic", "atelier", "elsa-cloud", "signal", "dusk", "porcelain", "nordic", "obsidian"] as const;

export const foundationThemeDefinitions: StudioThemeDefinition[] = [meridian, material, drift, driftCoast, driftSand, driftInk, schematic, atelier, elsaCloud, signal, dusk, porcelain, nordic, obsidian];
