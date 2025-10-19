// src/utils/weekly.ts
export type DaySummary = { date: string; totalSeconds: number; sessions: number };

export type WeeklySummary = {
  totalSeconds: number;
  sessions: number;
  byDay: DaySummary[]; // 7 días [lun..dom] o [hoy-6 .. hoy]
  streakDays: number;  // racha de días consecutivos con actividad
  averagePerDaySeconds: number;
};

const DAY_BUCKET_PREFIX = "workouts:byDate:";

function toKey(date: Date) {
  return `${DAY_BUCKET_PREFIX}${date.toISOString().slice(0, 10)}`;
}

/** Retorna los últimos N días empezando en hoy (incluido), en orden cronológico */
function lastNDates(n = 7): Date[] {
  const today = new Date();
  const list: Date[] = [];
  for (let i = n - 1; i >= 0; i--) {
    const d = new Date(today);
    d.setHours(0, 0, 0, 0);
    d.setDate(today.getDate() - i);
    list.push(d);
  }
  return list;
}

export function getLocalWeeklySummary(nDays = 7): WeeklySummary {
  const days = lastNDates(nDays);

  const byDay = days.map((d): DaySummary => {
    const raw = localStorage.getItem(toKey(d));
    const arr = raw ? (JSON.parse(raw) as { totalSeconds?: number }[]) : [];
    const totalSeconds = arr.reduce((acc, s) => acc + (s.totalSeconds ?? 0), 0);
    return { date: d.toISOString().slice(0, 10), totalSeconds, sessions: arr.length };
  });

  const totalSeconds = byDay.reduce((acc, d) => acc + d.totalSeconds, 0);
  const sessions = byDay.reduce((acc, d) => acc + d.sessions, 0);
  const averagePerDaySeconds = Math.round(totalSeconds / nDays);

  // Racha: contar hacia atrás desde hoy días con totalSeconds > 0
  let streakDays = 0;
  for (let i = byDay.length - 1; i >= 0; i--) {
    if (byDay[i].totalSeconds > 0) streakDays++;
    else break;
  }

  return { totalSeconds, sessions, byDay, streakDays, averagePerDaySeconds };
}
