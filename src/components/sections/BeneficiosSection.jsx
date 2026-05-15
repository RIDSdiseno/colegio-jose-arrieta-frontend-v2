import * as LucideIcons from "lucide-react";
import { motion } from "framer-motion";
import beneficios from "../../data/beneficios";
import SectionTitle from "../ui/SectionTitle";

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
          {beneficios.map((item, index) => {
            const Icon = LucideIcons[item.icon] || LucideIcons.Circle;
            return (
              <motion.article
                key={item.id}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.2 }}
                transition={{ delay: index * 0.05 }}
                className="group overflow-hidden rounded-2xl border border-slate-100 bg-white shadow-soft transition hover:-translate-y-1 hover:shadow-md"
              >
                {/* Imagen */}
                <div className="relative h-44 overflow-hidden">
                  <img
                    src={item.img}
                    alt={item.titulo}
                    loading="lazy"
                    className="h-full w-full object-cover transition duration-500 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />
                  {/* Línea dorada */}
                  <div className="absolute inset-x-0 bottom-0 h-0.5 bg-secondary" />
                </div>

                {/* Contenido */}
                <div className="p-5">
                  <div className="mb-3 inline-flex rounded-xl bg-primary/10 p-2.5">
                    <Icon className="h-5 w-5 text-primary" />
                  </div>
                  <h3 className="font-heading text-base font-bold text-slate-800">{item.titulo}</h3>
                  <p className="mt-1.5 text-sm leading-relaxed text-slate-500">{item.descripcion}</p>
                </div>
              </motion.article>
            );
          })}
        </div>
      </div>
    </section>
  );
}

export default BeneficiosSection;
