const BASE_URL = import.meta.env.VITE_API_URL || "http://localhost:4000";
const ADMIN_SECRET = import.meta.env.VITE_ADMIN_SECRET;

async function apiFetch(path, options = {}) {
  const headers = { "Content-Type": "application/json", ...options.headers };
  if (ADMIN_SECRET) headers["x-admin-secret"] = ADMIN_SECRET;

  const res = await fetch(`${BASE_URL}${path}`, { ...options, headers });
  const data = await res.json();

  if (!res.ok) throw new Error(data.error || "Error del servidor");
  return data;
}

export default apiFetch;
