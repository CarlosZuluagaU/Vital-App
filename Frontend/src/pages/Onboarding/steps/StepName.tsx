import { useState } from "react";
import { A11yButton } from "../../../components/a11y/A11yButton";
import type { Profile } from "../../../context/Preferences";

export default function StepName({ value, onChange, onNext }:{
  value: Profile; onChange:(p:Profile)=>void; onNext:()=>void;
}) {
  const [name, setName] = useState(value.name ?? "");
  const [error, setError] = useState<string | null>(null);

  const submit = () => {
    if (!name.trim()) { setError("Por favor, dinos tu nombre."); return; }
    onChange({ ...value, name: name.trim() });
    onNext();
  };

  return (
    <div>
      <h1 className="text-xl font-bold mb-2">¡Bienvenida/o a VitalApp!</h1>
      <p className="mb-4">¿Cómo te llamamos?</p>
      <label className="block mb-1 font-medium" htmlFor="name">Nombre</label>
      <input
        id="name"
        value={name}
        onChange={e=>setName(e.target.value)}
        aria-invalid={!!error}
        aria-describedby={error ? "name-err" : undefined}
        className="w-full rounded-lg border p-3"
      />
      {error && <p id="name-err" className="mt-1 text-red-500">{error}</p>}
      <A11yButton className="mt-4 w-full" onClick={submit}>Continuar</A11yButton>
    </div>
  );
}
