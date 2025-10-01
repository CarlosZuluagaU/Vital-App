// src/app/RouterError.tsx
import React from "react";
import { isRouteErrorResponse, useRouteError } from "react-router-dom";

export default function RouterError() {
  const err = useRouteError();
  const message = isRouteErrorResponse(err)
    ? `${err.status} ${err.statusText}`
    : err instanceof Error
    ? err.message
    : "Error desconocido";

  return (
    <main className="mx-auto max-w-screen-sm md:max-w-screen-md lg:max-w-screen-lg px-4 py-10">
      <div className="bg-[var(--card)] border border-[var(--border)] rounded-xl p-6">
        <h1 className="text-xl font-bold text-[var(--fg)]">Ha ocurrido un problema</h1>
        <p className="mt-2 text-[var(--fg-muted)]">{message}</p>
      </div>
    </main>
  );
}
