import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import RoutineCard from "../components/RoutineCard";
import { usePrefs } from "../context/Preferences";
import { getRoutines } from "../hooks/useApi";
import type { RoutineSummaryDTO } from "../types/InterfaceRoutines";
import { useAuth } from "../context/Auth";
import { A11yButton } from "../components/a11y/A11yButton";
import { fireMascotCue } from "../components/pet/VitaAssistant";

export default function Home() {
  const nav = useNavigate();
  const { profile } = usePrefs();
  const { loading: authLoading, isAuthenticated } = useAuth();

  const [loading, setLoading] = useState(true);
  const [all, setAll] = useState<RoutineSummaryDTO[]>([]);
  const [error, setError] = useState<string | null>(null);

  const target =
    profile?.level === "BASICO" ? "Suave" :
    profile?.level === "MODERADO" ? "Moderado" :
    profile?.level === "INTERMEDIO" ? "Intermedio" :
    undefined;

  useEffect(() => {
    let mounted = true;
    const load = async () => {
      if (authLoading) return;

      setLoading(true); setError(null);
      try {
        // Siempre obtener todas las rutinas para mantener el filtro consistente
        const b = await getRoutines();
        if (!mounted) return;
        setAll(b ?? []);
      } catch (e: any) {
        setError(e?.message || "No se pudieron cargar las rutinas.");
        setAll([]);
      } finally {
        if (mounted) setLoading(false);
      }
    };
    load();
    return () => { mounted = false; };
  }, [authLoading, isAuthenticated]);

  // Calcular rutinas recomendadas y otras
  const recommended = target ? all.filter(r => r.intensityName === target) : all;
  const others = target ? all.filter(r => r.intensityName !== target) : [];

  useEffect(() => {
    if (loading) return;
    if (recommended.length) {
      fireMascotCue({ mood: "ok", msg: "Te preparé algunas rutinas a tu medida. ¡Échales un vistazo!", ms: 6000 });
    } else if (all.length) {
      fireMascotCue({ mood: "tips", msg: "Puedes filtrar por nivel si quieres.", ms: 5000 });
    } else {
      fireMascotCue({ mood: "sad", msg: "No encontré rutinas. ¿Probamos otro nivel?", ms: 4000 });
    }
  }, [loading, recommended.length, all.length]);

  return (
    <main className="w-full min-h-screen relative">
      {/* Fondo decorativo sutil */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-[var(--accent)]/5 rounded-full blur-3xl opacity-50 animate-pulse" style={{ animationDuration: '8s' }} />
      <div className="absolute bottom-0 left-0 w-64 h-64 bg-[var(--accent)]/5 rounded-full blur-3xl opacity-50 animate-pulse" style={{ animationDuration: '6s', animationDelay: '2s' }} />
      
      <section className="relative z-10 mx-auto max-w-screen-sm md:max-w-screen-md lg:max-w-screen-lg px-4 py-6 md:py-8">
        {/* Header mejorado con animación */}
        <div className="mb-6 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between animate-slideInUp">
          <div>
            <h1 className="text-2xl md:text-3xl font-bold bg-gradient-to-r from-[var(--accent)] to-[var(--fg)] bg-clip-text text-transparent">
              VitalApp
            </h1>
            <p className="text-sm text-[var(--fg-muted)] mt-1">
              {target ? (
                <span className="flex items-center gap-2">
                  <span className="inline-block w-2 h-2 rounded-full bg-[var(--accent)] animate-pulse" />
                  Rutinas para nivel {target}
                </span>
              ) : "Todas las rutinas disponibles"}
            </p>
          </div>
          <A11yButton 
            onClick={() => nav("/resumen")} 
            className="sm:self-end transform hover:scale-105 transition-all duration-300 shadow-lg hover:shadow-xl hover:shadow-[var(--accent)]/30"
          >
            <span className="flex items-center gap-2">
              <span>📊</span>
              <span>Resumen semanal</span>
            </span>
          </A11yButton>
        </div>

        {authLoading || loading ? (
          <div role="status" aria-live="polite" className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
            {Array.from({ length: 6 }).map((_, i) => (
              <div 
                key={i} 
                className="rounded-xl border-2 border-[var(--border)] bg-[var(--card)] overflow-hidden animate-pulse loading-shimmer"
                style={{ animationDelay: `${i * 0.1}s` }}
              >
                <div className="aspect-[16/9] bg-[var(--track)]" />
                <div className="p-3 md:p-4 space-y-2">
                  <div className="h-4 bg-[var(--track)] rounded" />
                  <div className="h-4 bg-[var(--track)] rounded w-2/3" />
                  <div className="h-10 bg-[var(--track)] rounded-lg mt-3" />
                </div>
              </div>
            ))}
          </div>
        ) : error ? (
          <div className="rounded-xl border-2 border-red-500/30 bg-red-500/5 p-6 text-center animate-scaleIn">
            <span className="text-4xl mb-3 block">⚠️</span>
            <p className="text-red-500 font-semibold">{error}</p>
          </div>
        ) : (
          <>
            {recommended.length > 0 && (
              <div className="mb-8 animate-slideInUp" style={{ animationDelay: '0.1s', animationFillMode: 'backwards' }}>
                <div className="flex items-center gap-2 mb-4">
                  <span className="text-2xl">⭐</span>
                  <h2 className="text-xl font-bold text-[var(--fg)]">Recomendadas para ti</h2>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
                  {recommended.map((r, idx) => (
                    <div 
                      key={r.id}
                      className="animate-slideInUp"
                      style={{ animationDelay: `${0.2 + idx * 0.05}s`, animationFillMode: 'backwards' }}
                    >
                      <RoutineCard
                        id={r.id}
                        title={r.title}
                        minutes={r.durationMinutes ?? 0}
                        intensityLevel={r.intensityName ?? undefined}
                        thumbnailUrl={r.thumbnailUrl ?? undefined}
                      />
                    </div>
                  ))}
                </div>
              </div>
            )}

            {others.length > 0 && (
              <div className="animate-slideInUp" style={{ animationDelay: `${0.2 + recommended.length * 0.05}s`, animationFillMode: 'backwards' }}>
                <div className="flex items-center gap-2 mb-4">
                  <span className="text-2xl">🎯</span>
                  <h2 className="text-xl font-bold text-[var(--fg)]">Otras rutinas</h2>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
                  {others.map((r, idx) => (
                    <div 
                      key={r.id}
                      className="animate-slideInUp"
                      style={{ animationDelay: `${0.3 + recommended.length * 0.05 + idx * 0.05}s`, animationFillMode: 'backwards' }}
                    >
                      <RoutineCard
                        id={r.id}
                        title={r.title}
                        minutes={r.durationMinutes ?? 0}
                        intensityLevel={r.intensityName ?? undefined}
                        thumbnailUrl={r.thumbnailUrl ?? undefined}
                      />
                    </div>
                  ))}
                </div>
              </div>
            )}

            {recommended.length === 0 && others.length === 0 && (
              <div className="rounded-xl border-2 border-[var(--accent)]/30 bg-[var(--accent)]/5 p-12 text-center animate-scaleIn">
                <span className="text-6xl mb-4 block animate-bounce" style={{ animationDuration: '3s' }}>🔍</span>
                <p className="text-lg font-semibold text-[var(--fg)] mb-2">No hay rutinas disponibles</p>
                <p className="text-sm text-[var(--fg-muted)]">Intenta ajustar tu nivel de actividad o vuelve más tarde</p>
              </div>
            )}
          </>
        )}
      </section>
    </main>
  );
}
