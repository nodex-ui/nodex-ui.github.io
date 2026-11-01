# Accordion

Use `b-ui="accordion"` for grouped disclosure panels.

## Nodex UI component

```js
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "nodexui";
```

```base-ui
<div style="max-width: 28rem" class="w-100">
  <Accordion>
    <AccordionItem value="'item-1'" state="'open'">
      <AccordionTrigger>Is it accessible?</AccordionTrigger>
      <AccordionContent>Yes. It adheres to the WAI-ARIA design pattern.</AccordionContent>
    </AccordionItem>
    <AccordionItem value="'item-2'">
      <AccordionTrigger>Is it styled?</AccordionTrigger>
      <AccordionContent>Yes. It comes with default styles you can customize.</AccordionContent>
    </AccordionItem>
    <AccordionItem value="'item-3'">
      <AccordionTrigger>Is it animated?</AccordionTrigger>
      <AccordionContent>Yes. It's animated by default, but you can disable it.</AccordionContent>
    </AccordionItem>
  </Accordion>
</div>
```

| Component | Prop | Type | Notes |
| --- | --- | --- | --- |
| `Accordion` | `multiple` | `Boolean` | optional |
| `Accordion` | `onChange` | `Function` | optional |
| `Accordion` | `className` | `String` | optional |
| `AccordionContent` | `className` | `String` | optional |
| `AccordionItem` | `value` | `String` | required |
| `AccordionItem` | `className` | `String` | optional |
| `AccordionTrigger` | `className` | `String` | optional |

See [Nodex UI Component](/examples/blocks.html#/docs/guide/owl-components) for how to load `nodexui` and `dist/nodexui.templates.xml`.

## Static component

```base-ui
<div b-ui="accordion">
  <div b-accordion-item b-att-state="open">
    <button b-accordion-trigger type="button">
      What are your shipping options?
      <span b-icon="chevron-down" class="b-accordion-trigger-icon"></span>
    </button>
    <div b-accordion-panel>We offer standard (5-7 days), express (2-3 days), and overnight shipping. Free shipping on international orders.</div>
  </div>
  <div b-accordion-item>
    <button b-accordion-trigger type="button">
      What is your return policy?
      <span b-icon="chevron-down" class="b-accordion-trigger-icon"></span>
    </button>
    <div b-accordion-panel>Returns are accepted within 30 days of delivery, provided the item is unused and in its original packaging.</div>
  </div>
  <div b-accordion-item>
    <button b-accordion-trigger type="button">
      How can I contact customer support?
      <span b-icon="chevron-down" class="b-accordion-trigger-icon"></span>
    </button>
    <div b-accordion-panel>Reach us by email, live chat, or phone — support is available seven days a week.</div>
  </div>
</div>
```

Options: `b-att-multiple="true"` allows more than one item to stay open. Events: `nodexui:change`. Keyboard: buttons use native activation and focus behavior. The static adapter only wires ARIA/toggle behavior onto author-provided markup — add your own trailing chevron icon (`b-icon="chevron-down" class="b-accordion-trigger-icon"`) inside the trigger for the rotating-chevron look the pure Nodex UI `AccordionTrigger` renders automatically, and set `b-att-state="open"` on an item to have it expanded by default.

Each panel (`b-accordion-panel` / `AccordionContent`'s root) is driven by its own live `bootstrap.Collapse` instance: it always carries the built-in `collapse` class (plus `show` while open), and the library itself manages the `collapsing`/height transition and the `show` class across toggles — don't rely on `hidden`/node removal to detect open state. In single-open mode (the default, without `multiple`), opening one item hides every other open item's own `bootstrap.Collapse` instance before showing the clicked item's.
