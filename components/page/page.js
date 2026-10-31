import { loadFile, mount } from "nodexui";

/** Strips the outer `<templates>` wrapper so several template files can be joined into one. */
export function templateBody(xml) {
  return xml.match(/<templates[^>]*>([\s\S]*)<\/templates>/)?.[1] || xml;
}

/** Loads the Nodex UI templates plus the page's own template files, then mounts the page's root
 * component — the single start-up step shared by every page of the site. */
export async function mountPage(Root, templateUrls, target, props) {
  const files = await Promise.all([import.meta.resolve("nodexui/templates"), ...templateUrls].map((url) => loadFile(url)));
  return mount(Root, target, { props, templates: `<templates>${files.map(templateBody).join("\n")}</templates>` });
}
