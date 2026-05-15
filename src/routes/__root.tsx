import { Outlet, Link, createRootRoute, HeadContent, Scripts } from "@tanstack/react-router";
import { Toaster } from "sonner";
import { AuthProvider } from "@/hooks/useAuth";

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
      { title: "Leclerc Paysage — Architecte paysagiste de luxe à Genève" },
      { name: "description", content: "Leclerc Paysage conçoit et entretient des jardins d'exception à Genève et en Suisse romande. Création, biodiversité, jardins comestibles." },
      { name: "author", content: "Leclerc Paysage" },
      { property: "og:title", content: "Leclerc Paysage — Architecte paysagiste de luxe à Genève" },
      { property: "og:description", content: "Leclerc Paysage conçoit et entretient des jardins d'exception à Genève et en Suisse romande. Création, biodiversité, jardins comestibles." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary" },
      { name: "twitter:site", content: "@Lovable" },
      { name: "twitter:title", content: "Leclerc Paysage — Architecte paysagiste de luxe à Genève" },
      { name: "twitter:description", content: "Leclerc Paysage conçoit et entretient des jardins d'exception à Genève et en Suisse romande. Création, biodiversité, jardins comestibles." },
      { property: "og:image", content: "https://pub-bb2e103a32db4e198524a2e9ed8f35b4.r2.dev/c9c5f7a6-9d92-44d0-83d7-d3f94b4aa6a2/id-preview-9bedf7e7--f68a5920-2cb8-4ed0-989f-a106e80bde4e.lovable.app-1777896666460.png" },
      { name: "twitter:image", content: "https://pub-bb2e103a32db4e198524a2e9ed8f35b4.r2.dev/c9c5f7a6-9d92-44d0-83d7-d3f94b4aa6a2/id-preview-9bedf7e7--f68a5920-2cb8-4ed0-989f-a106e80bde4e.lovable.app-1777896666460.png" },
    ],
    links: [
      {
        rel: "stylesheet",
        href: appCss,
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
      <Toaster position="top-right" richColors />
    </AuthProvider>
  );
}
