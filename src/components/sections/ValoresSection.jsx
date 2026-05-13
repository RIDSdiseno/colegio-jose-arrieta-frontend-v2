import { BookOpen, Users, Monitor, Heart, Award } from "lucide-react";
import { motion } from "framer-motion";
import SectionTitle from "../ui/SectionTitle";

const pilares = [
  {
    id: 1,
    titulo: "Educación Integral",
    descripcion: "Formación completa que equilibra lo académico, valórico y socioemocional desde Pre-Kínder hasta 8° Básico.",
    icon: BookOpen,
  },
  {
    id: 2,
    titulo: "Comunidad Cercana",
    descripcion: "Fuerte vinculación entre familia y colegio como eje del proyecto educativo, con comunicación permanente.",
    icon: Users,
  },
  {
    id: 3,
    titulo: "Tecnología en Aula",
    descripcion: "Salas con monitor interactivo y laboratorio móvil que potencian el aprendizaje con herramientas modernas.",
    icon: Monitor,
  },
  {
    id: 4,
    titulo: "Formación Valórica",
    descripcion: "Respeto, diversidad y disciplina como pilares del carácter. Formamos personas autónomas y comprometidas.",
    icon: Heart,
  },
  {
    id: 5,
    titulo: "Trayectoria Comprobada",
    descripcion: "Más de 50 años en La Reina. Reconocidos entre los Mejores Colegios de Chile, Santiago y La Reina 2026.",
    icon: Award,
  },
];

function ValoresSection() {
  return (
    <section className="py-20">
      <div className="container-main">
        <SectionTitle
          eyebrow="¿Por qué elegirnos?"
          title="Una propuesta educativa diferente"
          subtitle="Cinco pilares que hacen del Colegio José Arrieta una opción única para tu familia en La Reina."
        />
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5">
          {pilares.map((pilar, index) => {
            const Icon = pilar.icon;
            return (
              <motion.article
                key={pilar.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.2 }}
                transition={{ delay: index * 0.08 }}
                className="group relative overflow-hidden rounded-2xl border border-slate-100 bg-white p-6 shadow-soft transition hover:-translate-y-1 hover:border-primary/20 hover:shadow-md"
              >
                {/* Acento superior en color primario */}
                <div className="absolute inset-x-0 top-0 h-1 bg-primary" />

                <div className="mb-4 inline-flex rounded-xl bg-primary/10 p-3">
                  <Icon className="h-6 w-6 text-primary" />
                </div>

                <span className="mb-3 inline-flex rounded-full bg-secondary/20 px-3 py-1 text-xs font-semibold text-secondary">
                  Pilar {pilar.id}
                </span>

                <h3 className="mt-2 font-heading text-base font-semibold text-slate-800">
                  {pilar.titulo}
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-slate-500">
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
