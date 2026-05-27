import { useEffect, useState, useRef } from "react";

const PHONE = "0384526148";
const PHONE_DISPLAY = "03 84 52 61 48";

const baseStyle: React.CSSProperties = {
  fontFamily: "var(--font-body)",
  fontSize: 15,
  letterSpacing: "0.02em",
  fontWeight: 500,
  borderRadius: 6,
  padding: "0.85rem 1.75rem",
  display: "inline-flex",
  alignItems: "center",
  justifyContent: "center",
  gap: 8,
  transition: "all 200ms ease",
  textDecoration: "none",
  whiteSpace: "nowrap",
};

type CTAProps = { children?: React.ReactNode; href?: string; className?: string; compact?: boolean; invert?: boolean };

export function CTAPrimary({ children = "Demander un devis", href = "#devis", className = "", compact = false, invert = false }: CTAProps) {
  const style: React.CSSProperties = {
    ...baseStyle,
    padding: compact ? "0.6rem 1.25rem" : baseStyle.padding,
    fontSize: compact ? 13 : "0.95rem",
    background: invert
      ? "linear-gradient(135deg, #f4efe6 0%, #eae3d6 100%)"
      : "linear-gradient(135deg, #a06b48 0%, #8a5a3a 100%)",
    color: invert ? "var(--cuivre-600)" : "#FFFFFF",
    border: invert ? "1px solid rgba(0,0,0,0.06)" : "1px solid rgba(255,255,255,0.1)",
    boxShadow: invert
      ? "0 1px 2px rgba(0,0,0,0.08), 0 4px 12px rgba(0,0,0,0.06)"
      : "0 1px 2px rgba(0,0,0,0.3), 0 4px 12px rgba(0,0,0,0.15), inset 0 1px 0 rgba(255,255,255,0.12)",
  };
  return (
    <a
      href={href}
      data-cursor-hover
      className={`cta-primary ${className}`}
      style={style}
    >
      {children}
      <span aria-hidden>→</span>
    </a>
  );
}

export function CTASecondary({ children, href = `tel:${PHONE}`, light = false, className = "" }: { children?: React.ReactNode; href?: string; light?: boolean; className?: string }) {
  const style: React.CSSProperties = {
    ...baseStyle,
    background: "transparent",
    color: light ? "var(--creme-50)" : "var(--asphalte-900)",
    border: `1px solid ${light ? "var(--creme-50)" : "var(--asphalte-700)"}`,
  };
  return (
    <a href={href} data-cursor-hover className={`cta-secondary ${className}`} style={style}>
      <span aria-hidden>📞</span>
      {children ?? PHONE_DISPLAY}
    </a>
  );
}

/* Bandeau sobre — respiration entre sections (fond asphalte, accent cuivre fin) */
export function CTABanner() {
  return (
    <section className="relative w-full px-6 py-10 md:py-14 text-center" style={{ background: "var(--asphalte-900)" }}>
      <p
        className="font-display italic max-w-3xl mx-auto"
        style={{ color: "var(--creme-50)", fontSize: "clamp(18px, 2.2vw, 26px)", lineHeight: 1.4, fontWeight: 300 }}
      >
        Un projet en tête ? Devis détaillé sous 48h, visite gratuite.
      </p>
      <div aria-hidden className="mx-auto my-6" style={{ width: 28, height: 1, background: "var(--cuivre-500)" }} />
      <div className="flex flex-wrap gap-3 justify-center">
        <CTAPrimary>Demander mon devis</CTAPrimary>
        <a
          href={`tel:${PHONE}`}
          data-cursor-hover
          style={{
            ...baseStyle,
            background: "transparent",
            color: "var(--creme-50)",
            border: "1px solid rgba(244,239,230,0.4)",
          }}
        >
          <span aria-hidden style={{ color: "var(--sable-500)" }}>📞</span> {PHONE_DISPLAY}
        </a>
      </div>
    </section>
  );
}

/* CTA inline centré sur fond sombre */
export function CTAInline({ caption, label = "Demander un devis", href = "#devis", withPhone = false }: { caption?: string; label?: string; href?: string; withPhone?: boolean }) {
  return (
    <div className="mt-10 md:mt-12 text-center">
      {caption && (
        <p className="font-display italic text-foreground/80 mb-5" style={{ fontSize: "clamp(16px, 2vw, 20px)" }}>
          {caption}
        </p>
      )}
      <div className="flex flex-wrap gap-3 justify-center">
        <CTAPrimary href={href}>{label}</CTAPrimary>
        {withPhone && <CTASecondary light />}
      </div>
    </div>
  );
}

/* Floating mobile CTA — sticky bottom, hides over #devis */
export function MobileFloatingCTA({ href = "#devis" }: { href?: string } = {}) {
  const [visible, setVisible] = useState(false);
  const [overDevis, setOverDevis] = useState(false);

  useEffect(() => {
    const onScroll = () => setVisible(window.scrollY > 300);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    const target = document.getElementById("devis");
    if (!target) return;
    const io = new IntersectionObserver(
      ([e]) => setOverDevis(e.isIntersecting),
      { threshold: 0.05 }
    );
    io.observe(target);
    return () => io.disconnect();
  }, []);

  const show = visible && !overDevis;

  return (
    <a
      href={href}
      aria-label="Demander un devis"
      className="md:hidden fixed left-4 right-4 z-[100] text-center"
      style={{
        bottom: 16,
        background: "var(--cuivre-500)",
        color: "var(--creme-50)",
        padding: "14px",
        borderRadius: 8,
        fontWeight: 500,
        fontFamily: "var(--font-body)",
        fontSize: 15,
        boxShadow: "0 4px 12px rgba(14,14,15,0.35)",
        opacity: show ? 1 : 0,
        transform: show ? "translateY(0)" : "translateY(20px)",
        pointerEvents: show ? "auto" : "none",
        transition: "opacity 0.3s ease, transform 0.3s ease",
        textDecoration: "none",
      }}
    >
      Demander un devis →
    </a>
  );
}

/* Sticky desktop CTA pour pages services */
export function ServiceStickyCTA() {
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const onScroll = () => setVisible(window.scrollY > 200);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);
  return (
    <div
      className="hidden md:block fixed z-40"
      style={{
        top: 88,
        right: 24,
        opacity: visible ? 1 : 0,
        transform: visible ? "translateY(0)" : "translateY(-10px)",
        pointerEvents: visible ? "auto" : "none",
        transition: "opacity 0.3s ease, transform 0.3s ease",
      }}
    >
      <CTAPrimary href="#service-cta-bottom" compact>Demander un devis</CTAPrimary>
    </div>
  );
}

/* Mid-page CTA bande sombre avec photo en fond */
export function ServiceMidCTA({ serviceName, bgImage }: { serviceName: string; bgImage: string }) {
  const ref = useRef<HTMLDivElement>(null);
  return (
    <section className="relative w-full overflow-hidden" style={{ minHeight: 200 }}>
      <div
        ref={ref}
        className="absolute inset-0 bg-cover bg-center"
        style={{ backgroundImage: `url(${bgImage})` }}
      />
      <div className="absolute inset-0" style={{ background: "rgba(14,14,15,0.7)" }} />
      <div className="relative z-10 px-6 py-14 md:py-16 text-center max-w-3xl mx-auto">
        <p className="font-display italic text-foreground" style={{ fontSize: "clamp(20px, 2.6vw, 28px)", lineHeight: 1.3 }}>
          Vous avez un projet de <span className="text-gold">{serviceName.toLowerCase()}</span> ?
        </p>
        <p className="mt-3 text-muted text-sm md:text-base">
          Devis détaillé sous 48h · Visite gratuite · Garantie décennale
        </p>
        <div className="mt-7 flex flex-wrap gap-3 justify-center">
          <CTAPrimary>Demander un devis pour ce projet</CTAPrimary>
        </div>
      </div>
    </section>
  );
}
