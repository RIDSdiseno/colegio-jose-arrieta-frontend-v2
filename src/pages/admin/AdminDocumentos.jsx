import { useCallback, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Plus, Pencil, Trash2, AlertTriangle, FileText } from "lucide-react";
import { getDocumentosAdmin, eliminarDocumento } from "../../api/documentos";
import { eliminarArchivoStorage } from "../../lib/storage";

function AdminDocumentos() {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [confirmId, setConfirmId] = useState(null);
  const [deleting, setDeleting] = useState(false);

  const cargar = useCallback(async () => {
    setLoading(true);
    setError("");
    try {
      setItems(await getDocumentosAdmin());
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => { cargar(); }, [cargar]);

  useEffect(() => {
    if (!confirmId) return;
    const handler = (e) => { if (e.key === "Escape" && !deleting) setConfirmId(null); };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [confirmId, deleting]);

  const handleEliminar = async (id) => {
    setDeleting(true);
    try {
      const doc = items.find((d) => d.id === id);
      await eliminarDocumento(id);
      setItems((prev) => prev.filter((d) => d.id !== id));
      // Limpiar el PDF de Supabase Storage en segundo plano (fire-and-forget)
      if (doc?.link) eliminarArchivoStorage(doc.link, "documentos").catch(() => {});
    } catch (err) {
      setError(err.message);
    } finally {
      setDeleting(false);
      setConfirmId(null);
    }
  };

  return (
    <div>
      <div className="mb-6 flex items-center justify-between">
        <div>
          <h1 className="font-heading text-2xl font-bold text-primary">Documentos</h1>
          <p className="mt-0.5 text-sm text-slate-500">{items.length} documentos</p>
        </div>
        <Link
          to="/admin/documentos/nuevo"
          className="inline-flex items-center gap-2 rounded-xl bg-primary px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-primaryHover"
        >
          <Plus className="h-4 w-4" />
          Nuevo documento
        </Link>
      </div>

      {error ? (
        <div className="mb-4 rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">{error}</div>
      ) : null}

      {loading ? (
        <div className="space-y-3">
          {Array.from({ length: 4 }).map((_, i) => (
            <div key={i} className="h-16 animate-pulse rounded-2xl bg-white" />
          ))}
        </div>
      ) : items.length === 0 ? (
        <div className="rounded-2xl border border-dashed border-slate-300 bg-white py-16 text-center text-slate-500">
          No hay documentos agregados.{" "}
          <Link to="/admin/documentos/nuevo" className="font-semibold text-primary hover:underline">
            Agrega el primero
          </Link>
        </div>
      ) : (
        <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-soft">
          <table className="w-full text-sm">
            <thead className="border-b border-slate-100 bg-slate-50 text-xs uppercase tracking-wide text-slate-500">
              <tr>
                <th className="px-5 py-3 text-left">Documento</th>
                <th className="hidden px-5 py-3 text-left md:table-cell">Categoría</th>
                <th className="hidden px-5 py-3 text-left md:table-cell">Año</th>
                <th className="hidden px-5 py-3 text-left md:table-cell">Estado</th>
                <th className="px-5 py-3 text-right">Acciones</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {items.map((doc) => (
                <tr key={doc.id} className="transition hover:bg-slate-50">
                  <td className="px-5 py-4">
                    <div className="flex items-center gap-3">
                      <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-primary/10">
                        <FileText className="h-4 w-4 text-primary" />
                      </div>
                      <span className="line-clamp-1 font-medium text-slate-800">{doc.titulo}</span>
                    </div>
                  </td>
                  <td className="hidden px-5 py-4 text-slate-500 md:table-cell">{doc.categoria}</td>
                  <td className="hidden px-5 py-4 text-slate-500 md:table-cell">{doc.anio}</td>
                  <td className="hidden px-5 py-4 md:table-cell">
                    <span className={`inline-flex rounded-full px-2.5 py-0.5 text-xs font-medium ${
                      doc.activo ? "bg-green-100 text-green-700" : "bg-slate-100 text-slate-500"
                    }`}>
                      {doc.activo ? "Activo" : "Oculto"}
                    </span>
                  </td>
                  <td className="px-5 py-4 text-right">
                    <div className="flex items-center justify-end gap-2">
                      <Link
                        to={`/admin/documentos/${doc.id}`}
                        className="flex h-8 w-8 items-center justify-center rounded-lg border border-slate-200 text-slate-500 transition hover:border-primary hover:text-primary"
                      >
                        <Pencil className="h-3.5 w-3.5" />
                      </Link>
                      <button
                        type="button"
                        onClick={() => setConfirmId(doc.id)}
                        className="flex h-8 w-8 items-center justify-center rounded-lg border border-slate-200 text-slate-500 transition hover:border-red-400 hover:text-red-500"
                      >
                        <Trash2 className="h-3.5 w-3.5" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {confirmId ? (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 px-4"
          onClick={() => { if (!deleting) setConfirmId(null); }}
        >
          <div className="w-full max-w-sm rounded-2xl bg-white p-6 shadow-xl" onClick={(e) => e.stopPropagation()}>
            <div className="flex items-center gap-3 text-amber-600">
              <AlertTriangle className="h-5 w-5" />
              <h2 className="font-heading text-lg font-semibold">¿Eliminar documento?</h2>
            </div>
            <p className="mt-2 text-sm text-slate-600">Esta acción no se puede deshacer.</p>
            <div className="mt-5 flex gap-3">
              <button
                type="button"
                onClick={() => setConfirmId(null)}
                className="flex-1 rounded-xl border border-slate-200 py-2 text-sm font-medium text-slate-700 transition hover:bg-slate-50"
              >
                Cancelar
              </button>
              <button
                type="button"
                onClick={() => handleEliminar(confirmId)}
                disabled={deleting}
                className="flex-1 rounded-xl bg-red-500 py-2 text-sm font-semibold text-white transition hover:bg-red-600 disabled:opacity-60"
              >
                {deleting ? "Eliminando..." : "Eliminar"}
              </button>
            </div>
          </div>
        </div>
      ) : null}
    </div>
  );
}

export default AdminDocumentos;
