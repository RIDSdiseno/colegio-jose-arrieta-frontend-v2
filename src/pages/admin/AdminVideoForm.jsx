import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Youtube } from "lucide-react";
import { crearVideo, actualizarVideo, getVideoById } from "../../api/videos";
import { getYoutubeId } from "../../lib/youtube";
import AdminPageHeader from "../../components/admin/AdminPageHeader";
import ErrorBanner from "../../components/admin/ErrorBanner";
import AdminFormActions from "../../components/admin/AdminFormActions";
import AdminLoadingSpinner from "../../components/admin/AdminLoadingSpinner";

const EMPTY = {
  titulo: "",
  url: "",
  anio: new Date().getFullYear(),
  orden: 0,
  activo: true,
};

function AdminVideoForm() {
  const { id } = useParams();
  const isEditing = Boolean(id) && id !== "nuevo";
  const navigate = useNavigate();

  const [form, setForm] = useState(EMPTY);
  const [loading, setLoading] = useState(isEditing);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    if (!isEditing) return;
    getVideoById(id)
      .then((data) => setForm({
        titulo: data.titulo || "",
        url: data.url || "",
        anio: data.anio ?? new Date().getFullYear(),
        orden: data.orden ?? 0,
        activo: data.activo ?? true,
      }))
      .catch(() => setError("No se encontró el video."))
      .finally(() => setLoading(false));
  }, [id, isEditing]);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setForm((prev) => ({ ...prev, [name]: type === "checkbox" ? checked : value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setSaving(true);
    try {
      const payload = {
        titulo: form.titulo,
        url: form.url,
        anio: parseInt(form.anio),
        orden: parseInt(form.orden) || 0,
        activo: form.activo,
      };
      if (isEditing) {
        await actualizarVideo(id, payload);
      } else {
        await crearVideo(payload);
      }
      navigate("/admin/videos");
    } catch (err) {
      setError(err.message);
    } finally {
      setSaving(false);
    }
  };

  if (loading) return <AdminLoadingSpinner />;

  const ytId = getYoutubeId(form.url);

  return (
    <div className="mx-auto max-w-2xl">
      <AdminPageHeader
        title={isEditing ? "Editar video" : "Nuevo video"}
        backTo="/admin/videos"
      />

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
              required
              value={form.titulo}
              onChange={handleChange}
              placeholder="Ej: Video Institucional"
              className="w-full rounded-xl border border-slate-300 px-4 py-2.5 text-sm outline-none transition focus:border-primary focus:ring-2 focus:ring-primary/20"
            />
          </div>

          {/* URL de YouTube */}
          <div>
            <label className="mb-1 block text-sm font-medium text-slate-700">
              URL de YouTube <span className="text-red-500">*</span>
            </label>
            <div className="flex items-center gap-2 rounded-xl border border-slate-300 px-4 py-2.5 focus-within:border-primary focus-within:ring-2 focus-within:ring-primary/20 transition">
              <Youtube className="h-4 w-4 shrink-0 text-red-500" />
              <input
                name="url"
                required
                value={form.url}
                onChange={handleChange}
                placeholder="https://www.youtube.com/watch?v=..."
                className="flex-1 bg-transparent text-sm text-slate-700 outline-none placeholder-slate-400"
              />
            </div>
            <p className="mt-1 text-xs text-slate-400">
              Acepta URLs del tipo youtube.com/watch?v=... o youtu.be/...
            </p>
          </div>

          {/* Preview del thumbnail */}
          {ytId && (
            <div className="overflow-hidden rounded-xl border border-slate-200">
              <img
                src={`https://img.youtube.com/vi/${ytId}/maxresdefault.jpg`}
                alt="Vista previa"
                className="w-full object-cover max-h-52"
              />
              <p className="px-3 py-2 text-xs text-slate-400">Vista previa del thumbnail</p>
            </div>
          )}

          {/* Año y Orden */}
          <div className="grid gap-4 sm:grid-cols-2">
            <div>
              <label className="mb-1 block text-sm font-medium text-slate-700">
                Año <span className="text-red-500">*</span>
              </label>
              <input
                type="number"
                name="anio"
                required
                min="2000"
                max="2100"
                value={form.anio}
                onChange={handleChange}
                className="w-full rounded-xl border border-slate-300 px-4 py-2.5 text-sm outline-none transition focus:border-primary focus:ring-2 focus:ring-primary/20"
              />
            </div>
            <div>
              <label className="mb-1 block text-sm font-medium text-slate-700">Orden</label>
              <input
                type="number"
                name="orden"
                min="0"
                value={form.orden}
                onChange={handleChange}
                className="w-full rounded-xl border border-slate-300 px-4 py-2.5 text-sm outline-none transition focus:border-primary focus:ring-2 focus:ring-primary/20"
              />
              <p className="mt-1 text-xs text-slate-400">Menor número = aparece primero.</p>
            </div>
          </div>

          {/* Activo */}
          <label className="flex cursor-pointer items-center gap-3">
            <input
              type="checkbox"
              name="activo"
              checked={form.activo}
              onChange={handleChange}
              className="h-4 w-4 rounded border-slate-300 accent-primary"
            />
            <span className="text-sm font-medium text-slate-700">Visible en el sitio</span>
          </label>
        </div>

        <AdminFormActions
          saving={saving}
          cancelTo="/admin/videos"
          isEditing={isEditing}
          saveLabel={isEditing ? "Guardar cambios" : "Agregar video"}
        />
      </form>
    </div>
  );
}

export default AdminVideoForm;
