import { Helmet } from "react-helmet-async";
import { TrendingUp, BookOpen, Globe, Heart, Users, Lightbulb, Handshake, Brain } from "lucide-react";
import SectionTitle from "../components/ui/SectionTitle";
import talleres from "../data/talleres";

const metas = [
  {
    icon: TrendingUp,
    color: "from-emerald-500 to-teal-500",
    bg: "bg-emerald-50",
    text: "text-emerald-600",
    titulo: "75%",
    subtitulo: "Aprobación total",
    texto: "Al menos el 75% de los alumnos con todas sus asignaturas aprobadas.",
  },
  {
    icon: BookOpen,
    color: "from-blue-500 to-indigo-500",
    bg: "bg-blue-50",
    text: "text-blue-600",
    titulo: "+2 pts",
    subtitulo: "Mejora SIMCE",
    texto: "Incrementar los resultados SIMCE en al menos 2 puntos respecto al año anterior.",
  },
  {
    icon: TrendingUp,
    color: "from-amber-500 to-orange-500",
    bg: "bg-amber-50",
    text: "text-amber-600",
    titulo: "+20%",
    subtitulo: "Matemáticas",
    texto: "Mejora aplicando el Método Singapur de Pre-Kínder a 4° básico.",
  },
  {
    icon: Globe,
    color: "from-violet-500 to-purple-500",
    bg: "bg-violet-50",
    text: "text-violet-600",
    titulo: "Inglés",
    subtitulo: "Programa Richmond",
    texto: "Inglés ampliado en 3° a 8° básico con horas de instrucción adicionales.",
  },
  {
    icon: Heart,
    color: "from-rose-500 to-pink-500",
    bg: "bg-rose-50",
    text: "text-rose-600",
    titulo: "90%",
    subtitulo: "Vida saludable",
    texto: "Alumnos con hábitos de vida saludable a través de talleres y deporte.",
  },
];

const ejes = [
  {
    icon: Brain,
    titulo: "Aprendizaje activo",
    texto: "Metodologías participativas que colocan al alumno como protagonista de su aprendizaje.",
    color: "bg-blue-50 text-blue-600",
  },
  {
    icon: Heart,
    titulo: "Formación socioemocional",
    texto: "Desarrollo emocional transversal en todos los niveles para una convivencia sana.",
    color: "bg-rose-50 text-rose-600",
  },
  {
    icon: Handshake,
    titulo: "Familia y escuela",
    texto: "Trabajo conjunto con las familias y comunicación permanente con los apoderados.",
    color: "bg-emerald-50 text-emerald-600",
  },
  {
    icon: Lightbulb,
    titulo: "Pensamiento crítico",
    texto: "Desarrollo de hábitos, autonomía y pensamiento crítico desde los primeros niveles.",
    color: "bg-amber-50 text-amber-600",
  },
];

function ProyectoEducativo() {
  return (
    <>
      <Helmet>
        <title>Proyecto Educativo — Colegio José Arrieta, La Reina</title>
        <meta
          name="description"
          content="Conoce el proyecto educativo del Colegio José Arrieta: ejes estratégicos, metas académicas SIMCE, inglés desde prekinder, método Singapur y talleres extraprogramáticos en La Reina."
        />
      </Helmet>

      {/* Hero con foto de fondo */}
      <section className="relative flex items-center overflow-hidden" style={{ minHeight: "52vh" }}>
        <img
          src="https://colegiojosearrieta.cl/wp-content/uploads/2025/09/DSC_0028-Grande-768x510.jpg"
          alt="Proyecto Educativo Colegio José Arrieta"
          className="absolute inset-0 h-full w-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-primary/92 via-primary/75 to-primary/40" />
        <div className="container-main relative z-10 py-20">
          <p className="text-sm uppercase tracking-wide text-secondary">Formación Integral</p>
          <h1 className="mt-2 max-w-2xl text-4xl font-bold text-white sm:text-5xl">Proyecto Educativo</h1>
          <p className="mt-4 max-w-xl text-slate-100">
            Impulsamos el desarrollo académico, emocional y social en cada estudiante.
          </p>
        </div>
      </section>

      {/* Ejes estratégicos — cards con iconos */}
      <section className="py-16">
        <div className="container-main">
          <div className="grid items-center gap-10 lg:grid-cols-2">
            <div>
              <span className="text-xs font-bold uppercase tracking-widest text-secondary">Nuestro enfoque</span>
              <h2 className="mt-2 font-heading text-3xl font-bold text-primary sm:text-4xl">
                Aprender con sentido,<br />convivir con valores
              </h2>
              <p className="mt-4 text-slate-500">
                Nuestro proyecto integra excelencia académica, ciudadanía responsable y trabajo colaborativo en cada nivel.
              </p>
              <div className="mt-6 rounded-2xl border border-primary/20 bg-primary/5 p-5">
                <p className="text-sm font-semibold text-primary">Horario escolar</p>
                <p className="mt-1 text-lg font-bold text-primary">08:20 – 12:30 y 14:00 – 18:00 hrs</p>
                <p className="text-xs text-slate-500">Lunes a Viernes · Pre-Kínder a 8° Básico</p>
              </div>
            </div>
            <div className="grid gap-4 sm:grid-cols-2">
              {ejes.map((eje) => {
                const Icon = eje.icon;
                return (
                  <article key={eje.titulo} className="rounded-2xl border border-slate-200 bg-white p-5 shadow-soft">
                    <div className={`mb-3 inline-flex rounded-xl p-3 ${eje.color}`}>
                      <Icon className="h-5 w-5" />
                    </div>
                    <h3 className="font-semibold text-primary">{eje.titulo}</h3>
                    <p className="mt-1 text-sm text-slate-500">{eje.texto}</p>
                  </article>
                );
              })}
            </div>
          </div>
        </div>
      </section>

      {/* Metas académicas — stats visuales */}
      <section className="bg-primary py-16">
        <div className="container-main">
          <div className="mb-10 text-center">
            <span className="text-xs font-bold uppercase tracking-widest text-secondary">Metas Académicas 2025–2026</span>
            <h2 className="mt-2 font-heading text-3xl font-bold text-white sm:text-4xl">
              Comprometidos con resultados reales
            </h2>
            <p className="mt-3 text-slate-300">
              Metas institucionales concretas, medibles y orientadas al éxito de cada alumno.
            </p>
          </div>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-5">
            {metas.map((m) => {
              const Icon = m.icon;
              return (
                <article
                  key={m.titulo}
                  className="flex flex-col items-center rounded-2xl bg-white/10 p-5 text-center backdrop-blur-sm border border-white/10"
                >
                  <div className="mb-3 inline-flex rounded-xl bg-white/20 p-3 text-white">
                    <Icon className="h-5 w-5" />
                  </div>
                  <p className="text-3xl font-extrabold text-secondary">{m.titulo}</p>
                  <p className="mt-0.5 text-xs font-bold uppercase tracking-wide text-white">{m.subtitulo}</p>
                  <p className="mt-2 text-xs text-slate-300">{m.texto}</p>
                </article>
              );
            })}
          </div>
        </div>
      </section>

      {/* Talleres — imagen + grid */}
      <section className="bg-white py-16">
        <div className="container-main">
          {/* Banner imagen */}
          <div className="mb-10 overflow-hidden rounded-2xl shadow-soft">
            <div className="relative h-52 sm:h-64">
              <img
                src="https://colegiojosearrieta.cl/wp-content/uploads/2019/12/IMG_0118-768x510.jpg"
                alt="Talleres extraprogramáticos Colegio José Arrieta"
                className="h-full w-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-r from-primary/80 to-primary/30" />
              <div className="absolute inset-0 flex flex-col justify-center px-8">
                <span className="text-xs font-bold uppercase tracking-widest text-secondary">Vida complementaria</span>
                <h2 className="mt-1 font-heading text-3xl font-bold text-white sm:text-4xl">Talleres destacados</h2>
                <p className="mt-2 max-w-md text-sm text-slate-200">
                  Espacios que potencian talentos y habilidades para el futuro de cada alumno.
                </p>
              </div>
            </div>
          </div>

          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {talleres.map((taller) => (
              <article
                key={taller.id}
                className="flex items-start gap-3 rounded-2xl border border-slate-200 bg-slate-50 p-5"
              >
                <span className="mt-0.5 flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-secondary text-xs font-bold text-primary">
                  {taller.id}
                </span>
                <div>
                  <h3 className="font-semibold text-primary">{taller.nombre}</h3>
                  <p className="mt-1 text-sm text-slate-500">{taller.descripcion}</p>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}

export default ProyectoEducativo;
