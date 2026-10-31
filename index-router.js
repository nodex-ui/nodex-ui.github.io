/* global NodexUI */

const root = document.getElementById("b-example-root");

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

/** Picks which page to show: the landing page at the site root, the examples app everywhere else. */
async function boot() {
  const target = redirectTargetFor(location.pathname);
  if (target) {
    location.replace(`/examples/index.html${target}`);
    return;
  }

  root.innerHTML = '<div id="b-example-app"></div>';
  const isLanding = location.pathname === "/" || location.pathname === "/index.html";
  await import(isLanding ? "/examples/components/landing/landing.js" : "/examples/components/main/main.js");
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
      navigator.serviceWorker.register("/examples-sw.js").catch((error) => {
        console.error("Service worker registration failed", error);
      });
    });
  }
}

registerServiceWorker();

boot().catch((error) => {
  root.innerHTML = `
    <main class="container py-5">
      <div class="alert alert-danger">${error.message || "Unable to render this example."}</div>
    </main>
  `;
  NodexUI?.mountAll(document);
});
