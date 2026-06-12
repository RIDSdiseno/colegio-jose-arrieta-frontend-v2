import { useMemo, useState } from "react";
import { Link } from "react-router-dom";
import { Plus, Youtube } from "lucide-react";
import ConfirmDeleteModal from "../../components/admin/ConfirmDeleteModal";
import AdminTableSkeleton from "../../components/admin/AdminTableSkeleton";
import AdminRowActions from "../../components/admin/AdminRowActions";
import { getVideosAdmin, eliminarVideo } from "../../api/videos";
import { getYoutubeId } from "../../lib/youtube";
import { useAdminList } from "../../hooks/useAdminList";

function AdminVideos() {
  const { items, loading, error, confirmId, setConfirmId, deleting, eliminar } = useAdminList(getVideosAdmin);
  const [filtroAnio, setFiltroAnio] = useState("");

  const anosDisponibles = useMemo(() =>
    [...new Set(items.map((v) => v.anio))].sort((a, b) => b - a),
  [items]);

  const itemsFiltrados = useMemo(() =>
    filtroAnio ? items.filter((v) => v.anio === parseInt(filtroAnio)) : items,
  [items, filtroAnio]);

  return (
    <div>
      <div className="mb-4 flex items-center justify-between">
        <div>
          <h1 className="font-heading text-2xl font-bold text-primary">Videos</h1>
          <p className="mt-0.5 text-sm text-slate-500">
            {itemsFiltrados.length}{filtroAnio ? ` de ${items.length}` : ""} videos
          </p>
        </div>
        <Link
          to="/admin/videos/nuevo"
          className="inline-flex items-center gap-2 rounded-xl bg-primary px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-primaryHover"
        >
          <Plus className="h-4 w-4" />
          Nuevo video
        </Link>
      </div>

      {!loading && items.length > 0 && (
        <div className="mb-4 flex gap-3">
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
          {filtroAnio && (
            <button
              type="button"
              onClick={() => setFiltroAnio("")}
              className="rounded-xl border border-slate-200 px-3 py-2 text-sm text-slate-500 transition hover:bg-slate-50"
            >
              Limpiar
            </button>
          )}
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
          No hay videos agregados.{" "}
          <Link to="/admin/videos/nuevo" className="font-semibold text-primary hover:underline">
            Agrega el primero
          </Link>
        </div>
      ) : itemsFiltrados.length === 0 ? (
        <div className="rounded-2xl border border-dashed border-slate-300 bg-white py-10 text-center text-slate-400">
          No hay videos del año {filtroAnio}.
        </div>
      ) : (
        <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-soft">
          <table className="w-full text-sm">
            <thead className="border-b border-slate-100 bg-slate-50 text-xs uppercase tracking-wide text-slate-500">
              <tr>
                <th className="px-5 py-3 text-left">Video</th>
                <th className="hidden px-5 py-3 text-left md:table-cell">Año</th>
                <th className="hidden px-5 py-3 text-left md:table-cell">Orden</th>
                <th className="hidden px-5 py-3 text-left md:table-cell">Estado</th>
                <th className="px-5 py-3 text-right">Acciones</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {itemsFiltrados.map((video) => {
                const ytId = getYoutubeId(video.url);
                return (
                  <tr key={video.id} className="transition hover:bg-slate-50">
                    <td className="px-5 py-4">
                      <div className="flex items-center gap-3">
                        {ytId ? (
                          <img
                            src={`https://img.youtube.com/vi/${ytId}/mqdefault.jpg`}
                            alt=""
                            className="h-10 w-16 shrink-0 rounded-lg object-cover"
                          />
                        ) : (
                          <div className="flex h-10 w-16 shrink-0 items-center justify-center rounded-lg bg-slate-100">
                            <Youtube className="h-4 w-4 text-slate-400" />
                          </div>
                        )}
                        <span className="line-clamp-1 font-medium text-slate-800" title={video.titulo}>
                          {video.titulo}
                        </span>
                      </div>
                    </td>
                    <td className="hidden px-5 py-4 text-slate-500 md:table-cell">{video.anio}</td>
                    <td className="hidden px-5 py-4 text-slate-500 md:table-cell">{video.orden}</td>
                    <td className="hidden px-5 py-4 md:table-cell">
                      <span className={`inline-flex rounded-full px-2.5 py-0.5 text-xs font-medium ${
                        video.activo
                          ? "bg-green-100 text-green-700"
                          : "bg-slate-100 text-slate-500"
                      }`}>
                        {video.activo ? "Activo" : "Oculto"}
                      </span>
                    </td>
                    <td className="px-5 py-4 text-right">
                      <AdminRowActions editTo={`/admin/videos/${video.id}`} onDelete={() => setConfirmId(video.id)} />
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      )}

      <ConfirmDeleteModal
        open={!!confirmId}
        entityLabel="video"
        onConfirm={() => eliminar(confirmId, eliminarVideo)}
        onClose={() => setConfirmId(null)}
        deleting={deleting}
      />
    </div>
  );
}

export default AdminVideos;
