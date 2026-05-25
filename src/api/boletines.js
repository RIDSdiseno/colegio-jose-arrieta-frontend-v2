import apiFetch from "../lib/api";

// ── API pública ────────────────────────────────────────────────────────────────

export async function getBoletines({ limit = 6 } = {}) {
  return apiFetch(`/api/boletines?limit=${limit}`);
}

// ── API admin ──────────────────────────────────────────────────────────────────

export async function getBoletinesAdmin() {
  return apiFetch("/api/boletines/admin", { admin: true });
}

export async function getBoletinById(id) {
  return apiFetch(`/api/boletines/id/${id}`, { admin: true });
}

export async function crearBoletin(data) {
  return apiFetch("/api/boletines", { method: "POST", body: JSON.stringify(data), admin: true });
}

export async function actualizarBoletin(id, data) {
  return apiFetch(`/api/boletines/${id}`, { method: "PUT", body: JSON.stringify(data), admin: true });
}

export async function eliminarBoletin(id) {
  return apiFetch(`/api/boletines/${id}`, { method: "DELETE", admin: true });
}
