import { motion } from "framer-motion";
import { CalendarCheck, GraduationCap, Users, Clock, ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";

const stats = [
  { icon: GraduationCap, label: "+50 años",      sub: "formando personas" },
  { icon: Users,         label: "+800 alumnos",  sub: "comunidad activa" },
  { icon: Clock,         label: "Pre-Kínder a 8°", sub: "básico completo" },
  { icon: CalendarCheck, label: "Admisión 2026", sub: "inscripciones abiertas" },
];

export default function HeroSection() {
  return (
    <section className="relative overflow-hidden" style={{ minHeight: "90vh" }}>

      {/* ── Video de fondo ──────────────────────────────────────────── */}
      <div
        className="absolute inset-0 overflow-hidden"
        aria-hidden="true"
      >
        <video
          className="absolute"
          style={{
            top: "50%",
            left: "50%",
            width: "177.78vh",
            minWidth: "100%",
            height: "56.25vw",
            minHeight: "100%",
            transform: "translate(-50%, -50%)",
            objectFit: "cover",
          }}
          src="/hero.mp4"
          autoPlay
          muted
          loop
          playsInline
        />
      </div>

      {/* ── Overlays ────────────────────────────────────────────────── */}
      <div className="absolute inset-0 bg-gradient-to-b from-primary/70 via-primary/50 to-primary/80" />
      <div className="absolute inset-0 bg-gradient-to-r from-primary/50 via-transparent to-transparent" />

      {/* ── Contenido ───────────────────────────────────────────────── */}
      <div className="container-main relative z-10 flex h-full flex-col items-center justify-center py-28 text-center lg:py-36">

        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
          className="mb-6 inline-flex items-center gap-2 rounded-full border border-secondary/40 bg-secondary/20 px-4 py-1.5 backdrop-blur-sm"
        >
          <span className="h-2 w-2 animate-ping rounded-full bg-secondary" />
          <span className="text-xs font-bold uppercase tracking-widest text-secondary">
            Admisión 2026 — Inscripciones abiertas
          </span>
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="font-heading text-3xl font-extrabold leading-[1.15] text-white sm:text-4xl lg:text-5xl xl:text-6xl"
        >
          Formamos alumnos{" "}
          <span className="relative whitespace-nowrap">
            <span className="relative z-10 text-secondary">felices</span>
            <svg className="absolute -bottom-1 left-0 w-full" viewBox="0 0 200 8" fill="none" aria-hidden="true">
              <path d="M1 5.5C50 1.5 100 7.5 199 3" stroke="#F7B20B" strokeWidth="2.5" strokeLinecap="round" />
            </svg>
          </span>
          ,<br />seguros y preparados para el futuro.
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.25 }}
          className="mt-6 max-w-2xl text-base leading-relaxed text-white/80 lg:text-lg"
        >
          Más de 50 años formando personas con valores, excelencia académica
          y desarrollo integral en La Reina, Santiago.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.38 }}
          className="mt-10 flex flex-wrap justify-center gap-4"
        >
          <Link
            to="/admision"
            className="inline-flex items-center gap-2 rounded-full bg-secondary px-8 py-4 text-sm font-bold text-primary shadow-lg transition hover:bg-secondaryHover hover:shadow-xl"
          >
            Postula Aquí 2026
            <ArrowRight className="h-4 w-4" />
          </Link>
          <Link
            to="/contacto"
            className="inline-flex items-center gap-2 rounded-full border-2 border-white/30 bg-white/10 px-8 py-4 text-sm font-bold text-white backdrop-blur-sm transition hover:border-white/60 hover:bg-white/20"
          >
            Agenda una Visita
          </Link>
        </motion.div>
      </div>

      {/* ── Stats bar ───────────────────────────────────────────────── */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.55 }}
        className="absolute bottom-0 left-0 right-0 z-10"
      >
        <div className="container-main">
          <div className="grid grid-cols-2 overflow-hidden rounded-t-2xl bg-white shadow-2xl lg:grid-cols-4">
            {stats.map(({ icon: Icon, label, sub }, i) => (
              <div
                key={label}
                className={`flex items-center gap-4 px-6 py-5 ${
                  i < stats.length - 1 ? "border-r border-slate-100" : ""
                }`}
              >
                <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-primary/10">
                  <Icon className="h-5 w-5 text-primary" />
                </div>
                <div>
                  <p className="text-sm font-bold text-slate-800">{label}</p>
                  <p className="text-xs text-slate-400">{sub}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </motion.div>
    </section>
  );
}
