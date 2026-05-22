import apiFetch from "../lib/api";
import { subirArchivo } from "../lib/storage";

// ── API pública (Backend) ──────────────────────────────────────────────────────

export async function getNoticias({ limit = 6, page = 1, search = "" } = {}) {
  const params = new URLSearchParams({ limit, page });
  if (search.trim()) params.set("search", search.trim());
  return apiFetch(`/api/noticias?${params}`);
}

export async function getNoticiaPorSlug(slug) {
  return apiFetch(`/api/noticias/${slug}`);
}

// ── API admin (Backend) ────────────────────────────────────────────────────────

export async function getNoticiasAdmin({ limit = 50, page = 1 } = {}) {
  return apiFetch(`/api/noticias?limit=${limit}&page=${page}`);
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
