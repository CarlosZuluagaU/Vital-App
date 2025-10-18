# 🚀 COMANDOS CORRECTOS PARA INICIAR VITAL APP

## ⚠️ PROBLEMA DETECTADO

El comando que intentaste usar tiene un error de sintaxis en **PowerShell**:

```powershell
# ❌ INCORRECTO (no funciona en PowerShell):
mvn spring-boot:run -Dspring-boot.run.profiles=docker
```

**Error:** PowerShell interpreta el `-D` como un parámetro de PowerShell, no de Maven.

---

## ✅ SOLUCIÓN: USA COMILLAS

```powershell
# ✅ CORRECTO (funciona en PowerShell):
mvn spring-boot:run "-Dspring-boot.run.profiles=docker"
```

**Explicación:** Las comillas `"` hacen que PowerShell pase el parámetro completo a Maven.

---

## 📋 PASOS CORRECTOS PARA INICIAR TODO

### **1. Docker** (en carpeta Vital-App):
```powershell
docker-compose up -d
```

### **2. Backend** (en carpeta Backend):
```powershell
cd Backend
mvn spring-boot:run "-Dspring-boot.run.profiles=docker"
```

⏳ Espera ver: `Started VitalAppApplication in X seconds`

### **3. Frontend** (en carpeta Frontend, terminal nueva):
```powershell
cd Frontend
npm run dev
```

### **4. Navegador:**
```
http://localhost:5173
```

---

## 🎯 COMANDO ÚNICO (TODO EN UNO)

Si estás en la carpeta `Vital-App`:

```powershell
# Iniciar Docker
docker-compose up -d

# Iniciar Backend (en nueva terminal)
cd Backend; mvn spring-boot:run "-Dspring-boot.run.profiles=docker"

# Iniciar Frontend (en otra terminal nueva)
cd Frontend; npm run dev
```

---

## 🔍 VERIFICAR QUE BACKEND FUNCIONA

Después de 1-2 minutos, ejecuta:

```powershell
Invoke-RestMethod -Uri "http://localhost:8080/api/routines"
```

**Debe retornar:** JSON con 6 rutinas

O en navegador:
```
http://localhost:8080/api/routines
```

---

## ⚡ ALTERNATIVA: SIN PERFIL ESPECÍFICO

Si solo quieres probar rápido (usa H2 en memoria, no Docker):

```powershell
cd Backend
mvn spring-boot:run
```

Pero para usar **Docker MySQL** (recomendado), usa:

```powershell
mvn spring-boot:run "-Dspring-boot.run.profiles=docker"
```

---

## 🐛 OTROS PERFILES DISPONIBLES

### Profile: `docker` (MySQL Docker puerto 3307)
```powershell
mvn spring-boot:run "-Dspring-boot.run.profiles=docker"
```

### Profile: `mysql` (MySQL local puerto 3306)
```powershell
mvn spring-boot:run "-Dspring-boot.run.profiles=mysql"
```

### Profile: `default` (H2 en memoria)
```powershell
mvn spring-boot:run
```

---

## 📊 RESUMEN DE COMANDOS

| Acción | Comando |
|--------|---------|
| **Iniciar Docker** | `docker-compose up -d` |
| **Backend Docker** | `mvn spring-boot:run "-Dspring-boot.run.profiles=docker"` |
| **Frontend** | `npm run dev` |
| **Ver contenedores** | `docker ps` |
| **Ver logs Backend** | (están en la terminal donde corre) |
| **Probar API** | `curl http://localhost:8080/api/routines` |

---

## 💡 TIP: COPIA EL COMANDO COMPLETO

Para evitar errores, **copia y pega** exactamente:

```powershell
mvn spring-boot:run "-Dspring-boot.run.profiles=docker"
```

Asegúrate de incluir las comillas `"` alrededor del parámetro `-D`.

---

## ✅ ESTADO ACTUAL

Según la última ejecución:
- ✅ Docker: Corriendo (MySQL en puerto 3307)
- ⏳ Backend: Compilando/iniciando (espera 1-2 minutos)
- ⏳ Frontend: Pendiente

---

## 🎉 CUANDO TODO ESTÉ LISTO

Verás:

**Backend:**
```
Started VitalAppApplication in 45.123 seconds
Tomcat started on port 8080
```

**Frontend:**
```
VITE v5.x.x ready in XXX ms
➜ Local: http://localhost:5173/
```

**Navegador:**
```
http://localhost:5173 → Aplicación funcionando! 🎉
```

---

**Última actualización**: 17 de octubre de 2025  
**Problema resuelto**: Sintaxis de PowerShell para parámetros Maven
