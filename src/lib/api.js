import { supabase } from "./supabase";

// Eliminar /api del final si alguien lo pone por error en la variable de entorno
const BASE_URL = (import.meta.env.VITE_API_URL || "http://localhost:4000").replace(/\/api\/?$/, "");

async function apiFetch(path, options = {}) {
  const headers = { "Content-Type": "application/json", ...options.headers };

  if (options.admin) {
    if (!supabase) throw new Error("Supabase no configurado.");
    const { data } = await supabase.auth.getSession();
    if (!data.session?.access_token) {
      window.location.href = "/admin/login";
      throw new Error("Sesión expirada. Por favor inicia sesión nuevamente.");
    }
    headers["Authorization"] = `Bearer ${data.session.access_token}`;
  }

  const res = await fetch(`${BASE_URL}${path}`, { ...options, headers });

  let data;
  try { data = await res.json(); } catch { data = {}; }

  if (!res.ok) throw new Error(data.error || `Error ${res.status}`);
  return data;
}

export default apiFetch;
