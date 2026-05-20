import apiFetch from "../lib/api";
import { supabase } from "../lib/supabase";

export async function getAlbums() {
  return apiFetch("/api/albums");
}

export async function getAlbumsAdmin() {
  return apiFetch("/api/albums/admin");
}

export async function getAlbumById(id) {
  return apiFetch(`/api/albums/id/${id}`);
}

export async function getAlbumFotos(id) {
  return apiFetch(`/api/albums/${id}/fotos`);
}

export async function crearAlbum(payload) {
  return apiFetch("/api/albums", { method: "POST", body: JSON.stringify(payload) });
}

export async function actualizarAlbum(id, payload) {
  return apiFetch(`/api/albums/${id}`, { method: "PUT", body: JSON.stringify(payload) });
}

export async function eliminarAlbum(id) {
  return apiFetch(`/api/albums/${id}`, { method: "DELETE" });
}

export async function agregarFoto(albumId, payload) {
  return apiFetch(`/api/albums/${albumId}/fotos`, { method: "POST", body: JSON.stringify(payload) });
}

export async function eliminarFoto(fotoId) {
  return apiFetch(`/api/albums/fotos/${fotoId}`, { method: "DELETE" });
}

export async function subirImagenAlbum(file) {
  if (!supabase) throw new Error("Supabase no está configurado para subir imágenes.");
  const ext = file.name.split(".").pop();
  const nombre = `albums/${Date.now()}.${ext}`;
  const { error } = await supabase.storage.from("galeria").upload(nombre, file, { upsert: false });
  if (error) throw new Error(error.message);
  const { data } = supabase.storage.from("galeria").getPublicUrl(nombre);
  return data.publicUrl;
}
