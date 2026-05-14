/** Elimina etiquetas HTML de un string */
export function stripHtml(html = "") {
  return html.replace(/<[^>]*>/g, "").trim();
}

/** Formatea una fecha ISO a texto en español (ej: "12 de mayo de 2026") */
export function formatDate(isoDate, options = { year: "numeric", month: "long", day: "numeric" }) {
  if (!isoDate) return "";
  // Fechas "YYYY-MM-DD" sin hora se parsean como UTC medianoche, mostrando
  // el día anterior en Chile (UTC-3/UTC-4). Añadir mediodía local evita el desfase.
  const normalized = /^\d{4}-\d{2}-\d{2}$/.test(String(isoDate))
    ? `${isoDate}T12:00:00`
    : isoDate;
  return new Date(normalized).toLocaleDateString("es-CL", options);
}
