import { Navigate, Outlet, useLocation } from "react-router-dom";
import { useAuth } from "../../context/Auth";

export default function RequireAuth() {
  const { isAuth, loading } = useAuth();
  const loc = useLocation();

  if (loading) return null; // o un spinner accesible si prefieres
  if (!isAuth) return <Navigate to="/auth/login" replace state={{ from: loc.pathname }} />;
  return <Outlet />;
}
