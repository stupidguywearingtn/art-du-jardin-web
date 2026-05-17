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
    } catch (e: any) {
      toast.error(e.message ?? "Erreur d'upload");
    } finally {
      setUploading(false);
    }
  };

  if (!enabled) return <>{children(value)}</>;

  return (
    <>
      <div className="relative group/editable">
        <div className="ring-0 group-hover/editable:ring-2 group-hover/editable:ring-blue-500/70 rounded-md transition-shadow cursor-pointer">
          {children(value)}
        </div>
        <button
          type="button"
          onClick={() => setOpen(true)}
          className="absolute top-2 right-2 z-10 hidden group-hover/editable:flex items-center justify-center w-9 h-9 rounded-full bg-blue-600 text-white shadow-lg hover:bg-blue-700"
          aria-label="Changer l'image"
        >
          <Pencil className="w-4 h-4" />
        </button>
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
