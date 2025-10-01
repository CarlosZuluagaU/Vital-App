// Tipos para VitalApp

export interface RoutineSummary {
  id: string;
  title: string;
  level: 'basico' | 'intermedio';
}

export interface Exercise {
  id: string;
  name: string;
  description: string;
  orderIndex: number;
}

export interface RoutineDetail extends RoutineSummary {
  description: string;
  exercises: Exercise[];
}

export interface CreateProgressRequest {
  date: string; // YYYY-MM-DD
  minutes: number;
  routineId: string;
}

export interface WeeklyTotalsResponse {
  days: Array<{
    date: string; // YYYY-MM-DD
    totalMinutes: number;
  }>;
}
