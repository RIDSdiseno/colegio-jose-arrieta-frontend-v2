import apiFetch from "../lib/api";
import { supabase } from "../lib/supabase";

export async function getGaleria() {
  return apiFetch("/api/galeria");
}

export async function getGaleriaAdmin() {
  return apiFetch("/api/galeria/admin");
}

export async function getFotoById(id) {
  return apiFetch(`/api/galeria/id/${id}`);
}

export async function subirImagenGaleria(file) {
  if (!supabase) throw new Error("Supabase no está configurado para subir imágenes.");
  const ext = file.name.split(".").pop();
  const nombre = `${Date.now()}.${ext}`;
  const { error } = await supabase.storage.from("galeria").upload(nombre, file, { upsert: false });
  if (error) throw new Error(error.message);
  const { data } = supabase.storage.from("galeria").getPublicUrl(nombre);
  return data.publicUrl;
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
