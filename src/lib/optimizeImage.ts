/**
 * Les images "geste/service/matiere" viennent du stockage cloud de Lovable
 * (chemins /__l5e/assets-v1/...) : les fichiers sources font 2,5 à 3 Mo
 * chacun (PNG non compressés), on n'a pas la main dessus pour les
 * recompresser à la source. On les fait passer par wsrv.nl (proxy resize
 * public, gratuit, sans clé API) qui va chercher l'original et sert une
 * version WebP compressée — réduction constatée d'environ 90 %.
 *
 * Les images déjà locales (/photos/..., déjà commitées et compressées) ou
 * déjà des URLs absolues externes ne sont pas touchées.
 */
// wsrv.nl doit pouvoir joindre l'original depuis l'extérieur pour le
// redimensionner — un window.location.origin en local (localhost) n'est
// jamais atteignable par leurs serveurs. On cible donc toujours le domaine
// public de prod, y compris en dev/preview : les assets Lovable sont les
// mêmes fichiers quel que soit le frontend qui les demande.
const PUBLIC_ORIGIN = "https://hcebtp.com";

export function optimizeImageUrl(src: string, width = 1200): string {
  if (!src || !src.startsWith("/__l5e/")) return src;
  const absolute = `${PUBLIC_ORIGIN}${src}`;
  const params = new URLSearchParams({
    url: absolute,
    w: String(width),
    q: "75",
    output: "webp",
  });
  return `https://wsrv.nl/?${params.toString()}`;
}
