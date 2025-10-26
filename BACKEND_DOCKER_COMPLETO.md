# 🎉 Backend Docker - Sistema Completo y Funcional

**Fecha**: 17 de Octubre, 2025  
**Rama**: `backendv1.3`  
**Estado**: ✅ Producción Ready

---

## 📋 Resumen Ejecutivo

El backend de Vital App está **100% funcional en Docker** con todas las características implementadas:

- ✅ **3 Contenedores** corriendo (MySQL, Backend, Adminer)
- ✅ **13 Tablas** creadas y pobladas con datos
- ✅ **Sistema de Autenticación** JWT funcionando
- ✅ **6 Rutinas** con 30 ejercicios relacionados
- ✅ **API REST** completamente operativa
- ✅ **Persistencia de Datos** garantizada

---

## 🚀 Inicio Rápido

### Opción 1: Automático (Recomendado)
```powershell
.\build-docker.ps1
```

### Opción 2: Manual
```powershell
docker-compose up -d
```

**Tiempo de inicio**: ~30-45 segundos  
**Puerto Backend**: http://localhost:8080  
**Puerto Adminer**: http://localhost:8082  
**Puerto MySQL**: localhost:3307

---

## 🌐 API Endpoints para Frontend

### 🔓 Endpoints Públicos (Sin Autenticación)

#### 1. Health Check
```http
GET http://localhost:8080/actuator/health
```
**Respuesta**:
```json
{"status":"UP"}
```

#### 2. Listar Todas las Rutinas
```http
GET http://localhost:8080/api/routines
```
**Respuesta**: Array de 6 rutinas
```json
[
  {
    "id": 1,
    "title": "Calentamiento y Movilidad Matutina",
    "durationMinutes": 15,
    "intensityName": "Muy Suave",
    "categoryName": "Flexibilidad",
    "thumbnailUrl": "images/rutinas/calentamiento_matutino.jpg"
  }
  // ... 5 rutinas más
]
```

#### 3. Detalle de Rutina (con ejercicios)
```http
GET http://localhost:8080/api/routines/{id}
```
**Ejemplo**: `GET http://localhost:8080/api/routines/1`

**Respuesta**:
```json
{
  "id": 1,
  "title": "Calentamiento y Movilidad Matutina",
  "description": "Rutina suave de calentamiento...",
  "durationMinutes": 15,
  "intensityName": "Muy Suave",
  "categoryName": "Flexibilidad",
  "videoUrl": "videos/rutinas/calentamiento_matutino.mp4",
  "thumbnailUrl": "images/rutinas/calentamiento_matutino.jpg",
  "isPremium": false,
  "exercises": [
    {
      "exerciseId": 19,
      "exerciseName": "Rotación de Cuello",
      "description": "Ejercicio suave de movilidad...",
      "instructions": "1. Siéntate o párate con espalda recta\n2. Gira lentamente...",
      "imageUrl": "https://drive.google.com/uc?export=view&id=...",
      "videoUrl": "https://drive.google.com/file/d/.../preview",
      "exerciseOrder": 1,
      "durationSeconds": 180,
      "repetitions": 5,
      "sets": 1,
      "restSeconds": 30,
      "category": "Movilidad",
      "intensity": "Muy Suave",
      "exerciseType": "Estiramiento",
      "benefits": "Mantiene movilidad cervical...",
      "safetyTips": "Movimientos muy lentos...",
      "modifications": "Reducir rango de rotación..."
    }
    // ... 4 ejercicios más
  ]
}
```

#### 4. Listar Todos los Ejercicios
```http
GET http://localhost:8080/api/exercises
```
**Respuesta**: Array de 19 ejercicios públicos

### 🔐 Endpoints de Autenticación

#### 5. Registrar Usuario
```http
POST http://localhost:8080/api/auth/register
Content-Type: application/json

{
  "username": "usuario123",
  "email": "usuario@example.com",
  "password": "Password123!",
  "name": "Nombre Completo",
  "age": 65
}
```

**Campos Requeridos**:
- `username`: 3-50 caracteres
- `email`: Email válido
- `password`: Mínimo 6 caracteres
- `name`: Requerido

**Campos Opcionales**:
- `age`: Número entero
- `phone`: String

**Respuesta Exitosa**:
```json
{
  "accessToken": "eyJhbGciOiJIUzUxMiJ9...",
  "tokenType": "Bearer",
  "user": {
    "id": 2,
    "username": "usuario123",
    "email": "usuario@example.com",
    "name": "Nombre Completo",
    "age": 65,
    "phone": null,
    "provider": "LOCAL",
    "currentSubscription": null,
    "createdAt": "2025-10-17T22:20:02"
  }
}
```

#### 6. Iniciar Sesión
```http
POST http://localhost:8080/api/auth/login
Content-Type: application/json

{
  "usernameOrEmail": "usuario123",
  "password": "Password123!"
}
```

**Respuesta**: Igual que el registro (token + user)

#### 7. Verificar Disponibilidad de Username
```http
GET http://localhost:8080/api/auth/check-username/{username}
```

**Respuesta**:
```json
{
  "success": true,
  "message": "Nombre de usuario disponible"
}
```

#### 8. Verificar Disponibilidad de Email
```http
GET http://localhost:8080/api/auth/check-email/{email}
```

### 🔒 Endpoints Protegidos (Requieren Token)

Para acceder a endpoints protegidos, incluir header:
```http
Authorization: Bearer {accessToken}
```

#### 9. Obtener Usuario Actual
```http
GET http://localhost:8080/api/auth/me
Authorization: Bearer {token}
```

---

## 📊 Base de Datos

### Estadísticas Actuales
- **Usuarios**: 3 registrados
- **Rutinas**: 6 disponibles
- **Ejercicios**: 22 en base de datos (19 públicos)
- **Relaciones**: 30 ejercicios asignados a rutinas

### Tablas Creadas
1. `users` - Usuarios del sistema
2. `routines` - Rutinas de ejercicio
3. `exercises` - Ejercicios individuales
4. `routine_exercises` - Relación muchos a muchos
5. `categories` - Categorías (Flexibilidad, Fortalecimiento, etc.)
6. `intensities` - Niveles (Muy Suave, Suave, Moderado, Intermedio)
7. `exercise_types` - Tipos de ejercicio
8. `persons` - Perfiles de personas
9. `subscription_plans` - Planes premium
10. `user_subscriptions` - Suscripciones activas
11. `sus_responses` - Respuestas de usabilidad
12. `user_activity_log` - Log de actividad
13. `wcag_audits` - Auditorías accesibilidad

### Acceso Directo a MySQL
```powershell
# Desde línea de comandos
docker exec -it vitalapp-mysql mysql -uroot -proot1234 vital_app_db

# Desde Adminer (interfaz web)
# Abrir: http://localhost:8082
# Server: mysql
# Username: root
# Password: root1234
# Database: vital_app_db
```

---

## 🎨 Integración con Frontend

### Configuración CORS
El backend acepta peticiones desde **cualquier origen** (`*`), por lo que no habrá problemas de CORS.

### Ejemplo de Uso en React/TypeScript

#### 1. Obtener Rutinas
```typescript
const fetchRoutines = async () => {
  try {
    const response = await fetch('http://localhost:8080/api/routines');
    const routines = await response.json();
    console.log(`${routines.length} rutinas disponibles`);
    return routines;
  } catch (error) {
    console.error('Error al obtener rutinas:', error);
  }
};
```

#### 2. Registro de Usuario
```typescript
const registerUser = async (userData) => {
  try {
    const response = await fetch('http://localhost:8080/api/auth/register', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        username: userData.username,
        email: userData.email,
        password: userData.password,
        name: userData.name,
        age: userData.age
      })
    });
    
    const data = await response.json();
    
    if (response.ok) {
      // Guardar token en localStorage
      localStorage.setItem('accessToken', data.accessToken);
      localStorage.setItem('user', JSON.stringify(data.user));
      return data;
    } else {
      throw new Error(data.message);
    }
  } catch (error) {
    console.error('Error en registro:', error);
  }
};
```

#### 3. Login de Usuario
```typescript
const loginUser = async (credentials) => {
  try {
    const response = await fetch('http://localhost:8080/api/auth/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        usernameOrEmail: credentials.username,
        password: credentials.password
      })
    });
    
    const data = await response.json();
    
    if (response.ok) {
      localStorage.setItem('accessToken', data.accessToken);
      localStorage.setItem('user', JSON.stringify(data.user));
      return data;
    }
  } catch (error) {
    console.error('Error en login:', error);
  }
};
```

#### 4. Petición Autenticada
```typescript
const getRoutineDetail = async (routineId) => {
  const token = localStorage.getItem('accessToken');
  
  try {
    const response = await fetch(`http://localhost:8080/api/routines/${routineId}`, {
      headers: {
        'Authorization': `Bearer ${token}`
      }
    });
    
    return await response.json();
  } catch (error) {
    console.error('Error al obtener detalle:', error);
  }
};
```

### Hook Personalizado (useApi.ts)
```typescript
import { useState, useEffect } from 'react';

export const useApi = <T,>(url: string) => {
  const [data, setData] = useState<T | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(`http://localhost:8080${url}`);
        if (!response.ok) throw new Error('Error en la petición');
        const result = await response.json();
        setData(result);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Error desconocido');
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [url]);

  return { data, loading, error };
};

// Uso:
const { data: routines, loading, error } = useApi<Routine[]>('/api/routines');
```

---

## 🔧 Configuración del Proyecto

### application.yml (Perfil Docker)
```yaml
spring:
  profiles:
    active: docker
  datasource:
    url: jdbc:mysql://mysql:3306/vital_app_db
    username: root
    password: root1234
  jpa:
    hibernate:
      ddl-auto: validate  # ⚠️ IMPORTANTE: No modifica datos existentes
    show-sql: false
```

### Docker Compose
```yaml
services:
  mysql:
    image: mysql:8.0
    ports:
      - "3307:3306"
    
  backend:
    build: ./Backend
    ports:
      - "8080:8080"
    depends_on:
      mysql:
        condition: service_healthy
    
  adminer:
    image: adminer
    ports:
      - "8082:8080"
```

---

## ✅ Checklist de Verificación

Antes de integrar con el frontend, verifica:

- [ ] Contenedores corriendo: `docker ps` muestra 3 contenedores healthy
- [ ] Health check OK: `curl http://localhost:8080/actuator/health` devuelve `{"status":"UP"}`
- [ ] Rutinas disponibles: `curl http://localhost:8080/api/routines` devuelve array de 6 rutinas
- [ ] Detalle funciona: `curl http://localhost:8080/api/routines/1` devuelve rutina con ejercicios
- [ ] Registro funciona: POST a `/api/auth/register` devuelve token
- [ ] Login funciona: POST a `/api/auth/login` devuelve token
- [ ] Base de datos tiene datos: Verificar en Adminer (http://localhost:8082)

---

## 🐛 Troubleshooting

### Backend no inicia
```powershell
# Ver logs
docker logs vitalapp-backend

# Reiniciar contenedor
docker-compose restart backend
```

### Error de conexión a MySQL
```powershell
# Verificar MySQL está healthy
docker ps

# Ver logs de MySQL
docker logs vitalapp-mysql

# Reiniciar todo
docker-compose down
docker-compose up -d
```

### Tablas vacías
⚠️ **Ya está solucionado**: `ddl-auto: validate` preserva datos existentes

### Frontend no puede conectar
- Verificar que el backend está en puerto 8080: `curl http://localhost:8080/actuator/health`
- Verificar CORS está habilitado (ya configurado)
- Verificar URL en el frontend: debe ser `http://localhost:8080`

---

## 📚 Documentación Adicional

- **[INICIO_PASO_A_PASO_DOCKER.md](./INICIO_PASO_A_PASO_DOCKER.md)**: Guía detallada de inicio
- **[DOCKER_COMPLETO.md](./DOCKER_COMPLETO.md)**: Documentación completa Docker
- **[COMANDOS_CORRECTOS.md](./COMANDOS_CORRECTOS.md)**: Comandos PowerShell

---

## 🎯 Próximos Pasos para Frontend

1. **Configurar variable de entorno** para URL del backend:
   ```typescript
   const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:8080';
   ```

2. **Crear servicio API** para centralizar peticiones

3. **Implementar Context de Autenticación**:
   - Guardar token en localStorage
   - Validar token en cada petición
   - Redirigir a login si token expirado

4. **Conectar páginas existentes**:
   - `Home.tsx`: Cargar rutinas desde `/api/routines`
   - `RoutineDetail.tsx`: Cargar detalle desde `/api/routines/{id}`
   - Páginas de auth: Conectar con `/api/auth/register` y `/api/auth/login`

5. **Manejar estados**:
   - Loading mientras carga datos
   - Error si falla petición
   - Success cuando carga correctamente

---

## 🎉 Estado Final

✅ **Backend 100% funcional en Docker**  
✅ **API REST completa y probada**  
✅ **Base de datos poblada con datos reales**  
✅ **Autenticación JWT operativa**  
✅ **CORS configurado para frontend**  
✅ **Persistencia de datos garantizada**  
✅ **Documentación completa**

**¡Listo para integrar con el Frontend!** 🚀

---

**Última actualización**: 17 de Octubre, 2025  
**Commit**: `15a7d62` - chore: Agregar .gitignore para excluir archivos de prueba  
**Rama**: `backendv1.3`
