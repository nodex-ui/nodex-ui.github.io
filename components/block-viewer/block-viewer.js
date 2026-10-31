import { BlockViewer, loadFile, mount } from "nodexui";
import { allBlocks, blocksWithData } from "../blocks/blocks.js";

const libraryTemplates = import.meta.resolve("nodexui/templates");

const navItems = [
  { key: "docs", label: "Docs", href: "/index.html#/docs" },
  { key: "icons", label: "Icons", href: "/index.html#/icons" },
  { key: "blocks", label: "Blocks", href: "/index.html#/blocks" },
];

/** Puts the block's template where BlockViewer reads it from — a `script[b-block-code-template]` in the page —
 * so Preview, Code and Copy all show the same source. */
function addBlockTemplate(xml) {
  const script = document.createElement("script");
  script.type = "text/xml";
  script.setAttribute("b-block-code-template", "");
  script.textContent = xml;
  document.body.append(script);
}

/** Opens one block (`/index.html?block=<name>`, plus `&embed=1` for the gallery's preview frame) in the Nodex UI
 * block viewer, which reads the block's title and description from the page body. */
export async function showBlock(name, target) {
  const block = allBlocks.find((entry) => entry.name === name);
  if (!block) throw new Error(`There is no block named "${name}".`);
  document.title = `${block.label} · Nodex UI`;
  Object.assign(document.body.dataset, { blockTitle: name, blockDescription: block.description });
  if (blocksWithData.has(name)) await import(`/components/blocks/${name}.data.js`);
  const [templates, blockXml] = await Promise.all([loadFile(libraryTemplates), loadFile(`/components/blocks/${name}.xml`)]);
  addBlockTemplate(blockXml);
  await mount(BlockViewer, target, { templates, props: { navItems } });
}
