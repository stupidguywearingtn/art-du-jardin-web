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

let _cachedCategories: CategoryWithCount[] | null = null;
let _cachedPhotos: Record<string, GalleryPhoto[]> = {};
const listeners = new Set<() => void>();

function notify() {
  for (const l of listeners) l();
}

async function loadAll() {
  const [catsRes, photosRes] = await Promise.all([
    supabase.from("gallery_categories").select("*").eq("active", true).order("display_order"),
    supabase.from("gallery_photos").select("*").order("display_order"),
  ]);
  const cats = catsRes.data ?? [];
  const photos = photosRes.data ?? [];
  const byCat: Record<string, GalleryPhoto[]> = {};
  for (const p of photos) {
    const k = p.category_id ?? "_uncat";
    if (!byCat[k]) byCat[k] = [];
    byCat[k].push(p);
  }
  _cachedCategories = cats.map((c) => ({
    ...c,
    photo_count: byCat[c.id]?.length ?? 0,
  }));
  _cachedPhotos = byCat;
  notify();
}

/** Public: list categories with photo counts. */
export function useGalleryCategories() {
  const [cats, setCats] = useState<CategoryWithCount[] | null>(_cachedCategories);
  useEffect(() => {
    const listener = () => setCats(_cachedCategories);
    listeners.add(listener);
    if (_cachedCategories === null) loadAll();
    return () => {
      listeners.delete(listener);
    };
  }, []);
  return { categories: cats ?? [], loading: cats === null, reload: loadAll };
}

/** Public: list photos for one category slug. */
export function useGalleryByCategorySlug(slug: string) {
  const [data, setData] = useState<{ category: CategoryWithCount | null; photos: GalleryPhoto[] }>({
    category: null,
    photos: [],
  });
  const [loading, setLoading] = useState(true);

  const fetch = useCallback(async () => {
    setLoading(true);
    const catRes = await supabase
      .from("gallery_categories")
      .select("*")
      .eq("slug", slug)
      .maybeSingle();
    if (!catRes.data) {
      setData({ category: null, photos: [] });
      setLoading(false);
      return;
    }
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
  }, [slug]);

  useEffect(() => {
    fetch();
  }, [fetch]);

  return { ...data, loading, reload: fetch };
}
