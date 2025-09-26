import { useNavigate } from "react-router-dom";
import type { Routine } from "../hooks/useApi";

type Props = { routine: Routine };

export default function RoutineCard({ routine }: Props) {
  const navigate = useNavigate();
  const { id, title, duration_minutes, intensity, thumbnail } = routine;

  return (
    <article className="bg-[var(--card)] border border-[var(--border)] rounded-xl shadow-sm hover:shadow-md focus-within:shadow-md transition-shadow">
      <button
        type="button"
        onClick={() => navigate(`/rutinas/${id}`)}
        className="w-full text-left rounded-xl overflow-hidden focus:outline-none"
        aria-label={`Abrir rutina: ${title}`}
      >
        <div className="aspect-[16/9] w-full bg-[var(--track)]">
          {thumbnail ? (
            <img src={thumbnail} alt="" className="block h-full w-full object-cover" loading="lazy" decoding="async" />
          ) : (
            <div className="h-full w-full grid place-content-center">
              <span className="text-[var(--fg-muted)] text-sm">Vista previa</span>
            </div>
          )}
        </div>

        <div className="p-3 md:p-4">
          <h3 className="text-base md:text-lg font-semibold text-[var(--fg)]">{title}</h3>
          <p className="mt-1 text-sm md:text-[15px] text-[var(--fg-muted)]">
            {duration_minutes} min{intensity ? ` · ${intensity.toLowerCase()}` : ""}
          </p>

          <div className="mt-3 md:mt-4 flex items-center gap-2">
            <span
              className="inline-flex items-center justify-center min-h-[44px] min-w-[44px] px-3 py-2 rounded-lg bg-[var(--accent)] text-[var(--bg)] font-semibold"
              aria-hidden="true"
            >
              Abrir
            </span>
            <span className="text-sm text-[var(--fg-muted)]">Enter/Espacio para abrir</span>
          </div>
        </div>
      </button>
    </article>
  );
}
