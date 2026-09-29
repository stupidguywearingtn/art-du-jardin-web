/**
 * Dates de dernière mise à jour éditoriale, par URL.
 *
 * SOURCE UNIQUE. Ces dates sont publiées à deux endroits, qui doivent toujours
 * dire la même chose :
 *   1. visiblement sur la page, sous le bloc « savoir » (« Dernière mise à
 *      jour : … ») ;
 *   2. dans le `<lastmod>` du sitemap.
 *
 * Google ignore le `lastmod` d'un sitemap entier dès qu'il le juge peu fiable —
 * c'est-à-dire dès qu'il ne correspond pas à ce que voit l'utilisateur. Les
 * deux valeurs sont donc lues ici, et jamais recopiées : c'est ce qui empêche
 * la dérive (`llms.txt` a montré ce que devient une donnée dupliquée à la main).
 *
 * RÈGLE : ne modifier une date QUE lorsque le contenu de la page change
 * réellement. Jamais de date générée à la volée, jamais de date « rafraîchie »
 * pour faire récent : un `lastmod` gonflé est pire que pas de `lastmod`.
 *
 * `label` est écrit en toutes lettres plutôt que dérivé de `iso` : c'est du
 * texte visible, il n'a pas à dépendre d'un formateur d'exécution.
 *
 * Une seule URL du sitemap n'a volontairement PAS d'entrée ici —
 * `/realisations/chantier-en-cours` — parce qu'aucune date de mise à jour
 * éditoriale n'y est publiée. Elle sort donc du sitemap sans `lastmod`, ce que
 * la spécification autorise (l'élément est facultatif par URL). Le jour où
 * elle reçoit un bloc daté, ajouter sa clé ici suffit — c'est ce qui a été
 * fait pour l'accueil le 29/09/2026, quand il a reçu son bloc « Avant de
 * signer ».
 */
export type PageUpdate = { iso: string; label: string };

export const PAGE_UPDATED = {
  "/": { iso: "2026-09-29", label: "29 septembre 2026" },
  "/services/preparation-terrain": { iso: "2026-09-12", label: "12 septembre 2026" },
  "/services/enrobe-a-chaud": { iso: "2026-09-11", label: "11 septembre 2026" },
  "/services/maconnerie-generale": { iso: "2026-09-16", label: "16 septembre 2026" },
  "/services/drainage-pentes": { iso: "2026-09-13", label: "13 septembre 2026" },
  "/services/bordures-murets": { iso: "2026-09-17", label: "17 septembre 2026" },
  "/services/finitions-soignees": { iso: "2026-09-21", label: "21 septembre 2026" },
  "/realisations": { iso: "2026-09-28", label: "28 septembre 2026" },
  "/realisations/cour-allee-privee": { iso: "2026-09-23", label: "23 septembre 2026" },
  "/realisations/parking-voirie-pro": { iso: "2026-09-22", label: "22 septembre 2026" },
  "/realisations/preparation-terrassement": { iso: "2026-09-25", label: "25 septembre 2026" },
} satisfies Record<string, PageUpdate>;

export type UpdatedPath = keyof typeof PAGE_UPDATED;

/** Date de mise à jour d'une page service, par son slug. */
export const serviceUpdated = (slug: string): PageUpdate | undefined =>
  (PAGE_UPDATED as Record<string, PageUpdate>)[`/services/${slug}`];

/** Date de mise à jour d'un dossier de réalisation, par son slug. */
export const realisationUpdated = (slug: string): PageUpdate | undefined =>
  (PAGE_UPDATED as Record<string, PageUpdate>)[`/realisations/${slug}`];
