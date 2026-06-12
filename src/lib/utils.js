/** Formatea una fecha ISO a texto en español (ej: "12 de mayo de 2026") */
export function formatDate(isoDate, options = { year: "numeric", month: "long", day: "numeric" }) {
  if (!isoDate) return "";
  // Fechas "YYYY-MM-DD" sin hora se parsean como UTC medianoche, mostrando
  // el día anterior en Chile (UTC-3/UTC-4). Añadir mediodía local evita el desfase.
  const s = String(isoDate);
  // Normaliza:
  // "YYYY-MM-DD"              → fecha sin hora
  // "YYYY-MM-DDT00:00:00..."  → ISO UTC medianoche (Prisma ORM)
  // "YYYY-MM-DD 00:00:00"     → PostgreSQL text cast (raw SQL)
  // En los tres casos añade mediodía UTC para evitar desfase en Chile (UTC-3/UTC-4)
  const normalized =
    /^\d{4}-\d{2}-\d{2}$/.test(s) ||
    s.includes("T00:00:00") ||
    /^\d{4}-\d{2}-\d{2} /.test(s)
      ? `${s.slice(0, 10)}T12:00:00`
      : s;
  return new Date(normalized).toLocaleDateString("es-CL", options);
}

/**
 * Normaliza un string para búsquedas: minúsculas y sin diacríticos.
 * Ejemplo: "Educación Física" → "educacion fisica"
 */
export function normalizeSearch(str = "") {
  return str
    .toLowerCase()
    .normalize("NFD")
    .replace(/\p{Mn}/gu, "");
}

/** Normaliza una respuesta de API que puede ser array directo o { data: [] } */
export function toArray(res) {
  return Array.isArray(res) ? res : res?.data ?? [];
}

/** Convierte un string a slug URL-friendly */
export function slugify(str = "") {
  return str
    .toLowerCase()
    .normalize("NFD")
    .replace(/\p{Mn}/gu, "")        // elimina marcas diacríticas (á→a, ñ→n, etc.)
    .replace(/[^a-z0-9\s-]/g, "")  // elimina caracteres no permitidos
    .trim()
    .replace(/\s+/g, "-")           // espacios → guión
    .replace(/-{2,}/g, "-")         // guiones dobles → uno solo
    .slice(0, 200)                   // máx. 200 caracteres (límite del backend)
    .replace(/-+$/, "");             // eliminar guión final si el corte cayó en uno
}
