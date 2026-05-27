import { useEditMode } from "@/hooks/useEditMode";
import { useAuth } from "@/hooks/useAuth";
import { supabase } from "@/integrations/supabase/client";
import { Loader2, Pencil, X, LogOut, Save } from "lucide-react";
import { toast } from "sonner";

/**
 * Barre supérieure visible en permanence quand un admin est connecté.
 * - "Mode édition actif" + bouton ON/OFF
 * - Compteur de modifications en attente
 * - Bouton "Sauvegarder" pour tout publier d'un coup
 * - Bouton "Annuler" pour jeter les drafts
 * - Lien "Se déconnecter"
 *
 * Pousse le contenu de la page vers le bas (44 px desktop, 56 px mobile)
 * via une classe sur le body, gérée par effet plus bas.
 */
export function EditModeToolbar() {
  const { isAdmin, enabled, toggle, drafts, hasDrafts, publish, cancel, publishing } = useEditMode();
  const { user } = useAuth();

  if (!isAdmin) return null;

  const draftCount = Object.keys(drafts).length;

  const signOut = async () => {
    await supabase.auth.signOut();
    toast.success("Déconnecté");
    window.location.href = "/";
  };

  return (
    <>
      <div
        className="fixed top-0 inset-x-0 z-[200] text-creme-50 shadow-[0_4px_18px_rgba(0,0,0,0.45)]"
        style={{ background: "var(--cuivre-500)", color: "var(--creme-50)", fontFamily: "var(--font-body)" }}
        role="region"
        aria-label="Barre d'édition admin"
      >
        <div className="max-w-[1600px] mx-auto px-4 py-2 flex items-center gap-3 text-sm">
          <Pencil className="w-4 h-4 flex-none" />
          <span className="font-medium hidden sm:inline">
            {enabled ? "Mode édition ACTIF" : "Mode édition désactivé"}
          </span>
          <button
            type="button"
            onClick={toggle}
            className="px-3 py-1 rounded text-xs font-semibold transition-colors flex-none"
            style={{
              background: enabled ? "rgba(0,0,0,0.25)" : "var(--creme-50)",
              color: enabled ? "var(--creme-50)" : "var(--cuivre-600)",
              border: "1px solid rgba(255,255,255,0.3)",
            }}
          >
            {enabled ? "Désactiver" : "Activer"}
          </button>

          {enabled && hasDrafts && (
            <span
              className="px-2.5 py-1 rounded text-xs font-semibold flex-none"
              style={{ background: "var(--asphalte-900)", color: "var(--sable-500)" }}
            >
              {draftCount} modif{draftCount > 1 ? "s" : ""} non sauvegardée{draftCount > 1 ? "s" : ""}
            </span>
          )}

          <div className="flex-1" />

          {enabled && hasDrafts && (
            <>
              <button
                type="button"
                onClick={cancel}
                disabled={publishing}
                className="hidden sm:inline-flex items-center gap-1 px-3 py-1.5 rounded text-xs hover:bg-black/20 transition-colors disabled:opacity-40"
              >
                <X className="w-3.5 h-3.5" /> Annuler
              </button>
              <button
                type="button"
                onClick={publish}
                disabled={publishing}
                className="inline-flex items-center gap-2 px-4 py-1.5 rounded font-semibold text-sm transition-all disabled:opacity-50"
                style={{ background: "var(--creme-50)", color: "var(--cuivre-600)" }}
              >
                {publishing ? (
                  <><Loader2 className="w-4 h-4 animate-spin" /> Sauvegarde…</>
                ) : (
                  <><Save className="w-4 h-4" /> Sauvegarder</>
                )}
              </button>
            </>
          )}

          <span
            className="hidden md:inline text-xs opacity-80 flex-none truncate max-w-[180px]"
            title={user?.email ?? ""}
          >
            {user?.email}
          </span>
          <button
            type="button"
            onClick={signOut}
            className="inline-flex items-center gap-1 px-2 py-1 rounded text-xs hover:bg-black/20 transition-colors"
            aria-label="Se déconnecter"
          >
            <LogOut className="w-3.5 h-3.5" /> <span className="hidden sm:inline">Quitter</span>
          </button>
        </div>
      </div>

      {/* Spacer pour pousser le contenu de la page sous la barre */}
      <div aria-hidden style={{ height: 44 }} />
    </>
  );
}
