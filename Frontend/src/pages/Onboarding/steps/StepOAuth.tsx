import React, { useEffect, useState } from "react";
import { useAuth } from "../../../context/Auth";

/**
 * Primer paso del Onboarding:
 * - Botones "Continuar con Google" / "Continuar con Facebook"
 * - Formulario tradicional (tabs: Iniciar sesión / Crear cuenta)
 * - Botón "Ahora no, continuar como invitado" -> llama onContinue()
 *
 * Comportamiento:
 * - Si ya hay sesión (JWT válido), avanza automáticamente (onContinue()).
 * - Al hacer login/registro exitoso: guarda token y avanza (onContinue()).
 *
 * A11y/Estilo:
 * - Tokens de color y 44×44 en todos los controles
 * - Labels y aria-live para errores
 */

type Props = {
  onContinue: () => void; // avanza al siguiente paso (StepName)
};

const BASE = import.meta.env.VITE_API_BASE_URL ?? "";
const buildBase = () => (BASE ? BASE.replace(/\/$/, "") : "");

const oauthUrl = (provider: "google" | "facebook") =>
  `${buildBase()}/oauth2/authorization/${provider}`;

const StepOAuth: React.FC<Props> = ({ onContinue }) => {
  const { isAuth, loading, login, register } = useAuth();

  // si ya hay sesión (p.ej. viene de OAuth) => saltar
  useEffect(() => {
    if (!loading && isAuth) onContinue();
  }, [loading, isAuth, onContinue]);

  const [mode, setMode] = useState<"login" | "register">("login");
  const [email, setEmail] = useState("");
  const [usernameOrEmail, setUsernameOrEmail] = useState("");
  const [password, setPassword] = useState("");
  // registro
  const [name, setName] = useState("");
  const [age, setAge] = useState<number | undefined>(undefined);

  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError(null);
    setSubmitting(true);
    try {
      if (mode === "login") {
        await login({ usernameOrEmail, password });
      } else {
        await register({ name, email, password, age });
      }
      onContinue();
    } catch (err: any) {
      setError(err?.message || "No se pudo completar la operación.");
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <section className="w-full max-w-md">
      <h2 className="text-lg md:text-xl font-semibold text-[var(--fg)]">Crea tu acceso</h2>
      <p className="mt-1 text-sm text-[var(--fg-muted)]">
        Para recordar tu progreso, vincula una cuenta. También puedes continuar como invitado.
      </p>

      {/* Botones sociales */}
      <div className="mt-4 grid gap-3">
        <a
          href={oauthUrl("google")}
          className="inline-flex items-center justify-center min-h-[44px] px-4 rounded-lg bg-[var(--accent)] text-[var(--bg)] font-semibold"
          data-testid="oauth-google"
        >
          Continuar con Google
        </a>

        <a
          href={oauthUrl("facebook")}
          className="inline-flex items-center justify-center min-h-[44px] px-4 rounded-lg border border-[var(--border)] bg-[var(--card)] text-[var(--fg)] font-semibold"
          data-testid="oauth-facebook"
        >
          Continuar con Facebook
        </a>
      </div>

      {/* Tabs login/registro */}
      <div className="mt-6">
        <div role="tablist" aria-label="Método de acceso" className="flex gap-2">
          <button
            type="button"
            role="tab"
            aria-selected={mode === "login"}
            onClick={() => setMode("login")}
            className={`min-h-[44px] px-3 rounded-lg border bg-[var(--card)] ${
              mode === "login" ? "border-[var(--accent)]" : "border-[var(--border)]"
            }`}
          >
            Iniciar sesión
          </button>
          <button
            type="button"
            role="tab"
            aria-selected={mode === "register"}
            onClick={() => setMode("register")}
            className={`min-h-[44px] px-3 rounded-lg border bg-[var(--card)] ${
              mode === "register" ? "border-[var(--accent)]" : "border-[var(--border)]"
            }`}
          >
            Crear cuenta
          </button>
        </div>

        <form onSubmit={onSubmit} className="mt-4 grid gap-3" noValidate>
          {mode === "register" && (
            <>
              <label className="grid gap-1">
                <span className="text-sm text-[var(--fg)]">Nombre</span>
                <input
                  type="text"
                  required
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="min-h-[44px] px-3 rounded-lg border border-[var(--border)] bg-[var(--card)] text-[var(--fg)]"
                />
              </label>
              <label className="grid gap-1">
                <span className="text-sm text-[var(--fg)]">Edad (opcional)</span>
                <input
                  type="number"
                  min={1}
                  value={age ?? ""}
                  onChange={(e) => setAge(e.target.value ? Number(e.target.value) : undefined)}
                  className="min-h-[44px] px-3 rounded-lg border border-[var(--border)] bg-[var(--card)] text-[var(--fg)]"
                />
              </label>
            </>
          )}

          <label className="grid gap-1">
            <span className="text-sm text-[var(--fg)]">Correo</span>
            <input
              type="email"
              required
              value={email}
              onChange={(e) => {
                setEmail(e.target.value);
                setUsernameOrEmail(e.target.value);
              }}
              className="min-h-[44px] px-3 rounded-lg border border-[var(--border)] bg-[var(--card)] text-[var(--fg)]"
            />
          </label>

          <label className="grid gap-1">
            <span className="text-sm text-[var(--fg)]">Contraseña</span>
            <input
              type="password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="min-h-[44px] px-3 rounded-lg border border-[var(--border)] bg-[var(--card)] text-[var(--fg)]"
            />
          </label>

          {error && (
            <div role="alert" aria-live="assertive" className="text-sm text-red-500">
              {error}
            </div>
          )}

          <button
            type="submit"
            disabled={submitting}
            className="mt-1 min-h-[44px] px-4 rounded-lg font-semibold bg-[var(--accent)] text-[var(--bg)]"
          >
            {submitting ? (mode === "login" ? "Entrando…" : "Creando…") : mode === "login" ? "Entrar" : "Crear cuenta"}
          </button>
        </form>
      </div>

      {/* Continuar como invitado */}
      <div className="mt-6">
        <button
          type="button"
          onClick={onContinue}
          className="inline-flex items-center justify-center min-h-[44px] px-4 rounded-lg border border-[var(--border)] bg-[var(--card)] text-[var(--fg)]"
        >
          Ahora no, continuar como invitado
        </button>
      </div>

      <p className="mt-2 text-sm text-[var(--fg-muted)]">
        Se recomienda crear una cuenta para guardar tu progreso y personalizar tu experiencia.
      </p>
    </section>
  );
};

export default StepOAuth;
