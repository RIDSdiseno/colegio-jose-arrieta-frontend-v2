import { Star } from "lucide-react";
import { motion } from "framer-motion";
import testimonials from "../../data/testimonials";
import SectionTitle from "../ui/SectionTitle";

function Stars({ count = 5 }) {
  return (
    <div className="flex gap-0.5">
      {Array.from({ length: 5 }).map((_, i) => (
        <Star
          key={i}
          className={`h-4 w-4 ${i < count ? "fill-amber-400 text-amber-400" : "text-slate-200"}`}
        />
      ))}
    </div>
  );
}

function TestimonialsSection() {
  return (
    <section className="bg-slate-50 py-16">
      <div className="container-main">
        <SectionTitle
          eyebrow="Lo que dice nuestra comunidad"
          title="Familias que confían en nosotros"
          subtitle="Reseñas reales de apoderados y alumnos del Colegio José Arrieta."
        />

        <div className="grid gap-5 md:grid-cols-3">
          {testimonials.map((t, index) => (
            <motion.article
              key={t.nombre}
              initial={{ opacity: 0, y: 18 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ delay: index * 0.09 }}
              className="flex flex-col rounded-2xl border border-slate-200 bg-white p-6 shadow-soft"
            >
              <Stars count={t.estrellas} />
              <blockquote className="mt-4 flex-1 text-sm leading-relaxed text-slate-700">
                "{t.texto}"
              </blockquote>
              <div className="mt-5 flex items-center gap-3 border-t border-slate-100 pt-4">
                <div
                  style={{ backgroundColor: t.color }}
                  className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full text-sm font-bold text-white"
                >
                  {t.initials}
                </div>
                <div>
                  <p className="text-sm font-semibold text-primary">{t.nombre}</p>
                  <p className="text-xs text-slate-400">{t.cargo}</p>
                </div>
              </div>
            </motion.article>
          ))}
        </div>

        <div className="mt-8 flex items-center justify-center gap-2">
          <div className="flex gap-0.5">
            {Array.from({ length: 5 }).map((_, i) => (
              <Star
                key={i}
                className={`h-4 w-4 ${i < 4 ? "fill-amber-400 text-amber-400" : "fill-amber-200 text-amber-200"}`}
              />
            ))}
          </div>
          <p className="text-sm text-slate-600">
            <span className="font-bold text-slate-800">4.1 / 5</span> · 70 valoraciones verificadas en MiCole.net
          </p>
        </div>
      </div>
    </section>
  );
}

export default TestimonialsSection;
