import React from "react";
import { Link, useLocation } from "react-router-dom";
import { usePrefs, type FontSize } from "../context/Preferences";

export default function Header() {
  const { fontSize, setFontSize, highContrast, setHighContrast } = usePrefs();
  const { pathname } = useLocation();

  const SizeBtn: React.FC<{ label: string; value: FontSize }> = ({ label, value }) => (
    <button
      type="button"
      onClick={() => setFontSize(value)}
      aria-pressed={fontSize === value}
      className={[
        "min-h-[44px] min-w-[44px] px-3 rounded-lg border",
        "bg-[var(--card)] border-[var(--border)] text-[var(--fg)]",
        fontSize === value ? "ring-2 ring-[var(--accent)]" : "focus-visible:outline-none",
      ].join(" ")}
    >
      {label}
    </button>
  );

  return (
    <header
      role="banner"
      className="sticky top-0 z-40 border-b border-[var(--border)] bg-[var(--card-elevated)]"
    >
      <div className="mx-auto w-full max-w-screen-lg px-3 sm:px-4 py-3">
        {/* wrap para evitar overflow en móvil */}
        <div className="flex flex-wrap items-center gap-3">
          <div className="flex items-center gap-2 whitespace-nowrap">
            <Link
              to="/"
              className="text-lg sm:text-xl font-bold text-[var(--fg)] focus:outline-none focus-visible:ring-2 focus-visible:ring-[var(--accent)] rounded"
              aria-label="Ir al inicio de VitalApp"
            >
              VitalApp
            </Link>
            {pathname !== "/" && pathname !== "/welcome" && (
              <>
                <span className="text-sm text-[var(--fg-muted)]" aria-hidden="true">/</span>
                <span className="text-sm text-[var(--fg-muted)] truncate max-w-[45vw] sm:max-w-[50vw]">
                  {pathname.replace(/\//g, " / ").trim()}
                </span>
              </>
            )}
          </div>

          {/* Controles */}
          <div className="ml-auto flex flex-wrap items-center gap-2">
            <div role="group" aria-label="Tamaño de letra" className="flex items-center gap-2">
              <SizeBtn label="SM" value="sm" />
              <SizeBtn label="MD" value="md" />
              <SizeBtn label="LG" value="lg" />
            </div>
            <button
              type="button"
              onClick={() => setHighContrast(!highContrast)}
              className="min-h-[44px] min-w-[44px] px-3 rounded-lg border bg-[var(--card)] border-[var(--border)] text-[var(--fg)] focus-visible:outline-none"
              aria-pressed={highContrast}
              aria-label={highContrast ? "Desactivar alto contraste" : "Activar alto contraste"}
              title={highContrast ? "Desactivar alto contraste" : "Activar alto contraste"}
            >
              {highContrast ? "Contraste: Alto" : "Contraste: Normal"}
            </button>
          </div>
        </div>
      </div>
    </header>
  );
}
