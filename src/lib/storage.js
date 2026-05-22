import { supabase } from "./supabase";

/**
 * Sube un archivo a Supabase Storage y retorna la URL pública.
 * @param {File} file
 * @param {string} bucket  — nombre del bucket en Supabase
 * @param {string} [prefix] — prefijo de carpeta (sin slash final), ej: "albums"
 */
export async function subirArchivo(file, bucket, prefix = "") {
  if (!supabase) throw new Error("Supabase no está configurado para subir archivos.");
  const ext = file.name.split(".").pop();
  const nombre = prefix ? `${prefix}/${Date.now()}.${ext}` : `${Date.now()}.${ext}`;
  const { error } = await supabase.storage.from(bucket).upload(nombre, file, { upsert: false });
  if (error) throw new Error(error.message);
  const { data } = supabase.storage.from(bucket).getPublicUrl(nombre);
  return data.publicUrl;
}
