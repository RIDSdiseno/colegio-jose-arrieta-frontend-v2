import { useEffect, useState } from "react";
import { Helmet } from "react-helmet-async";
import { useSearchParams } from "react-router-dom";
import { CalendarDays, ExternalLink, Search, X } from "lucide-react";
import { getNoticias } from "../api/noticias";
import Badge from "../components/ui/Badge";
import Button from "../components/ui/Button";
import PageHeroCarousel from "../components/ui/PageHeroCarousel";

const heroSlides = [
  {
    img: "https://colegiojosearrieta.cl/wp-content/uploads/2025/09/DSC_1386-Grande.jpg",
    badge: "Comunidad en acción",
    title: "Noticias del",
    highlight: "Colegio",
    subtitle: "Todo lo que ocurre en nuestra comunidad: aprendizajes, eventos y logros.",
  },
  {
    img: "https://images.unsplash.com/photo-1503676260728-1c00da094a0b?auto=format&fit=crop&w=1920&q=80",
    badge: "Actualidad 2026",
    title: "Mantente",
    highlight: "informado",
    subtitle: "Noticias, actividades y novedades del Colegio José Arrieta en La Reina.",
  },
];

function SkeletonCard() {
  return (
    <article className="animate-pulse rounded-2xl border border-slate-200 bg-white p-4">
      <div className="h-44 rounded-xl bg-slate-200" />
      <div className="mt-4 h-4 w-2/3 rounded bg-slate-200" />
      <div className="mt-2 h-4 w-1/3 rounded bg-slate-200" />
      <div className="mt-3 h-3 w-full rounded bg-slate-200" />
      <div className="mt-2 h-3 w-5/6 rounded bg-slate-200" />
    </article>
  );
}

function Noticias() {
  const [searchParams, setSearchParams] = useSearchParams();
  const queryParam = searchParams.get("q") || "";

  const [inputValue, setInputValue] = useState(queryParam);
  const [items, setItems] = useState([]);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [loading, setLoading] = useState(true);
  const [loadingMore, setLoadingMore] = useState(false);
  const [error, setError] = useState("");

  const fetchNoticias = async ({ nextPage = 1, replace = false, search = queryParam } = {}) => {
    try {
      replace ? setLoading(true) : setLoadingMore(true);
      setError("");
      const response = await getNoticias({ page: nextPage, limit: 6, search });
      setItems((prev) => (replace ? response.data : [...prev, ...response.data]));
      setPage(response.page);
      setTotalPages(response.totalPages);
    } catch (err) {
      setError(err.message || "No pudimos cargar las noticias.");
    } finally {
      setLoading(false);
      setLoadingMore(false);
    }
  };

  // Cuando cambia el parámetro ?q= (desde el topbar o al borrar)
  useEffect(() => {
    setInputValue(queryParam);
    fetchNoticias({ nextPage: 1, replace: true, search: queryParam });
  }, [queryParam]);

  function handleSearch(e) {
    e.preventDefault();
    const q = inputValue.trim();
    setSearchParams(q ? { q } : {});
  }

  function clearSearch() {
    setInputValue("");
    setSearchParams({});
  }

  return (
    <>
      <Helmet>
        <title>Noticias — Colegio José Arrieta, La Reina</title>
        <meta name="keywords" content="noticias colegio La Reina, actividades colegio José Arrieta, comunidad escolar La Reina Santiago" />
        <meta name="description" content="Revisa noticias, actividades y novedades del Colegio José Arrieta en La Reina." />
      </Helmet>

      <PageHeroCarousel slides={heroSlides} />

      <section className="py-16">
        <div className="container-main">

          {/* Buscador en página */}
          <form onSubmit={handleSearch} className="mb-8 flex items-center gap-3">
            <div className="flex flex-1 max-w-md items-center gap-2 rounded-full border border-slate-200 bg-white px-4 py-2.5 shadow-sm">
              <Search className="h-4 w-4 shrink-0 text-slate-400" />
              <input
                type="text"
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                placeholder="Buscar noticias..."
                className="flex-1 bg-transparent text-sm text-slate-700 placeholder-slate-400 outline-none"
              />
              {inputValue && (
                <button type="button" onClick={clearSearch} className="text-slate-400 hover:text-slate-600 transition">
                  <X className="h-3.5 w-3.5" />
                </button>
              )}
            </div>
            <Button type="submit" variant="primary" className="px-5 py-2.5 text-sm">
              Buscar
            </Button>
          </form>

          {/* Resultado de búsqueda */}
          {queryParam && !loading && (
            <p className="mb-6 text-sm text-slate-500">
              {items.length > 0
                ? <>Resultados para <span className="font-semibold text-primary">"{queryParam}"</span> — {items.length} {items.length === 1 ? "noticia encontrada" : "noticias encontradas"}</>
                : <>No se encontraron noticias para <span className="font-semibold text-primary">"{queryParam}"</span></>
              }
            </p>
          )}

          {error && (
            <div className="mb-6 rounded-2xl border border-red-200 bg-red-50 p-5 text-center text-red-700">
              {error}{" "}
              <a href="https://colegiojosearrieta.cl" target="_blank" rel="noreferrer" className="font-semibold underline">
                Ver noticias en el sitio oficial →
              </a>
            </div>
          )}

          <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
            {loading
              ? Array.from({ length: 6 }).map((_, i) => <SkeletonCard key={i} />)
              : items.map((item) => (
                  <article
                    key={item.id}
                    className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-soft transition hover:-translate-y-1"
                  >
                    <img
                      src={item.imagen || "https://images.unsplash.com/photo-1497486751825-1233686d5d80?auto=format&fit=crop&w=1200&q=80"}
                      alt={item.titulo}
                      className="h-48 w-full object-cover"
                    />
                    <div className="p-5">
                      <div className="mb-3 flex items-center justify-between">
                        <Badge>{item.categoria}</Badge>
                        <span className="inline-flex items-center gap-1 text-xs text-slate-500">
                          <CalendarDays className="h-3.5 w-3.5" />
                          {item.fecha}
                        </span>
                      </div>
                      <h2 className="line-clamp-2 font-heading text-xl font-semibold text-primary">
                        {item.titulo}
                      </h2>
                      <p className="mt-2 line-clamp-3 text-sm text-slate-600">{item.extracto}</p>
                      <a
                        href={item.link}
                        target="_blank"
                        rel="noreferrer"
                        className="mt-4 inline-flex items-center gap-1 text-sm font-semibold text-primary hover:underline"
                      >
                        Leer noticia <ExternalLink className="h-3.5 w-3.5" />
                      </a>
                    </div>
                  </article>
                ))}
          </div>

          {!loading && !error && items.length === 0 && !queryParam && (
            <p className="mt-6 text-center text-slate-600">No hay noticias publicadas aún.</p>
          )}

          {!loading && page < totalPages && (
            <div className="mt-8 text-center">
              <Button
                type="button"
                variant="outline"
                onClick={() => fetchNoticias({ nextPage: page + 1, replace: false, search: queryParam })}
                disabled={loadingMore}
              >
                {loadingMore ? "Cargando..." : "Cargar más"}
              </Button>
            </div>
          )}
        </div>
      </section>
    </>
  );
}

export default Noticias;
