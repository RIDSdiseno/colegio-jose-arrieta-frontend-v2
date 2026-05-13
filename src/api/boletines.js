import axios from "axios";

const WP_BASE = "https://colegiojosearrieta.cl/wp-json/wp/v2";

function stripHtml(html = "") {
  return html.replace(/<[^>]*>/g, "").trim();
}

function formatDate(isoDate) {
  return new Date(isoDate).toLocaleDateString("es-CL", {
    year: "numeric",
    month: "long",
  });
}

let cachedCategoryId = null;

async function getBoletinCategoryId() {
  if (cachedCategoryId) return cachedCategoryId;
  const res = await axios.get(`${WP_BASE}/categories`, {
    params: { slug: "boletin", per_page: 1 },
    timeout: 8000,
  });
  cachedCategoryId = res.data?.[0]?.id || null;
  return cachedCategoryId;
}

export async function getBoletines({ limit = 6 } = {}) {
  const categoryId = await getBoletinCategoryId();
  if (!categoryId) return [];

  const res = await axios.get(`${WP_BASE}/posts`, {
    params: {
      categories: categoryId,
      per_page: limit,
      _embed: 1,
      status: "publish",
      orderby: "date",
      order: "desc",
    },
    timeout: 10000,
  });

  return res.data.map((post) => ({
    id: post.id,
    titulo: stripHtml(post.title?.rendered),
    fecha: formatDate(post.date),
    link: post.link,
    imagen: post._embedded?.["wp:featuredmedia"]?.[0]?.source_url || null,
  }));
}
