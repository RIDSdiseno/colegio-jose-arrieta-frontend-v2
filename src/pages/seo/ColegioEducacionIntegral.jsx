import { Helmet } from "react-helmet-async";
import { BookOpen, Users, Heart, Monitor, Award } from "lucide-react";
import { Link } from "react-router-dom";
import CTASection from "../../components/sections/CTASection";
import SectionTitle from "../../components/ui/SectionTitle";

const pilares = [
  { icon: BookOpen, titulo: "Excelencia Académica", texto: "Metodologías activas, método Singapur en matemáticas y programa Richmond de inglés." },
  { icon: Users, titulo: "Comunidad Cercana", texto: "Comunicación permanente con las familias y acompañamiento personalizado a cada alumno." },
  { icon: Heart, titulo: "Formación Valórica", texto: "Desarrollo de valores, convivencia sana y habilidades socioemocionales en todos los niveles." },
  { icon: Monitor, titulo: "Tecnología en el Aula", texto: "Laboratorio de computación, sala de ciencias y herramientas digitales integradas al aprendizaje." },
  { icon: Award, titulo: "Trayectoria Comprobada", texto: "Más de 50 años formando generaciones de estudiantes en La Reina con resultados académicos sólidos." },
];

export default function ColegioEducacionIntegral() {
  return (
    <>
      <Helmet>
        <title>Colegio en La Reina con Educación Integral | Colegio José Arrieta</title>
        <meta
          name="description"
          content="El Colegio José Arrieta en La Reina ofrece educación integral real: formación académica, valórica, socioemocional y tecnológica. Más de 50 años de trayectoria. Admisión 2026 abierta."
        />
        <meta name="keywords" content="colegio educación integral La Reina, colegio formación integral Santiago, colegio valores La Reina, educación integral prekinder básica La Reina" />
        <link rel="canonical" href="https://colegiojosearrieta.cl/colegio-educacion-integral-la-reina" />
      </Helmet>

      <section className="page-hero">
        <div className="container-main">
          <p className="text-sm uppercase tracking-wide text-secondary">Educación Integral · La Reina</p>
          <h1 className="mt-2 max-w-3xl text-4xl font-bold sm:text-5xl">
            Formación Integral en La Reina — Más de 50 Años
          </h1>
          <p className="mt-4 max-w-2xl text-slate-100">
            En el Colegio José Arrieta creemos que educar es mucho más que transmitir conocimientos. Formamos personas íntegras, con valores, habilidades y preparación para el mundo.
          </p>
        </div>
      </section>

      <section className="py-16">
        <div className="container-main">
          <SectionTitle
            eyebrow="Nuestro modelo educativo"
            title="5 pilares de la educación integral"
            subtitle="Cada pilar se trabaja de manera transversal en todos los niveles y asignaturas del colegio."
          />
          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {pilares.map((p) => {
              const Icon = p.icon;
              return (
                <article key={p.titulo} className="rounded-2xl border border-slate-200 bg-white p-6 shadow-soft">
                  <div className="mb-4 inline-flex rounded-xl bg-primary/10 p-3 text-primary">
                    <Icon className="h-5 w-5" />
                  </div>
                  <h2 className="font-heading text-lg font-semibold text-primary">{p.titulo}</h2>
                  <p className="mt-2 text-sm text-slate-600">{p.texto}</p>
                </article>
              );
            })}
          </div>
          <div className="mt-10 flex justify-center gap-4">
            <Link
              to="/contacto"
              className="inline-flex items-center gap-2 rounded-full border border-primary px-6 py-3 text-sm font-bold text-primary transition hover:bg-primary hover:text-white"
            >
              Contáctanos
            </Link>
            <Link
              to="/admision"
              className="inline-flex items-center gap-2 rounded-full bg-secondary px-6 py-3 text-sm font-bold text-primary transition hover:bg-secondaryHover"
            >
              Postula 2026
            </Link>
          </div>
        </div>
      </section>

      <CTASection />
    </>
  );
}
