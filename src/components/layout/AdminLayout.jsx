import { NavLink, Outlet, useNavigate } from "react-router-dom";
import { LogOut, Newspaper, LayoutDashboard, Star, Images, Youtube, FolderOpen } from "lucide-react";
import { useAuth } from "../../context/AuthContext";

const navItems = [
  { to: "/admin/noticias", label: "Noticias", icon: Newspaper },
  { to: "/admin/testimonios", label: "Testimonios", icon: Star },
  { to: "/admin/albums", label: "Galería", icon: Images },
  { to: "/admin/videos", label: "Videos", icon: Youtube },
  { to: "/admin/documentos", label: "Documentos", icon: FolderOpen },
];

function AdminLayout() {
  const { logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = async () => {
    await logout();
    navigate("/admin/login", { replace: true });
  };

  return (
    <div className="min-h-screen bg-slate-100">
      {/* Sidebar fijo — nunca scrollea */}
      <aside className="fixed inset-y-0 left-0 z-20 flex w-60 flex-col bg-primary text-white">
        <div className="flex items-center gap-3 px-5 py-5 border-b border-white/10">
          <LayoutDashboard className="h-5 w-5 shrink-0 text-secondary" />
          <span className="font-heading text-sm font-bold leading-tight">
            Panel Admin<br />
            <span className="text-xs font-normal text-slate-300">José Arrieta</span>
          </span>
        </div>

        <nav className="flex-1 px-3 py-4 space-y-1">
          {navItems.map(({ to, label, icon: Icon }) => (
            <NavLink
              key={to}
              to={to}
              className={({ isActive }) =>
                `flex items-center gap-3 rounded-xl px-4 py-2.5 text-sm font-medium transition ${
                  isActive
                    ? "bg-white/15 text-white"
                    : "text-slate-300 hover:bg-white/10 hover:text-white"
                }`
              }
            >
              <Icon className="h-4 w-4 shrink-0" />
              {label}
            </NavLink>
          ))}
        </nav>

        <div className="px-3 py-4 border-t border-white/10">
          <button
            type="button"
            onClick={handleLogout}
            className="flex w-full items-center gap-3 rounded-xl px-4 py-2.5 text-sm font-medium text-slate-300 transition hover:bg-white/10 hover:text-white"
          >
            <LogOut className="h-4 w-4 shrink-0" />
            Cerrar sesión
          </button>
        </div>
      </aside>

      {/* Contenido principal — con margen izquierdo para el sidebar */}
      <main className="ml-60 p-8">
        <Outlet />
      </main>
    </div>
  );
}

export default AdminLayout;
