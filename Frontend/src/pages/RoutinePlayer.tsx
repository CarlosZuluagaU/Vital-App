import React from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { getRoutineById } from "../hooks/useApi";
import ExercisePlayer, { type ExerciseMini } from "../components/ExercisePlayer";

type Json = Record<string, unknown>;

const asNum = (v: unknown) =>
    typeof v === "number" && Number.isFinite(v) ? v : undefined;
const asStr = (v: unknown) =>
    typeof v === "string" && v.trim() !== "" ? v : undefined;
const asArr = (v: unknown): Json[] => (Array.isArray(v) ? (v as Json[]) : []);

// Normaliza ejercicios desde distintos DTO del back
function toMini(e: Json): ExerciseMini {
    return {
        id: asNum(e.id) ?? 0,
        name: asStr(e.name) ?? asStr((e as Json).title) ?? "Ejercicio",
        description:
            asStr(e.description) ??
            asStr((e as Json).instructions) ??
            asStr((e as Json).benefitsDescription),
        videoUrl: asStr((e as Json).videoUrl),
        imageUrl: asStr((e as Json).imageUrl),
        safetyTips:
            asStr((e as Json).safetyTips) ?? asStr((e as Json).modifications),
        repetitions: asNum((e as Json).repetitions),
        sets: asNum((e as Json).sets),
        durationSeconds:
            asNum((e as Json).durationSeconds) ?? asNum((e as Json).duration),
        intensity: asStr((e as Json).intensity) ?? asStr((e as Json).intensityName),
    };
}

function extractExercises(routine: Json | null | undefined): ExerciseMini[] {
    if (!routine) return [];
    const groupKeys = [
        "warmUpExercises",
        "strengthExercises",
        "balanceExercises",
        "flexibilityExercises",
        "cardioExercises",
        "coolDownExercises",
    ];
    let acc: Json[] = [];
    for (const k of groupKeys) acc = acc.concat(asArr((routine as Json)[k]));
    acc = acc.concat(asArr((routine as Json).exercises));
    const re = asArr((routine as Json).routineExercises);
    if (re.length) {
        const flat = re.map((x) => {
            const base = toMini((x.exercise ?? {}) as Json);
            return {
                ...base,
                repetitions: asNum(x.repetitions) ?? base.repetitions,
                sets: asNum(x.sets) ?? base.sets,
                durationSeconds: asNum(x.durationSeconds) ?? base.durationSeconds,
            } as ExerciseMini;
        });
        acc = acc.concat(flat as unknown as Json[]);
    }
    return acc.map(toMini).filter((e) => e.name);
}

// --------- Persistencia local de progreso/sesiones ----------
type Progress = {
    routineId: number;
    startedAt: number; // epoch ms
    elapsedSeconds: number; // total acumulado
    currentIndex: number; // ejercicio actual
    completedAt?: number; // epoch ms al finalizar
};

const progressKey = (id: number) => `routine:progress:${id}`;
const sessionsKey = `routine:sessions`;

function loadProgress(id: number): Progress | null {
    const raw = localStorage.getItem(progressKey(id));
    return raw ? (JSON.parse(raw) as Progress) : null;
}

function saveProgress(p: Progress) {
    localStorage.setItem(progressKey(p.routineId), JSON.stringify(p));
}

function clearProgress(id: number) {
    localStorage.removeItem(progressKey(id));
}

function saveSessionFinished(session: {
    routineId: number;
    title?: string;
    totalSeconds: number;
    finishedAt: number;
    exercises: number;
}) {
    const raw = localStorage.getItem(sessionsKey);
    const list = raw ? (JSON.parse(raw) as unknown[]) : [];
    list.push(session);
    localStorage.setItem(sessionsKey, JSON.stringify(list));
}

// --------- Vista principal del reproductor ----------
export default function RoutinePlayer() {
    const { id } = useParams();
    const nav = useNavigate();
    const location = useLocation() as {
        state?: { routine?: Json; exercises?: ExerciseMini[] };
    };

    const routineId = id ? Number(id) : NaN;
    const [loading, setLoading] = React.useState(true);
    const [routine, setRoutine] = React.useState<Json | null>(null);
    const [exercises, setExercises] = React.useState<ExerciseMini[]>([]);

    // Timer
    const [isRunning, setIsRunning] = React.useState(true);
    const [elapsed, setElapsed] = React.useState(0); // segundos
    const [index, setIndex] = React.useState(0);

    // Cargar rutina (por state o fetch)
    React.useEffect(() => {
        let mounted = true;
        (async () => {
            try {
                if (!Number.isFinite(routineId)) throw new Error("Id inválido");
                let r: Json | null = location.state?.routine ?? null;
                if (!r) {
                    const data = await getRoutineById(routineId);
                    r = (data as unknown as Json) ?? null;
                }
                const ex = location.state?.exercises ?? extractExercises(r);
                if (mounted) {
                    setRoutine(r);
                    setExercises(ex);
                }

                // Progreso previo
                const prev = loadProgress(routineId);
                if (prev) {
                    if (mounted) {
                        setElapsed(prev.elapsedSeconds);
                        setIndex(Math.min(prev.currentIndex, Math.max(0, ex.length - 1)));
                    }
                }
            } catch (e) {
                console.error(e);
            } finally {
                if (mounted) setLoading(false);
            }
        })();
        return () => {
            mounted = false;
        };
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [routineId]);

    // Ticker del tiempo (1s)
    React.useEffect(() => {
        if (!isRunning) return;
        const t = setInterval(() => setElapsed((s) => s + 1), 1000);
        return () => clearInterval(t);
    }, [isRunning]);

    // Guardar progreso en cada cambio relevante
    React.useEffect(() => {
        if (!Number.isFinite(routineId)) return;
        const p: Progress = {
            routineId,
            startedAt: loadProgress(routineId)?.startedAt ?? Date.now(),
            elapsedSeconds: elapsed,
            currentIndex: index,
        };
        saveProgress(p);
    }, [routineId, elapsed, index]);

    // Atajos de teclado
    React.useEffect(() => {
        const onKey = (e: KeyboardEvent) => {
            if (e.key === " " || e.code === "Space") {
                e.preventDefault();
                setIsRunning((v) => !v);
            } else if (e.key === "ArrowRight") {
                handleNext();
            } else if (e.key === "ArrowLeft") {
                handlePrev();
            }
        };
        window.addEventListener("keydown", onKey);
        return () => window.removeEventListener("keydown", onKey);
    });

    const handlePrev = () => setIndex((i) => Math.max(0, i - 1));
    const handleNext = () =>
        setIndex((i) => Math.min(exercises.length - 1, i + 1));

    const handleFinish = () => {
        const title = asStr((routine as Json)?.title) ?? "Rutina";
        saveSessionFinished({
            routineId,
            title,
            totalSeconds: elapsed,
            finishedAt: Date.now(),
            exercises: exercises.length,
        });
        clearProgress(routineId);
        //! En el futuro: POST /api/me/activities { activityType: "ROUTINE_COMPLETED", relatedEntityId: routineId }
        nav(-1);
    };

    const fmt = (s: number) => {
        const mm = Math.floor(s / 60);
        const ss = s % 60;
        return `${String(mm).padStart(2, "0")}:${String(ss).padStart(2, "0")}`;
    };

    if (loading) {
        return (
            <main className="mx-auto max-w-screen-sm md:max-w-screen-md lg:max-w-screen-lg px-4 py-6">
                <p aria-live="polite">Preparando rutina…</p>
            </main>
        );
    }

    const title = asStr((routine as Json)?.title) ?? "Rutina";
    const current = exercises[index];

    return (
        <main className="mx-auto max-w-screen-sm md:max-w-screen-md lg:max-w-screen-lg px-4 py-4 md:py-6">
            {/* Barra superior: tiempo + progreso */}
            <section
                className="rounded-xl border border-[var(--border)] bg-[var(--card)] p-3 md:p-4 flex items-center justify-between gap-3"
                aria-label="Estado de la rutina"
            >
                <div>
                    <h1 className="text-base md:text-lg font-semibold text-[var(--fg)]">
                        {title}
                    </h1>
                    <p className="text-sm text-[var(--fg-muted)]">
                        Ejercicio {exercises.length ? index + 1 : 0} de {exercises.length} ·
                        Tiempo {fmt(elapsed)}
                    </p>
                </div>
                <div className="flex items-center gap-2">
                    <button
                        type="button"
                        className="min-h-[44px] min-w-[44px] px-4 rounded-lg border border-[var(--border)] bg-[var(--card)]"
                        onClick={() => setIsRunning((v) => !v)}
                        aria-pressed={isRunning}
                    >
                        {isRunning ? "Pausar" : "Continuar"}
                    </button>
                </div>
            </section>

            {/* Contenido del ejercicio */}
            <section className="mt-4 md:mt-6 rounded-xl border border-[var(--border)] bg-[var(--card)] p-4 md:p-6">
                {current ? (
                    <ExercisePlayer exercise={current} />
                ) : (
                    <p className="text-[var(--fg)]">
                        No hay ejercicios definidos para esta rutina.
                    </p>
                )}
            </section>

            {/* Controles inferiores */}
            <nav className="mt-4 md:mt-6 flex items-center justify-between gap-3">
                <button
                    type="button"
                    className="min-h-[44px] min-w-[44px] px-4 rounded-lg border border-[var(--border)] bg-[var(--card)]"
                    onClick={handlePrev}
                    disabled={index === 0}
                >
                    ← Anterior
                </button>

                {index < exercises.length - 1 ? (
                    <button
                        type="button"
                        className="min-h-[44px] min-w-[44px] px-4 rounded-lg bg-[var(--accent)] text-[var(--bg)] font-semibold"
                        onClick={handleNext}
                    >
                        Siguiente →
                    </button>
                ) : (
                    <button
                        type="button"
                        className="min-h-[44px] min-w-[44px] px-4 rounded-lg bg-[var(--accent)] text-[var(--bg)] font-semibold"
                        onClick={handleFinish}
                    >
                        Finalizar rutina ✓
                    </button>
                )}
            </nav>
        </main>
    );
}
