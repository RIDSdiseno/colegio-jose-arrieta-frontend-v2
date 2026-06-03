import { useState, useEffect } from "react";
import { Star, ChevronLeft, ChevronRight, Quote } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { getTestimonios } from "../../api/testimonios";

function Stars({ count = 5 }) {
  return (
    <div className="flex gap-0.5">
      {Array.from({ length: 5 }).map((_, i) => (
        <Star key={i} className={`h-3.5 w-3.5 ${i < count ? "fill-secondary text-secondary" : "text-slate-200"}`} />
      ))}
    </div>
  );
}

function TestimonialsSection() {
  const [active, setActive] = useState(0);
  const [testimonials, setTestimonials] = useState([]);

  useEffect(() => {
    getTestimonios()
      .then((data) => {
        if (data && data.length > 0) {
          setTestimonials(
            data.map((r) => ({
              initials: (r.nombre || "").split(" ").slice(0, 2).map((w) => w[0]?.toUpperCase() || "").join("") || "?",
              color: r.color || "#1e3a5f",
              nombre: r.nombre,
              cargo: r.cargo || "",
              texto: r.texto,
              estrellas: r.estrellas ?? 5,
            }))
          );
          setActive(0);
        }
      })
      .catch(() => {
        setTestimonials([
          { initials: "MP", color: "#1e3a5f", nombre: "María Pérez", cargo: "Apoderada 4° básico", texto: "El colegio ha superado todas nuestras expectativas. El nivel académico y la atención personalizada hacen la diferencia.", estrellas: 5 },
          { initials: "CG", color: "#c8a000", nombre: "Carlos González", cargo: "Apoderado Pre-Kínder", texto: "Desde el primer día sentimos que nuestro hijo estaba en buenas manos. El inglés desde Pre-K es un gran diferenciador.", estrellas: 5 },
          { initials: "AL", color: "#2e6b3e", nombre: "Andrea López", cargo: "Ex alumna", texto: "Me formé aquí y hoy traigo a mis hijos. Los valores y la excelencia académica son parte del ADN del colegio.", estrellas: 5 },
        ]);
        setActive(0);
      });
  }, []);

  const total = testimonials.length;
  const prev = () => setActive((c) => (c - 1 + total) % total);
  const next = () => setActive((c) => (c + 1) % total);

  if (total === 0) return null;

  const safeActive = Math.min(active, total - 1);
  const t = testimonials[safeActive];

  return (
    <section className="overflow-hidden bg-white py-24">
      <div className="container-main">
        <div className="grid items-center gap-16 lg:grid-cols-2">

          {/* Izquierda — texto */}
          <div>
            <span className="text-xs font-bold uppercase tracking-[0.2em] text-secondary">
              Nuestra comunidad
            </span>
            <h2 className="mt-3 font-heading text-4xl font-black leading-tight text-slate-900 sm:text-5xl">
              Lo que dicen las<br />
              <span className="text-primary">familias</span>.
            </h2>
            <p className="mt-4 text-base leading-relaxed text-slate-500">
              Más de 50 años construyendo confianza con las familias de La Reina.
            </p>

            {/* Rating global */}
            <div className="mt-8 inline-flex items-center gap-3 rounded-2xl border border-slate-100 bg-slate-50 px-5 py-3">
              <div className="flex gap-0.5">
                {Array.from({ length: 5 }).map((_, i) => (
                  <Star key={i} className={`h-4 w-4 ${i < 4 ? "fill-secondary text-secondary" : "fill-secondary/30 text-secondary/30"}`} />
                ))}
              </div>
              <span className="text-sm font-semibold text-slate-700">4.1 / 5</span>
              <span className="text-xs text-slate-400">· 70 reseñas en MiCole.net</span>
            </div>

          </div>

          {/* Derecha — card del testimonio activo */}
          <div className="relative">
            {/* Decoración */}
            <div className="absolute -right-8 -top-8 h-40 w-40 rounded-full bg-secondary/10 blur-2xl" />
            <div className="absolute -bottom-8 -left-8 h-32 w-32 rounded-full bg-primary/10 blur-2xl" />

            <AnimatePresence mode="wait">
              <motion.div
                key={active}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.3 }}
                className="relative rounded-3xl border border-slate-100 bg-white p-5 sm:p-8 shadow-soft"
              >
                {/* Comilla decorativa */}
                <div className="mb-5 inline-flex rounded-xl bg-primary/10 p-2.5">
                  <Quote className="h-5 w-5 text-primary" />
                </div>

                <Stars count={t.estrellas} />

                <div className="mt-4 flex items-center gap-3">
                  <div
                    style={{ backgroundColor: t.color }}
                    className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full text-sm font-black text-white shadow-sm"
                  >
                    {t.initials}
                  </div>
                  <div>
                    <p className="font-heading text-sm font-bold text-slate-900">{t.nombre}</p>
                    <p className="text-xs text-slate-400">{t.cargo}</p>
                  </div>
                </div>

                <blockquote className="mt-4 text-lg font-medium leading-relaxed text-slate-700">
                  "{t.texto}"
                </blockquote>
              </motion.div>
            </AnimatePresence>

            {/* Controles + Dots */}
            <div className="mt-5 flex items-center justify-center gap-4">
              <button
                type="button"
                onClick={prev}
                className="flex h-9 w-9 items-center justify-center rounded-full border border-slate-200 text-slate-400 transition hover:border-primary hover:text-primary"
                aria-label="Anterior"
              >
                <ChevronLeft className="h-4 w-4" />
              </button>

              <div className="flex gap-1.5">
                {testimonials.map((_, i) => (
                  <button
                    key={i}
                    type="button"
                    onClick={() => setActive(i)}
                    aria-label={`Testimonio ${i + 1}`}
                    className={`h-1.5 rounded-full transition-all ${i === active ? "w-6 bg-primary" : "w-1.5 bg-slate-200"}`}
                  />
                ))}
              </div>

              <button
                type="button"
                onClick={next}
                className="flex h-9 w-9 items-center justify-center rounded-full border border-slate-200 text-slate-400 transition hover:border-primary hover:text-primary"
                aria-label="Siguiente"
              >
                <ChevronRight className="h-4 w-4" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default TestimonialsSection;
