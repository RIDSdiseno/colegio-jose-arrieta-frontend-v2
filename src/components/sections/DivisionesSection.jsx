import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";
import SectionTitle from "../ui/SectionTitle";

const divisiones = [
  {
    nivel: "Pre-Kínder & Kínder",
    rango: "4 – 6 años",
    descripcion: "Los primeros años de vida son decisivos. Aquí iniciamos el aprendizaje con juego, música, exploración e inglés desde el primer día.",
    img: "/images/alumnos.jpg",
    accent: "from-amber-400/80 to-orange-500/80",
  },
  {
    nivel: "1° — 4° Básico",
    rango: "6 – 10 años",
    descripcion: "Consolidamos las bases. Método Singapur en matemáticas, inglés intensivo y tecnología en aula para potenciar cada mente.",
    img: "/images/vanguardia.jpg",
    accent: "from-primary/80 to-blue-700/80",
  },
  {
    nivel: "5° — 8° Básico",
    rango: "10 – 14 años",
    descripcion: "Etapa de profundización académica, liderazgo estudiantil y preparación integral para enfrentar con éxito la enseñanza media.",
    img: "/images/vida-escolar.jpg",
    accent: "from-violet-600/80 to-purple-800/80",
  },
];

function DivisionesSection() {
  return (
    <section className="bg-bgsoft py-24">
      <div className="container-main">
        <SectionTitle
          eyebrow="Niveles educativos"
          title="Un colegio para cada etapa"
          subtitle="Acompañamos a cada alumno desde sus primeros pasos hasta que está listo para el mundo."
        />

        <div className="mt-4 grid gap-6 lg:grid-cols-3">
          {divisiones.map((d, i) => (
            <motion.article
              key={d.nivel}
              initial={{ opacity: 0, y: 28 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.15 }}
              transition={{ delay: i * 0.12 }}
              className="group relative overflow-hidden rounded-3xl bg-white shadow-soft transition hover:shadow-lg hover:-translate-y-1"
            >
              {/* Imagen */}
              <div className="relative h-56 overflow-hidden">
                <img
                  src={d.img}
                  alt={d.nivel}
                  loading="lazy"
                  className="h-full w-full object-cover transition duration-700 group-hover:scale-105"
                  onError={(e) => { e.currentTarget.style.display = "none"; }}
                />
                <div className={`absolute inset-0 bg-gradient-to-b ${d.accent}`} />

                {/* Badge de rango */}
                <span className="absolute left-4 top-4 rounded-full bg-white/20 px-3 py-1 text-xs font-bold text-white backdrop-blur-sm">
                  {d.rango}
                </span>
              </div>

              {/* Contenido */}
              <div className="p-6">
                <h3 className="font-heading text-xl font-extrabold text-slate-900">{d.nivel}</h3>
                <p className="mt-3 text-sm leading-relaxed text-slate-500">{d.descripcion}</p>
                <Link
                  to="/admision"
                  className="group/link mt-5 inline-flex items-center gap-1.5 text-xs font-bold text-primary transition hover:text-secondary"
                >
                  Ver admisión
                  <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover/link:translate-x-1" />
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
