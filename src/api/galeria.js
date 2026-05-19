import apiFetch from "../lib/api";

export async function getGaleria() {
  return apiFetch("/api/galeria");
}

export async function crearFoto(payload) {
  return apiFetch("/api/galeria", { method: "POST", body: JSON.stringify(payload) });
}

export async function actualizarFoto(id, payload) {
  return apiFetch(`/api/galeria/${id}`, { method: "PUT", body: JSON.stringify(payload) });
}

export async function eliminarFoto(id) {
  return apiFetch(`/api/galeria/${id}`, { method: "DELETE" });
}
