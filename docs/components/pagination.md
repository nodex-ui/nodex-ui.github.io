# Pagination

Use `b-ui="pagination"` on a `nav` containing a list of links or buttons.

## Nodex UI component

```js
import { Pagination, PaginationItem } from "nodexui";
```

```base-ui
<div style="max-width: 28rem" class="w-100">
  <Pagination>
    <PaginationItem>
      <Icon name="'chevron-left'"/>
      <span class="ms-1">Previous</span>
    </PaginationItem>
    <PaginationItem>1</PaginationItem>
    <PaginationItem current="true">2</PaginationItem>
    <PaginationItem>3</PaginationItem>
    <PaginationItem disabled="true">...</PaginationItem>
    <PaginationItem>
      <span class="me-1">Next</span>
      <Icon name="'chevron-right'"/>
    </PaginationItem>
  </Pagination>
</div>
```

| Component | Prop | Type | Notes |
| --- | --- | --- | --- |
| `Pagination` | `className` | `String` | optional |
| `PaginationItem` | `current` | `Boolean` | optional |
| `PaginationItem` | `disabled` | `Boolean` | optional |
| `PaginationItem` | `onClick` | `Function` | optional |

See [Nodex UI Component](/examples/blocks.html#/docs/guide/owl-components) for how to load `nodexui` and `dist/nodexui.templates.xml`.

## Static component

```base-ui
<nav b-ui="pagination" aria-label="Pagination">
  <ul>
    <li><a href="?page=1" aria-current="page">1</a></li>
    <li><a href="?page=2">2</a></li>
  </ul>
</nav>
```

Nodex UI adds built-in pagination classes, active states, and disabled item styling.
