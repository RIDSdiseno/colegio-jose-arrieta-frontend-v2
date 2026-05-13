import { BookOpen, Users, Monitor, Heart, Award } from "lucide-react";
import { motion } from "framer-motion";
import SectionTitle from "../ui/SectionTitle";

const pilares = [
  {
    id: 1,
    titulo: "Educación Integral",
    descripcion: "Formación completa que equilibra lo académico, valórico y socioemocional desde Pre-Kínder hasta 8° Básico.",
    icon: BookOpen,
    iconBg: "bg-blue-50",
    iconColor: "text-blue-600",
    border: "border-t-4 border-t-blue-500",
    badge: "bg-blue-100 text-blue-700",
  },
  {
    id: 2,
    titulo: "Comunidad Cercana",
    descripcion: "Fuerte vinculación entre familia y colegio como eje del proyecto educativo, con comunicación permanente.",
    icon: Users,
    iconBg: "bg-amber-50",
    iconColor: "text-amber-600",
    border: "border-t-4 border-t-amber-500",
    badge: "bg-amber-100 text-amber-700",
  },
  {
    id: 3,
    titulo: "Tecnología en Aula",
    descripcion: "Salas con monitor interactivo y laboratorio móvil que potencian el aprendizaje con herramientas modernas.",
    icon: Monitor,
    iconBg: "bg-emerald-50",
    iconColor: "text-emerald-600",
    border: "border-t-4 border-t-emerald-500",
    badge: "bg-emerald-100 text-emerald-700",
  },
  {
    id: 4,
    titulo: "Formación Valórica",
    descripcion: "Respeto, diversidad y disciplina como pilares del carácter. Formamos personas autónomas y comprometidas.",
    icon: Heart,
    iconBg: "bg-rose-50",
    iconColor: "text-rose-600",
    border: "border-t-4 border-t-rose-500",
    badge: "bg-rose-100 text-rose-700",
  },
  {
    id: 5,
    titulo: "Trayectoria Comprobada",
    descripcion: "Más de 50 años en La Reina. Reconocidos entre los Mejores Colegios de Chile, Santiago y La Reina 2026.",
    icon: Award,
    iconBg: "bg-violet-50",
    iconColor: "text-violet-600",
    border: "border-t-4 border-t-violet-500",
    badge: "bg-violet-100 text-violet-700",
  },
];

function ValoresSection() {
  return (
    <section className="py-16">
      <div className="container-main">
        <SectionTitle
          eyebrow="¿Por qué elegirnos?"
          title="Una propuesta educativa diferente"
          subtitle="Cinco pilares que hacen del Colegio José Arrieta una opción única para tu familia en La Reina."
        />
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5">
          {pilares.map((pilar, index) => {
            const Icon = pilar.icon;
            return (
              <motion.article
                key={pilar.id}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.3 }}
                transition={{ delay: index * 0.07 }}
                className={`group rounded-2xl border border-slate-200 bg-white p-6 transition hover:-translate-y-1 hover:shadow-soft ${pilar.border}`}
              >
                <div className={`mb-4 inline-flex rounded-xl p-3 ${pilar.iconBg}`}>
                  <Icon className={`h-6 w-6 ${pilar.iconColor}`} />
                </div>
                <span className={`mb-3 inline-flex rounded-full px-3 py-1 text-xs font-semibold ${pilar.badge}`}>
                  Pilar {pilar.id}
                </span>
                <h3 className="mt-2 font-heading text-base font-semibold text-primary">{pilar.titulo}</h3>
                <p className="mt-2 text-sm text-slate-600">{pilar.descripcion}</p>
              </motion.article>
            );
          })}
        </div>
      </div>
    </section>
  );
}

export default ValoresSection;
