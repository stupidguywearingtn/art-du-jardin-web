import { createFileRoute } from "@tanstack/react-router";
import { useSiteContentFields } from "@/hooks/useSiteContentFields";
import { Zap, Shield, Rocket } from "lucide-react";

// Demo site id — fixe pour cette page de démonstration
const DEMO_SITE_ID = "00000000-0000-0000-0000-000000000001";

export const Route = createFileRoute("/demo")({
  component: DemoPage,
  head: () => ({
    meta: [
      { title: "Démo — Éditeur visuel" },
      { name: "description", content: "Page de démo data-driven pour l'éditeur visuel." },
    ],
  }),
});

function DemoPage() {
  const { get } = useSiteContentFields(DEMO_SITE_ID);

  return (
    <div className="min-h-screen bg-background text-foreground">
      <Hero get={get} />
      <Services get={get} />
      <Footer get={get} />
    </div>
  );
}

type Getter = (section: string, field: string, fallback: string) => string;

function Hero({ get }: { get: Getter }) {
  const title = get("hero", "title", "Construisez votre site avec l'IA");
  const subtitle = get(
    "hero",
    "subtitle",
    "Un web builder nouvelle génération. Éditez visuellement, déployez instantanément.",
  );
  const bgImage = get(
    "hero",
    "background_image",
    "https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=1920&q=80",
  );

  return (
    <section
      className="relative min-h-[70vh] flex items-center justify-center px-6 py-20"
      style={{
        backgroundImage: `linear-gradient(rgba(0,0,0,0.6), rgba(0,0,0,0.6)), url(${bgImage})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      <div className="max-w-4xl text-center text-white">
        <h1 className="text-5xl md:text-7xl font-bold mb-6 leading-tight">{title}</h1>
        <p className="text-xl md:text-2xl opacity-90 max-w-2xl mx-auto">{subtitle}</p>
      </div>
    </section>
  );
}

function Services({ get }: { get: Getter }) {
  const sectionTitle = get("services", "title", "Nos services");

  const items = [
    {
      key: "service_1",
      Icon: Zap,
      defaultTitle: "Rapide",
      defaultDesc: "Créez un site en quelques minutes grâce à l'IA générative.",
    },
    {
      key: "service_2",
      Icon: Shield,
      defaultTitle: "Sécurisé",
      defaultDesc: "Hébergement et base de données protégés par défaut.",
    },
    {
      key: "service_3",
      Icon: Rocket,
      defaultTitle: "Évolutif",
      defaultDesc: "Démarrez petit, montez en charge sans réécrire de code.",
    },
  ];

  return (
    <section className="px-6 py-20 bg-muted/30">
      <div className="max-w-6xl mx-auto">
        <h2 className="text-4xl font-bold text-center mb-12">{sectionTitle}</h2>
        <div className="grid md:grid-cols-3 gap-6">
          {items.map(({ key, Icon, defaultTitle, defaultDesc }) => (
            <div
              key={key}
              className="bg-card border border-border rounded-xl p-8 shadow-sm"
            >
              <div className="w-12 h-12 rounded-lg bg-primary/10 text-primary flex items-center justify-center mb-4">
                <Icon className="w-6 h-6" />
              </div>
              <h3 className="text-xl font-semibold mb-2">
                {get("services", `${key}_title`, defaultTitle)}
              </h3>
              <p className="text-muted-foreground">
                {get("services", `${key}_description`, defaultDesc)}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function Footer({ get }: { get: Getter }) {
  const text = get("footer", "text", "© 2026 Mon Web Builder. Tous droits réservés.");
  const linkLabel = get("footer", "link_label", "Contact");
  const linkUrl = get("footer", "link_url", "mailto:hello@example.com");

  return (
    <footer className="px-6 py-10 border-t border-border">
      <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4 text-sm text-muted-foreground">
        <p>{text}</p>
        <a href={linkUrl} className="hover:text-foreground transition-colors underline">
          {linkLabel}
        </a>
      </div>
    </footer>
  );
}
