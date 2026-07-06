import { useEffect, useState, useCallback } from "react";
import { supabase } from "@/integrations/supabase/client";

export type GalleryCategory = {
  id: string;
  slug: string;
  title: string;
  description: string | null;
  cover_url: string | null;
  display_order: number;
  active: boolean;
};

export type GalleryPhoto = {
  id: string;
  url: string;
  caption: string | null;
  alt_text: string | null;
  category_id: string | null;
  display_order: number;
};

type CategoryWithCount = GalleryCategory & { photo_count: number };

/* ============================================================
   FALLBACK STATIQUE (utilisé tant que la migration Supabase
   gallery_categories/gallery_photos n'est pas appliquée).
   Garantit que la galerie publique et /realisations/{slug}
   restent fonctionnelles dans tous les cas.
============================================================ */

const FALLBACK_CATS: GalleryCategory[] = [
  { id: "fb-cour", slug: "cour-allee-privee", title: "Cour & allée privée", description: "Cours résidentielles et allées privées en enrobé à chaud, finitions soignées.", cover_url: "/photos/15-cour-golden-hour.jpg", display_order: 1, active: true },
  { id: "fb-pro", slug: "parking-voirie-pro", title: "Parking, grand espace et voirie pro", description: "Parkings d'entreprise, voiries de copropriété, plateformes industrielles.", cover_url: "/photos/26-pro-batiment-commercial.jpg", display_order: 2, active: true },
  { id: "fb-prep", slug: "preparation-terrassement", title: "Préparation & terrassement", description: "Décaissement, nivellement, drainage et préparation de plateformes.", cover_url: "/photos/06-chantier-bobcat-preparation.jpg", display_order: 3, active: true },
  { id: "fb-chantier", slug: "chantier-en-cours", title: "Chantier en cours", description: "HCE à l'œuvre — pose, compactage, équipe en action.", cover_url: "/photos/01-hero-finisseur-vapeur-sunset.jpg", display_order: 5, active: true },
];

const FALLBACK_PHOTOS: Record<string, Omit<GalleryPhoto, "category_id">[]> = {
  "cour-allee-privee": [
    "11-cour-courbe-ciel", "12-cour-courbe-muret-pierre", "13-cour-parking-muret", "14-cour-maison-volets-rouges",
    "15-cour-golden-hour", "16-cour-maison-blanche-ciel-bleu", "17-cour-arbres-automne", "18-cour-allee-entre-maisons",
    "19-cour-batiment-bois", "20-cour-maison-beige-frontal", "21-cour-maison-moderne-blanche", "22-cour-maison-blanche-garage",
    "23-cour-courbe-arbres", "24-cour-maison-plain-pied", "25-cour-allee-curve-garage",
  ].map((f, i) => ({ id: `fb-cour-${i}`, url: `/photos/${f}.jpg`, caption: null, alt_text: "Cour résidentielle en enrobé HCE", display_order: i })),
  "parking-voirie-pro": [
    { id: "fb-pro-0", url: "/photos/08-chantier-plaque-vibrante.jpg", caption: null, alt_text: "Compactage à la plaque vibrante sur parking", display_order: 0 },
    { id: "fb-pro-1", url: "/photos/26-pro-batiment-commercial.jpg", caption: null, alt_text: "Parking enrobé devant bâtiment commercial", display_order: 1 },
  ],
  "preparation-terrassement": [
    { id: "fb-prep-0", url: "/photos/06-chantier-bobcat-preparation.jpg", caption: null, alt_text: "Mini-pelle Bobcat en préparation de terrain à Cize", display_order: 0 },
    { id: "fb-prep-1", url: "/photos/07-chantier-terrain-brouette.jpg", caption: null, alt_text: "Préparation manuelle du terrain avant pose", display_order: 1 },
  ],
  "details-finitions": [
    { id: "fb-det-0", url: "/photos/02-hero-medaillon-paves.jpg", caption: null, alt_text: "Médaillon de pavés intégré dans l'enrobé", display_order: 0 },
    { id: "fb-det-1", url: "/photos/09-detail-bordure-beton.jpg", caption: null, alt_text: "Bordure béton coulée HCE", display_order: 1 },
    { id: "fb-det-2", url: "/photos/10-detail-texture-enrobe-frais.jpg", caption: null, alt_text: "Texture enrobé à chaud fraîchement posé", display_order: 2 },
  ],
  "chantier-en-cours": [
    { id: "fb-ch-0", url: "/photos/01-hero-finisseur-vapeur-sunset.jpg", caption: null, alt_text: "HCE en cours de pose à la main", display_order: 0 },
    { id: "fb-ch-1", url: "/photos/03-hero-rouleau-compacteur.jpg", caption: null, alt_text: "Rouleau compacteur sur chantier HCE", display_order: 1 },
    { id: "fb-ch-2", url: "/photos/04-hero-golden-hour.jpg", caption: null, alt_text: "Chantier HCE en golden hour", display_order: 2 },
  ],
};

function fallbackCategoriesWithCount(): CategoryWithCount[] {
  return FALLBACK_CATS.map((c) => ({ ...c, photo_count: FALLBACK_PHOTOS[c.slug]?.length ?? 0 }));
}

let _cachedCategories: CategoryWithCount[] | null = null;
const listeners = new Set<() => void>();

function notify() {
  for (const l of listeners) l();
}

async function loadAll() {
  try {
    const [catsRes, photosRes] = await Promise.all([
      supabase.from("gallery_categories").select("*").eq("active", true).order("display_order"),
      supabase.from("gallery_photos").select("*").order("display_order"),
    ]);
    const cats = catsRes.data ?? [];
    const photos = photosRes.data ?? [];
    if (cats.length === 0) {
      _cachedCategories = fallbackCategoriesWithCount();
    } else {
      const byCat: Record<string, GalleryPhoto[]> = {};
      for (const p of photos) {
        const k = p.category_id ?? "_uncat";
        if (!byCat[k]) byCat[k] = [];
        byCat[k].push(p);
      }
      _cachedCategories = cats.map((c) => ({ ...c, photo_count: byCat[c.id]?.length ?? 0 }));
    }
  } catch {
    _cachedCategories = fallbackCategoriesWithCount();
  }
  notify();
}

/** Public: list categories with photo counts. */
export function useGalleryCategories() {
  const [cats, setCats] = useState<CategoryWithCount[] | null>(_cachedCategories);
  useEffect(() => {
    const listener = () => setCats(_cachedCategories);
    listeners.add(listener);
    if (_cachedCategories === null) loadAll();
    else setCats(_cachedCategories);
    return () => {
      listeners.delete(listener);
    };
  }, []);
  return { categories: cats ?? [], loading: cats === null, reload: loadAll };
}

/** Public: list photos for one category slug. Uses static fallback when DB empty/unreachable. */
export function useGalleryByCategorySlug(slug: string) {
  const [data, setData] = useState<{ category: CategoryWithCount | null; photos: GalleryPhoto[] }>({
    category: null,
    photos: [],
  });
  const [loading, setLoading] = useState(true);

  const fetchData = useCallback(async () => {
    setLoading(true);
    try {
      const catRes = await supabase
        .from("gallery_categories")
        .select("*")
        .eq("slug", slug)
        .maybeSingle();
      if (catRes.data) {
        const phRes = await supabase
          .from("gallery_photos")
          .select("*")
          .eq("category_id", catRes.data.id)
          .order("display_order");
        setData({
          category: { ...catRes.data, photo_count: phRes.data?.length ?? 0 },
          photos: phRes.data ?? [],
        });
        setLoading(false);
        return;
      }
    } catch {
      // fall through to fallback
    }
    // Fallback statique pour les 5 slugs connus
    const fb = FALLBACK_CATS.find((c) => c.slug === slug);
    if (fb) {
      const photos = (FALLBACK_PHOTOS[slug] ?? []).map((p) => ({ ...p, category_id: fb.id }));
      setData({ category: { ...fb, photo_count: photos.length }, photos });
    } else {
      setData({ category: null, photos: [] });
    }
    setLoading(false);
  }, [slug]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  return { ...data, loading, reload: fetchData };
}
