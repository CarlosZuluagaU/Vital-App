import React from "react";
import RoutineCard from "../components/RoutineCard";
import { usePrefs } from "../context/Preferences";
import {
  getMultiComponentRoutines,
  getMultiComponentRoutinesByIntensity,
  estimateRoutineMinutes,
} from "../hooks/useApi";
import type { MultiComponentRoutine } from "../types/InterfaceRoutines";
import { useNavigate } from "react-router-dom";

export default function Home() {
  const nav = useNavigate();
  const { profile } = usePrefs();
  const [loading, setLoading] = React.useState(true);
  const [items, setItems] = React.useState<MultiComponentRoutine[]>([]);

  const intensityLevel = profile?.level === "BASICO" ? "Suave" : profile?.level === "INTERMEDIO" ? "Media" : undefined;

  React.useEffect(() => {
    let mounted = true;
    (async () => {
      try {
        const data = intensityLevel
          ? await getMultiComponentRoutinesByIntensity(intensityLevel)
          : await getMultiComponentRoutines();
        if (mounted) setItems(data);
      } finally {
        if (mounted) setLoading(false);
      }
    })();
    return () => {
      mounted = false;
    };
  }, [intensityLevel]);

  return (
    <main className="w-full">
      {/* SIN header interno para evitar doble barra */}
      <section className="mx-auto max-w-screen-sm md:max-w-screen-md lg:max-w-screen-lg px-4 py-4 md:py-6">
        <div className="mb-3">
          <h1 className="text-xl md:text-2xl font-bold text-[var(--fg)]">VitalApp</h1>
          <p className="text-sm text-[var(--fg-muted)]">
            {profile?.name ? `Hola, ${profile.name}. ` : ""}
            Rutinas {profile?.level?.toLowerCase() ?? "recomendadas"}
          </p>
          <div className="mt-2">
            <button
              className="min-h-[44px] min-w-[44px] px-3 rounded-lg border border-[var(--border)] bg-[var(--card)]"
              onClick={() => nav("/resumen")}
            >
              Resumen semanal
            </button>
          </div>
        </div>

        {loading ? (
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
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
            {items.map((r) => (
              <RoutineCard
                key={r.id}
                id={r.id}
                title={r.title}
                minutes={estimateRoutineMinutes(r)}
                intensityLevel={r.intensityLevel}
                thumbnailUrl={undefined}
              />
            ))}
          </div>
        )}
      </section>
    </main>
  );
}
