# Theming

Set the theme on `html` or a subtree:

```html
<html b-theme="dark">
```

At runtime:

```js
thebase.theme.set("dark");
thebase.theme.set({ primary: "#0057d8", radius: "0.5rem" });
```

## Make your own theme

`dist/nodexui.min.css` is the only stylesheet an app loads; it already includes the default light and dark themes. A custom theme is two small files, `nodexui-light.css` and `nodexui-dark.css` (readable copies in `dist/themes/`, minified `.min.css` versions beside them), loaded after it.

1. Build one visually in the **theme creator** (the **Theme** tab of the examples app (`examples/index.html#/theme`)): pick a base colour, accent and radius, preview Nodex UI live in light or dark, then download `nodexui-light.css` and `nodexui-dark.css`.
2. Or download the two files from `dist/themes/` (or copy `src/themes/`) and edit the values by hand.
3. Load them after Nodex UI stylesheet:

```html
<link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/nodexui@1.3.1/dist/nodexui.min.css">
<link rel="stylesheet" href="/css/nodexui-light.css">
<link rel="stylesheet" href="/css/nodexui-dark.css">
```

Each file declares the same variables on its own selector (`light`: `:root`, `[b-theme="light"]`, `.light`; `dark`: `[b-theme="dark"]`, `.dark`), so loading yours after the defaults replaces them. Edit only the values; keep the selectors and variable names. The tokens you will usually change:

| Token | Controls |
| --- | --- |
| `--b-background`, `--b-foreground` | Page background and text |
| `--b-surface`, `--b-card`, `--b-popover` (+ `-foreground`) | Raised surfaces |
| `--b-primary`, `--b-primary-rgb`, `--b-primary-foreground` | Primary buttons, links, active states (keep `-rgb` in sync with the colour) |
| `--b-secondary`, `--b-muted`, `--b-accent` (+ `-foreground`) | Subtle fills and hover states |
| `--b-danger`, `--b-success`, `--b-warning`, `--b-info` (each with `-rgb` and `-foreground`) | Error/destructive, success, warning and info states: buttons (`.btn-success` …), badges, alerts, built-in `text-*`/`bg-*` helpers |
| `--b-border`, `--b-input`, `--b-ring` | Borders, field outlines, focus ring |
| `--b-chart-1` … `--b-chart-5`, `--b-sidebar-*` | Charts and the sidebar |
| `--base-radius` | Corner roundness; every `--b-radius-*` step is derived from it |
| `--b-overlay` | Backdrop behind dialogs and sheets |

To change a few values without a full theme, override them on `:root` / `[b-theme="dark"]` in your own CSS, or at runtime with `thebase.theme.set({ primary: "#0057d8", radius: "0.5rem" })`.

Nodex UI maps semantic tokens such as `--b-background`, `--b-primary`, `--b-border`, and `--b-radius` into built-in variables. Radius tokens are sourced from the shorter public alias family `--base-radius`, `--base-radius-sm`, `--base-radius-md`, `--base-radius-lg`, `--base-radius-xl`, `--base-radius-2xl`, `--base-radius-3xl`, `--base-radius-4xl`, and `--base-radius-full`, then mirrored to `--b-radius*` for component CSS.

For a reusable theme toggle with persistence, URL override, button-label sync, and iframe preview sync, import the theme helper:

```html
<script type="importmap">
{
  "imports": {
    "nodexui": "https://cdn.jsdelivr.net/npm/nodexui@latest/dist/nodexui.esm.js"
  }
}
</script>
<script type="module">
  import { createThemeController } from "nodexui";

  const theme = createThemeController({
    storageKey: "my-app-theme",
    toggleSelector: "[b-theme-toggle]",
    labelSelector: "[b-theme-label]"
  });

  theme.init();
</script>
```

`https://unpkg.com/nodexui@latest/dist/nodexui.esm.js` mirrors the same file as an alternative CDN if jsDelivr is unreachable. Pin an exact version (e.g. `@1.3.1`, or `@1` to take only non-breaking updates) instead of `@latest` for production. Npm/bundler consumers can import the same API from `nodexui`.

For a ready-made icon button, use Nodex UI component instead of wiring your own click handler:

```html
<button b-ui="theme-button" b-att-variant="outline" b-att-storage-key="my-app-theme" type="button"></button>
```

The documentation and example pages use the same theme infrastructure. Nodex example modules import `createThemeController` from `nodexui`; static chrome relies on `b-ui="theme-button"`, which uses the helper internally, so one selected theme is persisted across components, docs, chart galleries, block viewers, and same-origin block preview iframes. Theme changes dispatch `nodexui:theme-change` on `document` with `{ theme }` in `event.detail`.

## Design tokens

The default light/dark palettes and radius follow the current [shadcn/ui](https://ui.shadcn.com) Nodex UI neutral theme: black/neutral primary on white in light mode, neutral-900/50 foreground-background inversion in dark mode, neutral `--b-secondary`/`--b-muted`/`--b-accent` surfaces, `--base-radius: var(--radius, 0.625rem)` (set in the theme files), and a derived radius scale (`--base-radius-sm|md|lg|xl`, mirrored as `--b-radius-sm|md|lg|xl`) and shadow scale (`--b-shadow-sm|md|lg`) for consistent elevation across popovers, menus, dialogs, and toasts. Nodex UI reads an existing upstream `--radius` value when present, but it does not redefine `--radius` back to `--b-radius`; that one-way bridge avoids CSS custom-property cycles. `--b-card`/`--b-popover` alias `--b-surface` for shadcn-token-name parity.

Because Nodex UI ships the built-in stock precompiled CSS, most `.btn-*`/badge colors are not driven by `--bs-*` variables directly — `src/styles/base-extensions.css` re-points the `.btn-primary`/`.btn-secondary`/`.btn-danger`/`.btn-outline-secondary`/`.btn-light` variants at Nodex UI tokens so `thebase.theme.set(...)` overrides actually render. Badges use their own `b-badge-*` classes (`src/components/badge/badge.css`) instead of the built-in `text-bg-*`, which hardcode non-overridable colors.
