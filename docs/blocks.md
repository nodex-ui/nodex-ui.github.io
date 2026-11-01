# Blocks

Nodex UI blocks are static HTML compositions styled by the same shadcn-aligned tokens as the component library. They are based on the public shadcn/ui blocks page and keep the same sizing landmarks: `min-height: 100svh`, sidebar widths, header heights, `gap-4`/`gap-6`, muted backgrounds, and auth-card widths.

Each block that needs one has its own source stylesheet in `src/blocks/<block-name>.css`, bundled into `dist/nodexui.min.css`. Shared helpers live in `src/blocks/shared.css`; new blocks should not be folded into an all-in-one block stylesheet.

Block navigation icons must use Nodex UI's built-in Lucide icon component, for example `<span b-icon="layout-dashboard" b-block-icon></span>`. Do not use placeholder letters inside `b-block-icon`.

Blocks are not standalone runtime components. Paste the markup and load the normal Nodex UI assets:

```html
<link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/nodexui@latest/dist/nodexui.min.css">
<script src="https://cdn.jsdelivr.net/npm/nodexui@latest/dist/nodexui.min.js" defer></script>
```

`https://unpkg.com/nodexui@latest/dist/...` mirrors the same files as an alternative CDN if jsDelivr is unreachable. Pin an exact version (e.g. `@1.3.3`, or `@1` to take only non-breaking updates) instead of `@latest` for production. Blocks are static markup, so they only need the static `b-ui` runtime above — see [Usage Guide](usage-guide.md) if the surrounding page is itself an application and you'd rather compose the equivalent layout from [Nodex UI Component](owl-components.md).

Use `b-block` to select the block style:

```html
<section b-block="login-03">
  <div b-block-login>
    <a href="#" b-block-brand>Acme Inc.</a>
    <div b-block-auth-card>...</div>
  </div>
</section>
```

The docs/dev server serves the block gallery at `/blocks` through the shared `examples/index.html` shell. Each block is a template in `examples/components/blocks/<block-name>.xml`, rendered inline by the gallery and deep-linked as `#/blocks/<block-name>`.

## Included Blocks

- `apidoc-01`: full-page API reference built from an OpenAPI 3 file with the pure Nodex UI `ApiDoc` component (sidebar, schemas, Try It, Authorize); see [ApiDoc](components/apidoc.md).
- `chart-01`: copyable usage block showing how to compose `b-ui="chart"` with chart slots, SVG primitives, tokens, and footer copy.
- `dashboard-01`: dashboard shell with inset sidebar, header, metric cards, chart surface, and table area.
- `sidebar-01` through `sidebar-16`: static conversions of the current shadcn/ui sidebar block family, including documentation sidebars, collapsible groups, inset navigation, mail, workspace, file explorer, calendar, dialog, right TOC, dual-sidebar, and sticky-header variants.
- `login-03`: centered login card on muted background with a 24rem max-width form stack.
- `login-04`: login card with form and media panel, capped at 56rem like the shadcn block preview.
- `signup-03`: centered signup card kept separate from login while sharing the same 24rem/auth-card sizing.
- `signup-04`: signup card and media split kept separate from login while sharing the same 56rem split-card sizing.

See `/blocks` for the gallery.
