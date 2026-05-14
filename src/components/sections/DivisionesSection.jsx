import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";
import SectionTitle from "../ui/SectionTitle";

const divisiones = [
  {
    nivel: "Pre-Kínder",
    rango: "4 – 5 años",
    descripcion: "Primer encuentro con el aprendizaje: juego, exploración sensorial e inglés desde el inicio.",
    img: "https://images.unsplash.com/photo-1503454537195-1dcabb73ffb9?auto=format&fit=crop&w=800&q=80",
    color: "from-amber-400 to-orange-400",
    badge: "bg-amber-100 text-amber-700",
  },
  {
    nivel: "Kínder",
    rango: "5 – 6 años",
    descripcion: "Consolidamos habilidades sociales, lectoescritura inicial y pensamiento matemático.",
    img: "https://images.unsplash.com/photo-1560785496-3c9d27877182?auto=format&fit=crop&w=800&q=80",
    color: "from-emerald-400 to-teal-500",
    badge: "bg-emerald-100 text-emerald-700",
  },
  {
    nivel: "1° – 4° Básico",
    rango: "6 – 10 años",
    descripcion: "Educación básica con Método Singapur en Matemáticas e inglés intensivo por nivel.",
    img: "https://images.unsplash.com/photo-1509062522246-3755977927d7?auto=format&fit=crop&w=800&q=80",
    color: "from-primary to-blue-600",
    badge: "bg-blue-100 text-blue-700",
  },
  {
    nivel: "5° – 8° Básico",
    rango: "10 – 14 años",
    descripcion: "Etapa de especialización académica, liderazgo estudiantil y preparación para la enseñanza media.",
    img: "https://images.unsplash.com/photo-1580582932707-520aed937b7b?auto=format&fit=crop&w=800&q=80",
    color: "from-violet-500 to-purple-600",
    badge: "bg-violet-100 text-violet-700",
  },
];

function DivisionesSection() {
  return (
    <section className="bg-bgsoft py-20">
      <div className="container-main">
        <SectionTitle
          eyebrow="Niveles educativos"
          title="Un colegio para cada etapa"
          subtitle="Desde los primeros años hasta 8° básico, acompañamos a cada alumno con un programa diseñado para su etapa de desarrollo."
        />

        {/* Cards */}
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {divisiones.map((d, i) => (
            <motion.article
              key={d.nivel}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ delay: i * 0.1 }}
              className="group overflow-hidden rounded-2xl bg-white shadow-soft transition hover:-translate-y-1 hover:shadow-lg"
            >
              {/* Imagen con overlay degradado */}
              <div className="relative h-44 overflow-hidden">
                <img
                  src={d.img}
                  alt={d.nivel}
                  className="h-full w-full object-cover transition duration-500 group-hover:scale-105"
                />
                <div className={`absolute inset-0 bg-gradient-to-t ${d.color} opacity-70`} />
                <div className="absolute inset-0 flex flex-col justify-end p-4">
                  <span className={`inline-self-start rounded-full px-2.5 py-1 text-xs font-bold ${d.badge} w-fit`}>
                    {d.rango}
                  </span>
                  <h3 className="mt-1.5 font-heading text-xl font-extrabold text-white drop-shadow">
                    {d.nivel}
                  </h3>
                </div>
              </div>

              {/* Texto */}
              <div className="p-5">
                <p className="text-sm leading-relaxed text-slate-600">{d.descripcion}</p>
                <Link
                  to="/admision"
                  className="mt-4 inline-flex items-center gap-1 text-xs font-bold text-primary transition hover:text-secondary"
                >
                  Ver admisión <ArrowRight className="h-3.5 w-3.5" />
                </Link>
              </div>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
}

export default DivisionesSection;
