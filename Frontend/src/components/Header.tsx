import React from "react";
import { Link } from "react-router-dom";
import { usePrefs, type FontSize } from "../context/Preferences";
import { useAuth } from "../context/Auth";
import { A11yButton } from "./a11y/A11yButton";

export default function Header() {
  const { fontSize, setFontSize, highContrast, setHighContrast, setProfile } = usePrefs();
  const { user, isAuthenticated, logout } = useAuth();

  const name = (user as any)?.name || (user as any)?.username || "¡bienvenid@!";
  const greeting = `Hola, ${name}. ¡Esforcémonos al máximo hoy!`;

  const SizeBtn: React.FC<{ label: string; value: FontSize }> = ({ label, value }) => (
    <A11yButton
      variant="secondary"
      aria-pressed={fontSize === value}
      onClick={() => setFontSize(value)}
      className={fontSize === value ? "ring-2 ring-[var(--accent)]" : ""}
    >
      {label}
    </A11yButton>
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
    <header role="banner" className="sticky top-0 z-40 border-b border-[var(--border)] bg-[var(--card-elevated)]">
      <div className="mx-auto w-full max-w-screen-lg px-3 sm:px-4 py-3">
        <div className="flex flex-wrap items-center gap-3">
          <div className="flex items-center gap-2 whitespace-nowrap">
            <Link
              to="/"
              className="text-lg sm:text-xl font-bold text-[var(--fg)] focus:outline-none focus-visible:ring-2 focus-visible:ring-[var(--accent)] rounded"
              aria-label="Ir al inicio de VitalApp"
            >
              VitalApp
            </Link>
            <span className="text-sm text-[var(--fg-muted)] hidden sm:inline">— {greeting}</span>
          </div>

          <div className="ml-auto flex flex-wrap items-center gap-2">
            <div role="group" aria-label="Tamaño de letra" className="flex items-center gap-2">
              <SizeBtn label="SM" value="sm" />
              <SizeBtn label="MD" value="md" />
              <SizeBtn label="LG" value="lg" />
            </div>

            <A11yButton
              variant="secondary"
              aria-pressed={highContrast}
              aria-label={highContrast ? "Desactivar alto contraste" : "Activar alto contraste"}
              title={highContrast ? "Desactivar alto contraste" : "Activar alto contraste"}
              onClick={() => setHighContrast(!highContrast)}
            >
              {highContrast ? "Contraste: Alto" : "Contraste: Normal"}
            </A11yButton>

            {isAuthenticated ? (
              <A11yButton variant="primary" onClick={handleLogout} aria-label="Cerrar sesión" title="Cerrar sesión">
                Cerrar sesión
              </A11yButton>
            ) : (
              <Link
                to="/onboarding"
                aria-label="Iniciar sesión o registrarse"
                title="Iniciar sesión o registrarse"
                className="inline-flex items-center justify-center min-h-[44px] min-w-[44px] px-3 rounded-lg border bg-[var(--card)] border-[var(--border)] text-[var(--fg)]"
              >
                Acceder
              </Link>
            )}
          </div>
        </div>
      </div>
    </header>
  );
}
