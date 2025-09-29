import React, { useState } from "react";
import { useAuth } from "../../context/Auth";
import { useNavigate, useLocation, Link } from "react-router-dom";

export default function Login() {
  const { login, loading } = useAuth();
  const nav = useNavigate();
  const loc = useLocation() as any;
  const [usernameOrEmail, setUsernameOrEmail] = useState("");
  const [password, setPassword] = useState("");

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    try {
      await login({ usernameOrEmail, password });
      const to = loc?.state?.from || "/";
      nav(to, { replace: true });
    } catch (err: any) {
      alert(err?.message || "No se pudo iniciar sesión");
    }
  }

  return (
    <main className="min-h-screen grid place-items-center p-4">
      <section className="w-full max-w-md p-6 rounded-2xl bg-[var(--card)] shadow border border-[var(--border)]">
        <h1 className="text-xl font-bold text-[var(--fg)]">Iniciar sesión</h1>
        <p className="text-sm text-[var(--fg-muted)] mt-1">Accede para ver tus rutinas.</p>

        <form onSubmit={onSubmit} className="mt-4 grid gap-3" noValidate>
          <label className="grid gap-1">
            <span className="text-sm text-[var(--fg)]">Correo</span>
            <input
              type="email"
              required
              value={usernameOrEmail}
              onChange={(e) => setUsernameOrEmail(e.target.value)}
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

          <button
            type="submit"
            disabled={loading}
            className="mt-2 min-h-[44px] px-4 rounded-lg font-semibold bg-[var(--accent)] text-[var(--bg)]"
          >
            {loading ? "Entrando…" : "Entrar"}
          </button>
        </form>

        <div className="mt-4 text-sm">
          <span className="text-[var(--fg-muted)]">¿No tienes cuenta?</span>{" "}
          <Link to="/auth/register" className="underline text-[var(--fg)]">Crear cuenta</Link>
        </div>
      </section>
    </main>
  );
}
