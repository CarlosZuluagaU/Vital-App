import React, { useState } from "react";
import { useAuth } from "../../context/Auth";
import { useNavigate, Link } from "react-router-dom";

export default function Register() {
  const { register, loading } = useAuth();
  const nav = useNavigate();
  const [name, setName] = useState("");
  const [age, setAge] = useState<number | undefined>(undefined);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    try {
      await register({ name, email, password, age });
      nav("/", { replace: true });
    } catch (err: any) {
      alert(err?.message || "No se pudo registrar");
    }
  }

  return (
    <main className="min-h-screen grid place-items-center p-4">
      <section className="w-full max-w-md p-6 rounded-2xl bg-[var(--card)] shadow border border-[var(--border)]">
        <h1 className="text-xl font-bold text-[var(--fg)]">Crear cuenta</h1>
        <p className="text-sm text-[var(--fg-muted)] mt-1">Regístrate para guardar tu progreso.</p>

        <form onSubmit={onSubmit} className="mt-4 grid gap-3" noValidate>
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

          <button
            type="submit"
            disabled={loading}
            className="mt-2 min-h-[44px] px-4 rounded-lg font-semibold bg-[var(--accent)] text-[var(--bg)]"
          >
            {loading ? "Creando…" : "Crear cuenta"}
          </button>
        </form>

        <div className="mt-4 text-sm">
          <span className="text-[var(--fg-muted)]">¿Ya tienes cuenta?</span>{" "}
          <Link to="/auth/login" className="underline text-[var(--fg)]">Inicia sesión</Link>
        </div>
      </section>
    </main>
  );
}
