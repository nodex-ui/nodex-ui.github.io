# Dialog

## Nodex UI component

```js
import {
  Dialog, DialogClose, DialogContent, DialogDescription,
  DialogFooter, DialogHeader, DialogTitle, DialogTrigger,
} from "nodexui";
```

```base-ui
<div style="max-width: 28rem" class="w-100">
  <Dialog>
    <DialogTrigger>Open</DialogTrigger>
    <DialogContent>
      <DialogHeader>
        <DialogTitle>Are you absolutely sure?</DialogTitle>
        <DialogDescription>
          This action cannot be undone. This will permanently delete your account and remove your data from our servers.
        </DialogDescription>
      </DialogHeader>
    </DialogContent>
  </Dialog>
</div>
```

| Prop (on `Dialog`) | Type | Notes |
| --- | --- | --- |
| `open` | `Boolean` | controlled open state |
| `defaultOpen` | `Boolean` | initial state when uncontrolled |
| `onOpenChange` | `Function` | called with the new open boolean |

`DialogContent` also accepts `showCloseButton` (default `true`) to render the shadcn-style top-right close control; pass `false` to hide it. `DialogTrigger`, `DialogContent`, `DialogHeader`, `DialogFooter`, `DialogTitle`, `DialogDescription`, and `DialogClose` each accept `className` and render default slot content; they read open/close behavior from the parent `Dialog` automatically. `DialogContent` is driven by a real `bootstrap.Modal` instance bound to its own root (rendered as `.modal.fade > .modal-dialog > .modal-content`, permanently mounted rather than added/removed from the DOM) — Escape, backdrop click, the built-in close control, and `DialogClose` (both wired via `data-bs-dismiss="modal"`) all close the dialog, and the Tab focus trap plus initial-focus/focus-restore on open/close are the built-in native Modal behavior, same as the static API. See [Nodex UI Component](/examples/blocks.html#/docs/guide/owl-components) for how to load `nodexui` and `dist/nodexui.templates.xml`.

## Static component

```base-ui
<button b-ui="button" b-att-variant="outline" b-att-trigger="#settings-dialog">Open Dialog</button>
<div b-ui="dialog" b-att-trigger="[b-att-trigger='#settings-dialog']" id="settings-dialog">
  <div b-dialog-panel>
    <div class="b-dialog-header" data-slot="dialog-header">
      <h2 b-dialog-title class="b-dialog-title">Edit profile</h2>
      <p b-dialog-description class="b-dialog-description">Make changes to your profile here. Click save when you're done.</p>
    </div>
    <button b-dialog-close class="btn b-button btn-light btn-icon-sm b-dialog-close-control" aria-label="Close">
      <span b-icon="x"></span>
      <span class="visually-hidden">Close</span>
    </button>
    <div class="d-grid gap-3">
      <label class="d-grid gap-1">
        <span>Name</span>
        <input b-ui="input" class="form-control" value="Pedro Duarte" />
      </label>
      <label class="d-grid gap-1">
        <span>Username</span>
        <input b-ui="input" class="form-control" value="@peduarte" />
      </label>
    </div>
    <div b-dialog-footer class="b-dialog-footer">
      <button b-dialog-close b-ui="button" b-att-variant="outline">Cancel</button>
      <button b-ui="button">Save changes</button>
    </div>
  </div>
</div>
```

At mount, Nodex UI restructures this markup into the built-in required shape: the `[b-ui="dialog"]` root becomes the `.modal.fade` element and `[b-dialog-panel]` is wrapped in a new `.modal-dialog` and becomes `.modal-content` — you don't need to author those wrapper levels yourself. The dialog is driven by a real `bootstrap.Modal` instance (`backdrop: true, keyboard: true, focus: true`, all built-in defaults); `[b-dialog-close]` buttons get `data-bs-dismiss="modal"` at mount time instead of a manual click handler.

Events: `nodexui:open`, `nodexui:close` (Nodex UI), plus the underlying `shown.bs.modal`/`hidden.bs.modal`.

Keyboard: Escape closes the dialog (the built-in native `keyboard` option), as does a backdrop click. Focus moves into the panel on open and is trapped there via Tab/Shift+Tab, then returns to the trigger on close — all native `bootstrap.Modal` behavior.
