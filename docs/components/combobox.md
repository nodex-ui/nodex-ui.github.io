# Combobox

Use `b-ui="combobox"` for a CDN-ready combobox component.

## CDN install requirements

Load the pinned Nodex UI CSS and JavaScript files; no extra dependency is required for this component.

## Nodex UI component

```js
import { Combobox } from "nodexui";
```

```base-ui
<div style="max-width: 28rem" class="w-100">
  <Combobox options="[
    { value: 'nextjs', label: 'Next.js' },
    { value: 'sveltekit', label: 'SvelteKit' },
    { value: 'nuxtjs', label: 'Nuxt.js' },
    { value: 'remix', label: 'Remix' },
    { value: 'astro', label: 'Astro' },
  ]" label="'Framework'" placeholder="'Select a framework'"/>
</div>
```

### Help tooltip (`useTip`)

Set `useTip="1"` to move `supportingText` into a tooltip: a question-mark icon appears right after the label, in the same label box, and the text shows on hover or focus. Error text still shows under the field.

```base-ui
<div style="max-width: 28rem" class="w-100 pt-3">
  <Combobox options="[{ value: 'nextjs', label: 'Next.js' }, { value: 'remix', label: 'Remix' }]" label="'Framework'" supportingText="'Pick the one you use most'" useTip="1"/>
</div>
```

| Component | Prop | Type | Notes |
| --- | --- | --- | --- |
| `Combobox` | `options` | `Array` | required |
| `Combobox` | `value` | `String` | optional |
| `Combobox` | `placeholder` | `String` | optional |
| `Combobox` | `className` | `String` | optional |
| `Combobox` | `id` | `String` | optional, e.g. for `Label`'s `for` |
| `Combobox` | `onChange` | `Function` | optional |
| `Combobox` | `label`, `labelBackground`, `supportingText`, `useTip`, `errorText`, `invalid`, `disabled` | `String` / `Boolean` | Material-style outlined field, same behaviour as [Input](/index.html#/docs/components/input): the label floats onto the border, `errorText` replaces `supportingText`. Also inherited from a parent `Field`. |

See [Nodex UI Component](/index.html#/docs/guide/owl-components) for how to load `nodexui` and `dist/nodexui.templates.xml`.

## Static component

```base-ui
<div b-ui="combobox">Combobox</div>
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
