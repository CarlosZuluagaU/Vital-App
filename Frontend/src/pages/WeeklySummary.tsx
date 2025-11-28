import { useNavigate } from "react-router-dom";
import { getLocalWeeklySummary } from "../utils/Weekly";
import { fireMascotCue } from "../components/pet/VitaAssistant";
import { useEffect, useRef, useState, useCallback } from "react";
import { getWeeklyActivityStats, getAuthToken } from "../hooks/useApi";
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

// Calcular lunes de una fecha
function mondayOf(d: Date): string {
  const day = d.getDay(); // 0=Dom
  const diffToMonday = (day === 0 ? -6 : 1 - day); // Si es domingo retroceder 6 días
  const monday = new Date(d);
  monday.setDate(d.getDate() + diffToMonday);
  return monday.toISOString().split('T')[0];
}

export default function WeeklySummary() {
  const nav = useNavigate();
  const [summaryData, setSummaryData] = useState<WeeklySummaryData | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [weekStart, setWeekStart] = useState<string>(() => mondayOf(new Date()));
  const [daysRange, setDaysRange] = useState<number>(7);

  // Meta simple (personalizable): 15 min/día
  const dailyGoalMin = 15;
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
    // No permitir avanzar más allá de la semana actual
    if (candidate <= todayMonday) {
      setWeekStart(candidate);
    }
  };

  const fetchBackendData = useCallback(async () => {
    try {
      console.log('[WeeklySummary] Obteniendo datos del backend...', { weekStart, daysRange });
      const backendData = await getWeeklyActivityStats({ start: weekStart, days: daysRange });
      console.log('[WeeklySummary] Datos recibidos del backend:', backendData);
      setSummaryData(processWeeklyStats(backendData));
    } catch (error) {
      console.error("Error obteniendo progreso semanal del backend:", error);
      
      // IMPORTANTE: NO usar localStorage si estamos autenticados
      // Solo usar localStorage como fallback para modo invitado
      const token = getAuthToken();
      if (!token) {
        console.log('[WeeklySummary] Modo invitado: usando localStorage como fallback');
        const localData = getLocalWeeklySummary(daysRange);
        setSummaryData({
          ...localData,
          currentStreak: localData.streakDays,
        });
      } else {
        console.log('[WeeklySummary] Usuario autenticado sin datos: mostrando estado vacío');
        // Usuario autenticado pero sin datos: mostrar todo en 0
        setSummaryData({
          totalSeconds: 0,
          sessions: 0,
          byDay: [],
          currentStreak: 0,
          averagePerDaySeconds: 0,
        });
      }
    }
  }, [weekStart, daysRange]);

  // Cargar datos inicialmente
  useEffect(() => {
    setIsLoading(true);
    fetchBackendData().finally(() => setIsLoading(false));
  }, [fetchBackendData, weekStart, daysRange]);

  const greetedRef = useRef(false);

  useEffect(() => {
    if (!summaryData || greetedRef.current) return;
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
  }, [summaryData, weeklyGoalSec]);

  if (isLoading) {
    return (
      <main className="grid place-items-center min-h-screen">
        <div className="text-center">
          <span className="text-5xl mb-4 inline-block animate-spin">⏳</span>
          <p className="text-fg">Cargando tu progreso...</p>
        </div>
      </main>
    );
  }

  if (!summaryData) {
    return (
      <main className="grid place-items-center min-h-screen">
        <div className="text-center">
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
      
      {/* Header con navegación temporal */}
      <header className="mb-4 animate-fadeIn">
        <div className="flex items-center justify-between gap-3 mb-3">
          <div className="flex items-center gap-2">
            <h1 className="text-xl md:text-2xl font-bold text-[var(--fg)]">
              📊 Tu progreso
            </h1>
            <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse" title="Datos en tiempo real"></div>
          </div>
          <button
            className="min-h-[44px] min-w-[44px] px-4 rounded-xl border border-[var(--border)] bg-[var(--card)] hover:bg-[var(--card-elevated)] hover:scale-105 active:scale-100 transition-all duration-300"
            onClick={() => nav("/")}
          >
            ← Volver
          </button>
        </div>
        
        {/* Controles de navegación temporal */}
        <div className="flex items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={goPrevWeek}
              className="min-h-[44px] min-w-[44px] px-3 py-2 rounded-xl border border-[var(--border)] bg-[var(--card)] hover:bg-[var(--card-elevated)] hover:scale-105 active:scale-100 transition-all duration-300"
              aria-label="Período anterior"
            >
              ←
            </button>
            <span className="text-sm md:text-base font-semibold text-fg" aria-live="polite">{weekRangeLabel}</span>
            <button
              type="button"
              onClick={goNextWeek}
              className="min-h-[44px] min-w-[44px] px-3 py-2 rounded-xl border border-[var(--border)] bg-[var(--card)] hover:bg-[var(--card-elevated)] hover:scale-105 active:scale-100 transition-all duration-300"
              aria-label="Período siguiente"
            >
              →
            </button>
          </div>
          
          <label className="flex items-center gap-2 text-xs text-fg-muted">
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
              <option value={28}>28</option>
            </select>
          </label>
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
              <span className="text-fg font-semibold">Meta: {dailyGoalMin} min/día</span>
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
        <h2 className="text-lg font-semibold text-fg">
          📅 Esta semana
        </h2>
        <ul className="mt-3 grid grid-cols-7 gap-2 md:gap-3">
          {byDay.map((d, idx) => {
            const min = fmtMin(d.totalSeconds);
            const active = d.totalSeconds > 0;
            return (
              <li key={d.date} className="flex flex-col items-center animate-scaleIn" style={{ animationDelay: `${0.2 + idx * 0.05}s` }}>
                <div
                  className={`flex flex-col items-center justify-center rounded-full aspect-square min-w-[44px] min-h-[44px] w-12 md:w-14 border-2 transition-all duration-300 ${
                    active 
                      ? "border-accent bg-gradient-to-br from-card-elevated to-card shadow-lg hover:shadow-accent/20 hover:scale-110" 
                      : "border-border/50 bg-card hover:border-accent/30 hover:scale-105"
                  }`}
                  aria-label={`${weekdayShort(d.date)}: ${min} minutos, ${d.sessions} sesiones`}
                  title={`${min} min · ${d.sessions} sesiones`}
                >
                  <span className={`text-base md:text-lg font-bold leading-none ${active ? "text-accent" : "text-fg-muted"}`}>{min}</span>
                  <span className={`text-[9px] leading-none mt-0.5 ${active ? "text-accent/70" : "text-fg-muted/60"}`}>min</span>
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
