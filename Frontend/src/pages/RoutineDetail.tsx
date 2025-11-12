import React from "react";
import { useNavigate, useParams } from "react-router-dom";
import { getRoutineById } from "../hooks/useApi";
import type { RoutineDetailDTO } from "../types/InterfaceRoutines";
import { fireMascotCue } from "../components/pet/VitaAssistant";

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
        if (mounted) {
          setData(d ?? null);
          
          // Mensaje de Vita sobre la rutina
          if (d) {
            const routineMessages = [
              "¡Esta rutina se ve genial! 💪 ¿Listo para el desafío?",
              "¡Excelente elección! 🌟 Vamos a darlo todo juntos.",
              "Me gusta tu actitud 😊 ¡Esta rutina será increíble!",
              "¡Hora de brillar! ✨ Esta rutina es perfecta para ti.",
              "¡Qué emoción! 🎯 Veo que vienes con ganas de mejorar."
            ];
            const randomMsg = routineMessages[Math.floor(Math.random() * routineMessages.length)];
            fireMascotCue({ mood: "clap", msg: randomMsg, ms: 3500 });
          }
        }
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
      <main className="mx-auto max-w-screen-sm md:max-w-screen-md lg:max-w-screen-lg px-4 py-6 relative">
        {/* Decorative background */}
        <div className="fixed inset-0 pointer-events-none overflow-hidden -z-10">
          <div className="absolute -top-32 -right-32 w-96 h-96 bg-accent/20 rounded-full blur-3xl animate-pulse" style={{ animationDuration: "6s" }}></div>
        </div>
        <div className="rounded-2xl border-2 border-accent/20 bg-gradient-to-br from-card to-card-elevated p-8 text-center animate-scaleIn">
          <div className="loading-shimmer h-6 w-48 mx-auto rounded-lg mb-4"></div>
          <div className="loading-shimmer h-4 w-32 mx-auto rounded"></div>
        </div>
      </main>
    );
  }

  if (!data) {
    return (
      <main className="mx-auto max-w-screen-sm md:max-w-screen-md lg:max-w-screen-lg px-4 py-6 relative">
        {/* Decorative background */}
        <div className="fixed inset-0 pointer-events-none overflow-hidden -z-10">
          <div className="absolute -top-32 -left-32 w-96 h-96 bg-accent/10 rounded-full blur-3xl animate-pulse" style={{ animationDuration: "8s" }}></div>
        </div>
        <div className="rounded-2xl border-2 border-accent/30 bg-gradient-to-br from-card to-card-elevated p-8 text-center animate-scaleIn">
          <span className="text-6xl mb-4 inline-block animate-bounce">😕</span>
          <p className="text-lg text-fg mb-6">No se encontró la rutina.</p>
          <button
            className="min-h-[44px] min-w-[44px] px-6 py-3 rounded-xl bg-[var(--accent)] text-[var(--bg)] font-bold shadow-lg hover:shadow-xl hover:scale-105 active:scale-100 transition-all duration-300"
            onClick={() => nav(-1)}
          >
            ← Volver
          </button>
        </div>
      </main>
    );
  }

  const list = normalizeForList(data);

  return (
    <main className="mx-auto max-w-screen-sm md:max-w-screen-md lg:max-w-screen-lg px-4 py-6 relative">
      {/* Decorative background */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden -z-10">
        <div className="absolute -top-32 -right-32 w-96 h-96 bg-accent/20 rounded-full blur-3xl animate-pulse" style={{ animationDuration: "6s" }}></div>
        <div className="absolute -bottom-32 -left-32 w-64 h-64 bg-accent/10 rounded-full blur-3xl animate-pulse" style={{ animationDuration: "8s" }}></div>
      </div>

      <header className="mb-4 animate-fadeIn">
        <button
          className="min-h-[44px] min-w-[44px] px-4 rounded-xl border border-[var(--border)] bg-[var(--card)] hover:bg-[var(--card-elevated)] hover:scale-105 active:scale-100 transition-all duration-300"
          onClick={() => nav(-1)}
        >
          ← Volver
        </button>
      </header>

      <article className="rounded-2xl border-2 border-accent/30 bg-gradient-to-br from-card to-card-elevated overflow-hidden shadow-lg animate-scaleIn">
        <div className="p-4 md:p-6">
          <h1 className="text-xl md:text-3xl font-bold text-fg">
            {s((data as any).title) || "Rutina"}
          </h1>
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
              <h2 className="text-lg font-semibold text-fg flex items-center gap-2">
                <span>💪</span> Ejercicios
              </h2>
              <ol className="mt-3 space-y-3">
                {list.map((ex, i) => {
                  const meta: string[] = [];
                  if (ex.repetitions) meta.push(`${ex.repetitions} rep`);
                  if (ex.durationSeconds) meta.push(`${ex.durationSeconds}s`);
                  if (ex.sets) meta.push(`${ex.sets} sets`);
                  return (
                    <li
                      key={`${ex.id}-${i}`}
                      className="border-2 border-accent/20 rounded-xl p-4 bg-gradient-to-br from-card-elevated to-card hover:shadow-lg hover:-translate-y-1 transition-all duration-300 animate-fadeIn"
                      style={{ animationDelay: `${0.1 + i * 0.05}s` }}
                    >
                      <div className="flex items-start justify-between gap-3">
                        <div className="flex-1">
                          <div className="flex items-center gap-2">
                            <span className="text-accent font-bold text-sm">{i + 1}.</span>
                            <p className="font-semibold text-fg">{ex.name}</p>
                          </div>
                          {ex.intensity && (
                            <p className="text-sm text-fg-muted mt-1 ml-6">🎯 Intensidad: {ex.intensity}</p>
                          )}
                        </div>
                        <div className="text-sm text-right text-fg-muted shrink-0 bg-accent/5 px-3 py-1 rounded-lg border border-accent/20">
                          {meta.length ? meta.join(" · ") : "—"}
                        </div>
                      </div>
                    </li>
                  );
                })}
              </ol>
            </section>
          )}

          <div className="mt-6 animate-fadeIn" style={{ animationDelay: `${0.2 + list.length * 0.05}s` }}>
            <button
              className="w-full md:w-auto min-h-[44px] min-w-[44px] px-8 py-3 rounded-xl bg-[var(--accent)] text-[var(--bg)] font-bold shadow-lg hover:shadow-xl hover:scale-105 active:scale-100 transition-all duration-300"
              onClick={() => nav(`/rutinas/${id}/ejecutar`)}
            >
              🚀 Iniciar rutina
            </button>
          </div>
        </div>
      </article>
    </main>
  );
}
