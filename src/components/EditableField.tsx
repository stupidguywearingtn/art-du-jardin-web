import { useEffect, useRef, useState, type CSSProperties, type ElementType } from "react";
import { Pencil, Loader2 } from "lucide-react";
import { useEditMode } from "@/hooks/useEditMode";
import { useAuth } from "@/hooks/useAuth";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";

/**
 * Édition inline d'un champ d'une LIGNE de table Supabase.
 * Contrairement à EditableText (qui passe par drafts + publish),
 * EditableField écrit directement au blur (instant save).
 *
 * Usage :
 *   <EditableField
 *     table="why_us_cards"
 *     rowId={card.id}
 *     field="title"
 *     value={card.title}
 *     as="h3"
 *     onSaved={reload}
 *   />
 */
type Props = {
  table: string;
  rowId: string;
  field: string;
  value: string;
  as?: ElementType;
  className?: string;
  style?: CSSProperties;
  multiline?: boolean;
  placeholder?: string;
  onSaved?: () => void;
};

export function EditableField({
  table, rowId, field, value,
  as: Tag = "div", className, style, multiline = false,
  placeholder = "",
  onSaved,
}: Props) {
  const { enabled } = useEditMode();
  const { isAdmin } = useAuth();
  const [editing, setEditing] = useState(false);
  const [saving, setSaving] = useState(false);
  const [local, setLocal] = useState(value);
  const ref = useRef<HTMLElement>(null);

  useEffect(() => setLocal(value), [value]);

  useEffect(() => {
    if (editing && ref.current) {
      ref.current.focus();
      const range = document.createRange();
      range.selectNodeContents(ref.current);
      range.collapse(false);
      const sel = window.getSelection();
      sel?.removeAllRanges();
      sel?.addRange(range);
    }
  }, [editing]);

  const commit = async () => {
    const next = (ref.current?.innerText ?? "").trim();
    setEditing(false);
    if (next === value) return;
    setLocal(next);
    setSaving(true);
    // Cast supabase.from(table) to any to allow dynamic table name
    const { error } = await (supabase.from(table as never) as any).update({ [field]: next }).eq("id", rowId);
    setSaving(false);
    if (error) {
      toast.error(`Sauvegarde échouée : ${error.message}`);
      setLocal(value); // revert
      return;
    }
    toast.success("Sauvegardé");
    onSaved?.();
  };

  if (!enabled || !isAdmin) {
    return <Tag className={className} style={style}>{local || placeholder}</Tag>;
  }

  return (
    <span className="relative inline-block group/editable-field align-baseline" style={{ width: "fit-content", maxWidth: "100%" }}>
      <Tag
        ref={ref as any}
        className={`${className ?? ""} outline-none transition-[box-shadow] rounded-sm cursor-pointer`}
        style={{
          ...style,
          boxShadow: editing
            ? "0 0 0 2px var(--cuivre-500), 0 0 0 4px rgba(138,90,60,0.2)"
            : saving
              ? "0 0 0 2px var(--sable-500)"
              : undefined,
        }}
        contentEditable={editing}
        suppressContentEditableWarning
        onMouseEnter={(e: React.MouseEvent<HTMLElement>) => {
          if (!editing && !saving) e.currentTarget.style.boxShadow = "0 0 0 1px var(--cuivre-500), inset 0 0 0 9999px rgba(138,90,60,0.05)";
        }}
        onMouseLeave={(e: React.MouseEvent<HTMLElement>) => {
          if (!editing && !saving) e.currentTarget.style.boxShadow = "";
        }}
        onClick={(e: React.MouseEvent) => {
          if (!editing) {
            e.preventDefault();
            e.stopPropagation();
            setEditing(true);
          }
        }}
        onBlur={editing ? commit : undefined}
        onKeyDown={(e: React.KeyboardEvent) => {
          if (!multiline && e.key === "Enter") { e.preventDefault(); (e.target as HTMLElement).blur(); }
          if (e.key === "Escape") {
            e.preventDefault();
            setEditing(false);
            if (ref.current) ref.current.innerText = local;
          }
        }}
      >
        {local || placeholder}
      </Tag>

      {!editing && !saving && (
        <button
          type="button"
          onClick={(e) => { e.preventDefault(); e.stopPropagation(); setEditing(true); }}
          className="absolute -top-2 -right-2 z-[150] hidden group-hover/editable-field:flex items-center justify-center w-6 h-6 rounded-full shadow-lg pointer-events-auto"
          style={{ background: "var(--cuivre-500)", color: "var(--creme-50)" }}
          aria-label="Éditer"
        >
          <Pencil className="w-3 h-3" />
        </button>
      )}

      {saving && (
        <span
          className="absolute -top-2 -right-2 z-[150] flex items-center justify-center w-6 h-6 rounded-full pointer-events-none"
          style={{ background: "var(--sable-500)", color: "var(--asphalte-900)" }}
        >
          <Loader2 className="w-3 h-3 animate-spin" />
        </span>
      )}
    </span>
  );
}
