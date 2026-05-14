import { Navigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";

function ProtectedRoute({ children }) {
  const { session, loading } = useAuth();

  if (loading) return null; // Espera confirmación de sesión antes de redirigir
  if (!session) return <Navigate to="/admin/login" replace />;
  return children;
}

export default ProtectedRoute;
