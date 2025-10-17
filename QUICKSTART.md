# 🚀 QUICKSTART - Sistema SUS y WCAG AA

## ✅ Instalación Completada

Las dependencias del frontend ya están instaladas y el sistema está listo para usar.

---

## 📋 LO QUE TIENES AHORA

### Backend (Spring Boot) ✅
- ✅ **SusResponseEntity** - Almacena respuestas SUS con cálculo automático
- ✅ **WcagAuditEntity** - Registra auditorías WCAG AA
- ✅ **UsabilityController** - 11 endpoints REST
- ✅ **Repositories** - Queries personalizados para métricas

### Frontend (React + TypeScript) ✅
- ✅ **SUSQuestionnaire.tsx** - Componente completo del cuestionario
- ✅ **Alert.tsx** - Componente mejorado con tipos (success/warning/error)
- ✅ **Ruta configurada** - `/sus-questionnaire`
- ✅ **Dependencias instaladas** - React, TypeScript, Tailwind

### Documentación ✅
- ✅ **SUS_IMPLEMENTATION_GUIDE.md** - Guía completa para aplicar SUS
- ✅ **WCAG_AA_CHECKLIST.md** - Checklist de 10 criterios
- ✅ **USABILITY_EXECUTIVE_SUMMARY.md** - Resumen ejecutivo

---

## 🎯 CÓMO PROBAR EL SISTEMA

### Opción A: Modo Desarrollo (Recomendado)

#### 1. Iniciar Backend
```bash
cd Backend
mvn spring-boot:run
```
**Espera a ver**: `Started VitalAppApplication in X seconds`

#### 2. Iniciar Frontend (en otra terminal)
```bash
cd Frontend
npm run dev
```
**Espera a ver**: `Local: http://localhost:5173/`

#### 3. Probar el Cuestionario
1. Abre: `http://localhost:5173`
2. Inicia sesión con un usuario existente
3. Navega a: `http://localhost:5173/sus-questionnaire`
4. Completa las 10 preguntas
5. ¡Ve tu puntaje SUS!

---

### Opción B: Build de Producción

#### 1. Compilar Frontend
```bash
cd Frontend
npm run build
```

#### 2. Preview
```bash
npm run preview
```

---

## 📊 ENDPOINTS DISPONIBLES

### Backend (http://localhost:8080)

#### SUS:
```bash
# Enviar respuesta SUS
POST /api/usability/sus
Content-Type: application/json
Authorization: Bearer <token>

{
  "q1Frequency": 5,
  "q2Complexity": 2,
  "q3Ease": 5,
  "q4SupportNeeded": 1,
  "q5Integration": 4,
  "q6Inconsistency": 2,
  "q7LearningSpeed": 5,
  "q8Cumbersome": 1,
  "q9Confidence": 5,
  "q10LearningDifficulty": 1,
  "version": "1.0",
  "environment": "staging",
  "sessionDurationMinutes": 10,
  "comments": "Muy fácil de usar"
}

# Ver promedio SUS
GET /api/usability/sus/average

# Ver mis respuestas
GET /api/usability/sus/my-responses
```

#### WCAG:
```bash
# Registrar auditoría
POST /api/usability/wcag

# Ver última auditoría
GET /api/usability/wcag/latest

# Ver auditorías con fallos críticos
GET /api/usability/wcag/critical-issues
```

#### Métricas:
```bash
# Dashboard completo
GET /api/usability/metrics

# Por versión
GET /api/usability/metrics?version=1.0
```

---

## 🎯 CRITERIOS DE ÉXITO

### ✅ Meta SUS
```
Objetivo: Promedio ≥ 75 puntos
Usuarios: Mínimo 5
```

### ✅ Meta WCAG AA
```
Objetivo: 0 fallos críticos
Criterios críticos:
1. Contraste texto ≥ 4.5:1
2. Contraste UI ≥ 3:1
3. Navegación por teclado completa
4. Foco visible siempre
5. Objetivos táctiles ≥ 44×44px
```

---

## 🐛 TROUBLESHOOTING

### Problema: Backend no inicia
```bash
# Verificar que tienes Java 17+
java -version

# Limpiar y recompilar
cd Backend
mvn clean install
mvn spring-boot:run
```

### Problema: Frontend no compila
```bash
cd Frontend

# Reinstalar dependencias
rm -rf node_modules package-lock.json
npm install

# Verificar versión de Node (necesitas 18+)
node -v
```

### Problema: Error de CORS
Verifica que en `Backend/src/main/resources/application.yml` tengas:
```yaml
spring:
  web:
    cors:
      allowed-origins: "http://localhost:5173"
```

### Problema: Token no válido
```bash
# El cuestionario requiere autenticación
# Asegúrate de:
1. Iniciar sesión primero
2. Tener un token válido en localStorage
3. El backend esté corriendo
```

---

## 📝 PRÓXIMOS PASOS

### 1. Ejecutar Piloto SUS (1-2 semanas)
- [ ] Reclutar ≥5 usuarios (adultos mayores)
- [ ] Programar sesiones de 30-45 min
- [ ] Aplicar cuestionario
- [ ] Analizar resultados
- [ ] Validar meta ≥75

**Ver**: `SUS_IMPLEMENTATION_GUIDE.md`

### 2. Auditoría WCAG AA (1 día)
- [ ] Instalar herramientas (Lighthouse, axe, WAVE)
- [ ] Ejecutar pruebas automatizadas
- [ ] Completar pruebas manuales
- [ ] Registrar auditoría
- [ ] Validar 0 fallos críticos

**Ver**: `WCAG_AA_CHECKLIST.md`

### 3. Dashboard de Métricas (Pendiente)
- [ ] Crear página de administración
- [ ] Gráficos de tendencias
- [ ] Exportación de reportes
- [ ] Alertas automáticas

---

## 📚 DOCUMENTACIÓN

| Archivo | Descripción |
|---------|-------------|
| `SUS_IMPLEMENTATION_GUIDE.md` | Guía completa para aplicar SUS |
| `WCAG_AA_CHECKLIST.md` | Checklist de 10 criterios WCAG |
| `USABILITY_EXECUTIVE_SUMMARY.md` | Resumen ejecutivo completo |
| `QUICKSTART.md` | Esta guía de inicio rápido |

---

## ✅ CHECKLIST DE VERIFICACIÓN

Antes de ejecutar el piloto, verifica:

### Backend:
- [ ] Backend compila sin errores
- [ ] Base de datos está corriendo
- [ ] Endpoints responden correctamente
- [ ] JWT authentication funciona

### Frontend:
- [ ] Frontend compila sin errores
- [ ] Ruta `/sus-questionnaire` accesible
- [ ] Componente renderiza correctamente
- [ ] Envío a backend funciona

### Accesibilidad:
- [ ] Navegación por teclado funciona
- [ ] Botones tienen tamaño ≥44px
- [ ] Indicadores de foco visibles
- [ ] Contraste de colores adecuado

---

## 🎉 ¡SISTEMA LISTO!

Tu sistema de medición de usabilidad y accesibilidad está **completamente funcional**. 

**Siguiente paso**: Ejecutar `mvn spring-boot:run` en Backend y `npm run dev` en Frontend para probarlo.

---

## 💡 AYUDA

¿Problemas? Revisa:
1. `USABILITY_EXECUTIVE_SUMMARY.md` - Resumen completo
2. Logs del backend: `Backend/logs/`
3. Console del navegador (F12)
4. Este archivo de troubleshooting

**¡Éxito con el piloto!** 🚀
