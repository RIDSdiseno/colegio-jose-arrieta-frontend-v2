import { MapPin, Phone, Mail, Clock, MessageCircle, ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";

function MapContactSection() {
  return (
    <section className="py-16">
      <div className="container-main overflow-hidden rounded-3xl shadow-soft">
        <div className="grid lg:grid-cols-2">

        {/* Izquierda — fondo primario con info */}
        <div className="relative flex flex-col justify-center bg-primary px-8 py-10 text-white sm:px-10">
          {/* Círculo decorativo */}
          <div className="absolute -left-16 -top-16 h-64 w-64 rounded-full bg-white/5" />
          <div className="absolute -bottom-12 -right-12 h-48 w-48 rounded-full bg-secondary/10" />

          <div className="relative z-10">
            <span className="inline-flex items-center gap-2 rounded-full bg-secondary/20 px-4 py-1.5 text-xs font-bold uppercase tracking-widest text-secondary">
              <MapPin className="h-3.5 w-3.5" />
              Visítanos
            </span>

            <h2 className="mt-3 font-heading text-3xl font-extrabold leading-tight">
              Ven a<br />conocernos
            </h2>
            <p className="mt-4 max-w-sm text-base text-white/70">
              Agenda una visita y conoce nuestros espacios, equipo docente y propuesta educativa sin compromiso.
            </p>

            <ul className="mt-5 space-y-2.5">
              {[
                { icon: MapPin, text: "Av. José Arrieta 6870, La Reina" },
                { icon: MapPin, text: "Januario Espinoza 7131, La Reina" },
                { icon: Phone, text: "+56 2 2279 1863  /  +56 2 2278 4685" },
                { icon: Mail, text: "colegio@colegiojosearrieta.cl" },
                { icon: Clock, text: "Lun–Vie  08:20–12:30  y  14:00–18:00" },
              ].map(({ icon: Icon, text }) => (
                <li key={text} className="flex items-start gap-3 text-sm text-white/80">
                  <span className="mt-0.5 flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-white/10">
                    <Icon className="h-3.5 w-3.5 text-secondary" />
                  </span>
                  {text}
                </li>
              ))}
            </ul>

            <div className="mt-6 flex flex-wrap gap-3">
              <a
                href="https://wa.me/56988936631?text=Hola%2C%20me%20interesa%20información%20sobre%20la%20admisión%202026"
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-2 rounded-full bg-[#25D366] px-6 py-3 text-sm font-bold text-white shadow-lg transition hover:bg-[#1ebe5d]"
              >
                <MessageCircle className="h-4 w-4" />
                WhatsApp
              </a>
              <Link
                to="/contacto"
                className="inline-flex items-center gap-2 rounded-full border-2 border-white/30 px-6 py-3 text-sm font-bold text-white transition hover:border-white/60 hover:bg-white/10"
              >
                Agendar visita
                <ArrowRight className="h-4 w-4" />
              </Link>
            </div>
          </div>
        </div>

        {/* Derecha — mapa de Google Maps */}
        <div className="relative min-h-[320px]">
          <iframe
            title="Mapa Colegio José Arrieta"
            src="https://www.google.com/maps?q=Av.+Jos%C3%A9+Arrieta+6870,+La+Reina,+Santiago&output=embed"
            className="absolute inset-0 h-full w-full"
            style={{ border: 0 }}
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
          />
        </div>
        </div>
      </div>
    </section>
  );
}

export default MapContactSection;
