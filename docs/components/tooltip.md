# Tooltip

Use `b-ui="tooltip"` with either `b-att-content` or a tooltip content child.

## Nodex UI component

```js
import { Tooltip } from "nodexui";
```

```base-ui
<div style="max-width: 28rem" class="w-100 d-flex align-items-center justify-content-center">
  <Tooltip content="'Add to library'">
    <t t-set-slot="trigger">
      <Button variant="'outline'">Hover</Button>
    </t>
  </Tooltip>
</div>
```

| Component | Prop | Type | Notes |
| --- | --- | --- | --- |
| `Tooltip` | `content` | `String` | optional; plain content shortcut, passed directly as the bootstrap `title` |
| `Tooltip` | `state` | `String` | optional; `"open"`/`"on"`/`"active"` shows the tooltip once on mount (uncontrolled testing hook) |
| `Tooltip` | `className` | `String` | optional |

See [Nodex UI Component](/examples/blocks.html#/docs/guide/owl-components) for how to load `nodexui` and `dist/nodexui.templates.xml`.

Both the pure Nodex UI and static forms are driven by a live `bootstrap.Tooltip` instance owned on the trigger element, with `trigger: "hover focus"` — **the visible popup is the built-in generated DOM (a `.tooltip`/`.tooltip-arrow`/`.tooltip-inner` node, positioned via Popper), appended to `document.body`, not rendered inline where you authored the tooltip.** Don't query for it as a descendant of the trigger; query `document.body.querySelector(".tooltip .tooltip-inner")` instead. base sets `aria-describedby` on the trigger itself, but only while the tooltip is actually shown (removed again on hide) — Nodex UI does not additionally set a static `aria-describedby` up front.

The default slot's rendered markup is captured into an HTML string for the built-in `title`/`html: true` options (the library can't consume live vnodes): the Nodex UI component renders the slot into a hidden buffer element internal to its own template, reads its `innerHTML` on mount, and re-syncs the live popup via `.setContent({'.tooltip-inner': html})` whenever that HTML changes on a later render.

## Static component

```base-ui
<span b-ui="tooltip" b-att-content="Helpful tip">
  <button type="button">?</button>
</span>
```

Tooltips show on hover and focus, then hide on mouse leave and blur — the built-in `trigger: "hover focus"` wires this, not manual event listeners. The static adapter reads `[b-tooltip-content]` (or the element built from `b-att-content`) once at mount time as the tooltip's HTML content, then removes that node from the DOM — the library owns showing/hiding the content from then on, so no `[b-tooltip-content]` element survives in the authored markup post-mount.

## Enhanced usage

Call `thebase.mount(element)` or rely on `thebase.mountAll()` after the script loads.

## Options and attributes

See `dist/nodexui.registry.json` for the supported attribute list.

## Methods

Use the global runtime methods: `thebase.mount()`, `thebase.mountAll()`, and `thebase.destroy()`.

## Events

Interactive components emit documented `nodexui:*` events from their root element. Listen for the built-in `shown.bs.tooltip`/`hidden.bs.tooltip` on the trigger element to react to show/hide; Nodex UI mirrors those into `b-att-state` (`open`/`closed`) on the static root and `this.state.open` on the Nodex UI component.

## CSS variables

The component inherits Nodex UI semantic tokens such as `--b-surface`, `--b-border`, `--b-primary`, and `--b-radius`. The popup itself is styled by the built-in bundled `.tooltip`/`.tooltip-arrow`/`.tooltip-inner` CSS (loaded via `dist/nodexui.min.css`), not Nodex UI's own classes.

## Accessibility behavior

The component preserves authored semantic HTML and adds ARIA roles or state attributes where enhancement is required.

## Examples

See `examples/index.html` for a working CDN-style page.

## Browser support

Nodex UI targets modern evergreen browsers that support ES modules, CSS variables.

## Test checklist

Verify light and dark themes, keyboard access for focusable controls, disabled or readonly states when applicable, and cleanup through `thebase.destroy()`.
