import { useEffect, useRef, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { ImagePlus, Loader2, Plus, X } from "lucide-react";
import {
  crearNoticia,
  actualizarNoticia,
  subirImagen,
  getNoticiaById,
  CATEGORIAS_NOTICIAS,
} from "../../api/noticias";
import { eliminarArchivoStorage } from "../../lib/storage";
import { slugify } from "../../lib/utils";
import AdminPageHeader from "../../components/admin/AdminPageHeader";
import ErrorBanner from "../../components/admin/ErrorBanner";
import AdminFormActions from "../../components/admin/AdminFormActions";
import AdminLoadingSpinner from "../../components/admin/AdminLoadingSpinner";

const CATEGORIAS = CATEGORIAS_NOTICIAS;

const EMPTY = {
  titulo: "",
  slug: "",
  extracto: "",
  texto: "",
  imagenes: [],      // fotos del cuerpo del artículo
  fotosUbicacion: "antes", // "antes" | "despues" del texto
  categoria: "General",
  imagen: "",        // portada
  fecha: new Date().toISOString().split("T")[0],
};

/** Separa el contenido HTML guardado en texto plano + array de URLs de imágenes */
function parseContenido(html = "") {
  const imagenes = [];
  // Extraer imágenes del wp-gallery o sueltas
  const sinGallery = html.replace(/<div class="wp-gallery">([\s\S]*?)<\/div>/gi, (_, inner) => {
    const imgRegex = /<img[^>]+>/gi;
    let m;
    while ((m = imgRegex.exec(inner)) !== null) {
      const src = m[0].match(/src="([^"]+)"/)?.[1];
      if (src) imagenes.push(src);
    }
    return "";
  });
  // Extraer imágenes sueltas restantes
  const texto = sinGallery
    .replace(/<img[^>]+>/gi, (m) => {
      const src = m.match(/src="([^"]+)"/)?.[1];
      if (src) imagenes.push(src);
      return "";
    })
    .replace(/<br\s*\/?>/gi, "\n")
    .replace(/<[^>]+>/g, "")
    .trim();
  // Detectar si las fotos estaban antes o después del texto
  const posGallery = html.search(/<div class="wp-gallery"/i);
  const posImg = html.search(/<img[^>]+>/i);
  const primerFoto = posGallery !== -1 ? posGallery : posImg;
  // Buscar posición del primer texto real (ignorando etiquetas HTML y espacios)
  // Buscar primera posición de texto real ignorando etiquetas HTML
  const htmlSinEtiquetas = html.replace(/<[^>]+>/g, (tag) => " ".repeat(tag.length));
  const primerTexto = htmlSinEtiquetas.search(/\S/);
  const fotosUbicacion = primerFoto !== -1 && primerFoto < primerTexto ? "antes" : "despues";
  return { texto, imagenes, fotosUbicacion };
}

/** Reconstruye el contenido HTML a guardar en BD */
function buildContenido(texto, imagenes, fotosUbicacion = "antes") {
  const htmlTexto = texto
    .trim()
    .replace(/\r\n/g, "\n")
    .replace(/\n/g, "<br>");
  const htmlImgs = imagenes.length > 0
    ? `<div class="wp-gallery">${imagenes.map((u) => `<img src="${u.replace(/&/g, "&amp;").replace(/"/g, "&quot;")}" alt="">`).join("")}</div>`
    : "";
  const partes = fotosUbicacion === "antes"
    ? [htmlImgs, htmlTexto]
    : [htmlTexto, htmlImgs];
  return partes.filter(Boolean).join("\n");
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
  // Evita que al editar el título se sobreescriba un slug modificado manualmente
  const slugEditedRef = useRef(false);
  // URLs ya guardadas en DB — evitan borrar imágenes existentes al limpiar campos
  const savedImagenRef = useRef("");
  const savedImagenesRef = useRef([]);

  useEffect(() => {
    slugEditedRef.current = false; // reset al cambiar de noticia
    if (!isEditing) return;
    let cancelled = false;
    getNoticiaById(id)
      .then((data) => {
        if (cancelled) return;
        const { texto, imagenes, fotosUbicacion } = parseContenido(data.contenido || "");
        setForm({
          titulo: data.titulo || "",
          slug: data.slug || "",
          extracto: data.extracto || "",
          texto,
          imagenes,
          fotosUbicacion,
          categoria: data.categoria || "General",
          imagen: data.imagen || "",
          fecha: data.fecha
            ? String(data.fecha).slice(0, 10)
            : new Date().toISOString().split("T")[0],
        });
        savedImagenRef.current = data.imagen || "";
        savedImagenesRef.current = imagenes;
      })
      .catch(() => { if (!cancelled) setError("No se encontró la noticia."); })
      .finally(() => { if (!cancelled) setLoading(false); });
    return () => { cancelled = true; };
  }, [id, isEditing]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    // Nota: NO se borra Storage aquí — el admin puede estar reescribiendo la URL.
    // La limpieza ocurre en: handleImageUpload (reemplazo), botón "Quitar" y handleCancel.
    setForm((prev) => {
      const next = { ...prev, [name]: value };
      if (name === "slug") slugEditedRef.current = true;
      if (name === "titulo" && !isEditing && !slugEditedRef.current) next.slug = slugify(value);
      return next;
    });
  };

  const handleImageUpload = async (e) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setUploadingImg(true);
    setError("");
    try {
      const prevImagen = form.imagen;
      const url = await subirImagen(file);
      // Si había una portada subida en esta sesión (no la de BD), limpiarla
      if (prevImagen && prevImagen !== savedImagenRef.current) {
        eliminarArchivoStorage(prevImagen, "noticias").catch(() => {});
      }
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
    const url = form.imagenes[idx];
    // Solo borrar de Storage si la imagen fue subida en esta sesión, no si ya estaba en BD
    if (url && !savedImagenesRef.current.includes(url)) {
      eliminarArchivoStorage(url, "noticias").catch(() => {});
    }
    setForm((prev) => ({
      ...prev,
      imagenes: prev.imagenes.filter((_, i) => i !== idx),
    }));
  };

  const handleCancel = () => {
    // Limpiar portada subida en esta sesión pero no guardada en BD
    if (form.imagen && form.imagen !== savedImagenRef.current) {
      eliminarArchivoStorage(form.imagen, "noticias").catch(() => {});
    }
    // Limpiar fotos de contenido subidas en esta sesión pero no guardadas en BD
    form.imagenes
      .filter((url) => !savedImagenesRef.current.includes(url))
      .forEach((url) => eliminarArchivoStorage(url, "noticias").catch(() => {}));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setSaving(true);
    try {
      const contenido = buildContenido(form.texto, form.imagenes, form.fotosUbicacion);
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
              maxLength={200}
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
            <div className="mb-1 flex items-center justify-between">
              <label className="text-sm font-medium text-slate-700">
                Extracto
              </label>
              <span className={`text-xs ${form.extracto.length > 500 ? "text-red-400" : "text-slate-400"}`}>
                {form.extracto.length}/500
              </span>
            </div>
            <textarea
              name="extracto"
              rows={2}
              value={form.extracto}
              onChange={handleChange}
              placeholder="Breve descripción que aparece en el listado de noticias (máx. 500 caracteres)."
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
          <div className="mb-4 flex flex-wrap items-center justify-between gap-3">
            <p className="text-sm font-medium text-slate-700">Fotos del artículo</p>
            <div className="flex gap-2">
              {[
                { value: "antes", label: "Fotos primero" },
                { value: "despues", label: "Texto primero" },
              ].map((op) => (
                <button
                  key={op.value}
                  type="button"
                  onClick={() => setForm((prev) => ({ ...prev, fotosUbicacion: op.value }))}
                  className={`rounded-lg border px-3 py-1.5 text-xs font-medium transition ${
                    form.fotosUbicacion === op.value
                      ? "border-primary bg-primary/10 text-primary"
                      : "border-slate-200 text-slate-500 hover:border-slate-300"
                  }`}
                >
                  {op.label}
                </button>
              ))}
            </div>
          </div>

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
            Las fotos forman una galería en el artículo. Usa los botones de arriba para elegir si van antes o después del texto.
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
                className="max-h-64 w-full rounded-xl object-contain"
              />
              <button
                type="button"
                onClick={() => {
                  const url = form.imagen;
                  if (url && url !== savedImagenRef.current) {
                    eliminarArchivoStorage(url, "noticias").catch(() => {});
                  }
                  setForm((prev) => ({ ...prev, imagen: "" }));
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

        <AdminFormActions saving={saving} cancelTo="/admin/noticias" isEditing={isEditing} saveLabel={isEditing ? "Guardar cambios" : "Publicar noticia"} onCancel={handleCancel} />
      </form>
    </div>
  );
}

export default AdminNoticiaForm;
