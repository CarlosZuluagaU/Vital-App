# Flujo Completo de Autenticación con Google OAuth2

## 📊 Diagrama de Flujo

```
┌─────────────────────────────────────────────────────────────────────────┐
│                        FLUJO DE LOGIN CON GOOGLE                        │
└─────────────────────────────────────────────────────────────────────────┘

1️⃣  Usuario en Frontend (localhost:5173/welcome)
    │
    │  Clic en "Continuar con Google"
    │
    ▼
    GoogleLoginButton.tsx
    └─> window.location.href = "http://localhost:8080/oauth2/authorization/google"


2️⃣  Backend Spring Security recibe la solicitud
    │
    │  SecurityConfig detecta la URL y activa OAuth2Login
    │
    ▼
    Spring Security redirige automáticamente a:
    └─> https://accounts.google.com/o/oauth2/v2/auth?
        client_id=TU_CLIENT_ID
        &redirect_uri=http://localhost:8080/login/oauth2/code/google
        &response_type=code
        &scope=email+profile


3️⃣  Usuario en Google
    │
    │  Usuario inicia sesión con su cuenta de Google
    │  Google valida credenciales
    │  Usuario acepta permisos (email, profile)
    │
    ▼
    Google redirige de vuelta al backend con un CÓDIGO:
    └─> http://localhost:8080/login/oauth2/code/google?code=CODIGO_TEMPORAL


4️⃣  Backend intercambia código por tokens
    │
    │  Spring Security automáticamente:
    │  - Envía el código a Google
    │  - Recibe access_token e id_token
    │  - Extrae la información del usuario
    │
    ▼
    CustomOAuth2UserService.loadUser() ejecuta:
    └─> Busca usuario por email en BD
        ├─> Si existe: actualiza provider y providerId
        └─> Si NO existe: crea nuevo usuario
            - email: del token de Google
            - name: del token de Google
            - username: generado automáticamente
            - provider: GOOGLE
            - providerId: sub (Google ID)
            - isEnabled: true


5️⃣  OAuth2AuthenticationSuccessHandler ejecuta
    │
    │  Genera JWT token para el usuario
    │  jwtTokenProvider.generateTokenFromUserId(user.getId())
    │
    ▼
    Redirige al frontend con el token:
    └─> http://localhost:5173/oauth2/redirect?token=eyJhbGciOiJIUzUxMiJ9...


6️⃣  Frontend recibe la redirección
    │
    │  Ruta: /oauth2/redirect
    │  Componente: OAuth2RedirectHandler.tsx
    │
    ▼
    OAuth2RedirectHandler ejecuta:
    ├─> Extrae token de URL params
    ├─> setAuthToken(token) → guarda en localStorage
    ├─> refreshMe() → obtiene datos del usuario desde /api/auth/me
    ├─> Limpia la URL
    └─> navigate('/') → redirige a página principal


7️⃣  Usuario autenticado ✅
    │
    │  - Token JWT en localStorage
    │  - Datos de usuario en contexto de Auth
    │  - Puede acceder a rutas protegidas
    │  - Todas las peticiones incluyen: Authorization: Bearer JWT_TOKEN
    │
    └─> Usuario puede usar la aplicación completamente
```

## 🔑 Flujo de Datos

### Información del Usuario de Google → Backend

```json
// Google envía este objeto OAuth2User a CustomOAuth2UserService:
{
  "sub": "1234567890",              // ID único de Google (providerId)
  "name": "Juan Pérez",             // Nombre completo
  "given_name": "Juan",             // Nombre
  "family_name": "Pérez",           // Apellido
  "picture": "https://...",         // URL de foto de perfil
  "email": "juan@gmail.com",        // Email
  "email_verified": true,           // Email verificado por Google
  "locale": "es"                    // Idioma
}
```

### Backend crea UserEntity en BD

```java
UserEntity user = new UserEntity();
user.setEmail("juan@gmail.com");            // de Google
user.setName("Juan Pérez");                 // de Google
user.setUsername("juan");                   // generado automáticamente
user.setProvider(AuthProvider.GOOGLE);      // GOOGLE
user.setProviderId("1234567890");           // sub de Google
user.setIsEnabled(true);
user.setIsAccountNonExpired(true);
user.setIsAccountNonLocked(true);
user.setIsCredentialsNonExpired(true);
// password = null (no se necesita para OAuth2)
```

### Backend genera JWT Token

```java
String jwt = jwtTokenProvider.generateTokenFromUserId(user.getId());

// JWT contiene:
{
  "sub": "123",                    // user.id (ID en nuestra BD)
  "iat": 1698364800,              // timestamp de emisión
  "exp": 1699569600               // timestamp de expiración (7 días)
}
```

### Backend redirige al Frontend

```
http://localhost:5173/oauth2/redirect?token=eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiIxMjMiLCJpYXQiOjE2OTgzNjQ4MDAsImV4cCI6MTY5OTU2OTYwMH0.SIGNATURE
```

### Frontend guarda el token

```typescript
// En localStorage:
localStorage.setItem('auth:token', jwt);

// En todas las peticiones futuras:
headers: {
  'Authorization': 'Bearer eyJhbGciOiJIUzUxMiJ9...'
}
```

## 🛡️ Seguridad

### ¿Por qué es seguro?

1. **Código Temporal**: Google envía un código de un solo uso que expira en segundos
2. **Intercambio Server-to-Server**: El backend intercambia el código por tokens (el frontend nunca ve el código)
3. **JWT Firmado**: El token JWT está firmado con HS512 y solo el backend puede generarlo
4. **HTTPS en Producción**: En producción se usa HTTPS para todas las comunicaciones
5. **Tokens de Corta Duración**: JWT expira en 7 días (configurable)
6. **No hay contraseñas**: El usuario nunca envía su contraseña de Google a nuestra app

### ¿Qué NO hace Google?

- ❌ Google NO nos da la contraseña del usuario
- ❌ Google NO nos da acceso a otros servicios (Gmail, Drive, etc.) sin permisos explícitos
- ✅ Google SOLO nos da email y nombre (scope: email profile)

## 📝 Componentes del Sistema

### Backend (Java/Spring Boot)

| Clase/Archivo | Responsabilidad |
|--------------|-----------------|
| `SecurityConfig.java` | Configuración de Spring Security + OAuth2 |
| `CustomOAuth2UserService.java` | Procesar usuario de Google y crear/actualizar en BD |
| `OAuth2AuthenticationSuccessHandler.java` | Generar JWT y redirigir al frontend |
| `JwtTokenProvider.java` | Generar y validar tokens JWT |
| `application.yml` | Configuración de Google Client ID/Secret |
| `compose.yml` | Variables de entorno para Docker |

### Frontend (React/TypeScript)

| Archivo | Responsabilidad |
|---------|-----------------|
| `GoogleLoginButton.tsx` | Botón de "Continuar con Google" |
| `OAuth2RedirectHandler.tsx` | Recibir token y guardar en localStorage |
| `useApi.ts` | Funciones de autenticación y API |
| `Auth.tsx` | Contexto de autenticación (usuario, token) |
| `routes.tsx` | Definición de rutas (incluye /oauth2/redirect) |
| `Welcome.tsx` | Página de bienvenida con botón de Google |

## 🎯 URLs Importantes

### Desarrollo

| URL | Descripción |
|-----|-------------|
| `http://localhost:5173/welcome` | Página con botón de Google |
| `http://localhost:8080/oauth2/authorization/google` | Inicia flujo OAuth2 |
| `http://localhost:8080/login/oauth2/code/google` | Callback de Google (backend) |
| `http://localhost:5173/oauth2/redirect` | Callback al frontend con JWT |
| `http://localhost:8080/api/auth/me` | Obtener datos del usuario autenticado |

### Producción (cuando despliegues)

| URL | Descripción |
|-----|-------------|
| `https://tu-dominio.com/oauth2/authorization/google` | Inicia flujo OAuth2 |
| `https://tu-dominio.com/login/oauth2/code/google` | Callback de Google |
| `https://tu-dominio.com/oauth2/redirect` | Callback al frontend con JWT |

## 🧪 Cómo Probar

### 1. Verificar Backend Responde

```bash
# Este comando debe redirigir a Google
curl -i http://localhost:8080/oauth2/authorization/google
# Resultado: HTTP 302 Found
# Location: https://accounts.google.com/o/oauth2/v2/auth?...
```

### 2. Ver Logs del Backend

```bash
docker-compose logs -f backend | grep -i oauth
# Deberías ver:
# CustomOAuth2UserService: Loading user from Google
# OAuth2AuthenticationSuccessHandler: Generating JWT for user...
```

### 3. Verificar Usuario en BD

```sql
-- Conectar a MySQL
docker exec -it vitalapp-mysql mysql -uroot -proot1234 vital_app_db

-- Ver usuarios OAuth2
SELECT 
    id, 
    name, 
    email, 
    username, 
    provider, 
    provider_id, 
    is_enabled
FROM users 
WHERE provider = 'GOOGLE';

-- Resultado esperado:
-- +----+-------------+------------------+----------+----------+--------------+------------+
-- | id | name        | email            | username | provider | provider_id  | is_enabled |
-- +----+-------------+------------------+----------+----------+--------------+------------+
-- |  1 | Juan Pérez  | juan@gmail.com   | juan     | GOOGLE   | 1234567890   | 1          |
-- +----+-------------+------------------+----------+----------+--------------+------------+
```

### 4. Verificar Token JWT

```bash
# Copiar el token de localStorage en el navegador (F12 → Application → Local Storage)
# Decodificar en: https://jwt.io

# Estructura del JWT:
# Header:
{
  "alg": "HS512",
  "typ": "JWT"
}

# Payload:
{
  "sub": "1",                    # ID del usuario en BD
  "iat": 1698364800,            # Timestamp de emisión
  "exp": 1699569600             # Timestamp de expiración
}

# Signature:
# (verificado por el backend usando la clave secreta)
```

## 📖 Referencias

- [Spring Security OAuth2 Client](https://docs.spring.io/spring-security/reference/servlet/oauth2/client/index.html)
- [Google OAuth2 API](https://developers.google.com/identity/protocols/oauth2)
- [JWT.io - Debugger](https://jwt.io/)
- [RFC 6749 - OAuth 2.0](https://datatracker.ietf.org/doc/html/rfc6749)
