import { useEffect, useState } from "react";
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
  const { isAuthenticated, user } = useAuth();

  const [data, setData] = useState<Profile>({});
  const [step, setStep] = useState(0);
  const [guest, setGuest] = useState(false);

  // Si autenticó (no invitado), pre-seatea nombre (si backend lo trae) y salta StepName
  function goFromAuth() {
    if (isAuthenticated) {
      setData((prev) => ({
        ...prev,
        name: (user as any)?.name || (user as any)?.username || prev.name,
      }));
      setStep(2);
    } else if (guest) {
      setStep(1);
    }
  }

  useEffect(() => {
    if (step === 0 && (isAuthenticated || guest)) {
      goFromAuth();
    }
  }, [isAuthenticated, guest]);

  const steps = [
    // Paso 0: OAuth / Login / Registro / Invitado
    <StepOAuth
      key="0"
      onContinue={() => {
        if (!guest) {
          setData((prev) => ({
            ...prev,
            name: (user as any)?.name || (user as any)?.username || prev.name,
          }));
          setStep(2);
        } else {
          // invitado → ir a StepName
          setStep(1);
        }
      }}
      onGuest={() => {
        setGuest(true);
        setStep(1);
      }}
    />,

    // Paso 1: Nombre (solo invitado)
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
      onPrev={() => (guest ? setStep(1) : setStep(2))}
      onNext={() => setStep(3)}
    />,

    // Paso 3: Accesibilidad
    <StepA11y
      key="3"
      value={data}
      onChange={setData}
      onPrev={() => setStep(2)}
      onFinish={() => {
        setProfile(data);
        location.href = "/";
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
