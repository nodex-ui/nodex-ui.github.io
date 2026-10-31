/* global NodexUI */

const root = document.getElementById("b-root");

/** Slugs from examples/components/docs/docs.js's guidePages — kept in sync manually. */
const guideSlugs = [
  "usage-guide",
  "installation",
  "theming",
  "runtime-api",
  "analytics",
  "i18n",
  "base-ui-skill",
  "registry",
  "owl-components",
  "component-authoring",
  "blocks",
  "icons",
];

/** Maps an old real docs/blocks bookmark to the equivalent hash route on the single-app shell. */
function redirectTargetFor(pathname) {
  if (pathname === "/docs" || pathname === "/docs/") {
    return "#/docs";
  }
  const guideMatch = pathname.match(/^\/docs\/([a-z-]+)\/?$/);
  if (guideMatch && guideSlugs.includes(guideMatch[1])) {
    return `#/docs/guide/${guideMatch[1]}`;
  }
  if (pathname.startsWith("/docs/components/")) {
    const slug = pathname.slice("/docs/components/".length).replace(/\/$/, "");
    return slug ? `#/docs/components/${slug}` : "#/docs";
  }
  if (pathname === "/blocks" || pathname === "/blocks/") {
    return "#/blocks";
  }
  return null;
}

/** True when the URL should show the landing page: the site root with no `#/<route>` hash. */
function isLandingUrl() {
  const atRoot = location.pathname === "/" || location.pathname === "/index.html";
  return atRoot && !location.hash.startsWith("#/");
}

/** Picks which page to show: one block's viewer for `?block=<name>`, the landing page at the site root, and the
 * examples app for any `#/<route>`. */
async function boot() {
  const target = redirectTargetFor(location.pathname);
  if (target) {
    location.replace(`/index.html${target}`);
    return;
  }

  // The Examples tab moved into Blocks; keep old `#/examples/<id>` bookmarks working.
  if (location.hash.startsWith("#/examples")) history.replaceState(null, "", location.hash.replace("#/examples", "#/blocks"));

  const blockName = new URLSearchParams(location.search).get("block");
  if (blockName) {
    root.innerHTML = '<div id="b-block-viewer"></div>';
    const { showBlock } = await import("/components/block-viewer/block-viewer.js");
    await showBlock(blockName, root.firstElementChild);
    return;
  }

  root.innerHTML = '<div id="b-example-app"></div>';
  const isLanding = isLandingUrl();
  // A same-page hash link (landing -> #/docs, or app -> bare #) doesn't reload, so swap pages by reloading.
  window.addEventListener("hashchange", () => {
    if (isLandingUrl() !== isLanding) location.reload();
  });
  await import(isLanding ? "/components/landing/landing.js" : "/components/main/main.js");
}

/** Reloads the page when the service worker reports a new app version, and asks it to re-check
 * whenever the tab becomes visible again. */
function watchForNewVersion() {
  navigator.serviceWorker.addEventListener("message", (event) => {
    if (event.data === "version-changed") location.reload();
  });
  document.addEventListener("visibilitychange", () => {
    if (!document.hidden) navigator.serviceWorker.controller?.postMessage("check-version");
  });
}

/** Registers the offline service worker so the examples site is installable and works offline. */
function registerServiceWorker() {
  if ("serviceWorker" in navigator) {
    watchForNewVersion();
    window.addEventListener("load", () => {
      navigator.serviceWorker.register("/sw.js").catch((error) => {
        console.error("Service worker registration failed", error);
      });
    });
  }
}

/** nodexui 1.3.1 loads its live-preview templates from a hardcoded `/dist/nodexui.templates.xml`; this site
 * has no `/dist`, so send that one request to the repo's `/templates.xml` copy instead. */
function useLocalTemplates() {
  const nativeFetch = window.fetch;
  window.fetch = (input, init) => nativeFetch(input === "/dist/nodexui.templates.xml" ? "/templates.xml" : input, init);
}

useLocalTemplates();
registerServiceWorker();

boot().catch((error) => {
  root.innerHTML = `
    <main class="container py-5">
      <div class="alert alert-danger">${error.message || "Unable to render this example."}</div>
    </main>
  `;
  NodexUI?.mountAll(document);
});
