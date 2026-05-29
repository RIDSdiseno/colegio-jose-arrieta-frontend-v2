import { useCallback, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Plus, Pencil, Trash2, Loader2, Images, Eye, EyeOff } from "lucide-react";
import { getAlbumsAdmin, eliminarAlbum } from "../../api/albums";

function AdminAlbums() {
  const navigate = useNavigate();
  const [albums, setAlbums] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [confirmId, setConfirmId] = useState(null);
  const [deleting, setDeleting] = useState(false);

  const cargar = useCallback(async () => {
    setLoading(true);
    setError("");
    try {
      const data = await getAlbumsAdmin();
      setAlbums(data);
    } catch {
      setError("No se pudieron cargar los álbumes.");
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

  const handleDelete = async () => {
    if (!confirmId) return;
    setDeleting(true);
    try {
      await eliminarAlbum(confirmId);
      cargar();
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
        <h1 className="font-heading text-2xl font-bold text-primary">Galería — Álbumes</h1>
        <button
          onClick={() => navigate("/admin/albums/nuevo")}
          className="inline-flex items-center gap-2 rounded-xl bg-primary px-4 py-2.5 text-sm font-semibold text-white transition hover:bg-primaryHover"
        >
          <Plus className="h-4 w-4" />
          Nuevo álbum
        </button>
      </div>

      {error ? (
        <div className="mb-4 rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">{error}</div>
      ) : null}

      {loading ? (
        <div className="flex h-40 items-center justify-center text-slate-400">
          <Loader2 className="h-6 w-6 animate-spin" />
        </div>
      ) : albums.length === 0 ? (
        <div className="flex h-40 flex-col items-center justify-center gap-2 text-slate-400">
          <Images className="h-8 w-8" />
          <p className="text-sm">No hay álbumes aún.</p>
        </div>
      ) : (
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {albums.map((album) => (
            <div
              key={album.id}
              className="group relative overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-soft transition hover:shadow-md"
            >
              {/* Portada */}
              <div className="relative h-40 bg-slate-100">
                {album.portada ? (
                  <img src={album.portada} alt={album.titulo} className="h-full w-full object-cover" />
                ) : (
                  <div className="flex h-full items-center justify-center text-slate-300">
                    <Images className="h-10 w-10" />
                  </div>
                )}
                {/* Badge activo */}
                <span className={`absolute left-2 top-2 inline-flex items-center gap-1 rounded-full px-2 py-0.5 text-xs font-semibold ${album.activo ? "bg-green-100 text-green-700" : "bg-slate-100 text-slate-500"}`}>
                  {album.activo ? <Eye className="h-3 w-3" /> : <EyeOff className="h-3 w-3" />}
                  {album.activo ? "Visible" : "Oculto"}
                </span>
              </div>

              <div className="p-4">
                <h2 className="font-semibold text-slate-800 truncate">{album.titulo}</h2>
                {album.descripcion ? (
                  <p className="mt-0.5 text-xs text-slate-400 line-clamp-2">{album.descripcion}</p>
                ) : null}
                <p className="mt-1 text-xs text-slate-400">{album._count?.fotos ?? 0} foto{album._count?.fotos !== 1 ? "s" : ""}</p>

                <div className="mt-3 flex gap-2">
                  <button
                    onClick={() => navigate(`/admin/albums/${album.id}`)}
                    className="inline-flex flex-1 items-center justify-center gap-1.5 rounded-xl border border-slate-200 py-1.5 text-xs font-medium text-slate-600 transition hover:border-primary hover:text-primary"
                  >
                    <Pencil className="h-3 w-3" />
                    Editar
                  </button>
                  <button
                    onClick={() => navigate(`/admin/albums/${album.id}/fotos`)}
                    className="inline-flex flex-1 items-center justify-center gap-1.5 rounded-xl border border-slate-200 py-1.5 text-xs font-medium text-slate-600 transition hover:border-primary hover:text-primary"
                  >
                    <Images className="h-3 w-3" />
                    Fotos
                  </button>
                  <button
                    onClick={() => setConfirmId(album.id)}
                    className="inline-flex items-center justify-center rounded-xl border border-slate-200 px-2.5 py-1.5 text-xs font-medium text-red-500 transition hover:border-red-300 hover:bg-red-50"
                  >
                    <Trash2 className="h-3 w-3" />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Modal confirmar eliminación */}
      {confirmId ? (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 px-4"
          onClick={() => { if (!deleting) setConfirmId(null); }}
        >
          <div className="w-full max-w-sm rounded-2xl bg-white p-6 shadow-xl" onClick={(e) => e.stopPropagation()}>
            <h3 className="font-heading text-lg font-bold text-slate-800">¿Eliminar álbum?</h3>
            <p className="mt-1 text-sm text-slate-500">Se eliminarán también todas las fotos del álbum. Esta acción no se puede deshacer.</p>
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
                onClick={handleDelete}
                disabled={deleting}
                className="inline-flex flex-1 items-center justify-center gap-2 rounded-xl bg-red-500 py-2 text-sm font-semibold text-white transition hover:bg-red-600 disabled:opacity-60"
              >
                {deleting ? <Loader2 className="h-4 w-4 animate-spin" /> : null}
                {deleting ? "Eliminando..." : "Eliminar"}
              </button>
            </div>
          </div>
        </div>
      ) : null}
    </div>
  );
}

export default AdminAlbums;
