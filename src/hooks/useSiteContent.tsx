import { useEffect, useState, useCallback } from "react";
import { supabase } from "@/integrations/supabase/client";

type ContentMap = Record<string, any>;

let cache: ContentMap | null = null;
const listeners = new Set<(c: ContentMap) => void>();

async function load() {
  const { data, error } = await supabase.from("site_content").select("key, data");
  if (error) return {};
  const map: ContentMap = {};
  for (const row of data ?? []) map[row.key] = row.data;
  cache = map;
  listeners.forEach((l) => l(map));
  return map;
}

export function useSiteContent() {
  const [content, setContent] = useState<ContentMap>(cache ?? {});

  useEffect(() => {
    listeners.add(setContent);
    if (!cache) load();
    return () => { listeners.delete(setContent); };
  }, []);

  const get = useCallback(
    <T,>(key: string, fallback: T): T => (content[key] !== undefined ? (content[key] as T) : fallback),
    [content]
  );

  return { content, get, reload: load };
}

export function reloadSiteContent() {
  return load();
}
