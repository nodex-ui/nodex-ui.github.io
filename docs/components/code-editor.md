# Code Editor

A dependency-free code box with line numbers, syntax colouring, Tab/Shift+Tab indent, Enter auto-indent and Format, Copy and Edit/View buttons. Pure Nodex UI only: it has no static `b-ui` adapter. Name the language with `codeLang`. Editable by default: pass `onChange` to own the text, or omit it and the editor keeps its own edits; add `readonly` to start in reading mode. The **Edit** button (right of Copy) toggles between reading (no typing, no Format button) and editing (**View** switches back).

## Nodex UI component

```js
import { CodeEditor } from "nodexui";
```

```base-ui
<div class="d-flex flex-column gap-3 w-100">
  <CodeEditor title="'main.go'" codeLang="'go'" value="'package main\n\nimport \'fmt\'\n\n// Greets the world.\nfunc main() {\n\tfmt.Println(\'hello\', 42)\n}'"/>
  <CodeEditor codeLang="'sql'" value="'SELECT id, name\nFROM users\nWHERE active = true -- only live accounts\nLIMIT 10;'"/>
</div>
```

Editable, with state:

```js
this.state = useState({ code: "int main(void) {\n  return 0;\n}" });
```

```xml
<CodeEditor codeLang="'c'" value="state.code" onChange="(code) => state.code = code"/>
```

| Prop | Type | Default |
| --- | --- | --- |
| `codeLang` | `String` | picked from the loaded file's extension, else `"plaintext"`; language to colour (see below), case-insensitive; unknown names fall back to plain text |
| `value` | `String` | the code; the component never mutates it |
| `src` | `String` | URL of a code file to fetch and show; reloads when it changes. Replaces `value` once loaded. Cross-origin URLs need CORS |
| `upload` | `Boolean` | shows an "Open file" button that loads a local file into the editor |
| `onLoad` | `Function` | `({ code, name }) => void`, after a file loads from `src` or an upload |
| `onError` | `Function` | `(error) => void`, when `src` or an upload cannot be read (an error alert is also shown) |
| `format` | `Boolean` | shows the **Format** button while editable (default on); `false` hides it |
| `toggle` | `Boolean` | shows the Edit/View button (default on); `false` locks the mode set by `readonly` |
| `onChange` | `Function` | `(code) => void`, called on every edit; omit it and the editor keeps its own edits |
| `readonly` | `Boolean` | starts in reading mode; users can switch with the Edit button unless `toggle` is `false` |
| `title` | `String` | heading, also the textarea's `aria-label`; defaults to `"<Language> code"` |
| `globals` | `Array<String>` | names your runtime binds; listed in the hint and coloured as builtins |
| `hint` | `String` | free-text help shown after the globals |
| `id` | `String` | textarea id, so an external `<label for>` can target the editor |
| `className` / `style` | `String` / `String \| Object` | on the root |

## Formatting

The **Format** button (or `Shift+Alt+F` in the editor) re-indents the code for the current `codeLang`, then reports it through `onChange`. It is a dependency-free re-indenter, not a full pretty-printer: it never re-wraps or rewrites code.

| Languages | What Format does |
| --- | --- |
| `json` | parses and pretty-prints with 2 spaces; invalid JSON shows an error alert, calls `onError` and leaves the text unchanged |
| `javascript`, `typescript`, `go`, `c`, `cpp`, `java`, `csharp`, `kotlin`, `swift`, `rust`, `php`, `css` | re-indents by bracket depth with the language's indent (tab for Go); brackets inside strings and comments are ignored, lines inside multi-line strings/comments are untouched, C/C++ `#` lines stay at the left margin |
| `html`, `xml` | re-indents by tag depth (void HTML tags like `<br>` and `/>` self-closing tags don't nest; tags inside comments and attribute values are ignored) |
| `lua` | re-indents by `function/if/for/while/repeat … end/until` blocks and brackets |
| everything else (`python`, `yaml`, `ruby`, `bash`, `sql`, plain text) | only trims trailing spaces; indentation is left alone because it carries meaning or has no safe rule |

All languages also collapse runs of blank lines to one and end the text with a single newline.

## Loading files

```xml
<CodeEditor src="'/examples/main.go'"/>
<CodeEditor upload="true" title="'Open a file to view it'"/>
```

`src` fetches the URL as text and shows it; the language comes from `codeLang`, or from the file extension (`.go`, `.c`, `.java`, `.mjs`, …) when `codeLang` is not set. `upload` adds an **Open file** button that reads a local file in the browser (nothing is uploaded anywhere). A loaded file replaces `value`; edits to it stay in the editor and are still reported through `onChange`. A failed fetch (HTTP error, network or CORS) shows an error alert and calls `onError`.

## Languages

`javascript` (`js`, `jsx`), `typescript` (`ts`, `tsx`), `go` (`golang`), `c` (`h`), `cpp` (`c++`, `cc`, `hpp`), `java`, `csharp` (`cs`, `c#`), `kotlin` (`kt`), `swift`, `rust` (`rs`), `php`, `python` (`py`), `ruby` (`rb`), `bash` (`sh`, `shell`), `sql` (`postgres`, `mysql`), `json`, `yaml` (`yml`), `css`, `html` (`htm`), `xml` (`svg`), `lua`, `plaintext`.

Colouring is display-only and follows `codeLang`: comments, strings, numbers, keywords, builtins, function calls (a word followed by `(`), types (`Capitalized` names), HTML/XML tags, attribute names and `&entities;`, `key:` names in JSON/YAML, CSS properties and `#hex` colours, `@Annotations` (Java, Kotlin, TypeScript, Python) and `$variables` (PHP, shell). Colours come from `--b-code-*` CSS variables on `.b-code-editor` (light and dark presets built in), so a theme can override them; nothing is parsed or validated. The Tab key inserts one indent for the language (a tab for Go, 4 spaces for C/Java/Python/Rust/…, 2 for the rest). `Esc` then `Tab` leaves the editor for keyboard users.

Live demo: the `code-editor-demo` block in the Blocks gallery (`examples/blocks/code-editor-demo.html`, Go/C/Java/JavaScript/HTML/XML/JSON/CSS/SQL tabs plus file loading).

The chrome is built from [Badge](badge.md), [ClipboardButton](clipboard-button.md) and [Kbd](kbd.md).
