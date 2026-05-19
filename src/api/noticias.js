import { supabase } from "../lib/supabase";
import { formatDate } from "../lib/utils";

function requireSupabase() {
  if (!supabase) throw new Error("Supabase no está configurado. Agrega VITE_SUPABASE_URL y VITE_SUPABASE_ANON_KEY en .env.local");
  return supabase;
}

function mapRow(row) {
  return {
    id: row.id,
    slug: row.slug,
    titulo: row.titulo,
    extracto: row.extracto || "",
    contenido: row.contenido || "",
    imagen: row.imagen || null,
    categoria: row.categoria || "General",
    fecha: formatDate(row.fecha),
  };
}

// ── API pública (Supabase) ─────────────────────────────────────────────────────

export async function getNoticias({ limit = 6, page = 1, search = "" } = {}) {
  if (!supabase) return { data: [], page, totalPages: 1 };

  const from = (page - 1) * limit;
  const to = from + limit - 1;

  let query = supabase
    .from("noticias")
    .select("*", { count: "exact" })
    .order("fecha", { ascending: false })
    .range(from, to);

  if (search.trim()) {
    query = query.ilike("titulo", `%${search.trim()}%`);
  }

  const { data, error, count } = await query;
  if (error) throw new Error(error.message);

  const totalPages = Math.max(1, Math.ceil((count || 0) / limit));
  return { data: (data || []).map(mapRow), page, totalPages };
}

export async function getNoticiaPorSlug(slug) {
  if (!supabase) throw new Error("Noticia no encontrada.");

  const { data, error } = await supabase
    .from("noticias")
    .select("*")
    .eq("slug", slug)
    .single();

  if (error || !data) throw new Error("Noticia no encontrada.");
  return mapRow(data);
}

// ── API admin (Supabase) ───────────────────────────────────────────────────────

export async function crearNoticia(payload) {
  const sb = requireSupabase();
  const { data, error } = await sb.from("noticias").insert([payload]).select().single();
  if (error) throw new Error(error.message);
  return data;
}

export async function actualizarNoticia(id, payload) {
  const sb = requireSupabase();
  const { data, error } = await sb.from("noticias").update(payload).eq("id", id).select().single();
  if (error) throw new Error(error.message);
  return data;
}

export async function eliminarNoticia(id) {
  const sb = requireSupabase();
  const { error } = await sb.from("noticias").delete().eq("id", id);
  if (error) throw new Error(error.message);
}

export async function subirImagen(file) {
  const sb = requireSupabase();
  const ext = file.name.split(".").pop();
  const nombre = `${Date.now()}.${ext}`;
  const { error } = await sb.storage.from("noticias").upload(nombre, file, { upsert: false });
  if (error) throw new Error(error.message);
  const { data } = sb.storage.from("noticias").getPublicUrl(nombre);
  return data.publicUrl;
}
