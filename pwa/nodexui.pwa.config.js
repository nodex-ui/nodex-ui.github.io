// Source of truth for the examples site's PWA files. Regenerate manifest.webmanifest, sw.js and
// icons/ with (note: icons now live in logo/{light,dark}/pwa, so edit the generated files by hand instead of regenerating): npm run build && node bin/create-nodexui-app.mjs pwa examples/pwa
export default {
  manifest: {
    name: "Nodex UI — Free JavaScript UI component library",
    shortName: "Nodex UI",
    description: "Nodex UI (nodexui) docs, component gallery, blocks and charts.",
    orientation: "any",
    iconsBase: "/examples/pwa/logo/light/pwa/",
  },
  serviceWorker: {
    cacheName: "nodexui-examples-cache-v3",
    cdnVersion: "1.3.1",
    iconsBase: "/examples/pwa/logo/light/pwa/",
    manifestUrl: "/examples/pwa/manifest.webmanifest",
    appFiles: [
      "/dist/nodexui.min.css",
      "/dist/nodexui.min.js",
      "/dist/nodexui.esm.js",
      "/dist/nodexui.templates.xml",
      "/dist/nodexui.i18n.esm.js",
      "/dist/nodexui.qr.esm.js",
      "/examples/index-router.js",
      "/examples/i18n.js",
      "/examples/components/landing/landing.js",
      "/examples/components/landing/landing.css",
      "/examples/components/landing/landing.xml",
      "/examples/components/landing/i18n/vi.po",
      "/examples/components/language-switcher/language-switcher.js",
      "/examples/components/language-switcher/i18n/vi.po",
    ],
  },
};
