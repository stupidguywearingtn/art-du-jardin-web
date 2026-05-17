import { useEffect, useRef, useState, type ElementType } from "react";
import { Pencil } from "lucide-react";
import { useEditMode } from "@/hooks/useEditMode";

type Props = {
  section: string;
  field: string;
  value: string;
  as?: ElementType;
  className?: string;
  multiline?: boolean;
};

export function EditableText({
  section,
  field,
  value,
  as: Tag = "div",
  className,
  multiline = false,
}: Props) {
  const { enabled, setDraft } = useEditMode();
  const [editing, setEditing] = useState(false);
  const ref = useRef<HTMLElement>(null);

  useEffect(() => {
    if (editing && ref.current) {
      ref.current.focus();
      // place caret at end
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
    return <Tag className={className}>{value}</Tag>;
  }

  return (
    <span className="relative inline-block group/editable align-baseline w-full">
      <Tag
        ref={ref as any}
        className={`${className ?? ""} outline-none transition-[box-shadow] rounded-sm ${
          editing
            ? "ring-2 ring-blue-500 ring-offset-2 ring-offset-background cursor-text"
            : "group-hover/editable:ring-2 group-hover/editable:ring-blue-500/70 cursor-pointer"
        }`}
        contentEditable={editing}
        suppressContentEditableWarning
        onBlur={editing ? commit : undefined}
        onKeyDown={(e: React.KeyboardEvent) => {
          if (!multiline && e.key === "Enter") {
            e.preventDefault();
            (e.target as HTMLElement).blur();
          }
          if (e.key === "Escape") {
            e.preventDefault();
            setEditing(false);
            if (ref.current) ref.current.innerText = value;
          }
        }}
      >
        {value}
      </Tag>
      {!editing && (
        <button
          type="button"
          onClick={(e) => {
            e.stopPropagation();
            setEditing(true);
          }}
          className="absolute -top-3 -right-3 z-10 hidden group-hover/editable:flex items-center justify-center w-7 h-7 rounded-full bg-blue-600 text-white shadow-lg hover:bg-blue-700"
          aria-label="Éditer"
        >
          <Pencil className="w-3.5 h-3.5" />
        </button>
      )}
    </span>
  );
}
