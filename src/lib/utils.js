/** Elimina etiquetas HTML de un string */
export function stripHtml(html = "") {
  return html.replace(/<[^>]*>/g, "").trim();
}

/** Formatea una fecha ISO a texto en español (ej: "12 de mayo de 2026") */
export function formatDate(isoDate, options = { year: "numeric", month: "long", day: "numeric" }) {
  return new Date(isoDate).toLocaleDateString("es-CL", options);
}
