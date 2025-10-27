# Configuración de Google OAuth2 para Vital App

## 📋 Pasos para Configurar Google OAuth2

### 1. Crear Proyecto en Google Cloud Console

1. Ve a [Google Cloud Console](https://console.cloud.google.com/)
2. Inicia sesión con **vital.app6@gmail.com**
3. Crea un nuevo proyecto o selecciona uno existente
   - Nombre sugerido: "Vital-App-Auth"

### 2. Habilitar Google+ API

1. En el menú lateral, ve a **APIs y servicios > Biblioteca**
2. Busca "Google+ API" o "Google Identity"
3. Haz clic en **Habilitar**

### 3. Configurar Pantalla de Consentimiento OAuth

1. Ve a **APIs y servicios > Pantalla de consentimiento de OAuth**
2. Selecciona **Externo** (para permitir cualquier usuario de Google)
3. Completa el formulario:
   - **Nombre de la aplicación**: Vital App
   - **Correo de asistencia**: vital.app6@gmail.com
   - **Logo**: (opcional)
   - **Dominios autorizados**: localhost (para desarrollo)
   - **Información de contacto del desarrollador**: vital.app6@gmail.com
4. En **Alcances**, agrega:
   - `.../auth/userinfo.email`
   - `.../auth/userinfo.profile`
5. Guarda y continúa

### 4. Crear Credenciales OAuth 2.0

1. Ve a **APIs y servicios > Credenciales**
2. Haz clic en **+ CREAR CREDENCIALES**
3. Selecciona **ID de cliente de OAuth 2.0**
4. Configura:
   - **Tipo de aplicación**: Aplicación web
   - **Nombre**: Vital App Web Client
   - **Orígenes autorizados de JavaScript**:
     - `http://localhost:5173`
     - `http://localhost:8080`
   - **URIs de redireccionamiento autorizados**:
     - `http://localhost:8080/login/oauth2/code/google`
     - `http://localhost:5173/oauth2/redirect`
5. Haz clic en **Crear**
6. **GUARDA LAS CREDENCIALES**:
   - Client ID: (algo como `xxxxx.apps.googleusercontent.com`)
   - Client Secret: (código secreto)

### 5. Configurar Variables de Entorno

Tienes dos opciones:

#### Opción A: Variables de Entorno del Sistema (Recomendado para desarrollo)

**Windows PowerShell:**
```powershell
# Establecer variables de entorno temporalmente (solo para la sesión actual)
$env:GOOGLE_CLIENT_ID="TU_CLIENT_ID_AQUI"
$env:GOOGLE_CLIENT_SECRET="TU_CLIENT_SECRET_AQUI"

# O permanentemente (requiere reiniciar terminal):
[System.Environment]::SetEnvironmentVariable("GOOGLE_CLIENT_ID", "TU_CLIENT_ID_AQUI", "User")
[System.Environment]::SetEnvironmentVariable("GOOGLE_CLIENT_SECRET", "TU_CLIENT_SECRET_AQUI", "User")
```

#### Opción B: Archivo .env en el proyecto (NO SUBIR A GIT)

Crea un archivo `.env` en la raíz del proyecto:

```env
GOOGLE_CLIENT_ID=TU_CLIENT_ID_AQUI
GOOGLE_CLIENT_SECRET=TU_CLIENT_SECRET_AQUI
```

**IMPORTANTE**: Agrega `.env` al `.gitignore`

### 6. Configurar Docker Compose

Actualiza `compose.yml` para incluir las variables de entorno:

```yaml
services:
  backend:
    environment:
      - GOOGLE_CLIENT_ID=${GOOGLE_CLIENT_ID}
      - GOOGLE_CLIENT_SECRET=${GOOGLE_CLIENT_SECRET}
```

### 7. URLs Importantes

- **URL de autorización**: `http://localhost:8080/oauth2/authorization/google`
- **URL de callback**: `http://localhost:8080/login/oauth2/code/google`
- **URL de redirección final**: `http://localhost:5173/oauth2/redirect?token=JWT_TOKEN`

## 🧪 Cómo Probar

1. Inicia el backend con Docker:
   ```bash
   docker-compose up -d
   ```

2. Inicia el frontend:
   ```bash
   cd Frontend
   npm run dev
   ```

3. En el frontend, agrega un botón de login con Google que redirija a:
   ```
   http://localhost:8080/oauth2/authorization/google
   ```

4. Después de autenticarse, Google redirigirá a:
   ```
   http://localhost:5173/oauth2/redirect?token=<JWT_TOKEN>
   ```

5. El frontend debe extraer el token y guardarlo:
   ```typescript
   // Ejemplo en React
   const urlParams = new URLSearchParams(window.location.search);
   const token = urlParams.get('token');
   if (token) {
     localStorage.setItem('jwt', token);
     // Redirigir a la página principal
     navigate('/');
   }
   ```

## 🔒 Seguridad en Producción

Cuando despliegues en producción:

1. **Actualiza las URIs autorizadas en Google Console**:
   - Orígenes: `https://tu-dominio.com`
   - Redirección: `https://tu-dominio.com/login/oauth2/code/google`

2. **Actualiza `application.yml`**:
   ```yaml
   app:
     oauth2:
       authorizedRedirectUris:
         - https://tu-dominio.com/oauth2/redirect
   ```

3. **Usa variables de entorno seguras** (AWS Secrets Manager, Azure Key Vault, etc.)

## 📚 Referencias

- [Google OAuth2 Documentation](https://developers.google.com/identity/protocols/oauth2)
- [Spring Security OAuth2 Client](https://docs.spring.io/spring-security/reference/servlet/oauth2/client/index.html)
