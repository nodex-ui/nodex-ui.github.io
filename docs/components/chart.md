# Chart

Use `b-ui="chart"` for a CDN-ready chart component styled after the current shadcn chart pages.

## CDN install requirements

Load the pinned Nodex UI CSS and JavaScript files. No extra dependency is required for static charts. If you provide a `canvas` and a global `window.Chart`, Nodex UI will initialize Chart.js v3 from JSON config without bundling Chart.js into Nodex UI.

## Nodex UI component

```js
import { Chart } from "nodexui";
```

```base-ui
<div style="max-width: 32rem" class="w-100">
  <Chart type="'bar'" className="'w-100'" aria-label="'Bar chart of desktop and mobile visitors'">
    <div b-chart-header="">
      <h3 b-chart-title="">Bar Chart</h3>
      <p b-chart-description="">Desktop and mobile visitors for January - March</p>
    </div>
    <div b-chart-body="">
      <div b-chart-plot="">
        <div class="d-flex align-items-end gap-1" title="January">
          <div b-att-value="186" b-att-label="Desktop"></div>
          <div b-att-value="80" b-att-label="Mobile"></div>
        </div>
        <div class="d-flex align-items-end gap-1" title="February">
          <div b-att-value="305" b-att-label="Desktop"></div>
          <div b-att-value="200" b-att-label="Mobile"></div>
        </div>
        <div class="d-flex align-items-end gap-1" title="March">
          <div b-att-value="237" b-att-label="Desktop"></div>
          <div b-att-value="120" b-att-label="Mobile"></div>
        </div>
      </div>
    </div>
    <div b-chart-footer="">
      <div b-chart-legend="">
        <span style="--b-chart-color: var(--b-chart-1)">Desktop</span>
        <span style="--b-chart-color: var(--b-chart-2)">Mobile</span>
      </div>
    </div>
  </Chart>
</div>
```

| Component | Prop | Type | Notes |
| --- | --- | --- | --- |
| `Chart` | `variant` | `String` | optional |
| `Chart` | `className` | `String` | optional |

See [Nodex UI Component](/index.html#/docs/guide/owl-components) for how to load `nodexui` and `dist/nodexui.templates.xml`.

## Static component

```base-ui
<div b-ui="chart" b-att-type="area" b-att-variant="area-card" aria-label="Area Chart">
  <div b-chart-header>
    <h3 b-chart-title>Area Chart</h3>
    <p b-chart-description>Showing total visitors for the last 6 months</p>
  </div>
  <div b-chart-body>
    <svg viewBox="0 0 640 250" role="img" aria-label="Area Chart">
      <g b-chart-grid>
        <line x1="0" y1="40" x2="640" y2="40"/>
        <line x1="0" y1="100" x2="640" y2="100"/>
        <line x1="0" y1="160" x2="640" y2="160"/>
      </g>
      <path b-chart-area b-chart-series d="M0 150 C60 70 120 110 180 56 S300 175 360 120 S480 78 540 95 S600 55 640 82 L640 220 L0 220 Z"/>
      <path b-chart-line b-chart-series d="M0 150 C60 70 120 110 180 56 S300 175 360 120 S480 78 540 95 S600 55 640 82"/>
    </svg>
  </div>
  <div b-chart-footer>
    <div b-chart-trend>Trending up by 5.2% this month</div>
    <div b-chart-range>January - June 2024</div>
  </div>
</div>
```

See the [Chart tab](/index.html#/chart/area) (`components/chart-gallery/`) for the local copy of the shadcn area chart gallery: interactive, default, linear, step, legend, stacked, stacked expanded, icons, gradient, and axes.

## Chart.js usage

```html
<script src="https://cdn.jsdelivr.net/npm/chart.js@3"></script>
<div b-ui="chart">
  <canvas></canvas>
  <script type="application/json">
    {"type":"bar","data":{"labels":["Jan","Feb"],"datasets":[{"label":"Desktop","data":[186,305]}]}}
  </script>
</div>
```

## Enhanced usage

Call `thebase.mount(element)` or rely on `thebase.mountAll()` after the script loads.

## Options and attributes

See `dist/nodexui.registry.json` for the supported attribute list.

## Methods

Use the global runtime methods: `thebase.mount()`, `thebase.mountAll()`, and `thebase.destroy()`.

## Events

Interactive components emit documented `nodexui:*` events from their root element. Static components do not emit events.

## CSS variables

The component inherits Nodex UI semantic tokens plus shadcn-compatible chart tokens: `--b-chart-1` through `--b-chart-5`. Area-card examples also use `--b-chart-height`, `--b-chart-grid`, `b-chart-area`, `b-chart-line`, `b-chart-axis`, `b-chart-footer`, `b-chart-trend`, and `b-chart-range`.

The plot (`b-chart-plot`) has a fixed height of `--b-chart-height` (default `var(--b50)`), and each `b-att-value` column draws its bar from the bottom as a percentage of the largest value in the chart. Override `--b-chart-height` on the chart element to make it taller or shorter; the bar height needs this definite plot height to resolve.

## Accessibility behavior

The component preserves authored semantic HTML and adds ARIA roles or state attributes where enhancement is required.

## Examples

See `examples/index.html` for a working CDN-style page.

## Browser support

Nodex UI targets modern evergreen browsers that support ES modules, CSS variables.

## Test checklist

Verify light and dark themes, keyboard access for focusable controls, disabled or readonly states when applicable, and cleanup through `thebase.destroy()`.
