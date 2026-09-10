import { Outlet, Link, createRootRoute, HeadContent, Scripts } from "@tanstack/react-router";
import { Toaster } from "sonner";
import { AuthProvider } from "@/hooks/useAuth";
import { WhatsAppFAB } from "@/components/WhatsAppFAB";

import appCss from "../styles.css?url";

function NotFoundComponent() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-background px-4">
      <div className="max-w-md text-center">
        <h1 className="text-7xl font-bold text-foreground">404</h1>
        <h2 className="mt-4 text-xl font-semibold text-foreground">Page not found</h2>
        <p className="mt-2 text-sm text-muted-foreground">
          The page you're looking for doesn't exist or has been moved.
        </p>
        <div className="mt-6">
          <Link
            to="/"
            className="inline-flex items-center justify-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90"
          >
            Go home
          </Link>
        </div>
      </div>
    </div>
  );
}

export const Route = createRootRoute({
  head: () => ({
    meta: [
      { charSet: "utf-8" },
      { name: "viewport", content: "width=device-width, initial-scale=1" },
      { title: "Enrobé · Cours · Parkings · Terrassement — HCE Jura & Ain" },
      {
        name: "description",
        content:
          "HCE — Enrobé à chaud, cours, parkings, terrassement dans le Jura et l'Ain depuis 2012. Pose à la main, devis détaillé, garantie décennale.",
      },
      { name: "author", content: "HCE" },
      { property: "og:site_name", content: "HCE" },
      { property: "og:type", content: "website" },
      {
        property: "og:title",
        content: "Enrobé · Cours · Parkings · Terrassement — HCE Jura & Ain",
      },
      {
        property: "og:description",
        content:
          "HCE — Enrobé à chaud, cours, parkings, terrassement dans le Jura et l'Ain depuis 2012. Pose à la main, devis détaillé, garantie décennale.",
      },
      { name: "twitter:card", content: "summary" },
      {
        name: "twitter:title",
        content: "Enrobé · Cours · Parkings · Terrassement — HCE Jura & Ain",
      },
      {
        name: "twitter:description",
        content:
          "HCE — Enrobé à chaud, cours, parkings, terrassement dans le Jura et l'Ain depuis 2012. Pose à la main, devis détaillé, garantie décennale.",
      },
      {
        property: "og:image",
        content:
          "https://pub-bb2e103a32db4e198524a2e9ed8f35b4.r2.dev/683b4530-b407-4cce-9cb0-7607d76ebb7c/id-preview-eb5e1275--27ec4cea-624d-4276-b609-fd4afffcfb65.lovable.app-1783340447523.png",
      },
      {
        name: "twitter:image",
        content:
          "https://pub-bb2e103a32db4e198524a2e9ed8f35b4.r2.dev/683b4530-b407-4cce-9cb0-7607d76ebb7c/id-preview-eb5e1275--27ec4cea-624d-4276-b609-fd4afffcfb65.lovable.app-1783340447523.png",
      },
    ],
    links: [
      { rel: "icon", href: "/favicon.ico", sizes: "any" },
      { rel: "icon", type: "image/png", sizes: "32x32", href: "/favicon-32x32.png" },
      { rel: "icon", type: "image/png", sizes: "16x16", href: "/favicon-16x16.png" },
      { rel: "apple-touch-icon", sizes: "180x180", href: "/apple-touch-icon.png" },
      { rel: "manifest", href: "/site.webmanifest" },
      { rel: "preconnect", href: "https://fonts.googleapis.com" },
      { rel: "preconnect", href: "https://fonts.gstatic.com", crossOrigin: "anonymous" },
      {
        rel: "stylesheet",
        href: "https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;0,500;1,300;1,400;1,500&family=Inter:wght@300;400;500;600;700&family=Playfair+Display:wght@700;800&display=swap",
      },
      {
        rel: "stylesheet",
        href: appCss,
      },
    ],
    scripts: [
      {
        type: "application/ld+json",
        children: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "Organization",
          "@id": "https://www.hcebtp.com/#business",
          name: "HCE",
          legalName: "HCE SARL",
          // Dénomination telle qu'inscrite au registre national des entreprises
          // (SIREN 521683573). C'est sous ce libellé que l'entreprise apparaît
          // dans les annuaires légaux : le donner en alternateName permet de
          // rapprocher « HCE » du même sujet.
          alternateName: "H.C.E. - HINI - COURS - ENROBE",
          // Identifiants légaux français, seule clé qui désigne l'entreprise
          // sans ambiguïté (deux communes s'appellent Cize, et « HCE » est un
          // sigle très répandu). Source : registre national des entreprises,
          // api recherche-entreprises.api.gouv.fr, consulté le 08/09/2026.
          identifier: [
            { "@type": "PropertyValue", name: "SIREN", value: "521683573" },
            { "@type": "PropertyValue", name: "SIRET", value: "52168357300039" },
          ],
          // Fiches publiques vérifiées en ligne avant d'être citées : on ne
          // référence que des pages dont on a lu le contenu, jamais sur la seule
          // foi d'un HTTP 200 (cf. SEO-JOURNAL, erreur du 08/09/2026).
          // - societe.com : vérifiée le 08/09/2026 (même SIREN, même adresse
          //   que le registre).
          // - 118000.fr : vérifiée le 09/09/2026 — la page décrit bien « HCE
          //   Hini Cours Enrobé à CIZE 39300 » et publie en microdonnées
          //   (itemprop telephone) le 0384526148, exactement le numéro du site.
          // - manageo.fr : vérifiée le 10/09/2026 — la fiche 521683573 porte
          //   la dénomination « H.C.E. - HINI - COURS - ENROBE », le SIRET
          //   siège actuel 52168357300039 et l'adresse ACTUELLE « 40 AVENUE
          //   ETIENNE LAMY 39300 CIZE » (pas l'ancienne « 36 » ni Champagnole).
          sameAs: [
            "https://www.societe.com/societe/h-c-e-hini-cours-enrobe-521683573.html",
            "https://www.118000.fr/e_C0092984566",
            "https://www.manageo.fr/entreprises/521683573.html",
          ],
          url: "https://www.hcebtp.com",
          logo: "https://www.hcebtp.com/favicon-512x512.png",
          telephone: "+33 3 84 52 61 48",
          email: "sarl.hce@laposte.net",
          address: {
            "@type": "PostalAddress",
            streetAddress: "40 avenue Etienne Lamy",
            postalCode: "39300",
            addressLocality: "Cize",
            addressRegion: "Jura",
            addressCountry: "FR",
          },
        }),
      },
    ],
  }),
  shellComponent: RootShell,
  component: RootComponent,
  notFoundComponent: NotFoundComponent,
});

function RootShell({ children }: { children: React.ReactNode }) {
  return (
    <html lang="fr">
      <head>
        <HeadContent />
      </head>
      <body>
        {children}
        <Scripts />
      </body>
    </html>
  );
}

function RootComponent() {
  return (
    <AuthProvider>
      <Outlet />
      <WhatsAppFAB />
      <Toaster position="top-right" richColors />
    </AuthProvider>
  );
}
