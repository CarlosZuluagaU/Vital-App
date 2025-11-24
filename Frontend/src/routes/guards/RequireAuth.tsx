import React from "react";
import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "../../context/Auth";

export default function RequireAuth() {
  const { isAuthenticated, loading } = useAuth();

  // Mostrar loading mientras se verifica la autenticación
  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="fixed inset-0 pointer-events-none overflow-hidden -z-10">
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-accent/30 rounded-full blur-3xl animate-pulse" style={{ animationDuration: '3s' }}></div>
        </div>
        <div className="text-center animate-scaleIn">
          <span className="text-6xl mb-4 inline-block animate-bounce" style={{ animationDuration: '1.5s' }}>⏳</span>
          <p className="text-xl font-semibold text-accent" aria-live="polite">
            Verificando sesión...
          </p>
        </div>
      </div>
    );
  }

  // Si no está autenticado, redirigir a welcome
  if (!isAuthenticated) {
    return <Navigate to="/welcome" replace />;
  }

  // Si está autenticado, mostrar el contenido
  return <Outlet />;
}
