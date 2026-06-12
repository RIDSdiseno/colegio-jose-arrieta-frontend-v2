import { useEffect, useState } from "react";
import { ArrowRight, CalendarDays, Newspaper, BookOpen } from "lucide-react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { getNoticias } from "../../api/noticias";
import { toArray } from "../../lib/utils";
import { getVideos } from "../../api/videos";
import { getYoutubeId } from "../../lib/youtube";
import { formatDate } from "../../lib/utils";
import SectionTitle from "../ui/SectionTitle";
import newsPlaceholder from "../../assets/news-placeholder.svg";

const FALLBACK_IMG = newsPlaceholder;

const SIDEBAR_LINKS = [
  {
    label: "Noticias",
    href: "/noticias",
    bg: null,
    bgClass: "bg-gradient-to-br from-sky-600 to-blue-800",
    icon: Newspaper,
    internal: true,
  },
  {
    label: "Documentos",
    href: "/documentos",
    bg: null,
    bgClass: "bg-gradient-to-br from-emerald-600 to-teal-800",
    icon: BookOpen,
    internal: true,
  },
];

const YT_EMBED_FALLBACK = "https://www.youtube.com/embed/diIKhu_OQTY?rel=0&modestbranding=1";

function NewsSkeleton() {
  return <div className="animate-pulse overflow-hidden rounded-2xl bg-slate-200 h-64" />;
}

function NewsCard({ item }) {
  return (
    <motion.article
      initial={{ opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      className="group relative overflow-hidden rounded-2xl shadow-soft"
      style={{ minHeight: "240px" }}
    >
      <img
        src={item.imagen || FALLBACK_IMG}
        alt={item.titulo}
        loading="lazy"
        className="absolute inset-0 h-full w-full object-cover transition duration-500 group-hover:scale-105"
        onError={(e) => { e.currentTarget.src = FALLBACK_IMG; }}
      />
      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-black/10" />
      <div className="absolute inset-0 flex flex-col justify-end p-5">
        {item.fecha && (
          <span className="mb-2 inline-flex items-center gap-1.5 text-xs text-white/60">
            <CalendarDays className="h-3 w-3" />
            {formatDate(item.fecha)}
          </span>
        )}
        <h3 className="font-heading text-base font-bold leading-snug text-white line-clamp-2">
          {item.titulo}
        </h3>
        <div className="mt-3 flex items-center gap-1.5 text-xs font-semibold text-secondary opacity-0 transition-all duration-200 group-hover:opacity-100">
          Leer más
          <ArrowRight className="h-3.5 w-3.5" />
        </div>
      </div>
    </motion.article>
  );
}

function NewsSection() {
  const [noticias, setNoticias] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [ytEmbed, setYtEmbed] = useState(YT_EMBED_FALLBACK);

  useEffect(() => {
    getNoticias({ limit: 4 })
      .then((result) => setNoticias(result?.data || []))
      .catch(() => setError("No se pudieron cargar las noticias."))
      .finally(() => setLoading(false));

    // Cargar el primer video activo desde la API (orden 1)
    getVideos({ limit: 1 })
      .then((res) => {
        // Tolera respuesta como array directo o como { data: [] }
        const list = toArray(res);
        const primero = list[0];
        if (primero?.url) {
          const id = getYoutubeId(primero.url);
          if (id) setYtEmbed(`https://www.youtube.com/embed/${id}?rel=0&modestbranding=1`);
        }
      })
      .catch((err) => {
        if (import.meta.env.DEV) console.warn("[NewsSection] videos fetch failed:", err);
        // Si falla, usa el fallback hardcodeado
      });
  }, []);

  return (
    <section className="py-20">
      <div className="container-main">
        {/* Header */}
        <div className="flex flex-col items-start justify-between gap-4 sm:flex-row sm:items-end">
          <SectionTitle
            center={false}
            eyebrow="Actualidad"
            title="Últimas noticias del colegio"
            subtitle="Mantente al día con actividades, logros y novedades de nuestra comunidad."
          />
        </div>

        {error && (
          <div className="mb-6 rounded-2xl border border-red-200 bg-red-50 p-5 text-center text-red-700">
            {error}{" "}
            <a
              href="https://colegiojosearrieta.cl"
              target="_blank"
              rel="noreferrer"
              className="font-semibold underline"
            >
              Ver noticias en el sitio oficial →
            </a>
          </div>
        )}

        {/* Layout de 2 columnas */}
        <div className="mt-8 grid gap-6 lg:grid-cols-[1fr_340px]">

          {/* Izquierda — grid 2x2 de noticias */}
          <div className="grid gap-4 sm:grid-cols-2">
            {loading
              ? Array.from({ length: 4 }).map((_, i) => <NewsSkeleton key={i} />)
              : noticias.map((item) =>
                  item.slug ? (
                    <Link key={item.id} to={`/noticias/${item.slug}`}>
                      <NewsCard item={item} />
                    </Link>
                  ) : (
                    <NewsCard key={item.id} item={item} />
                  )
                )}
            {!loading && !error && noticias.length === 0 && (
              <p className="col-span-2 text-center text-slate-600">
                Aún no hay noticias publicadas.
              </p>
            )}
          </div>

          {/* Derecha — banners de acceso rápido + video */}
          <div className="flex flex-col gap-4">
            {/* Banners de acceso rápido */}
            {SIDEBAR_LINKS.map(({ label, href, bgClass, icon: Icon, internal }) => {
              const content = (
                <motion.div
                  whileHover={{ scale: 1.02 }}
                  className={`group relative flex items-center justify-between overflow-hidden rounded-2xl px-6 py-5 shadow-soft ${bgClass}`}
                  style={{ minHeight: "88px" }}
                >
                  <div className="absolute inset-0 bg-black/20" />
                  <div className="relative z-10 flex w-full items-center justify-between gap-3">
                    <div className="flex items-center gap-3">
                      <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-white/15">
                        <Icon className="h-4 w-4 text-secondary" />
                      </span>
                      <span className="font-heading text-sm font-bold uppercase tracking-wide text-white">
                        {label}
                      </span>
                    </div>
                    <ArrowRight className="h-4 w-4 text-secondary transition-transform duration-200 group-hover:translate-x-1" />
                  </div>
                </motion.div>
              );

              return internal ? (
                <Link key={label} to={href}>
                  {content}
                </Link>
              ) : (
                <a key={label} href={href} target="_blank" rel="noreferrer">
                  {content}
                </a>
              );
            })}

            {/* Video de YouTube */}
            <div className="relative overflow-hidden rounded-2xl shadow-soft" style={{ paddingBottom: "56.25%", height: 0 }}>
              <iframe
                title="Canal YouTube Colegio José Arrieta"
                src={ytEmbed}
                className="absolute inset-0 h-full w-full"
                style={{ border: 0 }}
                loading="lazy"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default NewsSection;
