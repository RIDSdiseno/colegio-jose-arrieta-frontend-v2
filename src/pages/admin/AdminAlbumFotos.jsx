import { useEffect, useRef, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { ArrowLeft, ImagePlus, Loader2, Trash2, Upload } from "lucide-react";
import { getAlbumById, agregarFoto, eliminarFoto, subirImagenAlbum } from "../../api/albums";

function AdminAlbumFotos() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [album, setAlbum] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [uploadingImg, setUploadingImg] = useState(false);
  const [confirmId, setConfirmId] = useState(null);
  const [deleting, setDeleting] = useState(false);
  const [newUrl, setNewUrl] = useState("");
  const [newCaption, setNewCaption] = useState("");
  const [adding, setAdding] = useState(false);
  const fileRef = useRef(null);
  const multiFileRef = useRef(null);

  const cargar = () => {
    getAlbumById(id)
      .then(setAlbum)
      .catch(() => setError("No se pudo cargar el álbum."))
      .finally(() => setLoading(false));
  };

  useEffect(() => { cargar(); }, [id]);

  const handleUploadSingle = async (e) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setUploadingImg(true);
    setError("");
    try {
      const url = await subirImagenAlbum(file);
      setNewUrl(url);
    } catch (err) {
      setError("Error al subir: " + err.message);
    } finally {
      setUploadingImg(false);
    }
  };

  const handleAddFoto = async (e) => {
    e.preventDefault();
    if (!newUrl) return;
    setAdding(true);
    setError("");
    try {
      await agregarFoto(id, { url: newUrl, caption: newCaption });
      setNewUrl("");
      setNewCaption("");
      cargar();
    } catch (err) {
      setError(err.message);
    } finally {
      setAdding(false);
    }
  };

  const handleMultiUpload = async (e) => {
    const files = Array.from(e.target.files || []);
    if (!files.length) return;
    setUploadingImg(true);
    setError("");
    try {
      for (const file of files) {
        const url = await subirImagenAlbum(file);
        await agregarFoto(id, { url });
      }
      cargar();
    } catch (err) {
      setError("Error al subir: " + err.message);
    } finally {
      setUploadingImg(false);
    }
  };

  const handleDelete = async () => {
    if (!confirmId) return;
    setDeleting(true);
    try {
      await eliminarFoto(confirmId);
      setConfirmId(null);
      cargar();
    } catch (err) {
      setError(err.message);
    } finally {
      setDeleting(false);
    }
  };

  if (loading) {
    return (
      <div className="flex h-40 items-center justify-center text-slate-400">
        <Loader2 className="h-6 w-6 animate-spin" />
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-4xl">
      <div className="mb-6 flex items-center gap-3">
        <button
          type="button"
          onClick={() => navigate("/admin/albums")}
          className="flex h-9 w-9 items-center justify-center rounded-xl border border-slate-200 text-slate-500 transition hover:border-primary hover:text-primary"
        >
          <ArrowLeft className="h-4 w-4" />
        </button>
        <div>
          <h1 className="font-heading text-2xl font-bold text-primary">
            {album?.titulo}
          </h1>
          <p className="text-sm text-slate-400">{album?.fotos?.length ?? 0} fotos</p>
        </div>
      </div>

      {error ? (
        <div className="mb-4 rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">{error}</div>
      ) : null}

      {/* Subida masiva */}
      <div className="mb-6 rounded-2xl border border-slate-200 bg-white p-5 shadow-soft">
        <p className="mb-3 text-sm font-medium text-slate-700">Subir varias fotos a la vez</p>
        <button
          type="button"
          onClick={() => multiFileRef.current?.click()}
          disabled={uploadingImg}
          className="inline-flex items-center gap-2 rounded-xl border border-slate-300 px-4 py-2 text-sm font-medium text-slate-700 transition hover:border-primary hover:text-primary disabled:opacity-60"
        >
          {uploadingImg ? <Loader2 className="h-4 w-4 animate-spin" /> : <Upload className="h-4 w-4" />}
          {uploadingImg ? "Subiendo..." : "Seleccionar imágenes"}
        </button>
        <input ref={multiFileRef} type="file" accept="image/*" multiple className="hidden" onChange={handleMultiUpload} />
        <p className="mt-1.5 text-xs text-slate-400">Puedes seleccionar múltiples archivos a la vez.</p>
      </div>

      {/* Agregar una foto con URL o subida individual */}
      <form onSubmit={handleAddFoto} className="mb-6 rounded-2xl border border-slate-200 bg-white p-5 shadow-soft">
        <p className="mb-3 text-sm font-medium text-slate-700">Agregar foto individual</p>
        <div className="flex flex-wrap gap-3">
          <div className="flex flex-1 min-w-48 gap-2">
            <input
              value={newUrl}
              onChange={(e) => setNewUrl(e.target.value)}
              placeholder="URL de imagen https://"
              className="flex-1 rounded-xl border border-slate-300 px-4 py-2 text-sm outline-none transition focus:border-primary focus:ring-2 focus:ring-primary/20"
            />
            <button
              type="button"
              onClick={() => fileRef.current?.click()}
              disabled={uploadingImg}
              className="inline-flex items-center gap-1.5 rounded-xl border border-slate-300 px-3 py-2 text-sm font-medium text-slate-700 transition hover:border-primary hover:text-primary disabled:opacity-60"
            >
              {uploadingImg ? <Loader2 className="h-4 w-4 animate-spin" /> : <ImagePlus className="h-4 w-4" />}
            </button>
            <input ref={fileRef} type="file" accept="image/*" className="hidden" onChange={handleUploadSingle} />
          </div>
          <input
            value={newCaption}
            onChange={(e) => setNewCaption(e.target.value)}
            placeholder="Caption (opcional)"
            className="flex-1 min-w-32 rounded-xl border border-slate-300 px-4 py-2 text-sm outline-none transition focus:border-primary focus:ring-2 focus:ring-primary/20"
          />
          <button
            type="submit"
            disabled={adding || !newUrl}
            className="inline-flex items-center gap-2 rounded-xl bg-primary px-5 py-2 text-sm font-semibold text-white transition hover:bg-primaryHover disabled:opacity-60"
          >
            {adding ? <Loader2 className="h-4 w-4 animate-spin" /> : null}
            Agregar
          </button>
        </div>
        {newUrl ? (
          <img src={newUrl} alt="Preview" className="mt-3 h-24 rounded-xl object-cover" />
        ) : null}
      </form>

      {/* Grid de fotos */}
      {album?.fotos?.length === 0 ? (
        <div className="flex h-32 flex-col items-center justify-center gap-2 text-slate-400">
          <ImagePlus className="h-7 w-7" />
          <p className="text-sm">No hay fotos en este álbum.</p>
        </div>
      ) : (
        <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 md:grid-cols-4">
          {album?.fotos?.map((foto) => (
            <div key={foto.id} className="group relative overflow-hidden rounded-xl border border-slate-200">
              <img
                src={foto.url}
                alt={foto.caption || ""}
                className="h-36 w-full object-cover"
              />
              {foto.caption ? (
                <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/60 to-transparent p-2">
                  <p className="text-xs text-white">{foto.caption}</p>
                </div>
              ) : null}
              <button
                onClick={() => setConfirmId(foto.id)}
                className="absolute right-1.5 top-1.5 flex h-7 w-7 items-center justify-center rounded-lg bg-black/50 text-white opacity-0 transition hover:bg-red-500 group-hover:opacity-100"
              >
                <Trash2 className="h-3.5 w-3.5" />
              </button>
            </div>
          ))}
        </div>
      )}

      {/* Modal confirmar eliminación */}
      {confirmId ? (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 px-4">
          <div className="w-full max-w-sm rounded-2xl bg-white p-6 shadow-xl">
            <h3 className="font-heading text-lg font-bold text-slate-800">¿Eliminar foto?</h3>
            <p className="mt-1 text-sm text-slate-500">Esta acción no se puede deshacer.</p>
            <div className="mt-5 flex gap-3">
              <button
                onClick={() => setConfirmId(null)}
                className="flex-1 rounded-xl border border-slate-200 py-2 text-sm font-medium text-slate-700 transition hover:bg-slate-50"
              >
                Cancelar
              </button>
              <button
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

export default AdminAlbumFotos;
