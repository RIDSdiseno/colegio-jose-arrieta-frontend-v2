import { Helmet } from "react-helmet-async";
import {
  TrendingUp, BookOpen, Globe, Heart, Users, Lightbulb,
  Handshake, Brain,
  Music, Dumbbell, Bot, Palette, Languages,
  FileText, Download, ShieldCheck, ScrollText,
} from "lucide-react";
import { motion } from "framer-motion";
import PageHero from "../components/ui/PageHero";
import CTASection from "../components/sections/CTASection";
import talleres from "../data/talleres";

const tallerIcons = {
  1: Languages,
  2: Palette,
  3: Dumbbell,
  4: Bot,
  5: Music,
};

const metas = [
  {
    icon: Users,
    titulo: "75%",
    subtitulo: "Aprobación total",
    texto: "Al menos el 75% de los alumnos con todas sus asignaturas aprobadas.",
  },
  {
    icon: BookOpen,
    titulo: "+2 pts",
    subtitulo: "Mejora SIMCE",
    texto: "Incrementar los resultados SIMCE en al menos 2 puntos respecto al año anterior.",
  },
  {
    icon: TrendingUp,
    titulo: "+20%",
    subtitulo: "Matemáticas",
    texto: "Mejora aplicando el Método Singapur de Pre-Kínder a 4° básico.",
  },
  {
    icon: Globe,
    titulo: "Inglés",
    subtitulo: "Programa Richmond",
    texto: "Inglés ampliado en 3° a 8° básico con horas de instrucción adicionales.",
  },
  {
    icon: Heart,
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
  },
  {
    icon: Heart,
    titulo: "Formación socioemocional",
    texto: "Desarrollo emocional transversal en todos los niveles para una convivencia sana.",
  },
  {
    icon: Handshake,
    titulo: "Familia y escuela",
    texto: "Trabajo conjunto con las familias y comunicación permanente con los apoderados.",
  },
  {
    icon: Lightbulb,
    titulo: "Pensamiento crítico",
    texto: "Desarrollo de hábitos, autonomía y pensamiento crítico desde los primeros niveles.",
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

      <PageHero
        imgs={[
          "/images/istockphoto-2224235754-612x612.jpg",
          "/images/ninos-estudiando-scaled.webp",
        ]}
        badge="Formación Integral"
        title="Proyecto"
        highlight="Educativo"
        subtitle="Impulsamos el desarrollo académico, emocional y social en cada estudiante — desde Pre-Kínder hasta 8° básico."
      />

      {/* ── Ejes estratégicos ────────────────────────────────────────── */}
      <section className="py-20">
        <div className="container-main">
          <div className="grid items-center gap-12 lg:grid-cols-2">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
            >
              <span className="text-xs font-bold uppercase tracking-[0.2em] text-secondary">Nuestro enfoque</span>
              <h2 className="mt-2 font-heading text-4xl font-black text-slate-900 sm:text-5xl">
                Aprender con sentido,<br /><span className="text-primary">convivir con valores.</span>
              </h2>
              <p className="mt-4 text-sm leading-relaxed text-slate-500">
                Nuestro proyecto integra excelencia académica, ciudadanía responsable y trabajo colaborativo en cada nivel.
              </p>
              <div className="mt-6 rounded-2xl border border-primary/20 bg-primary/5 p-5">
                <p className="text-xs font-bold uppercase tracking-[0.15em] text-primary/60">Horario escolar</p>
                <p className="mt-1 font-heading text-2xl font-black text-primary">08:20 – 12:30 · 14:00 – 18:00</p>
                <p className="mt-0.5 text-xs text-slate-500">Lunes a Viernes · Pre-Kínder a 8° Básico</p>
              </div>
            </motion.div>

            <div className="grid gap-3 sm:grid-cols-2">
              {ejes.map((eje, i) => {
                const Icon = eje.icon;
                return (
                  <motion.article
                    key={eje.titulo}
                    initial={{ opacity: 0, y: 16 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: i * 0.08 }}
                    className="rounded-2xl border border-slate-100 bg-white p-5 shadow-soft"
                  >
                    <div className="mb-3 inline-flex rounded-xl bg-primary/10 p-2.5">
                      <Icon className="h-5 w-5 text-primary" />
                    </div>
                    <h3 className="font-heading text-sm font-bold text-slate-800">{eje.titulo}</h3>
                    <p className="mt-1 text-sm leading-relaxed text-slate-500">{eje.texto}</p>
                  </motion.article>
                );
              })}
            </div>
          </div>
        </div>
      </section>

      {/* ── Metas académicas ─────────────────────────────────────────── */}
      <section className="bg-primary py-20">
        <div className="container-main">
          <div className="mb-12">
            <span className="text-xs font-bold uppercase tracking-[0.2em] text-secondary">
              Metas Académicas 2025–2026
            </span>
            <h2 className="mt-2 font-heading text-4xl font-black text-white sm:text-5xl">
              Comprometidos con<br /><span className="text-secondary">resultados reales.</span>
            </h2>
            <p className="mt-4 max-w-md text-sm leading-relaxed text-white/60">
              Metas institucionales concretas, medibles y orientadas al éxito de cada alumno.
            </p>
          </div>

          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-5">
            {metas.map((m, i) => {
              const Icon = m.icon;
              return (
                <motion.article
                  key={m.titulo}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.08 }}
                  className="flex flex-col items-center rounded-2xl border border-white/10 bg-white/10 p-6 text-center backdrop-blur-sm"
                >
                  <div className="mb-3 inline-flex rounded-xl bg-secondary/20 p-3">
                    <Icon className="h-5 w-5 text-secondary" />
                  </div>
                  <p className="text-4xl font-extrabold text-secondary leading-none">{m.titulo}</p>
                  <p className="mt-1.5 text-xs font-bold uppercase tracking-wide text-white">{m.subtitulo}</p>
                  <p className="mt-2 text-xs leading-relaxed text-white/60">{m.texto}</p>
                </motion.article>
              );
            })}
          </div>
        </div>
      </section>

      {/* ── Talleres ─────────────────────────────────────────────────── */}
      <section className="bg-slate-50 py-20">
        <div className="container-main">
          {/* Header editorial */}
          <div className="mb-10 overflow-hidden rounded-3xl">
            <div className="relative h-52 sm:h-64 bg-primary">
              <img
                src="/images/DSC_0369-Grande.jpg"
                alt="Talleres extraprogramáticos Colegio José Arrieta"
                className="h-full w-full object-cover"
                onError={(e) => { e.currentTarget.style.display = "none"; }}
              />
              <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/50 to-transparent" />
              <div className="absolute inset-0 flex flex-col justify-center px-8 sm:px-12">
                <span className="text-xs font-bold uppercase tracking-[0.2em] text-secondary">Vida complementaria</span>
                <h2 className="mt-2 font-heading text-4xl font-black text-white sm:text-5xl">
                  Talleres<br /><span className="text-secondary">destacados.</span>
                </h2>
                <p className="mt-3 max-w-md text-sm text-white/75">
                  Espacios que potencian talentos y habilidades para el futuro de cada alumno.
                </p>
              </div>
            </div>
          </div>

          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {talleres.map((taller, i) => {
              const Icon = tallerIcons[taller.id] || BookOpen;
              return (
                <motion.article
                  key={taller.id}
                  initial={{ opacity: 0, y: 16 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.06 }}
                  className="group relative overflow-hidden rounded-2xl shadow-soft"
                  style={{ minHeight: "220px" }}
                >
                  {/* Imagen de fondo */}
                  <img
                    src={taller.img}
                    alt={taller.nombre}
                    loading="lazy"
                    className="absolute inset-0 h-full w-full object-cover transition duration-700 group-hover:scale-105"
                    onError={(e) => { e.currentTarget.style.display = "none"; }}
                  />
                  {/* Overlay degradado */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/40 to-black/10" />

                  {/* Contenido */}
                  <div className="absolute inset-0 flex flex-col justify-end p-5">
                    <div className="mb-2 inline-flex w-fit rounded-lg bg-secondary/20 p-2 backdrop-blur-sm">
                      <Icon className="h-4 w-4 text-secondary" />
                    </div>
                    <h3 className="font-heading text-base font-bold text-white">{taller.nombre}</h3>
                    <p className="mt-1 text-xs leading-relaxed text-white/70">{taller.descripcion}</p>
                  </div>
                </motion.article>
              );
            })}
          </div>
        </div>
      </section>

      {/* ── Reglamentos y Documentos ─────────────────────────────────── */}
      <section className="py-20">
        <div className="container-main">
          <div className="mb-10">
            <span className="text-xs font-bold uppercase tracking-[0.2em] text-secondary">Transparencia</span>
            <h2 className="mt-2 font-heading text-4xl font-black text-slate-900 sm:text-5xl">
              Reglamentos y<br /><span className="text-primary">protocolos.</span>
            </h2>
            <p className="mt-3 max-w-md text-sm leading-relaxed text-slate-500">
              Accede a todos los reglamentos, protocolos y planes institucionales vigentes.
            </p>
          </div>

          {/* Documentos principales */}
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 mb-10">
            {[
              { icon: ScrollText, label: "Reglamento Interno", href: "https://colegiojosearrieta.cl/wp-content/uploads/2025/01/Reglamento-Interno-v11.pdf" },
              { icon: FileText,   label: "Proyecto Educativo Institucional (PEI)", href: "https://colegiojosearrieta.cl/wp-content/uploads/2024/06/PEI-2024-v5.pdf" },
              { icon: ShieldCheck, label: "Plan de Convivencia Escolar", href: "https://colegiojosearrieta.cl/wp-content/uploads/2025/07/Plan-de-Convivencia-Escolar-2025.pdf" },
              { icon: FileText,   label: "Normativa de Evaluaciones 2025", href: "https://colegiojosearrieta.cl/wp-content/uploads/2025/06/Normativa-de-evaluacion-2025-v6.pdf" },
              { icon: FileText,   label: "Plan de Formación Ciudadana", href: "https://colegiojosearrieta.cl/wp-content/uploads/2025/07/Plan-anual-de-formacion-ciudadana-2025.pdf" },
              { icon: FileText,   label: "Reglamento Pre-Básica (2020)", href: "https://colegiojosearrieta.cl/wp-content/uploads/2020/12/Reglamento-Interno-V0.1.pdf" },
            ].map(({ icon: Icon, label, href }) => (
              <motion.a
                key={label}
                href={href}
                target="_blank"
                rel="noreferrer"
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="group flex items-center gap-4 rounded-2xl border border-slate-200 bg-white p-4 shadow-soft transition hover:border-primary/30 hover:shadow-md"
              >
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-primary/10 transition group-hover:bg-primary/20">
                  <Icon className="h-5 w-5 text-primary" />
                </div>
                <span className="flex-1 text-sm font-medium text-slate-700 leading-snug">{label}</span>
                <Download className="h-4 w-4 shrink-0 text-slate-300 transition group-hover:text-secondary" />
              </motion.a>
            ))}
          </div>

          {/* Protocolos — acordeón simple */}
          <div className="rounded-2xl border border-slate-200 bg-white shadow-soft overflow-hidden">
            <div className="border-b border-slate-100 bg-slate-50 px-6 py-4">
              <div className="flex items-center gap-3">
                <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-secondary/15">
                  <ShieldCheck className="h-4 w-4 text-secondary" />
                </div>
                <h3 className="font-heading text-base font-bold text-primary">Protocolos de actuación</h3>
              </div>
            </div>
            <div className="divide-y divide-slate-100">
              {[
                { label: "Protocolo Investigación — Ley Karín N° 21643", href: "https://colegiojosearrieta.cl/wp-content/uploads/2025/07/Protocolo-de-investigacion-y-sancion-al-acoso-laboral-y-violencia-en-el-trabajo-Ley-Karin.pdf" },
                { label: "Protocolo Ante Suicidio", href: "https://colegiojosearrieta.cl/wp-content/uploads/2025/07/Protocolo-Suicidio-2025-v2.pdf" },
                { label: "Protocolo de Talleres Extraprogramáticos", href: "https://colegiojosearrieta.cl/wp-content/uploads/2025/07/Protocolo-de-Talleres-Extraprogramaticos-v2-2025.pdf" },
                { label: "Protocolo Contención y Regulación Emocional", href: "https://colegiojosearrieta.cl/wp-content/uploads/2025/07/Protocolo-de-Contencion-y-Regulacion-Emocional-2025-v2.pdf" },
                { label: "Protocolo frente a situaciones de Discriminación", href: "https://colegiojosearrieta.cl/wp-content/uploads/2025/07/Protocolo-de-actuacion-frente-a-situaciones-de-discriminacion-2025.pdf" },
                { label: "Protocolo Estudiantes Trans", href: "https://colegiojosearrieta.cl/wp-content/uploads/2025/07/Protocolo-Estudiantes-Trans-2025-v2.pdf" },
                { label: "Protocolo ante agresión de estudiantes a funcionarios", href: "https://colegiojosearrieta.cl/wp-content/uploads/2025/07/Protocolo-de-accion-ante-agresion-de-estudiantes-a-funcionarios-del-colegio-2025.pdf" },
                { label: "Protocolo ante agresión a docentes por parte de un adulto", href: "https://colegiojosearrieta.cl/wp-content/uploads/2025/07/Protocolo-de-accion-ante-agresion-a-docentes-y-asistentes-por-parte-de-docentes-2025.pdf" },
                { label: "Protocolo de acción — maltrato escolar de adulto a estudiante", href: "https://colegiojosearrieta.cl/wp-content/uploads/2025/07/Protocolo-de-accion-en-casos-de-maltrato-escolar-de-adulto-a-estudiante-2025.pdf" },
                { label: "Protocolo — maltrato, acoso o violencia entre miembros", href: "https://colegiojosearrieta.cl/wp-content/uploads/2025/07/Protocolo-de-accion-en-caso-de-maltrato-acoso-escolar-o-violencia-entre-miembros-de-la-comunidad-2025.pdf" },
                { label: "Protocolo Premiación Académica", href: "https://colegiojosearrieta.cl/wp-content/uploads/2025/07/Protocolo-premiacion-academica.pdf" },
              ].map(({ label, href }) => (
                <a
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noreferrer"
                  className="group flex items-center justify-between px-6 py-3.5 transition hover:bg-slate-50"
                >
                  <div className="flex items-center gap-3">
                    <span className="h-1.5 w-1.5 shrink-0 rounded-full bg-secondary" />
                    <span className="text-sm text-slate-600 group-hover:text-primary transition">{label}</span>
                  </div>
                  <Download className="h-3.5 w-3.5 shrink-0 text-slate-300 transition group-hover:text-secondary" />
                </a>
              ))}
            </div>
          </div>
        </div>
      </section>

      <CTASection
        title="¿Quieres ser parte de este"
        highlight="proyecto educativo?"
        subtitle="Postula en línea o agenda una visita para conocer el colegio en persona."
      />
    </>
  );
}

export default ProyectoEducativo;
