import React, { useEffect, useMemo, useRef, useState } from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { getRoutineById, postActivity } from "../hooks/useApi";
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
      // Si está en pantalla de finalización, Escape cierra
      if (finished) {
        if (e.key === "Escape" || e.code === "Escape") {
          e.preventDefault();
          nav("/");
        }
        return;
      }
      // Durante la rutina
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
  }, [exercises.length, finished, nav]);

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

  const handleFinish = async () => {
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

    // 3) Enviar al backend para actualizaciones en tiempo real
    try {
      console.log('[RoutinePlayer] Enviando actividad al backend...', {
        routineId,
        durationSeconds: Math.max(elapsed, 1),
        exerciseCount: exercises.length,
        activityDate: toLocalISODate(Date.now()),
      });
      
      const response = await postActivity({
        activityType: "ROUTINE_COMPLETED",
        relatedEntityId: routineId,
        durationSeconds: Math.max(elapsed, 1),
        exerciseCount: exercises.length,
        activityDate: toLocalISODate(Date.now()),
      });
      
      console.log('[RoutinePlayer] Respuesta del backend:', response);

      if (response.status === 'success') {
        // Disparar evento solo si el backend confirmó
        window.dispatchEvent(
          new CustomEvent("routineCompleted", {
            detail: {
              routineName: title,
              date: new Date().toISOString().split("T")[0],
              routine: { id: routineId, title, exercises: exercises.length },
              duration: elapsed,
              timestamp: Date.now(),
              backendConfirmed: true,
            },
          })
        );
        console.log('[RoutinePlayer] Evento routineCompleted disparado');
      } else {
        console.warn('[RoutinePlayer] Backend respondió con error:', response.message);
        // Disparar evento igualmente pero marcar como no confirmado
        window.dispatchEvent(
          new CustomEvent("routineCompleted", {
            detail: {
              routineName: title,
              date: new Date().toISOString().split("T")[0],
              routine: { id: routineId, title, exercises: exercises.length },
              duration: elapsed,
              timestamp: Date.now(),
              backendConfirmed: false,
            },
          })
        );
      }
    } catch (error) {
      console.error("[RoutinePlayer] Error conectando con el backend para registrar rutina:", error);
      // Disparar evento de todas formas para actualizar UI local
      window.dispatchEvent(
        new CustomEvent("routineCompleted", {
          detail: {
            routineName: title,
            date: new Date().toISOString().split("T")[0],
            routine: { id: routineId, title, exercises: exercises.length },
            duration: elapsed,
            timestamp: Date.now(),
            backendConfirmed: false,
            error: true,
          },
        })
      );
    }

    console.debug("[finish] sesión guardada localmente y enviada al backend", session);
  };

  const fmt = (s: number) => {
    const mm = Math.floor(s / 60);
    const ss = s % 60;
    return `${String(mm).padStart(2, "0")}:${String(ss).padStart(2, "0")}`;
  };

  if (loading) {
    return (
      <main className="mx-auto max-w-screen-sm md:max-w-screen-md lg:max-w-screen-lg px-4 py-6 relative min-h-screen flex items-center justify-center">
        <div className="fixed inset-0 pointer-events-none overflow-hidden -z-10">
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-accent/30 rounded-full blur-3xl animate-pulse" style={{ animationDuration: "3s" }}></div>
        </div>
        <div className="text-center animate-scaleIn">
          <span className="text-6xl mb-4 inline-block animate-bounce" style={{ animationDuration: "1.5s" }}>💪</span>
          <p className="text-xl font-semibold text-accent" aria-live="polite">
            Preparando rutina…
          </p>
        </div>
      </main>
    );
  }

  const title = asStr((routine as Json)?.title) ?? "Rutina";
  const current = exercises[index];

  return (
    <main className="mx-auto max-w-screen-sm md:max-w-screen-md lg:max-w-screen-lg px-4 py-4 md:py-6 relative">
      {/* Decorative background */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden -z-10">
        <div className="absolute -top-32 -right-32 w-96 h-96 bg-accent/20 rounded-full blur-3xl animate-pulse" style={{ animationDuration: "6s" }}></div>
        <div className="absolute -bottom-32 -left-32 w-64 h-64 bg-accent/10 rounded-full blur-3xl animate-pulse" style={{ animationDuration: "8s" }}></div>
      </div>

      {/* Si finalizó, mostramos una pantalla clara de cierre (tipo Duolingo) */}
      {finished ? (
        <section className="rounded-2xl border-2 border-accent/30 bg-gradient-to-br from-card to-card-elevated p-8 md:p-12 text-center animate-scaleIn shadow-2xl">
          <span className="text-7xl mb-6 inline-block animate-bounce" style={{ animationDuration: "1s", animationIterationCount: "3" }}>🎉</span>
          <h1 className="text-2xl md:text-4xl font-bold text-accent mb-4">
            ¡Rutina completada!
          </h1>
          <div className="flex flex-wrap items-center justify-center gap-4 text-lg mb-8">
            <div className="px-4 py-2 rounded-xl bg-accent/10 border-2 border-accent/30">
              <span className="text-fg-muted">⏱️ Tiempo:</span>{" "}
              <b className="text-accent">{fmt(elapsed)}</b>
            </div>
            <div className="px-4 py-2 rounded-xl bg-accent/10 border-2 border-accent/30">
              <span className="text-fg-muted">💪 Ejercicios:</span>{" "}
              <b className="text-accent">{exercises.length}</b>
            </div>
          </div>
          <div className="mt-6 flex flex-wrap items-center justify-center gap-3">
            <button
              className="min-h-[44px] min-w-[44px] px-6 py-3 rounded-xl bg-[var(--accent)] text-[var(--bg)] font-bold shadow-lg hover:shadow-xl hover:scale-105 active:scale-100 transition-all duration-300"
              onClick={() => nav("/resumen")}
            >
              📊 Ver resumen semanal
            </button>
            <button
              className="min-h-[44px] min-w-[44px] px-6 py-3 rounded-xl border border-[var(--border)] bg-[var(--card)] text-[var(--fg)] font-semibold hover:bg-[var(--card-elevated)] hover:scale-105 active:scale-100 transition-all duration-300"
              onClick={() => nav("/")}
            >
              🏠 Ir al inicio
            </button>
          </div>
          <p className="mt-6 text-sm text-fg-muted">Presiona <kbd className="px-2 py-1 rounded bg-accent/20 border border-accent/40 font-mono text-fg font-semibold">Esc</kbd> para ir al inicio.</p>
        </section>
      ) : (
        <>
          {/* Barra superior */}
          <section
            className="rounded-xl border-2 border-accent/30 bg-gradient-to-r from-card to-card-elevated p-3 md:p-4 flex items-center justify-between gap-3 shadow-lg animate-fadeIn"
            aria-label="Estado de la rutina"
          >
            <div className="flex-1">
              <h1 className="text-base md:text-lg font-bold text-accent">
                {title}
              </h1>
              <p className="text-sm text-fg-muted flex items-center gap-2 mt-1">
                <span>💪</span> Ejercicio {exercises.length ? index + 1 : 0} de {exercises.length}
                <span className="mx-1">·</span>
                <span>⏱️</span> {fmt(elapsed)}
              </p>
            </div>
            <div className="flex items-center gap-2">
              <button
                type="button"
                className="min-h-[44px] min-w-[44px] px-4 rounded-xl border border-[var(--border)] bg-[var(--card)] hover:bg-[var(--card-elevated)] hover:scale-105 active:scale-100 transition-all duration-300 font-semibold text-[var(--fg)]"
                onClick={() => setIsRunning((v) => !v)}
                aria-pressed={isRunning}
              >
                {isRunning ? "⏸️ Pausar" : "▶️ Continuar"}
              </button>
            </div>
          </section>

          {/* Contenido del ejercicio (key => asegura remontar el iframe al cambiar) */}
          <section className="mt-4 md:mt-6 rounded-2xl border-2 border-accent/20 bg-gradient-to-br from-card to-card-elevated p-4 md:p-6 shadow-lg animate-fadeIn" style={{ animationDelay: "0.1s" }}>
            {current ? (
              <div key={`${index}-${current.id}`}>
                <ExercisePlayer exercise={current} />
              </div>
            ) : (
              <div className="text-center py-8">
                <span className="text-5xl mb-4 inline-block">😕</span>
                <p className="text-fg">No hay ejercicios definidos para esta rutina.</p>
              </div>
            )}
          </section>

          {/* Controles inferiores */}
          <nav className="mt-4 md:mt-6 flex items-center justify-between gap-3 animate-fadeIn" style={{ animationDelay: "0.2s" }}>
            <button
              type="button"
              className="min-h-[44px] min-w-[44px] px-6 py-3 rounded-xl border border-[var(--border)] bg-[var(--card)] text-[var(--fg)] hover:bg-[var(--card-elevated)] hover:scale-105 active:scale-100 transition-all duration-300 font-semibold"
              onClick={handlePrev}
            >
              {index === 0 ? "🚪 Salir" : "← Anterior"}
            </button>

            {index < exercises.length - 1 ? (
              <button
                type="button"
                className="min-h-[44px] min-w-[44px] px-6 py-3 rounded-xl bg-[var(--accent)] text-[var(--bg)] font-bold shadow-lg hover:shadow-xl hover:scale-105 active:scale-100 transition-all duration-300"
                onClick={handleNext}
              >
                Siguiente →
              </button>
            ) : (
              <button
                type="button"
                className="min-h-[44px] min-w-[44px] px-6 py-3 rounded-xl bg-[var(--accent)] text-[var(--bg)] font-bold shadow-lg hover:shadow-xl hover:scale-105 active:scale-100 transition-all duration-300"
                onClick={handleFinish}
              >
                ✓ Finalizar rutina
              </button>
            )}
          </nav>
        </>
      )}
    </main>
  );
}
