import { ApiDoc, Component } from "nodexui";

const BOOTSTRAP_JS = "https://cdn.jsdelivr.net/npm/bootstrap@5.3.8/dist/js/bootstrap.bundle.min.js";

/** Adds a classic script to the page and waits for it to run; ApiDoc's Authorize dialog needs Bootstrap's JS,
 * which nodexui does not ship, so it is fetched only when this example is opened. */
function loadScript(src) {
  return new Promise((resolve, reject) => {
    const script = Object.assign(document.createElement("script"), { src, onload: resolve, onerror: reject });
    document.head.append(script);
  });
}

await loadScript(BOOTSTRAP_JS);

/** Example for the ApiDoc component: renders the Swagger Petstore OpenAPI 3.0 spec as browsable API docs. */
export class ApiDocDemo extends Component {
  static components = { ApiDoc };
  static template = "examples.ApiDocDemo";
}
