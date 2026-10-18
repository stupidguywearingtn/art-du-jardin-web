/**
 * Les images "geste/service/matiere" sont des originaux non compressés
 * (2,5 à 3 Mo chacun, PNG) servis depuis /assets/ (public/assets/). On les
 * fait passer par wsrv.nl (proxy resize public, gratuit, sans clé API) qui
 * va chercher l'original et sert une version WebP compressée — réduction
 * constatée d'environ 90 %.
 *
 * Les images de /photos/... et les URLs absolues externes ne sont pas
 * touchées. ⚠️ /photos/ n'était PAS entièrement léger : cinq PNG de 2,5 à
 * 3,3 Mo y étaient servis bruts (constaté le 18/10/2026). Ils ont désormais
 * une copie .webp (≤ 1600 px, q≈78) à côté de l'original, et le code pointe
 * vers le .webp. Toute nouvelle photo ajoutée dans /photos doit être
 * compressée avant commit.
 */
// wsrv.nl doit pouvoir joindre l'original depuis l'extérieur pour le
// redimensionner — un window.location.origin en local (localhost) n'est
// jamais atteignable par leurs serveurs. On cible donc toujours le domaine
// public de prod, y compris en dev/preview.
const PUBLIC_ORIGIN = "https://www.hcetp.com";

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
