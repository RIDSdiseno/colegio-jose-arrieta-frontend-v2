import { motion } from "framer-motion";
import { Award, TrendingUp, BookOpen, Users } from "lucide-react";
import SectionTitle from "../ui/SectionTitle";

const logros = [
  {
    icon: Award,
    valor: "+50",
    unidad: "años",
    descripcion: "de trayectoria ininterrumpida formando generaciones en La Reina.",
  },
  {
    icon: TrendingUp,
    valor: "100%",
    unidad: "cobertura",
    descripcion: "de apoyo académico personalizado desde Pre-Kínder hasta 8° Básico.",
  },
  {
    icon: BookOpen,
    valor: "2",
    unidad: "idiomas",
    descripcion: "Inglés desde Pre-Kínder con el Programa Richmond, reconocido internacionalmente.",
  },
  {
    icon: Users,
    valor: "+800",
    unidad: "alumnos",
    descripcion: "forman parte de nuestra comunidad activa en dos sedes en La Reina.",
  },
];

export default function LogrosSection() {
  return (
    <section className="bg-primary py-20">
      <div className="container-main">
        <SectionTitle
          eyebrow="Resultados que hablan"
          title="Una comunidad con logros concretos"
          subtitle="Números que reflejan el compromiso del Colegio José Arrieta con la excelencia educativa."
          light
        />
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {logros.map((item, i) => {
            const Icon = item.icon;
            return (
              <motion.div
                key={item.valor}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.2 }}
                transition={{ delay: i * 0.08 }}
                className="rounded-2xl border border-white/10 bg-white/10 p-6 backdrop-blur-sm"
              >
                <div className="mb-4 inline-flex rounded-xl bg-secondary/20 p-3">
                  <Icon className="h-6 w-6 text-secondary" />
                </div>
                <p className="font-heading text-4xl font-extrabold text-secondary">
                  {item.valor}
                  <span className="ml-1 text-xl font-semibold text-white/80">{item.unidad}</span>
                </p>
                <p className="mt-2 text-sm leading-relaxed text-white/70">{item.descripcion}</p>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
