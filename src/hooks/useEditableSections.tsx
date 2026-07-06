import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";

/* ============================================================
   Hooks pour les "petites" tables de contenu éditables.
   Chaque hook : lit la DB une fois (cache module-level), expose
   un fallback si la DB n'a rien encore retourné, et permet de
   relire après modification admin.
============================================================ */

// ============ WHY_US ============
export type WhyUsSection = { tag: string; title: string; cta_text: string };
export type WhyUsCard = {
  id: string;
  title: string;
  description: string | null;
  icon_name: string | null;
  display_order: number;
  active: boolean;
};

const WHY_US_SECTION_FALLBACK: WhyUsSection = {
  tag: "— Pourquoi HCE",
  title: "Quatre raisons, une certitude.",
  cta_text: "Convaincu ? Recevez un devis personnalisé.",
};

const WHY_US_CARDS_FALLBACK: WhyUsCard[] = [
  { id: "fb-1", title: "Enrobé à chaud", description: "Pose à la main à 150°C, compactage maîtrisé pour une durabilité maximale.", icon_name: "flame", display_order: 1, active: true },
  { id: "fb-2", title: "1000+ chantiers", description: "Plus de 1000 chantiers réalisés dans le Jura et l'Ain depuis 2012, 14 années d'expérience.", icon_name: "star", display_order: 2, active: true },
  { id: "fb-3", title: "Devis détaillé", description: "Visite gratuite, devis sous 48h, prix tenus, aucune mauvaise surprise.", icon_name: "file-text", display_order: 3, active: true },
  { id: "fb-4", title: "Finitions soignées", description: "Bords nets, raccords maîtrisés, surface plane et homogène jusqu'à la dernière passe.", icon_name: "shield-check", display_order: 4, active: true },
];

let _whyUsCache: { section: WhyUsSection; cards: WhyUsCard[] } | null = null;
const _whyUsListeners = new Set<() => void>();

async function loadWhyUs() {
  try {
    const [secRes, cardsRes] = await Promise.all([
      supabase.from("why_us_section").select("*").eq("id", 1).maybeSingle(),
      supabase.from("why_us_cards").select("*").eq("active", true).order("display_order"),
    ]);
    _whyUsCache = {
      section: secRes.data
        ? { tag: secRes.data.tag ?? WHY_US_SECTION_FALLBACK.tag, title: secRes.data.title ?? WHY_US_SECTION_FALLBACK.title, cta_text: secRes.data.cta_text ?? WHY_US_SECTION_FALLBACK.cta_text }
        : WHY_US_SECTION_FALLBACK,
      cards: cardsRes.data && cardsRes.data.length > 0 ? (cardsRes.data as WhyUsCard[]) : WHY_US_CARDS_FALLBACK,
    };
  } catch {
    _whyUsCache = { section: WHY_US_SECTION_FALLBACK, cards: WHY_US_CARDS_FALLBACK };
  }
  for (const l of _whyUsListeners) l();
}

export function useWhyUs() {
  const [data, setData] = useState(_whyUsCache ?? { section: WHY_US_SECTION_FALLBACK, cards: WHY_US_CARDS_FALLBACK });
  useEffect(() => {
    const l = () => _whyUsCache && setData(_whyUsCache);
    _whyUsListeners.add(l);
    if (!_whyUsCache) loadWhyUs();
    return () => { _whyUsListeners.delete(l); };
  }, []);
  return { ...data, reload: loadWhyUs };
}

// ============ SERVICE_AREA ============
export type ServiceAreaSection = { tag: string; title: string; description: string; cta_text: string };
export type ServiceAreaCity = { id: string; name: string; is_headquarters: boolean; display_order: number };

const SA_SECTION_FALLBACK: ServiceAreaSection = {
  tag: "— Zone d'intervention",
  title: "Jura & Ain, depuis Cize.",
  description: "HCE intervient autour de Cize pour les cours, allées, parkings, travaux de terrassement et finitions extérieures.",
  cta_text: "Votre commune n'est pas listée ? On se déplace jusqu'à 120 km.",
};

const SA_CITIES_FALLBACK: ServiceAreaCity[] = [
  { id: "fb-1", name: "Cize", is_headquarters: true, display_order: 1 },
  { id: "fb-2", name: "Lons-le-Saunier", is_headquarters: false, display_order: 2 },
  { id: "fb-3", name: "Saint-Claude", is_headquarters: false, display_order: 3 },
  { id: "fb-4", name: "Champagnole", is_headquarters: false, display_order: 4 },
  { id: "fb-5", name: "Bourg-en-Bresse", is_headquarters: false, display_order: 5 },
  { id: "fb-6", name: "Oyonnax", is_headquarters: false, display_order: 6 },
  { id: "fb-7", name: "Nantua", is_headquarters: false, display_order: 7 },
  { id: "fb-8", name: "Pont-d'Ain", is_headquarters: false, display_order: 8 },
];

let _saCache: { section: ServiceAreaSection; cities: ServiceAreaCity[] } | null = null;
const _saListeners = new Set<() => void>();

async function loadServiceArea() {
  try {
    const [secRes, citiesRes] = await Promise.all([
      supabase.from("service_area").select("*").eq("id", 1).maybeSingle(),
      supabase.from("service_area_cities").select("*").order("display_order"),
    ]);
    _saCache = {
      section: secRes.data
        ? {
            tag: secRes.data.tag ?? SA_SECTION_FALLBACK.tag,
            title: secRes.data.title ?? SA_SECTION_FALLBACK.title,
            description: secRes.data.description ?? SA_SECTION_FALLBACK.description,
            cta_text: secRes.data.cta_text ?? SA_SECTION_FALLBACK.cta_text,
          }
        : SA_SECTION_FALLBACK,
      cities: citiesRes.data && citiesRes.data.length > 0 ? (citiesRes.data as ServiceAreaCity[]) : SA_CITIES_FALLBACK,
    };
  } catch {
    _saCache = { section: SA_SECTION_FALLBACK, cities: SA_CITIES_FALLBACK };
  }
  for (const l of _saListeners) l();
}

export function useServiceArea() {
  const [data, setData] = useState(_saCache ?? { section: SA_SECTION_FALLBACK, cities: SA_CITIES_FALLBACK });
  useEffect(() => {
    const l = () => _saCache && setData(_saCache);
    _saListeners.add(l);
    if (!_saCache) loadServiceArea();
    return () => { _saListeners.delete(l); };
  }, []);
  return { ...data, reload: loadServiceArea };
}

// ============ GALLERY_SECTION (header) ============
export type GallerySectionHeader = { subtitle: string; title: string };
const GS_FALLBACK: GallerySectionHeader = { subtitle: "— Plus de 1000 chantiers livrés depuis 2012", title: "Nos réalisations." };
let _gsCache: GallerySectionHeader | null = null;
const _gsListeners = new Set<() => void>();
async function loadGallerySection() {
  try {
    const res = await supabase.from("gallery_section").select("*").eq("id", 1).maybeSingle();
    _gsCache = res.data
      ? { subtitle: res.data.subtitle ?? GS_FALLBACK.subtitle, title: res.data.title ?? GS_FALLBACK.title }
      : GS_FALLBACK;
  } catch {
    _gsCache = GS_FALLBACK;
  }
  for (const l of _gsListeners) l();
}
export function useGallerySection() {
  const [data, setData] = useState(_gsCache ?? GS_FALLBACK);
  useEffect(() => {
    const l = () => _gsCache && setData(_gsCache);
    _gsListeners.add(l);
    if (!_gsCache) loadGallerySection();
    return () => { _gsListeners.delete(l); };
  }, []);
  return { ...data, reload: loadGallerySection };
}

// ============ QUOTE_SECTION (header simulateur) ============
export type QuoteSectionHeader = { tag: string; title: string; subtitle: string };
const QS_FALLBACK: QuoteSectionHeader = { tag: "— Demande de devis", title: "Estimez votre projet", subtitle: "en 90 secondes." };
let _qsCache: QuoteSectionHeader | null = null;
const _qsListeners = new Set<() => void>();
async function loadQuoteSection() {
  try {
    const res = await supabase.from("quote_section").select("*").eq("id", 1).maybeSingle();
    _qsCache = res.data
      ? {
          tag: res.data.tag ?? QS_FALLBACK.tag,
          title: res.data.title ?? QS_FALLBACK.title,
          subtitle: res.data.subtitle ?? QS_FALLBACK.subtitle,
        }
      : QS_FALLBACK;
  } catch {
    _qsCache = QS_FALLBACK;
  }
  for (const l of _qsListeners) l();
}
export function useQuoteSection() {
  const [data, setData] = useState(_qsCache ?? QS_FALLBACK);
  useEffect(() => {
    const l = () => _qsCache && setData(_qsCache);
    _qsListeners.add(l);
    if (!_qsCache) loadQuoteSection();
    return () => { _qsListeners.delete(l); };
  }, []);
  return { ...data, reload: loadQuoteSection };
}
