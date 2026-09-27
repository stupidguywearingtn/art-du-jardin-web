#!/usr/bin/env node
/**
 * Vérifie que le `<lastmod>` du sitemap dit exactement la même chose que la
 * date affichée sur la page (« Dernière mise à jour : … »).
 *
 * POURQUOI CE FICHIER EXISTE : Google n'accorde de crédit au `lastmod` d'un
 * sitemap que s'il le juge fiable, et il le juge en le comparant à ce que voit
 * l'utilisateur. Un `lastmod` qui avance tout seul, ou qui contredit la page,
 * fait ignorer le `lastmod` de TOUT le sitemap — on perd alors le signal sur
 * les pages honnêtes aussi. Les deux valeurs sont donc lues dans une source
 * unique, `src/lib/lastmod.ts` ; ce script prouve qu'elles n'ont pas divergé
 * sur le site réellement servi, ce qu'une lecture du code ne peut pas prouver
 * (le rendu peut être surchargé côté CMS, cf. le cas `FAQS` du 09/09/2026).
 *
 * Il contrôle trois choses, par URL du sitemap :
 *   1. une page qui affiche une date doit avoir un `lastmod` — et l'inverse ;
 *   2. `lastmod` doit être égal au `datetime` de la balise `<time>` ;
 *   3. le libellé visible doit désigner le même jour que ce `datetime`.
 *
 * Usage :
 *   node scripts/verif-lastmod.mjs                        # production
 *   node scripts/verif-lastmod.mjs http://127.0.0.1:4175  # banc d'essai local
 *
 * Sort en code 1 dès qu'une incohérence est trouvée, pour servir de garde-fou
 * avant un push.
 */

const UA = "Mozilla/5.0 (compatible; Googlebot/2.1; +http://www.google.com/bot.html)";
const base = (process.argv[2] || "https://www.hcebtp.com").replace(/\/$/, "");

const MOIS = [
  "janvier",
  "février",
  "mars",
  "avril",
  "mai",
  "juin",
  "juillet",
  "août",
  "septembre",
  "octobre",
  "novembre",
  "décembre",
];

/** « 17 septembre 2026 » -> « 2026-09-17 ». Renvoie null si illisible. */
function isoDuLibelle(label) {
  const m = label
    .normalize("NFC")
    .trim()
    .match(/^(\d{1,2})(?:er)?\s+([^\s]+)\s+(\d{4})$/);
  if (!m) return null;
  const mois = MOIS.indexOf(m[2].toLowerCase());
  if (mois < 0) return null;
  return `${m[3]}-${String(mois + 1).padStart(2, "0")}-${m[1].padStart(2, "0")}`;
}

const get = async (url) => {
  const r = await fetch(url, { headers: { "User-Agent": UA } });
  return { code: r.status, body: await r.text() };
};

const sitemap = await get(`${base}/sitemap.xml`);
if (sitemap.code !== 200) {
  console.error(`✗ ${base}/sitemap.xml — HTTP ${sitemap.code}`);
  process.exit(1);
}

const entries = [...sitemap.body.matchAll(/<url>([\s\S]*?)<\/url>/g)].map((m) => {
  const bloc = m[1];
  const loc = bloc.match(/<loc>([^<]+)<\/loc>/)?.[1] ?? "";
  const lastmod = bloc.match(/<lastmod>([^<]+)<\/lastmod>/)?.[1] ?? null;
  return { path: new URL(loc).pathname, lastmod };
});

if (entries.length === 0) {
  console.error("✗ sitemap illisible : aucune balise <url> trouvée");
  process.exit(1);
}

let erreurs = 0;
const lignes = [];

for (const e of entries) {
  const page = await get(`${base}${e.path}`);
  if (page.code !== 200) {
    console.error(`✗ ${e.path} — HTTP ${page.code}`);
    erreurs++;
    continue;
  }

  // Le rendu écrit l'attribut en `dateTime` (React) ; HTML le lit sans tenir
  // compte de la casse, donc on le cherche de même.
  const t = page.body.match(/<time[^>]*\sdatetime="([^"]+)"[^>]*>([^<]*)<\/time>/i);
  const visibleIso = t?.[1] ?? null;
  const visibleLabel = t?.[2]?.trim() ?? null;

  if (!e.lastmod && !visibleIso) {
    lignes.push(`· ${e.path} — pas de date affichée, pas de lastmod (cohérent)`);
    continue;
  }
  if (!e.lastmod && visibleIso) {
    console.error(`✗ ${e.path} — la page affiche ${visibleIso} mais le sitemap n'a pas de lastmod`);
    erreurs++;
    continue;
  }
  if (e.lastmod && !visibleIso) {
    console.error(
      `✗ ${e.path} — lastmod ${e.lastmod} au sitemap, mais aucune date affichée sur la page`,
    );
    erreurs++;
    continue;
  }
  if (e.lastmod !== visibleIso) {
    console.error(`✗ ${e.path} — lastmod ${e.lastmod} ≠ date affichée ${visibleIso}`);
    erreurs++;
    continue;
  }

  const isoLabel = isoDuLibelle(visibleLabel);
  if (isoLabel === null) {
    console.error(`✗ ${e.path} — libellé visible illisible : « ${visibleLabel} »`);
    erreurs++;
    continue;
  }
  if (isoLabel !== visibleIso) {
    console.error(`✗ ${e.path} — « ${visibleLabel} » ne correspond pas à ${visibleIso}`);
    erreurs++;
    continue;
  }

  lignes.push(`✓ ${e.path} — ${e.lastmod} (« ${visibleLabel} »)`);
}

for (const l of lignes) console.log(l);

const avecDate = entries.filter((e) => e.lastmod).length;
if (erreurs > 0) {
  console.error(
    `\n✗ ${erreurs} incohérence(s) sur ${entries.length} URLs — ne pas pousser en l'état`,
  );
  process.exit(1);
}
console.log(
  `\n✓ ${base} — ${entries.length} URLs cohérentes, dont ${avecDate} avec lastmod aligné sur la date affichée`,
);
