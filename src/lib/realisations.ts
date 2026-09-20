/**
 * Source unique des quatre dossiers de réalisations et de leur rattachement
 * aux pages service.
 *
 * Pourquoi ce fichier : le tableau vivait dans `routes/realisations.$slug.tsx`
 * et le hub `/realisations` (créé le 20/09/2026) en a besoin aussi. Le
 * recopier aurait garanti la divergence au premier renommage — c'est
 * exactement le défaut que le journal SEO relève sur les libellés de
 * catégories. Les titres, eux, ne sont pas dupliqués ici : ils viennent de
 * `fallbackCategoryBySlug`, la même source que les `<h1>`.
 *
 * La page « Avant / après » a été retirée à la demande du client (17/09/2026) :
 * ne pas la réintroduire ici. Voir CONTENU-FIGE.md.
 */

/** Les quatre dossiers, dans l'ordre d'affichage de la galerie de l'accueil. */
export const REAL_CAT_SLUGS = [
  "cour-allee-privee",
  "parking-voirie-pro",
  "preparation-terrassement",
  "chantier-en-cours",
] as const;

/**
 * Les services que chaque type de chantier met réellement en œuvre — aucune
 * association décorative : un parking passe bien par la préparation de
 * terrain, une cour privée par les finitions.
 *
 * Origine (constat du 14/09/2026) : aucune page du site ne liait les URLs
 * `/realisations/*` dans le HTML servi, et ces pages ne renvoyaient qu'un lien
 * vers `/`. Elles n'étaient atteignables que par le sitemap. Ce tableau est ce
 * qui les relie au reste du site.
 */
export const RELATED_SERVICES: Record<string, { slug: string; label: string }[]> = {
  "cour-allee-privee": [
    { slug: "enrobe-a-chaud", label: "Enrobé à chaud" },
    { slug: "finitions-soignees", label: "Finitions soignées" },
  ],
  "parking-voirie-pro": [
    { slug: "enrobe-a-chaud", label: "Enrobé à chaud" },
    { slug: "preparation-terrain", label: "Préparation de terrain" },
  ],
  "preparation-terrassement": [
    { slug: "preparation-terrain", label: "Préparation de terrain" },
    { slug: "drainage-pentes", label: "Drainage & pentes" },
  ],
  "chantier-en-cours": [
    { slug: "enrobe-a-chaud", label: "Enrobé à chaud" },
    { slug: "preparation-terrain", label: "Préparation de terrain" },
  ],
};

/** Repli lisible pour un slug inconnu : « mots-avec-tirets » → « Mots avec tirets ». */
export function titleCaseSlug(slug: string): string {
  return slug
    .split("-")
    .map((w) => (w ? w[0].toUpperCase() + w.slice(1) : w))
    .join(" ");
}
