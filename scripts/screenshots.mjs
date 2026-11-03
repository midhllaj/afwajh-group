// Full-page screenshots of every route at phone and desktop widths, for visual QA.
// Usage: node scripts/screenshots.mjs [baseUrl] [outDir]   (needs Google Chrome installed)
import { chromium } from "playwright-core";
import { mkdir } from "node:fs/promises";

const base = process.argv[2] ?? "http://localhost:3000";
const out = process.argv[3] ?? "screenshots";
const routes = (process.env.ROUTES ?? "/,/businesses/supermarkets-minimarts,/businesses/restaurants-cafeterias,/businesses/catering,/businesses/fhm-general-transport,/businesses/general-trading,/businesses/technical-services,/businesses/labour-supply,/about,/businesses,/clients,/contact,/missing-page").split(",");
const widths = (process.env.WIDTHS ?? "390,1440").split(",").map(Number);

await mkdir(out, { recursive: true });
const browser = await chromium.launch({ channel: "chrome" });
for (const width of widths) {
  const ctx = await browser.newContext({ viewport: { width, height: width < 768 ? 844 : 900 }, deviceScaleFactor: 1, hasTouch: width < 768 });
  // Skip the first-visit intro loader.
  await ctx.addInitScript(() => localStorage.setItem("afw-intro-seen", "1"));
  const page = await ctx.newPage();
  for (const route of routes) {
    await page.goto(base + route, { waitUntil: "networkidle" });
    await page.waitForTimeout(800);
    // Scroll through to trigger every reveal, then return to top.
    const h = await page.evaluate(() => document.documentElement.scrollHeight);
    for (let y = 0; y < h; y += 500) {
      await page.evaluate((v) => window.scrollTo(0, v), y);
      await page.waitForTimeout(120);
    }
    await page.waitForTimeout(1500);
    await page.evaluate(() => window.scrollTo(0, 0));
    await page.waitForTimeout(600);
    const name = `${width}${route === "/" ? "-home" : route.replaceAll("/", "-")}.png`;
    await page.screenshot({ path: `${out}/${name}`, fullPage: true });
    console.log("saved", name);
  }
  await ctx.close();
}
await browser.close();
