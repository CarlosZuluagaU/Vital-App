import React from "react";
import { useNavigate, useParams } from "react-router-dom";
import { getRoutineById } from "../hooks/useApi";
import type { RoutineDetailDTO } from "../types/InterfaceRoutines";

type ExerciseRow = {
  id: number;
  name: string;
  intensity?: string;
  repetitions?: number;
  durationSeconds?: number;
  sets?: number;
};

const s = (v: unknown) => (typeof v === "string" ? v : "");

function normalizeForList(dto: RoutineDetailDTO): ExerciseRow[] {
  const raw = Array.isArray((dto as any).exercises) ? (dto as any).exercises as any[] : [];
  return raw.map((e: any, idx: number): ExerciseRow => {
    const id =
      typeof e.exerciseId === "number" && e.exerciseId > 0
        ? e.exerciseId
        : (typeof e.id === "number" && e.id > 0 ? e.id : idx + 1);

    let name: string =
      (typeof e.exerciseName === "string" && e.exerciseName.trim()) ||
      (typeof e.name === "string" && e.name.trim()) ||
      "";

    if (name.toLowerCase() === "ejercicio") {
      const d = s(e.description).trim();
      const first = d.split(/\.(\s|$)/)[0]?.trim();
      name = first || "Ejercicio";
    }

    return {
      id,
      name,
      intensity: s(e.intensity) || undefined,
      repetitions: typeof e.repetitions === "number" ? e.repetitions : undefined,
      durationSeconds: typeof e.durationSeconds === "number" ? e.durationSeconds : undefined,
      sets: typeof e.sets === "number" ? e.sets : undefined,
    };
  });
}

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

  const list = normalizeForList(data);

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
          <h1 className="text-xl md:text-2xl font-bold text-[var(--fg)]">{s((data as any).title) || "Rutina"}</h1>
          <p className="mt-1 text-sm text-[var(--fg-muted)]">
            {(data as any).durationMinutes ? `${(data as any).durationMinutes} min` : ""}
            {s((data as any).intensityName) ? ` · ${s((data as any).intensityName)}` : ""}
            {s((data as any).categoryName) ? ` · ${s((data as any).categoryName)}` : ""}
          </p>

          {s((data as any).description) && (
            <p className="mt-3 text-[var(--fg)]">{s((data as any).description)}</p>
          )}

          {list.length > 0 && (
            <section className="mt-6">
              <h2 className="text-lg font-semibold text-[var(--fg)]">Ejercicios</h2>
              <ol className="mt-2 space-y-2">
                {list.map((ex, i) => {
                  const meta: string[] = [];
                  if (ex.repetitions) meta.push(`${ex.repetitions} rep`);
                  if (ex.durationSeconds) meta.push(`${ex.durationSeconds}s`);
                  if (ex.sets) meta.push(`${ex.sets} sets`);
                  return (
                    <li
                      key={`${ex.id}-${i}`}
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
                          {meta.length ? meta.join(" · ") : "—"}
                        </div>
                      </div>
                    </li>
                  );
                })}
              </ol>
            </section>
          )}

          <div className="mt-6">
            <button
              className="min-h-[44px] min-w-[44px] px-4 py-2 rounded-lg bg-[var(--accent)] text-[var(--bg)] font-semibold"
              onClick={() => nav(`/rutinas/${id}/ejecutar`)}
            >
              Iniciar rutina
            </button>
          </div>
        </div>
      </article>
    </main>
  );
}
