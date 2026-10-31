# Block Viewer

`BlockViewer` is the page-root component used by Nodex UI block gallery detail pages (`examples/blocks/*.html`). It reads a title/description from `document.body.dataset`, renders a sample block's markup from a `[b-block-code-template]` script tag into a live preview panel, and offers a preview/code toggle with desktop/tablet/mobile viewport switching and a "copy code" action.

## CDN install requirements

Load the pinned Nodex UI CSS and JavaScript files, plus the block-viewer adapter bundle (it is not part of `nodexui.min.js`, since it pulls in the full component export surface only when a block sample needs it — but it's self-contained, no import map required):

```html
<link rel="stylesheet" href="/dist/nodexui.min.css">
<script type="module" src="/dist/nodexui.block-viewer.esm.js"></script>
<script src="/dist/nodexui.min.js" defer></script>
```

## Nodex UI component

```js
import { BlockViewer } from "nodexui";
```

```base-ui
<BlockViewer/>
```

## Static component

```html
<body data-block-title="sidebar-01" data-block-description="A simple sidebar with navigation grouped by section.">
  <div id="b-block-viewer" b-ui="block-viewer"></div>
  <script type="text/xml" b-block-code-template>
    <templates>
      <t t-name="examples.SidebarBlock">
        <div b-block="sidebar-01"><!-- block markup --></div>
      </t>
    </templates>
  </script>
</body>
```

`thebase.mountAll()` (called automatically on `DOMContentLoaded`) mounts the `b-ui="block-viewer"` element as a full application, using the block's own inline template as its live preview and its serialized text as the "Code" panel.

## Options and attributes

- `data-block-title` / `data-block-description` (on `<body>`) — the header title/description shown above the preview.
- `[b-block-code-template]` — a `<script type="text/xml">` (runtime-mounted preview, source-of-truth for both the live preview and the "Code" panel) or a `<template>` (static markup, cloned directly into the preview frame).
- `?embed=1` query param — renders only the preview frame full-bleed, without the page chrome, for use inside an `<iframe>`.

See `dist/nodexui.registry.json` for the full attribute list.

## Methods

Use the global runtime methods: `thebase.mount()`, `thebase.mountAll()`, and `thebase.destroy()`.
