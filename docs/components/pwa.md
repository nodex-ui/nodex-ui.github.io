# Pwa

Use `b-ui="pwa"` for a bottom-anchored install/permission prompt (an "Add to Home Screen" or "Allow notifications" sheet). Pwa is presentational only — it owns open/close state and focus/Escape handling, not the actual install or notification API calls. Wire your app's `beforeinstallprompt`/`Notification.requestPermission()` logic to the footer buttons you compose inside it.

## Nodex UI component

```js
import {
  Pwa,
  PwaBody,
  PwaClose,
  PwaContent,
  PwaDescription,
  PwaFooter,
  PwaHeader,
  PwaSteps,
  PwaTitle,
  PwaTrigger,
} from "nodexui";
```

```base-ui
<Pwa open="state.installOpen" onOpenChange="(open) => state.installOpen = open">
  <PwaTrigger>Install app</PwaTrigger>
  <PwaContent>
    <PwaHeader>
      <PwaTitle>Install Base Hub</PwaTitle>
      <PwaDescription>Install Base Hub from your browser prompt so you can launch it like an app.</PwaDescription>
    </PwaHeader>
    <PwaBody>
      <t t-if="state.needsManualInstructions">
        <PwaSteps steps="state.manualInstructions"/>
      </t>
    </PwaBody>
    <PwaFooter>
      <PwaClose>Later</PwaClose>
      <button type="button" class="btn btn-primary" t-on-click="handleInstall">Open install prompt</button>
    </PwaFooter>
  </PwaContent>
</Pwa>
```

A launcher rendered outside the `Pwa` tree opens it through `PwaTrigger`, or by calling the `onOpenChange`-driving state setter directly (e.g. from a `canPromptToInstall` condition on your own install-prompt service).

| Component | Prop | Type | Notes |
| --- | --- | --- | --- |
| `Pwa` | `open` | `Boolean` | optional, controlled |
| `Pwa` | `defaultOpen` | `Boolean` | optional |
| `Pwa` | `onOpenChange` | `Function` | optional |
| `PwaTrigger` | `className` | `String` | optional |
| `PwaContent` | `className` | `String` | optional |
| `PwaHeader` | `className` | `String` | optional |
| `PwaTitle` | `className` | `String` | optional |
| `PwaDescription` | `className` | `String` | optional |
| `PwaBody` | `className` | `String` | optional |
| `PwaSteps` | `steps` | `Array` | ordered list of instruction strings |
| `PwaFooter` | `className` | `String` | optional |
| `PwaClose` | `className` | `String` | optional |

Render a second `Pwa` instance for a follow-up prompt (e.g. "Allow notifications" after install is dismissed) — each `Pwa` owns its own open state independently.

See [Nodex UI Component](/examples/blocks.html#/docs/guide/owl-components) for how to load `nodexui` and `dist/nodexui.templates.xml`.

## Static component

```base-ui
<button id="open-pwa" type="button">Install app</button>
<div b-ui="pwa" b-att-trigger="#open-pwa">
  <div b-pwa-panel>
    <h2>Install Base Hub</h2>
    <p>Install this app from your browser prompt so you can launch it like an app.</p>
    <div class="b-pwa-footer">
      <button b-pwa-close type="button">Later</button>
      <button type="button">Install</button>
    </div>
  </div>
</div>
```

The prompt closes on backdrop click, `[b-pwa-close]`, or Escape. `element.NodexUIPwa.open()`/`.close()` are also available once mounted, for a launcher button rendered elsewhere in the page (e.g. only once `beforeinstallprompt` has fired).

## Options and attributes

| Attribute | Notes |
| --- | --- |
| `b-att-trigger` | CSS selector for an external open trigger. |
| `b-pwa-panel` | marker; the sliding bottom panel. |
| `b-pwa-close` | marker; any element inside the panel that should close it. |

## Events

`nodexui:open` and `nodexui:close` fire on the root element (shared `createModal()` contract with `dialog`/`sheet`).

## Accessibility behavior

The panel gets `role="dialog"` and `aria-modal="true"` while open, focus moves to the first focusable element inside it, and focus is restored to the trigger on close.
