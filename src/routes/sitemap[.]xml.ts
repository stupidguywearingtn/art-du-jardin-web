import { createFileRoute } from "@tanstack/react-router";
import type {} from "@tanstack/react-start";
import { PAGE_UPDATED } from "@/lib/lastmod";

// Hôte réellement servi : l'apex hcetp.com répond 308 vers www.hcetp.com.
// Le sitemap, les canonical et robots.txt doivent tous pointer vers cet hôte,
// sinon on donne au crawler des URLs qui redirigent (signal de canonicalisation
// contradictoire, coûteux sur un domaine encore non découvert).
const BASE_URL = "https://www.hcetp.com";

interface SitemapEntry {
  path: string;
  changefreq?: "always" | "hourly" | "daily" | "weekly" | "monthly" | "yearly" | "never";
  priority?: string;
}

// `lastmod` n'est pas écrit ici : il est lu dans `src/lib/lastmod.ts`, qui est
// aussi ce qu'affiche la page (« Dernière mise à jour : … »). Les deux ne
// peuvent donc pas diverger — et c'est la condition pour que Google accorde
// du crédit au `lastmod` : il compare la valeur annoncée à ce que voit
// l'utilisateur, et ignore le `lastmod` de tout le sitemap s'il le juge peu
// fiable. Les URLs absentes de la table (l'accueil et
// `/realisations/chantier-en-cours`, qui ne publient aucune date de mise à
// jour) sortent simplement sans `lastmod` : l'élément est facultatif par URL.
const lastmodOf = (path: string): string | undefined =>
  (PAGE_UPDATED as Record<string, { iso: string }>)[path]?.iso;

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
          { path: "/zone-intervention", changefreq: "monthly", priority: "0.8" },
          { path: "/realisations", changefreq: "weekly", priority: "0.8" },
          { path: "/realisations/cour-allee-privee", changefreq: "weekly", priority: "0.7" },
          { path: "/realisations/parking-voirie-pro", changefreq: "weekly", priority: "0.7" },
          { path: "/realisations/preparation-terrassement", changefreq: "weekly", priority: "0.7" },
          { path: "/realisations/chantier-en-cours", changefreq: "weekly", priority: "0.7" },
          { path: "/mentions-legales", changefreq: "yearly", priority: "0.3" },
        ];

        const urls = entries.map((e) =>
          [
            `  <url>`,
            `    <loc>${BASE_URL}${e.path}</loc>`,
            lastmodOf(e.path) ? `    <lastmod>${lastmodOf(e.path)}</lastmod>` : null,
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
