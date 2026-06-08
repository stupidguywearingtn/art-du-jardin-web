import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";

export type ProjectType = {
  id: string;
  slug: string;
  label: string;
  description: string | null;
  price_from: number | null;
  price_unit: string;
  show_price: boolean;
  display_order: number;
  active: boolean;
};

const FALLBACK: ProjectType[] = [
  { id: "f-cour", slug: "cour", label: "Cour privée", description: "Enrobé à chaud, compactage", price_from: 65, price_unit: "€/m²", show_price: false, display_order: 1, active: true },
  { id: "f-allee", slug: "allee", label: "Chemin", description: "Bordures + finition soignée", price_from: 75, price_unit: "€/m²", show_price: false, display_order: 2, active: true },
  { id: "f-parking", slug: "parking", label: "Parking pro", description: "et grand espace", price_from: 55, price_unit: "€/m²", show_price: false, display_order: 3, active: true },
  { id: "f-prep", slug: "preparation", label: "Préparation seule", description: "Décaissement + nivellement", price_from: 30, price_unit: "€/m²", show_price: false, display_order: 4, active: true },
];

let _cache: ProjectType[] | null = null;
const listeners = new Set<(t: ProjectType[]) => void>();

async function load() {
  const { data } = await supabase
    .from("project_types")
    .select("*")
    .eq("active", true)
    .order("display_order");
  _cache = (data ?? []).length > 0 ? (data as ProjectType[]) : FALLBACK;
  for (const l of listeners) l(_cache);
  return _cache;
}

export function useProjectTypes() {
  const [items, setItems] = useState<ProjectType[]>(_cache ?? FALLBACK);
  useEffect(() => {
    listeners.add(setItems);
    if (!_cache) load();
    else setItems(_cache);
    return () => {
      listeners.delete(setItems);
    };
  }, []);
  return { items, reload: load };
}
