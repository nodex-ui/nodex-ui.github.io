# Alert Dialog

## Nodex UI component

```js
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogMedia, AlertDialogTitle, AlertDialogTrigger, Icon } from "nodexui";
```

```base-ui
<div style="max-width: 28rem" class="w-100">
  <AlertDialog>
    <AlertDialogTrigger>Show Dialog</AlertDialogTrigger>
    <AlertDialogContent>
      <AlertDialogHeader>
        <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
        <AlertDialogDescription>This action cannot be undone. This will permanently delete your account from our servers.</AlertDialogDescription>
      </AlertDialogHeader>
      <AlertDialogFooter>
        <AlertDialogCancel>Cancel</AlertDialogCancel>
        <AlertDialogAction>Continue</AlertDialogAction>
      </AlertDialogFooter>
    </AlertDialogContent>
  </AlertDialog>
</div>
```

| Component | Prop | Type | Notes |
| --- | --- | --- | --- |
| `AlertDialog` | `open` | `Boolean` | optional |
| `AlertDialog` | `defaultOpen` | `Boolean` | optional |
| `AlertDialog` | `onOpenChange` | `Function` | optional |
| `AlertDialogAction` | `className` | `String` | optional |
| `AlertDialogAction` | `onClick` | `Function` | optional |
| `AlertDialogCancel` | `className` | `String` | optional |
| `AlertDialogContent` | `className` | `String` | optional |
| `AlertDialogContent` | `size` | `String` | optional, `"default"` (default) or `"sm"` — controls the panel's max-width |
| `AlertDialogDescription` | `className` | `String` | optional |
| `AlertDialogFooter` | `className` | `String` | optional |
| `AlertDialogHeader` | `className` | `String` | optional |
| `AlertDialogMedia` | `className` | `String` | optional — icon/media slot rendered above the title |
| `AlertDialogTitle` | `className` | `String` | optional |
| `AlertDialogTrigger` | `className` | `String` | optional |

See [Nodex UI Component](/examples/blocks.html#/docs/guide/owl-components) for how to load `nodexui` and `dist/nodexui.templates.xml`.

## Static component

```base-ui
<button b-ui="button" b-att-trigger="#delete-dialog" type="button">Delete</button>
<div b-ui="alert-dialog" b-att-trigger="[b-att-trigger='#delete-dialog']" id="delete-dialog">
  <div b-alert-dialog-panel>
    <h2 b-alert-dialog-title>Are you absolutely sure?</h2>
    <p b-alert-dialog-description>This action cannot be undone.</p>
    <div b-alert-dialog-footer>
      <button b-ui="button" b-att-variant="outline" b-alert-dialog-cancel type="button">Cancel</button>
      <button b-ui="button" b-att-variant="destructive" b-alert-dialog-action type="button">Continue</button>
    </div>
  </div>
</div>
```
