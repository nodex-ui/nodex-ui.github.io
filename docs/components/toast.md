# Toast

Use `b-ui="toast"` for transient status messages.

## Nodex UI component

```js
import { Toast } from "nodexui";
```

```base-ui
<div style="max-width: 28rem" class="d-flex flex-column align-items-center gap-3 w-100">
  <Button variant="'outline'" onClick="() => state.open = true">Show Toast</Button>
  <Toast open="state.open" onOpenChange="(v) => state.open = v" className="'w-100'">
    <div class="d-flex flex-column">
      <span class="fw-medium">Event created</span>
      <span class="text-body-secondary small">Sunday, December 3 at 9:00 AM</span>
    </div>
    <t t-set-slot="action">
      <Button variant="'outline'" size="'sm'" onClick="() => state.open = false">Undo</Button>
    </t>
  </Toast>
</div>
```

The toast stays hidden until `open`/`state` becomes truthy (never shows on mount) and auto-hides after `delay` ms once shown. The default slot (title/description) sits on the leading edge and grows to fill the available width; the optional `action` slot renders grouped tight against the close button on the trailing edge.

| Component | Prop | Type | Notes |
| --- | --- | --- | --- |
| `Toast` | `open` | `Boolean` | optional, default `false` — never shown until set to `true` |
| `Toast` | `variant` | `String` | optional |
| `Toast` | `delay` | `Number` | optional, default `3000` — auto-hides after this many ms; pass `0` to disable auto-hide |
| `Toast` | `position` | `String` | optional — `"top-left"`, `"top-right"`, `"bottom-left"`, or `"bottom-right"`; fixes the toast to that screen corner. Omit to render inline where placed |
| `Toast` | `className` | `String` | optional |
| `Toast` | `onOpenChange` | `Function` | optional |
| `Toast` | `action` slot | — | optional — e.g. a `<Button/>`, rendered grouped next to the close button (`<t t-set-slot="action">...</t>`) |

See [Nodex UI Component](/examples/blocks.html#/docs/guide/owl-components) for how to load `nodexui` and `dist/nodexui.templates.xml`.

## Static component

The toast root is a flex row: wrap message content in `.b-toast-content` (grows to fill the width) and any action button plus the close button in `.b-toast-actions` (grouped tight on the trailing edge).

```base-ui
<div b-ui="toast">
  <div class="b-toast-content">Saved successfully.</div>
  <div class="b-toast-actions">
    <button b-toast-close type="button">Close</button>
  </div>
</div>
```

The toast stays hidden until shown — omit `b-att-state="open"` and call `.show()` from a trigger button instead of setting it on mount. It auto-hides after `b-att-delay` ms once shown (default `3000`; set `b-att-delay="0"` to disable auto-hide):

```base-ui
<div class="d-flex flex-column align-items-center gap-3">
  <button type="button" class="btn b-button btn-outline-secondary" onclick="document.getElementById('demo-toast').NodexUIToast.show()">Show Toast</button>
  <div id="demo-toast" b-ui="toast" b-att-delay="3000">
    <div class="b-toast-content">
      <div class="fw-medium">Event created</div>
      <div class="text-body-secondary small">Sunday, December 3 at 9:00 AM</div>
    </div>
    <div class="b-toast-actions">
      <button type="button" class="btn b-button btn-outline-secondary btn-sm">Undo</button>
      <button b-toast-close type="button">Close</button>
    </div>
  </div>
</div>
```

Programmatic API: after mount, call `element.NodexUIToast.show()` or `element.NodexUIToast.hide()`. Events: `nodexui:open`, `nodexui:close`.

Toasts are backed by `bootstrap.Toast`: the root receives the built-in `toast fade` classes, and visibility is driven by the built-in `show`/`showing` classes (not `hidden`). The close button(s) carry `data-bs-dismiss="toast"` in addition to the `b-toast-close`/`b-toast-close` selector, so the built-in delegated dismiss handler drives them.

### Screen-corner placement

Set `b-att-position` to `top-left`, `top-right`, `bottom-left`, or `bottom-right` to fix the toast to that corner of the viewport. The toast element itself gets the built-in `toast-container position-fixed p-3 pe-auto` classes plus the matching edge utility classes (`top-0`/`bottom-0` + `start-0`/`end-0`) merged in — no wrapper element. Omit the attribute to leave the toast inline in the document flow (the previous, default behavior):

```base-ui
<div id="corner-toast" b-ui="toast" b-att-position="bottom-right" b-att-delay="3000">
  <div class="b-toast-content">Saved successfully.</div>
  <div class="b-toast-actions">
    <button b-toast-close type="button">Close</button>
  </div>
</div>
```

The pure Nodex UI `Toast` component takes the same values via its `position` prop.
