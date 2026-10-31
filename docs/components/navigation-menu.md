# Navigation Menu

Use `b-ui="navigation-menu"` for horizontal site or app navigation.

## Nodex UI component

```js
import { NavigationMenu, NavigationMenuItem } from "nodexui";
```

```base-ui
<div style="max-width: 40rem" class="w-100">
  <NavigationMenu>
    <NavigationMenuItem href="'#home'">Home</NavigationMenuItem>
    <NavigationMenuItem href="'#components'">Components</NavigationMenuItem>
    <NavigationMenuItem href="'/docs'">Docs</NavigationMenuItem>
    <NavigationMenuItem href="'#list'">List</NavigationMenuItem>
    <NavigationMenuItem href="'#simple'">Simple</NavigationMenuItem>
    <NavigationMenuItem href="'#with-icon'">With Icon</NavigationMenuItem>
  </NavigationMenu>
</div>
```

| Component | Prop | Type | Notes |
| --- | --- | --- | --- |
| `NavigationMenu` | `className` | `String` | optional |
| `NavigationMenuItem` | `href` | `String` | optional |
| `NavigationMenuItem` | `className` | `String` | optional |

See [Nodex UI Component](/index.html#/docs/guide/owl-components) for how to load `nodexui` and `dist/nodexui.templates.xml`.

## Static component

```base-ui
<nav b-ui="navigation-menu" aria-label="Main">
  <a href="/">Home</a>
  <a href="/docs" aria-current="page">Docs</a>
</nav>
```

Nodex UI adds `menubar`/`menuitem` roles and Left/Right arrow focus movement.

Below 768px the menu does not wrap: it scrolls horizontally with a fade on the right edge and no visible scrollbar, so a sticky header keeps a constant height. Items never shrink or wrap their text.
