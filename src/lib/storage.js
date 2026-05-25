import { supabase } from "./supabase";

const MAX_SIZE_MB = 10;
const MAX_SIZE_BYTES = MAX_SIZE_MB * 1024 * 1024;
const ALLOWED_MIME = ["image/jpeg", "image/png", "image/webp", "image/gif", "image/svg+xml"];

/**
 * Sube un archivo de imagen a Supabase Storage y retorna la URL pública.
 * Valida tamaño (máx 10 MB) y tipo MIME antes de subir.
 * @param {File} file
 * @param {string} bucket  — nombre del bucket en Supabase
 * @param {string} [prefix] — prefijo de carpeta (sin slash final), ej: "albums"
 */
export async function subirArchivo(file, bucket, prefix = "") {
  if (!supabase) throw new Error("Supabase no está configurado para subir archivos.");

  if (!ALLOWED_MIME.includes(file.type)) {
    throw new Error(`Tipo de archivo no permitido (${file.type}). Solo se aceptan imágenes JPEG, PNG, WebP, GIF o SVG.`);
  }
  if (file.size > MAX_SIZE_BYTES) {
    throw new Error(`El archivo supera el límite de ${MAX_SIZE_MB} MB.`);
  }

  const ext = file.name.split(".").pop().toLowerCase();
  const nombre = prefix ? `${prefix}/${Date.now()}.${ext}` : `${Date.now()}.${ext}`;
  const { error } = await supabase.storage.from(bucket).upload(nombre, file, { upsert: false });
  if (error) throw new Error(error.message);
  const { data } = supabase.storage.from(bucket).getPublicUrl(nombre);
  return data.publicUrl;
}
