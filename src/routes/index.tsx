import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { motion, AnimatePresence } from "framer-motion";
import { CustomCursor } from "@/components/CustomCursor";
import { SmoothScroll } from "@/components/SmoothScroll";
import { WhyUs, Zone, FAQ, QuoteForm } from "@/components/sections";
import { useIsMobile } from "@/hooks/use-mobile";
import { Link } from "@tanstack/react-router";
import { CTABanner, CTAPrimary, CTASecondary, CTAInline, MobileFloatingCTA } from "@/components/CTAButtons";
import { useSiteContent } from "@/hooks/useSiteContent";
import { useSiteContentFields } from "@/hooks/useSiteContentFields";
import { EditModeProvider, useEditMode } from "@/hooks/useEditMode";
import { EditModeToolbar } from "@/components/EditModeToolbar";
import { EditableText } from "@/components/EditableText";
import { EditableImage } from "@/components/EditableImage";

const HOME_SITE_ID = "11111111-1111-1111-1111-111111111111";

const service01 = "/photos/06-chantier-bobcat-preparation.jpg";
const service02 = "/photos/01-hero-finisseur-vapeur-sunset.jpg";
const service03 = "/photos/02-hero-medaillon-paves.jpg";
const service04 = "/photos/09-detail-bordure-beton.jpg";
const service05 = "/photos/13-cour-parking-muret.jpg";
const service06 = "/photos/04-hero-golden-hour.jpg";
const ctaCourtyard = "/photos/15-cour-golden-hour.jpg";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

/** Resolves field value: draft (if edit on) > published > fallback */
function useV() {
  const { get } = useSiteContentFields(HOME_SITE_ID);
  const { getDraft } = useEditMode();
  return (section: string, field: string, fallback: string) =>
    getDraft(section, field) ?? get(section, field, fallback);
}

export const Route = createFileRoute("/")({
  component: Index,
  head: () => ({
    meta: [
      { title: "HCE — L'enrobé qui dure · Jura et Ain" },
      { name: "description", content: "Spécialistes de l'aménagement de cours en enrobé à chaud, préparation de terrain et maçonnerie générale dans le Jura et l'Ain depuis 2005." },
    ],
  }),
});

function Index() {
  const { reload } = useSiteContentFields(HOME_SITE_ID);
  return (
    <EditModeProvider siteId={HOME_SITE_ID} onPublished={reload}>
      <IndexBody />
    </EditModeProvider>
  );
}

function IndexBody() {
  const [loaded, setLoaded] = useState(false);
  useEffect(() => {
    const t = setTimeout(() => setLoaded(true), 50);
    return () => clearTimeout(t);
  }, []);
  return (
    <>
      <EditModeToolbar />
      <SmoothScroll />
      <CustomCursor />
      <AnimatePresence>
        {!loaded && (
          <motion.div
            initial={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 1.2, ease: [0.4, 0, 0.2, 1] }}
            className="fixed inset-0 z-[10000] bg-background pointer-events-none"
          />
        )}
      </AnimatePresence>
      <main className="bg-background text-foreground overflow-x-hidden">
        <SiteHeader />
        <Hero />
        <GesteMatiere />
        <SectionDivider />
        <Philosophy />
        <SectionDivider />
        <Services />
        <CTABanner />
        <Transformation />
        <SectionDivider />
        <WhyUs />
        <SectionDivider />
        <Process />
        <SectionDivider />
        <MatiereFinitions />
        <SectionDivider />
        <Zone />
        <SectionDivider />
        <Galerie />
        <SectionDivider variant="marquee" />
        <Testimonials />
        <SectionDivider />
        <FAQ />
        <SectionDivider />
        <QuoteForm />
        <SectionDivider />
        <CTAFinal />
        <Footer />
        <MobileFloatingCTA />
      </main>
    </>
  );
}

/* ============ HEADER avec bouton ADMIN discret ============ */
function SiteHeader() {
  const [open, setOpen] = useState(false);
  return (
    <>
      <header className="fixed top-0 left-0 right-0 z-[60] pointer-events-none">
        <div className="flex items-center justify-end px-4 md:px-8 py-4">
          <Link
            to="/login"
            data-cursor-hover
            className="hidden md:inline-flex pointer-events-auto items-center gap-1.5 px-3.5 py-1.5 transition-colors"
            style={{
              color: "var(--sable-500)",
              background: "rgba(14,14,15,0.35)",
              backdropFilter: "blur(6px)",
              border: "1px solid var(--cuivre-500)",
              borderRadius: 3,
              fontFamily: "Outfit, sans-serif",
              fontSize: 11,
              fontWeight: 500,
              letterSpacing: "0.12em",
              textTransform: "uppercase",
              textDecoration: "none",
            }}
            onMouseEnter={(e) => { e.currentTarget.style.background = "var(--cuivre-500)"; e.currentTarget.style.color = "var(--creme-50)"; }}
            onMouseLeave={(e) => { e.currentTarget.style.background = "rgba(14,14,15,0.35)"; e.currentTarget.style.color = "var(--sable-500)"; }}
          >
            <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
              <rect x="3" y="11" width="18" height="11" rx="2" ry="2" />
              <path d="M7 11V7a5 5 0 0 1 10 0v4" />
            </svg>
            Admin
          </Link>
          <button
            type="button"
            onClick={() => setOpen(true)}
            aria-label="Ouvrir le menu"
            className="md:hidden pointer-events-auto inline-flex items-center justify-center"
            style={{
              width: 40, height: 40, borderRadius: 3,
              background: "rgba(14,14,15,0.5)", backdropFilter: "blur(6px)",
              border: "1px solid var(--cuivre-500)", color: "var(--creme-50)",
            }}
          >
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden><path d="M3 6h18M3 12h18M3 18h18" /></svg>
          </button>
        </div>
      </header>
      {open && (
        <div className="md:hidden fixed inset-0 z-[70] bg-asphalte/95 backdrop-blur-sm flex flex-col" onClick={() => setOpen(false)}>
          <div className="flex justify-end p-4">
            <button onClick={() => setOpen(false)} aria-label="Fermer" className="text-foreground text-3xl leading-none">×</button>
          </div>
          <nav className="flex-1 flex flex-col items-center justify-center gap-6 px-6">
            <a href="#devis" className="font-display text-foreground" style={{ fontSize: 24 }} onClick={() => setOpen(false)}>Demander un devis</a>
            <a href="tel:0384526148" className="font-display text-foreground" style={{ fontSize: 24 }}>03 84 52 61 48</a>
            <div className="w-12 h-px my-4" style={{ background: "var(--cuivre-500)" }} />
            <Link to="/login" onClick={() => setOpen(false)} className="inline-flex items-center gap-2" style={{ color: "var(--sable-500)", fontSize: 13, fontFamily: "Outfit", letterSpacing: "0.12em", textTransform: "uppercase" }}>
              <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
                <rect x="3" y="11" width="18" height="11" rx="2" ry="2" />
                <path d="M7 11V7a5 5 0 0 1 10 0v4" />
              </svg>
              Espace admin
            </Link>
          </nav>
        </div>
      )}
    </>
  );
}

/* ============ GESTE & MATIÈRE ============ */
function GesteMatiere() {
  const v = useV();
  const img = v("geste", "image", "/photos/01-hero-finisseur-vapeur-sunset.jpg");
  return (
    <section className="relative w-full bg-asphalte overflow-hidden">
      <div className="grid grid-cols-1 md:grid-cols-5 min-h-[80vh]">
        <div className="md:col-span-3 relative">
          <EditableImage section="geste" field="image" value={img}>
            {(url) => (
              <img
                src={url}
                alt={v("geste", "image_alt", "Finisseur HCE posant l'enrobé à chaud à 160°C, vapeur visible au coucher de soleil")}
                loading="lazy"
                className="absolute inset-0 w-full h-full object-cover"
              />
            )}
          </EditableImage>
        </div>
        <div className="md:col-span-2 flex items-center px-6 md:px-12 py-16 md:py-24">
          <div>
            <EditableText section="geste" field="label" value={v("geste", "label", "— Le geste & la matière")} as="div" className="label text-gold" />
            <EditableText
              section="geste"
              field="title"
              value={v("geste", "title", "L'enrobé à chaud, à 160°C. Posé. Compacté. Garanti.")}
              as="h2"
              className="font-display mt-6 text-foreground"
              style={{ fontSize: "clamp(32px, 4vw, 56px)", fontWeight: 400, lineHeight: 1.05 }}
              multiline
            />
            <EditableText
              section="geste"
              field="paragraph"
              value={v("geste", "paragraph", "Bitume noir, rouge, saumon ou bordeaux — posé au finisseur, compacté au rouleau, contrôlé à la tranche. Une matière vivante qui prend forme sous nos mains et tient dans le temps.")}
              as="p"
              className="mt-8 text-muted max-w-md"
              style={{ lineHeight: 1.7 }}
              multiline
            />
            <Link
              to="/services/enrobe-a-chaud"
              data-cursor-hover
              className="inline-flex items-center gap-3 mt-10 text-gold border-b border-gold/40 pb-1 hover:border-gold transition-colors"
              style={{ fontFamily: "Outfit", fontSize: 13, letterSpacing: "0.15em", textTransform: "uppercase" }}
            >
              <EditableText section="geste" field="cta" value={v("geste", "cta", "En savoir plus")} as="span" /> <span aria-hidden>→</span>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ============ MATIÈRE & FINITIONS ============ */
function MatiereFinitions() {
  const ref = useRef<HTMLDivElement>(null);
  const v = useV();
  const { enabled: editEnabled } = useEditMode();
  useEffect(() => {
    if (editEnabled) return;
    if (!ref.current) return;
    const cards = ref.current.querySelectorAll("[data-mf-card]");
    cards.forEach((c, i) => {
      gsap.fromTo(c, { y: 40, opacity: 0 }, {
        y: 0, opacity: 1, duration: 0.9, ease: "power3.out", delay: i * 0.1,
        scrollTrigger: { trigger: c, start: "top 88%" },
      });
    });
  }, [editEnabled]);
  const defaults = [
    { img: "/photos/02-hero-medaillon-paves.jpg", t: "Pavés sur mesure", d: "Médaillons et inserts pavés intégrés à l'enrobé pour personnaliser votre cour." },
    { img: "/photos/09-detail-bordure-beton.jpg", t: "Bordures nettes", d: "Tranches précises et finitions au millimètre, pour un rendu durable et propre." },
    { img: "/photos/10-detail-texture-enrobe-frais.jpg", t: "Grain & compactage", d: "Enrobé à chaud posé au finisseur à 160°C, compacté pour résister à la décennie." },
  ];
  return (
    <section className="relative w-full bg-cream py-16 md:py-24 px-6 md:px-12 overflow-hidden">
      <div className="max-w-3xl mx-auto text-center mb-16">
        <EditableText section="matiere" field="label" value={v("matiere", "label", "— Détails & finitions")} as="div" className="label" style={{ color: "var(--cuivre-500)" }} />
        <EditableText
          section="matiere"
          field="title"
          value={v("matiere", "title", "La matière fait\nla différence.")}
          as="h2"
          className="font-display mt-6"
          style={{ color: "var(--asphalte-900)", fontSize: "clamp(36px, 6vw, 72px)", fontWeight: 400, lineHeight: 1 }}
          multiline
        />
      </div>
      <div ref={ref} className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8 max-w-6xl mx-auto">
        {defaults.map((it, i) => {
          const img = v("matiere", `item_${i}_img`, it.img);
          return (
            <article key={i} data-mf-card data-cursor-hover className="group bg-[var(--creme-100)] overflow-hidden border-l-4 transition-all duration-500 hover:-translate-y-1" style={{ borderColor: "var(--cuivre-500)" }}>
              <div className="aspect-[4/3] overflow-hidden">
                <EditableImage section="matiere" field={`item_${i}_img`} value={img}>
                  {(url) => <img src={url} alt={it.t} loading="lazy" className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" />}
                </EditableImage>
              </div>
              <div className="p-6">
                <EditableText section="matiere" field={`item_${i}_t`} value={v("matiere", `item_${i}_t`, it.t)} as="h3" className="font-display" style={{ color: "var(--asphalte-900)", fontSize: 24, fontWeight: 500 }} />
                <EditableText section="matiere" field={`item_${i}_d`} value={v("matiere", `item_${i}_d`, it.d)} as="p" className="mt-3" style={{ color: "var(--asphalte-700)", fontSize: 14, lineHeight: 1.6 }} multiline />
              </div>
            </article>
          );
        })}
      </div>
    </section>
  );
}

/* ============ GALERIE FILTRABLE ============ */
const GALLERY: { src: string; cat: string; alt: string }[] = [
  ...["11-cour-courbe-ciel","12-cour-courbe-muret-pierre","13-cour-parking-muret","14-cour-maison-volets-rouges","15-cour-golden-hour","16-cour-maison-blanche-ciel-bleu","17-cour-arbres-automne","18-cour-allee-entre-maisons","19-cour-batiment-bois","20-cour-maison-beige-frontal","21-cour-maison-moderne-blanche","22-cour-maison-blanche-garage","23-cour-courbe-arbres","24-cour-maison-plain-pied","25-cour-allee-curve-garage"].map(s => ({ src: `/photos/${s}.jpg`, cat: "Cour & allée privée", alt: "Cour résidentielle en enrobé HCE" })),
  { src: "/photos/08-chantier-plaque-vibrante.jpg", cat: "Parking & voirie pro", alt: "Compactage à la plaque vibrante sur parking" },
  { src: "/photos/26-pro-batiment-commercial.jpg", cat: "Parking & voirie pro", alt: "Parking enrobé devant bâtiment commercial" },
  { src: "/photos/06-chantier-bobcat-preparation.jpg", cat: "Préparation & terrassement", alt: "Mini-pelle Bobcat en préparation de terrain à Cize" },
  { src: "/photos/07-chantier-terrain-brouette.jpg", cat: "Préparation & terrassement", alt: "Préparation manuelle du terrain avant pose" },
  { src: "/photos/02-hero-medaillon-paves.jpg", cat: "Détails & finitions", alt: "Médaillon de pavés intégré dans l'enrobé" },
  { src: "/photos/09-detail-bordure-beton.jpg", cat: "Détails & finitions", alt: "Bordure béton coulée HCE" },
  { src: "/photos/10-detail-texture-enrobe-frais.jpg", cat: "Détails & finitions", alt: "Texture enrobé à chaud fraîchement posé" },
  { src: "/photos/01-hero-finisseur-vapeur-sunset.jpg", cat: "Chantier en cours", alt: "Finisseur en cours de pose" },
  { src: "/photos/03-hero-rouleau-compacteur.jpg", cat: "Chantier en cours", alt: "Rouleau compacteur sur chantier HCE" },
];
const CATS = ["Cour & allée privée", "Parking & voirie pro", "Préparation & terrassement", "Détails & finitions", "Chantier en cours"];

// Photo représentative pour chaque catégorie
const CAT_COVERS: Record<string, string> = {
  "Cour & allée privée": "/photos/15-cour-golden-hour.jpg",
  "Parking & voirie pro": "/photos/26-pro-batiment-commercial.jpg",
  "Préparation & terrassement": "/photos/06-chantier-bobcat-preparation.jpg",
  "Détails & finitions": "/photos/02-hero-medaillon-paves.jpg",
  "Chantier en cours": "/photos/01-hero-finisseur-vapeur-sunset.jpg",
};

function Galerie() {
  const [openCat, setOpenCat] = useState<string | null>(null);
  const [lightbox, setLightbox] = useState<number | null>(null);
  const photos = openCat ? GALLERY.filter(g => g.cat === openCat) : [];

  useEffect(() => {
    if (lightbox === null) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setLightbox(null);
      if (e.key === "ArrowRight") setLightbox(i => i === null ? null : (i + 1) % photos.length);
      if (e.key === "ArrowLeft") setLightbox(i => i === null ? null : (i - 1 + photos.length) % photos.length);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [lightbox, photos.length]);

  const openCategory = (cat: string) => {
    setOpenCat(cat);
    setLightbox(0);
  };
  const closeAll = () => { setLightbox(null); setOpenCat(null); };

  return (
    <section className="relative w-full bg-background py-16 md:py-24 px-4 md:px-12 overflow-hidden">
      <GiantNumber n="05" position="right" />
      <div className="max-w-6xl mx-auto text-center mb-10 md:mb-14">
        <div className="label text-gold">— 500+ chantiers livrés depuis 2005</div>
        <h2 className="font-display mt-4 md:mt-6 text-foreground" style={{ fontSize: "clamp(32px, 6vw, 80px)", fontWeight: 400, lineHeight: 1, wordBreak: "keep-all", overflowWrap: "normal", hyphens: "none" }}>
          Nos <span className="italic text-gold">réalisations.</span>
        </h2>
        <p className="mt-4 max-w-xl mx-auto text-muted" style={{ fontSize: 14 }}>
          Choisissez une catégorie pour voir nos chantiers en grand.
        </p>
      </div>

      <div className="max-w-6xl mx-auto grid grid-cols-2 md:grid-cols-3 gap-3 md:gap-5">
        {CATS.map((cat, idx) => {
          const cover = CAT_COVERS[cat];
          const count = GALLERY.filter(g => g.cat === cat).length;
          // 5e carte (Chantier en cours) prend toute la largeur sur mobile
          const fullWidth = idx === 4 ? "col-span-2 md:col-span-1" : "";
          return (
            <button
              key={cat}
              onClick={() => openCategory(cat)}
              data-cursor-hover
              className={`relative group overflow-hidden aspect-[4/5] md:aspect-[4/5] cursor-none ${fullWidth}`}
              style={{ background: "var(--surface)" }}
            >
              <img src={cover} alt={cat} loading="lazy" className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" />
              <div className="absolute inset-0" style={{ background: "linear-gradient(to top, rgba(0,0,0,0.85) 0%, rgba(0,0,0,0.3) 50%, rgba(0,0,0,0.1) 100%)" }} />
              <div className="absolute bottom-0 left-0 right-0 p-4 md:p-5 text-left">
                <div className="label" style={{ color: "var(--gold)", fontSize: 9, marginBottom: 6 }}>{count} photos</div>
                <div className="font-display" style={{ color: "#FFFFFF", fontSize: "clamp(16px, 2vw, 22px)", fontWeight: 400, lineHeight: 1.15 }}>
                  {cat}
                </div>
                <div className="mt-2 flex items-center gap-2" style={{ color: "var(--gold)", fontSize: 11, fontFamily: "Outfit", letterSpacing: "0.1em", textTransform: "uppercase" }}>
                  Voir <span aria-hidden>→</span>
                </div>
              </div>
            </button>
          );
        })}
      </div>

      <AnimatePresence>
        {lightbox !== null && photos[lightbox] && (
          <motion.div
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            className="fixed inset-0 z-[9999] flex items-center justify-center"
            style={{ background: "rgba(14,14,15,0.95)" }}
            onClick={closeAll}
          >
            <button
              onClick={(e) => { e.stopPropagation(); closeAll(); }}
              className="absolute z-[9999] flex items-center justify-center transition-all duration-200"
              style={{
                top: "1rem", right: "1rem",
                width: 48, height: 48,
                background: "rgba(0,0,0,0.5)",
                backdropFilter: "blur(8px)",
                WebkitBackdropFilter: "blur(8px)",
                borderRadius: "50%",
                border: "1px solid rgba(255,255,255,0.2)",
                color: "#FFFFFF",
              }}
              onMouseEnter={(e) => { e.currentTarget.style.background = "rgba(0,0,0,0.8)"; e.currentTarget.style.transform = "scale(1.05)"; }}
              onMouseLeave={(e) => { e.currentTarget.style.background = "rgba(0,0,0,0.5)"; e.currentTarget.style.transform = "scale(1)"; }}
              aria-label="Fermer"
            >
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round"><path d="M18 6 6 18M6 6l12 12" /></svg>
            </button>
            <div className="absolute top-4 left-4 label text-gold/80" style={{ fontSize: 11 }}>{openCat} · {lightbox + 1}/{photos.length}</div>
            <button onClick={(e) => { e.stopPropagation(); setLightbox(((lightbox - 1) + photos.length) % photos.length); }} className="absolute left-2 md:left-8 text-gold text-4xl p-4" aria-label="Précédent">‹</button>
            <button onClick={(e) => { e.stopPropagation(); setLightbox((lightbox + 1) % photos.length); }} className="absolute right-2 md:right-8 text-gold text-4xl p-4" aria-label="Suivant">›</button>
            <img src={photos[lightbox].src} alt={photos[lightbox].alt} className="max-h-[80vh] max-w-[90vw] object-contain" onClick={(e) => e.stopPropagation()} />
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}

/* ============ DECORATIONS ============ */
function SectionDivider({ variant = "minimal" }: { variant?: "minimal" | "marquee" }) {
  if (variant === "marquee") return <MarqueeStats />;
  return (
    <div className="relative w-full flex items-center justify-center py-4 md:py-8 bg-background" aria-hidden>
      <div className="h-px flex-1 max-w-[28%] bg-gold/30" />
      <svg width="10" height="10" viewBox="0 0 14 14" className="mx-3 text-gold" style={{ opacity: 0.45 }}>
        <rect x="7" y="0" width="9.9" height="9.9" transform="rotate(45 7 7)" fill="currentColor" />
      </svg>
      <div className="h-px flex-1 max-w-[28%] bg-gold/30" />
    </div>
  );
}

/**
 * MarqueeStats — bandeau de preuves sociales défilant lentement.
 * CSS-only animation; pause si prefers-reduced-motion.
 */
function MarqueeStats() {
  const items = [
    "20 ans d'expérience",
    "500+ chantiers livrés",
    "Jura · Ain",
    "Devis sous 48h",
    "Garantie décennale",
    "Enrobé à chaud",
    "Visite gratuite",
  ];
  const row = [...items, ...items];
  return (
    <div
      className="relative w-full overflow-hidden bg-background py-8 border-y border-gold/15"
      aria-hidden
      role="presentation"
    >
      <div
        className="flex gap-12 whitespace-nowrap will-change-transform marquee-track"
        style={{ animation: "marqueeSlide 38s linear infinite" }}
      >
        {row.map((it, i) => (
          <span key={i} className="flex items-center gap-12 label text-gold/70" style={{ fontSize: 12 }}>
            {it}
            <span className="text-gold/40">◆</span>
          </span>
        ))}
      </div>
      <style>{`
        @keyframes marqueeSlide { from { transform: translateX(0); } to { transform: translateX(-50%); } }
        @media (prefers-reduced-motion: reduce) { .marquee-track { animation: none !important; } }
      `}</style>
    </div>
  );
}

/**
 * TechnicalMark — coupe d'enrobé annotée, SVG monochrome doré
 * Remplace l'ancien BotanicalLeaf (héritage paysagiste).
 * aria-hidden, opacité basse, prefers-reduced-motion safe (statique).
 */
function TechnicalMark({ className = "", style }: { className?: string; style?: React.CSSProperties }) {
  return (
    <svg
      viewBox="0 0 200 400"
      className={`pointer-events-none absolute text-gold ${className}`}
      style={{ opacity: 0.1, ...style }}
      aria-hidden
      role="presentation"
      fill="none"
      stroke="currentColor"
      strokeWidth="1"
    >
      {/* couche enrobé (haut) */}
      <rect x="20" y="40" width="160" height="38" fill="currentColor" fillOpacity="0.25" />
      <line x1="20" y1="40" x2="180" y2="40" />
      <line x1="20" y1="78" x2="180" y2="78" />
      {/* couche grave bitume */}
      <rect x="20" y="78" width="160" height="50" fill="currentColor" fillOpacity="0.12" />
      <line x1="20" y1="128" x2="180" y2="128" />
      {/* couche fondation gravier (motif points) */}
      {Array.from({ length: 6 }).map((_, i) =>
        Array.from({ length: 16 }).map((__, j) => (
          <circle key={`${i}-${j}`} cx={26 + j * 10} cy={138 + i * 12} r="1.4" fill="currentColor" />
        ))
      )}
      <line x1="20" y1="216" x2="180" y2="216" />
      {/* sol naturel hachuré */}
      {Array.from({ length: 14 }).map((_, i) => (
        <line key={i} x1={20 + i * 12} y1="216" x2={32 + i * 12} y2="240" strokeWidth="0.6" />
      ))}
      {/* lignes de cote droite */}
      <line x1="186" y1="40" x2="186" y2="216" strokeDasharray="2 3" />
      <line x1="183" y1="40" x2="189" y2="40" />
      <line x1="183" y1="78" x2="189" y2="78" />
      <line x1="183" y1="128" x2="189" y2="128" />
      <line x1="183" y1="216" x2="189" y2="216" />
      {/* étiquettes */}
      <text x="14" y="62" fontSize="6" fill="currentColor" fontFamily="monospace" textAnchor="end">BBSG</text>
      <text x="14" y="106" fontSize="6" fill="currentColor" fontFamily="monospace" textAnchor="end">GB</text>
      <text x="14" y="178" fontSize="6" fill="currentColor" fontFamily="monospace" textAnchor="end">GNT</text>
      <text x="14" y="232" fontSize="6" fill="currentColor" fontFamily="monospace" textAnchor="end">SOL</text>
      {/* mire haut */}
      <circle cx="100" cy="20" r="6" />
      <line x1="94" y1="20" x2="106" y2="20" />
      <line x1="100" y1="14" x2="100" y2="26" />
    </svg>
  );
}

/**
 * GiantNumber — repère éditorial type magazine, fond de section.
 */
function GiantNumber({ n, position = "right" }: { n: string; position?: "left" | "right" | "center" }) {
  const pos: Record<string, React.CSSProperties> = {
    left:   { left: "-2vw" },
    right:  { right: "-2vw" },
    center: { left: "50%", transform: "translateX(-50%)" },
  };
  return (
    <span
      aria-hidden
      className="pointer-events-none absolute top-1/2 -translate-y-1/2 font-display text-foreground select-none whitespace-nowrap"
      style={{
        ...pos[position],
        fontFamily: "Cormorant Garamond, serif",
        fontSize: "clamp(180px, 28vw, 420px)",
        fontWeight: 300,
        lineHeight: 0.85,
        opacity: 0.05,
        letterSpacing: "-0.05em",
      }}
    >
      {n}
    </span>
  );
}

function CornerGlow({ corner = "tl", tint = "gold" }: { corner?: "tl" | "tr" | "bl" | "br"; tint?: "gold" | "green" }) {
  const pos: Record<string, React.CSSProperties> = {
    tl: { top: "-10%", left: "-10%" },
    tr: { top: "-10%", right: "-10%" },
    bl: { bottom: "-10%", left: "-10%" },
    br: { bottom: "-10%", right: "-10%" },
  };
  const color = tint === "gold" ? "rgba(200,153,42,0.05)" : "rgba(26,51,32,0.18)";
  return (
    <div
      aria-hidden
      className="pointer-events-none absolute w-[60vw] h-[60vw] max-w-[800px] max-h-[800px]"
      style={{ ...pos[corner], background: `radial-gradient(circle, ${color} 0%, transparent 60%)` }}
    />
  );
}

/* ============ HERO ============ */
function Hero() {
  const titleRef = useRef<HTMLHeadingElement>(null);
  const lineRef = useRef<HTMLDivElement>(null);
  const subRef = useRef<HTMLDivElement>(null);
  const { get } = useSiteContent();
  const { enabled: editEnabled } = useEditMode();
  const v = useV();
  const heroDefault = get("hero", { line1: "L'Enrobé qui", line2: "Marque le Temps.", badge: "HCE — Cize, Jura", tagline: "Depuis 2005" }) as { line1: string; line2: string; badge: string; tagline: string };
  const line1 = v("hero", "line1", heroDefault.line1);
  const line2 = v("hero", "line2", heroDefault.line2);
  const badge = v("hero", "badge", heroDefault.badge);
  const tagline = v("hero", "tagline", heroDefault.tagline);

  useEffect(() => {
    if (editEnabled) return; // skip GSAP split animation in edit mode
    if (!titleRef.current) return;
    const chars = titleRef.current.querySelectorAll("[data-c]");
    const tl = gsap.timeline({ delay: 1.0 });
    tl.fromTo(chars,
      { yPercent: -110, opacity: 0 },
      { yPercent: 0, opacity: 1, duration: 1, ease: "power4.out", stagger: 0.03 }
    );
    if (lineRef.current) tl.fromTo(lineRef.current, { width: 0 }, { width: 120, duration: 0.8, ease: "power3.out" }, "-=0.3");
    if (subRef.current) tl.fromTo(subRef.current, { opacity: 0, y: 10 }, { opacity: 1, y: 0, duration: 0.8 }, "-=0.4");
  }, [line1, line2, editEnabled]);

  const lines = [line1, line2];
  return (
    <section className="relative h-screen w-full overflow-hidden bg-background">
      <video
        className="absolute inset-0 h-full w-full object-cover"
        src="/videos/hero.mp4"
        autoPlay muted loop playsInline preload="auto"
      />
      <div className="absolute inset-x-0 bottom-0 h-[60%]" style={{ background: "linear-gradient(to bottom, transparent, #1E1E1E)" }} />
      <div className="absolute inset-0 bg-background/20" />

      <div className="relative z-10 flex h-full flex-col items-center justify-center px-6">
        {editEnabled ? (
          <div className="text-center space-y-2">
            <EditableText
              section="hero"
              field="line1"
              value={line1}
              as="h1"
              className="font-display text-foreground block"
              style={{ fontSize: "clamp(40px, 9vw, 140px)", fontWeight: 400, lineHeight: 1, letterSpacing: "-0.02em", wordBreak: "keep-all", overflowWrap: "normal", hyphens: "none" }}
            />
            <EditableText
              section="hero"
              field="line2"
              value={line2}
              as="h1"
              className="font-display text-foreground block"
              style={{ fontSize: "clamp(40px, 9vw, 140px)", fontWeight: 400, lineHeight: 1, letterSpacing: "-0.02em", wordBreak: "keep-all", overflowWrap: "normal", hyphens: "none" }}
            />
          </div>
        ) : (
          <h1
            ref={titleRef}
            className="font-display text-center text-foreground px-2"
            style={{ fontSize: "clamp(40px, 9vw, 140px)", fontWeight: 400, lineHeight: 1, letterSpacing: "-0.02em", wordBreak: "keep-all", overflowWrap: "normal", hyphens: "none" }}
          >
            {lines.map((line, li) => {
              const words = line.split(" ");
              return (
                <span key={li} className="block overflow-hidden" style={{ wordBreak: "keep-all", overflowWrap: "normal" }}>
                  {words.map((word, wi) => (
                    <span key={wi} className="inline-block" style={{ whiteSpace: "nowrap", marginRight: wi < words.length - 1 ? "0.28em" : 0 }}>
                      {word.split("").map((c, ci) => (
                        <span key={ci} data-c className="inline-block">{c}</span>
                      ))}
                    </span>
                  ))}
                </span>
              );
            })}
          </h1>
        )}
        <div ref={lineRef} className="mt-8 md:mt-10 h-px bg-gold" style={{ width: editEnabled ? 120 : 0 }} />
        <EditableText
          section="hero"
          field="badge"
          value={badge}
          as="div"
          className="mt-6 md:mt-8 label"
          style={{ color: "#FFFFFF", opacity: 0.9 }}
        />
        <div
          className="mt-8 md:mt-10 flex flex-col sm:flex-row items-center gap-3 px-4 sm:px-0 w-full sm:w-auto"
          style={{ animation: "fadeUp 0.8s ease 1.6s both" }}
        >
          <CTAPrimary>Demander un devis gratuit</CTAPrimary>
          <CTASecondary light />
        </div>
      </div>

      <div className="hidden md:block absolute bottom-10 left-6 z-10 origin-bottom-left -rotate-90 label whitespace-nowrap" style={{ transformOrigin: "left bottom", color: "#FFFFFF", opacity: 0.7 }}>
        Scroll pour découvrir
      </div>
      <EditableText
        section="hero"
        field="tagline"
        value={tagline}
        as="div"
        className="absolute bottom-6 md:bottom-10 right-6 z-10 label"
        style={{ color: "#FFFFFF", opacity: 0.75 }}
      />
    </section>
  );
}

/* ============ PHILOSOPHY ============ */
function Philosophy() {
  const ref = useRef<HTMLDivElement>(null);
  const v = useV();
  const { enabled: editEnabled } = useEditMode();
  const text = v("philosophy", "text", "Un enrobé qui dure,\nune finition qui marque.");
  const signature = v("philosophy", "signature", "— HCE, Cize");

  useEffect(() => {
    if (editEnabled) return;
    if (!ref.current) return;
    const words = ref.current.querySelectorAll("[data-w]");
    gsap.fromTo(words,
      { opacity: 0, y: 30 },
      {
        opacity: 1, y: 0, duration: 1, ease: "power3.out", stagger: 0.08,
        scrollTrigger: { trigger: ref.current, start: "top 70%" },
      }
    );
  }, [editEnabled, text]);

  return (
    <section ref={ref} className="relative w-full bg-background flex items-center justify-center px-6 py-16 md:py-24">
      <div className="max-w-5xl text-center">
        {editEnabled ? (
          <EditableText
            section="philosophy"
            field="text"
            value={text}
            as="p"
            className="font-display italic text-foreground"
            style={{ fontSize: "clamp(26px, 5vw, 72px)", fontWeight: 300, lineHeight: 1.2, wordBreak: "keep-all", overflowWrap: "normal", hyphens: "none" }}
            multiline
          />
        ) : (
          <p
            className="font-display italic text-foreground"
            style={{ fontSize: "clamp(26px, 5vw, 72px)", fontWeight: 300, lineHeight: 1.2, wordBreak: "keep-all", overflowWrap: "normal", hyphens: "none" }}
          >
            {text.split("\n").map((line, li) => (
              <span key={li} className="block">
                {line.split(" ").map((w, wi) => (
                  <span key={wi} data-w className="inline-block mr-[0.25em]" style={{ whiteSpace: "nowrap" }}>{w}</span>
                ))}
              </span>
            ))}
          </p>
        )}
        <EditableText section="philosophy" field="signature" value={signature} as="div" className="mt-8 md:mt-12 label text-gold" />
      </div>
    </section>
  );
}

/* ============ SERVICES ============ */
const SERVICES = [
  { n: "01", t: "Préparation de terrain", img: service01, slug: "preparation-terrain" },
  { n: "02", t: "Enrobé à chaud", img: service02, slug: "enrobe-a-chaud" },
  { n: "03", t: "Maçonnerie générale", img: service03, slug: "maconnerie-generale" },
  { n: "04", t: "Drainage & pentes", img: service04, slug: "drainage-pentes" },
  { n: "05", t: "Bordures & murets", img: service05, slug: "bordures-murets" },
  { n: "06", t: "Garantie & SAV", img: service06, slug: "garantie-sav" },
];

function ServicesHeader() {
  const v = useV();
  return (
    <div className="px-6 md:px-12 mb-16 flex items-end justify-between flex-wrap gap-6">
      <div>
        <EditableText section="services" field="label" value={v("services", "label", "— Nos services")} as="div" className="label text-gold" />
        <EditableText
          section="services"
          field="title"
          value={v("services", "title", "Trois métiers, une même exigence.")}
          as="h2"
          className="font-display mt-6 text-foreground"
          style={{ fontSize: "clamp(40px, 7vw, 96px)", fontWeight: 400, lineHeight: 0.95 }}
          multiline
        />
      </div>
      <EditableText
        section="services"
        field="intro"
        value={v("services", "intro", "De la préparation du sol à la pose finale, HCE intervient sur l'intégralité de votre chantier — sans intermédiaire.")}
        as="p"
        className="max-w-md text-muted"
        multiline
      />
    </div>
  );
}

function Services() {
  const ref = useRef<HTMLDivElement>(null);
  const { get } = useSiteContent();
  const services = get("services", SERVICES) as typeof SERVICES;
  useEffect(() => {
    if (!ref.current) return;
    const strips = ref.current.querySelectorAll("[data-strip]");
    strips.forEach((s, i) => {
      gsap.fromTo(s,
        { x: -60, opacity: 0 },
        {
          x: 0, opacity: 1, duration: 0.9, ease: "power3.out", delay: i * 0.1,
          scrollTrigger: { trigger: s, start: "top 88%" },
        }
      );
    });
  }, [services]);

  return (
    <section
      className="relative bg-background py-16 md:py-24 overflow-hidden"
      style={{ background: "radial-gradient(ellipse at center, #262626 0%, #1E1E1E 70%)" }}
    >
      <div className="grain-overlay" aria-hidden />
      <GiantNumber n="01" position="left" />
      <TechnicalMark className="hidden md:block" style={{ top: "8%", right: "-40px", width: 180, height: 360, transform: "rotate(8deg)" }} />
      <TechnicalMark className="hidden md:block" style={{ bottom: "5%", left: "-30px", width: 160, height: 320, transform: "rotate(-6deg)" }} />
      <ServicesHeader />

      <div ref={ref} className="relative">
        {services.map((s) => <ServiceStrip key={s.n} {...s} />)}
      </div>
    </section>
  );
}

function ServiceStrip({ n, t, img, slug }: { n: string; t: string; img: string; slug: string }) {
  const [h, setH] = useState(false);
  const isMobile = useIsMobile();
  const expanded = h || isMobile; // toujours étendu sur mobile pour lisibilité
  return (
    <Link
      to="/services/$slug"
      params={{ slug }}
      data-strip data-cursor-hover
      onMouseEnter={() => setH(true)}
      onMouseLeave={() => setH(false)}
      className="relative block w-full overflow-hidden border-b cursor-none transition-[height] duration-700 ease-out"
      style={{ height: expanded ? (isMobile ? 220 : 400) : 200, borderColor: "#2E2E2E" }}
    >
      <div
        className="absolute inset-0 bg-cover bg-center transition-opacity duration-700"
        style={{ backgroundImage: `url(${img})`, opacity: expanded ? 1 : 0 }}
      />
      {/* dégradé directionnel fort pour garantir lisibilité du texte blanc */}
      <div
        className="absolute inset-0 transition-opacity duration-700"
        style={{
          background:
            "linear-gradient(90deg, rgba(0,0,0,0.92) 0%, rgba(0,0,0,0.78) 45%, rgba(0,0,0,0.55) 75%, rgba(0,0,0,0.35) 100%)",
          opacity: expanded ? 1 : 0,
        }}
      />
      <div className="relative z-10 h-full grid grid-cols-12 items-center px-6 md:px-12 gap-4 md:gap-6">
        <div
          className="col-span-2 font-display text-gold"
          style={{ fontSize: "clamp(32px, 6vw, 80px)", fontWeight: 300, lineHeight: 1, textShadow: expanded ? "0 2px 8px rgba(0,0,0,0.8), 0 0 2px rgba(0,0,0,0.6)" : "none" }}
        >{n}</div>
        <div
          className="col-span-8 font-display relative inline-block"
          style={{ fontSize: "clamp(18px, 3vw, 36px)", fontWeight: 400, color: expanded ? "#FFFFFF" : "var(--foreground)", textShadow: expanded ? "0 2px 8px rgba(0,0,0,0.8), 0 0 2px rgba(0,0,0,0.6)" : "none" }}
        >
          <span className="relative inline-block">
            {t}
            <span
              className="absolute left-0 -bottom-1 h-px bg-gold transition-transform duration-700 ease-out origin-left"
              style={{ width: "100%", transform: h ? "scaleX(1)" : "scaleX(0)" }}
            />
          </span>
        </div>
        <div className="col-span-2 flex justify-end">
          <span className="text-gold text-2xl md:text-4xl inline-block transition-transform duration-500" style={{ transform: h ? "rotate(45deg)" : "rotate(0deg)", textShadow: expanded ? "0 2px 6px rgba(0,0,0,0.7)" : "none" }}>→</span>
        </div>
      </div>
    </Link>
  );
}

/* ============ TRANSFORMATION ============ */
function Transformation() {
  const statsRef = useRef<HTMLDivElement>(null);
  const v = useV();

  useEffect(() => {
    if (!statsRef.current) return;
    const nums = statsRef.current.querySelectorAll<HTMLElement>("[data-num]");
    nums.forEach((el) => {
      const target = parseInt(el.dataset.num || "0", 10);
      const obj = { v: 0 };
      gsap.to(obj, {
        v: target, duration: 2, ease: "power2.out",
        onUpdate: () => { el.textContent = String(Math.round(obj.v)); },
        scrollTrigger: { trigger: el, start: "top 85%" },
      });
    });
  }, []);

  return (
    <section className="relative h-screen w-full overflow-hidden bg-background">
      <video
        className="absolute inset-0 h-full w-full object-cover"
        src="/videos/transformation.mp4"
        autoPlay muted loop playsInline preload="auto"
      />
      <div className="absolute inset-0" style={{ background: "rgba(30,30,30,0.55)" }} />
      <div className="absolute inset-x-0 bottom-0 h-[30%]" style={{ background: "linear-gradient(to bottom, transparent, #1E1E1E)" }} />

      <div className="relative z-10 h-full w-full flex flex-col items-center justify-center text-center px-6">
        <EditableText section="transformation" field="label" value={v("transformation", "label", "— Avant / Après")} as="div" className="label text-gold" />
        <EditableText
          section="transformation"
          field="title"
          value={v("transformation", "title", "De la Cour Brute\nà l'Enrobé d'Exception")}
          as="h2"
          className="font-display mt-6 text-foreground"
          style={{ fontSize: "clamp(40px, 6vw, 88px)", fontWeight: 400, lineHeight: 1.05 }}
          multiline
        />
        <EditableText
          section="transformation"
          field="text"
          value={v("transformation", "text", "Chaque chantier débute par une lecture du terrain — sols, pentes, drainage, usages — pour garantir un enrobé qui dure dans le temps.")}
          as="p"
          className="mt-6 md:mt-8 max-w-xl mx-auto"
          style={{ color: "#FFFFFF", opacity: 0.92, lineHeight: 1.6 }}
          multiline
        />
        <div ref={statsRef} className="mt-14 grid grid-cols-3 gap-8 md:gap-16 max-w-3xl mx-auto">
          {[
            { n: 20, suf: "+", l: "Années" },
            { n: 500, suf: "+", l: "Chantiers" },
            { n: 100, suf: "%", l: "Satisfaits" },
          ].map((s, i) => (
            <div key={i} className="text-center">
              <div className="font-display flex items-baseline justify-center gap-1" style={{ color: "var(--creme-50)", fontSize: "clamp(36px, 5vw, 72px)", fontWeight: 400, lineHeight: 1 }}>
                <span data-num={s.n}>0</span><span style={{ color: "var(--sable-500)" }}>{s.suf}</span>
              </div>
              <EditableText section="transformation" field={`stat_${i}_l`} value={v("transformation", `stat_${i}_l`, s.l)} as="div" className="label text-foreground/80 mt-3" />
            </div>
          ))}
        </div>
        <div className="mt-12">
          <CTAPrimary>Estimer mon projet</CTAPrimary>
        </div>
      </div>
    </section>
  );
}

/* ============ PROCESS ============ */
const PROCESS = [
  { n: "01", t: "Visite & Devis", d: "Déplacement gratuit, lecture du terrain et devis détaillé sous 48h.", img: null as string | null },
  { n: "02", t: "Préparation du sol", d: "Décaissement, nivellement laser, compactage et drainage maîtrisés.", img: "/photos/07-chantier-terrain-brouette.jpg" },
  { n: "03", t: "Pose & Finitions", d: "Enrobé à chaud au finisseur, bordures et maçonnerie soignées.", img: "/photos/10-detail-texture-enrobe-frais.jpg" },
  { n: "04", t: "Garantie & SAV", d: "Travaux garantis, intervention rapide en cas de besoin.", img: "/photos/03-hero-rouleau-compacteur.jpg" },
];

function Process() {
  const ref = useRef<HTMLDivElement>(null);
  const lineRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    if (!ref.current) return;
    const items = ref.current.querySelectorAll<HTMLElement>("[data-step]");
    items.forEach((el) => {
      const side = el.dataset.side === "left" ? -60 : 60;
      gsap.fromTo(el,
        { x: side, opacity: 0 },
        {
          x: 0, opacity: 1, duration: 1, ease: "power3.out",
          scrollTrigger: { trigger: el, start: "top 80%" },
        }
      );
    });

    const dots = ref.current.querySelectorAll<HTMLElement>("[data-dot]");
    dots.forEach((el) => {
      gsap.fromTo(el,
        { scale: 0, opacity: 0 },
        {
          scale: 1, opacity: 1, duration: 0.6, ease: "back.out(2)",
          scrollTrigger: { trigger: el, start: "top 85%" },
        }
      );
    });

    const nums = ref.current.querySelectorAll<HTMLElement>("[data-step-num]");
    nums.forEach((el) => {
      const target = parseInt(el.dataset.stepNum || "0", 10);
      const obj = { v: 0 };
      gsap.to(obj, {
        v: target, duration: 1.2, ease: "power2.out",
        onUpdate: () => { el.textContent = String(Math.round(obj.v)).padStart(2, "0"); },
        scrollTrigger: { trigger: el, start: "top 85%" },
      });
    });

    if (lineRef.current) {
      gsap.fromTo(lineRef.current,
        { scaleY: 0 },
        {
          scaleY: 1, ease: "none", transformOrigin: "top center",
          scrollTrigger: { trigger: ref.current, start: "top 80%", end: "bottom 80%", scrub: true },
        }
      );
    }
  }, []);

  return (
    <section className="relative bg-background py-16 md:py-24 px-6 md:px-12 overflow-hidden">
      <CornerGlow corner="tr" tint="gold" />
      <CornerGlow corner="bl" tint="green" />
      <GiantNumber n="03" position="right" />
      <TechnicalMark className="hidden md:block" style={{ top: "20%", left: "2%", width: 140, height: 280, transform: "rotate(-4deg)" }} />
      <div className="max-w-3xl mx-auto text-center mb-16 md:mb-24">
        <ProcessHeader />
      </div>

      <div ref={ref} className="relative max-w-6xl mx-auto">
        {/* vertical gold line: left-24 on mobile, centered on desktop */}
        <div
          ref={lineRef}
          className="absolute top-0 bottom-0 w-px bg-gold/40 left-6 md:left-1/2 md:-translate-x-1/2"
          style={{ transformOrigin: "top center" }}
          aria-hidden
        />

        {PROCESS.map((s, i) => {
          const left = i % 2 === 0;
          return (
            <div
              key={s.n}
              className="relative md:grid md:grid-cols-2 md:gap-16 mb-14 md:mb-24 last:mb-0 md:items-center pl-16 md:pl-0"
            >
              {/* number dot — sits ON the line (left mobile / center desktop) */}
              <div
                data-dot
                className="absolute top-2 left-[18px] md:left-1/2 -translate-x-1/2 w-9 h-9 md:w-10 md:h-10 rounded-full bg-gold ring-4 ring-background flex items-center justify-center font-display text-background z-10"
                style={{ fontSize: 14, fontWeight: 500 }}
                aria-hidden
              >
                {s.n}
              </div>
              <ProcessStep step={s} left={left} />
            </div>
          );
        })}
      </div>
    </section>
  );
}

function ProcessHeader() {
  const v = useV();
  return (
    <>
      <EditableText section="process" field="label" value={v("process", "label", "— Notre processus")} as="div" className="label text-gold" />
      <EditableText
        section="process"
        field="title"
        value={v("process", "title", "Quatre étapes,\nun engagement.")}
        as="h2"
        className="font-display mt-6 text-foreground"
        style={{ fontSize: "clamp(36px, 6vw, 80px)", fontWeight: 400, lineHeight: 0.95 }}
        multiline
      />
    </>
  );
}

function ProcessStep({ step, left }: { step: { n: string; t: string; d: string; img: string | null }; left: boolean }) {
  const [hover, setHover] = useState(false);
  const num = parseInt(step.n, 10);
  const v = useV();
  const t = v("process", `step_${step.n}_t`, step.t);
  const d = v("process", `step_${step.n}_d`, step.d);
  const img = step.img ? v("process", `step_${step.n}_img`, step.img) : null;
  return (
    <div
      data-step data-side={left ? "left" : "right"}
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
      className={`relative ${left ? "md:col-start-1 md:text-right md:pr-16" : "md:col-start-2 md:text-left md:pl-16"}`}
    >
      {img && (
        <div className={`mb-4 overflow-hidden aspect-[4/3] max-w-sm ${left ? "md:ml-auto" : ""}`}>
          <EditableImage section="process" field={`step_${step.n}_img`} value={img}>
            {(url) => (
              <img
                src={url}
                alt={t}
                loading="lazy"
                className="w-full h-full object-cover transition-transform duration-700"
                style={{ transform: hover ? "scale(1.05)" : "scale(1)" }}
              />
            )}
          </EditableImage>
        </div>
      )}
      <div className="relative">
        <div data-step-num={num} className="font-display text-gold" style={{ fontSize: "clamp(40px, 6vw, 80px)", fontWeight: 300, lineHeight: 1 }}>00</div>
        <EditableText section="process" field={`step_${step.n}_t`} value={t} as="h3" className="font-display text-foreground mt-2" style={{ fontSize: "clamp(20px, 2.4vw, 32px)", fontWeight: 400 }} />
        <EditableText section="process" field={`step_${step.n}_d`} value={d} as="p" className="mt-3 md:mt-4 text-muted max-w-sm" style={{ marginLeft: left ? "auto" : 0 }} multiline />
      </div>
    </div>
  );
}

/* ============ TESTIMONIALS V2 — stacked cards + reveal stars + particles ============ */
const TESTIMONIALS = [
  { q: "Travail impeccable, équipe sérieuse et ponctuelle. Mon allée est parfaite, les finitions sont soignées. Je recommande HCE sans hésitation.", n: "Michel T.", c: "Bourg-en-Bresse" },
  { q: "Devis rapide, prix honnête et résultat au-delà de mes attentes. La cour est magnifique et très bien drainée.", n: "Sandrine L.", c: "Lons-le-Saunier" },
  { q: "HCE a refait le parking de notre entrepôt. Travail soigné, dans les délais et conforme au devis. Très satisfait.", n: "Pascal M.", c: "Oyonnax" },
];

function Testimonials() {
  const v = useV();
  const ref = useRef<HTMLDivElement>(null);
  const isMobile = useIsMobile();

  useEffect(() => {
    if (!ref.current) return;
    const cards = ref.current.querySelectorAll<HTMLElement>("[data-tcard]");
    cards.forEach((card, idx) => {
      // reveal doux SANS opacité 0 initiale (évite cartes invisibles si ScrollTrigger ne se déclenche pas sur mobile)
      gsap.fromTo(card,
        { y: 30 },
        { y: 0, duration: 0.9, ease: "power3.out", delay: idx * 0.1,
          scrollTrigger: { trigger: card, start: "top 92%" } });

      // parallax desktop uniquement
      if (!isMobile) {
        const speed = idx === 0 ? 0 : idx === 1 ? -40 : 20;
        if (speed !== 0) {
          gsap.to(card, {
            y: speed, ease: "none",
            scrollTrigger: { trigger: card, start: "top bottom", end: "bottom top", scrub: true },
          });
        }
      }

      // stars sequential reveal
      const stars = card.querySelectorAll<HTMLElement>("[data-tstar]");
      gsap.fromTo(stars,
        { opacity: 0, scale: 0.4 },
        { opacity: 1, scale: 1, duration: 0.35, stagger: 0.08, ease: "back.out(2.4)",
          scrollTrigger: { trigger: card, start: "top 85%" } });
    });
  }, [isMobile]);

  return (
    <section className="relative bg-background flex items-center justify-center px-6 py-20 md:py-28 overflow-hidden">
      <div aria-hidden className="absolute inset-0" style={{ background: "linear-gradient(180deg, var(--background) 0%, var(--surface) 50%, var(--background) 100%)" }} />
      <div className="grain-overlay animated" aria-hidden />
      <GiantNumber n="04" position="left" />
      <TechnicalMark className="hidden md:block" style={{ top: "10%", right: "3%", width: 160, height: 320, transform: "rotate(6deg)" }} />

      <div className="relative max-w-6xl w-full">
        <div className="text-center mb-12 md:mb-16">
          <EditableText section="testimonials" field="label" value={v("testimonials", "label", "— Ils nous font confiance")} as="div" className="label text-gold" />
          <EditableText
            section="testimonials"
            field="title"
            value={v("testimonials", "title", "La Parole\nà nos clients.")}
            as="h2"
            className="font-display mt-4 md:mt-6 text-foreground"
            style={{ fontSize: "clamp(32px, 6vw, 80px)", fontWeight: 400, lineHeight: 1, wordBreak: "keep-all", overflowWrap: "normal", hyphens: "none" }}
            multiline
          />
        </div>

        <div ref={ref} className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-6 items-start">
          {TESTIMONIALS.map((t, idx) => {
            const offsetClass = idx === 0 ? "md:translate-y-0" : idx === 1 ? "md:-translate-y-8" : "md:translate-y-4";
            return (
              <article
                key={idx}
                data-tcard
                data-cursor-hover
                className={`relative p-6 md:p-10 bg-surface border border-border transition-all duration-500 hover:border-gold hover:-translate-y-1.5 group overflow-hidden ${offsetClass}`}
                style={{ minHeight: 280 }}
              >
                <span
                  aria-hidden
                  className="absolute -top-6 -left-2 font-display text-gold pointer-events-none select-none"
                  style={{ fontSize: 180, lineHeight: 0.7, opacity: 0.08 }}
                >
                  “
                </span>

                <div className="relative flex gap-1.5 mb-5">
                  {[0,1,2,3,4].map((s) => (
                    <span key={s} data-tstar className="text-gold inline-block" style={{ fontSize: 16 }}>★</span>
                  ))}
                </div>

                <EditableText section="testimonials" field={`item_${idx}_q`} value={v("testimonials", `item_${idx}_q`, t.q)} as="p" className="relative font-display italic text-foreground" style={{ fontSize: 17, lineHeight: 1.55, fontWeight: 300 }} multiline />

                <div className="relative mt-6 pt-5 border-t border-gold/20">
                  <EditableText section="testimonials" field={`item_${idx}_n`} value={v("testimonials", `item_${idx}_n`, t.n)} as="div" className="font-display text-foreground" style={{ fontSize: 16, fontWeight: 400 }} />
                  <EditableText section="testimonials" field={`item_${idx}_c`} value={v("testimonials", `item_${idx}_c`, t.c)} as="div" className="label text-gold mt-1.5" style={{ fontSize: 9 }} />
                </div>

                <span
                  aria-hidden
                  className="absolute top-0 right-0 w-12 h-12 transition-opacity duration-500 opacity-0 group-hover:opacity-100"
                  style={{ background: "linear-gradient(225deg, rgba(200,153,42,0.25), transparent 60%)" }}
                />
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
}

/* ============ CTA FINAL ============ */
function CTAFinal() {
  const ref = useRef<HTMLDivElement>(null);
  const imgRef = useRef<HTMLDivElement>(null);
  const v = useV();
  const img = v("ctafinal", "image", ctaCourtyard);

  useEffect(() => {
    if (!ref.current || !imgRef.current) return;
    const tween = gsap.to(imgRef.current, {
      yPercent: 20, ease: "none",
      scrollTrigger: { trigger: ref.current, start: "top bottom", end: "bottom top", scrub: true },
    });
    return () => { tween.scrollTrigger?.kill(); tween.kill(); };
  }, []);

  return (
    <section ref={ref} className="relative min-h-[80vh] md:h-screen w-full overflow-hidden flex items-center justify-center bg-background py-20 md:py-0">
      <div ref={imgRef} className="absolute inset-0 -top-[10%] -bottom-[10%]">
        <EditableImage section="ctafinal" field="image" value={img}>
          {(url) => (
            <img
              src={url}
              alt="Cour en enrobé fraîchement posé"
              loading="lazy"
              className="h-full w-full object-cover"
            />
          )}
        </EditableImage>
      </div>
      <div className="absolute inset-0" style={{ background: "rgba(7, 10, 8, 0.75)" }} />
      <div className="relative z-10 text-center px-6 max-w-4xl">
        <EditableText section="ctafinal" field="label" value={v("ctafinal", "label", "Jura & Ain")} as="div" className="label text-gold" />
        <EditableText
          section="ctafinal"
          field="title"
          value={v("ctafinal", "title", "Votre Projet,\nNotre Priorité")}
          as="h2"
          className="font-display mt-8 text-foreground"
          style={{ fontSize: "clamp(48px, 9vw, 96px)", fontWeight: 400, lineHeight: 0.95 }}
          multiline
        />
        <div className="mt-12 flex flex-wrap gap-4 justify-center">
          <a
            href="#devis"
            data-cursor-hover
            className="bg-gold text-background px-10 py-4 font-medium transition-all hover:bg-[#A87E1F] active:scale-[0.98]"
            style={{ fontFamily: "Outfit", fontSize: 14, letterSpacing: "0.15em", textTransform: "uppercase" }}
          >
            <EditableText section="ctafinal" field="cta1" value={v("ctafinal", "cta1", "Demander un Devis")} as="span" />
          </a>
          <a
            href="tel:0384526148"
            data-cursor-hover
            className="border border-gold text-gold px-10 py-4 font-medium transition-colors hover:bg-gold hover:text-background"
            style={{ fontFamily: "Outfit", fontSize: 14, letterSpacing: "0.15em", textTransform: "uppercase" }}
          >
            <EditableText section="ctafinal" field="phone" value={v("ctafinal", "phone", "03 84 52 61 48")} as="span" />
          </a>
        </div>
      </div>
    </section>
  );
}

/* ============ FOOTER ============ */
function Footer() {
  const { get } = useSiteContent();
  const services = get("services", SERVICES) as typeof SERVICES;
  const v = useV();
  return (
    <footer className="relative overflow-hidden pt-24 pb-10 px-6 md:px-12" style={{ background: "var(--footer)" }}>
      <div
        className="absolute inset-x-0 top-1/2 -translate-y-1/2 text-center font-display pointer-events-none select-none whitespace-nowrap"
        style={{ opacity: 0.04, fontSize: "clamp(80px, 18vw, 280px)", color: "#FFFFFF", fontWeight: 300, lineHeight: 1 }}
        aria-hidden
      >
        HCE
      </div>
      <div className="relative grid grid-cols-1 md:grid-cols-3 gap-12">
        <div>
          <EditableText section="footer" field="brand" value={v("footer", "brand", "HCE")} as="div" className="font-display text-gold" style={{ fontSize: 56, fontWeight: 400, lineHeight: 1 }} />
          <EditableText section="footer" field="tagline" value={v("footer", "tagline", "Aménagement de cours & enrobés")} as="p" className="mt-4 text-muted italic font-display" style={{ fontSize: 18 }} />
        </div>
        <div>
          <EditableText section="footer" field="services_title" value={v("footer", "services_title", "Services")} as="div" className="label text-gold mb-6" />
          <ul className="space-y-3 text-foreground/80" style={{ fontSize: 14 }}>
            {services.map((s) => (
              <li key={s.n}>
                <Link to="/services/$slug" params={{ slug: s.slug }} className="transition-colors hover:text-gold">{s.t}</Link>
              </li>
            ))}
          </ul>
        </div>
        <div>
          <EditableText section="footer" field="contact_title" value={v("footer", "contact_title", "Contact")} as="div" className="label text-gold mb-6" />
          <ul className="space-y-3 text-foreground/80" style={{ fontSize: 14 }}>
            <li><EditableText section="footer" field="address" value={v("footer", "address", "40 avenue Etienne Lamy, 39300 Cize")} as="span" /></li>
            <li><a href="tel:0384526148" className="transition-colors hover:text-gold"><EditableText section="footer" field="phone" value={v("footer", "phone", "03 84 52 61 48")} as="span" /></a></li>
            <li><a href="mailto:sarl.hce@laposte.net" className="transition-colors hover:text-gold"><EditableText section="footer" field="email" value={v("footer", "email", "sarl.hce@laposte.net")} as="span" /></a></li>
            <li><EditableText section="footer" field="hours" value={v("footer", "hours", "Lun-Ven 8h-18h · Sam 8h-12h")} as="span" /></li>
          </ul>
        </div>
      </div>
      <div className="relative mt-24 pt-8 border-t border-gold/30 flex flex-wrap items-center justify-between gap-4 text-muted" style={{ fontSize: 12 }}>
        <EditableText section="footer" field="copyright" value={v("footer", "copyright", "© 2025 HCE SARL · Tous droits réservés")} as="span" />
        <EditableText section="footer" field="meta" value={v("footer", "meta", "Cize, Jura — 03 84 52 61 48")} as="span" />
      </div>
    </footer>
  );
}
