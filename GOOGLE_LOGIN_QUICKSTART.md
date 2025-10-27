# 🚀 Guía Rápida: Activar Login con Google

## ✅ Cambios Realizados

### Backend (Java/Spring Boot)
1. ✅ **CustomOAuth2UserService.java** - Servicio para procesar usuarios de Google
2. ✅ **SecurityConfig.java** - Configuración de seguridad actualizada con OAuth2
3. ✅ **OAuth2AuthenticationSuccessHandler.java** - Ya existía, maneja redirección exitosa
4. ✅ **application.yml** - URLs de redirección configuradas
5. ✅ **compose.yml** - Variables de entorno para Google OAuth2

### Frontend (React/TypeScript)
1. ✅ **GoogleLoginButton.tsx** - Componente de botón con logo de Google
2. ✅ **OAuth2RedirectHandler.tsx** - Página que recibe el token de Google
3. ✅ **routes.tsx** - Ruta `/oauth2/redirect` agregada
4. ✅ **Welcome.tsx** - Botón de Google agregado a la página de bienvenida
5. ✅ **useApi.ts** - Ya tiene funciones OAuth2 (handleOAuth2Redirect, startGoogleOAuth)

### Archivos de Configuración
1. ✅ **.env.example** - Plantilla para credenciales
2. ✅ **.gitignore** - Ya protege el archivo .env
3. ✅ **GOOGLE_OAUTH2_SETUP.md** - Guía completa paso a paso

## 📝 Pasos para Activar (20 minutos)

### Paso 1: Obtener Credenciales de Google (10 min)

1. Ve a [Google Cloud Console](https://console.cloud.google.com/)
2. Inicia sesión con **vital.app6@gmail.com**
3. Crea un nuevo proyecto "Vital-App-Auth" (o usa uno existente)
4. Habilita la API de Google Identity:
   - Menú → APIs y servicios → Biblioteca
   - Busca "Google+ API" o "Google Identity"
   - Clic en **Habilitar**

5. Configura la pantalla de consentimiento:
   - Menú → APIs y servicios → Pantalla de consentimiento OAuth
   - Tipo: **Externo**
   - Nombre: **Vital App**
   - Correo: **vital.app6@gmail.com**
   - Alcances: `.../auth/userinfo.email` y `.../auth/userinfo.profile`

6. Crea credenciales OAuth 2.0:
   - Menú → APIs y servicios → Credenciales
   - Clic en **+ CREAR CREDENCIALES** → ID de cliente de OAuth 2.0
   - Tipo: **Aplicación web**
   - Nombre: **Vital App Web Client**
   - **Orígenes JavaScript autorizados**:
     ```
     http://localhost:5173
     http://localhost:8080
     ```
   - **URIs de redireccionamiento autorizados**:
     ```
     http://localhost:8080/login/oauth2/code/google
     http://localhost:5173/oauth2/redirect
     ```
   - Clic en **Crear**

7. **GUARDA LAS CREDENCIALES** que aparecen:
   - Client ID: `xxxxx-xxxxx.apps.googleusercontent.com`
   - Client Secret: `GOCSPX-xxxxx`

### Paso 2: Configurar Variables de Entorno (2 min)

**Opción A: PowerShell (Temporal - Solo para esta sesión)**
```powershell
$env:GOOGLE_CLIENT_ID="TU_CLIENT_ID_AQUI"
$env:GOOGLE_CLIENT_SECRET="TU_CLIENT_SECRET_AQUI"
```

**Opción B: Archivo .env (Recomendado)**
```bash
# En la raíz del proyecto (D:\Programacion\Vital-App)
# Copia .env.example a .env:
Copy-Item .env.example .env

# Edita .env con tus credenciales:
# GOOGLE_CLIENT_ID=tu-client-id.apps.googleusercontent.com
# GOOGLE_CLIENT_SECRET=GOCSPX-tu-secret
```

### Paso 3: Reconstruir y Reiniciar Docker (5 min)

```powershell
# 1. Detener contenedores actuales
cd D:\Programacion\Vital-App
docker-compose down

# 2. Reconstruir backend con nuevas configuraciones
docker-compose build backend

# 3. Iniciar todo de nuevo
docker-compose up -d

# 4. Verificar que el backend inició correctamente (espera 30-60 segundos)
docker-compose logs -f backend
# Presiona Ctrl+C cuando veas: "Started VitalappBackendApplication"
```

### Paso 4: Iniciar Frontend (1 min)

```powershell
cd Frontend
npm run dev
# Verás: Local: http://localhost:5173/
```

### Paso 5: Probar el Login con Google (2 min)

1. Abre http://localhost:5173/welcome
2. Clic en **"Continuar con Google"**
3. Inicia sesión con tu cuenta de Google (puede ser cualquier cuenta)
4. Google te redirige a: `http://localhost:5173/oauth2/redirect?token=JWT...`
5. La app guarda el token y te lleva a la página principal
6. ¡Listo! Ya estás autenticado con Google

## 🔍 Verificar que Funciona

### Test 1: Verificar que el backend responde OAuth2
```powershell
# Abre en navegador:
http://localhost:8080/oauth2/authorization/google
# Debería redirigir a Google para login
```

### Test 2: Ver logs del backend
```powershell
docker-compose logs -f backend
# Deberías ver logs como:
# "OAuth2AuthenticationSuccessHandler: Processing user..."
# "CustomOAuth2UserService: Loading user from Google..."
```

### Test 3: Verificar usuario creado
```powershell
# Conectar a MySQL
docker exec -it vitalapp-mysql mysql -uroot -proot1234 vital_app_db

# Ver usuarios OAuth2
SELECT id, name, email, provider, provider_id FROM users WHERE provider = 'GOOGLE';
```

## 🐛 Solución de Problemas

### Error: "redirect_uri_mismatch"
**Causa**: Las URIs en Google Console no coinciden con las del backend.

**Solución**:
1. Ve a Google Cloud Console → Credenciales
2. Edita tu Client ID
3. Verifica que las URIs sean EXACTAMENTE:
   - `http://localhost:8080/login/oauth2/code/google`
   - `http://localhost:5173/oauth2/redirect`

### Error: "Invalid client credentials"
**Causa**: Variables de entorno no están configuradas.

**Solución**:
```powershell
# Verifica que las variables estén en el entorno:
echo $env:GOOGLE_CLIENT_ID
echo $env:GOOGLE_CLIENT_SECRET

# Si están vacías, configúralas de nuevo
$env:GOOGLE_CLIENT_ID="tu-client-id"
$env:GOOGLE_CLIENT_SECRET="tu-client-secret"

# Reinicia Docker
docker-compose down
docker-compose up -d
```

### Error: Backend no inicia después de rebuild
**Causa**: Error de compilación por dependencias faltantes.

**Solución**:
```powershell
# Ver logs detallados
docker-compose logs backend

# Si faltan dependencias OAuth2, verifica pom.xml:
# Debería tener:
# <dependency>
#   <groupId>org.springframework.boot</groupId>
#   <artifactId>spring-boot-starter-oauth2-client</artifactId>
# </dependency>
```

### El botón de Google no aparece en el frontend
**Causa**: Frontend no se reconstruyó después de los cambios.

**Solución**:
```powershell
cd Frontend
# Detener el frontend (Ctrl+C)
# Limpiar cache y reinstalar
npm run dev
```

## 📚 Recursos Adicionales

- **Documentación completa**: `GOOGLE_OAUTH2_SETUP.md`
- **Google Cloud Console**: https://console.cloud.google.com/
- **Spring Security OAuth2**: https://docs.spring.io/spring-security/reference/servlet/oauth2/client/index.html

## 🎯 Siguientes Pasos (Opcional)

1. **Agregar botón de Facebook OAuth** (similar a Google)
2. **Mejorar UX del callback** (spinner más bonito, mensajes de error)
3. **Configurar OAuth2 para producción** (HTTPS, dominios reales)
4. **Agregar logout completo** (revocar token de Google)

## 🔐 Seguridad

- ✅ El archivo `.env` está en `.gitignore` (nunca se sube a Git)
- ✅ Las credenciales se pasan por variables de entorno en Docker
- ✅ El token JWT se genera en el backend (seguro)
- ✅ Solo URLs autorizadas pueden recibir redirecciones

## ✨ Resultado Final

Después de completar estos pasos:

1. Los usuarios podrán hacer clic en "Continuar con Google"
2. Se autenticarán con su cuenta de Google
3. Se creará automáticamente un usuario en la base de datos
4. Recibirán un JWT para acceder a la app
5. Podrán usar todas las funcionalidades autenticadas

**¡Todo en menos de 20 minutos!** 🚀
