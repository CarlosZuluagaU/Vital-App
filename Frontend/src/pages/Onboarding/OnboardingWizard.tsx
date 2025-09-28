import { useState } from "react";
import { usePrefs } from "../../context/Preferences";
import type { Profile } from "../../context/Preferences";

import StepOAuth from "./steps/StepOAuth";
import StepName from "./steps/StepName";
import StepLevel from "./steps/StepLevel";
import StepA11y from "./steps/StepA11y";
import ProgressBar from "../../components/ui/ProgressBar";

export default function OnboardingWizard() {
  const { setProfile } = usePrefs();
  const [data, setData] = useState<Profile>({});

  // 0: OAuth, 1: Name, 2: Level, 3: A11y
  const [step, setStep] = useState(0);

  const steps = [
    // Paso 0: OAuth
    <StepOAuth key="0" onContinue={() => setStep(1)} />,

    // Paso 1: Nombre
    <StepName
      key="1"
      value={data}
      onChange={setData}
      onNext={() => setStep(2)}
    />,

    // Paso 2: Nivel
    <StepLevel
      key="2"
      value={data}
      onChange={setData}
      onPrev={() => setStep(1)}
      onNext={() => setStep(3)}
    />,

    // Paso 3: Accesibilidad
    <StepA11y
      key="3"
      value={data}
      onChange={setData}
      onPrev={() => setStep(2)}
      onFinish={() => {
        setProfile(data);      // guarda en contexto/localStorage
        location.href = "/";   // redirige al Home
      }}
    />,
  ];

  return (
    <main className="min-h-screen grid place-items-center p-4">
      <section className="w-full max-w-md p-6 rounded-2xl bg-[var(--card)] shadow">
        <ProgressBar value={step + 1} max={steps.length} />
        {steps[step]}
      </section>
    </main>
  );
}
