// Writes data/image-meta.json: intrinsic size + a tiny blurred placeholder for every
// image in /public/images, so next/image can reserve space (no layout shift) and fade
// in from a blur. Run after adding or replacing images:  npm run images
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
      const img = sharp(full);
      const { width, height } = await img.metadata();
      const blur = await img.clone().resize(16).webp({ quality: 40 }).toBuffer();
      out["/" + relative(root, full).split(sep).join("/")] = {
        w: width,
        h: height,
        blur: `data:image/webp;base64,${blur.toString("base64")}`,
      };
    }
  }
}

await walk(join(root, "images"));
await writeFile(new URL("../data/image-meta.json", import.meta.url), JSON.stringify(out) + "\n");
console.log(`Wrote metadata for ${Object.keys(out).length} images to data/image-meta.json`);
