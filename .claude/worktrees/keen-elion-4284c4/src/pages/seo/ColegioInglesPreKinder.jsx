import { Helmet } from "react-helmet-async";
import { Globe, CheckCircle2 } from "lucide-react";
import { Link } from "react-router-dom";
import CTABanner from "../../components/sections/CTABanner";
import SectionTitle from "../../components/ui/SectionTitle";

const beneficiosIngles = [
  "Inglés desde Pre-Kínder con metodología lúdica y progresiva.",
  "Programa Richmond para 3° a 8° básico con horas ampliadas.",
  "Docentes especializados en enseñanza del inglés para cada nivel.",
  "Exposición temprana al idioma para mayor fluidez a largo plazo.",
  "Preparación para etapas educativas superiores con base sólida en inglés.",
];

export default function ColegioInglesPreKinder() {
  return (
    <>
      <Helmet>
        <title>Colegio con Inglés desde Pre-Kínder en Santiago | Colegio José Arrieta</title>
        <meta
          name="description"
          content="El Colegio José Arrieta enseña inglés desde Pre-Kínder en La Reina, Santiago. Programa Richmond certificado para básica. Formación bilingüe progresiva con más de 50 años de experiencia."
        />
        <meta name="keywords" content="colegio inglés desde prekinder Santiago, colegio inglés La Reina, inglés prekinder La Reina, colegio bilingüe La Reina Santiago, programa Richmond colegio" />
        <link rel="canonical" href="https://colegiojosearrieta.cl/colegio-ingles-prekinder-santiago" />
      </Helmet>

      <section className="page-hero">
        <div className="container-main">
          <p className="text-sm uppercase tracking-wide text-secondary">Inglés desde Pre-Kínder · La Reina</p>
          <h1 className="mt-2 max-w-3xl text-4xl font-bold sm:text-5xl">
            Inglés desde Pre-Kínder en Santiago
          </h1>
          <p className="mt-4 max-w-2xl text-slate-100">
            En el Colegio José Arrieta el inglés comienza desde los primeros años con metodología lúdica y el programa Richmond certificado para básica.
          </p>
        </div>
      </section>

      <section className="py-16">
        <div className="container-main grid gap-10 lg:grid-cols-2">
          <div>
            <SectionTitle
              center={false}
              eyebrow="Programa de inglés"
              title="Una ventaja que comienza desde pequeños"
              subtitle="La exposición temprana al inglés mejora la pronunciación, comprensión y fluidez de manera significativa. En el Colegio José Arrieta lo hacemos desde Pre-Kínder."
            />
            <ul className="mt-6 space-y-3">
              {beneficiosIngles.map((b) => (
                <li key={b} className="flex items-start gap-3 text-slate-700">
                  <CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0 text-emerald-500" />
                  <span>{b}</span>
                </li>
              ))}
            </ul>
            <div className="mt-8 flex flex-wrap gap-3">
              <Link
                to="/admision"
                className="inline-flex items-center gap-2 rounded-full bg-secondary px-6 py-3 text-sm font-bold text-primary transition hover:bg-secondaryHover"
              >
                Postula 2026
              </Link>
              <Link
                to="/contacto"
                className="inline-flex items-center gap-2 rounded-full border border-primary px-6 py-3 text-sm font-bold text-primary transition hover:bg-primary hover:text-white"
              >
                Más información
              </Link>
            </div>
          </div>

          <div className="flex flex-col gap-4">
            <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-soft">
              <div className="mb-3 inline-flex rounded-xl bg-secondary/20 p-3 text-secondary">
                <Globe className="h-6 w-6" />
              </div>
              <h2 className="font-heading text-xl font-semibold text-primary">Programa Richmond</h2>
              <p className="mt-2 text-sm text-slate-600">
                Metodología certificada internacionalmente aplicada desde 3° a 8° básico con mayor cantidad de horas de instrucción para garantizar el aprendizaje progresivo del idioma.
              </p>
            </div>
            <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-soft">
              <h2 className="font-heading text-xl font-semibold text-primary">Inglés lúdico Pre-Escolar</h2>
              <p className="mt-2 text-sm text-slate-600">
                Para Pre-Kínder y Kínder usamos metodología basada en el juego, canciones y actividades sensoriales que estimulan la adquisición natural del idioma desde los primeros años.
              </p>
            </div>
          </div>
        </div>
      </section>

      <CTABanner />
    </>
  );
}
