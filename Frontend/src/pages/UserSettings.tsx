import React, { useEffect, useState, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/Auth';
import { fireMascotCue } from '../components/pet/VitaAssistant';

interface UserProfile {
  id: number;
  name: string;
  email: string;
  profilePicture?: string;
  fitnessLevel?: string;
  preferredLocation?: string;
  phone?: string;
  dateOfBirth?: string;
  height?: number;
  weight?: number;
  healthConditions?: string;
  fitnessGoals?: string;
  createdAt?: string;
}

interface FormData {
  name: string;
  email: string;
  phone: string;
  dateOfBirth: string;
  height: string;
  weight: string;
  fitnessLevel: string;
  preferredLocation: string;
  healthConditions: string;
  fitnessGoals: string;
}

const UserSettings: React.FC = () => {
  const nav = useNavigate();
  const { user, refreshMe } = useAuth(); // Llamar useAuth en el nivel superior
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [profile, setProfile] = useState<UserProfile | null>(null);
  const [formData, setFormData] = useState<FormData>({
    name: '',
    email: '',
    phone: '',
    dateOfBirth: '',
    height: '',
    weight: '',
    fitnessLevel: '',
    preferredLocation: '',
    healthConditions: '',
    fitnessGoals: ''
  });

  const [errors, setErrors] = useState<Partial<FormData>>({});
  const [showAdvanced, setShowAdvanced] = useState(false);

  const fitnessLevels = [
    { value: '', label: 'Seleccionar nivel' },
    { value: 'BEGINNER', label: 'Principiante' },
    { value: 'INTERMEDIATE', label: 'Intermedio' },
    { value: 'ADVANCED', label: 'Avanzado' },
    { value: 'EXPERT', label: 'Experto' }
  ];

  const locations = [
    { value: '', label: 'Seleccionar ubicación' },
    { value: 'HOME', label: 'Casa' },
    { value: 'GYM', label: 'Gimnasio' },
    { value: 'OUTDOOR', label: 'Al aire libre' },
    { value: 'BOTH', label: 'Ambos' }
  ];

  const fitnessGoals = [
    { value: '', label: 'Seleccionar objetivo' },
    { value: 'WEIGHT_LOSS', label: 'Pérdida de peso' },
    { value: 'MUSCLE_GAIN', label: 'Ganancia muscular' },
    { value: 'ENDURANCE', label: 'Resistencia' },
    { value: 'FLEXIBILITY', label: 'Flexibilidad' },
    { value: 'GENERAL_FITNESS', label: 'Condición física general' },
    { value: 'STRENGTH', label: 'Fuerza' },
    { value: 'BALANCE', label: 'Equilibrio' },
    { value: 'REHABILITATION', label: 'Rehabilitación' }
  ];

  const fetchUserProfile = useCallback(async () => {
    try {
      const token = localStorage.getItem('auth:token');
      if (!token) {
        nav('/welcome');
        return;
      }

      // Intentar obtener datos del backend primero
      try {
        const response = await fetch('http://localhost:8080/api/me/profile', {
          headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json'
          }
        });
        
        if (response.ok) {
          const data: UserProfile = await response.json();
          setProfile(data);
          setFormData({
            name: data.name || '',
            email: data.email || '',
            phone: data.phone || '',
            dateOfBirth: data.dateOfBirth || '',
            height: data.height?.toString() || '',
            weight: data.weight?.toString() || '',
            fitnessLevel: data.fitnessLevel || '',
            preferredLocation: data.preferredLocation || '',
            healthConditions: data.healthConditions || '',
            fitnessGoals: data.fitnessGoals || ''
          });
          setLoading(false);
          return;
        } else if (response.status === 401) {
          localStorage.removeItem('auth:token');
          nav('/welcome');
          return;
        }
      } catch (backendError) {
        console.warn('Backend no disponible, usando datos del contexto de autenticación:', backendError);
      }

      // Fallback: usar datos del contexto de autenticación si el backend no está disponible
      if (user) {
        const profileFromAuth: UserProfile = {
          id: user.id || 1,
          name: user.name || "Usuario",
          email: user.email || "usuario@example.com",
          profilePicture: undefined,
          fitnessLevel: "",
          preferredLocation: "",
          phone: user.phone,
          dateOfBirth: undefined,
          height: undefined,
          weight: undefined,
          healthConditions: undefined,
          fitnessGoals: undefined,
          createdAt: user.createdAt || new Date().toISOString()
        };
        
        setProfile(profileFromAuth);
        setFormData({
          name: profileFromAuth.name || '',
          email: profileFromAuth.email || '',
          phone: profileFromAuth.phone || '',
          dateOfBirth: profileFromAuth.dateOfBirth || '',
          height: profileFromAuth.height?.toString() || '',
          weight: profileFromAuth.weight?.toString() || '',
          fitnessLevel: profileFromAuth.fitnessLevel || '',
          preferredLocation: profileFromAuth.preferredLocation || '',
          healthConditions: profileFromAuth.healthConditions || '',
          fitnessGoals: profileFromAuth.fitnessGoals || ''
        });
        setLoading(false);
        return;
      }

      // Si no hay usuario, redirigir al login
      nav('/welcome');
      
    } catch (error) {
      console.error('Error general fetching profile:', error);
      fireMascotCue({ mood: 'think', msg: 'No pude cargar tu perfil 😕 Inténtalo más tarde', ms: 3000 });
    } finally {
      setLoading(false);
    }
  }, [nav, user]);

  useEffect(() => {
    fetchUserProfile();
  }, [fetchUserProfile]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    
    // Limpiar errores cuando el usuario empiece a escribir
    if (errors[name as keyof FormData]) {
      setErrors(prev => ({
        ...prev,
        [name]: undefined
      }));
    }
  };

  const validateForm = (): boolean => {
    const newErrors: Partial<FormData> = {};
    
    if (!formData.name.trim()) {
      newErrors.name = 'El nombre es requerido';
    }
    
    if (!formData.email.trim()) {
      newErrors.email = 'El correo es requerido';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = 'Formato de correo inválido';
    }
    
    if (formData.phone && !/^[+]?[()]?[\d\s\-()]{10,}$/.test(formData.phone)) {
      newErrors.phone = 'Formato de teléfono inválido';
    }
    
    if (formData.height && (isNaN(Number(formData.height)) || Number(formData.height) <= 0)) {
      newErrors.height = 'La altura debe ser un número válido';
    }
    
    if (formData.weight && (isNaN(Number(formData.weight)) || Number(formData.weight) <= 0)) {
      newErrors.weight = 'El peso debe ser un número válido';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) {
      fireMascotCue({ mood: 'think', msg: 'Por favor corrige los errores en el formulario 📝', ms: 3000 });
      return;
    }
    
    setSaving(true);

    try {
      const token = localStorage.getItem('auth:token');
      if (!token) {
        nav('/welcome');
        return;
      }

      // Preparar datos para envío
      const dataToSend = {
        ...formData,
        height: formData.height ? Number(formData.height) : null,
        weight: formData.weight ? Number(formData.weight) : null,
        phone: formData.phone || null,
        dateOfBirth: formData.dateOfBirth || null,
        healthConditions: formData.healthConditions || null,
        fitnessGoals: formData.fitnessGoals || null
      };

      // Intentar enviar al backend primero
      try {
        const response = await fetch('http://localhost:8080/api/me/profile', {
          method: 'PUT',
          headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(dataToSend)
        });

        if (response.ok) {
          const updatedProfile: UserProfile = await response.json();
          setProfile(updatedProfile);
          fireMascotCue({ mood: 'clap', msg: '¡Perfil actualizado! 🎉 ¡Tus cambios se guardaron correctamente!', ms: 4000 });
          setSaving(false);
          return;
        } else if (response.status === 401) {
          localStorage.removeItem('auth:token');
          nav('/welcome');
          return;
        } else {
          throw new Error('Error al actualizar perfil en el servidor');
        }
      } catch (backendError) {
        console.warn('Backend no disponible, guardando cambios localmente:', backendError);
        
        // Fallback: guardar localmente y actualizar contexto de auth
        const updatedProfile: UserProfile = {
          id: profile?.id || 1,
          name: formData.name,
          email: formData.email,
          phone: formData.phone || undefined,
          dateOfBirth: formData.dateOfBirth || undefined,
          height: formData.height ? Number(formData.height) : undefined,
          weight: formData.weight ? Number(formData.weight) : undefined,
          fitnessLevel: formData.fitnessLevel,
          preferredLocation: formData.preferredLocation,
          healthConditions: formData.healthConditions || undefined,
          fitnessGoals: formData.fitnessGoals || undefined,
          createdAt: profile?.createdAt || new Date().toISOString()
        };
        
        setProfile(updatedProfile);
        
        // Actualizar el contexto de auth con los nuevos datos
        await refreshMe();
        
        fireMascotCue({ mood: 'clap', msg: '¡Perfil actualizado localmente! 🎉 Se sincronizará cuando el servidor esté disponible.', ms: 4000 });
      }

      const response = await fetch('http://localhost:8080/api/me/profile', {
        method: 'PUT',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(dataToSend)
      });

      if (response.ok) {
        const updatedProfile: UserProfile = await response.json();
        setProfile(updatedProfile);
        fireMascotCue({ mood: 'clap', msg: '¡Perfil actualizado! 🎉 ¡Tus cambios se guardaron correctamente!', ms: 4000 });
      } else if (response.status === 401) {
        localStorage.removeItem('auth:token');
        nav('/welcome');
        return;
      } else {
        throw new Error('Error al actualizar perfil');
      }
    } catch (error) {
      console.error('Error updating profile:', error);
      fireMascotCue({ mood: 'think', msg: 'No pude guardar los cambios 😕 Verifica tu conexión', ms: 3000 });
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return (
      <main className="mx-auto max-w-screen-sm md:max-w-screen-md lg:max-w-screen-lg px-4 py-6 relative min-h-screen flex items-center justify-center">
        <div className="fixed inset-0 pointer-events-none overflow-hidden -z-10">
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-accent/30 rounded-full blur-3xl animate-pulse" style={{ animationDuration: '3s' }}></div>
        </div>
        <div className="text-center animate-scaleIn">
          <span className="text-6xl mb-4 inline-block animate-bounce" style={{ animationDuration: '1.5s' }}>⚙️</span>
          <p className="text-xl font-semibold text-accent" aria-live="polite">
            Cargando configuración…
          </p>
        </div>
      </main>
    );
  }

  return (
    <main className="mx-auto max-w-screen-sm md:max-w-screen-md lg:max-w-screen-lg px-4 py-6 relative">
      <div className="fixed inset-0 pointer-events-none overflow-hidden -z-10">
        <div className="absolute -top-32 -right-32 w-96 h-96 bg-accent/20 rounded-full blur-3xl animate-pulse" style={{ animationDuration: '6s' }}></div>
        <div className="absolute -bottom-32 -left-32 w-64 h-64 bg-accent/10 rounded-full blur-3xl animate-pulse" style={{ animationDuration: '8s' }}></div>
      </div>

      <header className="flex items-center justify-between gap-3 mb-6 animate-fadeIn">
        <div className="flex items-center gap-3">
          <span className="text-2xl">⚙️</span>
          <h1 className="text-xl md:text-2xl font-bold text-[var(--fg)]">
            Configuración
          </h1>
        </div>
        <button
          className="min-h-[44px] min-w-[44px] px-4 rounded-xl border border-[var(--border)] bg-[var(--card)] hover:bg-[var(--card-elevated)] hover:scale-105 active:scale-100 transition-all duration-300"
          onClick={() => nav('/')}
        >
          ← Volver
        </button>
      </header>

      <section className="rounded-2xl border-2 border-accent/30 bg-gradient-to-br from-card to-card-elevated p-6 shadow-lg animate-scaleIn mb-6">
        <div className="flex items-center gap-4 mb-4">
          <div className="w-16 h-16 rounded-full bg-gradient-to-br from-accent to-accent/70 flex items-center justify-center text-white text-2xl font-bold">
            {profile?.name ? profile.name.charAt(0).toUpperCase() : '👤'}
          </div>
          <div>
            <h2 className="text-xl font-bold text-[var(--fg)]">{profile?.name || 'Usuario'}</h2>
            <p className="text-sm text-[var(--fg-muted)]">{profile?.email || 'usuario@example.com'}</p>
            {profile?.createdAt && (
              <p className="text-xs text-[var(--fg-muted)] mt-1">
                Miembro desde {new Date(profile.createdAt).toLocaleDateString('es-ES', { 
                  year: 'numeric', 
                  month: 'long', 
                  day: 'numeric' 
                })}
              </p>
            )}
          </div>
        </div>
      </section>

      <section className="rounded-2xl border-2 border-accent/20 bg-gradient-to-br from-card to-card-elevated p-6 shadow-lg animate-fadeIn" style={{ animationDelay: '0.1s' }}>
        <h2 className="text-lg font-semibold text-[var(--fg)] mb-6 flex items-center gap-2">
          <span>📝</span> Información Personal
        </h2>

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Campos básicos */}
          <div className="space-y-2">
            <label htmlFor="name" className="block text-sm font-medium text-[var(--fg)]">
              Nombre completo *
            </label>
            <input
              type="text"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleInputChange}
              className={`w-full px-4 py-3 rounded-xl border-2 bg-[var(--card)] text-[var(--fg)] focus:outline-none transition-colors duration-300 ${
                errors.name ? 'border-red-500 focus:border-red-500' : 'border-[var(--border)] focus:border-accent'
              }`}
              placeholder="Ingresa tu nombre completo"
            />
            {errors.name && (
              <p className="text-red-500 text-sm flex items-center gap-1">
                <span>⚠️</span> {errors.name}
              </p>
            )}
          </div>

          <div className="space-y-2">
            <label htmlFor="email" className="block text-sm font-medium text-[var(--fg)]">
              Correo electrónico *
            </label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleInputChange}
              className={`w-full px-4 py-3 rounded-xl border-2 bg-[var(--card)] text-[var(--fg)] focus:outline-none transition-colors duration-300 ${
                errors.email ? 'border-red-500 focus:border-red-500' : 'border-[var(--border)] focus:border-accent'
              }`}
              placeholder="tu@email.com"
            />
            {errors.email && (
              <p className="text-red-500 text-sm flex items-center gap-1">
                <span>⚠️</span> {errors.email}
              </p>
            )}
          </div>

          <div className="space-y-2">
            <label htmlFor="phone" className="block text-sm font-medium text-[var(--fg)]">
              Teléfono (opcional)
            </label>
            <input
              type="tel"
              id="phone"
              name="phone"
              value={formData.phone}
              onChange={handleInputChange}
              className={`w-full px-4 py-3 rounded-xl border-2 bg-[var(--card)] text-[var(--fg)] focus:outline-none transition-colors duration-300 ${
                errors.phone ? 'border-red-500 focus:border-red-500' : 'border-[var(--border)] focus:border-accent'
              }`}
              placeholder="+1 234 567 8900"
            />
            {errors.phone && (
              <p className="text-red-500 text-sm flex items-center gap-1">
                <span>⚠️</span> {errors.phone}
              </p>
            )}
          </div>

          {/* Sección avanzada con toggle */}
          <div className="border-t border-[var(--border)] pt-6">
            <button
              type="button"
              onClick={() => setShowAdvanced(!showAdvanced)}
              className="flex items-center gap-2 text-[var(--accent)] hover:text-[var(--accent)]/80 transition-colors duration-200 mb-4"
            >
              <span className={`transform transition-transform duration-200 ${
                showAdvanced ? 'rotate-90' : ''
              }`}>▶</span>
              Información adicional (opcional)
            </button>
            
            <div className={`space-y-6 transition-all duration-300 overflow-hidden ${
              showAdvanced ? 'max-h-[2000px] opacity-100' : 'max-h-0 opacity-0'
            }`}>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <label htmlFor="dateOfBirth" className="block text-sm font-medium text-[var(--fg)]">
                    Fecha de nacimiento
                  </label>
                  <input
                    type="date"
                    id="dateOfBirth"
                    name="dateOfBirth"
                    value={formData.dateOfBirth}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 rounded-xl border-2 border-[var(--border)] bg-[var(--card)] text-[var(--fg)] focus:border-accent focus:outline-none transition-colors duration-300"
                  />
                </div>

                <div className="space-y-2">
                  <label htmlFor="fitnessGoals" className="block text-sm font-medium text-[var(--fg)]">
                    Objetivo de fitness
                  </label>
                  <select
                    id="fitnessGoals"
                    name="fitnessGoals"
                    value={formData.fitnessGoals}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 rounded-xl border-2 border-[var(--border)] bg-[var(--card)] text-[var(--fg)] focus:border-accent focus:outline-none transition-colors duration-300"
                  >
                    {fitnessGoals.map(goal => (
                      <option key={goal.value} value={goal.value}>
                        {goal.label}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <label htmlFor="height" className="block text-sm font-medium text-[var(--fg)]">
                    Altura (cm)
                  </label>
                  <input
                    type="number"
                    id="height"
                    name="height"
                    value={formData.height}
                    onChange={handleInputChange}
                    className={`w-full px-4 py-3 rounded-xl border-2 bg-[var(--card)] text-[var(--fg)] focus:outline-none transition-colors duration-300 ${
                      errors.height ? 'border-red-500 focus:border-red-500' : 'border-[var(--border)] focus:border-accent'
                    }`}
                    placeholder="175"
                    min="1"
                    max="300"
                  />
                  {errors.height && (
                    <p className="text-red-500 text-sm flex items-center gap-1">
                      <span>⚠️</span> {errors.height}
                    </p>
                  )}
                </div>

                <div className="space-y-2">
                  <label htmlFor="weight" className="block text-sm font-medium text-[var(--fg)]">
                    Peso (kg)
                  </label>
                  <input
                    type="number"
                    id="weight"
                    name="weight"
                    value={formData.weight}
                    onChange={handleInputChange}
                    className={`w-full px-4 py-3 rounded-xl border-2 bg-[var(--card)] text-[var(--fg)] focus:outline-none transition-colors duration-300 ${
                      errors.weight ? 'border-red-500 focus:border-red-500' : 'border-[var(--border)] focus:border-accent'
                    }`}
                    placeholder="70"
                    min="1"
                    max="500"
                    step="0.1"
                  />
                  {errors.weight && (
                    <p className="text-red-500 text-sm flex items-center gap-1">
                      <span>⚠️</span> {errors.weight}
                    </p>
                  )}
                </div>
              </div>

              <div className="space-y-2">
                <label htmlFor="healthConditions" className="block text-sm font-medium text-[var(--fg)]">
                  Condiciones de salud o limitaciones
                </label>
                <textarea
                  id="healthConditions"
                  name="healthConditions"
                  value={formData.healthConditions}
                  onChange={handleInputChange}
                  rows={3}
                  className="w-full px-4 py-3 rounded-xl border-2 border-[var(--border)] bg-[var(--card)] text-[var(--fg)] focus:border-accent focus:outline-none transition-colors duration-300 resize-none"
                  placeholder="Describe cualquier condición médica, lesiones o limitaciones que debamos considerar..."
                />
              </div>
            </div>
          </div>

          <div className="space-y-2">
            <label htmlFor="fitnessLevel" className="block text-sm font-medium text-[var(--fg)]">
              Nivel de condición física *
            </label>
            <select
              id="fitnessLevel"
              name="fitnessLevel"
              value={formData.fitnessLevel}
              onChange={handleInputChange}
              className="w-full px-4 py-3 rounded-xl border-2 border-[var(--border)] bg-[var(--card)] text-[var(--fg)] focus:border-accent focus:outline-none transition-colors duration-300"
              required
            >
              {fitnessLevels.map(level => (
                <option key={level.value} value={level.value}>
                  {level.label}
                </option>
              ))}
            </select>
          </div>

          <div className="space-y-2">
            <label htmlFor="preferredLocation" className="block text-sm font-medium text-[var(--fg)]">
              Ubicación preferida para entrenar *
            </label>
            <select
              id="preferredLocation"
              name="preferredLocation"
              value={formData.preferredLocation}
              onChange={handleInputChange}
              className="w-full px-4 py-3 rounded-xl border-2 border-[var(--border)] bg-[var(--card)] text-[var(--fg)] focus:border-accent focus:outline-none transition-colors duration-300"
              required
            >
              {locations.map(location => (
                <option key={location.value} value={location.value}>
                  {location.label}
                </option>
              ))}
            </select>
          </div>

          <div className="flex flex-wrap gap-3 pt-4">
            <button
              type="submit"
              disabled={saving}
              className="flex-1 min-h-[44px] px-6 py-3 rounded-xl bg-[var(--accent)] text-[var(--bg)] font-bold shadow-lg hover:shadow-xl hover:scale-105 active:scale-100 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {saving ? (
                <span className="flex items-center justify-center gap-2">
                  <span className="animate-spin">⏳</span>
                  Guardando...
                </span>
              ) : (
                <span className="flex items-center justify-center gap-2">
                  💾 Guardar cambios
                </span>
              )}
            </button>
            
            <button
              type="button"
              onClick={() => {
                if (profile) {
                  setFormData({
                    name: profile.name || '',
                    email: profile.email || '',
                    phone: profile.phone || '',
                    dateOfBirth: profile.dateOfBirth || '',
                    height: profile.height?.toString() || '',
                    weight: profile.weight?.toString() || '',
                    fitnessLevel: profile.fitnessLevel || '',
                    preferredLocation: profile.preferredLocation || '',
                    healthConditions: profile.healthConditions || '',
                    fitnessGoals: profile.fitnessGoals || ''
                  });
                }
                setErrors({});
                fireMascotCue({ mood: 'ok', msg: 'Cambios descartados 🔄', ms: 2000 });
              }}
              className="px-6 py-3 rounded-xl border border-[var(--border)] bg-[var(--card)] text-[var(--fg)] font-semibold hover:bg-[var(--card-elevated)] hover:scale-105 active:scale-100 transition-all duration-300"
            >
              🔄 Descartar cambios
            </button>
          </div>
        </form>
      </section>

      <section className="mt-6 rounded-2xl border-2 border-accent/10 bg-gradient-to-br from-card to-card-elevated p-6 shadow-lg animate-fadeIn" style={{ animationDelay: '0.2s' }}>
        <h2 className="text-lg font-semibold text-[var(--fg)] mb-4 flex items-center gap-2">
          <span>🔧</span> Configuraciones adicionales
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm text-[var(--fg-muted)]">
          <div className="flex items-center gap-2">
            <span>🔔</span> Notificaciones (Próximamente)
          </div>
          <div className="flex items-center gap-2">
            <span>🌙</span> Modo oscuro (Próximamente)
          </div>
          <div className="flex items-center gap-2">
            <span>🎯</span> Objetivos personalizados (Próximamente)
          </div>
          <div className="flex items-center gap-2">
            <span>🔒</span> Privacidad (Próximamente)
          </div>
        </div>
      </section>
    </main>
  );
};

export default UserSettings;