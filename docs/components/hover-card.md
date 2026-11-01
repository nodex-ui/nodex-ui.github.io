# Hover Card

## Nodex UI component

```js
import { HoverCard, HoverCardContent, HoverCardTrigger } from "nodexui";
```

```base-ui
<div style="max-width: 28rem">
  <HoverCard>
    <HoverCardTrigger>
      <a href="https://thebase.vn" class="text-decoration-underline">@thebase</a>
    </HoverCardTrigger>
    <HoverCardContent className="'w-auto'">
      <div class="d-flex justify-content-between gap-3" style="width: 20rem">
        <div class="d-flex flex-column gap-1" style="min-width: 0">
          <h4 class="small fw-semibold mb-0">@thebase</h4>
          <p class="small mb-0">The React Framework – created and maintained by @vercel.</p>
          <div class="d-flex align-items-center pt-2">
            <span class="small text-muted">Joined December 2021</span>
          </div>
        </div>
      </div>
    </HoverCardContent>
  </HoverCard>
</div>
```

| Component | Prop | Type | Notes |
| --- | --- | --- | --- |
| `HoverCard` | `className` | `String` | optional |
| `HoverCardContent` | `className` | `String` | optional |
| `HoverCardTrigger` | `className` | `String` | optional |

See [Nodex UI Component](/examples/blocks.html#/docs/guide/owl-components) for how to load `nodexui` and `dist/nodexui.templates.xml`.

## Static component

```base-ui
<span b-ui="hover-card">
  <button b-hover-card-trigger type="button">Hover</button>
  <span b-hover-card-content>Contextual preview content.</span>
</span>
```
