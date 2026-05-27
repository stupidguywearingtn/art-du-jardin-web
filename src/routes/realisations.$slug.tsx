import { createFileRoute, Link } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { SmoothScroll } from "@/components/SmoothScroll";
import { MobileFloatingCTA } from "@/components/CTAButtons";
import { WhatsAppFAB } from "@/components/WhatsAppFAB";
import { EditModeProvider, useEditMode } from "@/hooks/useEditMode";
import { EditModeToolbar } from "@/components/EditModeToolbar";
import { useAuth } from "@/hooks/useAuth";
import { useGalleryByCategorySlug, useGalleryCategories } from "@/hooks/useGallery";
import { useSiteContentFields } from "@/hooks/useSiteContentFields";

const HOME_SITE_ID = "11111111-1111-1111-1111-111111111111";

export const Route = createFileRoute("/realisations/$slug")({
  component: RealisationsRoute,
  head: ({ params }) => ({
    meta: [
      { title: `Réalisations · ${params.slug.replace(/-/g, " ")} — HCE` },
      { name: "description", content: "Découvrez nos réalisations en enrobé, cours, parkings et terrassement dans le Jura et l'Ain." },
      { name: "robots", content: "index,follow" },
    ],
  }),
});

function RealisationsRoute() {
  // EditModeProvider doit envelopper la page pour que la toolbar admin
  // persiste sur les routes dynamiques (sinon le client perd l'accès à l'admin
  // dès qu'il navigue sur /realisations/{slug}).
  const { reload } = useSiteContentFields(HOME_SITE_ID);
  return (
    <EditModeProvider siteId={HOME_SITE_ID} onPublished={reload}>
      <RealisationsPage />
    </EditModeProvider>
  );
}

function RealisationsPage() {
  const { slug } = Route.useParams();
  const { category, photos, loading } = useGalleryByCategorySlug(slug);
  const { isAdmin } = useAuth();
  const [lightbox, setLightbox] = useState<number | null>(null);
  const [touchStart, setTouchStart] = useState<number | null>(null);

  useEffect(() => {
    if (lightbox === null) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setLightbox(null);
      if (e.key === "ArrowRight") setLightbox((i) => (i === null ? null : (i + 1) % photos.length));
      if (e.key === "ArrowLeft") setLightbox((i) => (i === null ? null : (i - 1 + photos.length) % photos.length));
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [lightbox, photos.length]);

  const onTouchStart = (e: React.TouchEvent) => setTouchStart(e.touches[0].clientX);
  const onTouchEnd = (e: React.TouchEvent) => {
    if (touchStart === null || lightbox === null) return;
    const delta = e.changedTouches[0].clientX - touchStart;
    if (Math.abs(delta) > 50) {
      setLightbox((i) =>
        i === null ? null : delta < 0 ? (i + 1) % photos.length : (i - 1 + photos.length) % photos.length
      );
    }
    setTouchStart(null);
  };

  if (loading) {
    return (
      <main className="bg-background text-foreground min-h-screen flex items-center justify-center">
        <span className="label text-gold">Chargement…</span>
      </main>
    );
  }

  if (!category) {
    return (
      <>
        <EditModeToolbar />
        <main className="bg-background text-foreground min-h-screen">
          <header className="fixed top-0 left-0 right-0 z-50 backdrop-blur-md bg-background/70 border-b border-gold/15">
            <div className="px-6 md:px-12 py-4 flex items-center justify-between">
              <Link to="/" className="font-display text-gold text-2xl" style={{ fontWeight: 500 }}>HCE</Link>
              <Link to="/" className="label text-gold hover:text-foreground transition-colors">← Accueil</Link>
            </div>
          </header>
          <div className="min-h-screen flex items-center justify-center px-6">
            <div className="text-center">
              <h1 className="font-display text-6xl text-gold">404</h1>
              <p className="mt-4 text-muted">Catégorie introuvable.</p>
              <Link to="/" className="mt-8 inline-block label text-gold border-b border-gold/40 pb-1">
                ← Retour à l'accueil
              </Link>
            </div>
          </div>
        </main>
      </>
    );
  }

  return (
    <>
      <EditModeToolbar />
      <SmoothScroll />
      <WhatsAppFAB />
      <main className="bg-background text-foreground overflow-x-hidden">
        {/* HEADER */}
        <header className="fixed top-0 left-0 right-0 z-50 backdrop-blur-md bg-background/70 border-b border-gold/15">
          <div className="px-6 md:px-12 py-4 flex items-center justify-between">
            <Link to="/" className="font-display text-gold text-2xl" style={{ fontWeight: 500 }}>HCE</Link>
            <Link to="/" hash="galerie" className="label text-gold hover:text-foreground transition-colors">← Retour</Link>
          </div>
        </header>

        {/* Bandeau admin contextuel : raccourci vers l'onglet Galerie filtré sur cette catégorie */}
        {isAdmin && (
          <div className="fixed top-[60px] left-0 right-0 z-40 bg-cuivre-500" style={{ background: "var(--cuivre-500)" }}>
            <div className="px-6 md:px-12 py-2 flex items-center justify-between gap-3 text-creme-50" style={{ color: "var(--creme-50)" }}>
              <span className="text-sm" style={{ fontFamily: "var(--font-body)" }}>
                <strong>Mode admin</strong> · pour ajouter, remplacer ou supprimer des photos de cette catégorie :
              </span>
              <Link
                to="/admin"
                className="inline-flex items-center gap-2 bg-creme-50 px-3 py-1.5 rounded text-xs font-medium hover:opacity-90 transition-opacity"
                style={{ background: "var(--creme-50)", color: "var(--asphalte-900)", fontFamily: "var(--font-body)" }}
              >
                Gérer la galerie →
              </Link>
            </div>
          </div>
        )}

        {/* HERO catégorie */}
        <section className={`relative w-full ${isAdmin ? "pt-44" : "pt-32"} md:pt-40 pb-12 md:pb-16 px-6 md:px-12 bg-depth-a overflow-hidden`}>
          <div className="max-w-5xl mx-auto">
            <div className="label text-gold">— Réalisations</div>
            <h1
              className="font-display mt-4 text-foreground"
              style={{ fontSize: "clamp(40px, 7vw, 96px)", fontWeight: 400, lineHeight: 0.95 }}
            >
              {category.title}
            </h1>
            {category.description && (
              <p className="mt-6 max-w-2xl text-muted" style={{ fontSize: 16, lineHeight: 1.7 }}>
                {category.description}
              </p>
            )}
            <div className="mt-4 label text-gold/70" style={{ fontSize: 11 }}>
              {photos.length} chantier{photos.length > 1 ? "s" : ""} livré{photos.length > 1 ? "s" : ""}
            </div>
          </div>
        </section>

        {/* GRILLE photos */}
        <section className="relative w-full px-4 md:px-12 py-12 md:py-20 bg-background">
          {photos.length === 0 ? (
            <p className="text-center text-muted max-w-md mx-auto py-20">
              Aucune photo dans cette catégorie pour le moment.
            </p>
          ) : (
            <div className="max-w-7xl mx-auto" style={{ columnGap: "1rem", columnCount: 1 }}>
              <style>{`
                @media (min-width: 640px) { .gallery-masonry { column-count: 2 !important; } }
                @media (min-width: 1024px) { .gallery-masonry { column-count: 3 !important; } }
              `}</style>
              <div className="gallery-masonry">
                {photos.map((p, idx) => (
                  <button
                    key={p.id}
                    onClick={() => setLightbox(idx)}
                    className="block w-full mb-4 group overflow-hidden break-inside-avoid"
                    style={{ background: "var(--surface)" }}
                    aria-label={`Ouvrir la photo ${idx + 1}`}
                  >
                    <img
                      src={p.url}
                      alt={p.alt_text ?? category.title}
                      loading="lazy"
                      className="w-full h-auto object-cover transition-transform duration-700 group-hover:scale-105"
                    />
                  </button>
                ))}
              </div>
            </div>
          )}
        </section>

        {/* CTA bas */}
        <section className="relative w-full bg-depth-b py-12 md:py-20 px-6 text-center">
          <div className="label text-gold mb-4">— Un projet similaire ?</div>
          <p className="font-display italic text-foreground max-w-2xl mx-auto mb-8" style={{ fontSize: "clamp(20px, 2.6vw, 28px)" }}>
            Recevez un devis détaillé sous 48h, visite gratuite.
          </p>
          <div className="flex flex-wrap gap-3 justify-center">
            <Link
              to="/"
              hash="devis"
              className="inline-flex items-center gap-2"
              style={{
                fontFamily: "var(--font-body)", fontSize: 14, fontWeight: 500,
                padding: "14px 28px", borderRadius: 6,
                background: "var(--cuivre-500)", color: "var(--creme-50)",
                textDecoration: "none", transition: "background 0.2s ease",
              }}
            >
              Demander un devis <span aria-hidden>→</span>
            </Link>
            <a
              href="tel:0384526148"
              className="inline-flex items-center gap-2"
              style={{
                fontFamily: "var(--font-body)", fontSize: 14, fontWeight: 500,
                padding: "14px 28px", borderRadius: 6,
                background: "transparent", color: "var(--creme-50)",
                border: "1px solid var(--creme-50)",
                textDecoration: "none", transition: "all 0.2s ease",
              }}
            >
              <span aria-hidden>📞</span> 03 84 52 61 48
            </a>
          </div>
        </section>

        <MobileFloatingCTA href="/#devis" />
      </main>

      {/* Lightbox */}
      <AnimatePresence>
        {lightbox !== null && photos[lightbox] && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[9999] flex items-center justify-center"
            style={{ background: "rgba(14,14,15,0.95)" }}
            onClick={() => setLightbox(null)}
            onTouchStart={onTouchStart}
            onTouchEnd={onTouchEnd}
          >
            <button
              onClick={(e) => { e.stopPropagation(); setLightbox(null); }}
              className="absolute z-[9999] flex items-center justify-center transition-all duration-200"
              style={{
                top: "1rem", right: "1rem",
                width: 48, height: 48,
                background: "rgba(0,0,0,0.5)",
                backdropFilter: "blur(8px)",
                borderRadius: "50%",
                border: "1px solid rgba(255,255,255,0.2)",
                color: "#FFFFFF",
              }}
              aria-label="Fermer"
            >
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
                <path d="M18 6 6 18M6 6l12 12" />
              </svg>
            </button>
            <div className="absolute top-4 left-4 label text-gold/80" style={{ fontSize: 11 }}>
              {category.title} · {lightbox + 1}/{photos.length}
            </div>
            <button
              onClick={(e) => { e.stopPropagation(); setLightbox(((lightbox - 1) + photos.length) % photos.length); }}
              className="absolute left-2 md:left-8 text-gold text-4xl p-4"
              aria-label="Précédent"
            >‹</button>
            <button
              onClick={(e) => { e.stopPropagation(); setLightbox((lightbox + 1) % photos.length); }}
              className="absolute right-2 md:right-8 text-gold text-4xl p-4"
              aria-label="Suivant"
            >›</button>
            <img
              src={photos[lightbox].url}
              alt={photos[lightbox].alt_text ?? category.title}
              className="max-h-[80vh] max-w-[90vw] object-contain"
              onClick={(e) => e.stopPropagation()}
            />
            {photos[lightbox].caption && (
              <div
                className="absolute bottom-6 left-1/2 -translate-x-1/2 text-foreground/80 text-center max-w-md px-4"
                style={{ fontSize: 13, fontFamily: "var(--font-body)" }}
              >
                {photos[lightbox].caption}
              </div>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
