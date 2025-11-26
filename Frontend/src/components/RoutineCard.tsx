import { useNavigate } from "react-router-dom";

type Props = {
  id: number;
  title: string;
  minutes: number;
  intensityLevel?: string;
  thumbnailUrl?: string | null;
};

/** Normaliza thumbnails */
function normalizeThumb(u?: string | null): string | undefined {
  if (!u) return undefined;
  let idMatch: string | null = null;

  try {
    const url = new URL(u);
    const host = url.hostname;

    // Si no es http(s), ignoramos
    if (!/^https?:$/.test(url.protocol)) return undefined;

    // 🎯 Si no es Google Drive, devolvemos tal cual
    if (!host.includes("drive.google.com")) return u;

    // Extraer ID según tipo de enlace
    idMatch =
      url.pathname.match(/\/d\/([^/]+)/)?.[1] || // /file/d/ID/
      url.searchParams.get("id") ||              // ?id=ID
      url.pathname.match(/\/folders\/([^/]+)/)?.[1] || // /folders/ID
      null;

    if (!idMatch) return undefined;

    // ✅ Miniatura estándar de Google Drive
    return `https://drive.google.com/thumbnail?id=${idMatch}&sz=w1000`;
  } catch {
    return undefined;
  }
}

export default function RoutineCard({ id, title, minutes, intensityLevel, thumbnailUrl }: Props) {
  const navigate = useNavigate();
  const imgSrc = normalizeThumb(thumbnailUrl);

  const intensityColors = {
    'Suave': 'from-green-500/20 to-green-500/5 border-green-500/30',
    'Moderado': 'from-yellow-500/20 to-yellow-500/5 border-yellow-500/30',
    'Intermedio': 'from-red-500/20 to-red-500/5 border-red-500/30',
  };

  const intensityEmoji = {
    'Suave': '🌱',
    'Moderado': '⚖️',
    'Intermedio': '💪',
  };

  return (
    <article className="group bg-gradient-to-br from-[var(--card)] to-[var(--card-elevated)] border-2 border-[var(--border)] rounded-2xl shadow-md hover:shadow-2xl hover:shadow-[var(--accent)]/20 focus-within:shadow-2xl transition-all duration-300 overflow-hidden hover:-translate-y-2 flex flex-col h-full">
      <button
        type="button"
        onClick={() => navigate(`/rutinas/${id}`)}
        className="w-full h-full text-left rounded-2xl overflow-hidden focus:outline-none focus-visible:ring-2 focus-visible:ring-[var(--accent)] focus-visible:ring-offset-2 flex flex-col"
        aria-label={`Abrir rutina: ${title}`}
      >
        {/* Imagen con overlay gradient */}
        <div className="relative aspect-[16/9] w-full bg-gradient-to-br from-[var(--track)] to-[var(--accent)]/10 overflow-hidden">
          {imgSrc ? (
            <>
              <img
                src={imgSrc}
                alt=""
                className="block h-full w-full object-cover transition-transform duration-500 group-hover:scale-110"
                loading="lazy"
                decoding="async"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            </>
          ) : (
            <div className="h-full w-full grid place-content-center bg-gradient-to-br from-[var(--accent)]/10 to-[var(--accent)]/5">
              <div className="text-center">
                <span className="text-5xl mb-2 block animate-pulse">🎯</span>
                <span className="text-[var(--fg-muted)] text-sm font-medium">Vista previa</span>
              </div>
            </div>
          )}
          
          {/* Badge de intensidad */}
          {intensityLevel && (
            <div className={`absolute top-3 right-3 px-3 py-1.5 rounded-full bg-gradient-to-r ${intensityColors[intensityLevel as keyof typeof intensityColors] || 'from-[var(--accent)]/20 to-[var(--accent)]/5'} border-2 backdrop-blur-sm shadow-lg`}>
              <span className="text-xs font-bold text-[var(--fg)] flex items-center gap-1">
                <span>{intensityEmoji[intensityLevel as keyof typeof intensityEmoji] || '⭐'}</span>
                <span>{intensityLevel}</span>
              </span>
            </div>
          )}
        </div>

        <div className="p-4 md:p-5 flex flex-col flex-1">
          <h3 className="text-lg md:text-xl font-bold text-[var(--fg)] group-hover:text-[var(--accent)] transition-colors duration-300 line-clamp-2">
            {title}
          </h3>
          <p className="mt-2 text-sm md:text-base text-[var(--fg-muted)] flex items-center gap-2">
            <span className="inline-flex items-center gap-1">
              <span className="text-lg">⏱️</span>
              <span className="font-semibold">{minutes} min</span>
            </span>
          </p>

          <div className="mt-auto pt-4 md:pt-5 flex items-center justify-between gap-2">
            <span
              className="inline-flex items-center justify-center px-4 py-2.5 rounded-xl bg-gradient-to-r from-[var(--accent)] to-[var(--accent)]/80 text-[var(--bg)] font-bold shadow-lg group-hover:shadow-xl group-hover:scale-105 transition-all duration-300"
              aria-hidden="true"
            >
              <span className="flex items-center gap-2">
                <span>▶️</span>
                <span>Abrir</span>
              </span>
            </span>
            <span className="text-xs text-[var(--fg-muted)] opacity-0 group-hover:opacity-100 transition-opacity duration-300">
              ↵
            </span>
          </div>
        </div>
      </button>
    </article>
  );
}
