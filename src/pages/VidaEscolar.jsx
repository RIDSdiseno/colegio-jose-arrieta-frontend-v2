import { useState } from "react";
import { Music, Trophy, Palette, BookMarked, HandHeart, ChevronLeft, ChevronRight, Play, X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { Helmet } from "react-helmet-async";
import SectionTitle from "../components/ui/SectionTitle";
import PageHeroCarousel from "../components/ui/PageHeroCarousel";

const BASE = "https://colegiojosearrieta.cl/wp-content/uploads";

const heroSlides = [
  {
    img: "https://images.unsplash.com/photo-1588072432836-e10032774350?auto=format&fit=crop&w=1920&q=80",
    badge: "Comunidad Viva",
    title: "Vida",
    highlight: "Escolar",
    subtitle: "Creemos en una escuela donde aprender también es disfrutar, compartir y crecer juntos.",
  },
  {
    img: "https://images.unsplash.com/photo-1606761568499-6d2451b23c66?auto=format&fit=crop&w=1920&q=80",
    badge: "Galería y actividades",
    title: "Momentos que",
    highlight: "marcan para siempre",
    subtitle: "Graduaciones, celebraciones, deportes y talleres que construyen identidad y pertenencia.",
  },
];

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

// Fotos reales del sitio del colegio

const galeriaAlbumes = [
  {
    titulo: "Fiestas Patrias 2025 — Bailes",
    portada: `${BASE}/2025/09/miniatura-bailes-18-sep.jpeg`,
    fotos: [
      `${BASE}/2025/09/DSC_0031-Grande-768x510.jpg`,
      `${BASE}/2025/09/DSC_0030-Grande-768x510.jpg`,
      `${BASE}/2025/09/DSC_0028-Grande-768x510.jpg`,
      `${BASE}/2025/09/DSC_0024-Grande-768x510.jpg`,
      `${BASE}/2025/09/DSC_0023-Grande-768x510.jpg`,
      `${BASE}/2025/09/DSC_0022-Grande-768x510.jpg`,
      `${BASE}/2025/09/DSC_0021-Grande.jpg`,
      `${BASE}/2025/09/DSC_0017-Grande.jpg`,
      `${BASE}/2025/09/DSC_0016-Grande.jpg`,
      `${BASE}/2025/09/DSC_0015-Grande.jpg`,
      `${BASE}/2025/09/DSC_0014-Grande.jpg`,
      `${BASE}/2025/09/DSC_0013-Grande.jpg`,
    ],
  },
  {
    titulo: "Acto 18 de Septiembre 2025",
    portada: `${BASE}/2025/09/nota23_int25b-768x431.jpg`,
    fotos: [
      `${BASE}/2025/09/DSC_1388-Grande.jpg`,
      `${BASE}/2025/09/DSC_1387-Grande.jpg`,
      `${BASE}/2025/09/DSC_1386-Grande.jpg`,
      `${BASE}/2025/09/DSC_1385-Grande.jpg`,
      `${BASE}/2025/09/DSC_1384-Grande.jpg`,
      `${BASE}/2025/09/DSC_0370-Grande.jpg`,
      `${BASE}/2025/09/DSC_0369-Grande.jpg`,
      `${BASE}/2025/09/DSC_0368-Grande.jpg`,
      `${BASE}/2025/09/DSC_0325-Grande.jpg`,
      `${BASE}/2025/09/DSC_0320-Grande.jpg`,
      `${BASE}/2025/09/DSC_0315-Grande.jpg`,
      `${BASE}/2025/09/DSC_0308-Grande.jpg`,
    ],
  },
  {
    titulo: "Graduaciones 2024",
    portada: `${BASE}/2024/12/20241218_101500-768x510.jpg`,
    fotos: [
      `${BASE}/2024/12/20241218_100939-768x510.jpg`,
      `${BASE}/2024/12/20241218_101213-768x510.jpg`,
      `${BASE}/2024/12/20241218_101437-768x510.jpg`,
      `${BASE}/2024/12/20241218_101500-768x510.jpg`,
    ],
  },
  {
    titulo: "Inicio de Clases 2026",
    portada: `${BASE}/2026/02/vuelta_clases26_home.jpg`,
    fotos: [
      `${BASE}/2026/02/vuelta_clases26_home.jpg`,
      `${BASE}/2026/03/nota-marzo_colegio19marzo.jpg`,
      `${BASE}/2026/02/17-feb-blog26home.jpg`,
    ],
  },
  {
    titulo: "Comunidad Escolar 2022",
    portada: `${BASE}/2022/12/IMG_3880-768x510.jpg`,
    fotos: [
      `${BASE}/2022/12/IMG_3880-768x510.jpg`,
    ],
  },
  {
    titulo: "Kermesse 2018",
    portada: `${BASE}/2018/11/Kermesse-2018-768x510.png`,
    fotos: [
      `${BASE}/2018/11/Kermesse-2018-768x510.png`,
    ],
  },
];

// Videos reales del canal del colegio
const videos = [
  {
    id: "zXujbnT4RvU",
    titulo: "Video Institucional",
    anno: "2024",
  },
  {
    id: "c6u3Pzcns4I",
    titulo: "Actividades 2022",
    anno: "2022",
  },
  {
    id: "gRMJBd7zSHM",
    titulo: "Video Institucional 2015",
    anno: "2015",
  },
  {
    id: "lArNmyqbkoI",
    titulo: "Video Institucional 2014",
    anno: "2014",
  },
];

function Galeria() {
  const [albumActivo, setAlbumActivo] = useState(null);
  const [fotoActiva, setFotoActiva] = useState(0);

  const abrirAlbum = (album) => {
    setAlbumActivo(album);
    setFotoActiva(0);
  };

  const cerrar = () => setAlbumActivo(null);

  const prev = () => setFotoActiva((c) => (c - 1 + albumActivo.fotos.length) % albumActivo.fotos.length);
  const next = () => setFotoActiva((c) => (c + 1) % albumActivo.fotos.length);

  return (
    <>
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {galeriaAlbumes.map((album) => (
          <button
            key={album.titulo}
            type="button"
            onClick={() => abrirAlbum(album)}
            className="group overflow-hidden rounded-2xl shadow-soft focus:outline-none focus:ring-2 focus:ring-primary"
          >
            <div className="relative overflow-hidden">
              <img
                src={album.portada}
                alt={album.titulo}
                className="h-48 w-full object-cover transition duration-300 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-black/30 opacity-0 transition group-hover:opacity-100" />
              <div className="absolute inset-0 flex items-center justify-center opacity-0 transition group-hover:opacity-100">
                <span className="rounded-full bg-white/90 px-4 py-2 text-sm font-semibold text-primary">
                  Ver galería
                </span>
              </div>
            </div>
            <div className="bg-white px-4 py-3 text-left">
              <p className="font-semibold text-primary">{album.titulo}</p>
              <p className="text-xs text-slate-400">{album.fotos.length} foto{album.fotos.length !== 1 ? "s" : ""}</p>
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

            <div className="relative flex w-full max-w-3xl items-center justify-center gap-4">
              {albumActivo.fotos.length > 1 && (
                <button
                  type="button"
                  onClick={prev}
                  className="shrink-0 rounded-full bg-white/10 p-3 text-white transition hover:bg-white/20"
                  aria-label="Anterior"
                >
                  <ChevronLeft className="h-6 w-6" />
                </button>
              )}

              <motion.img
                key={fotoActiva}
                initial={{ opacity: 0, scale: 0.97 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.2 }}
                src={albumActivo.fotos[fotoActiva]}
                alt={`${albumActivo.titulo} ${fotoActiva + 1}`}
                className="max-h-[70vh] rounded-xl object-contain shadow-2xl"
              />

              {albumActivo.fotos.length > 1 && (
                <button
                  type="button"
                  onClick={next}
                  className="shrink-0 rounded-full bg-white/10 p-3 text-white transition hover:bg-white/20"
                  aria-label="Siguiente"
                >
                  <ChevronRight className="h-6 w-6" />
                </button>
              )}
            </div>

            {albumActivo.fotos.length > 1 && (
              <p className="mt-4 text-sm text-white/60">
                {fotoActiva + 1} / {albumActivo.fotos.length}
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

  return (
    <>
      <button
        type="button"
        onClick={() => setOpen(true)}
        className="group overflow-hidden rounded-2xl shadow-soft focus:outline-none focus:ring-2 focus:ring-primary"
      >
        <div className="relative overflow-hidden">
          <img
            src={`https://img.youtube.com/vi/${video.id}/hqdefault.jpg`}
            alt={video.titulo}
            className="h-44 w-full object-cover transition duration-300 group-hover:scale-105"
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
          <p className="text-xs text-slate-400">{video.anno}</p>
        </div>
      </button>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[80] grid place-content-center bg-black/80 p-4"
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
                  src={`https://www.youtube.com/embed/${video.id}?autoplay=1`}
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
  return (
    <>
      <Helmet>
        <title>Vida Escolar — Colegio José Arrieta, La Reina</title>
        <meta
          name="description"
          content="Descubre la vida escolar del Colegio José Arrieta: actividades artísticas, deportes, talleres, galería de fotos y videos."
        />
      </Helmet>

      <PageHeroCarousel slides={heroSlides} />

      {/* Experiencias */}
      <section className="py-16">
        <div className="container-main">
          <SectionTitle
            title="Experiencias que dejan huella"
            subtitle="La vida escolar del Colegio José Arrieta integra cultura, deporte, convivencia y aprendizaje activo."
          />
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {experiencias.map((item) => {
              const Icon = item.icon;
              return (
                <article key={item.id} className="rounded-2xl border border-slate-200 bg-white p-6 shadow-soft">
                  <div className="mb-4 inline-flex rounded-xl bg-secondary/20 p-3 text-secondary">
                    <Icon className="h-5 w-5" />
                  </div>
                  <h2 className="font-heading text-xl font-semibold text-primary">{item.titulo}</h2>
                  <p className="mt-2 text-slate-600">{item.texto}</p>
                </article>
              );
            })}
          </div>
        </div>
      </section>

      {/* Galería real */}
      <section className="bg-white py-16">
        <div className="container-main">
          <SectionTitle
            eyebrow="Galería"
            title="Momentos de nuestra comunidad"
            subtitle="Álbumes fotográficos de las actividades del Colegio José Arrieta. Haz clic para ver cada galería."
          />
          <Galeria />
        </div>
      </section>

      {/* Videos reales */}
      <section className="bg-slate-50 py-16">
        <div className="container-main">
          <SectionTitle
            eyebrow="Videos"
            title="Conoce nuestro colegio en video"
            subtitle="Videos institucionales del Colegio José Arrieta. Haz clic para reproducir."
          />
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {videos.map((v) => (
              <VideoCard key={v.id} video={v} />
            ))}
          </div>
        </div>
      </section>
    </>
  );
}

export default VidaEscolar;
