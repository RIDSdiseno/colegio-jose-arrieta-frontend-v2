import axios from "axios";
import { supabase } from "../lib/supabase";

const WP_BASE = "https://colegiojosearrieta.cl/wp-json/wp/v2";

// ── Helpers WordPress ──────────────────────────────────────────────────────────

function stripHtml(html = "") {
  return html.replace(/<[^>]*>/g, "").trim();
}

function formatDate(isoDate) {
  return new Date(isoDate).toLocaleDateString("es-CL", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
}

function mapPost(post) {
  const media = post._embedded?.["wp:featuredmedia"]?.[0];
  const terms = post._embedded?.["wp:term"];
  const categoria = terms?.[0]?.[0]?.name || "General";
  return {
    id: post.id,
    slug: post.slug,
    link: post.link,
    titulo: stripHtml(post.title?.rendered),
    extracto: stripHtml(post.excerpt?.rendered),
    contenido: post.content?.rendered || "",
    imagen: media?.source_url || null,
    categoria,
    fecha: formatDate(post.date),
  };
}

// ── API pública (WordPress) ────────────────────────────────────────────────────

export async function getNoticias({ limit = 6, page = 1, search = "" } = {}) {
  const params = { per_page: limit, page, _embed: 1, status: "publish" };
  if (search.trim()) params.search = search.trim();
  const response = await axios.get(`${WP_BASE}/posts`, { params, timeout: 10000 });
  const totalPages = Number(response.headers?.["x-wp-totalpages"] || 1);
  return { data: response.data.map(mapPost), page, totalPages };
}

export async function getNoticiaPorSlug(slug) {
  const response = await axios.get(`${WP_BASE}/posts`, {
    params: { slug, _embed: 1 },
    timeout: 10000,
  });
  if (!response.data.length) throw new Error("Noticia no encontrada.");
  return mapPost(response.data[0]);
}

// ── API admin (Supabase — requiere .env.local configurado) ────────────────────

function requireSupabase() {
  if (!supabase) throw new Error("Supabase no está configurado. Agrega VITE_SUPABASE_URL y VITE_SUPABASE_ANON_KEY en .env.local");
  return supabase;
}

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
  const { error } = await sb.storage.from("noticias-imagenes").upload(nombre, file, { upsert: false });
  if (error) throw new Error(error.message);
  const { data } = sb.storage.from("noticias-imagenes").getPublicUrl(nombre);
  return data.publicUrl;
}
