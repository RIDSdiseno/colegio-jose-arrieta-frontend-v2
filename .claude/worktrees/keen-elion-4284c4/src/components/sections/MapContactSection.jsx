import { MapPin, Phone, Mail, Clock, MessageCircle } from "lucide-react";
import Button from "../ui/Button";

function MapContactSection() {
  return (
    <section className="py-16">
      <div className="container-main grid gap-6 lg:grid-cols-2">
        <div className="overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-soft">
          <iframe
            title="Mapa Colegio José Arrieta"
            src="https://www.google.com/maps?q=Av.%20Jos%C3%A9%20Arrieta%206870,%20La%20Reina,%20Santiago&output=embed"
            width="100%"
            height="420"
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
          />
        </div>

        <div className="rounded-3xl border border-slate-200 bg-white p-7 shadow-soft">
          <span className="inline-flex rounded-full bg-primary/10 px-3 py-1 text-xs font-semibold uppercase tracking-wide text-primary">
            Visítanos
          </span>
          <h2 className="mt-3 font-heading text-3xl font-bold text-primary">Encuéntranos en La Reina</h2>
          <p className="mt-3 text-slate-600">
            Agenda una visita y conoce nuestros espacios, equipo docente y propuesta educativa.
          </p>
          <ul className="mt-6 space-y-4 text-sm text-slate-700">
            <li className="flex gap-3">
              <span className="mt-0.5 flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-blue-50">
                <MapPin className="h-4 w-4 text-blue-600" />
              </span>
              <span>Av. José Arrieta 6870, La Reina, Santiago</span>
            </li>
            <li className="flex gap-3">
              <span className="mt-0.5 flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-blue-50">
                <MapPin className="h-4 w-4 text-blue-600" />
              </span>
              <span>Januario Espinoza 7131, La Reina, Santiago</span>
            </li>
            <li className="flex gap-3">
              <span className="mt-0.5 flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-amber-50">
                <Phone className="h-4 w-4 text-amber-600" />
              </span>
              <span>+56222791863 / +56222784685</span>
            </li>
            <li className="flex gap-3">
              <span className="mt-0.5 flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-emerald-50">
                <Mail className="h-4 w-4 text-emerald-600" />
              </span>
              <span>colegio@colegiojosearrieta.cl</span>
            </li>
            <li className="flex gap-3">
              <span className="mt-0.5 flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-violet-50">
                <Clock className="h-4 w-4 text-violet-600" />
              </span>
              <span>Lunes a Viernes 08:20-12:30 y 14:00-18:00 hrs</span>
            </li>
          </ul>
          <div className="mt-7 flex flex-col gap-3 sm:flex-row">
            <a
              href="https://wa.me/56988936631?text=Hola%2C%20me%20interesa%20información%20sobre%20la%20admisión%202026"
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center justify-center gap-2 rounded-full bg-[#25D366] px-6 py-3 text-sm font-bold text-white transition hover:-translate-y-0.5 hover:bg-[#1ebe5d]"
            >
              <MessageCircle className="h-4 w-4" />
              WhatsApp Directo
            </a>
            <Button to="/contacto" variant="outline">
              Ir a Contacto
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}

export default MapContactSection;
