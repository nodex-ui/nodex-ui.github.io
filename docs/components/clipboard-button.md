# Clipboard Button

Use `b-ui="clipboard-button"` on a native button to copy specific data to the clipboard. Built on the same `variant`/`size` classes and built-in `.btn` styling as [Button](button.md), plus a copy/check icon that swaps back after a short delay.

```html
<button b-ui="clipboard-button" b-att-value="npm install nodexui">Copy install command</button>
<button b-ui="clipboard-button" b-att-variant="outline" b-att-size="sm" b-att-target="#snippet">Copy</button>
<pre id="snippet">const x = 1;</pre>
```

## Nodex UI component

```js
import { ClipboardButton } from "nodexui";
```

```base-ui
<ClipboardButton value="'npm install nodexui'" label="'Copy install command'"/>
<ClipboardButton getValue="() => this.currentSnippet" variant="'outline'" size="'sm'" aria-label="'Copy snippet'"/>
```

| Prop | Type | Default |
| --- | --- | --- |
| `variant` | `"default" \| "outline" \| "ghost" \| "destructive" \| "secondary" \| "link"` | `"default"` |
| `size` | `"default" \| "xs" \| "sm" \| "lg" \| "icon" \| "icon-xs" \| "icon-sm" \| "icon-lg"` | `"default"` |
| `value` | `String` | literal text to copy |
| `getValue` | `Function` | called on click to lazily compute the text to copy; overrides `value` |
| `label` | `String` | button text; alternative to default-slot children |
| `copiedLabel` | `String` | replaces `label` while the copied/check state is showing |
| `icon` | `String` | Lucide icon name, default `"copy"` |
| `copiedIcon` | `String` | Lucide icon name shown after a successful copy, default `"check"` |
| `resetDelay` | `Number` | ms before the icon/label revert, default `2000` |
| `disabled` | `Boolean` | blocks the click |
| `className` | `String` | appended to the generated `btn ...` classes |
| `onCopy` | `Function` | called with `{ value, event }` after a successful copy |
| `onCopyError` | `Function` | called with `{ error, event }` when both the Clipboard API and the fallback fail |

Also accepts default slot content instead of `label`. See [Nodex UI Component](/examples/blocks.html#/docs/guide/owl-components) for how to load `nodexui` and `dist/nodexui.templates.xml`.

## Static component

```base-ui
<button b-ui="clipboard-button" b-att-value="npm install nodexui">Copy install command</button>
<button b-ui="clipboard-button" b-att-variant="outline" b-att-size="sm" b-att-icon="clipboard">Copy</button>
```

Options: `b-att-variant="default|outline|ghost|destructive|secondary|link"`, `b-att-size="default|xs|sm|lg|icon|icon-xs|icon-sm|icon-lg"`.

Value resolution (first match wins): `b-att-value` (a literal string), `b-att-target` (a CSS selector — the target element's `textContent` is copied), otherwise the button's own text content.

Other attributes: `b-att-icon` (default `copy`), `b-att-copied-icon` (default `check`), `b-att-reset-delay` (ms before the icon reverts, default `2000`).

Events: `nodexui:clipboard-copy` (`detail: { value }`), `nodexui:clipboard-copy-error` (`detail: { error }`) — both bubble, so a page can listen once on an ancestor (e.g. to show a toast).

Copying prefers `navigator.clipboard.writeText`, falling back to a hidden `<textarea>` + `document.execCommand("copy")` when the async Clipboard API is unavailable (insecure context, permission denial, older browser) — it never silently no-ops.

Accessibility: icon-only usage (no label/slot content) needs `aria-label` — pass it directly (`aria-label="Copy"`) since the adapter does not infer one automatically.
