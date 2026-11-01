# Popover

Use `b-ui="popover"` with trigger and content nodes.

## Nodex UI component

```js
import { Popover, PopoverContent, PopoverTrigger } from "nodexui";
```

```base-ui
<div style="max-width: 28rem">
  <Popover>
    <PopoverTrigger>
      <Button variant="'outline'">Open Popover</Button>
    </PopoverTrigger>
    <PopoverContent>
      <div class="d-flex flex-column gap-1">
        <Typography variant="'h4'">Title</Typography>
        <Typography variant="'muted'">Description text here.</Typography>
      </div>
    </PopoverContent>
  </Popover>
</div>
```

| Component | Prop | Type | Notes |
| --- | --- | --- | --- |
| `Popover` | `onOpenChange` | `Function` | optional |
| `Popover` | `className` | `String` | optional |
| `PopoverContent` | `content` | `String` | optional; plain content shortcut, passed directly as the bootstrap `content` option |
| `PopoverContent` | `className` | `String` | optional |
| `PopoverTrigger` | `className` | `String` | optional |

See [Nodex UI Component](/examples/blocks.html#/docs/guide/owl-components) for how to load `nodexui` and `dist/nodexui.templates.xml`.

Both the pure Nodex UI and static forms are driven by a live `bootstrap.Popover` instance owned on the trigger element — **the visible popup is the built-in generated DOM (a `.popover`/`.popover-arrow`/`.popover-body` node, positioned via Popper), appended to `document.body`, not rendered inline where you authored the popover.** Don't query for it as a descendant of the trigger or root; query `document.body.querySelector(".popover .popover-body")` instead. There's no separate heading/title concept in the current API — only body content (`.popover-body`); no `.popover-header` is generated.

The default slot's rendered markup is captured into an HTML string for the built-in `content`/`html: true` options (the library can't consume live vnodes): `PopoverContent` renders the slot into a hidden buffer element internal to its own template (it is no longer a visibly-toggled popup itself), `PopoverTrigger` reads that buffer's `innerHTML` on mount to seed the bootstrap instance, and re-syncs the live popup via `.setContent({'.popover-body': html})` whenever that HTML changes on a later render.

Unlike `Tooltip`/hover-driven components, the built-in `trigger: "click"` option would bind its own click listener directly on the trigger element, independent of `PopoverTrigger`'s own `t-on-click`. To avoid double-toggling on a single click, the pure Nodex UI `PopoverTrigger` constructs its `bootstrap.Popover` instance with `trigger: "manual"` and calls `.toggle()` itself from `onClick` — `shown.bs.popover`/`hidden.bs.popover` still fire from `.toggle()` regardless of the `trigger` option, since that option only gates the built-in auto-binding, not event dispatch. The static adapter, which has no competing click handler of its own, passes `trigger: "click"` and relies on the built-in built-in binding instead.

## Static component

```base-ui
<span b-ui="popover">
  <button b-popover-trigger type="button">More</button>
  <span b-popover-content>Helpful contextual content.</span>
</span>
```

The static adapter reads `[b-popover-content]` once at mount time as the popover's HTML content, then removes that node from the DOM — the library owns showing/hiding the content from then on, so no `[b-popover-content]` element survives in the authored markup post-mount. Events: `nodexui:open`, `nodexui:close` (dispatched from the root element on the built-in `shown.bs.popover`/`hidden.bs.popover`).

## Enhanced usage

Call `thebase.mount(element)` or rely on `thebase.mountAll()` after the script loads.

## Options and attributes

See `dist/nodexui.registry.json` for the supported attribute list.

## Methods

Use the global runtime methods: `thebase.mount()`, `thebase.mountAll()`, and `thebase.destroy()`.

## Events

Interactive components emit documented `nodexui:*` events from their root element. Listen for the built-in `shown.bs.popover`/`hidden.bs.popover` on the trigger element to react to show/hide; Nodex UI mirrors those into `b-att-state` (`open`/`closed`) and `aria-expanded` on the static trigger, and `this.env.popover.open`-equivalent reactive state on the Nodex UI components.

## CSS variables

The component inherits Nodex UI semantic tokens such as `--b-surface`, `--b-border`, `--b-primary`, and `--b-radius`. The popup itself is styled by the built-in bundled `.popover`/`.popover-arrow`/`.popover-body` CSS (loaded via `dist/nodexui.min.css`), not Nodex UI's own classes.

## Accessibility behavior

The component preserves authored semantic HTML and adds ARIA roles or state attributes where enhancement is required.

## Examples

See `examples/index.html` for a working CDN-style page.

## Browser support

Nodex UI targets modern evergreen browsers that support ES modules, CSS variables.

## Test checklist

Verify light and dark themes, keyboard access for focusable controls, disabled or readonly states when applicable, and cleanup through `thebase.destroy()`.
