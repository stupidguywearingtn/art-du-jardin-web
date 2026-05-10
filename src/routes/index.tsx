import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { motion, AnimatePresence } from "framer-motion";
import { CustomCursor } from "@/components/CustomCursor";
import { SmoothScroll } from "@/components/SmoothScroll";

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
        <SectionDivider />
        <Transformation />
        <SectionDivider />
        <Process />
        <SectionDivider />
        <Testimonials />
        <SectionDivider />
        <CTAFinal />
        <Footer />
      </main>
    </>
  );
}

/* ============ DECORATIONS ============ */
function SectionDivider() {
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

function BotanicalLeaf({ className = "", style }: { className?: string; style?: React.CSSProperties }) {
  return (
    <svg
      viewBox="0 0 200 400"
      className={`pointer-events-none absolute text-gold ${className}`}
      style={{ opacity: 0.04, ...style }}
      aria-hidden
      fill="none"
      stroke="currentColor"
      strokeWidth="1"
    >
      <path d="M100 10 C 60 100, 40 220, 100 390" />
      <path d="M100 60 C 130 80, 150 100, 160 130" />
      <path d="M100 110 C 60 130, 45 150, 35 180" />
      <path d="M100 160 C 135 180, 155 200, 165 230" />
      <path d="M100 220 C 60 240, 45 260, 35 290" />
      <path d="M100 280 C 130 300, 145 320, 155 345" />
    </svg>
  );
}

function CornerGlow({ corner = "tl", tint = "gold" }: { corner?: "tl" | "tr" | "bl" | "br"; tint?: "gold" | "green" }) {
  const pos: Record<string, React.CSSProperties> = {
    tl: { top: "-10%", left: "-10%" },
    tr: { top: "-10%", right: "-10%" },
    bl: { bottom: "-10%", left: "-10%" },
    br: { bottom: "-10%", right: "-10%" },
  };
  const color = tint === "gold" ? "rgba(201,168,76,0.05)" : "rgba(26,51,32,0.18)";
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
      <div className="absolute inset-x-0 bottom-0 h-[60%]" style={{ background: "linear-gradient(to bottom, transparent, #070A08)" }} />
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
  { n: "01", t: "Création de Jardin", img: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=1600" },
  { n: "02", t: "Entretien & Espaces Verts", img: "https://images.unsplash.com/photo-1416879595882-3373a0480b5b?w=1600" },
  { n: "03", t: "Optimisation Biodiversité", img: "https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?w=1600" },
  { n: "04", t: "Jardins Comestibles", img: "https://images.unsplash.com/photo-1530836369250-ef72a3f5cda8?w=1600" },
  { n: "05", t: "Gestion des Ressources", img: "https://images.unsplash.com/photo-1441974231531-c6227db76b6e?w=1600" },
  { n: "06", t: "Ateliers Pratiques", img: "https://images.unsplash.com/photo-1592150621744-aca64f48394a?w=1600" },
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
      style={{ background: "radial-gradient(ellipse at center, #0F1E12 0%, #070A08 70%)" }}
    >
      <div className="grain-overlay" aria-hidden />
      <BotanicalLeaf className="hidden md:block" style={{ top: "8%", right: "-40px", width: 180, height: 360, transform: "rotate(15deg)" }} />
      <BotanicalLeaf className="hidden md:block" style={{ bottom: "5%", left: "-30px", width: 160, height: 320, transform: "rotate(-200deg)" }} />
      <div className="px-6 md:px-12 mb-16 flex items-end justify-between flex-wrap gap-6">
        <div>
          <div className="label text-gold">— Nos services</div>
          <h2 className="font-display mt-6 text-foreground" style={{ fontSize: "clamp(40px, 7vw, 96px)", fontWeight: 400, lineHeight: 0.95 }}>
            Six métiers,<br/>un seul jardin.
          </h2>
        </div>
        <p className="max-w-md text-muted">De la première intuition à l'entretien quotidien, chaque geste participe à la vie de votre extérieur.</p>
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
      style={{ height: h ? 400 : 200, borderColor: "#1A2B1C" }}
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
      <div className="absolute inset-0" style={{ background: "rgba(7,10,8,0.55)" }} />
      <div className="absolute inset-x-0 bottom-0 h-[30%]" style={{ background: "linear-gradient(to bottom, transparent, #070A08)" }} />

      <div className="relative z-10 h-full w-full flex flex-col items-center justify-center text-center px-6">
        <div className="label text-gold">— Métamorphose</div>
        <h2 className="font-display mt-6 text-foreground" style={{ fontSize: "clamp(40px, 6vw, 88px)", fontWeight: 400, lineHeight: 1.05 }}>
          De la Terre Brute<br/>au <span className="italic text-gold">Jardin d'Exception</span>
        </h2>
        <p className="mt-8 text-muted max-w-xl mx-auto">
          Chaque projet débute par une lecture du lieu — sols, lumière, vents, vues — pour révéler l'identité unique de votre extérieur.
        </p>
        <div ref={statsRef} className="mt-14 grid grid-cols-3 gap-8 md:gap-16 max-w-3xl mx-auto">
          {[
            { n: 12, suf: "+", l: "Années" },
            { n: 200, suf: "+", l: "Jardins" },
            { n: 100, suf: "%", l: "Sur-mesure" },
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
  { n: "01", t: "Consultation & Vision", d: "Visite du site, écoute de vos usages et lecture sensible du lieu." },
  { n: "02", t: "Conception & Plan", d: "Plans, ambiances, palette végétale et devis détaillé." },
  { n: "03", t: "Création & Réalisation", d: "Du terrassement à la plantation, une exécution soignée." },
  { n: "04", t: "Entretien & Suivi", d: "Accompagnement saisonnier pour faire vivre le jardin." },
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
    <section className="relative bg-background py-32 px-6 md:px-12 overflow-hidden">
      <CornerGlow corner="tr" tint="gold" />
      <CornerGlow corner="bl" tint="green" />
      <BotanicalLeaf className="hidden md:block" style={{ top: "20%", left: "2%", width: 140, height: 280, transform: "rotate(-25deg)" }} />
      <div className="max-w-3xl mx-auto text-center mb-24">
        <div className="label text-gold">— Notre processus</div>
        <h2 className="font-display mt-6 text-foreground" style={{ fontSize: "clamp(40px, 6vw, 80px)", fontWeight: 400, lineHeight: 0.95 }}>
          Quatre étapes,<br/><span className="italic text-gold">un engagement.</span>
        </h2>
      </div>

      <div ref={ref} className="relative max-w-6xl mx-auto">
        <div ref={lineRef} className="absolute left-1/2 top-0 bottom-0 w-px bg-gold/40 -translate-x-1/2" style={{ transformOrigin: "top center" }} />
        {PROCESS.map((s, i) => {
          const left = i % 2 === 0;
          return (
            <div key={s.n} className="relative grid grid-cols-2 gap-8 md:gap-16 mb-24 last:mb-0 items-center">
              <div data-dot className="absolute left-1/2 top-8 -translate-x-1/2 w-3 h-3 rounded-full bg-gold ring-4 ring-background" />
              <ProcessStep
                step={s}
                left={left}
              />
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
      className={`relative ${left ? "col-start-1 text-right pr-8 md:pr-16" : "col-start-2 text-left pl-8 md:pl-16"}`}
    >
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 bg-cover bg-center transition-all duration-700"
        style={{
          backgroundImage: "url(https://images.unsplash.com/photo-1416879595882-3373a0480b5b?w=1200)",
          opacity: hover ? 0.06 : 0,
          transform: hover ? "scale(1.05)" : "scale(1)",
          filter: "blur(2px)",
        }}
      />
      <div className="relative">
        <div data-step-num={num} className="font-display text-gold" style={{ fontSize: "clamp(48px, 6vw, 80px)", fontWeight: 300, lineHeight: 1 }}>00</div>
        <h3 className="font-display text-foreground mt-2" style={{ fontSize: "clamp(22px, 2.4vw, 32px)", fontWeight: 400 }}>{step.t}</h3>
        <p className="mt-4 text-muted max-w-sm" style={{ marginLeft: left ? "auto" : 0 }}>{step.d}</p>
      </div>
    </div>
  );
}

/* ============ TESTIMONIALS ============ */
const TESTIMONIALS = [
  { q: "Un travail d'orfèvre. Notre jardin est devenu le cœur de la maison, en toute saison.", n: "Marie-Claire D., Cologny" },
  { q: "Vision, écoute, exécution irréprochable. Une vraie rencontre humaine et professionnelle.", n: "Étienne M., Vandœuvres" },
  { q: "Leclerc Paysage a su révéler l'âme de notre propriété avec une délicatesse rare.", n: "Famille R., Genthod" },
];

function Testimonials() {
  const [i, setI] = useState(0);
  const quoteRef = useRef<HTMLParagraphElement>(null);
  const starsRef = useRef<HTMLDivElement>(null);
  const bigQuoteRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const t = setInterval(() => setI((x) => (x + 1) % TESTIMONIALS.length), 6000);
    return () => clearInterval(t);
  }, []);

  // Animate quote word-by-word + big quote scale on each change
  useEffect(() => {
    if (quoteRef.current) {
      const words = quoteRef.current.querySelectorAll("[data-w]");
      gsap.fromTo(words,
        { opacity: 0, y: 12 },
        { opacity: 1, y: 0, duration: 0.6, stagger: 0.05, ease: "power3.out" }
      );
    }
    if (bigQuoteRef.current) {
      gsap.fromTo(bigQuoteRef.current,
        { scale: 0.8, opacity: 0 },
        { scale: 1, opacity: 0.15, duration: 0.8, ease: "power3.out" }
      );
    }
  }, [i]);

  // Animate stars on first enter
  useEffect(() => {
    if (!starsRef.current) return;
    const stars = starsRef.current.querySelectorAll("[data-star]");
    gsap.fromTo(stars,
      { opacity: 0, y: 10, scale: 0.6 },
      {
        opacity: 1, y: 0, scale: 1, duration: 0.5, stagger: 0.1, ease: "back.out(2)",
        scrollTrigger: { trigger: starsRef.current, start: "top 85%" },
      }
    );
  }, []);

  const words = TESTIMONIALS[i].q.split(" ");

  return (
    <section className="relative bg-background min-h-screen flex items-center justify-center px-6 py-32 overflow-hidden" style={{ backgroundColor: "#070A08" }}>
      {/* background image with heavy dark overlay */}
      <div
        aria-hidden
        className="absolute inset-0 bg-cover bg-center"
        style={{ backgroundImage: "url(https://images.unsplash.com/photo-1416879595882-3373a0480b5b?w=1600)", opacity: 0.08 }}
      />
      <div aria-hidden className="absolute inset-0" style={{ background: "linear-gradient(180deg, #070A08 0%, rgba(7,10,8,0.85) 50%, #070A08 100%)" }} />
      <div className="grain-overlay animated" aria-hidden />
      <BotanicalLeaf className="hidden md:block" style={{ top: "10%", right: "3%", width: 160, height: 320, transform: "rotate(20deg)" }} />

      <div className="relative max-w-4xl w-full text-center">
        <div
          ref={bigQuoteRef}
          className="absolute -top-16 left-0 md:-left-12 font-display text-gold pointer-events-none select-none"
          style={{ fontSize: 200, lineHeight: 0.7, fontWeight: 400, opacity: 0.15 }}
          aria-hidden
        >
          “
        </div>

        {/* Stars */}
        <div ref={starsRef} className="flex justify-center gap-2 mb-10">
          {[0,1,2,3,4].map((s) => (
            <span key={s} data-star className="text-gold" style={{ fontSize: 16 }}>★</span>
          ))}
        </div>

        <div className="relative min-h-[280px]">
          <AnimatePresence mode="wait">
            <motion.div
              key={i}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.6, ease: "easeOut" }}
              className="absolute inset-0 flex flex-col items-center justify-center"
            >
              <p
                ref={quoteRef}
                className="font-display italic text-foreground max-w-[760px] mx-auto"
                style={{ fontSize: 28, fontWeight: 300, lineHeight: 1.6 }}
              >
                {words.map((w, wi) => (
                  <span key={wi} data-w className="inline-block mr-[0.25em]">{w}</span>
                ))}
              </p>
              <p className="label text-gold mt-10">— {TESTIMONIALS[i].n}</p>
            </motion.div>
          </AnimatePresence>
        </div>

        <div className="mt-12 flex justify-center gap-3">
          {TESTIMONIALS.map((_, idx) => (
            <button
              key={idx}
              data-cursor-hover
              onClick={() => setI(idx)}
              aria-label={`Témoignage ${idx + 1}`}
              className="w-2.5 h-2.5 rounded-full border border-gold transition-colors"
              style={{ background: i === idx ? "#C9A84C" : "transparent" }}
            />
          ))}
        </div>
      </div>

      {/* progress bar */}
      <div aria-hidden className="absolute left-0 right-0 bottom-0 h-px bg-gold/10">
        <div
          key={i}
          className="h-full bg-gold origin-left"
          style={{ animation: "progressFill 6s linear forwards" }}
        />
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
          src="https://images.unsplash.com/photo-1585320806297-9794b3e4eeae?w=1600"
          alt="Jardin éclairé"
          loading="lazy"
          className="h-full w-full object-cover"
        />
      </div>
      <div className="absolute inset-0" style={{ background: "rgba(7, 10, 8, 0.75)" }} />
      <div className="relative z-10 text-center px-6 max-w-4xl">
        <div className="label text-gold">Genève & Suisse Romande</div>
        <h2 className="font-display mt-8 text-foreground" style={{ fontSize: "clamp(48px, 9vw, 96px)", fontWeight: 400, lineHeight: 0.95 }}>
          Transformons<br/>Votre Espace
        </h2>
        <div className="mt-12 flex flex-wrap gap-4 justify-center">
          <a
            href="mailto:contact@leclercpaysage.ch"
            data-cursor-hover
            className="bg-gold text-background px-10 py-4 font-medium transition-all hover:bg-[#b3933e] active:scale-[0.98]"
            style={{ fontFamily: "Outfit", fontSize: 14, letterSpacing: "0.15em", textTransform: "uppercase" }}
          >
            Prendre Contact
          </a>
          <a
            href="#services"
            data-cursor-hover
            className="border border-gold text-gold px-10 py-4 font-medium transition-colors hover:bg-gold hover:text-background"
            style={{ fontFamily: "Outfit", fontSize: 14, letterSpacing: "0.15em", textTransform: "uppercase" }}
          >
            Voir Nos Réalisations
          </a>
        </div>
      </div>
    </section>
  );
}

/* ============ FOOTER ============ */
function Footer() {
  return (
    <footer className="relative overflow-hidden pt-24 pb-10 px-6 md:px-12" style={{ background: "#040605" }}>
      <div
        className="absolute inset-x-0 top-1/2 -translate-y-1/2 text-center font-display pointer-events-none select-none whitespace-nowrap"
        style={{ opacity: 0.04, fontSize: "clamp(80px, 18vw, 280px)", color: "#EDE8DC", fontWeight: 300, lineHeight: 1 }}
        aria-hidden
      >
        LECLERC PAYSAGE
      </div>
      <div className="relative grid grid-cols-1 md:grid-cols-3 gap-12">
        <div>
          <div className="font-display text-gold" style={{ fontSize: 56, fontWeight: 400, lineHeight: 1 }}>LP</div>
          <p className="mt-4 text-muted italic font-display" style={{ fontSize: 18 }}>L'art du jardin vivant</p>
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
            <li>Genève, Suisse</li>
            <li><a href="mailto:contact@leclercpaysage.ch" className="transition-colors hover:text-gold">contact@leclercpaysage.ch</a></li>
            <li><a href="#" className="transition-colors hover:text-gold">Instagram</a></li>
          </ul>
        </div>
      </div>
      <div className="relative mt-24 pt-8 border-t border-gold/30 flex flex-wrap items-center justify-between gap-4 text-muted" style={{ fontSize: 12 }}>
        <span>© 2025 Leclerc Paysage</span>
        <span>Fait à Genève, avec soin</span>
      </div>
    </footer>
  );
}
