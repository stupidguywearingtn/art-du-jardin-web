import {
  createContext,
  useContext,
  useState,
  useCallback,
  useMemo,
  type ReactNode,
} from "react";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";
import { useAuth } from "@/hooks/useAuth";

export type DraftType = "text" | "image";
type Draft = { value: string; type: DraftType };
type Drafts = Record<string, Draft>; // key: `${section}.${field}`

type Ctx = {
  isAdmin: boolean;
  enabled: boolean;
  toggle: () => void;
  drafts: Drafts;
  getDraft: (section: string, field: string) => string | undefined;
  setDraft: (section: string, field: string, type: DraftType, value: string) => void;
  hasDrafts: boolean;
  publish: () => Promise<void>;
  cancel: () => void;
  siteId: string;
  publishing: boolean;
};

const EditModeCtx = createContext<Ctx | null>(null);

export function EditModeProvider({
  siteId,
  children,
  onPublished,
}: {
  siteId: string;
  children: ReactNode;
  onPublished?: () => void;
}) {
  const { isAdmin } = useAuth();
  const [enabled, setEnabled] = useState(false);
  const [drafts, setDrafts] = useState<Drafts>({});
  const [publishing, setPublishing] = useState(false);

  const setDraft = useCallback(
    (section: string, field: string, type: DraftType, value: string) => {
      setDrafts((d) => ({ ...d, [`${section}.${field}`]: { value, type } }));
    },
    [],
  );

  const getDraft = useCallback(
    (section: string, field: string) => drafts[`${section}.${field}`]?.value,
    [drafts],
  );

  const cancel = useCallback(() => setDrafts({}), []);

  const publish = useCallback(async () => {
    const entries = Object.entries(drafts);
    if (entries.length === 0) return;
    setPublishing(true);
    try {
      const rows = entries.map(([k, v]) => {
        const [section_key, field_key] = k.split(".");
        return {
          site_id: siteId,
          section_key,
          field_key,
          content_type: v.type,
          content_value: v.value,
        };
      });
      const { error } = await supabase
        .from("site_content_fields")
        .upsert(rows, { onConflict: "site_id,section_key,field_key" });
      if (error) throw error;
      toast.success("Modifications publiées");
      setDrafts({});
      onPublished?.();
    } catch (e: any) {
      toast.error(e.message ?? "Erreur lors de la publication");
    } finally {
      setPublishing(false);
    }
  }, [drafts, siteId, onPublished]);

  const value = useMemo<Ctx>(
    () => ({
      isAdmin,
      enabled: enabled && isAdmin,
      toggle: () => setEnabled((e) => !e),
      drafts,
      getDraft,
      setDraft,
      hasDrafts: Object.keys(drafts).length > 0,
      publish,
      cancel,
      siteId,
      publishing,
    }),
    [isAdmin, enabled, drafts, getDraft, setDraft, publish, cancel, siteId, publishing],
  );

  return <EditModeCtx.Provider value={value}>{children}</EditModeCtx.Provider>;
}

export function useEditMode() {
  const ctx = useContext(EditModeCtx);
  if (!ctx) throw new Error("useEditMode must be used inside EditModeProvider");
  return ctx;
}
