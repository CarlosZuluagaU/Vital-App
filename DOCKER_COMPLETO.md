# 🐳 VITAL APP - GUÍA COMPLETA DOCKER

## 📋 CONTENIDO

1. [Arquitectura Docker](#arquitectura-docker)
2. [Requisitos Previos](#requisitos-previos)
3. [Inicio Rápido](#inicio-rápido)
4. [Archivos Docker](#archivos-docker)
5. [Comandos Útiles](#comandos-útiles)
6. [Troubleshooting](#troubleshooting)

---

## 🏗️ ARQUITECTURA DOCKER

```
┌─────────────────────────────────────────────┐
│           VITAL APP - DOCKER                │
├─────────────────────────────────────────────┤
│                                             │
│  🐳 vitalapp-mysql (Puerto 3307)           │
│     ├─ MySQL 8.0                           │
│     ├─ Base datos: vital_app_db            │
│     └─ Volume persistente: mysqldata       │
│                                             │
│  🐳 vitalapp-backend (Puerto 8080)         │
│     ├─ Spring Boot 3.3.0                   │
│     ├─ Java 17                             │
│     ├─ Conecta a: mysql:3306 (interno)     │
│     └─ Health check: /actuator/health      │
│                                             │
│  🐳 vitalapp-adminer (Puerto 8082)         │
│     └─ Interfaz web para MySQL             │
│                                             │
└─────────────────────────────────────────────┘
```

---

## ✅ REQUISITOS PREVIOS

1. **Docker Desktop** instalado y corriendo
   - Windows: https://docs.docker.com/desktop/install/windows-install/
   - Versión mínima: 20.10+

2. **Espacio en disco**: ~2 GB libres

3. **Puertos disponibles**:
   - 8080 (Backend)
   - 3307 (MySQL)
   - 8082 (Adminer)

---

## 🚀 INICIO RÁPIDO

### **Opción 1: Script Automático (Recomendado)**

```powershell
.\build-docker.ps1
```

Este script hace todo automáticamente:
- ✅ Verifica Docker Desktop
- ✅ Construye la imagen del Backend
- ✅ Inicia todos los contenedores
- ✅ Espera a que todo esté listo
- ✅ Verifica que funcione

**Tiempo estimado**: 3-5 minutos (primera vez)

---

### **Opción 2: Manual**

#### **Paso 1: Construir y ejecutar**
```powershell
docker-compose up --build -d
```

#### **Paso 2: Verificar estado**
```powershell
docker ps
```

Deberías ver:
```
vitalapp-mysql     Up X seconds (healthy)
vitalapp-backend   Up X seconds (healthy)
vitalapp-adminer   Up X seconds
```

#### **Paso 3: Probar API**
```powershell
Invoke-RestMethod -Uri "http://localhost:8080/api/routines"
```

---

## 📁 ARCHIVOS DOCKER

### **1. Backend/Dockerfile**

```dockerfile
# Build multi-etapa para optimizar tamaño
FROM maven:3.9.9-eclipse-temurin-17 AS build
# ... compilación Maven

FROM eclipse-temurin:17-jre-alpine
# ... ejecución con JRE ligero
```

**Características:**
- ✅ Build multi-etapa (imagen final pequeña)
- ✅ Usuario no-root para seguridad
- ✅ Health check incluido
- ✅ Variables de entorno configurables

---

### **2. compose.yml**

Define 3 servicios:

#### **MySQL**
```yaml
services:
  mysql:
    image: mysql:8.0
    ports:
      - "3307:3306"  # Evita conflicto con MySQL local
    environment:
      MYSQL_ROOT_PASSWORD: root1234
      MYSQL_DATABASE: vital_app_db
    healthcheck:
      test: mysqladmin ping
```

#### **Backend**
```yaml
  backend:
    build: ./Backend
    ports:
      - "8080:8080"
    environment:
      SPRING_DATASOURCE_URL: jdbc:mysql://mysql:3306/...
    depends_on:
      mysql:
        condition: service_healthy
```

#### **Adminer**
```yaml
  adminer:
    image: adminer
    ports:
      - "8082:8080"
```

---

### **3. Backend/.dockerignore**

Excluye archivos innecesarios para build más rápido:
```
target/
.git/
*.md
.idea/
```

---

## 🔧 COMANDOS ÚTILES

### **Iniciar todo**
```powershell
docker-compose up -d
```

### **Construir y iniciar** (después de cambios en código)
```powershell
docker-compose up --build -d
```

### **Ver logs**
```powershell
# Todos los servicios
docker-compose logs -f

# Solo backend
docker logs -f vitalapp-backend

# Solo MySQL
docker logs -f vitalapp-mysql

# Últimas 50 líneas
docker logs --tail 50 vitalapp-backend
```

### **Estado de contenedores**
```powershell
docker ps

# Solo de Vital App
docker ps --filter "name=vitalapp"

# Con formato
docker ps --format "table {{.Names}}\t{{.Status}}\t{{.Ports}}"
```

### **Detener todo**
```powershell
# Detener contenedores (mantiene datos)
docker-compose down

# Detener y borrar TODOS los datos (¡cuidado!)
docker-compose down -v
```

### **Reiniciar un servicio**
```powershell
# Reiniciar backend
docker-compose restart backend

# Reiniciar MySQL
docker-compose restart mysql
```

### **Reconstruir solo backend**
```powershell
docker-compose build backend
docker-compose up -d backend
```

### **Acceder a contenedor**
```powershell
# MySQL
docker exec -it vitalapp-mysql bash
docker exec -it vitalapp-mysql mysql -uroot -proot1234 vital_app_db

# Backend
docker exec -it vitalapp-backend sh
```

### **Ver uso de recursos**
```powershell
docker stats
```

---

## 🔍 VERIFICACIONES

### **1. Health Check Backend**
```powershell
Invoke-RestMethod -Uri "http://localhost:8080/actuator/health"
```

**Respuesta esperada:**
```json
{
  "status": "UP"
}
```

### **2. Health Check MySQL**
```powershell
docker inspect vitalapp-mysql --format='{{.State.Health.Status}}'
```

**Respuesta esperada:** `healthy`

### **3. Probar API**
```powershell
# Listar rutinas
Invoke-RestMethod -Uri "http://localhost:8080/api/routines"

# Obtener rutina específica
Invoke-RestMethod -Uri "http://localhost:8080/api/routines/1"

# Ver ejercicios
Invoke-RestMethod -Uri "http://localhost:8080/api/exercises"
```

### **4. Acceder a Adminer**
```
http://localhost:8082

Server:   mysql
Username: root
Password: root1234
Database: vital_app_db
```

---

## 🐛 TROUBLESHOOTING

### ❌ **Error: "Cannot connect to Docker daemon"**

**Causa:** Docker Desktop no está corriendo

**Solución:**
1. Abre Docker Desktop
2. Espera que diga "Docker Desktop is running"
3. Vuelve a ejecutar el script

---

### ❌ **Error: "port is already allocated"**

**Causa:** Puerto 8080, 3307 o 8082 ya está en uso

**Solución:**
```powershell
# Ver qué usa el puerto
netstat -ano | findstr :8080

# Matar el proceso (reemplaza PID)
Stop-Process -Id <PID> -Force

# O cambiar puerto en compose.yml
ports:
  - "8081:8080"  # Backend en 8081 en vez de 8080
```

---

### ❌ **Error: "Backend no responde después de varios minutos"**

**Causa:** Error durante inicio de Spring Boot

**Solución:**
```powershell
# Ver logs del backend
docker logs vitalapp-backend

# Buscar líneas de error en rojo
# Errores comunes:
# - "Connection refused" → MySQL no está listo
# - "Access denied" → Credenciales incorrectas
# - "Table doesn't exist" → BD vacía
```

**Restart limpio:**
```powershell
docker-compose down
docker-compose up -d
docker logs -f vitalapp-backend
```

---

### ❌ **Error: "MySQL no inicia (unhealthy)"**

**Causa:** Volumen corrupto o configuración incorrecta

**Solución:**
```powershell
# Ver logs
docker logs vitalapp-mysql

# Recrear volumen (¡BORRA DATOS!)
docker-compose down -v
docker-compose up -d
```

---

### ❌ **Error: "Build failed - Maven error"**

**Causa:** Error de compilación en el código

**Solución:**
```powershell
# Ver logs de build
docker-compose build backend

# Compilar localmente para ver error
cd Backend
mvn clean compile
```

---

### ❌ **Base de datos vacía después de iniciar**

**Causa:** Volumen nuevo sin datos

**Solución:**
```powershell
# Restaurar backup
docker cp vital_app_backup_20251016_205825.sql vitalapp-mysql:/tmp/
docker exec -i vitalapp-mysql mysql -uroot -proot1234 vital_app_db < vital_app_backup_20251016_205825.sql

# Verificar
docker exec vitalapp-mysql mysql -uroot -proot1234 vital_app_db -e "SELECT COUNT(*) FROM routines;"
```

---

## 📊 VARIABLES DE ENTORNO

Puedes personalizar el comportamiento editando `compose.yml`:

### **Backend**
```yaml
environment:
  SPRING_PROFILES_ACTIVE: docker
  SPRING_DATASOURCE_URL: jdbc:mysql://mysql:3306/vital_app_db
  SPRING_DATASOURCE_USERNAME: root
  SPRING_DATASOURCE_PASSWORD: root1234
  JAVA_OPTS: "-Xms512m -Xmx1024m"  # Memoria
```

### **MySQL**
```yaml
environment:
  MYSQL_ROOT_PASSWORD: root1234
  MYSQL_DATABASE: vital_app_db
  TZ: America/Bogota
```

---

## 🎯 DESARROLLO CON DOCKER

### **Workflow recomendado:**

1. **Hacer cambios en código**
2. **Reconstruir imagen**:
   ```powershell
   docker-compose build backend
   ```
3. **Reiniciar servicio**:
   ```powershell
   docker-compose up -d backend
   ```
4. **Ver logs**:
   ```powershell
   docker logs -f vitalapp-backend
   ```

### **Hot reload (opcional):**

Para desarrollo con hot reload, considera usar volumen:

```yaml
backend:
  volumes:
    - ./Backend/target:/app/target
```

Pero para producción, **NO uses volúmenes de código**.

---

## 📈 MEJORAS FUTURAS

- [ ] Nginx reverse proxy
- [ ] SSL/TLS certificates
- [ ] Multi-stage frontend build
- [ ] Docker secrets para contraseñas
- [ ] CI/CD pipeline
- [ ] Docker Swarm / Kubernetes

---

## 🎉 VENTAJAS DE DOCKER

✅ **Portabilidad**: Mismo ambiente en todos los equipos  
✅ **Aislamiento**: No contamina el sistema  
✅ **Reproducibilidad**: Builds consistentes  
✅ **Escalabilidad**: Fácil de escalar horizontalmente  
✅ **CI/CD Ready**: Integración continua simple  
✅ **Despliegue**: Deploy a cualquier nube  

---

**Última actualización**: 17 de octubre de 2025  
**Versión Docker**: compose v2  
**Estado**: ✅ Producción ready
