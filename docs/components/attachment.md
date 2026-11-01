# Attachment

Use `b-ui="attachment"` for a CDN-ready attachment card with media, metadata, upload state, and actions.

## CDN install requirements

Load the pinned Nodex UI CSS and JavaScript files; no extra dependency is required for this component.

## Nodex UI component

```js
import {
  Attachment,
  AttachmentAction,
  AttachmentActions,
  AttachmentContent,
  AttachmentDescription,
  AttachmentDropzone,
  AttachmentGroup,
  AttachmentMedia,
  AttachmentTitle,
  AttachmentTrigger,
} from "nodexui";
```

```base-ui
<div class="d-grid gap-3" style="max-width: 28rem; width: 100%">
  <AttachmentGroup className="'d-flex gap-3 overflow-auto pb-2'">
    <Attachment state="'done'" size="'sm'" orientation="'vertical'">
      <AttachmentMedia variant="'image'">
        <img src="https://images.unsplash.com/photo-1497366754035-f200968a6e72?auto=format&amp;fit=crop&amp;w=240&amp;q=80" alt="Workspace" class="w-100 h-100 object-fit-cover"/>
      </AttachmentMedia>
      <AttachmentContent>
        <AttachmentTitle>workspace.png</AttachmentTitle>
        <AttachmentDescription>PNG · 820 KB</AttachmentDescription>
      </AttachmentContent>
    </Attachment>
    <Attachment state="'done'" size="'sm'" orientation="'vertical'">
      <AttachmentMedia variant="'image'">
        <img src="https://images.unsplash.com/photo-1497366811353-6870744d04b2?auto=format&amp;fit=crop&amp;w=240&amp;q=80" alt="Desk" class="w-100 h-100 object-fit-cover"/>
      </AttachmentMedia>
      <AttachmentContent>
        <AttachmentTitle>desk-reference.jpg</AttachmentTitle>
        <AttachmentDescription>JPG · 1.1 MB</AttachmentDescription>
      </AttachmentContent>
    </Attachment>
    <Attachment state="'done'" size="'sm'" orientation="'vertical'">
      <AttachmentMedia variant="'image'">
        <img src="https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&amp;fit=crop&amp;w=240&amp;q=80" alt="Office" class="w-100 h-100 object-fit-cover"/>
      </AttachmentMedia>
      <AttachmentContent>
        <AttachmentTitle>office-reference.jpg</AttachmentTitle>
        <AttachmentDescription>JPG · 940 KB</AttachmentDescription>
      </AttachmentContent>
    </Attachment>
  </AttachmentGroup>
  <div class="d-grid gap-3">
    <Attachment state="'uploading'" className="'w-100'">
      <AttachmentMedia>
        <Icon name="'refresh-cw'"/>
      </AttachmentMedia>
      <AttachmentContent>
        <AttachmentTitle>sales-dashboard.pdf</AttachmentTitle>
        <AttachmentDescription>Uploading · 64%</AttachmentDescription>
      </AttachmentContent>
      <AttachmentActions>
        <AttachmentAction aria-label="'Remove sales-dashboard.pdf'">
          <Icon name="'x'"/>
        </AttachmentAction>
      </AttachmentActions>
    </Attachment>
    <Attachment state="'done'" className="'w-100'">
      <AttachmentMedia>
        <Icon name="'file-code'"/>
      </AttachmentMedia>
      <AttachmentContent>
        <AttachmentTitle>message-renderer.tsx</AttachmentTitle>
        <AttachmentDescription>TypeScript · 12 KB</AttachmentDescription>
      </AttachmentContent>
      <AttachmentActions>
        <AttachmentAction aria-label="'Remove message-renderer.tsx'">
          <Icon name="'x'"/>
        </AttachmentAction>
      </AttachmentActions>
      <AttachmentTrigger aria-label="'Open message-renderer.tsx'"/>
    </Attachment>
  </div>
</div>
```

```base-ui
<AttachmentGroup>
  <Attachment state="'done'" size="'sm'">
    <AttachmentMedia>PDF</AttachmentMedia>
    <AttachmentContent>
      <AttachmentTitle>sales-dashboard.pdf</AttachmentTitle>
      <AttachmentDescription>PDF · 2.4 MB</AttachmentDescription>
    </AttachmentContent>
    <AttachmentActions>
      <AttachmentAction aria-label="'Remove sales-dashboard.pdf'">×</AttachmentAction>
    </AttachmentActions>
    <AttachmentTrigger aria-label="'Open sales-dashboard.pdf'"/>
  </Attachment>
</AttachmentGroup>
```

| Component | Prop | Type | Notes |
| --- | --- | --- | --- |
| `Attachment` | `state` | `String` | `idle`, `uploading`, `processing`, `error`, `done` |
| `Attachment` | `size` | `String` | `default`, `sm`, `xs` |
| `Attachment` | `orientation` | `String` | `horizontal` or `vertical` |
| `Attachment` | `multiple` | `Boolean` | file picker fallback only |
| `Attachment` | `onChange` | `Function` | receives selected file array |
| `AttachmentMedia` | `variant` | `String` | `icon` or `image` |
| `AttachmentTrigger` | `href` | `String` | renders a link when provided |
| `AttachmentTrigger` | `aria-label` | `String` | label for the full-card target |
| `AttachmentAction` | `variant` | `String` | `default`, `secondary`, `destructive`, `outline`, `ghost`, `link`; defaults to `ghost` |
| `AttachmentAction` | `size` | `String` | button size such as `icon-xs`, `icon-sm`, `icon`; defaults to `icon-xs` |
| `AttachmentAction` | `aria-label` | `String` | label for icon-only actions |
| `AttachmentDropzone` | `multiple` | `Boolean` | allow multi-file selection |
| `AttachmentDropzone` | `disabled` | `Boolean` | disables click/drag/drop |
| `AttachmentDropzone` | `onFilesSelected` | `Function` | receives the picked/dropped `File[]` |

See [Nodex UI Component](/examples/blocks.html#/docs/guide/owl-components) for how to load `nodexui` and `dist/nodexui.templates.xml`.

## Static component

```base-ui
<div class="d-grid justify-content-center gap-3" style="min-height: 18rem">
  <div b-ui="attachment-group" aria-label="Image attachments">
    <div b-ui="attachment" b-att-orientation="vertical">
      <div b-attachment-media b-att-variant="image">
        <img src="https://images.unsplash.com/photo-1497366754035-f200968a6e72?auto=format&amp;fit=crop&amp;w=240&amp;q=80" alt="Workspace">
      </div>
      <div b-attachment-content>
        <div b-attachment-title>workspace.png</div>
        <div b-attachment-description>PNG · 820 KB</div>
      </div>
    </div>
    <div b-ui="attachment" b-att-orientation="vertical">
      <div b-attachment-media b-att-variant="image">
        <img src="https://images.unsplash.com/photo-1497366811353-6870744d04b2?auto=format&amp;fit=crop&amp;w=240&amp;q=80" alt="Desk">
      </div>
      <div b-attachment-content>
        <div b-attachment-title>desk-reference.jpg</div>
        <div b-attachment-description>JPG · 1.1 MB</div>
      </div>
    </div>
    <div b-ui="attachment" b-att-orientation="vertical">
      <div b-attachment-media b-att-variant="image">
        <img src="https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&amp;fit=crop&amp;w=240&amp;q=80" alt="Office">
      </div>
      <div b-attachment-content>
        <div b-attachment-title>office-reference.jpg</div>
        <div b-attachment-description>JPG · 940 KB</div>
      </div>
    </div>
  </div>
  <div class="d-grid gap-3" style="width: min(24rem, 100%)">
    <div b-ui="attachment" b-att-state="uploading" class="w-100">
      <div b-attachment-media>
        <span b-icon="refresh-cw"></span>
      </div>
      <div b-attachment-content>
        <div b-attachment-title>sales-dashboard.pdf</div>
        <div b-attachment-description>Uploading · 64%</div>
      </div>
      <div b-attachment-actions>
        <button b-attachment-action type="button" aria-label="Remove sales-dashboard.pdf">
          <span b-icon="x"></span>
        </button>
      </div>
    </div>
    <div b-ui="attachment" class="w-100">
      <div b-attachment-media>
        <span b-icon="file-code"></span>
      </div>
      <div b-attachment-content>
        <div b-attachment-title>message-renderer.tsx</div>
        <div b-attachment-description>TypeScript · 12 KB</div>
      </div>
      <div b-attachment-actions>
        <button b-attachment-action type="button" aria-label="Remove message-renderer.tsx">
          <span b-icon="x"></span>
        </button>
      </div>
    </div>
  </div>
</div>
```

For file picker behavior, keep an input inside the root:

```base-ui
<div b-ui="attachment">
  <input type="file" multiple>
  <ul b-attachment-list></ul>
</div>
```

Use `b-ui="attachment-group"` to lay out multiple attachments in a horizontally scrollable, snapping row.

## Dropzone

Use `b-ui="attachment-dropzone"` for a drag-and-drop upload target with a hidden file input, for building an upload flow (e.g. paired with `attachment`/`attachment-group` to render the resulting list). It only reports the picked/dropped files — the host page owns the actual upload request.

```base-ui
<div b-ui="attachment-dropzone">
  <input type="file" multiple hidden>
  <p>Drag and drop a file here, or click to browse.</p>
</div>
```

| Attribute | Notes |
| --- | --- |
| `multiple` | on the inner `input[type=file]`; allows multi-file selection. |
| `disabled` | on the inner `input[type=file]`; visually and functionally disables the zone. |

The dropzone emits `nodexui:change` with `{ files }` on drop, on file-input change, or on click-to-browse selection.

## Options and attributes

| Attribute | Values | Notes |
| --- | --- | --- |
| `b-att-state` | `idle`, `uploading`, `processing`, `error`, `done` | Adds upload-state styling; defaults to `done`. |
| `b-att-size` | `default`, `sm`, `xs` | Controls density. |
| `b-att-orientation` | `horizontal`, `vertical` | Vertical stacks media above content. |
| `b-att-variant` | `icon`, `image` | Use on `[b-attachment-media]`. |
| `b-attachment-trigger` | marker | Full-card button or link overlay. |
| `b-attachment-action` | marker | Compact ghost `icon-xs` action button; provide an `aria-label` when icon-only. |

## Events

The file picker fallback emits `nodexui:change` with `{ files }` from the root element.

## Accessibility behavior

Use real buttons or links for actions and triggers. Icon-only action buttons need a target-specific `aria-label`, and error attachments should include the failure reason in the description.
