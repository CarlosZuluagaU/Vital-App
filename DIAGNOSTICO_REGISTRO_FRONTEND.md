# 🔍 DIAGNÓSTICO: Registro de Usuarios desde Frontend

**Fecha**: 18 de Octubre, 2025  
**Estado**: Backend funciona ✅ | Frontend: Requiere verificación

---

## ✅ BACKEND - FUNCIONANDO CORRECTAMENTE

### Verificación Completa Realizada

1. **Endpoint de Registro**: `POST /api/auth/register` ✅
   - **Estado**: Código HTTP 201 (Created)
   - **Respuesta**: Token JWT + datos de usuario
   
2. **Usuario de Prueba Creado**:
   ```json
   {
     "username": "testfrontend",
     "email": "testfrontend@example.com",
     "password": "Test123!",
     "name": "Test Frontend",
     "age": 30
   }
   ```

3. **Respuesta del Backend**:
   ```json
   {
     "accessToken": "eyJhbGciOiJIUzUxMiJ9...",
     "tokenType": "Bearer",
     "user": {
       "id": 5,
       "username": "testfrontend",
       "email": "testfrontend@example.com",
       "name": "Test Frontend",
       "age": 30,
       "phone": null,
       "provider": "LOCAL",
       "currentSubscription": null,
       "createdAt": "2025-10-18T20:02:13.550439062"
     }
   }
   ```

4. **Usuario Guardado en Base de Datos**: ✅
   ```
   id: 5
   username: testfrontend
   email: testfrontend@example.com
   name: Test Frontend
   age: 30
   created_at: 2025-10-18 20:02:14
   ```

---

## 🔧 FRONTEND - VERIFICACIÓN NECESARIA

### Configuración Actual

1. **API_BASE**: `http://localhost:8080` ✅
2. **Endpoint**: `/api/auth/register` ✅
3. **Método**: `POST` ✅
4. **Headers**: `Content-Type: application/json` ✅

### Código de Registro (useApi.ts)

```typescript
export async function register(payload: any): Promise<UserDTO> {
  // Genera username automáticamente desde name o email
  const username =
    payload.username || payload.name || 
    (payload.email ? payload.email.split("@")[0] : "usuario");

  const res = await fetch(`${API_BASE}/api/auth/register`, {
    method: "POST",
    headers: { 
      "Content-Type": "application/json", 
      "Accept": "application/json" 
    },
    credentials: USE_COOKIES ? "include" : "omit",
    body: JSON.stringify({ ...payload, username }),
  });
  
  if (!res.ok) throw new Error(`HTTP ${res.status} ${res.statusText}`);
  
  const json = await res.json().catch(() => ({}));
  const { token, refreshToken } = extractAuthTokens(json, res);
  const user = extractUser(json);

  if (token) setAuthToken(token);
  if (refreshToken) setRefreshToken(refreshToken);

  if (!user) {
    try { return await getMe(); } catch { return null as any; }
  }
  return user!;
}
```

---

## 🚨 POSIBLES PROBLEMAS Y SOLUCIONES

### Problema 1: Backend No Está Corriendo

**Síntoma**: Error de conexión o timeout

**Solución**:
```powershell
# Verificar estado
docker ps

# Si no está corriendo, iniciar
.\build-docker.ps1
```

### Problema 2: CORS (Cross-Origin Resource Sharing)

**Síntoma**: Error "CORS policy" en consola del navegador

**Solución**: El backend ya tiene CORS habilitado para `*`
```java
@CrossOrigin(origins = "*")
public class AuthController {
```

### Problema 3: Extracción de Token Incorrecta

**Síntoma**: Usuario se crea pero no se guarda el token

**Código Actual**:
```typescript
function extractAuthTokens(resp: AuthResponse, res?: Response) {
  const payload = (resp && typeof resp === "object" && 
                   "success" in resp && "data" in resp) 
    ? (resp as any).data 
    : resp;
    
  const token =
    payload?.token ??
    payload?.accessToken ??  // ✅ Backend usa este
    payload?.jwt ??
    payload?.id_token ??
    payload?.idToken ??
    undefined;
    
  return { token, refreshToken };
}
```

**Estado**: ✅ Debería funcionar correctamente

### Problema 4: Extracción de Usuario Incorrecta

**Código Actual**:
```typescript
function extractUser(resp: AuthResponse): UserDTO | undefined {
  const payload = (resp && typeof resp === "object" && 
                   "success" in resp && "data" in resp) 
    ? (resp as any).data 
    : resp;
    
  return payload?.user;  // ✅ Backend usa este
}
```

**Estado**: ✅ Debería funcionar correctamente

---

## 📋 PASOS DE DEPURACIÓN

### 1. Verificar Backend Está Corriendo

```powershell
# Ver estado de contenedores
docker ps

# Debe mostrar vitalapp-backend corriendo

# Probar endpoint directamente
curl http://localhost:8080/actuator/health
# Debe retornar: {"status":"UP"}
```

### 2. Abrir Consola del Navegador (DevTools)

1. Abrir la aplicación frontend
2. Presionar `F12` para abrir DevTools
3. Ir a pestaña **Console**
4. Ir a pestaña **Network**

### 3. Intentar Registrar Usuario desde Frontend

1. Ir a la página de registro
2. Llenar el formulario:
   - Nombre: "Test Usuario"
   - Email: "test@example.com"
   - Password: "Test123!"
   - Edad: 25
3. Enviar formulario

### 4. Verificar en Network Tab

**Buscar petición a**: `/api/auth/register`

**Verificar**:
- ✅ **Status Code**: Debe ser `201 Created`
- ✅ **Request Headers**: Debe tener `Content-Type: application/json`
- ✅ **Request Payload**: Debe incluir `username`, `email`, `password`, `name`, `age`
- ✅ **Response**: Debe contener `accessToken` y `user`

**Si Status es 400**: Datos inválidos
**Si Status es 409**: Usuario ya existe
**Si Status es 500**: Error en backend (revisar logs)

### 5. Verificar en Console Tab

**Buscar mensajes de debug**:
```
[auth] extractAuthTokens()
[auth] extractUser()
```

**Si no aparecen**: El código está en producción, no en desarrollo

**Si aparecen**: Verificar que:
- `token` no sea `undefined`
- `user` contenga los datos correctos

### 6. Verificar en Application Tab (Storage)

1. Ir a **Application** > **Local Storage** > `http://localhost:xxxx`
2. Buscar key: `token` o `accessToken` o `auth_token`
3. Verificar que contenga un JWT válido (empieza con `eyJ...`)

### 7. Verificar en Base de Datos

```powershell
# Ver usuarios creados en los últimos 5 minutos
docker exec vitalapp-mysql mysql -uroot -proot1234 vital_app_db -e "
  SELECT id, username, email, name, created_at 
  FROM users 
  WHERE created_at > DATE_SUB(NOW(), INTERVAL 5 MINUTE)
  ORDER BY created_at DESC;
" 2>$null
```

**Si el usuario NO aparece**: El problema está en el backend (pero las pruebas muestran que funciona)

**Si el usuario SÍ aparece**: El problema está en el frontend:
- No se está guardando el token
- No se está actualizando el estado de autenticación

---

## 🔍 LOGS EN TIEMPO REAL

### Ver Logs del Backend

```powershell
# Ver logs en tiempo real
docker logs -f vitalapp-backend

# En otra terminal, intentar registrar desde frontend
# Buscar líneas con "auth" o "register"
```

### Buscar Errores Específicos

```powershell
# Ver últimos 50 logs con errores
docker logs --tail 50 vitalapp-backend | Select-String -Pattern "ERROR|Exception"
```

---

## 🧪 PRUEBA MANUAL DEL FLUJO COMPLETO

### 1. Registro desde Terminal (Funciona ✅)

```powershell
@'
{
  "username": "manualtest",
  "email": "manual@test.com",
  "password": "Test123!",
  "name": "Manual Test",
  "age": 35
}
'@ | Out-File -FilePath test-manual.json -Encoding UTF8

curl.exe -X POST http://localhost:8080/api/auth/register `
  -H "Content-Type: application/json" `
  --data "@test-manual.json"
```

### 2. Verificar Usuario en BD

```powershell
docker exec vitalapp-mysql mysql -uroot -proot1234 vital_app_db -e "
  SELECT * FROM users WHERE username='manualtest';
" 2>$null
```

### 3. Login con el Usuario Creado

```powershell
@'
{
  "usernameOrEmail": "manual@test.com",
  "password": "Test123!"
}
'@ | Out-File -FilePath test-login.json -Encoding UTF8

curl.exe -X POST http://localhost:8080/api/auth/login `
  -H "Content-Type: application/json" `
  --data "@test-login.json"
```

---

## ✅ CHECKLIST DE VERIFICACIÓN

- [ ] Backend está corriendo (`docker ps`)
- [ ] Health check responde (`curl http://localhost:8080/actuator/health`)
- [ ] Rutinas están cargadas (`curl http://localhost:8080/api/routines`)
- [ ] Frontend está corriendo (verificar en navegador)
- [ ] Frontend puede conectar al backend (Network tab)
- [ ] Request a `/api/auth/register` retorna 201
- [ ] Response contiene `accessToken` y `user`
- [ ] Token se guarda en LocalStorage
- [ ] Usuario aparece en base de datos MySQL
- [ ] Contexto de Auth se actualiza con el usuario
- [ ] Usuario puede ver rutinas después de registrarse

---

## 🎯 SOLUCIÓN RÁPIDA

Si el backend funciona (✅ verificado) pero el frontend no registra:

### Opción 1: Verificar Variables de Entorno

```bash
# Frontend/.env
VITE_API_BASE=http://localhost:8080
VITE_AUTH_MODE=cookie
```

**Reiniciar frontend** después de cambiar `.env`:
```powershell
# En carpeta Frontend
npm run dev
```

### Opción 2: Verificar Código de Registro

**Archivo**: `Frontend/src/pages/Onboarding/steps/StepOAuth.tsx`

```typescript
// Línea ~56
await register({ name, email, password, age });
```

**Verificar que**:
- `name` no está vacío
- `email` es válido
- `password` tiene al menos 6 caracteres
- `age` es opcional

### Opción 3: Agregar Logs Temporales

**En** `Frontend/src/hooks/useApi.ts`:

```typescript
export async function register(payload: any): Promise<UserDTO> {
  console.log("📤 Enviando registro:", payload);  // AGREGAR
  
  const username = payload.username || payload.name || 
    (payload.email ? payload.email.split("@")[0] : "usuario");
  
  console.log("📤 Username generado:", username);  // AGREGAR
  console.log("📤 Payload completo:", { ...payload, username });  // AGREGAR

  const res = await fetch(`${API_BASE}/api/auth/register`, {
    method: "POST",
    headers: { "Content-Type": "application/json", "Accept": "application/json" },
    credentials: USE_COOKIES ? "include" : "omit",
    body: JSON.stringify({ ...payload, username }),
  });
  
  console.log("📥 Response status:", res.status);  // AGREGAR
  console.log("📥 Response ok:", res.ok);  // AGREGAR
  
  if (!res.ok) throw new Error(`HTTP ${res.status} ${res.statusText}`);
  
  const json = await res.json().catch(() => ({}));
  console.log("📥 Response JSON:", json);  // AGREGAR
  
  const { token, refreshToken } = extractAuthTokens(json, res);
  console.log("🔑 Token extraído:", token);  // AGREGAR
  
  const user = extractUser(json);
  console.log("👤 Usuario extraído:", user);  // AGREGAR

  if (token) setAuthToken(token);
  if (refreshToken) setRefreshToken(refreshToken);

  return user!;
}
```

**Luego**:
1. Abrir consola del navegador (`F12`)
2. Intentar registrar
3. Ver los logs en consola
4. Compartir los logs para diagnóstico

---

## 📞 SIGUIENTE PASO

**Por favor verifica**:

1. ¿Está el frontend corriendo? (abrir en navegador)
2. ¿Qué error exacto aparece en la consola del navegador?
3. ¿Aparece la petición en la pestaña Network?
4. ¿Cuál es el status code de la respuesta?

**Comandos para verificar backend**:
```powershell
# Backend funcionando
docker ps | Select-String "vitalapp"

# Rutinas disponibles
(Invoke-RestMethod http://localhost:8080/api/routines).Count

# Total usuarios
docker exec vitalapp-mysql mysql -uroot -proot1234 vital_app_db -e "SELECT COUNT(*) as total FROM users;" 2>$null
```

---

**Última actualización**: 18 de Octubre, 2025  
**Backend verificado**: ✅ Funcionando correctamente  
**Frontend**: Requiere verificación en consola del navegador
