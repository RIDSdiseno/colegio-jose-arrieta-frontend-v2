import Button from "../ui/Button";
import { trackPostulacionClick } from "../../lib/tracking";

function CTABanner() {
  return (
    <section className="py-16">
      <div className="container-main">
        <div className="relative overflow-hidden rounded-3xl bg-primary px-6 py-12 text-white shadow-soft sm:px-12">
          <div className="absolute -right-16 -top-16 h-64 w-64 rounded-full bg-white/5" />
          <div className="absolute -bottom-20 -left-10 h-72 w-72 rounded-full bg-secondary/10" />
          <div className="absolute right-10 bottom-0 h-40 w-40 rounded-full bg-white/5" />

          <div className="relative z-10 flex flex-col items-start justify-between gap-8 lg:flex-row lg:items-center">
            <div>
              <span className="inline-flex rounded-full bg-secondary px-4 py-1 text-xs font-bold uppercase tracking-wider text-primary">
                Admisión 2026 abierta
              </span>
              <h2 className="mt-4 max-w-2xl text-3xl font-extrabold sm:text-4xl">
                ¿Buscas un colegio integral para tu hijo/a?
              </h2>
              <p className="mt-3 max-w-xl text-slate-200">
                Más de 50 años formando personas con valores, excelencia académica y desarrollo integral en La Reina.
              </p>
            </div>
            <div className="flex shrink-0 flex-col gap-3 sm:flex-row">
              <Button to="/admision" variant="secondary" className="px-8 py-3 text-base font-bold" onClick={() => trackPostulacionClick("cta_banner")}>
                Postular Ahora
              </Button>
              <Button to="/contacto" variant="outline" className="border-white/40 bg-white/10 px-8 py-3 text-base text-white">
                Agenda una Visita
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default CTABanner;
