import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

/**
 * PageHero — hero premium para páginas internas
 * Props:
 *   imgs       : array de URLs de imagen (carrusel automático)
 *   img        : URL única (compatibilidad hacia atrás, se convierte a array)
 *   eyebrow    : texto pequeño superior (ej: "Admisión 2026")
 *   title      : título principal
 *   highlight  : palabra destacada en dorado (opcional)
 *   subtitle   : subtítulo
 *   badge      : texto del badge pulsante (opcional)
 *   interval   : ms entre cambio de imagen (default 4500)
 */
function PageHero({ imgs, img, eyebrow, title, highlight, subtitle, badge, interval = 4500 }) {
  const images = imgs ?? (img ? [img] : []);
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    if (images.length < 2) return;
    const timer = setInterval(() => {
      setCurrent((prev) => (prev + 1) % images.length);
    }, interval);
    return () => clearInterval(timer);
  }, [images.length, interval]);

  // Guard DESPUÉS de los hooks — evita <img src={undefined}> sin violar Rules of Hooks
  if (images.length === 0) return null;

  return (
    <section className="relative overflow-hidden" style={{ minHeight: "52vh" }}>

      {/* Carrusel de imágenes con crossfade */}
      <AnimatePresence initial={false}>
        <motion.img
          key={current}
          src={images[current]}
          alt=""
          aria-hidden="true"
          loading="eager"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          onError={(e) => { e.currentTarget.style.display = "none"; }}
          exit={{ opacity: 0 }}
          transition={{ duration: 1.2 }}
          className="absolute inset-0 h-full w-full object-cover"
        />
      </AnimatePresence>

      {/* Indicadores (solo si hay más de 1 imagen) */}
      {images.length > 1 && (
        <div className="absolute bottom-5 left-1/2 z-20 flex -translate-x-1/2 gap-2">
          {images.map((_, i) => (
            <button
              key={i}
              onClick={() => setCurrent(i)}
              aria-label={`Imagen ${i + 1}`}
              className={`h-1.5 rounded-full transition-all duration-300 ${
                i === current ? "w-6 bg-secondary" : "w-1.5 bg-white/40"
              }`}
            />
          ))}
        </div>
      )}

      {/* Overlays */}
      <div className="absolute inset-0 bg-gradient-to-br from-black/80 via-primary/60 to-black/50" />
      <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent" />

      {/* Línea decorativa dorada */}
      <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-secondary/60 to-transparent" />

      {/* Contenido */}
      <div className="container-main relative z-10 flex flex-col justify-center py-24 lg:py-32">

        {badge && (
          <motion.div
            initial={{ opacity: 0, x: -16 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.45 }}
            className="mb-6 inline-flex w-fit items-center gap-2 rounded-full border border-secondary/40 bg-secondary/15 px-4 py-1.5 backdrop-blur-sm"
          >
            <span className="relative flex h-2 w-2">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-secondary opacity-75" />
              <span className="relative inline-flex h-2 w-2 rounded-full bg-secondary" />
            </span>
            <span className="text-xs font-bold uppercase tracking-[0.15em] text-secondary">{badge}</span>
          </motion.div>
        )}

        {eyebrow && !badge && (
          <motion.span
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
            className="mb-3 text-xs font-bold uppercase tracking-[0.2em] text-secondary"
          >
            {eyebrow}
          </motion.span>
        )}

        <motion.h1
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="max-w-3xl font-heading text-4xl font-black leading-[1.1] text-white sm:text-5xl lg:text-6xl"
        >
          {title}{" "}
          {highlight && <span className="text-secondary">{highlight}</span>}
        </motion.h1>

        {subtitle && (
          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.25 }}
            className="mt-5 max-w-xl text-base leading-relaxed text-white/70"
          >
            {subtitle}
          </motion.p>
        )}
      </div>
    </section>
  );
}

export default PageHero;
