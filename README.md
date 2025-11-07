# VitalApp — MVP

Aplicación (web) para promover la actividad física y el envejecimiento activo en personas mayores.
Este repositorio contiene Frontend (React + Vite + Tailwind) y Backend (Java 17 + Spring Boot 3), y un entorno de base de datos con Docker (MySQL + Adminer).

## 🚀 INICIO RÁPIDO (RECOMENDADO)

**¿Primera vez o quieres iniciar todo el sistema?**

```powershell
.\start-all.ps1
```

Este script hace TODO automáticamente:
- ✅ Verifica e inicia Docker Desktop
- ✅ Construye e inicia Backend + MySQL
- ✅ Verifica y carga los datos (7 rutinas, 22 ejercicios)
- ✅ Inicia el Frontend
- ✅ Abre automáticamente el navegador

**Sistema completo listo en ~60 segundos** 🎉

### Accesos rápidos después de iniciar:
- **Frontend:** http://localhost:5173 (se abre automáticamente)
- **Backend API:** http://localhost:8080
- **Adminer (BD):** http://localhost:8082

---

## Tabla de contenido

- [🚀 Inicio Rápido](#-inicio-rápido-recomendado)
- [Arquitectura y alcance del MVP](#arquitectura-y-alcance-del-mvp)
- [Requisitos](#requisitos)
- [Estructura de carpetas](#estructura-de-carpetas)
- [Configuración del entorno](#configuración-del-entorno)
	- [1) Base de datos (Docker)](#1-base-de-datos-docker)
	- [2) Backend (Spring Boot)](#2-backend-spring-boot)
	- [3) Frontend (React + Vite + Tailwind)](#3-frontend-react--vite--tailwind)
- [Scripts disponibles](#scripts-disponibles)
- [Endpoints del backend](#endpoints-del-backend)
- [Flujos de prueba manual (checklist)](#flujos-de-prueba-manual-checklist)
- [Solución de problemas comunes](#solución-de-problemas-comunes)
- [Hoja de ruta (siguientes pasos)](#hoja-de-ruta-siguientes-pasos)
- [Créditos](#créditos)


## Arquitectura y alcance del MVP

**Frontend:** React + Vite + TypeScript + Tailwind (Web responsive, accesible).

**Backend:** Spring Boot 3 (Java 17).

En esta v1 el backend expone endpoints dummy (sin persistencia) para poder integrar el Front.
La conexión a MySQL está preparada a nivel de entorno, pero no es requisito para correr el MVP.

**DB:** MySQL 8 + Adminer (para administración).

**CORS:** habilitado para http://localhost:5173 (Vite).

### MVP v1 – Funcionalidades:

- Listar rutinas por nivel (básico/intermedio).
- Ver detalle de una rutina (ejercicios simulados).
- Registrar minutos a la semana (POST dummy).
- Ver resumen semanal (dummy).
- Salud del servicio: `/api/health`.


## Requisitos

- **Sistema:** Windows / macOS / Linux
- **Node:** 20+
	```bash
	node -v
	npm -v
	```
- **Java:** 17 (JDK)
	```bash
	java -version
	```
	En Windows, configurar JAVA_HOME.
- **Maven:** 3.9+
	```bash
	mvn -v
	```
- **Docker Desktop + Compose**
	```bash
	docker --version
	docker compose version
	```
- **Git**
	```bash
	git --version
	```


## Estructura de carpetas

```text
Vital-App/
├── Backend/                      # Spring Boot 3 (Java 17)
│   ├── src/main/java/com/vitalapp/...
│   ├── src/main/resources/application.yml
│   ├── pom.xml
│   └── README.md  (si aplica)
├── Frontend/                     # React + Vite + Tailwind + TS
│   ├── src/
│   ├── index.html
│   ├── package.json
│   ├── postcss.config.js
│   ├── tailwind.config.js (opcional en Tailwind v4)
│   └── .env                     # VITE_API_BASE
└── compose.yml                   # MySQL + Adminer
```


## Configuración del entorno

### Opción A: Inicio automático (RECOMENDADO)

```powershell
.\start-all.ps1
```

¡Listo! El script inicia todo automáticamente.

### Opción B: Inicio manual por componentes

### 1) Base de datos y Backend (Docker)

El sistema ahora funciona completamente dockerizado:

```powershell
.\build-docker.ps1
```

Este script:
- ✅ Construye la imagen del Backend
- ✅ Inicia MySQL (puerto 3307) + Backend (puerto 8080) + Adminer (puerto 8082)
- ✅ Verifica que los servicios estén healthy
- ✅ Carga automáticamente 7 rutinas y 22 ejercicios si la BD está vacía

**Accesos:**
- **Backend API:** http://localhost:8080
- **Adminer (navegador BD):** http://localhost:8082
  - Sistema: MySQL
  - Servidor: mysql
  - Usuario: root
  - Contraseña: root1234
  - Base de datos: vital_app_db

**Verificar que todo funciona:**
```powershell
# Ver contenedores corriendo
docker ps

# Ver logs del backend
docker logs vitalapp-backend --tail 30

# Probar API
Invoke-RestMethod http://localhost:8080/api/routines
```

### 2) Frontend (React + Vite + Tailwind)

**Opción A: Script automático**
```powershell
.\start-frontend.ps1
```

**Opción B: Manual**
```powershell
cd Frontend
npm install
npm run dev
```

El archivo `.env` ya está configurado correctamente:
```env
VITE_API_BASE=http://localhost:8080
VITE_AUTH_MODE=cookie
```

Abrir: http://localhost:5173

**Tailwind v4:** en `src/index.css` debes tener

```css
@import "tailwindcss";
```

## Scripts disponibles

| Script | Descripción |
|--------|-------------|
| `start-all.ps1` | **RECOMENDADO** - Inicia TODO el sistema automáticamente |
| `build-docker.ps1` | Construye e inicia Backend + MySQL + Adminer |
| `start-frontend.ps1` | Inicia solo el Frontend (requiere backend corriendo) |
| `populate-database.ps1` | Carga datos iniciales en la BD si está vacía |

### Datos incluidos automáticamente:
- ✅ **7 rutinas** de ejercicio (diferentes intensidades y duraciones)
- ✅ **22 ejercicios** clasificados por categoría
- ✅ **5 categorías** (Fuerza, Equilibrio, Flexibilidad, Cardio, Movilidad)
- ✅ **4 niveles de intensidad** (Muy Suave, Suave, Moderada, Alta)
- ✅ **30 relaciones** rutina-ejercicio

### Persistencia de datos:
- ✅ Los datos se mantienen aunque reinicies Docker
- ✅ Los usuarios que registres desde el frontend se guardan permanentemente
- ✅ Volumen Docker `mysqldata` mantiene toda la información


## Endpoints del backend

| Método | Ruta | Descripción |
|--------|------|-------------|
| GET | /api/health | Prueba de vida (texto OK). |
| GET | `/api/rutinas?nivel=basico\|intermedio` | Listar rutinas por nivel |
| GET | /api/rutinas/{id} | Detalle de una rutina (dummy + ejercicios). |
| POST | /api/progreso | Registrar minutos (valida 1..300) – dummy. |
| GET | /api/progreso/semana?desde=YYYY-MM-DD | Resumen semanal (dummy). |

Nota: En v1, las respuestas son simuladas; sirven para integrar el front y demostrar flujo.


## Flujos de prueba manual (checklist)

**DB arriba**
- `docker compose up -d` → `docker ps` muestra vitalapp-mysql y vitalapp-adminer.
- `SELECT DATABASE();` → vitalapp.

**Backend arriba**
- `mvn spring-boot:run` → http://localhost:8080/api/health muestra OK.

**Frontend arriba**
- `npm run dev` → http://localhost:5173 carga la home.
- Aparece selector de nivel y lista de rutinas (dummy).

**Detalle de rutina**
- Navega a una rutina → se listan ejercicios simulados.

**Registrar progreso**
- En detalle, envía minutos (1..300). Debe devolver éxito (dummy) o validación 400 si fuera de rango.

**Resumen semanal**
- Consulta desde una fecha → muestra 7 días con totales (dummy).

**Accesibilidad básica**
- Navega con teclado (Tab) → foco visible. Tamaños mínimos ≥16px.

Guarda capturas de: `docker ps`, `/api/health`, Home del front y flujo de rutina.


## Solución de problemas comunes

**Tailwind “no aplica estilos” (se ve HTML crudo):**
- Estás usando Tailwind v4 → en `src/index.css` pon `@import "tailwindcss";`
- Reinicia `npm run dev`.
- Revisa DevTools → Network → `index.css` (debe pesar > 1–2 KB).

**CORS al llamar API desde el front:**
- Backend debe permitir http://localhost:5173.
- En Spring, un WebMvcConfigurer con `allowedOrigins("http://localhost:5173")`.

**mvnw.cmd dice “JAVA_HOME not found”:**
- JAVA_HOME debe existir a nivel de Sistema (no solo de usuario) y ser visible en cmd.exe.
- Verifica en CMD: `echo %JAVA_HOME%` y `"%JAVA_HOME%\bin\java.exe" -version`.

**MySQL en conflicto de nombre/puerto:**
- `docker ps` → si ya hay un contenedor viejo, elimínalo:
	```bash
	docker rm -f vitalapp-mysql
	docker compose up -d
	```


## Hoja de ruta (siguientes pasos)

- Persistencia real: activar JPA + MySQL (entidades Routine, Exercise, ProgressRecord).
- Semillas: cargar 2 rutinas (básico/intermedio) y 3–5 ejercicios cada una.
- Autenticación: preparar users y JWT (login simple).
- Favoritos (M:N) y historial de progreso por usuario.
- Accesibilidad avanzada: validaciones WCAG, teclado completo y alto contraste persistente.
- Pruebas: UAT con grupo piloto (≥5 personas), encuesta SUS y hallazgos.


## Créditos

**Equipo:** Mateo Vásquez García, Juan David Garcia Garcia, Carlos Andrés Zuluaga Amaya.

**Tutor:** Sandra Patricia Zabala Orrego.

**Tecnologías:** React + Vite + Tailwind, Spring Boot, Docker, MySQL.
