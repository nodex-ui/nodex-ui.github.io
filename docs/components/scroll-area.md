# Scroll Area

Use `b-ui="scroll-area"` for a CDN-ready scroll area component.

## CDN install requirements

Load the pinned Nodex UI CSS and JavaScript files; no extra dependency is required for this component.

## Nodex UI component

```js
import { ScrollArea } from "nodexui";
```

```base-ui
<div style="max-width: 28rem">
  <div style="height: 18rem; width: 12rem;">
  <ScrollArea className="'rounded border h-100 w-100'">
    <div class="p-3">
      <Typography variant="'p'" className="'mb-3 small fw-medium'">Tags</Typography>
      <t t-foreach="[
        'v1.2.0-beta.50','v1.2.0-beta.49','v1.2.0-beta.48','v1.2.0-beta.47','v1.2.0-beta.46',
        'v1.2.0-beta.45','v1.2.0-beta.44','v1.2.0-beta.43','v1.2.0-beta.42','v1.2.0-beta.41',
        'v1.2.0-beta.40','v1.2.0-beta.39','v1.2.0-beta.38','v1.2.0-beta.37','v1.2.0-beta.36',
        'v1.2.0-beta.35','v1.2.0-beta.34','v1.2.0-beta.33','v1.2.0-beta.32','v1.2.0-beta.31',
        'v1.2.0-beta.30','v1.2.0-beta.29','v1.2.0-beta.28','v1.2.0-beta.27','v1.2.0-beta.26',
        'v1.2.0-beta.25','v1.2.0-beta.24','v1.2.0-beta.23','v1.2.0-beta.22','v1.2.0-beta.21',
        'v1.2.0-beta.20','v1.2.0-beta.19','v1.2.0-beta.18','v1.2.0-beta.17','v1.2.0-beta.16',
        'v1.2.0-beta.15','v1.2.0-beta.14','v1.2.0-beta.13','v1.2.0-beta.12','v1.2.0-beta.11',
        'v1.2.0-beta.10','v1.2.0-beta.9','v1.2.0-beta.8','v1.2.0-beta.7','v1.2.0-beta.6',
        'v1.2.0-beta.5','v1.2.0-beta.4','v1.2.0-beta.3','v1.2.0-beta.2','v1.2.0-beta.1'
      ]" t-as="tag" t-key="tag">
        <div class="small" t-esc="tag"/>
        <Separator className="'my-2'"/>
      </t>
    </div>
  </ScrollArea>
  </div>
</div>
```

| Component | Prop | Type | Notes |
| --- | --- | --- | --- |
| `ScrollArea` | `className` | `String` | optional |

See [Nodex UI Component](/index.html#/docs/guide/owl-components) for how to load `nodexui` and `dist/nodexui.templates.xml`.

## Static component

```base-ui
<div b-ui="scroll-area">Scroll Area</div>
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

The component inherits Nodex UI semantic tokens such as `--b-surface`, `--b-border`, `--b-primary`, and `--b-radius`.

## Accessibility behavior

The component preserves authored semantic HTML and adds ARIA roles or state attributes where enhancement is required.

## Examples

See `examples/index.html` for a working CDN-style page.

## Browser support

Nodex UI targets modern evergreen browsers that support ES modules, CSS variables.

## Test checklist

Verify light and dark themes, keyboard access for focusable controls, disabled or readonly states when applicable, and cleanup through `thebase.destroy()`.
