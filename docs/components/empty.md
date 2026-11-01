# Empty

Use `b-ui="empty"` for an accessible empty state. The component mirrors shadcn's Base Empty composition: header, media, title, description, and content.

## Nodex UI component

```js
import {
  Empty,
  EmptyContent,
  EmptyDescription,
  EmptyHeader,
  EmptyMedia,
  EmptyTitle,
} from "nodexui";
```

```base-ui
<div style="max-width: 28rem" class="w-100">
  <Empty>
    <EmptyHeader>
      <EmptyMedia variant="'icon'">
        <Icon name="'folder-code'"/>
      </EmptyMedia>
      <EmptyTitle>No Projects Yet</EmptyTitle>
      <EmptyDescription>You haven't created any projects yet. Get started by creating your first project.</EmptyDescription>
    </EmptyHeader>
    <EmptyContent>
      <div class="d-flex gap-2">
        <Button label="'Create Project'"/>
        <Button variant="'outline'" label="'Import Project'"/>
      </div>
    </EmptyContent>
  </Empty>
</div>
```

| Component | Prop | Type | Notes |
| --- | --- | --- | --- |
| `Empty` | `variant` | `String` | `default`, `outline`, `background` |
| `Empty` | `className` | `String` | optional |
| `EmptyHeader` | `className` | `String` | optional |
| `EmptyMedia` | `variant` | `String` | `default`, `icon` |
| `EmptyMedia` | `className` | `String` | optional |
| `EmptyTitle` | `className` | `String` | optional |
| `EmptyDescription` | `className` | `String` | optional |
| `EmptyContent` | `className` | `String` | optional |

See [Nodex UI Component](/examples/blocks.html#/docs/guide/owl-components) for how to load `nodexui` and `dist/nodexui.templates.xml`.

## Static component

```base-ui
<div b-ui="empty" b-att-variant="outline">
  <div b-empty-header>
    <span b-empty-media b-att-variant="icon" b-icon="inbox"></span>
    <div b-empty-title>No results</div>
    <div b-empty-description>Try changing your filters.</div>
  </div>
  <div b-empty-content>
    <button b-ui="button">Create record</button>
  </div>
</div>
```

Nodex UI sets `role="status"` by default. Use `b-att-variant="outline"` for a dashed container and `b-att-variant="background"` for a muted panel; avatar, avatar-group, and RTL states are composed by placing those components inside `b-empty-media` or `b-empty-content`.
