---
description: Introduction to Nodex UI, how to use it, and where to find the Bootstrap 5 and Owl framework references.
sidebar_position: 1
---

# Nodex UI — Instruction

Nodex UI (`nodexui`) is a component library built on two foundations: the **[Owl](https://github.com/odoo/owl) framework** (reactive components and templates) and **[Bootstrap 5](https://getbootstrap.com/docs/5.3/)** (grid, utilities, JS behaviors), restyled with shadcn-aligned `--b-*` design tokens, light/dark themes and the full Lucide icon set. It needs no build step: one stylesheet and one script from a CDN.

| Foundation | What it gives you | Where to read |
| --- | --- | --- |
| Owl | `Component`, `useState`, hooks, QWeb templates, `mount` | [Owl overview](readme.md) and the sections below |
| Bootstrap 5 | Grid, spacing/flex utilities, Offcanvas/Modal/Tooltip JS | [Bootstrap 5 index](#bootstrap-5-reference-index) |
| Nodex UI | 70+ components, blocks, icons, charts, theming | [Docs index](../index.md) |

## Two APIs, one source

1. **Static markup**: add `b-ui="button"`, `b-icon="check"` and `b-att-*` attributes to plain HTML. Best for static pages and server-rendered output.
2. **Pure Nodex UI (Owl) components**: `<Button/>`, `<Card/>`, `<Icon/>` inside Owl templates. Best for SPAs, PWAs and stateful screens.

Both share the same component source, so styling and accessibility match.

## Quick start

```html
<link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/nodexui/dist/nodexui.min.css">
<script src="https://cdn.jsdelivr.net/npm/nodexui/dist/nodexui.min.js"></script>

<button b-ui="button">Save</button>
<span b-icon="check"></span>
```

Pin a version (`nodexui@1.3.3`) in production. Set the theme on `<html data-theme="dark">` or on any subtree.

### Pure component example

```js
import { Component, mount, useState, xml } from "nodexui";
import { Button } from "nodexui";

class Counter extends Component {
  static components = { Button };
  static template = xml`
    <Button t-on-click="() => state.n++">Clicked <t t-esc="state.n"/> times</Button>`;
  setup() { this.state = useState({ n: 0 }); }
}
mount(Counter, document.body);
```

## How to use it, step by step

1. Choose an API (static markup or Owl components): [Usage Guide](../usage-guide.md).
2. Install and load assets: [Installation](../installation.md).
3. Pick components: [Docs index](../index.md), [Blocks](../blocks.md), [Icons](../icons.md).
4. Theme it with tokens: [Theming](../theming.md).
5. Build your own components: [Component Authoring](../component-authoring.md), [Nodex UI Component](../owl-components.md).
6. Look up exports and globals: [Runtime API](../runtime-api.md), [Registry](../registry.md).

## Owl framework reference index

Start with [Quick Start](learning/quick_start.md), then:

- Learning: [How to test](learning/how_to_test.md), [Todo app tutorial](learning/tutorial_todoapp.md)
- Core: [App](reference/app.md), [Component](reference/component.md), [Props](reference/props.md), [Slots](reference/slots.md), [Refs](reference/refs.md), [Portal](reference/portal.md)
- Reactivity and hooks: [Reactivity](reference/reactivity.md), [Hooks](reference/hooks.md)
- Templates and events: [Templates](reference/templates.md), [Event handling](reference/event_handling.md), [Input bindings](reference/input_bindings.md), [Translations](reference/translations.md), [Precompiling templates](reference/precompiling_templates.md)
- Runtime: [Environment](reference/environment.md), [Error handling](reference/error_handling.md), [Concurrency model](reference/concurrency_model.md), [Utils](reference/utils.md)
- Background: [Why Owl](miscellaneous/why_owl.md), [Architecture](miscellaneous/architecture.md), [Comparison](miscellaneous/comparison.md), [Compiled template](miscellaneous/compiled_template.md)
- Tools: [Devtools](tools/devtools.md), [Devtools guide](tools/devtools_guide.md)

## Bootstrap 5 reference index

Bootstrap is not vendored in this repo; use the official docs (v5.3):

- Layout: [Grid](https://getbootstrap.com/docs/5.3/layout/grid/), [Containers](https://getbootstrap.com/docs/5.3/layout/containers/), [Breakpoints](https://getbootstrap.com/docs/5.3/layout/breakpoints/)
- Utilities: [Spacing](https://getbootstrap.com/docs/5.3/utilities/spacing/), [Flex](https://getbootstrap.com/docs/5.3/utilities/flex/), [Display](https://getbootstrap.com/docs/5.3/utilities/display/)
- JS behaviors used by Nodex UI: [Offcanvas](https://getbootstrap.com/docs/5.3/components/offcanvas/), [Modal](https://getbootstrap.com/docs/5.3/components/modal/), [Tooltip](https://getbootstrap.com/docs/5.3/components/tooltips/), [Collapse](https://getbootstrap.com/docs/5.3/components/collapse/)
- Customizing: [CSS variables](https://getbootstrap.com/docs/5.3/customize/css-variables/), [Color modes](https://getbootstrap.com/docs/5.3/customize/color-modes/)

## Tips

- Prefer Nodex UI components over raw Bootstrap classes; use Bootstrap grid and utilities for layout only.
- Owl templates are QWeb: use `t-on-click`, `t-if`, `t-foreach`, and reactive state from `useState`.
- AI agents: fetch [../index.md](../index.md) first, then only the pages needed.
