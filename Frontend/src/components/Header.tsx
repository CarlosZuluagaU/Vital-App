import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { usePrefs, type FontSize } from "../context/Preferences";
import { useAuth } from "../context/Auth";
import { A11yButton } from "./a11y/A11yButton";
import { DEFAULT_AVATARS } from "./AvatarSelector";

export default function Header() {
  const nav = useNavigate();
  const { fontSize, setFontSize, highContrast, setHighContrast, profile, setProfile } = usePrefs();
  const { user, isAuthenticated, logout } = useAuth();
  const [menuOpen, setMenuOpen] = useState(false);

  // Obtener nombre del perfil o usuario
  const displayName = profile?.name || 
                      (user as { name?: string; username?: string })?.name || 
                      (user as { name?: string; username?: string })?.username || 
                      "¡bienvenid@!";
  const greeting = `Hola, ${displayName}`;

  // Obtener avatar del perfil
  const getAvatarImage = (id: number) => {
    return DEFAULT_AVATARS.find((a) => a.id === id)?.image || "/images/Default.png";
  };

  // Mensajes motivadores aleatorios
  const motivationalMessages = [
    "💪 ¡Hoy es tu día!",
    "🌟 Cada paso cuenta",
    "🔥 Tú puedes lograrlo",
    "✨ Sigue brillando",
    "🎯 Enfócate en tu meta",
    "🚀 ¡Vamos con todo!",
    "⚡ Energía positiva"
  ];

  const [motivation] = useState(() => 
    motivationalMessages[Math.floor(Math.random() * motivationalMessages.length)]
  );

  const handleLogout = async () => {
    try {
      await logout?.();
    } finally {
      setProfile(null);
      location.href = "/welcome";
    }
  };

  return (
    <>
      <header role="banner" className="sticky top-0 z-40 border-b-2 border-[var(--accent)]/20 bg-[var(--card-elevated)] shadow-lg backdrop-blur-md">
        <div className="mx-auto w-full max-w-screen-lg px-4 py-3">
          <div className="flex items-center justify-between">
            {/* Logo y saludo con efectos mágicos */}
            <div className="flex items-center gap-3 animate-fadeIn">
              <Link
                to="/"
                className="group relative text-xl font-bold text-[var(--fg)] transition-all duration-300 hover:scale-110 focus:outline-none focus-visible:ring-2 focus-visible:ring-[var(--accent)] rounded px-2 py-1"
                aria-label="Ir al inicio de VitalApp"
              >
                <span className="relative z-10 bg-gradient-to-r from-[var(--accent)] to-[var(--fg)] bg-clip-text text-transparent">
                  VitalApp
                </span>
                <span className="absolute inset-0 bg-[var(--accent)]/10 blur-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-lg" />
              </Link>
              <div className="hidden md:flex flex-col gap-0.5 animate-slideInRight" style={{ animationDelay: '0.1s', animationFillMode: 'backwards' }}>
                <span className="text-sm font-medium text-[var(--fg)]">
                  {greeting} 👋
                </span>
                <span className="text-xs font-semibold text-[var(--accent)] animate-pulse">
                  {motivation}
                </span>
              </div>
            </div>

            {/* Avatar del usuario + Botón hamburguesa - Agrupados a la derecha */}
            <div className="flex items-center gap-1">
              {/* Avatar del usuario - Click para editar perfil - Solo si tiene perfil */}
              {profile && (
                <button
                  onClick={() => nav("/perfil/editar")}
                  className="relative w-12 h-12 rounded-full bg-gradient-to-br from-[var(--accent)]/20 to-[var(--accent)]/10 border-2 border-[var(--accent)]/30 flex items-center justify-center hover:scale-110 hover:shadow-lg hover:border-[var(--accent)]/60 transition-all duration-300 focus:outline-none focus-visible:ring-2 focus-visible:ring-[var(--accent)] group overflow-hidden"
                  aria-label="Editar perfil"
                  title="Editar perfil"
                >
                  <span className="absolute inset-0 bg-[var(--accent)]/20 blur-md opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-full" />
                  <img 
                    src={getAvatarImage(profile?.avatarId || 1)}
                    alt="Avatar"
                    className="w-10 h-10 object-contain relative z-10"
                  />
                </button>
              )}

              {/* Botón hamburguesa con efectos mejorados */}
              <button
                onClick={() => setMenuOpen(!menuOpen)}
                className="relative flex flex-col justify-center items-center w-12 h-12 rounded-xl hover:bg-[var(--accent)]/10 hover:scale-110 transition-all duration-300 focus:outline-none focus-visible:ring-2 focus-visible:ring-[var(--accent)] group"
                aria-label={menuOpen ? "Cerrar menú" : "Abrir menú"}
                aria-expanded={menuOpen}
              >
                <span className="absolute inset-0 bg-[var(--accent)]/20 blur-md opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-xl" />
                <span className={`relative z-10 w-6 h-0.5 bg-[var(--accent)] transition-all duration-300 ${menuOpen ? 'rotate-45 translate-y-1.5' : ''}`} />
                <span className={`relative z-10 w-6 h-0.5 bg-[var(--accent)] my-1 transition-all duration-300 ${menuOpen ? 'opacity-0' : ''}`} />
                <span className={`relative z-10 w-6 h-0.5 bg-[var(--accent)] transition-all duration-300 ${menuOpen ? '-rotate-45 -translate-y-1.5' : ''}`} />
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Overlay oscuro con efecto de desenfoque */}
      {menuOpen && (
        <div 
          className="fixed inset-0 bg-gradient-to-br from-black/60 to-black/40 z-40 animate-fadeIn backdrop-blur-md"
          onClick={() => setMenuOpen(false)}
          aria-hidden="true"
        />
      )}

      {/* Sidebar con diseño mejorado */}
      <aside
        className={`fixed top-0 right-0 h-full w-80 bg-gradient-to-br from-[var(--card)] to-[var(--card-elevated)] border-l-2 border-[var(--accent)]/30 shadow-2xl z-50 transform transition-all duration-300 ease-out ${
          menuOpen ? 'translate-x-0 scale-100' : 'translate-x-full scale-95'
        }`}
        aria-hidden={!menuOpen}
      >
        <div className="flex flex-col h-full">
          {/* Header del sidebar con gradiente */}
          <div className="relative flex items-center justify-between p-4 border-b-2 border-[var(--accent)]/20 bg-gradient-to-r from-[var(--accent)]/5 to-transparent">
            <div className="flex items-center gap-2">
              <span className="text-2xl animate-pulse">⚙️</span>
              <h2 className="text-lg font-bold text-[var(--fg)]">Configuración</h2>
            </div>
            <button
              onClick={() => setMenuOpen(false)}
              className="w-10 h-10 flex items-center justify-center rounded-xl hover:bg-[var(--accent)]/20 hover:rotate-90 transition-all duration-300 focus:outline-none focus-visible:ring-2 focus-visible:ring-[var(--accent)]"
              aria-label="Cerrar menú"
            >
              <span className="text-2xl text-[var(--accent)] font-bold">×</span>
            </button>
          </div>

          {/* Contenido del sidebar con animaciones escalonadas */}
          <div className="flex-1 overflow-y-auto p-4 space-y-6">
            {/* Tamaño de letra */}
            <div className="space-y-3 animate-slideInRight" style={{ animationDelay: '0.05s', animationFillMode: 'backwards' }}>
              <div className="flex items-center gap-2">
                <span className="text-lg">📏</span>
                <h3 className="text-sm font-semibold text-[var(--fg)] uppercase tracking-wide">
                  Tamaño de letra
                </h3>
              </div>
              <div className="grid grid-cols-3 gap-2">
                {(['sm', 'md', 'lg'] as FontSize[]).map((size, idx) => (
                  <button
                    key={size}
                    onClick={() => setFontSize(size)}
                    className={`py-3 px-4 rounded-xl border-2 transition-all duration-300 font-semibold transform hover:scale-105 ${
                      fontSize === size
                        ? 'border-[var(--accent)] bg-gradient-to-br from-[var(--accent)]/20 to-[var(--accent)]/10 text-[var(--accent)] shadow-lg shadow-[var(--accent)]/20'
                        : 'border-[var(--border)] hover:border-[var(--accent)]/50 text-[var(--fg)] hover:shadow-md'
                    }`}
                    style={{ animationDelay: `${0.1 + idx * 0.05}s` }}
                    aria-pressed={fontSize === size}
                  >
                    {size.toUpperCase()}
                  </button>
                ))}
              </div>
            </div>

            {/* Alto contraste */}
            <div className="space-y-3 animate-slideInRight" style={{ animationDelay: '0.15s', animationFillMode: 'backwards' }}>
              <div className="flex items-center gap-2">
                <span className="text-lg">🎨</span>
                <h3 className="text-sm font-semibold text-[var(--fg)] uppercase tracking-wide">
                  Contraste
                </h3>
              </div>
              <button
                onClick={() => setHighContrast(!highContrast)}
                className={`group w-full py-4 px-4 rounded-xl border-2 transition-all duration-300 flex items-center justify-between hover:scale-105 ${
                  highContrast
                    ? 'border-[var(--accent)] bg-gradient-to-r from-[var(--accent)]/20 to-[var(--accent)]/10 shadow-lg shadow-[var(--accent)]/20'
                    : 'border-[var(--border)] hover:border-[var(--accent)]/50 hover:shadow-md'
                }`}
                aria-pressed={highContrast}
              >
                <span className="font-semibold text-[var(--fg)]">
                  {highContrast ? 'Alto contraste' : 'Contraste normal'}
                </span>
                <span className="text-2xl group-hover:scale-125 transition-transform duration-300">
                  {highContrast ? '🌓' : '☀️'}
                </span>
              </button>
            </div>

            {/* Nivel de actividad */}
            {profile && (
              <div className="space-y-3 animate-slideInRight" style={{ animationDelay: '0.2s', animationFillMode: 'backwards' }}>
                <div className="flex items-center gap-2">
                  <span className="text-lg">🏃</span>
                  <h3 className="text-sm font-semibold text-[var(--fg)] uppercase tracking-wide">
                    Nivel de actividad
                  </h3>
                </div>
                <div className="space-y-2">
                  {[
                    { key: 'BASICO' as const, label: 'Básico', emoji: '🌱', desc: 'Ejercicios suaves' },
                    { key: 'MODERADO' as const, label: 'Moderado', emoji: '⚖️', desc: 'Retos moderados' },
                    { key: 'INTERMEDIO' as const, label: 'Intermedio', emoji: '💪', desc: 'Más desafiante' }
                  ].map(({ key, label, emoji, desc }, idx) => (
                    <button
                      key={key}
                      onClick={() => setProfile({ ...profile, level: key })}
                      className={`group w-full py-3 px-4 rounded-xl border-2 transition-all duration-300 text-left hover:scale-105 ${
                        profile.level === key
                          ? 'border-[var(--accent)] bg-gradient-to-r from-[var(--accent)]/20 to-[var(--accent)]/10 shadow-lg shadow-[var(--accent)]/20'
                          : 'border-[var(--border)] hover:border-[var(--accent)]/50 hover:shadow-md'
                      }`}
                      style={{ animationDelay: `${0.25 + idx * 0.05}s` }}
                      aria-pressed={profile.level === key}
                    >
                      <div className="flex items-center gap-3">
                        <span className="text-2xl group-hover:scale-125 transition-transform duration-300">{emoji}</span>
                        <div className="flex-1">
                          <div className="font-semibold text-[var(--fg)]">{label}</div>
                          <div className="text-xs text-[var(--fg-muted)]">{desc}</div>
                        </div>
                      </div>
                    </button>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Footer del sidebar con gradiente */}
          <div className="p-4 border-t-2 border-[var(--accent)]/20 bg-gradient-to-t from-[var(--card-elevated)] to-transparent space-y-2 animate-slideInRight" style={{ animationDelay: '0.3s', animationFillMode: 'backwards' }}>
            {/* Botón Editar Perfil */}
            <A11yButton 
              variant="secondary" 
              onClick={() => {
                setMenuOpen(false);
                nav("/perfil/editar");
              }}
              className="w-full transform hover:scale-105 transition-all duration-300 shadow-lg hover:shadow-xl hover:shadow-[var(--accent)]/30 flex items-center justify-center gap-2"
            >
              <span>👤</span> Editar Perfil
            </A11yButton>

            {isAuthenticated ? (
              <A11yButton 
                variant="primary" 
                onClick={() => {
                  setMenuOpen(false);
                  handleLogout();
                }}
                className="w-full transform hover:scale-105 transition-all duration-300 shadow-lg hover:shadow-xl hover:shadow-[var(--accent)]/30"
              >
                <span className="flex items-center justify-center gap-2">
                  <span>🚪</span>
                  <span>Cerrar sesión</span>
                </span>
              </A11yButton>
            ) : (
              <Link
                to="/onboarding"
                onClick={() => setMenuOpen(false)}
                className="block w-full text-center py-3 px-4 rounded-xl bg-gradient-to-r from-[var(--accent)] to-[var(--accent)]/80 text-[var(--bg)] font-semibold hover:opacity-90 transform hover:scale-105 transition-all duration-300 shadow-lg hover:shadow-xl"
              >
                <span className="flex items-center justify-center gap-2">
                  <span>✨</span>
                  <span>Acceder</span>
                </span>
              </Link>
            )}
          </div>
        </div>
      </aside>
    </>
  );
}
