import React, { createContext, useContext, useEffect, useMemo } from "react";
import { useLocalStorage } from "../hooks/useLocalStorage";

export type FontSize = "sm" | "md" | "lg";

export type Profile = {
  name?: string;
  level?: "BASICO" | "MODERADO" | "INTERMEDIO";
  avatarId?: number;
  email?: string;
  streakDays?: number;
};

type Prefs = {
  fontSize: FontSize;
  highContrast: boolean;
  profile: Profile | null;
  setFontSize: (v: FontSize) => void;
  setHighContrast: (v: boolean) => void;
  setProfile: (p: Profile | null) => void;
};

const Ctx = createContext<Prefs | null>(null);

export const PreferencesProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [fontSize, setFontSize] = useLocalStorage<FontSize>("prefs:font", "md");
  const [highContrast, setHighContrast] = useLocalStorage<boolean>("prefs:hc", false);
  const [profile, setProfile] = useLocalStorage<Profile | null>("profile", null);

  // Aplica clases al <html>
  useEffect(() => {
    const el = document.documentElement;
    el.dataset.font = fontSize;             // data-font="sm|md|lg"
    el.dataset.contrast = highContrast ? "true" : "false"; //true para alto contraste y false para normal
  }, [fontSize, highContrast]);

  const value = useMemo(
    () => ({ fontSize, highContrast, profile, setFontSize, setHighContrast, setProfile }),
    [fontSize, highContrast, profile]
  );

  return <Ctx.Provider value={value}>{children}</Ctx.Provider>;
};

export const usePrefs = () => {
  const ctx = useContext(Ctx);
  if (!ctx) throw new Error("usePrefs must be used within PreferencesProvider");
  return ctx;
};