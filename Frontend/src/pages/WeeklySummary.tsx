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
    <main className="mx-auto max-w-screen-sm md:max-w-screen-md lg:max-w-screen-lg px-4 py-6">
      {/* Header / CTA */}
      <header className="flex items-center justify-between gap-3 mb-4">
        <h1 className="text-xl md:text-2xl font-bold text-[var(--fg)]">Tu progreso</h1>
        <button
          className="min-h-[44px] min-w-[44px] px-4 rounded-lg border border-[var(--border)] bg-[var(--card)]"
          onClick={() => nav("/")}
        >
          ← Volver
        </button>
      </header>

      {/* Tarjeta principal tipo “nivel” */}
      <section className="rounded-2xl border border-[var(--border)] bg-[var(--card)] p-4 md:p-6">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <div>
            <p className="text-sm text-[var(--fg-muted)]">Racha actual</p>
            <p className="text-2xl font-extrabold text-[var(--fg)]">{streakDays} día{streakDays === 1 ? "" : "s"}</p>
          </div>

          <div className="w-full md:w-1/2">
            <p className="text-sm text-[var(--fg)] font-semibold">
              Meta semanal: {dailyGoalMin} min/día · Progreso {weeklyPct}%
            </p>
            <div className="mt-2 h-3 rounded-full bg-[var(--track)]" role="progressbar" aria-valuenow={weeklyPct} aria-valuemin={0} aria-valuemax={100}>
              <div className="h-3 rounded-full bg-[var(--accent)]" style={{ width: `${weeklyPct}%` }} />
            </div>
            <p className="mt-1 text-xs text-[var(--fg-muted)]">
              {fmtMin(totalSeconds)} min acumulados · {sessions} sesión{sessions === 1 ? "" : "es"}
            </p>
          </div>
        </div>
      </section>

      {/* Burbujas por día (Duolingo-like) */}
      <section className="mt-6">
        <h2 className="text-lg font-semibold text-[var(--fg)]">Esta semana</h2>
        <ul className="mt-3 grid grid-cols-7 gap-2 md:gap-3">
          {byDay.map((d) => {
            const min = fmtMin(d.totalSeconds);
            const active = d.totalSeconds > 0;
            return (
              <li key={d.date} className="flex flex-col items-center">
                <div
                  className={`grid place-items-center rounded-full aspect-square min-w-[44px] min-h-[44px] w-12 md:w-14 border ${
                    active ? "border-[var(--accent)] bg-[var(--card-elevated)]" : "border-[var(--border)] bg-[var(--card)]"
                  }`}
                  aria-label={`${weekdayShort(d.date)}: ${min} minutos, ${d.sessions} sesiones`}
                  title={`${min} min · ${d.sessions} sesiones`}
                >
                  <span className="text-sm font-semibold text-[var(--fg)]">{min}</span>
                </div>
                <span className="mt-1 text-xs text-[var(--fg-muted)]">{weekdayShort(d.date)}</span>
              </li>
            );
          })}
        </ul>
      </section>

      {/* Resumen rápido */}
      <section className="mt-6 grid grid-cols-1 md:grid-cols-3 gap-3">
        <div className="rounded-xl border border-[var(--border)] bg-[var(--card)] p-3">
          <p className="text-sm text-[var(--fg-muted)]">Tiempo total</p>
          <p className="text-xl font-bold text-[var(--fg)]">{fmtMin(totalSeconds)} min</p>
        </div>
        <div className="rounded-xl border border-[var(--border)] bg-[var(--card)] p-3">
          <p className="text-sm text-[var(--fg-muted)]">Sesiones</p>
          <p className="text-xl font-bold text-[var(--fg)]">{sessions}</p>
        </div>
        <div className="rounded-xl border border-[var(--border)] bg-[var(--card)] p-3">
          <p className="text-sm text-[var(--fg-muted)]">Promedio diario</p>
          <p className="text-xl font-bold text-[var(--fg)]">{fmtMin(averagePerDaySeconds)} min</p>
        </div>
      </section>

      {/* CTA para retomar/descubrir rutinas */}
      <section className="mt-6 flex flex-wrap items-center gap-3">
        <button
          className="min-h-[44px] min-w-[44px] px-4 rounded-lg bg-[var(--accent)] text-[var(--bg)] font-semibold"
          onClick={() => nav("/")}
        >
          Empezar ahora
        </button>
      </section>
    </main>
  );
}
