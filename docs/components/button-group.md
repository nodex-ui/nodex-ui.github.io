# Button Group

Groups related buttons while preserving native button semantics.

## Nodex UI component

```js
import { ButtonGroup, ButtonGroupSeparator, ButtonGroupText } from "nodexui";
```

```base-ui
<div style="max-width: 32rem" class="w-100">
  <ButtonGroup>
    <ButtonGroup className="'d-none d-sm-flex'">
      <Button variant="'outline'" size="'icon'" ariaLabel="'Go Back'" icon="'arrow-left'"/>
    </ButtonGroup>
    <ButtonGroup>
      <Button variant="'outline'" label="'Archive'"/>
      <Button variant="'outline'" label="'Report'"/>
    </ButtonGroup>
    <ButtonGroup>
      <Button variant="'outline'" label="'Snooze'"/>
      <DropdownMenu>
        <DropdownMenuTrigger>
          <Icon name="'more-horizontal'"/>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="'end'" className="'w-52'">
          <DropdownMenuGroup>
            <DropdownMenuItem>
              <Icon name="'mail-check'"/>
              Mark as Read
            </DropdownMenuItem>
            <DropdownMenuItem>
              <Icon name="'archive'"/>
              Archive
            </DropdownMenuItem>
          </DropdownMenuGroup>
          <DropdownMenuSeparator/>
          <DropdownMenuGroup>
            <DropdownMenuItem>
              <Icon name="'clock'"/>
              Snooze
            </DropdownMenuItem>
            <DropdownMenuItem>
              <Icon name="'calendar-plus'"/>
              Add to Calendar
            </DropdownMenuItem>
            <DropdownMenuItem>
              <Icon name="'list-filter'"/>
              Add to List
            </DropdownMenuItem>
            <DropdownMenuSub>
              <DropdownMenuSubTrigger>
                <Icon name="'tag'"/>
                Label As...
              </DropdownMenuSubTrigger>
              <DropdownMenuSubContent>
                <DropdownMenuRadioGroup value="'personal'">
                  <DropdownMenuRadioItem value="'personal'">Personal</DropdownMenuRadioItem>
                  <DropdownMenuRadioItem value="'work'">Work</DropdownMenuRadioItem>
                  <DropdownMenuRadioItem value="'other'">Other</DropdownMenuRadioItem>
                </DropdownMenuRadioGroup>
              </DropdownMenuSubContent>
            </DropdownMenuSub>
          </DropdownMenuGroup>
          <DropdownMenuSeparator/>
          <DropdownMenuGroup>
            <DropdownMenuItem variant="'destructive'">
              <Icon name="'trash-2'"/>
              Trash
            </DropdownMenuItem>
          </DropdownMenuGroup>
        </DropdownMenuContent>
      </DropdownMenu>
    </ButtonGroup>
  </ButtonGroup>
</div>
```

| Component | Prop | Type | Notes |
| --- | --- | --- | --- |
| `ButtonGroup` | `orientation` | `String` | optional |
| `ButtonGroup` | `size` | `String` | optional |
| `ButtonGroup` | `aria-label` | `String` | optional accessible label |
| `ButtonGroup` | `aria-labelledby` | `String` | optional visible label reference |
| `ButtonGroup` | `className` | `String` | optional |
| `ButtonGroupSeparator` | `orientation` | `String` | `vertical` by default |
| `ButtonGroupSeparator` | `className` | `String` | optional |
| `ButtonGroupText` | `className` | `String` | optional |

See [Nodex UI Component](/index.html#/docs/guide/owl-components) for how to load `nodexui` and `dist/nodexui.templates.xml`.

## Static component

```base-ui
<div b-ui="button-group" aria-label="View mode">
  <button b-ui="button" b-att-variant="outline">Day</button>
  <button b-ui="button" b-att-variant="outline">Week</button>
</div>
```

Options: `b-att-orientation="horizontal|vertical"`, `b-att-size="sm|lg"`.

Use `b-button-group-separator` to divide filled/split actions and `b-button-group-text` for inline label text:

```base-ui
<div b-ui="button-group" aria-label="Archive actions">
  <button b-ui="button">Archive</button>
  <span b-button-group-separator></span>
  <button b-ui="button" b-att-size="icon" aria-label="More actions">...</button>
</div>

<div b-ui="button-group">
  <span b-button-group-text>Search</span>
  <input b-ui="input" placeholder="Messages">
  <button b-ui="button" b-att-variant="outline">Go</button>
</div>
```

Accessibility: provide an `aria-label` or visible label for the group.
