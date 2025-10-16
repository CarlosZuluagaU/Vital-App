// React import not required under new JSX transform
import { useNavigate } from "react-router-dom";
import type { ExerciseSummaryDTO, ExerciseDetailDTO } from "../types/InterfaceRoutines";

type Props = {
  exercise: ExerciseSummaryDTO | ExerciseDetailDTO;
};

export default function ExerciseCard({ exercise }: Props) {
  const nav = useNavigate();

  return (
    <article className="bg-[var(--card)] border border-[var(--border)] rounded-xl shadow-sm hover:shadow-md p-4">
      <div className="space-y-4">
        {/* Título y metadatos básicos */}
        <header>
          <h3 className="text-lg font-semibold text-[var(--fg)]">{exercise.name}</h3>
          <div className="mt-1 flex items-center gap-2 text-sm text-[var(--fg-muted)]">
            {exercise.intensity && <span>Intensidad: {exercise.intensity}</span>}
            {exercise.durationSeconds && <span>•</span>}
            {exercise.durationSeconds && <span>{exercise.durationSeconds}s</span>}
          </div>
        </header>

        {/* Video o thumbnail */}
        <div className="aspect-video w-full bg-[var(--track)] rounded-lg overflow-hidden">
          {exercise.videoUrl ? (
            <iframe
              src={exercise.videoUrl}
              title={`Video: ${exercise.name}`}
              className="w-full h-full"
              allowFullScreen
            />
          ) : exercise.thumbnailUrl ? (
            <img 
              src={exercise.thumbnailUrl} 
              alt="" 
              className="w-full h-full object-cover"
              loading="lazy"
              decoding="async"
            />
          ) : (
            <div className="w-full h-full grid place-content-center text-sm text-[var(--fg-muted)]">
              Vista previa no disponible
            </div>
          )}
        </div>

        {/* Instrucciones */}
        {(exercise as ExerciseDetailDTO).instructions && (
          <div>
            <h4 className="font-medium text-[var(--fg)]">Instrucciones</h4>
            <p className="mt-1 text-sm text-[var(--fg-muted)]">
              {(exercise as ExerciseDetailDTO).instructions}
            </p>
          </div>
        )}

        {/* Beneficios */}
        {(exercise as ExerciseDetailDTO).benefits && (
          <div>
            <h4 className="font-medium text-[var(--fg)]">Beneficios</h4>
            <ul className="mt-1 text-sm text-[var(--fg-muted)] list-disc list-inside">
              {(exercise as ExerciseDetailDTO).benefits?.map((benefit, index) => (
                <li key={index}>{benefit}</li>
              ))}
            </ul>
          </div>
        )}

        {/* Frase motivacional */}
        {(exercise as ExerciseDetailDTO).motivationalPhrase && (
          <div className="mt-4 p-3 bg-[var(--accent-muted)] rounded-lg">
            <p className="text-sm text-[var(--fg)] italic text-center">
              "{(exercise as ExerciseDetailDTO).motivationalPhrase}"
            </p>
          </div>
        )}

        {/* Botón de acción */}
        <button
          type="button"
          onClick={() => nav(`/ejercicios/${exercise.id}`)}
          className="mt-2 w-full min-h-[44px] px-4 py-2 rounded-lg bg-[var(--accent)] text-[var(--bg)] font-medium hover:bg-[var(--accent-hover)] transition-colors"
          aria-label={`Ver más detalles de ${exercise.name}`}
        >
          Ver más detalles
        </button>
      </div>
    </article>
  );
}
