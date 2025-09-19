import { A11yButton } from "../components/a11y/A11yButton";
import { usePrefs } from "../context/Preferences";
import { useNavigate } from "react-router-dom";

export default function Welcome() {
  const nav = useNavigate();
  const { setProfile } = usePrefs();

  const continuarInvitado = () => {
    setProfile({ name: "Invitado", level: "BASICO" });
    nav("/", { replace: true });
  };

  const abrirA11y = () => nav("/onboarding?step=2");

  return (
    <main className="min-h-screen grid place-items-center p-4">
      <section className="w-full max-w-md rounded-2xl bg-[var(--card)] p-6 shadow">
        <div className="mx-auto mb-4 grid place-items-center">
          <div className="h-16 w-16 rounded-full bg-blue-100 grid place-items-center">
            <span aria-hidden>💙</span>
          </div>
        </div>

        <h1 className="text-center text-xl font-bold mb-2">¡Bienvenido a VitalApp!</h1>
        <p className="text-center text-sm text-gray-500 mb-6">
          Tu compañero personal para mantenerte activo y saludable.
          Ejercicios diseñados especialmente para adultos mayores.
        </p>

        <A11yButton className="w-full mb-3" onClick={() => nav("/onboarding")}>
          Crear Mi Perfil
        </A11yButton>

        <button
          onClick={continuarInvitado}
          className="w-full rounded-lg px-4 py-3 min-h-[44px] border focus-visible:outline"
        >
          Continuar como Invitado
        </button>

        <div className="mt-6">
          <button
            onClick={abrirA11y}
            className="w-full rounded-lg px-4 py-3 min-h-[44px] border focus-visible:outline"
          >
            Configuración de Accesibilidad
          </button>

          <ul className="mt-4 text-xs text-gray-500 list-disc ml-5 space-y-1">
            <li>Rutinas adaptadas a tu nivel</li>
            <li>Comandos de voz (más adelante)</li>
            <li>Sin recopilación de datos personales</li>
          </ul>
        </div>
      </section>
    </main>
  );
}
