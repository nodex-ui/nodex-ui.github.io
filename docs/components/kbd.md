# Kbd

## Nodex UI component

```js
import { Kbd } from "nodexui";
```

```base-ui
<div style="max-width: 28rem" class="d-flex flex-column align-items-center gap-4 w-100">
  <div class="d-flex align-items-center gap-1">
    <Kbd>⌘</Kbd>
    <Kbd>⇧</Kbd>
    <Kbd>⌥</Kbd>
    <Kbd>⌃</Kbd>
  </div>
  <p class="text-body-secondary small text-center mb-0">
    Use <Kbd>⌘</Kbd><Kbd>V</Kbd> to paste text.
  </p>
  <Button variant="'outline'">
    <t t-set-slot="default">
      Accept <Kbd className="'ms-2'">⏎ Enter</Kbd>
    </t>
  </Button>
  <Input label="'Search'" className="'w-100'">
    <t t-set-slot="end"><Kbd>⌘K</Kbd></t>
  </Input>
</div>
```

| Component | Prop | Type | Notes |
| --- | --- | --- | --- |
| `Kbd` | `className` | `String` | optional |

See [Nodex UI Component](/examples/blocks.html#/docs/guide/owl-components) for how to load `nodexui` and `dist/nodexui.templates.xml`.

## Static component

```base-ui
<kbd b-ui="kbd">Ctrl K</kbd>
```
