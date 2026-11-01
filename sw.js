const CACHE_NAME = "nodexui-examples-cache-v8";
importScripts("/nodexui.config.js"); // defines NODEXUI_LIB: where the Nodex UI library loads from

const NODEXUI_BASE = `${NODEXUI_LIB.base}/`;

const PRECACHE_URLS = [
  "/",
  "/pwa/manifest.webmanifest",
  "/favicon.ico",
  "/pwa/logo/nodexui-logo-square-light.svg",
  "/pwa/logo/nodexui-logo-square-dark.svg",
  "/pwa/logo/light/pwa/icon-192.png",
  "/pwa/logo/light/pwa/icon-512.png",
  "/pwa/logo/light/ios/AppIcon-180-iphone@3x.png",
  "/nodexui.config.js",
  "/index-router.js",
  "/i18n.js",
  "/components/landing/landing.js",
  "/components/landing/landing.css",
  "/components/landing/landing.xml",
  "/components/landing/i18n/vi.po",
  "/components/samples/samples.js",
  "/components/samples/samples.xml",
  "/components/samples/samples.json",
  "/components/samples/i18n/vi.po",
  "/components/language-switcher/language-switcher.js",
  "/components/language-switcher/i18n/vi.po",
  ...NODEXUI_LIB.precache,
  ...(NODEXUI_LIB.templatesFallback ? [NODEXUI_LIB.templatesFallback] : []),
];

/** Last-seen app version lives in its own cache so wiping the app caches never forgets it. */
const VERSION_CACHE = "nodexui-examples-cache-v4-version";
const VERSION_URL = new URL("version.json", self.registration.scope).href;
let pendingCheck = null;

/** Re-downloads every app-shell file fresh, so the next page load runs the new code offline too. */
async function precache() {
  const cache = await caches.open(CACHE_NAME);
  await Promise.all(PRECACHE_URLS.map((url) => cache.add(new Request(url, { cache: "reload" }))));
}

/** Asks the server for version.json; when it differs from the last one seen, throws away every
 * cached file, caches the new ones and tells all open pages to reload. */
async function runVersionCheck() {
  try {
    const response = await fetch(VERSION_URL, { cache: "no-store" });
    if (!response.ok) return;
    const latest = (await response.json()).version;
    const store = await caches.open(VERSION_CACHE);
    const known = await store.match(VERSION_URL);
    const previous = known ? await known.text() : null;
    if (previous === latest) return;
    await store.put(VERSION_URL, new Response(latest));
    if (previous === null) return;
    const names = await caches.keys();
    await Promise.all(names.filter((name) => name !== VERSION_CACHE).map((name) => caches.delete(name)));
    await precache();
    const pages = await self.clients.matchAll({ type: "window" });
    pages.forEach((page) => page.postMessage("version-changed"));
  } catch {
    // Offline or server hiccup: keep the current cached app and try again on the next check.
  }
}

/** Runs one version check at a time, so a burst of page loads shares a single request. */
function checkVersion() {
  pendingCheck ??= runVersionCheck().finally(() => {
    pendingCheck = null;
  });
  return pendingCheck;
}

self.addEventListener("message", (event) => {
  if (event.data === "check-version") event.waitUntil(checkVersion());
});

self.addEventListener("install", (event) => {
  event.waitUntil(precache().then(() => self.skipWaiting()));
});

self.addEventListener("activate", (event) => {
  event.waitUntil(
    caches
      .keys()
      .then((keys) => Promise.all(keys.filter((key) => key !== CACHE_NAME && key !== VERSION_CACHE).map((key) => caches.delete(key))))
      .then(() => self.clients.claim())
      .then(checkVersion)
  );
});

async function fromCdnCache(request) {
  const cache = await caches.open(CACHE_NAME);
  const cached = await cache.match(request);
  if (cached) return cached;
  const response = await fetch(request);
  if (response.ok) cache.put(request, response.clone());
  return response;
}

self.addEventListener("fetch", (event) => {
  const { request } = event;
  if (request.method !== "GET") return;
  if (NODEXUI_LIB.source === "cdn" && request.url.startsWith(NODEXUI_BASE)) {
    event.respondWith(fromCdnCache(request));
    return;
  }
  if (new URL(request.url).origin !== self.location.origin) return;
  if (request.url === VERSION_URL) return;
  if (request.mode === "navigate") event.waitUntil(checkVersion());

  event.respondWith(
    caches.open(CACHE_NAME).then(async (cache) => {
      try {
        const response = await fetch(request);
        if (response.ok) cache.put(request, response.clone());
        return response;
      } catch {
        const cached = await cache.match(request);
        if (cached) return cached;
        throw new Error(`No cached response for ${request.url} and network unavailable`);
      }
    })
  );
});
