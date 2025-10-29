import React from "react";

type Variant = "themed" | "brand";

interface GoogleLoginButtonProps {
  onSuccess?: (token: string) => void;
  onError?: (error: string) => void;
  className?: string;
  variant?: Variant;          // "themed" (default) usa tus tokens; "brand" imita botón Google blanco
  block?: boolean;            // ancho completo
  disabled?: boolean;
  monochromeIcon?: boolean;   // true = icono hereda color actual (útil en alto contraste)
}

const GoogleLoginButton: React.FC<GoogleLoginButtonProps> = ({
  onSuccess,
  onError,
  className = "",
  variant = "themed",
  block = true,
  disabled = false,
  monochromeIcon = false,
}) => {
  const handleGoogleLogin = () => {
    if (disabled) return;
    const backendUrl = import.meta.env.VITE_API_URL || "http://localhost:8080";
    const googleAuthUrl = `${backendUrl.replace(/\/$/, "")}/oauth2/authorization/google`;

    if (onSuccess) sessionStorage.setItem("oauth2_success_callback", "true");
    if (onError) sessionStorage.setItem("oauth2_error_callback", "true");

    window.location.href = googleAuthUrl;
  };

  // Estilos según variante, todos basados en tus variables CSS para que
  // se adapten a modo normal/alto contraste automáticamente.
  const themed =
    "bg-[var(--card)] text-[var(--fg)] border border-[var(--border)] " +
    "hover:bg-[var(--card-elevated)] " +
    "focus-visible:outline focus-visible:outline-2 focus-visible:outline-[var(--accent)]";
  const brand =
    "bg-[var(--bg)] text-[var(--fg)] border-2 border-[var(--border)] " +
    "hover:bg-[color:var(--card)] " +
    "focus-visible:outline focus-visible:outline-2 focus-visible:outline-[var(--accent)]";

  const base =
    "inline-flex items-center justify-center gap-3 " +
    "rounded-lg min-h-[44px] px-5 py-2.5 " +
    "transition-colors duration-150 shadow-sm hover:shadow " +
    (block ? "w-full " : "");

  const btnClass =
    base + (variant === "brand" ? brand : themed) + (disabled ? " opacity-60 cursor-not-allowed " : "") + className;

  return (
    <button
      type="button"
      onClick={handleGoogleLogin}
      disabled={disabled}
      aria-label="Iniciar sesión con Google"
      className={btnClass}
    >
      {/* Logo Google: multicolor por defecto; en alto contraste puedes forzar monochromeIcon */}
      <svg className="w-5 h-5" viewBox="0 0 24 24" aria-hidden="true">
        {monochromeIcon ? (
          <path
            fill="currentColor"
            d="M12 11.2h10.4c.1.5.16 1.04.16 1.6C22.56 18.77 18.33 23 12 23 5.7 23 1 18.3 1 12S5.7 1 12 1c2.85 0 5.43 1.02 7.45 2.71l-3.2 3.2A7.9 7.9 0 0 0 12 5.4c-3.8 0-6.9 3.09-6.9 6.9s3.1 6.9 6.9 6.9c3.5 0 6.04-2.11 6.56-5.1H12v-2.9z"
          />
        ) : (
          <>
            <path
              fill="#4285F4"
              d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
            />
            <path
              fill="#34A853"
              d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
            />
            <path
              fill="#FBBC05"
              d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
            />
            <path
              fill="#EA4335"
              d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
            />
          </>
        )}
      </svg>

      <span className="leading-[1]">Continuar con Google</span>
    </button>
  );
};

export default GoogleLoginButton;
