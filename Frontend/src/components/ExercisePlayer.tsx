import React from "react";

/** DTO reducido que usamos para pintar un ejercicio */
export type ExerciseMini = {
    id: number;
    name?: string;
    title?: string;
    description?: string;
    instructions?: string;
    videoUrl?: string;
    imageUrl?: string;
    safetyTips?: string;
    repetitions?: number;
    sets?: number;
    durationSeconds?: number;
    intensity?: string;
};

type Props = {
    exercise: ExerciseMini;
};

/** Convierte enlaces comunes de Drive/YouTube a una URL embebible */
function toEmbeddableVideo(url?: string): string | undefined {
    if (!url) return undefined;

    // Drive file/d/{id}/(view|preview)
    const fileMatch = url.match(/https:\/\/drive\.google\.com\/file\/d\/([^/]+)\/(?:view|preview)/i);
    if (fileMatch?.[1]) return `https://drive.google.com/file/d/${fileMatch[1]}/preview`;

    // Drive open?id={id}
    const openMatch = url.match(/https:\/\/drive\.google\.com\/open\?id=([^&]+)/i);
    if (openMatch?.[1]) return `https://drive.google.com/file/d/${openMatch[1]}/preview`;

    // Drive uc?id={id}
    const ucMatch = url.match(/https:\/\/drive\.google\.com\/uc\?id=([^&]+)/i);
    if (ucMatch?.[1]) return `https://drive.google.com/file/d/${ucMatch[1]}/preview`;

    // YouTube
    const y = url.match(/(?:youtube\.com\/watch\?v=|youtu\.be\/)([A-Za-z0-9_-]{11})/);
    if (y?.[1]) return `https://www.youtube.com/embed/${y[1]}`;

    return undefined;
}

/** Si el back manda name="Ejercicio", proponemos algo más útil */
function deriveDisplayName(ex: ExerciseMini): string {
    const base = ex.name || ex.title || "";
    if (base && base.trim().toLowerCase() !== "ejercicio") return base;

    // Usa el inicio de la descripción como nombre aproximado
    if (ex.description) {
        const firstSentence = ex.description.split(/\.(\s|$)/)[0];
        if (firstSentence) return firstSentence.trim();
    }
    return "Ejercicio";
}

/** Renderiza instrucciones de forma legible */
function renderInstructions(text?: string) {
    if (!text) return null;

    // Normaliza saltos de línea
    const lines = text.replace(/\r\n/g, "\n").split("\n").map((s) => s.trim()).filter(Boolean);
    const looksEnumerated = lines.length > 1 && /^(\d+)\./.test(lines[0]);

    if (looksEnumerated) {
        return (
            <ol className="list-decimal pl-5 space-y-1">
                {lines.map((l, i) => (
                    <li key={i} className="text-sm text-[var(--fg)]">
                        {l.replace(/^(\d+)\.\s*/, "")}
                    </li>
                ))}
            </ol>
        );
    }

    // Un solo bloque: lo separamos por puntos para mejorar lectura
    const parts = text.split(/\n|(?<=\.)\s+/).filter(Boolean);
    return (
        <div className="space-y-1">
            {parts.map((p, i) => (
                <p key={i} className="text-sm text-[var(--fg)]">
                    {p}
                </p>
            ))}
        </div>
    );
}

export default function ExercisePlayer({ exercise }: Props) {
    const displayName = deriveDisplayName(exercise);
    const embed = toEmbeddableVideo(exercise.videoUrl);

    const meta = [
        exercise.repetitions ? `${exercise.repetitions} rep` : null,
        exercise.sets ? `${exercise.sets} sets` : null,
        exercise.durationSeconds ? `${exercise.durationSeconds}s` : null,
        exercise.intensity ? `Intensidad: ${exercise.intensity}` : null,
    ]
        .filter(Boolean)
        .join(" · ");

    return (
        <section aria-labelledby="ex-title" className="space-y-3">
            <header>
                <h2 id="ex-title" className="text-lg md:text-xl font-semibold text-[var(--fg)]">
                    {displayName}
                </h2>
                {meta && <p className="text-sm text-[var(--fg-muted)] mt-1">{meta}</p>}
            </header>

            {/* Video / imagen */}
            <div className="w-full rounded-xl overflow-hidden border border-[var(--border)] bg-[var(--card-elevated)]">
                {embed ? (
                    <iframe
                        title={`Video: ${displayName}`}
                        src={embed}
                        allow="autoplay; encrypted-media"
                        className="w-full aspect-video"
                    />
                ) : exercise.imageUrl ? (
                    <img src={exercise.imageUrl} alt="" className="w-full aspect-video object-cover" />
                ) : (
                    <div className="w-full aspect-video grid place-items-center bg-[var(--track)]">
                        <p className="text-[var(--fg-muted)] text-sm">Sin video disponible</p>
                    </div>
                )}
            </div>

            {exercise.description && <p className="text-[var(--fg)]">{exercise.description}</p>}

            {exercise.instructions && (
                <div className="rounded-lg border border-[var(--border)] bg-[var(--card)] p-3">
                    <p className="text-sm font-semibold text-[var(--fg)] mb-1">Instrucciones:</p>
                    {renderInstructions(exercise.instructions)}
                </div>
            )}

            {exercise.safetyTips && (
                <div className="rounded-lg border border-[var(--border)] bg-[var(--card)] p-3">
                    <p className="text-sm text-[var(--fg-muted)]">
                        <strong className="text-[var(--fg)]">Consejo de seguridad: </strong>
                        {exercise.safetyTips}
                    </p>
                </div>
            )}

            {!embed && exercise.videoUrl && (
                <p>
                    <a
                        href={exercise.videoUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="underline text-[var(--fg)]"
                    >
                        Abrir video en nueva pestaña
                    </a>
                </p>
            )}
        </section>
    );
}
