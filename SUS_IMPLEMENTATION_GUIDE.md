# 📊 SUS (System Usability Scale) - Guía de Implementación

## 🎯 Objetivo
Medir la usabilidad de Vital App con usuarios reales mediante el cuestionario estándar SUS.

**Meta**: Puntaje SUS ≥ 75 (considerado "Bueno" o superior)

---

## 📖 ¿Qué es SUS?

**System Usability Scale (SUS)** es un cuestionario estándar de la industria para medir la usabilidad percibida de un sistema. Consiste en:

- **10 preguntas** con escala Likert (1-5)
- **Puntaje final**: 0-100
- **Interpretación**:
  - **85-100**: A - Excelente
  - **75-84**: B - Bueno ✅ (Meta alcanzada)
  - **70-74**: C - Aceptable
  - **50-69**: D - Pobre
  - **0-49**: F - Crítico

---

## 👥 REQUISITOS PREVIOS

### Para el Piloto (≥5 usuarios):
- ✅ Mínimo **5 usuarios** (recomendado: 8-10)
- ✅ Usuarios representativos del público objetivo (adultos mayores 55+)
- ✅ Aplicación en ambiente **staging** o **producción**
- ✅ Backend y frontend funcionando correctamente
- ✅ Usuarios ya registrados en la aplicación

---

## 🚀 PROCESO DE APLICACIÓN

### Fase 1: Preparación (1 día antes)

#### 1.1. Configurar Backend
```bash
# Verificar que el backend esté corriendo
cd Backend
mvn spring-boot:run

# Verificar endpoints:
# POST /api/usability/sus
# GET /api/usability/sus/average
# GET /api/usability/metrics
```

#### 1.2. Preparar Usuarios
```sql
-- Crear usuarios de prueba si es necesario
-- O coordinar con usuarios reales
```

#### 1.3. Documentos a preparar:
- [ ] Consentimiento informado
- [ ] Guía de tareas a realizar
- [ ] Checklist de observación
- [ ] Cuestionario SUS impreso (backup)

---

### Fase 2: Sesión de Usuario (30-45 min por usuario)

#### 2.1. Introducción (5 min)
```
"Gracias por participar en esta prueba de usabilidad.
Vamos a pedirte que uses la aplicación Vital App por unos minutos
y luego respondas un cuestionario sobre tu experiencia.

No hay respuestas correctas o incorrectas.
Queremos saber tu opinión honesta para mejorar la aplicación."
```

#### 2.2. Tareas a Realizar (15-20 min)

**Lista de tareas para Vital App:**

1. **Registro/Login** (si aplica)
   - Crear cuenta nueva
   - O iniciar sesión

2. **Explorar Rutinas**
   - Navegar por las rutinas disponibles
   - Ver detalles de una rutina

3. **Iniciar una Rutina**
   - Seleccionar una rutina
   - Iniciar los ejercicios
   - Pausar/reanudar

4. **Configuración de Accesibilidad**
   - Cambiar tamaño de fuente
   - Activar alto contraste
   - Probar navegación por teclado

5. **Ver Resumen Semanal**
   - Acceder al dashboard
   - Ver progreso

**Instrucciones al usuario:**
- "Piensa en voz alta mientras usas la aplicación"
- "No hay límite de tiempo"
- "Pregunta si necesitas ayuda"

#### 2.3. Aplicar Cuestionario SUS (5-10 min)

**Opción A: Cuestionario Digital (Recomendado)**
```typescript
// Navegar a: http://localhost:5173/sus-questionnaire
// El usuario responde las 10 preguntas
// El sistema calcula automáticamente el puntaje
```

**Opción B: Cuestionario en Papel**
```
[Usar formato impreso del cuestionario]
[Ingresar manualmente después]
```

#### 2.4. Entrevista Final (5-10 min)
```
Preguntas adicionales:
1. ¿Qué te gustó más de la aplicación?
2. ¿Qué te resultó más difícil?
3. ¿Cambiarías algo?
4. ¿Recomendarías esta app a otros?
```

---

## 📋 CUESTIONARIO SUS - 10 PREGUNTAS

### Escala Likert:
1. Totalmente en desacuerdo
2. En desacuerdo
3. Neutral
4. De acuerdo
5. Totalmente de acuerdo

### Preguntas:

1. **Creo que me gustaría utilizar esta aplicación con frecuencia** _(Positiva)_
2. **Encontré la aplicación innecesariamente compleja** _(Negativa)_
3. **Pensé que la aplicación era fácil de usar** _(Positiva)_
4. **Creo que necesitaría ayuda de una persona con conocimientos técnicos para usar esta aplicación** _(Negativa)_
5. **Encontré que las diversas funciones de esta aplicación estaban bien integradas** _(Positiva)_
6. **Pensé que había demasiada inconsistencia en esta aplicación** _(Negativa)_
7. **Imagino que la mayoría de las personas aprenderían a usar esta aplicación muy rápidamente** _(Positiva)_
8. **Encontré la aplicación muy difícil de usar** _(Negativa)_
9. **Me sentí muy seguro/a usando la aplicación** _(Positiva)_
10. **Necesité aprender muchas cosas antes de poder seguir utilizando esta aplicación** _(Negativa)_

---

## 🧮 CÁLCULO DEL PUNTAJE SUS

### Fórmula:

```typescript
// 1. Preguntas impares (1,3,5,7,9) - Positivas
//    Contribución = (respuesta - 1)
const oddSum = (q1 - 1) + (q3 - 1) + (q5 - 1) + (q7 - 1) + (q9 - 1);

// 2. Preguntas pares (2,4,6,8,10) - Negativas
//    Contribución = (5 - respuesta)
const evenSum = (5 - q2) + (5 - q4) + (5 - q6) + (5 - q8) + (5 - q10);

// 3. Puntaje SUS = (suma total) × 2.5
const susScore = (oddSum + evenSum) * 2.5;
```

### Ejemplo:
```
Respuestas: [4, 2, 5, 1, 4, 2, 5, 1, 4, 2]

Impares: (4-1) + (5-1) + (4-1) + (5-1) + (4-1) = 3+4+3+4+3 = 17
Pares:   (5-2) + (5-1) + (5-2) + (5-1) + (5-2) = 3+4+3+4+3 = 17

Puntaje SUS = (17 + 17) × 2.5 = 85 puntos → Excelente (A)
```

---

## 📊 INTERPRETACIÓN DE RESULTADOS

### Por Usuario Individual:

| Puntaje | Grado | Interpretación | Acción |
|---------|-------|----------------|--------|
| 85-100  | A     | Excelente      | ✅ Mantener características |
| 75-84   | B     | Bueno          | ✅ Meta alcanzada, optimizar |
| 70-74   | C     | Aceptable      | ⚠️ Necesita mejoras |
| 50-69   | D     | Pobre          | 🔴 Requiere rediseño |
| 0-49    | F     | Crítico        | 🔴 Rediseño urgente |

### Para el Piloto (≥5 usuarios):

```typescript
// Obtener promedio
GET /api/usability/sus/average

// Ejemplo de resultados:
Usuario 1: 82 puntos (B - Bueno)
Usuario 2: 77 puntos (B - Bueno)
Usuario 3: 68 puntos (D - Pobre)
Usuario 4: 85 puntos (A - Excelente)
Usuario 5: 75 puntos (B - Bueno)

Promedio: 77.4 puntos → ✅ META ALCANZADA
```

### Criterios de Éxito:
- ✅ **Promedio ≥ 75**: Meta alcanzada, piloto exitoso
- ⚠️ **Promedio 70-74**: Cerca de la meta, mejoras menores
- 🔴 **Promedio < 70**: No cumple meta, mejoras críticas

---

## 📈 REGISTRO Y SEGUIMIENTO

### Guardar Resultados (Automático):
```typescript
// El componente SUSQuestionnaire.tsx automáticamente:
// 1. Calcula el puntaje
// 2. Envía al backend (POST /api/usability/sus)
// 3. Almacena en base de datos
// 4. Muestra resultado al usuario
```

### Ver Métricas:
```bash
# Promedio general
GET http://localhost:8080/api/usability/sus/average

# Respuestas de un usuario
GET http://localhost:8080/api/usability/sus/my-responses

# Respuestas por versión
GET http://localhost:8080/api/usability/sus/version/1.0

# Respuestas bajo la meta (<75)
GET http://localhost:8080/api/usability/sus/below-target

# Dashboard completo
GET http://localhost:8080/api/usability/metrics
```

---

## 🎯 ACCIONES SEGÚN RESULTADOS

### Si el promedio es ≥ 75 ✅
```markdown
1. ✅ Celebrar el logro con el equipo
2. 📊 Documentar características exitosas
3. 📢 Comunicar resultados a stakeholders
4. 🚀 Proceder con lanzamiento
5. 📈 Establecer baseline para futuras versiones
```

### Si el promedio es < 75 🔴
```markdown
1. 📊 Analizar respuestas individuales
2. 🔍 Identificar preguntas con puntajes bajos
3. 🗣️ Revisar comentarios de usuarios
4. 🎯 Priorizar mejoras:
   - Pregunta 2: ¿Complejidad?
   - Pregunta 4: ¿Necesita ayuda técnica?
   - Pregunta 6: ¿Inconsistencias?
   - Pregunta 8: ¿Dificultad?
5. 🔄 Implementar cambios
6. 🧪 Ejecutar nuevo piloto
```

### Análisis por Pregunta:

```typescript
// Si una pregunta específica tiene promedio bajo:

Pregunta 2 alta (compleja) → Simplificar UI
Pregunta 4 alta (necesita ayuda) → Mejorar onboarding
Pregunta 6 alta (inconsistencia) → Estandarizar diseño
Pregunta 8 alta (difícil) → Rediseñar flujos críticos
Pregunta 10 alta (mucho aprendizaje) → Tutorial interactivo
```

---

## 📝 PLANTILLA DE REPORTE

```markdown
# Reporte SUS - Vital App Piloto

**Fecha**: [Fecha]
**Versión**: v1.0
**Ambiente**: Staging
**Usuarios**: [Número]

## Resultados Generales

- **Puntaje Promedio**: [XX.X] puntos
- **Grado**: [A/B/C/D/F]
- **Meta Alcanzada**: ✅ SÍ / ❌ NO (requiere ≥75)
- **Rango**: [Mínimo] - [Máximo]

## Desglose Individual

| Usuario | Puntaje | Grado | Comentarios |
|---------|---------|-------|-------------|
| 1       | XX      | X     | ...         |
| 2       | XX      | X     | ...         |
| ...     | ...     | ...   | ...         |

## Análisis por Pregunta

| # | Pregunta | Promedio | Análisis |
|---|----------|----------|----------|
| 1 | Uso frecuente | X.X | ... |
| 2 | Complejidad | X.X | ... |
| ... | ... | ... | ... |

## Fortalezas Identificadas
- [Característica 1]
- [Característica 2]

## Áreas de Mejora
- [Problema 1] → [Acción propuesta]
- [Problema 2] → [Acción propuesta]

## Comentarios Destacados
> "[Cita de usuario]"

## Próximos Pasos
1. [Acción 1]
2. [Acción 2]

## Conclusión
[Resumen ejecutivo]
```

---

## 🔧 TROUBLESHOOTING

### Problema: El usuario no puede acceder al cuestionario
```bash
# Verificar que está autenticado
# Verificar endpoint: POST /api/usability/sus
# Verificar CORS si es desde frontend
```

### Problema: El puntaje no se calcula correctamente
```typescript
// Verificar que todas las 10 respuestas estén presentes
// Verificar que los valores sean 1-5
// Revisar lógica de cálculo en backend
```

### Problema: No se guardan las respuestas
```bash
# Verificar conexión a base de datos
# Verificar que el usuario exista
# Revisar logs del backend
```

---

## 📚 RECURSOS

### Artículos:
- **SUS Original**: [John Brooke (1986)](https://www.usability.gov/how-to-and-tools/methods/system-usability-scale.html)
- **Interpretación**: [Bangor et al. (2008)](https://uxpajournal.org/sus-a-retrospective/)
- **Best Practices**: [Nielsen Norman Group](https://www.nngroup.com/articles/usability-testing-101/)

### Herramientas:
- **SUS Calculator**: https://www.usability.gov/how-to-and-tools/resources/templates/system-usability-scale-sus.html
- **Online SUS**: https://www.ueq-online.org/

---

## ✅ CHECKLIST DE EJECUCIÓN

### Antes del Piloto:
- [ ] Backend funcionando
- [ ] Frontend funcionando
- [ ] Usuarios registrados
- [ ] Cuestionario probado
- [ ] Consentimientos preparados
- [ ] Tareas definidas

### Durante las Sesiones:
- [ ] Grabar sesión (con permiso)
- [ ] Tomar notas de observación
- [ ] Aplicar cuestionario SUS
- [ ] Hacer entrevista final
- [ ] Agradecer participación

### Después del Piloto:
- [ ] Calcular puntajes
- [ ] Analizar resultados
- [ ] Generar reporte
- [ ] Presentar a stakeholders
- [ ] Planear acciones

---

✅ **Meta**: Puntaje SUS ≥ 75 con ≥5 usuarios → Usabilidad validada
