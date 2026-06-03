import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Loader2, Star } from "lucide-react";
import { crearTestimonio, actualizarTestimonio, getTestimonioById } from "../../api/testimonios";
import AdminPageHeader from "../../components/admin/AdminPageHeader";
import ErrorBanner from "../../components/admin/ErrorBanner";
import AdminFormActions from "../../components/admin/AdminFormActions";
import AdminLoadingSpinner from "../../components/admin/AdminLoadingSpinner";

const COLORES = [
  "#1e3a5f", "#2563eb", "#16a34a", "#dc2626",
  "#9333ea", "#d97706", "#0891b2", "#be185d",
];

const EMPTY = {
  nombre: "",
  cargo: "",
  texto: "",
  estrellas: 5,
  color: "#1e3a5f",
  activo: true,
};

function AdminTestimonioForm() {
  const { id } = useParams();
  const isEditing = Boolean(id) && id !== "nuevo";
  const navigate = useNavigate();

  const [form, setForm] = useState(EMPTY);
  const [loading, setLoading] = useState(isEditing);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    if (!isEditing) return;
    let cancelled = false;
    getTestimonioById(id)
      .then((t) => {
        if (cancelled) return;
        setForm({
          nombre: t.nombre || "",
          cargo: t.cargo || "",
          texto: t.texto || "",
          estrellas: t.estrellas ?? 5,
          color: t.color || "#1e3a5f",
          activo: t.activo ?? true,
        });
      })
      .catch(() => { if (!cancelled) setError("No se encontró el testimonio."); })
      .finally(() => { if (!cancelled) setLoading(false); });
    return () => { cancelled = true; };
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
      const payload = { ...form, estrellas: Number(form.estrellas) };
      if (isEditing) {
        await actualizarTestimonio(id, payload);
      } else {
        await crearTestimonio(payload);
      }
      navigate("/admin/testimonios");
    } catch (err) {
      setError(err.message);
    } finally {
      setSaving(false);
    }
  };

  if (loading) return <AdminLoadingSpinner />;

  // Iniciales para la preview
  const initials = form.nombre
    .split(" ")
    .slice(0, 2)
    .map((w) => w[0]?.toUpperCase() || "")
    .join("");

  return (
    <div className="mx-auto max-w-2xl">
      <AdminPageHeader title={isEditing ? "Editar testimonio" : "Nuevo testimonio"} backTo="/admin/testimonios" />

      <ErrorBanner message={error} />

      <form onSubmit={handleSubmit} className="space-y-5">
        <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-soft space-y-5">

          <div className="grid gap-4 sm:grid-cols-2">
            <div>
              <label className="mb-1 block text-sm font-medium text-slate-700">
                Nombre <span className="text-red-500">*</span>
              </label>
              <input
                name="nombre"
                required
                value={form.nombre}
                onChange={handleChange}
                placeholder="Ej: María González"
                className="w-full rounded-xl border border-slate-300 px-4 py-2.5 text-sm outline-none transition focus:border-primary focus:ring-2 focus:ring-primary/20"
              />
            </div>
            <div>
              <label className="mb-1 block text-sm font-medium text-slate-700">Cargo / Rol</label>
              <input
                name="cargo"
                value={form.cargo}
                onChange={handleChange}
                placeholder="Ej: Apoderada de 3° básico"
                className="w-full rounded-xl border border-slate-300 px-4 py-2.5 text-sm outline-none transition focus:border-primary focus:ring-2 focus:ring-primary/20"
              />
            </div>
          </div>

          <div>
            <label className="mb-1 block text-sm font-medium text-slate-700">
              Testimonio <span className="text-red-500">*</span>
            </label>
            <textarea
              name="texto"
              required
              rows={4}
              value={form.texto}
              onChange={handleChange}
              placeholder="Escribe el testimonio del apoderado..."
              className="w-full resize-none rounded-xl border border-slate-300 px-4 py-2.5 text-sm outline-none transition focus:border-primary focus:ring-2 focus:ring-primary/20"
            />
          </div>

          {/* Estrellas */}
          <div>
            <label className="mb-2 block text-sm font-medium text-slate-700">Calificación</label>
            <div className="flex gap-2">
              {[1, 2, 3, 4, 5].map((n) => (
                <button
                  key={n}
                  type="button"
                  onClick={() => setForm((p) => ({ ...p, estrellas: n }))}
                  className="transition hover:scale-110"
                >
                  <Star
                    className={`h-7 w-7 ${n <= form.estrellas ? "fill-secondary text-secondary" : "text-slate-200"}`}
                  />
                </button>
              ))}
              <span className="ml-2 self-center text-sm text-slate-500">{form.estrellas} / 5</span>
            </div>
          </div>

          {/* Color avatar */}
          <div>
            <label className="mb-2 block text-sm font-medium text-slate-700">Color del avatar</label>
            <div className="flex flex-wrap gap-2">
              {COLORES.map((c) => (
                <button
                  key={c}
                  type="button"
                  onClick={() => setForm((p) => ({ ...p, color: c }))}
                  style={{ backgroundColor: c }}
                  className={`h-8 w-8 rounded-full transition hover:scale-110 ${form.color === c ? "ring-2 ring-offset-2 ring-primary" : ""}`}
                />
              ))}
            </div>
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

        {/* Preview */}
        {form.nombre && form.texto ? (
          <div className="rounded-2xl border border-slate-200 bg-slate-50 p-5">
            <p className="mb-3 text-xs font-semibold uppercase tracking-wider text-slate-400">Vista previa</p>
            <div className="flex gap-3">
              <div
                style={{ backgroundColor: form.color }}
                className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full text-sm font-black text-white"
              >
                {initials || "?"}
              </div>
              <div>
                <p className="text-sm font-bold text-slate-900">{form.nombre}</p>
                <p className="text-xs text-slate-400">{form.cargo}</p>
                <div className="mt-1 flex gap-0.5">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <Star key={i} className={`h-3 w-3 ${i < form.estrellas ? "fill-secondary text-secondary" : "text-slate-200"}`} />
                  ))}
                </div>
                <p className="mt-2 text-sm text-slate-600">"{form.texto}"</p>
              </div>
            </div>
          </div>
        ) : null}

        <AdminFormActions saving={saving} cancelTo="/admin/testimonios" isEditing={isEditing} saveLabel={isEditing ? "Guardar testimonio" : "Crear testimonio"} />
      </form>
    </div>
  );
}

export default AdminTestimonioForm;
