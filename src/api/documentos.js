import apiFetch from "../lib/api";
import { subirPdf } from "../lib/storage";

export const CATEGORIAS = [
  "Información de Cursos",
  "Útiles Escolares",
  "Calendario Escolar",
  "Plan Lector",
  "Otro",
];

// ── API pública ────────────────────────────────────────────────────────────────

export async function getAnos() {
  return apiFetch("/api/documentos/anos");
}

export async function getDocumentos({ anio, search } = {}) {
  const params = new URLSearchParams();
  if (anio) params.set("anio", anio);
  if (search?.trim()) params.set("search", search.trim());
  return apiFetch(`/api/documentos?${params}`);
}

// ── API admin ──────────────────────────────────────────────────────────────────

export async function getDocumentosAdmin() {
  return apiFetch("/api/documentos/admin", { admin: true });
}

export async function getDocumentoById(id) {
  return apiFetch(`/api/documentos/id/${id}`, { admin: true });
}

export async function crearDocumento(data) {
  return apiFetch("/api/documentos", { method: "POST", body: JSON.stringify(data), admin: true });
}

export async function actualizarDocumento(id, data) {
  return apiFetch(`/api/documentos/${id}`, { method: "PUT", body: JSON.stringify(data), admin: true });
}

export async function eliminarDocumento(id) {
  return apiFetch(`/api/documentos/${id}`, { method: "DELETE", admin: true });
}

// ── Subir PDF (Supabase Storage) ───────────────────────────────────────────────

export async function subirDocumentoPdf(file, anio) {
  return subirPdf(file, `documentos/${anio}`);
}
