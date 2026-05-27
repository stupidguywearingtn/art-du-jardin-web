import { createClient } from "@supabase/supabase-js";
import { readFileSync } from "node:fs";

const env = Object.fromEntries(
  readFileSync(".env", "utf8")
    .split("\n").filter((l) => l.includes("="))
    .map((l) => { const i = l.indexOf("="); return [l.slice(0, i).trim(), l.slice(i + 1).trim().replace(/^"|"$/g, "")]; })
);

const supa = createClient(env.VITE_SUPABASE_URL, env.VITE_SUPABASE_PUBLISHABLE_KEY);

// Tentative d'INSERT en anon — devrait être refusé par RLS
const tests = [
  ["why_us_section", { id: 1, tag: "test", title: "test", cta_text: "test" }],
  ["service_area", { id: 1, tag: "test", title: "test", description: "test", cta_text: "test" }],
  ["gallery_section", { id: 1, subtitle: "test", title: "test" }],
  ["quote_section", { id: 1, tag: "test", title: "test", subtitle: "test" }],
];

for (const [t, row] of tests) {
  const { error } = await supa.from(t).upsert(row);
  console.log(`${t}: ${error ? "❌ " + error.message.slice(0, 80) : "✅ écriture OK (anon)"}`);
}
