import { Component, onWillStart } from "nodexui";
import { Button, Table } from "nodexui";
import { loadCatalog, t } from "../../i18n.js";

await loadCatalog(import.meta.url);

/** Lists applications built with Nodex UI (from samples.json), each with a button that opens it in a new tab. */
export class Samples extends Component {
  static components = { Button, Table };
  static template = "examples.Samples";

  t = t;

  setup() {
    this.samples = [];
    onWillStart(() => this.loadSamples());
  }

  // Reads the application list from samples.json so new samples are added by editing data, not code.
  async loadSamples() {
    this.samples = await fetch("/components/samples/samples.json").then((response) => response.json());
  }
}
