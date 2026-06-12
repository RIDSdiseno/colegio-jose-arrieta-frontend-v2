import { useState } from "react";
import { Helmet } from "react-helmet-async";
import { Mail, Phone, MessageCircle, MapPin, Clock, Send, CheckCircle2 } from "lucide-react";
import Button from "../components/ui/Button";
import PageHero from "../components/ui/PageHero";
import { trackFormularioContacto } from "../lib/tracking";

const contactItems = [
  {
    icon: Mail,
    label: "Email",
    value: "colegio@colegiojosearrieta.cl",
    href: "mailto:colegio@colegiojosearrieta.cl",
  },
  {
    icon: Phone,
    label: "Teléfonos",
    links: [
      { value: "+56 2 2279 1863", href: "tel:+56222791863" },
      { value: "+56 2 2278 4685", href: "tel:+56222784685" },
    ],
  },
  {
    icon: MessageCircle,
    label: "WhatsApp",
    value: "+56 9 8893 6631",
    href: "https://wa.me/56988936631?text=Hola%2C%20quisiera%20más%20información",
  },
  {
    icon: MapPin,
    label: "Sede principal",
    value: "Av. José Arrieta 6870, La Reina",
    href: "https://maps.google.com/?q=Av.+José+Arrieta+6870,+La+Reina,+Santiago",
  },
  {
    icon: MapPin,
    label: "Segunda sede",
    value: "Januario Espinoza 7131, La Reina",
    href: "https://maps.google.com/?q=Januario+Espinoza+7131,+La+Reina,+Santiago",
  },
  {
    icon: Clock,
    label: "Horario",
    value: "Lunes a Viernes · 08:20–12:30 y 14:00–18:00",
    href: null,
  },
];

function Contacto() {
  const [form, setForm] = useState({ nombre: "", email: "", telefono: "", mensaje: "" });
  const [error, setError] = useState("");
  const [sent, setSent] = useState(false);

  const handleChange = (e) => setForm((p) => ({ ...p, [e.target.name]: e.target.value }));

  const handleSubmit = (e) => {
    e.preventDefault();
    const nombre = form.nombre.trim();
    const email = form.email.trim();
    const telefono = form.telefono.trim();
    const mensaje = form.mensaje.trim();
    if (!nombre || !email || !telefono || !mensaje) {
      setError("Por favor completa todos los campos.");
      return;
    }
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      setError("Por favor ingresa un email válido.");
      return;
    }
    setError("");
    trackFormularioContacto();
    const wa = `https://wa.me/56988936631?text=${encodeURIComponent(
      `Hola, me llamo ${nombre}. Email: ${email}. Teléfono: ${telefono}. ${mensaje}`
    )}`;
    const popup = window.open(wa, "_blank");
    if (popup) {
      setSent(true);
    } else {
      setError("Tu navegador bloqueó la ventana. Escríbenos directamente al +56 9 8893 6631.");
    }
  };

  return (
    <>
      <Helmet>
        <title>Contacto — Colegio José Arrieta, La Reina | Escríbenos o Visítanos</title>
        <meta name="keywords" content="contacto colegio La Reina, colegio José Arrieta teléfono, visitar colegio La Reina Santiago" />
        <meta
          name="description"
          content="Contáctanos para resolver dudas sobre admisión, visitas y proyecto educativo del Colegio José Arrieta."
        />
      </Helmet>

      <PageHero
        img="/images/contacto-hero.png"
        badge="Estamos para ayudarte"
        title="Contáctanos"
        highlight="hoy"
        subtitle="Escríbenos y te responderemos a la brevedad para acompañarte en tu proceso."
      />

      <section className="py-16">
        <div className="container-main grid gap-8 lg:grid-cols-3">

          {/* ── Datos de contacto ── */}
          <div className="flex flex-col gap-4 lg:col-span-1">
            <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-soft">
              <h2 className="font-heading text-xl font-bold text-slate-900">Datos de contacto</h2>
              <ul className="mt-4 space-y-4">
                {contactItems.map(({ icon: Icon, label, value, href, links }) => (
                  <li key={label} className="flex items-start gap-3">
                    <div className="mt-0.5 flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-primary/10">
                      <Icon className="h-4 w-4 text-primary" />
                    </div>
                    <div>
                      <p className="text-xs font-semibold uppercase tracking-wide text-slate-400">{label}</p>
                      {links ? (
                        <div className="mt-0.5 flex flex-col gap-0.5">
                          {links.map((l) => (
                            <a
                              key={l.href}
                              href={l.href}
                              className="text-sm text-slate-700 transition hover:text-primary"
                            >
                              {l.value}
                            </a>
                          ))}
                        </div>
                      ) : href ? (
                        <a
                          href={href}
                          target={href.startsWith("http") ? "_blank" : undefined}
                          rel={href.startsWith("http") ? "noreferrer" : undefined}
                          className="mt-0.5 text-sm text-slate-700 transition hover:text-primary"
                        >
                          {value}
                        </a>
                      ) : (
                        <p className="mt-0.5 text-sm text-slate-700">{value}</p>
                      )}
                    </div>
                  </li>
                ))}
              </ul>
            </div>

            {/* WhatsApp CTA */}
            <a
              href="https://wa.me/56988936631?text=Hola%2C%20quisiera%20más%20información"
              target="_blank"
              rel="noreferrer"
              className="flex items-center justify-center gap-2 rounded-2xl bg-[#25D366] px-5 py-4 text-sm font-bold text-white shadow-soft transition hover:bg-[#1ebe5d]"
            >
              <MessageCircle className="h-5 w-5" />
              Escribir por WhatsApp
            </a>
          </div>

          {/* ── Formulario ── */}
          <article className="rounded-2xl border border-slate-200 bg-white p-6 shadow-soft lg:col-span-2">
            <h2 className="font-heading text-xl font-bold text-slate-900">Envíanos un mensaje</h2>

            {sent ? (
              <div className="mt-6 rounded-2xl border border-emerald-200 bg-emerald-50 p-6 text-center text-emerald-700">
                <CheckCircle2 className="mx-auto mb-2 h-8 w-8" />
                <p className="font-semibold">¡Gracias! Te redirigimos a WhatsApp para continuar.</p>
                <button
                  type="button"
                  onClick={() => setSent(false)}
                  className="mt-3 text-xs text-emerald-600 underline hover:text-emerald-800 transition"
                >
                  Enviar otro mensaje
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="mt-5 space-y-4">
                <div className="grid gap-4 sm:grid-cols-2">
                  <div>
                    <label htmlFor="nombre" className="text-sm font-medium text-slate-700">Nombre</label>
                    <input
                      id="nombre"
                      name="nombre"
                      required
                      value={form.nombre}
                      onChange={handleChange}
                      placeholder="Tu nombre completo"
                      className="mt-1 w-full rounded-xl border border-slate-300 px-4 py-2.5 text-sm transition focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20"
                    />
                  </div>
                  <div>
                    <label htmlFor="email" className="text-sm font-medium text-slate-700">Email</label>
                    <input
                      id="email"
                      name="email"
                      type="email"
                      required
                      value={form.email}
                      onChange={handleChange}
                      placeholder="tucorreo@ejemplo.com"
                      className="mt-1 w-full rounded-xl border border-slate-300 px-4 py-2.5 text-sm transition focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20"
                    />
                  </div>
                  <div className="sm:col-span-2">
                    <label htmlFor="telefono" className="text-sm font-medium text-slate-700">Teléfono</label>
                    <input
                      id="telefono"
                      name="telefono"
                      type="tel"
                      required
                      value={form.telefono}
                      onChange={handleChange}
                      placeholder="+56 9 XXXX XXXX"
                      className="mt-1 w-full rounded-xl border border-slate-300 px-4 py-2.5 text-sm transition focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20"
                    />
                  </div>
                </div>
                <div>
                  <label htmlFor="mensaje" className="text-sm font-medium text-slate-700">Mensaje</label>
                  <textarea
                    id="mensaje"
                    name="mensaje"
                    rows={5}
                    required
                    value={form.mensaje}
                    onChange={handleChange}
                    placeholder="¿En qué podemos ayudarte?"
                    className="mt-1 w-full rounded-xl border border-slate-300 px-4 py-2.5 text-sm transition focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20"
                  />
                </div>
                {error && (
                  <p className="rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">{error}</p>
                )}
                <Button type="submit" variant="primary" className="w-full inline-flex items-center justify-center gap-2">
                  <Send className="h-4 w-4" />
                  Enviar por WhatsApp
                </Button>
                <p className="text-center text-xs text-slate-400">Te responderemos a la brevedad por WhatsApp</p>
              </form>
            )}
          </article>
        </div>
      </section>

    </>
  );
}

export default Contacto;
