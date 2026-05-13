import { useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronLeft, ChevronRight } from "lucide-react";

/**
 * Carrusel hero reutilizable para páginas internas.
 * Props:
 *  slides: [{ img, badge, title, highlight, subtitle }]
 *  height?: string  (minHeight, default "52vh")
 *  autoplayMs?: number (default 5000, 0 = sin autoplay)
 */
export default function PageHeroCarousel({ slides, height = "52vh", autoplayMs = 5000 }) {
  const [current, setCurrent] = useState(0);
  const [paused,  setPaused]  = useState(false);

  const next = useCallback(() => setCurrent((c) => (c + 1) % slides.length), [slides.length]);
  const prev = useCallback(() => setCurrent((c) => (c - 1 + slides.length) % slides.length), [slides.length]);

  useEffect(() => {
    if (!autoplayMs || paused || slides.length < 2) return;
    const t = setInterval(next, autoplayMs);
    return () => clearInterval(t);
  }, [next, paused, autoplayMs, slides.length]);

  const slide = slides[current];

  return (
    <section
      className="relative flex items-center overflow-hidden"
      style={{ minHeight: height }}
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
    >
      {/* Imagen con cross-fade */}
      <AnimatePresence mode="sync">
        <motion.img
          key={slide.img}
          src={slide.img}
          alt={slide.badge || "Hero"}
          initial={{ opacity: 0, scale: 1.03 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.8 }}
          className="absolute inset-0 h-full w-full object-cover object-center"
        />
      </AnimatePresence>

      {/* Overlay */}
      <div className="absolute inset-0 bg-gradient-to-r from-primary/92 via-primary/70 to-primary/20" />

      {/* Contenido */}
      <div className="container-main relative z-10 py-24">
        <AnimatePresence mode="wait">
          <motion.div
            key={current}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -12 }}
            transition={{ duration: 0.45 }}
          >
            {slide.badge && (
              <div className="mb-5 inline-flex items-center gap-2 rounded-full border border-secondary/40 bg-secondary/20 px-4 py-1.5 backdrop-blur-sm">
                <span className="h-2 w-2 rounded-full bg-secondary" />
                <span className="text-xs font-bold uppercase tracking-widest text-secondary">
                  {slide.badge}
                </span>
              </div>
            )}

            <h1 className="max-w-2xl font-heading text-3xl font-extrabold leading-tight text-white sm:text-4xl lg:text-5xl">
              {slide.title}{" "}
              {slide.highlight && (
                <span className="relative whitespace-nowrap">
                  <span className="relative z-10 text-secondary">{slide.highlight}</span>
                  <svg className="absolute -bottom-1 left-0 w-full" viewBox="0 0 200 8" fill="none" aria-hidden="true">
                    <path d="M1 5.5C50 1.5 100 7.5 199 3" stroke="#F5A623" strokeWidth="2.5" strokeLinecap="round" />
                  </svg>
                </span>
              )}
            </h1>

            {slide.subtitle && (
              <p className="mt-5 max-w-xl text-base leading-relaxed text-white/80 lg:text-lg">
                {slide.subtitle}
              </p>
            )}
          </motion.div>
        </AnimatePresence>

        {/* Controles — solo si hay más de 1 slide */}
        {slides.length > 1 && (
          <div className="mt-8 flex items-center gap-3">
            <button onClick={prev} aria-label="Anterior"
              className="flex h-8 w-8 items-center justify-center rounded-full border border-white/30 bg-white/10 text-white transition hover:bg-white/25">
              <ChevronLeft className="h-4 w-4" />
            </button>

            <div className="flex gap-1.5">
              {slides.map((_, i) => (
                <button key={i} onClick={() => setCurrent(i)} aria-label={`Slide ${i + 1}`}
                  className={`h-1.5 rounded-full transition-all duration-300 ${i === current ? "w-5 bg-secondary" : "w-1.5 bg-white/40 hover:bg-white/70"}`}
                />
              ))}
            </div>

            <button onClick={next} aria-label="Siguiente"
              className="flex h-8 w-8 items-center justify-center rounded-full border border-white/30 bg-white/10 text-white transition hover:bg-white/25">
              <ChevronRight className="h-4 w-4" />
            </button>
          </div>
        )}
      </div>
    </section>
  );
}
