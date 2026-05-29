import { Navigate, useLocation } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";

function ProtectedRoute({ children }) {
  const { session, loading } = useAuth();
  const location = useLocation();

  if (loading) return (
    <div className="flex min-h-screen items-center justify-center">
      <div className="h-8 w-8 animate-spin rounded-full border-4 border-primary border-t-transparent" />
    </div>
  );
  if (!session) return <Navigate to="/admin/login" replace state={{ from: location.pathname }} />;

  const role = session.user?.app_metadata?.role;
  if (role !== "admin") return <Navigate to="/admin/login" replace state={{ error: "No tienes permiso para acceder al panel de administración." }} />;

  return children;
}

export default ProtectedRoute;
