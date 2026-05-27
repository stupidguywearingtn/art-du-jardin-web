import { useEffect, useRef, useState, type CSSProperties, type ElementType } from "react";
import { Pencil, Check, X } from "lucide-react";
import { useEditMode } from "@/hooks/useEditMode";

type Props = {
  section: string;
  field: string;
  value: string;
  as?: ElementType;
  className?: string;
  style?: CSSProperties;
  multiline?: boolean;
};

/**
 * Texte éditable inline. Quand enabled (admin) :
 * - hover : fin contour cuivre + icône stylo à droite
 * - clic : devient contentEditable, ring cuivre épais
 * - Enter (mono) ou blur → commit en draft
 * - Esc → annule
 */
export function EditableText({
  section,
  field,
  value,
  as: Tag = "div",
  className,
  style,
  multiline = false,
}: Props) {
  const { enabled, setDraft, getDraft } = useEditMode();
  const [editing, setEditing] = useState(false);
  const ref = useRef<HTMLElement>(null);

  const draftVal = getDraft(section, field);
  const displayValue = draftVal ?? value;
  const isDirty = draftVal !== undefined && draftVal !== value;

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

  const commit = () => {
    setEditing(false);
    const next = ref.current?.innerText ?? "";
    if (next !== value) setDraft(section, field, "text", next);
  };

  if (!enabled) {
    return (
      <Tag className={className} style={style}>
        {displayValue}
      </Tag>
    );
  }

  return (
    <span className="relative inline-block group/editable align-baseline" style={{ width: "fit-content", maxWidth: "100%" }}>
      <Tag
        ref={ref as any}
        className={`${className ?? ""} outline-none transition-[box-shadow] rounded-sm cursor-pointer`}
        style={{
          ...style,
          boxShadow: editing
            ? "0 0 0 2px var(--cuivre-500), 0 0 0 4px rgba(138,90,60,0.2)"
            : isDirty
              ? "0 0 0 1px var(--sable-500), inset 0 0 0 9999px rgba(200,164,126,0.06)"
              : undefined,
          background: undefined,
        }}
        contentEditable={editing}
        suppressContentEditableWarning
        onClick={(e: React.MouseEvent) => {
          if (!editing) {
            e.preventDefault();
            e.stopPropagation();
            setEditing(true);
          }
        }}
        onMouseEnter={(e: React.MouseEvent<HTMLElement>) => {
          if (!editing) e.currentTarget.style.boxShadow = isDirty
            ? "0 0 0 2px var(--sable-500), inset 0 0 0 9999px rgba(200,164,126,0.08)"
            : "0 0 0 1px var(--cuivre-500), inset 0 0 0 9999px rgba(138,90,60,0.05)";
        }}
        onMouseLeave={(e: React.MouseEvent<HTMLElement>) => {
          if (!editing) e.currentTarget.style.boxShadow = isDirty
            ? "0 0 0 1px var(--sable-500), inset 0 0 0 9999px rgba(200,164,126,0.06)"
            : "";
        }}
        onBlur={editing ? commit : undefined}
        onKeyDown={(e: React.KeyboardEvent) => {
          if (!multiline && e.key === "Enter") {
            e.preventDefault();
            (e.target as HTMLElement).blur();
          }
          if (e.key === "Escape") {
            e.preventDefault();
            setEditing(false);
            if (ref.current) ref.current.innerText = displayValue;
          }
        }}
      >
        {displayValue}
      </Tag>

      {/* Pastille stylo au hover quand pas en édition */}
      {!editing && (
        <button
          type="button"
          onClick={(e) => {
            e.preventDefault();
            e.stopPropagation();
            setEditing(true);
          }}
          className="absolute -top-2 -right-2 z-[150] hidden group-hover/editable:flex items-center justify-center w-6 h-6 rounded-full shadow-lg pointer-events-auto"
          style={{ background: "var(--cuivre-500)", color: "var(--creme-50)" }}
          aria-label="Éditer"
          title="Cliquer pour modifier"
        >
          <Pencil className="w-3 h-3" />
        </button>
      )}

      {editing && (
        <span
          aria-hidden
          className="absolute -top-7 left-0 z-[150] inline-flex items-center gap-1 px-2 py-0.5 rounded text-[10px] font-semibold pointer-events-none"
          style={{ background: "var(--cuivre-500)", color: "var(--creme-50)" }}
        >
          <Check className="w-3 h-3" /> Entrée pour valider · Échap pour annuler
        </span>
      )}

      {isDirty && !editing && (
        <span
          aria-hidden
          className="absolute -top-2.5 left-0 z-[150] inline-block w-2.5 h-2.5 rounded-full pointer-events-none"
          style={{ background: "var(--sable-500)", boxShadow: "0 0 6px rgba(200,164,126,0.8)" }}
          title="Modification non sauvegardée"
        />
      )}
    </span>
  );
}
