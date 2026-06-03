import { motion } from "framer-motion";
import { ArrowRight, MessageCircle } from "lucide-react";
import { Link } from "react-router-dom";

/**
 * CTASection — banda CTA full-width de fondo primario para páginas internas.
 * Props:
 *   title     : primera línea del heading
 *   highlight : palabra/frase en color secondary (segunda línea)
 *   subtitle  : párrafo descriptivo
 *   badge     : texto del badge superior (default: "Admisión 2026 abierta")
 */
function CTASection({
  title = "¿Listo para ser parte",
  highlight = "de nuestra comunidad?",
  subtitle = "Agenda una visita al colegio, conoce nuestros espacios y resuelve todas tus dudas sin compromiso.",
  badge = "Admisión 2026 abierta",
}) {
  return (
    <section className="relative overflow-hidden bg-primary py-24">
      {/* Decoración */}
      <div className="absolute -left-32 -top-32 h-96 w-96 rounded-full bg-white/5 blur-3xl" />
      <div className="absolute -bottom-20 -right-20 h-72 w-72 rounded-full bg-secondary/15 blur-2xl" />
      <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-secondary/40 to-transparent" />

      <div className="container-main relative z-10 text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <span className="inline-flex items-center gap-2 rounded-full bg-secondary/20 px-4 py-1.5 text-xs font-bold uppercase tracking-widest text-secondary">
            <span className="h-2 w-2 animate-ping rounded-full bg-secondary" />
            {badge}
          </span>

          <h2 className="mt-4 font-heading text-4xl font-black text-white sm:text-5xl">
            {title}<br />
            <span className="text-secondary">{highlight}</span>
          </h2>

          <p className="mx-auto mt-4 max-w-lg text-base text-white/70">{subtitle}</p>

          <div className="mt-8 flex flex-wrap justify-center gap-4">
            <Link
              to="/admision"
              className="inline-flex items-center gap-2 rounded-full bg-secondary px-8 py-4 text-sm font-bold text-primary shadow-lg transition hover:bg-secondaryHover"
            >
              Postula 2026
              <ArrowRight className="h-4 w-4" />
            </Link>
            <a
              href="https://wa.me/56988936631?text=Hola%2C%20me%20interesa%20información%20sobre%20la%20admisión%202026"
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-2 rounded-full border-2 border-white/30 bg-white/10 px-8 py-4 text-sm font-bold text-white transition hover:border-white/60 hover:bg-white/20"
            >
              <MessageCircle className="h-4 w-4" />
              Escribir por WhatsApp
            </a>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

export default CTASection;
