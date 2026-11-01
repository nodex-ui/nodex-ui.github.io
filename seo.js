/** Canonical origin of the public site; canonical and Open Graph URLs always point here, never at a mirror or localhost. */
export const SITE_URL = "https://nodex-ui.github.io";

/** Finds the head tag matching `selector`, creating it with `attrs` first when the page doesn't have one. */
function ensureHeadTag(tag, selector, attrs) {
  let element = document.head.querySelector(selector);
  if (!element) {
    element = document.createElement(tag);
    for (const [name, value] of Object.entries(attrs)) element.setAttribute(name, value);
    document.head.append(element);
  }
  return element;
}

/**
 * Updates the document's title, description, canonical link and Open Graph tags for the current view.
 * The examples app routes with `#/…`, and search engines ignore fragments, so every view canonicalises
 * to the URL without its hash (the landing page "/" or the app shell) instead of advertising URLs that
 * can't be indexed on their own.
 */
export function setPageMeta({ title, description, path = location.pathname }) {
  document.title = title;
  const url = `${SITE_URL}${path === "/index.html" ? "/" : path}`;
  if (description) {
    ensureHeadTag("meta", 'meta[name="description"]', { name: "description" }).setAttribute("content", description);
  }
  ensureHeadTag("link", 'link[rel="canonical"]', { rel: "canonical" }).setAttribute("href", url);
  const og = { "og:title": title, "og:url": url, ...(description ? { "og:description": description } : {}) };
  for (const [property, content] of Object.entries(og)) {
    ensureHeadTag("meta", `meta[property="${property}"]`, { property }).setAttribute("content", content);
  }
}
