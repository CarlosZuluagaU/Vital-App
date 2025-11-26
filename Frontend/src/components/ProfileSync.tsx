import { useEffect, useRef } from "react";
import { useAuth } from "../context/Auth";
import { usePrefs } from "../context/Preferences";

/**
 * Componente que sincroniza el avatarId del backend (user) con el profile de localStorage
 * Solo sincroniza cuando el user cambia (por login/refresh), no interfiere con cambios manuales
 */
export default function ProfileSync() {
  const { user, isAuthenticated } = useAuth();
  const { profile, setProfile } = usePrefs();
  const lastSyncedUserId = useRef<number | null>(null);

  useEffect(() => {
    if (!isAuthenticated || !user) {
      lastSyncedUserId.current = null;
      return;
    }

    const userId = (user as any).id;
    const userAvatarId = (user as any).avatarId;
    
    // Solo sincronizar si:
    // 1. Es un usuario diferente (nuevo login) O
    // 2. Es el primer render con este usuario Y el profile no tiene avatarId
    const isNewUser = lastSyncedUserId.current !== userId;
    const needsSync = isNewUser || (!profile?.avatarId && userAvatarId);
    
    if (userAvatarId && needsSync) {
      console.log("🔄 Sincronizando avatarId del backend al profile:", userAvatarId);
      setProfile({
        ...profile,
        name: profile?.name || user.name || (user as any).username || "",
        email: user.email,
        avatarId: userAvatarId,
      });
      lastSyncedUserId.current = userId;
    }
  }, [user, isAuthenticated]); // Removí profile y setProfile de las dependencias

  return null; // Componente invisible, solo para sincronización
}
