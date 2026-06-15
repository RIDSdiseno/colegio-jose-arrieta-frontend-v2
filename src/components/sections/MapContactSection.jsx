import { MapPin, Phone, Mail, Clock, MessageCircle, ArrowRight, ExternalLink } from "lucide-react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { trackWhatsAppClick } from "../../lib/tracking";
import { WA_ADMISION_URL } from "../../data/contactInfo";

const contactInfo = [
  { icon: MapPin, text: "Av. José Arrieta 6870, La Reina" },
  { icon: MapPin, text: "Januario Espinoza 7131, La Reina" },
  { icon: Phone,  links: [
    { label: "+56 2 2279 1863", href: "tel:+56222791863" },
    { label: "+56 2 2278 4685", href: "tel:+56222784685" },
  ]},
  { icon: Mail,   text: "colegio@colegiojosearrieta.cl", href: "mailto:colegio@colegiojosearrieta.cl" },
  { icon: Clock,  text: "Lun–Vie  08:20–12:30  y  14:00–18:00" },
];

function MapContactSection() {
  return (
    <section className="bg-slate-950 py-24">
      <div className="container-main">

        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-12 flex flex-col items-start justify-between gap-6 sm:flex-row sm:items-end"
        >
          <div>
            <span className="text-xs font-bold uppercase tracking-[0.2em] text-secondary">Visítanos</span>
            <h2 className="mt-2 font-heading text-4xl font-black text-white sm:text-5xl">
              Ven a<br /><span className="text-secondary">conocernos.</span>
            </h2>
          </div>
          <p className="max-w-sm text-sm leading-relaxed text-white/40">
            Agenda una visita y conoce nuestras instalaciones, equipo docente y propuesta educativa sin compromiso.
          </p>
        </motion.div>

        {/* Grid */}
        <div className="overflow-hidden rounded-3xl border border-white/10">
          <div className="grid lg:grid-cols-[420px_1fr]">

            {/* Info */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="relative overflow-hidden bg-primary p-8 sm:p-10"
            >
              <div className="pointer-events-none absolute -left-20 -top-20 h-64 w-64 rounded-full bg-white/5" />
              <div className="pointer-events-none absolute -bottom-16 -right-16 h-48 w-48 rounded-full bg-secondary/10" />

              <div className="relative z-10">
                <ul className="space-y-4">
                  {contactInfo.map(({ icon: Icon, text, href, links }, i) => (
                    <li key={text ?? links?.[0]?.href ?? i} className="flex items-start gap-3 text-sm text-white/75">
                      <span className="mt-0.5 flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-white/10">
                        <Icon className="h-3.5 w-3.5 text-secondary" />
                      </span>
                      {links ? (
                        <div className="flex flex-col gap-0.5">
                          {links.map((l) => (
                            <a key={l.href} href={l.href} className="transition hover:text-secondary">{l.label}</a>
                          ))}
                        </div>
                      ) : href ? (
                        <a href={href} className="transition hover:text-secondary">{text}</a>
                      ) : (
                        text
                      )}
                    </li>
                  ))}
                </ul>

                <div className="mt-8 flex flex-col gap-3 sm:flex-row">
                  <a
                    href={WA_ADMISION_URL}
                    target="_blank"
                    rel="noreferrer"
                    onClick={() => trackWhatsAppClick("map_contact")}
                    className="inline-flex items-center justify-center gap-2 rounded-full bg-[#25D366] px-6 py-3 text-sm font-bold text-white transition hover:bg-[#1ebe5d]"
                  >
                    <MessageCircle className="h-4 w-4" />
                    WhatsApp
                  </a>
                  <Link
                    to="/contacto"
                    className="inline-flex items-center justify-center gap-2 rounded-full border-2 border-white/25 px-6 py-3 text-sm font-bold text-white transition hover:border-white/50 hover:bg-white/10"
                  >
                    Agendar visita
                    <ArrowRight className="h-4 w-4" />
                  </Link>
                </div>
              </div>
            </motion.div>

            {/* Mapa */}
            <div className="relative min-h-[360px]">
              <iframe
                title="Mapa Colegio José Arrieta"
                src="https://www.google.com/maps?q=Av.+Jos%C3%A9+Arrieta+6870,+La+Reina,+Santiago&output=embed"
                className="absolute inset-0 h-full w-full"
                style={{ border: 0 }}
                loading="lazy"
                allow="fullscreen"
                referrerPolicy="no-referrer-when-downgrade"
              />
              {/* Botón "Abrir en Maps" — el iframe absorbe los clicks en móvil */}
              <a
                href="https://maps.google.com/?q=Av.+José+Arrieta+6870,+La+Reina,+Santiago"
                target="_blank"
                rel="noreferrer"
                className="absolute bottom-3 right-3 z-10 inline-flex items-center gap-1.5 rounded-full bg-white px-3 py-1.5 text-xs font-semibold text-slate-700 shadow-md transition hover:bg-slate-50"
              >
                <ExternalLink className="h-3 w-3" />
                Abrir en Maps
              </a>
            </div>

          </div>
        </div>
      </div>
    </section>
  );
}

export default MapContactSection;
