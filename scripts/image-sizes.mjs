// Writes data/image-sizes.json with the intrinsic size of every image in /public/images,
// so galleries can reserve the right space (no layout shift).
// Run after adding or replacing images:  npm run images:sizes
import { readdir, writeFile } from "node:fs/promises";
import { join, relative, sep } from "node:path";
import { fileURLToPath } from "node:url";
import sharp from "sharp";

const root = fileURLToPath(new URL("../public", import.meta.url));
const out = {};

async function walk(dir) {
  for (const entry of await readdir(dir, { withFileTypes: true })) {
    const full = join(dir, entry.name);
    if (entry.isDirectory()) await walk(full);
    else if (/\.(webp|jpe?g|png|avif)$/i.test(entry.name)) {
      const { width, height } = await sharp(full).metadata();
      out["/" + relative(root, full).split(sep).join("/")] = [width, height];
    }
  }
}

await walk(join(root, "images"));
await writeFile(new URL("../data/image-sizes.json", import.meta.url), JSON.stringify(out, null, 0) + "\n");
console.log(`Wrote ${Object.keys(out).length} image sizes to data/image-sizes.json`);
