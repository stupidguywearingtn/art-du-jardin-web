#!/usr/bin/env node
/**
 * Garde-fou "contenu figé" — côté BASE DE PRODUCTION (lecture seule).
 *
 * C'est le contrôle qui manquait : le 25/08/2026 les fichiers étaient corrects
 * et la base ne l'était pas. Ce script interroge la vraie base et échoue si le
 * contenu servi au visiteur repart en arrière.
 *
 *   npm run check:fige:prod
 *
 * Utilise la clé anon (publique, déjà présente dans le bundle du site) : aucune
 * écriture possible, aucun secret ici.
 */

const URL_BASE = process.env.SUPABASE_URL || "https://sqfysehpjlzbxdicyrmk.supabase.co";
const KEY =
  process.env.SUPABASE_PUBLISHABLE_KEY ||
  process.env.VITE_SUPABASE_PUBLISHABLE_KEY ||
  "";

if (!KEY) {
  console.error("SUPABASE_PUBLISHABLE_KEY manquante (clé anon publique).");
  process.exit(2);
}

const get = async (path) => {
  const r = await fetch(`${URL_BASE}/rest/v1/${path}`, {
    headers: { apikey: KEY, Authorization: `Bearer ${KEY}` },
  });
  if (!r.ok) throw new Error(`${path} → HTTP ${r.status}`);
  return r.json();
};

let failures = 0;
const fail = (m) => { console.error(`✗ ${m}`); failures++; };

const types = await get(
  "project_types?select=slug,label,description,price_from,show_price,active&order=display_order"
);

for (const t of types) {
  if (t.show_price) fail(`project_types.${t.slug} : show_price = true → un prix est affiché au visiteur`);
  if (t.price_from !== null) fail(`project_types.${t.slug} : price_from = ${t.price_from} → doit être NULL`);
  if (t.slug === "allee" && t.label !== "Chemin") fail(`project_types.allee : libellé « ${t.label} » → doit être « Chemin »`);
}

const forbidden = /180\s*°|160\s*°|depuis 2005|20 ann[ée]es|sous 48\s*h|48 heures|24 à 48/i;
for (const [table, query, fields] of [
  ["why_us_cards", "why_us_cards?select=title,description", ["title", "description"]],
  ["quote_section", "quote_section?select=tag,title,subtitle", ["tag", "title", "subtitle"]],
  ["service_area", "service_area?select=tag,title,description,cta_text", ["tag", "title", "description", "cta_text"]],
  ["gallery_section", "gallery_section?select=title,subtitle", ["title", "subtitle"]],
  ["site_content_fields", "site_content_fields?select=section_key,field_key,content_value", ["content_value"]],
]) {
  for (const row of await get(query)) {
    for (const f of fields) {
      const v = row[f];
      if (typeof v === "string" && forbidden.test(v)) {
        fail(`${table}.${f} : valeur interdite → « ${v.slice(0, 90)} »`);
      }
    }
  }
}

if (failures) {
  console.error(`\n${failures} régression(s) EN PRODUCTION. Correctif : supabase/FIX-CONTENU-FIGE.sql\n`);
  process.exit(1);
}
console.log("✓ Base de production conforme au contenu figé.");
