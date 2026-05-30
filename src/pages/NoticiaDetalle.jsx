import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import { CalendarDays, ChevronLeft, ChevronRight } from "lucide-react";
import DOMPurify from "dompurify";
import { getNoticiaPorSlug, getNoticiasAdyacentes } from "../api/noticias";
import { formatDate } from "../lib/utils";
import Badge from "../components/ui/Badge";
import Button from "../components/ui/Button";

function NoticiaDetalle() {
  const { slug } = useParams();
  const [noticia, setNoticia] = useState(null);
  const [adyacentes, setAdyacentes] = useState({ anterior: null, siguiente: null });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    setNoticia(null);
    setAdyacentes({ anterior: null, siguiente: null });
    setLoading(true);
    setError("");

    // Lanzar ambos fetches en paralelo — adyacentes es secundario y su fallo no rompe la página
    Promise.allSettled([
      getNoticiaPorSlug(slug),
      getNoticiasAdyacentes(slug),
    ]).then(([noticiaResult, adyacentesResult]) => {
      if (noticiaResult.status === "rejected") {
        setError(noticiaResult.reason?.message || "No pudimos cargar la noticia.");
      } else {
        setNoticia(noticiaResult.value);
      }
      if (adyacentesResult.status === "fulfilled") {
        setAdyacentes(adyacentesResult.value);
      }
    }).finally(() => setLoading(false));
  }, [slug]);

  if (loading) {
    return (
      <section className="container-main py-20">
        <div className="mx-auto max-w-4xl animate-pulse space-y-4">
          <div className="h-10 w-2/3 rounded bg-slate-200" />
          <div className="h-4 w-1/3 rounded bg-slate-200" />
          <div className="h-64 rounded-2xl bg-slate-200" />
          <div className="space-y-2">
            <div className="h-3 w-full rounded bg-slate-200" />
            <div className="h-3 w-5/6 rounded bg-slate-200" />
            <div className="h-3 w-4/5 rounded bg-slate-200" />
          </div>
        </div>
      </section>
    );
  }

  if (error || !noticia) {
    return (
      <section className="container-main py-20">
        <div className="rounded-2xl border border-red-200 bg-red-50 p-6 text-red-700">
          {error || "Noticia no encontrada."}
        </div>
        <div className="mt-6">
          <Button to="/noticias" variant="outline">
            ← Volver a noticias
          </Button>
        </div>
      </section>
    );
  }

  return (
    <>
      <Helmet>
        <title>{noticia.titulo} — Colegio José Arrieta</title>
        <meta name="description" content={noticia.extracto} />
      </Helmet>

      <section className="py-14">
        <div className="container-main mx-auto max-w-4xl">
          <div className="flex flex-wrap items-center gap-3">
            <Badge>{noticia.categoria}</Badge>
            <span className="inline-flex items-center gap-1 text-sm text-slate-500">
              <CalendarDays className="h-4 w-4" />
              {formatDate(noticia.fecha)}
            </span>
          </div>

          <h1 className="mt-4 font-heading text-3xl font-bold text-primary sm:text-4xl">
            {noticia.titulo}
          </h1>

          {noticia.extracto && (
            <p className="mt-3 text-lg text-slate-500 leading-relaxed">{noticia.extracto}</p>
          )}

          {noticia.imagen && (
            <div className="mt-6 overflow-hidden rounded-2xl border border-slate-100 bg-slate-50 shadow-sm">
              <img
                src={noticia.imagen}
                alt={noticia.titulo}
                className="mx-auto block w-full object-contain max-h-[520px]"
              />
            </div>
          )}

          <div
            className="wp-content mt-8 overflow-x-hidden"
            dangerouslySetInnerHTML={{
              // buildContenido ya convierte \n → <br> antes de guardar en BD,
              // así que el replace aquí sería redundante y potencialmente duplicaría <br>
              __html: DOMPurify.sanitize(noticia.contenido || "", { FORBID_ATTR: ["style"] }),
            }}
          />

          <div className="mt-10 border-t border-slate-200 pt-8 space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div>
                {adyacentes.anterior ? (
                  <Link
                    to={`/noticias/${adyacentes.anterior.slug}`}
                    className="group flex h-full flex-col gap-2 rounded-2xl border-2 border-slate-200 bg-white p-4 shadow-sm transition hover:border-primary hover:shadow-md"
                  >
                    <span className="inline-flex items-center gap-1 text-xs font-semibold uppercase tracking-wide text-slate-400 group-hover:text-primary">
                      <ChevronLeft className="h-3.5 w-3.5" /> Anterior
                    </span>
                    <span className="line-clamp-2 text-sm font-semibold text-slate-700 group-hover:text-primary">
                      {adyacentes.anterior.titulo}
                    </span>
                  </Link>
                ) : <div />}
              </div>
              <div>
                {adyacentes.siguiente ? (
                  <Link
                    to={`/noticias/${adyacentes.siguiente.slug}`}
                    className="group flex h-full flex-col items-end gap-2 rounded-2xl border-2 border-slate-200 bg-white p-4 shadow-sm text-right transition hover:border-primary hover:shadow-md"
                  >
                    <span className="inline-flex items-center gap-1 text-xs font-semibold uppercase tracking-wide text-slate-400 group-hover:text-primary">
                      Siguiente <ChevronRight className="h-3.5 w-3.5" />
                    </span>
                    <span className="line-clamp-2 text-sm font-semibold text-slate-700 group-hover:text-primary">
                      {adyacentes.siguiente.titulo}
                    </span>
                  </Link>
                ) : <div />}
              </div>
            </div>
            <div className="text-center">
              <Button to="/noticias" variant="outline" className="text-sm">
                ← Volver a noticias
              </Button>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

export default NoticiaDetalle;
