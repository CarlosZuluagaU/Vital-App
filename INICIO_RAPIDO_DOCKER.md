# 🚀 INICIO RÁPIDO - MIGRACIÓN A DOCKER

## ⚡ OPCIÓN RÁPIDA: USAR SCRIPT AUTOMÁTICO

### **Ejecuta el script como Administrador:**

1. **Abre PowerShell como Administrador**:
   ```
   Click derecho en menú Inicio → "Terminal (Admin)"
   ```

2. **Navega al proyecto**:
   ```powershell
   cd D:\Programacion\Vital-App
   ```

3. **Ejecuta el script**:
   ```powershell
   .\migracion_docker.ps1
   ```

**El script hará TODO automáticamente:**
- ✅ Detener MySQL local
- ✅ Liberar puerto 3306
- ✅ Iniciar Docker MySQL
- ✅ Restaurar datos del backup
- ✅ Verificar que funciona

---

## 📝 OPCIÓN MANUAL: PASO A PASO

### **Si prefieres hacerlo manualmente:**

#### 1. Detener MySQL Local (Como Admin)
```powershell
Stop-Service -Name MySQL91 -Force
```

#### 2. Iniciar Docker
```bash
cd D:\Programacion\Vital-App
docker-compose up -d
```

#### 3. Restaurar Datos
```bash
# Copiar backup
docker cp vital_app_backup_20251016_205825.sql vitalapp-mysql:/tmp/backup.sql

# Restaurar
docker exec -i vitalapp-mysql mysql -uroot -proot1234 vital_app_db < vital_app_backup_20251016_205825.sql
```

#### 4. Verificar
```bash
docker exec -it vitalapp-mysql mysql -uroot -proot1234 vital_app_db -e "SELECT COUNT(*) FROM routines;"
```

---

## ✅ DESPUÉS DE LA MIGRACIÓN

### Iniciar Backend:
```bash
cd Backend
mvn spring-boot:run -Dspring-boot.run.profiles=mysql
```

### Iniciar Frontend:
```bash
cd Frontend
npm run dev
```

### Abrir aplicación:
```
http://localhost:5173
```

---

## 📚 DOCUMENTACIÓN COMPLETA

Ver `MIGRACION_A_DOCKER.md` para:
- Troubleshooting detallado
- Comandos de mantenimiento
- Backup y restauración
- Configuración avanzada

---

**¡Usa el script automático para migrar en 2 minutos!** 🚀
