import React from "react";

/**
 * Muestra un ejercicio: nombre, video (si hay), descripción y tips.
 * Totalmente presentacional; no maneja estado de la rutina.
 */
export type ExerciseMini = {
    id: number;
    name: string;
    description?: string;
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

/** Convierte enlaces comunes de Drive a una URL embebible */
function toEmbeddableVideo(url?: string): string | undefined {
    if (!url) return undefined;
    // https://drive.google.com/file/d/{id}/view?...  ->  /preview
    const m = url.match(/https:\/\/drive\.google\.com\/file\/d\/([^/]+)\/(view|preview)/i);
    if (m?.[1]) return `https://drive.google.com/file/d/${m[1]}/preview`;
    // YouTube (si algún día llega)
    const y = url.match(/(?:youtube\.com\/watch\?v=|youtu\.be\/)([A-Za-z0-9_-]{11})/);
    if (y?.[1]) return `https://www.youtube.com/embed/${y[1]}`;
    return undefined; // no embebible
}

export default function ExercisePlayer({ exercise }: Props) {
    const {
        name,
        description,
        videoUrl,
        imageUrl,
        safetyTips,
        repetitions,
        sets,
        durationSeconds,
        intensity,
    } = exercise;

    const embed = toEmbeddableVideo(videoUrl);

    return (
        <section aria-labelledby="ex-title" className="space-y-3">
            <header>
                <h2 id="ex-title" className="text-lg md:text-xl font-semibold text-[var(--fg)]">
                    {name}
                </h2>
                <p className="text-sm text-[var(--fg-muted)] mt-1">
                    {[repetitions ? `${repetitions} rep` : null,
                    sets ? `${sets} sets` : null,
                    durationSeconds ? `${durationSeconds}s` : null,
                    intensity ? `Intensidad: ${intensity}` : null]
                        .filter(Boolean)
                        .join(" · ")}
                </p>
            </header>

            {/* Video / imagen de apoyo */}
            <div className="w-full rounded-xl overflow-hidden border border-[var(--border)] bg-[var(--card-elevated)]">
                {embed ? (
                    <iframe
                        title={`Video: ${name}`}
                        src={embed}
                        allow="autoplay; encrypted-media"
                        className="w-full aspect-video"
                    />
                ) : imageUrl ? (
                    <img src={imageUrl} alt="" className="w-full aspect-video object-cover" />
                ) : (
                    <div className="w-full aspect-video grid place-items-center bg-[var(--track)]">
                        <p className="text-[var(--fg-muted)] text-sm">Sin video disponible</p>
                    </div>
                )}
            </div>

            {description && <p className="text-[var(--fg)]">{description}</p>}

            {safetyTips && (
                <div className="rounded-lg border border-[var(--border)] bg-[var(--card)] p-3">
                    <p className="text-sm text-[var(--fg-muted)]">
                        <strong className="text-[var(--fg)]">Consejo de seguridad: </strong>
                        {safetyTips}
                    </p>
                </div>
            )}

            {/* Enlace directo al video si no es embebible */}
            {!embed && videoUrl && (
                <p>
                    <a
                        href={videoUrl}
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
