import React, { useEffect, useMemo, useRef, useState } from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { getRoutineById } from "../hooks/useApi";
import ExercisePlayer, { type ExerciseMini } from "../components/ExercisePlayer";
import { fireMascotCue } from "../components/pet/VitaAssistant";

type Json = Record<string, unknown>;
const asNum = (v: unknown) => (typeof v === "number" && Number.isFinite(v) ? v : undefined);
const asStr = (v: unknown) => (typeof v === "string" && v.trim() !== "" ? v : undefined);
const asArr = (v: unknown): Json[] => (Array.isArray(v) ? (v as Json[]) : []);

/* Formato local de fecha (no UTC) */
const pad2 = (n: number) => String(n).padStart(2, "0");
const toLocalISODate = (t: number) => {
  const d = new Date(t);
  const y = d.getFullYear();
  const m = pad2(d.getMonth() + 1);
  const day = pad2(d.getDate());
  return `${y}-${m}-${day}`; // YYYY-MM-DD en zona local
};

/* Persistencia de sesiones */
type FinishedSession = {
  routineId: number;
  title?: string;
  totalSeconds: number;
  finishedAt: number; // epoch ms
  exercises: number;
};

const SESSIONS_KEY = "workouts:sessions";
const DAY_BUCKET_PREFIX = "workouts:byDate:";

function appendToSessions(s: FinishedSession) {
  const raw = localStorage.getItem(SESSIONS_KEY);
  const list = raw ? (JSON.parse(raw) as FinishedSession[]) : [];
  list.push(s);
  localStorage.setItem(SESSIONS_KEY, JSON.stringify(list));
}
function appendToDayBucket(s: FinishedSession) {
  const day = toLocalISODate(s.finishedAt);
  const key = `${DAY_BUCKET_PREFIX}${day}`;
  const raw = localStorage.getItem(key);
  const bucket = raw ? (JSON.parse(raw) as FinishedSession[]) : [];
  bucket.push(s);
  localStorage.setItem(key, JSON.stringify(bucket));
}

/* Normalización de ejercicios */
function toMini(e: Json): ExerciseMini {
  const rawName =
    asStr((e as Json).exerciseName) ??
    asStr((e as Json).name) ??
    asStr((e as Json).title) ??
    "";
  const cleanedName =
    rawName && rawName.toLowerCase() !== "ejercicio"
      ? rawName
      : (asStr((e as Json).description)?.split(/\.(\s|$)/)[0]?.trim() || "Ejercicio");

  const rawId = asNum((e as Json).exerciseId) ?? asNum((e as Json).id);
  const id = typeof rawId === "number" ? rawId : 0;

  return {
    id,
    name: cleanedName,
    description: asStr((e as Json).description) ?? asStr((e as Json).benefitsDescription),
    instructions: asStr((e as Json).instructions),
    videoUrl: asStr((e as Json).videoUrl),
    imageUrl: asStr((e as Json).imageUrl),
    safetyTips: asStr((e as Json).safetyTips) ?? asStr((e as Json).modifications),
    repetitions: asNum((e as Json).repetitions),
    sets: asNum((e as Json).sets),
    durationSeconds: asNum((e as Json).durationSeconds) ?? asNum((e as Json).duration),
    intensity: asStr((e as Json).intensity) ?? asStr((e as Json).intensityName),
  };
}

function extractExercises(routine: Json | null | undefined): ExerciseMini[] {
  if (!routine) return [];

  // 1) Si viene la lista “plana” dto.exercises (como en RoutineDetailDTO), úsala.
  const listFromExercises = asArr((routine as Json).exercises).map(toMini);

  // 2) groups (por si viene multicomponente)
  const groupKeys = [
    "warmUpExercises",
    "strengthExercises",
    "balanceExercises",
    "flexibilityExercises",
    "cardioExercises",
    "coolDownExercises",
  ];
  let grouped: ExerciseMini[] = [];
  for (const k of groupKeys) {
    grouped = grouped.concat(asArr((routine as Json)[k]).map(toMini));
  }

  // 3) routineExercises del join, sobreescribiendo reps/sets/duration
  const re = asArr((routine as Json).routineExercises);
  let joined: ExerciseMini[] = [];
  if (re.length) {
    joined = re.map((x) => {
      const base = toMini((x.exercise ?? {}) as Json);
      return {
        ...base,
        repetitions: asNum(x.repetitions) ?? base.repetitions,
        sets: asNum(x.sets) ?? base.sets,
        durationSeconds: asNum(x.durationSeconds) ?? base.durationSeconds,
      } as ExerciseMini;
    });
  }

  // Prioridad: exercises (si existe) > joined > grouped
  const merged = (listFromExercises.length ? listFromExercises : (joined.length ? joined : grouped));

  // Evita duplicados por id+name
  const seen = new Set<string>();
  return merged.filter((e) => {
    const key = `${e.id}::${e.name}`;
    if (seen.has(key)) return false;
    seen.add(key);
    return true;
  });
}

/* Progreso en vivo */
type Progress = {
  routineId: number;
  startedAt: number;
  elapsedSeconds: number;
  currentIndex: number;
  completedAt?: number;
};
const progressKey = (id: number) => `routine:progress:${id}`;
const sessionsKey = `routine:sessions`;
const loadProgress = (id: number): Progress | null => {
  const raw = localStorage.getItem(progressKey(id));
  return raw ? (JSON.parse(raw) as Progress) : null;
};
const saveProgress = (p: Progress) =>
  localStorage.setItem(progressKey(p.routineId), JSON.stringify(p));
const clearProgress = (id: number) => localStorage.removeItem(progressKey(id));
const saveSessionFinished = (s: {
  routineId: number;
  title?: string;
  totalSeconds: number;
  finishedAt: number;
  exercises: number;
}) => {
  const raw = localStorage.getItem(sessionsKey);
  const list = raw ? (JSON.parse(raw) as unknown[]) : [];
  list.push(s);
  localStorage.setItem(sessionsKey, JSON.stringify(list));
};

export default function RoutinePlayer() {
  const { id } = useParams();
  const nav = useNavigate();
  const location = useLocation() as { state?: { routine?: Json; exercises?: ExerciseMini[] } };
  const routineId = id ? Number(id) : NaN;

  const [loading, setLoading] = useState(true);
  const [routine, setRoutine] = useState<Json | null>(null);
  const [exercises, setExercises] = useState<ExerciseMini[]>([]);

  const [isRunning, setIsRunning] = useState(true);
  const [elapsed, setElapsed] = useState(0);
  const [index, setIndex] = useState(0);

  // Pantalla de finalización
  const [finished, setFinished] = useState(false);

  // Refs para quitar el listener de teclado y controlar mitad
  const keyHandlerRef = useRef<((e: KeyboardEvent) => void) | null>(null);
  const halfFired = useRef(false);
  const lastMotivationMinute = useRef(0); // Para rastrear cada 5 minutos

  const total = useMemo(() => {
    const s = exercises.reduce((a, e) => a + (e.durationSeconds ?? 0), 0);
    return s || Math.max(1, exercises.length * 60);
  }, [exercises]);

  useEffect(() => {
    halfFired.current = false;
    lastMotivationMinute.current = 0;
  }, [routineId]);

  useEffect(() => {
    if (halfFired.current || finished || exercises.length === 0) return;
    
    // Calculamos el progreso basándonos principalmente en ejercicios completados
    const progressByExercise = (index + 1) / exercises.length;
    
    // Si tenemos tiempo total, también lo consideramos
    const progressByTime = total > 0 ? elapsed / total : 0;
    
    // Usamos el progreso por ejercicios como principal, o por tiempo si no hay ejercicios suficientes
    const currentProgress = exercises.length > 0 ? progressByExercise : progressByTime;
    
    console.debug(
      "[half-check]",
      { 
        index, 
        exercisesLength: exercises.length, 
        progressByExercise: progressByExercise.toFixed(2),
        progressByTime: progressByTime.toFixed(2),
        currentProgress: currentProgress.toFixed(2)
      }
    );

    if (currentProgress >= 0.5) {
      halfFired.current = true;
      console.debug("[half-cue] ¡Mitad alcanzada!");
      fireMascotCue({ mood: "ok", msg: "¡Vas por la mitad! 💪 ¡Sigue así!", ms: 3000 });
    }
  }, [index, exercises.length, finished, elapsed, total]);

  // Motivación cada 5 minutos
  useEffect(() => {
    if (finished) return;
    
    const currentMinute = Math.floor(elapsed / 60);
    const motivationInterval = 5; // cada 5 minutos
    
    // Verificar si pasamos un múltiplo de 5 minutos
    if (currentMinute > 0 && 
        currentMinute % motivationInterval === 0 && 
        currentMinute !== lastMotivationMinute.current) {
      lastMotivationMinute.current = currentMinute;
      
      const messages = [
        "¡Sigue así! 💪",
        "¡Lo estás haciendo genial! 🌟",
        "¡Continúa con esa energía! ⚡",
        "¡Vas muy bien! 🎯",
        "¡No te rindas! 🔥"
      ];
      const randomMsg = messages[Math.floor(Math.random() * messages.length)];
      
      fireMascotCue({ mood: "ok", msg: randomMsg, ms: 3000 });
    }
  }, [elapsed, finished]);

  useEffect(() => {
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

        console.log("[RoutinePlayer] rutina cruda:", r);
        console.log("[RoutinePlayer] ejercicios normalizados:", ex);

        if (mounted) {
          setRoutine(r);
          setExercises(ex);
        }

        const prev = loadProgress(routineId);
        if (prev && mounted) {
          setElapsed(prev.elapsedSeconds);
          setIndex(Math.min(prev.currentIndex, Math.max(0, ex.length - 1)));
        }
        
        // Mensaje de inicio específico cuando se carga la rutina
        if (mounted) {
          const startMessages = [
            "¡Es hora de brillar! 🌟 ¡Vamos con toda la energía!",
            "¡Prepárate para dar lo mejor de ti! 💪 ¡Tú puedes!",
            "¡Comencemos esta aventura juntos! 🚀 ¡Vamos!",
            "¡Tu cuerpo te agradecerá este esfuerzo! 💚 ¡Adelante!",
            "¡Cada paso cuenta! 🎯 ¡Iniciemos con todo!"
          ];
          const randomStart = startMessages[Math.floor(Math.random() * startMessages.length)];
          fireMascotCue({ mood: "clap", msg: randomStart, ms: 4000 });
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

  // Timer global
  useEffect(() => {
    if (!isRunning || finished) return;
    const t = setInterval(() => setElapsed((s) => s + 1), 1000);
    return () => clearInterval(t);
  }, [isRunning, finished]);

  // Guardar progreso
  useEffect(() => {
    if (!Number.isFinite(routineId) || finished) return;
    const p: Progress = {
      routineId,
      startedAt: loadProgress(routineId)?.startedAt ?? Date.now(),
      elapsedSeconds: elapsed,
      currentIndex: index,
    };
    saveProgress(p);
  }, [routineId, elapsed, index, finished]);

  // Teclado (space/arrow)
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (finished) return;
      if (e.key === " " || e.code === "Space") {
        e.preventDefault();
        setIsRunning((v) => !v);
      } else if (e.key === "ArrowRight") {
        setIndex((i) => Math.min(exercises.length - 1, i + 1));
      } else if (e.key === "ArrowLeft") {
        setIndex((i) => Math.max(0, i - 1));
      }
    };
    keyHandlerRef.current = onKey;
    window.addEventListener("keydown", onKey);
    return () => {
      window.removeEventListener("keydown", onKey);
      keyHandlerRef.current = null;
    };
  }, [exercises.length, finished]);

  const handlePrev = () => {
    if (index === 0) {
      // Salir con confirmación en el primer ejercicio
      const ok = confirm("¿Deseas salir de la rutina? Tu progreso actual se guardará.");
      if (ok) {
        // guardamos parcial como sesión NO terminada (opcional) o solo progreso vivo
        nav(-1);
      }
      return;
    }
    setIndex((i) => Math.max(0, i - 1));
  };

  const handleNext = () => setIndex((i) => Math.min(exercises.length - 1, i + 1));

  const handleFinish = () => {
    // 1) Cortar interacciones y timer inmediatamente
    setIsRunning(false);
    setFinished(true);
    // Quitar listener de teclado de inmediato usando el ref
    if (keyHandlerRef.current) {
      window.removeEventListener("keydown", keyHandlerRef.current);
    }

    // Mostrar mensaje de felicitación sin navegación automática
    fireMascotCue({ mood: "clap", msg: "¡Rutina completada! 🎉 ¡Excelente trabajo!", ms: 4000 });

    // 2) Persistir en local
    const title = asStr((routine as Json)?.title) ?? "Rutina";
    const session: FinishedSession = {
      routineId,
      title,
      totalSeconds: elapsed,
      finishedAt: Date.now(),
      exercises: exercises.length,
    };
    appendToSessions(session);
    appendToDayBucket(session);
    clearProgress(routineId);

    // 3) (Gancho a back) — no bloquea navegación
    // TODO: cuando habiliten endpoint, mandar al servidor aquí.
    console.debug("[finish] sesión guardada localmente", session);
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
      {/* Si finalizó, mostramos una pantalla clara de cierre (tipo Duolingo) */}
      {finished ? (
        <section className="rounded-2xl border border-[var(--border)] bg-[var(--card)] p-6 text-center">
          <h1 className="text-xl md:text-2xl font-bold text-[var(--fg)]">¡Rutina completada! 🎉</h1>
          <p className="mt-2 text-[var(--fg)]">
            Tiempo total: <b>{fmt(elapsed)}</b> · Ejercicios: <b>{exercises.length}</b>
          </p>
          <div className="mt-4 flex flex-wrap items-center justify-center gap-3">
            <button
              className="min-h-[44px] min-w-[44px] px-4 rounded-lg bg-[var(--accent)] text-[var(--bg)] font-semibold"
              onClick={() => nav("/resumen")}
            >
              Ver resumen semanal
            </button>
            <button
              className="min-h-[44px] min-w-[44px] px-4 rounded-lg border border-[var(--border)] bg-[var(--card)]"
              onClick={() => nav("/")}
            >
              Ir al inicio
            </button>
          </div>
          <p className="mt-3 text-sm text-[var(--fg-muted)]">Puedes cerrar esta ventana con Esc.</p>
        </section>
      ) : (
        <>
          {/* Barra superior */}
          <section
            className="rounded-xl border border-[var(--border)] bg-[var(--card)] p-3 md:p-4 flex items-center justify-between gap-3"
            aria-label="Estado de la rutina"
          >
            <div>
              <h1 className="text-base md:text-lg font-semibold text-[var(--fg)]">{title}</h1>
              <p className="text-sm text-[var(--fg-muted)]">
                Ejercicio {exercises.length ? index + 1 : 0} de {exercises.length} · Tiempo {fmt(elapsed)}
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

          {/* Contenido del ejercicio (key => asegura remontar el iframe al cambiar) */}
          <section className="mt-4 md:mt-6 rounded-xl border border-[var(--border)] bg-[var(--card)] p-4 md:p-6">
            {current ? (
              <div key={`${index}-${current.id}`}>
                <ExercisePlayer exercise={current} />
              </div>
            ) : (
              <p className="text-[var(--fg)]">No hay ejercicios definidos para esta rutina.</p>
            )}
          </section>

          {/* Controles inferiores */}
          <nav className="mt-4 md:mt-6 flex items-center justify-between gap-3">
            <button
              type="button"
              className="min-h-[44px] min-w-[44px] px-4 rounded-lg border border-[var(--border)] bg-[var(--card)]"
              onClick={handlePrev}
            >
              {index === 0 ? "Salir" : "← Anterior"}
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
        </>
      )}
    </main>
  );
}
