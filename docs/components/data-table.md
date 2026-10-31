# Data Table

Use `b-ui="data-table"` for a CDN-ready data table component.

## CDN install requirements

Load the pinned Nodex UI CSS and JavaScript files; no extra dependency is required for this component.

## Nodex UI component

```js
import { DataTable } from "nodexui";
```

```base-ui
<div class="w-100" style="max-width: 56rem">
  <DataTable searchable="true" sortable="true" selectable="true" columnToggle="true" pagination="true"/>
</div>
```

| Component | Prop | Type | Notes |
| --- | --- | --- | --- |
| `DataTable` | `columns` | `Array` | optional; defaults to the shadcn payments demo columns |
| `DataTable` | `rows` | `Array` | optional; defaults to the shadcn payments demo rows |
| `DataTable` | `variant` | `String` | `default` by default; use `compact` for denser rows or any custom value for a `b-data-table-{variant}` hook |
| `DataTable` | `searchable` | `Boolean` | `true` by default |
| `DataTable` | `sortable` | `Boolean` | `true` by default; set `column.sortable = false` per column to disable |
| `DataTable` | `pagination` | `Boolean` | `true` by default |
| `DataTable` | `selectable` | `Boolean` | optional row-selection checkboxes |
| `DataTable` | `column-toggle` / `columnToggle` | `Boolean` | optional column visibility button group |
| `DataTable` | `row-actions` / `rowActions` | `Array` | action objects: `{ label, onSelect }` (`icon`/`variant` are accepted but not yet rendered per-item — the dropdown items are text-only; the icon action trigger is the row's `ellipsis` button) |
| `DataTable` | `page-size` / `pageSize` | `Number` | default `10` |
| `DataTable` | `page-size-options` / `pageSizeOptions` | `Array` | default `[10, 20, 50, 80]`; rendered as a "Rows per page" `<select>` in the pagination footer whenever non-empty (pass `[]` to hide it while keeping pagination on) |
| `DataTable` | `filter-placeholder` / `filterPlaceholder` | `String` | default `Filter rows...` |
| `DataTable` | `empty-label` / `emptyLabel` | `String` | default `No results.` |
| `DataTable` | `onRowAction` | `Function` | called with `(action, row, rowIndex)` |
| `DataTable` | `onSelectionChange` | `Function` | called with selected row keys |
| `DataTable` | `className` | `String` | optional |
| `DataTable` | `max-height` / `maxHeight` | `String \| Number` | optional; bounds the table viewport height (`px` if numeric) and enables vertical scrolling with a sticky header alongside the automatic horizontal scroll |
| `DataTable` | `slots.toolbarActions` | `Slot` | optional; renders custom content (e.g. a "New record" button, bulk-action buttons) in the toolbar, grouped with the Columns toggle on the trailing end — set via `<t t-set-slot="toolbarActions">...</t>` inside `<DataTable>` |

### Custom cell renderers

Set `column.component` to a Nodex `Component` class to render that column's cells with it instead of plain text. The component receives `{ row, column, value }` as props by default, or a custom prop shape from `column.componentProps(row, column)`:

```js
class StatusBadge extends Component {
  static template = xml`<Badge variant="props.value === 'success' ? 'default' : 'destructive'" label="props.value"/>`;
  static components = { Badge };
  static props = { row: Object, column: { type: Object, optional: true }, value: { type: String, optional: true } };
}

const columns = [
  { key: "email", label: "Email" },
  { key: "status", label: "Status", component: StatusBadge },
];
```

### Overflow scrolling

The table viewport always scrolls horizontally (`overflow: auto`) once its content is wider than the available space — no extra prop needed. Pass `max-height`/`maxHeight` to also bound vertical space and get a sticky header with vertical scrolling.

### Mobile kanban view

Below 640px width, the table view is replaced by a stacked one-column card ("kanban") view — each row becomes a card showing every visible column as a label/value pair, with selection and row actions preserved. This is CSS-driven (`.b-data-table__viewport` hides, `.b-data-table__cards` shows), so it applies to both the Nodex UI component and the static `b-ui="data-table"` markup automatically.

See [Nodex UI Component](/index.html#/docs/guide/owl-components) for how to load `nodexui` and `dist/nodexui.templates.xml`.

## Static component

```base-ui
<div b-ui="data-table"></div>
```

## Enhanced usage

Call `thebase.mount(element)` or rely on `thebase.mountAll()` after the script loads.

## Options and attributes

See `dist/nodexui.registry.json` for the supported attribute list.

## Methods

Use the global runtime methods: `thebase.mount()`, `thebase.mountAll()`, and `thebase.destroy()`.

## Events

Interactive components emit documented `nodexui:*` events from their root element. Static components do not emit events.

## CSS variables

The component inherits Nodex UI semantic tokens such as `--b-surface`, `--b-border`, `--b-primary`, and `--b-radius`.

## Accessibility behavior

The component preserves authored semantic HTML and adds ARIA roles or state attributes where enhancement is required.

## Examples

### Card transactions with row actions

Row actions render as an `ellipsis` icon `Button` per row that opens a dropdown menu — pass `rowActions` with an `onSelect` handler per action, and `onRowAction` for a single fallback handler.

```js
import { DataTable } from "nodexui";

const columns = [
  { key: "card", label: "Card", filterable: true },
  { key: "holder", label: "Cardholder" },
  { key: "amount", label: "Amount", align: "right", format: "currency" },
  { key: "status", label: "Status", format: "capitalize" },
  { key: "date", label: "Date" },
];

const rows = [
  { id: "txn_1", card: "•••• 4242", holder: "Ken Nguyen", amount: 128.5, status: "success", date: "2026-08-25" },
  { id: "txn_2", card: "•••• 1881", holder: "Abe Tran", amount: 42.0, status: "processing", date: "2026-08-26" },
  { id: "txn_3", card: "•••• 0356", holder: "Silas Le", amount: 874.2, status: "failed", date: "2026-08-26" },
];

const rowActions = [
  { label: "View receipt", onSelect: (row) => openReceipt(row.id) },
  { label: "Copy transaction ID", onSelect: (row) => navigator.clipboard.writeText(row.id) },
  { label: "Refund", onSelect: (row) => refundTransaction(row.id) },
  { label: "Block card", onSelect: (row) => blockCard(row.card) },
];
```

```base-ui
<DataTable columns="columns" rows="rows" rowActions="rowActions" pageSize="5"/>
```

The kebab (`ellipsis`) button in the actions column is the icon action trigger; clicking it toggles the `rowActions` dropdown menu for that row. Selecting an item calls both that action's own `onSelect(row, rowIndex)` and the table-level `onRowAction(action, row, rowIndex)` if provided — use `onRowAction` for logging/analytics, `onSelect` per action for the actual handler.

See `examples/index.html` for a working CDN-style page.

### Toolbar actions and rows-per-page

Pass custom buttons into the toolbar via the `toolbarActions` slot — they render next to the Columns toggle — and pass `pageSizeOptions` to control which row-count choices appear in the "Rows per page" select (shown automatically whenever `pagination` is on and `pageSizeOptions` isn't empty).

```base-ui
<DataTable columns="columns" rows="rows" pageSizeOptions="[10, 20, 50, 80]">
  <t t-set-slot="toolbarActions">
    <Button icon="'plus'" onClick="() => createRecord()">New record</Button>
    <Button variant="'outline'" onClick="() => exportRows()">Export</Button>
  </t>
</DataTable>
```

## Browser support

Nodex UI targets modern evergreen browsers that support ES modules, CSS variables.

## Test checklist

Verify light and dark themes, keyboard access for focusable controls, disabled or readonly states when applicable, and cleanup through `thebase.destroy()`.
