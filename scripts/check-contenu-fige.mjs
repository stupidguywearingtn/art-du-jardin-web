#!/usr/bin/env node
/**
 * Garde-fou "contenu figé" — HCE BTP.
 *
 * Échoue (exit 1) si une valeur déjà corrigée avec le client réapparaît dans
 * le code ou dans un seed SQL. Voir CONTENU-FIGE.md pour le pourquoi.
 *
 *   npm run check:fige
 *
 * Ne vérifie que le REPO. La base de production se vérifie avec
 * `npm run check:fige:prod` (lecture seule, clé anon publique).
 */

import { readFileSync, readdirSync, statSync } from "node:fs";
import { join, relative, extname } from "node:path";

const ROOT = new URL("..", import.meta.url).pathname;
const EXTS = new Set([".ts", ".tsx", ".sql", ".json", ".md", ".txt", ".html"]);
const SKIP_DIRS = new Set([
  "node_modules", ".git", "dist", ".vercel", ".output", "screenshots-admin",
  "_archived_admin", "docs",
]);
// Fichiers qui documentent justement les interdits : on ne s'auto-signale pas.
const SKIP_FILES = new Set([
  "CONTENU-FIGE.md",
  "SEO-JOURNAL.md",
  "ACTIONS-SEO-CLIENT.md",
  "ACTIONS-USER-REQUISES.md",
  "package-lock.json",
  "bun.lockb",
  "scripts/check-contenu-fige.mjs",
  "supabase/FIX-CONTENU-FIGE.sql",
  // Migration de RÉPARATION : elle contient volontairement l'ancienne valeur
  // dans un REPLACE('180°C', '150°C'). C'est le correctif, pas la faute.
  "supabase/migrations/20260706122222_bc19b73c-397f-4544-8bb7-46f53858b8b9.sql",
]);

const RULES = [
  { re: /show_price\s*[:=]\s*true|show_price[^\n]{0,30}default\s+true/gi,
    msg: "show_price activé — aucun prix ne doit être affiché au visiteur" },
  { re: /'All[ée]e'|"All[ée]e"|label:\s*"All[ée]e"/g,
    msg: "libellé « Allée » — le type de projet s'appelle « Chemin »" },
  { re: /180\s*°\s*C|160\s*°\s*C|180\s*degr|160\s*degr/gi,
    msg: "température erronée — l'enrobé est posé à 150°C" },
  { re: /depuis\s*2005|en\s*2005/gi,
    msg: "année erronée — HCE existe depuis 2012" },
  { re: /20\s*ann[ée]es?\s*d['’]exp|20\s*ans\s*d['’]exp/gi,
    msg: "ancienneté erronée — 14 années d'expérience" },
  { re: /devis\s*(gratuit\s*)?sous\s*48\s*h|sous\s*48\s*heures|24\s*à\s*48\s*h/gi,
    msg: "promesse de délai 48h — le client a imposé « Devis détaillé », sans délai" },
  { re: /pos[ée]\s*au\s*finisseur/gi,
    msg: "« posé au finisseur » — le client dit « posé à la main »" },
  { re: /enrob[ée]\s*fin\s*ou\s*[ée]pais/gi,
    msg: "« enrobé fin ou épais » — dire « sous différentes granulations »" },
  { re: /Garantie\s*&\s*SAV|Garantie\s*et\s*SAV/gi,
    msg: "« Garantie & SAV » supprimé — garder seulement la mention légale décennale" },
  { re: /Reprise\s*imm[ée]diate/gi,
    msg: "« Reprise immédiate » — remplacé par « Demande de validation »" },
];

function walk(dir, out = []) {
  for (const name of readdirSync(dir)) {
    if (SKIP_DIRS.has(name)) continue;
    const full = join(dir, name);
    if (statSync(full).isDirectory()) walk(full, out);
    else if (EXTS.has(extname(name))) out.push(full);
  }
  return out;
}

let failures = 0;
for (const file of walk(ROOT)) {
  const rel = relative(ROOT, file).replace(/\\/g, "/");
  if (SKIP_FILES.has(rel)) continue;
  const lines = readFileSync(file, "utf8").split("\n");
  lines.forEach((line, i) => {
    for (const { re, msg } of RULES) {
      re.lastIndex = 0;
      if (re.test(line)) {
        console.error(`\n✗ ${rel}:${i + 1}\n  ${msg}\n  → ${line.trim().slice(0, 140)}`);
        failures++;
      }
    }
  });
}

if (failures) {
  console.error(`\n${failures} violation(s) du contenu figé. Voir CONTENU-FIGE.md.\n`);
  process.exit(1);
}
console.log("✓ Contenu figé : aucune régression dans le repo.");
