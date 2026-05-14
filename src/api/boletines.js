import axios from "axios";
import { stripHtml, formatDate } from "../lib/utils";

const WP_BASE = "https://colegiojosearrieta.cl/wp-json/wp/v2";

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

  return res.data.map((post) => {
    // Intentar extraer URL del PDF desde el contenido del post (primer enlace .pdf)
    const contenido = post.content?.rendered || "";
    const pdfMatch = contenido.match(/href="([^"]+\.pdf)"/i);
    const pdfUrl = pdfMatch?.[1] || null;

    return {
      id: post.id,
      titulo: stripHtml(post.title?.rendered),
      fecha: formatDate(post.date, { year: "numeric", month: "long" }),
      // Preferir link directo al PDF; si no hay, ir a la página del post en WP
      link: pdfUrl || post.link,
      isPdf: !!pdfUrl,
      imagen: post._embedded?.["wp:featuredmedia"]?.[0]?.source_url || null,
    };
  });
}
