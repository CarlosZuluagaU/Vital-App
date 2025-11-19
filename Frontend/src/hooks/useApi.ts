import type {
  ApiEnvelope,
  MaybeEnveloped,
  AuthResponse,
  RegisterRequestDTO,
  UserDTO,
  RoutineSummaryDTO,
  RoutineDetailDTO,
  ExerciseSummaryDTO,
  ExerciseDetailDTO,
  MultiComponentRoutineDTO,
  ActivityLogRequestDTO,
  ActivityLogConfirmationDTO,
  CategoryDTO,
  IntensityDTO,
  ExerciseTypeDTO,
  SubscriptionPlanDTO,
  LocationType,
  WeeklySummary,
} from "../types/InterfaceRoutines";


function normalizeRoutineDetail(raw: any): RoutineDetailDTO & { exercises: ExerciseSummaryDTO[] } {
  const exercises: ExerciseSummaryDTO[] =
    raw?.exercises ??
    raw?.exerciseList ??
    raw?.exerciseDTOs ??
    raw?.items ??
    [];

  return {
    id: raw?.id,
    title: raw?.title ?? raw?.name ?? "Rutina",
    description: raw?.description,
    durationMinutes: raw?.durationMinutes ?? raw?.estimatedMinutes,
    intensityName: raw?.intensityName ?? raw?.intensity ?? raw?.intensityLevel,
    categoryName: raw?.categoryName ?? raw?.category,
    videoUrl: raw?.videoUrl,
    thumbnailUrl: raw?.thumbnailUrl,
    // garantizamos siempre exercises
    exercises,
  };
}


type AnyLogin = 
  | { email: string; password: string }
  | { username: string; password: string }
  | { usernameOrEmail: string; password: string };


// Base y storage
const API_BASE = import.meta.env.VITE_API_BASE || "http://localhost:8080";
// 'header' = Bearer en Authorization | 'cookie' = sesión por cookie HttpOnly
const AUTH_MODE = (import.meta.env.VITE_AUTH_MODE || "header") as "header" | "cookie";
const USE_COOKIES = AUTH_MODE === "cookie";

const TOKEN_KEY = "auth:token";
const REFRESH_KEY = "auth:refresh";

export function setAuthToken(token: string | null) {
  if (token) localStorage.setItem(TOKEN_KEY, token);
  else localStorage.removeItem(TOKEN_KEY);
}
export function getAuthToken() { return localStorage.getItem(TOKEN_KEY); }

export function setRefreshToken(token: string | null) {
  if (token) localStorage.setItem(REFRESH_KEY, token);
  else localStorage.removeItem(REFRESH_KEY);
}
export function getRefreshToken() { return localStorage.getItem(REFRESH_KEY); }

// Utilidades
const asQuery = (params: Record<string, string | number | boolean | undefined | null>) =>
  Object.entries(params)
    .filter(([, v]) => v !== undefined && v !== null && `${v}` !== "")
    .map(([k, v]) => `${encodeURIComponent(k)}=${encodeURIComponent(String(v))}`)
    .join("&");

const param = <T extends string | number | boolean | undefined | null>(v: T) =>
  v !== undefined && v !== null && `${v}` !== "" ? v : undefined;

type HttpMethod = "GET" | "POST" | "PUT" | "DELETE";

async function coreFetch<T>(path: string, method: HttpMethod = "GET", body?: unknown, extra?: RequestInit): Promise<T> {
  const token = getAuthToken();

  const headers: Record<string, string> = {
    "Content-Type": "application/json",
    Accept: "application/json",
    ...(extra?.headers as Record<string, string>),
    ...(token ? { Authorization: `Bearer ${token}` } : {}),
  };

  const res = await fetch(`${API_BASE}${path}`, {
    method,
    headers,
    credentials: USE_COOKIES ? "include" : "omit",
    body: body !== undefined ? JSON.stringify(body) : undefined,
    ...extra,
  });


  // Manejo de 401 con posible refresh
  if (res.status === 401 && getRefreshToken()) {
    const ok = await tryRefreshToken();
    if (ok) {
      // Reintento 1 vez
      return coreFetch<T>(path, method, body, extra);
    }
  }

  if (!res.ok) {
    const text = await res.text().catch(() => "");
    throw new Error(`HTTP ${res.status} ${res.statusText}${text ? ` — ${text}` : ""}`);
  }
  if (res.status === 204) return undefined as unknown as T;

  const json = (await res.json()) as MaybeEnveloped<T>;

  // Si viene envuelto como { success, data }
  if (isEnvelope(json)) {
    return (json.data ?? undefined) as T;
  }
  // Si viene plano, retorna tal cual
  return json as T;
}

function isEnvelope<T>(v: any): v is ApiEnvelope<T> {
  return v && typeof v === "object" && "success" in v && "data" in v;
}

/** ---------- Helper: refresh token (si el backend lo expone) ---------- */
async function tryRefreshToken(): Promise<boolean> {
  const rt = getRefreshToken();
  if (!rt) return false;
  try {
    const res = await fetch(`${API_BASE}/api/auth/refresh`, {
      method: "POST",
      headers: { "Content-Type": "application/json", Accept: "application/json" },
      credentials: USE_COOKIES ? "include" : "omit",
      body: JSON.stringify({ refreshToken: rt }),
    });
    if (!res.ok) throw new Error(`HTTP ${res.status}`);
    const data = await res.json().catch(() => ({}));
    const { token, refreshToken } = extractAuthTokens(data, res);
    if (token) setAuthToken(token);
    if (refreshToken) setRefreshToken(refreshToken);
    return !!token;
  } catch {
    setAuthToken(null);
    setRefreshToken(null);
    return false;
  }
}

/** ---------- Auth extractors: soporta doc de pruebas y doc de seguridad ---------- */
// helpers de extracción tolerantes (token con nombres distintos)
function extractAuthTokens(resp: AuthResponse, res?: Response): { token?: string; refreshToken?: string } {
  const payload = (resp && typeof resp === "object" && "success" in resp && "data" in resp) ? (resp as any).data : resp;
  const token =
    payload?.token ??
    payload?.accessToken ??
    payload?.jwt ??
    payload?.id_token ??
    payload?.idToken ??
    undefined;

  const refreshToken = payload?.refreshToken ?? payload?.refresh_token ?? undefined;

  // algunos backends envían el bearer en header
  let headerToken: string | undefined;
  if (res) {
    const h = res.headers.get("authorization") || res.headers.get("Authorization");
    if (h?.toLowerCase().startsWith("bearer ")) headerToken = h.slice(7);
  }
  return { token: token ?? headerToken, refreshToken };
}

function extractUser(resp: AuthResponse): UserDTO | undefined {
  const payload = (resp && typeof resp === "object" && "success" in resp && "data" in resp) ? (resp as any).data : resp;
  return payload?.user;
}

/** ---------- OAuth2 helpers (según guía OAuth2) ---------- */
// El backend redirige a: http://localhost:3000/oauth2/redirect?token=JWT...
// Guardamos el token y limpiamos la URL.  :contentReference[oaicite:3]{index=3}
export function handleOAuth2Redirect() {
  const url = new URL(window.location.href);
  const token = url.searchParams.get("token");
  if (token) {
    setAuthToken(token);
    // opcional: si también envías refreshToken como query, tómalo aquí
    url.searchParams.delete("token");
    window.history.replaceState({}, document.title, url.pathname + url.search);
  }
}

/** ---------- Public API ---------- */
// Auth
export async function register(payload: any): Promise<UserDTO> {
  const username =
    payload.username || payload.name || (payload.email ? payload.email.split("@")[0] : "usuario");

  const res = await fetch(`${API_BASE}/api/auth/register`, {
    method: "POST",
    headers: { "Content-Type": "application/json", Accept: "application/json" },
    credentials: USE_COOKIES ? "include" : "omit",
    body: JSON.stringify({ ...payload, username }),
  });
  if (!res.ok) throw new Error(`HTTP ${res.status} ${res.statusText}`);
  const json = await res.json().catch(() => ({}));
  const { token, refreshToken } = extractAuthTokens(json, res);
  if (import.meta.env.DEV) {
    //TODO: quitar luego
    console.debug("[auth] extractAuthTokens()", { token, refreshToken, payload: json });
  }
  const user = extractUser(json);
  //TODO: Quitarluego tambien
  if (import.meta.env.DEV) {
    console.debug("[auth] extractUser()", user);
  }

  if (token) setAuthToken(token);
  if (refreshToken) setRefreshToken(refreshToken);

  if (!user) {
    try { return await getMe(); } catch { return null as any; }
  }
  return user!;
}

export async function login(payload: AnyLogin): Promise<UserDTO> {
  const usernameOrEmail = (payload as any).usernameOrEmail ?? (payload as any).email ?? (payload as any).username;
  const body = { usernameOrEmail, password: (payload as any).password };

  // usamos fetch directo para poder leer headers si vienen ahí
  const res = await fetch(`${API_BASE}/api/auth/login`, {
    method: "POST",
    headers: { "Content-Type": "application/json", Accept: "application/json" },
    credentials: USE_COOKIES ? "include" : "omit",
    body: JSON.stringify(body),
  });
  if (!res.ok) {
    const text = await res.text().catch(()=>"");
    throw new Error(`HTTP ${res.status} ${res.statusText}${text ? ` — ${text}` : ""}`);
  }
  const json = await res.json().catch(() => ({}));
  const { token, refreshToken } = extractAuthTokens(json, res);
  if (import.meta.env.DEV) {
    //TODO: quitar luego
    console.debug("[auth] extractAuthTokens()", { token, refreshToken, payload: json });
  }
  const user = extractUser(json);
  //TODO: Quitarluego tambien
  if (import.meta.env.DEV) {
    console.debug("[auth] extractUser()", user);
  }

  if (token) setAuthToken(token);
  if (refreshToken) setRefreshToken(refreshToken);

  // si el backend no incluyó user (común cuando usa cookie), lo pedimos a /me
  if (!user) {
    try { return await getMe(); } catch { return null as any; }
  }
  return user!;
}

export async function getMe(): Promise<UserDTO> {
  return coreFetch<UserDTO>("/api/auth/me", "GET");
}

export function logout() {
  setAuthToken(null);
  setRefreshToken(null);
}

// OAuth2 starters (redirigen al backend)
export function startGoogleOAuth() {
  window.location.href = `${API_BASE}/oauth2/authorization/google`;
}
export function startFacebookOAuth() {
  window.location.href = `${API_BASE}/oauth2/authorization/facebook`;
}

// ---------- Routines ----------
export async function getRoutines(params?: {
  categoryId?: number;
  intensityId?: number;
  category?: string;   // /api/routines?category=Cardio (guía pruebas)
  intensity?: string;  // /api/routines?intensity=Bajo (guía pruebas)
}): Promise<RoutineSummaryDTO[]> {
  const q = asQuery({
    categoryId: param(params?.categoryId),
    intensityId: param(params?.intensityId),
    category: param(params?.category),
    intensity: param(params?.intensity),
  });
  const qs = q ? `?${q}` : "";
  return coreFetch<RoutineSummaryDTO[]>(`/api/routines${qs}`, "GET");
}

export async function getRoutineById(id: number) {
  const raw = await coreFetch<any>(`/api/routines/${id}`, "GET");
  return normalizeRoutineDetail(raw);
}

// ---------- Exercises ----------
export async function getExercises(params?: {
  categoryId?: number;
  intensityId?: number;
  exerciseTypeId?: number;
  locationType?: LocationType;
}): Promise<ExerciseSummaryDTO[]> {
  const q = asQuery({
    categoryId: param(params?.categoryId),
    intensityId: param(params?.intensityId),
    exerciseTypeId: param(params?.exerciseTypeId),
    locationType: param(params?.locationType),
  });
  const qs = q ? `?${q}` : "";
  return coreFetch<ExerciseSummaryDTO[]>(`/api/exercises${qs}`, "GET");
}

export async function getExerciseById(id: number): Promise<ExerciseDetailDTO> {
  return coreFetch<ExerciseDetailDTO>(`/api/exercises/${id}`, "GET");
}

export async function getHomeExercises(params?: { categoryId?: number; intensityId?: number; })
: Promise<ExerciseSummaryDTO[]> {
  const q = asQuery({
    categoryId: param(params?.categoryId),
    intensityId: param(params?.intensityId),
  });
  const qs = q ? `?${q}` : "";
  return coreFetch<ExerciseSummaryDTO[]>(`/api/exercises/home${qs}`, "GET");
}

export async function getGymExercises(params?: { categoryId?: number; intensityId?: number; })
: Promise<ExerciseSummaryDTO[]> {
  const q = asQuery({
    categoryId: param(params?.categoryId),
    intensityId: param(params?.intensityId),
  });
  const qs = q ? `?${q}` : "";
  return coreFetch<ExerciseSummaryDTO[]>(`/api/exercises/gym${qs}`, "GET");
}

// ---------- Multicomponent ----------
export async function getMultiComponentRoutines(): Promise<MultiComponentRoutineDTO[]> {
  return coreFetch<MultiComponentRoutineDTO[]>(`/api/multicomponent-routines`, "GET");
}
export async function getMultiByIntensity(level: string): Promise<MultiComponentRoutineDTO[]> {
  return coreFetch<MultiComponentRoutineDTO[]>(`/api/multicomponent-routines/intensity/${encodeURIComponent(level)}`, "GET");
}
export async function generateMulti(args: { age: number; preferredIntensity?: string; locationType?: LocationType; })
: Promise<MultiComponentRoutineDTO> {
  const q = asQuery({
    age: args.age,
    preferredIntensity: param(args.preferredIntensity),
    locationType: param(args.locationType),
  });
  return coreFetch<MultiComponentRoutineDTO>(`/api/multicomponent-routines/generate?${q}`, "GET");
}
export async function getDailyMulti(args: { age: number; preferredIntensity?: string; })
: Promise<MultiComponentRoutineDTO> {
  const q = asQuery({
    age: args.age,
    preferredIntensity: param(args.preferredIntensity),
  });
  return coreFetch<MultiComponentRoutineDTO>(`/api/multicomponent-routines/daily-routine?${q}`, "GET");
}
export async function getMultiByAgeGroup(ageGroup: string): Promise<MultiComponentRoutineDTO[]> {
  return coreFetch<MultiComponentRoutineDTO[]>(`/api/multicomponent-routines/age-group/${encodeURIComponent(ageGroup)}`, "GET");
}

// ---------- Activity Log ----------
export async function postActivity(body: ActivityLogRequestDTO): Promise<ActivityLogConfirmationDTO> {
  // En doc técnica: POST /api/me/activities retorna { status, message, newAchievements }  :contentReference[oaicite:4]{index=4}
  return coreFetch<ActivityLogConfirmationDTO>(`/api/me/activities`, "POST", body);
}

// ---------- Catálogos y Users (según guía de endpoints de prueba) ----------
export async function getCategories(): Promise<CategoryDTO[]> {
  return coreFetch<CategoryDTO[]>(`/api/categories`, "GET");
}
export async function getIntensities(): Promise<IntensityDTO[]> {
  return coreFetch<IntensityDTO[]>(`/api/intensities`, "GET");
}
export async function getExerciseTypes(): Promise<ExerciseTypeDTO[]> {
  return coreFetch<ExerciseTypeDTO[]>(`/api/exercise-types`, "GET");
}
export async function getSubscriptionPlans(): Promise<SubscriptionPlanDTO[]> {
  return coreFetch<SubscriptionPlanDTO[]>(`/api/subscription-plans`, "GET");
}

// Users (admin / gestionados)
export async function getUserById(id: number) { return coreFetch<UserDTO>(`/api/users/${id}`, "GET"); }
export async function updateUser(id: number, patch: Partial<UserDTO>) { return coreFetch<UserDTO>(`/api/users/${id}`, "PUT", patch); }
export async function deleteUser(id: number) { return coreFetch<void>(`/api/users/${id}`, "DELETE"); }
export async function subscribeUser(userId: number, planId: number) {
  return coreFetch<void>(`/api/users/${userId}/subscribe/${planId}`, "POST");
}
export async function cancelSubscription(userId: number) {
  return coreFetch<void>(`/api/users/${userId}/subscription`, "DELETE");
}

/** ---------- Utilidades UI ---------- */
function secondsFromExercise(e: ExerciseSummaryDTO): number {
  const perSet = e.durationSeconds && e.durationSeconds > 0 ? e.durationSeconds : 0;
  const sets = e.sets && e.sets > 0 ? e.sets : 1;
  return perSet * sets;
}
export function estimateRoutineMinutes(r: MultiComponentRoutineDTO): number {
  if (typeof r.totalDurationMinutes === "number" && r.totalDurationMinutes > 0) return r.totalDurationMinutes;
  const groups: (keyof MultiComponentRoutineDTO)[] = [
    "warmUpExercises", "strengthExercises", "balanceExercises",
    "flexibilityExercises", "cardioExercises", "coolDownExercises",
  ];
  const totalSec = groups.reduce((acc, key) => {
    const list = r[key] as unknown;
    return acc + (Array.isArray(list) ? (list as ExerciseSummaryDTO[]).reduce((s, ex) => s + secondsFromExercise(ex), 0) : 0);
  }, 0);
  return Math.max(1, Math.ceil(totalSec / 60));
}

// Placeholder (si luego expones progreso semanal real)
export async function getWeeklySummary(): Promise<WeeklySummary> {
  return { totalMinutes: 0, sessions: 0 };
}

/** ---------- Perfil y Contraseña ---------- */
export async function verifyPassword(password: string): Promise<boolean> {
  try {
    const res = await coreFetch<{ success: boolean }>("/api/auth/verify-password", "POST", { password });
    return res.success;
  } catch {
    return false;
  }
}

export async function changePassword(currentPassword: string, newPassword: string): Promise<void> {
  await coreFetch<void>("/api/auth/change-password", "PUT", { currentPassword, newPassword });
}

export async function updateProfile(name: string, avatarId: number): Promise<UserDTO> {
  return coreFetch<UserDTO>("/api/auth/me", "PUT", { name, avatarId });
}
