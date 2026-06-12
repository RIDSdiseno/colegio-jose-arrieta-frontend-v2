import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";

const STATS = [
  { value: "+50",        label: "años de trayectoria" },
  { value: "+800",       label: "alumnos activos" },
  { value: "2 sedes",    label: "en La Reina" },
  { value: "Pre-K–8°",   label: "básico completo" },
];

function HeroSection() {
  return (
    <section className="relative flex flex-col" style={{ minHeight: "100svh" }}>

      {/* ── Video ───────────────────────────────────────────────────────── */}
      <div className="absolute inset-0 overflow-hidden bg-primary" aria-hidden="true">
        <video
          className="absolute"
          style={{
            top: "50%", left: "50%",
            width: "177.78vh", minWidth: "100%",
            height: "56.25vw", minHeight: "100%",
            transform: "translate(-50%,-50%)",
            objectFit: "cover",
          }}
          src="/hero.mp4"
          autoPlay muted loop playsInline
        >
          {/* Track vacío requerido por WCAG 1.2.2 — video es puramente decorativo */}
          <track kind="captions" srcLang="es" src="" default />
        </video>
      </div>

      {/* ── Overlays ────────────────────────────────────────────────────── */}
      <div className="absolute inset-0 bg-gradient-to-br from-black/75 via-primary/60 to-black/50" />
      <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />

      {/* ── Contenido principal ─────────────────────────────────────────── */}
      <div className="container-main relative z-10 flex flex-1 flex-col items-start justify-center px-4 py-32 lg:py-40">

        {/* Badge */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5 }}
          className="mb-8 inline-flex items-center gap-2.5 rounded-full border border-secondary/50 bg-secondary/15 px-5 py-2 backdrop-blur-sm"
        >
          <span className="relative flex h-2 w-2">
            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-secondary opacity-75" />
            <span className="relative inline-flex h-2 w-2 rounded-full bg-secondary" />
          </span>
          <span className="text-xs font-bold uppercase tracking-[0.15em] text-secondary">
            Admisión 2026 · Inscripciones abiertas
          </span>
        </motion.div>

        {/* Título */}
        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.1 }}
          className="max-w-4xl font-heading text-4xl font-black leading-[1.1] text-white sm:text-5xl lg:text-6xl xl:text-7xl"
        >
          Donde cada alumno{" "}
          <span className="relative inline-block">
            <span className="relative z-10 text-secondary">descubre</span>
            <svg className="absolute -bottom-1 left-0 w-full" viewBox="0 0 200 8" fill="none" aria-hidden="true">
              <path d="M1 5.5C50 1.5 100 7.5 199 3" stroke="#F7B20B" strokeWidth="3" strokeLinecap="round" />
            </svg>
          </span>{" "}
          su mejor versión.
        </motion.h1>

        {/* Subtítulo */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.25 }}
          className="mt-6 max-w-xl text-lg leading-relaxed text-white/75"
        >
          Más de 50 años formando personas con valores, excelencia académica
          e inglés desde Pre-Kínder en La Reina, Santiago.
        </motion.p>

        {/* CTAs */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.4 }}
          className="mt-10 flex flex-wrap gap-4"
        >
          <Link
            to="/admision"
            className="group inline-flex items-center gap-2 rounded-full bg-secondary px-8 py-4 text-sm font-bold text-primary shadow-xl shadow-secondary/30 transition hover:bg-secondaryHover hover:shadow-secondary/50"
          >
            Postula 2026
            <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
          </Link>
          <Link
            to="/contacto"
            className="inline-flex items-center gap-2 rounded-full border-2 border-white/25 bg-white/10 px-8 py-4 text-sm font-bold text-white backdrop-blur-sm transition hover:border-white/50 hover:bg-white/20"
          >
            Agenda una visita
          </Link>
        </motion.div>
      </div>

      {/* ── Stats strip ─────────────────────────────────────────────────── */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.6 }}
        className="relative z-10 bg-white/10 backdrop-blur-md border-t border-white/15"
      >
        <div className="container-main grid grid-cols-2 divide-x divide-white/15 lg:grid-cols-4">
          {STATS.map(({ value, label }) => (
            <div key={label} className="flex flex-col items-center py-5 px-4 text-center">
              <span className="font-heading text-2xl font-black text-secondary">{value}</span>
              <span className="mt-0.5 text-xs text-white/60">{label}</span>
            </div>
          ))}
        </div>
      </motion.div>


    </section>
  );
}

export default HeroSection;
