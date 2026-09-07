import { createFileRoute } from "@tanstack/react-router";
import type {} from "@tanstack/react-start";

// Hôte réellement servi : l'apex hcebtp.com répond 308 vers www.hcebtp.com.
// Le sitemap, les canonical et robots.txt doivent tous pointer vers cet hôte,
// sinon on donne au crawler des URLs qui redirigent (signal de canonicalisation
// contradictoire, coûteux sur un domaine encore non découvert).
const BASE_URL = "https://www.hcebtp.com";

interface SitemapEntry {
  path: string;
  changefreq?: "always" | "hourly" | "daily" | "weekly" | "monthly" | "yearly" | "never";
  priority?: string;
}

export const Route = createFileRoute("/sitemap.xml")({
  server: {
    handlers: {
      GET: async () => {
        const entries: SitemapEntry[] = [
          { path: "/", changefreq: "weekly", priority: "1.0" },
          { path: "/services/preparation-terrain", changefreq: "monthly", priority: "0.8" },
          { path: "/services/enrobe-a-chaud", changefreq: "monthly", priority: "0.8" },
          { path: "/services/maconnerie-generale", changefreq: "monthly", priority: "0.8" },
          { path: "/services/drainage-pentes", changefreq: "monthly", priority: "0.8" },
          { path: "/services/bordures-murets", changefreq: "monthly", priority: "0.8" },
          { path: "/services/finitions-soignees", changefreq: "monthly", priority: "0.8" },
          { path: "/realisations/avant-apres", changefreq: "weekly", priority: "0.7" },
          { path: "/realisations/cour-allee-privee", changefreq: "weekly", priority: "0.7" },
          { path: "/realisations/parking-voirie-pro", changefreq: "weekly", priority: "0.7" },
          { path: "/realisations/preparation-terrassement", changefreq: "weekly", priority: "0.7" },
          { path: "/realisations/chantier-en-cours", changefreq: "weekly", priority: "0.7" },
        ];

        const urls = entries.map((e) =>
          [
            `  <url>`,
            `    <loc>${BASE_URL}${e.path}</loc>`,
            e.changefreq ? `    <changefreq>${e.changefreq}</changefreq>` : null,
            e.priority ? `    <priority>${e.priority}</priority>` : null,
            `  </url>`,
          ]
            .filter(Boolean)
            .join("\n"),
        );

        const xml = [
          `<?xml version="1.0" encoding="UTF-8"?>`,
          `<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">`,
          ...urls,
          `</urlset>`,
        ].join("\n");

        return new Response(xml, {
          headers: {
            "Content-Type": "application/xml",
            "Cache-Control": "public, max-age=3600",
          },
        });
      },
    },
  },
});
