# Separator

Visual divider with separator semantics.

## Nodex UI component

```js
import { Separator } from "nodexui";
```

```base-ui
<div style="max-width: 28rem" class="w-100">
  <div class="mb-1">
    <Typography as="'h4'" variant="'small'" className="'fw-medium mb-0'">Radix Primitives</Typography>
    <Typography as="'p'" variant="'small'" className="'text-muted-foreground mb-0'">An open-source UI component library.</Typography>
  </div>
  <Separator className="'my-4'"/>
  <div class="d-flex align-items-center gap-3 small" style="height: 1.25rem">
    <div>Blog</div>
    <Separator orientation="'vertical'"/>
    <div>Docs</div>
    <Separator orientation="'vertical'"/>
    <div>Source</div>
  </div>
</div>
```

| Component | Prop | Type | Notes |
| --- | --- | --- | --- |
| `Separator` | `orientation` | `String` | optional |
| `Separator` | `className` | `String` | optional |

See [Nodex UI Component](/examples/blocks.html#/docs/guide/owl-components) for how to load `nodexui` and `dist/nodexui.templates.xml`.

## Static component

```base-ui
<div b-ui="separator"></div>
<div b-ui="separator" b-att-orientation="vertical"></div>
```

Options: `b-att-orientation="horizontal|vertical"`.

Accessibility: decorative separators can use `aria-hidden="true"`; structural separators keep `role="separator"`.
