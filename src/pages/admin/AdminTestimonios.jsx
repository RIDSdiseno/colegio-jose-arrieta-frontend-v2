import { useCallback, useEffect, useMemo, useState } from "react";
import { Link } from "react-router-dom";
import { Plus, Star } from "lucide-react";
import ConfirmDeleteModal from "../../components/admin/ConfirmDeleteModal";
import AdminTableSkeleton from "../../components/admin/AdminTableSkeleton";
import AdminRowActions from "../../components/admin/AdminRowActions";
import { getTestimoniosAdmin, eliminarTestimonio } from "../../api/testimonios";

function AdminTestimonios() {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [confirmId, setConfirmId] = useState(null);
  const [deleting, setDeleting] = useState(false);
  const [filtroEstado, setFiltroEstado] = useState("");

  const itemsFiltrados = useMemo(() =>
    filtroEstado === "" ? items
    : items.filter((t) => t.activo === (filtroEstado === "activo")),
  [items, filtroEstado]);

  const cargar = useCallback(async () => {
    setLoading(true);
    setError("");
    try {
      const data = await getTestimoniosAdmin();
      setItems(data || []);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => { cargar(); }, [cargar]);


  const handleEliminar = async (id) => {
    setDeleting(true);
    try {
      await eliminarTestimonio(id);
      setItems((prev) => prev.filter((t) => t.id !== id));
    } catch (err) {
      setError(err.message);
    } finally {
      setDeleting(false);
      setConfirmId(null);
    }
  };

  return (
    <div>
      <div className="mb-4 flex items-center justify-between">
        <div>
          <h1 className="font-heading text-2xl font-bold text-primary">Testimonios</h1>
          <p className="mt-0.5 text-sm text-slate-500">
            {itemsFiltrados.length}{filtroEstado ? ` de ${items.length}` : ""} reseñas
          </p>
        </div>
        <Link
          to="/admin/testimonios/nuevo"
          className="inline-flex items-center gap-2 rounded-xl bg-primary px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-primaryHover"
        >
          <Plus className="h-4 w-4" />
          Nuevo testimonio
        </Link>
      </div>

      {!loading && items.length > 0 && (
        <div className="mb-4 flex gap-3">
          <select
            value={filtroEstado}
            onChange={(e) => setFiltroEstado(e.target.value)}
            className="rounded-xl border border-slate-200 bg-white px-3 py-2 text-sm text-slate-700 outline-none transition focus:border-primary focus:ring-2 focus:ring-primary/20"
          >
            <option value="">Todos</option>
            <option value="activo">Visibles</option>
            <option value="oculto">Ocultos</option>
          </select>
        </div>
      )}

      {error ? (
        <div className="mb-4 rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
          {error}
        </div>
      ) : null}

      {loading ? (
        <AdminTableSkeleton />
      ) : items.length === 0 ? (
        <div className="rounded-2xl border border-dashed border-slate-300 bg-white py-16 text-center text-slate-500">
          No hay testimonios.{" "}
          <Link to="/admin/testimonios/nuevo" className="font-semibold text-primary hover:underline">
            Agrega el primero
          </Link>
        </div>
      ) : itemsFiltrados.length === 0 ? (
        <div className="rounded-2xl border border-dashed border-slate-300 bg-white py-10 text-center text-slate-400">
          No hay testimonios {filtroEstado === "activo" ? "visibles" : "ocultos"}.
        </div>
      ) : (
        <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-soft">
          <table className="w-full text-sm">
            <thead className="border-b border-slate-100 bg-slate-50 text-xs uppercase tracking-wide text-slate-500">
              <tr>
                <th className="px-5 py-3 text-left">Nombre</th>
                <th className="hidden px-5 py-3 text-left md:table-cell">Cargo</th>
                <th className="px-5 py-3 text-left">Estrellas</th>
                <th className="hidden px-5 py-3 text-left lg:table-cell">Estado</th>
                <th className="px-5 py-3 text-right">Acciones</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {itemsFiltrados.map((t) => (
                <tr key={t.id} className="transition hover:bg-slate-50">
                  <td className="px-5 py-4 font-medium text-slate-800">{t.nombre}</td>
                  <td className="hidden px-5 py-4 text-slate-500 md:table-cell">{t.cargo || "—"}</td>
                  <td className="px-5 py-4">
                    <div className="flex gap-0.5">
                      {Array.from({ length: 5 }).map((_, i) => (
                        <Star
                          key={i}
                          className={`h-3.5 w-3.5 ${i < t.estrellas ? "fill-secondary text-secondary" : "text-slate-200"}`}
                        />
                      ))}
                    </div>
                  </td>
                  <td className="hidden px-5 py-4 lg:table-cell">
                    <span className={`inline-flex rounded-full px-2 py-0.5 text-xs font-semibold ${t.activo ? "bg-green-100 text-green-700" : "bg-slate-100 text-slate-500"}`}>
                      {t.activo ? "Visible" : "Oculto"}
                    </span>
                  </td>
                  <td className="px-5 py-4 text-right">
                    <AdminRowActions editTo={`/admin/testimonios/${t.id}`} onDelete={() => setConfirmId(t.id)} />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      <ConfirmDeleteModal
        open={!!confirmId}
        entityLabel="testimonio"
        onConfirm={() => handleEliminar(confirmId)}
        onClose={() => setConfirmId(null)}
        deleting={deleting}
      />
    </div>
  );
}

export default AdminTestimonios;
