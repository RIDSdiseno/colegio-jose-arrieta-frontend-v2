import { Navigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";

function ProtectedRoute({ children }) {
  const { session, loading } = useAuth();

  if (loading) return (
    <div className="flex min-h-screen items-center justify-center">
      <div className="h-8 w-8 animate-spin rounded-full border-4 border-primary border-t-transparent" />
    </div>
  );
  if (!session) return <Navigate to="/admin/login" replace />;

  const role = session.user?.app_metadata?.role ?? session.user?.user_metadata?.role;
  if (role !== "admin") return <Navigate to="/" replace />;

  return children;
}

export default ProtectedRoute;
