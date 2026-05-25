import { useEffect, useRef, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { FileUp, Loader2, X } from "lucide-react";
import {
  crearDocumento,
  actualizarDocumento,
  getDocumentoById,
  subirDocumentoPdf,
  CATEGORIAS,
} from "../../api/documentos";
import AdminPageHeader from "../../components/admin/AdminPageHeader";
import ErrorBanner from "../../components/admin/ErrorBanner";
import AdminFormActions from "../../components/admin/AdminFormActions";
import AdminLoadingSpinner from "../../components/admin/AdminLoadingSpinner";

const ANO_ACTUAL = new Date().getFullYear();

const EMPTY = {
  titulo: "",
  categoria: CATEGORIAS[0],
  anio: ANO_ACTUAL,
  link: "",
  activo: true,
  orden: 0,
};

function AdminDocumentoForm() {
  const { id } = useParams();
  const isEditing = Boolean(id) && id !== "nuevo";
  const navigate = useNavigate();
  const fileRef = useRef(null);

  const [form, setForm] = useState(EMPTY);
  const [loading, setLoading] = useState(isEditing);
  const [saving, setSaving] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    if (!isEditing) return;
    getDocumentoById(id)
      .then((data) => setForm({
        titulo: data.titulo || "",
        categoria: data.categoria || CATEGORIAS[0],
        anio: data.anio ?? ANO_ACTUAL,
        link: data.link || "",
        activo: data.activo ?? true,
        orden: data.orden ?? 0,
      }))
      .catch(() => setError("No se encontró el documento."))
      .finally(() => setLoading(false));
  }, [id, isEditing]);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setForm((prev) => ({ ...prev, [name]: type === "checkbox" ? checked : value }));
  };

  const handlePdfUpload = async (e) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setError("");
    setUploading(true);
    try {
      const url = await subirDocumentoPdf(file, form.anio || ANO_ACTUAL);
      setForm((prev) => ({ ...prev, link: url }));
    } catch (err) {
      setError(`Error al subir el PDF: ${err.message}`);
    } finally {
      setUploading(false);
      if (fileRef.current) fileRef.current.value = "";
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setSaving(true);
    try {
      const payload = {
        titulo: form.titulo,
        categoria: form.categoria,
        anio: parseInt(form.anio),
        link: form.link,
        activo: form.activo,
        orden: parseInt(form.orden) || 0,
      };
      if (isEditing) {
        await actualizarDocumento(id, payload);
      } else {
        await crearDocumento(payload);
      }
      navigate("/admin/documentos");
    } catch (err) {
      setError(err.message);
    } finally {
      setSaving(false);
    }
  };

  if (loading) return <AdminLoadingSpinner />;

  return (
    <div className="mx-auto max-w-2xl">
      <AdminPageHeader
        title={isEditing ? "Editar documento" : "Nuevo documento"}
        backTo="/admin/documentos"
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
              placeholder="Ej: Lista de Útiles 3° Básico"
              className="w-full rounded-xl border border-slate-300 px-4 py-2.5 text-sm outline-none transition focus:border-primary focus:ring-2 focus:ring-primary/20"
            />
          </div>

          {/* Categoría y Año */}
          <div className="grid gap-4 sm:grid-cols-2">
            <div>
              <label className="mb-1 block text-sm font-medium text-slate-700">
                Categoría <span className="text-red-500">*</span>
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
                Año <span className="text-red-500">*</span>
              </label>
              <input
                type="number"
                name="anio"
                required
                min="2000"
                max="2099"
                value={form.anio}
                onChange={handleChange}
                className="w-full rounded-xl border border-slate-300 px-4 py-2.5 text-sm outline-none transition focus:border-primary focus:ring-2 focus:ring-primary/20"
              />
            </div>
          </div>

          {/* PDF o URL */}
          <div>
            <label className="mb-1 block text-sm font-medium text-slate-700">
              Documento <span className="text-red-500">*</span>
            </label>

            {/* Subir PDF */}
            <div className="mb-3">
              <input
                ref={fileRef}
                type="file"
                accept="application/pdf"
                onChange={handlePdfUpload}
                className="hidden"
                id="pdf-upload"
              />
              <label
                htmlFor="pdf-upload"
                className={`inline-flex cursor-pointer items-center gap-2 rounded-xl border px-4 py-2.5 text-sm font-medium transition ${
                  uploading
                    ? "border-slate-200 bg-slate-50 text-slate-400 cursor-not-allowed"
                    : "border-primary/30 bg-primary/5 text-primary hover:bg-primary/10"
                }`}
              >
                {uploading ? (
                  <><Loader2 className="h-4 w-4 animate-spin" /> Subiendo PDF...</>
                ) : (
                  <><FileUp className="h-4 w-4" /> Subir PDF</>
                )}
              </label>
              <p className="mt-1 text-xs text-slate-400">Máximo 10 MB · Solo archivos PDF</p>
            </div>

            {/* URL resultante / manual */}
            <div className="relative">
              <input
                name="link"
                required
                type="url"
                value={form.link}
                onChange={handleChange}
                placeholder="https://... (o sube un PDF arriba)"
                className="w-full rounded-xl border border-slate-300 px-4 py-2.5 pr-9 text-sm outline-none transition focus:border-primary focus:ring-2 focus:ring-primary/20"
              />
              {form.link && (
                <button
                  type="button"
                  onClick={() => setForm((prev) => ({ ...prev, link: "" }))}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600"
                >
                  <X className="h-4 w-4" />
                </button>
              )}
            </div>
            {form.link && (
              <a
                href={form.link}
                target="_blank"
                rel="noreferrer"
                className="mt-1 inline-block text-xs text-primary hover:underline"
              >
                Ver documento →
              </a>
            )}
          </div>

          {/* Orden */}
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
            <p className="mt-1 text-xs text-slate-400">Menor número = aparece primero dentro de su categoría.</p>
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
          cancelTo="/admin/documentos"
          isEditing={isEditing}
          saveLabel={isEditing ? "Guardar cambios" : "Agregar documento"}
        />
      </form>
    </div>
  );
}

export default AdminDocumentoForm;
