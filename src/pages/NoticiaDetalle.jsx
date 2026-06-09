import { useEffect, useRef, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import { CalendarDays, ChevronLeft, ChevronRight, Copy, Check } from "lucide-react";
import DOMPurify from "dompurify";
import { getNoticiaPorSlug, getNoticiasAdyacentes, getNoticias } from "../api/noticias";
import newsPlaceholder from "../assets/news-placeholder.svg";
import { formatDate } from "../lib/utils";
import Badge from "../components/ui/Badge";
import Button from "../components/ui/Button";

function ShareButton({ titulo }) {
  const [copied, setCopied] = useState(false);
  const timerRef = useRef(null);

  const url = window.location.href;

  // Limpiar el timer al desmontar para evitar memory leak
  useEffect(() => () => clearTimeout(timerRef.current), []);

  const handleCopy = () => {
    navigator.clipboard.writeText(url)
      .then(() => {
        setCopied(true);
        clearTimeout(timerRef.current);
        timerRef.current = setTimeout(() => setCopied(false), 2000);
      })
      .catch(() => {}); // Falla silenciosa en HTTP o Safari sin permiso
  };

  return (
    <button
      type="button"
      onClick={handleCopy}
      title={copied ? "¡Copiado!" : "Copiar enlace"}
      className={`flex h-9 shrink-0 items-center gap-1.5 rounded-xl px-3 text-sm font-medium transition ${
        copied ? "bg-green-100 text-green-700" : "bg-slate-100 text-slate-600 hover:bg-slate-200"
      }`}
    >
      {copied ? <Check className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
      {copied ? "¡Copiado!" : "Copiar link"}
    </button>
  );
}

function NoticiaDetalle() {
  const { slug } = useParams();
  const [noticia, setNoticia] = useState(null);
  const [adyacentes, setAdyacentes] = useState({ anterior: null, siguiente: null });
  const [relacionadas, setRelacionadas] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    let cancelled = false;
    setNoticia(null);
    setAdyacentes({ anterior: null, siguiente: null });
    setRelacionadas([]);
    setLoading(true);
    setError("");

    // Lanzar ambos fetches en paralelo — adyacentes es secundario y su fallo no rompe la página
    Promise.allSettled([
      getNoticiaPorSlug(slug),
      getNoticiasAdyacentes(slug),
    ]).then(([noticiaResult, adyacentesResult]) => {
      if (cancelled) return;
      if (noticiaResult.status === "rejected") {
        setError(noticiaResult.reason?.message || "No pudimos cargar la noticia.");
      } else {
        const n = noticiaResult.value;
        setNoticia(n);
        // Cargar relacionadas de la misma categoría (excluyendo la actual)
        if (n?.categoria) {
          getNoticias({ limit: 4, categoria: n.categoria })
            .then((res) => {
              if (cancelled) return; // evitar setear relacionadas de un slug anterior
              const otras = (res?.data || []).filter((r) => r.slug !== slug).slice(0, 3);
              setRelacionadas(otras);
            })
            .catch(() => {});
        }
      }
      if (adyacentesResult.status === "fulfilled") {
        setAdyacentes(adyacentesResult.value);
      }
    }).finally(() => { if (!cancelled) setLoading(false); });

    return () => { cancelled = true; };
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
        <meta name="description" content={(noticia.extracto || "").replace(/<[^>]+>/g, "").slice(0, 160)} />
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

          <div className="mt-4 flex flex-wrap items-start justify-between gap-4">
            <h1 className="font-heading text-3xl font-bold text-primary sm:text-4xl">
              {noticia.titulo}
            </h1>
            <ShareButton titulo={noticia.titulo} />
          </div>

          {noticia.extracto && (
            <p className="mt-3 text-lg text-slate-500 leading-relaxed">{noticia.extracto}</p>
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

          {/* Noticias relacionadas */}
          {relacionadas.length > 0 && (
            <div className="mt-12 border-t border-slate-200 pt-10">
              <h2 className="mb-6 font-heading text-xl font-bold text-slate-800">
                Más noticias de <span className="text-primary">{noticia.categoria}</span>
              </h2>
              <div className="grid gap-4 sm:grid-cols-3">
                {relacionadas.map((r) => (
                  <article
                    key={r.id}
                    className="group relative overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-soft transition hover:-translate-y-1"
                  >
                    {/* Stretched link — un solo enlace cubre toda la tarjeta */}
                    <Link
                      to={`/noticias/${r.slug}`}
                      className="absolute inset-0 z-10"
                      aria-label={r.titulo}
                    />
                    <img
                      src={r.imagen || newsPlaceholder}
                      alt={r.titulo}
                      loading="lazy"
                      className="h-36 w-full object-cover"
                      onError={(e) => { e.currentTarget.src = newsPlaceholder; }}
                    />
                    <div className="p-4">
                      <p className="text-xs text-slate-400">{formatDate(r.fecha)}</p>
                      <p className="mt-1 line-clamp-2 text-sm font-semibold text-slate-800 group-hover:text-primary">
                        {r.titulo}
                      </p>
                    </div>
                  </article>
                ))}
              </div>
            </div>
          )}
        </div>
      </section>
    </>
  );
}

export default NoticiaDetalle;
