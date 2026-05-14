import { useEffect, useState } from "react";
import { Link, NavLink, useLocation, useNavigate } from "react-router-dom";
import { Menu, X, MapPin, Search, Youtube, Instagram, Facebook, ExternalLink } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import useScrollNavbar from "../../hooks/useScrollNavbar";
import Button from "../ui/Button";

const navItems = [
  { label: "Inicio", to: "/" },
  { label: "¿Por qué elegirnos?", to: "/por-que-elegirnos" },
  { label: "Proyecto Educativo", to: "/proyecto-educativo" },
  { label: "Vida Escolar", to: "/vida-escolar" },
  { label: "Noticias", to: "/noticias" },
  { label: "Contacto", to: "/contacto" },
];

const logo = "https://colegiojosearrieta.cl/wp-content/uploads/2018/03/logo-web03.png";

function Topbar() {
  const [query, setQuery] = useState("");
  const navigate = useNavigate();

  function handleSearch(e) {
    e.preventDefault();
    if (query.trim()) {
      navigate(`/buscar?q=${encodeURIComponent(query.trim())}`);
      setQuery("");
    }
  }

  return (
    <div className="hidden bg-primaryHover lg:block">
      <div className="container-main flex h-9 items-center justify-between gap-6 text-xs text-white/80">

        {/* Izquierda — dirección */}
        <div className="flex items-center gap-1.5 shrink-0">
          <MapPin className="h-3.5 w-3.5 text-secondary" />
          <span>Av. José Arrieta 6870, La Reina</span>
        </div>

        {/* Derecha — buscador + redes + portal */}
        <div className="flex items-center gap-3 shrink-0">
          {/* Buscador */}
          <form onSubmit={handleSearch} className="flex items-center">
            <div className="flex items-center rounded-full border border-white/25 bg-white/15 px-3 py-1 gap-2 w-44">
              <input
                type="text"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Buscar en el sitio..."
                className="bg-transparent text-xs text-white placeholder-white/60 outline-none w-full"
              />
              <button
                type="submit"
                className="shrink-0 text-white/70 hover:text-white transition"
                aria-label="Buscar"
              >
                <Search className="h-3.5 w-3.5" />
              </button>
            </div>
          </form>

          <div className="h-3.5 w-px bg-white/20" />

          {/* Redes */}
          <a href="https://www.youtube.com/@colegioarrieta" target="_blank" rel="noreferrer" aria-label="YouTube" className="transition hover:text-white">
            <Youtube className="h-3.5 w-3.5" />
          </a>
          <a href="https://www.instagram.com/colegioarrieta/" target="_blank" rel="noreferrer" aria-label="Instagram" className="transition hover:text-white">
            <Instagram className="h-3.5 w-3.5" />
          </a>
          <a href="https://www.facebook.com/colegiojosearrieta" target="_blank" rel="noreferrer" aria-label="Facebook" className="transition hover:text-white">
            <Facebook className="h-3.5 w-3.5" />
          </a>

          <div className="h-3.5 w-px bg-white/20" />

          {/* Portal */}
          <a
            href="https://colegiojosearrieta.alexiaeducl.com"
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center gap-1 font-semibold uppercase tracking-wide transition hover:text-white"
          >
            <ExternalLink className="h-3 w-3" />
            IR AL PORTAL
          </a>
        </div>
      </div>
    </div>
  );
}

function Navbar() {
  const [open, setOpen] = useState(false);
  const location = useLocation();
  const { scrolled, visible } = useScrollNavbar(60);

  useEffect(() => {
    setOpen(false);
  }, [location.pathname]);

  return (
    <>
      {/* Topbar */}
      <div className={`sticky top-0 z-50 transition-all duration-300 ${visible ? "translate-y-0" : "-translate-y-full"}`}>
        <Topbar />

        {/* Navbar principal */}
        <header className={`transition-all duration-300 ${scrolled ? "bg-white shadow-md" : "bg-primary shadow-md"}`}>
          <nav className="container-main flex h-20 items-center justify-between">
            {/* Logo */}
            <Link to="/" className="flex items-center">
              <img
                src={logo}
                alt="Colegio José Arrieta"
                className="h-12 w-auto object-contain"
              />
            </Link>

            {/* Links desktop */}
            <div className="hidden items-center gap-0.5 lg:flex">
              {navItems.map((item) => (
                <NavLink
                  key={item.to}
                  to={item.to}
                  className={({ isActive }) =>
                    isActive
                      ? `whitespace-nowrap rounded-lg px-2.5 py-1.5 text-xs font-semibold text-secondary`
                      : `whitespace-nowrap rounded-lg px-2.5 py-1.5 text-xs font-medium transition ${scrolled ? "text-slate-700 hover:text-primary" : "text-white/90 hover:text-white"}`
                  }
                >
                  {item.label}
                </NavLink>
              ))}
            </div>

            {/* CTA desktop */}
            <div className="hidden lg:block">
              <Button to="/admision" variant="secondary" className="whitespace-nowrap px-5 py-2.5 text-xs font-bold">
                Postula 2026
              </Button>
            </div>

            {/* Hamburguesa mobile */}
            <button
              type="button"
              aria-label="Abrir menu"
              onClick={() => setOpen((prev) => !prev)}
              className={`grid h-11 w-11 place-content-center rounded-lg border transition lg:hidden ${scrolled ? "border-slate-200 text-slate-700 hover:bg-slate-50" : "border-white/30 bg-white/10 text-white hover:bg-white/20"}`}
            >
              {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </button>
          </nav>

          {/* Menú mobile */}
          <AnimatePresence>
            {open && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: "auto" }}
                exit={{ opacity: 0, height: 0 }}
                className="border-t border-white/10 bg-primary lg:hidden"
              >
                <div className="container-main flex flex-col gap-1 py-4">
                  {navItems.map((item) => (
                    <NavLink
                      key={item.to}
                      to={item.to}
                      className={({ isActive }) =>
                        `rounded-lg px-4 py-2.5 text-sm font-medium ${
                          isActive
                            ? "bg-white/15 text-secondary"
                            : "text-white/90 hover:bg-white/10 hover:text-white"
                        }`
                      }
                    >
                      {item.label}
                    </NavLink>
                  ))}
                  <div className="mt-2 border-t border-slate-100 pt-3">
                    <Button to="/admision" variant="primary" className="w-full">
                      Postula 2026
                    </Button>
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </header>
      </div>
    </>
  );
}

export default Navbar;
