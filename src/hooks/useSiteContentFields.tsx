import { useEffect, useState, useCallback } from "react";
import { supabase } from "@/integrations/supabase/client";

export type ContentField = {
  section_key: string;
  field_key: string;
  content_type: "text" | "image" | "richtext";
  content_value: string | null;
};

type FieldMap = Record<string, string>; // `${section}.${field}` -> value

const caches = new Map<string, FieldMap>();
const listenersMap = new Map<string, Set<(m: FieldMap) => void>>();

async function load(siteId: string) {
  const { data, error } = await supabase
    .from("site_content_fields")
    .select("section_key, field_key, content_value")
    .eq("site_id", siteId);
  const map: FieldMap = {};
  if (!error && data) {
    for (const row of data) {
      map[`${row.section_key}.${row.field_key}`] = row.content_value ?? "";
    }
  }
  caches.set(siteId, map);
  listenersMap.get(siteId)?.forEach((l) => l(map));
  return map;
}

export function useSiteContentFields(siteId: string) {
  const [fields, setFields] = useState<FieldMap>(caches.get(siteId) ?? {});

  useEffect(() => {
    let listeners = listenersMap.get(siteId);
    if (!listeners) {
      listeners = new Set();
      listenersMap.set(siteId, listeners);
    }
    listeners.add(setFields);
    if (!caches.has(siteId)) load(siteId);
    else setFields(caches.get(siteId)!);
    return () => {
      listeners!.delete(setFields);
    };
  }, [siteId]);

  const get = useCallback(
    (section: string, field: string, fallback: string) => {
      const v = fields[`${section}.${field}`];
      return v !== undefined && v !== "" ? v : fallback;
    },
    [fields],
  );

  return { get, reload: () => load(siteId) };
}
