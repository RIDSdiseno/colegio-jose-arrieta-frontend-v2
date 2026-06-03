import * as LucideIcons from "lucide-react";
import { motion } from "framer-motion";
import beneficios from "../../data/beneficios";
import SectionTitle from "../ui/SectionTitle";

function BeneficioCard({ item, index }) {
  const Icon = LucideIcons[item.icon] || LucideIcons.Circle;

  return (
    <motion.article
      initial={{ opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ delay: index * 0.05 }}
      className="group overflow-hidden rounded-2xl bg-white shadow-soft"
    >
      {/* Imagen compartida — altura distinta por breakpoint */}
      <div className="relative h-44 overflow-hidden md:h-auto md:[aspect-ratio:4/3]">
        <img
          src={item.img}
          alt={item.titulo}
          loading="lazy"
          className="h-full w-full object-cover transition duration-500 group-hover:scale-105"
          onError={(e) => { e.currentTarget.style.display = "none"; }}
        />

        {/* Degradado base */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/20 to-transparent" />

        {/* Línea dorada visible solo en móvil */}
        <div className="absolute inset-x-0 bottom-0 h-0.5 bg-secondary md:hidden" />

        {/* Overlay hover — solo desktop */}
        <div className="absolute inset-0 hidden bg-black/25 opacity-0 transition-opacity duration-300 group-hover:opacity-100 md:block" />

        {/* Título sobre imagen — solo desktop */}
        <div className="absolute inset-x-0 bottom-0 hidden p-5 transition-transform duration-300 group-hover:-translate-y-14 md:block">
          <div className="mb-2 inline-flex rounded-lg bg-secondary/90 p-2">
            <Icon className="h-4 w-4 text-primary" />
          </div>
          <h3 className="font-heading text-base font-bold leading-snug text-white">{item.titulo}</h3>
        </div>

        {/* Descripción hover — solo desktop */}
        <div className="absolute inset-x-0 bottom-0 hidden translate-y-2 p-5 opacity-0 transition-all duration-300 group-hover:translate-y-0 group-hover:opacity-100 md:block">
          <p className="text-sm leading-relaxed text-white/85">{item.descripcion}</p>
        </div>
      </div>

      {/* Contenido bajo imagen — solo móvil */}
      <div className="p-4 md:hidden">
        <div className="mb-2 inline-flex rounded-xl bg-primary/10 p-2.5">
          <Icon className="h-5 w-5 text-primary" />
        </div>
        <h3 className="font-heading text-base font-bold text-slate-800">{item.titulo}</h3>
        <p className="mt-1.5 text-sm leading-relaxed text-slate-500">{item.descripcion}</p>
      </div>
    </motion.article>
  );
}

function BeneficiosSection() {
  return (
    <section className="bg-bgsoft py-20">
      <div className="container-main">
        <SectionTitle
          eyebrow="Diferenciadores"
          title="¿Qué nos hace distintos?"
          subtitle="Cada beneficio responde a lo que las familias valoran al elegir un colegio para sus hijos."
        />
        <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
          {beneficios.map((item, index) => (
            <BeneficioCard key={item.id} item={item} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
}

export default BeneficiosSection;
