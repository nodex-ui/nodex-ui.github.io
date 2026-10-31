# Form

Build an accessible Bug Report form with Nodex UI `Field` layout, Nodex UI `Button` actions, and Nodex `t-model` input bindings.

## Nodex UI component

```js
import { Component, useState, xml } from "nodexui";
import {
  Button,
  Field,
  FieldDescription,
  FieldGroup,
  FieldLabel,
} from "nodexui";

class BugReportExample extends Component {
  static components = {
    Button,
    Field,
    FieldDescription,
    FieldGroup,
    FieldLabel,
  };
  static template = xml`
    <form class="b-form" data-slot="form" novalidate="novalidate" t-on-submit="submit">
      <div class="b-form-header">
        <h3 class="b-form-title">Bug Report</h3>
        <p class="b-form-description">Help us improve by reporting bugs you encounter.</p>
      </div>

      <FieldGroup className="'b-form-fields'">
        <Field>
          <FieldLabel for="'bug-title'">Bug Title</FieldLabel>
          <input
            id="bug-title"
            name="title"
            class="form-control b-form-control"
            type="text"
            placeholder="Login button not working on mobile"
            autocomplete="off"
            t-model="state.title"
          />
        </Field>

        <Field>
          <FieldLabel for="'bug-description'">Description</FieldLabel>
          <div class="b-form-input-group" data-slot="input-group" role="group">
            <textarea
              id="bug-description"
              name="description"
              class="form-control b-form-textarea"
              placeholder="I'm having an issue with the login button on mobile."
              maxlength="100"
              rows="6"
              t-model="state.description"
            ></textarea>
            <div class="b-form-counter" data-slot="input-group-addon" data-align="block-end">
              <span class="b-form-counter-text">
                <t t-esc="state.description.length"/>/100 characters
              </span>
            </div>
          </div>
          <FieldDescription>Include steps to reproduce, expected behavior, and what actually happened.</FieldDescription>
        </Field>
      </FieldGroup>

      <Field orientation="'horizontal'" className="'b-form-actions'">
        <Button type="'button'" variant="'outline'" onClick="() => this.reset()">Reset</Button>
        <Button type="'submit'">Submit</Button>
      </Field>
    </form>
  `;

  setup() {
    this.state = useState({
      title: "",
      description: "",
    });
  }

  reset() {
    this.state.title = "";
    this.state.description = "";
  }

  submit(event) {
    event.preventDefault();
    console.log({
      title: this.state.title,
      description: this.state.description,
    });
  }
}
```

```base-ui
<form class="b-form" data-slot="form" novalidate="novalidate" t-on-submit="submit">
  <div class="b-form-header">
    <h3 class="b-form-title">Bug Report</h3>
    <p class="b-form-description">Help us improve by reporting bugs you encounter.</p>
  </div>

  <FieldGroup className="'b-form-fields'">
    <Field>
      <FieldLabel for="'bug-title'">Bug Title</FieldLabel>
      <input
        id="bug-title"
        name="title"
        class="form-control b-form-control"
        type="text"
        placeholder="Login button not working on mobile"
        autocomplete="off"
        t-model="state.title"
      />
    </Field>

    <Field>
      <FieldLabel for="'bug-description'">Description</FieldLabel>
      <div class="b-form-input-group" data-slot="input-group" role="group">
        <textarea
          id="bug-description"
          name="description"
          class="form-control b-form-textarea"
          placeholder="I'm having an issue with the login button on mobile."
          maxlength="100"
          rows="6"
          t-model="state.description"
        ></textarea>
        <div class="b-form-counter" data-slot="input-group-addon" data-align="block-end">
          <span class="b-form-counter-text">
            <t t-esc="state.description.length"/>/100 characters
          </span>
        </div>
      </div>
      <FieldDescription>Include steps to reproduce, expected behavior, and what actually happened.</FieldDescription>
    </Field>
  </FieldGroup>

  <Field orientation="'horizontal'" className="'b-form-actions'">
    <Button type="'button'" variant="'outline'" onClick="() => this.reset()">Reset</Button>
    <Button type="'submit'">Submit</Button>
  </Field>
</form>
```

This is the same Bug Report form converted from base static markup (`b-ui`) to pure Nodex UI composition: `FieldGroup`, `Field`, `FieldLabel`, `FieldDescription`, and `Button` replace the static adapters, while `t-model` owns the input state.

## State

| Field | Binding | Notes |
| --- | --- | --- |
| `title` | `t-model="state.title"` | trims or validates in your submit handler if needed |
| `description` | `t-model="state.description"` | drives the live `state.description.length` counter |

## Static component

```base-ui
<form b-ui="form">
  <div class="b-form-header">
    <h3 class="b-form-title">Bug Report</h3>
    <p class="b-form-description">Help us improve by reporting bugs you encounter.</p>
  </div>

  <div b-field-group class="b-form-fields">
    <div b-ui="field">
      <label b-field-label for="bug-title">Bug Title</label>
      <input
        b-ui="input"
        id="bug-title"
        name="title"
        type="text"
        placeholder="Login button not working on mobile"
        autocomplete="off"
      >
    </div>

    <div b-ui="field">
      <label b-field-label for="bug-description">Description</label>
      <div class="b-form-input-group" data-slot="input-group" role="group">
        <textarea
          b-ui="textarea"
          id="bug-description"
          name="description"
          placeholder="I'm having an issue with the login button on mobile."
          maxlength="100"
          rows="6"
        ></textarea>
        <div class="b-form-counter" data-slot="input-group-addon" data-align="block-end">
          <span b-form-counter>0/100 characters</span>
        </div>
      </div>
      <p b-field-description>Include steps to reproduce, expected behavior, and what actually happened.</p>
    </div>
  </div>

  <div b-ui="field" b-att-orientation="horizontal" class="b-form-actions">
    <button b-ui="button" b-att-variant="outline" b-form-reset type="button">Reset</button>
    <button b-ui="button" type="submit">Submit</button>
  </div>
</form>
```
