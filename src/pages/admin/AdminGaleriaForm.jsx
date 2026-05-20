import { useEffect, useRef, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { ArrowLeft, ImagePlus, Loader2 } from "lucide-react";
import { getFotoById, crearFoto, actualizarFoto, subirImagenGaleria } from "../../api/galeria";

const EMPTY = {
  url: "",
  caption: "",
  orden: 0,
  activo: true,
};

function AdminGaleriaForm() {
  const { id } = useParams();
  const isEditing = Boolean(id) && id !== "nueva";
  const navigate = useNavigate();

  const [form, setForm] = useState(EMPTY);
  const [loading, setLoading] = useState(isEditing);
  const [saving, setSaving] = useState(false);
  const [uploadingImg, setUploadingImg] = useState(false);
  const [error, setError] = useState("");
  const fileRef = useRef(null);

  useEffect(() => {
    if (!isEditing) return;
    getFotoById(id)
      .then((foto) => {
        setForm({
          url: foto.url || "",
          caption: foto.caption || "",
          orden: foto.orden ?? 0,
          activo: foto.activo ?? true,
        });
      })
      .catch(() => setError("No se encontró la foto."))
      .finally(() => setLoading(false));
  }, [id, isEditing]);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
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
      const url = await subirImagenGaleria(file);
      setForm((prev) => ({ ...prev, url }));
    } catch (err) {
      setError("Error al subir la imagen: " + err.message);
    } finally {
      setUploadingImg(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setSaving(true);
    try {
      const payload = { ...form };
      if (!payload.url) delete payload.url;
      if (isEditing) {
        await actualizarFoto(id, payload);
      } else {
        await crearFoto(payload);
      }
      navigate("/admin/galeria");
    } catch (err) {
      setError(err.message);
    } finally {
      setSaving(false);
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
    <div className="mx-auto max-w-2xl">
      <div className="mb-6 flex items-center gap-3">
        <button
          type="button"
          onClick={() => navigate("/admin/galeria")}
          className="flex h-9 w-9 items-center justify-center rounded-xl border border-slate-200 text-slate-500 transition hover:border-primary hover:text-primary"
        >
          <ArrowLeft className="h-4 w-4" />
        </button>
        <h1 className="font-heading text-2xl font-bold text-primary">
          {isEditing ? "Editar foto" : "Nueva foto"}
        </h1>
      </div>

      {error ? (
        <div className="mb-4 rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
          {error}
        </div>
      ) : null}

      <form onSubmit={handleSubmit} className="space-y-5">
        <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-soft space-y-5">

          {/* Imagen */}
          <div>
            <label className="mb-3 block text-sm font-medium text-slate-700">
              Imagen <span className="text-red-500">*</span>
            </label>

            {form.url ? (
              <div className="relative mb-3">
                <img
                  src={form.url}
                  alt="Vista previa"
                  className="h-48 w-full rounded-xl object-cover"
                />
                <button
                  type="button"
                  onClick={() => setForm((prev) => ({ ...prev, url: "" }))}
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
                {uploadingImg ? (
                  <Loader2 className="h-4 w-4 animate-spin" />
                ) : (
                  <ImagePlus className="h-4 w-4" />
                )}
                {uploadingImg ? "Subiendo..." : "Subir imagen"}
              </button>
              <input
                ref={fileRef}
                type="file"
                accept="image/*"
                className="hidden"
                onChange={handleImageUpload}
              />
              <input
                name="url"
                value={form.url}
                onChange={handleChange}
                placeholder="O pega una URL de imagen https://"
                className="flex-1 rounded-xl border border-slate-300 px-4 py-2 text-sm outline-none transition focus:border-primary focus:ring-2 focus:ring-primary/20"
              />
            </div>
          </div>

          {/* Caption */}
          <div>
            <label className="mb-1 block text-sm font-medium text-slate-700">Caption</label>
            <input
              name="caption"
              value={form.caption}
              onChange={handleChange}
              placeholder="Ej: Fiestas Patrias 2025"
              className="w-full rounded-xl border border-slate-300 px-4 py-2.5 text-sm outline-none transition focus:border-primary focus:ring-2 focus:ring-primary/20"
            />
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

        <div className="flex justify-end gap-3">
          <button
            type="button"
            onClick={() => navigate("/admin/galeria")}
            className="rounded-xl border border-slate-200 px-6 py-2.5 text-sm font-medium text-slate-700 transition hover:bg-slate-50"
          >
            Cancelar
          </button>
          <button
            type="submit"
            disabled={saving || !form.url}
            className="inline-flex items-center gap-2 rounded-xl bg-primary px-6 py-2.5 text-sm font-semibold text-white transition hover:bg-primaryHover disabled:opacity-60"
          >
            {saving ? <Loader2 className="h-4 w-4 animate-spin" /> : null}
            {saving ? "Guardando..." : isEditing ? "Guardar cambios" : "Agregar foto"}
          </button>
        </div>
      </form>
    </div>
  );
}

export default AdminGaleriaForm;
