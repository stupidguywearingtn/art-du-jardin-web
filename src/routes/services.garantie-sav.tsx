import { createFileRoute, redirect } from "@tanstack/react-router";

export const Route = createFileRoute("/services/garantie-sav")({
  beforeLoad: () => {
    throw redirect({ to: "/services/$slug", params: { slug: "finitions-soignees" }, replace: true });
  },
});
