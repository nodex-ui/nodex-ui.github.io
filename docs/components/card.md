# Card

## Nodex UI component

```js
import { Card, CardBody, CardDescription, CardFooter, CardHeader, CardTitle } from "nodexui";
```

```base-ui
<div style="max-width: 24rem" class="w-100">
  <Card>
    <CardHeader>
      <CardTitle>Login to your account</CardTitle>
      <CardDescription>Enter your email below to login to your account</CardDescription>
    </CardHeader>
    <CardBody>
      <div class="d-flex flex-column gap-3">
        <div class="d-flex flex-column gap-2">
          <Label htmlFor="'email'">Email</Label>
          <Input id="'email'" type="'email'" placeholder="'m@example.com'"/>
        </div>
        <div class="d-flex flex-column gap-2">
          <Label htmlFor="'password'">Password</Label>
          <Input id="'password'" type="'password'"/>
        </div>
      </div>
    </CardBody>
    <CardFooter className="'d-flex flex-column'">
      <Button className="'w-100'">Login</Button>
    </CardFooter>
  </Card>
</div>
```

`Card`, `CardHeader`, `CardBody`, `CardFooter`, `CardTitle`, and `CardDescription` each accept `className` (`String`, optional) and render their default slot as-is. `Card` additionally accepts `tag` (`String`, optional, default `"div"`) to render a different semantic root element, e.g. `tag="'aside'"` for complementary content. See [Nodex UI Component](/examples/blocks.html#/docs/guide/owl-components) for how to load `nodexui` and `dist/nodexui.templates.xml`.

## Static component

```base-ui
<div b-ui="card">
  <div b-card-header>Title</div>
  <div b-card-body>Content</div>
  <div b-card-footer>Footer</div>
</div>
```

Cards are static and work without JavaScript for layout styling after CSS loads.
