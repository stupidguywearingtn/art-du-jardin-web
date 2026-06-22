import { createFileRoute, Link } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { SmoothScroll } from "@/components/SmoothScroll";
import { MobileFloatingCTA } from "@/components/CTAButtons";
import { WhatsAppFAB } from "@/components/WhatsAppFAB";

export const Route = createFileRoute("/realisations/avant-apres")({
  component: AvantApresPage,
  head: () => ({
    meta: [
      { title: "Avant / Après — HCE" },
      { name: "description", content: "Comparez nos chantiers avant et après : de la préparation au rendu final en enrobé." },
      { name: "robots", content: "index,follow" },
    ],
  }),
});

/**
 * Structure des paires "Avant / Après".
 * Ajoutez simplement les URLs d'images dans `avant` et `apres` quand elles seront disponibles.
 * Chaque case = mini-carrousel auto (défilement toutes les 3,5s, crossfade).
 */
type Pair = { id: string; titre?: string; avant: string[]; apres: string[] };

const PAIRS: Pair[] = Array.from({ length: 10 }).map((_, i) => ({
  id: `pair-${i + 1}`,
  titre: `Comparaison ${i + 1}`,
  avant: [],
  apres: [],
}));

const PLACEHOLDER = "/photos/06-chantier-bobcat-preparation.jpg";

function MiniCarousel({ images, label }: { images: string[]; label: "Avant" | "Après" }) {
  const slides = images.length > 0 ? images : [PLACEHOLDER];
  const [idx, setIdx] = useState(0);

  useEffect(() => {
    if (slides.length <= 1) return;
    const id = setInterval(() => setIdx((i) => (i + 1) % slides.length), 3500);
    return () => clearInterval(id);
  }, [slides.length]);

  return (
    <div
      className="relative w-full overflow-hidden aspect-[4/5] sm:aspect-[4/3]"
      style={{ background: "var(--surface)" }}
    >
      {slides.map((src, i) => (
        <img
          key={`${src}-${i}`}
          src={src}
          alt=""
          aria-hidden="true"
          className="absolute inset-0 w-full h-full object-cover transition-opacity duration-[800ms] ease-in-out"
          style={{ opacity: i === idx ? 1 : 0 }}
        />
      ))}
      {images.length === 0 && (
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
      {images.length === 0 && (
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
          <span
            className="text-center px-2"
            style={{ color: "rgba(255,255,255,0.55)", fontSize: 11, fontFamily: "var(--font-body)", letterSpacing: "0.1em", textTransform: "uppercase" }}
          >
            Photo à venir
          </span>
        </div>
      )}
    </div>
  );
}

function AvantApresPage() {
  return (
    <SmoothScroll>
      <main className="bg-depth-a min-h-screen">
        {/* Header */}
        <section className="relative w-full px-4 md:px-12 pt-24 md:pt-32 pb-10 md:pb-16">
          <div className="max-w-5xl mx-auto text-center">
            <div className="label text-gold mb-4">
              <Link to="/" className="hover:opacity-70 transition">← Retour</Link>
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

        {/* Liste verticale */}
        <section className="w-full px-4 md:px-12 pb-20 md:pb-32">
          <div className="max-w-6xl mx-auto flex flex-col gap-6 md:gap-12">
            {PAIRS.map((p, i) => (
              <article key={p.id} className="w-full">
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
                  {p.titre && (
                    <div
                      className="text-muted"
                      style={{ fontSize: 11, fontFamily: "var(--font-body)", letterSpacing: "0.1em", textTransform: "uppercase" }}
                    >
                      {p.titre}
                    </div>
                  )}
                </div>
                <div className="grid grid-cols-2 gap-2 md:gap-4">
                  <MiniCarousel images={p.avant} label="Avant" />
                  <MiniCarousel images={p.apres} label="Après" />
                </div>
              </article>
            ))}
          </div>
        </section>

        <MobileFloatingCTA />
        <WhatsAppFAB />
      </main>
    </SmoothScroll>
  );
}
