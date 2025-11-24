import { useEffect } from "react";
import { fireMascotCue } from "../components/pet/VitaAssistant";
import { A11yButton } from "../components/a11y/A11yButton";
import GoogleLoginButton from "../components/GoogleLoginButton";
import { usePrefs } from "../context/Preferences";
import { useNavigate } from "react-router-dom";
import { setAuthToken } from "../hooks/useApi";
import { useAuth } from "../context/Auth";

export default function Welcome() {
  const nav = useNavigate();
  const { setProfile } = usePrefs();
  const { refreshMe } = useAuth();

  const continuarInvitado = () => {
    setProfile({ name: "Invitado", level: "BASICO" });
    nav("/", { replace: true });
  };

  // Función temporal para desarrollo - simular login
  const loginDesarrollo = async () => {
    try {
      // Simular token JWT (en un entorno real, esto vendría del backend)
      const fakeToken = "eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJ1c3VhcmlvQGV4YW1wbGUuY29tIiwiaWF0IjoxNjk5OTcwNDAwLCJleHAiOjE3MDA1NzUyMDB9.fake-development-token";
      
      // Guardar token
      setAuthToken(fakeToken);
      
      // Simular datos de usuario
      localStorage.setItem('dev:user', JSON.stringify({
        id: 1,
        name: "Usuario de Prueba",
        email: "usuario@example.com",
        profilePicture: null,
        fitnessLevel: "INTERMEDIATE",
        preferredLocation: "HOME"
      }));
      
      await refreshMe();
      nav("/configuracion", { replace: true });
    } catch (error) {
      console.error("Error en login de desarrollo:", error);
      alert("Error al hacer login de desarrollo");
    }
  };

  useEffect(() => {
    fireMascotCue({ mood: "welcome", msg: "¡Hola! ¿Listo para moverte hoy? 🐾", ms: 4000 });
  }, []);

  const abrirA11y = () => nav("/onboarding?step=2");

  return (
    <main className="min-h-screen grid place-items-center p-4 relative overflow-hidden">
      {/* Fondo animado con gradientes */}
      <div className="absolute inset-0 bg-gradient-to-br from-[var(--accent)]/5 via-transparent to-[var(--accent)]/10 animate-fadeIn" />
      <div className="absolute top-20 right-20 w-64 h-64 bg-[var(--accent)]/10 rounded-full blur-3xl animate-pulse" style={{ animationDuration: '4s' }} />
      <div className="absolute bottom-20 left-20 w-96 h-96 bg-[var(--accent)]/5 rounded-full blur-3xl animate-pulse" style={{ animationDuration: '6s', animationDelay: '1s' }} />
      
      <section className="relative z-10 w-full max-w-md rounded-2xl bg-[var(--card)] p-8 shadow-2xl border-2 border-[var(--accent)]/20 animate-scaleIn backdrop-blur-sm">
        {/* Ícono con efecto glow */}
        <div className="mx-auto mb-6 grid place-items-center animate-bounce" style={{ animationDuration: '3s' }}>
          <div className="relative h-20 w-20 rounded-full grid place-items-center bg-gradient-to-br from-[var(--accent)]/20 to-[var(--accent)]/10 shadow-lg">
            <span aria-hidden className="text-4xl">💙</span>
            <div className="absolute inset-0 rounded-full bg-[var(--accent)]/20 blur-xl animate-pulse" />
          </div>
        </div>

        {/* Título con gradiente */}
        <h1 className="text-center text-2xl font-bold mb-3 text-[var(--fg)] animate-slideInUp">
          <span className="bg-gradient-to-r from-[var(--accent)] to-[var(--fg)] bg-clip-text text-transparent">
            ¡Bienvenido a VitalApp!
          </span>
        </h1>
        <p className="text-center text-sm text-[var(--fg-muted)] mb-8 animate-slideInUp" style={{ animationDelay: '0.1s', animationFillMode: 'backwards' }}>
          Tu compañero personal para mantenerte activo y saludable.
          Ejercicios diseñados especialmente para adultos mayores. ✨
        </p>

        {/* Botón de Google OAuth con animación */}
        <div className="mb-4 animate-slideInUp" style={{ animationDelay: '0.2s', animationFillMode: 'backwards' }}>
          <GoogleLoginButton variant="themed" className="w-full transform hover:scale-105 transition-all duration-300 shadow-lg hover:shadow-xl" />
        </div>

        {/* Divisor elegante */}
        <div className="relative my-6 animate-slideInUp" style={{ animationDelay: '0.3s', animationFillMode: 'backwards' }}>
          <div className="absolute inset-0 flex items-center">
            <div className="w-full border-t-2 border-[var(--border)]"></div>
          </div>
          <div className="relative flex justify-center text-xs uppercase">
            <span className="bg-[var(--card)] px-3 py-1 text-[var(--fg-muted)] font-semibold rounded-full">O continúa con</span>
          </div>
        </div>

        {/* Botones con efectos mejorados */}
        <div className="space-y-3">
          <div className="animate-slideInUp" style={{ animationDelay: '0.4s', animationFillMode: 'backwards' }}>
            <A11yButton 
              className="w-full transform hover:scale-105 transition-all duration-300 shadow-lg hover:shadow-xl hover:shadow-[var(--accent)]/30" 
              onClick={() => nav("/onboarding")}
            >
              <span className="flex items-center justify-center gap-2">
                <span>✨</span>
                <span>Crear Mi Perfil</span>
              </span>
            </A11yButton>
          </div>

          <button
            onClick={continuarInvitado}
            className="w-full rounded-xl px-4 py-3 min-h-[44px] border-2 border-[var(--border)] bg-[var(--card-elevated)] text-[var(--fg)] hover:border-[var(--accent)]/50 hover:bg-[var(--accent)]/5 transform hover:scale-105 transition-all duration-300 focus-visible:outline focus-visible:ring-2 focus-visible:ring-[var(--accent)] shadow-md hover:shadow-lg animate-slideInUp"
            style={{ animationDelay: '0.5s', animationFillMode: 'backwards' }}
          >
            <span className="flex items-center justify-center gap-2">
              <span>👤</span>
              <span>Continuar como Invitado</span>
            </span>
          </button>

          {/* Botón temporal para desarrollo */}
          <button
            onClick={loginDesarrollo}
            className="w-full mt-3 rounded-xl px-4 py-3 min-h-[44px] border-2 border-orange-500/50 bg-orange-500/10 text-orange-600 hover:border-orange-500 hover:bg-orange-500/20 transform hover:scale-105 transition-all duration-300 focus-visible:outline focus-visible:ring-2 focus-visible:ring-orange-500 shadow-md hover:shadow-lg animate-slideInUp"
            style={{ animationDelay: '0.55s', animationFillMode: 'backwards' }}
          >
            <span className="flex items-center justify-center gap-2">
              <span>🔧</span>
              <span className="text-sm font-semibold">Login de Desarrollo</span>
            </span>
          </button>
        </div>

        {/* Sección de accesibilidad con animación */}
        <div className="mt-6 animate-slideInUp" style={{ animationDelay: '0.6s', animationFillMode: 'backwards' }}>
          <button
            onClick={abrirA11y}
            className="w-full rounded-xl px-4 py-3 min-h-[44px] border-2 border-[var(--accent)]/30 bg-gradient-to-r from-[var(--accent)]/5 to-transparent text-[var(--fg)] hover:border-[var(--accent)]/50 hover:from-[var(--accent)]/10 transform hover:scale-105 transition-all duration-300 focus-visible:outline focus-visible:ring-2 focus-visible:ring-[var(--accent)] shadow-md hover:shadow-lg group"
          >
            <span className="flex items-center justify-center gap-2">
              <span className="text-xl group-hover:scale-125 transition-transform duration-300">⚙️</span>
              <span className="font-semibold">Configuración de Accesibilidad</span>
            </span>
          </button>

          {/* Lista de características con iconos */}
          <ul className="mt-4 space-y-2">
            {[
              { icon: "🎯", text: "Rutinas adaptadas a tu nivel" },
              { icon: "🎤", text: "Comandos de voz (próximamente)" },
              { icon: "🔒", text: "Sin recopilación de datos personales" }
            ].map((item, idx) => (
              <li 
                key={idx}
                className="flex items-center gap-2 text-sm text-[var(--fg-muted)] animate-slideInLeft"
                style={{ animationDelay: `${0.7 + idx * 0.1}s`, animationFillMode: 'backwards' }}
              >
                <span className="text-lg">{item.icon}</span>
                <span>{item.text}</span>
              </li>
            ))}
          </ul>
        </div>
      </section>
    </main>
  );
}
