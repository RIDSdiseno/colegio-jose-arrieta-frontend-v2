import { useEffect, useState } from "react";
import { Link, NavLink, useLocation } from "react-router-dom";
import { Menu, X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import useScrollNavbar from "../../hooks/useScrollNavbar";
import Button from "../ui/Button";

const navItems = [
  { label: "Inicio", to: "/" },
  { label: "¿Por qué elegirnos?", to: "/por-que-elegirnos" },
  { label: "Proyecto Educativo", to: "/proyecto-educativo" },
  { label: "Admisión 2026", to: "/admision" },
  { label: "Vida Escolar", to: "/vida-escolar" },
  { label: "Noticias", to: "/noticias" },
  { label: "Contacto", to: "/contacto" },
];

const logoTransparent = "https://colegiojosearrieta.cl/wp-content/uploads/2018/03/logo-web03.png";
const logoSolid = "https://colegiojosearrieta.cl/wp-content/uploads/2019/03/logo-web04.png";

function Navbar() {
  const [open, setOpen] = useState(false);
  const location = useLocation();
  const isHome = location.pathname === "/";
  const { scrolled: scrolledByScroll, visible } = useScrollNavbar(50);
  const scrolled = !isHome || scrolledByScroll || open;

  useEffect(() => {
    setOpen(false);
  }, [location.pathname]);

  return (
    <header
      className={`sticky top-0 z-50 bg-primary shadow-lg transition-transform duration-300 ${
        visible ? "translate-y-0" : "-translate-y-full"
      }`}
    >
      <nav className="container-main flex h-20 items-center justify-between">
        <Link to="/" className="flex items-center">
          <img
            src={logoTransparent}
            alt="Colegio José Arrieta"
            className="hidden h-12 w-auto object-contain lg:block"
          />
          <img
            src={logoTransparent}
            alt="Colegio José Arrieta"
            className="h-10 w-auto object-contain lg:hidden"
          />
        </Link>

        <div className="hidden items-center gap-5 lg:flex">
          {navItems.map((item) => (
            <NavLink
              key={item.to}
              to={item.to}
              className={({ isActive }) =>
                isActive
                  ? "text-sm font-semibold text-secondary"
                  : "text-sm font-medium text-slate-100 transition hover:text-white"
              }
            >
              {item.label}
            </NavLink>
          ))}
          <Button to="/admision" variant="secondary" className="px-5 py-2.5">
            Postula 2026
          </Button>
        </div>

        <button
          type="button"
          aria-label="Abrir menu"
          onClick={() => setOpen((prev) => !prev)}
          className="grid h-10 w-10 place-content-center rounded-lg border border-white/40 bg-white/10 text-white transition hover:bg-white/20 lg:hidden"
        >
          {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </button>
      </nav>

      <AnimatePresence>
        {open ? (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="border-t border-white/10 bg-primary lg:hidden"
          >
            <div className="container-main flex flex-col gap-3 py-4">
              {navItems.map((item) => (
                <NavLink
                  key={item.to}
                  to={item.to}
                  className={({ isActive }) =>
                    `rounded-lg px-3 py-2 text-sm font-medium ${
                      isActive ? "bg-white/15 text-secondary" : "text-slate-100 hover:bg-white/10 hover:text-white"
                    }`
                  }
                >
                  {item.label}
                </NavLink>
              ))}
              <Button to="/admision" variant="secondary" className="mt-2">
                Postula 2026
              </Button>
            </div>
          </motion.div>
        ) : null}
      </AnimatePresence>
    </header>
  );
}

export default Navbar;
