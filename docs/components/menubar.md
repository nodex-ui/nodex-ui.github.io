# Menubar

## Nodex UI component

```js
import { Menubar } from "nodexui";
```

```base-ui
<Menubar>
  <DropdownMenu>
    <DropdownMenuTrigger>File</DropdownMenuTrigger>
    <DropdownMenuContent align="'start'">
      <DropdownMenuGroup>
        <DropdownMenuItem>New Tab <DropdownMenuShortcut>⌘T</DropdownMenuShortcut></DropdownMenuItem>
        <DropdownMenuItem>New Window <DropdownMenuShortcut>⌘N</DropdownMenuShortcut></DropdownMenuItem>
        <DropdownMenuItem disabled="true">New Incognito Window</DropdownMenuItem>
      </DropdownMenuGroup>
      <DropdownMenuSeparator/>
      <DropdownMenuSub>
        <DropdownMenuSubTrigger>Share</DropdownMenuSubTrigger>
        <DropdownMenuSubContent>
          <DropdownMenuItem>Email link</DropdownMenuItem>
          <DropdownMenuItem>Messages</DropdownMenuItem>
          <DropdownMenuItem>Notes</DropdownMenuItem>
        </DropdownMenuSubContent>
      </DropdownMenuSub>
      <DropdownMenuSeparator/>
      <DropdownMenuItem>Print <DropdownMenuShortcut>⌘P</DropdownMenuShortcut></DropdownMenuItem>
    </DropdownMenuContent>
  </DropdownMenu>

  <DropdownMenu>
    <DropdownMenuTrigger>Edit</DropdownMenuTrigger>
    <DropdownMenuContent align="'start'">
      <DropdownMenuGroup>
        <DropdownMenuItem>Undo <DropdownMenuShortcut>⌘Z</DropdownMenuShortcut></DropdownMenuItem>
        <DropdownMenuItem>Redo <DropdownMenuShortcut>⇧⌘Z</DropdownMenuShortcut></DropdownMenuItem>
      </DropdownMenuGroup>
      <DropdownMenuSeparator/>
      <DropdownMenuSub>
        <DropdownMenuSubTrigger>Find</DropdownMenuSubTrigger>
        <DropdownMenuSubContent>
          <DropdownMenuItem>Search the web</DropdownMenuItem>
          <DropdownMenuSeparator/>
          <DropdownMenuItem>Find...</DropdownMenuItem>
          <DropdownMenuItem>Find Next</DropdownMenuItem>
          <DropdownMenuItem>Find Previous</DropdownMenuItem>
        </DropdownMenuSubContent>
      </DropdownMenuSub>
      <DropdownMenuSeparator/>
      <DropdownMenuItem>Cut</DropdownMenuItem>
      <DropdownMenuItem>Copy</DropdownMenuItem>
      <DropdownMenuItem>Paste</DropdownMenuItem>
    </DropdownMenuContent>
  </DropdownMenu>

  <DropdownMenu>
    <DropdownMenuTrigger>View</DropdownMenuTrigger>
    <DropdownMenuContent align="'start'">
      <DropdownMenuCheckboxItem checked="false">Always Show Bookmarks Bar</DropdownMenuCheckboxItem>
      <DropdownMenuCheckboxItem checked="true">Always Show Full URLs</DropdownMenuCheckboxItem>
      <DropdownMenuSeparator/>
      <DropdownMenuItem inset="true">Reload <DropdownMenuShortcut>⌘R</DropdownMenuShortcut></DropdownMenuItem>
      <DropdownMenuItem disabled="true" inset="true">Force Reload <DropdownMenuShortcut>⇧⌘R</DropdownMenuShortcut></DropdownMenuItem>
      <DropdownMenuSeparator/>
      <DropdownMenuItem inset="true">Toggle Fullscreen</DropdownMenuItem>
      <DropdownMenuSeparator/>
      <DropdownMenuItem inset="true">Hide Sidebar</DropdownMenuItem>
    </DropdownMenuContent>
  </DropdownMenu>

  <DropdownMenu>
    <DropdownMenuTrigger>Profiles</DropdownMenuTrigger>
    <DropdownMenuContent align="'start'">
      <DropdownMenuRadioGroup value="'benoit'">
        <DropdownMenuRadioItem value="'andy'">Andy</DropdownMenuRadioItem>
        <DropdownMenuRadioItem value="'benoit'">Benoit</DropdownMenuRadioItem>
        <DropdownMenuRadioItem value="'luis'">Luis</DropdownMenuRadioItem>
      </DropdownMenuRadioGroup>
      <DropdownMenuSeparator/>
      <DropdownMenuItem inset="true">Edit...</DropdownMenuItem>
      <DropdownMenuSeparator/>
      <DropdownMenuItem inset="true">Add Profile... <DropdownMenuShortcut>⌘+T</DropdownMenuShortcut></DropdownMenuItem>
    </DropdownMenuContent>
  </DropdownMenu>
</Menubar>
```

| Component | Prop | Type | Notes |
| --- | --- | --- | --- |
| `Menubar` | `className` | `String` | optional |

See [Nodex UI Component](/examples/blocks.html#/docs/guide/owl-components) for how to load `nodexui` and `dist/nodexui.templates.xml`.

## Static component

```base-ui
<nav b-ui="menubar">
  <button type="button">File</button>
  <button type="button">Edit</button>
</nav>
```
