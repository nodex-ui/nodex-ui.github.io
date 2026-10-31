# Breadcrumb

Displays the path to the current resource using a hierarchy of links.

## Nodex UI component

```js
import {
  Breadcrumb,
  BreadcrumbEllipsis,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "nodexui";
```

```base-ui
<div style="max-width: 28rem" class="w-100">
  <Breadcrumb>
    <BreadcrumbList>
      <BreadcrumbItem>
        <BreadcrumbLink href="'/'">Home</BreadcrumbLink>
      </BreadcrumbItem>
      <BreadcrumbSeparator/>
      <BreadcrumbItem>
        <BreadcrumbLink href="'/components'">Components</BreadcrumbLink>
      </BreadcrumbItem>
      <BreadcrumbSeparator/>
      <BreadcrumbItem>
        <BreadcrumbPage>Breadcrumb</BreadcrumbPage>
      </BreadcrumbItem>
    </BreadcrumbList>
  </Breadcrumb>
</div>
```

| Component | Prop | Type | Notes |
| --- | --- | --- | --- |
| `Breadcrumb` | `className` | `String` | optional |
| `BreadcrumbList` | `className` | `String` | optional |
| `BreadcrumbItem` | `current` | `Boolean` | optional |
| `BreadcrumbItem` | `className` | `String` | optional |
| `BreadcrumbLink` | `href` | `String` | optional |
| `BreadcrumbLink` | `onClick` | `Function` | optional |
| `BreadcrumbPage` | `className` | `String` | optional |
| `BreadcrumbSeparator` | `className` | `String` | optional; custom children override the chevron |
| `BreadcrumbEllipsis` | `className` | `String` | optional |

See [Nodex UI Component](/index.html#/docs/guide/owl-components) for how to load `nodexui` and `dist/nodexui.templates.xml`.

## Static component

```base-ui
<nav b-ui="breadcrumb" aria-label="breadcrumb">
  <ol>
    <li><a href="/">Home</a></li>
    <li><span b-breadcrumb-ellipsis></span></li>
    <li><a href="/components">Components</a></li>
    <li><span b-breadcrumb-page>Breadcrumb</span></li>
  </ol>
</nav>
```

Nodex UI adds the shadcn/Nova breadcrumb classes, inserts chevron separators when none are authored, styles links and the current page, and marks the current page with `aria-current="page"`.

## Dropdown

```base-ui
<nav b-ui="breadcrumb" aria-label="breadcrumb">
  <ol>
    <li><a href="/">Home</a></li>
    <li b-breadcrumb-separator aria-hidden="true">·</li>
    <li><span b-ui="dropdown-menu">
      <button b-dropdown-trigger type="button" class="b-breadcrumb-link">
        <span>Components</span> <span b-icon="chevron-down"></span>
      </button>
      <span b-dropdown-menu>
        <a href="/docs">Documentation</a>
        <a href="/themes">Themes</a>
        <a href="https://github.com">GitHub</a>
      </span>
    </span></li>
    <li b-breadcrumb-separator aria-hidden="true">·</li>
    <li><span b-breadcrumb-page>Breadcrumb</span></li>
  </ol>
</nav>
```

Use `b-breadcrumb-separator` to author a custom separator.

```html
<li b-breadcrumb-separator aria-hidden="true">·</li>
```
