import { useState } from "react";
import { usePrefs } from "../../context/Preferences";
import type { Profile } from "../../context/Preferences";
import StepName from "./steps/StepName";
import StepLevel from "./steps/StepLevel";
import StepA11y from "./steps/StepA11y";
import ProgressBar from "../../components/ui/ProgressBar"

export default function OnboardingWizard() {
  const { setProfile } = usePrefs();
  const [data, setData] = useState<Profile>({});

  const [step, setStep] = useState(0);
  const steps = [
    <StepName key="1" value={data} onChange={setData} onNext={()=>setStep(1)} />,
    <StepLevel key="2" value={data} onChange={setData} onPrev={()=>setStep(0)} onNext={()=>setStep(2)} />,
    <StepA11y key="3"
      value={data} onChange={setData}
      onPrev={()=>setStep(1)}
      onFinish={() => { setProfile(data); /* redirect */ location.href = "/"; }}
    />,
  ];

  return (
    <main className="min-h-screen grid place-items-center p-4">
      <section className="w-full max-w-md p-6 rounded-2xl bg-[var(--card)] shadow">
        <ProgressBar value={step+1} max={steps.length} />
        {steps[step]}
      </section>
    </main>
  );
}
