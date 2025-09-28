import React from "react";

export default function TraditionalAuth() {
  return (
    <main className="mx-auto max-w-screen-sm md:max-w-screen-md lg:max-w-screen-lg px-4 py-6">
      <section className="bg-[var(--card)] border border-[var(--border)] rounded-xl p-4 md:p-6">
        <h1 className="text-xl font-bold text-[var(--fg)]">Acceso tradicional</h1>
        <p className="mt-2 text-[var(--fg-muted)]">
          Aquí irá el formulario de inicio de sesión y registro por email/contraseña, me dio sueño y no lo hice.
        </p>
        <a
          href="/onboarding"
          className="inline-flex items-center justify-center mt-4 min-h-[44px] px-4 rounded-lg bg-[var(--accent)] text-[var(--bg)] font-semibold"
        >
          Volver al Onboarding
        </a>
      </section>
    </main>
  );
}
