import { Users, Zap, Heart, Building2, Wifi, FlaskConical, Dumbbell, BookOpen, GraduationCap, CalendarCheck, MapPin } from "lucide-react";
import logros from "../data/logros";
import { Helmet } from "react-helmet-async";
import { motion } from "framer-motion";
import PageHero from "../components/ui/PageHero";
import CTASection from "../components/sections/CTASection";

const pilares = [
  {
    id: 1,
    icon: Users,
    titulo: "Convivencia",
    texto: "Promovemos el respeto y el compañerismo entre todos los miembros de nuestra comunidad educativa.",
    img: "/images/DSC_0308-Grande.jpg",
  },
  {
    id: 2,
    icon: Zap,
    titulo: "Vanguardia",
    texto: "Innovamos constantemente para potenciar y mejorar el aprendizaje de nuestros estudiantes.",
    img: "/images/vanguardia.jpg",
  },
  {
    id: 3,
    icon: Heart,
    titulo: "Vida Saludable",
    texto: "Fomentamos la actividad física, la alimentación sana y los buenos hábitos en nuestra comunidad.",
    img: "/images/Habitos-de-alimentacion-saludable-Mejora-tu-salud-en-2026.jpeg",
  },
];

const stats = [
  { icon: GraduationCap, value: "+50 años", label: "de trayectoria" },
  { icon: Users,         value: "+800",     label: "alumnos activos" },
  { icon: MapPin,        value: "2 sedes",  label: "en La Reina" },
  { icon: CalendarCheck, value: "Pre-K a 8°", label: "básico completo" },
];

const espacios = [
  { icon: BookOpen,     titulo: "Biblioteca",             texto: "Acceso digital y préstamo en línea para toda la comunidad." },
  { icon: FlaskConical, titulo: "Lab. de Ciencias",       texto: "Sala equipada para experimentos prácticos." },
  { icon: Wifi,         titulo: "Sala de Computación",    texto: "Laboratorio con internet de alta velocidad por alumno." },
  { icon: Dumbbell,     titulo: "Gimnasio y Canchas",     texto: "Espacios deportivos techados y descubiertos." },
  { icon: Building2,    titulo: "Infraestructura Segura", texto: "Recintos certificados con acceso controlado y cámaras." },
];


const hitos = [
  { year: "1973",       texto: "Fundación del Colegio Particular José Arrieta por la Sra. Marta y dos profesoras pioneras." },
  { year: "Abr. 1973", texto: "Reconocimiento oficial del Ministerio de Educación — Decreto N° 11621, el 26 de abril." },
  { year: "1990s", texto: "Transición a Escuela Subvencionada, ampliando el acceso a más familias de La Reina." },
  { year: "1997",  texto: "Ingreso al Sistema de Financiamiento Compartido (Resolución N° 2335 de 1996)." },
  { year: "Hoy",   texto: "Más de 50 años formando alumnos con tecnología de punta, valores y excelencia académica." },
];

function PorQueElegirnos() {
  return (
    <>
      <Helmet>
        <title>¿Por qué elegirnos? — Colegio José Arrieta, La Reina</title>
        <meta
          name="description"
          content="Descubre por qué el Colegio José Arrieta es una de las mejores opciones en La Reina: educación integral, comunidad cercana, infraestructura moderna e inglés desde prekinder en Santiago."
        />
        <meta name="keywords" content="colegio educación integral La Reina, colegio con inglés prekinder Santiago, colegio valores La Reina, colegio subvencionado recomendado Santiago" />
      </Helmet>

      <PageHero
        imgs={[
          "/images/depositphotos_17140201-stock-photo-group-of-pupils.jpg",
          "/images/vanguardia.jpg",
        ]}
        badge="Comunidad Educativa"
        title="¿Por qué"
        highlight="elegirnos?"
        subtitle="Somos un colegio que combina exigencia académica, cercanía familiar y bienestar integral — desde 1973."
      />

      {/* ── Stats bar ────────────────────────────────────────────────── */}
      <section className="border-y border-slate-100 bg-white">
        <div className="container-main">
          <div className="grid grid-cols-2 divide-x divide-slate-100 lg:grid-cols-4">
            {stats.map(({ icon: Icon, value, label }) => (
              <div key={label} className="flex items-center gap-3 px-3 py-5 sm:gap-4 sm:px-6 sm:py-6">
                <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-primary/10">
                  <Icon className="h-5 w-5 text-primary" />
                </div>
                <div>
                  <p className="font-heading text-xl font-black text-secondary">{value}</p>
                  <p className="text-xs text-slate-400">{label}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Pilares ──────────────────────────────────────────────────── */}
      <section className="py-20">
        <div className="container-main">
          <div className="mb-12">
            <span className="text-xs font-bold uppercase tracking-[0.2em] text-secondary">Lo que nos define</span>
            <h2 className="mt-2 font-heading text-4xl font-black text-slate-900 sm:text-5xl">
              3 pilares<br /><span className="text-primary">institucionales.</span>
            </h2>
            <p className="mt-4 max-w-md text-sm leading-relaxed text-slate-500">
              Los pilares que sostienen el proyecto educativo del Colegio José Arrieta desde 1973.
            </p>
          </div>

          <div className="grid gap-4 md:grid-cols-3">
            {pilares.map((pilar, i) => {
              const Icon = pilar.icon;
              return (
                <motion.article
                  key={pilar.id}
                  initial={{ opacity: 0, y: 24 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, amount: 0.2 }}
                  transition={{ delay: i * 0.1 }}
                  className="group relative min-h-[420px] overflow-hidden rounded-3xl"
                >
                  {/* Imagen full-card */}
                  <img
                    src={pilar.img}
                    alt={pilar.titulo}
                    className="absolute inset-0 h-full w-full object-cover transition duration-700 group-hover:scale-105"
                  />
                  {/* Overlay degradado */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/30 to-black/10" />

                  {/* Número decorativo */}
                  <div className="absolute right-5 top-5 font-heading text-7xl font-black leading-none text-white/10 select-none">
                    0{pilar.id}
                  </div>

                  {/* Contenido */}
                  <div className="absolute inset-0 flex flex-col justify-end p-7">
                    <div className="mb-3 inline-flex w-fit rounded-xl bg-secondary p-2.5">
                      <Icon className="h-5 w-5 text-primary" />
                    </div>
                    <h2 className="font-heading text-2xl font-black text-white">{pilar.titulo}</h2>
                    <p className="mt-2 text-sm leading-relaxed text-white/75">{pilar.texto}</p>
                  </div>
                </motion.article>
              );
            })}
          </div>
        </div>
      </section>

      {/* ── Infraestructura ──────────────────────────────────────────── */}
      <section className="bg-slate-950 py-20">
        <div className="container-main">
          <div className="grid items-center gap-10 lg:grid-cols-2">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="overflow-hidden rounded-2xl shadow-soft"
            >
              <img
                src="/images/valores-colegio.png"
                alt="Perseverancia Respeto Colaboración — Colegio José Arrieta"
                className="h-72 w-full object-cover lg:h-96"
              />
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
            >
              <span className="text-xs font-bold uppercase tracking-widest text-secondary">Infraestructura</span>
              <h2 className="mt-2 font-heading text-3xl font-bold text-white sm:text-4xl">
                Espacios pensados<br />para aprender
              </h2>
              <p className="mt-3 text-sm leading-relaxed text-white/60">
                Nuestras instalaciones están diseñadas para ofrecer un ambiente seguro, moderno y estimulante para todos.
              </p>
              <div className="mt-6 grid gap-3 sm:grid-cols-2">
                {espacios.map((e) => {
                  const Icon = e.icon;
                  return (
                    <div key={e.titulo} className="flex items-start gap-3 rounded-xl bg-white/10 border border-white/10 p-3.5">
                      <div className="mt-0.5 shrink-0 inline-flex rounded-lg bg-secondary/15 p-2">
                        <Icon className="h-4 w-4 text-secondary" />
                      </div>
                      <div>
                        <p className="text-sm font-semibold text-white">{e.titulo}</p>
                        <p className="mt-0.5 text-xs leading-relaxed text-white/50">{e.texto}</p>
                      </div>
                    </div>
                  );
                })}
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ── Resultados Académicos ────────────────────────────────────── */}
      <section className="bg-bgsoft py-20">
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
                  className="group rounded-2xl border border-slate-100 bg-white p-6 transition hover:border-primary/20 hover:shadow-soft"
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
            * Datos basados en evaluaciones SIMCE y registros internos del establecimiento. Se actualizan anualmente.
          </p>
        </div>
      </section>

      {/* ── Historia / Timeline ──────────────────────────────────────── */}
      <section className="bg-white py-20">
        <div className="container-main">
          <div className="grid items-start gap-10 lg:grid-cols-2">
            {/* Timeline */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
            >
              <span className="text-xs font-bold uppercase tracking-[0.2em] text-secondary">Desde 1973</span>
              <h2 className="mt-2 font-heading text-4xl font-black text-slate-900 sm:text-5xl">
                Más de 50 años<br /><span className="text-primary">formando personas.</span>
              </h2>
              <p className="mt-4 text-sm leading-relaxed text-slate-600">
                El Colegio José Arrieta imparte enseñanza Pre-Escolar y Educación Básica 1° a 8° año, con más
                de cinco décadas de trayectoria al servicio de las familias de La Reina.
              </p>

              <div className="mt-8 space-y-0">
                {hitos.map((h, i) => (
                  <div key={`${h.year}-${i}`} className="flex gap-4">
                    <div className="flex flex-col items-center">
                      <div className={`flex h-9 min-w-[2.25rem] shrink-0 items-center justify-center rounded-full px-2 text-xs font-black ${h.year === "Hoy" ? "bg-secondary text-primary" : "bg-primary text-white"}`}>
                        {h.year}
                      </div>
                      {i < hitos.length - 1 && <div className="mt-1 w-0.5 flex-1 bg-slate-200" />}
                    </div>
                    <div className="pb-6">
                      <p className="mt-0.5 text-sm leading-relaxed text-slate-600">{h.texto}</p>
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>

            {/* Fotos */}
            <div>
              <motion.div
                initial={{ opacity: 0, scale: 0.97 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                className="overflow-hidden rounded-2xl shadow-soft"
              >
                <img
                  src="/images/DSC_0325-Grande.jpg"
                  alt="Ceremonia Colegio José Arrieta"
                  className="h-64 w-full object-cover sm:h-80 lg:h-[400px]"
                />
              </motion.div>
              <div className="mt-4 grid grid-cols-2 gap-3">
                <motion.img
                  initial={{ opacity: 0, y: 10 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.1 }}
                  src="/images/DSC_1388-Grande.jpg"
                  alt="Actividad escolar"
                  className="h-32 w-full rounded-2xl object-cover shadow-soft"
                />
                <motion.img
                  initial={{ opacity: 0, y: 10 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.2 }}
                  src="/images/DSC_1386-Grande.jpg"
                  alt="Comunidad escolar"
                  className="h-32 w-full rounded-2xl object-cover shadow-soft"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      <CTASection
        title="¿Listo para ser parte"
        highlight="de nuestra comunidad?"
        subtitle="Agenda una visita al colegio, conoce nuestros espacios y resuelve todas tus dudas sin compromiso."
      />
    </>
  );
}

export default PorQueElegirnos;
