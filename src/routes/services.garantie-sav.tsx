import { createFileRoute, redirect } from "@tanstack/react-router";

/**
 * Ancienne URL de la page « garantie-sav » (libellé retiré, voir CONTENU-FIGE.md).
 * 14/10/2026 : redirection rendue PERMANENTE (301). Elle partait en 307
 * (temporaire, valeur par défaut) : un moteur garde alors l'ancienne URL en
 * index et ne transfère pas clairement ses signaux à finitions-soignees.
 */
export const Route = createFileRoute("/services/garantie-sav")({
  beforeLoad: () => {
    throw redirect({ to: "/services/$slug", params: { slug: "finitions-soignees" }, statusCode: 301, replace: true });
  },
});
