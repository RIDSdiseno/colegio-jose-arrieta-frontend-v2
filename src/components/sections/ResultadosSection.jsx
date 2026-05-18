import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import logros from "../../data/logros";

function ResultadosSection() {
  return (
    <section className="bg-white py-20">
      <div className="container-main">
        <div className="mb-12">
          <span className="text-xs font-bold uppercase tracking-[0.2em] text-secondary">Resultados académicos</span>
          <h2 className="mt-2 font-heading text-4xl font-black text-slate-900 sm:text-5xl">
            Excelencia que<br /><span className="text-primary">se mide.</span>
          </h2>
          <p className="mt-4 max-w-md text-sm leading-relaxed text-slate-500">
            Nuestros resultados reflejan el compromiso diario de alumnos, familias y docentes.
          </p>
        </div>

        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {logros.map((logro, i) => {
            const Icon = logro.icon;
            return (
              <motion.div
                key={logro.label}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.2 }}
                transition={{ delay: i * 0.1 }}
                className="group rounded-2xl border border-slate-100 bg-bgsoft p-6 transition hover:border-primary/20 hover:shadow-soft"
              >
                <div className="mb-4 inline-flex rounded-xl bg-primary/10 p-2.5">
                  <Icon className="h-5 w-5 text-primary" />
                </div>
                <p className="font-heading text-4xl font-black text-secondary">{logro.valor}</p>
                <p className="mt-1 font-heading text-sm font-bold text-slate-800">{logro.label}</p>
                <p className="mt-2 text-xs leading-relaxed text-slate-500">{logro.desc}</p>
              </motion.div>
            );
          })}
        </div>

        <p className="mt-6 text-center text-xs text-slate-400">
          * Datos basados en evaluaciones SIMCE y registros internos. Se actualizan anualmente.
        </p>

        <div className="mt-8 flex justify-center">
          <Link
            to="/por-que-elegirnos"
            className="inline-flex items-center gap-2 rounded-xl border border-primary/20 px-6 py-2.5 text-sm font-semibold text-primary transition hover:bg-primary hover:text-white"
          >
            Ver más sobre nuestros resultados →
          </Link>
        </div>
      </div>
    </section>
  );
}

export default ResultadosSection;
