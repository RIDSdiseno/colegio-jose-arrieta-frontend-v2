import { useEffect, useMemo, useState } from "react";
import { Link, useSearchParams } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import { Search, FileText, Newspaper } from "lucide-react";
import { getNoticias } from "../api/noticias";

// Índice estático de páginas del sitio
const PAGINAS = [
  {
    titulo: "Inicio",
    to: "/",
    descripcion: "Página principal del Colegio José Arrieta. Educación integral en La Reina desde 1973.",
    keywords: "inicio home colegio jose arrieta la reina educación integral comunidad",
  },
  {
    titulo: "¿Por qué elegirnos?",
    to: "/por-que-elegirnos",
    descripcion: "Descubre nuestros pilares institucionales, infraestructura, trayectoria y resultados académicos.",
    keywords: "por que elegirnos pilares convivencia vanguardia vida saludable infraestructura simce resultados trayectoria historia",
  },
  {
    titulo: "Proyecto Educativo",
    to: "/proyecto-educativo",
    descripcion: "Conoce nuestros ejes pedagógicos, talleres, reglamentos y boletines del colegio.",
    keywords: "proyecto educativo ejes talleres reglamentos boletines pedagogico programa inglés arte deporte",
  },
  {
    titulo: "Admisión 2026",
    to: "/admision",
    descripcion: "Postula al Colegio José Arrieta. Proceso paso a paso, mensualidad, uniforme y formulario de contacto.",
    keywords: "admision postula 2026 matricula mensualidad proceso vacantes uniforme formulario inscripcion",
  },
  {
    titulo: "Vida Escolar",
    to: "/vida-escolar",
    descripcion: "Actividades, deportes, cultura, eventos y la vida cotidiana de nuestra comunidad escolar.",
    keywords: "vida escolar actividades deportes cultura eventos comunidad galeria fotos videos",
  },
  {
    titulo: "Contacto",
    to: "/contacto",
    descripcion: "Escríbenos, llámanos o visítanos. Av. José Arrieta 6870, La Reina, Santiago.",
    keywords: "contacto telefono email direccion horario whatsapp visita arrieta la reina santiago",
  },
];

function normalize(str) {
  return str
    .toLowerCase()
    .normalize("NFD")
    .replace(/[̀-ͯ]/g, "");
}

function searchPaginas(q) {
  const query = normalize(q);
  return PAGINAS.filter((p) =>
    normalize(`${p.titulo} ${p.descripcion} ${p.keywords}`).includes(query)
  );
}

function Buscar() {
  const [searchParams, setSearchParams] = useSearchParams();
  const queryParam = searchParams.get("q") || "";
  const [inputValue, setInputValue] = useState(queryParam);
  const [noticias, setNoticias] = useState([]);
  const [loadingNoticias, setLoadingNoticias] = useState(false);

  // Resultados de páginas — instantáneo
  const paginasEncontradas = useMemo(
    () => (queryParam.trim().length >= 2 ? searchPaginas(queryParam) : []),
    [queryParam]
  );

  // Resultados de noticias — desde Supabase
  useEffect(() => {
    if (queryParam.trim().length < 2) { setNoticias([]); return; }
    setLoadingNoticias(true);
    getNoticias({ search: queryParam, limit: 5 })
      .then((res) => setNoticias(res.data))
      .catch(() => setNoticias([]))
      .finally(() => setLoadingNoticias(false));
  }, [queryParam]);

  function handleSearch(e) {
    e.preventDefault();
    const q = inputValue.trim();
    if (q) setSearchParams({ q });
  }

  const totalResultados = paginasEncontradas.length + noticias.length;

  return (
    <>
      <Helmet>
        <title>Buscar — Colegio José Arrieta</title>
        <meta name="robots" content="noindex" />
      </Helmet>

      <section className="py-14">
        <div className="container-main max-w-3xl">

          {/* Buscador */}
          <form onSubmit={handleSearch} className="mb-8">
            <div className="flex items-center gap-3 rounded-2xl border border-slate-200 bg-white px-5 py-3.5 shadow-soft">
              <Search className="h-5 w-5 shrink-0 text-primary" />
              <input
                type="text"
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                placeholder="¿Qué estás buscando?"
                autoFocus
                className="flex-1 bg-transparent text-base text-slate-800 placeholder-slate-400 outline-none"
              />
              <button
                type="submit"
                className="rounded-xl bg-primary px-4 py-2 text-sm font-semibold text-white transition hover:bg-primaryHover"
              >
                Buscar
              </button>
            </div>
          </form>

          {/* Estado vacío / inicial */}
          {queryParam.trim().length < 2 && (
            <div className="flex flex-col items-center gap-3 py-16 text-center">
              <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-primary/10">
                <Search className="h-7 w-7 text-primary/50" />
              </div>
              <p className="font-heading text-lg font-semibold text-slate-700">¿Qué deseas encontrar?</p>
              <p className="text-sm text-slate-400">Escribe al menos 2 caracteres para buscar en el sitio.</p>
            </div>
          )}

          {/* Sin resultados */}
          {queryParam.trim().length >= 2 && !loadingNoticias && totalResultados === 0 && (
            <div className="flex flex-col items-center gap-3 py-16 text-center">
              <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-slate-100">
                <Search className="h-7 w-7 text-slate-400" />
              </div>
              <p className="font-heading text-lg font-semibold text-slate-700">Sin resultados para "{queryParam}"</p>
              <p className="text-sm text-slate-400">Intenta con otras palabras clave.</p>
            </div>
          )}

          {/* Resultados */}
          {queryParam.trim().length >= 2 && totalResultados > 0 && (
            <p className="mb-5 text-sm text-slate-500">
              {totalResultados} {totalResultados === 1 ? "resultado" : "resultados"} para{" "}
              <span className="font-semibold text-primary">"{queryParam}"</span>
            </p>
          )}

          {/* Páginas del sitio */}
          {paginasEncontradas.length > 0 && (
            <div className="mb-8">
              <h2 className="mb-3 flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-slate-400">
                <FileText className="h-3.5 w-3.5" />
                Páginas
              </h2>
              <div className="space-y-2">
                {paginasEncontradas.map((p) => (
                  <Link
                    key={p.to}
                    to={p.to}
                    className="flex flex-col gap-0.5 rounded-xl border border-slate-100 bg-white p-4 shadow-sm transition hover:border-primary/30 hover:shadow-soft"
                  >
                    <span className="font-heading text-sm font-bold text-primary">{p.titulo}</span>
                    <span className="text-xs text-slate-500">{p.descripcion}</span>
                    <span className="mt-1 text-xs text-slate-300">colegiojosearrieta.cl{p.to}</span>
                  </Link>
                ))}
              </div>
            </div>
          )}

          {/* Noticias */}
          {(loadingNoticias || noticias.length > 0) && (
            <div>
              <h2 className="mb-3 flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-slate-400">
                <Newspaper className="h-3.5 w-3.5" />
                Noticias
              </h2>
              {loadingNoticias ? (
                <div className="space-y-2">
                  {[1, 2].map((i) => (
                    <div key={i} className="h-16 animate-pulse rounded-xl bg-slate-100" />
                  ))}
                </div>
              ) : (
                <div className="space-y-2">
                  {noticias.map((n) => (
                    <Link
                      key={n.id}
                      to={`/noticias/${n.slug}`}
                      className="flex items-start gap-4 rounded-xl border border-slate-100 bg-white p-4 shadow-sm transition hover:border-primary/30 hover:shadow-soft"
                    >
                      {n.imagen && (
                        <img
                          src={n.imagen}
                          alt={n.titulo}
                          className="h-12 w-16 shrink-0 rounded-lg object-cover"
                        />
                      )}
                      <div className="min-w-0">
                        <p className="font-heading text-sm font-bold text-primary line-clamp-1">{n.titulo}</p>
                        <p className="mt-0.5 text-xs text-slate-500 line-clamp-2">{n.extracto}</p>
                        <p className="mt-1 text-xs text-slate-300">{n.fecha}</p>
                      </div>
                    </Link>
                  ))}
                </div>
              )}
            </div>
          )}

        </div>
      </section>
    </>
  );
}

export default Buscar;
