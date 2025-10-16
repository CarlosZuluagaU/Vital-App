import { useEffect, useState } from "react";
import { getExercises, getExerciseById } from "../hooks/useApi";
import type { ExerciseSummaryDTO, ExerciseDetailDTO } from "../types/InterfaceRoutines";
import ExerciseCard from "../components/ExerciseCard";

export default function Exercises() {
  const [loading, setLoading] = useState(true);
  const [exercises, setExercises] = useState<ExerciseSummaryDTO[]>([]);
  const [selected, setSelected] = useState<ExerciseDetailDTO | null>(null);

  useEffect(() => {
    let mounted = true;
    (async () => {
      try {
        const list = await getExercises();
        if (mounted) setExercises(list ?? []);
      } catch (e) {
        console.error(e);
      } finally {
        if (mounted) setLoading(false);
      }
    })();
    return () => { mounted = false; };
  }, []);

  async function openDetail(id: number) {
    try {
      const d = await getExerciseById(id);
      setSelected(d);
    } catch (e) {
      console.error(e);
    }
  }

  if (loading) return <main className="mx-auto max-w-screen-sm px-4 py-6">Cargando ejercicios…</main>;

  return (
    <main className="mx-auto max-w-screen-sm md:max-w-screen-md lg:max-w-screen-lg px-4 py-6">
      <h1 className="text-2xl font-bold text-[var(--fg)] mb-4">Ejercicios</h1>

      <section className="grid gap-3">
        {exercises.map((ex) => (
          <div key={ex.id} onClick={() => openDetail(ex.id)}>
            <ExerciseCard exercise={ex} />
          </div>
        ))}
      </section>

      {selected && (
        <aside className="mt-6 bg-[var(--card)] border border-[var(--border)] rounded-xl p-4">
          <h2 className="text-lg font-semibold text-[var(--fg)]">{selected.name}</h2>
          {selected.videoUrl && (
            <div className="mt-3 aspect-[16/9] w-full bg-[var(--track)]">
              <iframe
                src={selected.videoUrl}
                title={selected.name}
                className="w-full h-full"
                frameBorder={0}
                allowFullScreen
              />
            </div>
          )}
          {selected.instructions && (
            <div className="mt-3 text-[var(--fg)]">{selected.instructions}</div>
          )}
          {selected.steps && (
            <ol className="mt-3 list-decimal list-inside text-[var(--fg)]">
              {selected.steps.map((s, i) => <li key={i}>{s}</li>)}
            </ol>
          )}
        </aside>
      )}
    </main>
  );
}
