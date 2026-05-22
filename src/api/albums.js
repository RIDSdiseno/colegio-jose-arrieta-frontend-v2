import apiFetch from "../lib/api";
import { subirArchivo } from "../lib/storage";

export async function getAlbums() {
  return apiFetch("/api/albums");
}

export async function getAlbumsAdmin() {
  return apiFetch("/api/albums/admin", { admin: true });
}

export async function getAlbumById(id) {
  return apiFetch(`/api/albums/id/${id}`, { admin: true });
}

export async function getAlbumFotos(id) {
  return apiFetch(`/api/albums/${id}/fotos`);
}

export async function crearAlbum(payload) {
  return apiFetch("/api/albums", { method: "POST", body: JSON.stringify(payload), admin: true });
}

export async function actualizarAlbum(id, payload) {
  return apiFetch(`/api/albums/${id}`, { method: "PUT", body: JSON.stringify(payload), admin: true });
}

export async function eliminarAlbum(id) {
  return apiFetch(`/api/albums/${id}`, { method: "DELETE", admin: true });
}

export async function agregarFoto(albumId, payload) {
  return apiFetch(`/api/albums/${albumId}/fotos`, { method: "POST", body: JSON.stringify(payload), admin: true });
}

export async function eliminarFoto(fotoId) {
  return apiFetch(`/api/albums/fotos/${fotoId}`, { method: "DELETE", admin: true });
}

export async function subirImagenAlbum(file) {
  return subirArchivo(file, "galeria", "albums");
}
