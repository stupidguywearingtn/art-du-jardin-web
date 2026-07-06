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
      { name: "description", content: "HCE — Enrobé à chaud, cours, parkings, terrassement dans le Jura et l'Ain depuis 2012. Pose à la main, devis détaillé, garantie décennale." },
      { name: "author", content: "HCE" },
      { property: "og:site_name", content: "HCE" },
      { property: "og:type", content: "website" },
      { property: "og:title", content: "Enrobé · Cours · Parkings · Terrassement — HCE Jura & Ain" },
      { property: "og:description", content: "HCE — Enrobé à chaud, cours, parkings, terrassement dans le Jura et l'Ain depuis 2012. Pose à la main, devis détaillé, garantie décennale." },
      { name: "twitter:card", content: "summary" },
      { name: "twitter:title", content: "Enrobé · Cours · Parkings · Terrassement — HCE Jura & Ain" },
      { name: "twitter:description", content: "HCE — Enrobé à chaud, cours, parkings, terrassement dans le Jura et l'Ain depuis 2012. Pose à la main, devis détaillé, garantie décennale." },
      { property: "og:image", content: "https://pub-bb2e103a32db4e198524a2e9ed8f35b4.r2.dev/683b4530-b407-4cce-9cb0-7607d76ebb7c/id-preview-eb5e1275--27ec4cea-624d-4276-b609-fd4afffcfb65.lovable.app-1783340447523.png" },
      { name: "twitter:image", content: "https://pub-bb2e103a32db4e198524a2e9ed8f35b4.r2.dev/683b4530-b407-4cce-9cb0-7607d76ebb7c/id-preview-eb5e1275--27ec4cea-624d-4276-b609-fd4afffcfb65.lovable.app-1783340447523.png" },
    ],
    links: [
      { rel: "preconnect", href: "https://fonts.googleapis.com" },
      { rel: "preconnect", href: "https://fonts.gstatic.com", crossOrigin: "anonymous" },
      { rel: "stylesheet", href: "https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;0,500;1,300;1,400;1,500&family=Inter:wght@300;400;500;600;700&display=swap" },
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
          name: "HCE",
          url: "https://hcebtp.com",
          telephone: "+33 3 84 52 61 48",
          address: {
            "@type": "PostalAddress",
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
    <html lang="en">
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
