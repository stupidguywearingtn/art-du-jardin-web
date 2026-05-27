// Diagnostic Supabase : quelles tables existent vraiment ?
import { createClient } from "@supabase/supabase-js";
import { readFileSync } from "node:fs";

const env = Object.fromEntries(
  readFileSync(".env", "utf8")
    .split("\n")
    .filter((l) => l.includes("="))
    .map((l) => {
      const idx = l.indexOf("=");
      return [l.slice(0, idx).trim(), l.slice(idx + 1).trim().replace(/^"|"$/g, "")];
    })
);

const supa = createClient(env.VITE_SUPABASE_URL, env.VITE_SUPABASE_PUBLISHABLE_KEY);

const tables = [
  "site_content",
  "site_content_fields",
  "user_roles",
  "gallery_categories",
  "gallery_photos",
  "project_types",
  "devis_requests",
  "why_us_section",
  "why_us_cards",
  "service_area",
  "service_area_cities",
  "gallery_section",
  "quote_section",
];

console.log(`Project: ${env.VITE_SUPABASE_PROJECT_ID}`);
console.log(`URL:     ${env.VITE_SUPABASE_URL}\n`);

for (const t of tables) {
  try {
    const { error, count } = await supa.from(t).select("*", { head: true, count: "exact" });
    if (error) {
      console.log(`❌ ${t.padEnd(28)} ${error.message}`);
    } else {
      console.log(`✅ ${t.padEnd(28)} ${count ?? 0} rows`);
    }
  } catch (e) {
    console.log(`💥 ${t.padEnd(28)} ${e.message}`);
  }
}
