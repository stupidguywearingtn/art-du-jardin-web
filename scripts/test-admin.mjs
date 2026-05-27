import { chromium } from "playwright";
import { mkdirSync } from "node:fs";

const url = process.argv[2] || "http://localhost:8081";
mkdirSync("./screenshots-admin", { recursive: true });

const browser = await chromium.launch();
const ctx = await browser.newContext({
  viewport: { width: 1440, height: 900 },
  deviceScaleFactor: 1,
});
const page = await ctx.newPage();

const errs = [];
page.on("pageerror", (e) => errs.push(`pageerror: ${e.message}`));
page.on("console", (m) => m.type() === "error" && errs.push(`console: ${m.text()}`));

console.log("→ /login");
await page.goto(`${url}/login`, { waitUntil: "networkidle" });
await page.waitForTimeout(500);
await page.screenshot({ path: "./screenshots-admin/01-login.png" });

console.log("→ /admin (should redirect to /login if not signed in)");
await page.goto(`${url}/admin`, { waitUntil: "networkidle" });
await page.waitForTimeout(800);
await page.screenshot({ path: "./screenshots-admin/02-admin-page.png" });

console.log("→ home (public)");
await page.goto(url, { waitUntil: "networkidle" });
await page.waitForTimeout(1500);
await page.screenshot({ path: "./screenshots-admin/03-home.png", fullPage: false });

console.log("→ scroll home jusqu'à Galerie");
await page.evaluate(() => {
  const el = document.querySelector("#galerie") || document.body;
  el.scrollIntoView({ behavior: "instant", block: "start" });
});
await page.waitForTimeout(800);
await page.screenshot({ path: "./screenshots-admin/04-home-galerie.png", fullPage: false });

console.log("→ /realisations/cour-allee-privee");
await page.goto(`${url}/realisations/cour-allee-privee`, { waitUntil: "networkidle" });
await page.waitForTimeout(1500);
await page.screenshot({ path: "./screenshots-admin/05-realisations.png", fullPage: false });

console.log("\nErreurs console :");
errs.forEach((e) => console.log("  -", e));
if (errs.length === 0) console.log("  (aucune)");

await browser.close();
console.log("\nDone.");
