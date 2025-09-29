import React from "react";
import { useNavigate } from "react-router-dom";
import RoutineCard from "../components/RoutineCard";
import { usePrefs } from "../context/Preferences";
import { getRoutines } from "../hooks/useApi";
import type { RoutineSummaryDTO } from "../types/InterfaceRoutines";
import { useAuth } from "../context/Auth";

/**
 * Home — lista de rutinas recomendadas
 * - NO llama a la API hasta que el usuario esté autenticado (evita 403).
 * - Mapea BASICO→Suave, INTERMEDIO→Moderado (coincide con tu DB).
 * - Si el fetch con filtro devuelve 0, reintenta sin filtro.
 */
export default function Home() {
  const nav = useNavigate();
  const { profile } = usePrefs();
  const { loading: authLoading, isAuthenticated } = useAuth();

  const [loading, setLoading] = React.useState(true);
  const [items, setItems] = React.useState<RoutineSummaryDTO[]>([]);
  const [error, setError] = React.useState<string | null>(null);

  const intensity =
    profile?.level === "BASICO"
      ? "Suave"
      : profile?.level === "INTERMEDIO"
      ? "Moderado"
      : undefined; // si luego usas AVANZADO → "Intenso"

  React.useEffect(() => {
    let mounted = true;

    const load = async () => {
      // Espera a que Auth termine y sólo carga si hay sesión
      if (authLoading) return;
      if (!isAuthenticated) {
        if (mounted) {
          setItems([]);
          setError(null);
          setLoading(false);
        }
        return;
      }

      setLoading(true);
      setError(null);

      try {
        // 1) Intento con filtro si existe
        const data = await getRoutines(intensity ? { intensity } : undefined);
        if (!mounted) return;

        if (data && data.length > 0) {
          setItems(data);
        } else if (intensity) {
          // 2) Si vino vacío con filtro, reintenta sin filtro
          const fallback = await getRoutines();
          if (!mounted) return;
          setItems(fallback ?? []);
        } else {
          setItems(data ?? []);
        }
      } catch (e: any) {
        // 3) Si falla (incluye 403 por timing), intenta sin filtro
        try {
          const fallback = await getRoutines();
          if (!mounted) return;
          setItems(fallback ?? []);
        } catch (e2: any) {
          if (!mounted) return;
          setError(e2?.message || "No se pudieron cargar las rutinas.");
          setItems([]);
        }
      } finally {
        if (mounted) setLoading(false);
      }
    };

    load();
    return () => {
      mounted = false;
    };
  }, [authLoading, isAuthenticated, intensity]);

  return (
    <main className="w-full">
      <section className="mx-auto max-w-screen-sm md:max-w-screen-md lg:max-w-screen-lg px-4 py-4 md:py-6">
        <div className="mb-3">
          <h1 className="text-xl md:text-2xl font-bold text-[var(--fg)]">VitalApp</h1>
        </div>

        {/* Estados */}
        {authLoading || loading ? (
          <div
            role="status"
            aria-live="polite"
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6"
          >
            {Array.from({ length: 6 }).map((_, i) => (
              <div
                key={i}
                className="rounded-xl border border-[var(--border)] bg-[var(--card)] overflow-hidden animate-pulse"
              >
                <div className="aspect-[16/9] bg-[var(--track)]" />
                <div className="p-3 md:p-4 space-y-2">
                  <div className="h-4 bg-[var(--track)] rounded" />
                  <div className="h-4 bg-[var(--track)] rounded w-2/3" />
                  <div className="h-10 bg-[var(--track)] rounded-lg mt-3" />
                </div>
              </div>
            ))}
          </div>
        ) : !isAuthenticated ? (
          <div className="text-sm text-[var(--fg-muted)]">
            Inicia sesión para ver tus rutinas.
          </div>
        ) : error ? (
          <div className="text-red-500 text-sm">{error}</div>
        ) : items.length === 0 ? (
          <div className="text-sm text-[var(--fg-muted)]">No hay rutinas disponibles.</div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
            {items.map((r) => (
              <RoutineCard
                key={r.id}
                id={r.id}
                title={r.title}
                minutes={r.durationMinutes ?? 0}
                intensityLevel={r.intensityName ?? undefined}
                thumbnailUrl={r.thumbnailUrl ?? undefined}
              />
            ))}
          </div>
        )}
      </section>
    </main>
  );
}
