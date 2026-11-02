# Nodex UI Documentation Index

Nodex UI (`nodexui`) is a component library built on Owl + Bootstrap 5 with shadcn-aligned tokens. It offers two APIs: static `b-ui="..."` markup and pure Nodex UI (Owl) components.

This file is the entry point for AI agents. Every link is **relative to this file**, so resolve it against this file's own URL.

For example, if this file is at `https://raw.githubusercontent.com/<owner>/<repo>/<branch>/docs/index.md`, then `components/button.md` is at `https://raw.githubusercontent.com/nodex-ui/nodex-ui.github.io/refs/heads/main/docs/components/button.md`.

## How to use this index

1. Start with [Usage Guide](usage-guide.md). It is the single entry point for integrating Nodex UI.
2. For one component, fetch `components/<name>.md`. The full list is below.
3. For Owl framework questions (templates, hooks, props, reactivity), use the [Owl v2 reference](#owl-v2-reference).
4. Fetch only the files you need. Each file is self-contained.

## Getting started

| File | Read it when you need |
| --- | --- |
| [usage-guide.md](usage-guide.md) | End-to-end integration: choosing an API, install, theming, verification |
| [installation.md](installation.md) | Install mechanics: CDN, npm, files and versions |
| [runtime-api.md](runtime-api.md) | The `window.thebase` browser global and its runtime API |
| [theming.md](theming.md) | Light/dark themes, design tokens, theme customisation |
| [registry.md](registry.md) | `nodexui.registry.json`: package metadata, CDN paths, per-component metadata |

## Authoring and APIs

| File | Read it when you need |
| --- | --- |
| [owl-components.md](owl-components.md) | The pure Nodex UI (Owl component) API, as opposed to static `b-ui` markup |
| [component-authoring.md](component-authoring.md) | Writing or changing a component. Both public APIs share one source folder |
| [blocks.md](blocks.md) | Blocks: static HTML compositions based on shadcn/ui blocks |
| [icons.md](icons.md) | Built-in Lucide icon set and the `b-icon` attribute |

## Services

| File | Read it when you need |
| --- | --- |
| [i18n.md](i18n.md) | Adding translations to a page or app (`nodexui/i18n`) |
| [qr.md](qr.md) | QR code generator and the VietQR (Napas/EMV) payload builder |
| [analytics.md](analytics.md) | Cookieless web analytics, ported from Plausible's tracker |

## AI tooling

| File | Read it when you need |
| --- | --- |
| [base-ui-skill.md](base-ui-skill.md) | The Nodex UI skill that teaches an AI agent to scaffold apps and emit components |

## Components

Each page documents both APIs (`b-ui="<name>"` markup and the pure Nodex UI component), with examples.

### Layout and structure

- [Card](components/card.md)
- [Separator](components/separator.md)
- [Aspect Ratio](components/aspect-ratio.md)
- [Resizable](components/resizable.md)
- [Scroll Area](components/scroll-area.md)
- [Shell](components/shell.md): collapsible app shell with sidebar, header and content
- [Sidebar](components/sidebar.md)
- [Item](components/item.md)
- [Empty](components/empty.md): empty state
- [Direction](components/direction.md): RTL/LTR
- [Typography](components/typography.md)

### Navigation

- [Breadcrumb](components/breadcrumb.md)
- [Navigation Menu](components/navigation-menu.md)
- [Menubar](components/menubar.md)
- [Tabs](components/tabs.md)
- [Pagination](components/pagination.md)
- [Command](components/command.md)

### Forms and inputs

- [Form](components/form.md)
- [Field](components/field.md)
- [Label](components/label.md)
- [Input](components/input.md)
- [Input OTP](components/input-otp.md)
- [Textarea](components/textarea.md)
- [Select](components/select.md)
- [Native Select](components/native-select.md)
- [Combobox](components/combobox.md)
- [Checkbox](components/checkbox.md)
- [Radio Group](components/radio-group.md)
- [Switch](components/switch.md)
- [Slider](components/slider.md)
- [Toggle](components/toggle.md)
- [Toggle Group](components/toggle-group.md)
- [Calendar](components/calendar.md)
- [Date Picker](components/date-picker.md)
- [Questionnaire](components/questionnaire.md)

### Buttons and actions

- [Button](components/button.md)
- [Button Group](components/button-group.md)
- [Clipboard Button](components/clipboard-button.md)
- [Theme Button](components/theme-button.md): light/dark toggle

### Overlays and menus

- [Dialog](components/dialog.md)
- [Alert Dialog](components/alert-dialog.md)
- [Sheet](components/sheet.md)
- [Drawer](components/drawer.md)
- [Popover](components/popover.md)
- [Hover Card](components/hover-card.md)
- [Tooltip](components/tooltip.md)
- [Dropdown Menu](components/dropdown-menu.md)
- [Context Menu](components/context-menu.md)
- [Toast](components/toast.md)
- [Pwa](components/pwa.md): install and permission prompt

### Feedback and status

- [Alert](components/alert.md)
- [Badge](components/badge.md)
- [Progress](components/progress.md)
- [Skeleton](components/skeleton.md)
- [Spinner](components/spinner.md)

### Data display

- [Table](components/table.md)
- [Data Table](components/data-table.md)
- [Chart](components/chart.md)
- [Accordion](components/accordion.md)
- [Collapsible](components/collapsible.md)
- [Carousel](components/carousel.md)
- [Avatar](components/avatar.md)
- [Attachment](components/attachment.md)
- [Icon](components/icon.md)
- [Kbd](components/kbd.md)
- [Marker](components/marker.md)
- [QR Card](components/qr-card.md)

### Chat

- [Message](components/message.md)
- [Message Scroller](components/message-scroller.md)
- [Bubble](components/bubble.md)

### Content and editors

- [Markdown](components/markdown.md): render or edit Markdown
- [Text Editor](components/text-editor.md): WYSIWYG editor (Milkdown)
- [Code Editor](components/code-editor.md)
- [ApiDoc](components/apidoc.md): render an OpenAPI 3.0+ document
- [Block Viewer](components/block-viewer.md): page root for block gallery detail pages

## Owl v2 reference

Upstream Owl framework docs (v2). Nodex UI components are built on Owl.

- [readme.md](v2/readme.md): Owl overview
- [tree.json](v2/tree.json): machine-readable file tree of this section

### Learning

- [quick_start.md](v2/learning/quick_start.md): start an Owl project
- [tutorial_todoapp.md](v2/learning/tutorial_todoapp.md): TodoApp tutorial
- [how_to_test.md](v2/learning/how_to_test.md): test components

### Reference

- [app.md](v2/reference/app.md)
- [component.md](v2/reference/component.md)
- [props.md](v2/reference/props.md)
- [slots.md](v2/reference/slots.md)
- [refs.md](v2/reference/refs.md)
- [hooks.md](v2/reference/hooks.md)
- [reactivity.md](v2/reference/reactivity.md)
- [templates.md](v2/reference/templates.md)
- [precompiling_templates.md](v2/reference/precompiling_templates.md)
- [event_handling.md](v2/reference/event_handling.md)
- [input_bindings.md](v2/reference/input_bindings.md)
- [environment.md](v2/reference/environment.md)
- [portal.md](v2/reference/portal.md)
- [translations.md](v2/reference/translations.md)
- [error_handling.md](v2/reference/error_handling.md)
- [concurrency_model.md](v2/reference/concurrency_model.md)
- [utils.md](v2/reference/utils.md)

### Miscellaneous

- [why_owl.md](v2/miscellaneous/why_owl.md)
- [comparison.md](v2/miscellaneous/comparison.md): comparison with Vue and React
- [architecture.md](v2/miscellaneous/architecture.md)
- [compiled_template.md](v2/miscellaneous/compiled_template.md)

### Tools

- [devtools.md](v2/tools/devtools.md): Owl Devtools browser extension
- [devtools_guide.md](v2/tools/devtools_guide.md)

Screenshots for the devtools pages are in `v2/tools/screenshots/` (PNG, not needed for text-only use).
