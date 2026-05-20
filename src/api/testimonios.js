import apiFetch from "../lib/api";

export async function getTestimonios() {
  return apiFetch("/api/testimonios");
}

export async function getTestimoniosAdmin() {
  return apiFetch("/api/testimonios/admin");
}

export async function getTestimonioById(id) {
  return apiFetch(`/api/testimonios/id/${id}`);
}

export async function crearTestimonio(payload) {
  return apiFetch("/api/testimonios", { method: "POST", body: JSON.stringify(payload) });
}

export async function actualizarTestimonio(id, payload) {
  return apiFetch(`/api/testimonios/${id}`, { method: "PUT", body: JSON.stringify(payload) });
}

export async function eliminarTestimonio(id) {
  return apiFetch(`/api/testimonios/${id}`, { method: "DELETE" });
}
