import { useNavigate } from "react-router-dom";
import { getLocalWeeklySummary } from "../utils/Weekly";
import { fireMascotCue } from "../components/pet/VitaAssistant";
import { useEffect, useRef } from "react";

const fmtMin = (sec: number) => Math.floor(sec / 60);
const weekdayShort = (iso: string) => {
  const d = new Date(iso + "T00:00:00");
  return d.toLocaleDateString(undefined, { weekday: "short" }); // lun, mar, ...
};

export default function WeeklySummary() {
  const nav = useNavigate();
  const { totalSeconds, sessions, byDay, streakDays, averagePerDaySeconds } = getLocalWeeklySummary(7);

  // Meta simple (personalizable): 15 min/día
  const dailyGoalMin = 15;
  const weeklyGoalSec = dailyGoalMin * 60 * 7;
  const weeklyPct = Math.min(100, Math.round((totalSeconds / weeklyGoalSec) * 100));

  const greetedRef = useRef(false);

  useEffect(() => {
    if (greetedRef.current) return;
    greetedRef.current = true;

    // Mensajes contextuales según el progreso
    let message = "";
    let mood: "ok" | "think" | "clap" = "ok";

    if (weeklyPct >= 100) {
      message = "¡Increíble! 🏆 ¡Cumpliste tu meta semanal! Eres imparable.";
      mood = "clap";
    } else if (weeklyPct >= 75) {
      message = "¡Muy bien! 🌟 Estás muy cerca de tu meta, ¡sigue así!";
      mood = "clap";
    } else if (streakDays >= 3) {
      message = `¡${streakDays} días seguidos! 🔥 ¡Tu constancia es admirable!`;
      mood = "ok";
    } else if (sessions > 0) {
      message = "Vas bien 💪 Cada sesión cuenta, ¡no te rindas!";
      mood = "ok";
    } else {
      message = "Aún no has empezado esta semana 🤔 ¡Nunca es tarde!";
      mood = "think";
    }

    fireMascotCue({ mood, msg: message, ms: 4000 });
  }, [weeklyPct, streakDays, sessions]);

  return (
    <main className="mx-auto max-w-screen-sm md:max-w-screen-md lg:max-w-screen-lg px-4 py-6 relative">
      {/* Decorative background */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden -z-10">
        <div className="absolute -top-32 -right-32 w-96 h-96 bg-accent/20 rounded-full blur-3xl animate-pulse" style={{ animationDuration: "6s" }}></div>
        <div className="absolute -bottom-32 -left-32 w-64 h-64 bg-accent/10 rounded-full blur-3xl animate-pulse" style={{ animationDuration: "8s" }}></div>
      </div>
      {/* Header / CTA */}
      <header className="flex items-center justify-between gap-3 mb-4 animate-fadeIn">
        <h1 className="text-xl md:text-2xl font-bold text-[var(--fg)]">
          📊 Tu progreso
        </h1>
        <button
          className="min-h-[44px] min-w-[44px] px-4 rounded-xl border border-[var(--border)] bg-[var(--card)] hover:bg-[var(--card-elevated)] hover:scale-105 active:scale-100 transition-all duration-300"
          onClick={() => nav("/")}
        >
          ← Volver
        </button>
      </header>

      {/* Tarjeta principal tipo "nivel" */}
      <section className="rounded-2xl border-2 border-accent/30 bg-gradient-to-br from-card to-card-elevated p-4 md:p-6 shadow-lg hover:shadow-xl transition-all duration-300 animate-scaleIn">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <div className="flex items-center gap-3">
            <span className="text-4xl animate-pulse" style={{ animationDuration: "2s" }}>🔥</span>
            <div>
              <p className="text-sm text-fg-muted">Racha actual</p>
              <p className="text-2xl font-extrabold text-accent">
                {streakDays} día{streakDays === 1 ? "" : "s"}
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
