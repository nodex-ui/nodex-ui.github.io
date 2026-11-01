# Shell

Use `b-ui="shell"` for a collapsible app shell: a desktop-collapsible/mobile off-canvas sidebar next to a sticky header and scrollable content region.

## Nodex UI component

```js
import {
  Shell,
  ShellContent,
  ShellHeader,
  ShellMain,
  ShellNav,
  ShellSidebar,
  ShellSidebarHeader,
  ShellUserMenu,
} from "nodexui";
import { SidebarClose, SidebarTrigger } from "nodexui";
```

```base-ui
<Shell authState="state.authState"
       toast="state.toast" onToastOpenChange="(open) => !open and this.dismissToast()"
       notificationPage="NotificationPage"
       pwa="PwaInstallerDrawer">
  <ShellSidebar>
    <ShellSidebarHeader>
      Brand
      <SidebarClose/>
    </ShellSidebarHeader>
    <ShellNav>
      <a href="/">Home</a>
    </ShellNav>
  </ShellSidebar>
  <ShellMain>
    <ShellHeader>
      <SidebarTrigger>Menu</SidebarTrigger>
      <div class="b-shell-header-spacer"/>
      <ShellUserMenu/>
    </ShellHeader>
    <ShellContent loading="state.loading">Routed page content</ShellContent>
  </ShellMain>
</Shell>
```

`Shell` wraps the existing `Sidebar` primitive internally to provide the off-canvas/mobile drawer behavior (`open`/`defaultOpen`/`onOpenChange` are forwarded to it) and additionally tracks its own desktop `collapsed` state, exposed to descendants via `env.shell`/`env.setShellCollapsed`. A single `SidebarTrigger` toggles both: it opens/closes the mobile drawer via `env.setSidebarOpen` and, when mounted inside a `Shell`, also toggles the desktop collapse rail via `env.setShellCollapsed` — no separate collapse-trigger component is needed.

Below 992px (`max-width: 991.98px`) the sidebar becomes the off-canvas drawer, so tablets in portrait get the drawer too; at 992px and above it is the collapsible desktop rail.

Four cross-cutting concerns are opt-in via props instead of baked into the layout:

- `authState` — an arbitrary object (e.g. `{ username, onLogout }`), exposed to descendants via `env.shell.authState`. `ShellUserMenu` reads it directly and renders nothing when it's absent; pass its own default slot to fully customize the markup instead of the built-in username/logout row.
- `toast`/`onToastOpenChange` — when `toast` is set (`{ variant, message, delay, persistent, actionLabel, onAction }`), `Shell` renders a built-in `Toast` bound to it, positioned as a fixed top-right overlay (`.b-shell-toast`) so it survives regardless of where `ShellContent` scrolls. Useful for a single app-wide notification channel (e.g. a message-bus toast) that should outlive route changes.
- `notificationPage`/`pwa` — each a Nodex component class, mounted once at the shell root (`<t t-component="..."/>`) alongside the sidebar, same shape as a consumer app's own `PWAInstallDrawer`. `Shell` doesn't know or care what they render — they're expected to manage their own trigger/visibility.

| Component | Prop | Type | Notes |
| --- | --- | --- | --- |
| `Shell` | `open` | `Boolean` | optional, forwarded to the internal `Sidebar` |
| `Shell` | `defaultOpen` | `Boolean` | optional |
| `Shell` | `onOpenChange` | `Function` | optional |
| `Shell` | `collapsed` | `Boolean` | optional, controls the desktop sidebar collapse |
| `Shell` | `defaultCollapsed` | `Boolean` | optional |
| `Shell` | `onCollapsedChange` | `Function` | optional |
| `Shell` | `authState` | `Object` | optional, exposed to descendants via `env.shell.authState` |
| `Shell` | `toast` | `Object` | optional, `{ variant, message, delay, persistent, actionLabel, onAction }` |
| `Shell` | `onToastOpenChange` | `Function` | optional, called with `false` when the built-in toast is dismissed |
| `Shell` | `notificationPage` | `Function` | optional, a Nodex component class mounted at the shell root |
| `Shell` | `pwa` | `Function` | optional, a Nodex component class mounted at the shell root |
| `Shell` | `className` | `String` | optional |
| `ShellSidebar` | `className` | `String` | optional |
| `ShellSidebarHeader` | `className` | `String` | optional |
| `ShellNav` | `className` | `String` | optional |
| `ShellMain` | `className` | `String` | optional |
| `ShellHeader` | `className` | `String` | optional |
| `ShellContent` | `loading` | `Boolean` | optional, renders a built-in `Skeleton` placeholder instead of the default slot |
| `ShellContent` | `className` | `String` | optional |
| `ShellUserMenu` | `className` | `String` | optional |

See [Nodex UI Component](/examples/blocks.html#/docs/guide/owl-components) for how to load `nodexui` and `dist/nodexui.templates.xml`.

## Static component

```base-ui
<div b-ui="shell">
  <button id="collapse-sidebar" b-shell-collapse-trigger type="button">Toggle sidebar</button>
  <aside b-ui="sidebar">
    <a href="/">Home</a>
  </aside>
  <div>
    <header>...</header>
    <main>...</main>
  </div>
</div>
```

State is reflected through `b-att-collapsed="true|false"`. Events: `nodexui:collapse`, `nodexui:expand`.
