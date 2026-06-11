import { useEffect } from "react";
import { AlertTriangle } from "lucide-react";

export default function ConfirmDeleteModal({ open, entityLabel, message, onConfirm, onClose, deleting }) {
  useEffect(() => {
    if (!open) return;
    const handler = (e) => { if (e.key === "Escape" && !deleting) onClose(); };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [open, deleting, onClose]);

  if (!open) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 px-4"
      onClick={() => { if (!deleting) onClose(); }}
    >
      <div className="w-full max-w-sm rounded-2xl bg-white p-6 shadow-xl" onClick={(e) => e.stopPropagation()}>
        <div className="flex items-center gap-3 text-amber-600">
          <AlertTriangle className="h-5 w-5" />
          <h2 className="font-heading text-lg font-semibold">¿Eliminar {entityLabel}?</h2>
        </div>
        <p className="mt-2 text-sm text-slate-600">
          {message ?? "Esta acción no se puede deshacer."}
        </p>
        <div className="mt-5 flex gap-3">
          <button
            type="button"
            onClick={onClose}
            className="flex-1 rounded-xl border border-slate-200 py-2 text-sm font-medium text-slate-700 transition hover:bg-slate-50"
          >
            Cancelar
          </button>
          <button
            type="button"
            onClick={onConfirm}
            disabled={deleting}
            className="flex-1 rounded-xl bg-red-500 py-2 text-sm font-semibold text-white transition hover:bg-red-600 disabled:opacity-60"
          >
            {deleting ? "Eliminando..." : "Eliminar"}
          </button>
        </div>
      </div>
    </div>
  );
}
