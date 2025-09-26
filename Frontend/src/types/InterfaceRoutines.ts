export type LocationType = "HOME" | "GYM" | string;

export interface ExerciseLite {
  id: number;
  name: string;
  description: string;
  categoryName: string;
  intensityName: string;
  exerciseTypeName: string;
  locationType: LocationType;
  durationSeconds: number;
  repetitions: number;
  sets: number;
  imageUrl?: string;
  videoUrl?: string;
  safetyTips?: string;
  benefitsDescription?: string;
}

export interface ExerciseDetail extends ExerciseLite {
  instructions?: string;
  modifications?: string;
  benefits?: string;
}

export interface MultiComponentRoutine {
  id: number;
  title: string;
  description: string;
  totalDurationMinutes: number;
  intensityLevel: string;
  ageGroup: string;
  warmUpExercises: ExerciseLite[];
  strengthExercises: ExerciseLite[];
  balanceExercises: ExerciseLite[];
  flexibilityExercises: ExerciseLite[];
  cardioExercises: ExerciseLite[];
  coolDownExercises: ExerciseLite[];
  safetyNotes?: string;
  adaptationNotes?: string;
  benefitsDescription?: string;
}

export interface RoutineSimple {
  id: number;
  title: string;
  durationMinutes: number;
  intensityName?: string;
  categoryName?: string;
  thumbnailUrl?: string | null;
  videoUrl?: string | null;
  description?: string;
}