import { useNavigate } from "react-router-dom";
import { getLocalWeeklySummary } from "../utils/Weekly";
import { fireMascotCue } from "../components/pet/VitaAssistant";
import { useEffect, useRef, useState, useCallback } from "react";
import { getWeeklyActivityStats } from "../hooks/useApi";
import type { WeeklyStatsDTO } from "../types/InterfaceRoutines";

interface WeeklySummaryData {
  totalSeconds: number;
  sessions: number;
  byDay: Array<{
    date: string;
    totalSeconds: number;
    sessions: number;
  }>;
  currentStreak: number; // Racha desde el backend
  averagePerDaySeconds: number;
}

const processWeeklyStats = (stats: WeeklyStatsDTO): WeeklySummaryData => {
  const byDay = stats.days.map((day) => ({
    date: day.date,
    totalSeconds: day.totalMinutes * 60,
    sessions: day.sessions,
  }));

  const hasTotalMinutes = typeof stats.totalMinutes === "number" && !Number.isNaN(stats.totalMinutes);
  const totalSeconds = hasTotalMinutes
    ? Math.max(stats.totalMinutes, 0) * 60
    : byDay.reduce((acc, day) => acc + day.totalSeconds, 0);
  const sessions = stats.totalSessions ?? byDay.reduce((acc, day) => acc + day.sessions, 0);

  // Usar la racha calculada por el backend (días consecutivos desde hoy)
  const currentStreak = stats.currentStreak ?? 0;

  const averagePerDaySeconds = byDay.length > 0 ? totalSeconds / byDay.length : 0;

  return {
    totalSeconds,
    sessions,
    byDay,
    currentStreak,
    averagePerDaySeconds,
  };
};

const fmtMin = (sec: number) => Math.floor(sec / 60);
const weekdayShort = (iso: string) => {
  const d = new Date(iso + "T00:00:00");
  return d.toLocaleDateString(undefined, { weekday: "short" }); // lun, mar, ...
};

export default function WeeklySummary() {
  const nav = useNavigate();
  const [summaryData, setSummaryData] = useState<WeeklySummaryData | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  
  // Meta simple (personalizable): 15 min/día
  const dailyGoalMin = 15;
  
  const greetedRef = useRef(false);

  // Función para obtener datos del backend
  const mondayLocal = () => {
    const d = new Date();
    const day = d.getDay(); // 0=Sun
    const diffToMonday = (day === 0 ? -6 : 1 - day); // if Sunday go back 6 days
    const monday = new Date(d);
    monday.setDate(d.getDate() + diffToMonday);
    monday.setHours(0,0,0,0);
    return monday.toISOString().slice(0,10);
  };

  const mondayOf = (date: Date) => {
    const d = new Date(date);
    const day = d.getDay(); // 0=Sun...6=Sat
    const diffToMonday = (day === 0 ? -6 : 1 - day);
    d.setDate(d.getDate() + diffToMonday);
    d.setHours(0,0,0,0);
    return d.toISOString().slice(0,10);
  };

  const [weekStart, setWeekStart] = useState<string>(() => mondayOf(new Date()));
  const [daysRange, setDaysRange] = useState<number>(7);
  // Meta semanal dinámica según rango seleccionado
  const weeklyGoalSec = dailyGoalMin * 60 * daysRange;

  const goPrevWeek = () => {
    const d = new Date(weekStart + 'T00:00:00');
    d.setDate(d.getDate() - daysRange);
    setWeekStart(mondayOf(d));
  };
  const goNextWeek = () => {
    const d = new Date(weekStart + 'T00:00:00');
    d.setDate(d.getDate() + daysRange);
    const todayMonday = mondayOf(new Date());
    const candidate = mondayOf(d);
    if (candidate > todayMonday) return;
    setWeekStart(candidate);
  };

  const fetchBackendData = useCallback(async () => {
    try {
      console.log('[WeeklySummary] Obteniendo datos del backend...', { weekStart, daysRange });
      const backendData = await getWeeklyActivityStats({ start: weekStart, days: daysRange });
      console.log('[WeeklySummary] Datos recibidos:', backendData);
      setSummaryData(processWeeklyStats(backendData));
      return;
    } catch (error) {
      console.error("Error obteniendo progreso semanal del backend:", error);
      // Fallback a datos locales solo en caso de error
      const localData = getLocalWeeklySummary(daysRange);
      setSummaryData(localData);
    }
  }, [weekStart, daysRange]);

  // Cargar datos inicialmente
  useEffect(() => {
    setIsLoading(true);
    fetchBackendData().finally(() => setIsLoading(false));
  }, [fetchBackendData, weekStart, daysRange]);

  // Escuchar actualizaciones en tiempo real
  useEffect(() => {
    const handleRoutineCompleted = (event: Event) => {
      const customEvent = event as CustomEvent;
      console.log('[WeeklySummary] Rutina completada detectada:', customEvent.detail);
      
      // Mostrar indicador visual de actualización
      fireMascotCue({ 
        mood: "ok", 
        msg: "¡Actualizando tu progreso! 📊", 
        ms: 2000 
      });
      
      // Dar tiempo al backend para procesar (500ms) y luego actualizar
      setTimeout(() => {
        console.log('[WeeklySummary] Refrescando datos después de rutina completada...');
        fetchBackendData();
      }, 500);
    };

    window.addEventListener('routineCompleted', handleRoutineCompleted);
    
    return () => {
      window.removeEventListener('routineCompleted', handleRoutineCompleted);
    };
  }, [fetchBackendData]);

  // Mostrar mensaje contextual cuando se cargan los datos
  useEffect(() => {
    if (greetedRef.current || isLoading || !summaryData) return;
    greetedRef.current = true;

    const weeklyPct = Math.min(100, Math.round((summaryData.totalSeconds / weeklyGoalSec) * 100));

    // Mensajes contextuales según el progreso
    let message = "";
    let mood: "ok" | "think" | "clap" = "ok";

    if (weeklyPct >= 100) {
      message = "¡Increíble! 🏆 ¡Cumpliste tu meta semanal! Eres imparable.";
      mood = "clap";
    } else if (weeklyPct >= 75) {
      message = "¡Muy bien! 🌟 Estás muy cerca de tu meta, ¡sigue así!";
      mood = "clap";
    } else if (summaryData.currentStreak >= 3) {
      message = `¡${summaryData.currentStreak} días seguidos! 🔥 ¡Tu constancia es admirable!`;
      mood = "ok";
    } else if (summaryData.sessions > 0) {
      message = "Vas bien 💪 Cada sesión cuenta, ¡no te rindas!";
      mood = "ok";
    } else {
      message = "Aún no has empezado esta semana 🤔 ¡Nunca es tarde!";
      mood = "think";
    }

    fireMascotCue({ mood, msg: message, ms: 4000 });
  }, [summaryData, isLoading, weeklyGoalSec]);

  // Mostrar loading mientras se cargan los datos
  if (isLoading) {
    return (
      <main className="mx-auto max-w-screen-sm md:max-w-screen-md lg:max-w-screen-lg px-4 py-6 relative min-h-screen flex items-center justify-center">
        <div className="fixed inset-0 pointer-events-none overflow-hidden -z-10">
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-accent/30 rounded-full blur-3xl animate-pulse" style={{ animationDuration: "3s" }}></div>
        </div>
        <div className="text-center animate-scaleIn">
          <span className="text-6xl mb-4 inline-block animate-bounce" style={{ animationDuration: "1.5s" }}>📊</span>
          <p className="text-xl font-semibold text-accent" aria-live="polite">
            Cargando tu progreso…
          </p>
        </div>
      </main>
    );
  }

  if (!summaryData) {
    return (
      <main className="mx-auto max-w-screen-sm md:max-w-screen-md lg:max-w-screen-lg px-4 py-6 relative">
        <div className="text-center py-8">
          <span className="text-5xl mb-4 inline-block">😕</span>
          <p className="text-fg">Error cargando datos del progreso.</p>
          <button
            className="mt-4 px-4 py-2 rounded-xl border border-border bg-card hover:bg-card-elevated transition-colors"
            onClick={() => nav("/")}
          >
            Volver al inicio
          </button>
        </div>
      </main>
    );
  }

  const { totalSeconds, sessions, byDay, currentStreak, averagePerDaySeconds } = summaryData;
  const weeklyPct = Math.min(100, Math.round((totalSeconds / weeklyGoalSec) * 100));

  const weekRangeLabel = (() => {
    const startDate = new Date(weekStart + 'T00:00:00');
    const endDate = new Date(startDate);
    endDate.setDate(startDate.getDate() + (daysRange - 1));
    const fmtOpts: Intl.DateTimeFormatOptions = { day: '2-digit', month: '2-digit' };
    const startStr = startDate.toLocaleDateString(undefined, fmtOpts);
    const endStr = endDate.toLocaleDateString(undefined, fmtOpts);
    return `${startStr} - ${endStr}`;
  })();

  return (
    <main className="mx-auto max-w-screen-sm md:max-w-screen-md lg:max-w-screen-lg px-4 py-6 relative">
      {/* Decorative background */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden -z-10">
        <div className="absolute -top-32 -right-32 w-96 h-96 bg-accent/20 rounded-full blur-3xl animate-pulse" style={{ animationDuration: "6s" }}></div>
        <div className="absolute -bottom-32 -left-32 w-64 h-64 bg-accent/10 rounded-full blur-3xl animate-pulse" style={{ animationDuration: "8s" }}></div>
      </div>
      
      {/* Header / CTA */}
      <header className="flex flex-col gap-3 mb-4 animate-fadeIn">
        <div className="flex items-center justify-between gap-3">
          <div className="flex items-center gap-3">
            <h1 className="text-xl md:text-2xl font-bold text-[var(--fg)]">📊 Tu progreso</h1>
            <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse" title="Datos en tiempo real"></div>
          </div>
          <button
            className="min-h-[44px] min-w-[44px] px-4 rounded-xl border border-[var(--border)] bg-[var(--card)] hover:bg-[var(--card-elevated)] hover:scale-105 active:scale-100 transition-all duration-300"
            onClick={() => nav("/")}
          >
            ← Volver
          </button>
        </div>
        <div className="flex items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={goPrevWeek}
              aria-label="Semana anterior"
              className="min-h-[40px] min-w-[40px] px-3 rounded-lg border border-[var(--border)] bg-[var(--card)] hover:bg-[var(--card-elevated)] transition-colors"
            >
              ←
            </button>
            <span className="text-sm md:text-base font-semibold text-fg" aria-live="polite">{weekRangeLabel}</span>
            <button
              type="button"
              onClick={goNextWeek}
              aria-label="Semana siguiente"
              className="min-h-[40px] min-w-[40px] px-3 rounded-lg border border-[var(--border)] bg-[var(--card)] hover:bg-[var(--card-elevated)] transition-colors disabled:opacity-40"
              disabled={weekStart === mondayOf(new Date())}
            >
              →
            </button>
          </div>
          <div className="flex items-center gap-2 text-xs text-fg-muted">
            <span>Inicio:</span> <code className="font-mono">{weekStart}</code>
            <span className="mx-1">•</span>
            <label className="flex items-center gap-1">
              <span>Días:</span>
              <select
                value={daysRange}
                onChange={(e) => setDaysRange(Number(e.target.value))}
                className="px-2 py-1 rounded-lg border border-[var(--border)] bg-[var(--card)] focus:outline-none focus:ring-2 focus:ring-accent/50"
                aria-label="Seleccionar rango de días"
              >
                <option value={7}>7</option>
                <option value={14}>14</option>
                <option value={21}>21</option>
              </select>
            </label>
          </div>
        </div>
      </header>

      {/* Tarjeta principal tipo "nivel" */}
      <section className="rounded-2xl border-2 border-accent/30 bg-gradient-to-br from-card to-card-elevated p-4 md:p-6 shadow-lg hover:shadow-xl transition-all duration-300 animate-scaleIn">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <div className="flex items-center gap-3">
            <span className="text-4xl animate-pulse" style={{ animationDuration: "2s" }}>🔥</span>
            <div>
              <p className="text-sm text-fg-muted">Racha actual</p>
              <p className="text-2xl font-extrabold text-accent">
                {currentStreak} día{currentStreak === 1 ? "" : "s"}
              </p>
            </div>
          </div>

          <div className="w-full md:w-1/2">
            <div className="flex items-center justify-between text-sm mb-2">
              <span className="text-fg font-semibold">Meta semanal: {dailyGoalMin} min/día</span>
              <span className="text-accent font-bold">{weeklyPct}%</span>
            </div>
            <div className="h-3 w-full rounded-full bg-[var(--track)] overflow-hidden" role="progressbar" aria-valuemin={0} aria-valuemax={100} aria-valuenow={weeklyPct}>
              <div 
                className="h-3 rounded-full bg-[var(--accent)] transition-all duration-500 ease-out" 
                style={{ width: `${weeklyPct}%` }} 
              />
            </div>
            <p className="mt-2 text-xs text-[var(--fg-muted)]">
              {fmtMin(totalSeconds)} min acumulados · {sessions} sesión{sessions === 1 ? "" : "es"}
            </p>
          </div>
        </div>
      </section>

      {/* Burbujas por día (Duolingo-like) */}
      <section className="mt-6 animate-fadeIn" style={{ animationDelay: "0.1s" }}>
        <div className="flex items-center justify-between mb-3">
          <h2 className="text-lg font-semibold text-fg">📅 Actividad diaria</h2>
          <div className="text-xs text-fg-muted flex items-center gap-2">
            <div className="w-3 h-3 rounded-full bg-accent animate-pulse"></div>
            <span>Datos sincronizados con el servidor</span>
          </div>
        </div>
        <ul className="mt-3 flex flex-wrap gap-2 md:gap-3">
          {byDay.map((d, idx) => {
            const min = fmtMin(d.totalSeconds);
            const active = d.totalSeconds > 0;
            return (
              <li key={d.date} className="flex flex-col items-center animate-scaleIn" style={{ animationDelay: `${0.2 + idx * 0.02}s` }}>
                <div
                  className={`grid place-items-center rounded-full aspect-square min-w-[44px] min-h-[44px] w-12 md:w-14 border-2 transition-all duration-300 ${
                    active 
                      ? "border-accent bg-gradient-to-br from-card-elevated to-card shadow-lg hover:shadow-accent/20 hover:scale-110" 
                      : "border-border/50 bg-card hover:border-accent/30 hover:scale-105"
                  }`}
                  aria-label={`${weekdayShort(d.date)}: ${min} minutos, ${d.sessions} sesiones`}
                  title={`${min} min · ${d.sessions} sesiones`}
                >
                  <span className={`text-sm font-semibold ${active ? "text-accent" : "text-fg-muted"}`}>{min}</span>
                </div>
                <span className="mt-1 text-xs text-[var(--fg-muted)]">{weekdayShort(d.date)}</span>
              </li>
            );
          })}
        </ul>
      </section>

      {/* Resumen rápido */}
      <section className="mt-6 grid grid-cols-1 md:grid-cols-3 gap-3">
        <div className="rounded-xl border-2 border-accent/20 bg-gradient-to-br from-card to-card-elevated p-4 hover:shadow-lg hover:-translate-y-1 transition-all duration-300 animate-fadeIn" style={{ animationDelay: "0.45s" }}>
          <p className="text-sm text-fg-muted flex items-center gap-2">
            <span>⏱️</span> Tiempo total
          </p>
          <p className="text-2xl font-bold text-accent mt-1">
            {fmtMin(totalSeconds)} min
          </p>
        </div>
        <div className="rounded-xl border-2 border-accent/20 bg-gradient-to-br from-card to-card-elevated p-4 hover:shadow-lg hover:-translate-y-1 transition-all duration-300 animate-fadeIn" style={{ animationDelay: "0.5s" }}>
          <p className="text-sm text-fg-muted flex items-center gap-2">
            <span>💪</span> Sesiones
          </p>
          <p className="text-2xl font-bold text-accent mt-1">
            {sessions}
          </p>
        </div>
        <div className="rounded-xl border-2 border-accent/20 bg-gradient-to-br from-card to-card-elevated p-4 hover:shadow-lg hover:-translate-y-1 transition-all duration-300 animate-fadeIn" style={{ animationDelay: "0.55s" }}>
          <p className="text-sm text-fg-muted flex items-center gap-2">
            <span>📈</span> Promedio diario
          </p>
          <p className="text-2xl font-bold text-accent mt-1">
            {fmtMin(averagePerDaySeconds)} min
          </p>
        </div>
      </section>

      {/* Breakdown por tipo de actividad */}
      {summaryData && (summaryData as any).breakdown && Array.isArray((summaryData as any).breakdown) && (
        <section className="mt-6 animate-fadeIn" style={{ animationDelay: "0.65s" }}>
          <h2 className="text-lg font-semibold text-fg mb-2">🔍 Desglose por tipo</h2>
          <div className="overflow-x-auto">
            <table className="min-w-full text-sm border-collapse">
              <thead>
                <tr className="text-left border-b border-[var(--border)]">
                  <th className="py-2 pr-4">Tipo</th>
                  <th className="py-2 pr-4">Sesiones</th>
                  <th className="py-2 pr-4">Minutos</th>
                </tr>
              </thead>
              <tbody>
                {(summaryData as any).breakdown.map((b: any) => (
                  <tr key={b.activityType} className="border-b border-[var(--border)] hover:bg-[var(--card-elevated)] transition-colors">
                    <td className="py-2 pr-4 font-medium text-fg">{b.activityType}</td>
                    <td className="py-2 pr-4">{b.sessions}</td>
                    <td className="py-2 pr-4">{b.totalMinutes}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>
      )}

      {/* CTA para retomar/descubrir rutinas */}
      <section className="mt-6 flex flex-wrap items-center gap-3 animate-fadeIn" style={{ animationDelay: "0.6s" }}>
        <button
          className="min-h-[44px] min-w-[44px] px-6 py-3 rounded-xl bg-[var(--accent)] text-[var(--bg)] font-bold shadow-lg hover:shadow-xl hover:scale-105 active:scale-100 transition-all duration-300"
          onClick={() => nav("/")}
        >
          🚀 Empezar ahora
        </button>
      </section>
    </main>
  );
}
