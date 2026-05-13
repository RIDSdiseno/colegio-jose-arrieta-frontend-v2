import { Helmet } from "react-helmet-async";
import { Link } from "react-router-dom";
import {
  ClipboardCheck,
  GraduationCap,
  LibraryBig,
  BriefcaseBusiness,
  Mail,
  Newspaper,
} from "lucide-react";
import HeroSection from "../components/sections/HeroSection";
import StatsSection from "../components/sections/StatsSection";
import ValoresSection from "../components/sections/ValoresSection";
import BeneficiosSection from "../components/sections/BeneficiosSection";
import TestimonialsSection from "../components/sections/TestimonialsSection";
import VideoSection from "../components/sections/VideoSection";
import CTABanner from "../components/sections/CTABanner";
import NewsSection from "../components/sections/NewsSection";
import FotoMosaico from "../components/sections/FotoMosaico";

const quickLinks = [
  {
    label: "INSCRIPCIÓN MINEDUC",
    url: "https://registropublicodigital.mineduc.gob.cl/rpd-app-registro-apoderado/login",
    icon: GraduationCap,
    external: true,
    highlight: true,
  },
  {
    label: "CALIFICACIONES EN LÍNEA",
    url: "https://colegiojosearrieta.alexiaeducl.com",
    icon: ClipboardCheck,
    external: true,
  },
  {
    label: "BIBLIOTECA EN LÍNEA",
    url: "http://colegioarrieta.ddns.net:83/",
    icon: LibraryBig,
    external: true,
  },
  {
    label: "TRABAJA CON NOSOTROS",
    url: "https://colegiojosearrieta.cl/trabaja-con-nosotros",
    icon: BriefcaseBusiness,
    external: true,
  },
  {
    label: "CONTÁCTANOS",
    url: "/contacto",
    icon: Mail,
    external: false,
  },
  {
    label: "BOLETÍN MENSUAL",
    url: "https://colegiojosearrieta.cl/documentos/boletines",
    icon: Newspaper,
    external: true,
  },
];

function Home() {
  return (
    <>
      <Helmet>
        <title>Colegio José Arrieta — Mejor Colegio en La Reina, Santiago | Admisión 2026</title>
        <meta
          name="description"
          content="Colegio José Arrieta: uno de los mejores colegios subvencionados en La Reina, Santiago. Más de 50 años formando alumnos con educación integral, inglés desde Pre-Kínder y valores. Admisión 2026 abierta."
        />
        <meta name="keywords" content="colegio La Reina, mejores colegios La Reina, colegio subvencionado La Reina, educación integral Santiago, admisión 2026 La Reina" />
      </Helmet>

      {/* 1. Hero */}
      <HeroSection />

      {/* 2. Accesos rápidos */}
      <section className="py-10">
        <div className="container-main">
          <h2 className="mb-4 text-center font-heading text-2xl font-bold text-primary">Accesos Rápidos</h2>
          <div className="grid grid-cols-2 gap-3 lg:grid-cols-3">
            {quickLinks.map((item) => {
              const Icon = item.icon;
              const classes = item.highlight
                ? "flex items-center gap-2 rounded-xl border-2 border-secondary bg-secondary px-4 py-3 text-left text-xs font-bold tracking-wide text-primary transition hover:bg-secondaryHover hover:border-secondaryHover sm:text-sm"
                : "flex items-center gap-2 rounded-xl border border-slate-300 bg-white px-4 py-3 text-left text-xs font-semibold tracking-wide text-primary transition hover:border-primary hover:bg-primary hover:text-white sm:text-sm";

              if (item.external) {
                return (
                  <a key={item.label} href={item.url} target="_blank" rel="noreferrer" className={classes}>
                    <Icon className="h-4 w-4 shrink-0" />
                    <span>{item.label}</span>
                  </a>
                );
              }

              return (
                <Link key={item.label} to={item.url} className={classes}>
                  <Icon className="h-4 w-4 shrink-0" />
                  <span>{item.label}</span>
                </Link>
              );
            })}
          </div>
        </div>
      </section>

      {/* 3. Stats */}
      <StatsSection />

      {/* 4. Propuesta de valor — 5 pilares comerciales */}
      <ValoresSection />

      {/* 5. Beneficios concretos */}
      <BeneficiosSection />

      {/* 6. Mosaico de fotos reales */}
      <FotoMosaico />

      {/* 7. Video institucional */}
      <VideoSection />

      {/* 7. Prueba social — testimonios visibles */}
      <TestimonialsSection />

      {/* 8. CTA */}
      <CTABanner />

      {/* 9. Noticias */}
      <NewsSection />
    </>
  );
}

export default Home;
