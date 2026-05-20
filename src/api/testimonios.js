import apiFetch from "../lib/api";

export async function getTestimonios() {
  return apiFetch("/api/testimonios");
}

export async function getTestimoniosAdmin() {
  return apiFetch("/api/testimonios/admin", { admin: true });
}

export async function getTestimonioById(id) {
  return apiFetch(`/api/testimonios/id/${id}`, { admin: true });
}

export async function crearTestimonio(payload) {
  return apiFetch("/api/testimonios", { method: "POST", body: JSON.stringify(payload), admin: true });
}

export async function actualizarTestimonio(id, payload) {
  return apiFetch(`/api/testimonios/${id}`, { method: "PUT", body: JSON.stringify(payload), admin: true });
}

export async function eliminarTestimonio(id) {
  return apiFetch(`/api/testimonios/${id}`, { method: "DELETE", admin: true });
}
