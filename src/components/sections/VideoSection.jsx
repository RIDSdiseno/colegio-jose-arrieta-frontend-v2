import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Play, X } from "lucide-react";
import SectionTitle from "../ui/SectionTitle";

function VideoSection() {
  const [open, setOpen] = useState(false);

  return (
    <section className="bg-white py-16">
      <div className="container-main">
        <SectionTitle
          eyebrow="Conócenos"
          title="Mira cómo vivimos el aprendizaje día a día"
          subtitle="Explora nuestro canal y descubre la experiencia escolar del Colegio José Arrieta."
        />
        <div className="relative mx-auto max-w-4xl overflow-hidden rounded-3xl shadow-soft">
          <img
            src="https://img.youtube.com/vi/zXujbnT4RvU/maxresdefault.jpg"
            alt="Video institucional Colegio José Arrieta"
            className="h-[280px] w-full object-cover sm:h-[420px]"
          />
          <div className="absolute inset-0 bg-black/35" />
          <button
            type="button"
            onClick={() => setOpen(true)}
            className="absolute left-1/2 top-1/2 inline-flex -translate-x-1/2 -translate-y-1/2 items-center gap-2 rounded-full bg-secondary px-6 py-3 font-semibold text-primary shadow-lg transition hover:bg-secondaryHover hover:scale-105"
          >
            <Play className="h-4 w-4 fill-current" />
            Ver video
          </button>
        </div>
      </div>

      <AnimatePresence>
        {open ? (
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
              aria-label="Cerrar modal"
            >
              <X className="h-5 w-5" />
            </button>
            <div className="w-[92vw] max-w-4xl overflow-hidden rounded-xl bg-black">
              <div className="relative pb-[56.25%]">
                <iframe
                  className="absolute inset-0 h-full w-full"
                  src="https://www.youtube.com/embed/zXujbnT4RvU?autoplay=1"
                  title="Video institucional Colegio José Arrieta"
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
