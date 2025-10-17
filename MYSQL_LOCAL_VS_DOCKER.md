# 🎯 GUÍA: MySQL Local vs Docker - Vital App

**Fecha**: 16 de octubre de 2025  
**Estado Actual**: MySQL Local funcionando ✅

---

## 📊 SITUACIÓN ACTUAL

### ✅ **OPCIÓN ACTIVA: MySQL LOCAL**

Tu sistema **actualmente usa MySQL instalado localmente** en Windows:

```
✅ MySQL Local corriendo (proceso mysqld.exe)
✅ Puerto 3306 ocupado por MySQL local
✅ Base de datos vital_app_db funcionando
✅ 6 rutinas + 22 ejercicios insertados
❌ Docker MySQL NO está corriendo (puerto ocupado)
```

---

## 🔄 DOS OPCIONES DISPONIBLES

### **OPCIÓN 1: MySQL LOCAL** (Actual - ✅ Funcionando)

#### Ventajas:
- ✅ Ya está instalado y configurado
- ✅ Más rápido (sin overhead de Docker)
- ✅ Fácil acceso con MySQL Workbench/HeidiSQL
- ✅ No requiere Docker Desktop corriendo
- ✅ Datos persistentes directamente en disco
- ✅ Menor consumo de recursos

#### Desventajas:
- ⚠️ Solo funciona en tu máquina local
- ⚠️ Difícil de compartir configuración exacta
- ⚠️ Puede tener conflictos con otras bases de datos

#### Configuración Backend:
```yaml
# application.yml - Profile: mysql
spring:
  datasource:
    url: jdbc:mysql://localhost:3306/vital_app_db
    username: root
    password: root1234
```

#### Comando para iniciar Backend:
```bash
cd Backend
mvn spring-boot:run -Dspring-boot.run.profiles=mysql
```

---

### **OPCIÓN 2: MySQL EN DOCKER** (Disponible)

#### Ventajas:
- ✅ Entorno aislado y reproducible
- ✅ Fácil de compartir con el equipo
- ✅ Versión específica de MySQL garantizada
- ✅ Adminer incluido (navegador web de BD)
- ✅ Datos en volumen Docker (fácil backup)
- ✅ No contamina sistema operativo
- ✅ Ideal para desarrollo en equipo

#### Desventajas:
- ⚠️ Requiere Docker Desktop corriendo
- ⚠️ Usa más recursos (contenedor)
- ⚠️ Conflicto si MySQL local está corriendo

#### Configuración Backend:
```yaml
# application.yml - Profile: mysql (misma config)
spring:
  datasource:
    url: jdbc:mysql://localhost:3306/vital_app_db
    username: root
    password: root1234
```

#### Comandos:
```bash
# Iniciar Docker
docker-compose up -d

# Iniciar Backend
cd Backend
mvn spring-boot:run -Dspring-boot.run.profiles=mysql
```

---

## 🎯 ¿CUÁL USAR?

### 📌 **Recomendación por Escenario:**

#### Usa **MySQL LOCAL** si:
- ✅ Solo trabajas tú en el proyecto
- ✅ Ya tienes MySQL instalado
- ✅ Quieres desarrollo más rápido
- ✅ No necesitas Docker para otros servicios
- ✅ **← SITUACIÓN ACTUAL (funcionando)**

#### Usa **MySQL DOCKER** si:
- ✅ Trabajas en equipo
- ✅ Quieres entorno reproducible
- ✅ Planeas desplegar en contenedores
- ✅ Necesitas múltiples versiones de MySQL
- ✅ Quieres Adminer para gestión visual

---

## 🔧 CONFIGURACIÓN ACTUAL

### Estado del Sistema:
```
┌─────────────────────┬──────────┬─────────────────┐
│ Componente          │ Estado   │ Ubicación       │
├─────────────────────┼──────────┼─────────────────┤
│ MySQL Local         │ ✅ ON    │ localhost:3306  │
│ Docker MySQL        │ ❌ OFF   │ N/A             │
│ Base de datos       │ ✅ OK    │ vital_app_db    │
│ Tablas              │ ✅ 11    │ Todas creadas   │
│ Rutinas             │ ✅ 6     │ Con ejercicios  │
│ Ejercicios          │ ✅ 22    │ Con videos      │
└─────────────────────┴──────────┴─────────────────┘
```

### Configuración Backend:
```yaml
# Backend/src/main/resources/application.yml

# Profile MySQL (funciona para LOCAL y DOCKER)
spring:
  config:
    activate:
      on-profile: mysql
  datasource:
    url: jdbc:mysql://localhost:3306/vital_app_db
    username: root
    password: root1234
    driver-class-name: com.mysql.cj.jdbc.Driver
```

---

## 🚀 CÓMO CAMBIAR ENTRE OPCIONES

### **De MySQL LOCAL a DOCKER:**

#### Paso 1: Detener MySQL Local
```bash
# Windows - Detener servicio MySQL
net stop MySQL80

# O desde Servicios de Windows (services.msc)
# Buscar: MySQL80
# Click derecho → Detener
```

#### Paso 2: Hacer Backup de Datos
```bash
# Crear backup antes de cambiar
mysqldump -uroot -proot1234 vital_app_db > backup_vital_app.sql
```

#### Paso 3: Iniciar Docker MySQL
```bash
# Iniciar Docker Compose
docker-compose up -d

# Esperar que MySQL inicie (healthcheck)
docker-compose logs -f mysql
# Espera ver: "ready for connections"
```

#### Paso 4: Restaurar Datos en Docker
```bash
# Copiar backup al contenedor
docker cp backup_vital_app.sql vitalapp-mysql:/tmp/

# Restaurar datos
docker exec -i vitalapp-mysql mysql -uroot -proot1234 vital_app_db < backup_vital_app.sql
```

#### Paso 5: Iniciar Backend
```bash
cd Backend
mvn spring-boot:run -Dspring-boot.run.profiles=mysql
```

---

### **De DOCKER a MySQL LOCAL:**

#### Paso 1: Hacer Backup desde Docker
```bash
docker exec vitalapp-mysql mysqldump -uroot -proot1234 vital_app_db > backup_from_docker.sql
```

#### Paso 2: Detener Docker MySQL
```bash
docker-compose down
```

#### Paso 3: Iniciar MySQL Local
```bash
# Windows
net start MySQL80
```

#### Paso 4: Restaurar Datos
```bash
mysql -uroot -proot1234 vital_app_db < backup_from_docker.sql
```

#### Paso 5: Iniciar Backend
```bash
cd Backend
mvn spring-boot:run -Dspring-boot.run.profiles=mysql
```

---

## 📋 COMANDOS ÚTILES

### MySQL LOCAL:

#### Ver Estado:
```bash
# Windows - Ver servicio
Get-Service MySQL* | Select-Object Name, Status

# Conectar
mysql -uroot -proot1234 vital_app_db

# Ver procesos
Get-Process mysqld
```

#### Iniciar/Detener:
```bash
# Iniciar
net start MySQL80

# Detener
net stop MySQL80

# O desde services.msc
```

### MySQL DOCKER:

#### Ver Estado:
```bash
# Ver contenedores
docker ps

# Ver logs
docker-compose logs -f mysql

# Estado de servicios
docker-compose ps
```

#### Iniciar/Detener:
```bash
# Iniciar
docker-compose up -d

# Detener
docker-compose down

# Detener y eliminar datos
docker-compose down -v
```

#### Conectar:
```bash
# Conectar directamente al contenedor
docker exec -it vitalapp-mysql mysql -uroot -proot1234 vital_app_db

# O usar Adminer en navegador
# http://localhost:8082
```

---

## 🎯 RECOMENDACIÓN PARA TU PROYECTO

### **OPCIÓN RECOMENDADA: MANTENER MySQL LOCAL** ✅

**Razones:**
1. ✅ Ya está funcionando perfectamente
2. ✅ Datos ya insertados y verificados
3. ✅ Más rápido para desarrollo individual
4. ✅ No requiere Docker Desktop corriendo
5. ✅ Backend se conecta sin problemas

### **Cuándo cambiar a Docker:**
- Cuando trabajes con un equipo
- Cuando necesites desplegar en producción
- Cuando quieras entorno 100% reproducible
- Cuando necesites múltiples versiones de MySQL

---

## 🔄 CONFIGURACIÓN HÍBRIDA (Avanzado)

Puedes tener **AMBOS** funcionando en diferentes puertos:

### MySQL Local: Puerto 3306
### MySQL Docker: Puerto 3307

#### Modificar compose.yml:
```yaml
services:
  mysql:
    ports:
      - "3307:3306"  # Puerto externo 3307 → interno 3306
```

#### Configuración Backend para Docker:
```yaml
spring:
  datasource:
    url: jdbc:mysql://localhost:3307/vital_app_db  # Usar 3307
```

**Ventaja:** Puedes desarrollar en local y tener Docker listo para testing.

---

## ✅ VERIFICACIÓN RÁPIDA

### Backend funcionando con MySQL Local:

```bash
# 1. Verificar MySQL Local
mysql -uroot -proot1234 -e "SELECT COUNT(*) FROM vital_app_db.routines;"

# 2. Iniciar Backend
cd Backend
mvn spring-boot:run -Dspring-boot.run.profiles=mysql

# 3. Verificar API
curl http://localhost:8080/api/routines

# 4. Iniciar Frontend
cd Frontend
npm run dev
```

### Resultado Esperado:
```
✅ MySQL Local: 6 rutinas
✅ Backend: API responde
✅ Frontend: Muestra rutinas
✅ Videos: Se reproducen desde Google Drive
```

---

## 📊 COMPARACIÓN RÁPIDA

| Aspecto | MySQL LOCAL | MySQL DOCKER |
|---------|-------------|--------------|
| **Velocidad** | ⚡ Más rápido | 🔄 Overhead mínimo |
| **Recursos** | 💾 Menos RAM | 💾 Más RAM |
| **Setup** | ✅ Ya instalado | ⚙️ Requiere Docker |
| **Portabilidad** | ❌ Solo local | ✅ Reproducible |
| **Backup** | 📁 mysqldump | 📦 Volúmenes |
| **Gestión Visual** | 🔧 Workbench | 🌐 Adminer web |
| **Equipo** | 👤 Individual | 👥 Colaborativo |
| **Producción** | ⚠️ Manual | ✅ Contenedores |

---

## 🎉 CONCLUSIÓN

### **ESTADO ACTUAL: ✅ MySQL LOCAL funcionando**

Tu configuración actual es **perfecta para desarrollo individual**:

```
✅ MySQL Local → Backend → API REST → Frontend → Usuario
   (Puerto 3306)   (8080)    (endpoints)  (5173)
```

**No necesitas cambiar nada** si:
- Solo trabajas tú
- La BD está funcionando
- No planeas desplegar pronto

**Considera Docker** cuando:
- Trabajes en equipo
- Necesites entorno reproducible
- Vayas a desplegar en contenedores

---

## 🚀 PRÓXIMO PASO RECOMENDADO

**Mantén MySQL Local** y simplemente:

```bash
# 1. Verificar que funciona
mysql -uroot -proot1234 vital_app_db -e "SELECT COUNT(*) FROM routines;"

# 2. Iniciar Backend
cd Backend
mvn spring-boot:run -Dspring-boot.run.profiles=mysql

# 3. Iniciar Frontend
cd Frontend
npm run dev

# 4. ¡Probar la aplicación!
# http://localhost:5173
```

---

**¡Tu configuración actual con MySQL Local es excelente para desarrollo!** 🎯

---

*Documento creado el 16 de octubre de 2025*
