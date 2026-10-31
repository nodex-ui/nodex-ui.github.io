# Sheet

Use `b-ui="sheet"` for offcanvas panels.

## Nodex UI component

```js
import { Sheet, SheetClose, SheetContent, SheetDescription, SheetFooter, SheetHeader, SheetTitle, SheetTrigger } from "nodexui";
```

```base-ui
<div style="max-width: 28rem" class="w-100">
  <Sheet>
    <SheetTrigger>Open</SheetTrigger>
    <SheetContent>
      <SheetHeader>
        <SheetTitle>Are you absolutely sure?</SheetTitle>
        <SheetDescription>This action cannot be undone.</SheetDescription>
      </SheetHeader>
      <SheetFooter>
        <SheetClose>Close</SheetClose>
      </SheetFooter>
    </SheetContent>
  </Sheet>
</div>
```

| Component | Prop | Type | Notes |
| --- | --- | --- | --- |
| `Sheet` | `open` | `Boolean` | optional |
| `Sheet` | `defaultOpen` | `Boolean` | optional |
| `Sheet` | `onOpenChange` | `Function` | optional |
| `SheetClose` | `className` | `String` | optional |
| `SheetContent` | `className` | `String` | optional |
| `SheetDescription` | `className` | `String` | optional |
| `SheetFooter` | `className` | `String` | optional |
| `SheetHeader` | `className` | `String` | optional |
| `SheetTitle` | `className` | `String` | optional |
| `SheetTrigger` | `className` | `String` | optional |

`SheetContent` also accepts `side` (`"left"` or the default right), falling back to the `side` prop on the parent `Sheet` when unset. It is driven by a real `bootstrap.Offcanvas` instance bound to its own root, rendered as `.offcanvas.offcanvas-end` by default or `.offcanvas.offcanvas-start` for `side="left"`, permanently mounted rather than added/removed from the DOM. Escape, backdrop click, and the Tab focus trap are the built-in native Offcanvas behavior; focus-restore-to-trigger on close is kept by hand (not native to Offcanvas). `SheetClose` closes via `data-bs-dismiss="offcanvas"`. See [Nodex UI Component](/index.html#/docs/guide/owl-components) for how to load `nodexui` and `dist/nodexui.templates.xml`.

## Static component

```base-ui
<button id="open-sheet" type="button">Open</button>
<div b-ui="sheet" b-att-trigger="#open-sheet">
  <aside b-sheet-panel>
    <button b-sheet-close type="button">Close</button>
  </aside>
</div>
```

At mount, `[b-ui="sheet"]` itself becomes the `.offcanvas.offcanvas-end` element (`.offcanvas.offcanvas-start` when `b-att-side="left"`, `tabindex="-1"`) driven by a real `bootstrap.Offcanvas` instance (`backdrop: true, keyboard: true, scroll: false`); `[b-sheet-panel]` stays as a plain cosmetic content box inside it. `[b-sheet-close]` buttons get `data-bs-dismiss="offcanvas"` at mount time instead of a manual click handler.

Events: `nodexui:open`, `nodexui:close` (Nodex UI), plus the underlying `shown.bs.offcanvas`/`hidden.bs.offcanvas`.

Options: `b-att-side="left"` moves the sheet panel to the left (`offcanvas-start` instead of `offcanvas-end`). The sheet closes on backdrop click, close button (`data-bs-dismiss="offcanvas"`), or Escape — all native `bootstrap.Offcanvas` behavior — and traps Tab focus while open, restoring focus to the trigger on close (kept by hand — not native to Offcanvas).
