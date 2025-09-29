import React from "react";
import { useNavigate, useParams } from "react-router-dom";
import { getRoutineById } from "../hooks/useApi";
import type { RoutineDetailDTO, ExerciseSummaryDTO } from "../types/InterfaceRoutines";

/**
 * RoutineDetail — detalle de rutina *simple*.
 * Antes intentaba obtener una "multicomponent" por id desde un mock.
 * Ahora consume /api/routines/{id} y renderiza exercises[] si el back lo expone.
 */
export default function RoutineDetail() {
  const { id } = useParams();
  const nav = useNavigate();

  const [loading, setLoading] = React.useState(true);
  const [data, setData] = React.useState<RoutineDetailDTO | null>(null);

  React.useEffect(() => {
    let mounted = true;
    (async () => {
      try {
        const numericId = id ? Number(id) : NaN;
        if (!Number.isFinite(numericId)) throw new Error("Id inválido");
        const d = await getRoutineById(numericId);
        if (mounted) setData(d ?? null);
      } catch (e) {
        console.error(e);
        if (mounted) setData(null);
      } finally {
        if (mounted) setLoading(false);
      }
    })();
    return () => {
      mounted = false;
    };
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

  const exercises = (data.exercises ?? []) as ExerciseSummaryDTO[];

  const renderItem = (ex: ExerciseSummaryDTO, idx: number) => {
    const metaParts: string[] = [];
    if (ex.repetitions) metaParts.push(`${ex.repetitions} rep`);
    if (ex.durationSeconds) metaParts.push(`${ex.durationSeconds}s`);
    if (ex.sets) metaParts.push(`${ex.sets} sets`);

    return (
      <li
        key={`${ex.id}-${idx}`}
        className="border border-[var(--border)] rounded-lg p-3 bg-[var(--card-elevated)]"
      >
        <div className="flex items-start justify-between gap-3">
          <div>
            <p className="font-medium text-[var(--fg)]">{ex.name}</p>
            {ex.intensity && (
              <p className="text-sm text-[var(--fg-muted)]">Intensidad: {ex.intensity}</p>
            )}
          </div>
          <div className="text-sm text-right text-[var(--fg-muted)] shrink-0">
            {metaParts.join(" · ")}
          </div>
        </div>
      </li>
    );
  };

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
            {(data.durationMinutes ?? 0)} min
            {data.intensityName ? ` · ${data.intensityName}` : ""}
            {data.categoryName ? ` · ${data.categoryName}` : ""}
          </p>

          {data.description && <p className="mt-3 text-[var(--fg)]">{data.description}</p>}

          {exercises.length > 0 && (
            <section className="mt-6">
              <h2 className="text-lg font-semibold text-[var(--fg)]">Ejercicios</h2>
              <ol className="mt-2 space-y-2">
                {exercises.map((ex, i) => renderItem(ex, i))}
              </ol>
            </section>
          )}

          {/* CTA placeholder: player / seguimiento */}
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
