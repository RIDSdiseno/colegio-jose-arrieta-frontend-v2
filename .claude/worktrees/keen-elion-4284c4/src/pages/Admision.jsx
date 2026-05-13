import { useState } from "react";
import { Helmet } from "react-helmet-async";
import { ExternalLink, MessageCircle, Mail as MailIcon, CheckCircle2, Send, Shirt, CreditCard } from "lucide-react";
import SectionTitle from "../components/ui/SectionTitle";
import { trackFormularioVisita, trackWhatsAppClick, trackPostulacionClick, trackVisitaAdmision } from "../lib/tracking";
import { useEffect } from "react";

const pasos = [
  { label: "Regístrate en MINEDUC",     bg: "bg-blue-50",    border: "border-t-4 border-t-blue-500",    num: "text-blue-600"    },
  { label: "Anótate en la Lista",        bg: "bg-amber-50",   border: "border-t-4 border-t-amber-500",   num: "text-amber-600"   },
  { label: "Conoce el colegio",          bg: "bg-emerald-50", border: "border-t-4 border-t-emerald-500", num: "text-emerald-600" },
  { label: "Espera la notificación",     bg: "bg-violet-50",  border: "border-t-4 border-t-violet-500",  num: "text-violet-600"  },
  { label: "¡Bienvenido/a!",             bg: "bg-rose-50",    border: "border-t-4 border-t-rose-500",    num: "text-rose-600"    },
];

const razones = [
  "Formación valórica y socioemocional para una convivencia sana.",
  "Acompañamiento docente cercano con seguimiento personalizado.",
  "Comunidad activa y segura con comunicación permanente con las familias.",
  "Más de 50 años de trayectoria educativa en La Reina.",
];

function FormVisita() {
  const [form, setForm] = useState({ nombre: "", email: "", telefono: "", asunto: "Agenda una visita" });
  const [sent, setSent] = useState(false);

  const handleChange = (e) => setForm((p) => ({ ...p, [e.target.name]: e.target.value }));

  const handleSubmit = (e) => {
    e.preventDefault();
    trackFormularioVisita();
    trackWhatsAppClick("formulario_visita");
    const wa = `https://wa.me/56988936631?text=${encodeURIComponent(
      `Hola, me llamo ${form.nombre}. ${form.asunto}. Email: ${form.email}. Teléfono: ${form.telefono}`
    )}`;
    window.open(wa, "_blank");
    setSent(true);
  };

  if (sent) {
    return (
      <div className="rounded-2xl border border-emerald-200 bg-emerald-50 p-6 text-center text-emerald-700">
        <CheckCircle2 className="mx-auto mb-2 h-8 w-8" />
        <p className="font-semibold">¡Gracias! Te redirigimos a WhatsApp para confirmar tu visita.</p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="grid gap-4 sm:grid-cols-2">
        <div>
          <label className="mb-1 block text-sm font-medium text-slate-700">Nombre completo</label>
          <input
            name="nombre" required value={form.nombre} onChange={handleChange}
            placeholder="Ej: María González"
            className="w-full rounded-xl border border-slate-300 px-4 py-2.5 text-sm outline-none focus:border-primary focus:ring-2 focus:ring-primary/20"
          />
        </div>
        <div>
          <label className="mb-1 block text-sm font-medium text-slate-700">Teléfono</label>
          <input
            name="telefono" required value={form.telefono} onChange={handleChange}
            placeholder="+56 9 XXXX XXXX"
            className="w-full rounded-xl border border-slate-300 px-4 py-2.5 text-sm outline-none focus:border-primary focus:ring-2 focus:ring-primary/20"
          />
        </div>
      </div>
      <div>
        <label className="mb-1 block text-sm font-medium text-slate-700">Email</label>
        <input
          name="email" type="email" required value={form.email} onChange={handleChange}
          placeholder="correo@ejemplo.com"
          className="w-full rounded-xl border border-slate-300 px-4 py-2.5 text-sm outline-none focus:border-primary focus:ring-2 focus:ring-primary/20"
        />
      </div>
      <div>
        <label className="mb-1 block text-sm font-medium text-slate-700">¿En qué podemos ayudarte?</label>
        <select
          name="asunto" value={form.asunto} onChange={handleChange}
          className="w-full rounded-xl border border-slate-300 px-4 py-2.5 text-sm outline-none focus:border-primary focus:ring-2 focus:ring-primary/20"
        >
          <option>Agenda una visita</option>
          <option>Solicitar información de admisión</option>
          <option>Consulta sobre vacantes 2026</option>
          <option>Otra consulta</option>
        </select>
      </div>
      <button
        type="submit"
        className="inline-flex w-full items-center justify-center gap-2 rounded-xl bg-secondary py-3 text-sm font-bold text-primary transition hover:bg-secondaryHover"
      >
        <Send className="h-4 w-4" />
        Enviar por WhatsApp
      </button>
      <p className="text-center text-xs text-slate-400">Te responderemos a la brevedad por WhatsApp</p>
    </form>
  );
}

function Admision() {
  useEffect(() => { trackVisitaAdmision(); }, []);

  return (
    <>
      <Helmet>
        <title>Admisión 2026 — Colegio José Arrieta, La Reina | Postula Ahora</title>
        <meta
          name="description"
          content="Postula al Colegio José Arrieta 2026 en La Reina. Vacantes disponibles para Pre-Kínder a 8° básico. Proceso MINEDUC, formulario de visita y WhatsApp directo. ¡Inscríbete hoy!"
        />
        <meta name="keywords" content="admisión 2026 La Reina, postular colegio La Reina, vacantes colegio subvencionado Santiago, inscripción MINEDUC 2026" />
      </Helmet>

      <section className="page-hero">
        <div className="container-main">
          <p className="text-sm uppercase tracking-wide text-secondary">Admisión 2026</p>
          <h1 className="mt-2 max-w-3xl text-4xl font-bold sm:text-5xl">
            Postula al Colegio José Arrieta
          </h1>
          <p className="mt-4 max-w-2xl text-slate-100">
            Queremos acompañarte en una decisión importante para el futuro de tu hijo/a.
          </p>
        </div>
      </section>

      <section className="py-16">
        <div className="container-main grid gap-6 lg:grid-cols-3">
          <article className="rounded-2xl border border-slate-200 bg-white p-6 shadow-soft lg:col-span-2">
            <SectionTitle
              center={false}
              eyebrow="Nuestra propuesta"
              title="¿Por qué elegirnos?"
              subtitle="Una experiencia educativa integral que combina resultados académicos y bienestar."
            />
            <ul className="space-y-3">
              {razones.map((r) => (
                <li key={r} className="flex items-start gap-3 text-slate-700">
                  <CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0 text-emerald-500" />
                  <span>{r}</span>
                </li>
              ))}
            </ul>
          </article>

          <article className="rounded-2xl border border-slate-200 bg-white p-6 shadow-soft">
            <h2 className="font-heading text-2xl font-semibold text-primary">Vacantes disponibles</h2>
            <ul className="mt-4 space-y-2 text-slate-700">
              {["Pre-Kinder", "Kinder", "1° a 8° Básico"].map((n) => (
                <li key={n} className="flex items-center gap-2">
                  <span className="h-2 w-2 rounded-full bg-secondary" />
                  {n}
                </li>
              ))}
            </ul>
            <div className="mt-6 space-y-3 border-t border-slate-100 pt-6">
              <p className="flex items-center gap-2 text-sm text-slate-700">
                <MessageCircle className="h-4 w-4 text-emerald-500" />
                <a
                  href="https://wa.me/56988936631?text=Hola%2C%20me%20interesa%20información%20sobre%20la%20admisión%202026"
                  target="_blank"
                  rel="noreferrer"
                  className="font-semibold text-emerald-600 hover:underline"
                  onClick={() => trackWhatsAppClick("tarjeta_admision")}
                >
                  +56 9 8893 6631
                </a>
              </p>
              <p className="flex items-center gap-2 text-sm text-slate-700">
                <MailIcon className="h-4 w-4 text-primary" />
                <a href="mailto:colegio@colegiojosearrieta.cl" className="font-semibold text-primary hover:underline">
                  colegio@colegiojosearrieta.cl
                </a>
              </p>
            </div>
          </article>
        </div>
      </section>

      <section className="bg-white py-16">
        <div className="container-main">
          <SectionTitle
            eyebrow="Proceso de admisión"
            title="Tu camino en 5 pasos"
            subtitle="La inscripción oficial se realiza a través del sistema MINEDUC."
          />
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-5">
            {pasos.map((paso, index) => (
              <article
                key={paso.label}
                className={`rounded-2xl border border-slate-200 p-4 text-center ${paso.bg} ${paso.border}`}
              >
                <p className={`text-xs font-bold uppercase ${paso.num}`}>Paso {index + 1}</p>
                <p className="mt-2 font-heading text-base font-semibold text-primary">{paso.label}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* Mensualidad y Uniforme */}
      <section className="py-16">
        <div className="container-main grid gap-6 lg:grid-cols-2">
          {/* Mensualidad */}
          <article className="rounded-2xl border border-slate-200 bg-white p-6 shadow-soft">
            <div className="mb-4 flex items-center gap-3">
              <div className="inline-flex rounded-xl bg-primary/10 p-3 text-primary">
                <CreditCard className="h-5 w-5" />
              </div>
              <h2 className="font-heading text-2xl font-semibold text-primary">Mensualidad 2026</h2>
            </div>
            <p className="mb-4 text-sm text-slate-600">
              El Colegio José Arrieta opera bajo el sistema de financiamiento compartido. Los valores son
              reajustados anualmente según normativa MINEDUC.
            </p>
            <div className="space-y-3">
              {[
                { nivel: "Pre-Kínder y Kínder", monto: "Consultar en secretaría" },
                { nivel: "1° a 4° Básico", monto: "Consultar en secretaría" },
                { nivel: "5° a 8° Básico", monto: "Consultar en secretaría" },
              ].map((row) => (
                <div key={row.nivel} className="flex items-center justify-between rounded-xl bg-slate-50 px-4 py-3 text-sm">
                  <span className="font-medium text-slate-700">{row.nivel}</span>
                  <span className="font-semibold text-primary">{row.monto}</span>
                </div>
              ))}
            </div>
            <p className="mt-4 text-xs text-slate-400">
              Para valores exactos contáctanos por WhatsApp o visita la secretaría del colegio.
            </p>
          </article>

          {/* Uniforme */}
          <article className="rounded-2xl border border-slate-200 bg-white p-6 shadow-soft">
            <div className="mb-4 flex items-center gap-3">
              <div className="inline-flex rounded-xl bg-secondary/20 p-3 text-secondary">
                <Shirt className="h-5 w-5" />
              </div>
              <h2 className="font-heading text-2xl font-semibold text-primary">Uniforme Escolar</h2>
            </div>
            <p className="mb-4 text-sm text-slate-600">
              El uso del uniforme es obligatorio. Contribuye a la identidad, el respeto y la convivencia escolar.
            </p>
            <div className="space-y-4">
              <div>
                <p className="mb-2 text-sm font-semibold text-primary">Uniforme de diario</p>
                <ul className="space-y-1 text-sm text-slate-600">
                  {["Pantalón/falda azul marino", "Camisa/blusa blanca", "Chaleco azul marino con escudo", "Zapatos negros"].map((item) => (
                    <li key={item} className="flex items-center gap-2">
                      <span className="h-1.5 w-1.5 shrink-0 rounded-full bg-primary" />
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
              <div>
                <p className="mb-2 text-sm font-semibold text-secondary">Uniforme de educación física</p>
                <ul className="space-y-1 text-sm text-slate-600">
                  {["Buzo institucional azul marino", "Polera blanca con escudo", "Zapatillas deportivas"].map((item) => (
                    <li key={item} className="flex items-center gap-2">
                      <span className="h-1.5 w-1.5 shrink-0 rounded-full bg-secondary" />
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </article>
        </div>
      </section>

      <section className="bg-slate-50 py-16">
        <div className="container-main">
          <div className="mx-auto max-w-2xl">
            <SectionTitle
              eyebrow="Agenda una visita"
              title="¿Quieres conocer el colegio?"
              subtitle="Completa el formulario y te contactamos por WhatsApp para coordinar tu visita sin compromiso."
            />
            <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-soft">
              <FormVisita />
            </div>
          </div>
        </div>
      </section>

      <section className="py-16">
        <div className="container-main">
          <div className="overflow-hidden rounded-3xl bg-primary text-white shadow-soft">
            <div className="relative px-8 py-12 sm:px-12">
              <div className="absolute -right-12 -top-12 h-56 w-56 rounded-full bg-white/5" />
              <div className="absolute -bottom-16 -left-8 h-64 w-64 rounded-full bg-secondary/10" />
              <div className="relative z-10 flex flex-col items-start gap-8 lg:flex-row lg:items-center lg:justify-between">
                <div className="max-w-xl">
                  <span className="inline-flex rounded-full bg-secondary px-4 py-1 text-xs font-bold uppercase tracking-wider text-primary">
                    Inscripción oficial
                  </span>
                  <h2 className="mt-4 text-3xl font-extrabold sm:text-4xl">
                    Anótate en la Lista — MINEDUC
                  </h2>
                  <p className="mt-3 text-slate-200">
                    La inscripción de vacantes se realiza exclusivamente a través del sistema oficial del
                    Ministerio de Educación. Regístrate, busca el Colegio José Arrieta y anótate en la lista.
                  </p>
                </div>
                <a
                  href="https://registropublicodigital.mineduc.gob.cl/rpd-app-registro-apoderado/login"
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex shrink-0 items-center gap-2 rounded-full bg-secondary px-8 py-4 text-base font-bold text-primary transition hover:bg-secondaryHover"
                  onClick={() => trackPostulacionClick("boton_mineduc")}
                >
                  Ir a MINEDUC
                  <ExternalLink className="h-4 w-4" />
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

export default Admision;
