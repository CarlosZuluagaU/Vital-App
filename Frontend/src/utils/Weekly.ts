export type DaySummary = { date: string; totalSeconds: number; sessions: number };

export type WeeklySummary = {
  totalSeconds: number;
  sessions: number;
  byDay: DaySummary[];
  streakDays: number;
  averagePerDaySeconds: number;
};

const DAY_BUCKET_PREFIX = "workouts:byDate:";

const pad2 = (n: number) => String(n).padStart(2, "0");
const localISODate = (d: Date) => `${d.getFullYear()}-${pad2(d.getMonth() + 1)}-${pad2(d.getDate())}`;

function toKey(date: Date) {
  return `${DAY_BUCKET_PREFIX}${localISODate(date)}`;
}

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

export function getLocalWeeklySummary(nDays = 7) {
  const days = lastNDates(nDays);

  const byDay = days.map((d) => {
    const raw = localStorage.getItem(toKey(d));
    const arr = raw ? (JSON.parse(raw) as { totalSeconds?: number }[]) : [];
    const totalSeconds = arr.reduce((acc, s) => acc + (s.totalSeconds ?? 0), 0);
    return { date: localISODate(d), totalSeconds, sessions: arr.length };
  });

  const totalSeconds = byDay.reduce((acc, d) => acc + d.totalSeconds, 0);
  const sessions = byDay.reduce((acc, d) => acc + d.sessions, 0);
  const averagePerDaySeconds = Math.round(totalSeconds / nDays);

  let streakDays = 0;
  for (let i = byDay.length - 1; i >= 0; i--) {
    if (byDay[i].totalSeconds > 0) streakDays++;
    else break;
  }

  return { totalSeconds, sessions, byDay, streakDays, averagePerDaySeconds };
}
