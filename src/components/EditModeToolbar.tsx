import { Switch } from "@/components/ui/switch";
import { Button } from "@/components/ui/button";
import { Loader2, Pencil } from "lucide-react";
import { useEditMode } from "@/hooks/useEditMode";

export function EditModeToolbar() {
  const { isAdmin, enabled, toggle, hasDrafts, publish, cancel, publishing } =
    useEditMode();

  if (!isAdmin) return null;

  return (
    <div className="fixed top-4 right-4 z-[100] flex flex-col items-end gap-2">
      <div className="flex items-center gap-3 rounded-full border border-border bg-background/95 backdrop-blur px-4 py-2 shadow-lg">
        <Pencil className="w-4 h-4 text-blue-600" />
        <span className="text-sm font-medium">
          Mode édition : {enabled ? "ON" : "OFF"}
        </span>
        <Switch checked={enabled} onCheckedChange={toggle} />
      </div>

      {enabled && hasDrafts && (
        <div className="flex items-center gap-2 rounded-lg border border-amber-300 bg-amber-50 dark:bg-amber-950/40 dark:border-amber-800 px-3 py-2 shadow-lg">
          <span className="text-sm text-amber-900 dark:text-amber-200">
            Modifications non publiées
          </span>
          <Button
            size="sm"
            variant="ghost"
            onClick={cancel}
            disabled={publishing}
          >
            Annuler
          </Button>
          <Button size="sm" onClick={publish} disabled={publishing}>
            {publishing ? <Loader2 className="w-4 h-4 animate-spin" /> : "Publier"}
          </Button>
        </div>
      )}
    </div>
  );
}
