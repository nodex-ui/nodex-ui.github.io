# Table

Native table styling for static or server-rendered data.

## Nodex UI component

```js
import { Table } from "nodexui";
```

```base-ui
<div style="max-width: 40rem" class="w-100">
  <Table>
    <caption>A list of your recent invoices.</caption>
    <thead>
      <tr>
        <th style="width: 100px">Invoice</th>
        <th>Status</th>
        <th>Method</th>
        <th class="text-end">Amount</th>
      </tr>
    </thead>
    <tbody>
      <tr>
        <td class="fw-medium">INV001</td>
        <td>Paid</td>
        <td>Credit Card</td>
        <td class="text-end">$250.00</td>
      </tr>
      <tr>
        <td class="fw-medium">INV002</td>
        <td>Pending</td>
        <td>PayPal</td>
        <td class="text-end">$150.00</td>
      </tr>
      <tr>
        <td class="fw-medium">INV003</td>
        <td>Unpaid</td>
        <td>Bank Transfer</td>
        <td class="text-end">$350.00</td>
      </tr>
    </tbody>
  </Table>
</div>
```

| Component | Prop | Type | Notes |
| --- | --- | --- | --- |
| `Table` | `striped` | `Boolean` | optional |
| `Table` | `hover` | `Boolean` | optional |
| `Table` | `className` | `String` | optional |

See [Nodex UI Component](/index.html#/docs/guide/owl-components) for how to load `nodexui` and `dist/nodexui.templates.xml`.

## Static component

```base-ui
<table b-ui="table" b-att-responsive="true">
  <thead><tr><th>Name</th><th>Status</th></tr></thead>
  <tbody><tr><td>API</td><td>Ready</td></tr></tbody>
</table>
```

Options: `b-att-responsive="true"`, `b-att-striped="false"`, `b-att-hover="false"`.

Accessibility: use table headers and captions when the context is not obvious.
