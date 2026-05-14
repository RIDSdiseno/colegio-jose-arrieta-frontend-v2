import { useEffect, useRef, useState } from "react";
import { motion, useInView } from "framer-motion";

const stats = [
  { value: 50,   suffix: "+",  label: "Años formando personas",  detail: "Desde 1973 en La Reina" },
  { value: 800,  suffix: "+",  label: "Alumnos activos",         detail: "Comunidad creciente" },
  { value: 2,    suffix: "",   label: "Sedes en La Reina",        detail: "José Arrieta y Espinoza" },
  { value: 100,  suffix: "%",  label: "Inglés desde Pre-Kínder", detail: "Método comunicativo" },
];

function AnimatedNumber({ target, suffix, inView }) {
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (!inView) return;
    const duration = 1800;
    const startTime = performance.now();
    const tick = (now) => {
      const progress = Math.min((now - startTime) / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      setCount(Math.floor(eased * target));
      if (progress < 1) requestAnimationFrame(tick);
    };
    requestAnimationFrame(tick);
  }, [inView, target]);

  return <>{count}{suffix}</>;
}

function StatsSection() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, amount: 0.3 });

  return (
    <section ref={ref} className="border-y border-slate-100 bg-white py-0">
      <div className="container-main grid grid-cols-2 divide-x divide-slate-100 lg:grid-cols-4">
        {stats.map(({ value, suffix, label, detail }, i) => (
          <motion.div
            key={label}
            initial={{ opacity: 0, y: 16 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5, delay: i * 0.1 }}
            className="group flex flex-col items-center py-8 px-3 sm:px-6 sm:py-10 text-center transition hover:bg-slate-50"
          >
            <p className="font-heading text-4xl font-black text-primary lg:text-5xl">
              <AnimatedNumber target={value} suffix={suffix} inView={inView} />
            </p>
            <p className="mt-2 text-sm font-semibold text-slate-800">{label}</p>
            <p className="mt-1 text-xs text-slate-400">{detail}</p>
            <div className="mt-4 h-0.5 w-8 rounded-full bg-secondary opacity-0 transition-all group-hover:opacity-100 group-hover:w-12" />
          </motion.div>
        ))}
      </div>
    </section>
  );
}

export default StatsSection;
