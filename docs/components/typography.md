# Typography

Small text helpers for plain content.

## Nodex UI component

```js
import { Typography } from "nodexui";
```

```base-ui
<div style="max-width: 42rem" class="w-100">
  <h1 class="fw-semibold display-6 mb-4">Taxing Laughter: The Joke Tax Chronicles</h1>
  <p class="lh-lg mb-4">
    Once upon a time, in a far-off land, there was a very lazy king who spent all day
    lounging on his throne. One day, his advisors came to him with a problem: the
    kingdom was running out of money.
  </p>
  <blockquote class="border-start border-4 ps-3 fst-italic mb-4">
    "After all," he said, "everyone enjoys a good joke, so it's only fair that they should
    pay for the privilege."
  </blockquote>
  <h2 class="fw-semibold border-bottom pb-2 mb-3 mt-5">The King's Plan</h2>
  <p class="lh-lg mb-4">
    The king thought long and hard, and finally came up with
    <Typography variant="'code'" tag="'span'">a brilliant plan</Typography>: he would
    tax the jokes in the kingdom.
  </p>
  <h3 class="fw-semibold mb-3 mt-5">The Joke Tax</h3>
  <p class="lh-lg mb-3">
    The king's subjects were not amused. They grumbled and complained, but the king was
    firm:
  </p>
  <ul class="mb-4">
    <li>1st level of puns: 5 gold coins</li>
    <li>2nd level of jokes: 10 gold coins</li>
    <li>3rd level of one-liners : 20 gold coins</li>
  </ul>
  <p class="lh-lg mb-4">
    As a result, people stopped telling jokes, and the kingdom fell into a gloomy state.
  </p>
  <h4 class="fw-semibold mb-3 mt-5">People stopped telling jokes</h4>
  <div class="table-responsive mb-4">
    <table class="table table-bordered align-middle mb-0">
      <thead>
        <tr>
          <th>King's Treasury</th>
          <th>People's happiness</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td>Empty</td>
          <td>Overflowing</td>
        </tr>
        <tr>
          <td>Modest</td>
          <td>Satisfied</td>
        </tr>
        <tr>
          <td>Full</td>
          <td>Ecstatic</td>
        </tr>
      </tbody>
    </table>
  </div>
  <Typography variant="'lead'" className="'mb-4'">
    A modal dialog that interrupts the user with important content and expects a
    response.
  </Typography>
  <p class="mb-4">
    Type
    <Typography variant="'code'" tag="'span'">npx create-base-app@latest</Typography>
    to create a new project.
  </p>
  <div class="mb-1">
    <label class="fw-medium small">Email</label>
  </div>
  <Typography variant="'muted'">Enter your email address.</Typography>
</div>
```

| Component | Prop | Type | Notes |
| --- | --- | --- | --- |
| `Typography` | `variant` | `String` | optional; `lead`, `muted`, `code`, `kbd`, `h1`-`h4`, `blockquote`, `small`, `list` |
| `Typography` | `tag` | `String` | optional; defaults to `h1`-`h4`, `blockquote`, `small`, `ul` for those variants, else `p` |
| `Typography` | `className` | `String` | optional |

See [Nodex UI Component](/index.html#/docs/guide/owl-components) for how to load `nodexui` and `dist/nodexui.templates.xml`.

## built-in typography classes

Nodex UI redefines the built-in typography classes to the shadcn typeset values
(`src/styles/base-extensions.css`), in Be Vietnam Pro. Use plain built-in markup:

| Element / class | Result |
| --- | --- |
| `h1` / `.h1` ... `h4` / `.h4` | 1.75rem, 1.25rem, 1.125rem, 1rem; weight 600; line-height 1.3 to 1.5 |
| `h5` / `.h5`, `h6` / `.h6` | 0.875rem / 0.8125rem, weight 500, muted; `h6` is uppercase with 0.08em tracking |
| `.display-1` ... `.display-6` | built-in sizes, weight 600, line-height 1.2 |
| `.lead`, `.small`, `mark`, `del`, `abbr[title]` | muted lead text, `--b-text-sm`, shadcn highlight, muted strike-through, dotted underline |
| `blockquote` / `.blockquote` | 2px start border, 1em inline padding, inherited size |
| `hr`, `dt`, `dd`, `code`, `pre`, `kbd`, `caption` | shadcn rule, weights, muted-background code, keycap border |

the built-in bottom-margin rhythm is unchanged. For the shadcn flow model (margin-top only,
1.25em between blocks, 1.75 line-height, styled lists, links and tables) wrap prose in
`class="b-typeset"`; tune with `--b-typeset-flow` and `--b-typeset-leading`.

## Static component

```base-ui
<p b-ui="typography" b-att-variant="lead">Readable intro text.</p>
<span b-ui="typography" b-att-variant="code">nodexui</span>
```

Options: `b-att-variant="body|lead|muted|code|kbd|h1|h2|h3|h4|blockquote|small|list"` (static markup keeps its own element, so write `<h2 b-ui="typography" b-att-variant="h2">`; the variant only adds the class).

Accessibility: choose semantic HTML elements first, then add Nodex UI typography attributes for styling.
