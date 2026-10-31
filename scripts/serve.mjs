import { createReadStream } from "node:fs";
import { stat } from "node:fs/promises";
import { createServer } from "node:http";
import path from "node:path";
import { fileURLToPath } from "node:url";

const root = fileURLToPath(new URL("..", import.meta.url)).replace(/[\\/]$/, "");
const port = Number(process.env.PORT || 5173);
const mimeTypes = {
  ".css": "text/css; charset=utf-8",
  ".html": "text/html; charset=utf-8",
  ".ico": "image/x-icon",
  ".js": "text/javascript; charset=utf-8",
  ".json": "application/json; charset=utf-8",
  ".md": "text/markdown; charset=utf-8",
  ".mjs": "text/javascript; charset=utf-8",
  ".png": "image/png",
  ".po": "text/plain; charset=utf-8",
  ".pot": "text/plain; charset=utf-8",
  ".svg": "image/svg+xml",
  ".txt": "text/plain; charset=utf-8",
  ".webmanifest": "application/manifest+json; charset=utf-8",
  ".xml": "application/xml; charset=utf-8",
};

// Returns the path only if it is an existing file, so callers can try fallbacks in order.
async function existingFile(filePath) {
  const info = await stat(filePath).catch(() => null);
  return info?.isFile() ? filePath : null;
}

// Finds the file GitHub Pages would serve for a URL: the file itself, a folder's index.html, or "<path>.html".
async function resolveFile(requestUrl) {
  const pathname = decodeURIComponent(new URL(requestUrl, "http://localhost").pathname);
  const filePath = path.join(root, path.normalize(pathname));
  if (!filePath.startsWith(root)) return null;
  return (await existingFile(filePath))
    || (await existingFile(path.join(filePath, "index.html")))
    || (await existingFile(`${filePath}.html`));
}

// Answers one request with the matching file, uncached so edits show on reload.
async function handleRequest(request, response) {
  const filePath = await resolveFile(request.url || "/");
  if (!filePath) {
    response.writeHead(404, { "content-type": "text/plain; charset=utf-8" });
    response.end("Not found");
    return;
  }
  response.writeHead(200, {
    "cache-control": "no-cache",
    "content-type": mimeTypes[path.extname(filePath)] || "application/octet-stream",
  });
  createReadStream(filePath).pipe(response);
}

createServer(handleRequest).listen(port, "127.0.0.1", () => {
  console.log(`nodex-ui.github.io: http://127.0.0.1:${port}/`);
});
