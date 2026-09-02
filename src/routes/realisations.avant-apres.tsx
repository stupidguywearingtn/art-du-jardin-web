import { createFileRoute, Link } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { SmoothScroll } from "@/components/SmoothScroll";
import { MobileFloatingCTA } from "@/components/CTAButtons";
import { WhatsAppFAB } from "@/components/WhatsAppFAB";
import { EditModeProvider } from "@/hooks/useEditMode";
import { EditModeToolbar } from "@/components/EditModeToolbar";
import { useSiteContentFields } from "@/hooks/useSiteContentFields";
import { useAuth } from "@/hooks/useAuth";
import { useBeforeAfter, type BAPhoto } from "@/hooks/useBeforeAfter";
import { supabase } from "@/integrations/supabase/client";
import { cropCover } from "@/lib/cropImage";
import { optimizeImageUrl } from "@/lib/optimizeImage";
import { toast } from "sonner";
import { Plus, Trash2, Loader2, ImagePlus } from "lucide-react";

const HOME_SITE_ID = "11111111-1111-1111-1111-111111111111";

export const Route = createFileRoute("/realisations/avant-apres")({
  component: AvantApresRoute,
  head: () => ({
    meta: [
      { title: "Avant / Après — HCE" },
      {
        name: "description",
        content:
          "Comparez nos chantiers avant et après : de la préparation au rendu final en enrobé.",
      },
      { name: "robots", content: "index,follow" },
    ],
  }),
});

function AvantApresRoute() {
  // Provider pour que la toolbar admin persiste sur cette route (cf. /realisations/$slug).
  const { reload } = useSiteContentFields(HOME_SITE_ID);
  return (
    <EditModeProvider siteId={HOME_SITE_ID} onPublished={reload}>
      <AvantApresPage />
    </EditModeProvider>
  );
}

const PLACEHOLDER = "/photos/06-chantier-bobcat-preparation.jpg";

/** Upload d'un fichier vers Supabase Storage après recadrage 4:5 forcé. */
async function uploadBAFile(file: File): Promise<string | null> {
  try {
    const processed = await cropCover(file).catch(() => file);
    const path = `before-after/${Date.now()}-${Math.random().toString(36).slice(2, 8)}.jpg`;
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
}

function MiniCarousel({ urls, label }: { urls: string[]; label: "Avant" | "Après" }) {
  const slides = urls.length > 0 ? urls : [PLACEHOLDER];
  const [idx, setIdx] = useState(0);

  useEffect(() => {
    if (slides.length <= 1) return;
    const id = setInterval(() => setIdx((i) => (i + 1) % slides.length), 3500);
    return () => clearInterval(id);
  }, [slides.length]);

  return (
    <div
      className="relative w-full overflow-hidden aspect-[4/5]"
      style={{ background: "var(--surface)" }}
    >
      {slides.map((src, i) => (
        <img
          key={`${src}-${i}`}
          src={optimizeImageUrl(src, 900)}
          alt=""
          aria-hidden="true"
          loading={i === 0 ? "eager" : "lazy"}
          className="absolute inset-0 w-full h-full object-cover transition-opacity duration-[800ms] ease-in-out"
          style={{ opacity: i === idx ? 1 : 0 }}
        />
      ))}
      {urls.length === 0 && (
        <div className="absolute inset-0" style={{ background: "rgba(14,14,15,0.55)" }} />
      )}
      <div
        className="absolute top-2 left-2 md:top-3 md:left-3 px-2.5 py-1 md:px-3 md:py-1.5 z-10"
        style={{
          background: label === "Avant" ? "rgba(14,14,15,0.85)" : "var(--gold)",
          color: label === "Avant" ? "#FFFFFF" : "#0E0E0F",
          fontSize: 10,
          fontFamily: "var(--font-body)",
          letterSpacing: "0.18em",
          textTransform: "uppercase",
          fontWeight: 600,
        }}
      >
        {label}
      </div>
      {urls.length === 0 && (
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
          <span
            className="text-center px-2"
            style={{
              color: "rgba(255,255,255,0.55)",
              fontSize: 11,
              fontFamily: "var(--font-body)",
              letterSpacing: "0.1em",
              textTransform: "uppercase",
            }}
          >
            Photo à venir
          </span>
        </div>
      )}
    </div>
  );
}

/** Bandeau d'édition d'un côté (avant/après) d'une comparaison — admin only. */
function SideAdmin({
  photos,
  busy,
  onAdd,
  onDelete,
}: {
  photos: BAPhoto[];
  busy: boolean;
  onAdd: (file: File) => void;
  onDelete: (id: string) => void;
}) {
  return (
    <div className="mt-2 flex flex-wrap items-center gap-2">
      {photos.map((p) => (
        <div key={p.id} className="relative" style={{ aspectRatio: "4 / 5", width: 48 }}>
          <img
            src={optimizeImageUrl(p.url, 200)}
            alt=""
            className="w-full h-full object-cover rounded-sm"
          />
          <button
            type="button"
            onClick={() => onDelete(p.id)}
            className="absolute -top-1.5 -right-1.5 w-4 h-4 flex items-center justify-center rounded-full"
            style={{ background: "#0E0E0F", color: "#f87171", border: "1px solid #f87171" }}
            aria-label="Supprimer la photo"
          >
            <Trash2 className="w-2.5 h-2.5" />
          </button>
        </div>
      ))}
      <label
        className="inline-flex items-center gap-1 px-2.5 py-1.5 rounded text-xs font-semibold cursor-pointer"
        style={{
          background: "var(--cuivre-500)",
          color: "var(--creme-50)",
          fontFamily: "var(--font-body)",
        }}
      >
        {busy ? <Loader2 className="w-3 h-3 animate-spin" /> : <ImagePlus className="w-3 h-3" />}
        Ajouter
        <input
          type="file"
          accept="image/*"
          className="hidden"
          disabled={busy}
          onChange={(e) => e.target.files?.[0] && onAdd(e.target.files[0])}
        />
      </label>
    </div>
  );
}

function AvantApresPage() {
  const { isAdmin } = useAuth();
  const { groups, loading, reload } = useBeforeAfter();
  const [busyKey, setBusyKey] = useState<string | null>(null);
  const [addingPair, setAddingPair] = useState(false);

  const isFallback = groups.length > 0 && groups[0].pair.id.startsWith("fb-");
  const canEdit = isAdmin && !isFallback;

  const addPair = async () => {
    setAddingPair(true);
    const nextOrder =
      groups.length > 0 ? Math.max(...groups.map((g) => g.pair.display_order)) + 1 : 0;
    const { error } = await supabase
      .from("before_after_pairs")
      .insert({ title: `Comparaison ${groups.length + 1}`, display_order: nextOrder });
    setAddingPair(false);
    if (error) toast.error(error.message);
    else {
      toast.success("Comparaison ajoutée");
      reload();
    }
  };

  const deletePair = async (id: string) => {
    if (!confirm("Supprimer cette comparaison et toutes ses photos ?")) return;
    setBusyKey(id);
    const { error } = await supabase.from("before_after_pairs").delete().eq("id", id);
    setBusyKey(null);
    if (error) toast.error(error.message);
    else {
      toast.success("Comparaison supprimée");
      reload();
    }
  };

  const addPhoto = async (
    pairId: string,
    side: "avant" | "apres",
    file: File,
    currentCount: number,
  ) => {
    setBusyKey(`${pairId}-${side}`);
    const url = await uploadBAFile(file);
    if (url) {
      const { error } = await supabase
        .from("before_after_photos")
        .insert({ pair_id: pairId, side, url, display_order: currentCount });
      if (error) toast.error(error.message);
      else {
        toast.success("Photo ajoutée");
        reload();
      }
    }
    setBusyKey(null);
  };

  const deletePhoto = async (id: string, key: string) => {
    setBusyKey(key);
    const { error } = await supabase.from("before_after_photos").delete().eq("id", id);
    setBusyKey(null);
    if (error) toast.error(error.message);
    else {
      toast.success("Photo supprimée");
      reload();
    }
  };

  return (
    <>
      <EditModeToolbar />
      <SmoothScroll />
      <main className="bg-depth-a min-h-screen">
        {/* Header */}
        <section className="relative w-full px-4 md:px-12 pt-24 md:pt-32 pb-10 md:pb-16">
          <div className="max-w-5xl mx-auto text-center">
            <div className="label text-gold mb-4">
              <Link to="/" className="hover:opacity-70 transition">
                ← Retour
              </Link>
            </div>
            <h1
              className="font-display text-foreground"
              style={{ fontSize: "clamp(36px, 7vw, 88px)", fontWeight: 400, lineHeight: 1 }}
            >
              Avant <span className="italic text-gold">/ Après</span>
            </h1>
            <p className="mt-5 md:mt-7 max-w-xl mx-auto text-muted" style={{ fontSize: 15 }}>
              De la préparation au rendu final — voyez la transformation de chaque chantier HCE.
            </p>
          </div>
        </section>

        {/* Barre admin */}
        {isAdmin && (
          <div className="max-w-6xl mx-auto px-4 md:px-12 mb-6">
            <div
              className="p-4 rounded border flex items-center justify-between gap-4 flex-wrap"
              style={{ borderColor: "var(--cuivre-500)", background: "rgba(138,90,60,0.08)" }}
            >
              <div
                className="text-sm"
                style={{ fontFamily: "var(--font-body)", color: "var(--creme-50)" }}
              >
                <strong>Mode admin</strong> — ajoutez des photos sur chaque côté (recadrage 4:5
                auto).
                {isFallback && (
                  <span className="ml-2" style={{ color: "var(--sable-500)" }}>
                    ⚠ Tables « avant / après » pas encore en base — applique{" "}
                    <code>supabase/SETUP-GALLERY-V2.sql</code> pour activer l'édition.
                  </span>
                )}
              </div>
              {canEdit && (
                <button
                  type="button"
                  onClick={addPair}
                  disabled={addingPair}
                  className="inline-flex items-center gap-2 px-4 py-2 rounded font-semibold text-sm cursor-pointer transition-opacity hover:opacity-90"
                  style={{
                    background: "var(--cuivre-500)",
                    color: "var(--creme-50)",
                    fontFamily: "var(--font-body)",
                  }}
                >
                  {addingPair ? (
                    <Loader2 className="w-4 h-4 animate-spin" />
                  ) : (
                    <Plus className="w-4 h-4" />
                  )}
                  Ajouter une comparaison
                </button>
              )}
            </div>
          </div>
        )}

        {/* Liste verticale */}
        <section className="w-full px-4 md:px-12 pb-20 md:pb-32">
          <div className="max-w-6xl mx-auto flex flex-col gap-6 md:gap-12">
            {loading && <div className="text-center py-10 label text-gold/70">Chargement…</div>}
            {!loading &&
              groups.map((g, i) => (
                <article key={g.pair.id} className="w-full">
                  <div className="flex items-center justify-between mb-3 md:mb-4">
                    <div
                      style={{
                        color: "var(--gold)",
                        fontSize: 11,
                        fontFamily: "var(--font-body)",
                        letterSpacing: "0.18em",
                        textTransform: "uppercase",
                      }}
                    >
                      {String(i + 1).padStart(2, "0")}
                    </div>
                    <div className="flex items-center gap-3">
                      {g.pair.title && (
                        <div
                          className="text-muted"
                          style={{
                            fontSize: 11,
                            fontFamily: "var(--font-body)",
                            letterSpacing: "0.1em",
                            textTransform: "uppercase",
                          }}
                        >
                          {g.pair.title}
                        </div>
                      )}
                      {canEdit && (
                        <button
                          type="button"
                          onClick={() => deletePair(g.pair.id)}
                          disabled={busyKey === g.pair.id}
                          className="inline-flex items-center gap-1 px-2 py-1 rounded text-xs font-semibold"
                          style={{
                            background: "rgba(14,14,15,0.8)",
                            color: "#f87171",
                            border: "1px solid #f87171",
                            fontFamily: "var(--font-body)",
                          }}
                        >
                          {busyKey === g.pair.id ? (
                            <Loader2 className="w-3 h-3 animate-spin" />
                          ) : (
                            <Trash2 className="w-3 h-3" />
                          )}
                          Supprimer
                        </button>
                      )}
                    </div>
                  </div>
                  <div className="grid grid-cols-2 gap-2 md:gap-4">
                    <div>
                      <MiniCarousel urls={g.avant.map((p) => p.url)} label="Avant" />
                      {canEdit && (
                        <SideAdmin
                          photos={g.avant}
                          busy={busyKey === `${g.pair.id}-avant`}
                          onAdd={(f) => addPhoto(g.pair.id, "avant", f, g.avant.length)}
                          onDelete={(id) => deletePhoto(id, `${g.pair.id}-avant`)}
                        />
                      )}
                    </div>
                    <div>
                      <MiniCarousel urls={g.apres.map((p) => p.url)} label="Après" />
                      {canEdit && (
                        <SideAdmin
                          photos={g.apres}
                          busy={busyKey === `${g.pair.id}-apres`}
                          onAdd={(f) => addPhoto(g.pair.id, "apres", f, g.apres.length)}
                          onDelete={(id) => deletePhoto(id, `${g.pair.id}-apres`)}
                        />
                      )}
                    </div>
                  </div>
                </article>
              ))}
          </div>
        </section>

        <MobileFloatingCTA />
        <WhatsAppFAB />
      </main>
    </>
  );
}
