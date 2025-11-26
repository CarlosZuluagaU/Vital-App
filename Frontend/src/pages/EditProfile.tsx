import { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { usePrefs } from "../context/Preferences";
import { useAuth } from "../context/Auth";
import { changePassword, updateProfile, getWeeklyActivityStats } from "../hooks/useApi";
import AvatarSelector, { DEFAULT_AVATARS } from "../components/AvatarSelector";
import { A11yButton } from "../components/a11y/A11yButton";

export default function EditProfile() {
  const nav = useNavigate();
  const { profile, setProfile } = usePrefs();
  const { user, isAuthenticated } = useAuth();
  const hasLoadedInitialData = useRef(false);

  // Determinar si es invitado (sin autenticación)
  const isGuest = !isAuthenticated;

  // Form states
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [selectedAvatarId, setSelectedAvatarId] = useState(1);
  const [streakDays, setStreakDays] = useState(0);

  // UI states
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [success, setSuccess] = useState("");
  const [showPasswordFields, setShowPasswordFields] = useState(false);

  useEffect(() => {
    // Cargar datos iniciales solo una vez
    if (hasLoadedInitialData.current) return;
    
    // Cargar datos del perfil si existen
    if (profile) {
      setName(profile.name || "");
      setSelectedAvatarId((profile as any)?.avatarId || 1);
    }
    
    // Siempre cargar email del user (esté autenticado o no)
    if (user?.email) {
      setEmail(user.email);
    }
    
    // Si no hay nombre en profile, usar del user
    if (!profile?.name && user?.name) {
      setName(user.name);
    } else if (!profile?.name && user?.username) {
      setName(user.username);
    }
    
    // IMPORTANTE: Si el user del backend tiene avatarId, sincronizar con profile
    if (user && (user as any).avatarId && isAuthenticated) {
      const backendAvatarId = (user as any).avatarId;
      console.log("Sincronizando avatarId del backend:", backendAvatarId);
      setSelectedAvatarId(backendAvatarId);
      
      // Actualizar el profile en localStorage con el avatarId del backend
      if (!profile || profile.avatarId !== backendAvatarId) {
        setProfile({
          ...profile,
          name: profile?.name || user.name || user.username || "",
          email: user.email,
          avatarId: backendAvatarId,
        });
      }
    }

    // Obtener la racha del backend
    const fetchStreak = async () => {
      try {
        const stats = await getWeeklyActivityStats();
        setStreakDays(stats.currentStreak ?? 0);
      } catch (error) {
        console.error("Error obteniendo racha:", error);
        setStreakDays(0);
      }
    };
    fetchStreak();
    
    // Marcar como cargado
    hasLoadedInitialData.current = true;
  }, [profile, user, isAuthenticated, setProfile]);

  const getAvatarImage = (id: number) => {
    return DEFAULT_AVATARS.find((a) => a.id === id)?.image || "/images/Default.png";
  };

  const validateForm = (): boolean => {
    if (!name.trim()) {
      setError("El nombre es requerido");
      return false;
    }

    if (showPasswordFields) {
      setPasswordError(""); // Limpiar errores previos
      
      if (!currentPassword.trim()) {
        setPasswordError("⚠️ Debes ingresar tu contraseña actual para cambiarla");
        return false;
      }
      
      if (!newPassword && !confirmPassword) {
        setPasswordError("⚠️ Debes ingresar una nueva contraseña");
        return false;
      }
      
      if (newPassword.length < 8) {
        setPasswordError("⚠️ La nueva contraseña debe tener al menos 8 caracteres");
        return false;
      }
      
      if (!/[A-Z]/.test(newPassword)) {
        setPasswordError("⚠️ La nueva contraseña debe contener al menos 1 letra mayúscula (A-Z)");
        return false;
      }
      
      if (!/[0-9]/.test(newPassword)) {
        setPasswordError("⚠️ La nueva contraseña debe contener al menos 1 número (0-9)");
        return false;
      }
      
      if (newPassword === currentPassword) {
        setPasswordError("⚠️ La nueva contraseña debe ser diferente a la actual");
        return false;
      }
      
      if (newPassword !== confirmPassword) {
        setPasswordError("⚠️ Las contraseñas nuevas no coinciden. Verifica que sean idénticas");
        return false;
      }
    }

    return true;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setPasswordError("");
    setSuccess("");

    if (!validateForm()) return;

    setLoading(true);

    try {
      console.log("=== SUBMIT PROFILE ===");
      console.log("isGuest:", isGuest);
      console.log("isAuthenticated:", isAuthenticated);
      console.log("name:", name);
      console.log("selectedAvatarId:", selectedAvatarId);
      
      // Si es invitado, solo actualizar localStorage
      if (isGuest) {
        console.log(">>> Modo INVITADO - guardando en localStorage");
        const updatedProfile = {
          ...profile,
          name,
          avatarId: selectedAvatarId,
          streakDays,
        };
        setProfile(updatedProfile);
        setSuccess("✅ Perfil actualizado correctamente");
        setTimeout(() => nav("/"), 2000);
        setLoading(false);
        return;
      }

      // Usuario autenticado: actualizar en backend
      console.log(">>> Usuario AUTENTICADO - llamando API");
      const updatedUser = await updateProfile(name, selectedAvatarId);
      console.log(">>> Respuesta del backend:", updatedUser);
      
      // Si hay cambio de contraseña, hacerlo en endpoint separado
      if (showPasswordFields && newPassword) {
        try {
          await changePassword(currentPassword, newPassword);
        } catch (passwordError: any) {
          // Errores específicos de cambio de contraseña
          const errorMsg = passwordError?.message || "Error al cambiar la contraseña";
          if (errorMsg.includes("incorrecta") || errorMsg.includes("incorrect")) {
            setPasswordError("⚠️ La contraseña actual es incorrecta. Verifica e intenta de nuevo");
          } else if (errorMsg.includes("igual")) {
            setPasswordError("⚠️ La nueva contraseña debe ser diferente a la actual");
          } else {
            setPasswordError(`⚠️ Error al cambiar contraseña: ${errorMsg}`);
          }
          setLoading(false);
          return; // No continuar si falla el cambio de contraseña
        }
      }

      // Actualizar contexto con nuevos datos
      const updatedProfile = {
        ...profile,
        name: updatedUser.name || name,
        email: updatedUser.email || email,
        avatarId: updatedUser.avatarId || selectedAvatarId,
        streakDays,
      };

      setProfile(updatedProfile);
      setSuccess("✅ Perfil actualizado correctamente");

      // Limpiar contraseñas
      setCurrentPassword("");
      setNewPassword("");
      setConfirmPassword("");
      setShowPasswordFields(false);

      // Redirigir después de 2 segundos
      setTimeout(() => nav("/"), 2000);
    } catch (err: any) {
      const errorMsg = err?.message || "Error al actualizar el perfil";
      setError(`⚠️ ${errorMsg}`);
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="mx-auto max-w-screen-sm md:max-w-screen-md lg:max-w-screen-lg px-4 py-6 relative">
      {/* Decorative background */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden -z-10">
        <div className="absolute -top-32 -right-32 w-96 h-96 bg-[var(--accent)]/20 rounded-full blur-3xl animate-pulse" style={{ animationDuration: "6s" }}></div>
        <div className="absolute -bottom-32 -left-32 w-64 h-64 bg-[var(--accent)]/10 rounded-full blur-3xl animate-pulse" style={{ animationDuration: "8s" }}></div>
      </div>

      {/* Header */}
      <header className="mb-6 animate-fadeIn">
        <button
          onClick={() => nav(-1)}
          className="min-h-[44px] min-w-[44px] px-4 rounded-xl border border-[var(--border)] bg-[var(--card)] hover:bg-[var(--card-elevated)] hover:scale-105 active:scale-100 transition-all duration-300"
        >
          ← Volver
        </button>
      </header>

      {/* Avatar Preview Section */}
      <section className="rounded-2xl border-2 border-[var(--accent)]/30 bg-gradient-to-br from-[var(--card)] to-[var(--card-elevated)] p-6 md:p-8 shadow-lg mb-6 animate-scaleIn">
        <div className="flex flex-col md:flex-row items-center gap-8">
          {/* Avatar grande */}
          <div className="flex flex-col items-center gap-3">
            <div className="w-24 h-24 rounded-2xl bg-gradient-to-br from-[var(--accent)]/20 to-[var(--accent)]/10 border-2 border-[var(--accent)]/30 flex items-center justify-center shadow-lg hover:shadow-xl transition-shadow duration-300 overflow-hidden">
              <img 
                src={getAvatarImage(selectedAvatarId)} 
                alt="Avatar seleccionado"
                className="w-20 h-20 object-contain"
              />
            </div>
            <div className="text-center">
              <p className="text-sm text-[var(--fg-muted)]">Tu avatar</p>
              <p className="text-xs text-[var(--accent)] font-semibold mt-1">
                {DEFAULT_AVATARS.find((a) => a.id === selectedAvatarId)?.name}
              </p>
            </div>
          </div>

          {/* Racha y info */}
          <div className="flex-1 space-y-4">
            <div className="bg-gradient-to-br from-[var(--accent)]/10 to-transparent p-4 rounded-xl border border-[var(--accent)]/20">
              <div className="flex items-center gap-3">
                <span className="text-4xl animate-pulse" style={{ animationDuration: "2s" }}>🔥</span>
                <div>
                  <p className="text-sm text-[var(--fg-muted)]">Racha actual</p>
                  <p className="text-3xl font-extrabold text-[var(--accent)]">
                    {streakDays} día{streakDays === 1 ? "" : "s"}
                  </p>
                </div>
              </div>
            </div>
            <p className="text-xs text-[var(--fg-muted)] leading-relaxed">
              ¡Sigue así! Cada día que ejercitas aumenta tu racha. 💪
            </p>
          </div>
        </div>
      </section>

      {/* Form Section */}
      <form onSubmit={handleSubmit} className="space-y-6 animate-fadeIn" style={{ animationDelay: "0.1s" }}>
        {/* Messages */}
        {error && (
          <div className="rounded-xl border-2 border-[var(--accent)]/30 bg-[var(--accent)]/10 p-4 animate-slideInUp">
            <p className="text-sm text-[var(--fg)] font-semibold flex items-center gap-2">
              <span>⚠️</span> {error}
            </p>
          </div>
        )}

        {success && (
          <div className="rounded-xl border-2 border-[var(--accent)]/30 bg-[var(--accent)]/10 p-4 animate-slideInUp">
            <p className="text-sm text-[var(--fg)] font-semibold flex items-center gap-2">
              <span>✅</span> {success}
            </p>
          </div>
        )}

        {/* Nombre */}
        <div className="space-y-3 animate-slideInRight" style={{ animationDelay: "0.15s", animationFillMode: "backwards" }}>
          <label className="block text-sm font-semibold text-[var(--fg)] uppercase tracking-wide flex items-center gap-2">
            <span>👤</span> Nombre
          </label>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="w-full px-4 py-3 rounded-xl border border-[var(--border)] bg-[var(--card)] text-[var(--fg)] placeholder-[var(--fg-muted)] focus:outline-none focus:border-[var(--accent)] focus:ring-2 focus:ring-[var(--accent)]/20 transition-all duration-300"
            placeholder="Tu nombre"
            required
          />
        </div>

        {/* Email (solo lectura o para mostrar) */}
        <div className="space-y-3 animate-slideInRight" style={{ animationDelay: "0.2s", animationFillMode: "backwards" }}>
          <label className="block text-sm font-semibold text-[var(--fg)] uppercase tracking-wide flex items-center gap-2">
            <span>📧</span> Email
          </label>
          <input
            type="email"
            value={email}
            disabled
            className="w-full px-4 py-3 rounded-xl border border-[var(--border)] bg-[var(--card-elevated)] text-[var(--fg-muted)] cursor-not-allowed opacity-60"
          />
          <p className="text-xs text-[var(--fg-muted)]">El email no se puede modificar</p>
        </div>

        {/* Avatar Selector */}
        <div className="animate-slideInRight" style={{ animationDelay: "0.25s", animationFillMode: "backwards" }}>
          <AvatarSelector selectedId={selectedAvatarId} onSelect={setSelectedAvatarId} />
        </div>

        {/* Cambiar contraseña - Solo para usuarios autenticados */}
        {!isGuest && (
          <>
            <div className="animate-slideInRight" style={{ animationDelay: "0.3s", animationFillMode: "backwards" }}>
              <button
                type="button"
                onClick={() => setShowPasswordFields(!showPasswordFields)}
                className="w-full px-4 py-3 rounded-xl border-2 border-[var(--accent)]/30 bg-[var(--accent)]/5 text-[var(--fg)] font-semibold hover:bg-[var(--accent)]/10 hover:border-[var(--accent)]/50 transition-all duration-300 flex items-center gap-2 justify-center"
              >
                <span>{showPasswordFields ? "✕" : "+"}</span> {showPasswordFields ? "Cancelar cambio de contraseña" : "Cambiar contraseña"}
              </button>
            </div>

            {/* Password Error Message */}
            {passwordError && (
              <div className="p-4 rounded-xl bg-red-500/10 border border-red-500/30 text-[var(--fg)] animate-slideInUp">
                {passwordError}
              </div>
            )}

            {/* Password Fields */}
            {showPasswordFields && (
          <div className="space-y-4 p-4 rounded-xl border-2 border-[var(--accent)]/20 bg-[var(--accent)]/5 animate-slideInUp">
            {/* Contraseña actual */}
            <div className="space-y-2">
              <label className="block text-sm font-semibold text-[var(--fg)] flex items-center gap-2">
                <span>🔐</span> Contraseña actual
              </label>
              <input
                type="password"
                value={currentPassword}
                onChange={(e) => setCurrentPassword(e.target.value)}
                className="w-full px-4 py-3 rounded-xl border border-[var(--border)] bg-[var(--card)] text-[var(--fg)] placeholder-[var(--fg-muted)] focus:outline-none focus:border-[var(--accent)] focus:ring-2 focus:ring-[var(--accent)]/20 transition-all duration-300"
                placeholder="Ingresa tu contraseña actual"
                required={showPasswordFields}
              />
            </div>

            {/* Nueva contraseña */}
            <div className="space-y-2">
              <label className="block text-sm font-semibold text-[var(--fg)] flex items-center gap-2">
                <span>🔑</span> Nueva contraseña
              </label>
              <input
                type="password"
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
                className="w-full px-4 py-3 rounded-xl border border-[var(--border)] bg-[var(--card)] text-[var(--fg)] placeholder-[var(--fg-muted)] focus:outline-none focus:border-[var(--accent)] focus:ring-2 focus:ring-[var(--accent)]/20 transition-all duration-300"
                placeholder="Dejalo vacío para no cambiar"
              />
              <p className="text-xs text-[var(--fg-muted)]">Mínimo 8 caracteres, 1 mayúscula y 1 número</p>
            </div>

            {/* Confirmar nueva contraseña */}
            <div className="space-y-2">
              <label className="block text-sm font-semibold text-[var(--fg)] flex items-center gap-2">
                <span>✓</span> Confirmar nueva contraseña
              </label>
              <input
                type="password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                className="w-full px-4 py-3 rounded-xl border border-[var(--border)] bg-[var(--card)] text-[var(--fg)] placeholder-[var(--fg-muted)] focus:outline-none focus:border-[var(--accent)] focus:ring-2 focus:ring-[var(--accent)]/20 transition-all duration-300"
                placeholder="Repite tu nueva contraseña"
              />
            </div>
          </div>
        )}
        </>
        )}

        {/* Submit Button */}
        <div className="flex gap-3 pt-4 animate-slideInUp" style={{ animationDelay: "0.35s", animationFillMode: "backwards" }}>
          <A11yButton
            type="submit"
            variant="primary"
            disabled={loading}
            className="flex-1"
          >
            {loading ? "🔄 Guardando..." : "💾 Guardar cambios"}
          </A11yButton>
          <A11yButton
            type="button"
            variant="secondary"
            onClick={() => nav(-1)}
            disabled={loading}
          >
            Cancelar
          </A11yButton>
        </div>
      </form>
    </main>
  );
}
