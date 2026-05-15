import { useEffect, useState, useRef } from "react";

const PHONE = "0384526148";
const PHONE_DISPLAY = "03 84 52 61 48";

const baseStyle: React.CSSProperties = {
  fontFamily: "Outfit, sans-serif",
  fontSize: 15,
  letterSpacing: "0.02em",
  fontWeight: 500,
  borderRadius: 4,
  padding: "14px 28px",
  display: "inline-flex",
  alignItems: "center",
  justifyContent: "center",
  gap: 8,
  transition: "all 0.2s ease",
  textDecoration: "none",
  whiteSpace: "nowrap",
};

type CTAProps = { children?: React.ReactNode; href?: string; className?: string; compact?: boolean; invert?: boolean };

export function CTAPrimary({ children = "Demander un devis", href = "#devis", className = "", compact = false, invert = false }: CTAProps) {
  const style: React.CSSProperties = {
    ...baseStyle,
    padding: compact ? "10px 20px" : baseStyle.padding,
    fontSize: compact ? 13 : 15,
    background: invert ? "var(--creme-50)" : "var(--brasier-500)",
    color: invert ? "var(--brasier-500)" : "#fff",
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

/* Bandeau orange pleine largeur */
export function CTABanner() {
  return (
    <section className="relative w-full px-6 py-12 md:py-16 text-center" style={{ background: "var(--brasier-500)" }}>
      <p
        className="font-display italic text-white max-w-3xl mx-auto"
        style={{ fontSize: "clamp(18px, 2.4vw, 26px)", lineHeight: 1.4, fontWeight: 300 }}
      >
        Un projet en tête ? Devis détaillé sous 48h, visite gratuite.
      </p>
      <div className="mt-8 flex flex-wrap gap-3 justify-center">
        <CTAPrimary invert>Demander mon devis</CTAPrimary>
        <a
          href={`tel:${PHONE}`}
          data-cursor-hover
          style={{
            ...baseStyle,
            background: "transparent",
            color: "#fff",
            border: "1px solid #fff",
          }}
        >
          <span aria-hidden>📞</span> {PHONE_DISPLAY}
        </a>
      </div>
    </section>
  );
}

/* CTA inline centré sur fond sombre */
export function CTAInline({ caption, label = "Demander un devis", href = "#devis", withPhone = false }: { caption?: string; label?: string; href?: string; withPhone?: boolean }) {
  return (
    <div className="mt-14 text-center">
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
        background: "var(--brasier-500)",
        color: "#fff",
        padding: "14px",
        borderRadius: 8,
        fontWeight: 500,
        fontFamily: "Outfit, sans-serif",
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
