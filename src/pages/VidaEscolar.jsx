import { useState } from "react";
import { Music, Trophy, Palette, BookMarked, HandHeart, ChevronLeft, ChevronRight, Play, X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { Helmet } from "react-helmet-async";
import SectionTitle from "../components/ui/SectionTitle";
import PageHero from "../components/ui/PageHero";

const BASE = "https://colegiojosearrieta.cl/wp-content/uploads";

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
                loading="lazy"
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

      <PageHero
        imgs={[
          "https://images.unsplash.com/photo-1546410531-bb4caa6b424d?auto=format&fit=crop&w=1920&q=80",
          "https://images.unsplash.com/photo-1488521787991-ed7bbaae773c?auto=format&fit=crop&w=1920&q=80",
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

      {/* Videos reales */}
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
    </>
  );
}

export default VidaEscolar;
