import { useEffect, useState } from "react";
import { Helmet } from "react-helmet-async";
import { useSearchParams, Link } from "react-router-dom";
import { CalendarDays, Search, X } from "lucide-react";
import { getNoticias } from "../api/noticias";
import { formatDate } from "../lib/utils";
import Badge from "../components/ui/Badge";
import Button from "../components/ui/Button";
import PageHero from "../components/ui/PageHero";
import newsPlaceholder from "../assets/news-placeholder.svg";

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

  // Carga inicial y cuando cambia ?q= — con flag de cancelación para evitar race conditions
  useEffect(() => {
    let cancelled = false;
    setInputValue(queryParam);
    setPage(1); // Resetear página al cambiar búsqueda — evita que fetchMore use página de búsqueda anterior
    setLoading(true);
    setError("");

    getNoticias({ page: 1, limit: 6, search: queryParam })
      .then((response) => {
        if (cancelled) return;
        setItems(response.data);
        setPage(response.page);
        setTotalPages(response.totalPages);
      })
      .catch((err) => {
        if (cancelled) return;
        setError(err.message || "No pudimos cargar las noticias.");
      })
      .finally(() => { if (!cancelled) setLoading(false); });

    return () => { cancelled = true; };
  }, [queryParam]);

  // Cargar más resultados (paginación)
  async function fetchMore() {
    try {
      setLoadingMore(true);
      setError("");
      const response = await getNoticias({ page: page + 1, limit: 6, search: queryParam });
      setItems((prev) => [...prev, ...response.data]);
      setPage(response.page);
      setTotalPages(response.totalPages);
    } catch (err) {
      setError(err.message || "No pudimos cargar las noticias.");
    } finally {
      setLoadingMore(false);
    }
  }

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

      <PageHero
        img="https://images.unsplash.com/photo-1522202176988-66273c2fd55f?auto=format&fit=crop&w=1920&q=80"
        badge="Comunidad en acción"
        title="Noticias del"
        highlight="Colegio"
        subtitle="Todo lo que ocurre en nuestra comunidad: aprendizajes, eventos y logros."
      />

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
              {items.length > 0 ? (
                <>Resultados para <span className="font-semibold text-primary">"{queryParam}"</span> — {items.length} {items.length === 1 ? "noticia encontrada" : "noticias encontradas"}</>
              ) : null}
            </p>
          )}

          {error && (
            <div className="mb-6 rounded-2xl border border-red-200 bg-red-50 p-5 text-center text-red-700">
              {error}
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
                    <Link to={`/noticias/${item.slug}`}>
                      <img
                        src={item.imagen || newsPlaceholder}
                        alt={item.titulo}
                        loading="lazy"
                        className="h-48 w-full object-contain bg-white transition hover:opacity-90"
                      />
                    </Link>
                    <div className="p-5">
                      <div className="mb-3 flex items-center justify-between">
                        <Badge>{item.categoria}</Badge>
                        <span className="inline-flex items-center gap-1 text-xs text-slate-500">
                          <CalendarDays className="h-3.5 w-3.5" />
                          {formatDate(item.fecha)}
                        </span>
                      </div>
                      <h2 className="line-clamp-2 font-heading text-xl font-semibold text-primary">
                        <Link to={`/noticias/${item.slug}`} className="hover:underline">
                          {item.titulo}
                        </Link>
                      </h2>
                      <p className="mt-2 line-clamp-3 text-sm text-slate-600">{item.extracto}</p>
                      <Link
                        to={`/noticias/${item.slug}`}
                        className="mt-4 inline-flex items-center gap-1 text-sm font-semibold text-primary hover:underline"
                      >
                        Leer noticia →
                      </Link>
                    </div>
                  </article>
                ))}
          </div>

          {!loading && !error && items.length === 0 && (
            <div className="flex flex-col items-center gap-3 py-20 text-center">
              <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-primary/10">
                <Search className="h-7 w-7 text-primary/50" />
              </div>
              <p className="font-heading text-lg font-semibold text-slate-700">
                {queryParam ? `Sin resultados para "${queryParam}"` : "Próximamente"}
              </p>
              <p className="max-w-xs text-sm text-slate-400">
                {queryParam
                  ? "Intenta con otras palabras clave."
                  : "Aquí aparecerán las noticias y novedades del colegio."}
              </p>
            </div>
          )}

          {!loading && page < totalPages && (
            <div className="mt-8 text-center">
              <Button
                type="button"
                variant="outline"
                onClick={fetchMore}
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
