import { Helmet } from "react-helmet-async";
import { CheckCircle2 } from "lucide-react";
import { Link } from "react-router-dom";
import CTABanner from "../../components/sections/CTABanner";
import SectionTitle from "../../components/ui/SectionTitle";

const beneficios = [
  "Financiamiento compartido: acceso a educación de calidad a bajo costo.",
  "Proceso de admisión oficial a través del sistema MINEDUC.",
  "Vacantes disponibles para Pre-Kínder, Kínder y 1° a 8° Básico.",
  "Mismo nivel académico y de infraestructura que colegios particulares.",
  "Apoyo de profesionales: psicólogo, orientador y equipo de convivencia.",
];

export default function ColegioSubvencionado() {
  return (
    <>
      <Helmet>
        <title>Colegios Subvencionados en La Reina | Colegio José Arrieta</title>
        <meta
          name="description"
          content="Colegio José Arrieta es uno de los mejores colegios subvencionados en La Reina, Santiago. Educación de calidad, valores y formación integral. Admisión 2026 vía MINEDUC."
        />
        <meta name="keywords" content="colegios subvencionados La Reina, colegio subvencionado Santiago, colegio particular subvencionado La Reina, admisión MINEDUC La Reina" />
        <link rel="canonical" href="https://colegiojosearrieta.cl/colegio-subvencionado-la-reina" />
      </Helmet>

      <section className="page-hero">
        <div className="container-main">
          <p className="text-sm uppercase tracking-wide text-secondary">Colegio Subvencionado · La Reina</p>
          <h1 className="mt-2 max-w-3xl text-4xl font-bold sm:text-5xl">
            Educación de Calidad con Financiamiento Compartido
          </h1>
          <p className="mt-4 max-w-2xl text-slate-100">
            El Colegio José Arrieta ofrece educación integral de alto nivel como colegio subvencionado en La Reina. Admisión 2026 abierta vía MINEDUC.
          </p>
        </div>
      </section>

      <section className="py-16">
        <div className="container-main grid gap-10 lg:grid-cols-2">
          <div>
            <SectionTitle
              center={false}
              eyebrow="Colegio subvencionado"
              title="Calidad educativa al alcance de tu familia"
              subtitle="Ser subvencionado no significa menor calidad. En el Colegio José Arrieta combinamos excelencia académica, formación valórica e infraestructura moderna."
            />
            <ul className="mt-6 space-y-3">
              {beneficios.map((b) => (
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
                Postula vía MINEDUC
              </Link>
              <Link
                to="/contacto"
                className="inline-flex items-center gap-2 rounded-full border border-primary px-6 py-3 text-sm font-bold text-primary transition hover:bg-primary hover:text-white"
              >
                Solicita información
              </Link>
            </div>
          </div>

          <article className="rounded-2xl border border-slate-200 bg-white p-6 shadow-soft">
            <h2 className="font-heading text-xl font-semibold text-primary">Proceso de Admisión MINEDUC</h2>
            <ol className="mt-4 space-y-3">
              {[
                "Regístrate en el sistema MINEDUC.",
                "Busca el Colegio José Arrieta en La Reina.",
                "Anótate en la lista de postulantes.",
                "Espera la notificación oficial de admisión.",
                "¡Bienvenido/a a la familia Arrieta!",
              ].map((paso, i) => (
                <li key={paso} className="flex items-start gap-3 text-sm text-slate-700">
                  <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-primary text-xs font-bold text-white">
                    {i + 1}
                  </span>
                  <span>{paso}</span>
                </li>
              ))}
            </ol>
            <a
              href="https://registropublicodigital.mineduc.gob.cl/rpd-app-registro-apoderado/login"
              target="_blank"
              rel="noreferrer"
              className="mt-6 inline-flex w-full items-center justify-center gap-2 rounded-xl bg-secondary py-3 text-sm font-bold text-primary transition hover:bg-secondaryHover"
            >
              Ir al sistema MINEDUC
            </a>
          </article>
        </div>
      </section>

      <CTABanner />
    </>
  );
}
