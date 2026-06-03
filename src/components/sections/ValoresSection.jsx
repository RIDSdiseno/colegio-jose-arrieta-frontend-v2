import { BookOpen, Users, Monitor, Heart, Award } from "lucide-react";
import { motion } from "framer-motion";

const pilares = [
  {
    id: 1,
    titulo: "Educación Integral",
    descripcion: "Equilibrio entre lo académico, valórico y socioemocional desde Pre-Kínder hasta 8° Básico.",
    icon: BookOpen,
  },
  {
    id: 2,
    titulo: "Comunidad Cercana",
    descripcion: "Fuerte vínculo entre familia y colegio como eje del proyecto educativo.",
    icon: Users,
  },
  {
    id: 3,
    titulo: "Tecnología en Aula",
    descripcion: "Monitores interactivos y laboratorio móvil que potencian el aprendizaje moderno.",
    icon: Monitor,
  },
  {
    id: 4,
    titulo: "Formación Valórica",
    descripcion: "Respeto, diversidad y disciplina como pilares del carácter de cada alumno.",
    icon: Heart,
  },
  {
    id: 5,
    titulo: "+50 Años de Trayectoria",
    descripcion: "Reconocidos entre los mejores colegios subvencionados de La Reina desde 1973.",
    icon: Award,
  },
];

function ValoresSection() {
  return (
    <section className="relative overflow-hidden bg-slate-950 py-24">
      {/* Decoración de fondo */}
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute -left-32 top-0 h-96 w-96 rounded-full bg-primary/20 blur-3xl" />
        <div className="absolute -right-32 bottom-0 h-96 w-96 rounded-full bg-secondary/10 blur-3xl" />
      </div>

      <div className="container-main relative z-10">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-16 max-w-2xl"
        >
          <span className="text-xs font-bold uppercase tracking-[0.2em] text-secondary">
            ¿Por qué elegirnos?
          </span>
          <h2 className="mt-3 font-heading text-4xl font-black leading-tight text-white sm:text-5xl">
            Una propuesta educativa
            <br />
            <span className="text-secondary">diferente.</span>
          </h2>
          <p className="mt-4 text-base leading-relaxed text-white/50">
            Cinco pilares que hacen del Colegio José Arrieta una opción única para tu familia en La Reina.
          </p>
        </motion.div>

        {/* Grid de pilares */}
        <div className="grid gap-px bg-white/5 sm:grid-cols-2 lg:grid-cols-5 rounded-2xl overflow-hidden">
          {pilares.map((pilar, index) => {
            const Icon = pilar.icon;
            return (
              <motion.article
                key={pilar.id}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.2 }}
                transition={{ delay: index * 0.08 }}
                className="group flex flex-col bg-slate-900 p-7 transition hover:bg-slate-800"
              >
                <div className="mb-6 inline-flex w-fit rounded-xl border border-white/10 bg-white/5 p-3 transition group-hover:border-secondary/40 group-hover:bg-secondary/10">
                  <Icon className="h-6 w-6 text-secondary" />
                </div>
                <span className="mb-2 text-[10px] font-bold uppercase tracking-widest text-white/25">
                  {String(pilar.id).padStart(2, "0")}
                </span>
                <h3 className="font-heading text-base font-bold text-white">
                  {pilar.titulo}
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-white/45">
                  {pilar.descripcion}
                </p>
              </motion.article>
            );
          })}
        </div>
      </div>
    </section>
  );
}

export default ValoresSection;
