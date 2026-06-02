import apiFetch from "../lib/api";

// ── API pública ────────────────────────────────────────────────────────────────

export async function getVideos({ limit } = {}) {
  const params = limit ? `?limit=${limit}` : "";
  return apiFetch(`/api/videos${params}`);
}

// ── API admin ──────────────────────────────────────────────────────────────────

export async function getVideosAdmin() {
  return apiFetch("/api/videos/admin", { admin: true });
}

export async function getVideoById(id) {
  return apiFetch(`/api/videos/id/${id}`, { admin: true });
}

export async function crearVideo(data) {
  return apiFetch("/api/videos", { method: "POST", body: JSON.stringify(data), admin: true });
}

export async function actualizarVideo(id, data) {
  return apiFetch(`/api/videos/${id}`, { method: "PUT", body: JSON.stringify(data), admin: true });
}

export async function eliminarVideo(id) {
  return apiFetch(`/api/videos/${id}`, { method: "DELETE", admin: true });
}
