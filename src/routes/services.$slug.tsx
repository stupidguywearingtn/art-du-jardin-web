import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { CustomCursor } from "@/components/CustomCursor";
import { SmoothScroll } from "@/components/SmoothScroll";

type ServiceData = {
  n: string;
  title: string;
  hero: string;
  intro: string;
  prestations: string[];
  methode: { t: string; d: string }[];
  gallery: string[];
};

const SERVICES: Record<string, ServiceData> = {
  "preparation-terrain": {
    n: "01",
    title: "Préparation de terrain",
    hero: "/photos/06-chantier-bobcat-preparation.jpg",
    intro: "De la lecture du sol à la viabilisation complète : HCE prépare votre terrain pour une pose d'enrobé qui dure dans le temps.",
    prestations: ["Aménagements extérieurs", "Terrassement VRD (Voirie et Réseaux Divers)", "Viabilisation de terrains", "Génie civil", "Puits perdus", "Drainage des sols", "Enrochement", "Aménagement de terrasses"],
    methode: [
      { t: "Lecture du terrain", d: "Étude des pentes, du sol et des écoulements avant tout terrassement." },
      { t: "Décaissement contrôlé", d: "Mini-pelle et chargeur pour respecter les volumes prévus au devis." },
      { t: "Compactage par couches", d: "Plaque vibrante et rouleau, contrôle de portance." },
    ],
    gallery: ["/photos/06-chantier-bobcat-preparation.jpg", "/photos/07-chantier-terrain-brouette.jpg", "/photos/08-chantier-plaque-vibrante.jpg"],
  },
  "enrobe-a-chaud": {
    n: "02",
    title: "Enrobé à chaud",
    hero: "/photos/01-hero-finisseur-vapeur-sunset.jpg",
    intro: "Pose au finisseur à 160°C, compactage maîtrisé, garantie décennale. La spécialité historique d'HCE depuis 2005.",
    prestations: ["Enrobé noir, rouge, saumon, bordeaux", "Goudronnage fins ou épais", "Pose au finisseur à 160°C", "Compactage maîtrisé", "Garantie décennale"],
    methode: [
      { t: "Préparation thermique", d: "Enrobé livré à température, application sans interruption." },
      { t: "Pose au finisseur", d: "Épaisseur régulière, pentes maîtrisées, joints soignés." },
      { t: "Compactage en plusieurs passes", d: "Rouleau tandem pour une densité optimale." },
    ],
    gallery: ["/photos/01-hero-finisseur-vapeur-sunset.jpg", "/photos/03-hero-rouleau-compacteur.jpg", "/photos/10-detail-texture-enrobe-frais.jpg", "/photos/15-cour-golden-hour.jpg"],
  },
  "maconnerie-generale": {
    n: "03",
    title: "Maçonnerie générale",
    hero: "/photos/02-hero-medaillon-paves.jpg",
    intro: "Pavage, dallage, médaillons sur mesure : une maçonnerie qui s'intègre à votre enrobé pour personnaliser votre extérieur.",
    prestations: ["Pavage", "Pose de bordures", "Dallage", "Médaillons et inserts décoratifs sur mesure"],
    methode: [
      { t: "Conception sur mesure", d: "Dessin du motif, choix des matériaux et calepinage avec vous." },
      { t: "Pose au cordeau", d: "Niveau laser et précision millimétrique sur les jonctions." },
      { t: "Finition jointoyée", d: "Joints sablés ou cimentés selon l'usage prévu." },
    ],
    gallery: ["/photos/02-hero-medaillon-paves.jpg", "/photos/12-cour-courbe-muret-pierre.jpg", "/photos/13-cour-parking-muret.jpg"],
  },
  "drainage-pentes": {
    n: "04",
    title: "Drainage & pentes",
    hero: "/photos/09-detail-bordure-beton.jpg",
    intro: "Une cour qui dure, c'est d'abord une cour qui évacue l'eau. HCE étudie les pentes avant chaque pose.",
    prestations: ["Études de pente", "Drainage périphérique", "Évacuation des eaux pluviales", "Lecture du terrain avant pose"],
    methode: [
      { t: "Diagnostic d'écoulement", d: "Identification des points bas et des arrivées d'eau." },
      { t: "Drains périphériques", d: "Pose de drains et de regards aux endroits stratégiques." },
      { t: "Pentes calculées", d: "Pente minimum 1.5 % vers les exutoires, vérifiée au laser." },
    ],
    gallery: ["/photos/09-detail-bordure-beton.jpg", "/photos/06-chantier-bobcat-preparation.jpg", "/photos/11-cour-courbe-ciel.jpg"],
  },
  "bordures-murets": {
    n: "05",
    title: "Bordures & murets",
    hero: "/photos/13-cour-parking-muret.jpg",
    intro: "Bordures béton coulées sur place, pavées, ou petits murets de soutènement : la finition qui fait toute la différence.",
    prestations: ["Bordures béton coulées", "Bordures pavées", "Petits murets de soutènement", "Finitions périphériques"],
    methode: [
      { t: "Coffrage soigné", d: "Lignes droites ou courbes selon votre cour, jamais en kit." },
      { t: "Coulage sur place", d: "Béton dosé pour résister au gel et à la décennie." },
      { t: "Décoffrage propre", d: "Finition lisse, arêtes nettes, prêt à recevoir l'enrobé." },
    ],
    gallery: ["/photos/13-cour-parking-muret.jpg", "/photos/12-cour-courbe-muret-pierre.jpg", "/photos/09-detail-bordure-beton.jpg"],
  },
  "garantie-sav": {
    n: "06",
    title: "Garantie & SAV",
    hero: "/photos/04-hero-golden-hour.jpg",
    intro: "Travaux garantis, intervention rapide en cas d'anomalie, suivi long terme : HCE reste à vos côtés bien après la pose.",
    prestations: ["Travaux garantis", "Intervention rapide en cas d'anomalie", "Suivi long terme", "Conseil entretien"],
    methode: [
      { t: "Réception de chantier", d: "Visite contradictoire à la livraison, photos d'archivage." },
      { t: "Suivi annuel", d: "Un appel d'évaluation pour détecter les besoins." },
      { t: "Intervention rapide", d: "Sur tout désordre, retour sur site sous 5 jours ouvrés." },
    ],
    gallery: ["/photos/04-hero-golden-hour.jpg", "/photos/05-hero-chalet-bois-finition.jpg", "/photos/15-cour-golden-hour.jpg"],
  },
};

export const Route = createFileRoute("/services/$slug")({
  loader: ({ params }) => {
    const data = SERVICES[params.slug];
    if (!data) throw notFound();
    return data;
  },
  head: ({ loaderData }) => ({
    meta: loaderData
      ? [
          { title: `${loaderData.title} — HCE · Jura & Ain` },
          { name: "description", content: loaderData.intro },
          { property: "og:title", content: `${loaderData.title} — HCE` },
          { property: "og:description", content: loaderData.intro },
          { property: "og:image", content: `https://hcebtp.lovable.app${loaderData.hero}` },
        ]
      : [{ title: "Service — HCE" }],
  }),
  notFoundComponent: () => (
    <div className="min-h-screen flex items-center justify-center bg-background text-foreground">
      <div className="text-center">
        <h1 className="font-display text-6xl text-gold">404</h1>
        <p className="mt-4 text-muted">Service introuvable.</p>
        <Link to="/" className="mt-8 inline-block label text-gold border-b border-gold/40 pb-1">— Retour à l'accueil</Link>
      </div>
    </div>
  ),
  errorComponent: ({ error }) => (
    <div className="min-h-screen flex items-center justify-center bg-background text-foreground">
      <p>{error.message}</p>
    </div>
  ),
  component: ServicePage,
});

function ServicePage() {
  const data = Route.useLoaderData() as ServiceData;

  return (
    <>
      <SmoothScroll />
      <CustomCursor />
      <main className="bg-background text-foreground overflow-x-hidden">
        {/* HEADER nav */}
        <header className="fixed top-0 left-0 right-0 z-50 backdrop-blur-md bg-background/70 border-b border-gold/15">
          <div className="px-6 md:px-12 py-4 flex items-center justify-between">
            <Link to="/" className="font-display text-gold text-2xl" style={{ fontWeight: 500 }}>HCE</Link>
            <Link to="/" className="label text-gold hover:text-foreground transition-colors">← Accueil</Link>
          </div>
        </header>

        {/* HERO */}
        <section className="relative w-full h-[80vh] overflow-hidden">
          <img src={data.hero} alt={data.title} className="absolute inset-0 w-full h-full object-cover" />
          <div className="absolute inset-0 bg-asphalte/60" />
          <div className="relative z-10 h-full flex flex-col justify-end px-6 md:px-12 pb-16">
            <div className="font-display text-gold" style={{ fontSize: "clamp(80px, 14vw, 220px)", fontWeight: 300, lineHeight: 1 }}>{data.n}</div>
            <h1 className="font-display text-foreground mt-2" style={{ fontSize: "clamp(40px, 7vw, 96px)", fontWeight: 400, lineHeight: 1 }}>{data.title}</h1>
            <p className="mt-6 text-muted max-w-2xl" style={{ fontSize: 18, lineHeight: 1.6 }}>{data.intro}</p>
          </div>
        </section>

        {/* PRESTATIONS */}
        <section className="px-6 md:px-12 py-24 md:py-32 max-w-6xl mx-auto">
          <div className="label text-gold">— Ce que nous faisons</div>
          <h2 className="font-display mt-6 text-foreground" style={{ fontSize: "clamp(32px, 5vw, 56px)", fontWeight: 400 }}>Nos prestations</h2>
          <ul className="mt-12 grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-4">
            {data.prestations.map((p) => (
              <li key={p} className="border-b border-gold/15 py-4 flex items-baseline gap-4">
                <span className="text-gold font-display" style={{ fontSize: 20 }}>—</span>
                <span className="text-foreground/90" style={{ fontSize: 17 }}>{p}</span>
              </li>
            ))}
          </ul>
        </section>

        {/* GALERIE */}
        <section className="px-6 md:px-12 py-16 max-w-6xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
            {data.gallery.map((g) => (
              <div key={g} className="aspect-[4/3] overflow-hidden">
                <img src={g} alt={data.title} loading="lazy" className="w-full h-full object-cover hover:scale-105 transition-transform duration-700" />
              </div>
            ))}
          </div>
        </section>

        {/* METHODE */}
        <section className="px-6 md:px-12 py-24 md:py-32 max-w-6xl mx-auto">
          <div className="label text-gold">— Notre méthode</div>
          <h2 className="font-display mt-6 text-foreground" style={{ fontSize: "clamp(32px, 5vw, 56px)", fontWeight: 400 }}>Comment HCE travaille</h2>
          <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-8">
            {data.methode.map((m, i) => (
              <article key={m.t} className="border-l-2 pl-6" style={{ borderColor: "var(--brasier-500)" }}>
                <div className="font-display text-gold" style={{ fontSize: 48, fontWeight: 300, lineHeight: 1 }}>{String(i + 1).padStart(2, "0")}</div>
                <h3 className="font-display text-foreground mt-4" style={{ fontSize: 24, fontWeight: 400 }}>{m.t}</h3>
                <p className="mt-3 text-muted" style={{ lineHeight: 1.6 }}>{m.d}</p>
              </article>
            ))}
          </div>
        </section>

        {/* CTA */}
        <section className="relative px-6 md:px-12 py-32 text-center bg-surface">
          <div className="label text-gold">— Un projet ?</div>
          <h2 className="font-display mt-6 text-foreground max-w-3xl mx-auto" style={{ fontSize: "clamp(32px, 5vw, 64px)", fontWeight: 400, lineHeight: 1.05 }}>
            Demander un devis pour <span className="italic text-gold">{data.title.toLowerCase()}</span>
          </h2>
          <div className="mt-12 flex flex-wrap gap-4 justify-center">
            <Link
              to="/"
              hash="devis"
              data-cursor-hover
              className="bg-gold text-background px-10 py-4"
              style={{ fontFamily: "Outfit", fontSize: 14, letterSpacing: "0.15em", textTransform: "uppercase" }}
            >
              Demander un devis
            </Link>
            <a
              href="tel:0384526148"
              data-cursor-hover
              className="border border-gold text-gold px-10 py-4 hover:bg-gold hover:text-background transition-colors"
              style={{ fontFamily: "Outfit", fontSize: 14, letterSpacing: "0.15em", textTransform: "uppercase" }}
            >
              03 84 52 61 48
            </a>
          </div>
        </section>

        {/* FOOTER simplifié */}
        <footer className="px-6 md:px-12 py-12 text-center border-t border-gold/15" style={{ background: "var(--footer)" }}>
          <Link to="/" className="font-display text-gold text-3xl">HCE</Link>
          <p className="mt-3 text-muted text-sm">Cize, Jura · 03 84 52 61 48</p>
        </footer>
      </main>
    </>
  );
}
