import React from "react";

/**
 * Primer paso del Onboarding:
 * - Botones "Continuar con Google" / "Continuar con Facebook"
 * - Botón "Ahora no, continuar como invitado" -> llama onContinue()
 * - Link a login/registro tradicional (placeholder en /auth/traditional)
 *
 * IMPORTANTE: solo hace redirección a /oauth2/authorization/{provider}.
 * El back debe manejar el login y devolver el control al front en /oauth2/redirect.
 */
type Props = {
  onContinue: () => void; // avanza al siguiente paso (StepName)
};

const BASE = import.meta.env.VITE_API_BASE_URL ?? "";

const oauthUrl = (provider: "google" | "facebook") =>
  `${BASE ? BASE.replace(/\/$/, "") : ""}/oauth2/authorization/${provider}`;

const StepOAuth: React.FC<Props> = ({ onContinue }) => {
  return (
    <section className="w-full max-w-md">
      <h2 className="text-lg md:text-xl font-semibold text-[var(--fg)]">Crea tu acceso</h2>
      <p className="mt-1 text-sm text-[var(--fg-muted)]">
        Para recordar tu progreso, vincula una cuenta. También puedes continuar como invitado.
      </p>

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

        <button
          type="button"
          onClick={onContinue}
          className="inline-flex items-center justify-center min-h-[44px] px-4 rounded-lg border border-[var(--border)] bg-[var(--card)] text-[var(--fg)]"
        >
          Ahora no, continuar como invitado
        </button>
      </div>

      <div className="mt-4">
        <a
          href="/auth/traditional"
          className="underline text-[var(--fg)] focus:outline-none focus-visible:ring-2 focus-visible:ring-[var(--accent)] rounded"
        >
          Ir a inicio de sesión / registro tradicional
        </a>
        <p className="mt-1 text-sm text-[var(--fg-muted)]">
          Podrás vincular tu cuenta social más adelante desde tu perfil.
        </p>
      </div>
    </section>
  );
};

export default StepOAuth;
