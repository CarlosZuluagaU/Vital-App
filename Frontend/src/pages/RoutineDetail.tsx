import React from "react";
import { useNavigate, useParams } from "react-router-dom";
import { getMultiComponentRoutineById,} from "../hooks/useApi";
import type { ExerciseLite, MultiComponentRoutine } from "../types/InterfaceRoutines";


const sections: Array<{key: keyof MultiComponentRoutine, title: string}> = [
  { key: "warmUpExercises", title: "Calentamiento" },
  { key: "strengthExercises", title: "Fuerza" },
  { key: "balanceExercises", title: "Equilibrio" },
  { key: "flexibilityExercises", title: "Flexibilidad" },
  { key: "cardioExercises", title: "Cardio" },
  { key: "coolDownExercises", title: "Enfriamiento" },
]



export default function RoutineDetail() {
  const { id } = useParams();
  const nav = useNavigate();
  const [loading, setLoading] = React.useState(true);
  const [data, setData] = React.useState<MultiComponentRoutine | null>(null);

  React.useEffect(() => {
    let mounted = true;
    (async () => {
      try {
        const numericId = id ? Number(id) : NaN;
        const d = id ? await getMultiComponentRoutineById(numericId) : null;
        if (mounted) setData(d);
      } finally {
        if (mounted) setLoading(false);
      }
    })();
    return () => { mounted = false; };
  }, [id]);

  if (loading) {
    return (
      <main className="mx-auto max-w-screen-sm md:max-w-screen-md lg:max-w-screen-lg px-4 py-6">
        <p aria-live="polite">Cargando rutina…</p>
      </main>
    );
  }

  if (!data) {
    return (
      <main className="mx-auto max-w-screen-sm md:max-w-screen-md lg:max-w-screen-lg px-4 py-6">
        <div className="bg-[var(--card)] border border-[var(--border)] rounded-xl p-4">
          <p className="text-[var(--fg)]">No se encontró la rutina.</p>
          <button
            className="mt-4 min-h-[44px] min-w-[44px] px-3 rounded-lg bg-[var(--accent)] text-[var(--bg)]"
            onClick={() => nav(-1)}
          >
            Volver
          </button>
        </div>
      </main>
    );
  }

  const renderItem = (ex: ExerciseLite, idx: number) => (
    <li key={`${ex.id}-${idx}`} className="border border-[var(--border)] rounded-lg p-3 bg-[var(--card-elevated)]">
      <div className="flex items-start justify-between gap-3">
        <div>
          <p className="font-medium text-[var(--fg)]">{ex.name}</p>
          <p className="text-sm text-[var(--fg-muted)]">{ex.description}</p>
          {ex.safetyTips && <p className="mt-1 text-sm text-[var(--fg-muted)]">Seguridad: {ex.safetyTips}</p>}
        </div>
        <div className="text-sm text-right text-[var(--fg-muted)] shrink-0">
          {ex.repetitions ? `${ex.repetitions} rep` : ex.durationSeconds ? `${ex.durationSeconds}s` : ""}
          {ex.sets ? `· ${ex.sets} sets` : ""}
        </div>
      </div>
    </li>
  );

  return (
    <main className="mx-auto max-w-screen-sm md:max-w-screen-md lg:max-w-screen-lg px-4 py-6">
      <header className="mb-4">
        <button
          className="min-h-[44px] min-w-[44px] px-3 rounded-lg border border-[var(--border)] bg-[var(--card)]"
          onClick={() => nav(-1)}
        >
          ← Volver
        </button>
      </header>

      <article className="bg-[var(--card)] border border-[var(--border)] rounded-xl overflow-hidden">
        <div className="p-4 md:p-6">
          <h1 className="text-xl md:text-2xl font-bold text-[var(--fg)]">{data.title}</h1>
          <p className="mt-1 text-sm text-[var(--fg-muted)]">
            {data.totalDurationMinutes} min · {data.intensityLevel} · {data.ageGroup}
          </p>
          {data.description && <p className="mt-3 text-[var(--fg)]">{data.description}</p>}

          {sections.map(({ key, title }) => {
            const list = data[key] as ExerciseLite[];
            if (!Array.isArray(list) || list.length === 0) return null;
            return (
              <section key={key as string} className="mt-6">
                <h2 className="text-lg font-semibold text-[var(--fg)]">{title}</h2>
                <ol className="mt-2 space-y-2">
                  {list.map((ex, i) => renderItem(ex, i))}
                </ol>
              </section>
            );
          })}

          {data.safetyNotes && (
            <section className="mt-6">
              <h2 className="text-lg font-semibold text-[var(--fg)]">Notas de seguridad</h2>
              <p className="text-[var(--fg)] mt-1">{data.safetyNotes}</p>
            </section>
          )}

          {/* CTA placeholder (player se integrará después) */}
          <div className="mt-6">
            <button className="min-h-[44px] min-w-[44px] px-4 py-2 rounded-lg bg-[var(--accent)] text-[var(--bg)] font-semibold">
              Iniciar (próximamente)
            </button>
          </div>
        </div>
      </article>
    </main>
  );
}
