import React, { useEffect, useMemo, useState } from "react";
import { useAuth } from "../../../context/Auth";

type Props = { onContinue: () => void; onGuest: () => void };

// Soporta ambas envs
const API_BASE =
  (import.meta.env.VITE_API_BASE as string) ||
  (import.meta.env.VITE_API_BASE_URL as string) ||
  "http://localhost:8080";
const OAUTH_BASE = API_BASE.replace(/\/$/, "");
const oauthUrl = (p: "google" | "facebook") => `${OAUTH_BASE}/oauth2/authorization/${p}`;

const StepOAuth: React.FC<Props> = ({ onContinue }) => {
  const { isAuthenticated, loading, login, register } = useAuth();

  // Si ya hay sesión (p. ej., regresaste del OAuth), avanza automáticamente
  useEffect(() => {
    if (!loading && isAuthenticated) onContinue();
  }, [loading, isAuthenticated, onContinue]);

  const [mode, setMode] = useState<"login" | "register">("login");

  // Campos
  const [name, setName] = useState("");
  const [age, setAge] = useState<number | undefined>(undefined); // opcional
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirm, setConfirm] = useState("");

  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const emailOk = useMemo(() => /\S+@\S+\.\S+/.test(email), [email]);
  const passOk = password.trim().length > 0;
  const confirmOk = mode === "register" ? confirm === password && confirm.length > 0 : true;
  const nameOk = mode === "register" ? name.trim().length > 0 : true;

  const canSubmit =
    mode === "login"
      ? emailOk && passOk
      : nameOk && emailOk && passOk && confirmOk;

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!canSubmit || submitting) return;

    setSubmitting(true);
    setError(null);

    try {
      if (mode === "login") {
        // Backend espera usernameOrEmail → usamos el email
        await login({ usernameOrEmail: email, password });
      } else {
        await register({ name, email, password, age });
      }
      // ⚠️ SOLO avanzamos si la llamada NO lanzó error
      onContinue();
    } catch (err: any) {
        const msgRaw = String(err?.message ?? "");
        const match = msgRaw.match(/HTTP\s+(\d{3})/i);
        const status = match ? Number(match[1]) : undefined;

        const msg =
          status === 401 ? "Credenciales inválidas." :
          status === 409 ? "Ya existe una cuenta con ese correo." :
          status === 400 ? "Datos incompletos o inválidos." :
          msgRaw || "No se pudo completar la operación.";

        setError(msg);
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

      {/* Botones OAuth */}
      <div className="mt-4 grid gap-3">
        <a
          href={oauthUrl("google")}
          className="inline-flex items-center justify-center min-h-[44px] px-4 rounded-lg bg-[var(--accent)] text-[var(--bg)] font-semibold"
        >
          Continuar con Google
        </a>
        <a
          href={oauthUrl("facebook")}
          className="inline-flex items-center justify-center min-h-[44px] px-4 rounded-lg border border-[var(--border)] bg-[var(--card)] text-[var(--fg)] font-semibold"
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

        {/* Formulario */}
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
              onChange={(e) => setEmail(e.target.value)}
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

          {mode === "register" && (
            <label className="grid gap-1">
              <span className="text-sm text-[var(--fg)]">Confirmar contraseña</span>
              <input
                type="password"
                required
                value={confirm}
                onChange={(e) => setConfirm(e.target.value)}
                className={`min-h-[44px] px-3 rounded-lg border bg-[var(--card)] text-[var(--fg)]
                  ${confirm.length > 0 && !confirmOk ? "border-red-500" : "border-[var(--border)]"}
                `}
              />
              {confirm.length > 0 && !confirmOk && (
                <span className="text-xs text-red-500">Las contraseñas no coinciden.</span>
              )}
            </label>
          )}

          {error && (
            <div
                role="alert"
                aria-live="assertive"
                className="rounded-lg border border-red-500/70 bg-[color:var(--danger-bg,rgba(244,63,94,.1))] text-[var(--fg)] text-sm px-3 py-2"
              >
                {error}
              </div>
          )}

          <button
            type="submit"
            disabled={!canSubmit || submitting}
            className="mt-1 min-h-[44px] px-4 rounded-lg font-semibold bg-[var(--accent)] text-[var(--bg)] disabled:opacity-60"
          >
            {submitting ? (mode === "login" ? "Entrando…" : "Creando…") : mode === "login" ? "Entrar" : "Crear cuenta"}
          </button>
        </form>
      </div>

      <div className="mt-6">
        <button
          type="button"
          onClick={() => onGuest?.()}
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
