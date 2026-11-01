# Markdown

Use `b-ui="markdown"` (or the pure Nodex UI `Markdown` component) to render Markdown or mount an editable Markdown document. Read-only parsing uses the vendored `src/runtime/marked/marked.min.js` (marked v15). Fenced ` ```mermaid ` code blocks render as inline SVG via `src/runtime/mermaid/mermaid.esm.min.js`. Fenced ` ```base-ui ` code blocks render as a live Nodex UI preview through the page's global static runtime (`window.thebase`, e.g. `dist/nodexui.min.js`).

Editable mode lazy-loads `dist/runtime/milkdown/milkdown-editor.js`, which bundles Milkdown, Yjs, and y-webrtc only when `b-att-editable="true"` / `editable="true"` is used. The editor runtime enables CommonMark, GFM, history, clipboard, cursor, listener, indent, upload, block handle, tooltip, slash, streaming, and diff plugins. Collaborative mode uses Milkdown's Yjs-aware collab undo/redo instead of the plain history stack.

## CDN install requirements

Load the pinned Nodex UI CSS and JavaScript files. No extra `<script>` tag, npm install, or CDN reference is required for Markdown parsing, mermaid diagrams, or the Milkdown editor runtime — each lazy asset is emitted under `dist/runtime/` and fetched only when needed. Live ` ```base-ui ` previews reuse the same static runtime the rest of the page already loads (`dist/nodexui.min.js`) — if that script isn't on the page, the block renders an inline error instead of a live preview.

## Nodex UI component

```js
import { Markdown } from "nodexui";
```

```base-ui
<div class="d-flex flex-column gap-4">
  <Markdown src="'/docs/installation.md'"/>
  <Markdown content="state.source" mermaid="false" nodexUi="false"/>
  <Markdown
    content="state.source"
    editable="true"
    collaborative="true"
    room="'docs/installation'"
    onChange="(markdown) => this.onMarkdownChange(markdown)"
  />
</div>
```

## Static component

```base-ui
<div b-ui="markdown" >
  <script type="text/markdown">
# Getting started

Some **bold** text and a [link](https://example.com).
  </script>
</div>
```
Edit sample 
```base-ui
<div b-ui="markdown" b-att-editable="true">
  <script type="text/markdown">
# Getting started

Some **bold** text and a [link](https://example.com).
  </script>
</div>
```

Or point it at a remote `.md` file instead of inlining the source:

```html
<div b-ui="markdown" b-att-src="/docs/installation.md"></div>
```

Enable local WYSIWYG Markdown editing:

```html
<div b-ui="markdown" b-att-editable="true">
  <script type="text/markdown">
# Draft

Edit **Markdown** here.
  </script>
</div>
```

Enable peer-to-peer collaborative editing with Yjs + y-webrtc:

```html
<div
  b-ui="markdown"
  b-att-editable="true"
  b-att-collaborative="true"
  b-att-room="docs/installation"
></div>
```

Use `b-att-password` for y-webrtc room encryption and `b-att-signaling="wss://example.com,ws://localhost:4444"` to override signaling servers.

A fenced ` ```base-ui ` block renders as a live component, not a code sample:

````html
<div b-ui="markdown">
  <script type="text/markdown">
```base-ui
<div b-ui="badge">New</div>
```
  </script>
</div>
````

## Options and attributes

- `b-att-src` / `src` — fetch a remote Markdown file instead of using inline content.
- `b-att-content` / `content` — a static `<script type="text/markdown">` child (or a `<template>`), `b-att-content`, or the element's own text content supplies the Markdown source when no `src` is set.
- `b-att-mermaid` / `mermaid` — set to `"false"` to skip mermaid diagram rendering (defaults to enabled).  Diagrams use mermaid's dark theme when the nearest `data-bs-theme` (else the system preference) is dark.
- `b-att-base-ui` / `nodexUi` — set to `"false"` to skip live-mounting fenced ` ```base-ui ` blocks; they render as plain code instead (defaults to enabled).
- `b-att-editable` / `editable` — set to `"true"` to mount Milkdown instead of read-only rendered HTML.
- `b-att-collaborative` / `collaborative` — set to `"true"` to connect the editor through Yjs + y-webrtc.
- `b-att-room` / `room` — y-webrtc room name for collaborative sessions (defaults to `b-markdown`).
- `b-att-password` / `password` — optional y-webrtc room password.
- `b-att-signaling` / `signaling` — comma-separated signaling URLs for the static API, or an array prop for Nodex.

See `dist/nodexui.registry.json` for the full attribute list.

Task-list checkboxes (`- [ ] item`) get an `aria-label` with the item text after rendering. On coarse pointers (touch), links in tables and lists and checkboxes get larger touch targets. Tables scroll horizontally inside their own container.

## Events

- `nodexui:markdown-render` — fired after Markdown parses and diagrams finish enhancing (`detail.html`).
- `nodexui:markdown-error` — fired when fetching or parsing fails (`detail.error`).
- `nodexui:markdown-editor-ready` — fired after Milkdown mounts (`detail.collaborative`, `detail.room`).
- `nodexui:markdown-change` — fired whenever Milkdown emits a Markdown update (`detail.markdown`, `detail.previousMarkdown`).
- `nodexui:markdown-copy` — fired on a fenced ` ```base-ui ` block's copy button after its source is written to the clipboard (`detail.source`). A transient `b-ui="toast"` also shows "Copied to clipboard" automatically if the global static runtime is loaded.
- `nodexui:markdown-copy-error` — fired instead of `nodexui:markdown-copy` if the clipboard write fails (`detail.error`).

## Methods

Use the global runtime methods: `thebase.mount()`, `thebase.mountAll()`, and `thebase.destroy()`.
