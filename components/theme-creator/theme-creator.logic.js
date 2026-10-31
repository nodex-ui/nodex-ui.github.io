// Pure helpers for the theme creator: palettes, reading a theme file's tokens, and writing edited values back.

/** Neutral scales (Tailwind) used as the "base colour": the shades the theme reads for surfaces, text and borders. */
export const BASES = {
  neutral: { 50: "#fafafa", 100: "#f5f5f5", 200: "#e5e5e5", 400: "#a3a3a3", 500: "#737373", 600: "#525252", 800: "#262626", 900: "#171717", 950: "#0a0a0a" },
  zinc: { 50: "#fafafa", 100: "#f4f4f5", 200: "#e4e4e7", 400: "#a1a1aa", 500: "#71717a", 600: "#52525b", 800: "#27272a", 900: "#18181b", 950: "#09090b" },
  slate: { 50: "#f8fafc", 100: "#f1f5f9", 200: "#e2e8f0", 400: "#94a3b8", 500: "#64748b", 600: "#475569", 800: "#1e293b", 900: "#0f172a", 950: "#020617" },
  stone: { 50: "#fafaf9", 100: "#f5f5f4", 200: "#e7e5e4", 400: "#a8a29e", 500: "#78716c", 600: "#57534e", 800: "#292524", 900: "#1c1917", 950: "#0c0a09" },
};

/** Accent colours for primary buttons; `neutral` keeps the base colour's near-black/near-white primary. */
export const ACCENTS = {
  neutral: null,
  blue: { light: "#2563eb", dark: "#3b82f6" },
  green: { light: "#16a34a", dark: "#22c55e" },
  orange: { light: "#ea580c", dark: "#f97316" },
  rose: { light: "#e11d48", dark: "#f43f5e" },
  violet: { light: "#7c3aed", dark: "#8b5cf6" },
};

// Swatches offered for each status colour; the first is the theme file's own default.
export const STATUS_PRESETS = {
  success: [["green", "#16a34a"], ["emerald", "#059669"], ["teal", "#0d9488"], ["lime", "#65a30d"]],
  warning: [["amber", "#f59e0b"], ["orange", "#ea580c"], ["yellow", "#eab308"], ["red-orange", "#f97316"]],
  danger: [["red", "#c10007"], ["rose", "#e11d48"], ["pink", "#db2777"], ["crimson", "#be123c"]],
  info: [["sky", "#0284c7"], ["blue", "#2563eb"], ["cyan", "#0891b2"], ["indigo", "#4f46e5"]],
};

export const RADII = [0, 0.3, 0.5, 0.625, 0.75, 1];

export const STATUSES = ["success", "warning", "danger", "info"];

// The light theme file's own status colours, shown in the pickers until the user chooses one.
export const STATUS_DEFAULTS = { success: "#16a34a", warning: "#f59e0b", danger: "#c10007", info: "#0284c7" };

// A fresh config each time, so the nested `status` object is never shared between resets.
export function defaultConfig() {
  return { base: "neutral", accent: "neutral", custom: "", radius: 0.625, status: Object.fromEntries(STATUSES.map((name) => [name, ""])) };
}

// Turns "#rrggbb" into the "r, g, b" string Bootstrap's `--bs-*-rgb` variables expect.
export function hexToRgb(hex) {
  const n = parseInt(hex.slice(1), 16);
  return `${(n >> 16) & 255}, ${(n >> 8) & 255}, ${n & 255}`;
}

// Picks near-white or near-black text so it stays readable on the given hex colour.
export function readableOn(hex) {
  const [r, g, b] = hexToRgb(hex).split(", ").map(Number);
  return 0.299 * r + 0.587 * g + 0.114 * b > 160 ? "#0a0a0a" : "#fafafa";
}

// Reads every `--name: value;` declaration of a theme file into a Map, in file order.
export function parseTokens(css) {
  const tokens = new Map();
  for (const [, name, value] of css.matchAll(/^\s*(--[\w-]+):\s*([^;]+);/gm)) tokens.set(name, value.trim());
  return tokens;
}

// Picks the accent colour for a mode: the custom hex if one is set, else the named accent's shade, else null (neutral).
function accentFor(config, mode) {
  if (config.custom) return config.custom;
  return ACCENTS[config.accent]?.[mode] ?? null;
}

// Works out which tokens the chosen options change for one mode ("light" | "dark"); everything else keeps the file's value.
export function overridesFor(config, mode) {
  const p = BASES[config.base];
  const dark = mode === "dark";
  const accent = accentFor(config, mode);
  const primary = accent ?? (dark ? p[200] : p[900]);
  const primaryForeground = accent ? readableOn(accent) : dark ? p[900] : p[50];
  const foreground = dark ? p[50] : p[950];
  const subtle = dark ? p[800] : p[100];
  const edge = dark ? p[500] : p[400];
  const out = {
    "--b-background": dark ? p[950] : "#ffffff",
    "--b-foreground": foreground,
    "--b-surface": dark ? p[900] : "#ffffff",
    "--b-surface-foreground": foreground,
    "--b-primary": primary,
    "--b-primary-rgb": hexToRgb(primary),
    "--b-primary-foreground": primaryForeground,
    "--b-secondary": subtle,
    "--b-secondary-rgb": hexToRgb(subtle),
    "--b-secondary-foreground": dark ? p[50] : p[900],
    "--b-muted": subtle,
    "--b-muted-foreground": dark ? p[400] : p[600],
    "--b-accent": subtle,
    "--b-accent-foreground": dark ? p[50] : p[900],
    "--b-ring": accent ?? edge,
    "--b-sidebar": dark ? p[900] : p[50],
    "--b-sidebar-foreground": foreground,
    "--b-sidebar-primary": primary,
    "--b-sidebar-primary-foreground": primaryForeground,
    "--b-sidebar-accent": subtle,
    "--b-sidebar-accent-foreground": dark ? p[50] : p[900],
    "--b-sidebar-ring": accent ?? edge,
    "--bs-body-color-rgb": hexToRgb(foreground),
    "--bs-emphasis-color-rgb": hexToRgb(foreground),
    "--bs-body-bg-rgb": hexToRgb(dark ? p[950] : "#ffffff"),
    "--bs-secondary-bg-rgb": hexToRgb(subtle),
    "--bs-tertiary-bg-rgb": hexToRgb(subtle),
    "--base-radius": `${config.radius}rem`,
  };
  for (const name of STATUSES) {
    const hex = config.status?.[name];
    if (!hex) continue;
    out[`--b-${name}`] = hex;
    out[`--b-${name}-rgb`] = hexToRgb(hex);
    out[`--b-${name}-foreground`] = readableOn(hex);
  }
  if (!dark) {
    out["--b-border"] = p[200];
    out["--b-input"] = p[200];
    out["--b-sidebar-border"] = p[200];
  }
  return out;
}

// Merges overrides over the file's own tokens: the full token map to apply as live preview styles.
export function resolveTokens(css, overrides) {
  const tokens = parseTokens(css);
  for (const [name, value] of Object.entries(overrides)) tokens.set(name, value);
  return tokens;
}

// Writes the overridden values back into the original theme file text, keeping its selectors, order and comments.
export function serializeTheme(css, overrides) {
  return Object.entries(overrides).reduce((text, [name, value]) => {
    const line = new RegExp(`^(\\s*${name}:\\s*)[^;]+;`, "m");
    return line.test(text) ? text.replace(line, (_, head) => `${head}${value};`) : text;
  }, css);
}
