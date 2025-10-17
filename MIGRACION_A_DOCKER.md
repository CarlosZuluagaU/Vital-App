# 🐳 MIGRACIÓN A DOCKER - SCRIPT DE AYUDA

**Fecha**: 16 de octubre de 2025  
**Estado**: En proceso de migración

---

## ✅ PASO 1: BACKUP COMPLETADO

```
✅ Archivo: vital_app_backup_20251016_205825.sql
✅ Tamaño: 75 KB
✅ Ubicación: D:\Programacion\Vital-App\
✅ Datos respaldados: 6 rutinas + 22 ejercicios
```

---

## ⚠️ PASO 2: DETENER MYSQL LOCAL (REQUIERE ADMIN)

### Opción A: Desde PowerShell como Administrador

1. **Abre PowerShell como Administrador**:
   - Click derecho en menú Inicio
   - "Windows PowerShell (Admin)" o "Terminal (Admin)"

2. **Ejecuta este comando**:
   ```powershell
   Stop-Service -Name MySQL91 -Force
   ```

3. **Verifica que se detuvo**:
   ```powershell
   Get-Service MySQL91
   ```

### Opción B: Desde Servicios de Windows

1. **Abre Servicios**:
   - Presiona `Win + R`
   - Escribe: `services.msc`
   - Presiona Enter

2. **Busca MySQL91**:
   - Scroll hasta encontrar "MySQL91"
   - Click derecho → "Detener"

3. **Verifica**:
   - Estado debe cambiar a "Detenido"

### Opción C: Desde CMD como Administrador

```cmd
net stop MySQL91
```

---

## 🚀 PASO 3: INICIAR DOCKER MYSQL

### Una vez que MySQL local esté detenido:

```bash
# 1. Navegar al proyecto
cd D:\Programacion\Vital-App

# 2. Iniciar Docker Compose
docker-compose up -d

# 3. Ver logs para confirmar que inició
docker-compose logs -f mysql

# Espera ver: "[Server] /usr/sbin/mysqld: ready for connections"
# Presiona Ctrl+C para salir de los logs
```

---

## 📥 PASO 4: RESTAURAR DATOS EN DOCKER

```bash
# 1. Esperar a que MySQL esté listo (healthcheck)
docker-compose ps

# Estado debe ser "healthy" o "Up"

# 2. Copiar backup al contenedor
docker cp vital_app_backup_20251016_205825.sql vitalapp-mysql:/tmp/backup.sql

# 3. Crear la base de datos (si no existe)
docker exec -it vitalapp-mysql mysql -uroot -proot1234 -e "CREATE DATABASE IF NOT EXISTS vital_app_db;"

# 4. Restaurar datos
docker exec -i vitalapp-mysql mysql -uroot -proot1234 vital_app_db < vital_app_backup_20251016_205825.sql

# 5. Verificar que se restauró
docker exec -it vitalapp-mysql mysql -uroot -proot1234 vital_app_db -e "SELECT COUNT(*) as total_rutinas FROM routines;"
```

---

## ✅ PASO 5: INICIAR BACKEND

```bash
# Backend ya está configurado para MySQL (local o Docker usan mismo puerto)
cd Backend
mvn spring-boot:run -Dspring-boot.run.profiles=mysql
```

---

## 🎯 VERIFICACIÓN COMPLETA

### Test 1: MySQL Docker corriendo
```bash
docker ps --filter "name=vitalapp-mysql"
```

**Esperado**: Contenedor "vitalapp-mysql" con estado "Up" y "healthy"

### Test 2: Datos restaurados
```bash
docker exec -it vitalapp-mysql mysql -uroot -proot1234 vital_app_db -e "
SELECT 'routines' as tabla, COUNT(*) as total FROM routines
UNION ALL SELECT 'exercises', COUNT(*) FROM exercises;"
```

**Esperado**:
```
tabla       total
routines    6
exercises   22
```

### Test 3: Backend conecta
```bash
cd Backend
mvn spring-boot:run -Dspring-boot.run.profiles=mysql
```

**Esperado en logs**:
```
HikariPool-1 - Starting...
HikariPool-1 - Start completed.
Started VitalAppApplication in X seconds
```

### Test 4: API responde
```bash
curl http://localhost:8080/api/routines
```

**Esperado**: JSON con 6 rutinas

---

## 🔧 TROUBLESHOOTING

### Problema 1: Puerto 3306 todavía ocupado

**Solución**:
```bash
# Ver qué proceso usa el puerto
Get-NetTCPConnection -LocalPort 3306 | Select-Object OwningProcess
Get-Process -Id <ID_DEL_PROCESO>

# Si es MySQL que no se detuvo:
Stop-Process -Id <ID_DEL_PROCESO> -Force
```

### Problema 2: Docker no inicia MySQL

**Solución**:
```bash
# Ver logs de error
docker-compose logs mysql

# Recrear contenedor
docker-compose down
docker-compose up -d
```

### Problema 3: Datos no se restauraron

**Solución**:
```bash
# Verificar que el backup esté en el contenedor
docker exec -it vitalapp-mysql ls -lh /tmp/backup.sql

# Restaurar manualmente
docker exec -it vitalapp-mysql bash
mysql -uroot -proot1234 vital_app_db < /tmp/backup.sql
exit
```

### Problema 4: Backend no conecta

**Verificar**:
```bash
# 1. MySQL está corriendo
docker ps

# 2. Puerto está accesible
docker port vitalapp-mysql

# 3. Credenciales correctas en application.yml
# Debe tener:
#   url: jdbc:mysql://localhost:3306/vital_app_db
#   username: root
#   password: root1234
```

---

## 📊 ESTADO FINAL ESPERADO

```
┌────────────────────────────────────────────┐
│     ARQUITECTURA CON DOCKER MYSQL          │
├────────────────────────────────────────────┤
│                                            │
│  ✅ Docker Desktop: Running                │
│      └─ MySQL Container (vitalapp-mysql)  │
│         ├─ Puerto: 3306                    │
│         ├─ Base datos: vital_app_db        │
│         ├─ Usuario: root/root1234          │
│         ├─ 6 rutinas                       │
│         └─ 22 ejercicios                   │
│                                            │
│  ✅ Backend Spring Boot                    │
│      ├─ Puerto: 8080                       │
│      ├─ Profile: mysql                     │
│      └─ Conectado a Docker MySQL           │
│                                            │
│  ✅ Frontend React                         │
│      ├─ Puerto: 5173                       │
│      └─ Consume API                        │
│                                            │
│  ✅ Adminer (Opcional)                     │
│      ├─ Puerto: 8082                       │
│      └─ http://localhost:8082              │
│                                            │
└────────────────────────────────────────────┘
```

---

## 🎯 COMANDOS RÁPIDOS DIARIOS

### Iniciar todo:
```bash
# 1. Docker MySQL
docker-compose up -d

# 2. Backend (en otra terminal)
cd Backend
mvn spring-boot:run -Dspring-boot.run.profiles=mysql

# 3. Frontend (en otra terminal)
cd Frontend
npm run dev
```

### Detener todo:
```bash
# Frontend: Ctrl+C
# Backend: Ctrl+C
# Docker: 
docker-compose down
```

### Ver logs:
```bash
# MySQL logs
docker-compose logs -f mysql

# Backend logs
# Están en la terminal donde corre

# Frontend logs
# Están en la terminal donde corre
```

---

## 📁 BACKUP Y MANTENIMIENTO

### Backup diario:
```bash
# Crear backup
docker exec vitalapp-mysql mysqldump -uroot -proot1234 vital_app_db > backup_$(date +%Y%m%d).sql

# Verificar tamaño
ls -lh backup_*.sql
```

### Limpiar backups antiguos:
```bash
# Mantener solo últimos 7 días
Get-ChildItem backup_*.sql | Where-Object { $_.LastWriteTime -lt (Get-Date).AddDays(-7) } | Remove-Item
```

---

## ✅ CHECKLIST DE MIGRACIÓN

- [ ] **Paso 1**: Backup creado (vital_app_backup_20251016_205825.sql) ✅
- [ ] **Paso 2**: MySQL local detenido (requiere admin)
- [ ] **Paso 3**: Docker Compose iniciado
- [ ] **Paso 4**: Datos restaurados en Docker
- [ ] **Paso 5**: Backend inicia correctamente
- [ ] **Paso 6**: API responde (GET /api/routines)
- [ ] **Paso 7**: Frontend muestra rutinas
- [ ] **Paso 8**: Videos se reproducen
- [ ] **Paso 9**: Adminer accesible (opcional)
- [ ] **Paso 10**: MySQL local deshabilitado en inicio

---

## 🎉 BENEFICIOS DE DOCKER

### ✅ Ventajas que obtienes:

1. **Entorno aislado**: No contamina tu sistema
2. **Reproducible**: Misma configuración en cualquier máquina
3. **Versión específica**: MySQL 8.0 garantizado
4. **Adminer incluido**: Navegador visual en http://localhost:8082
5. **Fácil reset**: `docker-compose down -v` y empiezas de cero
6. **Portabilidad**: Compartir con equipo es fácil
7. **Volúmenes**: Datos persisten en `vital-app_mysqldata`

---

## 📞 PRÓXIMOS PASOS

### Después de completar la migración:

1. **Probar todo el flujo**:
   - Login → Ver rutinas → Reproducir video

2. **Configurar inicio automático**:
   ```bash
   # Docker Compose
   docker-compose up -d
   # Se inicia automáticamente con Docker Desktop
   ```

3. **Deshabilitar MySQL local del inicio**:
   - services.msc
   - MySQL91 → Tipo de inicio: "Manual"

4. **Documentar para el equipo**:
   - Compartir compose.yml
   - Documentar proceso de setup

---

## 📖 DOCUMENTACIÓN RELACIONADA

- `compose.yml` - Configuración de servicios Docker
- `application.yml` - Configuración de Backend
- `DATABASE_VERIFICATION.md` - Verificación de datos
- `DOCKER_VERIFICATION.md` - Guía de Docker
- `MYSQL_LOCAL_VS_DOCKER.md` - Comparación de opciones

---

**¡Sigue estos pasos y tendrás Docker MySQL funcionando!** 🚀

---

*Script generado el 16 de octubre de 2025*
