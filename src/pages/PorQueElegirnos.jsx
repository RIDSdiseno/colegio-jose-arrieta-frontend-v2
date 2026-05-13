import { Users, Zap, Heart, Building2, Wifi, FlaskConical, Dumbbell, BookOpen, ArrowRight, GraduationCap, CalendarCheck, MapPin, MessageCircle } from "lucide-react";
import { Helmet } from "react-helmet-async";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import SectionTitle from "../components/ui/SectionTitle";
import PageHeroCarousel from "../components/ui/PageHeroCarousel";

const heroSlides = [
  {
    img: "https://colegiojosearrieta.cl/wp-content/uploads/2025/09/DSC_0370-Grande.jpg",
    badge: "Comunidad Educativa",
    title: "¿Por qué",
    highlight: "elegirnos?",
    subtitle: "Somos un colegio que combina exigencia académica, cercanía familiar y bienestar integral — desde 1973.",
  },
  {
    img: "https://images.unsplash.com/photo-1509062522246-3755977927d7?auto=format&fit=crop&w=1920&q=80",
    badge: "+50 años de trayectoria",
    title: "Una comunidad con",
    highlight: "historia y valores",
    subtitle: "Inglés desde Pre-Kínder, método Singapur, talleres y más de 50 años formando personas en La Reina.",
  },
];

const pilares = [
  {
    id: 1,
    icon: Users,
    titulo: "Convivencia",
    texto: "Promovemos el respeto y el compañerismo entre todos los miembros de nuestra comunidad educativa.",
    img: "https://colegiojosearrieta.cl/wp-content/uploads/2025/09/DSC_0308-Grande.jpg",
  },
  {
    id: 2,
    icon: Zap,
    titulo: "Vanguardia",
    texto: "Innovamos constantemente para potenciar y mejorar el aprendizaje de nuestros estudiantes.",
    img: "https://images.unsplash.com/photo-1509062522246-3755977927d7?auto=format&fit=crop&w=1200&q=80",
  },
  {
    id: 3,
    icon: Heart,
    titulo: "Vida Saludable",
    texto: "Fomentamos la actividad física, la alimentación sana y los buenos hábitos en nuestra comunidad.",
    img: "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?auto=format&fit=crop&w=1200&q=80",
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
  { year: "1973",  texto: "Fundación del Colegio Particular José Arrieta por la Sra. Marta y dos profesoras pioneras." },
  { year: "1973",  texto: "Reconocimiento oficial del Ministerio de Educación — Decreto N° 11621, el 26 de abril." },
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

      <PageHeroCarousel slides={heroSlides} />

      {/* ── Stats bar ────────────────────────────────────────────────── */}
      <section className="bg-white shadow-md">
        <div className="container-main">
          <div className="grid grid-cols-2 divide-x divide-slate-100 lg:grid-cols-4">
            {stats.map(({ icon: Icon, value, label }) => (
              <div key={label} className="flex items-center gap-4 px-6 py-5">
                <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-primary/10">
                  <Icon className="h-5 w-5 text-primary" />
                </div>
                <div>
                  <p className="text-sm font-bold text-slate-800">{value}</p>
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
          <SectionTitle
            title="Nuestros 3 pilares institucionales"
            subtitle="Los pilares que sostienen el proyecto educativo del Colegio José Arrieta."
          />
          <div className="grid gap-6 md:grid-cols-3">
            {pilares.map((pilar) => {
              const Icon = pilar.icon;
              return (
                <motion.article
                  key={pilar.id}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, amount: 0.2 }}
                  className="group overflow-hidden rounded-2xl border border-slate-100 bg-white shadow-soft"
                >
                  {/* Imagen con overlay */}
                  <div className="relative h-56 overflow-hidden">
                    <img
                      src={pilar.img}
                      alt={pilar.titulo}
                      className="h-full w-full object-cover transition duration-500 group-hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-primary/80 via-primary/30 to-transparent" />
                    <div className="absolute bottom-4 left-4 flex items-center gap-2.5">
                      <div className="inline-flex rounded-lg bg-secondary p-2 text-primary">
                        <Icon className="h-4 w-4" />
                      </div>
                      <h2 className="font-heading text-xl font-bold text-white">{pilar.titulo}</h2>
                    </div>
                  </div>
                  {/* Texto */}
                  <div className="p-5">
                    <p className="text-sm leading-relaxed text-slate-600">{pilar.texto}</p>
                  </div>
                </motion.article>
              );
            })}
          </div>
        </div>
      </section>

      {/* ── Infraestructura ──────────────────────────────────────────── */}
      <section className="bg-bgsoft py-20">
        <div className="container-main">
          <div className="grid items-center gap-10 lg:grid-cols-2">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="overflow-hidden rounded-2xl shadow-soft"
            >
              <img
                src="https://img.youtube.com/vi/zXujbnT4RvU/maxresdefault.jpg"
                alt="Infraestructura Colegio José Arrieta"
                className="h-72 w-full object-cover lg:h-96"
              />
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
            >
              <span className="text-xs font-bold uppercase tracking-widest text-secondary">Infraestructura</span>
              <h2 className="mt-2 font-heading text-3xl font-bold text-primary sm:text-4xl">
                Espacios pensados<br />para aprender
              </h2>
              <p className="mt-3 text-sm leading-relaxed text-slate-500">
                Nuestras instalaciones están diseñadas para ofrecer un ambiente seguro, moderno y estimulante para todos.
              </p>
              <div className="mt-6 grid gap-3 sm:grid-cols-2">
                {espacios.map((e) => {
                  const Icon = e.icon;
                  return (
                    <div key={e.titulo} className="flex items-start gap-3 rounded-xl bg-white p-3.5 shadow-sm">
                      <div className="mt-0.5 shrink-0 inline-flex rounded-lg bg-primary/10 p-2">
                        <Icon className="h-4 w-4 text-primary" />
                      </div>
                      <div>
                        <p className="text-sm font-semibold text-slate-800">{e.titulo}</p>
                        <p className="mt-0.5 text-xs leading-relaxed text-slate-500">{e.texto}</p>
                      </div>
                    </div>
                  );
                })}
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ── Historia / Timeline ──────────────────────────────────────── */}
      <section className="py-20">
        <div className="container-main">
          <div className="grid items-start gap-10 lg:grid-cols-2">
            {/* Timeline */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
            >
              <span className="text-xs font-bold uppercase tracking-widest text-secondary">Desde 1973</span>
              <h2 className="mt-2 font-heading text-3xl font-bold text-primary sm:text-4xl">
                Más de 50 años<br />formando personas
              </h2>
              <p className="mt-4 text-sm leading-relaxed text-slate-600">
                El Colegio José Arrieta imparte enseñanza Pre-Escolar y Educación Básica 1° a 8° año, con más
                de cinco décadas de trayectoria al servicio de las familias de La Reina.
              </p>

              <div className="mt-8 space-y-0">
                {hitos.map((h, i) => (
                  <div key={i} className="flex gap-4">
                    <div className="flex flex-col items-center">
                      <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-primary text-xs font-bold text-white">
                        {h.year === "Hoy" ? "🎓" : h.year.slice(-2)}
                      </div>
                      {i < hitos.length - 1 && <div className="mt-1 w-0.5 flex-1 bg-slate-200" />}
                    </div>
                    <div className="pb-6">
                      <p className="text-xs font-bold uppercase tracking-wide text-secondary">{h.year}</p>
                      <p className="mt-0.5 text-sm leading-relaxed text-slate-600">{h.texto}</p>
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>

            {/* Fotos */}
            <div className="lg:sticky lg:top-24">
              <motion.div
                initial={{ opacity: 0, scale: 0.97 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                className="overflow-hidden rounded-2xl shadow-soft"
              >
                <img
                  src="https://colegiojosearrieta.cl/wp-content/uploads/2025/09/DSC_0325-Grande.jpg"
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
                  src="https://colegiojosearrieta.cl/wp-content/uploads/2025/09/DSC_1388-Grande.jpg"
                  alt="Actividad escolar"
                  className="h-32 w-full rounded-2xl object-cover shadow-soft"
                />
                <motion.img
                  initial={{ opacity: 0, y: 10 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.2 }}
                  src="https://colegiojosearrieta.cl/wp-content/uploads/2025/09/DSC_1386-Grande.jpg"
                  alt="Comunidad escolar"
                  className="h-32 w-full rounded-2xl object-cover shadow-soft"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── CTA final ────────────────────────────────────────────────── */}
      <section className="relative overflow-hidden bg-primary py-20">
        {/* Círculos decorativos */}
        <div className="absolute -left-20 -top-20 h-72 w-72 rounded-full bg-white/5" />
        <div className="absolute -bottom-16 -right-16 h-56 w-56 rounded-full bg-secondary/10" />

        <div className="container-main relative z-10 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <span className="inline-flex items-center gap-2 rounded-full bg-secondary/20 px-4 py-1.5 text-xs font-bold uppercase tracking-widest text-secondary">
              <span className="h-2 w-2 animate-ping rounded-full bg-secondary" />
              Admisión 2026 abierta
            </span>
            <h2 className="mt-4 font-heading text-3xl font-extrabold text-white sm:text-4xl">
              ¿Listo para ser parte<br />de nuestra comunidad?
            </h2>
            <p className="mx-auto mt-4 max-w-lg text-base text-white/70">
              Agenda una visita al colegio, conoce nuestros espacios y resuelve todas tus dudas sin compromiso.
            </p>
            <div className="mt-8 flex flex-wrap justify-center gap-4">
              <Link
                to="/admision"
                className="inline-flex items-center gap-2 rounded-full bg-secondary px-8 py-4 text-sm font-bold text-primary shadow-lg transition hover:bg-secondaryHover"
              >
                Postula 2026
                <ArrowRight className="h-4 w-4" />
              </Link>
              <a
                href="https://wa.me/56988936631?text=Hola%2C%20me%20interesa%20información%20sobre%20la%20admisión%202026"
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-2 rounded-full border-2 border-white/30 bg-white/10 px-8 py-4 text-sm font-bold text-white transition hover:border-white/60 hover:bg-white/20"
              >
                <MessageCircle className="h-4 w-4" />
                Escribir por WhatsApp
              </a>
            </div>
          </motion.div>
        </div>
      </section>
    </>
  );
}

export default PorQueElegirnos;
