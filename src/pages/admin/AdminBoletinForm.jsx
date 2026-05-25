import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { crearBoletin, actualizarBoletin, getBoletinById } from "../../api/boletines";
import AdminPageHeader from "../../components/admin/AdminPageHeader";
import ErrorBanner from "../../components/admin/ErrorBanner";
import AdminFormActions from "../../components/admin/AdminFormActions";
import AdminLoadingSpinner from "../../components/admin/AdminLoadingSpinner";

const EMPTY = {
  titulo: "",
  fecha: new Date().toISOString().slice(0, 10),
  link: "",
  isPdf: true,
  imagen: "",
  activo: true,
  orden: 0,
};

function AdminBoletinForm() {
  const { id } = useParams();
  const isEditing = Boolean(id) && id !== "nuevo";
  const navigate = useNavigate();

  const [form, setForm] = useState(EMPTY);
  const [loading, setLoading] = useState(isEditing);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    if (!isEditing) return;
    getBoletinById(id)
      .then((data) => setForm({
        titulo: data.titulo || "",
        fecha: data.fecha ? data.fecha.slice(0, 10) : new Date().toISOString().slice(0, 10),
        link: data.link || "",
        isPdf: data.isPdf ?? true,
        imagen: data.imagen || "",
        activo: data.activo ?? true,
        orden: data.orden ?? 0,
      }))
      .catch(() => setError("No se encontró el boletín."))
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
        fecha: form.fecha,
        link: form.link,
        isPdf: form.isPdf,
        imagen: form.imagen || null,
        activo: form.activo,
        orden: parseInt(form.orden) || 0,
      };
      if (isEditing) {
        await actualizarBoletin(id, payload);
      } else {
        await crearBoletin(payload);
      }
      navigate("/admin/boletines");
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
        title={isEditing ? "Editar boletín" : "Nuevo boletín"}
        backTo="/admin/boletines"
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
              placeholder="Ej: Boletín Marzo 2025"
              className="w-full rounded-xl border border-slate-300 px-4 py-2.5 text-sm outline-none transition focus:border-primary focus:ring-2 focus:ring-primary/20"
            />
          </div>

          {/* Fecha y Orden */}
          <div className="grid gap-4 sm:grid-cols-2">
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

          {/* Link */}
          <div>
            <label className="mb-1 block text-sm font-medium text-slate-700">
              Enlace al documento <span className="text-red-500">*</span>
            </label>
            <input
              name="link"
              required
              type="url"
              value={form.link}
              onChange={handleChange}
              placeholder="https://..."
              className="w-full rounded-xl border border-slate-300 px-4 py-2.5 text-sm outline-none transition focus:border-primary focus:ring-2 focus:ring-primary/20"
            />
            <p className="mt-1 text-xs text-slate-400">
              URL directa al PDF o página web del boletín.
            </p>
          </div>

          {/* Tipo */}
          <div>
            <label className="mb-2 block text-sm font-medium text-slate-700">Tipo de enlace</label>
            <div className="flex gap-4">
              <label className="flex cursor-pointer items-center gap-2">
                <input
                  type="radio"
                  name="isPdf"
                  checked={form.isPdf === true}
                  onChange={() => setForm((prev) => ({ ...prev, isPdf: true }))}
                  className="accent-primary"
                />
                <span className="text-sm text-slate-700">PDF</span>
              </label>
              <label className="flex cursor-pointer items-center gap-2">
                <input
                  type="radio"
                  name="isPdf"
                  checked={form.isPdf === false}
                  onChange={() => setForm((prev) => ({ ...prev, isPdf: false }))}
                  className="accent-primary"
                />
                <span className="text-sm text-slate-700">Página web</span>
              </label>
            </div>
          </div>

          {/* Imagen (opcional) */}
          <div>
            <label className="mb-1 block text-sm font-medium text-slate-700">
              Imagen de portada <span className="text-slate-400 font-normal">(opcional)</span>
            </label>
            <input
              name="imagen"
              type="url"
              value={form.imagen}
              onChange={handleChange}
              placeholder="https://..."
              className="w-full rounded-xl border border-slate-300 px-4 py-2.5 text-sm outline-none transition focus:border-primary focus:ring-2 focus:ring-primary/20"
            />
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
          cancelTo="/admin/boletines"
          isEditing={isEditing}
          saveLabel={isEditing ? "Guardar cambios" : "Agregar boletín"}
        />
      </form>
    </div>
  );
}

export default AdminBoletinForm;
