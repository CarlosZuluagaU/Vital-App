type Props = { value: number; max: number };


export default function ProgressBar({ value, max }: Props) {
  const pct = Math.min(100, Math.round((value / max) * 100));
  return (
    <div className="mb-4">
      <div className="flex items-center justify-between text-xs text-[var(--fg-muted)] mb-1">
        <span>Paso {value} de {max}</span>
        <span>{pct}%</span>
      </div>
      <div className="h-2 w-full rounded-full bg-[var(--track)]">
        <div
          className="h-2 rounded-full bg-[var(--accent)] transition-all"
          style={{ width: `${pct}%` }}
          role="progressbar"
          aria-valuemin={0}
          aria-valuemax={100}
          aria-valuenow={pct}
        />
      </div>
    </div>
  );
}
