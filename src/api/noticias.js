import apiFetch from "../lib/api";
import { subirArchivo } from "../lib/storage";

export const CATEGORIAS_NOTICIAS = ["General", "Académico", "Deportivo", "Cultural", "Institucional", "Comunidad"];

// ── API pública (Backend) ──────────────────────────────────────────────────────

export async function getNoticias({ limit = 6, page = 1, search = "", categoria = "", anio = 0, orden = "desc" } = {}) {
  const params = new URLSearchParams({ limit, page });
  if (search.trim()) params.set("search", search.trim());
  if (categoria.trim()) params.set("categoria", categoria.trim());
  if (anio) params.set("anio", anio);
  if (orden === "asc") params.set("orden", "asc");
  return apiFetch(`/api/noticias?${params}`);
}

export async function getAnosNoticias() {
  return apiFetch("/api/noticias/anos");
}

export async function getNoticiaPorSlug(slug) {
  return apiFetch(`/api/noticias/${slug}`);
}

export async function getNoticiasAdyacentes(slug) {
  return apiFetch(`/api/noticias/${slug}/adyacentes`);
}

// ── API admin (Backend) ────────────────────────────────────────────────────────

export async function getNoticiasAdmin({ limit = 50, page = 1, search = "", categoria = "", anio = 0 } = {}) {
  const params = new URLSearchParams({ limit, page });
  if (search.trim()) params.set("search", search.trim());
  if (categoria.trim()) params.set("categoria", categoria.trim());
  if (anio) params.set("anio", anio);
  return apiFetch(`/api/noticias/admin?${params}`, { admin: true });
}

export async function getNoticiaById(id) {
  return apiFetch(`/api/noticias/id/${id}`, { admin: true });
}

export async function crearNoticia(payload) {
  return apiFetch("/api/noticias", { method: "POST", body: JSON.stringify(payload), admin: true });
}

export async function actualizarNoticia(id, payload) {
  return apiFetch(`/api/noticias/${id}`, { method: "PUT", body: JSON.stringify(payload), admin: true });
}

export async function eliminarNoticia(id) {
  return apiFetch(`/api/noticias/${id}`, { method: "DELETE", admin: true });
}

// ── Subir imagen (Supabase Storage) ───────────────────────────────────────────

export async function subirImagen(file) {
  return subirArchivo(file, "noticias");
}
