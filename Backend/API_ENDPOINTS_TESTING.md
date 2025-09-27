# VitalApp API - Guía de Endpoints para Pruebas

## 🔐 Autenticación

### 1. Registro de Usuario
**POST** `/api/auth/register`

```bash
curl -X POST http://localhost:8080/api/auth/register \
  -H "Content-Type: application/json" \
  -d '{
    "username": "testuser",
    "email": "test@example.com", 
    "password": "123456",
    "name": "Test User",
    "age": 65
  }'
```

**Respuesta Exitosa:**
```json
{
  "success": true,
  "message": "Usuario registrado exitosamente",
  "data": {
    "token": "eyJhbGciOiJIUzUxMiJ9...",
    "user": {
      "id": 1,
      "username": "testuser",
      "name": "Test User",
      "email": "test@example.com",
      "age": 65,
      "provider": "LOCAL",
      "createdAt": "2025-01-27T17:24:02.988857",
      "subscription": {
        "isPremium": false,
        "planName": "Basic",
        "status": "ACTIVE",
        "startDate": "2025-01-27T17:24:03.020128",
        "endDate": "2025-02-26T17:24:03.020128"
      }
    }
  }
}
```

### 2. Inicio de Sesión
**POST** `/api/auth/login`

```bash
curl -X POST http://localhost:8080/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{
    "username": "testuser",
    "password": "123456"
  }'
```

### 3. Obtener Usuario Actual (Requiere JWT)
**GET** `/api/auth/me`

```bash
curl -X GET http://localhost:8080/api/auth/me \
  -H "Authorization: Bearer TU_JWT_TOKEN_AQUI"
```

**Respuesta Exitosa:**
```json
{
  "success": true,
  "message": "Usuario obtenido exitosamente",
  "data": {
    "id": 1,
    "username": "testuser",
    "name": "Test User",
    "email": "test@example.com",
    "age": 65,
    "provider": "LOCAL",
    "createdAt": "2025-01-27T17:24:02.988857",
    "subscription": {
      "isPremium": false,
      "planName": "Basic",
      "status": "ACTIVE",
      "startDate": "2025-01-27T17:24:03.020128",
      "endDate": "2025-02-26T17:24:03.020128"
    }
  }
}
```

## 👤 Gestión de Usuarios

### 4. Obtener Usuario por ID
**GET** `/api/users/{id}`

```bash
curl -X GET http://localhost:8080/api/users/1 \
  -H "Authorization: Bearer TU_JWT_TOKEN_AQUI"
```

### 5. Actualizar Usuario
**PUT** `/api/users/{id}`

```bash
curl -X PUT http://localhost:8080/api/users/1 \
  -H "Authorization: Bearer TU_JWT_TOKEN_AQUI" \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Nuevo Nombre",
    "age": 70,
    "phone": "+1234567890"
  }'
```

### 6. Eliminar Usuario
**DELETE** `/api/users/{id}`

```bash
curl -X DELETE http://localhost:8080/api/users/1 \
  -H "Authorization: Bearer TU_JWT_TOKEN_AQUI"
```

## 📋 Rutinas de Ejercicio

### 7. Listar Todas las Rutinas
**GET** `/api/routines`

```bash
curl -X GET http://localhost:8080/api/routines \
  -H "Authorization: Bearer TU_JWT_TOKEN_AQUI"
```

### 8. Obtener Rutina por ID
**GET** `/api/routines/{id}`

```bash
curl -X GET http://localhost:8080/api/routines/1 \
  -H "Authorization: Bearer TU_JWT_TOKEN_AQUI"
```

### 9. Crear Nueva Rutina (Solo Admin)
**POST** `/api/routines`

```bash
curl -X POST http://localhost:8080/api/routines \
  -H "Authorization: Bearer TU_JWT_TOKEN_AQUI" \
  -H "Content-Type: application/json" \
  -d '{
    "title": "Rutina Matutina para Adultos Mayores",
    "description": "Ejercicios suaves para comenzar el día",
    "durationMinutes": 30,
    "isPremium": false,
    "categoryId": 1,
    "intensityId": 1
  }'
```

### 10. Filtrar Rutinas por Categoría
**GET** `/api/routines?category={categoryName}`

```bash
curl -X GET "http://localhost:8080/api/routines?category=Cardio" \
  -H "Authorization: Bearer TU_JWT_TOKEN_AQUI"
```

### 11. Filtrar Rutinas por Intensidad
**GET** `/api/routines?intensity={intensityName}`

```bash
curl -X GET "http://localhost:8080/api/routines?intensity=Bajo" \
  -H "Authorization: Bearer TU_JWT_TOKEN_AQUI"
```

## 💪 Ejercicios

### 12. Listar Todos los Ejercicios
**GET** `/api/exercises`

```bash
curl -X GET http://localhost:8080/api/exercises \
  -H "Authorization: Bearer TU_JWT_TOKEN_AQUI"
```

### 13. Obtener Ejercicio por ID
**GET** `/api/exercises/{id}`

```bash
curl -X GET http://localhost:8080/api/exercises/1 \
  -H "Authorization: Bearer TU_JWT_TOKEN_AQUI"
```

### 14. Crear Nuevo Ejercicio (Solo Admin)
**POST** `/api/exercises`

```bash
curl -X POST http://localhost:8080/api/exercises \
  -H "Authorization: Bearer TU_JWT_TOKEN_AQUI" \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Caminata en el lugar",
    "description": "Ejercicio de bajo impacto para mejorar la circulación",
    "instructions": "Mantenerse de pie y caminar levantando ligeramente las rodillas",
    "durationSeconds": 300,
    "repetitions": null,
    "sets": null,
    "isPremium": false,
    "categoryId": 1,
    "intensityId": 1,
    "exerciseTypeId": 1
  }'
```

## 💳 Suscripciones

### 15. Obtener Planes de Suscripción
**GET** `/api/subscription-plans`

```bash
curl -X GET http://localhost:8080/api/subscription-plans \
  -H "Authorization: Bearer TU_JWT_TOKEN_AQUI"
```

### 16. Suscribirse a Plan Premium
**POST** `/api/users/{userId}/subscribe/{planId}`

```bash
curl -X POST http://localhost:8080/api/users/1/subscribe/2 \
  -H "Authorization: Bearer TU_JWT_TOKEN_AQUI"
```

### 17. Cancelar Suscripción
**DELETE** `/api/users/{userId}/subscription`

```bash
curl -X DELETE http://localhost:8080/api/users/1/subscription \
  -H "Authorization: Bearer TU_JWT_TOKEN_AQUI"
```

## 📊 Actividad del Usuario

### 18. Registrar Rutina Completada
**POST** `/api/users/{userId}/activities`

```bash
curl -X POST http://localhost:8080/api/users/1/activities \
  -H "Authorization: Bearer TU_JWT_TOKEN_AQUI" \
  -H "Content-Type: application/json" \
  -d '{
    "activityType": "ROUTINE_COMPLETED",
    "relatedEntityId": 1
  }'
```

### 19. Obtener Historial de Actividades
**GET** `/api/users/{userId}/activities`

```bash
curl -X GET http://localhost:8080/api/users/1/activities \
  -H "Authorization: Bearer TU_JWT_TOKEN_AQUI"
```

## 🗂️ Categorías

### 20. Listar Categorías
**GET** `/api/categories`

```bash
curl -X GET http://localhost:8080/api/categories \
  -H "Authorization: Bearer TU_JWT_TOKEN_AQUI"
```

### 21. Crear Categoría (Solo Admin)
**POST** `/api/categories`

```bash
curl -X POST http://localhost:8080/api/categories \
  -H "Authorization: Bearer TU_JWT_TOKEN_AQUI" \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Flexibilidad",
    "description": "Ejercicios para mejorar la flexibilidad y movilidad"
  }'
```

## ⚡ Intensidades

### 22. Listar Intensidades
**GET** `/api/intensities`

```bash
curl -X GET http://localhost:8080/api/intensities \
  -H "Authorization: Bearer TU_JWT_TOKEN_AQUI"
```

### 23. Crear Intensidad (Solo Admin)
**POST** `/api/intensities`

```bash
curl -X POST http://localhost:8080/api/intensities \
  -H "Authorization: Bearer TU_JWT_TOKEN_AQUI" \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Moderado",
    "level": 3
  }'
```

## 🔧 Tipos de Ejercicio

### 24. Listar Tipos de Ejercicio
**GET** `/api/exercise-types`

```bash
curl -X GET http://localhost:8080/api/exercise-types \
  -H "Authorization: Bearer TU_JWT_TOKEN_AQUI"
```

### 25. Crear Tipo de Ejercicio (Solo Admin)
**POST** `/api/exercise-types`

```bash
curl -X POST http://localhost:8080/api/exercise-types \
  -H "Authorization: Bearer TU_JWT_TOKEN_AQUI" \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Yoga Suave",
    "description": "Posturas de yoga adaptadas para adultos mayores",
    "locationType": "HOME"
  }'
```

## 🔒 Notas de Seguridad

### Autenticación JWT
- Todos los endpoints (excepto `/register` y `/login`) requieren el header: `Authorization: Bearer {token}`
- Los tokens JWT expiran en 7 días
- Los tokens contienen el ID del usuario en el campo `sub` (subject)

### Control de Acceso
- **Usuarios Básicos**: Acceso a rutinas y ejercicios gratuitos
- **Usuarios Premium**: Acceso a todo el contenido (incluido contenido premium)
- **Administradores**: Acceso completo + capacidades de gestión

### Códigos de Respuesta HTTP
- `200 OK`: Operación exitosa
- `201 Created`: Recurso creado exitosamente
- `400 Bad Request`: Datos de entrada inválidos
- `401 Unauthorized`: Token JWT faltante o inválido
- `403 Forbidden`: Sin permisos para la operación
- `404 Not Found`: Recurso no encontrado
- `500 Internal Server Error`: Error del servidor

### Formato de Respuesta Estándar
```json
{
  "success": boolean,
  "message": "string",
  "data": object | array | null,
  "timestamp": "ISO-8601 timestamp"
}
```

### Configuración del Servidor
- **Puerto**: 8080
- **Base URL**: `http://localhost:8080`
- **Base de Datos**: H2 en memoria (datos se pierden al reiniciar)
- **Consola H2**: `http://localhost:8080/h2-console` (solo en desarrollo)

---

## 🚀 Ejemplo de Flujo Completo

1. **Registrar usuario** → Obtener JWT token
2. **Usar token** para acceder a endpoints protegidos
3. **Listar rutinas** disponibles
4. **Completar rutina** y registrar actividad
5. **Upgrade a Premium** para acceso completo

¡La autenticación JWT está funcionando correctamente! 🎉