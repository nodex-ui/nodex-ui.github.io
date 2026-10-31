# Tabs

Matches [shadcn/the built-in Tabs](https://ui.shadcn.com/docs/components/base/tabs): `TabsList` renders
as a segmented pill control on a muted background by default, or a transparent underline list via
`variant="'line'"`. `TabContent`/`b-panel` render as bare panels with no default border or
background — a bordered/padded look is opt-in via `className` on `TabsContainer` (or the
consumer's own wrapper), not baked into every panel.

## Nodex UI component

```js
import { Tabs, TabContent, TabsContainer, TabsList, TabTrigger } from "nodexui";
```

```base-ui
<div style="max-width: 25rem" class="w-100">
  <Tabs defaultValue="'account'">
    <TabsList>
      <TabTrigger value="'account'">Account</TabTrigger>
      <TabTrigger value="'password'">Password</TabTrigger>
    </TabsList>
    <TabsContainer>
      <TabContent value="'account'">Make changes to your account here.</TabContent>
      <TabContent value="'password'">Change your password here.</TabContent>
    </TabsContainer>
  </Tabs>
</div>
```

The `"line"` variant swaps the segmented pill for a transparent, underline-driven list:

```base-ui
<div style="max-width: 25rem" class="w-100">
  <Tabs defaultValue="'overview'">
    <TabsList variant="'line'">
      <TabTrigger value="'overview'">Overview</TabTrigger>
      <TabTrigger value="'analytics'">Analytics</TabTrigger>
    </TabsList>
    <TabsContainer>
      <TabContent value="'overview'">View your dashboard metrics.</TabContent>
      <TabContent value="'analytics'">Detailed analytics and insights.</TabContent>
    </TabsContainer>
  </Tabs>
</div>
```

| Component | Prop | Type | Notes |
| --- | --- | --- | --- |
| `Tabs` | `value` | `String` | controlled active value |
| `Tabs` | `defaultValue` | `String` | initial value when uncontrolled |
| `Tabs` | `orientation` | `String` | `"horizontal"` (default) or `"vertical"` — puts `TabsList` beside `TabsContainer` instead of above it |
| `Tabs` | `onChange` | `Function` | called with the newly selected value |
| `TabsList` | `variant` | `String` | `"default"` (segmented pill, muted background) or `"line"` (transparent, underline indicator) |
| `TabTrigger` | `value` | `String` | required, matches a `TabContent value` |
| `TabTrigger` | `disabled` | `Boolean` | |
| `TabContent` | `value` | `String` | required |

ArrowLeft/ArrowRight (or ArrowUp/ArrowDown when vertical) move focus and selection between
`TabTrigger`s, same as the static API — each trigger's own live `bootstrap.Tab` instance handles
this natively. See [Nodex UI Component](/index.html#/docs/guide/owl-components) for how
to load `nodexui` and `dist/nodexui.templates.xml`.

Each `TabTrigger` (`b-tab` button / pure Nodex UI `TabTrigger`'s own root) is driven by a live `bootstrap.Tab` instance: it always carries `role="tab"` plus a `data-bs-target="#<id>"` pointing at its linked pane, and the library itself manages the pane's `tab-pane fade`/`show`/`active` classes and the trigger's `active`/`aria-selected`/`tabindex` across switches — don't rely on node removal to detect the active panel; every `TabContent`/`b-panel` stays mounted permanently (`role="tabpanel"`, `tab-pane fade` + `show active` on the initially active one).

## Static component

```base-ui
<div b-ui="tabs">
  <button b-tab="profile">Profile</button>
  <button b-tab="security">Security</button>
  <section b-panel="profile">Profile content</section>
  <section b-panel="security">Security content</section>
</div>
```

Add `b-att-variant="line"` on the `[b-ui="tabs"]` host for the transparent underline look instead
of the default segmented pill. `orientation` is a pure Nodex UI-only prop — the static markup lays
`[b-tab]`/`[b-panel]` flat as siblings with no `TabsList`/`TabsContainer`-equivalent grouping
wrapper to flip into a row/column pair.

Events: `nodexui:change` with `{ value }`.

Keyboard: Left and Right arrows move between tabs.
