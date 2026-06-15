import { useState, useEffect } from "react";
import { Music, Trophy, Palette, BookMarked, HandHeart, ChevronLeft, ChevronRight, Play, X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { Helmet } from "react-helmet-async";
import PageHero from "../components/ui/PageHero";
import { getAlbums, getAlbumFotos } from "../api/albums";
import { getVideos } from "../api/videos";
import { getYoutubeId } from "../lib/youtube";
import { toArray } from "../lib/utils";

const experiencias = [
  {
    id: 1,
    icon: Music,
    titulo: "Actividades Artísticas",
    texto: "Música, expresión corporal y festivales que fortalecen la creatividad.",
  },
  {
    id: 2,
    icon: Trophy,
    titulo: "Deporte Formativo",
    texto: "Competencias y hábitos saludables con foco en trabajo en equipo.",
  },
  {
    id: 3,
    icon: Palette,
    titulo: "Talleres Creativos",
    texto: "Espacios para explorar intereses y desarrollar nuevos talentos.",
  },
  {
    id: 4,
    icon: BookMarked,
    titulo: "Salidas Pedagógicas",
    texto: "Aprendizaje experiencial en contextos reales y significativos.",
  },
  {
    id: 5,
    icon: HandHeart,
    titulo: "Convivencia Escolar",
    texto: "Programas de bienestar, respeto y sana convivencia para toda la comunidad.",
  },
];



function Galeria() {
  const [albums, setAlbums] = useState([]);
  const [loadingAlbums, setLoadingAlbums] = useState(true);
  const [albumActivo, setAlbumActivo] = useState(null);
  const [fotosActivas, setFotosActivas] = useState([]);
  const [fotoActiva, setFotoActiva] = useState(0);
  const [cargandoFotos, setCargandoFotos] = useState(false);

  useEffect(() => {
    getAlbums()
      .then((data) => setAlbums(data || []))
      .catch(() => setAlbums([]))
      .finally(() => setLoadingAlbums(false));
  }, []);

  const abrirAlbum = async (album) => {
    setFotoActiva(0);
    // Álbum del backend (tiene id)
    if (album.id) {
      setCargandoFotos(true);
      setAlbumActivo(album);
      try {
        const data = await getAlbumFotos(album.id);
        // Tolera respuesta como { fotos: [...] } o como array directo
        const fotos = Array.isArray(data) ? data : (data?.fotos ?? []);
        setFotosActivas(fotos);
      } catch {
        setFotosActivas([]);
      } finally {
        setCargandoFotos(false);
      }
    } else {
      // Álbum estático
      setAlbumActivo(album);
      setFotosActivas(album.fotos.map((url) => ({ url })));
    }
  };

  const cerrar = () => { setAlbumActivo(null); setFotosActivas([]); };
  const prev = () => setFotoActiva((c) => (c - 1 + fotosActivas.length) % fotosActivas.length);
  const next = () => setFotoActiva((c) => (c + 1) % fotosActivas.length);

  // Cerrar con Escape y navegar con flechas del teclado
  // Se usan setState funcionales para evitar closure obsoleto con fotoActiva
  useEffect(() => {
    if (!albumActivo) return;
    const handler = (e) => {
      if (e.key === "Escape") cerrar();
      // Usar fotosActivas.length dentro del handler para siempre tener el valor actual
      // y evitar NaN cuando el array aún está cargando (length === 0)
      if (e.key === "ArrowLeft")
        setFotoActiva((c) => fotosActivas.length > 0 ? (c - 1 + fotosActivas.length) % fotosActivas.length : 0);
      if (e.key === "ArrowRight")
        setFotoActiva((c) => fotosActivas.length > 0 ? (c + 1) % fotosActivas.length : 0);
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [albumActivo, fotosActivas]);

  // Normalizar portada para álbumes estáticos vs backend
  const getPortada = (album) => album.portada || album.fotos?.[0] || null;
  const getCount = (album) => album._count?.fotos ?? album.fotos?.length ?? 0;

  if (loadingAlbums) {
    return (
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {Array.from({ length: 6 }).map((_, i) => (
          <div key={i} aria-hidden="true" className="h-64 animate-pulse rounded-2xl bg-slate-200" />
        ))}
      </div>
    );
  }

  if (albums.length === 0) {
    return (
      <div className="flex flex-col items-center gap-3 py-16 text-center">
        <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-primary/10 text-3xl">📷</div>
        <p className="font-heading text-lg font-semibold text-slate-700">Galería próximamente</p>
        <p className="text-sm text-slate-400">Estamos preparando los álbumes fotográficos. ¡Vuelve pronto!</p>
      </div>
    );
  }

  return (
    <>
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {albums.map((album, i) => (
          <button
            key={album.id || album.titulo}
            type="button"
            onClick={() => abrirAlbum(album)}
            className="group overflow-hidden rounded-2xl shadow-soft focus:outline-none focus:ring-2 focus:ring-primary"
          >
            <div className="relative overflow-hidden">
              {getPortada(album) ? (
                <img
                  src={getPortada(album)}
                  alt={album.titulo}
                  loading="lazy"
                  className="h-48 w-full object-cover transition duration-300 group-hover:scale-105"
                  onError={(e) => { e.currentTarget.style.display = "none"; }}
                />
              ) : (
                <div className="h-48 w-full bg-slate-100 flex items-center justify-center text-slate-300 text-4xl">📷</div>
              )}
              <div className="absolute inset-0 bg-black/30 opacity-0 transition group-hover:opacity-100" />
              <div className="absolute inset-0 flex items-center justify-center opacity-0 transition group-hover:opacity-100">
                <span className="rounded-full bg-white/90 px-4 py-2 text-sm font-semibold text-primary">
                  Ver galería
                </span>
              </div>
            </div>
            <div className="bg-white px-4 py-3 text-left">
              <p className="font-semibold text-primary">{album.titulo}</p>
              <p className="text-xs text-slate-400">{getCount(album)} foto{getCount(album) !== 1 ? "s" : ""}</p>
            </div>
          </button>
        ))}
      </div>

      {/* Lightbox */}
      <AnimatePresence>
        {albumActivo && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[90] flex flex-col items-center justify-center bg-black/90 p-4"
            onClick={(e) => { if (e.target === e.currentTarget) cerrar(); }}
          >
            <button
              type="button"
              onClick={cerrar}
              className="absolute right-4 top-4 rounded-full bg-white/10 p-2 text-white transition hover:bg-white/20"
              aria-label="Cerrar"
            >
              <X className="h-6 w-6" />
            </button>

            <p className="mb-4 text-sm font-semibold text-white">{albumActivo.titulo}</p>

            {cargandoFotos ? (
              <div className="flex h-48 items-center justify-center text-white/60">
                <svg className="h-8 w-8 animate-spin" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"/>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8z"/>
                </svg>
              </div>
            ) : (
              <div className="relative flex w-full max-w-3xl items-center justify-center gap-4">
                {fotosActivas.length > 1 && (
                  <button type="button" onClick={prev} className="shrink-0 rounded-full bg-white/10 p-3 text-white transition hover:bg-white/20" aria-label="Anterior">
                    <ChevronLeft className="h-6 w-6" />
                  </button>
                )}

                {fotosActivas[fotoActiva] && (
                  <motion.img
                    key={fotoActiva}
                    initial={{ opacity: 0, scale: 0.97 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.2 }}
                    src={fotosActivas[fotoActiva].url}
                    alt={fotosActivas[fotoActiva].caption || `${albumActivo.titulo} ${fotoActiva + 1}`}
                    className="max-h-[70vh] rounded-xl object-contain shadow-2xl"
                  />
                )}

                {fotosActivas.length > 1 && (
                  <button type="button" onClick={next} className="shrink-0 rounded-full bg-white/10 p-3 text-white transition hover:bg-white/20" aria-label="Siguiente">
                    <ChevronRight className="h-6 w-6" />
                  </button>
                )}
              </div>
            )}

            {fotosActivas.length > 1 && (
              <p className="mt-4 text-sm text-white/60">
                {fotoActiva + 1} / {fotosActivas.length}
              </p>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

function VideoCard({ video }) {
  const [open, setOpen] = useState(false);
  const ytId = getYoutubeId(video.url);

  // Cerrar modal con Escape — hook antes de cualquier return condicional (Reglas de Hooks)
  useEffect(() => {
    if (!open) return;
    const handler = (e) => { if (e.key === "Escape") setOpen(false); };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [open]);

  if (!ytId) return null;

  return (
    <>
      <button
        type="button"
        onClick={() => setOpen(true)}
        className="group overflow-hidden rounded-2xl shadow-soft focus:outline-none focus:ring-2 focus:ring-primary"
      >
        <div className="relative overflow-hidden">
          <img
            src={`https://img.youtube.com/vi/${ytId}/hqdefault.jpg`}
            alt={video.titulo}
            loading="lazy"
            className="h-44 w-full object-cover transition duration-300 group-hover:scale-105"
            onError={(e) => { e.currentTarget.style.display = "none"; }}
          />
          <div className="absolute inset-0 bg-black/40 transition group-hover:bg-black/50" />
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="flex h-12 w-12 items-center justify-center rounded-full bg-secondary shadow-lg transition group-hover:scale-110">
              <Play className="h-5 w-5 fill-primary text-primary" />
            </div>
          </div>
        </div>
        <div className="bg-white px-4 py-3 text-left">
          <p className="font-semibold text-primary">{video.titulo}</p>
          <p className="text-xs text-slate-400">{video.anio}</p>
        </div>
      </button>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[80] grid place-content-center bg-black/80 p-4"
            onClick={(e) => { if (e.target === e.currentTarget) setOpen(false); }}
          >
            <button
              type="button"
              onClick={() => setOpen(false)}
              className="absolute right-4 top-4 rounded-full bg-white/10 p-2 text-white transition hover:bg-white/20"
              aria-label="Cerrar"
            >
              <X className="h-5 w-5" />
            </button>
            <div className="w-[92vw] max-w-4xl overflow-hidden rounded-xl bg-black">
              <div className="relative pb-[56.25%]">
                <iframe
                  className="absolute inset-0 h-full w-full"
                  src={`https://www.youtube.com/embed/${ytId}?autoplay=1`}
                  title={video.titulo}
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                />
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

function VidaEscolar() {
  const [videos, setVideos] = useState([]);

  useEffect(() => {
    getVideos()
      .then((res) => setVideos(toArray(res)))
      .catch(() => {});
  }, []);

  return (
    <>
      <Helmet>
        <title>Vida Escolar — Colegio José Arrieta, La Reina</title>
        <meta
          name="description"
          content="Descubre la vida escolar del Colegio José Arrieta: actividades artísticas, deportes, talleres, galería de fotos y videos."
        />
        <link rel="canonical" href="https://colegiojosearrieta.cl/vida-escolar" />
      </Helmet>

      <PageHero
        imgs={[
          "/images/vida-escolar.jpg",
          "/images/alumnos.jpg",
        ]}
        badge="Comunidad Viva"
        title="Vida"
        highlight="Escolar"
        subtitle="Creemos en una escuela donde aprender también es disfrutar, compartir y crecer juntos."
      />

      {/* Experiencias */}
      <section className="bg-slate-950 py-20">
        <div className="container-main">
          <div className="mb-10">
            <span className="text-xs font-bold uppercase tracking-[0.2em] text-secondary">Actividades</span>
            <h2 className="mt-2 font-heading text-4xl font-black text-white sm:text-5xl">
              Experiencias que<br /><span className="text-secondary">dejan huella.</span>
            </h2>
          </div>
          <div className="grid gap-px bg-white/5 md:grid-cols-2 lg:grid-cols-3 rounded-3xl overflow-hidden">
            {experiencias.map((item) => {
              const Icon = item.icon;
              return (
                <motion.article
                  key={item.id}
                  initial={{ opacity: 0, y: 16 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  className="bg-slate-950 p-8 hover:bg-white/5 transition"
                >
                  <div className="mb-4 inline-flex rounded-xl bg-secondary/15 p-3">
                    <Icon className="h-5 w-5 text-secondary" />
                  </div>
                  <h2 className="font-heading text-xl font-bold text-white">{item.titulo}</h2>
                  <p className="mt-2 text-sm leading-relaxed text-white/60">{item.texto}</p>
                </motion.article>
              );
            })}
          </div>
        </div>
      </section>

      {/* Galería real */}
      <section className="py-20">
        <div className="container-main">
          <div className="mb-10">
            <span className="text-xs font-bold uppercase tracking-[0.2em] text-secondary">Galería</span>
            <h2 className="mt-2 font-heading text-4xl font-black text-slate-900 sm:text-5xl">
              Momentos de nuestra<br /><span className="text-primary">comunidad.</span>
            </h2>
            <p className="mt-3 max-w-md text-sm leading-relaxed text-slate-500">
              Álbumes fotográficos de las actividades del Colegio José Arrieta. Haz clic para ver cada galería.
            </p>
          </div>
          <Galeria />
        </div>
      </section>

      {/* Videos — solo si hay al menos uno */}
      {videos.length > 0 && (
        <section className="bg-slate-950 py-20">
          <div className="container-main">
            <div className="mb-10">
              <span className="text-xs font-bold uppercase tracking-[0.2em] text-secondary">Videos</span>
              <h2 className="mt-2 font-heading text-4xl font-black text-white sm:text-5xl">
                Conoce el colegio<br /><span className="text-secondary">en video.</span>
              </h2>
            </div>
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
              {videos.map((v) => (
                <VideoCard key={v.id} video={v} />
              ))}
            </div>
          </div>
        </section>
      )}
    </>
  );
}

export default VidaEscolar;
