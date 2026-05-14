import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import { CalendarDays, ExternalLink } from "lucide-react";
import DOMPurify from "dompurify";
import { getNoticiaPorSlug } from "../api/noticias";
import Badge from "../components/ui/Badge";
import Button from "../components/ui/Button";

function NoticiaDetalle() {
  const { slug } = useParams();
  const [noticia, setNoticia] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    getNoticiaPorSlug(slug)
      .then(setNoticia)
      .catch((err) => setError(err.message || "No pudimos cargar la noticia."))
      .finally(() => setLoading(false));
  }, [slug]);

  if (loading) {
    return (
      <section className="container-main py-20">
        <div className="mx-auto max-w-4xl animate-pulse space-y-4">
          <div className="h-10 w-2/3 rounded bg-slate-200" />
          <div className="h-4 w-1/3 rounded bg-slate-200" />
          <div className="h-72 rounded-2xl bg-slate-200" />
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
          <Button to="/noticias" variant="outline" className="mb-6 text-sm">
            ← Volver a noticias
          </Button>

          <div className="flex flex-wrap items-center gap-3">
            <Badge>{noticia.categoria}</Badge>
            <span className="inline-flex items-center gap-1 text-sm text-slate-500">
              <CalendarDays className="h-4 w-4" />
              {noticia.fecha}
            </span>
          </div>

          <h1 className="mt-4 font-heading text-3xl font-bold text-primary sm:text-4xl">
            {noticia.titulo}
          </h1>

          {noticia.imagen ? (
            <img
              src={noticia.imagen}
              alt={noticia.titulo}
              className="mt-6 h-[300px] w-full rounded-2xl object-cover sm:h-[420px]"
            />
          ) : null}

          <div
            className="prose prose-slate mt-8 max-w-none"
            dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(noticia.contenido) }}
          />

          <div className="mt-10 border-t border-slate-200 pt-8">
            <a
              href={noticia.link}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-2 rounded-full bg-primary px-6 py-3 text-sm font-semibold text-white transition hover:bg-primaryHover"
            >
              Ver noticia completa en el sitio oficial
              <ExternalLink className="h-4 w-4" />
            </a>
          </div>
        </div>
      </section>
    </>
  );
}

export default NoticiaDetalle;
