export type Level = "BASICO" | "INTERMEDIO";
export type Intensity = "BAJA" | "MEDIA" | "ALTA";
export type ExerciseType = "FUERZA" | "EQUILIBRIO" | "FUNCIONAL";
export type Category = "MOVILIDAD" | "FUERZA" | "EQUILIBRIO" | "FUNCIONAL";

//TODO: Organizar bien esto para que sea real y no solo con datos quemados


export interface Routine {
  id: string;
  level: Level;
  title: string;
  description?: string;
  duration_minutes: number; // 1..300
  intensity?: Intensity;
  category?: Category;
  // opcionales de UI
  thumbnail?: string;
}

export interface Exercise {
  id: string;
  name: string;
  instructions: string;
  video_url?: string;
  type: ExerciseType;
}

export interface RoutineExercise {
  id: string;
  routine_id: string;   // FK routines.id
  exercise_id: string;  // FK exercises.id
  order_index: number;  // >= 0, único en la rutina
  repetitions?: number;
  duration_seconds?: number;
}

export interface ProgressRecord {
  id: string;
  user_id?: string;     // opcional (no hay login real)
  routine_id: string;   // FK routines.id
  date: string;         // ISO (no futura)
  minutes: number;      // 1..300
  created_at: string;   // ISO auto
}

// ---------------------------------------------------------------------
// MOCK DATA (coherente con ERD)
// ---------------------------------------------------------------------

const ROUTINES: Routine[] = [
  {
    id: "r1",
    level: "BASICO",
    title: "Movilidad suave de mañana",
    description: "Activa articulaciones y circulación.",
    duration_minutes: 12,
    intensity: "BAJA",
    category: "MOVILIDAD",
    thumbnail: "/assets/routines/movilidad-am.png"
  },
  {
    id: "r2",
    level: "BASICO",
    title: "Estiramientos en silla",
    description: "Secuencia segura usando una silla estable.",
    duration_minutes: 10,
    intensity: "BAJA",
    category: "FUNCIONAL"
  },
  {
    id: "r3",
    level: "INTERMEDIO",
    title: "Fuerza ligera con bandas",
    description: "Tren superior e inferior con banda elástica.",
    duration_minutes: 18,
    intensity: "MEDIA",
    category: "FUERZA"
  }
];

const EXERCISES: Exercise[] = [
  { id: "e1", name: "Rotación cervical", instructions: "Gira la cabeza suave a cada lado, sin dolor.", type: "FUNCIONAL" },
  { id: "e2", name: "Elevación de talones", instructions: "Súbete de puntas y baja lento sujetándote.", type: "EQUILIBRIO" },
  { id: "e3", name: "Remo con banda", instructions: "Tira de la banda hacia el torso con espalda recta.", type: "FUERZA" },
];

const ROUTINE_EXERCISES: RoutineExercise[] = [
  { id: "re1", routine_id: "r1", exercise_id: "e1", order_index: 0, duration_seconds: 45 },
  { id: "re2", routine_id: "r1", exercise_id: "e2", order_index: 1, duration_seconds: 45 },
  { id: "re3", routine_id: "r2", exercise_id: "e1", order_index: 0, repetitions: 8 },
  { id: "re4", routine_id: "r3", exercise_id: "e3", order_index: 0, repetitions: 12 },
];

let PROGRESS: ProgressRecord[] = [];

const delay = (ms = 350) => new Promise((r) => setTimeout(r, ms));

// ---------------------------------------------------------------------
// API simulada (mapea a los endpoints previstos)
// ---------------------------------------------------------------------

/** GET /api/rutinas?nivel=basico|intermedio */
export async function getRoutines(level?: "basico" | "intermedio"): Promise<Routine[]> {
  await delay();
  if (!level) return ROUTINES.slice();
  const L: Level = level === "basico" ? "BASICO" : "INTERMEDIO";
  return ROUTINES.filter(r => r.level === L);
}

/** GET /api/rutinas/:id  (devuelve rutina + ejercicios en orden) */
export interface RoutineDetail extends Routine {
  exercises: Array<Exercise & { order_index: number; repetitions?: number; duration_seconds?: number }>;
}

export async function getRoutineById(id: string): Promise<RoutineDetail | null> {
  await delay();
  const base = ROUTINES.find(r => r.id === id);
  if (!base) return null;
  const join = ROUTINE_EXERCISES
    .filter(x => x.routine_id === id)
    .sort((a, b) => a.order_index - b.order_index)
    .map(x => {
      const ex = EXERCISES.find(e => e.id === x.exercise_id)!;
      return { ...ex, order_index: x.order_index, repetitions: x.repetitions, duration_seconds: x.duration_seconds };
    });

  return { ...base, exercises: join };
}

/** POST /api/progreso { date, minutes, routineId } */
export async function postProgress(input: { user_id?: string; routine_id: string; date: string; minutes: number }): Promise<ProgressRecord> {
  await delay();
  const now = new Date().toISOString();
  const rec: ProgressRecord = {
    id: `p_${Math.random().toString(36).slice(2, 9)}`,
    user_id: input.user_id,
    routine_id: input.routine_id,
    date: input.date,
    minutes: input.minutes,
    created_at: now
  };
  PROGRESS = [rec, ...PROGRESS];
  return rec;
}

/** (placeholder para futuro) GET /api/progreso/semana?desde=YYYY-MM-DD */
export async function getWeeklySummary(/* desde: string */): Promise<{ totalMinutes: number; sessions: number }> {
  await delay();
  // Aún no implementado real; regresamos 0 para no bloquear UI
  const totalMinutes = 0;
  const sessions = 0;
  return { totalMinutes, sessions };
}
