import { useState } from "react";
import { A11yButton } from "../../../components/a11y/A11yButton";
import type { Profile } from "../../../context/Preferences";

const OPTIONS = [
  {
    key: "BASICO" as const,
    title: "Básico",
    desc: "Poca actividad. Ejercicios suaves y seguros.",
  },
  {
    key: "MODERADO" as const,
    title: "Moderado",
    desc: "Actividad regular. Retos moderados.",
  },
  {
    key: "INTERMEDIO" as const,
    title: "Intermedio",
    desc: "Activo. Ejercicios algo desafiantes.",
  }
];

export default function StepLevel({ value, onChange, onPrev, onNext }:{
  value: Profile; onChange:(p:Profile)=>void; onPrev:()=>void; onNext:()=>void;
}) {
  const [level, setLevel] = useState<"BASICO"|"MODERADO"|"INTERMEDIO">(value.level ?? "BASICO");

  return (
    <div>
      <h2 className="text-xl font-bold mb-3">Tu nivel</h2>
      <div className="grid gap-3 mb-6">
        {OPTIONS.map(o => {
          const selected = level === o.key;
          return (
            <label
              key={o.key}
              className={`cursor-pointer rounded-xl border p-4 min-h-[64px]
                ${selected ? "border-[var(--accent)] bg-[var(--card-elevated)]" : "hover:bg-[var(--card-elevated)]"}
                focus-within:outline outline-[var(--accent)]`}
            >
              <input
                type="radio"
                name="level"
                value={o.key}
                checked={selected}
                onChange={() => setLevel(o.key)}
                className="sr-only"
              />
              <div className="flex items-start gap-3">
                <div aria-hidden className={`h-5 w-5 rounded-full mt-1 ${selected ? "bg-[var(--accent)]" : "border"}`} />
                <div>
                  <div className="font-semibold">{o.title}</div>
                  <div className="text-sm text-[var(--fg-muted)]">{o.desc}</div>
                </div>
              </div>
            </label>
          );
        })}
      </div>

      <div className="flex gap-2">
        <A11yButton onClick={onPrev}>Atrás</A11yButton>
        <A11yButton className="ml-auto" onClick={() => { onChange({ ...value, level }); onNext(); }}>
          Siguiente
        </A11yButton>
      </div>
    </div>
  );
}

