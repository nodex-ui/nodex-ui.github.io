# Item

## Nodex UI component

```js
import { Item } from "nodexui";
```

```base-ui
<div class="d-flex flex-column gap-4 w-100" style="max-width: 28rem">
  <Item variant="'outline'">
    <span b-item-media="'icon'">
      <Icon name="'badge-check'"/>
    </span>
    <span b-item-content="">
      <strong b-item-title="">Your profile has been verified.</strong>
    </span>
    <span b-item-actions="">
      <Button variant="'ghost'" size="'sm'">
        <Icon name="'chevron-right'"/>
      </Button>
    </span>
  </Item>

  <div b-item-group="">
    <Item>
      <span b-item-media="">JD</span>
      <span b-item-content="">
        <strong b-item-title="">John Doe</strong>
        <span b-item-description="">john.doe@example.com</span>
      </span>
    </Item>
    <div b-item-separator=""></div>
    <Item>
      <span b-item-media="">AS</span>
      <span b-item-content="">
        <strong b-item-title="">Alice Smith</strong>
        <span b-item-description="">alice.smith@example.com</span>
      </span>
    </Item>
    <div b-item-separator=""></div>
    <Item>
      <span b-item-media="">RB</span>
      <span b-item-content="">
        <strong b-item-title="">Robert Brown</strong>
        <span b-item-description="">robert.brown@example.com</span>
      </span>
    </Item>
  </div>
</div>
```

| Component | Prop | Type | Notes |
| --- | --- | --- | --- |
| `Item` | `className` | `String` | optional |

See [Nodex UI Component](/index.html#/docs/guide/owl-components) for how to load `nodexui` and `dist/nodexui.templates.xml`.

## Static component

```base-ui
<div b-item-group>
  <div b-ui="item">
    <span b-item-media>BU</span>
    <span b-item-content>
      <strong b-item-title>NodexUI</strong>
      <span b-item-description>CDN-ready shadcn-style components.</span>
    </span>
    <span b-item-actions>
      <button b-ui="button" b-att-variant="outline" type="button">Open</button>
    </span>
  </div>
</div>
```
