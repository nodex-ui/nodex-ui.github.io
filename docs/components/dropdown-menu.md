# Dropdown Menu

Displays a menu to the user, such as a set of actions or functions, triggered by a button.

## Nodex UI component

```js
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuShortcut,
  DropdownMenuSub,
  DropdownMenuSubContent,
  DropdownMenuSubTrigger,
  DropdownMenuTrigger,
} from "nodexui";
```

```base-ui
<div style="max-width: 28rem">
  <DropdownMenu>
    <DropdownMenuTrigger>Open</DropdownMenuTrigger>
    <DropdownMenuContent className="'w-56'">
      <DropdownMenuLabel>My Account</DropdownMenuLabel>
      <DropdownMenuSeparator/>
      <DropdownMenuGroup>
        <DropdownMenuItem>Profile<DropdownMenuShortcut>⇧⌘P</DropdownMenuShortcut></DropdownMenuItem>
        <DropdownMenuItem>Billing<DropdownMenuShortcut>⌘B</DropdownMenuShortcut></DropdownMenuItem>
        <DropdownMenuItem>Settings<DropdownMenuShortcut>⌘S</DropdownMenuShortcut></DropdownMenuItem>
        <DropdownMenuItem>Keyboard shortcuts<DropdownMenuShortcut>⌘K</DropdownMenuShortcut></DropdownMenuItem>
      </DropdownMenuGroup>
      <DropdownMenuSeparator/>
      <DropdownMenuGroup>
        <DropdownMenuItem>Team</DropdownMenuItem>
        <DropdownMenuSub>
          <DropdownMenuSubTrigger>Invite users</DropdownMenuSubTrigger>
          <DropdownMenuSubContent>
            <DropdownMenuItem>Email</DropdownMenuItem>
            <DropdownMenuItem>Message</DropdownMenuItem>
            <DropdownMenuSeparator/>
            <DropdownMenuItem>More...</DropdownMenuItem>
          </DropdownMenuSubContent>
        </DropdownMenuSub>
        <DropdownMenuItem>New Team<DropdownMenuShortcut>⌘+T</DropdownMenuShortcut></DropdownMenuItem>
      </DropdownMenuGroup>
      <DropdownMenuSeparator/>
      <DropdownMenuItem>GitHub</DropdownMenuItem>
      <DropdownMenuItem>Support</DropdownMenuItem>
      <DropdownMenuItem disabled="true">API</DropdownMenuItem>
      <DropdownMenuSeparator/>
      <DropdownMenuItem variant="'destructive'">Log out</DropdownMenuItem>
    </DropdownMenuContent>
  </DropdownMenu>
</div>
```

| Component | Prop | Type | Notes |
| --- | --- | --- | --- |
| `DropdownMenu` | `className`, `state`, `onOpenChange` | `String`, `Function` | optional |
| `DropdownMenuContent` | `className`, `align`, `side`, `alignOffset`, `sideOffset` | `String`, `Number` | visual props are accepted for source parity |
| `DropdownMenuItem` | `className`, `inset`, `variant`, `disabled`, `onClick`, `onSelect` | `String`, `Boolean`, `Function` | `variant="destructive"` supported |
| `DropdownMenuCheckboxItem` | `checked`, `onCheckedChange` | `Boolean`, `Function` | optional |
| `DropdownMenuRadioGroup` | `value`, `onValueChange` | `String`, `Function` | optional |
| `DropdownMenuRadioItem` | `value` | `String` | optional |
| `DropdownMenuLabel`, `DropdownMenuShortcut`, `DropdownMenuSeparator`, `DropdownMenuGroup` | `className` | `String` | optional |

See [Nodex UI Component](/examples/blocks.html#/docs/guide/owl-components) for how to load `nodexui` and `dist/nodexui.templates.xml`.

## Static component

```base-ui
<div b-ui="dropdown-menu">
  <button b-ui="button" b-att-variant="outline" b-dropdown-trigger type="button">Open</button>
  <div b-dropdown-menu>
    <div b-dropdown-group>
      <div b-dropdown-label>My Account</div>
      <button type="button">Profile<span b-dropdown-shortcut>⇧⌘P</span></button>
      <button type="button">Billing<span b-dropdown-shortcut>⌘B</span></button>
      <button type="button">Settings<span b-dropdown-shortcut>⌘S</span></button>
    </div>
    <div b-dropdown-separator></div>
    <div b-dropdown-group>
      <button type="button">Team</button>
      <div b-dropdown-sub>
        <button b-dropdown-sub-trigger type="button">Invite users</button>
        <div b-dropdown-sub-content>
          <button type="button">Email</button>
          <button type="button">Message</button>
        </div>
      </div>
      <button type="button">New Team<span b-dropdown-shortcut>⌘+T</span></button>
    </div>
    <div b-dropdown-separator></div>
    <div b-dropdown-group>
      <button type="button">GitHub</button>
      <button type="button">Support</button>
      <div b-dropdown-label>API</div>
    </div>
    <div b-dropdown-separator></div>
    <button type="button">Log out<span b-dropdown-shortcut>⇧⌘Q</span></button>
  </div>
</div>
```

The trigger supports click, ArrowDown, and Escape. Root open/close is driven by a real `bootstrap.Dropdown` instance on the trigger (the panel carries the built-in `dropdown-menu`/`show` classes); submenus remain Nodex UI's own hover/click behavior. Events: `nodexui:open`, `nodexui:close` (Nodex UI), plus the underlying `show.bs.dropdown`/`shown.bs.dropdown`/`hide.bs.dropdown`/`hidden.bs.dropdown`.
