#!/usr/bin/env node
/**
 * Mesure le texte réellement servi par une page, vue comme Googlebot.
 *
 * POURQUOI CE FICHIER EXISTE : le journal SEO compare d'un run à l'autre le
 * volume de texte servi par chaque URL du sitemap — une page très en dessous
 * des autres signale un contenu qui ne sort pas côté serveur. Jusqu'ici chaque
 * run réécrivait son propre extracteur, avec des règles de normalisation
 * différentes : le 15/09/2026, deux extracteurs ont donné 5 160 et 5 340
 * caractères pour le MÊME HTML, ce qui rend toute comparaison inter-runs
 * illisible. Ce script fige la méthode : l'utiliser pour les deux côtés d'une
 * mesure avant/après, et pour toute comparaison avec un run précédent.
 *
 * Règle de mesure : on retire <script> et <style>, puis toutes les balises,
 * puis les entités, puis on réduit toute suite d'espaces à un espace unique.
 *
 * Usage :
 *   node scripts/mesure-texte-servi.mjs <base> [chemin...]
 *   node scripts/mesure-texte-servi.mjs https://www.hcebtp.com
 *   node scripts/mesure-texte-servi.mjs http://127.0.0.1:4175 /services/bordures-murets
 *
 * Sans chemin, mesure les 12 URLs du sitemap. Sortie : une ligne par URL,
 * colonnes séparées par des tabulations — code HTTP, caractères de texte,
 * nombre de blocs JSON-LD, nombre de liens /realisations/* distincts, URL.
 */

const UA = "Mozilla/5.0 (compatible; Googlebot/2.1; +http://www.google.com/bot.html)";

const SITEMAP = [
  "/",
  "/services/preparation-terrain",
  "/services/enrobe-a-chaud",
  "/services/maconnerie-generale",
  "/services/drainage-pentes",
  "/services/bordures-murets",
  "/services/finitions-soignees",
  "/realisations/avant-apres",
  "/realisations/cour-allee-privee",
  "/realisations/parking-voirie-pro",
  "/realisations/preparation-terrassement",
  "/realisations/chantier-en-cours",
];

const base = (process.argv[2] ?? "https://www.hcebtp.com").replace(/\/$/, "");
const paths = process.argv.length > 3 ? process.argv.slice(3) : SITEMAP;

function texteServi(html) {
  return html
    .replace(/<script[\s\S]*?<\/script>/gi, " ")
    .replace(/<style[\s\S]*?<\/style>/gi, " ")
    .replace(/<[^>]+>/g, " ")
    .replace(/&[a-z]+;|&#\d+;|&#x[0-9a-f]+;/gi, " ")
    .replace(/\s+/g, " ")
    .trim();
}

console.log(["code", "car.", "jsonld", "liensR", "url"].join("\t"));

for (const chemin of paths) {
  const url = base + (chemin === "/" ? "/" : chemin);
  let html = "";
  let status = 0;
  try {
    const r = await fetch(url, { headers: { "User-Agent": UA } });
    status = r.status;
    html = await r.text();
  } catch (e) {
    console.log(["ERR", "-", "-", "-", `${chemin}  (${e.message})`].join("\t"));
    continue;
  }
  const jsonld = (html.match(/<script[^>]+application\/ld\+json/gi) ?? []).length;
  const liens = new Set(html.match(/\/realisations\/[a-z0-9-]+/g) ?? []).size;
  console.log([status, texteServi(html).length, jsonld, liens, chemin].join("\t"));
}
