import { useState, useEffect } from "react";
import { Helmet } from "react-helmet-async";
import {
  ExternalLink, MessageCircle, Mail as MailIcon,
  CheckCircle2, Send, Shirt, CreditCard,
  ClipboardList, ListChecks, School, Bell, PartyPopper,
  ZoomIn, X, ChevronLeft, ChevronRight,
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import PageHero from "../components/ui/PageHero";

// ── Imágenes del uniforme (coloca los archivos en /public/) ───────────────────
const uniformeImages = [
  { src: "https://colegiojosearrieta.cl/wp-content/uploads/2019/09/Diapositiva1-1.png", label: "Uniforme de diario" },
  { src: "https://colegiojosearrieta.cl/wp-content/uploads/2019/08/Diapositiva3.png",   label: "Uniforme deportivo" },
  { src: "https://colegiojosearrieta.cl/wp-content/uploads/2019/08/Diapositiva2.png",   label: "Uniforme deportivo (buzo)" },
];

// ── Lightbox ──────────────────────────────────────────────────────────────────
function Lightbox({ images, startIndex, onClose }) {
  const [index, setIndex] = useState(startIndex);

  useEffect(() => {
    const handler = (e) => { if (e.key === "Escape") onClose(); };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [onClose]);

  const prev = () => setIndex((i) => (i - 1 + images.length) % images.length);
  const next = () => setIndex((i) => (i + 1) % images.length);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-[100] flex items-center justify-center bg-black/85 backdrop-blur-sm p-4"
      onClick={onClose}
    >
      {/* Cerrar */}
      <button
        onClick={onClose}
        aria-label="Cerrar imagen"
        className="absolute right-4 top-4 flex h-9 w-9 items-center justify-center rounded-full bg-white/10 text-white hover:bg-white/25 transition"
      >
        <X className="h-5 w-5" />
      </button>

      {/* Imagen */}
      <motion.div
        key={index}
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.2 }}
        className="relative max-h-[85vh] max-w-5xl w-full"
        onClick={(e) => e.stopPropagation()}
      >
        <img
          src={images[index].src}
          alt={images[index].label}
          className="mx-auto max-h-[80vh] w-full rounded-2xl object-contain shadow-2xl"
        />
        <p className="mt-3 text-center text-sm font-semibold text-white/80">
          {images[index].label} — {index + 1} / {images.length}
        </p>
      </motion.div>

      {/* Flechas */}
      {images.length > 1 && (
        <>
          <button
            onClick={(e) => { e.stopPropagation(); prev(); }}
            className="absolute left-4 flex h-10 w-10 items-center justify-center rounded-full bg-white/10 text-white hover:bg-white/25 transition"
          >
            <ChevronLeft className="h-5 w-5" />
          </button>
          <button
            onClick={(e) => { e.stopPropagation(); next(); }}
            className="absolute right-4 flex h-10 w-10 items-center justify-center rounded-full bg-white/10 text-white hover:bg-white/25 transition"
          >
            <ChevronRight className="h-5 w-5" />
          </button>
        </>
      )}
    </motion.div>
  );
}
import SectionTitle from "../components/ui/SectionTitle";
import {
  trackFormularioVisita, trackWhatsAppClick,
  trackPostulacionClick, trackVisitaAdmision,
} from "../lib/tracking";

const pasos = [
  { icon: ClipboardList, num: 1, label: "Regístrate en MINEDUC",  desc: "Crea tu cuenta en el sistema oficial del Ministerio de Educación." },
  { icon: ListChecks,    num: 2, label: "Anótate en la Lista",     desc: "Busca el Colegio José Arrieta y agrega a tu hijo/a a la lista." },
  { icon: School,        num: 3, label: "Conoce el colegio",       desc: "Agenda una visita para conocer las instalaciones y el equipo docente." },
  { icon: Bell,          num: 4, label: "Espera la notificación",  desc: "Recibirás una notificación oficial con el resultado del proceso." },
  { icon: PartyPopper,   num: 5, label: "¡Bienvenido/a!",          desc: "Completa la matrícula y sé parte de nuestra comunidad." },
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
  const [lightbox, setLightbox] = useState(null); // index o null

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

      <PageHero
        img="https://images.unsplash.com/photo-1588072432836-e10032774350?auto=format&fit=crop&w=1920&q=80"
        badge="Admisión 2026 · Inscripciones abiertas"
        title="Postula al Colegio"
        highlight="José Arrieta"
        subtitle="Queremos acompañarte en una decisión importante para el futuro de tu hijo/a."
      />

      {/* ── ¿Por qué elegirnos? + Vacantes ──────────────────────────── */}
      <section className="py-20">
        <div className="container-main grid gap-6 lg:grid-cols-3">
          <motion.article
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="rounded-2xl border border-slate-200 bg-white p-6 shadow-soft lg:col-span-2"
          >
            <SectionTitle
              center={false}
              eyebrow="Nuestra propuesta"
              title="¿Por qué elegirnos?"
              subtitle="Una experiencia educativa integral que combina resultados académicos y bienestar."
            />
            <ul className="space-y-3">
              {razones.map((r) => (
                <li key={r} className="flex items-start gap-3 text-slate-700">
                  <CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0 text-primary" />
                  <span className="text-sm leading-relaxed">{r}</span>
                </li>
              ))}
            </ul>
          </motion.article>

          <motion.article
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="rounded-2xl border border-slate-200 bg-white p-6 shadow-soft"
          >
            <h2 className="font-heading text-2xl font-semibold text-primary">Vacantes disponibles</h2>
            <ul className="mt-4 space-y-2 text-slate-700">
              {["Pre-Kinder", "Kinder", "1° a 8° Básico"].map((n) => (
                <li key={n} className="flex items-center gap-2 text-sm">
                  <span className="h-2 w-2 rounded-full bg-secondary" />
                  {n}
                </li>
              ))}
            </ul>
            <div className="mt-6 space-y-3 border-t border-slate-100 pt-6">
              <p className="flex items-center gap-2 text-sm text-slate-700">
                <MessageCircle className="h-4 w-4 text-[#25D366]" />
                <a
                  href="https://wa.me/56988936631?text=Hola%2C%20me%20interesa%20información%20sobre%20la%20admisión%202026"
                  target="_blank"
                  rel="noreferrer"
                  className="font-semibold text-[#25D366] hover:underline"
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
          </motion.article>
        </div>
      </section>

      {/* ── 5 Pasos ──────────────────────────────────────────────────── */}
      <section className="bg-bgsoft py-20">
        <div className="container-main">
          <SectionTitle
            eyebrow="Proceso de admisión"
            title="Tu camino en 5 pasos"
            subtitle="La inscripción oficial se realiza a través del sistema MINEDUC."
          />
          <div className="grid gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5">
            {pasos.map((paso, i) => {
              const Icon = paso.icon;
              return (
                <motion.article
                  key={paso.label}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.08 }}
                  className="relative rounded-2xl border border-primary/15 bg-white p-5 text-center shadow-soft"
                >
                  {/* Número */}
                  <div className="absolute -top-3 left-1/2 -translate-x-1/2">
                    <span className="flex h-6 w-6 items-center justify-center rounded-full bg-secondary text-xs font-extrabold text-primary shadow">
                      {paso.num}
                    </span>
                  </div>
                  <div className="mt-3 flex justify-center">
                    <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-primary/10">
                      <Icon className="h-6 w-6 text-primary" />
                    </div>
                  </div>
                  <p className="mt-3 font-heading text-sm font-bold text-primary">{paso.label}</p>
                  <p className="mt-1 text-xs leading-relaxed text-slate-500">{paso.desc}</p>
                </motion.article>
              );
            })}
          </div>
        </div>
      </section>

      {/* ── Mensualidad + Uniforme ───────────────────────────────────── */}
      <section className="py-20">
        <div className="container-main grid gap-6 lg:grid-cols-2">
          <motion.article
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="rounded-2xl border border-slate-200 bg-white p-6 shadow-soft"
          >
            <div className="mb-4 flex items-center gap-3">
              <div className="inline-flex rounded-xl bg-primary/10 p-3">
                <CreditCard className="h-5 w-5 text-primary" />
              </div>
              <h2 className="font-heading text-2xl font-semibold text-primary">Mensualidad 2026</h2>
            </div>
            <p className="mb-4 text-sm leading-relaxed text-slate-600">
              El Colegio José Arrieta opera bajo el sistema de financiamiento compartido. Los valores son
              reajustados anualmente según normativa MINEDUC.
            </p>
            <div className="space-y-3">
              <div className="flex flex-wrap items-center justify-between gap-2 rounded-xl bg-primary/5 border border-primary/10 px-4 py-3 text-sm">
                <span className="font-medium text-slate-700">Pre-Kínder a 8° Básico</span>
                <span className="text-lg font-extrabold text-primary">$36.465</span>
              </div>
              <div className="flex flex-wrap items-center justify-between gap-2 rounded-xl bg-slate-50 px-4 py-3 text-sm">
                <span className="font-medium text-slate-700">Centro de Padres — alumno nuevo</span>
                <span className="font-semibold text-slate-700">$15.000</span>
              </div>
              <div className="flex flex-wrap items-center justify-between gap-2 rounded-xl bg-slate-50 px-4 py-3 text-sm">
                <span className="font-medium text-slate-700">Centro de Padres — alumno antiguo</span>
                <span className="font-semibold text-slate-700">$10.000</span>
              </div>
              <div className="flex flex-wrap items-center justify-between gap-2 rounded-xl bg-emerald-50 px-4 py-3 text-sm">
                <span className="font-medium text-slate-700">Matrícula</span>
                <span className="font-bold text-emerald-600">Sin costo</span>
              </div>
            </div>
            <div className="mt-4 rounded-xl bg-slate-50 p-3 text-xs text-slate-500 space-y-0.5">
              <p className="font-semibold text-slate-600">Transferencia electrónica:</p>
              <p>Corporación Educacional José Arrieta</p>
              <p>RUT 65.143.616-8 · Banco Chile</p>
              <p>Cta. Cte. 1510418507</p>
              <p className="mt-1 text-slate-400">Indicar nombre y curso del estudiante</p>
            </div>
          </motion.article>

          <motion.article
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="rounded-2xl border border-slate-200 bg-white p-6 shadow-soft"
          >
            <div className="mb-4 flex items-center gap-3">
              <div className="inline-flex rounded-xl bg-secondary/20 p-3">
                <Shirt className="h-5 w-5 text-secondary" />
              </div>
              <h2 className="font-heading text-2xl font-semibold text-primary">Uniforme Escolar</h2>
            </div>
            <p className="mb-4 text-sm leading-relaxed text-slate-600">
              El uso del uniforme es obligatorio. Contribuye a la identidad, el respeto y la convivencia escolar.
            </p>

            {/* Miniaturas — click abre lightbox */}
            <div className="mb-5 grid grid-cols-2 gap-2 sm:grid-cols-3">
              {uniformeImages.map((img, i) => (
                <button
                  key={i}
                  onClick={() => setLightbox(i)}
                  aria-label={`Ver ${img.label}`}
                  className="group relative overflow-hidden rounded-xl border border-slate-200 bg-slate-50"
                >
                  <img
                    src={img.src}
                    alt={img.label}
                    className="h-24 w-full object-cover transition duration-300 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 flex items-center justify-center bg-primary/0 transition group-hover:bg-primary/30">
                    <ZoomIn className="h-5 w-5 text-white opacity-0 transition group-hover:opacity-100" />
                  </div>
                  <p className="px-1 py-1.5 text-center text-[10px] font-medium leading-tight text-slate-600">
                    {img.label}
                  </p>
                </button>
              ))}
            </div>

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
          </motion.article>
        </div>
      </section>

      {/* ── Formulario de visita ─────────────────────────────────────── */}
      <section className="bg-bgsoft py-20">
        <div className="container-main">
          <div className="mx-auto max-w-2xl">
            <SectionTitle
              eyebrow="Agenda una visita"
              title="¿Quieres conocer el colegio?"
              subtitle="Completa el formulario y te contactamos por WhatsApp para coordinar tu visita sin compromiso."
            />
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="rounded-2xl border border-slate-200 bg-white p-6 shadow-soft"
            >
              <FormVisita />
            </motion.div>
          </div>
        </div>
      </section>

      {/* ── Lightbox ─────────────────────────────────────────────────── */}
      <AnimatePresence>
        {lightbox !== null && (
          <Lightbox
            images={uniformeImages}
            startIndex={lightbox}
            onClose={() => setLightbox(null)}
          />
        )}
      </AnimatePresence>

      {/* ── Banner MINEDUC ───────────────────────────────────────────── */}
      <section className="py-20">
        <div className="container-main">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="overflow-hidden rounded-3xl bg-primary text-white shadow-soft"
          >
            <div className="relative px-8 py-12 sm:px-12">
              <div className="absolute -right-12 -top-12 h-56 w-56 rounded-full bg-white/5" />
              <div className="absolute -bottom-16 -left-8 h-64 w-64 rounded-full bg-secondary/10" />
              <div className="relative z-10 flex flex-col items-start gap-8 lg:flex-row lg:items-center lg:justify-between">
                <div className="max-w-xl">
                  <span className="inline-flex rounded-full bg-secondary px-4 py-1 text-xs font-bold uppercase tracking-wider text-primary">
                    Inscripción oficial
                  </span>
                  <h2 className="mt-4 font-heading text-3xl font-extrabold sm:text-4xl">
                    Anótate en la Lista — MINEDUC
                  </h2>
                  <p className="mt-3 text-sm leading-relaxed text-white/80">
                    La inscripción de vacantes se realiza exclusivamente a través del sistema oficial del
                    Ministerio de Educación. Regístrate, busca el Colegio José Arrieta y anótate en la lista.
                  </p>
                </div>
                <a
                  href="https://registropublicodigital.mineduc.gob.cl/rpd-app-registro-apoderado/login"
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex shrink-0 items-center gap-2 rounded-full bg-secondary px-8 py-4 text-sm font-bold text-primary shadow-lg transition hover:bg-secondaryHover"
                  onClick={() => trackPostulacionClick("boton_mineduc")}
                >
                  Ir a MINEDUC
                  <ExternalLink className="h-4 w-4" />
                </a>
              </div>
            </div>
          </motion.div>
        </div>
      </section>
    </>
  );
}

export default Admision;
