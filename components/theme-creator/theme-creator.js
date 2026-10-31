import { Component, markup, onMounted, onPatched, onWillStart, reactive, useRef, useState } from "nodexui";
import { loadCatalog, t } from "../../i18n.js";
import { ACCENTS, BASES, RADII, STATUSES, STATUS_DEFAULTS, STATUS_PRESETS, defaultConfig, overridesFor, resolveTokens, serializeTheme } from "./theme-creator.logic.js";

await loadCatalog(import.meta.url);

// Theme files shipped with the nodexui version pinned in the page's import map.
const THEME_URLS = {
  light: new URL("themes/nodexui-light.css", import.meta.resolve("nodexui")).href,
  dark: new URL("themes/nodexui-dark.css", import.meta.resolve("nodexui")).href,
};

/** Shared reactive state for the Theme tab, subscribed to by both `ThemeCreatorSidebar` and `ThemeCreatorContent`. */
export const themeState = reactive({ ...defaultConfig(), mode: "light", copied: false });

const sources = {};

// Fetches the shipped theme files once; they are the template the downloads and preview are built from.
async function loadSources() {
  if (sources.light) return;
  const [light, dark] = await Promise.all(Object.values(THEME_URLS).map((url) => fetch(url).then((response) => response.text())));
  Object.assign(sources, { light, dark });
}

// Pulls just the user's choices (not mode or UI flags) out of the shared state.
function currentConfig() {
  const { base, accent, custom, radius, status } = themeState;
  return { base, accent, custom, radius, status: { ...status } };
}

// Builds the downloadable CSS text for one mode.
function themeCss(mode) {
  return serializeTheme(sources[mode], overridesFor(currentConfig(), mode));
}

// Hands the browser a text file to save.
function download(filename, text) {
  const link = document.createElement("a");
  link.href = URL.createObjectURL(new Blob([text], { type: "text/css" }));
  link.download = filename;
  link.click();
  URL.revokeObjectURL(link.href);
}

/** Theme tab sidebar: base colour, accent, radius and preview-mode pickers plus the download buttons. */
export class ThemeCreatorSidebar extends Component {
  static template = "examples.ThemeCreatorSidebar";

  t = t;

  setup() {
    this.bases = Object.keys(BASES);
    this.accents = Object.keys(ACCENTS);
    this.radii = RADII;
    this.statuses = STATUSES;
    this.presets = STATUS_PRESETS;
    this.swatch = Object.fromEntries(this.accents.map((name) => [name, ACCENTS[name]?.light ?? BASES.neutral[900]]));
    this.baseDot = Object.fromEntries(this.bases.map((name) => [name, BASES[name][500]]));
    this.statusLabels = { success: t("Success"), warning: t("Warning"), danger: t("Danger"), info: t("Info") };
    this.loadHint = markup(t("Load the downloaded files after <code>nodexui.min.css</code>, or replace <code>src/themes/nodexui-*.css</code>."));
    this.state = useState(themeState);
    onWillStart(loadSources);
  }

  setMode(mode) {
    this.state.mode = mode;
  }

  setBase(name) {
    this.state.base = name;
  }

  // Choosing a named accent clears any custom colour.
  setAccent(name) {
    this.state.accent = name;
    this.state.custom = "";
  }

  setCustom(value) {
    this.state.custom = value;
  }

  // Sets one status colour (success, warning, danger, info) for both light and dark.
  setStatus(name, value) {
    this.state.status[name] = value;
  }

  // The colour shown in a status picker: the user's choice, else the light theme file's default.
  statusColor(name) {
    return this.state.status[name] || STATUS_DEFAULTS[name];
  }

  // True when `hex` is the colour currently in effect for a status (the user's pick, else the default).
  isStatus(name, hex) {
    return this.statusColor(name).toLowerCase() === hex;
  }

  // True when a status uses a colour outside its presets, so the edit icon should show it as selected.
  hasCustomStatus(name) {
    const hex = this.state.status[name];
    return Boolean(hex) && !STATUS_PRESETS[name].some(([, preset]) => preset === hex.toLowerCase());
  }

  setRadius(value) {
    this.state.radius = Number(value);
  }

  reset() {
    Object.assign(this.state, defaultConfig());
  }

  downloadMode(mode) {
    download(`nodexui-${mode}.css`, themeCss(mode));
  }

  // Copies both files, light first, so they can be pasted into one stylesheet.
  async copyAll() {
    await navigator.clipboard.writeText(`${themeCss("light")}\n${themeCss("dark")}`);
    this.state.copied = true;
    setTimeout(() => { this.state.copied = false; }, 1500);
  }
}

// Colour tiles in the preview: each token is labelled with the foreground token that sits on it, so the text stays readable.
const TILES = [
  ["background", "foreground"], ["surface", "surface-foreground"], ["muted", "muted-foreground"], ["accent", "accent-foreground"],
  ["border", "foreground"], ["primary", "primary-foreground"], ["success", "success-foreground"], ["warning", "warning-foreground"],
  ["danger", "danger-foreground"], ["info", "info-foreground"],
];

/** Theme tab content: Nodex UI components rendered with the chosen tokens applied as inline variables. */
export class ThemeCreatorContent extends Component {
  static template = "examples.ThemeCreatorContent";

  t = t;

  setup() {
    this.state = useState(themeState);
    this.preview = useRef("preview");
    onWillStart(loadSources);
    this.tiles = TILES;
    onMounted(() => this.applyPreview());
    onPatched(() => this.applyPreview());
  }

  // Changes whenever any choice changes, so Owl re-renders (and re-paints) this tab.
  get signature() {
    const { mode, base, accent, custom, radius, status } = this.state;
    return [mode, base, accent, custom, radius, ...STATUSES.map((name) => status[name])].join("|");
  }

  // Paints the chosen mode's tokens onto the preview box so every Nodex UI component inside it updates.
  applyPreview() {
    const box = this.preview.el;
    const mode = this.state.mode;
    box.setAttribute("b-theme", mode);
    box.removeAttribute("style");
    for (const [name, value] of resolveTokens(sources[mode], overridesFor(currentConfig(), mode))) box.style.setProperty(name, value);
  }
}
