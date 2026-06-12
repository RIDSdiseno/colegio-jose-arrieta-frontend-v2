import { useMemo, useState } from "react";
import { Link } from "react-router-dom";
import { Plus, FileText } from "lucide-react";
import ConfirmDeleteModal from "../../components/admin/ConfirmDeleteModal";
import AdminTableSkeleton from "../../components/admin/AdminTableSkeleton";
import AdminRowActions from "../../components/admin/AdminRowActions";
import { getDocumentosAdmin, eliminarDocumento, CATEGORIAS } from "../../api/documentos";
import { eliminarArchivoStorage } from "../../lib/storage";
import { useAdminList } from "../../hooks/useAdminList";

function AdminDocumentos() {
  const { items, loading, error, confirmId, setConfirmId, deleting, eliminar } = useAdminList(getDocumentosAdmin);
  const [filtroAnio, setFiltroAnio] = useState("");
  const [filtroCategoria, setFiltroCategoria] = useState("");

  const anosDisponibles = useMemo(() =>
    [...new Set(items.map((d) => d.anio))].sort((a, b) => b - a),
  [items]);

  const itemsFiltrados = useMemo(() => items.filter((d) => {
    if (filtroAnio && d.anio !== parseInt(filtroAnio)) return false;
    if (filtroCategoria && d.categoria !== filtroCategoria) return false;
    return true;
  }), [items, filtroAnio, filtroCategoria]);

  const handleEliminar = (id) => {
    const doc = items.find((d) => d.id === id);
    eliminar(id, eliminarDocumento, () => {
      if (doc?.link) eliminarArchivoStorage(doc.link, "documentos").catch(() => {});
    });
  };

  return (
    <div>
      <div className="mb-4 flex items-center justify-between">
        <div>
          <h1 className="font-heading text-2xl font-bold text-primary">Documentos</h1>
          <p className="mt-0.5 text-sm text-slate-500">
            {filtroAnio || filtroCategoria
            ? `${itemsFiltrados.length} de ${items.length} documentos`
            : `${items.length} documentos`}
          </p>
        </div>
        <Link
          to="/admin/documentos/nuevo"
          className="inline-flex items-center gap-2 rounded-xl bg-primary px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-primaryHover"
        >
          <Plus className="h-4 w-4" />
          Nuevo documento
        </Link>
      </div>

      {!loading && items.length > 0 && (
        <div className="mb-4 flex flex-wrap gap-3">
          <select
            value={filtroAnio}
            onChange={(e) => setFiltroAnio(e.target.value)}
            className="rounded-xl border border-slate-200 bg-white px-3 py-2 text-sm text-slate-700 outline-none transition focus:border-primary focus:ring-2 focus:ring-primary/20"
          >
            <option value="">Todos los años</option>
            {anosDisponibles.map((a) => (
              <option key={a} value={a}>{a}</option>
            ))}
          </select>
          <select
            value={filtroCategoria}
            onChange={(e) => setFiltroCategoria(e.target.value)}
            className="rounded-xl border border-slate-200 bg-white px-3 py-2 text-sm text-slate-700 outline-none transition focus:border-primary focus:ring-2 focus:ring-primary/20"
          >
            <option value="">Todas las categorías</option>
            {CATEGORIAS.map((c) => (
              <option key={c} value={c}>{c}</option>
            ))}
          </select>
          {(filtroAnio || filtroCategoria) && (
            <button
              type="button"
              onClick={() => { setFiltroAnio(""); setFiltroCategoria(""); }}
              className="rounded-xl border border-slate-200 px-3 py-2 text-sm text-slate-500 transition hover:bg-slate-50"
            >
              Limpiar filtros
            </button>
          )}
        </div>
      )}

      {error ? (
        <div className="mb-4 rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">{error}</div>
      ) : null}

      {loading ? (
        <AdminTableSkeleton />
      ) : items.length === 0 ? (
        <div className="rounded-2xl border border-dashed border-slate-300 bg-white py-16 text-center text-slate-500">
          No hay documentos agregados.{" "}
          <Link to="/admin/documentos/nuevo" className="font-semibold text-primary hover:underline">
            Agrega el primero
          </Link>
        </div>
      ) : itemsFiltrados.length === 0 ? (
        <div className="rounded-2xl border border-dashed border-slate-300 bg-white py-10 text-center text-slate-400">
          No hay documentos que coincidan con los filtros.
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
              {itemsFiltrados.map((doc) => (
                <tr key={doc.id} className="transition hover:bg-slate-50">
                  <td className="px-5 py-4">
                    <div className="flex items-center gap-3">
                      <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-primary/10">
                        <FileText className="h-4 w-4 text-primary" />
                      </div>
                      <span className="line-clamp-1 font-medium text-slate-800" title={doc.titulo}>{doc.titulo}</span>
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
                    <AdminRowActions editTo={`/admin/documentos/${doc.id}`} onDelete={() => setConfirmId(doc.id)} />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      <ConfirmDeleteModal
        open={!!confirmId}
        entityLabel="documento"
        onConfirm={() => handleEliminar(confirmId)}
        onClose={() => setConfirmId(null)}
        deleting={deleting}
      />
    </div>
  );
}

export default AdminDocumentos;
