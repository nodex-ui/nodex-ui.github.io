# DocViewer

Renders a whole Markdown folder: a navigation tree beside the selected document. It combines `MarkdownTree` (sidebar) and `Markdown` (content), the same pattern the Docs and Concept tabs of the examples app use, so a project only supplies a `tree.json` manifest and the folder's files.

## Prepare the folder

One command writes everything DocViewer needs: a root `index.md`, a `readme.md` in every folder (the default page for a folder link), and the `tree.json` manifest. Serve the folder and `tree.json` as static files.

```bash
npx -p nodexui create-nodexui-app docs docs
```

It is idempotent: only the block between the `docs-index` markers is rewritten, so text you add around it is kept. Add `--check` in CI to fail when the files are stale, `--title`, `--description` and `--root-group` to name the index, and `--out <file>` to put `tree.json` elsewhere.

Labels and order come from each file's frontmatter (`sidebar_label`, `title`, `sidebar_position`) or its file name. A folder's `readme.md` / `index.md` opens first.

To bring an existing, messy folder into shape first, add `--restructure`. It prints a plan and changes nothing until you add `--write`:

```bash
npx -p nodexui create-nodexui-app docs docs --restructure          # dry run: the plan
npx -p nodexui create-nodexui-app docs docs --restructure --write  # apply, then index
```

- Folders and Markdown files are renamed to clean kebab-case (`User Guide.MD` -> `user-guide.md`, accents removed, `README.md` -> `readme.md`). Other files (images) keep their names. If two names would clash, the original is kept and a warning is printed.
- Relative links, images and reference definitions in the documents are rewritten so they still point at the renamed files.
- Missing `title` (first heading, else the file name) and `sidebar_position` (in file-name order) are added to each document's frontmatter. Generated `readme.md` and root `index.md` are left alone.

Review the result with `git diff` before committing.

## Nodex UI component

```js
import { DocViewer } from "nodexui";
```

```base-ui
<DocViewer tree="'/docs/tree.json'" root="'docs/v2'"/>
```

Deep links in the address bar and a callback on every navigation:

```xml
<DocViewer
  tree="'/docs/tree.json'"
  hashPrefix="'#/docs/'"
  onNavigate="(path, hash) => this.onDocChange(path)"
/>
```

## Props

- `tree` (required) — URL of the `tree.json` manifest.
- `root` — repo-relative folder inside the manifest to show (for example `docs/v2`); defaults to the whole manifest.
- `base` — URL prefix the manifest's paths are served under (default `/`). A document `docs/a.md` is fetched from `base + "docs/a.md"`.
- `path` — document to open. Opening order: address-bar hash (when `hashPrefix` is set), `path`, then the folder's `readme.md`/`index.md`, then the first file. Changing the prop later opens that document.
- `hashPrefix` — for example `#/docs/`. The open document is kept in `location.hash` as `<hashPrefix><path>` so it can be bookmarked and the back button works. Without it the selection lives only in component state.
- `part` — `"sidebar"` or `"content"` renders only that half, so a host layout (for example `Shell`) can put the tree in its sidebar and the document in its content area. Use one instance per half with the same `tree`/`root`/`path` and a `hashPrefix`; the address bar keeps them in sync.
- `include` — ordered list of document paths; shows just those files, in that order (for a hand-curated list such as a guides menu).
- `exclude` — list of document or folder paths to hide.
- `filter` — text; keeps only documents whose label contains it (case-insensitive), dropping empty folders.
- `formatLabel(node)` — returns the sidebar label for a document (for translated or custom titles); an empty result keeps the default label (frontmatter `sidebar_label`/`title`, else the file name).
- `toHash(path)` / `fromHash(hash)` — custom URL shape instead of `hashPrefix`: `toHash` returns the full hash (`#/…`) to navigate to for a document path (it may point at another page of your app), `fromHash` returns the document path for the current `location.hash`, or `""` when the hash is not yours.
- `onNavigate(path, hash)` — called when the reader picks a document in the tree or follows a relative link to another document in the manifest.
- `className`, `style` — added to the root element.

Mermaid diagrams, live ` ```base-ui ` previews and frontmatter tags/authors render as in `Markdown`. Relative links to documents that are in the manifest open inside the viewer; other links keep the browser default.

The layout is a two-column grid that stacks below 768px. For a custom layout, use `part` as above, or `MarkdownTree` and `Markdown` directly.
