# Text Editor

Use `b-ui="text-editor"` (or the pure Nodex UI `TextEditor` component) for WYSIWYG rich-text editing backed by [Milkdown](https://milkdown.dev/) (ProseMirror + a Markdown-aware schema, via `@milkdown/kit`). The editor runtime is lazy-loaded from `dist/runtime/milkdown/milkdown-text-editor.js`, so the default Nodex UI bundle stays small until an editor is actually mounted. `content`/`onChange` still deal in HTML — Milkdown's document is converted to/from HTML at the boundary, so nothing in this contract changes even though the engine now understands Markdown natively (e.g. typing a leading `#`, `**bold**`, or `1.` auto-formats as you type).

Collaborative mode (`collaborative` / `b-att-collaborative`) is optional and off by default; toggle it per editor without changing anything else. It runs on Yjs + `@milkdown/plugin-collab` over one of two providers, picked with `provider` / `b-att-provider`:

- `"webrtc"` (default) — peer-to-peer via [y-webrtc](https://github.com/yjs/y-webrtc). Use `room` / `b-att-room` to put editors in the same document, `password` / `b-att-password` for room encryption, and `signaling` / `b-att-signaling` to override signaling servers.
- `"websocket"` — connects to an external [y-websocket](https://github.com/yjs/y-websocket)-compatible backend at `url` / `b-att-url` (e.g. `wss://your-backend.example.com/mkdn`), joining `room` / `b-att-room` as the document name on that server. Bring your own backend — any server speaking the y-websocket sync protocol works, including [`y-websocket-server`](https://github.com/yjs/y-websocket-server) or a hosted equivalent.

Collaboration actually turns on when `collaborative` is explicitly truthy, **or** when both `provider` and `url` are supplied — so pointing an editor at a websocket backend (`provider="'websocket'"` + a `url`) is enough on its own, without also setting `collaborative="true"`. If `collaborative` is `false`/unset and `provider`+`url` aren't both present, the editor stays single-user.

## Nodex UI Component

```js
import { TextEditor } from "nodexui";
```

```base-ui
<div class="d-flex flex-column gap-4">
  <TextEditor
    content="state.html"
    placeholder="'Write something...'"
    onChange="(html) => this.onContentChange(html)"
  />

  <TextEditor
    content="state.html"
    collaborative="true"
    room="'docs/rich-text'"
    user="{ name: 'Jean', color: '#2563eb' }"
    onChange="(html) => this.onContentChange(html)"
  />

  <TextEditor
    content="state.html"
    collaborative="true"
    provider="'websocket'"
    url="'wss://your-backend.example.com/mkdn'"
    room="'docs/rich-text'"
    user="{ name: 'Jean', color: '#2563eb' }"
    onChange="(html) => this.onContentChange(html)"
  />
</div>
```

## Static Component

```html
<div b-ui="text-editor" b-att-placeholder="Write something...">
  <template><h1>Draft</h1><p>Edit <strong>rich text</strong> here.</p></template>
</div>
```

Enable peer-to-peer collaborative editing with Yjs + y-webrtc:

```html
<div
  b-ui="text-editor"
  b-att-collaborative="true"
  b-att-room="docs/rich-text"
  b-att-placeholder="Collaborate here..."
>
  <template><p>Shared draft.</p></template>
</div>
```

Or the same session hosted on an external websocket backend instead of peer-to-peer:

```html
<div
  b-ui="text-editor"
  b-att-collaborative="true"
  b-att-provider="websocket"
  b-att-url="wss://your-backend.example.com/mkdn"
  b-att-room="docs/rich-text"
  b-att-placeholder="Collaborate here..."
>
  <template><p>Shared draft.</p></template>
</div>
```

## Options And Attributes

- `b-att-src` / `src` — fetch initial HTML from a remote file.
- `b-att-content` / `content` — initial HTML content. Static markup can also use a `<template>` or `<script type="text/html">` child.
- `b-att-placeholder` / `placeholder` — empty-editor hint text.
- `b-att-collaborative` / `collaborative` — set to `"true"` to connect through Yjs; off by default.
- `b-att-provider` / `provider` — collaboration transport: `"webrtc"` (default, peer-to-peer) or `"websocket"` (connects to an external y-websocket-compatible backend).
- `b-att-room` / `room` — document/room name for collaborative sessions (defaults to `b-text-editor`); shared across peers for y-webrtc, or used as the document name on the y-websocket backend.
- `b-att-url` / `url` — y-websocket server URL (e.g. `wss://your-backend.example.com/mkdn`), required when `provider` is `"websocket"`. Ignored for `"webrtc"`.
- `b-att-password` / `password` — optional y-webrtc room password. Ignored for `"websocket"`.
- `b-att-signaling` / `signaling` — comma-separated signaling URLs for the static API, or an array prop for Nodex. y-webrtc only.

## Events

- `nodexui:text-editor-ready` — fired after the Milkdown editor mounts (`detail.collaborative`, `detail.room`).
- `nodexui:text-editor-change` — fired whenever the rich-text document emits a new HTML string (`detail.html`, `detail.previousHtml`).
- `nodexui:text-editor-error` — fired when fetching or editor mounting fails (`detail.error`).

## Methods

Use the global runtime methods: `thebase.mount()`, `thebase.mountAll()`, and `thebase.destroy()`.

## Milkdown plugins included

Every editor instance registers the full set of official Milkdown plugins (`src/runtime/milkdown/milkdown-text-editor.js`), on top of the `preset-commonmark`/`preset-gfm` schema:

- `plugin-clipboard`, `plugin-cursor` (gap/drop cursor), `plugin-trailing` (always-present trailing paragraph), `plugin-listener` — editing-quality-of-life, no visible UI of their own.
- `plugin-history` (single-user undo/redo) or `plugin-collab` (Yjs-backed collaborative undo/redo, see below) — whichever applies to the current mode.
- `plugin-upload` — drag-and-drop or paste an image file and it's inserted inline as a base64 `data:` URL. No server/uploader configuration needed.
- `plugin-prism` — syntax highlighting for fenced code blocks (`refractor`, self-contained — JS/TS, Python, Go, Rust, SQL, YAML, JSON, Bash, and more out of the box).
- `@milkdown/plugin-emoji` — type `:smile:` and it's replaced with an inline Twemoji image (fetched from `cdn.jsdelivr.net` — requires network access for the glyph images).
- `plugin-tooltip` — a small floating hint appears on text selection (minimal placeholder today, matching the same level of integration already used by the `Markdown` component).
- `plugin-slash` — type `/` at the start of a line to open a filterable command menu (Paragraph, Heading 1/2, Quote, Bullet/Numbered list). Keep typing to filter, navigate with ArrowUp/ArrowDown, and pick with Enter/Tab/click; Escape dismisses it.
- `plugin-block` — hover a block to reveal a `::` drag handle at its left edge.
- `plugin-diff` / `plugin-streaming` — headless: no built-in UI, exposed on the mounted handle as `handle.diff` / `handle.streaming` (see below) for a host app to build review/AI-streaming UX on top of.

`@milkdown/plugin-indent` is intentionally **not** included — its Tab shortcut for inserting literal indentation conflicts with `preset-commonmark`'s own Tab/Shift-Tab list sink/lift keymap.

## Programmatic diff review and streaming

The object returned by `mountTextEditorRuntime()` (and stored as `editorHandle` in `text-editor.component.js`/`text-editor.js`) exposes two extra namespaces beyond `focus()`/`getHTML()`/`setHTML()`/`destroy()`:

```js
// Stage a suggested revision (e.g. from an LLM) and let the user accept/reject it.
await editorHandle.diff.startFromHTML("<p>Revised paragraph.</p>");
const pending = editorHandle.diff.getPendingChanges(); // render your own accept/reject UI from this
editorHandle.diff.acceptChunk(0);   // or .rejectChunk(0), .acceptAll(), .clear()

// Type streamed tokens into the doc live (e.g. as an LLM response arrives).
editorHandle.streaming.start({ insertAt: "cursor" });
editorHandle.streaming.pushChunk("...next token...");
editorHandle.streaming.end(); // or .abort()
```

Both plugins ship with no visual decoration of their own — `getPendingChanges()` returns plain data for you to render, and `streaming` just mutates the document as chunks arrive. `diff.startFromMarkdown(markdown)` is also available if you already have a Markdown string instead of HTML.
