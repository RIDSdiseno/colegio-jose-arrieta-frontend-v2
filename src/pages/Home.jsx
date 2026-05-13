import { Helmet } from "react-helmet-async";
import HeroSection from "../components/sections/HeroSection";
import ValoresSection from "../components/sections/ValoresSection";
import BeneficiosSection from "../components/sections/BeneficiosSection";
import NewsSection from "../components/sections/NewsSection";
import TestimonialsSection from "../components/sections/TestimonialsSection";
import LogrosSection from "../components/sections/LogrosSection";
import MapContactSection from "../components/sections/MapContactSection";
import FloatingButtons from "../components/ui/FloatingButtons";

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

      <HeroSection />
      <ValoresSection />
      <BeneficiosSection />
      <NewsSection />
      <LogrosSection />
      <TestimonialsSection />
      <MapContactSection />
<FloatingButtons />
    </>
  );
}

export default Home;
