import { Facebook, Instagram, Youtube, MapPin, Phone, Mail, Clock, ExternalLink } from "lucide-react";
import { Link } from "react-router-dom";

const infoLinks = [
  { label: "Colegios en La Reina", to: "/colegio-la-reina" },
  { label: "Colegio Subvencionado", to: "/colegio-subvencionado-la-reina" },
  { label: "Inglés desde Pre-Kínder", to: "/colegio-ingles-prekinder-santiago" },
  { label: "Educación Integral", to: "/colegio-educacion-integral-la-reina" },
];

const navLinks = [
  { label: "Inicio", to: "/" },
  { label: "¿Por qué elegirnos?", to: "/por-que-elegirnos" },
  { label: "Proyecto Educativo", to: "/proyecto-educativo" },
  { label: "Vida Escolar", to: "/vida-escolar" },
  { label: "Documentos", to: "/documentos" },
  { label: "Noticias", to: "/noticias" },
];

const admisionLinks = [
  { label: "Admisión 2026", to: "/admision" },
  { label: "Contacto", to: "/contacto" },
  {
    label: "Postula 2026",
    href: "https://colegiojosearrieta.alexiaeducl.com/ACWeb/Paginas/Publicas/FormularioMatriculacion.aspx?token=N6NoDSk6C3bTpBN0gua7Ag==&Ejercicio=2026#no-back-button",
    external: true,
  },
  {
    label: "Inscripción MINEDUC",
    href: "https://registropublicodigital.mineduc.gob.cl/rpd-app-registro-apoderado/login",
    external: true,
  },
  {
    label: "Calificaciones en línea",
    href: "https://colegiojosearrieta.alexiaeducl.com",
    external: true,
  },
  {
    label: "Biblioteca en línea",
    href: "/biblioteca",
    external: true,
  },
];

function Footer() {
  return (
    <footer className="mt-16 bg-primary text-white">
      {/* pr-12 en md evita que los botones flotantes (fixed right-0) tapen la columna derecha */}
      <div className="container-main grid gap-10 py-14 md:grid-cols-2 md:pr-12 lg:grid-cols-4 lg:pr-8">

        {/* Col 1 — Logo + descripción + redes */}
        <section>
          <div className="flex items-center gap-3">
            <img
              src="/images/logo-web04.png"
              alt="Escudo Colegio José Arrieta"
              width={48}
              height={48}
              className="h-12 w-12 rounded-full bg-white p-1"
            />
            <h3 className="font-heading text-lg font-bold leading-tight">
              Colegio<br />José Arrieta
            </h3>
          </div>
          <p className="mt-4 text-sm leading-relaxed text-white/70">
            Educación integral en La Reina, con foco en excelencia académica,
            formación valórica y desarrollo socioemocional desde 1973.
          </p>
          <div className="mt-5 flex items-center gap-3">
            {[
              { href: "https://www.instagram.com/colegioarrieta/", icon: Instagram, label: "Instagram" },
              { href: "https://www.facebook.com/colegiojosearrieta", icon: Facebook, label: "Facebook" },
              { href: "https://www.youtube.com/@colegioarrieta", icon: Youtube, label: "YouTube" },
            ].map(({ href, icon: Icon, label }) => (
              <a key={label} href={href} target="_blank" rel="noreferrer" aria-label={label}
                className="rounded-full bg-white/10 p-3 transition hover:bg-secondary hover:text-primary">
                <Icon className="h-4 w-4" />
              </a>
            ))}
          </div>
        </section>

        {/* Col 2 — Navegación + Información SEO */}
        <section>
          <h3 className="mb-4 font-heading text-sm font-bold uppercase tracking-wider text-white/50">
            El Colegio
          </h3>
          <ul className="space-y-2.5 text-sm">
            {navLinks.map((item) => (
              <li key={item.to}>
                <Link to={item.to} className="text-white/75 transition hover:text-secondary">
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
          <h3 className="mb-3 mt-6 font-heading text-sm font-bold uppercase tracking-wider text-white/50">
            Información
          </h3>
          <ul className="space-y-2.5 text-sm">
            {infoLinks.map((item) => (
              <li key={item.to}>
                <Link to={item.to} className="text-white/75 transition hover:text-secondary">
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </section>

        {/* Col 3 — Admisión y accesos */}
        <section>
          <h3 className="mb-4 font-heading text-sm font-bold uppercase tracking-wider text-white/50">
            Admisión y Accesos
          </h3>
          <ul className="space-y-2.5 text-sm">
            {admisionLinks.map((item) =>
              item.external ? (
                <li key={item.label}>
                  <a href={item.href} target="_blank" rel="noreferrer"
                    className="inline-flex items-center gap-1 text-white/75 transition hover:text-secondary">
                    {item.label}
                    <ExternalLink className="h-3 w-3" />
                  </a>
                </li>
              ) : (
                <li key={item.label}>
                  <Link to={item.to} className="text-white/75 transition hover:text-secondary">
                    {item.label}
                  </Link>
                </li>
              )
            )}
          </ul>
        </section>

        {/* Col 4 — Contacto */}
        <section>
          <h3 className="mb-4 font-heading text-sm font-bold uppercase tracking-wider text-white/50">
            Contacto
          </h3>
          <ul className="space-y-3 text-sm text-white/75">
            <li className="flex gap-2">
              <MapPin className="mt-0.5 h-4 w-4 shrink-0 text-secondary" />
              <span>Av. José Arrieta 6870, La Reina</span>
            </li>
            <li className="flex gap-2">
              <MapPin className="mt-0.5 h-4 w-4 shrink-0 text-secondary" />
              <span>Januario Espinoza 7131, La Reina</span>
            </li>
            <li className="flex gap-2">
              <Phone className="mt-0.5 h-4 w-4 shrink-0 text-secondary" />
              <div className="flex flex-col gap-0.5">
                <a href="tel:+56222791863" className="transition hover:text-secondary">+56 2 2279 1863</a>
                <a href="tel:+56222784685" className="transition hover:text-secondary">+56 2 2278 4685</a>
              </div>
            </li>
            <li className="flex gap-2">
              <Mail className="mt-0.5 h-4 w-4 shrink-0 text-secondary" />
              <a href="mailto:colegio@colegiojosearrieta.cl"
                className="transition hover:text-secondary">
                colegio@colegiojosearrieta.cl
              </a>
            </li>
            <li className="flex gap-2">
              <Clock className="mt-0.5 h-4 w-4 shrink-0 text-secondary" />
              <span>Lun–Vie 08:20–12:30 y 14:00–18:00</span>
            </li>
          </ul>
        </section>
      </div>

      {/* Badges de acreditación */}
      <div className="border-t border-white/10 py-6">
        <div className="container-main flex flex-col items-center gap-4 sm:flex-row sm:justify-between">
          <p className="text-xs font-semibold uppercase tracking-wider text-white/40">Respaldado por</p>
          <div className="flex flex-wrap items-center justify-center gap-4 sm:justify-end">
            {[
              { label: "MINEDUC", href: "https://www.mineduc.cl" },
              { label: "SEP", href: "https://sep.mineduc.cl" },
              { label: "JUNAEB", href: "https://www.junaeb.cl" },
            ].map(({ label, href }) => (
              <a
                key={label}
                href={href}
                target="_blank"
                rel="noreferrer"
                className="rounded-lg border border-white/15 bg-white/5 px-4 py-2 text-xs font-bold text-white/50 transition hover:border-white/30 hover:text-white/80"
              >
                {label}
              </a>
            ))}
          </div>
        </div>
      </div>

      {/* Barra inferior */}
      <div className="border-t border-white/10 py-5">
        <div className="container-main flex flex-col items-center justify-between gap-3 text-xs text-white/40 sm:flex-row">
          <span>© {new Date().getFullYear()} Colegio José Arrieta. Todos los derechos reservados.</span>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
