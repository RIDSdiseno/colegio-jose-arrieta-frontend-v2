import { useEffect, useRef, useState } from "react";
import { Helmet } from "react-helmet-async";
import { useSearchParams, Link } from "react-router-dom";
import { CalendarDays, Search, X } from "lucide-react";
import { getNoticias, getAnosNoticias, CATEGORIAS_NOTICIAS } from "../api/noticias";
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

const CATEGORIAS = CATEGORIAS_NOTICIAS;

function Noticias() {
  const [searchParams, setSearchParams] = useSearchParams();
  const queryParam = searchParams.get("q") || "";
  const catParam = searchParams.get("cat") || "";
  const anioParam = parseInt(searchParams.get("anio")) || 0;

  const [inputValue, setInputValue] = useState(queryParam);
  const [items, setItems] = useState([]);
  const [total, setTotal] = useState(0);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [loading, setLoading] = useState(true);
  const [loadingMore, setLoadingMore] = useState(false);
  const [error, setError] = useState("");
  const [anos, setAnos] = useState([]);

  // Cargar años disponibles una sola vez al montar
  useEffect(() => {
    getAnosNoticias().then(setAnos).catch(() => {});
  }, []);

  // Refs para detectar cambios en fetchMore y descartar respuestas obsoletas
  const activeQueryRef = useRef(queryParam);
  const activeCatRef = useRef(catParam);
  const activeAnioRef = useRef(anioParam);
  useEffect(() => { activeQueryRef.current = queryParam; }, [queryParam]);
  useEffect(() => { activeCatRef.current = catParam; }, [catParam]);
  useEffect(() => { activeAnioRef.current = anioParam; }, [anioParam]);

  // Carga inicial y cuando cambia ?q= o ?cat=
  useEffect(() => {
    let cancelled = false;
    setInputValue(queryParam);
    setPage(1);
    setLoading(true);
    setError("");

    getNoticias({ page: 1, limit: 6, search: queryParam, categoria: catParam, anio: anioParam })
      .then((response) => {
        if (cancelled) return;
        setItems(response.data ?? []);
        setTotal(response.total || 0);
        setPage(response.page);
        setTotalPages(response.totalPages);
      })
      .catch((err) => {
        if (cancelled) return;
        setError(err.message || "No pudimos cargar las noticias.");
      })
      .finally(() => { if (!cancelled) setLoading(false); });

    return () => { cancelled = true; };
  }, [queryParam, catParam, anioParam]);

  // Cargar más resultados
  async function fetchMore() {
    const currentQuery = queryParam;
    const currentCat = catParam;
    const currentAnio = anioParam;
    try {
      setLoadingMore(true);
      setError("");
      const response = await getNoticias({ page: page + 1, limit: 6, search: currentQuery, categoria: currentCat, anio: currentAnio });
      if (currentQuery !== activeQueryRef.current || currentCat !== activeCatRef.current || currentAnio !== activeAnioRef.current) return;
      setItems((prev) => [...prev, ...(response.data ?? [])]);
      setTotal(response.total || 0);
      setPage(response.page);
      setTotalPages(response.totalPages);
    } catch (err) {
      setError(err.message || "No pudimos cargar las noticias.");
    } finally {
      setLoadingMore(false);
    }
  }

  // Helper para construir el objeto de params preservando todos los filtros activos
  function buildParams({ q, cat, anio } = {}) {
    const next = {};
    const qVal    = q    !== undefined ? q    : queryParam;
    const catVal  = cat  !== undefined ? cat  : catParam;
    const anioVal = anio !== undefined ? anio : anioParam;
    if (qVal)    next.q   = qVal;
    if (catVal)  next.cat = catVal;
    if (anioVal) next.anio = anioVal;
    return next;
  }

  function handleSearch(e) {
    e.preventDefault();
    setSearchParams(buildParams({ q: inputValue.trim() }));
  }

  function clearSearch() {
    setInputValue("");
    setSearchParams(buildParams({ q: "" }));
  }

  function selectCategoria(cat) {
    setSearchParams(buildParams({ cat }));
  }

  function selectAnio(anio) {
    setSearchParams(buildParams({ anio }));
  }

  return (
    <>
      <Helmet>
        <title>Noticias — Colegio José Arrieta, La Reina</title>
        <meta name="keywords" content="noticias colegio La Reina, actividades colegio José Arrieta, comunidad escolar La Reina Santiago" />
        <meta name="description" content="Revisa noticias, actividades y novedades del Colegio José Arrieta en La Reina." />
        <link rel="canonical" href="https://colegiojosearrieta.cl/noticias" />
      </Helmet>

      <PageHero
        img="/images/53471234_s.jpg"
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
              {queryParam && (
                <button type="button" onClick={clearSearch} className="text-slate-400 hover:text-slate-600 transition">
                  <X className="h-3.5 w-3.5" />
                </button>
              )}
            </div>
            <Button type="submit" variant="primary" className="px-5 py-2.5 text-sm">
              Buscar
            </Button>
          </form>

          {/* Filtro por categoría */}
          <div className="mb-6 flex flex-wrap gap-2">
            <button
              type="button"
              onClick={() => selectCategoria("")}
              className={`rounded-full px-4 py-1.5 text-sm font-medium transition ${
                !catParam
                  ? "bg-primary text-white"
                  : "bg-slate-100 text-slate-600 hover:bg-slate-200"
              }`}
            >
              Todas
            </button>
            {CATEGORIAS.map((cat) => (
              <button
                key={cat}
                type="button"
                onClick={() => selectCategoria(cat)}
                className={`rounded-full px-4 py-1.5 text-sm font-medium transition ${
                  catParam === cat
                    ? "bg-primary text-white"
                    : "bg-slate-100 text-slate-600 hover:bg-slate-200"
                }`}
              >
                {cat}
              </button>
            ))}
          </div>

          {/* Filtro por año */}
          {anos.length > 0 && (
            <div className="mb-6 flex flex-wrap gap-2">
              <button
                type="button"
                onClick={() => selectAnio(0)}
                className={`rounded-full px-4 py-1.5 text-sm font-medium transition ${
                  !anioParam
                    ? "bg-slate-700 text-white"
                    : "bg-slate-100 text-slate-600 hover:bg-slate-200"
                }`}
              >
                Todos los años
              </button>
              {anos.map((a) => (
                <button
                  key={a}
                  type="button"
                  onClick={() => selectAnio(a)}
                  className={`rounded-full px-4 py-1.5 text-sm font-medium transition ${
                    anioParam === a
                      ? "bg-slate-700 text-white"
                      : "bg-slate-100 text-slate-600 hover:bg-slate-200"
                  }`}
                >
                  {a}
                </button>
              ))}
            </div>
          )}

          {/* Info de filtros activos */}
          {(!!queryParam || !!catParam || !!anioParam) && !loading && (
            <p className="mb-6 text-sm text-slate-500">
              {total > 0 ? (
                <>
                  {total} {total === 1 ? "noticia encontrada" : "noticias encontradas"}
                  {queryParam && <> para <span className="font-semibold text-primary">"{queryParam}"</span></>}
                  {catParam && <> en <span className="font-semibold text-primary">{catParam}</span></>}
                  {anioParam ? <> · <span className="font-semibold text-primary">{anioParam}</span></> : null}
                </>
              ) : (
                <>
                  Sin resultados
                  {queryParam && <> para <span className="font-semibold text-primary">"{queryParam}"</span></>}
                  {catParam && <> en <span className="font-semibold text-primary">{catParam}</span></>}
                  {anioParam ? <> en <span className="font-semibold text-primary">{anioParam}</span></> : null}
                </>
              )}
            </p>
          )}

          {error && (
            <div className="mb-6 rounded-2xl border border-red-200 bg-red-50 p-5 text-center text-red-700">
              {error}
            </div>
          )}

          <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
            {loading
              ? Array.from({ length: 6 }).map((_, i) => <SkeletonCard key={i} aria-hidden="true" />)
              : items.map((item) => (
                  <article
                    key={item.id}
                    className="relative overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-soft transition hover:-translate-y-1"
                  >
                    {/* Un solo Link cubre toda la tarjeta — evita links duplicados para el mismo destino */}
                    <Link
                      to={`/noticias/${item.slug}`}
                      className="absolute inset-0 z-10"
                      aria-label={item.titulo}
                    />
                    <img
                      src={item.imagen || newsPlaceholder}
                      alt={item.titulo}
                      loading="lazy"
                      onError={(e) => { e.currentTarget.src = newsPlaceholder; }}
                      className="h-48 w-full object-contain bg-white"
                    />
                    <div className="p-5">
                      <div className="mb-3 flex items-center justify-between">
                        <Badge>{item.categoria}</Badge>
                        <span className="inline-flex items-center gap-1 text-xs text-slate-500">
                          <CalendarDays className="h-3.5 w-3.5" />
                          {formatDate(item.fecha)}
                        </span>
                      </div>
                      <h2 className="line-clamp-2 font-heading text-xl font-semibold text-primary">
                        {item.titulo}
                      </h2>
                      <p className="mt-2 line-clamp-3 text-sm text-slate-600">{item.extracto}</p>
                      <span className="mt-4 inline-flex items-center gap-1 text-sm font-semibold text-primary">
                        Leer noticia →
                      </span>
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
                {queryParam || catParam || anioParam ? "Sin resultados" : "Próximamente"}
              </p>
              <p className="max-w-xs text-sm text-slate-400">
                {queryParam || catParam || anioParam
                  ? "Intenta con otras palabras clave, categoría o año."
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
                disabled={loadingMore || loading}
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
