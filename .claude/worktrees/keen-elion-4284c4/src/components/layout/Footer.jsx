import { Facebook, Instagram, Youtube, MapPin, Phone, Mail, Clock } from "lucide-react";
import { Link } from "react-router-dom";

const quickLinks = [
  { label: "Inicio", to: "/" },
  { label: "Admisión 2026", to: "/admision" },
  { label: "Noticias", to: "/noticias" },
  { label: "Contacto", to: "/contacto" },
];

function Footer() {
  return (
    <footer className="mt-16 bg-primary text-white">
      <div className="container-main grid gap-10 py-14 md:grid-cols-3">
        <section>
          <div className="flex items-center gap-3">
            <img
              src="https://colegiojosearrieta.cl/wp-content/uploads/2023/05/favicon-colegiojosearrieta.png"
              alt="Escudo Colegio José Arrieta"
              className="h-12 w-12 rounded-full bg-white p-1"
            />
            <h3 className="font-heading text-xl font-bold">Colegio José Arrieta</h3>
          </div>
          <p className="mt-4 max-w-sm text-sm text-slate-200">
            Educación integral en La Reina, con foco en excelencia académica, formación valórica y
            desarrollo socioemocional.
          </p>
          <div className="mt-5 flex items-center gap-3">
            <a
              href="https://www.instagram.com/colegioarrieta/"
              target="_blank"
              rel="noreferrer"
              aria-label="Instagram"
              className="rounded-full bg-white/15 p-2 transition hover:bg-secondary"
            >
              <Instagram className="h-4 w-4" />
            </a>
            <a
              href="http://facebook.com/colegiojosearrieta"
              target="_blank"
              rel="noreferrer"
              aria-label="Facebook"
              className="rounded-full bg-white/15 p-2 transition hover:bg-secondary"
            >
              <Facebook className="h-4 w-4" />
            </a>
            <a
              href="https://www.youtube.com/channel/UCVtQzc0st6Hs0y1s1qPA5Ew"
              target="_blank"
              rel="noreferrer"
              aria-label="YouTube"
              className="rounded-full bg-white/15 p-2 transition hover:bg-secondary"
            >
              <Youtube className="h-4 w-4" />
            </a>
          </div>
        </section>

        <section>
          <h3 className="font-heading text-xl font-bold">Enlaces</h3>
          <ul className="mt-4 space-y-2 text-sm">
            {quickLinks.map((item) => (
              <li key={item.to}>
                <Link className="text-slate-200 transition hover:text-secondary" to={item.to}>
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </section>

        <section>
          <h3 className="font-heading text-xl font-bold">Contacto</h3>
          <ul className="mt-4 space-y-3 text-sm text-slate-200">
            <li className="flex gap-2">
              <MapPin className="mt-0.5 h-4 w-4 shrink-0" />
              <span>Av. José Arrieta 6870, La Reina, Santiago</span>
            </li>
            <li className="flex gap-2">
              <MapPin className="mt-0.5 h-4 w-4 shrink-0" />
              <span>Januario Espinoza 7131, La Reina, Santiago</span>
            </li>
            <li className="flex gap-2">
              <Phone className="mt-0.5 h-4 w-4 shrink-0" />
              <span>+56222791863 / +56222784685</span>
            </li>
            <li className="flex gap-2">
              <Mail className="mt-0.5 h-4 w-4 shrink-0" />
              <span>colegio@colegiojosearrieta.cl</span>
            </li>
            <li className="flex gap-2">
              <Clock className="mt-0.5 h-4 w-4 shrink-0" />
              <span>Lunes a Viernes 08:20-12:30 y 14:00-18:00 hrs</span>
            </li>
          </ul>
        </section>
      </div>
      <div className="border-t border-white/10 py-4 text-center text-xs text-slate-300">
        © {new Date().getFullYear()} Colegio José Arrieta. Todos los derechos reservados.
      </div>
    </footer>
  );
}

export default Footer;
