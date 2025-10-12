import React, { createContext, useCallback, useContext, useEffect, useMemo, useState } from "react";
import type { UserDTO, LoginRequestDTO, RegisterRequestDTO } from "../types/InterfaceRoutines";
import { getAuthToken, login as apiLogin, register as apiRegister, getMe as apiGetMe, logout as apiLogout, handleOAuth2Redirect } from "../hooks/useApi";

const AUTH_MODE = (import.meta.env.VITE_AUTH_MODE || "header") as "header" | "cookie";

type AuthState = { user: UserDTO | null; token: string | null; loading: boolean; error: string | null; };
type AuthContextValue = AuthState & {
  login: (payload: LoginRequestDTO) => Promise<UserDTO | null>;
  register: (payload: RegisterRequestDTO) => Promise<UserDTO | null>;
  refreshMe: () => Promise<UserDTO | null>;
  logout: () => void;
  isAuthenticated: boolean;
};

const AuthContext = createContext<AuthContextValue | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<UserDTO | null>(null);
  const [token, setToken] = useState<string | null>(getAuthToken());
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const refreshMe = useCallback(async () => {
    try {
      const me = await apiGetMe();
      setUser(me || null);
      return me || null;
    } catch {
      setUser(null);
      return null;
    }
  }, []);

  useEffect(() => {
    handleOAuth2Redirect();
    (async () => {
      try {
        const t = getAuthToken();
        setToken(t);
        if (AUTH_MODE === "cookie" || t) {
          await refreshMe();
        }
      } finally {
        setLoading(false);
      }
    })();
  }, [refreshMe]);

  const login = useCallback(async (payload: LoginRequestDTO) => {
    setError(null);
    try {
      const u = await apiLogin(payload);
      setToken(getAuthToken());
      setUser(u || null);
      return u;
    } catch (e: any) {
      setError(e?.message || "No se pudo iniciar sesión");
      throw e; // ⬅️ IMPORTANTE: relanza el error para que StepOAuth lo capture
    }
  }, []);

  const register = useCallback(async (payload: RegisterRequestDTO) => {
    setError(null);
    try {
      const u = await apiRegister(payload);
      setToken(getAuthToken());
      setUser(u || null);
      return u;
    } catch (e: any) {
      setError(e?.message || "No se pudo registrar");
      throw e; // ⬅️ IMPORTANTE
    }
  }, []);

  const logout = useCallback(() => {
    apiLogout();
    setUser(null);
    setToken(null);
    setError(null);
  }, []);

  const isAuthenticated = AUTH_MODE === "cookie" ? !!user : !!token && !!user;

  const value = useMemo<AuthContextValue>(() => ({
    user, token, loading, error, login, register, refreshMe, logout, isAuthenticated,
  }), [user, token, loading, error, login, register, refreshMe, logout, isAuthenticated]);

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth debe usarse dentro de <AuthProvider>");
  return ctx;
}
