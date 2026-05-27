import { useState, type ReactNode } from "react";
import { Pencil, Loader2 } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";
import { useEditMode } from "@/hooks/useEditMode";

type Props = {
  section: string;
  field: string;
  value: string; // current image url
  children: (url: string) => ReactNode; // render with url (background/img)
};

const BUCKET = "site-images";

export function EditableImage({ section, field, value, children }: Props) {
  const { enabled, setDraft, siteId } = useEditMode();
  const [open, setOpen] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [url, setUrl] = useState("");

  const upload = async (file: File) => {
    setUploading(true);
    try {
      const ext = file.name.split(".").pop() || "jpg";
      const path = `${siteId}/${section}-${field}-${Date.now()}.${ext}`;
      const { error } = await supabase.storage.from(BUCKET).upload(path, file, {
        cacheControl: "3600",
        upsert: false,
      });
      if (error) throw error;
      const { data } = supabase.storage.from(BUCKET).getPublicUrl(path);
      setDraft(section, field, "image", data.publicUrl);
      toast.success("Image mise à jour (brouillon)");
      setOpen(false);
    } catch (e: unknown) {
      toast.error(e instanceof Error ? e.message : "Erreur d'upload");
    } finally {
      setUploading(false);
    }
  };

  if (!enabled) return <>{children(value)}</>;

  return (
    <>
      <div className="relative group/editable w-full h-full">
        <div
          className="w-full h-full rounded-sm transition-all cursor-pointer"
          style={{ outline: "0 solid transparent", transition: "outline 200ms ease" }}
          onMouseEnter={(e) => { e.currentTarget.style.outline = "2px solid var(--cuivre-500)"; e.currentTarget.style.outlineOffset = "-2px"; }}
          onMouseLeave={(e) => { e.currentTarget.style.outline = "0 solid transparent"; }}
        >
          {children(value)}
        </div>
        <div
          className="absolute inset-0 flex items-center justify-center opacity-0 group-hover/editable:opacity-100 transition-opacity pointer-events-none"
          style={{ background: "rgba(14,14,15,0.4)" }}
        >
          <button
            type="button"
            onClick={() => setOpen(true)}
            className="inline-flex items-center gap-2 px-4 py-2 rounded font-semibold text-sm shadow-lg pointer-events-auto"
            style={{ background: "var(--cuivre-500)", color: "var(--creme-50)", fontFamily: "var(--font-body)" }}
          >
            <Pencil className="w-4 h-4" /> Remplacer
          </button>
        </div>
      </div>

      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Changer l'image</DialogTitle>
            <DialogDescription>
              Téléversez un fichier ou collez une URL.
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4">
            <Input
              type="file"
              accept="image/*"
              disabled={uploading}
              onChange={(e) => {
                const f = e.target.files?.[0];
                if (f) upload(f);
              }}
            />
            <div className="space-y-2">
              <Input
                placeholder="https://..."
                value={url}
                onChange={(e) => setUrl(e.target.value)}
              />
              <Button
                variant="secondary"
                className="w-full"
                disabled={!url || uploading}
                onClick={() => {
                  setDraft(section, field, "image", url);
                  toast.success("Image mise à jour (brouillon)");
                  setOpen(false);
                  setUrl("");
                }}
              >
                Utiliser cette URL
              </Button>
            </div>
            {uploading && (
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <Loader2 className="w-4 h-4 animate-spin" /> Téléversement…
              </div>
            )}
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
}
