import { useEffect, useRef, useState } from "react";
import { motion, useInView } from "framer-motion";
import { GraduationCap, Users, MapPin, BookOpen, Globe, Star } from "lucide-react";

const stats = [
  { icon: GraduationCap, value: 50,   suffix: "+",  label: "Años de trayectoria"    },
  { icon: Users,         value: 800,  suffix: "+",  label: "Alumnos activos"         },
  { icon: MapPin,        value: 2,    suffix: "",   label: "Sedes en La Reina"       },
  { icon: BookOpen,      value: 8,    suffix: "°",  label: "Básico completo"         },
  { icon: Globe,         value: 100,  suffix: "%",  label: "Inglés desde Pre-Kínder" },
  { icon: Star,          value: 1973, suffix: "",   label: "Año de fundación"        },
];

function AnimatedNumber({ target, suffix, inView }) {
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (!inView) return;
    const duration = 1600;
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
  const inView = useInView(ref, { once: true, amount: 0.25 });

  return (
    <section ref={ref} className="relative overflow-hidden bg-primary py-20">
      {/* Círculos decorativos */}
      <div className="pointer-events-none absolute -left-28 -top-28 h-96 w-96 rounded-full bg-white/5" />
      <div className="pointer-events-none absolute -bottom-20 -right-20 h-72 w-72 rounded-full bg-secondary/10" />

      <div className="container-main relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5 }}
          className="mb-12 text-center"
        >
          <span className="text-xs font-bold uppercase tracking-widest text-secondary">
            El colegio en números
          </span>
          <h2 className="mt-2 font-heading text-3xl font-extrabold text-white sm:text-4xl">
            Más de 50 años formando personas
          </h2>
          <p className="mx-auto mt-3 max-w-xl text-sm text-white/60">
            Una comunidad educativa sólida, con historia y resultados que hablan por sí solos.
          </p>
        </motion.div>

        <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-6">
          {stats.map(({ icon: Icon, value, suffix, label }, i) => (
            <motion.div
              key={label}
              initial={{ opacity: 0, y: 24 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.45, delay: i * 0.09 }}
              className="flex flex-col items-center rounded-2xl bg-white/10 px-4 py-7 text-center backdrop-blur-sm transition hover:bg-white/[0.16] hover:-translate-y-1"
            >
              <div className="mb-3 inline-flex rounded-xl bg-secondary/20 p-3 text-secondary">
                <Icon className="h-5 w-5" />
              </div>
              <p className="font-heading text-3xl font-extrabold text-white">
                <AnimatedNumber target={value} suffix={suffix} inView={inView} />
              </p>
              <p className="mt-1.5 text-xs leading-snug text-white/55">{label}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default StatsSection;
