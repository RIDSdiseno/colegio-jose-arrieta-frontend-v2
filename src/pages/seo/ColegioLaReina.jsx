import { Helmet } from "react-helmet-async";
import { CheckCircle2 } from "lucide-react";
import { Link } from "react-router-dom";
import CTASection from "../../components/sections/CTASection";
import SectionTitle from "../../components/ui/SectionTitle";

const razones = [
  "Más de 50 años de trayectoria educativa en La Reina, Santiago.",
  "Educación Pre-Escolar y Básica de 1° a 8° año con formación integral.",
  "Comunidad cercana con comunicación permanente entre familias y docentes.",
  "Infraestructura segura y moderna pensada para el aprendizaje.",
  "Talleres extraprogramáticos: fútbol, básquetbol, robótica y más.",
];

export default function ColegioLaReina() {
  return (
    <>
      <Helmet>
        <title>Mejores Colegios en La Reina, Santiago | Colegio José Arrieta</title>
        <meta
          name="description"
          content="¿Buscas el mejor colegio en La Reina, Santiago? El Colegio José Arrieta lleva más de 50 años formando alumnos con excelencia académica y valores. Admisión 2026 abierta."
        />
        <meta name="keywords" content="mejores colegios La Reina, colegios La Reina Santiago, colegio La Reina admisión 2026, colegio básica La Reina" />
        <link rel="canonical" href="https://colegiojosearrieta.cl/colegio-la-reina" />
      </Helmet>

      <section className="page-hero">
        <div className="container-main">
          <p className="text-sm uppercase tracking-wide text-secondary">La Reina, Santiago</p>
          <h1 className="mt-2 max-w-3xl text-4xl font-bold sm:text-5xl">
            Colegio José Arrieta — La Reina
          </h1>
          <p className="mt-4 max-w-2xl text-slate-100">
            Más de 50 años siendo parte de la comunidad educativa de La Reina. Formamos alumnos felices, seguros y preparados para el futuro.
          </p>
        </div>
      </section>

      <section className="py-16">
        <div className="container-main grid gap-10 lg:grid-cols-2">
          <div>
            <SectionTitle
              center={false}
              eyebrow="¿Por qué elegirnos?"
              title="Un colegio con historia en La Reina"
              subtitle="El Colegio José Arrieta es una institución reconocida por su calidad educativa, cercanía con las familias y compromiso con el desarrollo integral de cada alumno."
            />
            <ul className="mt-6 space-y-3">
              {razones.map((r) => (
                <li key={r} className="flex items-start gap-3 text-slate-700">
                  <CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0 text-emerald-500" />
                  <span>{r}</span>
                </li>
              ))}
            </ul>
            <div className="mt-8 flex flex-wrap gap-3">
              <Link
                to="/admision"
                className="inline-flex items-center gap-2 rounded-full bg-secondary px-6 py-3 text-sm font-bold text-primary transition hover:bg-secondaryHover"
              >
                Ver Admisión 2026
              </Link>
              <Link
                to="/por-que-elegirnos"
                className="inline-flex items-center gap-2 rounded-full border border-primary px-6 py-3 text-sm font-bold text-primary transition hover:bg-primary hover:text-white"
              >
                ¿Por qué elegirnos?
              </Link>
            </div>
          </div>

          <div className="space-y-4">
            {[
              { label: "Años de trayectoria", value: "+50" },
              { label: "Niveles educativos", value: "Pre-Kínder a 8° Básico" },
              { label: "Ubicación", value: "La Reina, Santiago" },
              { label: "Admisión", value: "2026 Abierta" },
            ].map((item) => (
              <div key={item.label} className="flex items-center justify-between rounded-2xl border border-slate-200 bg-white px-6 py-4 shadow-soft">
                <span className="text-sm text-slate-500">{item.label}</span>
                <span className="font-bold text-primary">{item.value}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      <CTASection />
    </>
  );
}
