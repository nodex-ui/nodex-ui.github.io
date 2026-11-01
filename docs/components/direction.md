# Direction

## Nodex UI component

```js
import { Direction } from "nodexui";
```

```base-ui
<div style="max-width: 26rem" class="w-100">
  <Direction dir="'rtl'" className="'w-100'">
    <Card className="'w-100'">
      <CardHeader>
        <div class="d-flex align-items-center justify-content-between mb-2">
          <Select defaultValue="'ar'">
            <SelectTrigger className="'w-auto'">Arabic (العربية)</SelectTrigger>
            <SelectContent>
              <SelectItem value="'en'">English</SelectItem>
              <SelectItem value="'ar'">Arabic (العربية)</SelectItem>
            </SelectContent>
          </Select>
        </div>
        <CardTitle>تسجيل الدخول إلى حسابك</CardTitle>
        <CardDescription>أدخل بريدك الإلكتروني أدناه لتسجيل الدخول إلى حسابك</CardDescription>
      </CardHeader>
      <CardBody>
        <div class="d-flex flex-column gap-3">
          <Field>
            <FieldLabel>البريد الإلكتروني</FieldLabel>
            <Input type="'email'" placeholder="'m@example.com'"/>
          </Field>
          <Field>
            <div class="d-flex align-items-center justify-content-between">
              <FieldLabel>كلمة المرور</FieldLabel>
              <a href="#" class="small text-decoration-underline">نسيت كلمة المرور؟</a>
            </div>
            <Input type="'password'"/>
          </Field>
          <Button className="'w-100'">تسجيل الدخول</Button>
          <Button variant="'outline'" className="'w-100'" icon="'globe'">تسجيل الدخول باستخدام Google</Button>
        </div>
        <p class="text-center small mb-0 mt-3">ليس لديك حساب؟ <a href="#" class="text-decoration-underline">إنشاء حساب</a></p>
      </CardBody>
    </Card>
  </Direction>
</div>
```

| Component | Prop | Type | Notes |
| --- | --- | --- | --- |
| `Direction` | `dir` | `String` | optional |
| `Direction` | `className` | `String` | optional |

See [Nodex UI Component](/examples/blocks.html#/docs/guide/owl-components) for how to load `nodexui` and `dist/nodexui.templates.xml`.

## Static component

```base-ui
<div b-ui="direction" b-att-dir="rtl">
  Right-to-left content
</div>
```
