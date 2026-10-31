# Component Authoring

Nodex UI exposes two intentional public APIs from the same component source folder. Both must share styling, accessibility semantics, and — where practical — behavior helpers; they must not drift into two different component libraries.

1. **Static/enhancement API** (`b-ui`) — for CDN, server-rendered HTML, docs examples, and Base HUB website pages.
2. **Pure Nodex UI API** — for applications that want imports, `static components`, props, slots, and template composition.

## Source contract

All current registry components have adopted the pure Nodex UI API. Each component source folder follows this contract:

```text
src/components/<name>/
  <name>.component.js     # Nodex UI component class(es), exported
  <name>.js                # static b-ui adapter: NodexUI.register(...)
  <name>.xml                # Nodex templates: "nodexui.<Name>" plus a short alias
  <name>.css                 # shared styles for both APIs
  <name>.behavior.js         # optional: framework-agnostic logic shared by both APIs
```

There are no current static-only registry components. If a future component is temporarily static-only, its `.xml` remains a reference file until a sibling `<name>.component.js` opts it into `dist/nodexui.templates.xml`.

## Static adapter mode

Static components register with `NodexUI.register(name, { type: "static", mount })`. runtime-enhanced *static* components (e.g. `tabs`, `dialog` — Nodex runs internally to enhance authored HTML, not to expose a public component class) register with `type: "owl"` and return cleanup handles from `mount()`.

Components must emit DOM `CustomEvent` events with the `nodexui:` prefix and must clean listeners or applications during `thebase.destroy()`.

## Pure Nodex UI mode

```js
import { Component } from "nodexui";
import { optional, slotProps } from "../prop-aliases.js";

export class Button extends Component {
  static template = "nodexui.Button";
  static props = {
    variant: optional(String),
    size: optional(String),
    disabled: optional(Boolean),
    ...slotProps,
  };
}
```

Required static class fields:

- `static template` — the namespaced template name, e.g. `"nodexui.Button"` (see Naming below).
- `static props` — every accepted prop declared explicitly. Use `optional(Type)` from `src/components/prop-aliases.js` for optional props (it expands to `{ type: Type, optional: true }`). Spread `...slotProps` for the shared `className`/`style`/`slots` trio instead of redeclaring it or defining a local copy per file.

Export the class from `<name>.component.js` and re-export it from `src/components/index.js` so it ships from `dist/nodexui.esm.js`/`nodexui.min.js` (`nodexui`, or `nodexui`/`nodexui` in a browser import map — both point at the same file now, see `docs/installation.md`).

### Naming

- Public Nodex class names: PascalCase (`Button`, `Card`, `Tabs`).
- Template names: namespaced, `nodexui.Button`, `nodexui.Card`. `<name>.xml` also registers a short, un-namespaced alias (`Button`, `Card`) via `t-call` for local convenience; components' own `static template` always points at the namespaced name.
- Static public slugs stay kebab-case: `button`, `button-group`.
- Public DOM attributes stay short `b-*`: `b-ui`, `b-att-*`.

### Props, events, slots

- Nodex props use camelCase (`className`, `onChange`); static attributes use `b-att-*` (`b-att-variant`). Document both when both APIs exist for a component.
- Any Nodex component with its own root DOM element should also declare `style: { type: [String, Object], optional: true }` next to `className`, bound as `t-att-style="props.style"` on the root (every conditional root branch needs its own binding). Skip both `className` and `style` for components that only render a default slot with no wrapping element (`AlertDialog`, `Pwa`, `Sheet`, `ContextMenu`, `Drawer`). If a component already computes its own inline style, use `mergeStyle(...)` from `src/components/prop-aliases.js` so a caller-supplied `style` merges instead of getting clobbered. The static `b-ui` adapters need no equivalent change — a plain `style="..."` HTML attribute already works on static markup.
- Nodex UI components receive callback props (`onClick`, `onChange`, `onOpenChange`); the static API instead emits `nodexui:*` DOM `CustomEvent`s. Share behavior through a `<name>.behavior.js` helper when both APIs need the same logic (class-name maps, keyboard-navigation math, focus-trap helpers) — keep that file free of any Nodex import so requiring it from the static adapter never pulls Nodex component code into the default static bundle.
- Use the default slot for child content; use named slots only for compound structures (`CardHeader`, `DialogFooter`, `TabsList`).

### Shared helpers

Reuse these instead of hand-rolling the same logic in each component:

| Helper | File | Use for |
| --- | --- | --- |
| `optional(Type)`, `slotProps` | `src/components/prop-aliases.js` | Prop declarations (see above). |
| `useControlledOpen(state, control?)` | `src/components/open-state.js` | Keeping `state.open` in sync with a parent-controlled `open`/`state` prop. Overlay components backed by the built-in layer also pass their `control` so the live Modal/Offcanvas instance shows or hides. |
| `requestOpen(props, state, open)` | `src/components/open-state.js` | Every open/close request: updates local state only when uncontrolled, and always calls `onOpenChange`. |
| `useBootstrapCollapse(ref, isOpen)` | `src/components/open-state.js` | Animating a disclosure panel with the built-in `Collapse` (Collapsible, Accordion). |
| `bindBootstrapOverlay(element, instance, kind, apiName)` | `src/runtime/base/modal.js` | Static overlay adapters built on the built-in Modal/Offcanvas (dialog, sheet, drawer). It wires `b-att-trigger`, `b-att-state`, `nodexui:open`/`nodexui:close`, focus restore, and the `element[apiName]` `{ open, close }` handle. |
| `mountCheckInput(element, inputType)` | `src/components/checkbox/checkbox.behavior.js` | Static checkbox/radio enhancement (`form-check` classes, native checked behavior). |

`open-state.js` imports Nodex, so only Nodex UI components may use it. Static adapters must not import it (see the `<name>.behavior.js` rule above).

### Accessibility

Nodex UI components must emit the same roles, ARIA state, keyboard behavior, and focus management as their static adapter counterpart. When setting a boolean-valued ARIA attribute via `t-att-*` (e.g. `aria-selected`), write it as an explicit `'true'`/`'false'` string — Nodex renders a bare `true` value as an empty attribute (HTML boolean-attribute convention), which is wrong for ARIA state attributes.

### Nodex imports

All Nodex UI components, static Nodex controllers, tests, and examples import Nodex APIs from `nodexui`, never `@odoo/owl` directly. `@odoo/owl` imports are only allowed inside the `nodexui` facade implementation itself (`src/owl/index.js`).

`.xml` files are real build inputs for components that have opted into the pure Nodex UI API (their `<name>.component.js` exists) — they get concatenated into `dist/nodexui.templates.xml` by `scripts/build.mjs`. A consumer must load that file (or the equivalent dev-mode template string) before mounting a Nodex root that uses Nodex UI component tags; `.xml` files are not automatically available just by importing a component class.

## Shared rules

Components with a built-in JS equivalent (modal, dropdown, collapse, tab, toast, carousel, tooltip, popover, alert) instantiate the real `bootstrap.*` class off `globalThis.bootstrap` (set by `dist/bootstrap.bundle.min.js`, which must load before any Nodex UI script) instead of reimplementing that behavior — wrap the instantiate/dispose lifecycle in the shared `<name>.behavior.js`/`runtime/*.js` helper so both the static adapter and the Nodex UI component share it identically. `data-bs-toggle`/`data-bs-target`/`data-bs-dismiss` are now real, supported markup. Components with no built-in JS equivalent (context-menu, hover-card, navigation-menu, and any future one-off) keep Nodex UI's own hand-written behavior.

Component CSS must be scoped to `b-ui`, `b-*` helper attributes, `b-*` class selectors, or `:root`. New runtime dependencies are blocked unless the release policy is updated first.

The npm/CDN distribution is bundle-only: component source folders are authoring inputs, not per-component package entry points. Public consumers should load `dist/nodexui.min.css` plus `dist/nodexui.esm.js`/`nodexui.min.js` — the one file for both the static API and the pure Nodex UI API (the bundled JS, the Nodex runtime, every Nodex UI component class, and the theme helper are all embedded inside it). The pure Nodex UI API additionally needs `dist/nodexui.templates.xml` loaded and passed to `mount()`. Use `dist/nodexui.registry.json` for component attribute, event, `owlComponents`, and `templateName` metadata.
