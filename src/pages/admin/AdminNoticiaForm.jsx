import { useEffect, useRef, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { ArrowLeft, ImagePlus, Loader2 } from "lucide-react";
import {
  crearNoticia,
  actualizarNoticia,
  subirImagen,
  getNoticiaById,
} from "../../api/noticias";

const CATEGORIAS = [
  "General",
  "Académico",
  "Deportivo",
  "Cultural",
  "Institucional",
  "Comunidad",
];

const EMPTY = {
  titulo: "",
  slug: "",
  extracto: "",
  contenido: "",
  categoria: "General",
  imagen: "",
  fecha: new Date().toISOString().split("T")[0],
};

function slugify(str) {
  return str
    .toLowerCase()
    .normalize("NFD")
    .replace(/[̀-ͯ]/g, "")
    .replace(/[^a-z0-9\s-]/g, "")
    .trim()
    .replace(/\s+/g, "-");
}

function AdminNoticiaForm() {
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
    getNoticiaById(id)
      .then((data) => {
        setForm({
          titulo: data.titulo || "",
          slug: data.slug || "",
          extracto: data.extracto || "",
          contenido: data.contenido || "",
          categoria: data.categoria || "General",
          imagen: data.imagen || "",
          fecha: data.fecha
            ? data.fecha.split("T")[0]
            : new Date().toISOString().split("T")[0],
        });
      })
      .catch(() => setError("No se encontró la noticia."))
      .finally(() => setLoading(false));
  }, [id, isEditing]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => {
      const next = { ...prev, [name]: value };
      if (name === "titulo" && !isEditing) {
        next.slug = slugify(value);
      }
      return next;
    });
  };

  const handleImageUpload = async (e) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setUploadingImg(true);
    setError("");
    try {
      const url = await subirImagen(file);
      setForm((prev) => ({ ...prev, imagen: url }));
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
      if (!payload.imagen) delete payload.imagen;
      if (isEditing) {
        await actualizarNoticia(id, payload);
      } else {
        await crearNoticia(payload);
      }
      navigate("/admin/noticias");
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
    <div className="mx-auto max-w-3xl">
      <div className="mb-6 flex items-center gap-3">
        <button
          type="button"
          onClick={() => navigate("/admin/noticias")}
          className="flex h-9 w-9 items-center justify-center rounded-xl border border-slate-200 text-slate-500 transition hover:border-primary hover:text-primary"
        >
          <ArrowLeft className="h-4 w-4" />
        </button>
        <h1 className="font-heading text-2xl font-bold text-primary">
          {isEditing ? "Editar noticia" : "Nueva noticia"}
        </h1>
      </div>

      {error ? (
        <div className="mb-4 rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
          {error}
        </div>
      ) : null}

      <form onSubmit={handleSubmit} className="space-y-5">
        <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-soft space-y-5">
          <div>
            <label className="mb-1 block text-sm font-medium text-slate-700">
              Título <span className="text-red-500">*</span>
            </label>
            <input
              name="titulo"
              required
              value={form.titulo}
              onChange={handleChange}
              placeholder="Ej: Día del Deporte 2026"
              className="w-full rounded-xl border border-slate-300 px-4 py-2.5 text-sm outline-none transition focus:border-primary focus:ring-2 focus:ring-primary/20"
            />
          </div>

          <div>
            <label className="mb-1 block text-sm font-medium text-slate-700">
              Slug (URL) <span className="text-red-500">*</span>
            </label>
            <input
              name="slug"
              required
              value={form.slug}
              onChange={handleChange}
              placeholder="dia-del-deporte-2026"
              className="w-full rounded-xl border border-slate-300 px-4 py-2.5 font-mono text-sm outline-none transition focus:border-primary focus:ring-2 focus:ring-primary/20"
            />
            <p className="mt-1 text-xs text-slate-400">
              Se genera automáticamente. Solo letras, números y guiones.
            </p>
          </div>

          <div className="grid gap-4 sm:grid-cols-2">
            <div>
              <label className="mb-1 block text-sm font-medium text-slate-700">
                Categoría
              </label>
              <select
                name="categoria"
                value={form.categoria}
                onChange={handleChange}
                className="w-full rounded-xl border border-slate-300 px-4 py-2.5 text-sm outline-none transition focus:border-primary focus:ring-2 focus:ring-primary/20"
              >
                {CATEGORIAS.map((c) => (
                  <option key={c} value={c}>{c}</option>
                ))}
              </select>
            </div>

            <div>
              <label className="mb-1 block text-sm font-medium text-slate-700">
                Fecha <span className="text-red-500">*</span>
              </label>
              <input
                type="date"
                name="fecha"
                required
                value={form.fecha}
                onChange={handleChange}
                className="w-full rounded-xl border border-slate-300 px-4 py-2.5 text-sm outline-none transition focus:border-primary focus:ring-2 focus:ring-primary/20"
              />
            </div>
          </div>

          <div>
            <label className="mb-1 block text-sm font-medium text-slate-700">
              Extracto <span className="text-red-500">*</span>
            </label>
            <textarea
              name="extracto"
              required
              rows={2}
              value={form.extracto}
              onChange={handleChange}
              placeholder="Breve descripción que aparece en el listado de noticias."
              className="w-full resize-none rounded-xl border border-slate-300 px-4 py-2.5 text-sm outline-none transition focus:border-primary focus:ring-2 focus:ring-primary/20"
            />
          </div>

          <div>
            <label className="mb-1 block text-sm font-medium text-slate-700">
              Contenido completo
            </label>
            <textarea
              name="contenido"
              rows={8}
              value={form.contenido}
              onChange={handleChange}
              placeholder="Puedes usar HTML básico: <p>, <b>, <ul>, <li>, <a href='...'>..."
              className="w-full rounded-xl border border-slate-300 px-4 py-2.5 font-mono text-sm outline-none transition focus:border-primary focus:ring-2 focus:ring-primary/20"
            />
            <p className="mt-1 text-xs text-slate-400">
              Acepta HTML básico para dar formato al contenido.
            </p>
          </div>
        </div>

        <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-soft">
          <label className="mb-3 block text-sm font-medium text-slate-700">
            Imagen destacada
          </label>

          {form.imagen ? (
            <div className="relative mb-3">
              <img
                src={form.imagen}
                alt="Vista previa"
                className="h-48 w-full rounded-xl object-cover"
              />
              <button
                type="button"
                onClick={() => setForm((prev) => ({ ...prev, imagen: "" }))}
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
              name="imagen"
              value={form.imagen}
              onChange={handleChange}
              placeholder="O pega una URL de imagen"
              className="flex-1 rounded-xl border border-slate-300 px-4 py-2 text-sm outline-none transition focus:border-primary focus:ring-2 focus:ring-primary/20"
            />
          </div>
        </div>

        <div className="flex justify-end gap-3">
          <button
            type="button"
            onClick={() => navigate("/admin/noticias")}
            className="rounded-xl border border-slate-200 px-6 py-2.5 text-sm font-medium text-slate-700 transition hover:bg-slate-50"
          >
            Cancelar
          </button>
          <button
            type="submit"
            disabled={saving}
            className="inline-flex items-center gap-2 rounded-xl bg-primary px-6 py-2.5 text-sm font-semibold text-white transition hover:bg-primaryHover disabled:opacity-60"
          >
            {saving ? <Loader2 className="h-4 w-4 animate-spin" /> : null}
            {saving ? "Guardando..." : isEditing ? "Guardar cambios" : "Publicar noticia"}
          </button>
        </div>
      </form>
    </div>
  );
}

export default AdminNoticiaForm;
