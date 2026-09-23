#!/usr/bin/env node
/**
 * Vérifie qu'un JSON-LD `FAQPage` correspond bien à une FAQ RÉELLEMENT visible
 * dans le HTML servi — un mismatch entre les deux est sanctionnable par Google.
 *
 * POURQUOI CE FICHIER EXISTE : ce contrôle a été refait à la main, en jetable,
 * à chaque run qui ajoutait un bloc de Q/R (11, 12, 13, 16, 17, 20, 21 et
 * 22/09/2026). Le 22/09, la version jetable du jour a annoncé un faux mismatch
 * (2/5 questions, 0/5 réponses) simplement parce qu'elle comparait le JSON-LD,
 * servi avec des apostrophes brutes, au texte visible, servi avec les
 * apostrophes échappées en `&#x27;`. **Règle figée ici : on décode les entités
 * HTML des DEUX côtés avant de comparer.** Sans ça, toute chaîne contenant
 * `'`, `œ` ou `&` produit un faux négatif.
 *
 * Usage :
 *   node scripts/verif-faq.mjs <url> [url...]
 *   node scripts/verif-faq.mjs http://127.0.0.1:4175/realisations/cour-allee-privee
 *   node scripts/verif-faq.mjs https://www.hcebtp.com/services/enrobe-a-chaud
 *
 * Sortie : une ligne de bilan par URL, puis le détail des Q/R introuvables.
 * Code de sortie 1 dès qu'une question ou une réponse du JSON-LD n'est pas
 * retrouvée dans le texte visible.
 */

const UA = "Mozilla/5.0 (compatible; Googlebot/2.1; +http://www.google.com/bot.html)";

const NOMMEES = {
  amp: "&",
  lt: "<",
  gt: ">",
  quot: '"',
  apos: "'",
  nbsp: " ",
  laquo: "«",
  raquo: "»",
  eacute: "é",
  egrave: "è",
  ecirc: "ê",
  agrave: "à",
  ccedil: "ç",
  ugrave: "ù",
  ucirc: "û",
  icirc: "î",
  ocirc: "ô",
  oelig: "œ",
  deg: "°",
  euro: "€",
  hellip: "…",
  rsquo: "’",
  lsquo: "‘",
  ndash: "–",
  mdash: "—",
  times: "×",
  middot: "·",
  eur: "€",
};

/** Décodage des entités HTML — numériques décimales, hexadécimales et nommées. */
function decode(s) {
  return s
    .replace(/&#x([0-9a-f]+);/gi, (_, h) => String.fromCodePoint(parseInt(h, 16)))
    .replace(/&#(\d+);/g, (_, d) => String.fromCodePoint(parseInt(d, 10)))
    .replace(/&([a-z]+);/gi, (m, n) => NOMMEES[n.toLowerCase()] ?? m);
}

/**
 * Forme normalisée pour la comparaison : entités décodées, apostrophes et
 * guillemets typographiques ramenés à leur forme droite, espaces (y compris
 * insécables) réduits à un espace simple. On ne touche NI à la casse NI aux
 * accents : deux textes qui ne diffèrent que par là doivent rester distincts.
 */
function normalise(s) {
  return decode(s)
    .replace(/[’‘‛]/g, "'")
    .replace(/[“”«»]/g, '"')
    .replace(/[   ]/g, " ")
    .replace(/\s+/g, " ")
    .trim();
}

/** Texte visible : mêmes règles que scripts/mesure-texte-servi.mjs, entités décodées en plus. */
function texteVisible(html) {
  return normalise(
    html
      .replace(/<script[\s\S]*?<\/script>/gi, " ")
      .replace(/<style[\s\S]*?<\/style>/gi, " ")
      .replace(/<[^>]+>/g, " "),
  );
}

/** Tous les blocs JSON-LD de la page, décodés et analysés. */
function blocsJsonLd(html) {
  const out = [];
  const re = /<script[^>]+type=["']application\/ld\+json["'][^>]*>([\s\S]*?)<\/script>/gi;
  let m;
  while ((m = re.exec(html)) !== null) {
    try {
      out.push(JSON.parse(decode(m[1])));
    } catch (e) {
      out.push({ __erreur: e.message, __brut: m[1].slice(0, 120) });
    }
  }
  return out;
}

const urls = process.argv.slice(2);
if (urls.length === 0) {
  console.error("usage : node scripts/verif-faq.mjs <url> [url...]");
  process.exit(2);
}

let echec = false;

for (const url of urls) {
  let html;
  try {
    const r = await fetch(url, { headers: { "User-Agent": UA } });
    if (!r.ok) {
      console.log(`✗ ${url} — HTTP ${r.status}`);
      echec = true;
      continue;
    }
    html = await r.text();
  } catch (e) {
    console.log(`✗ ${url} — ${e.message}`);
    echec = true;
    continue;
  }

  const blocs = blocsJsonLd(html);
  const casses = blocs.filter((b) => b.__erreur);
  for (const b of casses) {
    console.log(`✗ ${url} — JSON-LD illisible : ${b.__erreur} (${b.__brut}…)`);
    echec = true;
  }

  const faqs = blocs.filter((b) => b["@type"] === "FAQPage");
  if (faqs.length === 0) {
    console.log(`· ${url} — aucun FAQPage (${blocs.length} bloc(s) JSON-LD)`);
    continue;
  }

  const visible = texteVisible(html);
  for (const faq of faqs) {
    const qa = faq.mainEntity ?? [];
    const manquants = [];
    let okQ = 0;
    let okA = 0;
    for (const item of qa) {
      const q = normalise(String(item.name ?? ""));
      const a = normalise(String(item.acceptedAnswer?.text ?? ""));
      if (q && visible.includes(q)) okQ++;
      else manquants.push(["question", q]);
      if (a && visible.includes(a)) okA++;
      else manquants.push(["réponse", a]);
    }
    const ok = okQ === qa.length && okA === qa.length;
    if (!ok) echec = true;
    console.log(
      `${ok ? "✓" : "✗"} ${url} — ${okQ}/${qa.length} questions et ${okA}/${qa.length} réponses du FAQPage retrouvées dans le texte visible`,
    );
    for (const [genre, texte] of manquants) {
      console.log(`    ↳ ${genre} absente du visible : « ${texte.slice(0, 110)}… »`);
    }
  }
}

process.exit(echec ? 1 : 0);
