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
  const [loaded, setLoaded] = useState(false);
  useEffect(() => {
    const t = setTimeout(() => setLoaded(true), 50);
    return () => clearTimeout(t);
  }, []);
  return (
    <>
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
        <Hero />
        <SectionDivider />
        <Philosophy />
        <SectionDivider />
        <Services />
        <SectionDivider variant="marquee" />
        <Transformation />
        <SectionDivider />
        <WhyUs />
        <SectionDivider />
        <Process />
        <SectionDivider />
        <Zone />
        <SectionDivider variant="marquee" />
        <Testimonials />
        <SectionDivider />
        <FAQ />
        <SectionDivider />
        <QuoteForm />
        <SectionDivider />
        <CTAFinal />
        <Footer />
      </main>
    </>
  );
}

/* ============ DECORATIONS ============ */
function SectionDivider({ variant = "minimal" }: { variant?: "minimal" | "marquee" }) {
  if (variant === "marquee") return <MarqueeStats />;
  return (
    <div className="relative w-full flex items-center justify-center py-10 bg-background" aria-hidden>
      <div className="h-px flex-1 max-w-[28%] bg-gold/30" />
      <svg width="14" height="14" viewBox="0 0 14 14" className="mx-4 text-gold" style={{ opacity: 0.6 }}>
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

  useEffect(() => {
    if (!titleRef.current) return;
    const chars = titleRef.current.querySelectorAll("[data-c]");
    const tl = gsap.timeline({ delay: 1.0 });
    tl.fromTo(chars,
      { yPercent: -110, opacity: 0 },
      { yPercent: 0, opacity: 1, duration: 1, ease: "power4.out", stagger: 0.03 }
    );
    if (lineRef.current) tl.fromTo(lineRef.current, { width: 0 }, { width: 120, duration: 0.8, ease: "power3.out" }, "-=0.3");
    if (subRef.current) tl.fromTo(subRef.current, { opacity: 0, y: 10 }, { opacity: 1, y: 0, duration: 0.8 }, "-=0.4");
  }, []);

  const lines = ["L'Enrobé qui", "Marque le Temps."];
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
        <h1
          ref={titleRef}
          className="font-display text-center text-foreground"
          style={{ fontSize: "clamp(64px, 10vw, 140px)", fontWeight: 400, lineHeight: 0.95, letterSpacing: "-0.02em" }}
        >
          {lines.map((line, li) => (
            <span key={li} className="block overflow-hidden">
              <span className="inline-block">
                {line.split("").map((c, ci) => (
                  <span key={ci} data-c className="inline-block" style={{ whiteSpace: c === " " ? "pre" : "normal" }}>
                    {c}
                  </span>
                ))}
              </span>
            </span>
          ))}
        </h1>
        <div ref={lineRef} className="mt-10 h-px bg-gold" style={{ width: 0 }} />
        <div ref={subRef} className="mt-8 label text-gold opacity-0">HCE — Cize, Jura</div>
      </div>

      <div className="absolute bottom-10 left-6 z-10 origin-bottom-left -rotate-90 label text-gold whitespace-nowrap" style={{ transformOrigin: "left bottom" }}>
        Scroll pour découvrir
      </div>
      <div className="absolute bottom-10 right-6 z-10 label text-gold">Depuis 2005</div>
    </section>
  );
}

/* ============ PHILOSOPHY ============ */
function Philosophy() {
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    if (!ref.current) return;
    const words = ref.current.querySelectorAll("[data-w]");
    gsap.fromTo(words,
      { opacity: 0, y: 30 },
      {
        opacity: 1, y: 0, duration: 1, ease: "power3.out", stagger: 0.08,
        scrollTrigger: { trigger: ref.current, start: "top 70%" },
      }
    );
  }, []);
  const text = "Un enrobé qui dure,\nune finition qui marque.";
  return (
    <section ref={ref} className="relative min-h-screen w-full bg-background flex items-center justify-center px-6 py-24">
      <div className="absolute left-6 md:left-12 top-0 bottom-0 w-px bg-gold/40" />
      <div className="max-w-5xl text-center">
        <p
          className="font-display italic text-foreground"
          style={{ fontSize: "clamp(32px, 5vw, 72px)", fontWeight: 300, lineHeight: 1.15 }}
        >
          {text.split("\n").map((line, li) => (
            <span key={li} className="block">
              {line.split(" ").map((w, wi) => (
                <span key={wi} data-w className="inline-block mr-[0.25em]">{w}</span>
              ))}
            </span>
          ))}
        </p>
        <div className="mt-12 label text-gold">— HCE, Cize</div>
      </div>
    </section>
  );
}

/* ============ SERVICES ============ */
const SERVICES = [
  { n: "01", t: "Préparation de terrain", img: service01 },
  { n: "02", t: "Enrobé à chaud", img: service02 },
  { n: "03", t: "Maçonnerie générale", img: service03 },
  { n: "04", t: "Drainage & pentes", img: service04 },
  { n: "05", t: "Bordures & murets", img: service05 },
  { n: "06", t: "Garantie & SAV", img: service06 },
];

function Services() {
  const ref = useRef<HTMLDivElement>(null);
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
  }, []);

  return (
    <section
      className="relative bg-background py-32 overflow-hidden"
      style={{ background: "radial-gradient(ellipse at center, #262626 0%, #1E1E1E 70%)" }}
    >
      <div className="grain-overlay" aria-hidden />
      <GiantNumber n="01" position="left" />
      <TechnicalMark className="hidden md:block" style={{ top: "8%", right: "-40px", width: 180, height: 360, transform: "rotate(8deg)" }} />
      <TechnicalMark className="hidden md:block" style={{ bottom: "5%", left: "-30px", width: 160, height: 320, transform: "rotate(-6deg)" }} />
      <div className="px-6 md:px-12 mb-16 flex items-end justify-between flex-wrap gap-6">
        <div>
          <div className="label text-gold">— Nos services</div>
          <h2 className="font-display mt-6 text-foreground" style={{ fontSize: "clamp(40px, 7vw, 96px)", fontWeight: 400, lineHeight: 0.95 }}>
            Trois métiers,<br/>une même exigence.
          </h2>
        </div>
        <p className="max-w-md text-muted">De la préparation du sol à la pose finale, HCE intervient sur l'intégralité de votre chantier — sans intermédiaire.</p>
      </div>
      <div ref={ref} className="relative">
        {SERVICES.map((s) => <ServiceStrip key={s.n} {...s} />)}
      </div>
    </section>
  );
}

function ServiceStrip({ n, t, img }: { n: string; t: string; img: string }) {
  const [h, setH] = useState(false);
  return (
    <div
      data-strip data-cursor-hover
      onMouseEnter={() => setH(true)}
      onMouseLeave={() => setH(false)}
      className="relative w-full overflow-hidden border-b cursor-none transition-[height] duration-700 ease-out"
      style={{ height: h ? 400 : 200, borderColor: "#2E2E2E" }}
    >
      <div
        className="absolute inset-0 bg-cover bg-center transition-opacity duration-700"
        style={{ backgroundImage: `url(${img})`, opacity: h ? 1 : 0 }}
      />
      <div className="absolute inset-0 bg-background/65 transition-opacity duration-700" style={{ opacity: h ? 1 : 0 }} />
      <div className="relative z-10 h-full grid grid-cols-12 items-center px-6 md:px-12 gap-6">
        <div className="col-span-2 md:col-span-2 font-display text-gold" style={{ fontSize: "clamp(40px, 6vw, 80px)", fontWeight: 300, lineHeight: 1 }}>{n}</div>
        <div className="col-span-8 md:col-span-8 font-display text-foreground relative inline-block" style={{ fontSize: "clamp(22px, 3vw, 36px)", fontWeight: 400 }}>
          <span className="relative inline-block">
            {t}
            <span
              className="absolute left-0 -bottom-1 h-px bg-gold transition-transform duration-700 ease-out origin-left"
              style={{ width: "100%", transform: h ? "scaleX(1)" : "scaleX(0)" }}
            />
          </span>
        </div>
        <div className="col-span-2 md:col-span-2 flex justify-end">
          <span className="text-gold text-3xl md:text-4xl inline-block transition-transform duration-500" style={{ transform: h ? "rotate(45deg)" : "rotate(0deg)" }}>→</span>
        </div>
      </div>
    </div>
  );
}

/* ============ TRANSFORMATION ============ */
function Transformation() {
  const statsRef = useRef<HTMLDivElement>(null);

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
        <div className="label text-gold">— Avant / Après</div>
        <h2 className="font-display mt-6 text-foreground" style={{ fontSize: "clamp(40px, 6vw, 88px)", fontWeight: 400, lineHeight: 1.05 }}>
          De la Cour Brute<br/>à <span className="italic text-gold">l'Enrobé d'Exception</span>
        </h2>
        <p className="mt-8 text-muted max-w-xl mx-auto">
          Chaque chantier débute par une lecture du terrain — sols, pentes, drainage, usages — pour garantir un enrobé qui dure dans le temps.
        </p>
        <div ref={statsRef} className="mt-14 grid grid-cols-3 gap-8 md:gap-16 max-w-3xl mx-auto">
          {[
            { n: 20, suf: "+", l: "Années" },
            { n: 500, suf: "+", l: "Chantiers" },
            { n: 100, suf: "%", l: "Satisfaits" },
          ].map((s, i) => (
            <div key={i} className="text-center">
              <div className="font-display text-gold flex items-baseline justify-center gap-1" style={{ fontSize: "clamp(36px, 5vw, 72px)", fontWeight: 400, lineHeight: 1 }}>
                <span data-num={s.n}>0</span><span>{s.suf}</span>
              </div>
              <div className="label text-foreground/80 mt-3">{s.l}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ============ PROCESS ============ */
const PROCESS = [
  { n: "01", t: "Visite & Devis", d: "Déplacement gratuit, lecture du terrain et devis détaillé sous 48h." },
  { n: "02", t: "Préparation du sol", d: "Décaissement, nivellement laser, compactage et drainage maîtrisés." },
  { n: "03", t: "Pose & Finitions", d: "Enrobé à chaud au finisseur, bordures et maçonnerie soignées." },
  { n: "04", t: "Garantie & SAV", d: "Travaux garantis, intervention rapide en cas de besoin." },
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
    <section className="relative bg-background py-24 md:py-32 px-6 md:px-12 overflow-hidden">
      <CornerGlow corner="tr" tint="gold" />
      <CornerGlow corner="bl" tint="green" />
      <GiantNumber n="03" position="right" />
      <TechnicalMark className="hidden md:block" style={{ top: "20%", left: "2%", width: 140, height: 280, transform: "rotate(-4deg)" }} />
      <div className="max-w-3xl mx-auto text-center mb-16 md:mb-24">
        <div className="label text-gold">— Notre processus</div>
        <h2 className="font-display mt-6 text-foreground" style={{ fontSize: "clamp(36px, 6vw, 80px)", fontWeight: 400, lineHeight: 0.95 }}>
          Quatre étapes,<br/><span className="italic text-gold">un engagement.</span>
        </h2>
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

function ProcessStep({ step, left }: { step: { n: string; t: string; d: string }; left: boolean }) {
  const [hover, setHover] = useState(false);
  const num = parseInt(step.n, 10);
  return (
    <div
      data-step data-side={left ? "left" : "right"}
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
      className={`relative ${left ? "md:col-start-1 md:text-right md:pr-16" : "md:col-start-2 md:text-left md:pl-16"}`}
    >
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 bg-cover bg-center transition-all duration-700"
        style={{
          backgroundImage: `url(${service02})`,
          opacity: hover ? 0.06 : 0,
          transform: hover ? "scale(1.05)" : "scale(1)",
          filter: "blur(2px)",
        }}
      />
      <div className="relative">
        <div data-step-num={num} className="font-display text-gold" style={{ fontSize: "clamp(40px, 6vw, 80px)", fontWeight: 300, lineHeight: 1 }}>00</div>
        <h3 className="font-display text-foreground mt-2" style={{ fontSize: "clamp(20px, 2.4vw, 32px)", fontWeight: 400 }}>{step.t}</h3>
        <p className="mt-3 md:mt-4 text-muted max-w-sm" style={{ marginLeft: left ? "auto" : 0 }}>{step.d}</p>
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
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!ref.current) return;
    const cards = ref.current.querySelectorAll<HTMLElement>("[data-tcard]");
    cards.forEach((card, idx) => {
      // parallax differential
      const speed = idx === 0 ? 0 : idx === 1 ? -40 : 20;
      gsap.fromTo(card,
        { y: 60, opacity: 0 },
        { y: 0, opacity: 1, duration: 1, ease: "power3.out", delay: idx * 0.15,
          scrollTrigger: { trigger: card, start: "top 88%" } });
      if (speed !== 0) {
        gsap.to(card, {
          y: speed, ease: "none",
          scrollTrigger: { trigger: card, start: "top bottom", end: "bottom top", scrub: true },
        });
      }

      // stars sequential reveal
      const stars = card.querySelectorAll<HTMLElement>("[data-tstar]");
      gsap.fromTo(stars,
        { opacity: 0, scale: 0.4 },
        { opacity: 1, scale: 1, duration: 0.35, stagger: 0.08, ease: "back.out(2.4)",
          scrollTrigger: { trigger: card, start: "top 80%" },
          onComplete: () => {
            // particle burst from last star
            const last = stars[stars.length - 1];
            if (!last) return;
            const rect = last.getBoundingClientRect();
            const cardRect = card.getBoundingClientRect();
            const cx = rect.left - cardRect.left + rect.width / 2;
            const cy = rect.top - cardRect.top + rect.height / 2;
            for (let p = 0; p < 8; p++) {
              const dot = document.createElement("span");
              dot.style.cssText = `position:absolute;left:${cx}px;top:${cy}px;width:4px;height:4px;border-radius:9999px;background:#C8992A;pointer-events:none;will-change:transform,opacity;`;
              card.appendChild(dot);
              const angle = (p / 8) * Math.PI * 2;
              gsap.to(dot, {
                x: Math.cos(angle) * 40, y: Math.sin(angle) * 40 - 10,
                opacity: 0, duration: 0.6, ease: "power2.out",
                onComplete: () => dot.remove(),
              });
            }
          },
        });
    });
  }, []);

  return (
    <section className="relative bg-background min-h-screen flex items-center justify-center px-6 py-32 overflow-hidden">
      <div aria-hidden className="absolute inset-0" style={{ background: "linear-gradient(180deg, var(--background) 0%, var(--surface) 50%, var(--background) 100%)" }} />
      <div className="grain-overlay animated" aria-hidden />
      <GiantNumber n="04" position="left" />
      <TechnicalMark className="hidden md:block" style={{ top: "10%", right: "3%", width: 160, height: 320, transform: "rotate(6deg)" }} />

      <div className="relative max-w-6xl w-full">
        <div className="text-center mb-20">
          <div className="label text-gold">— Ils nous font confiance</div>
          <h2 className="font-display mt-6 text-foreground" style={{ fontSize: "clamp(40px, 6vw, 80px)", fontWeight: 400, lineHeight: 1 }}>
            La Parole<br /><span className="italic text-gold">à nos clients.</span>
          </h2>
        </div>

        <div ref={ref} className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-6 items-start">
          {TESTIMONIALS.map((t, idx) => {
            const offsetClass = idx === 0 ? "md:translate-y-0" : idx === 1 ? "md:-translate-y-8" : "md:translate-y-4";
            return (
              <article
                key={idx}
                data-tcard
                data-cursor-hover
                className={`relative p-8 md:p-10 bg-surface border border-border transition-all duration-500 hover:border-gold hover:-translate-y-1.5 group overflow-hidden ${offsetClass}`}
                style={{ minHeight: 360 }}
              >
                {/* giant filigree quote */}
                <span
                  aria-hidden
                  className="absolute -top-6 -left-2 font-display text-gold pointer-events-none select-none"
                  style={{ fontSize: 180, lineHeight: 0.7, opacity: 0.08 }}
                >
                  “
                </span>

                {/* stars */}
                <div className="relative flex gap-1.5 mb-6">
                  {[0,1,2,3,4].map((s) => (
                    <span key={s} data-tstar className="text-gold inline-block" style={{ fontSize: 16 }}>★</span>
                  ))}
                </div>

                <p className="relative font-display italic text-foreground" style={{ fontSize: 18, lineHeight: 1.6, fontWeight: 300 }}>
                  {t.q}
                </p>

                <div className="relative mt-8 pt-6 border-t border-gold/20">
                  <div className="font-display text-foreground" style={{ fontSize: 16, fontWeight: 400 }}>{t.n}</div>
                  <div className="label text-gold mt-1.5" style={{ fontSize: 9 }}>{t.c}</div>
                </div>

                {/* hover gold corner accent */}
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

  useEffect(() => {
    if (!ref.current || !imgRef.current) return;
    const tween = gsap.to(imgRef.current, {
      yPercent: 20, ease: "none",
      scrollTrigger: { trigger: ref.current, start: "top bottom", end: "bottom top", scrub: true },
    });
    return () => { tween.scrollTrigger?.kill(); tween.kill(); };
  }, []);

  return (
    <section ref={ref} className="relative h-screen w-full overflow-hidden flex items-center justify-center bg-background">
      <div ref={imgRef} className="absolute inset-0 -top-[10%] -bottom-[10%]">
        <img
          src={ctaCourtyard}
          alt="Cour en enrobé fraîchement posé"
          loading="lazy"
          className="h-full w-full object-cover"
        />
      </div>
      <div className="absolute inset-0" style={{ background: "rgba(7, 10, 8, 0.75)" }} />
      <div className="relative z-10 text-center px-6 max-w-4xl">
        <div className="label text-gold">Jura & Ain</div>
        <h2 className="font-display mt-8 text-foreground" style={{ fontSize: "clamp(48px, 9vw, 96px)", fontWeight: 400, lineHeight: 0.95 }}>
          Votre Projet,<br/>Notre Priorité
        </h2>
        <div className="mt-12 flex flex-wrap gap-4 justify-center">
          <a
            href="#devis"
            data-cursor-hover
            className="bg-gold text-background px-10 py-4 font-medium transition-all hover:bg-[#A87E1F] active:scale-[0.98]"
            style={{ fontFamily: "Outfit", fontSize: 14, letterSpacing: "0.15em", textTransform: "uppercase" }}
          >
            Demander un Devis
          </a>
          <a
            href="tel:0384526148"
            data-cursor-hover
            className="border border-gold text-gold px-10 py-4 font-medium transition-colors hover:bg-gold hover:text-background"
            style={{ fontFamily: "Outfit", fontSize: 14, letterSpacing: "0.15em", textTransform: "uppercase" }}
          >
            03 84 52 61 48
          </a>
        </div>
      </div>
    </section>
  );
}

/* ============ FOOTER ============ */
function Footer() {
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
          <div className="font-display text-gold" style={{ fontSize: 56, fontWeight: 400, lineHeight: 1 }}>HCE</div>
          <p className="mt-4 text-muted italic font-display" style={{ fontSize: 18 }}>Aménagement de cours & enrobés</p>
        </div>
        <div>
          <div className="label text-gold mb-6">Services</div>
          <ul className="space-y-3 text-foreground/80" style={{ fontSize: 14 }}>
            {SERVICES.map((s) => (
              <li key={s.n}>
                <a href="#" className="transition-colors hover:text-gold">{s.t}</a>
              </li>
            ))}
          </ul>
        </div>
        <div>
          <div className="label text-gold mb-6">Contact</div>
          <ul className="space-y-3 text-foreground/80" style={{ fontSize: 14 }}>
            <li>40 avenue Etienne Lamy, 39300 Cize</li>
            <li><a href="tel:0384526148" className="transition-colors hover:text-gold">03 84 52 61 48</a></li>
            <li><a href="mailto:sarl.hce@laposte.net" className="transition-colors hover:text-gold">sarl.hce@laposte.net</a></li>
            <li>Lun-Ven 8h-18h · Sam 8h-12h</li>
          </ul>
        </div>
      </div>
      <div className="relative mt-24 pt-8 border-t border-gold/30 flex flex-wrap items-center justify-between gap-4 text-muted" style={{ fontSize: 12 }}>
        <span>© 2025 HCE SARL · Tous droits réservés</span>
        <span>Cize, Jura — 03 84 52 61 48</span>
      </div>
    </footer>
  );
}
