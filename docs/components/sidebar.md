# Sidebar

Use `b-ui="sidebar"` for app navigation panels. The component mirrors shadcn's composable Sidebar parts: header, content, footer, groups, menu rows, actions, nested submenus, rail, inset, and trigger.

## Nodex UI component

```js
import { Sidebar, SidebarContent, SidebarFooter, SidebarHeader, SidebarMenu, SidebarMenuButton, SidebarMenuItem } from "nodexui";
```

`Sidebar` owns the open/collapsed state itself (`defaultOpen`/`open`/`onOpenChange`) and lays out its `SidebarContent` panel next to `SidebarInset` as siblings — do **not** wrap it in a separate `SidebarProvider`, that duplicates the layout/state and breaks rendering. `SidebarHeader`, the nav `SidebarGroup`s, and `SidebarFooter` all nest *inside* `SidebarContent` (which renders the actual bordered/fixed-width panel), not beside it.

```base-ui
<Sidebar defaultOpen="true" collapsible="'icon'">
  <SidebarContent>
    <SidebarHeader>
      <SidebarMenu>
        <SidebarMenuItem>
          <DropdownMenu>
            <DropdownMenuTrigger>
              <SidebarMenuButton size="'lg'">
                <span b-icon="gallery-vertical-end"></span>
                <span class="d-flex flex-column">
                  <span class="fw-semibold small">Acme Inc</span>
                  <span class="text-body-secondary" style="font-size: 0.75rem">Enterprise</span>
                </span>
                <span b-icon="chevrons-up-down" class="ms-auto"></span>
              </SidebarMenuButton>
            </DropdownMenuTrigger>
            <DropdownMenuContent>
              <DropdownMenuLabel>Teams</DropdownMenuLabel>
              <DropdownMenuItem>Acme Inc</DropdownMenuItem>
              <DropdownMenuItem>Acme Corp.</DropdownMenuItem>
              <DropdownMenuItem>Evil Corp.</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </SidebarMenuItem>
      </SidebarMenu>
    </SidebarHeader>

    <SidebarGroup>
      <SidebarGroupLabel>Platform</SidebarGroupLabel>
      <SidebarMenu>
        <SidebarMenuItem>
          <SidebarMenuButton href="'#'" icon="'square-terminal'" active="true">Playground</SidebarMenuButton>
          <SidebarMenuAction icon="'chevron-right'" aria-label="'Toggle Playground'"/>
          <SidebarMenuSub>
            <SidebarMenuSubItem><SidebarMenuSubButton href="'#'">History</SidebarMenuSubButton></SidebarMenuSubItem>
            <SidebarMenuSubItem><SidebarMenuSubButton href="'#'">Starred</SidebarMenuSubButton></SidebarMenuSubItem>
            <SidebarMenuSubItem><SidebarMenuSubButton href="'#'">Settings</SidebarMenuSubButton></SidebarMenuSubItem>
          </SidebarMenuSub>
        </SidebarMenuItem>
        <SidebarMenuItem>
          <SidebarMenuButton href="'#'" icon="'bot'">Models</SidebarMenuButton>
          <SidebarMenuAction icon="'chevron-right'" aria-label="'Toggle Models'"/>
        </SidebarMenuItem>
        <SidebarMenuItem>
          <SidebarMenuButton href="'#'" icon="'book-open'">Documentation</SidebarMenuButton>
          <SidebarMenuAction icon="'chevron-right'" aria-label="'Toggle Documentation'"/>
        </SidebarMenuItem>
        <SidebarMenuItem>
          <SidebarMenuButton href="'#'" icon="'settings-2'">Settings</SidebarMenuButton>
          <SidebarMenuAction icon="'chevron-right'" aria-label="'Toggle Settings'"/>
        </SidebarMenuItem>
      </SidebarMenu>
    </SidebarGroup>

    <SidebarGroup muted="true">
      <SidebarGroupLabel>Projects</SidebarGroupLabel>
      <SidebarMenu>
        <SidebarMenuItem>
          <SidebarMenuButton href="'#'" icon="'frame'">Design Engineering</SidebarMenuButton>
          <SidebarMenuAction icon="'ellipsis'" aria-label="'More'"/>
        </SidebarMenuItem>
        <SidebarMenuItem>
          <SidebarMenuButton href="'#'" icon="'chart-pie'">Sales &amp; Marketing</SidebarMenuButton>
          <SidebarMenuAction icon="'ellipsis'" aria-label="'More'"/>
        </SidebarMenuItem>
        <SidebarMenuItem>
          <SidebarMenuButton href="'#'" icon="'map'">Travel</SidebarMenuButton>
          <SidebarMenuAction icon="'ellipsis'" aria-label="'More'"/>
        </SidebarMenuItem>
      </SidebarMenu>
    </SidebarGroup>

    <SidebarFooter>
      <SidebarMenu>
        <SidebarMenuItem>
          <DropdownMenu>
            <DropdownMenuTrigger>
              <SidebarMenuButton size="'lg'">
                <span b-ui="avatar" style="width: 2rem; height: 2rem">SC</span>
                <span class="d-flex flex-column">
                  <span class="fw-semibold small">shadcn</span>
                  <span class="text-body-secondary" style="font-size: 0.75rem">m@example.com</span>
                </span>
                <span b-icon="chevrons-up-down" class="ms-auto"></span>
              </SidebarMenuButton>
            </DropdownMenuTrigger>
            <DropdownMenuContent>
              <DropdownMenuItem>Upgrade to Pro</DropdownMenuItem>
              <DropdownMenuSeparator/>
              <DropdownMenuItem>Account</DropdownMenuItem>
              <DropdownMenuItem>Billing</DropdownMenuItem>
              <DropdownMenuItem>Notifications</DropdownMenuItem>
              <DropdownMenuSeparator/>
              <DropdownMenuItem>Log out</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </SidebarMenuItem>
      </SidebarMenu>
    </SidebarFooter>
  </SidebarContent>
  <SidebarRail/>

  <SidebarInset>
    <header class="d-flex align-items-center gap-2 p-3 border-bottom">
      <SidebarTrigger/>
      <Separator orientation="'vertical'" className="'mx-2'" style="'height: 1rem'"/>
      <Breadcrumb>
        <BreadcrumbList>
          <BreadcrumbItem>
            <BreadcrumbLink href="'#'">Building Your Application</BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator/>
          <BreadcrumbItem>
            <BreadcrumbPage>Data Fetching</BreadcrumbPage>
          </BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>
    </header>
    <div class="d-flex flex-column gap-3 p-3">
      <div class="row g-3">
        <div class="col-4"><div class="bg-body-tertiary rounded" style="aspect-ratio: 16/9"></div></div>
        <div class="col-4"><div class="bg-body-tertiary rounded" style="aspect-ratio: 16/9"></div></div>
        <div class="col-4"><div class="bg-body-tertiary rounded" style="aspect-ratio: 16/9"></div></div>
      </div>
      <div class="bg-body-tertiary rounded flex-fill" style="min-height: 16rem"></div>
    </div>
  </SidebarInset>
</Sidebar>
```

| Component | Prop | Type | Notes |
| --- | --- | --- | --- |
| `Sidebar` | `open` | `Boolean` | optional |
| `Sidebar` | `defaultOpen` | `Boolean` | optional |
| `Sidebar` | `onOpenChange` | `Function` | optional |
| `Sidebar` | `side` | `String` | `left` or `right` |
| `Sidebar` | `variant` | `String` | `sidebar`, `floating`, or `inset` |
| `Sidebar` | `collapsible` | `String` | `offcanvas`, `icon`, or `none` |
| `Sidebar` | `className` | `String` | optional |
| `SidebarClose` | `className` | `String` | optional |
| `SidebarClose` | `icon` | `String` | optional, defaults to `x` |
| `SidebarClose` | `label` | `String` | optional, defaults to a visually-hidden "Close Sidebar" |
| `SidebarContent` | `className` | `String` | optional |
| `SidebarFooter` | `className` | `String` | optional |
| `SidebarHeader` | `className` | `String` | optional |
| `SidebarInset` | `className` | `String` | optional |
| `SidebarInput` | `placeholder` | `String` | optional |
| `SidebarRail` | `className` | `String` | optional |
| `SidebarSeparator` | `className` | `String` | optional |
| `SidebarTrigger` | `className` | `String` | optional |

### Groups and menu items

Reusable nav-content primitives, extracted from the recurring group/item shapes across the `sidebar-*` example blocks (`examples/blocks/sidebar-01.html`, `-02`, `-03`, `-08`, `-10`, etc.). Compose them instead of hand-rolling static markup for each new sidebar.

`SidebarMenu` (`.b-sidebar-menu`) fills the remaining height of the panel and scrolls on its own (`overflow-y: auto`) when its items overflow. `SidebarHeader` and `SidebarFooter` stay in place, so a long nav list no longer pushes the footer off-screen.

```base-ui
<Sidebar defaultOpen="true">
  <SidebarContent>
    <!-- SidebarGroup/SidebarMenu compose directly inside SidebarContent — the panel that Sidebar+SidebarContent renders. -->
    <!-- Plain heading group (sidebar-03/08/10/12/16 style) -->
    <SidebarGroup>
      <SidebarGroupLabel>Platform</SidebarGroupLabel>
      <SidebarMenu>
        <SidebarMenuItem>
          <SidebarMenuButton href="'#'" icon="'square-terminal'" active="true">Playground</SidebarMenuButton>
          <SidebarMenuAction icon="'ellipsis'" aria-label="'More'"/>
          <SidebarMenuSub>
            <SidebarMenuButton href="'#'">History</SidebarMenuButton>
            <SidebarMenuButton href="'#'">Starred</SidebarMenuButton>
          </SidebarMenuSub>
        </SidebarMenuItem>
      </SidebarMenu>
    </SidebarGroup>

    <!-- Collapsible group with a chevron trigger (sidebar-02/05 style) -->
    <SidebarGroupCollapsible label="'Build Your Application'" defaultOpen="true">
      <SidebarMenu>
        <SidebarMenuItem><SidebarMenuButton href="'#'" icon="'route'">Routing</SidebarMenuButton></SidebarMenuItem>
      </SidebarMenu>
    </SidebarGroupCollapsible>

    <!-- Label-less, de-emphasized utility group (sidebar-08/10/15 trailing group) -->
    <SidebarGroup muted="true">
      <SidebarMenu>
        <SidebarMenuItem><SidebarMenuButton href="'#'" icon="'settings'">Settings</SidebarMenuButton></SidebarMenuItem>
      </SidebarMenu>
    </SidebarGroup>
  </SidebarContent>
</Sidebar>
```

| Component | Prop | Type | Notes |
| --- | --- | --- | --- |
| `SidebarGroup` | `muted` | `Boolean` | optional; renders a label-less, de-emphasized section |
| `SidebarGroup` | `className` | `String` | optional |
| `SidebarGroupLabel` | `className` | `String` | optional; static, non-interactive heading |
| `SidebarGroupAction` | `icon` | `String` | optional trailing icon-only action |
| `SidebarGroupContent` | `className` | `String` | optional |
| `SidebarGroupCollapsible` | `label` | `String` | required; heading text on the toggle button |
| `SidebarGroupCollapsible` | `open` | `Boolean` | optional, controlled |
| `SidebarGroupCollapsible` | `defaultOpen` | `Boolean` | optional; defaults to `true` |
| `SidebarGroupCollapsible` | `onOpenChange` | `Function` | optional |
| `SidebarGroupCollapsible` | `className` | `String` | optional |
| `SidebarMenu` | `className` | `String` | optional; vertical list of `SidebarMenuItem` |
| `SidebarMenuItem` | `className` | `String` | optional |
| `SidebarMenuButton` | `href` | `String` | optional; renders `<a>` instead of `<button>` |
| `SidebarMenuButton` | `icon` | `String` | optional; leading `Icon` name |
| `SidebarMenuButton` | `active` | `Boolean` | optional; adds `aria-current="page"` |
| `SidebarMenuButton` | `isActive` | `Boolean` | shadcn alias for `active` |
| `SidebarMenuButton` | `variant` | `String` | `default` or `outline` |
| `SidebarMenuButton` | `size` | `String` | `sm`, `default`, or `lg` |
| `SidebarMenuButton` | `onClick` | `Function` | optional |
| `SidebarMenuAction` | `icon` | `String` | required; trailing icon-only action (e.g. `…`, `chevron-right`) |
| `SidebarMenuAction` | `aria-label` | `String` | optional |
| `SidebarMenuBadge` | `className` | `String` | optional |
| `SidebarMenuSkeleton` | `showIcon` | `Boolean` | optional |
| `SidebarMenuAction` | `onClick` | `Function` | optional |
| `SidebarMenuSub` | `className` | `String` | optional; indented nested `SidebarMenuButton` list |
| `SidebarMenuSubButton` | `href` | `String` | optional |
| `SidebarMenuSubItem` | `className` | `String` | optional |

See [Nodex UI Component](/index.html#/docs/guide/owl-components) for how to load `nodexui` and `dist/nodexui.templates.xml`.

## Static component

```base-ui
<div class="b-sidebar-demo-frame">
  <aside b-ui="sidebar" b-att-state="open">
    <div b-sidebar-header>
      <a href="#" class="b-sidebar-demo-brand">
        <span class="b-sidebar-demo-brand-mark"><span b-icon="gallery-vertical-end"></span></span>
        <span class="b-sidebar-demo-meta">
          <span class="b-sidebar-demo-title">Acme Inc</span>
          <span class="b-sidebar-demo-email">Enterprise</span>
        </span>
        <span class="b-sidebar-demo-chevrons" b-icon="chevrons-up-down"></span>
      </a>
    </div>

    <div b-sidebar-content>
      <div b-sidebar-group>
        <div b-sidebar-group-label>Platform</div>
        <ul b-sidebar-menu>
          <li b-sidebar-menu-item>
            <a b-sidebar-menu-button href="#">
              <span b-icon="square-terminal"></span>
              <span>Playground</span>
            </a>
            <button b-sidebar-menu-action type="button" aria-label="Toggle Playground">
              <span b-icon="chevron-right"></span>
            </button>
            <ul b-sidebar-menu-sub>
              <li b-sidebar-menu-sub-item><a b-sidebar-menu-sub-button href="#">History</a></li>
              <li b-sidebar-menu-sub-item><a b-sidebar-menu-sub-button href="#">Starred</a></li>
              <li b-sidebar-menu-sub-item><a b-sidebar-menu-sub-button href="#">Settings</a></li>
            </ul>
          </li>
          <li b-sidebar-menu-item>
            <a b-sidebar-menu-button href="#"><span b-icon="bot"></span><span>Models</span></a>
            <button b-sidebar-menu-action type="button" aria-label="Toggle Models"><span b-icon="chevron-right"></span></button>
          </li>
          <li b-sidebar-menu-item>
            <a b-sidebar-menu-button href="#"><span b-icon="book-open"></span><span>Documentation</span></a>
            <button b-sidebar-menu-action type="button" aria-label="Toggle Documentation"><span b-icon="chevron-right"></span></button>
          </li>
          <li b-sidebar-menu-item>
            <a b-sidebar-menu-button href="#"><span b-icon="settings-2"></span><span>Settings</span></a>
            <button b-sidebar-menu-action type="button" aria-label="Toggle Settings"><span b-icon="chevron-right"></span></button>
          </li>
        </ul>
      </div>
    </div>

    <div b-sidebar-footer>
      <a href="#" class="b-sidebar-demo-user">
        <span b-ui="avatar" class="b-sidebar-demo-avatar">SC</span>
        <span class="b-sidebar-demo-meta">
          <span class="b-sidebar-demo-title">shadcn</span>
          <span class="b-sidebar-demo-email">m@example.com</span>
        </span>
        <span class="b-sidebar-demo-chevrons" b-icon="chevrons-up-down"></span>
      </a>
    </div>
  </aside>
  <main class="b-sidebar-demo-main">
    <button class="b-sidebar-trigger" type="button" aria-label="Toggle Sidebar">
      <span b-icon="panel-left"></span>
    </button>
  </main>
</div>
```

State is reflected through `b-att-state="open|closed"`. Events: `nodexui:open`, `nodexui:close`.

Below 992px the sidebar is an off-canvas drawer closed by navigation; the `Shell` and `Sidebar` CSS and `matchMedia` checks share this breakpoint.
