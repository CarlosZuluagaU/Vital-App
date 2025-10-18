# ✅ CÓMO VERIFICAR QUE DOCKER FUNCIONA

## 🔍 VERIFICACIÓN RÁPIDA (30 segundos)

### 1. Ver contenedores corriendo:
```powershell
docker ps
```

**Debes ver:**
```
✅ vitalapp-mysql   Up X minutes (healthy)   0.0.0.0:3307->3306/tcp
✅ vitalapp-adminer Up X minutes             0.0.0.0:8082->8080/tcp
```

---

### 2. Verificar datos en MySQL:
```powershell
docker exec vitalapp-mysql mysql -uroot -proot1234 vital_app_db -e "SELECT COUNT(*) FROM routines;"
```

**Debe mostrar:** `6`

---

### 3. Abrir Adminer en navegador:
```
http://localhost:8082
```

**Credenciales:**
- Server: `vitalapp-mysql`
- Username: `root`
- Password: `root1234`
- Database: `vital_app_db`

---

## 🧪 VERIFICACIÓN COMPLETA

### Comando único de verificación:
```powershell
# Copiar y pegar todo esto:
Write-Host "`n=== VERIFICACIÓN DOCKER ===" -ForegroundColor Cyan
Write-Host "`n1. Contenedores:" -ForegroundColor Yellow
docker ps --filter "name=vitalapp" --format "table {{.Names}}\t{{.Status}}"

Write-Host "`n2. Health Check:" -ForegroundColor Yellow
docker inspect vitalapp-mysql --format='MySQL: {{.State.Health.Status}}'

Write-Host "`n3. Datos:" -ForegroundColor Yellow
docker exec vitalapp-mysql mysql -uroot -proot1234 vital_app_db -e "SELECT COUNT(*) as Rutinas FROM routines; SELECT COUNT(*) as Ejercicios FROM exercises;" 2>$null

Write-Host "`n4. Puertos:" -ForegroundColor Yellow
Write-Host "MySQL:   localhost:3307"
Write-Host "Adminer: http://localhost:8082"
Write-Host ""
```

---

## ✅ CHECKLIST DE VERIFICACIÓN

Marca cada item:

- [ ] **Contenedores corriendo**: `docker ps` muestra vitalapp-mysql y vitalapp-adminer
- [ ] **MySQL healthy**: Estado dice "(healthy)"
- [ ] **Puerto 3307**: MySQL accesible
- [ ] **Puerto 8082**: Adminer accesible en navegador
- [ ] **Datos presentes**: 6 rutinas en base de datos
- [ ] **Backend conecta**: Spring Boot inicia sin errores de conexión

---

## 🔧 COMANDOS ÚTILES

### Ver logs en tiempo real:
```powershell
docker-compose logs -f mysql
```

### Conectar a MySQL desde terminal:
```powershell
docker exec -it vitalapp-mysql mysql -uroot -proot1234 vital_app_db
```

### Ver todas las rutinas:
```powershell
docker exec vitalapp-mysql mysql -uroot -proot1234 vital_app_db -e "SELECT id, title, duration FROM routines;"
```

### Reiniciar contenedores:
```powershell
docker-compose restart
```

### Detener todo:
```powershell
docker-compose down
```

### Iniciar de nuevo:
```powershell
docker-compose up -d
```

---

## 🐛 PROBLEMAS COMUNES

### ❌ "No containers running"
**Solución:**
```powershell
docker-compose up -d
```

### ❌ "Cannot connect to port 3307"
**Verificar:**
```powershell
docker ps  # ¿Está el contenedor corriendo?
netstat -an | findstr :3307  # ¿Está el puerto ocupado?
```

### ❌ "Access denied for user 'root'"
**Verificar password:**
- Password correcto: `root1234`
- En compose.yml debe estar: `MYSQL_ROOT_PASSWORD: root1234`

### ❌ "Database 'vital_app_db' doesn't exist"
**Restaurar datos:**
```powershell
docker cp vital_app_backup_20251016_205825.sql vitalapp-mysql:/tmp/
docker exec -i vitalapp-mysql mysql -uroot -proot1234 vital_app_db < vital_app_backup_20251016_205825.sql
```

---

## 📊 VERIFICACIÓN DE BACKEND

### Backend conectando a Docker:
```powershell
cd Backend
mvn spring-boot:run -Dspring-boot.run.profiles=docker
```

### Debe mostrar en logs:
```
✅ HikariPool-1 - Start completed
✅ Started VitalAppApplication in X seconds
✅ Tomcat started on port 8080
```

### Probar API:
```powershell
curl http://localhost:8080/api/routines
```

Debe retornar JSON con 6 rutinas.

---

## 🎯 ESTADO ESPERADO

Cuando todo funciona correctamente verás:

```
DOCKER:
  ✅ vitalapp-mysql (healthy)
  ✅ vitalapp-adminer (running)

DATOS:
  ✅ 6 rutinas
  ✅ 22 ejercicios
  ✅ 30 relaciones

PUERTOS:
  ✅ 3307 (MySQL)
  ✅ 8082 (Adminer)

BACKEND:
  ✅ Conecta a localhost:3307
  ✅ API responde en :8080
```

---

## 📚 MÁS INFORMACIÓN

- **Guía completa**: `INTEGRACION_FINAL.md`
- **Inicio rápido**: `INICIO_RAPIDO_DOCKER.md`
- **Script automático**: `start.ps1`

---

**Última actualización**: 17 de octubre de 2025
