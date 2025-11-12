import React, { useEffect, useMemo, useState } from "react";
import { useAuth } from "../../../context/Auth";
import GoogleLoginButton from "../../../components/GoogleLoginButton";
import { validatePassword, passwordsMatch, isValidEmail } from "../../../utils/validators";
import { fireMascotCue } from "../../../components/pet/VitaAssistant";

type Props = { onContinue: () => void; onGuest: () => void };

// Soporta ambas envs
const API_BASE =
  (import.meta.env.VITE_API_BASE as string) ||
  (import.meta.env.VITE_API_BASE_URL as string) ||
  "http://localhost:8080";
const OAUTH_BASE = API_BASE.replace(/\/$/, "");
const oauthUrl = (p: "google" | "facebook") => `${OAUTH_BASE}/oauth2/authorization/${p}`;

const StepOAuth: React.FC<Props> = ({ onContinue, onGuest }) => {
  const { isAuthenticated, loading, login, register } = useAuth();

  // Si ya hay sesión (p. ej., regresaste del OAuth), avanza automáticamente
  useEffect(() => {
    if (!loading && isAuthenticated) onContinue();
  }, [loading, isAuthenticated, onContinue]);

  const greetedRef = React.useRef(false);

  useEffect(() => {
    if (greetedRef.current) return;
    greetedRef.current = true;
    fireMascotCue({ mood: "think", msg: "¿Te he visto antes? Si ya tienes cuenta, inicia sesión.", ms: 3800 });
  }, []);

  const [mode, setMode] = useState<"login" | "register">("login");

  // Campos
  const [name, setName] = useState("");
  const [age, setAge] = useState<number | undefined>(undefined);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirm, setConfirm] = useState("");

  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Validaciones
  const emailOk = useMemo(() => isValidEmail(email), [email]);
  const pwdCheck = useMemo(() => validatePassword(password), [password]);
  const confirmOk = useMemo(() => passwordsMatch(password, confirm), [password, confirm]);
  const nameOk = mode === "register" ? name.trim().length > 0 : true;

  const canSubmit =
    mode === "login"
      ? emailOk && password.length > 0
      : nameOk && emailOk && pwdCheck.ok && confirmOk;

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!canSubmit || submitting) return;
    setSubmitting(true);
    setError(null);

    try {
      if (mode === "login") {
        if (!emailOk) throw new Error("Correo inválido.");
        await login({ usernameOrEmail: email, password });
      } else {
        if (!pwdCheck.ok) throw new Error(pwdCheck.errors.join(" "));
        if (!confirmOk) throw new Error("Las contraseñas no coinciden.");
        await register({ name, email, password, age });
      }
      onContinue();
    } catch (err: any) {
      const msgRaw = String(err?.message ?? "");
      const match = msgRaw.match(/HTTP\s+(\d{3})/i);
      const status = match ? Number(match[1]) : undefined;
      const msg =
        status === 401
          ? "Credenciales no válidas."
          : status === 409
          ? "Ya existe una cuenta con ese correo."
          : status === 400
          ? "Datos incompletos o inválidos."
          : msgRaw || "No se pudo completar la operación.";
      setError(msg);
    } finally {
      setSubmitting(false);
    }
  }

  useEffect(() => {
    if (mode === "login") {
      // En login, probabilidad de mostrar un mensaje diferente
      const showAlternative = Math.random() < 0.5; // 50% de probabilidad
      
      if (showAlternative) {
        const alternativeMessages = [
          "¿Te he visto antes? Me suena tu cara... 🤔",
          "Mmm... ¿ya nos conocíamos? 🐾 No recuerdo bien...",
          "Creo que te conozco de algún lado... 🧐",
          "Tu cara me resulta familiar, pero no logro recordar... 🤨"
        ];
        const randomMsg = alternativeMessages[Math.floor(Math.random() * alternativeMessages.length)];
        fireMascotCue({ mood: "think", msg: randomMsg, ms: 3500 });
      } else {
        fireMascotCue({ mood: "think", msg: "Bienvenido de nuevo. ¡A entrenar!", ms: 3200 });
      }
    } else {
      // Registro
      fireMascotCue({ mood: "ok", msg: "¿Usuario nuevo? ¡Bienvenido! ✨", ms: 3200 });
    }
  }, [mode]);

  return (
    <section className="w-full max-w-md">
      <h2 className="text-lg md:text-xl font-semibold text-[var(--fg)]">Crea tu acceso</h2>
      <p className="mt-1 text-sm text-[var(--fg-muted)]">
        Para recordar tu progreso, vincula una cuenta. También puedes continuar como invitado.
      </p>

      <div className="mt-4 grid gap-3">
        <GoogleLoginButton variant="themed" className="w-full" />
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
                  onChange={(e) =>
                    setAge(e.target.value ? Number(e.target.value) : undefined)
                  }
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
              className={`min-h-[44px] px-3 rounded-lg border bg-[var(--card)] text-[var(--fg)] ${
                email.length > 0 && !emailOk ? "border-red-500" : "border-[var(--border)]"
              }`}
            />
            {email.length > 0 && !emailOk && (
              <span className="text-xs text-red-500">Correo inválido.</span>
            )}
          </label>

          <label className="grid gap-1">
            <span className="text-sm text-[var(--fg)]">Contraseña</span>
            <input
              type="password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className={`min-h-[44px] px-3 rounded-lg border bg-[var(--card)] text-[var(--fg)] ${
                password.length > 0 && !pwdCheck.ok
                  ? "border-red-500"
                  : "border-[var(--border)]"
              }`}
            />
            {mode === "register" && !pwdCheck.ok && password.length > 0 && (
              <ul className="mt-1 text-xs text-red-500 list-disc pl-5">
                {pwdCheck.errors.map((e, i) => (
                  <li key={i}>{e}</li>
                ))}
              </ul>
            )}
          </label>

          {mode === "register" && (
            <label className="grid gap-1">
              <span className="text-sm text-[var(--fg)]">Confirmar contraseña</span>
              <input
                type="password"
                required
                value={confirm}
                onChange={(e) => setConfirm(e.target.value)}
                className={`min-h-[44px] px-3 rounded-lg border bg-[var(--card)] text-[var(--fg)] ${
                  confirm.length > 0 && !confirmOk
                    ? "border-red-500"
                    : "border-[var(--border)]"
                }`}
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
              className="rounded-lg border border-red-500/70 bg-[rgba(244,63,94,.1)] text-[var(--fg)] text-sm px-3 py-2"
            >
              {error}
            </div>
          )}

          <button
            type="submit"
            disabled={!canSubmit || submitting}
            className="mt-1 min-h-[44px] px-4 rounded-lg font-semibold bg-[var(--accent)] text-[var(--bg)] disabled:opacity-60"
          >
            {submitting
              ? mode === "login"
                ? "Entrando…"
                : "Creando…"
              : mode === "login"
              ? "Entrar"
              : "Crear cuenta"}
          </button>
        </form>
      </div>

      <div className="mt-6">
        <button
          type="button"
          onClick={onGuest}
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
