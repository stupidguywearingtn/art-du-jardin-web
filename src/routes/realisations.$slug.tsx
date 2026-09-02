import { createFileRoute, Link } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { SmoothScroll } from "@/components/SmoothScroll";
import { MobileFloatingCTA } from "@/components/CTAButtons";
import { WhatsAppFAB } from "@/components/WhatsAppFAB";
import { EditModeProvider, useEditMode } from "@/hooks/useEditMode";
import { EditModeToolbar } from "@/components/EditModeToolbar";
import { useAuth } from "@/hooks/useAuth";
import { useGalleryByCategorySlug } from "@/hooks/useGallery";
import { useSiteContentFields } from "@/hooks/useSiteContentFields";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";
import { Pencil, Trash2, Plus, Loader2, ImagePlus } from "lucide-react";
import { optimizeImageUrl } from "@/lib/optimizeImage";
import { cropCover } from "@/lib/cropImage";

/** Nombre d'emplacements toujours proposés à l'admin par dossier (extensible). */
const MIN_SLOTS = 5;

const HOME_SITE_ID = "11111111-1111-1111-1111-111111111111";

export const Route = createFileRoute("/realisations/$slug")({
  component: RealisationsRoute,
  head: ({ params }) => ({
    meta: [
      { title: `Réalisations · ${params.slug.replace(/-/g, " ")} — HCE` },
      {
        name: "description",
        content:
          "Découvrez nos réalisations en enrobé, cours, parkings et terrassement dans le Jura et l'Ain.",
      },
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
  const { category, photos, loading, reload } = useGalleryByCategorySlug(slug);
  const { isAdmin } = useAuth();
  const [lightbox, setLightbox] = useState<number | null>(null);
  const [touchStart, setTouchStart] = useState<number | null>(null);
  const [busyId, setBusyId] = useState<string | null>(null);
  const [adding, setAdding] = useState(false);

  const isFallback = (category?.id ?? "").startsWith("fb-");

  const uploadFile = async (file: File): Promise<string | null> => {
    try {
      // Recadrage 4:5 forcé (canvas, côté client) : ratio identique pour
      // toutes les photos quel que soit le fichier envoyé depuis l'admin.
      const processed = await cropCover(file).catch(() => file);
      const path = `gallery/${Date.now()}-${Math.random().toString(36).slice(2, 8)}.jpg`;
      const { error } = await supabase.storage
        .from("site-images")
        .upload(path, processed, { upsert: false });
      if (error) {
        toast.error(error.message);
        return null;
      }
      return supabase.storage.from("site-images").getPublicUrl(path).data.publicUrl;
    } catch (e) {
      toast.error((e as Error).message);
      return null;
    }
  };

  const replacePhoto = async (id: string, file: File) => {
    setBusyId(id);
    const url = await uploadFile(file);
    if (url) {
      const { error } = await supabase.from("gallery_photos").update({ url }).eq("id", id);
      if (error) toast.error(error.message);
      else {
        toast.success("Photo remplacée");
        reload();
      }
    }
    setBusyId(null);
  };

  const deletePhoto = async (id: string) => {
    if (!confirm("Supprimer cette photo ?")) return;
    setBusyId(id);
    const { error } = await supabase.from("gallery_photos").delete().eq("id", id);
    setBusyId(null);
    if (error) toast.error(error.message);
    else {
      toast.success("Photo supprimée");
      reload();
    }
  };

  const addPhotos = async (files: FileList) => {
    if (!category) return;
    setAdding(true);
    let order = photos.length > 0 ? Math.max(...photos.map((p) => p.display_order)) + 1 : 0;
    for (const f of Array.from(files)) {
      const url = await uploadFile(f);
      if (!url) continue;
      const { error } = await supabase.from("gallery_photos").insert({
        url,
        category_id: category.id,
        display_order: order++,
      });
      if (error) toast.error(error.message);
    }
    setAdding(false);
    toast.success(`${files.length} photo(s) ajoutée(s)`);
    reload();
  };

  useEffect(() => {
    if (lightbox === null) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setLightbox(null);
      if (e.key === "ArrowRight") setLightbox((i) => (i === null ? null : (i + 1) % photos.length));
      if (e.key === "ArrowLeft")
        setLightbox((i) => (i === null ? null : (i - 1 + photos.length) % photos.length));
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
        i === null
          ? null
          : delta < 0
            ? (i + 1) % photos.length
            : (i - 1 + photos.length) % photos.length,
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
              <Link to="/" className="font-display text-gold text-2xl" style={{ fontWeight: 500 }}>
                HCE
              </Link>
              <Link to="/" className="label text-gold hover:text-foreground transition-colors">
                ← Accueil
              </Link>
            </div>
          </header>
          <div className="min-h-screen flex items-center justify-center px-6">
            <div className="text-center">
              <h1 className="font-display text-6xl text-gold">404</h1>
              <p className="mt-4 text-muted">Catégorie introuvable.</p>
              <Link
                to="/"
                className="mt-8 inline-block label text-gold border-b border-gold/40 pb-1"
              >
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
            <Link to="/" className="font-display text-gold text-2xl" style={{ fontWeight: 500 }}>
              HCE
            </Link>
            <Link
              to="/"
              hash="galerie"
              className="label text-gold hover:text-foreground transition-colors"
            >
              ← Retour
            </Link>
          </div>
        </header>

        {/* HERO catégorie */}
        <section className="relative w-full pt-32 md:pt-40 pb-12 md:pb-16 px-6 md:px-12 bg-depth-a overflow-hidden">
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
            {photos.length > 0 && (
              <div className="mt-4 label text-gold/70" style={{ fontSize: 11 }}>
                {photos.length} chantier{photos.length > 1 ? "s" : ""} livré
                {photos.length > 1 ? "s" : ""}
              </div>
            )}
          </div>
        </section>

        {/* GRILLE photos — format 4:5 unique */}
        <section className="relative w-full px-4 md:px-12 py-12 md:py-20 bg-background">
          {/* Barre admin pour cette catégorie */}
          {isAdmin && (
            <div
              className="max-w-7xl mx-auto mb-6 p-4 rounded border flex items-center justify-between gap-4 flex-wrap"
              style={{ borderColor: "var(--cuivre-500)", background: "rgba(138,90,60,0.08)" }}
            >
              <div
                className="text-sm"
                style={{ fontFamily: "var(--font-body)", color: "var(--creme-50)" }}
              >
                <strong>Mode admin</strong> — survol une photo pour Remplacer ou Supprimer.
                {isFallback && (
                  <span className="ml-2" style={{ color: "var(--sable-500)" }}>
                    ⚠ La catégorie « {category.title} » n'est pas encore en base — applique
                    SETUP-PROD.sql pour activer les modifications.
                  </span>
                )}
              </div>
              {!isFallback && (
                <label
                  className="inline-flex items-center gap-2 px-4 py-2 rounded font-semibold text-sm cursor-pointer transition-opacity hover:opacity-90"
                  style={{
                    background: "var(--cuivre-500)",
                    color: "var(--creme-50)",
                    fontFamily: "var(--font-body)",
                  }}
                >
                  {adding ? (
                    <>
                      <Loader2 className="w-4 h-4 animate-spin" /> Upload…
                    </>
                  ) : (
                    <>
                      <Plus className="w-4 h-4" /> Ajouter des photos
                    </>
                  )}
                  <input
                    type="file"
                    accept="image/*"
                    multiple
                    className="hidden"
                    disabled={adding}
                    onChange={(e) => e.target.files && addPhotos(e.target.files)}
                  />
                </label>
              )}
            </div>
          )}

          {photos.length === 0 && !(isAdmin && !isFallback) ? (
            <p className="text-center text-muted max-w-md mx-auto py-20">
              Aucune photo dans cette catégorie pour le moment.
            </p>
          ) : (
            <div className="max-w-7xl mx-auto grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 md:gap-4">
              {photos.map((p, idx) => {
                const editable = isAdmin && !p.id.startsWith("fb-");
                return (
                  <div
                    key={p.id}
                    className="relative aspect-[4/5] group/photo overflow-hidden"
                    style={{ background: "var(--surface)" }}
                  >
                    <button
                      type="button"
                      onClick={() => setLightbox(idx)}
                      className="block w-full h-full"
                      aria-label={`Ouvrir la photo ${idx + 1}`}
                    >
                      <img
                        src={optimizeImageUrl(p.url, 700)}
                        alt={p.alt_text ?? category.title}
                        loading="lazy"
                        className="w-full h-full object-cover transition-transform duration-700 group-hover/photo:scale-105"
                      />
                    </button>
                    {editable && (
                      <div
                        className="absolute inset-0 flex items-end justify-center pb-4 gap-2 opacity-0 group-hover/photo:opacity-100 transition-opacity pointer-events-none"
                        style={{
                          background:
                            "linear-gradient(to top, rgba(14,14,15,0.75), transparent 50%)",
                        }}
                      >
                        <label
                          className="inline-flex items-center gap-1 px-3 py-1.5 rounded text-xs font-semibold cursor-pointer pointer-events-auto"
                          style={{
                            background: "var(--cuivre-500)",
                            color: "var(--creme-50)",
                            fontFamily: "var(--font-body)",
                          }}
                        >
                          {busyId === p.id ? (
                            <Loader2 className="w-3 h-3 animate-spin" />
                          ) : (
                            <Pencil className="w-3 h-3" />
                          )}
                          Remplacer
                          <input
                            type="file"
                            accept="image/*"
                            className="hidden"
                            disabled={busyId === p.id}
                            onChange={(e) =>
                              e.target.files?.[0] && replacePhoto(p.id, e.target.files[0])
                            }
                          />
                        </label>
                        <button
                          type="button"
                          onClick={() => deletePhoto(p.id)}
                          disabled={busyId === p.id}
                          className="inline-flex items-center gap-1 px-3 py-1.5 rounded text-xs font-semibold pointer-events-auto"
                          style={{
                            background: "rgba(14,14,15,0.8)",
                            color: "#f87171",
                            border: "1px solid #f87171",
                            fontFamily: "var(--font-body)",
                          }}
                        >
                          <Trash2 className="w-3 h-3" /> Supprimer
                        </button>
                      </div>
                    )}
                  </div>
                );
              })}

              {/* Emplacements vides — visibles uniquement en admin (DB active),
                  au moins MIN_SLOTS par dossier, chacun uploadable séparément. */}
              {isAdmin &&
                !isFallback &&
                Array.from({ length: Math.max(0, MIN_SLOTS - photos.length) }).map((_, i) => (
                  <label
                    key={`empty-${i}`}
                    className="relative aspect-[4/5] flex flex-col items-center justify-center gap-2 cursor-pointer border-2 border-dashed transition-opacity hover:opacity-80"
                    style={{
                      borderColor: "var(--cuivre-500)",
                      background: "rgba(138,90,60,0.06)",
                      color: "var(--creme-50)",
                    }}
                  >
                    {adding ? (
                      <Loader2 className="w-5 h-5 animate-spin" />
                    ) : (
                      <ImagePlus className="w-6 h-6" style={{ color: "var(--cuivre-300)" }} />
                    )}
                    <span
                      className="text-xs"
                      style={{ fontFamily: "var(--font-body)", letterSpacing: "0.08em" }}
                    >
                      Emplacement {photos.length + i + 1}
                    </span>
                    <input
                      type="file"
                      accept="image/*"
                      className="hidden"
                      disabled={adding}
                      onChange={(e) => e.target.files && addPhotos(e.target.files)}
                    />
                  </label>
                ))}
            </div>
          )}
        </section>

        {/* CTA bas */}
        <section className="relative w-full bg-depth-b py-12 md:py-20 px-6 text-center">
          <div className="label text-gold mb-4">— Un projet similaire ?</div>
          <p
            className="font-display italic text-foreground max-w-2xl mx-auto mb-8"
            style={{ fontSize: "clamp(20px, 2.6vw, 28px)" }}
          >
            Recevez un devis détaillé, visite gratuite.
          </p>
          <div className="flex flex-wrap gap-3 justify-center">
            <Link
              to="/"
              hash="devis"
              className="inline-flex items-center gap-2"
              style={{
                fontFamily: "var(--font-body)",
                fontSize: 14,
                fontWeight: 500,
                padding: "14px 28px",
                borderRadius: 6,
                background: "var(--cuivre-500)",
                color: "var(--creme-50)",
                textDecoration: "none",
                transition: "background 0.2s ease",
              }}
            >
              Demander un devis <span aria-hidden>→</span>
            </Link>
            <a
              href="tel:0384526148"
              className="inline-flex items-center gap-2"
              style={{
                fontFamily: "var(--font-body)",
                fontSize: 14,
                fontWeight: 500,
                padding: "14px 28px",
                borderRadius: 6,
                background: "transparent",
                color: "var(--creme-50)",
                border: "1px solid var(--creme-50)",
                textDecoration: "none",
                transition: "all 0.2s ease",
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
              onClick={(e) => {
                e.stopPropagation();
                setLightbox(null);
              }}
              className="absolute z-[9999] flex items-center justify-center transition-all duration-200"
              style={{
                top: "1rem",
                right: "1rem",
                width: 48,
                height: 48,
                background: "rgba(0,0,0,0.5)",
                backdropFilter: "blur(8px)",
                borderRadius: "50%",
                border: "1px solid rgba(255,255,255,0.2)",
                color: "#FFFFFF",
              }}
              aria-label="Fermer"
            >
              <svg
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2.5"
                strokeLinecap="round"
              >
                <path d="M18 6 6 18M6 6l12 12" />
              </svg>
            </button>
            <div className="absolute top-4 left-4 label text-gold/80" style={{ fontSize: 11 }}>
              {category.title} · {lightbox + 1}/{photos.length}
            </div>
            <button
              onClick={(e) => {
                e.stopPropagation();
                setLightbox((lightbox - 1 + photos.length) % photos.length);
              }}
              className="absolute left-2 md:left-8 text-gold text-4xl p-4"
              aria-label="Précédent"
            >
              ‹
            </button>
            <button
              onClick={(e) => {
                e.stopPropagation();
                setLightbox((lightbox + 1) % photos.length);
              }}
              className="absolute right-2 md:right-8 text-gold text-4xl p-4"
              aria-label="Suivant"
            >
              ›
            </button>
            <img
              src={optimizeImageUrl(photos[lightbox].url, 1600)}
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
