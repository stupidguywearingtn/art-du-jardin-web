import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { SmoothScroll } from "@/components/SmoothScroll";
import { MobileFloatingCTA } from "@/components/CTAButtons";
import { useSiteContent } from "@/hooks/useSiteContent";
import { useSiteContentFields } from "@/hooks/useSiteContentFields";
import { EditModeProvider } from "@/hooks/useEditMode";
import { EditModeToolbar } from "@/components/EditModeToolbar";
import { EditableImage } from "@/components/EditableImage";
import { optimizeImageUrl } from "@/lib/optimizeImage";

const HOME_SITE_ID = "11111111-1111-1111-1111-111111111111";

type ServiceData = {
  n: string;
  title: string;
  hero: string;
  intro: string;
  prestations: string[];
  methode: { t: string; d: string }[];
  gallery: string[];
  /* Description utilisée dans <title>/meta uniquement, quand la phrase d'intro
     affichée dans le héros ne contient pas le vocabulaire réellement tapé par
     les internautes. Aucun effet sur le rendu. */
  seoDescription?: string;
  /* Bloc « ce qu'il faut savoir » : questions posées telles qu'on les pose à
     voix haute, réponse autonome de 2-3 phrases en tête. Rendu visible en clair
     (jamais replié, jamais monté conditionnellement) ET repris tel quel dans le
     JSON-LD FAQPage de la page : les deux viennent du même tableau, aucun
     mismatch possible. */
  savoir?: {
    /* Titre et chapeau de la section : propres à chaque service, donc portés
       par la donnée et non écrits en dur dans le rendu. */
    heading: string;
    lead: string;
    updated: string;
    updatedLabel: string;
    qa: { q: string; a: string }[];
    sources: { label: string; url: string }[];
  };
};

const SERVICES: Record<string, ServiceData> = {
  "preparation-terrain": {
    n: "01",
    title: "Préparation de terrain",
    hero: "/assets/preparation-terrain-1.png",
    intro: "De la lecture du sol à la viabilisation complète : HCE prépare votre terrain pour une pose d'enrobé qui dure dans le temps.",
    prestations: ["Aménagements extérieurs", "Terrassement VRD (Voirie et Réseaux Divers)", "Viabilisation de terrains", "Génie civil", "Puits perdus", "Drainage des sols", "Enrochement", "Aménagement de terrasses"],
    methode: [
      { t: "Lecture du terrain", d: "Étude des pentes, du sol et des écoulements avant tout terrassement." },
      { t: "Décaissement contrôlé", d: "Mini-pelle et chargeur pour respecter les volumes prévus au devis." },
      { t: "Compactage par couches", d: "Plaque vibrante et rouleau, contrôle de portance." },
    ],
    gallery: [
      "/assets/preparation-terrain-1.png",
      "/assets/preparation-terrain-2.png",
      "/assets/preparation-terrain-3.png",
    ],
    seoDescription:
      "Terrassement, VRD et viabilisation dans le Jura et l'Ain : décaissement contrôlé, drainage et compactage par couches avant toute pose d'enrobé. Devis détaillé.",
    savoir: {
      heading: "Terrassement : les questions qu'on nous pose avant d'ouvrir le sol",
      lead: "Avant de goudronner une cour ou de viabiliser un terrain, il y a le terrassement : des déclarations obligatoires, des délais réglementaires, des terres à évacuer et un sol à compacter. Voici ce que cela implique concrètement dans le Jura et l'Ain.",
      updated: "2026-09-12",
      updatedLabel: "12 septembre 2026",
      qa: [
        {
          q: "Faut-il prévenir quelqu'un avant de creuser sur un terrain ?",
          a: "Oui, et c'est une obligation réglementaire, pas une formalité interne à l'entreprise. Avant des travaux de terrassement ou de sondage, le responsable du projet adresse une déclaration de projet de travaux (DT) aux exploitants de réseaux, et chaque entreprise qui intervient sur le chantier — sous-traitants compris — dépose sa propre déclaration d'intention de commencement de travaux (DICT). Les deux passent par le téléservice public « Réseaux et canalisations », qui recense les réseaux d'électricité, de gaz, d'eau et de télécommunications présents sous la parcelle.",
        },
        {
          q: "Combien de temps faut-il prévoir avant de démarrer un terrassement ?",
          a: "Il faut compter le délai de réponse des exploitants de réseaux, qui est encadré : neuf jours calendaires pour une DT déposée par internet, sept jours calendaires pour une DICT. Ces déclarations ont en outre une durée de validité de trois mois — si le chantier n'a pas commencé dans ce délai, elles sont à refaire. C'est pourquoi un terrassement sérieux ne démarre pas le lendemain de la signature : le devis détaillé est établi, puis ces déclarations sont déposées avant la première ouverture du sol.",
        },
        {
          q: "Que deviennent les terres retirées de mon terrain ?",
          a: "Elles ne partent pas n'importe où. Depuis le 1er janvier 2022, les terres excavées font l'objet d'un registre chronologique tenu par ceux qui les produisent, les transportent ou les valorisent, en application du décret n° 2021-321 du 25 mars 2021 et de l'arrêté du 31 mai 2021. Ces registres alimentent un registre national, et depuis le 5 mai 2025 la déclaration passe par la plateforme Trackdéchets. Concrètement, un chantier de terrassement conforme sait dire où sont allées les terres sorties de votre parcelle.",
        },
        {
          q: "Le terrassement VRD, qu'est-ce que c'est exactement ?",
          a: "VRD veut dire « voirie et réseaux divers ». C'est la partie du terrassement qui prépare à la fois les surfaces de circulation — cour, allée, parking — et les réseaux enterrés qui passent dessous : eau, électricité, télécommunications, évacuation des eaux pluviales. Sur un terrain à viabiliser, c'est l'étape qui rend la parcelle utilisable avant toute finition de surface. HCE réalise le terrassement VRD, la viabilisation de terrains, le drainage des sols et l'enrochement dans le Jura et l'Ain.",
        },
        {
          q: "Pourquoi faut-il compacter le sol par couches avant de poser un enrobé ?",
          a: "Parce qu'un enrobé ne rattrape jamais un support qui bouge. Une terre remise en place d'un seul tenant conserve des vides : sous le poids des véhicules, elle se tasse de façon irrégulière, et la surface finit par se fissurer ou par retenir des flaques. Le compactage se fait donc par couches successives, à la plaque vibrante puis au rouleau, avec contrôle de la portance — c'est ce support-là qui porte les véhicules, l'enrobé posé à la main à 150°C n'étant que la couche de finition.",
        },
      ],
      sources: [
        {
          label: "service-public.gouv.fr — Déclaration de travaux à proximité de réseaux (DT-DICT)",
          url: "https://entreprendre.service-public.gouv.fr/vosdroits/F23491",
        },
        {
          label: "Ministère de la Transition écologique — Traçabilité des déchets, terres excavées et sédiments",
          url: "https://www.ecologie.gouv.fr/politiques-publiques/tracabilite-dechets-terres-excavees-sediments",
        },
      ],
    },
  },
  "enrobe-a-chaud": {
    n: "02",
    title: "Enrobé à chaud",
    hero: "/assets/enrobe-1.png",
    intro: "Pose à la main à 150°C, compactage maîtrisé, garantie décennale. La spécialité historique d'HCE depuis 2012.",
    prestations: ["Enrobé noir, rouge, saumon, bordeaux", "Enrobé sous différentes granulations", "Pose à la main à 150°C", "Compactage maîtrisé", "Garantie décennale"],
    methode: [
      { t: "Préparation thermique", d: "Enrobé livré à température, application sans interruption." },
      { t: "Pose à la main", d: "Épaisseur régulière, pentes maîtrisées, joints soignés." },
      { t: "Compactage en plusieurs passes", d: "Rouleau tandem pour une densité optimale." },
    ],
    gallery: [
      "/assets/enrobe-1.png",
      "/assets/enrobe-2.png",
      "/assets/enrobe-3.png",
    ],
    seoDescription:
      "Goudronnage de cour, d'allée ou de parking dans le Jura et l'Ain : HCE pose l'enrobé à chaud à la main à 150°C et le compacte au rouleau. Devis détaillé, garantie décennale.",
    savoir: {
      heading: "Goudronnage ou enrobé : les questions qu'on nous pose",
      lead: "« Faire goudronner sa cour » et « poser un enrobé à chaud » désignent aujourd'hui le même chantier. Voici ce que recouvre réellement le mot, ce que disent les normes, et à quelle saison le chantier est possible dans le Jura et l'Ain.",
      updated: "2026-09-11",
      updatedLabel: "11 septembre 2026",
      qa: [
        {
          q: "Goudronnage et enrobé, est-ce la même chose ?",
          a: "Dans le langage courant, oui : quand on parle de « goudronner » une cour, une allée ou un parking, ce qui est posé aujourd'hui est un enrobé bitumineux. Le goudron véritable est un produit issu du charbon, qui a cessé d'être utilisé dans les constructions routières au milieu des années 1980, son caractère cancérigène ayant été établi. L'enrobé à chaud qu'HCE pose dans le Jura et l'Ain est fait de granulats et de bitume, un liant issu de la distillation du pétrole : ce n'est pas du goudron.",
        },
        {
          q: "Pourquoi mon devis d'enrobé parle-t-il de BBSG ?",
          a: "BBSG veut dire « béton bitumineux semi-grenu » : c'est la famille d'enrobé la plus courante pour les cours, les allées et les parkings. Les enrobés à chaud sont couverts par la série de normes NF EN 13108, dont la partie 1 correspond précisément au BBSG. Depuis le 1er mars 2008, tout enrobé bitumineux à chaud mis sur le marché porte le marquage CE, et les anciennes normes françaises NF P 98-1xx ont été retirées à cette date.",
        },
        {
          q: "Pourquoi l'enrobé se pose-t-il à 150°C ?",
          a: "Parce qu'un enrobé ne se compacte que tant qu'il est chaud. HCE le pose à la main à 150°C puis le compacte au rouleau avant qu'il ne refroidisse : c'est ce compactage, fait dans la bonne fenêtre de température, qui donne au revêtement sa densité et son étanchéité. Posé trop froid, l'enrobé se referme mal et la surface reste poreuse — elle vieillit alors beaucoup plus vite.",
        },
        {
          q: "Peut-on faire goudronner sa cour en hiver dans le Jura ?",
          a: "Non, pas en plein hiver. L'enrobé à chaud demande une température extérieure supérieure à 5°C et un support sec : sur un sol gelé ou détrempé, l'enrobé n'accroche pas et refroidit trop vite pour être compacté correctement. HCE intervient donc généralement de mars à novembre dans le Jura et l'Ain, et la préparation du terrain se planifie en amont de cette fenêtre.",
        },
        {
          q: "Quelle différence entre enrobé à chaud et enrobé à froid ?",
          a: "L'enrobé à froid se livre prêt à l'emploi et se compacte sans chauffe : c'est une solution de réparation ponctuelle, pour reboucher un nid-de-poule ou une tranchée. L'enrobé à chaud, lui, est fabriqué en centrale, livré chaud et posé à 150°C : c'est celui qui donne une surface homogène sur une cour, une allée ou un parking entier. HCE travaille l'enrobé à chaud, en noir, rouge, saumon ou bordeaux et sous différentes granulations.",
        },
      ],
      sources: [
        {
          label: "TotalEnergies — Bitume, asphalte et goudron : quelles différences ?",
          url: "https://services.totalenergies.fr/professionnels/conseils/bitumes/quelles-differences-entre-bitume-asphalte-goudron",
        },
        {
          label: "IDRRIM / CFTR-info n°17 — La normalisation européenne des enrobés (NF EN 13108)",
          url: "https://www.idrrim.com/ressources/publications/1/374,Note17.pdf",
        },
      ],
    },
  },
  "maconnerie-generale": {
    n: "03",
    title: "Maçonnerie générale",
    hero: "/assets/maconnerie-1.png",
    intro: "Pavage, dallage, médaillons sur mesure : une maçonnerie qui s'intègre à votre enrobé pour personnaliser votre extérieur.",
    prestations: ["Pavage", "Pose de bordures", "Dallage", "Médaillons et inserts décoratifs sur mesure"],
    methode: [
      { t: "Conception sur mesure", d: "Dessin du motif, choix des matériaux et calepinage avec vous." },
      { t: "Pose au cordeau", d: "Niveau laser et précision millimétrique sur les jonctions." },
      { t: "Finition jointoyée", d: "Joints sablés ou cimentés selon l'usage prévu." },
    ],
    gallery: [
      "/assets/maconnerie-1.png",
      "/assets/maconnerie-2.png",
      "/assets/maconnerie-3.png",
    ],
  },
  "drainage-pentes": {
    n: "04",
    title: "Drainage & pentes",
    hero: "/assets/drainage-1.jpeg",
    intro: "Une cour qui dure, c'est d'abord une cour qui évacue l'eau. HCE étudie les pentes avant chaque pose.",
    prestations: ["Études de pente", "Drainage périphérique", "Évacuation des eaux pluviales", "Lecture du terrain avant pose"],
    methode: [
      { t: "Diagnostic d'écoulement", d: "Identification des points bas et des arrivées d'eau." },
      { t: "Drains périphériques", d: "Pose de drains et de regards aux endroits stratégiques." },
      { t: "Pentes calculées", d: "Pente minimum 1.5 % vers les exutoires, vérifiée au laser." },
    ],
    gallery: [
      "/assets/drainage-1.jpeg",
      "/assets/drainage-3.jpeg",
      "/assets/drainage-4.jpeg",
    ],
  },
  "bordures-murets": {
    n: "05",
    title: "Bordures & murets",
    hero: "/assets/bordures-1.png",
    intro: "Bordures béton coulées sur place, pavées, ou petits murets de soutènement : la finition qui fait toute la différence.",
    prestations: ["Bordures béton coulées", "Bordures pavées", "Petits murets de soutènement", "Finitions périphériques"],
    methode: [
      { t: "Coffrage soigné", d: "Lignes droites ou courbes selon votre cour, jamais en kit." },
      { t: "Coulage sur place", d: "Béton dosé pour résister au gel et à la décennie." },
      { t: "Décoffrage propre", d: "Finition lisse, arêtes nettes, prêt à recevoir l'enrobé." },
    ],
    gallery: ["/assets/bordures-1.png", "/assets/bordures-2.png", "/assets/bordures-3.png"],
  },
  "finitions-soignees": {
    n: "06",
    title: "Vous avez un projet d'aménagement de cour en enrobé",
    hero: "/assets/finitions-1.jpeg",
    intro: "Bords nets, raccords maîtrisés, surface plane et homogène. Le souci du détail jusqu'à la dernière passe.",
    prestations: [
      "Bords et angles nets, sans bavure",
      "Raccords et jonctions parfaitement intégrés",
      "Surface plane, homogène, sans flaque",
      "Nettoyage complet du chantier en fin de travaux",
    ],
    methode: [
      { t: "Contrôle visuel et de planéité", d: "Vérification complète avant de quitter le chantier." },
      { t: "Demande de validation", d: "Chaque étape est validée avec vous avant de poursuivre." },
      { t: "Livraison propre", d: "Chantier rendu propre, prêt à l'usage." },
    ],
    gallery: [
      "/assets/finitions-1.jpeg",
      "/assets/finitions-3.jpeg",
      "/assets/finitions-4.jpeg",
    ],
  },
};

export const Route = createFileRoute("/services/$slug")({
  loader: ({ params }) => {
    const data = SERVICES[params.slug];
    if (!data) throw notFound();
    return data;
  },
  head: ({ params, loaderData }) => ({
    meta: loaderData
      ? [
          { title: `${loaderData.title} — HCE · Jura & Ain` },
          { name: "description", content: loaderData.seoDescription ?? loaderData.intro },
          { property: "og:title", content: `${loaderData.title} — HCE` },
          { property: "og:description", content: loaderData.seoDescription ?? loaderData.intro },
          { property: "og:image", content: `https://www.hcebtp.com${loaderData.hero}` },
          { property: "og:url", content: `https://www.hcebtp.com/services/${params.slug}` },
        ]
      : [{ title: "Service — HCE" }],
    links: loaderData
      ? [{ rel: "canonical", href: `https://www.hcebtp.com/services/${params.slug}` }]
      : [],
    scripts: loaderData
      ? [
          {
            type: "application/ld+json",
            children: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Service",
              name: loaderData.title,
              description: loaderData.intro,
              provider: {
                "@type": "LocalBusiness",
                "@id": "https://www.hcebtp.com/#business",
                name: "HCE",
                url: "https://www.hcebtp.com",
                telephone: "+33 3 84 52 61 48",
                address: {
                  "@type": "PostalAddress",
                  streetAddress: "40 avenue Etienne Lamy",
                  postalCode: "39300",
                  addressLocality: "Cize",
                  addressRegion: "Jura",
                  addressCountry: "FR",
                },
              },
              areaServed: [
                { "@type": "AdministrativeArea", name: "Jura" },
                { "@type": "AdministrativeArea", name: "Ain" },
              ],
              url: `https://www.hcebtp.com/services/${params.slug}`,
            }),
          },
          {
            type: "application/ld+json",
            children: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "BreadcrumbList",
              itemListElement: [
                {
                  "@type": "ListItem",
                  position: 1,
                  name: "Accueil",
                  item: "https://www.hcebtp.com/",
                },
                {
                  "@type": "ListItem",
                  position: 2,
                  name: loaderData.title,
                  item: `https://www.hcebtp.com/services/${params.slug}`,
                },
              ],
            }),
          },
          /* FAQPage construit depuis le même tableau que la section visible
             plus bas dans la page : le balisage ne peut pas décrire une
             question qui ne serait pas rendue. */
          ...(loaderData.savoir
            ? [
                {
                  type: "application/ld+json",
                  children: JSON.stringify({
                    "@context": "https://schema.org",
                    "@type": "FAQPage",
                    mainEntity: loaderData.savoir.qa.map((f) => ({
                      "@type": "Question",
                      name: f.q,
                      acceptedAnswer: { "@type": "Answer", text: f.a },
                    })),
                  }),
                },
              ]
            : []),
        ]
      : [],
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
  const { reload } = useSiteContentFields(HOME_SITE_ID);
  return (
    <EditModeProvider siteId={HOME_SITE_ID} onPublished={reload}>
      <ServicePageBody />
    </EditModeProvider>
  );
}

function ServicePageBody() {
  const data = Route.useLoaderData() as ServiceData;
  const { slug } = Route.useParams();
  const { get } = useSiteContent();
  const { get: getField } = useSiteContentFields(HOME_SITE_ID);
  const adminServices = get<Array<{ slug: string; img: string }>>("services", []);
  const override = adminServices.find((s) => s?.slug === slug)?.img;
  const heroImg = getField("service_images", slug, override && override.length > 0 ? override : data.hero);
  const [scrolled, setScrolled] = useState(false);
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 200);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <>
      <EditModeToolbar />
      <SmoothScroll />

      <main className="bg-background text-foreground overflow-x-hidden">
        {/* HEADER nav */}
        <header className="fixed top-0 left-0 right-0 z-50 backdrop-blur-md bg-background/70 border-b border-gold/15">
          <div className="px-6 md:px-12 py-4 flex items-center justify-between">
            <Link to="/" className="font-display text-gold text-2xl" style={{ fontWeight: 500 }}>HCE</Link>
            <Link to="/" className="label text-gold hover:text-foreground transition-colors">← Accueil</Link>
          </div>
        </header>

        {/* Sticky CTA desktop */}
        <div
          className="hidden md:block fixed z-40"
          style={{
            top: 78, right: 24,
            opacity: scrolled ? 1 : 0,
            transform: scrolled ? "translateY(0)" : "translateY(-10px)",
            pointerEvents: scrolled ? "auto" : "none",
            transition: "opacity 0.3s ease, transform 0.3s ease",
          }}
        >
          <Link
            to="/" hash="devis"

            className="cta-primary"
            style={{ fontFamily: "var(--font-body)", fontSize: 13, fontWeight: 500, padding: "10px 20px", borderRadius: 4, background: "var(--cuivre-500)", color: "#fff", textDecoration: "none", display: "inline-flex", alignItems: "center", gap: 6, transition: "all 0.2s ease" }}
          >
            Demander un devis →
          </Link>
        </div>

        {/* HERO */}
        <section className="relative w-full h-[80vh] overflow-hidden">
          <EditableImage section="service_images" field={slug} value={heroImg}>
            {(url) => (
              <img
                src={url}
                alt={data.title}
                fetchPriority="high"
                className="absolute inset-0 w-full h-full object-cover"
              />
            )}
          </EditableImage>
          <div
            className="absolute inset-0"
            style={{ background: "linear-gradient(180deg, rgba(14,14,15,0.35) 0%, rgba(14,14,15,0.55) 45%, rgba(14,14,15,0.92) 100%)" }}
          />
          <div className="relative z-10 h-full flex flex-col justify-end px-6 md:px-12 pb-16">
            <div className="font-display text-gold" style={{ fontSize: "clamp(80px, 14vw, 220px)", fontWeight: 300, lineHeight: 1, textShadow: "0 2px 12px rgba(0,0,0,0.6)" }}>{data.n}</div>
            <h1 className="font-display text-foreground mt-2" style={{ fontSize: "clamp(40px, 7vw, 96px)", fontWeight: 400, lineHeight: 1, textShadow: "0 2px 12px rgba(0,0,0,0.75), 0 0 2px rgba(0,0,0,0.5)" }}>{data.title}</h1>
            <p className="mt-6 max-w-2xl" style={{ fontSize: 18, lineHeight: 1.6, color: "#F4EFE6", textShadow: "0 1px 6px rgba(0,0,0,0.7)" }}>{data.intro}</p>
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

        {/* MID-PAGE CTA — bande sombre avec photo */}
        <section
          className="relative w-full overflow-hidden border-y border-gold/15"
          style={{ minHeight: 200, background: "var(--asphalte-900)" }}
        >
          <div className="relative z-10 px-6 py-14 md:py-16 text-center max-w-3xl mx-auto">
            <p className="font-display italic text-foreground" style={{ fontSize: "clamp(20px, 2.6vw, 28px)", lineHeight: 1.3 }}>
              Vous avez un projet de <span className="text-gold">{data.title.toLowerCase()}</span> ?
            </p>
            <p className="mt-3 text-muted text-sm md:text-base">
              Devis détaillé · Visite gratuite · Garantie décennale
            </p>
            <div className="mt-7">
              <Link
                to="/" hash="devis"

                className="cta-primary"
                style={{ fontFamily: "var(--font-body)", fontSize: 15, fontWeight: 500, padding: "14px 28px", borderRadius: 4, background: "var(--cuivre-500)", color: "#fff", textDecoration: "none", display: "inline-flex", alignItems: "center", gap: 8, transition: "all 0.2s ease" }}
              >
                Demander un devis pour ce projet →
              </Link>
            </div>
          </div>
        </section>

        {/* GALERIE */}
        <section className="px-6 md:px-12 py-16 max-w-6xl mx-auto">
          <div
            className={`grid grid-cols-1 gap-3 ${
              data.gallery.length <= 2
                ? "md:grid-cols-2 max-w-3xl mx-auto"
                : data.gallery.length === 4
                  ? "md:grid-cols-4"
                  : "md:grid-cols-3"
            }`}
          >
            {data.gallery.map((g) => (
              <div key={g} className="aspect-[4/3] overflow-hidden">
                <img src={optimizeImageUrl(g, 800)} alt={data.title} loading="lazy" className="w-full h-full object-cover hover:scale-105 transition-transform duration-700" />
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
              <article key={m.t} className="border-l-2 pl-6" style={{ borderColor: "var(--cuivre-500)" }}>
                <div className="font-display text-gold" style={{ fontSize: 48, fontWeight: 300, lineHeight: 1 }}>{String(i + 1).padStart(2, "0")}</div>
                <h3 className="font-display text-foreground mt-4" style={{ fontSize: 24, fontWeight: 400 }}>{m.t}</h3>
                <p className="mt-3 text-muted" style={{ lineHeight: 1.6 }}>{m.d}</p>
              </article>
            ))}
          </div>
        </section>

        {/* CE QU'IL FAUT SAVOIR — questions réelles, réponses autonomes.
            Contenu rendu en clair et toujours monté : c'est lui que reprend le
            JSON-LD FAQPage de cette page (même tableau `savoir.qa`). */}
        {data.savoir && (
          <section className="px-6 md:px-12 py-24 md:py-32 max-w-4xl mx-auto border-t border-gold/15">
            <div className="label text-gold">— Ce qu'il faut savoir</div>
            <h2 className="font-display mt-6 text-foreground" style={{ fontSize: "clamp(32px, 5vw, 56px)", fontWeight: 400, lineHeight: 1.05 }}>
              {data.savoir.heading}
            </h2>
            <p className="mt-6 text-muted max-w-3xl" style={{ fontSize: 17, lineHeight: 1.7 }}>
              {data.savoir.lead}
            </p>

            <div className="mt-14 space-y-12">
              {data.savoir.qa.map((f) => (
                <article key={f.q}>
                  <h3 className="font-display text-gold" style={{ fontSize: "clamp(21px, 2.4vw, 28px)", fontWeight: 400, lineHeight: 1.25 }}>
                    {f.q}
                  </h3>
                  <p className="mt-4 text-foreground/90" style={{ fontSize: 17, lineHeight: 1.75 }}>
                    {f.a}
                  </p>
                </article>
              ))}
            </div>

            <div className="mt-16 border-t border-gold/15 pt-6 text-muted" style={{ fontSize: 14, lineHeight: 1.7 }}>
              <p>
                Dernière mise à jour :{" "}
                <time dateTime={data.savoir.updated}>{data.savoir.updatedLabel}</time>
              </p>
              <p className="mt-2">
                Sources :{" "}
                {data.savoir.sources.map((s, i) => (
                  <span key={s.url}>
                    {i > 0 && " · "}
                    <a
                      href={s.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="underline decoration-gold/40 underline-offset-2 hover:text-gold"
                    >
                      {s.label}
                    </a>
                  </span>
                ))}
              </p>
            </div>
          </section>
        )}

        {/* CTA */}
        <section id="service-cta-bottom" className="relative px-6 md:px-12 py-32 text-center bg-surface">
          <div className="label text-gold">— Un projet ?</div>
          <h2 className="font-display mt-6 text-foreground max-w-3xl mx-auto" style={{ fontSize: "clamp(32px, 5vw, 64px)", fontWeight: 400, lineHeight: 1.05 }}>
            Demander un devis pour <span className="italic text-gold">{data.title.toLowerCase()}</span>
          </h2>
          <div className="mt-12 flex flex-wrap gap-3 justify-center">
            <Link
              to="/" hash="devis"

              className="cta-primary"
              style={{ fontFamily: "var(--font-body)", fontSize: 15, fontWeight: 500, padding: "14px 28px", borderRadius: 4, background: "var(--cuivre-500)", color: "#fff", textDecoration: "none", display: "inline-flex", alignItems: "center", gap: 8, transition: "all 0.2s ease" }}
            >
              Demander un devis →
            </Link>
            <a
              href="tel:0384526148"

              className="cta-secondary"
              style={{ fontFamily: "var(--font-body)", fontSize: 15, fontWeight: 500, padding: "14px 28px", borderRadius: 4, background: "transparent", color: "var(--creme-50)", border: "1px solid var(--creme-50)", textDecoration: "none", transition: "all 0.2s ease" }}
            >
              📞 03 84 52 61 48
            </a>
          </div>
        </section>

        {/* FOOTER simplifié */}
        <footer className="px-6 md:px-12 py-12 text-center border-t border-gold/15" style={{ background: "var(--footer)" }}>
          <Link to="/" className="font-display text-gold text-3xl">HCE</Link>
          <p className="mt-3 text-muted text-sm">Cize, Jura · 03 84 52 61 48</p>
        </footer>
        <MobileFloatingCTA href="/#devis" />
      </main>
    </>
  );
}
