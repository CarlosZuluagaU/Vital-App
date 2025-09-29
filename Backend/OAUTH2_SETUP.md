# OAuth2 Authentication Guide - VitalApp

## 📋 Configuración OAuth2

VitalApp soporta autenticación OAuth2 con **Google** y **Facebook**, además del login tradicional local.

### 🔧 Variables de Entorno Requeridas

Para que OAuth2 funcione, debes configurar estas variables de entorno:

```bash
# Google OAuth2
GOOGLE_CLIENT_ID=tu-google-client-id-aqui
GOOGLE_CLIENT_SECRET=tu-google-client-secret-aqui

# Facebook OAuth2
FACEBOOK_CLIENT_ID=tu-facebook-app-id-aqui
FACEBOOK_CLIENT_SECRET=tu-facebook-app-secret-aqui
```

### 🌐 URLs de Configuración OAuth2

#### Para Google OAuth2:
- **URL de Autorización**: `http://localhost:8080/oauth2/authorization/google`
- **Redirect URI**: `http://localhost:8080/login/oauth2/code/google`

#### Para Facebook OAuth2:
- **URL de Autorización**: `http://localhost:8080/oauth2/authorization/facebook`
- **Redirect URI**: `http://localhost:8080/login/oauth2/code/facebook`

### 🔗 URLs de Prueba

#### 1. Iniciar autenticación con Google
```
GET http://localhost:8080/oauth2/authorization/google
```

#### 2. Iniciar autenticación con Facebook
```
GET http://localhost:8080/oauth2/authorization/facebook
```

### 📱 Configuración en Google Cloud Console

1. Ve a [Google Cloud Console](https://console.cloud.google.com/)
2. Crea un nuevo proyecto o selecciona uno existente
3. Habilita la "Google+ API" o "Google Identity API"
4. Ve a "Credentials" → "Create Credentials" → "OAuth 2.0 Client ID"
5. Configura las URLs:
   - **Authorized JavaScript origins**: `http://localhost:8080`
   - **Authorized redirect URIs**: `http://localhost:8080/login/oauth2/code/google`

### 📘 Configuración en Facebook Developers

1. Ve a [Facebook Developers](https://developers.facebook.com/)
2. Crea una nueva app o selecciona una existente
3. Agrega "Facebook Login" como producto
4. Configura las URLs:
   - **Valid OAuth Redirect URIs**: `http://localhost:8080/login/oauth2/code/facebook`
   - **App Domains**: `localhost`

### 🧪 Cómo Probar OAuth2

#### Opción 1: Usando el navegador web
```
1. Abre tu navegador
2. Ve a: http://localhost:8080/oauth2/authorization/google
3. Serás redirigido a Google para autenticarte
4. Después de autenticarte, serás redirigido de vuelta con un JWT token
```

#### Opción 2: Usando curl (simulación)
```bash
# Esto te dará la URL de redirección de Google
curl -v "http://localhost:8080/oauth2/authorization/google"
```

### 🔄 Flujo de Autenticación OAuth2

1. **Usuario clickea "Iniciar sesión con Google/Facebook"**
2. **Aplicación redirige** → `http://localhost:8080/oauth2/authorization/{provider}`
3. **Spring Security redirige** → URL de autorización del proveedor (Google/Facebook)
4. **Usuario autentica** → en el sitio del proveedor
5. **Proveedor redirige** → `http://localhost:8080/login/oauth2/code/{provider}`
6. **OAuth2AuthenticationSuccessHandler** → procesa la respuesta
7. **Genera JWT token** → y redirige al frontend con el token

### 📋 Respuesta Exitosa

Después de una autenticación exitosa, el usuario será redirigido a:
```
http://localhost:3000/oauth2/redirect?token=eyJhbGciOiJIUzUxMiJ9...
```

### 🚨 Resolución de Problemas

#### Error: "redirect_uri_mismatch"
- Verifica que las URLs de redirect estén exactamente configuradas en Google/Facebook

#### Error: "unauthorized_client"
- Verifica que el Client ID y Client Secret estén correctos
- Asegúrate de que las variables de entorno estén configuradas

#### Error: "invalid_request"
- Verifica que la aplicación OAuth2 esté publicada y no en modo desarrollo

### 📊 Verificación de Usuario OAuth2

Después de autenticarse, puedes verificar el usuario:

```bash
curl -H "Authorization: Bearer TU_JWT_TOKEN" http://localhost:8080/api/auth/me
```

Respuesta esperada:
```json
{
  "success": true,
  "message": "Usuario obtenido exitosamente",
  "data": {
    "id": 1,
    "username": "usuario_google_123",
    "name": "Juan Pérez",
    "email": "juan@gmail.com",
    "provider": "GOOGLE",
    "createdAt": "2025-09-28T13:45:00",
    "subscription": {
      "isPremium": false,
      "planName": "Básico",
      "status": "ACTIVE"
    }
  }
}
```

### 🔐 Características de Seguridad

- **Creación automática de usuarios**: Si es la primera vez que se autentica
- **Vinculación de cuentas**: Si el email ya existe, se vincula con el proveedor OAuth2
- **Generación automática de username**: Si hay conflictos
- **Suscripción básica automática**: Se asigna plan básico por defecto
- **JWT compatible**: Misma estructura de token que el login local

### ✅ Lista de Verificación

- [ ] Variables de entorno configuradas
- [ ] Google OAuth2 App creada y configurada
- [ ] Facebook OAuth2 App creada y configurada
- [ ] Servidor iniciado en puerto 8080
- [ ] URLs de redirect correctamente configuradas
- [ ] Frontend preparado para recibir el token

¡OAuth2 está listo para funcionar! 🎉