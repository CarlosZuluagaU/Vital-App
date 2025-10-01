# 🔐 Documentación de Seguridad - VitalApp

## Índice
1. [Arquitectura de Seguridad](#arquitectura-de-seguridad)
2. [Autenticación con Usuario y Contraseña](#autenticación-con-usuario-y-contraseña)
3. [Autenticación OAuth2](#autenticación-oauth2)
4. [Sistema de Tokens JWT](#sistema-de-tokens-jwt)
5. [Control de Acceso por Suscripción](#control-de-acceso-por-suscripción)
6. [Endpoints de Autenticación](#endpoints-de-autenticación)
7. [Ejemplos de Uso](#ejemplos-de-uso)
8. [Configuración](#configuración)

---

## Arquitectura de Seguridad

VitalApp implementa un sistema de seguridad multicapa que incluye:

- **Autenticación tradicional** con usuario/contraseña
- **OAuth2** para Google y Facebook (especialmente útil para adultos mayores)
- **JWT Tokens** para sesiones sin estado
- **Control de acceso basado en suscripciones** (Básico vs Premium)
- **Encriptación de contraseñas** con BCrypt

### Componentes Principales

```
┌─────────────────────────────────────────────────────────────┐
│                    CAPA DE SEGURIDAD                        │
├─────────────────────────────────────────────────────────────┤
│ SecurityConfig.java          │ Configuración principal      │
│ JwtTokenProvider.java        │ Generación y validación JWT  │
│ JwtAuthenticationFilter.java │ Filtro de autenticación      │
│ CustomUserDetailsService.java│ Carga de usuarios            │
│ AuthController.java          │ Endpoints de autenticación   │
└─────────────────────────────────────────────────────────────┘
```

---

## Autenticación con Usuario y Contraseña

### 1. Registro de Usuario

**Endpoint:** `POST /api/auth/register`

**Request Body:**
```json
{
  "username": "usuario123",
  "email": "usuario@ejemplo.com", 
  "password": "miPassword123",
  "name": "Juan Pérez",
  "age": 65,
  "phone": "+573001234567"
}
```

**Response Exitoso:**
```json
{
  "token": "eyJhbGciOiJIUzI1NiJ9...",
  "refreshToken": "eyJhbGciOiJIUzI1NiJ9...",
  "user": {
    "id": 1,
    "username": "usuario123",
    "email": "usuario@ejemplo.com",
    "name": "Juan Pérez",
    "age": 65
  },
  "subscription": {
    "planName": "Básico",
    "isActive": true,
    "endDate": "2025-09-11T00:00:00"
  }
}
```

### 2. Inicio de Sesión

**Endpoint:** `POST /api/auth/login`

**Request Body:**
```json
{
  "username": "usuario123",
  "password": "miPassword123"
}
```

**Response Exitoso:**
```json
{
  "token": "eyJhbGciOiJIUzI1NiJ9...",
  "refreshToken": "eyJhbGciOiJIUzI1NiJ9...",
  "user": {
    "id": 1,
    "username": "usuario123",
    "email": "usuario@ejemplo.com",
    "name": "Juan Pérez",
    "age": 65
  },
  "subscription": {
    "planName": "Básico", 
    "isActive": true,
    "endDate": "2025-09-11T00:00:00"
  }
}
```

### 3. Seguridad de Contraseñas

- **Encriptación:** BCrypt con 10 rounds
- **Validación:** Mínimo 8 caracteres (se puede configurar)
- **Almacenamiento:** Solo hash encriptado en base de datos

```java
// Ejemplo de encriptación
String password = "miPassword123";
String hashedPassword = "$2a$10$92IXUNpkjO0rOQ5byMi.Ye4oKoEa3Ro9llC/.og/at2uheWG/igi.";
```

---

## Autenticación OAuth2

### Proveedores Configurados

1. **Google OAuth2**
2. **Facebook OAuth2**

### Configuración en application.yml

```yaml
spring:
  security:
    oauth2:
      client:
        registration:
          google:
            client-id: ${GOOGLE_CLIENT_ID:your-google-client-id}
            client-secret: ${GOOGLE_CLIENT_SECRET:your-google-client-secret}
            scope: profile, email
            redirect-uri: http://localhost:8080/login/oauth2/code/google
          
          facebook:
            client-id: ${FACEBOOK_CLIENT_ID:your-facebook-client-id}
            client-secret: ${FACEBOOK_CLIENT_SECRET:your-facebook-client-secret}
            scope: email, public_profile
            redirect-uri: http://localhost:8080/login/oauth2/code/facebook
```

### Flujo OAuth2

1. Usuario hace clic en "Iniciar con Google/Facebook"
2. Redirección a proveedor OAuth2
3. Usuario autoriza la aplicación
4. Callback a VitalApp con código de autorización
5. VitalApp intercambia código por token
6. Creación/actualización de usuario en base de datos
7. Generación de JWT token para la aplicación

---

## Sistema de Tokens JWT

### Configuración de JWT

```yaml
app:
  jwtSecret: ${JWT_SECRET:VitalApp2024SecretKeyForJWTTokenGenerationWithHS512AlgorithmRequiresAtLeast512BitsForSecureHashing}
  jwtExpirationInMs: 604800000  # 7 días en milisegundos
```

### Estructura del Token

```
Header:
{
  "alg": "HS256",
  "typ": "JWT"
}

Payload:
{
  "sub": "usuario123",
  "iat": 1694462400,
  "exp": 1695067200,
  "userId": 1,
  "email": "usuario@ejemplo.com"
}
```

### Uso del Token

**En Headers de Request:**
```
Authorization: Bearer eyJhbGciOiJIUzI1NiJ9...
```

### Renovación de Token

**Endpoint:** `POST /api/auth/refresh`

**Request Body:**
```json
{
  "refreshToken": "eyJhbGciOiJIUzI1NiJ9..."
}
```

---

## Control de Acceso por Suscripción

### Planes Disponibles

| Plan    | Precio | Duración | Características |
|---------|--------|----------|-----------------|
| Básico  | $0     | 12 meses | Ejercicios básicos, rutinas limitadas |
| Premium | $29.99 | 1 mes    | Acceso completo, análisis avanzado |

### Control de Acceso

```java
// Ejemplo de verificación en controlador
@PreAuthorize("@subscriptionAccessEvaluator.hasPremiumAccess(authentication)")
@GetMapping("/premium-exercise")
public ResponseEntity<Exercise> getPremiumExercise() {
    // Solo usuarios Premium pueden acceder
}
```

### Endpoints Protegidos

#### Acceso Público
- `POST /api/auth/login`
- `POST /api/auth/register` 
- `GET /actuator/health`
- `GET /h2-console/**` (solo desarrollo)
- `GET /swagger-ui/**` (solo desarrollo)

#### Requiere Plan Básico o Superior
- `GET /api/routines/**`
- `GET /api/exercises/basic/**`
- `POST /api/me/activities/**`

#### Requiere Plan Premium
- `GET /api/exercises/premium/**`
- `GET /api/multicomponent/**`

---

## Endpoints de Autenticación

### AuthController

| Método | Endpoint | Descripción | Autenticación |
|--------|----------|-------------|---------------|
| POST | `/api/auth/register` | Registro de usuario | No |
| POST | `/api/auth/login` | Inicio de sesión | No |
| POST | `/api/auth/refresh` | Renovar token | No |
| GET | `/api/auth/me` | Información del usuario actual | Sí |
| POST | `/api/auth/logout` | Cerrar sesión | Sí |

---

## Ejemplos de Uso

### 1. Registro y Login Completo

```bash
# 1. Registrar usuario
curl -X POST http://localhost:8080/api/auth/register \
  -H "Content-Type: application/json" \
  -d '{
    "username": "maria_gomez",
    "email": "maria@gmail.com",
    "password": "password123",
    "name": "María Gómez",
    "age": 68,
    "phone": "+573001234567"
  }'

# Response: Token JWT + información del usuario

# 2. Usar token para acceder a contenido protegido
curl -X GET http://localhost:8080/api/routines \
  -H "Authorization: Bearer eyJhbGciOiJIUzI1NiJ9..."
```

### 2. Acceso a Contenido Premium

```bash
# Usuario con plan Básico intenta acceder a contenido Premium
curl -X GET http://localhost:8080/api/exercises/premium/advanced \
  -H "Authorization: Bearer [token-usuario-basico]"

# Response: 403 Forbidden
{
  "error": "Acceso denegado",
  "message": "Se requiere suscripción Premium para acceder a este contenido"
}
```

### 3. OAuth2 con Google

```javascript
// Frontend - Iniciar OAuth2
window.location.href = 'http://localhost:8080/oauth2/authorization/google';

// Callback automático después de autorización
// Usuario será redirigido con token JWT
```

---

## Configuración

### Variables de Entorno Requeridas

```bash
# JWT Configuration
JWT_SECRET=VitalApp2024SecretKeyForJWTTokenGenerationWithHS512AlgorithmRequiresAtLeast512BitsForSecureHashing
JWT_EXPIRATION=604800000

# OAuth2 Google
GOOGLE_CLIENT_ID=your-google-client-id
GOOGLE_CLIENT_SECRET=your-google-client-secret

# OAuth2 Facebook  
FACEBOOK_CLIENT_ID=your-facebook-client-id
FACEBOOK_CLIENT_SECRET=your-facebook-client-secret

# Database (Production)
DB_URL=jdbc:mysql://localhost:3306/vitalapp
DB_USERNAME=vitalapp_user
DB_PASSWORD=secure_password
```

### Perfiles de Configuración

#### Desarrollo (application.yml)
```yaml
spring:
  profiles:
    active: dev
  datasource:
    url: jdbc:h2:mem:vitalapp
    username: sa
    password: 
  h2:
    console:
      enabled: true
```

#### Producción (application-prod.yml)
```yaml
spring:
  datasource:
    url: ${DB_URL}
    username: ${DB_USERNAME}
    password: ${DB_PASSWORD}
  h2:
    console:
      enabled: false
```

---

## Usuarios de Prueba

La aplicación incluye usuarios de prueba pre-configurados:

| Usuario | Contraseña | Email | Plan | Edad |
|---------|------------|-------|------|------|
| `admin` | `password123` | admin@vitalapp.com | N/A | 45 |
| `usuario_basico` | `password123` | basico@test.com | Básico | 65 |
| `usuario_premium` | `password123` | premium@test.com | Premium | 70 |

### Ejemplo de Login con Usuario de Prueba

```bash
curl -X POST http://localhost:8080/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{
    "username": "usuario_premium",
    "password": "password123"
  }'
```

---

## Seguridad Adicional

### CORS Configuration
```java
// Configurado para desarrollo local
allowedOrigins: ["http://localhost:3000", "http://127.0.0.1:3000"]
allowedMethods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"]
allowedHeaders: ["Authorization", "Content-Type", "X-Requested-With"]
```

### Rate Limiting (Futuro)
- Implementar limitación de intentos de login
- Protección contra ataques de fuerza bruta
- Throttling de requests por usuario

### Auditoría
- Logs de inicio de sesión
- Tracking de actividades del usuario
- Monitoreo de accesos no autorizados

---

## Troubleshooting

### Problemas Comunes

1. **Token Expirado**
   - Error: `JWT token has expired`
   - Solución: Usar refresh token o hacer login nuevamente

2. **Acceso Denegado**
   - Error: `Access denied - Premium subscription required`
   - Solución: Verificar plan de suscripción del usuario

3. **OAuth2 Falló**
   - Error: `OAuth2 authentication failed`
   - Solución: Verificar configuración de client-id y client-secret

### Logs Útiles

```bash
# Ver logs de seguridad
tail -f logs/security.log

# Debug JWT
logging.level.com.vitalapp.util.JwtTokenProvider=DEBUG
```

---

## Próximas Mejoras

1. **Two-Factor Authentication (2FA)**
2. **Password Reset via Email**
3. **Account Lockout Policy**
4. **Social Login adicional (Apple, Microsoft)**
5. **Biometric Authentication Support**
6. **Session Management Dashboard**

---

*Documentación actualizada: Septiembre 2025*
*Versión del Sistema: 1.0.0*
