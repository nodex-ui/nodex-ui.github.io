# Button

Use `b-ui="button"` on a native button or link.

## Nodex UI component

```js
import { Button } from "nodexui";
```

```base-ui
<div class="d-flex flex-column gap-4" style="max-width: 28rem">
  <Button icon="'arrow-up'" label="'Button'"/>

  <div class="d-flex flex-wrap align-items-center gap-2">
    <Button size="'xs'" label="'Extra Small'"/>
    <Button size="'sm'" label="'Small'"/>
    <Button label="'Default'"/>
    <Button size="'lg'" label="'Large'"/>
  </div>

  <div class="d-flex flex-wrap align-items-center gap-2">
    <Button icon="'git-branch'" label="'New Branch'"/>
    <Button icon="'git-fork'" label="'Fork'"/>
  </div>

  <div class="d-flex flex-wrap align-items-center gap-2">
    <Button disabled="true">
      <Spinner className="'me-2'"/>Generating
    </Button>
    <Button disabled="true">
      <Spinner className="'me-2'"/>Downloading
    </Button>
  </div>
</div>
```

| Prop | Type | Default |
| --- | --- | --- |
| `variant` | `"default" \| "outline" \| "ghost" \| "destructive" \| "secondary" \| "link"` | `"default"` |
| `size` | `"default" \| "xs" \| "sm" \| "lg" \| "icon" \| "icon-xs" \| "icon-sm" \| "icon-lg"` | `"default"` |
| `type` | `String` | native `<button type>`; ignored when `href` is set |
| `href` | `String` | when set, renders an `<a href="...">` instead of `<button>` so the component navigates |
| `disabled` | `Boolean` | on the `<a>` form, sets `aria-disabled` and blocks the click instead of a native `disabled` attribute |
| `label` | `String` | button text; alternative to default-slot children |
| `icon` | `String` | Lucide icon name; add `iconPosition="'end'"` or `icon-position="'end'"` to place it after the label |
| `ariaLabel` / `aria-label` | `String` | accessible label, required for icon-only buttons |
| `ariaPressed` / `aria-pressed` | `String \| Boolean` | reflects toggle-button pressed state |
| `ariaInvalid` / `aria-invalid` | `String \| Boolean` | invalid visual state when true |
| `id` | `String` | forwarded to the rendered `<a>`/`<button>` |
| `title` | `String` | forwarded to the rendered `<a>`/`<button>` |
| `className` | `String` | appended to the generated `btn ...` classes |
| `unstyled` | `Boolean` | drops the forced `btn b-button`/variant/size classes so only `className` applies — for reusing Button's behavior under your own CSS |
| `attrs` | `Object` | extra attributes spread onto the rendered `<a>`/`<button>` (`aria-*`, `data-*`, `data-bs-*`, custom directives) that have no first-class prop |
| `getRef` | `Function` | called with the rendered root element after mount, and with `null` on unmount |
| `onClick` | `Function` | called with the native click event |

Also accepts default slot content instead of `label`. Every pure Nodex UI component that renders a clickable control (dialog close, tab triggers, toast action, select trigger, ...) renders it through `Button`, usually with `unstyled`, so those controls share one click/disabled/`href` implementation. See [Nodex UI Component](/index.html#/docs/guide/owl-components) for how to load `nodexui` and `dist/nodexui.templates.xml`.

## Static component

```base-ui
<div class="d-flex align-items-center justify-content-center gap-2" style="min-height: 18rem">
  <button b-ui="button" b-att-variant="outline" type="button">Button</button>
  <button b-ui="button" b-att-variant="outline" b-att-icon="chevron-right" b-att-icon-position="end" type="button">Continue</button>
  <button b-ui="button" b-att-variant="outline" b-att-size="icon" b-att-icon="arrow-up" type="button" aria-label="Arrow up"></button>
</div>
```

Options: `b-att-variant="default|outline|ghost|destructive|secondary|link"`, `b-att-size="default|xs|sm|lg|icon|icon-xs|icon-sm|icon-lg"`.

Accessibility: keep native button semantics and use `disabled` for unavailable actions. For a link-styled-as-button, apply `b-ui="button"` directly to an `<a href="...">` — the adapter only toggles classes, so it works on either tag. Authored `aria-invalid="true"` receives the same shadcn invalid ring/border state.
