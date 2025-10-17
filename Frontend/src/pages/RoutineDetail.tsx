import React from "react";
import { useNavigate, useParams } from "react-router-dom";
import { getRoutineById } from "../hooks/useApi";
import type { RoutineDetailDTO, ExerciseSummaryDTO, ExerciseDetailDTO } from "../types/InterfaceRoutines";

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
        <p aria-live="polite">Cargando ejercicio…</p>
      </main>
    );
  }

  if (!data) {
    return (
      <main className="mx-auto max-w-screen-sm md:max-w-screen-md lg:max-w-screen-lg px-4 py-6">
        <div className="bg-[var(--card)] border border-[var(--border)] rounded-xl p-4">
          <p className="text-[var(--fg)]">No se encontró el ejercicio.</p>
          <button
            className="mt-4 min-h-[44px] min-w-[44px] px-3 rounded-lg bg-[var(--accent)] text-[var(--bg)]"
            onClick={() => nav(-1)}
          >
            Volver atrás
          </button>
        </div>
      </main>
    );
  }

  const exercises = data.exercises || [];

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

          {/* Título del ejercicio */}
          <h1 className="text-xl md:text-2xl font-bold text-[var(--fg)]">{data.title}</h1>
          <div className="mt-1 flex items-center gap-3 text-sm text-[var(--fg-muted)]">
            {data.durationMinutes && <span>{data.durationMinutes} min</span>}
            {data.intensityName && <span>Intensidad: {data.intensityName}</span>}
            {data.categoryName && <span>Categoría: {data.categoryName}</span>}
          </div>

          {data.description && (
            <p className="mt-3 text-[var(--fg)]">{data.description}</p>
          )}

          {data.videoUrl && (
            <div className="mt-6">
              <h2 className="text-lg font-semibold text-[var(--fg)] mb-2">Video de la rutina</h2>
              <div className="relative pb-[56.25%] h-0">
                <iframe
                  className="absolute top-0 left-0 w-full h-full rounded-lg"
                  src={data.videoUrl}
                  title="Video de la rutina"
                  allowFullScreen
                />
              </div>
            </div>
          )}

          <section className="mt-6">
            <h2 className="text-lg font-semibold text-[var(--fg)] mb-2">Instrucciones</h2>
              <div className="relative pb-[56.25%] h-0"></div>
            {exercises.length > 0 && exercises[0] && (
              <div className="space-y-6">
                {/* Instrucciones */}
                {(exercises[0] as ExerciseDetailDTO).instructions && (
                  <div>
                    <h2 className="text-lg font-semibold text-[var(--fg)] mb-3">Instrucciones</h2>
                    <div className="bg-[var(--card-elevated)] border border-[var(--border)] rounded-xl p-6">
                      <p className="text-[var(--fg-muted)]">
                        {(exercises[0] as ExerciseDetailDTO).instructions}
                      </p>
                    </div>
                  </div>
                )}

                {/* Beneficios */}
                {(exercises[0] as ExerciseDetailDTO).benefits && (
                  <div>
                    <h2 className="text-lg font-semibold text-[var(--fg)] mb-3">Beneficios</h2>
                    <div className="bg-[var(--card-elevated)] border border-[var(--border)] rounded-xl p-6">
                      <ul className="list-disc list-inside text-[var(--fg-muted)] space-y-1">
                        {(exercises[0] as ExerciseDetailDTO).benefits?.map((benefit, idx) => (
                          <li key={idx}>{benefit}</li>
                        ))}
                      </ul>
                    </div>
                  </div>
                )}

                {/* Consejos de seguridad */}
                {(exercises[0] as ExerciseDetailDTO).motivationalPhrase && (
                  <div>
                    <h2 className="text-lg font-semibold text-[var(--fg)] mb-3">Consejos de seguridad</h2>
                    <div className="bg-[var(--card-elevated)] border border-[var(--border)] rounded-xl p-6">
                      <div className="p-4 bg-[var(--accent-muted)] rounded-lg">
                        <p className="text-[var(--fg)]">
                          {(exercises[0] as ExerciseDetailDTO).motivationalPhrase}
                        </p>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            )}
            {exercises.length > 0 ? (
              <div className="space-y-8">
                {exercises.map((exercise) => (
                  <div key={exercise.id} className="bg-[var(--card-elevated)] border border-[var(--border)] rounded-xl p-6">
                    <h3 className="text-xl font-semibold text-[var(--fg)]">{exercise.name}</h3>
                                                          
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-[var(--fg-muted)]">Mejora y disfruta el proceso.</p>
            )}
          </section>

          <div className="mt-6 flex justify-between items-center">
            <button 
              className="min-h-[44px] min-w-[44px] px-3 rounded-lg border border-[var(--border)] bg-[var(--card)]"
              onClick={() => nav(-1)}
            >
              Volver atrás
            </button>
            <button 
              className="min-h-[44px] min-w-[44px] px-4 py-2 rounded-lg bg-[var(--accent)] text-[var(--bg)] font-semibold"
              disabled={exercises.length === 0}
            >
              Iniciar rutina
            </button>
          </div>
        </div>
      </article>
    </main>
  );
}
