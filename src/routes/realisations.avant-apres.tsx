import { createFileRoute, redirect } from "@tanstack/react-router";

/**
 * Section « Avant / après » RETIRÉE à la demande du client (17/09/2026).
 *
 * La route est gardée uniquement pour rediriger en 301 l'ancienne URL,
 * déjà soumise à Google/Bing via le sitemap et IndexNow : sans ça elle
 * finirait en 404. Ne pas la réactiver — voir CONTENU-FIGE.md.
 */
export const Route = createFileRoute("/realisations/avant-apres")({
  beforeLoad: () => {
    throw redirect({ to: "/", hash: "galerie", statusCode: 301, replace: true });
  },
});
