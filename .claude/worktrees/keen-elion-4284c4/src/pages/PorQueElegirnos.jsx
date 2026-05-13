import { Users, Zap, Heart, Building2, Wifi, FlaskConical, Dumbbell, BookOpen, CalendarDays } from "lucide-react";
import { Helmet } from "react-helmet-async";
import SectionTitle from "../components/ui/SectionTitle";

// ─── Imágenes únicas, sin repetir ninguna del Home ni entre secciones ────────
// Hero bg        → DSC_0030-Grande   (Fiestas Patrias 2025 — no usada en Home)
// Pilar 1        → DSC_0023-Grande   (actividad escolar — nueva)
// Pilar 2        → DSC_0024-Grande   (actividad escolar — nueva)
// Pilar 3        → 20241218_101213   (graduación 2024 — nueva)
// Infraestructura→ Entrada-768x510   (fachada exterior — nueva)
// Historia grande→ 20241218_101437   (graduación 2024 — nueva)
// Historia sm 1  → DSC_0022-Grande   (actividad escolar — nueva)
// Historia sm 2  → IMG_3880          (actividad 2022 — nueva)

const pilares = [
  {
    id: 1,
    icon: Users,
    titulo: "Convivencia",
    texto: "Promovemos el respeto y el compañerismo entre todos los miembros de nuestra comunidad educativa.",
    img: "https://colegiojosearrieta.cl/wp-content/uploads/2025/09/DSC_0023-Grande-768x510.jpg",
  },
  {
    id: 2,
    icon: Zap,
    titulo: "Vanguardia",
    texto: "Innovamos constantemente para potenciar y mejorar el aprendizaje de nuestros estudiantes.",
    img: "https://colegiojosearrieta.cl/wp-content/uploads/2025/09/DSC_0024-Grande-768x510.jpg",
  },
  {
    id: 3,
    icon: Heart,
    titulo: "Vida Saludable",
    texto: "Fomentamos la actividad física, la alimentación sana y los buenos hábitos en nuestra comunidad.",
    img: "https://colegiojosearrieta.cl/wp-content/uploads/2024/12/20241218_101213-768x510.jpg",
  },
];

const espacios = [
  {
    icon: BookOpen,
    titulo: "Biblioteca",
    texto: "Biblioteca con acceso digital y préstamo en línea para toda la comunidad escolar.",
  },
  {
    icon: FlaskConical,
    titulo: "Laboratorio de Ciencias",
    texto: "Sala equipada para experimentos que acercan la ciencia a los estudiantes de forma práctica.",
  },
  {
    icon: Wifi,
    titulo: "Sala de Computación",
    texto: "Laboratorio de informática con conexión a internet de alta velocidad para cada alumno.",
  },
  {
    icon: Dumbbell,
    titulo: "Gimnasio y Canchas",
    texto: "Espacios deportivos techados y descubiertos para educación física y talleres extraprogramáticos.",
  },
  {
    icon: Building2,
    titulo: "Infraestructura Segura",
    texto: "Recintos mantenidos y certificados, con acceso controlado y cámaras de seguridad perimetral.",
  },
];

const hitos = [
  { year: "1973", texto: "Fundación del Colegio Particular José Arrieta por la Sra. Marta y dos profesoras pioneras." },
  { year: "1973", texto: "Reconocimiento oficial del Ministerio de Educación — Decreto N° 11621, el 26 de abril." },
  { year: "1990s", texto: "Transición a Escuela Subvencionada, ampliando el acceso a más familias de La Reina." },
  { year: "1997", texto: "Ingreso al Sistema de Financiamiento Compartido (Resolución N° 2335 de 1996)." },
  { year: "Hoy", texto: "Más de 50 años formando alumnos con tecnología de punta, valores y excelencia académica." },
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

      {/* Hero — DSC_0030 (Fiestas Patrias 2025) */}
      <section className="relative flex items-center overflow-hidden" style={{ minHeight: "52vh" }}>
        <img
          src="https://colegiojosearrieta.cl/wp-content/uploads/2025/09/DSC_0030-Grande-768x510.jpg"
          alt="Comunidad Colegio José Arrieta"
          className="absolute inset-0 h-full w-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-primary/90 via-primary/75 to-primary/40" />
        <div className="container-main relative z-10 py-20">
          <p className="text-sm uppercase tracking-wide text-secondary">Comunidad Educativa</p>
          <h1 className="mt-2 max-w-2xl text-4xl font-bold text-white sm:text-5xl">¿Por qué elegirnos?</h1>
          <p className="mt-4 max-w-xl text-slate-100">
            Somos un colegio que combina exigencia académica, cercanía familiar y bienestar integral.
          </p>
        </div>
      </section>

      {/* Pilares — cards con imagen */}
      <section className="py-16">
        <div className="container-main">
          <SectionTitle
            title="Nuestros 3 pilares institucionales"
            subtitle="Conoce los pilares oficiales que sostienen el proyecto del Colegio José Arrieta."
          />
          <div className="grid gap-6 md:grid-cols-3">
            {pilares.map((pilar) => {
              const Icon = pilar.icon;
              return (
                <article key={pilar.id} className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-soft">
                  <div className="relative h-44 overflow-hidden">
                    <img
                      src={pilar.img}
                      alt={pilar.titulo}
                      className="h-full w-full object-cover transition duration-500 hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-primary/70 to-transparent" />
                    <div className="absolute bottom-3 left-4 flex items-center gap-2">
                      <div className="inline-flex rounded-lg bg-secondary p-1.5 text-primary">
                        <Icon className="h-4 w-4" />
                      </div>
                      <h2 className="font-heading text-xl font-bold text-white">{pilar.titulo}</h2>
                    </div>
                  </div>
                  <div className="p-5">
                    <p className="text-slate-600">{pilar.texto}</p>
                  </div>
                </article>
              );
            })}
          </div>
        </div>
      </section>

      {/* Infraestructura — fachada exterior */}
      <section className="bg-white py-16">
        <div className="container-main">
          <div className="grid items-center gap-10 lg:grid-cols-2">
            <div className="overflow-hidden rounded-2xl shadow-soft">
              <img
                src="https://colegiojosearrieta.cl/wp-content/uploads/2020/03/Entrada-768x510.png"
                alt="Entrada Colegio José Arrieta"
                className="h-72 w-full object-cover lg:h-96"
              />
            </div>
            <div>
              <span className="text-xs font-bold uppercase tracking-widest text-secondary">Infraestructura</span>
              <h2 className="mt-2 font-heading text-3xl font-bold text-primary sm:text-4xl">
                Espacios pensados para aprender
              </h2>
              <p className="mt-3 text-slate-500">
                Nuestras instalaciones están diseñadas para ofrecer un ambiente seguro, moderno y estimulante.
              </p>
              <div className="mt-6 grid gap-3 sm:grid-cols-2">
                {espacios.map((e) => {
                  const Icon = e.icon;
                  return (
                    <div key={e.titulo} className="flex items-start gap-3 rounded-xl bg-slate-50 p-3">
                      <div className="mt-0.5 shrink-0 inline-flex rounded-lg bg-secondary/20 p-2 text-secondary">
                        <Icon className="h-4 w-4" />
                      </div>
                      <div>
                        <p className="text-sm font-semibold text-primary">{e.titulo}</p>
                        <p className="text-xs text-slate-500">{e.texto}</p>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Historia — Timeline visual */}
      <section className="bg-slate-50 py-16">
        <div className="container-main">
          <div className="grid items-start gap-10 lg:grid-cols-2">
            <div>
              <span className="text-xs font-bold uppercase tracking-widest text-secondary">Desde 1973</span>
              <h2 className="mt-2 font-heading text-3xl font-bold text-primary sm:text-4xl">
                Más de 50 años<br />formando personas
              </h2>
              <p className="mt-4 text-slate-600">
                El Colegio José Arrieta imparte enseñanza Pre-Escolar y Educación Básica 1° a 8° año, con más
                de cinco décadas de trayectoria al servicio de las familias de La Reina.
              </p>
              <div className="mt-8 space-y-0">
                {hitos.map((h, i) => (
                  <div key={i} className="flex gap-4">
                    <div className="flex flex-col items-center">
                      <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-primary text-xs font-bold text-white">
                        <CalendarDays className="h-4 w-4" />
                      </div>
                      {i < hitos.length - 1 && <div className="mt-1 w-0.5 flex-1 bg-slate-200" />}
                    </div>
                    <div className="pb-6">
                      <p className="text-xs font-bold uppercase tracking-wide text-secondary">{h.year}</p>
                      <p className="mt-0.5 text-sm text-slate-600">{h.texto}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Columna derecha — 3 fotos únicas */}
            <div className="lg:sticky lg:top-24">
              <div className="overflow-hidden rounded-2xl shadow-soft">
                <img
                  src="https://colegiojosearrieta.cl/wp-content/uploads/2024/12/20241218_101437-768x510.jpg"
                  alt="Ceremonia Colegio José Arrieta"
                  className="h-64 w-full object-cover sm:h-80 lg:h-[420px]"
                />
              </div>
              <div className="mt-4 grid grid-cols-2 gap-3">
                <img
                  src="https://colegiojosearrieta.cl/wp-content/uploads/2025/09/DSC_0022-Grande-768x510.jpg"
                  alt="Actividad escolar"
                  className="h-32 w-full rounded-2xl object-cover shadow-soft"
                />
                <img
                  src="https://colegiojosearrieta.cl/wp-content/uploads/2022/12/IMG_3880-768x510.jpg"
                  alt="Comunidad escolar"
                  className="h-32 w-full rounded-2xl object-cover shadow-soft"
                />
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

export default PorQueElegirnos;
