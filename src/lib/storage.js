import { supabase } from "./supabase";

const MAX_SIZE_MB = 10;
const MAX_SIZE_BYTES = MAX_SIZE_MB * 1024 * 1024;
const ALLOWED_MIME_IMAGEN = ["image/jpeg", "image/png", "image/webp", "image/gif"];
const ALLOWED_MIME_PDF = ["application/pdf"];

/**
 * Sube un archivo a Supabase Storage y retorna la URL pública.
 * @param {File} file
 * @param {string} bucket  — nombre del bucket en Supabase
 * @param {string} [prefix] — prefijo de carpeta (sin slash final)
 * @param {string[]} [allowedMime] — tipos MIME permitidos (default: imágenes)
 */
export async function subirArchivo(file, bucket, prefix = "", allowedMime = ALLOWED_MIME_IMAGEN) {
  if (!supabase) throw new Error("Supabase no está configurado para subir archivos.");

  if (!allowedMime.includes(file.type)) {
    throw new Error(`Tipo de archivo no permitido (${file.type}).`);
  }
  if (file.size > MAX_SIZE_BYTES) {
    throw new Error(`El archivo supera el límite de ${MAX_SIZE_MB} MB.`);
  }

  const ext = file.name.split(".").pop().toLowerCase();
  const uid = crypto.randomUUID();
  const nombre = prefix ? `${prefix}/${uid}.${ext}` : `${uid}.${ext}`;
  const { error } = await supabase.storage.from(bucket).upload(nombre, file, { upsert: false });
  if (error) throw new Error(error.message);
  const { data } = supabase.storage.from(bucket).getPublicUrl(nombre);
  return data.publicUrl;
}

/**
 * Sube un PDF a Supabase Storage bucket "documentos" y retorna la URL pública.
 * @param {File} file
 * @param {string} [prefix] — prefijo de carpeta, ej: "documentos/2026"
 */
export async function subirPdf(file, prefix = "") {
  return subirArchivo(file, "documentos", prefix, ALLOWED_MIME_PDF);
}

/**
 * Elimina un archivo de Supabase Storage a partir de su URL pública.
 * Solo actúa si la URL pertenece al proyecto Supabase configurado.
 * No lanza error si falla — el archivo queda huérfano pero la operación principal no se interrumpe.
 * @param {string} url — URL pública del archivo
 * @param {string} bucket — nombre del bucket (ej: "documentos", "noticias")
 */
export async function eliminarArchivoStorage(url, bucket) {
  if (!supabase || !url) return;
  try {
    // Extraer el path relativo dentro del bucket desde la URL pública
    // Formato: https://{project}.supabase.co/storage/v1/object/public/{bucket}/{path}
    const marker = `/object/public/${bucket}/`;
    const idx = url.indexOf(marker);
    if (idx === -1) {
      // URL externa o con dominio personalizado — no hacer nada
      if (!import.meta.env.PROD) {
        console.debug(`[storage] URL no reconocida como Supabase — omitida: ${url}`);
      }
      return;
    }
    const path = url.slice(idx + marker.length);
    await supabase.storage.from(bucket).remove([path]);
  } catch {
    // Silencioso: el archivo puede no existir o ya haber sido eliminado
  }
}
