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
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {beneficios.map((item, index) => {
            const Icon = LucideIcons[item.icon] || LucideIcons.Circle;
            return (
              <motion.article
                key={item.id}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.2 }}
                transition={{ delay: index * 0.05 }}
                className="group relative overflow-hidden rounded-2xl border border-slate-100 bg-white p-6 shadow-soft transition hover:-translate-y-1 hover:border-primary/20 hover:shadow-md"
              >
                <div className="absolute inset-x-0 top-0 h-1 bg-secondary" />
                <div className="mb-4 inline-flex rounded-xl bg-primary/10 p-3">
                  <Icon className="h-6 w-6 text-primary" />
                </div>
                <h3 className="font-heading text-lg font-semibold text-slate-800">{item.titulo}</h3>
                <p className="mt-2 text-sm leading-relaxed text-slate-500">{item.descripcion}</p>
              </motion.article>
            );
          })}
        </div>
      </div>
    </section>
  );
}

export default BeneficiosSection;
