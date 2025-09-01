# VitalApp — MVP

Aplicación (web) para promover la actividad física y el envejecimiento activo en personas mayores.
Este repositorio contiene Frontend (React + Vite + Tailwind) y Backend (Java 17 + Spring Boot 3), y un entorno de base de datos con Docker (MySQL + Adminer).

## Tabla de contenido

- [Arquitectura y alcance del MVP](#arquitectura-y-alcance-del-mvp)
- [Requisitos](#requisitos)
- [Estructura de carpetas](#estructura-de-carpetas)
- [Configuración del entorno](#configuración-del-entorno)
	- [1) Base de datos (Docker)](#1-base-de-datos-docker)
	- [2) Backend (Spring Boot)](#2-backend-spring-boot)
	- [3) Frontend (React + Vite + Tailwind)](#3-frontend-react--vite--tailwind)
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
- **Maven:** 3.8+
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

### 1) Base de datos (Docker)

El `compose.yml` levanta MySQL y Adminer:

```bash
docker compose up -d
docker ps
docker logs vitalapp-mysql --tail 20
docker exec -it vitalapp-mysql mysql -uvital -pvital123 -e "SELECT DATABASE();" vitalapp
```

**MySQL:** `localhost:3306`, DB: `vitalapp`, user: `vital`, pass: `vital123`

**Adminer:** http://localhost:8082

	- Server: mysql
	- User: vital
	- Password: vital123
	- Database: vitalapp

Para esta v1 no es obligatorio que el backend persista en MySQL; el contenedor es para dejar el entorno de desarrollo listo.

### 2) Backend (Spring Boot)

Config: `Backend/src/main/resources/application.yml`
(ya preparado para MySQL si luego activan JPA; ahora no es requerido)

Correr en local:

```bash
cd Backend
mvn clean package -DskipTests
mvn spring-boot:run
```

Salud: http://localhost:8080/api/health
 → OK

(Opcional) Swagger: http://localhost:8080/swagger-ui/index.html

Si usas `mvnw` en Windows, ejecuta `mvnw.cmd`. Asegúrate de que JAVA_HOME esté definido y visible para cmd.exe.

### 3) Frontend (React + Vite + Tailwind)

Variables de entorno (crear `Frontend/.env`):

```env
VITE_API_BASE=http://localhost:8080
```

Instalar y correr:

```bash
cd Frontend
npm install
npm run dev
```

Abrir: http://localhost:5173

**Tailwind v4:** en `src/index.css` debes tener

```css
@import "tailwindcss";
```


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