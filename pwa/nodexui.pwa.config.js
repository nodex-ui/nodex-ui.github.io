// Source of truth for the examples site's PWA files. Regenerate manifest.webmanifest, sw.js and
// icons/ with (note: icons now live in logo/{light,dark}/pwa, so edit the generated files by hand instead of regenerating): npm run build && node bin/create-nodexui-app.mjs pwa examples/pwa
export default {
  manifest: {
    name: "Nodex UI — Free JavaScript UI component library",
    shortName: "Nodex UI",
    description: "Nodex UI (nodexui) docs, component gallery, blocks and charts.",
    orientation: "any",
    iconsBase: "/pwa/logo/light/pwa/",
  },
  serviceWorker: {
    cacheName: "nodexui-examples-cache-v5",
    cdnVersion: "1.3.1",
    iconsBase: "/pwa/logo/light/pwa/",
    manifestUrl: "/pwa/manifest.webmanifest",
    appFiles: [
      "/templates.xml",
      "/index-router.js",
      "/i18n.js",
      "/components/landing/landing.js",
      "/components/landing/landing.css",
      "/components/landing/landing.xml",
      "/components/landing/i18n/vi.po",
      "/components/language-switcher/language-switcher.js",
      "/components/language-switcher/i18n/vi.po",
    ],
  },
};
