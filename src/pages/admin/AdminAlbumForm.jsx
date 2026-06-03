import { useEffect, useRef, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { ImagePlus, Loader2 } from "lucide-react";
import { getAlbumById, crearAlbum, actualizarAlbum, subirImagenAlbum } from "../../api/albums";
import { eliminarArchivoStorage } from "../../lib/storage";
import AdminPageHeader from "../../components/admin/AdminPageHeader";
import ErrorBanner from "../../components/admin/ErrorBanner";
import AdminFormActions from "../../components/admin/AdminFormActions";
import AdminLoadingSpinner from "../../components/admin/AdminLoadingSpinner";

const EMPTY = { titulo: "", descripcion: "", portada: "", orden: 0, activo: true };

function AdminAlbumForm() {
  const { id } = useParams();
  const isEditing = Boolean(id) && id !== "nuevo";
  const navigate = useNavigate();

  const [form, setForm] = useState(EMPTY);
  const [loading, setLoading] = useState(isEditing);
  const [saving, setSaving] = useState(false);
  const [uploadingImg, setUploadingImg] = useState(false);
  const [error, setError] = useState("");
  const fileRef = useRef(null);
  // URL de portada ya guardada en DB — evita borrar imágenes existentes al limpiar el campo
  const savedPortadaRef = useRef("");

  useEffect(() => {
    if (!isEditing) return;
    let cancelled = false;
    getAlbumById(id)
      .then((album) => {
        if (cancelled) return;
        setForm({
          titulo: album.titulo || "",
          descripcion: album.descripcion || "",
          portada: album.portada || "",
          orden: album.orden ?? 0,
          activo: album.activo ?? true,
        });
        savedPortadaRef.current = album.portada || "";
      })
      .catch(() => { if (!cancelled) setError("No se encontró el álbum."); })
      .finally(() => { if (!cancelled) setLoading(false); });
    return () => { cancelled = true; };
  }, [id, isEditing]);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    // Limpiar portada de Storage solo cuando el campo queda vacío
    // No borrar en cada tecla — igual que AdminNoticiaForm
    if (name === "portada" && value === "") {
      const prev = form.portada;
      if (prev && prev !== savedPortadaRef.current) {
        eliminarArchivoStorage(prev, "galeria").catch(() => {});
      }
    }
    setForm((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : name === "orden" ? parseInt(value) || 0 : value,
    }));
  };

  const handleImageUpload = async (e) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setUploadingImg(true);
    setError("");
    try {
      const prevPortada = form.portada;
      const url = await subirImagenAlbum(file);
      // Si había una portada subida en esta sesión (no la de BD), limpiarla
      if (prevPortada && prevPortada !== savedPortadaRef.current) {
        eliminarArchivoStorage(prevPortada, "galeria").catch(() => {});
      }
      setForm((prev) => ({ ...prev, portada: url }));
    } catch (err) {
      setError("Error al subir la imagen: " + err.message);
    } finally {
      setUploadingImg(false);
    }
  };

  const handleCancel = () => {
    // Limpiar portada subida en esta sesión pero no guardada en BD
    if (form.portada && form.portada !== savedPortadaRef.current) {
      eliminarArchivoStorage(form.portada, "galeria").catch(() => {});
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setSaving(true);
    try {
      const payload = { ...form };
      if (!payload.portada) {
        // Al editar, enviar null explícitamente para que el backend limpie la portada en BD
        // Al crear, omitir el campo para no enviar un string vacío
        if (isEditing) payload.portada = null;
        else delete payload.portada;
      }
      if (isEditing) {
        await actualizarAlbum(id, payload);
      } else {
        await crearAlbum(payload);
      }
      navigate("/admin/albums");
    } catch (err) {
      setError(err.message);
    } finally {
      setSaving(false);
    }
  };

  if (loading) return <AdminLoadingSpinner />;

  return (
    <div className="mx-auto max-w-2xl">
      <AdminPageHeader title={isEditing ? "Editar álbum" : "Nuevo álbum"} backTo="/admin/albums" />

      <ErrorBanner message={error} />

      <form onSubmit={handleSubmit} className="space-y-5">
        <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-soft space-y-5">

          {/* Título */}
          <div>
            <label className="mb-1 block text-sm font-medium text-slate-700">
              Título <span className="text-red-500">*</span>
            </label>
            <input
              name="titulo"
              value={form.titulo}
              onChange={handleChange}
              required
              placeholder="Ej: Fiestas Patrias 2025"
              className="w-full rounded-xl border border-slate-300 px-4 py-2.5 text-sm outline-none transition focus:border-primary focus:ring-2 focus:ring-primary/20"
            />
          </div>

          {/* Descripción */}
          <div>
            <label className="mb-1 block text-sm font-medium text-slate-700">Descripción</label>
            <textarea
              name="descripcion"
              value={form.descripcion}
              onChange={handleChange}
              rows={2}
              placeholder="Descripción breve del álbum (opcional)"
              className="w-full rounded-xl border border-slate-300 px-4 py-2.5 text-sm outline-none transition focus:border-primary focus:ring-2 focus:ring-primary/20 resize-none"
            />
          </div>

          {/* Portada */}
          <div>
            <label className="mb-3 block text-sm font-medium text-slate-700">Portada</label>
            {form.portada ? (
              <div className="relative mb-3">
                <img src={form.portada} alt="Portada" className="h-48 w-full rounded-xl object-cover" />
                <button
                  type="button"
                  onClick={() => {
                    const url = form.portada;
                    if (url && url !== savedPortadaRef.current) {
                      eliminarArchivoStorage(url, "galeria").catch(() => {});
                    }
                    setForm((prev) => ({ ...prev, portada: "" }));
                  }}
                  className="absolute right-2 top-2 rounded-lg bg-black/50 px-2 py-1 text-xs text-white transition hover:bg-black/70"
                >
                  Quitar
                </button>
              </div>
            ) : null}
            <div className="flex gap-3">
              <button
                type="button"
                onClick={() => fileRef.current?.click()}
                disabled={uploadingImg}
                className="inline-flex items-center gap-2 rounded-xl border border-slate-300 px-4 py-2 text-sm font-medium text-slate-700 transition hover:border-primary hover:text-primary disabled:opacity-60"
              >
                {uploadingImg ? <Loader2 className="h-4 w-4 animate-spin" /> : <ImagePlus className="h-4 w-4" />}
                {uploadingImg ? "Subiendo..." : "Subir portada"}
              </button>
              <input ref={fileRef} type="file" accept="image/*" className="hidden" onChange={handleImageUpload} />
              <input
                name="portada"
                value={form.portada}
                onChange={handleChange}
                placeholder="O pega una URL https://"
                className="flex-1 rounded-xl border border-slate-300 px-4 py-2 text-sm outline-none transition focus:border-primary focus:ring-2 focus:ring-primary/20"
              />
            </div>
          </div>

          {/* Orden */}
          <div>
            <label className="mb-1 block text-sm font-medium text-slate-700">Orden</label>
            <input
              type="number"
              name="orden"
              min={0}
              value={form.orden}
              onChange={handleChange}
              className="w-32 rounded-xl border border-slate-300 px-4 py-2.5 text-sm outline-none transition focus:border-primary focus:ring-2 focus:ring-primary/20"
            />
            <p className="mt-1 text-xs text-slate-400">Número menor = aparece primero.</p>
          </div>

          {/* Visible */}
          <div className="flex items-center gap-3">
            <input
              type="checkbox"
              id="activo"
              name="activo"
              checked={form.activo}
              onChange={handleChange}
              className="h-4 w-4 rounded border-slate-300 text-primary"
            />
            <label htmlFor="activo" className="text-sm font-medium text-slate-700">
              Visible en el sitio
            </label>
          </div>
        </div>

        <AdminFormActions saving={saving} cancelTo="/admin/albums" isEditing={isEditing} saveLabel={isEditing ? "Guardar álbum" : "Crear álbum"} onCancel={handleCancel} />
      </form>
    </div>
  );
}

export default AdminAlbumForm;
