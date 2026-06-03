import { useCallback, useEffect, useRef, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { ImagePlus, Loader2, Trash2, Upload } from "lucide-react";
import { getAlbumById, agregarFoto, eliminarFoto, subirImagenAlbum } from "../../api/albums";
import { eliminarArchivoStorage } from "../../lib/storage";
import AdminPageHeader from "../../components/admin/AdminPageHeader";
import ErrorBanner from "../../components/admin/ErrorBanner";
import AdminLoadingSpinner from "../../components/admin/AdminLoadingSpinner";

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

  const cargar = useCallback(async () => {
    setLoading(true);
    setError("");
    try {
      const data = await getAlbumById(id);
      setAlbum(data);
    } catch {
      setError("No se pudo cargar el álbum.");
    } finally {
      setLoading(false);
    }
  }, [id]);

  useEffect(() => { cargar(); }, [cargar]);

  useEffect(() => {
    if (!confirmId) return;
    const handler = (e) => { if (e.key === "Escape" && !deleting) setConfirmId(null); };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [confirmId, deleting]);

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
      if (fileRef.current) fileRef.current.value = "";
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
      // Limpiar el archivo ya subido si no se pudo registrar en BD
      eliminarArchivoStorage(newUrl, "galeria").catch(() => {});
      setNewUrl(""); // evitar que el input muestre una URL ya eliminada
    } finally {
      setAdding(false);
    }
  };

  const handleMultiUpload = async (e) => {
    const files = Array.from(e.target.files || []);
    if (!files.length) return;
    setUploadingImg(true);
    setError("");
    let failed = 0;
    try {
      for (const file of files) {
        let uploadedUrl = null;
        try {
          uploadedUrl = await subirImagenAlbum(file);
          await agregarFoto(id, { url: uploadedUrl });
        } catch {
          failed++;
          // Si la imagen se subió pero el registro en BD falló, limpiar el archivo huérfano
          if (uploadedUrl) {
            await eliminarArchivoStorage(uploadedUrl, "galeria").catch(() => {});
          }
        }
      }
      if (failed === files.length) setError(`No se pudo subir ninguna foto. Intenta de nuevo.`);
      else if (failed > 0) setError(`${files.length - failed} foto(s) subidas correctamente. ${failed} fallaron.`);
    } finally {
      if (multiFileRef.current) multiFileRef.current.value = "";
      setUploadingImg(false); // re-habilitar botón antes del reload del grid
      try { await cargar(); } catch { /* error ya mostrado arriba */ }
    }
  };

  const handleDelete = async () => {
    if (!confirmId) return;
    setDeleting(true);
    try {
      // Obtener URL antes de eliminar para poder limpiar Storage
      const foto = album?.fotos?.find((f) => f.id === confirmId);
      await eliminarFoto(confirmId);
      // Limpiar archivo de Storage en segundo plano (fire-and-forget)
      if (foto?.url) eliminarArchivoStorage(foto.url, "galeria").catch(() => {});
      await cargar();
    } catch (err) {
      setError(err.message);
    } finally {
      setDeleting(false);
      setConfirmId(null);
    }
  };

  if (loading) return <AdminLoadingSpinner />;
  if (!album) return null; // carga terminó pero album es null — error ya mostrado en ErrorBanner

  return (
    <div className="mx-auto max-w-4xl">
      <AdminPageHeader title={album.titulo} subtitle={`${album.fotos?.length ?? 0} fotos`} backTo="/admin/albums" />

      <ErrorBanner message={error} />

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
              className={`flex-1 rounded-xl border px-4 py-2 text-sm outline-none transition focus:ring-2 ${
                newUrl && !newUrl.startsWith("https://")
                  ? "border-red-300 focus:border-red-400 focus:ring-red-200"
                  : "border-slate-300 focus:border-primary focus:ring-primary/20"
              }`}
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
            disabled={adding || !newUrl || !newUrl.startsWith("https://")}
            className="inline-flex items-center gap-2 rounded-xl bg-primary px-5 py-2 text-sm font-semibold text-white transition hover:bg-primaryHover disabled:opacity-60"
          >
            {adding ? <Loader2 className="h-4 w-4 animate-spin" /> : null}
            Agregar
          </button>
        </div>
        {newUrl && newUrl.startsWith("https://") ? (
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
                type="button"
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
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 px-4"
          onClick={() => { if (!deleting) setConfirmId(null); }}
        >
          <div className="w-full max-w-sm rounded-2xl bg-white p-6 shadow-xl" onClick={(e) => e.stopPropagation()}>
            <h3 className="font-heading text-lg font-bold text-slate-800">¿Eliminar foto?</h3>
            <p className="mt-1 text-sm text-slate-500">Esta acción no se puede deshacer.</p>
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

export default AdminAlbumFotos;
