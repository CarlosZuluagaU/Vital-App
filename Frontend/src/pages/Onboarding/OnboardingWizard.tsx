import { useState } from "react";
import { usePrefs } from "../../context/Preferences";
import type { Profile } from "../../context/Preferences";

import { useAuth } from "../../context/Auth";
import StepOAuth from "./steps/StepOAuth";
import StepName from "./steps/StepName";
import StepLevel from "./steps/StepLevel";
import StepA11y from "./steps/StepA11y";
import ProgressBar from "../../components/ui/ProgressBar";

export default function OnboardingWizard() {
  const { setProfile } = usePrefs();
  const { isAuthenticated } = useAuth();

  const [data, setData] = useState<Profile>({});
  // 0: OAuth, 1: Name, 2: Level, 3: A11y
  const [step, setStep] = useState(0);
  const [guest, setGuest] = useState(false);

  function goFromAuth() {
    // Avanza si hay sesión o si el usuario optó por invitado
    if (isAuthenticated || guest) setStep(1);
  }

  const steps = [
    // Paso 0: OAuth
    <StepOAuth
      key="0"
      onContinue={goFromAuth}             // llamado tras login/registro OK
      onGuest={() => { setGuest(true); goFromAuth(); }} // invitado explícito
    />,

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
