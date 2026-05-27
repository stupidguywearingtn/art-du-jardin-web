import { useEffect, useRef, useState, useMemo, useId } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { motion, AnimatePresence } from "framer-motion";
import { toast } from "sonner";
import { useIsMobile } from "@/hooks/use-mobile";
import { CTAInline } from "@/components/CTAButtons";
import { useSiteContent } from "@/hooks/useSiteContent";
import { useProjectTypes, type ProjectType } from "@/hooks/useProjectTypes";
import { supabase } from "@/integrations/supabase/client";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

/* ============ POURQUOI NOUS CHOISIR ============ */
const REASONS = [
  { n: "01", t: "Enrobé à chaud", d: "Pose à la main à 180°C, compactage maîtrisé pour une durabilité maximale.", icon: "M8 20s-3-3-3-7a7 7 0 0 1 7-7c0 3-2 4-2 7a3 3 0 0 0 6 0c0 4-3 7-8 7Z" },
  { n: "02", t: "1000+ chantiers", d: "Plus de 1000 chantiers réalisés dans le Jura et l'Ain depuis 2012, 14 années d'expérience.", icon: "M12 2l2.4 5 5.6.8-4 3.9 1 5.5L12 14.8 6.9 17.2l1-5.5-4-3.9L9.6 7Z" },
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
              style={{ fontFamily: "var(--font-body)", fontSize: 13, fontWeight: 500, padding: "10px 20px", borderRadius: 4, background: "var(--cuivre-500)", color: "#fff", textDecoration: "none", transition: "all 0.2s ease", display: "inline-flex", alignItems: "center", gap: 6 }}
            >
              Envoyer ma demande →
            </a>
            <a
              href="tel:0384526148"
              data-cursor-hover
              className="cta-secondary"
              style={{ fontFamily: "var(--font-body)", fontSize: 13, fontWeight: 500, padding: "10px 20px", borderRadius: 4, background: "transparent", color: "var(--creme-50)", border: "1px solid var(--creme-50)", textDecoration: "none", transition: "all 0.2s ease" }}
            >
              📞 Appeler
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ============ DEVIS MULTI-STEP (sans total calculé) ============
   Brief 8 :
   - GARDER « à partir de X €/m² » sur chaque carte (éditable côté admin).
   - SUPPRIMER tout total / fourchette : pas de surface × prix.
   - Étape 1 : choix carte. Étape 2 : longueur×largeur → surface estimée
     (ou case "Je ne connais pas les dimensions" + texte libre).
   - Étape 3 : coordonnées. Écran final : confirmation, aucun montant.
   - Submit : insertion dans devis_requests.
============================================================ */

type QuoteData = {
  typeSlug: string;
  typeLabel: string;
  length: string;
  width: string;
  freeDimensions: string;
  knowsDimensions: boolean;
  nom: string;
  email: string;
  tel: string;
  ville: string;
  postalCode: string;
  message: string;
};

const EMPTY_QUOTE: QuoteData = {
  typeSlug: "",
  typeLabel: "",
  length: "",
  width: "",
  freeDimensions: "",
  knowsDimensions: true,
  nom: "",
  email: "",
  tel: "",
  ville: "",
  postalCode: "",
  message: "",
};

const TYPE_ICONS: Record<string, string> = {
  cour: "M3 12 12 4l9 8M5 10v10h14V10",
  allee: "M4 20 14 4M10 20 20 4",
  parking: "M4 17V7a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v10M4 17h16M8 21v-4M16 21v-4",
  preparation: "M3 19h18M6 16l3-9 3 4 3-7 3 12",
};

function computeSurface(q: QuoteData): number | null {
  if (!q.knowsDimensions) return null;
  const l = parseFloat(q.length.replace(",", "."));
  const w = parseFloat(q.width.replace(",", "."));
  if (!isFinite(l) || !isFinite(w) || l <= 0 || w <= 0) return null;
  return Math.round(l * w * 10) / 10;
}

async function submitDevis(q: QuoteData): Promise<boolean> {
  const surface = computeSurface(q);
  const { error } = await supabase.from("devis_requests").insert({
    project_type_slug: q.typeSlug || null,
    project_type_label: q.typeLabel || null,
    length_m: q.knowsDimensions && q.length ? parseFloat(q.length.replace(",", ".")) : null,
    width_m: q.knowsDimensions && q.width ? parseFloat(q.width.replace(",", ".")) : null,
    estimated_surface_m2: surface,
    free_dimensions: q.knowsDimensions ? null : (q.freeDimensions || null),
    description: q.message || null,
    name: q.nom,
    phone: q.tel,
    email: q.email,
    postal_code: q.postalCode || null,
    city: q.ville || null,
  });
  if (error) {
    toast.error(`Erreur : ${error.message}`);
    return false;
  }
  // Notification email (fire-and-forget — un edge function Supabase peut être branché plus tard)
  try {
    const surfaceStr = surface !== null ? `${surface} m²` : (q.freeDimensions || "non précisée");
    const body = encodeURIComponent(
      `Demande de devis HCE\n\nType : ${q.typeLabel}\nSurface estimée : ${surfaceStr}\n\n` +
      `Nom : ${q.nom}\nEmail : ${q.email}\nTél : ${q.tel}\nVille : ${q.ville}\nCP : ${q.postalCode}\n\n` +
      `Message :\n${q.message}`
    );
    // Mailto fallback ouvert dans un nouvel onglet pour notifier sarl.hce@laposte.net
    const subject = encodeURIComponent(`Nouvelle demande de devis — ${q.typeLabel || "HCE"}`);
    window.open(`mailto:sarl.hce@laposte.net?subject=${subject}&body=${body}`, "_blank");
  } catch {
    // ignore
  }
  return true;
}

export function QuoteForm() {
  const isMobile = useIsMobile();
  if (isMobile) return <QuoteFormMobile />;
  return <QuoteFormDesktop />;
}

function QuoteFormDesktop() {
  const [step, setStep] = useState(0);
  const [data, setData] = useState<QuoteData>(EMPTY_QUOTE);
  const [submitted, setSubmitted] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const sectionRef = useRef<HTMLDivElement>(null);
  const { items: types } = useProjectTypes();

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

  const surface = useMemo(() => computeSurface(data), [data]);

  const canNext = useMemo(() => {
    if (step === 0) return data.typeSlug !== "";
    if (step === 1) {
      if (!data.knowsDimensions) return data.freeDimensions.trim().length > 0;
      return surface !== null;
    }
    if (step === 2) return !!(data.nom && data.email && data.tel);
    return false;
  }, [step, data, surface]);

  const handleSubmit = async () => {
    if (submitting) return;
    setSubmitting(true);
    const ok = await submitDevis(data);
    setSubmitting(false);
    if (ok) {
      setSubmitted(true);
      toast.success("Demande envoyée");
    }
  };

  const STEPS = ["Projet", "Dimensions", "Coordonnées"];
  const selectedType = types.find((t) => t.slug === data.typeSlug);

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

        {submitted ? (
          <SubmittedScreen onReset={() => { setData(EMPTY_QUOTE); setStep(0); setSubmitted(false); }} />
        ) : (
          <>
            {/* progress */}
            <div className="flex items-center gap-3 mb-12 max-w-2xl mx-auto" data-reveal>
              {STEPS.map((s, i) => (
                <div key={s} className="flex-1 flex items-center gap-3">
                  <div
                    className="flex items-center justify-center w-8 h-8 border transition-all duration-500"
                    style={{
                      borderColor: i <= step ? "var(--cuivre-500)" : "rgb(200 153 42 / 0.3)",
                      background: i < step ? "var(--cuivre-500)" : "transparent",
                      color: i < step ? "var(--asphalte-900)" : "var(--cuivre-500)",
                      fontFamily: "var(--font-body)", fontSize: 13,
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
                          {types.map((o) => {
                            const sel = data.typeSlug === o.slug;
                            const icon = TYPE_ICONS[o.slug] ?? TYPE_ICONS.cour;
                            return (
                              <SelectCard
                                key={o.id}
                                selected={sel}
                                onClick={() => setData({ ...data, typeSlug: o.slug, typeLabel: o.label })}
                              >
                                <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.2" className="text-gold mb-5 transition-all duration-300 group-hover:text-[var(--sable-500)]">
                                  <path d={icon} strokeLinecap="round" strokeLinejoin="round" />
                                </svg>
                                <div className="font-display text-foreground" style={{ fontSize: 22, fontWeight: 400, letterSpacing: "-0.01em" }}>{o.label}</div>
                                {o.description && <div className="text-muted mt-2" style={{ fontSize: 13, lineHeight: 1.5 }}>{o.description}</div>}
                                {o.show_price && o.price_from !== null && (
                                  <div className="label text-gold mt-5" style={{ fontSize: 10 }}>
                                    à partir de {o.price_from} {o.price_unit}
                                  </div>
                                )}
                              </SelectCard>
                            );
                          })}
                        </div>
                      </div>
                    )}

                    {step === 1 && (
                      <div className="space-y-8">
                        <div>
                          <h3 className="font-display text-foreground mb-2" style={{ fontSize: 28, fontWeight: 400 }}>Dimensions de la surface</h3>
                          <p className="text-muted mb-6" style={{ fontSize: 14 }}>Approximatives, nous affinerons sur place.</p>
                          {data.knowsDimensions ? (
                            <>
                              <div className="grid grid-cols-2 gap-5">
                                <DimInput label="Longueur (m)" value={data.length} onChange={(v) => setData({ ...data, length: v })} />
                                <DimInput label="Largeur (m)" value={data.width} onChange={(v) => setData({ ...data, width: v })} />
                              </div>
                              {surface !== null && (
                                <div className="mt-8 p-5 border border-gold/30 bg-surface">
                                  <div className="label text-gold/80" style={{ fontSize: 10 }}>— Surface estimée</div>
                                  <div className="font-display text-gold mt-2 flex items-baseline gap-2" style={{ fontSize: 44, lineHeight: 1 }}>
                                    ~{surface}<span style={{ fontSize: 18 }}>m²</span>
                                  </div>
                                </div>
                              )}
                            </>
                          ) : (
                            <div>
                              <label htmlFor="free-dim-desktop" className="label text-gold/80 block mb-2" style={{ fontSize: 10 }}>Décrivez le projet (libre)</label>
                              <textarea
                                id="free-dim-desktop"
                                rows={4}
                                placeholder="Ex : grande cour devant la maison + petite allée latérale, environ 200 m² au total mais à confirmer."
                                value={data.freeDimensions}
                                onChange={(e) => setData({ ...data, freeDimensions: e.target.value })}
                                className="w-full bg-transparent border border-gold/30 px-4 py-3 text-foreground placeholder:text-muted focus:outline-none focus:border-gold transition-colors"
                                style={{ fontFamily: "var(--font-body)", fontSize: 14 }}
                              />
                            </div>
                          )}
                          <label className="mt-6 inline-flex items-center gap-2 cursor-pointer text-foreground/80" style={{ fontSize: 13 }}>
                            <input
                              type="checkbox"
                              checked={!data.knowsDimensions}
                              onChange={(e) => setData({ ...data, knowsDimensions: !e.target.checked })}
                              className="accent-[var(--cuivre-500)] w-4 h-4"
                            />
                            Je ne connais pas les dimensions
                          </label>
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
                          <Input label="Code postal" value={data.postalCode} onChange={(v) => setData({ ...data, postalCode: v })} />
                        </div>
                        <div>
                          <label htmlFor="quote-message-desktop" className="label text-gold/80 block mb-2" style={{ fontSize: 10 }}>Message (optionnel)</label>
                          <textarea
                            id="quote-message-desktop"
                            rows={4}
                            value={data.message}
                            onChange={(e) => setData({ ...data, message: e.target.value })}
                            className="w-full bg-transparent border border-gold/30 px-4 py-3 text-foreground focus:outline-none focus:border-gold transition-colors"
                            style={{ fontFamily: "var(--font-body)", fontSize: 14 }}
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
                      className="bg-gold text-background px-8 py-3 transition-all hover:bg-[var(--cuivre-600)] hover:-translate-y-0.5 focus-visible:ring-2 focus-visible:ring-gold focus-visible:ring-offset-2 focus-visible:ring-offset-background disabled:opacity-40 disabled:cursor-not-allowed"
                      style={{ fontFamily: "var(--font-body)", fontSize: 13, letterSpacing: "0.15em", textTransform: "uppercase" }}
                    >
                      Continuer →
                    </button>
                  ) : (
                    <button
                      data-cursor-hover
                      onClick={handleSubmit}
                      disabled={!canNext || submitting}
                      className="bg-gold text-background px-10 transition-all hover:bg-[var(--cuivre-600)] hover:-translate-y-1 focus-visible:ring-2 focus-visible:ring-gold focus-visible:ring-offset-2 focus-visible:ring-offset-background disabled:opacity-40 disabled:cursor-not-allowed"
                      style={{ fontFamily: "var(--font-body)", fontSize: 14, letterSpacing: "0.15em", textTransform: "uppercase", height: 56, fontWeight: 500, boxShadow: "0 8px 24px rgba(200,153,42,0.35)" }}
                    >
                      {submitting ? "Envoi…" : "Envoyer ma demande →"}
                    </button>
                  )}
                </div>
              </div>

              {/* récap — pas de prix calculé */}
              <aside className="relative">
                <div className="sticky top-8 relative bg-surface border border-gold/40 p-8 overflow-hidden" style={{ boxShadow: "0 8px 32px rgba(0,0,0,0.4), 0 0 0 1px rgba(200,153,42,0.1)" }}>
                  <span aria-hidden className="absolute top-0 left-0 w-1 h-full bg-gold" />
                  <div className="label text-gold mb-6" style={{ fontSize: 10 }}>— Récapitulatif</div>

                  {selectedType ? (
                    <>
                      <div className="font-display text-foreground" style={{ fontSize: 16 }}>
                        {selectedType.label}
                      </div>
                      {selectedType.show_price && selectedType.price_from !== null && (
                        <div className="label text-gold mt-2" style={{ fontSize: 10 }}>
                          à partir de {selectedType.price_from} {selectedType.price_unit}
                        </div>
                      )}
                      {(surface !== null || (!data.knowsDimensions && data.freeDimensions)) && (
                        <div className="mt-6">
                          <div className="label text-gold/70" style={{ fontSize: 9 }}>Surface</div>
                          <div className="text-foreground mt-1" style={{ fontSize: 14 }}>
                            {surface !== null ? `~${surface} m²` : "À évaluer sur place"}
                          </div>
                        </div>
                      )}

                      <div className="h-px bg-gold/20 my-6" />
                      <p className="text-muted italic font-display" style={{ fontSize: 12, lineHeight: 1.5 }}>
                        Devis détaillé établi après visite gratuite. Aucun montant n'est calculé automatiquement.
                      </p>
                    </>
                  ) : (
                    <div className="text-muted italic font-display" style={{ fontSize: 14, lineHeight: 1.6 }}>
                      Sélectionnez un type de projet pour commencer.
                    </div>
                  )}
                </div>
              </aside>
            </div>
          </>
        )}
      </div>
    </section>
  );
}

function SubmittedScreen({ onReset }: { onReset: () => void }) {
  return (
    <div className="max-w-2xl mx-auto text-center py-10">
      <div className="inline-flex items-center justify-center w-16 h-16 rounded-full mb-6" style={{ background: "var(--cuivre-500)" }}>
        <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
          <path d="M5 12l5 5L20 7" />
        </svg>
      </div>
      <h3 className="font-display text-foreground" style={{ fontSize: "clamp(28px, 4vw, 44px)", fontWeight: 400, lineHeight: 1.1 }}>
        Votre demande a bien été envoyée.
      </h3>
      <p className="mt-6 text-muted max-w-md mx-auto" style={{ fontSize: 16, lineHeight: 1.6 }}>
        Nous revenons vers vous sous 48h pour planifier la visite gratuite et établir un devis détaillé.
      </p>
      <button
        onClick={onReset}
        className="mt-10 label text-gold border-b border-gold/40 pb-1 hover:border-gold transition-colors"
        style={{ fontSize: 11 }}
      >
        Faire une nouvelle demande →
      </button>
    </div>
  );
}

function DimInput({ label, value, onChange }: { label: string; value: string; onChange: (v: string) => void }) {
  const id = useId();
  return (
    <div>
      <label htmlFor={id} className="label text-gold/80 block mb-2" style={{ fontSize: 10 }}>{label}</label>
      <input
        id={id}
        type="text"
        inputMode="decimal"
        value={value}
        placeholder="0"
        onChange={(e) => onChange(e.target.value)}
        className="w-full bg-transparent border border-gold/30 px-4 py-3 text-foreground focus:outline-none focus:border-gold transition-colors"
        style={{ fontFamily: "var(--font-body)", fontSize: 16 }}
      />
    </div>
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
        style={{ fontFamily: "var(--font-body)", fontSize: 14 }}
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
  const [data, setData] = useState<QuoteData>(EMPTY_QUOTE);
  const [submitted, setSubmitted] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const { items: types } = useProjectTypes();

  const surface = useMemo(() => computeSurface(data), [data]);

  const goNext = () => { setDirection(1); setStep((s) => Math.min(2, s + 1)); };
  const goBack = () => { setDirection(-1); setStep((s) => Math.max(0, s - 1)); };

  const autoAdvance = (delay = 400) => setTimeout(() => goNext(), delay);

  const handleSubmit = async () => {
    if (submitting) return;
    setSubmitting(true);
    const ok = await submitDevis(data);
    setSubmitting(false);
    if (ok) {
      setSubmitted(true);
      toast.success("Demande envoyée");
    }
  };

  const TOTAL = 3;
  const stepLabel = ["Projet", "Dimensions", "Coordonnées"][step];
  const canSubmitFinal = !!(data.nom && data.email && data.tel);

  const variants = {
    enter: (dir: 1 | -1) => ({ x: dir * 60, opacity: 0 }),
    center: { x: 0, opacity: 1 },
    exit: (dir: 1 | -1) => ({ x: dir * -60, opacity: 0 }),
  };

  if (submitted) {
    return (
      <section id="devis" className="relative bg-background pt-16 pb-24 px-5">
        <SubmittedScreen onReset={() => { setData(EMPTY_QUOTE); setStep(0); setSubmitted(false); }} />
      </section>
    );
  }

  return (
    <section id="devis" className="relative bg-background pt-10 pb-24 overflow-hidden">
      {/* sticky top: progress + back */}
      <div className="sticky top-0 z-30 bg-background/95 backdrop-blur-sm border-b border-gold/20 px-5 py-4 flex items-center gap-4">
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
                background: i <= step ? "var(--cuivre-500)" : "rgba(200,153,42,0.25)",
              }}
            />
          ))}
        </div>
      </div>

      <div className="px-5 pt-10 pb-8 min-h-[60vh]">
        <div className="text-center mb-8">
          <div className="label text-gold">— Demande de devis</div>
          <h2 className="font-display mt-4 text-foreground" style={{ fontSize: 36, fontWeight: 400, lineHeight: 1 }}>
            Estimez votre projet<br /><span className="italic text-gold">en 90 sec.</span>
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
                  options={types.map((o) => ({
                    id: o.slug,
                    title: o.label,
                    sub: o.description ?? "",
                    foot: o.show_price && o.price_from !== null ? `à partir de ${o.price_from} ${o.price_unit}` : undefined,
                    icon: TYPE_ICONS[o.slug] ?? TYPE_ICONS.cour,
                  }))}
                  selected={data.typeSlug}
                  onSelect={(id) => {
                    const t = types.find((x) => x.slug === id);
                    setData({ ...data, typeSlug: id, typeLabel: t?.label ?? "" });
                    autoAdvance();
                  }}
                />
              )}

              {step === 1 && (
                <div className="px-2">
                  <h3 className="font-display text-foreground mb-2" style={{ fontSize: 22, fontWeight: 400 }}>Dimensions</h3>
                  <p className="text-muted mb-6" style={{ fontSize: 13 }}>Approximatives, nous affinerons sur place.</p>
                  {data.knowsDimensions ? (
                    <>
                      <div className="grid grid-cols-2 gap-4">
                        <DimInput label="Longueur (m)" value={data.length} onChange={(v) => setData({ ...data, length: v })} />
                        <DimInput label="Largeur (m)" value={data.width} onChange={(v) => setData({ ...data, width: v })} />
                      </div>
                      {surface !== null && (
                        <div className="mt-6 p-4 border border-gold/30 bg-surface text-center">
                          <div className="label text-gold/80" style={{ fontSize: 9 }}>— Surface estimée</div>
                          <div className="font-display text-gold mt-1 inline-flex items-baseline gap-1" style={{ fontSize: 40, lineHeight: 1 }}>
                            ~{surface}<span style={{ fontSize: 16 }}>m²</span>
                          </div>
                        </div>
                      )}
                    </>
                  ) : (
                    <div>
                      <label htmlFor="free-dim-mobile" className="label text-gold/80 block mb-2" style={{ fontSize: 10 }}>Décrivez le projet</label>
                      <textarea
                        id="free-dim-mobile"
                        rows={4}
                        placeholder="Ex : grande cour devant la maison + petite allée latérale."
                        value={data.freeDimensions}
                        onChange={(e) => setData({ ...data, freeDimensions: e.target.value })}
                        className="w-full bg-transparent border border-gold/30 px-4 py-3 text-foreground placeholder:text-muted focus:outline-none focus:border-gold transition-colors"
                        style={{ fontFamily: "var(--font-body)", fontSize: 14 }}
                      />
                    </div>
                  )}
                  <label className="mt-4 inline-flex items-center gap-2 cursor-pointer text-foreground/80" style={{ fontSize: 13 }}>
                    <input
                      type="checkbox"
                      checked={!data.knowsDimensions}
                      onChange={(e) => setData({ ...data, knowsDimensions: !e.target.checked })}
                      className="accent-[var(--cuivre-500)] w-4 h-4"
                    />
                    Je ne connais pas les dimensions
                  </label>
                  <button
                    onClick={goNext}
                    disabled={data.knowsDimensions ? surface === null : !data.freeDimensions.trim()}
                    className="w-full mt-8 bg-gold text-background py-4 font-medium disabled:opacity-40"
                    style={{ fontFamily: "var(--font-body)", fontSize: 13, letterSpacing: "0.15em", textTransform: "uppercase", minHeight: 56 }}
                  >
                    Continuer →
                  </button>
                </div>
              )}

              {step === 2 && (
                <div className="space-y-4 px-2">
                  <h3 className="font-display text-foreground mb-2" style={{ fontSize: 22, fontWeight: 400 }}>Vos coordonnées</h3>
                  <p className="text-muted mb-6" style={{ fontSize: 13 }}>On vous rappelle sous 48h.</p>
                  <Input label="Nom complet *" value={data.nom} onChange={(v) => setData({ ...data, nom: v })} />
                  <Input label="Téléphone *" value={data.tel} onChange={(v) => setData({ ...data, tel: v })} />
                  <Input label="Email *" value={data.email} onChange={(v) => setData({ ...data, email: v })} type="email" />
                  <Input label="Ville" value={data.ville} onChange={(v) => setData({ ...data, ville: v })} />
                  <Input label="Code postal" value={data.postalCode} onChange={(v) => setData({ ...data, postalCode: v })} />
                  <div>
                    <label htmlFor="quote-message-mobile" className="label text-gold/80 block mb-2" style={{ fontSize: 10 }}>Message (optionnel)</label>
                    <textarea
                      id="quote-message-mobile"
                      rows={3}
                      value={data.message}
                      onChange={(e) => setData({ ...data, message: e.target.value })}
                      className="w-full bg-transparent border border-gold/30 px-4 py-3 text-foreground focus:outline-none focus:border-gold transition-colors"
                      style={{ fontFamily: "var(--font-body)", fontSize: 14 }}
                    />
                  </div>
                  <button
                    onClick={handleSubmit}
                    disabled={!canSubmitFinal || submitting}
                    className="w-full mt-6 bg-gold text-background py-4 font-medium disabled:opacity-40"
                    style={{ fontFamily: "var(--font-body)", fontSize: 13, letterSpacing: "0.15em", textTransform: "uppercase", minHeight: 56, boxShadow: "0 8px 24px rgba(200,153,42,0.35)" }}
                  >
                    {submitting ? "Envoi…" : "Envoyer ma demande →"}
                  </button>
                </div>
              )}
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
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
            style={{ background: i === active ? "var(--cuivre-500)" : "rgba(200,153,42,0.3)", transform: i === active ? "scale(1.4)" : "scale(1)" }}
          />
        ))}
      </div>
      <p className="text-center label text-gold/50 mt-4" style={{ fontSize: 9 }}>Tapez sur une carte pour valider</p>
    </div>
  );
}
