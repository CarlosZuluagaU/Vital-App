# 🔍 DIAGNÓSTICO: BACKEND NO INICIA

## ⚠️ PROBLEMA DETECTADO

El backend (proceso Java PID: 35816) estuvo corriendo más de 20 minutos pero **no respondió** en el puerto 8080.

**Esto indica que hubo un error durante el inicio de Spring Boot.**

---

## 🎯 SOLUCIÓN: REVISAR LOGS

### **Paso 1: Detener proceso actual**

El proceso ya fue detenido. Ahora necesitas reiniciarlo **observando los logs**.

### **Paso 2: Iniciar con logs visibles**

**Abre una nueva terminal PowerShell** y ejecuta:

```powershell
cd D:\Programacion\Vital-App\Backend

mvn spring-boot:run "-Dspring-boot.run.profiles=docker"
```

**⚠️ IMPORTANTE:** 
- Usa comillas `"` alrededor del parámetro
- NO cierres esta terminal
- OBSERVA los mensajes que aparecen

---

## 👀 QUÉ BUSCAR EN LOS LOGS

### ✅ **ÉXITO** - Deberías ver:

```
[INFO] --- spring-boot:3.3.0:run (default-cli) @ vitalapp-backend ---
...
  .   ____          _            __ _ _
 /\\ / ___'_ __ _ _(_)_ __  __ _ \ \ \ \
( ( )\___ | '_ | '_| | '_ \/ _` | \ \ \ \
 \\/  ___)| |_)| | | | | || (_| |  ) ) ) )
  '  |____| .__|_| |_|_| |_\__, | / / / /
 =========|_|==============|___/=/_/_/_/
 :: Spring Boot ::                (v3.3.0)

...
Started VitalAppApplication in 45.123 seconds (process running for 48.567)
Tomcat started on port 8080 (http) with context path ''
```

### ❌ **ERRORES COMUNES** - Busca estos mensajes:

#### Error 1: No puede conectar a MySQL
```
Error creating bean with name 'dataSource'
Connection refused: localhost:3307
```

**Solución:**
```powershell
# Verificar Docker
docker ps

# Si no está corriendo:
docker-compose up -d
```

#### Error 2: Base de datos no existe
```
Unknown database 'vital_app_db'
```

**Solución:**
```powershell
# Crear la base de datos
docker exec -it vitalapp-mysql mysql -uroot -proot1234 -e "CREATE DATABASE IF NOT EXISTS vital_app_db;"
```

#### Error 3: Credenciales incorrectas
```
Access denied for user 'root'@'localhost' (using password: YES)
```

**Solución:**
Verificar `application.yml` tenga:
```yaml
username: root
password: root1234
```

#### Error 4: Puerto 8080 ocupado
```
Port 8080 was already in use
```

**Solución:**
```powershell
# Ver qué usa el puerto
netstat -ano | findstr :8080

# Matar el proceso (reemplaza PID)
Stop-Process -Id <PID> -Force
```

#### Error 5: Dependencias no compiladas
```
[ERROR] Failed to execute goal
package does not exist
```

**Solución:**
```powershell
# Limpiar y compilar
mvn clean install -DskipTests
```

---

## 🔧 VERIFICACIONES PREVIAS

Antes de iniciar el backend, verifica:

### 1. Docker corriendo:
```powershell
docker ps
```

**Debe mostrar:**
```
vitalapp-mysql     Up X minutes (healthy)
vitalapp-adminer   Up X minutes
```

### 2. Puerto 3307 accesible:
```powershell
Test-NetConnection -ComputerName localhost -Port 3307
```

**Debe mostrar:**
```
TcpTestSucceeded : True
```

### 3. Base de datos existe:
```powershell
docker exec vitalapp-mysql mysql -uroot -proot1234 -e "SHOW DATABASES LIKE 'vital_app_db';"
```

**Debe mostrar:**
```
vital_app_db
```

Si no existe, créala:
```powershell
docker exec vitalapp-mysql mysql -uroot -proot1234 -e "CREATE DATABASE vital_app_db;"
```

---

## 📋 CHECKLIST DE INICIO

Sigue estos pasos en orden:

- [ ] **Docker Desktop abierto** y corriendo
- [ ] **Contenedores iniciados**: `docker-compose up -d`
- [ ] **Contenedores saludables**: `docker ps` muestra "(healthy)"
- [ ] **Base de datos existe**: `vital_app_db` creada
- [ ] **Puerto 8080 libre**: no hay otro proceso usándolo
- [ ] **En carpeta correcta**: `D:\Programacion\Vital-App\Backend`
- [ ] **Comando correcto**: con comillas en `-D`

---

## 🚀 COMANDO CORRECTO COMPLETO

```powershell
# Paso 1: Ir a carpeta Backend
cd D:\Programacion\Vital-App\Backend

# Paso 2: Iniciar backend con perfil docker
mvn spring-boot:run "-Dspring-boot.run.profiles=docker"

# Esperar 1-2 minutos

# Paso 3: Verificar en otra terminal
Invoke-RestMethod -Uri "http://localhost:8080/api/routines"
```

---

## 🎯 TIEMPO ESPERADO

| Fase | Tiempo |
|------|--------|
| Descarga dependencias | 30-60 seg (primera vez) |
| Compilación | 30-45 seg |
| Inicio Spring Boot | 30-45 seg |
| **TOTAL** | **1.5-2.5 minutos** |

Si tarda más de 3 minutos sin mensajes, probablemente hay un error.

---

## 🔍 COMANDOS DE DIAGNÓSTICO

### Ver procesos Java:
```powershell
Get-Process | Where-Object { $_.ProcessName -match "java" }
```

### Ver qué usa puerto 8080:
```powershell
netstat -ano | findstr :8080
```

### Probar conexión a MySQL desde terminal:
```powershell
docker exec -it vitalapp-mysql mysql -uroot -proot1234 vital_app_db -e "SELECT 1;"
```

### Ver logs de Docker MySQL:
```powershell
docker logs vitalapp-mysql --tail 20
```

---

## 💡 TIPS

1. **NO cierres la terminal** donde corre Maven - necesitas ver los logs
2. **Espera el mensaje completo** "Started VitalAppApplication" antes de probar
3. **Si ves errores en rojo**, léelos completos y busca la causa raíz
4. **Prueba primero sin perfil** (H2 en memoria) para descartar problemas de MySQL:
   ```powershell
   mvn spring-boot:run
   ```

---

## 📞 PASOS SIGUIENTES

1. **Abre nueva terminal** en `Backend/`
2. **Ejecuta** `mvn spring-boot:run "-Dspring-boot.run.profiles=docker"`
3. **Observa los logs** atentamente
4. **Copia cualquier error** que veas en rojo
5. **Si ves "Started VitalAppApplication"**, prueba: `curl http://localhost:8080/api/routines`

---

**El problema más común es que Maven está compilando en background sin mostrar logs. Por eso necesitas verlos directamente en la terminal.**

---

**Última actualización**: 17 de octubre de 2025  
**Estado**: Backend detenido, listo para reiniciar con logs visibles
