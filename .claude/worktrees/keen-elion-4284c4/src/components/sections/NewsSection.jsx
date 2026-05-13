import { useEffect, useState } from "react";
import { ChevronLeft, ChevronRight, CalendarDays } from "lucide-react";
import { AnimatePresence, motion } from "framer-motion";
import { getNoticias } from "../../api/noticias";
import SectionTitle from "../ui/SectionTitle";
import Badge from "../ui/Badge";
import Button from "../ui/Button";

function NewsSkeleton() {
  return (
    <div className="animate-pulse overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-soft">
      <div className="h-44 bg-slate-200" />
      <div className="p-5 space-y-3">
        <div className="h-3 w-1/3 rounded bg-slate-200" />
        <div className="h-4 w-2/3 rounded bg-slate-200" />
        <div className="h-3 w-full rounded bg-slate-200" />
        <div className="h-3 w-4/5 rounded bg-slate-200" />
      </div>
    </div>
  );
}

function NewsSection() {
  const [noticias, setNoticias] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [page, setPage] = useState(0);

  const PER_PAGE = 3;

  useEffect(() => {
    getNoticias({ limit: 9 })
      .then((result) => setNoticias(result?.data || []))
      .catch(() => setError("No se pudieron cargar las noticias."))
      .finally(() => setLoading(false));
  }, []);

  const totalPages = Math.ceil(noticias.length / PER_PAGE);
  const visible = noticias.slice(page * PER_PAGE, (page + 1) * PER_PAGE);

  const prev = () => setPage((p) => Math.max(0, p - 1));
  const next = () => setPage((p) => Math.min(totalPages - 1, p + 1));

  return (
    <section className="bg-white py-16">
      <div className="container-main">
        <SectionTitle
          eyebrow="Actualidad"
          title="Últimas noticias del colegio"
          subtitle="Mantente al día con actividades, logros y novedades de nuestra comunidad."
        />

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

        <div className="relative">
          <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
            {loading
              ? Array.from({ length: 3 }).map((_, i) => <NewsSkeleton key={i} />)
              : (
                <AnimatePresence mode="wait">
                  <motion.div
                    key={page}
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -20 }}
                    transition={{ duration: 0.25 }}
                    className="contents"
                  >
                    {visible.map((item) => (
                      <article
                        key={item.id}
                        className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-soft transition hover:-translate-y-1"
                      >
                        <img
                          src={
                            item.imagen ||
                            "https://images.unsplash.com/photo-1427504494785-3a9ca7044f45?auto=format&fit=crop&w=1200&q=80"
                          }
                          alt={item.titulo}
                          className="h-44 w-full object-cover"
                        />
                        <div className="p-5">
                          <div className="mb-3 flex items-center justify-between gap-3">
                            <Badge>{item.categoria}</Badge>
                            <span className="inline-flex items-center gap-1 text-xs text-slate-500">
                              <CalendarDays className="h-3.5 w-3.5" />
                              {item.fecha}
                            </span>
                          </div>
                          <h3 className="line-clamp-2 font-heading text-lg font-semibold text-primary">
                            {item.titulo}
                          </h3>
                          <p className="mt-2 line-clamp-3 text-sm text-slate-600">{item.extracto}</p>
                        </div>
                      </article>
                    ))}
                  </motion.div>
                </AnimatePresence>
              )}
          </div>

          {!loading && totalPages > 1 ? (
            <div className="mt-8 flex items-center justify-center gap-4">
              <button
                type="button"
                onClick={prev}
                disabled={page === 0}
                aria-label="Anterior"
                className="flex h-10 w-10 items-center justify-center rounded-full border border-slate-300 bg-white text-primary transition hover:border-primary hover:bg-primary hover:text-white disabled:cursor-not-allowed disabled:opacity-40"
              >
                <ChevronLeft className="h-5 w-5" />
              </button>

              <div className="flex gap-2">
                {Array.from({ length: totalPages }).map((_, i) => (
                  <button
                    key={i}
                    type="button"
                    onClick={() => setPage(i)}
                    aria-label={`Página ${i + 1}`}
                    className={`h-2.5 rounded-full transition-all ${
                      i === page ? "w-8 bg-secondary" : "w-2.5 bg-slate-300"
                    }`}
                  />
                ))}
              </div>

              <button
                type="button"
                onClick={next}
                disabled={page === totalPages - 1}
                aria-label="Siguiente"
                className="flex h-10 w-10 items-center justify-center rounded-full border border-slate-300 bg-white text-primary transition hover:border-primary hover:bg-primary hover:text-white disabled:cursor-not-allowed disabled:opacity-40"
              >
                <ChevronRight className="h-5 w-5" />
              </button>
            </div>
          ) : null}
        </div>

        {!loading && !error && noticias.length === 0 ? (
          <p className="mt-6 text-center text-slate-600">Aún no hay noticias publicadas.</p>
        ) : null}

        <div className="mt-8 text-center">
          <Button to="/noticias" variant="outline">
            Ver todas las noticias
          </Button>
        </div>
      </div>
    </section>
  );
}

export default NewsSection;
