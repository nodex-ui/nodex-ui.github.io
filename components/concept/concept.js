import { Component, DocViewer } from "nodexui";

/** Concept tab sidebar: the `docs/v2` tree, placed in the shell sidebar. */
export class ConceptSidebar extends Component {
  static template = "examples.ConceptSidebar";
  static components = { DocViewer };
}

/** Concept tab content: the selected `docs/v2` document; stays in sync with the sidebar through `#/concept/<path>`. */
export class ConceptContent extends Component {
  static template = "examples.ConceptContent";
  static components = { DocViewer };
}
