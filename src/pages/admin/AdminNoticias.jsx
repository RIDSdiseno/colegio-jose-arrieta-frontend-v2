import { useCallback, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Plus, Pencil, Trash2, CalendarDays, AlertTriangle, ChevronLeft, ChevronRight } from "lucide-react";
import { getNoticiasAdmin, eliminarNoticia } from "../../api/noticias";
import { eliminarArchivoStorage } from "../../lib/storage";
import { formatDate } from "../../lib/utils";

const PAGE_SIZE = 20;

/** Extrae todas las URLs de imágenes del contenido HTML de una noticia */
function extractImagenesContenido(html = "") {
  const urls = [];
  const regex = /<img[^>]+src="([^"]+)"/gi;
  let m;
  while ((m = regex.exec(html)) !== null) urls.push(m[1]);
  return urls;
}

function AdminNoticias() {
  const [items, setItems] = useState([]);
  const [total, setTotal] = useState(0);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [confirmTarget, setConfirmTarget] = useState(null); // { id, imagen, contenido }
  const [deleting, setDeleting] = useState(false);

  const cargar = useCallback(async (p) => {
    setLoading(true);
    setError("");
    try {
      const res = await getNoticiasAdmin({ limit: PAGE_SIZE, page: p });
      setItems(res.data || []);
      setTotal(res.total || 0);
      setTotalPages(res.totalPages || 1);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => { cargar(page); }, [page, cargar]);

  useEffect(() => {
    if (!confirmTarget) return;
    const handler = (e) => { if (e.key === "Escape" && !deleting) setConfirmTarget(null); };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [confirmTarget, deleting]);

  const handleEliminar = async () => {
    if (!confirmTarget) return;
    setDeleting(true);
    try {
      await eliminarNoticia(confirmTarget.id);
      // Limpiar portada e imágenes del cuerpo del artículo en Storage (fire-and-forget)
      const urlsABorrar = [
        confirmTarget.imagen,
        ...extractImagenesContenido(confirmTarget.contenido),
      ].filter(Boolean);
      urlsABorrar.forEach((url) => eliminarArchivoStorage(url, "noticias").catch(() => {}));
      const newPage = items.length === 1 && page > 1 ? page - 1 : page;
      if (newPage !== page) {
        setPage(newPage);
      } else {
        cargar(page);
      }
    } catch (err) {
      setError(err.message);
    } finally {
      setDeleting(false);
      setConfirmTarget(null);
    }
  };

  return (
    <div>
      <div className="mb-6 flex items-center justify-between">
        <div>
          <h1 className="font-heading text-2xl font-bold text-primary">Noticias</h1>
          <p className="mt-0.5 text-sm text-slate-500">{total} publicaciones</p>
        </div>
        <Link
          to="/admin/noticias/nueva"
          className="inline-flex items-center gap-2 rounded-xl bg-primary px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-primaryHover"
        >
          <Plus className="h-4 w-4" />
          Nueva noticia
        </Link>
      </div>

      {error ? (
        <div className="mb-4 rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
          {error}
        </div>
      ) : null}

      {loading ? (
        <div className="space-y-3">
          {Array.from({ length: 5 }).map((_, i) => (
            <div key={i} className="h-16 animate-pulse rounded-2xl bg-white" />
          ))}
        </div>
      ) : items.length === 0 ? (
        <div className="rounded-2xl border border-dashed border-slate-300 bg-white py-16 text-center text-slate-500">
          No hay noticias publicadas.{" "}
          <Link to="/admin/noticias/nueva" className="font-semibold text-primary hover:underline">
            Crea la primera
          </Link>
        </div>
      ) : (
        <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-soft">
          <table className="w-full text-sm">
            <thead className="border-b border-slate-100 bg-slate-50 text-xs uppercase tracking-wide text-slate-500">
              <tr>
                <th className="px-5 py-3 text-left">Título</th>
                <th className="hidden px-5 py-3 text-left md:table-cell">Categoría</th>
                <th className="hidden px-5 py-3 text-left lg:table-cell">Fecha</th>
                <th className="px-5 py-3 text-right">Acciones</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {items.map((noticia) => (
                <tr key={noticia.id} className="transition hover:bg-slate-50">
                  <td className="px-5 py-4">
                    <div className="flex items-center gap-3">
                      {noticia.imagen ? (
                        <img
                          src={noticia.imagen}
                          alt=""
                          className="h-10 w-10 shrink-0 rounded-lg object-cover"
                        />
                      ) : (
                        <div className="h-10 w-10 shrink-0 rounded-lg bg-slate-100" />
                      )}
                      <span className="line-clamp-1 font-medium text-slate-800">
                        {noticia.titulo}
                      </span>
                    </div>
                  </td>
                  <td className="hidden px-5 py-4 text-slate-500 md:table-cell">
                    {noticia.categoria || "—"}
                  </td>
                  <td className="hidden px-5 py-4 text-slate-500 lg:table-cell">
                    <span className="inline-flex items-center gap-1">
                      <CalendarDays className="h-3.5 w-3.5" />
                      {noticia.fecha ? formatDate(noticia.fecha) : "—"}
                    </span>
                  </td>
                  <td className="px-5 py-4 text-right">
                    <div className="flex items-center justify-end gap-2">
                      <Link
                        to={`/admin/noticias/${noticia.id}`}
                        className="flex h-8 w-8 items-center justify-center rounded-lg border border-slate-200 text-slate-500 transition hover:border-primary hover:text-primary"
                      >
                        <Pencil className="h-3.5 w-3.5" />
                      </Link>
                      <button
                        type="button"
                        onClick={() => setConfirmTarget({ id: noticia.id, imagen: noticia.imagen || null, contenido: noticia.contenido || "" })}
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

      {/* Paginación */}
      {totalPages > 1 && (
        <div className="mt-4 flex items-center justify-between">
          <p className="text-xs text-slate-400">
            Página {page} de {totalPages}
          </p>
          <div className="flex gap-2">
            <button
              type="button"
              onClick={() => setPage((p) => Math.max(1, p - 1))}
              disabled={page === 1 || loading}
              className="flex h-8 w-8 items-center justify-center rounded-lg border border-slate-200 text-slate-500 transition hover:border-primary hover:text-primary disabled:opacity-40"
            >
              <ChevronLeft className="h-4 w-4" />
            </button>
            <button
              type="button"
              onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
              disabled={page === totalPages || loading}
              className="flex h-8 w-8 items-center justify-center rounded-lg border border-slate-200 text-slate-500 transition hover:border-primary hover:text-primary disabled:opacity-40"
            >
              <ChevronRight className="h-4 w-4" />
            </button>
          </div>
        </div>
      )}

      {confirmTarget ? (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 px-4"
          onClick={() => { if (!deleting) setConfirmTarget(null); }}
        >
          <div className="w-full max-w-sm rounded-2xl bg-white p-6 shadow-xl" onClick={(e) => e.stopPropagation()}>
            <div className="flex items-center gap-3 text-amber-600">
              <AlertTriangle className="h-5 w-5" />
              <h2 className="font-heading text-lg font-semibold">¿Eliminar noticia?</h2>
            </div>
            <p className="mt-2 text-sm text-slate-600">
              Esta acción no se puede deshacer. La noticia se eliminará permanentemente.
            </p>
            <div className="mt-5 flex gap-3">
              <button
                type="button"
                onClick={() => setConfirmTarget(null)}
                className="flex-1 rounded-xl border border-slate-200 py-2 text-sm font-medium text-slate-700 transition hover:bg-slate-50"
              >
                Cancelar
              </button>
              <button
                type="button"
                onClick={handleEliminar}
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

export default AdminNoticias;
