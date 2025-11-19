export type LocationType = "HOME" | "GYM" | string;
export type PlanStatus = "ACTIVE" | "CANCELED" | "PAUSED" | string;
export type Provider = "LOCAL" | "GOOGLE" | "FACEBOOK" | string;

/** ---------- Envelope estándar (la guía de testing lo usa) ---------- */
// { success, message, data, timestamp }
export interface ApiEnvelope<T = unknown> {
  success: boolean;
  message?: string;
  data: T | null;
  timestamp?: string;
}

// Algunas rutas pueden responder sin “envelope” (según doc de seguridad)
export type MaybeEnveloped<T> = T | ApiEnvelope<T>;

/** ---------- Usuario / Auth ---------- */
export interface SubscriptionDTO {
  isPremium: boolean;
  planName: string;
  status?: PlanStatus;
  startDate?: string;
  endDate?: string;
}

export interface UserDTO {
  id: number;
  username: string;
  name?: string;
  email?: string;
  age?: number;
  phone?: string;
  provider?: Provider;
  avatarId?: number;
  createdAt?: string;
  subscription?: SubscriptionDTO;
  roles?: string[];
}

export interface AuthFlatDTO {
  token: string;
  refreshToken?: string;
  user: UserDTO;
  subscription?: SubscriptionDTO;
}

export interface AuthWrappedDTO {
  token: string;
  refreshToken?: string;
  user: UserDTO;
  subscription?: SubscriptionDTO;
}

export type AuthResponse =
  | AuthFlatDTO
  | ApiEnvelope<AuthWrappedDTO>; // Soporta ambos estilos del back

export interface LoginRequestDTO {
  // Según guía de testing el login es con username o email + password
  usernameOrEmail: string;
  password: string;
}

export interface RegisterRequestDTO {
  username?: string; // si no llega, lo derivamos del email
  email: string;
  password: string;
  name?: string;
  age?: number;
  phone?: string;
}

/** ---------- Rutinas ---------- */
export interface RoutineSummaryDTO {
  id: number;
  title: string;
  durationMinutes?: number;
  intensityName?: string;
  categoryName?: string;
  thumbnailUrl?: string;
}

export interface RoutineDetailDTO extends RoutineSummaryDTO {
  description?: string;
  videoUrl?: string;
}

/** ---------- Ejercicios ---------- */
export interface ExerciseSummaryDTO {
  id: number;
  name: string;
  intensity?: string;
  categoryId?: number;
  exerciseTypeId?: number;
  locationType?: LocationType;
  durationSeconds?: number;
  sets?: number;
  repetitions?: number | null;
  isPremium?: boolean;
  thumbnailUrl?: string;
}

export interface ExerciseDetailDTO extends ExerciseSummaryDTO {
  description?: string;
  instructions?: string;
  steps?: string[];
  muscles?: string[];
  equipment?: string[];
  videoUrl?: string;
  precautions?: string[];
}

/** ---------- Multicomponent Routine ---------- */
export interface MultiComponentRoutineDTO {
  id?: number;
  title: string;
  description?: string;
  totalDurationMinutes?: number;

  warmUpExercises?: ExerciseSummaryDTO[];
  strengthExercises?: ExerciseSummaryDTO[];
  balanceExercises?: ExerciseSummaryDTO[];
  flexibilityExercises?: ExerciseSummaryDTO[];
  cardioExercises?: ExerciseSummaryDTO[];
  coolDownExercises?: ExerciseSummaryDTO[];
}

/** ---------- Activity Log ---------- */
export interface ActivityLogRequestDTO {
  activityType: string;            // p.ej. "ROUTINE_COMPLETED"
  relatedEntityId: number;         // id de rutina/ejercicio
}
export interface ActivityLogConfirmationDTO {
  status: "success" | "error";
  message: string;
  newAchievements?: unknown[];
}

/** ---------- Catálogos / varios ---------- */
export interface CategoryDTO { id: number; name: string; description?: string; }
export interface IntensityDTO { id: number; name: string; level?: number; }
export interface ExerciseTypeDTO { id: number; name: string; description?: string; locationType?: LocationType; }
export interface SubscriptionPlanDTO { id: number; name: string; price?: number; durationDays?: number; }

/** ---------- Utilidades ---------- */
export interface WeeklySummary { totalMinutes: number; sessions: number; }