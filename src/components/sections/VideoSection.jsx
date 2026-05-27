import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Play, X } from "lucide-react";
import SectionTitle from "../ui/SectionTitle";
import { getVideos } from "../../api/videos";
import { getYoutubeId } from "../../lib/youtube";

function VideoSection() {
  const [videos, setVideos] = useState([]);
  const [activeId, setActiveId] = useState(null); // ID de YouTube del video abierto en modal

  useEffect(() => {
    getVideos().then(setVideos).catch(() => {});
  }, []);

  // Cerrar modal con tecla Escape
  useEffect(() => {
    if (!activeId) return;
    const handler = (e) => { if (e.key === "Escape") setActiveId(null); };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [activeId]);

  if (videos.length === 0) return null;

  return (
    <section className="bg-white py-16">
      <div className="container-main">
        <SectionTitle
          eyebrow="Conócenos"
          title="Mira cómo vivimos el aprendizaje día a día"
          subtitle="Explora nuestros videos y descubre la experiencia escolar del Colegio José Arrieta."
        />

        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {videos.map((video) => {
            const ytId = getYoutubeId(video.url);
            if (!ytId) return null;
            return (
              <button
                key={video.id}
                type="button"
                onClick={() => setActiveId(ytId)}
                className="group text-left"
              >
                <div className="relative overflow-hidden rounded-2xl">
                  <img
                    src={`https://img.youtube.com/vi/${ytId}/mqdefault.jpg`}
                    alt={video.titulo}
                    className="h-44 w-full object-cover transition group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-black/30 transition group-hover:bg-black/40" />
                  <span className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 flex h-12 w-12 items-center justify-center rounded-full bg-secondary shadow-lg transition group-hover:scale-110">
                    <Play className="h-5 w-5 fill-primary text-primary" />
                  </span>
                </div>
                <div className="mt-3 px-1">
                  <p className="font-semibold text-primary line-clamp-2 text-sm">{video.titulo}</p>
                  <p className="mt-0.5 text-xs text-slate-400">{video.anio}</p>
                </div>
              </button>
            );
          })}
        </div>
      </div>

      <AnimatePresence>
        {activeId ? (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[80] grid place-content-center bg-black/80 p-4"
            onClick={(e) => { if (e.target === e.currentTarget) setActiveId(null); }}
          >
            <button
              type="button"
              onClick={() => setActiveId(null)}
              className="absolute right-4 top-4 rounded-full bg-white/10 p-2 text-white transition hover:bg-white/20"
              aria-label="Cerrar video"
            >
              <X className="h-5 w-5" />
            </button>
            <div className="w-[92vw] max-w-4xl overflow-hidden rounded-xl bg-black">
              <div className="relative pb-[56.25%]">
                <iframe
                  className="absolute inset-0 h-full w-full"
                  src={`https://www.youtube.com/embed/${activeId}?autoplay=1`}
                  title="Video Colegio José Arrieta"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                />
              </div>
            </div>
          </motion.div>
        ) : null}
      </AnimatePresence>
    </section>
  );
}

export default VideoSection;
