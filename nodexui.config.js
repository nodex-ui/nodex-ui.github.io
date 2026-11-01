/* Single place that decides where the Nodex UI library loads from. Runs as a plain script in the page
 * (index.html) and in the service worker (sw.js), so every other file stays identical between the
 * examples/ folder and nodex-ui.github.io. This is the ONLY file that differs between the two. */
(() => {
  const source = "cdn"; // "dist" = the local build served at /dist, "cdn" = jsDelivr
  const version = "1.3.2"; // npm version the CDN source loads
  const base = source === "cdn" ? `https://cdn.jsdelivr.net/npm/nodexui@${version}/dist` : "/dist";
  const file = (name) => `${base}/${name}`;
  const imports = {
    nodexui: file("nodexui.esm.js"),
    "nodexui/templates": file("nodexui.templates.xml"),
    "nodexui/qr": file("nodexui.qr.esm.js"),
    "nodexui/analytics": file("nodexui.analytics.esm.js"),
    "nodexui/i18n": file("nodexui.i18n.esm.js"),
  };
  const lib = {
    source,
    base,
    css: file("nodexui.min.css"),
    script: file("nodexui.min.js"),
    imports,
    // Files the service worker caches for offline use.
    precache: [file("nodexui.min.css"), file("nodexui.min.js"), ...Object.values(imports)],
    // The library fetches its templates from a hardcoded /dist path; without a local /dist, send that request here.
    templatesFallback: source === "cdn" ? "/templates.xml" : null,
  };
  globalThis.NODEXUI_LIB = lib;
  if (typeof document === "undefined") return;

  // Writes the stylesheet, script and import map in place, so they exist before any module runs.
  document.write(
    `<link rel="stylesheet" href="${lib.css}">`
    + `<script src="${lib.script}" defer></script>`
    + `<script type="importmap">${JSON.stringify({ imports: { ...imports, "@/": "/" } })}</script>`,
  );
})();
