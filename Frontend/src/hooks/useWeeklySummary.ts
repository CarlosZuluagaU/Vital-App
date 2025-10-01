import type { WeeklyTotalsResponse } from '../types';

export function useWeeklySummary() {
  // Transforma la respuesta en matriz de días (si faltan días, los rellena con 0)
  const toMatrix = (desde: string, data: WeeklyTotalsResponse) => {
    const result: { date: string; totalMinutes: number }[] = [];
    const start = new Date(desde);
    for (let i = 0; i < 7; i++) {
      const d = new Date(start);
      d.setDate(start.getDate() + i);
      const dateStr = d.toISOString().slice(0, 10);
      const found = data.days.find(day => day.date === dateStr);
      result.push({ date: dateStr, totalMinutes: found ? found.totalMinutes : 0 });
    }
    return result;
  };
  return { toMatrix };
}
