import React from "react";
import { useNavigate } from "react-router-dom";
import RoutineCard from "../components/RoutineCard";
import { usePrefs } from "../context/Preferences";
import { getRoutines } from "../hooks/useApi";
import type { RoutineSummaryDTO } from "../types/InterfaceRoutines";
import { useAuth } from "../context/Auth";
import { A11yButton } from "../components/a11y/A11yButton"; // <-- usa tu botón accesible

export default function Home() {
  const nav = useNavigate();
  const { profile } = usePrefs();
  const { loading: authLoading, isAuthenticated } = useAuth();

  const [loading, setLoading] = React.useState(true);
  const [all, setAll] = React.useState<RoutineSummaryDTO[]>([]);
  const [error, setError] = React.useState<string | null>(null);

  const target =
    profile?.level === "BASICO" ? "Suave" :
    profile?.level === "INTERMEDIO" ? "Moderado" :
    undefined;

  React.useEffect(() => {
    let mounted = true;
    const load = async () => {
      if (authLoading) return;

      //Se modificado para permitir ver rutinas sin estar autenticado en invitado
      //if (!isAuthenticated) { setAll([]); setLoading(false); return; }
      setLoading(true); setError(null);
      try {
        const a = target ? await getRoutines({ intensity: target }) : await getRoutines();
        if (!mounted) return;
        if (a?.length) {
          if (target) {
            const b = await getRoutines();
            if (!mounted) return;
            setAll(b ?? a);
          } else {
            setAll(a);
          }
        } else {
          const b = await getRoutines();
          if (!mounted) return;
          setAll(b ?? []);
        }
      } catch (e: any) {
        setError(e?.message || "No se pudieron cargar las rutinas.");
        setAll([]);
      } finally {
        if (mounted) setLoading(false);
      }
    };
    load();
    return () => { mounted = false; };
  }, [authLoading, isAuthenticated, target]);

  const recommended = target ? all.filter(r => r.intensityName === target) : all;
  const others = target ? all.filter(r => r.intensityName !== target) : [];

  return (
    <main className="w-full">
      <section className="mx-auto max-w-screen-sm md:max-w-screen-md lg:max-w-screen-lg px-4 py-4 md:py-6">
        <div className="mb-3 flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h1 className="text-xl md:text-2xl font-bold text-[var(--fg)]">VitalApp</h1>
            <p className="text-sm text-[var(--fg-muted)]">
              {target ? `Rutinas recomendadas dado el nivel de actividad que seleccionaste — ${target}` : "Rutinas"}
            </p>
          </div>
          <A11yButton onClick={() => nav("/resumen")} className="sm:self-end">
            Resumen semanal
          </A11yButton>
        </div>

        {authLoading || loading ? (
          <div role="status" aria-live="polite" className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
            {Array.from({ length: 6 }).map((_, i) => (
              <div key={i} className="rounded-xl border border-[var(--border)] bg-[var(--card)] overflow-hidden animate-pulse">
                <div className="aspect-[16/9] bg-[var(--track)]" />
                <div className="p-3 md:p-4 space-y-2">
                  <div className="h-4 bg-[var(--track)] rounded" />
                  <div className="h-4 bg-[var(--track)] rounded w-2/3" />
                  <div className="h-10 bg-[var(--track)] rounded-lg mt-3" />
                </div>
              </div>
            ))}
          </div> //Quitar la autenticación para ver rutinas
        ) /*: !isAuthenticated ? (
          <div className="text-sm text-[var(--fg-muted)]">Inicia sesión para ver tus rutinas.</div>
        ) */ : error ? (
          <div className="text-red-500 text-sm">{error}</div>
        ) : (
          <>
            {recommended.length > 0 && (
              <>
                <h2 className="text-lg font-semibold mb-2 text-[var(--fg)]">Recomendadas para ti</h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6 mb-6">
                  {recommended.map(r => (
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
              </>
            )}

            {others.length > 0 && (
              <>
                <h2 className="text-lg font-semibold mb-2 text-[var(--fg)]">Otras rutinas</h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
                  {others.map(r => (
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
              </>
            )}

            {recommended.length === 0 && others.length === 0 && (
              <div className="text-sm text-[var(--fg-muted)]">No hay rutinas disponibles.</div>
            )}
          </>
        )}
      </section>
    </main>
  );
}
