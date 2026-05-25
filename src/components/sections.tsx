import { useEffect, useRef, useState, useMemo, useId } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { motion, AnimatePresence } from "framer-motion";
import { useIsMobile } from "@/hooks/use-mobile";
import { CTAInline } from "@/components/CTAButtons";
import { useSiteContent } from "@/hooks/useSiteContent";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

/* ============ POURQUOI NOUS CHOISIR ============ */
const REASONS = [
  { n: "01", t: "Enrobé à chaud", d: "Pose à la main à 180°C, compactage maîtrisé pour une durabilité maximale.", icon: "M8 20s-3-3-3-7a7 7 0 0 1 7-7c0 3-2 4-2 7a3 3 0 0 0 6 0c0 4-3 7-8 7Z" },
  { n: "02", t: "20 ans d'expérience", d: "Plus de 500 chantiers réalisés dans le Jura et l'Ain depuis 2005.", icon: "M12 2l2.4 5 5.6.8-4 3.9 1 5.5L12 14.8 6.9 17.2l1-5.5-4-3.9L9.6 7Z" },
  { n: "03", t: "Devis détaillé", d: "Visite gratuite, devis sous 48h, prix tenus, aucune mauvaise surprise.", icon: "M9 12h6M9 16h4M14 3v4a1 1 0 0 0 1 1h4M5 21V5a2 2 0 0 1 2-2h8l5 5v13a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2Z" },
  { n: "04", t: "Finitions soignées", d: "Bords nets, raccords maîtrisés, surface plane et homogène jusqu'à la dernière passe.", icon: "M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10ZM9 12l2 2 4-4" },
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
    <section ref={ref} className="relative bg-depth-a py-10 md:py-20 px-6 md:px-12 overflow-hidden">
      <div className="grain-overlay" aria-hidden />
      <div className="max-w-3xl mx-auto text-center mb-12 md:mb-16">
        <div className="label text-gold">— Pourquoi HCE</div>
        <h2 className="font-display mt-6 text-foreground" style={{ fontSize: "clamp(32px, 6vw, 80px)", fontWeight: 400, lineHeight: 1, wordBreak: "keep-all", overflowWrap: "normal", hyphens: "none" }}>
          Quatre raisons,<br /><span className="italic text-gold">une certitude.</span>
        </h2>
      </div>

      <div className="max-w-6xl mx-auto grid grid-cols-2 lg:grid-cols-4 gap-3 md:gap-6">
        {REASONS.map((r) => (
          <div
            key={r.n}
            data-card
            data-cursor-hover
            className="relative group transition-all duration-300 hover:-translate-y-1"
            style={{
              background: "rgba(255,255,255,0.03)",
              border: "1px solid rgba(255,255,255,0.08)",
              borderRadius: 12,
              padding: "1.25rem",
              backdropFilter: "blur(10px)",
            }}
          >
            <div className="flex items-start justify-between mb-3">
              <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" className="text-gold" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round">
                <path d={r.icon} />
              </svg>
              <div className="font-display text-gold/70" style={{ fontSize: 11, letterSpacing: "0.2em" }}>{r.n}</div>
            </div>
            <h3 className="font-display text-foreground" style={{ fontSize: "clamp(16px, 2.2vw, 20px)", fontWeight: 500, lineHeight: 1.2 }}>{r.t}</h3>
            <p className="mt-2 text-muted" style={{ fontSize: 13, lineHeight: 1.55 }}>{r.d}</p>
          </div>
        ))}
      </div>
      <CTAInline caption="Convaincu ? Recevez un devis personnalisé." />
    </section>
  );
}

/* ============ ZONE D'INTERVENTION ============ */
export function Zone() {
  return (
    <section className="relative bg-depth-b py-10 md:py-20 px-6 md:px-12 overflow-hidden">
      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-14 items-stretch">
        <div className="lg:col-span-4 flex flex-col justify-center">
          <div className="label text-gold">— Zone d'intervention</div>
          <h2 className="font-display mt-6 text-foreground" style={{ fontSize: "clamp(36px, 5vw, 72px)", fontWeight: 400, lineHeight: 1 }}>
            Jura & Ain,<br /><span className="italic text-gold">depuis Cize.</span>
          </h2>
          <p className="mt-8 text-muted" style={{ fontSize: 16, lineHeight: 1.75 }}>
            HCE intervient autour de Cize pour les cours, allées, parkings, travaux de terrassement et finitions extérieures.
          </p>
          <div className="mt-8 grid grid-cols-2 gap-3">
            {["Cize", "Lons-le-Saunier", "Champagnole", "Oyonnax", "Bourg-en-Bresse", "Saint-Claude"].map((city) => (
              <div key={city} className="border-l border-gold/40 pl-3 text-sm text-foreground/85">
                {city}
              </div>
            ))}
          </div>
        </div>
        <div className="lg:col-span-8 relative min-h-[420px] md:min-h-[560px] border border-border overflow-hidden bg-surface">
          <iframe
            src="https://www.google.com/maps?q=Cize,Jura,France&z=12&output=embed"
            className="absolute inset-0 w-full h-full"
            style={{ border: 0 }}
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
            title="Carte de Cize, Jura"
          />
        </div>
      </div>
    </section>
  );
}


/* ============ FAQ ============ */
export const FAQS = [
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
  const { get } = useSiteContent();
  const faqs = get("faqs", FAQS) as typeof FAQS;

  useEffect(() => {
    if (!ref.current) return;
    const items = ref.current.querySelectorAll("[data-faq]");
    items.forEach((el, i) => {
      gsap.fromTo(el,
        { x: -30, opacity: 0 },
        { x: 0, opacity: 1, duration: 0.7, delay: i * 0.06, ease: "power3.out",
          scrollTrigger: { trigger: el, start: "top 90%" } });
    });
  }, [faqs]);

  return (
    <section ref={ref} className="relative bg-depth-a py-10 md:py-20 px-6 md:px-12 overflow-hidden">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-20">
          <div className="label text-gold">— Questions fréquentes</div>
          <h2 className="font-display mt-6 text-foreground" style={{ fontSize: "clamp(40px, 6vw, 72px)", fontWeight: 400, lineHeight: 1 }}>
            Tout ce que vous<br /><span className="italic text-gold">devez savoir.</span>
          </h2>
        </div>

        <div className="space-y-px">
          {faqs.map((f, i) => {
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
        <div className="mt-12 text-center">
          <p className="text-muted mb-4" style={{ fontSize: 14 }}>
            Une autre question ? Posez-la nous directement.
          </p>
          <div className="flex flex-wrap gap-3 justify-center">
            <a
              href="#devis"
              data-cursor-hover
              className="cta-primary"
              style={{ fontFamily: "Outfit", fontSize: 13, fontWeight: 500, padding: "10px 20px", borderRadius: 4, background: "var(--cuivre-500)", color: "#fff", textDecoration: "none", transition: "all 0.2s ease", display: "inline-flex", alignItems: "center", gap: 6 }}
            >
              Envoyer ma demande →
            </a>
            <a
              href="tel:0384526148"
              data-cursor-hover
              className="cta-secondary"
              style={{ fontFamily: "Outfit", fontSize: 13, fontWeight: 500, padding: "10px 20px", borderRadius: 4, background: "transparent", color: "var(--creme-50)", border: "1px solid var(--creme-50)", textDecoration: "none", transition: "all 0.2s ease" }}
            >
              📞 Appeler
            </a>
          </div>
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
  const isMobile = useIsMobile();
  if (isMobile) return <QuoteFormMobile />;
  return <QuoteFormDesktop />;
}

function QuoteFormDesktop() {
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
    <section ref={sectionRef} id="devis" className="relative bg-depth-b py-10 md:py-20 px-6 md:px-12 overflow-hidden">
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
                        aria-label="Surface estimée en mètres carrés"
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
                      <label htmlFor="quote-message-desktop" className="label text-gold/80 block mb-2" style={{ fontSize: 10 }}>Message (optionnel)</label>
                      <textarea
                        id="quote-message-desktop"
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
  const id = useId();
  return (
    <div>
      <label htmlFor={id} className="label text-gold/80 block mb-2" style={{ fontSize: 10 }}>{label}</label>
      <input
        id={id}
        type={type}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="w-full bg-transparent border border-gold/30 px-4 py-3 text-foreground focus:outline-none focus:border-gold focus-visible:ring-1 focus-visible:ring-gold transition-colors"
        style={{ fontFamily: "Outfit", fontSize: 14 }}
      />
    </div>
  );
}

/* ============================================================
   QUOTE FORM — MOBILE VARIANT
   - one step per screen, full-width
   - single-select étapes : carousel swipe horizontal + auto-advance 400ms
   - multi-input : formulaire empilé + bouton Suivant
   - sticky top : indicateur de progression (4 dots)
   - sticky bottom : estimation indicative compacte
   - retour ← top-left, slide horizontal entre étapes
   ============================================================ */
function QuoteFormMobile() {
  const [step, setStep] = useState(0);
  const [direction, setDirection] = useState<1 | -1>(1);
  const [data, setData] = useState<Quote>({
    type: "", surface: 100, delai: "", nom: "", email: "", tel: "", ville: "", message: "",
  });

  const { min, max } = useMemo(() => {
    const opt = TYPE_OPTIONS.find((o) => o.id === data.type);
    if (!opt || !data.surface) return { min: 0, max: 0 };
    const coef = data.delai ? DELAI_COEF[data.delai] : 1;
    const base = opt.price * data.surface * coef;
    return { min: Math.round(base * 0.9 / 100) * 100, max: Math.round(base * 1.2 / 100) * 100 };
  }, [data.type, data.surface, data.delai]);

  const goNext = () => { setDirection(1); setStep((s) => Math.min(3, s + 1)); };
  const goBack = () => { setDirection(-1); setStep((s) => Math.max(0, s - 1)); };

  const submit = () => {
    const opt = TYPE_OPTIONS.find((o) => o.id === data.type);
    const body = encodeURIComponent(
      `Demande de devis HCE\n\n` +
      `Type : ${opt?.label}\nSurface : ${data.surface} m²\nDélai : ${data.delai}\n` +
      `Estimation : ${min.toLocaleString("fr-FR")} – ${max.toLocaleString("fr-FR")} € HT\n\n` +
      `Nom : ${data.nom}\nEmail : ${data.email}\nTél : ${data.tel}\nVille : ${data.ville}\n\nMessage :\n${data.message}`
    );
    window.location.href = `mailto:sarl.hce@laposte.net?subject=${encodeURIComponent("Demande de devis — " + (opt?.label ?? ""))}&body=${body}`;
  };

  // auto-advance helpers (400ms after a single-select tap)
  const autoAdvance = (delay = 400) => {
    setTimeout(() => goNext(), delay);
  };

  const TOTAL = 4;
  const stepLabel = ["Projet", "Surface", "Délai", "Coordonnées"][step];
  const canSubmit = !!(data.nom && data.email && data.tel);

  const variants = {
    enter: (dir: 1 | -1) => ({ x: dir * 60, opacity: 0 }),
    center: { x: 0, opacity: 1 },
    exit: (dir: 1 | -1) => ({ x: dir * -60, opacity: 0 }),
  };

  return (
    <section id="devis" className="relative bg-background pt-10 pb-40 overflow-hidden">
      {/* sticky top: progress + back */}
      <div
        className="sticky top-0 z-30 bg-background/95 backdrop-blur-sm border-b border-gold/20 px-5 py-4 flex items-center gap-4"
      >
        <button
          onClick={goBack}
          disabled={step === 0}
          aria-label="Étape précédente"
          className="w-11 h-11 -ml-2 flex items-center justify-center text-gold disabled:opacity-25 transition-opacity"
          style={{ fontSize: 22 }}
        >
          ←
        </button>
        <div className="flex-1">
          <div className="label text-gold/70" style={{ fontSize: 9 }}>Étape {step + 1} / {TOTAL}</div>
          <div className="font-display text-foreground mt-0.5" style={{ fontSize: 16, fontWeight: 400 }}>{stepLabel}</div>
        </div>
        <div className="flex gap-1.5" aria-hidden>
          {Array.from({ length: TOTAL }).map((_, i) => (
            <span
              key={i}
              className="block rounded-full transition-all duration-500"
              style={{
                width: i === step ? 22 : 6, height: 6,
                background: i <= step ? "#C8992A" : "rgba(200,153,42,0.25)",
              }}
            />
          ))}
        </div>
      </div>

      <div className="px-5 pt-10 pb-8 min-h-[60vh]">
        <div className="text-center mb-8">
          <div className="label text-gold">— Demande de devis</div>
          <h2 className="font-display mt-4 text-foreground" style={{ fontSize: 36, fontWeight: 400, lineHeight: 1 }}>
            Estimez votre projet<br/><span className="italic text-gold">en 90 sec.</span>
          </h2>
        </div>

        <div className="relative overflow-hidden">
          <AnimatePresence mode="wait" custom={direction}>
            <motion.div
              key={step}
              custom={direction}
              variants={variants}
              initial="enter"
              animate="center"
              exit="exit"
              transition={{ duration: 0.3, ease: [0.4, 0, 0.2, 1] }}
            >
              {step === 0 && (
                <SwipeOptions
                  ariaLabel="Type de projet"
                  options={TYPE_OPTIONS.map((o) => ({
                    id: o.id, title: o.label, sub: o.desc, foot: `à partir de ${o.price} €/m²`, icon: o.icon,
                  }))}
                  selected={data.type}
                  onSelect={(id) => { setData({ ...data, type: id as Quote["type"] }); autoAdvance(); }}
                />
              )}

              {step === 1 && (
                <div className="px-2">
                  <h3 className="font-display text-foreground mb-2" style={{ fontSize: 22, fontWeight: 400 }}>Surface estimée</h3>
                  <p className="text-muted mb-8" style={{ fontSize: 13 }}>Approximative, nous affinerons sur place.</p>
                  <div className="text-center mb-8">
                    <div className="font-display text-gold inline-flex items-baseline gap-2" style={{ fontSize: 72, lineHeight: 1, fontWeight: 400 }}>
                      {data.surface}<span className="label" style={{ fontSize: 14 }}>m²</span>
                    </div>
                  </div>
                  <input
                    type="range" min={20} max={1000} step={10} value={data.surface}
                    onChange={(e) => setData({ ...data, surface: Number(e.target.value) })}
                    className="w-full accent-[#C8992A]"
                    style={{ minHeight: 44 }}
                    aria-label="Surface en mètres carrés"
                  />
                  <div className="flex justify-between text-muted mt-2" style={{ fontSize: 11 }}>
                    <span>20 m²</span><span>1000 m²</span>
                  </div>
                  <button
                    onClick={goNext}
                    className="w-full mt-12 bg-gold text-background py-4 font-medium"
                    style={{ fontFamily: "Outfit", fontSize: 13, letterSpacing: "0.15em", textTransform: "uppercase", minHeight: 56 }}
                  >
                    Continuer →
                  </button>
                </div>
              )}

              {step === 2 && (
                <SwipeOptions
                  ariaLabel="Délai souhaité"
                  options={[
                    { id: "souple", title: "Flexible", sub: "Date libre" },
                    { id: "1mois", title: "Sous 1 mois", sub: "Planning serré" },
                    { id: "urgent", title: "Urgent", sub: "Sous 2 semaines" },
                  ]}
                  selected={data.delai}
                  onSelect={(id) => { setData({ ...data, delai: id as Quote["delai"] }); autoAdvance(); }}
                />
              )}

              {step === 3 && (
                <div className="space-y-4 px-2">
                  <h3 className="font-display text-foreground mb-2" style={{ fontSize: 22, fontWeight: 400 }}>Vos coordonnées</h3>
                  <p className="text-muted mb-6" style={{ fontSize: 13 }}>On vous rappelle sous 48h.</p>
                  <Input label="Nom complet *" value={data.nom} onChange={(v) => setData({ ...data, nom: v })} />
                  <Input label="Téléphone *" value={data.tel} onChange={(v) => setData({ ...data, tel: v })} />
                  <Input label="Email *" value={data.email} onChange={(v) => setData({ ...data, email: v })} type="email" />
                  <Input label="Ville" value={data.ville} onChange={(v) => setData({ ...data, ville: v })} />
                  <div>
                    <label htmlFor="quote-message-mobile" className="label text-gold/80 block mb-2" style={{ fontSize: 10 }}>Message (optionnel)</label>
                    <textarea
                      id="quote-message-mobile"
                      rows={3}
                      value={data.message}
                      onChange={(e) => setData({ ...data, message: e.target.value })}
                      className="w-full bg-transparent border border-gold/30 px-4 py-3 text-foreground focus:outline-none focus:border-gold transition-colors"
                      style={{ fontFamily: "Outfit", fontSize: 14 }}
                    />
                  </div>
                  <button
                    onClick={submit}
                    disabled={!canSubmit}
                    className="w-full mt-6 bg-gold text-background py-4 font-medium disabled:opacity-40"
                    style={{ fontFamily: "Outfit", fontSize: 13, letterSpacing: "0.15em", textTransform: "uppercase", minHeight: 56, boxShadow: "0 8px 24px rgba(200,153,42,0.35)" }}
                  >
                    Envoyer ma demande →
                  </button>
                </div>
              )}
            </motion.div>
          </AnimatePresence>
        </div>
      </div>

      {/* sticky bottom estimate */}
      {data.type && (
        <div
          className="fixed bottom-0 left-0 right-0 z-30 bg-surface border-t border-gold/40 px-5 py-3"
          style={{ boxShadow: "0 -8px 24px rgba(0,0,0,0.5)" }}
        >
          <div className="flex items-baseline justify-between gap-3">
            <div>
              <div className="label text-gold/70" style={{ fontSize: 9 }}>Estimation indicative</div>
              <div className="font-display text-gold mt-0.5" style={{ fontSize: 28, lineHeight: 1, fontWeight: 400 }}>
                {min.toLocaleString("fr-FR")}–{max.toLocaleString("fr-FR")} <span style={{ fontSize: 14 }}>€ HT</span>
              </div>
            </div>
            <div className="text-right text-muted" style={{ fontSize: 10, lineHeight: 1.3 }}>
              {data.surface} m²<br/>{data.delai && (data.delai === "souple" ? "Flexible" : data.delai === "1mois" ? "Sous 1 mois" : "Urgent")}
            </div>
          </div>
        </div>
      )}
    </section>
  );
}

/**
 * SwipeOptions — carousel horizontal scroll-snap façon iOS.
 * Tap = sélection ; auto-advance déclenché par le parent.
 */
function SwipeOptions({
  options, selected, onSelect, ariaLabel,
}: {
  options: { id: string; title: string; sub: string; foot?: string; icon?: string }[];
  selected: string;
  onSelect: (id: string) => void;
  ariaLabel: string;
}) {
  const trackRef = useRef<HTMLDivElement>(null);
  const [active, setActive] = useState(0);

  useEffect(() => {
    const el = trackRef.current;
    if (!el) return;
    const onScroll = () => {
      const w = el.clientWidth;
      const idx = Math.round(el.scrollLeft / w);
      setActive(idx);
    };
    el.addEventListener("scroll", onScroll, { passive: true });
    return () => el.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <div role="group" aria-label={ariaLabel}>
      <div
        ref={trackRef}
        className="flex overflow-x-auto snap-x snap-mandatory -mx-5 px-5 gap-4 pb-2"
        style={{ scrollbarWidth: "none" }}
      >
        {options.map((o) => {
          const isSel = selected === o.id;
          return (
            <button
              key={o.id}
              type="button"
              onClick={() => onSelect(o.id)}
              className={`snap-center shrink-0 w-[80vw] max-w-[340px] text-left p-7 bg-surface border transition-all duration-300 ${isSel ? "border-gold border-2" : "border-border"}`}
              style={{
                minHeight: 220,
                boxShadow: isSel ? "0 12px 28px rgba(200,153,42,0.18)" : "0 4px 12px rgba(0,0,0,0.4)",
              }}
            >
              <span aria-hidden className={`absolute top-0 left-0 w-[3px] h-full bg-gold origin-top transition-transform duration-500 ${isSel ? "scale-y-100" : "scale-y-0"}`} />
              {o.icon && (
                <svg width="44" height="44" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.2" className="text-gold mb-5">
                  <path d={o.icon} strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              )}
              <div className="font-display text-foreground" style={{ fontSize: 22, fontWeight: 400 }}>{o.title}</div>
              <div className="text-muted mt-2" style={{ fontSize: 13, lineHeight: 1.5 }}>{o.sub}</div>
              {o.foot && <div className="label text-gold mt-5" style={{ fontSize: 10 }}>{o.foot}</div>}
            </button>
          );
        })}
      </div>
      <div className="flex justify-center gap-2 mt-5" aria-hidden>
        {options.map((_, i) => (
          <span
            key={i}
            className="block w-1.5 h-1.5 rounded-full transition-all duration-300"
            style={{ background: i === active ? "#C8992A" : "rgba(200,153,42,0.3)", transform: i === active ? "scale(1.4)" : "scale(1)" }}
          />
        ))}
      </div>
      <p className="text-center label text-gold/50 mt-4" style={{ fontSize: 9 }}>Tapez sur une carte pour valider</p>
    </div>
  );
}
