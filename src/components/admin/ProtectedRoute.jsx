import { Navigate, useLocation } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";

// La verificación de rol se realiza en el backend (requireAdmin middleware).
// Aquí solo comprobamos que exista sesión activa — nunca confiar en app_metadata
// del JWT del cliente para decisiones de autorización.
function ProtectedRoute({ children }) {
  const { session, loading } = useAuth();
  const location = useLocation();

  if (loading) return (
    <div className="flex min-h-screen items-center justify-center">
      <div className="h-8 w-8 animate-spin rounded-full border-4 border-primary border-t-transparent" />
    </div>
  );

  if (!session) return <Navigate to="/admin/login" replace state={{ from: location.pathname }} />;

  return children;
}

export default ProtectedRoute;
