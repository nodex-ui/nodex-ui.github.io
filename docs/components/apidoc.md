# ApiDoc

Use `b-ui="apidoc"` (or the pure Nodex UI `ApiDoc` component) to render an **OpenAPI 3.0+ JSON** document as browsable API documentation: a grouped sidebar, per-operation parameters / request body / responses / callbacks, a **Try It** panel with request code samples in 17 languages, and an **Authorize** dialog (API key, HTTP basic, bearer, OpenID Connect token, OAuth2 implicit / authorization-code / password / client-credentials).

Swagger 2.0 documents still render, but OpenAPI 3.x is the supported input: `requestBody`, `components.securitySchemes` (`http`, `apiKey`, `oauth2` `flows`, `openIdConnect`, `mutualTLS`), `servers` with variables, `webhooks`, `callbacks`, `links`, tag `parent`/`kind`, and `$ref` to components are all understood.

Markdown in `info.description`, tag and operation descriptions is rendered with the [Markdown](markdown.md) component (fenced ` ```mermaid ` blocks become diagrams). The spec is trusted content — descriptions are rendered as Markdown/HTML, so do not point ApiDoc at a spec you do not control.

## Nodex UI component

```js
import { ApiDoc } from "nodexui";
```

```html
<ApiDoc src="'/openapi.json'" height="'100vh'" theme="'auto'" themeToggle="true" hash="true"/>
```

Pass an already-parsed document with `spec` instead of `src`:

```html
<ApiDoc spec="state.spec" serverUrl="'https://api.example.com'" tryIt="false"/>
```

## Standalone (`nodexui/apidoc`)

Like the analytics service, ApiDoc also ships as its own bundle that needs neither the full Nodex UI script nor a templates file (Nodex and ApiDoc's templates are embedded). Load `nodexui.min.css` for styling.

```js
import { mountApiDoc } from "nodexui/apidoc";

const app = await mountApiDoc("#docs", { src: "/openapi.json", hash: true, assetBase: "/node_modules/nodexui/dist/apidoc" });
// app.destroy() removes it
```

`mountApiDoc(target, props)` takes an element or selector plus the props below. Without a bundler, import `dist/nodexui.apidoc.esm.js` from a CDN, or load `dist/nodexui.apidoc.min.js`, which sets `window.thebase.apidoc.mountApiDoc`.

## Static component

```html
<div b-ui="apidoc" b-att-src="/openapi.json" b-att-height="100vh" b-att-hash="true"></div>
```

The static adapter fetches `nodexui.templates.xml` from the folder Nodex UI script was loaded from; set `b-att-templates` to override.

## Props / attributes

| Nodex prop | Static attribute | Default | Meaning |
| --- | --- | --- | --- |
| `src` | `b-att-src` | — | URL of the OpenAPI JSON file. |
| `spec` | — | — | Parsed OpenAPI object (alternative to `src`). |
| `title` | `b-att-title` | `info.title` | Heading shown in the header and introduction. |
| `serverUrl` | `b-att-server-url` | `servers` of the spec | Replaces the spec's servers (e.g. `location.origin`) so Try It targets one host. |
| `theme` | `b-att-theme` | `auto` | `light`, `dark`, or `auto` (follows `data-bs-theme` on `<html>`, else the OS). |
| `themeToggle` | `b-att-theme-toggle` | `false` | Shows a light/dark button in the header. |
| `hash` | `b-att-hash` | `false` | Keep the open page in `location.hash` (`#/<operationId>`), so pages are linkable. Off by default so ApiDoc does not fight an app's own router. |
| `operation` | `b-att-operation` | introduction | Operation id to open first (the lower-cased, dash-separated `operationId`). |
| `tryIt` | `b-att-try-it` | `true` | Show the Try It panel (code samples + Send API Request). |
| `authorize` | `b-att-authorize` | `true` | Show the Authorize button when the spec defines security schemes. |
| `languages` | `b-att-languages` | all 17 | Which code-sample languages to offer, e.g. `['curl', 'node', 'python']` / `curl,node,python`. |
| `language` | `b-att-language` | `curl` | Language selected first. |
| `assetBase` | `b-att-asset-base` | `dist/apidoc` beside Nodex UI script | Folder that holds `img/*.svg` language logos. Empty string hides the logos. |
| `oauthRedirectUri` | `b-att-oauth-redirect-uri` | `oauth2-redirect.html` next to the page | Popup landing page for the implicit / authorization-code flows (see `src/components/apidoc/oauth2-redirect.html`). |
| `height` | `b-att-height` | `100vh` | CSS height of the component. |
| `className`, `style` | — | — | Standard root class / inline style. |

## Events

| Nodex callback | Static event | Detail |
| --- | --- | --- |
| `onLoad(doc)` | `nodexui:load` | `{ info, operations }` once the spec is parsed. |
| `onError(error)` | `nodexui:error` | `{ error }` when the spec cannot be fetched or is not OpenAPI. |
| `onNavigate(id)` | `nodexui:navigate` | `{ id }` — `introduction` or an operation id. |

## Notes

- Credentials entered in Authorize live in the tab's `sessionStorage` (`apikey`, `oauthkey`) and are applied to every Try It request. Try It sends the request from the browser, so the API must allow CORS from the docs origin.
- Language logos are copied to `dist/apidoc/img/` by `npm run build`; the CDN URL pattern is `https://cdn.jsdelivr.net/npm/nodexui@<version>/dist/apidoc/img/`.
- Styles are scoped under `.b-apidoc` and use their own palette (`--line`, `--accent`, … on `.b-apidoc`); override them on a wrapper selector to re-theme.
