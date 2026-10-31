# Collapsible

Use `b-ui="collapsible"` for a single disclosure region.

## Nodex UI component

```js
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "nodexui";
```

```base-ui
<div style="max-width: 28rem" class="w-100">
  <Collapsible>
    <CollapsibleTrigger>Toggle details</CollapsibleTrigger>
    <CollapsibleContent>
      <div>Status: Shipped</div>
    </CollapsibleContent>
  </Collapsible>
</div>
```

| Component | Prop | Type | Notes |
| --- | --- | --- | --- |
| `Collapsible` | `open` | `Boolean` | optional |
| `Collapsible` | `defaultOpen` | `Boolean` | optional |
| `Collapsible` | `onOpenChange` | `Function` | optional |
| `Collapsible` | `className` | `String` | optional |
| `CollapsibleContent` | `className` | `String` | optional |
| `CollapsibleTrigger` | `className` | `String` | optional |

See [Nodex UI Component](/index.html#/docs/guide/owl-components) for how to load `nodexui` and `dist/nodexui.templates.xml`.

## Static component

```base-ui
<div b-ui="collapsible">
  <button b-collapsible-trigger type="button">Show details</button>
  <div b-collapsible-panel>Hidden content</div>
</div>
```

State is reflected through `b-att-state="open|closed"` and `aria-expanded`. Events: `nodexui:change`.

The panel (`b-collapsible-panel` / `CollapsibleContent`'s root) is driven by a live `bootstrap.Collapse` instance: it always carries the built-in `collapse` class (plus `show` while open), and the library itself manages the `collapsing`/height transition and the `show` class across toggles — don't rely on `hidden`/node removal to detect open state.
