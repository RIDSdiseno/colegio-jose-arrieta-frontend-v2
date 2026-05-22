import { useEffect, useRef, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { ImagePlus, Loader2, Plus, X } from "lucide-react";
import {
  crearNoticia,
  actualizarNoticia,
  subirImagen,
  getNoticiaById,
} from "../../api/noticias";
import { slugify } from "../../lib/utils";
import AdminPageHeader from "../../components/admin/AdminPageHeader";
import ErrorBanner from "../../components/admin/ErrorBanner";
import AdminFormActions from "../../components/admin/AdminFormActions";
import AdminLoadingSpinner from "../../components/admin/AdminLoadingSpinner";

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
  texto: "",
  imagenes: [],      // fotos del cuerpo del artículo
  categoria: "General",
  imagen: "",        // portada
  fecha: new Date().toISOString().split("T")[0],
};

/** Separa el contenido HTML guardado en texto plano + array de URLs de imágenes */
function parseContenido(html = "") {
  const imagenes = [];
  const texto = html
    .replace(/<img[^>]+>/gi, (m) => {
      const src = m.match(/src="([^"]+)"/)?.[1];
      if (src) imagenes.push(src);
      return "";
    })
    .replace(/<br\s*\/?>/gi, "\n")
    .trim();
  return { texto, imagenes };
}

/** Reconstruye el contenido HTML a guardar en BD */
function buildContenido(texto, imagenes) {
  // Convertir saltos de línea del texto en <br> para que se muestren bien
  const htmlTexto = texto
    .trim()
    .replace(/\r\n/g, "\n")
    .replace(/\n/g, "<br>");
  const htmlImgs = imagenes.map((u) => `<img src="${u}" alt="">`).join("\n");
  return [htmlTexto, htmlImgs].filter(Boolean).join("\n\n");
}

function AdminNoticiaForm() {
  const { id } = useParams();
  const isEditing = Boolean(id) && id !== "nueva";
  const navigate = useNavigate();

  const [form, setForm] = useState(EMPTY);
  const [loading, setLoading] = useState(isEditing);
  const [saving, setSaving] = useState(false);
  const [uploadingImg, setUploadingImg] = useState(false);
  const [uploadingContent, setUploadingContent] = useState(false);
  const [error, setError] = useState("");
  const fileRef = useRef(null);
  const contentFileRef = useRef(null);

  useEffect(() => {
    if (!isEditing) return;
    getNoticiaById(id)
      .then((data) => {
        const { texto, imagenes } = parseContenido(data.contenido || "");
        setForm({
          titulo: data.titulo || "",
          slug: data.slug || "",
          extracto: data.extracto || "",
          texto,
          imagenes,
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
      if (name === "titulo" && !isEditing) next.slug = slugify(value);
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
      if (fileRef.current) fileRef.current.value = "";
    }
  };

  const handleAddContentImage = async (e) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setUploadingContent(true);
    setError("");
    try {
      const url = await subirImagen(file);
      setForm((prev) => ({ ...prev, imagenes: [...prev.imagenes, url] }));
    } catch (err) {
      setError("Error al subir imagen: " + err.message);
    } finally {
      setUploadingContent(false);
      if (contentFileRef.current) contentFileRef.current.value = "";
    }
  };

  const handleRemoveContentImage = (idx) => {
    setForm((prev) => ({
      ...prev,
      imagenes: prev.imagenes.filter((_, i) => i !== idx),
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setSaving(true);
    try {
      const contenido = buildContenido(form.texto, form.imagenes);
      const payload = {
        titulo: form.titulo,
        slug: form.slug,
        extracto: form.extracto,
        contenido,
        categoria: form.categoria,
        imagen: form.imagen || null,
        fecha: form.fecha,
      };
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

  if (loading) return <AdminLoadingSpinner />;

  return (
    <div className="mx-auto max-w-3xl">
      <AdminPageHeader title={isEditing ? "Editar noticia" : "Nueva noticia"} backTo="/admin/noticias" />

      <ErrorBanner message={error} />

      <form onSubmit={handleSubmit} className="space-y-5">
        {/* Datos básicos */}
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
              Texto del artículo
            </label>
            <textarea
              name="texto"
              rows={10}
              value={form.texto}
              onChange={handleChange}
              placeholder="Escribe el contenido de la noticia aquí..."
              className="w-full rounded-xl border border-slate-300 px-4 py-2.5 text-sm outline-none transition focus:border-primary focus:ring-2 focus:ring-primary/20"
            />
          </div>
        </div>

        {/* Fotos del artículo */}
        <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-soft">
          <p className="mb-3 text-sm font-medium text-slate-700">
            Fotos del artículo
          </p>

          {form.imagenes.length > 0 ? (
            <div className="mb-4 grid grid-cols-2 gap-3 sm:grid-cols-3">
              {form.imagenes.map((url, idx) => (
                <div key={idx} className="group relative overflow-hidden rounded-xl border border-slate-200">
                  <img
                    src={url}
                    alt=""
                    className="h-32 w-full object-cover"
                  />
                  <button
                    type="button"
                    onClick={() => handleRemoveContentImage(idx)}
                    className="absolute right-1.5 top-1.5 flex h-6 w-6 items-center justify-center rounded-lg bg-black/50 text-white opacity-0 transition hover:bg-red-500 group-hover:opacity-100"
                  >
                    <X className="h-3.5 w-3.5" />
                  </button>
                </div>
              ))}
            </div>
          ) : null}

          <button
            type="button"
            onClick={() => contentFileRef.current?.click()}
            disabled={uploadingContent}
            className="inline-flex items-center gap-2 rounded-xl border border-dashed border-slate-300 px-4 py-2.5 text-sm font-medium text-slate-600 transition hover:border-primary hover:text-primary disabled:opacity-60"
          >
            {uploadingContent ? (
              <Loader2 className="h-4 w-4 animate-spin" />
            ) : (
              <Plus className="h-4 w-4" />
            )}
            {uploadingContent ? "Subiendo..." : "Agregar foto"}
          </button>
          <input
            ref={contentFileRef}
            type="file"
            accept="image/*"
            className="hidden"
            onChange={handleAddContentImage}
          />
          <p className="mt-2 text-xs text-slate-400">
            Las fotos se muestran al final del artículo. Puedes agregar todas las que quieras.
          </p>
        </div>

        {/* Imagen destacada (portada) */}
        <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-soft">
          <label className="mb-3 block text-sm font-medium text-slate-700">
            Imagen destacada (portada)
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

        <AdminFormActions saving={saving} cancelTo="/admin/noticias" isEditing={isEditing} saveLabel={isEditing ? "Guardar cambios" : "Publicar noticia"} />
      </form>
    </div>
  );
}

export default AdminNoticiaForm;
