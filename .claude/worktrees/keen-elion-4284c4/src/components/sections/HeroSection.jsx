import { motion } from "framer-motion";
import { ArrowDown, CalendarCheck, GraduationCap, Users, Clock } from "lucide-react";
import Button from "../ui/Button";

const stats = [
  { icon: GraduationCap, label: "+50 años formando", value: "desde 1973" },
  { icon: Users,         label: "+800 estudiantes", value: "comunidad activa" },
  { icon: Clock,         label: "Pre-Kínder a 8°",  value: "básico completo" },
  { icon: CalendarCheck, label: "Admisión 2026",    value: "inscripciones abiertas" },
];

function HeroSection() {
  return (
    <section className="relative flex flex-col overflow-hidden" style={{ minHeight: "92vh" }}>
      {/* Imagen de fondo */}
      <img
        src="https://colegiojosearrieta.cl/wp-content/uploads/2026/03/nota-marzo_colegio19marzo.jpg"
        alt="Comunidad Colegio José Arrieta, La Reina"
        className="absolute inset-0 h-full w-full object-cover"
      />

      {/* Overlay degradado */}
      <div className="absolute inset-0 bg-gradient-to-br from-primary/90 via-primary/75 to-violet-900/80" />

      {/* Círculos decorativos */}
      <div className="absolute -right-24 -top-24 h-96 w-96 rounded-full bg-secondary/10 blur-3xl" />
      <div className="absolute -bottom-16 -left-16 h-72 w-72 rounded-full bg-white/5 blur-2xl" />

      {/* Contenido principal */}
      <div className="container-main relative z-10 flex flex-1 items-center py-24">
        <div className="max-w-3xl text-white">
          {/* Badge animado */}
          <motion.span
            initial={{ opacity: 0, y: -12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
            className="mb-5 inline-flex items-center gap-2 rounded-full bg-secondary px-4 py-1.5 text-xs font-bold uppercase tracking-wider text-primary"
          >
            <span className="h-2 w-2 rounded-full bg-primary animate-ping inline-block" />
            Admisión 2026 — Inscripciones abiertas
          </motion.span>

          {/* Título */}
          <motion.h1
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.55, delay: 0.1 }}
            className="text-4xl font-extrabold leading-tight sm:text-5xl lg:text-6xl"
          >
            Formamos alumnos{" "}
            <span className="text-secondary">felices</span>, seguros y
            preparados para el futuro
          </motion.h1>

          {/* Subtítulo */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.22 }}
            className="mt-5 max-w-2xl text-base text-slate-200 sm:text-lg"
          >
            Más de 50 años formando personas con valores, excelencia académica
            y desarrollo integral en La Reina, Santiago.
          </motion.p>

          {/* Botones */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.34 }}
            className="mt-8 flex flex-col gap-3 sm:flex-row"
          >
            <Button to="/admision" variant="secondary" className="px-8 py-3 text-base">
              Postula Aquí 2026
            </Button>
            <Button
              to="/contacto"
              variant="outline"
              className="border-white/40 bg-white/10 px-8 py-3 text-base text-white hover:bg-white/20"
            >
              Agenda una Visita
            </Button>
          </motion.div>
        </div>
      </div>

      {/* Barra de stats inferior */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.5 }}
        className="relative z-10 border-t border-white/10 bg-black/30 backdrop-blur-sm"
      >
        <div className="container-main grid grid-cols-2 divide-x divide-white/10 lg:grid-cols-4">
          {stats.map(({ icon: Icon, label, value }) => (
            <div key={label} className="flex items-center gap-3 px-4 py-4">
              <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-secondary/20">
                <Icon className="h-4 w-4 text-secondary" />
              </div>
              <div>
                <p className="text-sm font-bold text-white">{label}</p>
                <p className="text-xs text-slate-300">{value}</p>
              </div>
            </div>
          ))}
        </div>
      </motion.div>

      {/* Indicador scroll */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.2 }}
        className="absolute bottom-24 right-8 z-10 hidden lg:flex flex-col items-center gap-1 text-white/40"
      >
        <span className="text-xs tracking-widest uppercase">Scroll</span>
        <ArrowDown className="h-4 w-4 animate-bounce" />
      </motion.div>
    </section>
  );
}

export default HeroSection;
