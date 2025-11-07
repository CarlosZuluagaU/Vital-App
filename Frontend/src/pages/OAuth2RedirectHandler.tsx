import { useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/Auth';
import { setAuthToken } from '../hooks/useApi';

const OAuth2RedirectHandler = () => {
  const navigate = useNavigate();
  const { refreshMe } = useAuth();
  const hasProcessed = useRef(false); // Evitar procesamiento duplicado

  useEffect(() => {
    // Si ya se procesó, no hacer nada
    if (hasProcessed.current) {
      console.log('OAuth2 Redirect - Ya procesado anteriormente, saltando...');
      return;
    }

    const handleOAuth2Redirect = async () => {
      try {
        // Obtener parámetros de la URL
        const urlParams = new URLSearchParams(window.location.search);
        const token = urlParams.get('token');
        const error = urlParams.get('error');

        console.log('OAuth2 Redirect - URL completa:', window.location.href);
        console.log('OAuth2 Redirect - Token recibido:', token ? 'SÍ (length: ' + token.length + ')' : 'NO');
        console.log('OAuth2 Redirect - Error recibido:', error || 'ninguno');

        if (error) {
          console.error('OAuth2 Error:', error);
          alert('Error al iniciar sesión con Google: ' + error);
          hasProcessed.current = true;
          navigate('/welcome');
          return;
        }

        if (token) {
          hasProcessed.current = true; // Marcar como procesado ANTES de cualquier operación async
          
          console.log('Guardando token en localStorage...');
          // Guardar el token en localStorage
          setAuthToken(token);
          
          console.log('Obteniendo información del usuario...');
          // Obtener información del usuario
          await refreshMe();
          
          console.log('Usuario autenticado correctamente. Redirigiendo a onboarding...');
          // Redirigir al onboarding para que complete su perfil
          navigate('/onboarding', { replace: true });
        } else {
          console.error('No se recibió token en la redirección OAuth2');
          console.error('URL params:', Object.fromEntries(urlParams.entries()));
          
          // Solo mostrar alert si realmente no hay token y no se ha procesado antes
          if (!hasProcessed.current) {
            hasProcessed.current = true;
            alert('Error: No se recibió el token de autenticación');
            navigate('/welcome');
          }
        }
      } catch (err) {
        console.error('Error procesando redirección OAuth2:', err);
        if (!hasProcessed.current) {
          hasProcessed.current = true;
          alert('Error al procesar la autenticación: ' + (err as Error).message);
          navigate('/welcome');
        }
      }
    };

    handleOAuth2Redirect();
  }, [navigate, refreshMe]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="text-center">
        <div className="inline-block animate-spin rounded-full h-12 w-12 border-4 border-gray-300 border-t-blue-600 mb-4"></div>
        <h2 className="text-xl font-semibold text-gray-700 mb-2">
          Completando inicio de sesión...
        </h2>
        <p className="text-gray-500">
          Por favor espera mientras procesamos tu autenticación con Google.
        </p>
      </div>
    </div>
  );
};

export default OAuth2RedirectHandler;
