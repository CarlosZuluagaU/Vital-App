import { A11yButton } from "../../../components/a11y/A11yButton";
import { usePrefs } from "../../../context/Preferences";
import type { FontSize } from "../../../context/Preferences";

const SIZES: {key: FontSize; label: string; sample: string}[] = [
  { key: "sm", label: "Pequeño",  sample: "Aa" },
  { key: "md", label: "Mediano",  sample: "Aa" },
  { key: "lg", label: "Grande",   sample: "Aa" },
];

export default function StepA11y({ onPrev, onFinish }:{
  onPrev:()=>void; onFinish:()=>void;
}) {
  const { highContrast, setHighContrast, fontSize, setFontSize } = usePrefs();

  return (
    <div>
      <h2 className="text-xl font-bold mb-3">Accesibilidad</h2>

      {/* Alto contraste */}
      <div className="mb-5">
        <label className="flex items-center gap-3">
          <input
            type="checkbox"
            checked={highContrast}
            onChange={(e)=>setHighContrast(e.target.checked)}
            className="min-w-[24px] min-h-[24px]"
          />
          <span className="font-medium">Alto contraste</span>
        </label>
        <p className="text-sm text-gray-500 mt-1">
          Mejora la legibilidad con colores más marcados.
        </p>
      </div>

      {/* Tamaño de letra */}
      <div className="mb-4">
        <p className="font-medium mb-2">Tamaño de letra</p>
        <div role="group" aria-label="Tamaño de letra" className="flex gap-2">
          {SIZES.map(s => {
            const active = fontSize === s.key;
            return (
              <button
                key={s.key}
                aria-pressed={active}
                onClick={() => setFontSize(s.key)}
                className={`
                  rounded-lg px-3 py-2 min-h-[44px] min-w-[44px] border
                  ${active ? "bg-[var(--accent)] text-[var(--bg)]" : "bg-[var(--card)]"}
                  focus-visible:outline
                `}
                title={s.label}
              >
                <span className={s.key==="sm" ? "text-base" : s.key==="md" ? "text-lg" : "text-xl"}>
                  {s.label}
                </span>
              </button>
            );
          })}
        </div>
        <p className="mt-3 text-sm text-gray-500">Vista previa:</p>
        <div className="mt-1 p-3 rounded-lg border">
          Este es un ejemplo de texto con tu configuración actual.
        </div>
      </div>

      <div className="flex gap-2">
        <A11yButton onClick={onPrev}>Atrás</A11yButton>
        <A11yButton className="ml-auto" onClick={onFinish}>Finalizar</A11yButton>
      </div>
    </div>
  );
}
