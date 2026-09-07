/**
 * Soumission IndexNow des URLs du sitemap.
 *
 * IndexNow prévient instantanément Bing, Yandex, Seznam et Naver qu'une URL est
 * nouvelle ou modifiée. Google ne participe PAS au protocole — ce script ne
 * remplace donc pas la Search Console, il couvre l'autre moitié du web : l'index
 * Bing alimente Copilot et la recherche web de ChatGPT, ce qui en fait le levier
 * GEO le plus direct dont on dispose depuis le repo.
 *
 * Prérequis : le fichier clé doit être déployé et accessible publiquement à
 * https://www.hcebtp.com/<KEY>.txt et contenir exactement la clé.
 *
 * Usage :  node scripts/indexnow-submit.mjs
 */

const KEY = "051b2d7c5dec4c46e59a45f33361b9ff";
const HOST = "www.hcebtp.com";
const ORIGIN = `https://${HOST}`;
const KEY_LOCATION = `${ORIGIN}/${KEY}.txt`;
const ENDPOINT = "https://api.indexnow.org/indexnow";

/** Doit rester aligné sur src/routes/sitemap[.]xml.ts */
const PATHS = [
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

async function main() {
  // 1. Vérifier que le fichier clé est bien servi : sans lui, IndexNow rejette
  //    la soumission (422) et le domaine peut être mis en quarantaine.
  const check = await fetch(KEY_LOCATION);
  const body = check.ok ? (await check.text()).trim() : "";
  if (!check.ok || body !== KEY) {
    console.error(
      `[indexnow] Fichier clé introuvable ou incorrect : ${KEY_LOCATION} ` +
        `(HTTP ${check.status}, contenu "${body.slice(0, 40)}"). Déploie d'abord public/${KEY}.txt.`,
    );
    process.exit(1);
  }
  console.log(`[indexnow] Fichier clé OK : ${KEY_LOCATION}`);

  const urlList = PATHS.map((p) => `${ORIGIN}${p}`);
  const res = await fetch(ENDPOINT, {
    method: "POST",
    headers: { "Content-Type": "application/json; charset=utf-8" },
    body: JSON.stringify({ host: HOST, key: KEY, keyLocation: KEY_LOCATION, urlList }),
  });

  const text = await res.text().catch(() => "");
  console.log(`[indexnow] ${urlList.length} URLs soumises → HTTP ${res.status} ${text}`);

  // 200 = accepté, 202 = accepté, clé en cours de vérification (cas normal
  // pour un domaine encore inconnu des moteurs).
  if (res.status !== 200 && res.status !== 202) process.exit(1);
}

main().catch((e) => {
  console.error("[indexnow]", e);
  process.exit(1);
});
