import * as LucideIcons from "lucide-react";
import { motion } from "framer-motion";
import beneficios from "../../data/beneficios";
import SectionTitle from "../ui/SectionTitle";

const colorSchemes = [
  { iconBg: "bg-blue-50",    iconColor: "text-blue-600",    border: "border-t-4 border-t-blue-500"    },
  { iconBg: "bg-amber-50",   iconColor: "text-amber-600",   border: "border-t-4 border-t-amber-500"   },
  { iconBg: "bg-emerald-50", iconColor: "text-emerald-600", border: "border-t-4 border-t-emerald-500" },
  { iconBg: "bg-violet-50",  iconColor: "text-violet-600",  border: "border-t-4 border-t-violet-500"  },
  { iconBg: "bg-rose-50",    iconColor: "text-rose-600",    border: "border-t-4 border-t-rose-500"    },
  { iconBg: "bg-cyan-50",    iconColor: "text-cyan-600",    border: "border-t-4 border-t-cyan-500"    },
];

function BeneficiosSection() {
  return (
    <section className="bg-white py-16">
      <div className="container-main">
        <SectionTitle
          eyebrow="Diferenciadores"
          title="¿Qué nos hace distintos?"
          subtitle="Cada beneficio responde a lo que las familias valoran al elegir un colegio para sus hijos."
        />
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {beneficios.map((item, index) => {
            const Icon = LucideIcons[item.icon] || LucideIcons.Circle;
            const scheme = colorSchemes[index % colorSchemes.length];
            return (
              <motion.article
                key={item.id}
                initial={{ opacity: 0, scale: 0.97 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true, amount: 0.3 }}
                transition={{ delay: index * 0.06 }}
                className={`rounded-2xl border border-slate-200 bg-white p-6 shadow-soft transition hover:-translate-y-1 hover:shadow-md ${scheme.border}`}
              >
                <div className={`mb-4 inline-flex rounded-xl p-3 ${scheme.iconBg}`}>
                  <Icon className={`h-6 w-6 ${scheme.iconColor}`} />
                </div>
                <h3 className="font-heading text-xl font-semibold text-primary">{item.titulo}</h3>
                <p className="mt-2 text-sm text-slate-600">{item.descripcion}</p>
              </motion.article>
            );
          })}
        </div>
      </div>
    </section>
  );
}

export default BeneficiosSection;
