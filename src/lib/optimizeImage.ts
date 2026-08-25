/**
 * Les images "geste/service/matiere" sont des originaux non compressés
 * (2,5 à 3 Mo chacun, PNG) servis depuis /assets/ (public/assets/). On les
 * fait passer par wsrv.nl (proxy resize public, gratuit, sans clé API) qui
 * va chercher l'original et sert une version WebP compressée — réduction
 * constatée d'environ 90 %.
 *
 * Les images déjà locales et légères (/photos/..., déjà commitées et
 * compressées) ou déjà des URLs absolues externes ne sont pas touchées.
 */
// wsrv.nl doit pouvoir joindre l'original depuis l'extérieur pour le
// redimensionner — un window.location.origin en local (localhost) n'est
// jamais atteignable par leurs serveurs. On cible donc toujours le domaine
// public de prod, y compris en dev/preview.
const PUBLIC_ORIGIN = "https://hcebtp.com";

export function optimizeImageUrl(src: string, width = 1200): string {
  if (!src || !src.startsWith("/assets/")) return src;
  const absolute = `${PUBLIC_ORIGIN}${src}`;
  const params = new URLSearchParams({
    url: absolute,
    w: String(width),
    q: "75",
    output: "webp",
  });
  return `https://wsrv.nl/?${params.toString()}`;
}
