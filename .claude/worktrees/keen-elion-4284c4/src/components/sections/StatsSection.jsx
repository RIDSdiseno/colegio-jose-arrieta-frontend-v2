import { useEffect, useState } from "react";
import { useInView } from "react-intersection-observer";
import { motion } from "framer-motion";

function AnimatedNumber({ value, prefix = "", suffix = "", color }) {
  const [count, setCount] = useState(0);
  const { ref, inView } = useInView({ triggerOnce: true, threshold: 0.5 });

  useEffect(() => {
    if (!inView || Number.isNaN(Number(value))) return undefined;
    const target = Number(value);
    const duration = 1200;
    const start = performance.now();

    const tick = (now) => {
      const progress = Math.min((now - start) / duration, 1);
      setCount(Math.floor(progress * target));
      if (progress < 1) {
        requestAnimationFrame(tick);
      }
    };

    requestAnimationFrame(tick);
    return undefined;
  }, [inView, value]);

  return (
    <span ref={ref} className={`font-heading text-4xl font-extrabold ${color}`}>
      {prefix}
      {Number.isNaN(Number(value)) ? value : count}
      {suffix}
    </span>
  );
}

const stats = [
  {
    id: 1,
    value: 50,
    prefix: "+",
    label: "Años de trayectoria",
    bg: "bg-gradient-to-br from-blue-50 to-white",
    border: "border-t-4 border-t-blue-500",
    color: "text-blue-600",
  },
  {
    id: 2,
    value: 800,
    prefix: "+",
    label: "Estudiantes",
    bg: "bg-gradient-to-br from-amber-50 to-white",
    border: "border-t-4 border-t-amber-500",
    color: "text-amber-600",
  },
  {
    id: 3,
    value: "Pre-K a 8°",
    label: "Niveles educativos",
    bg: "bg-gradient-to-br from-emerald-50 to-white",
    border: "border-t-4 border-t-emerald-500",
    color: "text-emerald-600",
  },
  {
    id: 4,
    value: 1973,
    label: "Fundado en",
    bg: "bg-gradient-to-br from-violet-50 to-white",
    border: "border-t-4 border-t-violet-500",
    color: "text-violet-600",
  },
];

function StatsSection() {
  return (
    <section className="py-14">
      <div className="container-main grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {stats.map((item, index) => (
          <motion.article
            key={item.id}
            initial={{ opacity: 0, y: 18 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.4 }}
            transition={{ delay: index * 0.08 }}
            className={`rounded-2xl border border-slate-200 p-5 text-center shadow-soft ${item.bg} ${item.border}`}
          >
            {typeof item.value === "number" ? (
              <AnimatedNumber value={item.value} prefix={item.prefix} color={item.color} />
            ) : (
              <p className={`font-heading text-3xl font-extrabold ${item.color}`}>{item.value}</p>
            )}
            <p className="mt-2 text-sm font-medium text-slate-600">{item.label}</p>
          </motion.article>
        ))}
      </div>
    </section>
  );
}

export default StatsSection;
