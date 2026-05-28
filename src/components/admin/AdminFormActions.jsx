import { Loader2 } from "lucide-react";
import { useNavigate } from "react-router-dom";

export default function AdminFormActions({ saving, cancelTo, isEditing, saveLabel, onCancel }) {
  const navigate = useNavigate();
  const label = saveLabel ?? (isEditing ? "Guardar cambios" : "Guardar");
  return (
    <div className="flex justify-end gap-3">
      <button
        type="button"
        onClick={() => { onCancel?.(); navigate(cancelTo); }}
        className="rounded-xl border border-slate-200 px-6 py-2.5 text-sm font-medium text-slate-700 transition hover:bg-slate-50"
      >
        Cancelar
      </button>
      <button
        type="submit"
        disabled={saving}
        className="inline-flex items-center gap-2 rounded-xl bg-primary px-6 py-2.5 text-sm font-semibold text-white transition hover:bg-primaryHover disabled:opacity-60"
      >
        {saving ? <Loader2 className="h-4 w-4 animate-spin" /> : null}
        {saving ? "Guardando..." : label}
      </button>
    </div>
  );
}
