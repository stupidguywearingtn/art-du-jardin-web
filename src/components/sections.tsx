import { useEffect, useRef, useState, useMemo } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { motion, AnimatePresence } from "framer-motion";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

/* ============ POURQUOI NOUS CHOISIR ============ */
const REASONS = [
  { n: "01", t: "Enrobé à chaud", d: "Pose au finisseur à 160°C, compactage maîtrisé pour une durabilité maximale.", icon: "M3 17h18M5 17V9l7-4 7 4v8" },
  { n: "02", t: "20 ans d'expérience", d: "Plus de 500 chantiers réalisés dans le Jura et l'Ain depuis 2005.", icon: "M12 6v6l4 2M12 22a10 10 0 1 1 0-20 10 10 0 0 1 0 20Z" },
  { n: "03", t: "Devis détaillé", d: "Visite gratuite, devis sous 48h, prix tenus, aucune mauvaise surprise.", icon: "M9 12h6M9 16h6M9 8h6M5 21V5a2 2 0 0 1 2-2h7l5 5v13a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2Z" },
  { n: "04", t: "Garantie & SAV", d: "Travaux garantis. Intervention rapide à la moindre anomalie.", icon: "M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10Z" },
];

export function WhyUs() {
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    if (!ref.current) return;
    const cards = ref.current.querySelectorAll<SVGPathElement>("[data-stroke]");
    cards.forEach((p) => {
      const len = p.getTotalLength();
      gsap.set(p, { strokeDasharray: len, strokeDashoffset: len });
      gsap.to(p, {
        strokeDashoffset: 0, duration: 2.4, ease: "power2.inOut",
        scrollTrigger: { trigger: p, start: "top 85%" },
      });
    });
    const items = ref.current.querySelectorAll("[data-card]");
    items.forEach((el, i) => {
      gsap.fromTo(el,
        { y: 40, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.9, ease: "power3.out", delay: i * 0.08,
          scrollTrigger: { trigger: el, start: "top 88%" } });
    });
  }, []);

  return (
    <section ref={ref} className="relative bg-background py-32 px-6 md:px-12 overflow-hidden">
      <div className="grain-overlay" aria-hidden />
      <div className="max-w-3xl mx-auto text-center mb-20">
        <div className="label text-gold">— Pourquoi HCE</div>
        <h2 className="font-display mt-6 text-foreground" style={{ fontSize: "clamp(40px, 6vw, 80px)", fontWeight: 400, lineHeight: 0.95 }}>
          Quatre raisons,<br /><span className="italic text-gold">une certitude.</span>
        </h2>
      </div>

      <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {REASONS.map((r) => (
          <div
            key={r.n}
            data-card
            data-cursor-hover
            className="relative p-8 group"
            style={{ minHeight: 280 }}
          >
            <svg
              className="absolute inset-0 w-full h-full pointer-events-none"
              viewBox="0 0 300 280" preserveAspectRatio="none" aria-hidden
            >
              <path
                data-stroke
                d="M 4 4 L 296 4 L 296 276 L 4 276 Z"
                fill="none"
                stroke="rgb(200 153 42 / 0.6)"
                strokeWidth="1"
                strokeDasharray="6 4"
                vectorEffect="non-scaling-stroke"
              />
            </svg>
            <div className="relative">
              <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" className="text-gold mb-6" strokeWidth="1.2">
                <path d={r.icon} />
              </svg>
              <div className="font-display text-gold/60 mb-2" style={{ fontSize: 14, letterSpacing: "0.2em" }}>{r.n}</div>
              <h3 className="font-display text-foreground" style={{ fontSize: 24, fontWeight: 400 }}>{r.t}</h3>
              <p className="mt-4 text-muted" style={{ fontSize: 14, lineHeight: 1.6 }}>{r.d}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

/* ============ ZONE D'INTERVENTION — Leaflet lazy ============ */
const CITIES_FALLBACK = [
  "Cize (siège)", "Lons-le-Saunier", "Saint-Claude", "Champagnole",
  "Bourg-en-Bresse", "Oyonnax", "Nantua", "Pont-d'Ain",
];

export function Zone() {
  const ref = useRef<HTMLDivElement>(null);
  const [Map, setMap] = useState<React.ComponentType | null>(null);
  const [shouldLoad, setShouldLoad] = useState(false);

  useEffect(() => {
    if (!ref.current) return;
    const io = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          setShouldLoad(true);
          io.disconnect();
        }
      },
      { rootMargin: "200px" }
    );
    io.observe(ref.current);
    return () => io.disconnect();
  }, []);

  useEffect(() => {
    if (!shouldLoad || Map) return;
    import("./InteractiveMap").then((m) => setMap(() => m.default));
  }, [shouldLoad, Map]);

  return (
    <section ref={ref} className="relative bg-background py-32 px-6 md:px-12 overflow-hidden">
      <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
        <div>
          <div className="label text-gold">— Zone d'intervention</div>
          <h2 className="font-display mt-6 text-foreground" style={{ fontSize: "clamp(36px, 5vw, 64px)", fontWeight: 400, lineHeight: 1 }}>
            Jura & Ain,<br /><span className="italic text-gold">notre territoire.</span>
          </h2>
          <p className="mt-8 text-muted max-w-md" style={{ lineHeight: 1.7 }}>
            Basés à Cize, nous intervenons dans tout le Jura et le département de l'Ain. Visite et devis gratuits jusqu'à 60 km autour de notre siège.
          </p>
          <ul className="mt-8 grid grid-cols-2 gap-x-8 gap-y-3 text-foreground/80" style={{ fontSize: 14 }}>
            {CITIES_FALLBACK.map((c) => (
              <li key={c} className="flex items-center gap-3">
                <span className="w-1 h-1 bg-gold rounded-full" />
                {c}
              </li>
            ))}
          </ul>
          <div className="label text-gold/70 mt-10" style={{ fontSize: 10 }}>
            Marqueurs dorés · Survol pour le détail · Clic pour la fiche
          </div>
        </div>

        <div className="relative aspect-square max-w-lg mx-auto w-full bg-surface border border-border">
          {Map ? <Map /> : (
            <div className="absolute inset-0 flex items-center justify-center">
              <span className="label text-gold/60">Carte Jura & Ain</span>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}

/* ============ FAQ ============ */
const FAQS = [
  { q: "Sous combien de temps recevrai-je mon devis ?", a: "Après visite sur site, nous vous transmettons un devis détaillé sous 48 heures ouvrées, sans engagement." },
  { q: "L'enrobé peut-il être posé toute l'année ?", a: "L'enrobé à chaud requiert des températures supérieures à 5°C et un sol sec. Nous intervenons généralement de mars à novembre." },
  { q: "Quelle est la durée de vie d'un enrobé HCE ?", a: "Un enrobé bien préparé et compacté tient 20 à 30 ans selon l'usage, sans entretien lourd." },
  { q: "Faut-il un permis pour refaire ma cour ?", a: "Pour un simple revêtement à l'identique, aucune autorisation n'est nécessaire. Nous vous conseillons en cas de doute." },
  { q: "Travaillez-vous pour les particuliers et les professionnels ?", a: "Oui : cours privées, allées, parkings d'entreprise, voiries de copropriété, plateformes industrielles." },
  { q: "Combien de temps dure un chantier type ?", a: "Une cour standard de 100 à 200 m² se réalise en 2 à 4 jours, préparation comprise." },
];

export function FAQ() {
  const ref = useRef<HTMLDivElement>(null);
  const [open, setOpen] = useState<number | null>(0);

  useEffect(() => {
    if (!ref.current) return;
    const items = ref.current.querySelectorAll("[data-faq]");
    items.forEach((el, i) => {
      gsap.fromTo(el,
        { x: -30, opacity: 0 },
        { x: 0, opacity: 1, duration: 0.7, delay: i * 0.06, ease: "power3.out",
          scrollTrigger: { trigger: el, start: "top 90%" } });
    });
  }, []);

  return (
    <section ref={ref} className="relative bg-background py-32 px-6 md:px-12 overflow-hidden">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-20">
          <div className="label text-gold">— Questions fréquentes</div>
          <h2 className="font-display mt-6 text-foreground" style={{ fontSize: "clamp(40px, 6vw, 72px)", fontWeight: 400, lineHeight: 1 }}>
            Tout ce que vous<br /><span className="italic text-gold">devez savoir.</span>
          </h2>
        </div>

        <div className="space-y-px">
          {FAQS.map((f, i) => {
            const isOpen = open === i;
            return (
              <div key={i} data-faq className="border-t border-gold/20 last:border-b">
                <button
                  data-cursor-hover
                  onClick={() => setOpen(isOpen ? null : i)}
                  className="w-full flex items-center justify-between gap-6 py-7 text-left group"
                >
                  <span
                    className="font-display text-foreground transition-colors group-hover:text-gold"
                    style={{ fontSize: "clamp(18px, 2vw, 24px)", fontWeight: 400 }}
                  >
                    {f.q}
                  </span>
                  <span
                    className="text-gold flex-shrink-0 transition-transform duration-500 ease-out"
                    style={{ fontSize: 24, transform: isOpen ? "rotate(45deg)" : "rotate(0deg)" }}
                  >
                    +
                  </span>
                </button>
                <AnimatePresence initial={false}>
                  {isOpen && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.5, ease: [0.4, 0, 0.2, 1] }}
                      className="overflow-hidden"
                    >
                      <p className="pb-7 pr-12 text-muted" style={{ fontSize: 15, lineHeight: 1.7 }}>
                        {f.a}
                      </p>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

/* ============ DEVIS MULTI-STEP + CALCULATEUR ============ */
type Quote = {
  type: "cour" | "allee" | "parking" | "preparation" | "";
  surface: number;
  delai: "souple" | "1mois" | "urgent" | "";
  nom: string;
  email: string;
  tel: string;
  ville: string;
  message: string;
};

const TYPE_OPTIONS = [
  { id: "cour" as const, label: "Cour privée", price: 65, desc: "Enrobé à chaud, compactage", icon: "M3 12 12 4l9 8M5 10v10h14V10" },
  { id: "allee" as const, label: "Allée", price: 75, desc: "Bordures + finition soignée", icon: "M4 20 14 4M10 20 20 4" },
  { id: "parking" as const, label: "Parking pro", price: 55, desc: "Voirie poids lourds possible", icon: "M4 17V7a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v10M4 17h16M8 21v-4M16 21v-4" },
  { id: "preparation" as const, label: "Préparation seule", price: 30, desc: "Décaissement + nivellement", icon: "M3 19h18M6 16l3-9 3 4 3-7 3 12" },
];

const DELAI_COEF = { souple: 1, "1mois": 1.05, urgent: 1.15 } as const;

export function QuoteForm() {
  const [step, setStep] = useState(0);
  const [data, setData] = useState<Quote>({
    type: "", surface: 100, delai: "", nom: "", email: "", tel: "", ville: "", message: "",
  });
  const priceRef = useRef<HTMLSpanElement>(null);
  const sectionRef = useRef<HTMLDivElement>(null);

  const { min, max } = useMemo(() => {
    const opt = TYPE_OPTIONS.find((o) => o.id === data.type);
    if (!opt || !data.surface) return { min: 0, max: 0 };
    const coef = data.delai ? DELAI_COEF[data.delai] : 1;
    const base = opt.price * data.surface * coef;
    return { min: Math.round(base * 0.9 / 100) * 100, max: Math.round(base * 1.2 / 100) * 100 };
  }, [data.type, data.surface, data.delai]);

  // animate price counter
  const prevMaxRef = useRef(0);
  useEffect(() => {
    if (!priceRef.current) return;
    const obj = { v: prevMaxRef.current };
    gsap.to(obj, {
      v: max, duration: 0.8, ease: "power2.out",
      onUpdate: () => {
        if (priceRef.current) priceRef.current.textContent = Math.round(obj.v).toLocaleString("fr-FR");
      },
      onComplete: () => { prevMaxRef.current = max; },
    });
  }, [max]);

  // section reveal
  useEffect(() => {
    if (!sectionRef.current) return;
    const els = sectionRef.current.querySelectorAll("[data-reveal]");
    els.forEach((el, i) => {
      gsap.fromTo(el,
        { y: 30, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.8, delay: i * 0.1, ease: "power3.out",
          scrollTrigger: { trigger: sectionRef.current, start: "top 70%" } });
    });
  }, []);

  const canNext = useMemo(() => {
    if (step === 0) return data.type !== "";
    if (step === 1) return data.surface > 0 && data.delai !== "";
    if (step === 2) return data.nom && data.email && data.tel;
    return false;
  }, [step, data]);

  const submit = () => {
    const opt = TYPE_OPTIONS.find((o) => o.id === data.type);
    const body = encodeURIComponent(
      `Demande de devis HCE\n\n` +
      `Type : ${opt?.label}\n` +
      `Surface : ${data.surface} m²\n` +
      `Délai : ${data.delai}\n` +
      `Estimation indicative : ${min.toLocaleString("fr-FR")} € — ${max.toLocaleString("fr-FR")} € HT\n\n` +
      `Nom : ${data.nom}\nEmail : ${data.email}\nTél : ${data.tel}\nVille : ${data.ville}\n\n` +
      `Message :\n${data.message}`
    );
    window.location.href = `mailto:sarl.hce@laposte.net?subject=${encodeURIComponent("Demande de devis — " + (opt?.label ?? ""))}&body=${body}`;
  };

  const STEPS = ["Projet", "Surface & délai", "Coordonnées"];

  return (
    <section ref={sectionRef} id="devis" className="relative bg-background py-32 px-6 md:px-12 overflow-hidden">
      <div className="grain-overlay" aria-hidden />
      <div className="max-w-5xl mx-auto">
        <div className="text-center mb-16" data-reveal>
          <div className="label text-gold">— Demande de devis</div>
          <h2 className="font-display mt-6 text-foreground" style={{ fontSize: "clamp(40px, 6vw, 80px)", fontWeight: 400, lineHeight: 1 }}>
            Estimez votre projet<br /><span className="italic text-gold">en 90 secondes.</span>
          </h2>
        </div>

        {/* progress */}
        <div className="flex items-center gap-3 mb-12 max-w-2xl mx-auto" data-reveal>
          {STEPS.map((s, i) => (
            <div key={s} className="flex-1 flex items-center gap-3">
              <div
                className="flex items-center justify-center w-8 h-8 border transition-all duration-500"
                style={{
                  borderColor: i <= step ? "#C8992A" : "rgb(200 153 42 / 0.3)",
                  background: i < step ? "#C8992A" : "transparent",
                  color: i < step ? "#1E1E1E" : "#C8992A",
                  fontFamily: "Outfit", fontSize: 13,
                }}
              >
                {i < step ? "✓" : i + 1}
              </div>
              <span className="hidden md:inline label text-gold/80" style={{ fontSize: 10 }}>{s}</span>
              {i < STEPS.length - 1 && (
                <div className="flex-1 h-px relative bg-gold/20">
                  <div className="absolute inset-y-0 left-0 bg-gold transition-all duration-700" style={{ width: i < step ? "100%" : "0%" }} />
                </div>
              )}
            </div>
          ))}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12" data-reveal>
          {/* form area */}
          <div className="lg:col-span-2 relative min-h-[420px]">
            <AnimatePresence mode="wait">
              <motion.div
                key={step}
                initial={{ opacity: 0, x: 30 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -30 }}
                transition={{ duration: 0.4, ease: [0.4, 0, 0.2, 1] }}
              >
                {step === 0 && (
                  <div>
                    <h3 className="font-display text-foreground mb-8" style={{ fontSize: 28, fontWeight: 400 }}>
                      Quel type de projet ?
                    </h3>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                      {TYPE_OPTIONS.map((o) => {
                        const sel = data.type === o.id;
                        return (
                          <SelectCard
                            key={o.id}
                            selected={sel}
                            onClick={() => setData({ ...data, type: o.id })}
                          >
                            <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.2" className="text-gold mb-5 transition-all duration-300 group-hover:text-[#E0AC30]">
                              <path d={o.icon} strokeLinecap="round" strokeLinejoin="round" />
                            </svg>
                            <div className="font-display text-foreground" style={{ fontSize: 22, fontWeight: 400, letterSpacing: "-0.01em" }}>{o.label}</div>
                            <div className="text-muted mt-2" style={{ fontSize: 13, lineHeight: 1.5 }}>{o.desc}</div>
                            <div className="label text-gold mt-5" style={{ fontSize: 10 }}>à partir de {o.price} €/m²</div>
                          </SelectCard>
                        );
                      })}
                    </div>
                  </div>
                )}

                {step === 1 && (
                  <div className="space-y-10">
                    <div>
                      <h3 className="font-display text-foreground mb-2" style={{ fontSize: 28, fontWeight: 400 }}>Surface estimée</h3>
                      <p className="text-muted mb-6" style={{ fontSize: 14 }}>Approximative, nous affinerons sur place.</p>
                      <div className="flex items-baseline gap-3 mb-4">
                        <span className="font-display text-gold" style={{ fontSize: 48, lineHeight: 1 }}>{data.surface}</span>
                        <span className="label text-foreground/70">m²</span>
                      </div>
                      <input
                        type="range" min={20} max={1000} step={10} value={data.surface}
                        onChange={(e) => setData({ ...data, surface: Number(e.target.value) })}
                        className="w-full accent-[#C8992A] cursor-pointer"
                      />
                      <div className="flex justify-between text-muted mt-2" style={{ fontSize: 11 }}>
                        <span>20 m²</span><span>1000 m²</span>
                      </div>
                    </div>

                    <div>
                      <h3 className="font-display text-foreground mb-6" style={{ fontSize: 24, fontWeight: 400 }}>Délai souhaité</h3>
                      <div className="grid grid-cols-3 gap-4">
                        {([
                          { id: "souple", l: "Flexible", d: "Date libre" },
                          { id: "1mois", l: "Sous 1 mois", d: "Planning serré" },
                          { id: "urgent", l: "Urgent", d: "Sous 2 sem." },
                        ] as const).map((d) => {
                          const sel = data.delai === d.id;
                          return (
                            <SelectCard
                              key={d.id}
                              selected={sel}
                              onClick={() => setData({ ...data, delai: d.id })}
                              compact
                            >
                              <div className="font-display text-foreground" style={{ fontSize: 18, fontWeight: 400 }}>{d.l}</div>
                              <div className="text-muted mt-1.5" style={{ fontSize: 12 }}>{d.d}</div>
                            </SelectCard>
                          );
                        })}
                      </div>
                    </div>
                  </div>
                )}

                {step === 2 && (
                  <div className="space-y-5">
                    <h3 className="font-display text-foreground mb-2" style={{ fontSize: 28, fontWeight: 400 }}>Vos coordonnées</h3>
                    <p className="text-muted mb-6" style={{ fontSize: 14 }}>On vous rappelle sous 48h pour planifier la visite.</p>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <Input label="Nom complet *" value={data.nom} onChange={(v) => setData({ ...data, nom: v })} />
                      <Input label="Téléphone *" value={data.tel} onChange={(v) => setData({ ...data, tel: v })} />
                      <Input label="Email *" value={data.email} onChange={(v) => setData({ ...data, email: v })} type="email" />
                      <Input label="Ville" value={data.ville} onChange={(v) => setData({ ...data, ville: v })} />
                    </div>
                    <div>
                      <label className="label text-gold/80 block mb-2" style={{ fontSize: 10 }}>Message (optionnel)</label>
                      <textarea
                        rows={4}
                        value={data.message}
                        onChange={(e) => setData({ ...data, message: e.target.value })}
                        className="w-full bg-transparent border border-gold/30 px-4 py-3 text-foreground focus:outline-none focus:border-gold transition-colors"
                        style={{ fontFamily: "Outfit", fontSize: 14 }}
                      />
                    </div>
                  </div>
                )}
              </motion.div>
            </AnimatePresence>

            {/* nav */}
            <div className="mt-10 flex items-center justify-between gap-4">
              <button
                data-cursor-hover
                onClick={() => setStep((s) => Math.max(0, s - 1))}
                disabled={step === 0}
                className="label text-gold disabled:opacity-30 disabled:cursor-not-allowed transition-opacity"
                style={{ fontSize: 11 }}
              >
                ← Précédent
              </button>
              {step < 2 ? (
                <button
                  data-cursor-hover
                  onClick={() => setStep((s) => s + 1)}
                  disabled={!canNext}
                  className="bg-gold text-background px-8 py-3 transition-all hover:bg-[#A87E1F] hover:-translate-y-0.5 focus-visible:ring-2 focus-visible:ring-gold focus-visible:ring-offset-2 focus-visible:ring-offset-background disabled:opacity-40 disabled:cursor-not-allowed"
                  style={{ fontFamily: "Outfit", fontSize: 13, letterSpacing: "0.15em", textTransform: "uppercase" }}
                >
                  Continuer →
                </button>
              ) : (
                <button
                  data-cursor-hover
                  onClick={submit}
                  disabled={!canNext}
                  className="bg-gold text-background px-10 transition-all hover:bg-[#A87E1F] hover:-translate-y-1 focus-visible:ring-2 focus-visible:ring-gold focus-visible:ring-offset-2 focus-visible:ring-offset-background disabled:opacity-40 disabled:cursor-not-allowed"
                  style={{ fontFamily: "Outfit", fontSize: 14, letterSpacing: "0.15em", textTransform: "uppercase", height: 56, fontWeight: 500, boxShadow: "0 8px 24px rgba(200,153,42,0.35)" }}
                >
                  Envoyer ma demande →
                </button>
              )}
            </div>
          </div>

          {/* live estimate — sticky panel premium */}
          <aside className="relative">
            <div className="sticky top-8 relative bg-surface border border-gold/40 p-8 overflow-hidden" style={{ boxShadow: "0 8px 32px rgba(0,0,0,0.4), 0 0 0 1px rgba(200,153,42,0.1)" }}>
              <span aria-hidden className="absolute top-0 left-0 w-1 h-full bg-gold" />
              <div className="label text-gold mb-6" style={{ fontSize: 10 }}>— Estimation indicative</div>

              {data.type ? (
                <>
                  <div className="font-display text-foreground" style={{ fontSize: 14 }}>
                    {TYPE_OPTIONS.find((o) => o.id === data.type)?.label}
                  </div>
                  <div className="text-muted mt-1" style={{ fontSize: 12 }}>{data.surface} m²{data.delai && ` · ${data.delai === "souple" ? "Flexible" : data.delai === "1mois" ? "Sous 1 mois" : "Urgent"}`}</div>

                  <div className="mt-8 mb-2">
                    <div className="font-display text-gold flex items-baseline gap-2" style={{ fontSize: 64, lineHeight: 0.95, fontWeight: 400, letterSpacing: "-0.02em" }}>
                      <span ref={priceRef}>0</span>
                      <span style={{ fontSize: 24 }}>€</span>
                    </div>
                    <div className="label text-muted mt-4" style={{ fontSize: 10 }}>
                      Fourchette : {min.toLocaleString("fr-FR")} – {max.toLocaleString("fr-FR")} € HT
                    </div>
                  </div>

                  <div className="h-px bg-gold/20 my-6" />
                  <p className="text-muted italic font-display" style={{ fontSize: 12, lineHeight: 1.5 }}>
                    Estimation calculée selon vos critères. Le devis final pourra varier après visite gratuite du chantier.
                  </p>
                </>
              ) : (
                <div className="text-muted italic font-display" style={{ fontSize: 14, lineHeight: 1.6 }}>
                  Sélectionnez un type de projet pour voir l'estimation s'afficher en direct.
                </div>
              )}
            </div>
          </aside>
        </div>
      </div>
    </section>
  );
}

/* SelectCard — V_B "carte technique épurée" */
function SelectCard({ children, selected, onClick, compact = false }: { children: React.ReactNode; selected: boolean; onClick: () => void; compact?: boolean }) {
  const btnRef = useRef<HTMLButtonElement>(null);

  const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    const btn = btnRef.current;
    if (btn) {
      // micro-bounce
      gsap.fromTo(btn, { scale: 0.97 }, { scale: 1, duration: 0.35, ease: "back.out(3)" });
      // ripple
      const rect = btn.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      const ripple = document.createElement("span");
      ripple.style.cssText = `position:absolute;left:${x}px;top:${y}px;width:6px;height:6px;border-radius:9999px;background:rgba(200,153,42,0.45);pointer-events:none;transform:translate(-50%,-50%);`;
      btn.appendChild(ripple);
      gsap.to(ripple, {
        width: 400, height: 400, opacity: 0, duration: 0.7, ease: "power2.out",
        onComplete: () => ripple.remove(),
      });
    }
    onClick();
  };

  return (
    <button
      ref={btnRef}
      type="button"
      data-cursor-hover
      onClick={handleClick}
      className={`group relative text-left bg-surface border transition-all duration-300 overflow-hidden focus:outline-none focus-visible:ring-2 focus-visible:ring-gold ${compact ? "p-5" : "p-8"} ${selected ? "border-gold border-2 -translate-y-0.5" : "border-border hover:border-gold hover:-translate-y-0.5"}`}
      style={{
        boxShadow: selected ? "0 12px 28px rgba(200,153,42,0.18), 0 0 0 1px rgba(200,153,42,0.4)" : "0 4px 12px rgba(0,0,0,0.4)",
      }}
    >
      {/* gold left accent bar */}
      <span aria-hidden className={`absolute top-0 left-0 w-[3px] h-full bg-gold transition-transform duration-500 origin-top ${selected ? "scale-y-100" : "scale-y-0 group-hover:scale-y-100"}`} />

      {/* checkmark corner */}
      {selected && (
        <span aria-hidden className="absolute top-3 right-3 w-6 h-6 rounded-full border-2 border-gold flex items-center justify-center text-gold" style={{ fontSize: 11, animation: "fadeIn 0.3s ease-out" }}>
          ✓
        </span>
      )}
      <div className="relative">{children}</div>
    </button>
  );
}

function Input({ label, value, onChange, type = "text" }: { label: string; value: string; onChange: (v: string) => void; type?: string }) {
  return (
    <div>
      <label className="label text-gold/80 block mb-2" style={{ fontSize: 10 }}>{label}</label>
      <input
        type={type}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="w-full bg-transparent border border-gold/30 px-4 py-3 text-foreground focus:outline-none focus:border-gold focus-visible:ring-1 focus-visible:ring-gold transition-colors"
        style={{ fontFamily: "Outfit", fontSize: 14 }}
      />
    </div>
  );
}
