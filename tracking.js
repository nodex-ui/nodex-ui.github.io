/** True when the page runs on the developer's machine rather than the live site. */
const IS_LOCAL = /^(localhost|127\.|\[::1\]$)/.test(location.hostname);

/** Backend origin that receives analytics events: the local helpdesk server during development,
 * the production helpdesk otherwise (the same backend as qr-page). Set to "" to disable collection. */
const BACKEND_URL = IS_LOCAL ? "http://localhost:8388" : "https://helpdesk.thebase.vn";

/** Loads the Nodex UI's optional analytics service with the same options as qr-page, so both sites send
 * identical pageview, engagement, outbound-link, file-download and visitor-context data. The examples
 * app routes with `#/docs`, `#/blocks`, …, so hash changes count as page navigations here.
 * Local runs opt in to captureOnLocalhost, since the tracker ignores localhost visits by default. */
const analytics = BACKEND_URL
  ? import("nodexui/analytics")
      .then((module) => {
        module.init({
          backendUrl: BACKEND_URL,
          outboundLinks: true,
          fileDownloads: true,
          hashBasedRouting: true,
          captureOnLocalhost: IS_LOCAL,
          customProperties: module.visitorContext,
        });
        return module;
      })
      .catch((error) => console.error("Analytics failed to start", error))
  : null;

/** Records one user action (theme switch, tab pick, …) with its non-personal details, using the same
 * event names and props as qr-page so both sites report into one dashboard the same way. */
export function trackEvent(name, props) {
  analytics?.then((module) => module?.track(name, { props }));
}

/** Reports every code/command copy made with a ClipboardButton (landing install snippets, docs samples) once per click.
 * The buttons dispatch a bubbling `nodexui:clipboard-copy`, so one document listener covers all pages. */
document.addEventListener("nodexui:clipboard-copy", (event) => {
  const value = String(event.detail?.value ?? "");
  trackEvent("Code: Copy", { route: location.hash.replace(/^#\/?/, "").slice(0, 80) || "landing", length: value.length });
});
