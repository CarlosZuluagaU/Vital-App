import React, { useEffect, useMemo, useRef, useState } from "react";
import { useLocation } from "react-router-dom";

/** --- Evento global para disparar cues --- */
const EVT = "mascot:cue";
export type MascotCue = { msg: string; mood?: keyof Reactions; ms?: number };
export function fireMascotCue(cue: MascotCue) {
  window.dispatchEvent(new CustomEvent(EVT, { detail: cue }));
}

/** --- Reacciones por mood --- */
type Reactions = Record<
  "welcome" | "login" | "register" | "routineHalf" | "routineEnd" | "sus" | "tips" | "think" | "ok" | "sad" | "clap",
  { img: string; text: string }
>;

const defaultReactions: Reactions = {
  welcome:     { img: "/vita/Vita01.png", text: "¡Hola! Soy Vita 🐾, ¡qué gusto verte por aquí!" },
  login:       { img: "/vita/Vita06.png", text: "¿Te he visto antes? 🤔 No estoy seguro…" },
  register:    { img: "/vita/Vita03.png", text: "¡Un nuevo amigo! 😸 Bienvenido, espero verte a menudo." },
  routineHalf: { img: "/vita/Vita05.png", text: "¡Vas genial! 🌟 Ya pasaste la mitad de la rutina." },
  routineEnd:  { img: "/vita/Vita04.png", text: "¡Excelente trabajo! 💪 Has completado la rutina." },
  sus:         { img: "/vita/Vita02.png", text: "Gracias por ayudarnos a mejorar 🧠, ¡tus respuestas son valiosas!" },
  tips:        { img: "/vita/Vita05.png", text: "Tip guardado. ¡Sigue así!" },
  think:       { img: "/vita/Vita06.png", text: "Mmm… déjame pensar contigo." },
  ok:          { img: "/vita/Vita01.png", text: "¡Todo listo!" },
  sad:         { img: "/vita/Vita03.png", text: "Ups, algo no salió. Probemos de nuevo." },
  clap:        { img: "/vita/Vita04.png", text: "¡Bravo! 🎉" },
};

type Props = {
  /** ms visible por defecto cuando cambia de ruta */
  initialVisibleMs?: number;
  /** esquina: 'br' (default), 'bl' */
  position?: "br" | "bl";
  /** permite overridear textos/imagenes */
  reactions?: Partial<Reactions>;
  /** desactivar por completo (debug/ab testing) */
  disabled?: boolean;
};

export default function VitaAssistant({
  initialVisibleMs = 8000,
  position = "br",
  reactions: overrides,
  disabled = false,
}: Props) {
  const location = useLocation();
  const reactions = useMemo(
    () => ({ ...defaultReactions, ...(overrides || {}) }) as Reactions,
    [overrides]
  );

  // Verificar si la ruta actual tiene mensaje personalizado
  const hasCustomMessage = useMemo(() => {
    const path = location.pathname.toLowerCase();
    // Excluir específicamente la ruta raíz
    if (path === "/" || path === "/home") return false;
    return path.includes("/resumen") || 
           path.includes("/rutinas/") ||  // Solo con / para evitar match parcial
           path.includes("/onboarding") || 
           path.includes("/questionnaire");
  }, [location.pathname]);

  const [mood, setMood] = useState<keyof Reactions>("welcome");
  const [text, setText] = useState(reactions.welcome.text);
  const [visible, setVisible] = useState(!hasCustomMessage); // No mostrar inicialmente si tiene mensaje custom
  const hideTimer = useRef<number | null>(null);

  const show = (newMood: keyof Reactions, msg?: string, ms?: number) => {
    const r = reactions[newMood] ?? reactions.welcome;
    setMood(newMood);
    setText(msg ?? r.text);
    setVisible(true);
    if (hideTimer.current) window.clearTimeout(hideTimer.current);
    hideTimer.current = window.setTimeout(() => setVisible(false), ms ?? initialVisibleMs);
  };

  // Reacciona a la RUTA (fallback) - Solo para rutas sin mensajes específicos
  useEffect(() => {
    if (disabled) return;
    const path = location.pathname.toLowerCase();
    
    // Rutas que tienen su propio fireMascotCue específico - NO mostrar welcome default
    // Excluir específicamente la ruta raíz
    if (path === "/" || path === "/home") {
      show("welcome");
      return;
    }
    
    const hasCustomMessage = 
      path.includes("/resumen") ||  // WeeklySummary
      path.includes("/rutinas/") ||  // RoutineDetail, RoutinePlayer (con / para evitar match parcial)
      path.includes("/onboarding") || // Steps de onboarding
      path.includes("/questionnaire"); // SUS Questionnaire
    
    if (hasCustomMessage) return; // Las páginas con mensajes específicos manejan su propio cue
    
    // Para el resto, mostramos mensajes por ruta
    if (path.includes("login"))      show("login");
    else if (path.includes("register")) show("register");
    else                                show("welcome");
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [location, disabled]);

  // Escucha EVENTOS (tienen prioridad)
  useEffect(() => {
    if (disabled) return;
    const onCue = (e: Event) => {
      const d = (e as CustomEvent<MascotCue>).detail;
      if (!d?.msg) return;
      const m = (d.mood ?? "ok") as keyof Reactions;
      show(m, d.msg, d.ms);
    };
    window.addEventListener(EVT, onCue as EventListener);
    return () => window.removeEventListener(EVT, onCue as EventListener);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [disabled, reactions]);

  if (disabled || !visible) return null;

  const imgSrc = reactions[mood]?.img ?? reactions.welcome.img;
  const posClasses =
    position === "bl"
      ? "left-4 sm:left-6 bottom-4 sm:bottom-6"
      : "right-4 sm:right-6 bottom-4 sm:bottom-6";

  return (
    <div
      className={`fixed ${posClasses} z-50 flex flex-col items-end gap-3 max-w-[85vw] sm:max-w-[280px] animate-slideInRight`}
      role="status"
      aria-live="polite"
    >
      {/* Bocadillo de texto mejorado */}
      <div className="relative bg-gradient-to-br from-[var(--card)] to-[var(--card-elevated)] border-2 border-[var(--accent)]/30 rounded-2xl px-4 py-3 shadow-2xl text-sm text-[var(--fg)] animate-scaleIn backdrop-blur-sm">
        <div className="absolute inset-0 bg-[var(--accent)]/5 rounded-2xl blur-xl" />
        <p className="relative z-10 font-medium leading-relaxed">{text}</p>
        {/* Piquito del bocadillo */}
        <div className="absolute -bottom-2 right-8 w-4 h-4 bg-[var(--card)] border-r-2 border-b-2 border-[var(--accent)]/30 transform rotate-45" />
      </div>
      
      {/* Mascota con efectos */}
      <div className="relative animate-bounce" style={{ animationDuration: '3s' }}>
        <img
          src={imgSrc}
          alt="Vita"
          className="w-28 sm:w-32 drop-shadow-2xl select-none pointer-events-none relative z-10 transition-transform duration-300 hover:scale-110"
          draggable={false}
        />
        {/* Glow effect */}
        <div className="absolute inset-0 bg-[var(--accent)]/20 rounded-full blur-2xl scale-75 animate-pulse" />
      </div>
    </div>
  );
}
