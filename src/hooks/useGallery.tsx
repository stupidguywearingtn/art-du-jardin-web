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

/* Les catégories restent visibles (cartes cliquables), mais **sans photo** :
   la galerie repart de zéro, le client remplit les emplacements depuis
   l'admin. `cover_url: null` => la carte d'accueil affiche l'état
   « Bientôt disponible » tant qu'aucune photo n'a été ajoutée. */
const FALLBACK_CATS: GalleryCategory[] = [
  {
    id: "fb-cour",
    slug: "cour-allee-privee",
    title: "Cour & allée privée",
    description: "Cours résidentielles et allées privées en enrobé à chaud, finitions soignées.",
    cover_url: null,
    display_order: 1,
    active: true,
  },
  {
    id: "fb-pro",
    slug: "parking-voirie-pro",
    title: "Parking, grand espace et voirie pro",
    description: "Parkings d'entreprise, voiries de copropriété, plateformes industrielles.",
    cover_url: null,
    display_order: 2,
    active: true,
  },
  {
    id: "fb-prep",
    slug: "preparation-terrassement",
    title: "Préparation & terrassement",
    description: "Décaissement, nivellement, drainage et préparation de plateformes.",
    cover_url: null,
    display_order: 3,
    active: true,
  },
  {
    id: "fb-chantier",
    slug: "chantier-en-cours",
    title: "Chantier en cours",
    description: "HCE à l'œuvre — pose, compactage, équipe en action.",
    cover_url: null,
    display_order: 5,
    active: true,
  },
];

/* Galerie vidée : plus aucune photo par défaut. Les emplacements se
   remplissent via l'admin (5 slots minimum par catégorie, extensibles). */
const FALLBACK_PHOTOS: Record<string, Omit<GalleryPhoto, "category_id">[]> = {};

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
      // Vignette de la carte d'accueil = 1re photo du dossier (par
      // display_order, déjà trié par la requête). `cover_url` explicite en
      // base garde la priorité s'il est renseigné.
      _cachedCategories = cats.map((c) => ({
        ...c,
        cover_url: c.cover_url || byCat[c.id]?.[0]?.url || null,
        photo_count: byCat[c.id]?.length ?? 0,
      }));
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
