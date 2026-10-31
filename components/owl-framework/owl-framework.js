import { Component, onMounted, onWillStart, onWillUnmount, reactive, useState } from "nodexui";

const treeSrc = "/docs/v2/tree.json";
const defaultPath = "docs/v2/readme.md";

/** Shared reactive state for the Owl Framework tab, subscribed to by both `OwlFrameworkSidebar` and `OwlFrameworkContent`. */
export const owlFrameworkState = reactive({ path: defaultPath });

function owlFrameworkPathFromHash() {
  const parts = window.location.hash.replace(/^#\/?/, "").split("/").filter(Boolean);
  // parts[0] === "owl-framework"; the rest is the doc's repo-relative path (e.g. docs/v2/reference/app.md)
  const path = parts.slice(1).join("/");
  return path || defaultPath;
}

function loadOwlFrameworkRoute() {
  owlFrameworkState.path = owlFrameworkPathFromHash();
}

function selectOwlFrameworkPath(path) {
  window.location.hash = `#/owl-framework/${path}`;
}

/** Owl Framework tab sidebar: renders the `docs/v2` folder tree via `MarkdownTree`, deep-linked through `#/owl-framework/<path>`. */
export class OwlFrameworkSidebar extends Component {
  static template = "examples.OwlFrameworkSidebar";

  setup() {
    this.treeSrc = treeSrc;
    this.state = useState(owlFrameworkState);
    this.onHashChange = () => loadOwlFrameworkRoute();
    this.onSelect = (path) => selectOwlFrameworkPath(path);
    onWillStart(() => loadOwlFrameworkRoute());
    onMounted(() => window.addEventListener("hashchange", this.onHashChange));
    onWillUnmount(() => window.removeEventListener("hashchange", this.onHashChange));
  }
}

/** Owl Framework tab content: renders the selected `docs/v2` Markdown file. */
export class OwlFrameworkContent extends Component {
  static template = "examples.OwlFrameworkContent";

  setup() {
    this.state = useState(owlFrameworkState);
  }

  get docSrc() {
    return `/${this.state.path}`;
  }
}
