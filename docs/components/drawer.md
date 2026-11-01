# Drawer

## Nodex UI component

```js
import { Drawer, DrawerClose, DrawerContent, DrawerDescription, DrawerFooter, DrawerHeader, DrawerTitle, DrawerTrigger } from "nodexui";
```

```base-ui
<div style="max-width: 28rem" class="w-100">
  <Drawer>
    <DrawerTrigger>Open</DrawerTrigger>
    <DrawerContent>
      <DrawerHeader>
        <DrawerTitle>Are you absolutely sure?</DrawerTitle>
        <DrawerDescription>This action cannot be undone.</DrawerDescription>
      </DrawerHeader>
      <div class="p-4"></div>
      <DrawerFooter>
        <Button>Submit</Button>
        <DrawerClose>Cancel</DrawerClose>
      </DrawerFooter>
    </DrawerContent>
  </Drawer>
</div>
```

| Component | Prop | Type | Notes |
| --- | --- | --- | --- |
| `Drawer` | `open` | `Boolean` | optional |
| `Drawer` | `defaultOpen` | `Boolean` | optional |
| `Drawer` | `onOpenChange` | `Function` | optional |
| `DrawerClose` | `className` | `String` | optional |
| `DrawerContent` | `className` | `String` | optional |
| `DrawerDescription` | `className` | `String` | optional |
| `DrawerFooter` | `className` | `String` | optional |
| `DrawerHeader` | `className` | `String` | optional |
| `DrawerTitle` | `className` | `String` | optional |
| `DrawerTrigger` | `className` | `String` | optional |

`DrawerContent` is driven by a real `bootstrap.Offcanvas` instance bound to its own root (rendered as `.offcanvas.offcanvas-bottom`, permanently mounted rather than added/removed from the DOM) — Escape, backdrop click, and the Tab focus trap are the built-in native Offcanvas behavior, same as the static API; focus-restore-to-trigger on close is kept by hand (not native to Offcanvas). `DrawerClose` closes via `data-bs-dismiss="offcanvas"`. Drawer has no side variant — it always slides up from the bottom. See [Nodex UI Component](/examples/blocks.html#/docs/guide/owl-components) for how to load `nodexui` and `dist/nodexui.templates.xml`.

## Static component

```base-ui
<button b-ui="button" b-att-trigger="#demo-drawer" type="button">Open Drawer</button>
<div b-ui="drawer" b-att-trigger="[b-att-trigger='#demo-drawer']" id="demo-drawer">
  <div b-drawer-panel>
    <button b-ui="button" b-drawer-close type="button">Close</button>
  </div>
</div>
```

At mount, `[b-ui="drawer"]` itself becomes the `.offcanvas.offcanvas-bottom` element (`tabindex="-1"`) driven by a real `bootstrap.Offcanvas` instance (`backdrop: true, keyboard: true, scroll: false`); `[b-drawer-panel]` stays as a plain cosmetic content box inside it. `[b-drawer-close]` buttons get `data-bs-dismiss="offcanvas"` at mount time instead of a manual click handler.

Events: `nodexui:open`, `nodexui:close` (Nodex UI), plus the underlying `shown.bs.offcanvas`/`hidden.bs.offcanvas`.

Keyboard: Escape closes the drawer (the built-in native `keyboard` option), as does a backdrop click on the generated `.offcanvas-backdrop`. Focus is trapped inside via Tab/Shift+Tab (native `bootstrap.Offcanvas` focus trap) and returns to the trigger on close (kept by hand — not native to Offcanvas).
