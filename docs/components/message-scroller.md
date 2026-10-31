# Message Scroller

Use `b-ui="message-scroller"` for a CDN-ready message scroller component.

## CDN install requirements

Load the pinned Nodex UI CSS and JavaScript files; no extra dependency is required for this component.

## Nodex UI component

```js
import { MessageScroller } from "nodexui";
```

```base-ui
<div class="w-100" style="max-width: 28rem">
  <Card className="'p-0 overflow-hidden'">
    <CardHeader className="'border-bottom p-3'">
      <CardTitle>Support chat</CardTitle>
      <CardDescription>Demo is read only. Press send to start a new conversation.</CardDescription>
    </CardHeader>
    <div style="height: 22rem">
      <MessageScroller className="'h-100 p-3'">
        <Message>Hi! How can I help you today?</Message>
        <Message side="'outgoing'">I'm trying to add auto-scroll to my chat UI.</Message>
        <Message>Wrap your messages in a MessageScroller and it will scroll to the newest content automatically.</Message>
        <Message side="'outgoing'">Does it still let me scroll up to read older messages?</Message>
        <Message>Yes, you can scroll away freely while it's not actively streaming new content.</Message>
        <Message side="'outgoing'">That's exactly what I needed, thanks!</Message>
      </MessageScroller>
    </div>
    <CardFooter className="'border-top p-3'">
      <Textarea placeholder="'Type your message...'" rows="1" className="'w-100'">
        <t t-set-slot="footer"><span/><Button size="'icon-xs'" ariaLabel="'Send'"><Icon name="'arrow-up'"/></Button></t>
      </Textarea>
    </CardFooter>
  </Card>
</div>
```

| Component | Prop | Type | Notes |
| --- | --- | --- | --- |
| `MessageScroller` | `autoscroll` | `Boolean` | optional |
| `MessageScroller` | `className` | `String` | optional |

See [Nodex UI Component](/index.html#/docs/guide/owl-components) for how to load `nodexui` and `dist/nodexui.templates.xml`.

## Static component

```base-ui
<div b-ui="message-scroller">Message Scroller</div>
```

## Enhanced usage

Call `thebase.mount(element)` or rely on `thebase.mountAll()` after the script loads.

## Options and attributes

See `dist/nodexui.registry.json` for the supported attribute list.

## Methods

Use the global runtime methods: `thebase.mount()`, `thebase.mountAll()`, and `thebase.destroy()`.

## Events

Interactive components emit documented `nodexui:*` events from their root element. Static components do not emit events.

## CSS variables

The component inherits Nodex UI semantic tokens such as `--b-surface`, `--b-border`, `--b-primary`, and `--b-radius`.

## Accessibility behavior

The component preserves authored semantic HTML and adds ARIA roles or state attributes where enhancement is required.

## Examples

See `examples/index.html` for a working CDN-style page.

## Browser support

Nodex UI targets modern evergreen browsers that support ES modules, CSS variables.

## Test checklist

Verify light and dark themes, keyboard access for focusable controls, disabled or readonly states when applicable, and cleanup through `thebase.destroy()`.
