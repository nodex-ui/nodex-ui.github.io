# Runtime API

Nodex UI exposes one browser global: `window.thebase`. `window.NodexUI` still points to the same object as a deprecated alias for 1.x pages; it will be removed in 2.0.0.

```js
thebase.version
thebase.register(name, definition)
thebase.component(name)
thebase.mount(selectorOrElement, options)
thebase.mountAll(rootElement)
thebase.destroy(rootElement)
thebase.theme.set("light")
thebase.theme.set("dark")
thebase.theme.set({ primary: "#0f6cbd" })
thebase.analytics.init({ domain, endpoint })
thebase.track(eventName, options)
thebase.i18n.init({ languages, defaultLanguage })
thebase.i18n.t(text, params)
```

`thebase.analytics` is set only when the optional `dist/nodexui.analytics.min.js` is loaded (it is not in the main bundles), and `thebase.track` is bound once it is initialized — see [Analytics](analytics.md). Likewise `thebase.i18n` is set only when the optional `dist/nodexui.i18n.min.js` is loaded — see [i18n](i18n.md).

The static runtime calls `autoMount()` when imported through `dist/nodexui.esm.js` or `dist/nodexui.min.js`. Existing `[b-ui]` and `[b-icon]` markers are enhanced automatically once the DOM is ready.

`mountAll(rootElement)` scans `[b-ui]` and `[b-icon]` below the given root. Repeated calls are idempotent for already-mounted nodes, so it is safe to call after rendering an AJAX partial or replacing a small subtree. `mount(selectorOrElement, options)` mounts one element and returns its instance metadata when a registered component exists. `destroy(rootElement)` calls component cleanup handlers and dispatches `nodexui:destroyed` before a mounted subtree is removed.

Mounted components dispatch lifecycle events on their root element:

- `nodexui:mounted` with `{ name, instance }` in `event.detail`.
- `nodexui:destroyed` with `{ name }` in `event.detail`.

`thebase.theme.set(...)` is the low-level setter. For persisted light/dark toggles, button-label synchronization, URL `?theme=` overrides, and iframe preview sync, import `createThemeController` from `nodexui` in browser import maps or `nodexui` in npm/bundler apps.

`thebase.mountAll()` is for static `b-ui`/`b-att-*` markers and `b-icon` markers only. It does not register Nodex component tags (`<Button/>`, `<Card/>`, ...) and does not know about `nodexui` or `dist/nodexui.templates.xml`. To use Nodex UI components, extend `Component` from `nodexui`, fetch the templates XML, and pass it to `mount()`. Registered Nodex UI components then resolve in every template, whether or not they are listed in `static components`; see [Nodex UI Component](owl-components.md#global-component-fallback).

## `cn()` class-name helper

`cn(...classNames)` joins strings, arrays, and falsy values into one space-separated class string, flattening nested arrays and skipping anything falsy:

```js
import { cn } from "nodexui";

cn("btn", isActive && "active", ["b-button", className]);
// "btn active b-button my-class" (when isActive is truthy and className is "my-class")
```

It's a standalone named export — `import { cn } from "nodexui"` in npm/bundler apps, or `NodexUIBundle.cn` in the browser IIFE global — not a method on `NodexUI` itself. Use it to build your own components' class lists on top of Nodex UI's conventions.

## `mergeStyle()` inline-style helper

`mergeStyle(...styles)` combines a component's own computed inline style with a caller-supplied `style` (string or object) into one `;`-joined declaration string, dropping empty/nullish entries. Object keys may be camelCase (converted to kebab-case); later entries win on conflicting properties since they're appended last:

```js
import { mergeStyle } from "nodexui";

mergeStyle("--b-progress-value:50%", { color: "red" }, "opacity:0.5;");
// "--b-progress-value:50%;color:red;opacity:0.5"
```

It's a standalone named export — `import { mergeStyle } from "nodexui"` in npm/bundler apps, or `NodexUIBundle.mergeStyle` in the browser IIFE global. Unlike `cn()`, which joins class names with a space, `mergeStyle()` joins CSS declarations with `;` — the two are not interchangeable.
