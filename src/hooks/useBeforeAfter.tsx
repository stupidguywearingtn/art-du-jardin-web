import { useCallback, useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";

/* ============================================================
   Section « Avant / Après » — pilotée par Supabase.

   Tables : before_after_pairs (une comparaison) + before_after_photos
   (les photos de chaque côté). Tant que la migration n'est pas appliquée
   OU que la table est injoignable, on retombe sur un jeu de paires vides
   `fb-*` (mêmes emplacements « Photo à venir » qu'avant, non éditables).
============================================================ */

export type BAPair = {
  id: string;
  title: string | null;
  display_order: number;
};

export type BAPhoto = {
  id: string;
  pair_id: string;
  side: "avant" | "apres";
  url: string;
  display_order: number;
};

export type BAGroup = {
  pair: BAPair;
  avant: BAPhoto[];
  apres: BAPhoto[];
};

/** Nombre de comparaisons vides affichées quand la base est vide/injoignable. */
const FALLBACK_PAIRS = 6;

function fallbackGroups(): BAGroup[] {
  return Array.from({ length: FALLBACK_PAIRS }).map((_, i) => ({
    pair: { id: `fb-${i + 1}`, title: `Comparaison ${i + 1}`, display_order: i },
    avant: [],
    apres: [],
  }));
}

export function useBeforeAfter() {
  const [groups, setGroups] = useState<BAGroup[]>(fallbackGroups());
  const [loading, setLoading] = useState(true);

  const reload = useCallback(async () => {
    setLoading(true);
    try {
      const [pairsRes, photosRes] = await Promise.all([
        supabase.from("before_after_pairs").select("*").order("display_order"),
        supabase.from("before_after_photos").select("*").order("display_order"),
      ]);
      if (pairsRes.error) throw pairsRes.error;
      const pairs = (pairsRes.data ?? []) as BAPair[];
      const photos = (photosRes.data ?? []) as BAPhoto[];
      if (pairs.length === 0) {
        setGroups(fallbackGroups());
      } else {
        setGroups(
          pairs.map((pair) => ({
            pair,
            avant: photos.filter((p) => p.pair_id === pair.id && p.side === "avant"),
            apres: photos.filter((p) => p.pair_id === pair.id && p.side === "apres"),
          })),
        );
      }
    } catch {
      setGroups(fallbackGroups());
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    reload();
  }, [reload]);

  return { groups, loading, reload };
}
