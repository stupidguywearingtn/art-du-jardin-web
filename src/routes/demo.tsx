import { createFileRoute } from "@tanstack/react-router";
import { useSiteContentFields } from "@/hooks/useSiteContentFields";
import { EditModeProvider, useEditMode } from "@/hooks/useEditMode";
import { EditModeToolbar } from "@/components/EditModeToolbar";
import { EditableText } from "@/components/EditableText";
import { EditableImage } from "@/components/EditableImage";
import { Zap, Shield, Rocket } from "lucide-react";

const DEMO_SITE_ID = "00000000-0000-0000-0000-000000000001";

export const Route = createFileRoute("/demo")({
  component: DemoRoute,
  head: () => ({
    meta: [
      { title: "Démo — Éditeur visuel" },
      { name: "description", content: "Page de démo data-driven pour l'éditeur visuel." },
    ],
  }),
});

function DemoRoute() {
  const { reload } = useSiteContentFields(DEMO_SITE_ID);
  return (
    <EditModeProvider siteId={DEMO_SITE_ID} onPublished={reload}>
      <DemoPage />
    </EditModeProvider>
  );
}

function DemoPage() {
  const { get } = useSiteContentFields(DEMO_SITE_ID);
  const { getDraft } = useEditMode();

  // value resolves: draft > published > fallback
  const v = (section: string, field: string, fallback: string) =>
    getDraft(section, field) ?? get(section, field, fallback);

  return (
    <div className="min-h-screen bg-background text-foreground">
      <EditModeToolbarWithReload reload={reload} />
      <Hero v={v} />
      <Services v={v} />
      <Footer v={v} />
    </div>
  );
}

function EditModeToolbarWithReload({ reload }: { reload: () => void }) {
  // re-render trigger: nothing fancy, just reload after publish via onPublished
  // but the provider already handles publish; we hook reload via a tiny effect.
  // Simpler: wrap toolbar; provider's publish clears drafts and we reload here.
  const { hasDrafts, publishing } = useEditMode();
  // when publishing ends and no drafts, reload published values
  if (typeof window !== "undefined") {
    // schedule reload after publish completes
    (window as any).__demoReload = reload;
  }
  void hasDrafts;
  void publishing;
  return <EditModeToolbar />;
}

type V = (section: string, field: string, fallback: string) => string;

function Hero({ v }: { v: V }) {
  const title = v("hero", "title", "Construisez votre site avec l'IA");
  const subtitle = v(
    "hero",
    "subtitle",
    "Un web builder nouvelle génération. Éditez visuellement, déployez instantanément.",
  );
  const bgImage = v(
    "hero",
    "background_image",
    "https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=1920&q=80",
  );

  return (
    <EditableImage section="hero" field="background_image" value={bgImage}>
      {(url) => (
        <section
          className="relative min-h-[70vh] flex items-center justify-center px-6 py-20"
          style={{
            backgroundImage: `linear-gradient(rgba(0,0,0,0.6), rgba(0,0,0,0.6)), url(${url})`,
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
        >
          <div className="max-w-4xl text-center text-white space-y-6">
            <EditableText
              section="hero"
              field="title"
              value={title}
              as="h1"
              className="block text-5xl md:text-7xl font-bold leading-tight"
            />
            <EditableText
              section="hero"
              field="subtitle"
              value={subtitle}
              as="p"
              className="block text-xl md:text-2xl opacity-90 max-w-2xl mx-auto"
              multiline
            />
          </div>
        </section>
      )}
    </EditableImage>
  );
}

function Services({ v }: { v: V }) {
  const sectionTitle = v("services", "title", "Nos services");
  const items = [
    { key: "service_1", Icon: Zap, defaultTitle: "Rapide", defaultDesc: "Créez un site en quelques minutes grâce à l'IA générative." },
    { key: "service_2", Icon: Shield, defaultTitle: "Sécurisé", defaultDesc: "Hébergement et base de données protégés par défaut." },
    { key: "service_3", Icon: Rocket, defaultTitle: "Évolutif", defaultDesc: "Démarrez petit, montez en charge sans réécrire de code." },
  ];

  return (
    <section className="px-6 py-20 bg-muted/30">
      <div className="max-w-6xl mx-auto">
        <EditableText
          section="services"
          field="title"
          value={sectionTitle}
          as="h2"
          className="block text-4xl font-bold text-center mb-12"
        />
        <div className="grid md:grid-cols-3 gap-6">
          {items.map(({ key, Icon, defaultTitle, defaultDesc }) => (
            <div key={key} className="bg-card border border-border rounded-xl p-8 shadow-sm">
              <div className="w-12 h-12 rounded-lg bg-primary/10 text-primary flex items-center justify-center mb-4">
                <Icon className="w-6 h-6" />
              </div>
              <EditableText
                section="services"
                field={`${key}_title`}
                value={v("services", `${key}_title`, defaultTitle)}
                as="h3"
                className="block text-xl font-semibold mb-2"
              />
              <EditableText
                section="services"
                field={`${key}_description`}
                value={v("services", `${key}_description`, defaultDesc)}
                as="p"
                className="block text-muted-foreground"
                multiline
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function Footer({ v }: { v: V }) {
  const text = v("footer", "text", "© 2026 Mon Web Builder. Tous droits réservés.");
  const linkLabel = v("footer", "link_label", "Contact");
  const linkUrl = v("footer", "link_url", "mailto:hello@example.com");

  return (
    <footer className="px-6 py-10 border-t border-border">
      <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4 text-sm text-muted-foreground">
        <EditableText section="footer" field="text" value={text} as="p" className="block" />
        <div className="flex items-center gap-4">
          <EditableText
            section="footer"
            field="link_label"
            value={linkLabel}
            as="a"
            className="block hover:text-foreground transition-colors underline"
          />
          <EditableText
            section="footer"
            field="link_url"
            value={linkUrl}
            as="span"
            className="block text-xs opacity-60"
          />
        </div>
      </div>
    </footer>
  );
}
