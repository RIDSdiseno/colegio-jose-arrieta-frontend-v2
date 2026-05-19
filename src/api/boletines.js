import { stripHtml, formatDate } from "../lib/utils";

const WP_BASE = "https://colegiojosearrieta.cl/wp-json/wp/v2";

let cachedCategoryId = null;

async function getBoletinCategoryId() {
  if (cachedCategoryId) return cachedCategoryId;
  const res = await fetch(`${WP_BASE}/categories?slug=boletin&per_page=1`);
  if (!res.ok) return null;
  const data = await res.json();
  cachedCategoryId = data?.[0]?.id || null;
  return cachedCategoryId;
}

export async function getBoletines({ limit = 6 } = {}) {
  const categoryId = await getBoletinCategoryId();
  if (!categoryId) return [];

  const params = new URLSearchParams({
    categories: categoryId,
    per_page: limit,
    _embed: 1,
    status: "publish",
    orderby: "date",
    order: "desc",
  });

  const res = await fetch(`${WP_BASE}/posts?${params}`);
  if (!res.ok) return [];
  const data = await res.json();

  return data.map((post) => {
    const contenido = post.content?.rendered || "";
    const pdfMatch = contenido.match(/href="([^"]+\.pdf)"/i);
    const pdfUrl = pdfMatch?.[1] || null;

    return {
      id: post.id,
      titulo: stripHtml(post.title?.rendered),
      fecha: formatDate(post.date, { year: "numeric", month: "long" }),
      link: pdfUrl || post.link,
      isPdf: !!pdfUrl,
      imagen: post._embedded?.["wp:featuredmedia"]?.[0]?.source_url || null,
    };
  });
}
