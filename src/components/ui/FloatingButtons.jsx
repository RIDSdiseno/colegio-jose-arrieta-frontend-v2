import { GraduationCap, BookOpen, ClipboardCheck } from "lucide-react";
import { Link } from "react-router-dom";

const buttons = [
  {
    label: "Postula 2026",
    href: "/admision",
    icon: GraduationCap,
    bg: "bg-secondary",
    text: "text-primary",
    internal: true,
  },
  {
    label: "Calificaciones",
    href: "https://colegiojosearrieta.alexiaeducl.com",
    icon: ClipboardCheck,
    bg: "bg-primary",
    text: "text-white",
    internal: false,
  },
  {
    label: "Biblioteca",
    href: "http://colegioarrieta.ddns.net:83/", // TODO: migrar a HTTPS cuando el servidor tenga SSL
    icon: BookOpen,
    bg: "bg-primary",
    text: "text-white",
    internal: false,
  },
];

function FloatingButtons() {
  return (
    <div className="fixed right-0 top-1/2 z-40 -translate-y-1/2 flex flex-col gap-0.5">
      {buttons.map(({ label, href, icon: Icon, bg, text, internal }) => {
        const classes = `group flex items-center gap-2 ${bg} ${text} pl-3 pr-4 py-3.5 shadow-lg transition-all duration-200 hover:pr-6 cursor-pointer`;

        if (internal) {
          return (
            <Link key={label} to={href} className={classes} aria-label={label}>
              <Icon className="h-4 w-4 shrink-0" aria-hidden="true" />
              <span className="max-w-0 overflow-hidden whitespace-nowrap text-xs font-bold transition-all duration-200 group-hover:max-w-xs">
                {label}
              </span>
            </Link>
          );
        }

        return (
          <a key={label} href={href} target="_blank" rel="noreferrer" className={classes} aria-label={label}>
            <Icon className="h-4 w-4 shrink-0" aria-hidden="true" />
            <span className="max-w-0 overflow-hidden whitespace-nowrap text-xs font-bold transition-all duration-200 group-hover:max-w-xs">
              {label}
            </span>
          </a>
        );
      })}
    </div>
  );
}

export default FloatingButtons;
