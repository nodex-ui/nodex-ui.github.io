# Textarea

Native multiline text input with Nodex UI and built-in styling.

## Nodex UI component

```js
import { Textarea } from "nodexui";
```

```base-ui
<div class="d-flex flex-column gap-4" style="max-width: 28rem; width: 100%">
  <Textarea label="'Message'"/>

  <Textarea label="'Your message'" placeholder="'Type your message here.'" id="'message'"/>

  <Textarea label="'Your message'" supportingText="'Your message will be copied to the support team.'" maxLength="200"/>

  <Textarea label="'Your message'" errorText="'Message is required'"/>

  <div class="d-grid gap-2">
    <Textarea label="'Feedback'"/>
    <Button>Send message</Button>
  </div>

  <Textarea label="'Disabled'" placeholder="'Type your message here.'" disabled="true"/>
</div>
```

### Footer slot

The `footer` slot draws a bar along the bottom edge inside the field (counter on the left, send button on the right). `start` and `end` work as on [Input](/index.html#/docs/components/input).

```base-ui
<div style="max-width: 28rem" class="w-100 pt-3">
  <Textarea label="'Message'" rows="3">
    <t t-set-slot="footer"><span>0/280</span><Button size="'xs'">Send</Button></t>
  </Textarea>
</div>
```

### Help tooltip (`useTip`)

Set `useTip="1"` to move `supportingText` into a tooltip: a question-mark icon appears right after the label, in the same label box, and the text shows on hover or focus. Error text still shows under the field.

```base-ui
<div style="max-width: 28rem" class="w-100 pt-3">
  <Textarea label="'Your message'" supportingText="'Copied to the support team'" useTip="1"/>
</div>
```

| Component | Prop | Type | Notes |
| --- | --- | --- | --- |
| `Textarea` | `value` | `String` | optional |
| `Textarea` | `placeholder` | `String` | optional |
| `Textarea` | `rows` | `Number` | optional |
| `Textarea` | `disabled` | `Boolean` | optional |
| `Textarea` | `readonly` | `Boolean` | optional |
| `Textarea` | `resize` | `String` | optional |
| `Textarea` | `className` | `String` | optional |
| `Textarea` | `id` | `String` | optional, e.g. for `Label`'s `for` |
| `Textarea` | `onInput` | `Function` | optional |
| `Textarea` | `onChange` | `Function` | optional |
| `Textarea` | slots `start` / `end` / `footer` | slot | content drawn inside the box; `footer` sits along the bottom edge |
| `Textarea` | `label`, `supportingText`, `useTip`, `errorText`, `maxLength`, `invalid`, `placeholder` | `String` / `Boolean` | Material-style outlined field, same behaviour as [Input](/index.html#/docs/components/input): the label floats onto the border, `errorText` replaces `supportingText`. Also inherited from a parent `Field`. |

See [Nodex UI Component](/index.html#/docs/guide/owl-components) for how to load `nodexui` and `dist/nodexui.templates.xml`.

## Static component

```base-ui
<textarea b-ui="textarea" placeholder="Write a note"></textarea>
```

Options: `b-att-resize="none"`.

Accessibility: pair with a `<label>` and use `aria-describedby` for helper or error text.
