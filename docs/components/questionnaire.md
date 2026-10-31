# Questionnaire

Use `b-ui="questionnaire"` for a CDN-ready questionnaire component.

## CDN install requirements

Load the pinned Nodex UI CSS and JavaScript files; no extra dependency is required for this component.

## Nodex UI component

```js
import { Questionnaire, QuestionnaireNext, QuestionnairePrevious, QuestionnaireStep } from "nodexui";
```

```base-ui
<div style="max-width: 28rem" class="w-100">
  <Questionnaire stepCount="3" className="'w-100'">
    <QuestionnaireStep index="0">
      <Typography variant="'h4'" className="'fw-semibold'">How did you hear about us?</Typography>
      <Typography variant="'muted'">Select the option that best describes you.</Typography>
      <RadioGroup defaultValue="'search'" className="'d-grid gap-2 mt-3'">
        <div class="d-flex align-items-center gap-2">
          <RadioGroupItem value="'search'" id="'q1-search'"/>
          <Label htmlFor="'q1-search'">Search engine</Label>
        </div>
        <div class="d-flex align-items-center gap-2">
          <RadioGroupItem value="'social'" id="'q1-social'"/>
          <Label htmlFor="'q1-social'">Social media</Label>
        </div>
        <div class="d-flex align-items-center gap-2">
          <RadioGroupItem value="'friend'" id="'q1-friend'"/>
          <Label htmlFor="'q1-friend'">Friend or colleague</Label>
        </div>
        <div class="d-flex align-items-center gap-2">
          <RadioGroupItem value="'other'" id="'q1-other'"/>
          <Label htmlFor="'q1-other'">Other</Label>
        </div>
      </RadioGroup>
    </QuestionnaireStep>
    <QuestionnaireStep index="1">
      <Typography variant="'h4'" className="'fw-semibold'">Which features do you use?</Typography>
      <Typography variant="'muted'">Select all that apply.</Typography>
      <div class="d-grid gap-2 mt-3">
        <div class="d-flex align-items-center gap-2">
          <Checkbox id="'q2-dashboard'" defaultChecked="true"/>
          <Label htmlFor="'q2-dashboard'">Dashboard</Label>
        </div>
        <div class="d-flex align-items-center gap-2">
          <Checkbox id="'q2-reports'"/>
          <Label htmlFor="'q2-reports'">Reports</Label>
        </div>
        <div class="d-flex align-items-center gap-2">
          <Checkbox id="'q2-automation'" defaultChecked="true"/>
          <Label htmlFor="'q2-automation'">Automation</Label>
        </div>
        <div class="d-flex align-items-center gap-2">
          <Checkbox id="'q2-integrations'"/>
          <Label htmlFor="'q2-integrations'">Integrations</Label>
        </div>
      </div>
    </QuestionnaireStep>
    <QuestionnaireStep index="2">
      <Typography variant="'h4'" className="'fw-semibold'">Anything else you'd like to share?</Typography>
      <Typography variant="'muted'">Optional feedback helps us improve.</Typography>
      <Textarea placeholder="'Type your feedback here...'" className="'mt-3'" rows="4"/>
    </QuestionnaireStep>
    <div class="d-flex align-items-center justify-content-between mt-2">
      <QuestionnairePrevious>Previous</QuestionnairePrevious>
      <QuestionnaireNext>Next</QuestionnaireNext>
    </div>
  </Questionnaire>
</div>
```

| Component | Prop | Type | Notes |
| --- | --- | --- | --- |
| `Questionnaire` | `stepCount` | `Number` | required |
| `Questionnaire` | `onChange` | `Function` | optional |
| `Questionnaire` | `className` | `String` | optional |
| `QuestionnaireNext` | `className` | `String` | optional |
| `QuestionnaireNext` | `stepCount` | `Number` | optional |
| `QuestionnairePrevious` | `className` | `String` | optional |
| `QuestionnaireStep` | `index` | `Number` | required |
| `QuestionnaireStep` | `className` | `String` | optional |

See [Nodex UI Component](/index.html#/docs/guide/owl-components) for how to load `nodexui` and `dist/nodexui.templates.xml`.

## Static component

```base-ui
<div b-ui="questionnaire">Questionnaire</div>
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
