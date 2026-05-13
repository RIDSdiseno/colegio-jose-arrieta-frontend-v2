import { useEffect, useState } from "react";
import { Helmet } from "react-helmet-async";
import { CalendarDays, ExternalLink } from "lucide-react";
import { getNoticias } from "../api/noticias";
import Badge from "../components/ui/Badge";
import Button from "../components/ui/Button";

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
  const [items, setItems] = useState([]);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [loading, setLoading] = useState(true);
  const [loadingMore, setLoadingMore] = useState(false);
  const [error, setError] = useState("");

  const fetchNoticias = async ({ nextPage = 1, replace = false } = {}) => {
    try {
      replace ? setLoading(true) : setLoadingMore(true);
      setError("");
      const response = await getNoticias({ page: nextPage, limit: 6 });
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

  useEffect(() => {
    fetchNoticias({ nextPage: 1, replace: true });
  }, []);

  return (
    <>
      <Helmet>
        <title>Noticias — Colegio José Arrieta, La Reina</title>
        <meta name="keywords" content="noticias colegio La Reina, actividades colegio José Arrieta, comunidad escolar La Reina Santiago" />
        <meta
          name="description"
          content="Revisa noticias, actividades y novedades del Colegio José Arrieta en La Reina."
        />
      </Helmet>

      <section className="page-hero">
        <div className="container-main">
          <p className="text-sm uppercase tracking-wide text-secondary">Comunidad en acción</p>
          <h1 className="mt-2 max-w-3xl text-4xl font-bold sm:text-5xl">Noticias</h1>
          <p className="mt-4 max-w-2xl text-slate-100">
            Todo lo que ocurre en nuestro colegio: aprendizajes, eventos y logros.
          </p>
        </div>
      </section>

      <section className="py-16">
        <div className="container-main">
          {error ? (
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
          ) : null}

          <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
            {loading
              ? Array.from({ length: 6 }).map((_, i) => <SkeletonCard key={i} />)
              : items.map((item) => (
                  <article
                    key={item.id}
                    className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-soft transition hover:-translate-y-1"
                  >
                    <img
                      src={
                        item.imagen ||
                        "https://images.unsplash.com/photo-1497486751825-1233686d5d80?auto=format&fit=crop&w=1200&q=80"
                      }
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

          {!loading && !error && items.length === 0 ? (
            <p className="mt-6 text-center text-slate-600">No hay noticias publicadas aún.</p>
          ) : null}

          {!loading && page < totalPages ? (
            <div className="mt-8 text-center">
              <Button
                type="button"
                variant="outline"
                onClick={() => fetchNoticias({ nextPage: page + 1, replace: false })}
                disabled={loadingMore}
              >
                {loadingMore ? "Cargando..." : "Cargar más"}
              </Button>
            </div>
          ) : null}
        </div>
      </section>
    </>
  );
}

export default Noticias;
