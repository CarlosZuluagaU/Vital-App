import type {ExerciseLite, ExerciseDetail, MultiComponentRoutine, RoutineSimple, LocationType} from '../types/InterfaceRoutines';

export type Level = "BASICO" | "INTERMEDIO";

const delay = (ms = 350) => new Promise((r) => setTimeout(r, ms));

const API_BASE = import.meta.env.VITE_API_BASE || "http://localhost:8080"; //!luego quitar el localhost quemado

type Json = Record<string, unknown>;

/** (placeholder para futuro) GET /api/progreso/semana?desde=YYYY-MM-DD */
export async function getWeeklySummary(/* desde: string */): Promise<{ totalMinutes: number; sessions: number }> {
  await delay();
  // Aún no implementado real; regresamos 0 para no bloquear UI
  const totalMinutes = 0;
  const sessions = 0;
  return { totalMinutes, sessions };
}

/* ------------------ */

const asQuery = (params: Record<string, string | number | undefined | null>) => Object.entries(params)
  .filter(([, v]) => v !== undefined && v !== null && `${v}` !== "")
  .map(([k, v]) => `${encodeURIComponent(k)}=${encodeURIComponent(String(v))}`)
  .join("&");

async function fetchJSON<T>(input: string, init?: RequestInit): Promise<T>{
  const res = await fetch(input, {
    headers: {"Content-Type": "application/json", Accept: "application/json"},
    ...init
  });
  if(!res.ok) throw new Error(`HTTP ${res.status} - ${res.statusText}`);
  return (await res.json()) as T;
}

function secondsFromExercise(e: ExerciseLite): number {
  const perSet = e.durationSeconds > 0 ? e.durationSeconds : 0;
  const sets = e.sets > 0 ? e.sets : 1;
  return perSet * sets;
}

export function estimateRoutineMinutes(r: MultiComponentRoutine): number {
  if (typeof r.totalDurationMinutes === "number" && r.totalDurationMinutes > 0) return r.totalDurationMinutes;
  const groups: (keyof MultiComponentRoutine)[] = [
    "warmUpExercises",
    "strengthExercises",
    "balanceExercises",
    "flexibilityExercises",
    "cardioExercises",
    "coolDownExercises",
  ];
  const totalSec = groups.reduce((acc, key) => {
    const list = r[key] as unknown;
    return acc + (Array.isArray(list) ? (list as ExerciseLite[]).reduce((s, ex) => s + secondsFromExercise(ex), 0) : 0);
  }, 0);
  return Math.max(1, Math.ceil(totalSec / 60));
}

/* --- ENDPOINTS MULTICOMPONENT ROUTINE --- */

// GET /api/multicomponent-routines
export async function getMultiComponentRoutines(): Promise<MultiComponentRoutine[]> {
  return fetchJSON<MultiComponentRoutine[]>(`${API_BASE}/api/multicomponent-routines`);
}

// GET /api/multicomponent-routines/intensity/{intensityLevel}
export async function getMultiComponentRoutinesByIntensity(intensityLevel: string): Promise<MultiComponentRoutine[]> {
  return fetchJSON<MultiComponentRoutine[]>(`${API_BASE}/api/multicomponent-routines/intensity/${intensityLevel}`);
}

// GET /api/multicomponent-routines/generate
export async function generateMultiComponentRoutine(args: {age: number; preferredIntensity?: string; locationType?: LocationType}): Promise<MultiComponentRoutine> {
  const q = asQuery({age: args.age, preferredIntensity: args.preferredIntensity, locationType: args.locationType});
  return fetchJSON<MultiComponentRoutine>(`${API_BASE}/api/multicomponent-routines/generate?${q}`);
}

// GET /api/multicomponent-routines/daily-routine
export async function getDailyMultiComponentRoutine(args: {age: number; preferredIntensity?: string}): Promise<MultiComponentRoutine>{
  const q = asQuery({age: args.age, preferredIntensity: args.preferredIntensity});
  return fetchJSON<MultiComponentRoutine>(`${API_BASE}/api/multicomponent-routines/daily-routine?${q}`);
}

// GET /api/multicomponent-routines/age-group/{ageGroup}
export async function getMultiComponentRoutinesByAgeGroup(ageGroup: string): Promise<MultiComponentRoutine[]>{
  return fetchJSON<MultiComponentRoutine[]>(`${API_BASE}/api/multicomponent-routines/age-group/${ageGroup}`);
}

//! No veo el GET para id nose si no existe o si es el de /api/routines/{id}
// Me lo invento
export async function getMultiComponentRoutineById(id: number): Promise<MultiComponentRoutine | null>{
  const list = await getMultiComponentRoutines();
  return list.find((r) => r.id === id) ?? null;
}

/* --- ENDPOINTS ROUTINE --- */

// GET /api/routines
export async function getSimpleRoutines(params?:{categoryId?: number; intensityId?: number}): Promise<RoutineSimple[]> {
  const q = params ? `?${asQuery(params)}` : "";
  return fetchJSON<RoutineSimple[]>(`${API_BASE}/api/routines${q}`);
}

// GET /api/routines/{id}
export async function getSimpleRoutineById(id: number): Promise<RoutineSimple>{
  return fetchJSON<RoutineSimple>(`${API_BASE}/api/routines/${id}`);
}

/* ---- ENDPOINTS EXERCISE ---- */

// GET /api/exercises
export async function getExercises(params?: {
  categoryId?: number;
  intensityId?: number;
  exerciseTypeId?: number;
  locationType?: LocationType;
}): Promise<ExerciseLite[]> {
  const q = params ? `?${asQuery(params)}` : "";
  return fetchJSON<ExerciseLite[]>(`${API_BASE}/api/exercises${q}`);  
}

// GET /api/exercises/{id}
export async function getExerciseById(id: number): Promise<ExerciseDetail>{
  return fetchJSON<ExerciseDetail>(`${API_BASE}/api/exercises/${id}`);
}

// GET /api/exercises/home
export async function getHomeExercises(params?: {categoryId?: number; intensityId?: number}): Promise<ExerciseLite[]> {
  const q = params ? `?${asQuery(params)}` : "";
  return fetchJSON<ExerciseLite[]>(`${API_BASE}/api/exercises/home${q}`);
}

// GET /api/exercises/gym
export async function getGymExercises(params?: {categoryId?: number; intensityId?: number}): Promise<ExerciseLite[]> {
  const q = params ? `?${asQuery(params)}` : "";
  return fetchJSON<ExerciseLite[]>(`${API_BASE}/api/exercises/gym${q}`);
}

// GET /api/exercises/category/{categoryId}
export async function getExercisesByCategory(categoryId: number, locationType?: LocationType): Promise<ExerciseLite[]> {
  const q = locationType ? `?${asQuery({locationType})}` : "";
  return fetchJSON<ExerciseLite[]>(`${API_BASE}/api/exercises/category/${categoryId}${q}`);
}


/* ---- ENDPOINTS EXERCISE ---- */

// POST /api/me/activities
export async function postActivity(body: {activityType: string; relatedEntityId: number}): Promise<Json> {
    return fetchJSON<Json>(`${API_BASE}/api/me/activities`, {
      method: "POST",
      body: JSON.stringify(body),
    });
}