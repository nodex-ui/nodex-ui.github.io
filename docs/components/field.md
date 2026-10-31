# Field

Combine labels, controls, and help text to compose accessible form fields and grouped inputs.

## Nodex UI component

```js
import {
  Field,
  FieldContent,
  FieldDescription,
  FieldError,
  FieldGroup,
  FieldLabel,
  FieldLegend,
  FieldSeparator,
  FieldSet,
  FieldTitle,
} from "nodexui";
```

```base-ui
<form class="d-flex flex-column gap-3" style="max-width: 32rem; width: 100%;">
  <FieldSet>
    <FieldLegend>Payment Method</FieldLegend>
    <FieldDescription>All transactions are secure and encrypted</FieldDescription>
    <FieldGroup className="'mt-3 gap-3 d-flex flex-column'">
      <Field label="'Name on Card'">
        <Input id="'card-name'" value="'Evil Rabbit'"/>
      </Field>

      <Field label="'Card Number'" description="'Enter your 16-digit card number'">
        <Input id="'card-number'" value="'1234 5678 9012 3456'" leadingIcon="'credit-card'"/>
      </Field>

      <div class="row g-3">
        <div class="col-4">
          <Field label="'Month'">
            <NativeSelect id="'expiry-month'">
              <option>MM</option>
            </NativeSelect>
          </Field>
        </div>
        <div class="col-4">
          <Field label="'Year'">
            <NativeSelect id="'expiry-year'">
              <option>YYYY</option>
            </NativeSelect>
          </Field>
        </div>
        <div class="col-4">
          <Field label="'CVV'">
            <Input id="'card-cvv'" value="'123'"/>
          </Field>
        </div>
      </div>

      <FieldSeparator/>

      <FieldSet>
        <FieldLegend>Billing Address</FieldLegend>
        <FieldDescription>The billing address associated with your payment method</FieldDescription>
        <Field orientation="'horizontal'" className="'mt-3'">
          <Checkbox id="'same-address'" checked="true"/>
          <FieldLabel for="'same-address'">Same as shipping address</FieldLabel>
        </Field>
      </FieldSet>

      <Field label="'Comments'">
        <Textarea id="'comments'" placeholder="'Add any additional comments'" rows="3"/>
      </Field>
    </FieldGroup>
  </FieldSet>

  <div class="d-flex gap-2">
    <Button type="'submit'">Submit</Button>
    <Button variant="'outline'" type="'button'">Cancel</Button>
  </div>
</form>
```

### Outlined controls

`Field` accepts `label`, `labelBackground`, `description`, `useTip` (1 = show the description in a tooltip), `error` and `invalid`, and hands them to the control inside it. `Input`, `Textarea`, `NativeSelect`, `Select`, `Combobox` and `DatePicker` draw them in the Material outlined style (floating label, helper text, error text and icon). A control's own `label`/`supportingText`/`errorText` props win over the `Field` values.

```base-ui
<div class="d-grid gap-4" style="max-width: 28rem; width: 100%">
  <Field label="'Email'" description="'We never share it'"><Input leadingIcon="'mail'"/></Field>
  <Field label="'Bio'" error="'Too short'"><Textarea/></Field>
</div>
```

```base-ui
<div style="max-width: 28rem; width: 100%">
  <Field label="'Email'" description="'We never share it'" useTip="1"><Input leadingIcon="'mail'"/></Field>
</div>
```

With `useTip="1"` on `Field`, the description moves into a tooltip on a question-mark icon right after the label, as above.

Use one control per labelled `Field`. For checkboxes, radios and switches keep `FieldLabel` and `FieldDescription`; `Field`'s `label` prop no longer renders a standalone label.

## Static component

```base-ui
<form style="width: 560px; max-width: 100%; display: flex; flex-direction: column; gap: 24px;">
  <div b-ui="field" b-att-slot="field-set">
    <div b-field-legend>Payment Method</div>
    <p b-field-description>All transactions are secure and encrypted</p>

    <div b-field-group style="margin-top: 24px;">
      <div b-ui="field">
        <label b-field-label for="card-name">Name on Card</label>
        <input b-ui="input" id="card-name" value="Evil Rabbit">
      </div>

      <div b-ui="field">
        <label b-field-label for="card-number">Card Number</label>
        <input b-ui="input" id="card-number" value="1234 5678 9012 3456">
        <p b-field-description>Enter your 16-digit card number</p>
      </div>

      <div style="display: grid; grid-template-columns: repeat(3, minmax(0, 1fr)); gap: 20px;">
        <div b-ui="field">
          <label b-field-label for="expiry-month">Month</label>
          <select b-ui="native-select" id="expiry-month" aria-label="Month">
            <option>MM</option>
          </select>
        </div>
        <div b-ui="field">
          <label b-field-label for="expiry-year">Year</label>
          <select b-ui="native-select" id="expiry-year" aria-label="Year">
            <option>YYYY</option>
          </select>
        </div>
        <div b-ui="field">
          <label b-field-label for="card-cvv">CVV</label>
          <input b-ui="input" id="card-cvv" value="123">
        </div>
      </div>

      <div b-field-separator></div>

      <div b-ui="field" b-att-slot="field-set">
        <div b-field-legend>Billing Address</div>
        <p b-field-description>The billing address associated with your payment method</p>
        <div b-ui="field" b-att-orientation="horizontal" style="margin-top: 18px;">
          <input b-ui="checkbox" id="same-address" type="checkbox" checked>
          <label b-field-label for="same-address">Same as shipping address</label>
        </div>
      </div>

      <div b-ui="field">
        <label b-field-label for="comments">Comments</label>
        <textarea b-ui="textarea" id="comments" placeholder="Add any additional comments" rows="3"></textarea>
      </div>
    </div>
  </div>

  <div style="display: flex; gap: 8px;">
    <button b-ui="button" type="submit">Submit</button>
    <button b-ui="button" b-att-variant="outline" type="button">Cancel</button>
  </div>
</form>
```

## Static API details

Use `b-ui="field"` for a field wrapper. Add `b-att-slot="field-set"` for `fieldset` roots, `b-field-group`, `b-field-label`, `b-field-description`, `b-field-separator`, and `b-field-error` for compound parts.

## Accessibility

`Field` renders `role="group"`. Connect labels with `for`/`id`, and place `FieldError` near the invalid control so `aria-describedby` can be wired by the static adapter.
