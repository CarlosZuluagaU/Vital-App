# 🚀 VITAL APP - INICIO PASO A PASO CON DOCKER

## 📋 ÍNDICE
1. [Requisitos Previos](#requisitos-previos)
2. [Método 1: Script Automático (Recomendado)](#método-1-script-automático)
3. [Método 2: Paso a Paso Manual](#método-2-paso-a-paso-manual)
4. [Verificación](#verificación)
5. [Detener la Aplicación](#detener-la-aplicación)

---

## ✅ REQUISITOS PREVIOS

Antes de empezar, asegúrate de tener:

- [x] **Docker Desktop instalado y ABIERTO**
- [x] **PowerShell abierto** (como administrador preferiblemente)
- [x] Estar en la carpeta `D:\Programacion\Vital-App`

---

## 🎯 MÉTODO 1: SCRIPT AUTOMÁTICO (RECOMENDADO)

### **Paso 1: Abrir PowerShell**
```powershell
# Presiona: Win + X → selecciona "Windows PowerShell"
```

### **Paso 2: Ir a la carpeta del proyecto**
```powershell
cd D:\Programacion\Vital-App
```

### **Paso 3: Ejecutar el script automático**
```powershell
.\build-docker.ps1
```

**⏱️ Tiempo total:** 3-5 minutos (primera vez)

### **¿Qué hace el script?**
```
✅ Verifica que Docker Desktop esté corriendo
✅ Detiene contenedores anteriores (si existen)
✅ Construye la imagen del Backend (2-3 min)
✅ Inicia MySQL, Backend y Adminer
✅ Espera a que MySQL esté healthy
✅ Espera a que Backend esté respondiendo
✅ Muestra estado y URLs de acceso
✅ Prueba la API automáticamente
```

### **Resultado esperado:**
```
╔═══════════════════════════════════════════════════╗
║         ✅ VITAL APP EJECUTÁNDOSE EN DOCKER      ║
╚═══════════════════════════════════════════════════╝

📊 ESTADO DE CONTENEDORES:
NAMES              STATUS                        PORTS
vitalapp-backend   Up X seconds (healthy)        0.0.0.0:8080->8080/tcp
vitalapp-mysql     Up X minutes (healthy)        0.0.0.0:3307->3306/tcp
vitalapp-adminer   Up X minutes                  0.0.0.0:8082->8080/tcp

🔗 ACCESOS:
   🌐 Backend API:   http://localhost:8080/api
   📊 Health Check:  http://localhost:8080/actuator/health
   🗄️  Adminer:      http://localhost:8082

🧪 PRUEBA RÁPIDA:
   ✅ API funcionando - 6 rutinas disponibles

🎉 ¡Todo listo! Backend corriendo en Docker
```

### **¡YA ESTÁ! Pasa a [Verificación](#verificación)**

---

## 🔧 MÉTODO 2: PASO A PASO MANUAL

Si prefieres hacerlo manualmente o el script falla:

### **PASO 1: Verificar Docker Desktop**

#### 1.1 Abrir Docker Desktop
```
Buscar "Docker Desktop" en el menú inicio y abrirlo
Esperar a que diga "Docker Desktop is running"
```

#### 1.2 Verificar desde PowerShell
```powershell
docker ps
```

**✅ Debe mostrar:** Tabla de contenedores (aunque esté vacía)  
**❌ Si dice error:** Docker Desktop no está corriendo

---

### **PASO 2: Ir a la carpeta del proyecto**

```powershell
cd D:\Programacion\Vital-App
```

**Verificar que estás en la carpeta correcta:**
```powershell
ls
```

Debes ver archivos como: `compose.yml`, `Backend/`, `Frontend/`, etc.

---

### **PASO 3: Construir la imagen del Backend**

```powershell
docker-compose build backend
```

**⏱️ Tiempo:** 2-3 minutos (primera vez)

**Verás:**
```
[+] Building 103.1s (16/16) FINISHED
 => [backend build 1/5] FROM docker.io/library/maven:...
 => [backend build 5/5] RUN mvn clean package -DskipTests
 => => exporting to image
 => => naming to docker.io/library/vital-app-backend:latest
```

**✅ Éxito:** Última línea dice "naming to docker.io/library/vital-app-backend:latest"  
**❌ Error:** Si hay errores rojos, copia el mensaje completo

---

### **PASO 4: Iniciar todos los contenedores**

```powershell
docker-compose up -d
```

**⏱️ Tiempo:** 5-10 segundos

**Verás:**
```
[+] Running 3/3
 ✔ Container vitalapp-mysql    Started
 ✔ Container vitalapp-backend  Started
 ✔ Container vitalapp-adminer  Started
```

**Nota:** El backend puede tardar 60-90 segundos en estar completamente listo.

---

### **PASO 5: Verificar estado de contenedores**

```powershell
docker ps
```

**✅ Debe mostrar:**
```
CONTAINER ID   IMAGE                    STATUS                    PORTS
...            vital-app-backend        Up X seconds (healthy)    0.0.0.0:8080->8080/tcp
...            mysql:8.0                Up X minutes (healthy)    0.0.0.0:3307->3306/tcp
...            adminer                  Up X minutes              0.0.0.0:8082->8080/tcp
```

**🔍 Busca:**
- ✅ Los 3 contenedores con `Up X seconds/minutes`
- ✅ MySQL con `(healthy)`
- ✅ Backend con `(healthy)` (puede tardar 1-2 min en aparecer)

---

### **PASO 6: Ver logs del Backend (Opcional pero recomendado)**

```powershell
docker logs -f vitalapp-backend
```

**Presiona Ctrl+C para salir de los logs**

**✅ Busca esta línea:**
```
Started VitalAppApplication in XX.XXX seconds (process running for XX.XXX)
Tomcat started on port 8080 (http) with context path ''
```

**Si ves eso, el backend está listo!** 🎉

---

### **PASO 7: Esperar a que Backend esté listo (Importante)**

El backend puede tardar **60-90 segundos** en iniciar después de `docker-compose up`.

**Puedes verificar con:**
```powershell
Invoke-RestMethod -Uri "http://localhost:8080/actuator/health"
```

**✅ Respuesta esperada:**
```
status
------
UP
```

**❌ Si da error:** Espera 30 segundos más y vuelve a intentar.

---

## 🔍 VERIFICACIÓN

Una vez que todo esté iniciado, verifica que funciona:

### **1. Verificar contenedores corriendo**
```powershell
docker ps --filter "name=vitalapp"
```

**Debe mostrar 3 contenedores:**
- ✅ vitalapp-mysql (healthy)
- ✅ vitalapp-backend (healthy)
- ✅ vitalapp-adminer

---

### **2. Verificar Health Check del Backend**
```powershell
Invoke-RestMethod -Uri "http://localhost:8080/actuator/health"
```

**✅ Debe retornar:**
```json
{
  "status": "UP"
}
```

---

### **3. Probar API de Rutinas**
```powershell
Invoke-RestMethod -Uri "http://localhost:8080/api/routines"
```

**✅ Debe retornar:** JSON con 6 rutinas

---

### **4. Abrir en el navegador**

**Backend API:**
```
http://localhost:8080/api/routines
```

**Adminer (Base de datos):**
```
http://localhost:8082
```

**Credenciales Adminer:**
- Server: `mysql`
- Username: `root`
- Password: `root1234`
- Database: `vital_app_db`

---

### **5. Ver logs en tiempo real**

**Backend:**
```powershell
docker logs -f vitalapp-backend
```

**MySQL:**
```powershell
docker logs -f vitalapp-mysql
```

**Todos:**
```powershell
docker-compose logs -f
```

**Salir de logs:** Presiona `Ctrl + C`

---

## 🛑 DETENER LA APLICACIÓN

### **Opción 1: Detener pero mantener datos**
```powershell
docker-compose down
```

Los contenedores se detienen pero **los datos se mantienen** en volúmenes.

---

### **Opción 2: Detener y borrar TODO (¡Cuidado!)**
```powershell
docker-compose down -v
```

⚠️ **ESTO BORRA LA BASE DE DATOS COMPLETA**

---

### **Opción 3: Solo reiniciar Backend**
```powershell
docker-compose restart backend
```

---

## 🔄 REINICIAR LA APLICACIÓN

### **Si ya construiste la imagen antes:**
```powershell
docker-compose up -d
```

### **Si hiciste cambios en el código:**
```powershell
docker-compose up --build -d
```

---

## 🐛 SOLUCIÓN DE PROBLEMAS

### ❌ **"Cannot connect to Docker daemon"**
```powershell
# Solución: Abre Docker Desktop y espera que diga "running"
```

---

### ❌ **Backend no responde en puerto 8080**
```powershell
# Ver logs del backend
docker logs vitalapp-backend

# Buscar líneas de ERROR en rojo
# Si ves "Started VitalAppApplication" está bien, solo espera 30 seg más
```

---

### ❌ **"Port 8080 is already allocated"**
```powershell
# Ver qué usa el puerto
netstat -ano | findstr :8080

# Matar el proceso (reemplaza <PID> con el número que te salga)
Stop-Process -Id <PID> -Force

# Reiniciar
docker-compose up -d
```

---

### ❌ **MySQL no está "healthy"**
```powershell
# Ver logs de MySQL
docker logs vitalapp-mysql

# Si hay errores, recrear:
docker-compose down
docker-compose up -d
```

---

### ❌ **Base de datos vacía (no hay rutinas)**
```powershell
# Restaurar desde backup
docker cp vital_app_backup_20251016_205825.sql vitalapp-mysql:/tmp/
docker exec vitalapp-mysql mysql -uroot -proot1234 vital_app_db -e "source /tmp/vital_app_backup_20251016_205825.sql"

# Verificar
docker exec vitalapp-mysql mysql -uroot -proot1234 vital_app_db -e "SELECT COUNT(*) FROM routines;"
```

---

## 📊 COMANDOS ÚTILES DE RESUMEN

### **Ver estado:**
```powershell
docker ps
```

### **Ver logs:**
```powershell
docker logs -f vitalapp-backend
```

### **Reiniciar todo:**
```powershell
docker-compose restart
```

### **Detener todo:**
```powershell
docker-compose down
```

### **Iniciar todo:**
```powershell
docker-compose up -d
```

### **Reconstruir y reiniciar:**
```powershell
docker-compose up --build -d
```

### **Ver uso de recursos:**
```powershell
docker stats
```

---

## 🎯 RESUMEN EJECUTIVO

### **OPCIÓN RÁPIDA (3 comandos):**
```powershell
cd D:\Programacion\Vital-App
.\build-docker.ps1
# ¡Listo! Espera 3-5 minutos
```

### **OPCIÓN MANUAL (5 comandos):**
```powershell
cd D:\Programacion\Vital-App
docker-compose build backend       # 2-3 min
docker-compose up -d                # 5-10 seg
Start-Sleep -Seconds 90             # Esperar
Invoke-RestMethod http://localhost:8080/actuator/health
```

---

## 🎉 CUANDO TODO ESTÉ LISTO

Verás:

```
✅ 3 contenedores corriendo (docker ps)
✅ Backend healthy (http://localhost:8080/actuator/health)
✅ API funcionando (http://localhost:8080/api/routines)
✅ 6 rutinas disponibles
✅ Adminer accesible (http://localhost:8082)
```

**¡Disfruta tu aplicación! 🚀**

---

## 📚 DOCUMENTACIÓN ADICIONAL

- **Guía completa Docker:** `DOCKER_COMPLETO.md`
- **Troubleshooting Backend:** `DIAGNOSTICO_BACKEND.md`
- **Comandos PowerShell:** `COMANDOS_CORRECTOS.md`

---

**Última actualización:** 17 de octubre de 2025  
**Versión:** Docker Compose v2  
**Estado:** ✅ Producción ready
