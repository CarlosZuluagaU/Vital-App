import { Navigate, Outlet } from "react-router-dom";
import { usePrefs } from "../../context/Preferences";

export const RequireProfile = () => {
  const { profile } = usePrefs();
  if (!profile) return <Navigate to="/welcome" replace />;
  return <Outlet />;
};