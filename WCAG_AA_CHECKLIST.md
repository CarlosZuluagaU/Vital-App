# 📋 CHECKLIST WCAG 2.1 AA - Vital App

## 🎯 Objetivo
Asegurar que la aplicación cumple con los estándares WCAG 2.1 nivel AA para accesibilidad web.

**Meta**: No fallos críticos en staging antes de producción.

---

## 📊 CRITERIOS CRÍTICOS (Requeridos para aprobar)

### 1. ✅ Contraste de Color - Texto (4.5:1)
**WCAG 1.4.3 Contraste Mínimo**

#### Cómo verificar:
```bash
# Usar herramienta de contraste
# Chrome DevTools > Elements > Styles > Color picker > Contrast ratio
```

#### Criterios:
- [ ] Texto normal: ratio ≥ 4.5:1
- [ ] Texto grande (18pt o 14pt bold): ratio ≥ 3:1
- [ ] Texto sobre imágenes: ratio ≥ 4.5:1

#### Ejemplos en Vital App:
- Texto principal sobre fondo blanco
- Labels de formularios
- Mensajes de error
- Botones de texto

**✅ Pasa si**: Todos los textos tienen contraste suficiente  
**❌ Falla si**: Algún texto importante no cumple el ratio

---

### 2. ✅ Contraste de Color - Elementos UI (3:1)
**WCAG 1.4.11 Contraste no textual**

#### Criterios:
- [ ] Bordes de botones: ratio ≥ 3:1
- [ ] Íconos: ratio ≥ 3:1
- [ ] Indicadores de foco: ratio ≥ 3:1
- [ ] Gráficos y diagramas: ratio ≥ 3:1

#### Elementos en Vital App:
- Botones de navegación
- Íconos de accesibilidad
- Controles de formulario
- Slider de rutinas

**✅ Pasa si**: Todos los elementos UI son claramente visibles  
**❌ Falla si**: Algún control no es distinguible

---

### 3. ✅ Navegación por Teclado
**WCAG 2.1.1 Teclado**

#### Cómo verificar:
```bash
# Probar con Tab, Shift+Tab, Enter, Space, Flechas
# Sin mouse, completar tareas clave
```

#### Criterios:
- [ ] Todos los elementos interactivos son alcanzables con Tab
- [ ] El orden de tabulación es lógico
- [ ] Enter/Space activan botones y links
- [ ] Esc cierra modales
- [ ] Flechas navegan en listas y sliders
- [ ] No hay trampas de teclado

#### Flujos a probar:
1. Registro de usuario (Tab por todos los campos)
2. Login
3. Navegación por rutinas
4. Inicio de rutina
5. Cambios de configuración de accesibilidad

**✅ Pasa si**: Todas las funciones son accesibles sin mouse  
**❌ Falla si**: Alguna función requiere mouse

---

### 4. ✅ Indicador de Foco Visible
**WCAG 2.4.7 Foco Visible**

#### Criterios:
- [ ] El foco es claramente visible en todos los elementos
- [ ] El indicador de foco tiene contraste ≥ 3:1
- [ ] El foco no desaparece mientras se navega
- [ ] El foco es suficientemente grueso (≥2px)

#### Configuración recomendada (CSS):
```css
*:focus {
  outline: 2px solid #2563eb;
  outline-offset: 2px;
}

*:focus:not(:focus-visible) {
  outline: none;
}

*:focus-visible {
  outline: 2px solid #2563eb;
  outline-offset: 2px;
}
```

**✅ Pasa si**: Siempre se ve dónde está el foco  
**❌ Falla si**: El foco es invisible o confuso

---

### 5. ✅ Tamaño de Objetivos Táctiles (44×44px)
**WCAG 2.5.5 Tamaño del Objetivo**

#### Criterios:
- [ ] Botones: mínimo 44×44px
- [ ] Links: mínimo 44×44px o padding suficiente
- [ ] Checkboxes/radios: mínimo 44×44px (área clickeable)
- [ ] Íconos interactivos: mínimo 44×44px

#### Cómo medir:
```javascript
// Chrome DevTools > Elements > Computed
// Verificar width y height
```

#### Elementos a verificar:
- Botones de navegación (Header)
- Botones de inicio de rutina
- Controles de accesibilidad
- Links en footer

**✅ Pasa si**: Todos los controles son fáciles de tocar  
**❌ Falla si**: Algún botón es < 44×44px

---

## 📊 CRITERIOS ADICIONALES (Recomendados)

### 6. ⚠️ Labels ARIA
**WCAG 4.1.2 Nombre, Función, Valor**

#### Criterios:
- [ ] Todos los botones tienen aria-label o texto visible
- [ ] Formularios tienen labels asociados
- [ ] Íconos tienen aria-label
- [ ] Landmarks tienen roles ARIA (navigation, main, etc.)

```html
<!-- ✅ Correcto -->
<button aria-label="Cerrar modal">×</button>
<label for="email">Email</label>
<input id="email" type="email" />

<!-- ❌ Incorrecto -->
<button>×</button>
<input type="email" placeholder="Email" />
```

---

### 7. ⚠️ Estructura de Encabezados
**WCAG 1.3.1 Info y Relaciones**

#### Criterios:
- [ ] Solo un h1 por página
- [ ] Los encabezados no saltan niveles (h1 → h2 → h3)
- [ ] Los encabezados describen el contenido

```html
<!-- ✅ Correcto -->
<h1>Vital App - Rutinas</h1>
<h2>Rutinas Recomendadas</h2>
<h3>Estiramiento Matutino</h3>

<!-- ❌ Incorrecto -->
<h1>Vital App</h1>
<h3>Rutinas</h3> <!-- Saltó h2 -->
```

---

### 8. ⚠️ Texto Alternativo en Imágenes
**WCAG 1.1.1 Contenido no textual**

#### Criterios:
- [ ] Todas las imágenes tienen alt
- [ ] Imágenes decorativas tienen alt=""
- [ ] Imágenes informativas tienen descripción clara

```html
<!-- ✅ Correcto -->
<img src="exercise.jpg" alt="Mujer haciendo estiramiento de brazos" />
<img src="decoration.png" alt="" /> <!-- Decorativa -->

<!-- ❌ Incorrecto -->
<img src="exercise.jpg" /> <!-- Sin alt -->
<img src="exercise.jpg" alt="imagen" /> <!-- No descriptivo -->
```

---

### 9. ⚠️ Labels en Formularios
**WCAG 3.3.2 Etiquetas o Instrucciones**

#### Criterios:
- [ ] Todos los inputs tienen labels
- [ ] Labels están asociados con for/id
- [ ] Instrucciones claras para campos complejos
- [ ] Mensajes de error son descriptivos

---

### 10. ⚠️ Mensajes de Error Accesibles
**WCAG 3.3.1 Identificación de Errores**

#### Criterios:
- [ ] Errores se anuncian a lectores de pantalla
- [ ] Errores son visualmente claros (color + ícono + texto)
- [ ] Se indica cómo corregir el error

```html
<!-- ✅ Correcto -->
<div role="alert" aria-live="polite">
  <span aria-label="Error">❌</span>
  El email debe ser válido. Ejemplo: usuario@ejemplo.com
</div>
```

---

## 🔍 PROCESO DE VALIDACIÓN

### Fase 1: Preparación (15 min)
1. Instalar extensiones de Chrome:
   - WAVE Evaluation Tool
   - axe DevTools
   - Lighthouse
2. Tener lector de pantalla disponible (NVDA/JAWS/VoiceOver)
3. Preparar checklist impreso

### Fase 2: Pruebas Automatizadas (30 min)
```bash
# 1. Lighthouse Accessibility
# Chrome DevTools > Lighthouse > Accessibility

# 2. axe DevTools
# Chrome DevTools > axe DevTools > Scan All

# 3. WAVE
# Extensión WAVE > Analizar página
```

### Fase 3: Pruebas Manuales (60 min)

#### 3.1. Prueba de Teclado (20 min)
```
1. Desconectar mouse
2. Navegar con Tab por toda la aplicación
3. Completar tareas clave:
   - Registro
   - Login  
   - Ver rutina
   - Iniciar ejercicio
   - Cambiar configuración
```

#### 3.2. Prueba de Contraste (15 min)
```
1. Usar Chrome DevTools color picker
2. Verificar cada texto y elemento UI
3. Documentar elementos que fallan
```

#### 3.3. Prueba de Tamaños (10 min)
```
1. Usar regla de DevTools (Ctrl+Shift+P > Show Rulers)
2. Medir botones y controles
3. Verificar mínimo 44×44px
```

#### 3.4. Prueba con Lector de Pantalla (15 min)
```
1. Activar NVDA (Windows) o VoiceOver (Mac)
2. Navegar por landmarks
3. Verificar que se anuncian labels
4. Probar formularios
```

### Fase 4: Registro de Resultados (15 min)
```typescript
// POST /api/usability/wcag
{
  "version": "1.0",
  "environment": "staging",
  "auditorName": "Tu Nombre",
  "contrastTextPass": true/false,
  "contrastUiPass": true/false,
  "keyboardNavigationPass": true/false,
  "focusVisiblePass": true/false,
  "targetSizePass": true/false,
  "ariaLabelsPass": true/false,
  "headingStructurePass": true/false,
  "altTextPass": true/false,
  "formLabelsPass": true/false,
  "errorMessagesPass": true/false,
  "notes": "Detalles de fallos encontrados..."
}
```

---

## ✅ CRITERIOS DE ACEPTACIÓN

### Para aprobar y pasar a producción:

#### 🔴 **CRÍTICO** (Los 5 primeros deben pasar):
- ✅ Contraste de texto ≥ 4.5:1
- ✅ Contraste UI ≥ 3:1
- ✅ Navegación 100% por teclado
- ✅ Foco visible en todos los elementos
- ✅ Objetivos táctiles ≥ 44×44px

**Si alguno falla → NO PASAR A PRODUCCIÓN**

#### 🟡 **RECOMENDADO** (Deben pasar al menos 4 de 5):
- ⚠️ Labels ARIA correctos
- ⚠️ Estructura de encabezados
- ⚠️ Texto alternativo
- ⚠️ Labels en formularios
- ⚠️ Mensajes de error

**Si menos de 4 pasan → Documentar y planear fixes**

---

## 🛠️ HERRAMIENTAS

### Automáticas:
- **Lighthouse**: Puntaje general de accesibilidad
- **axe DevTools**: Detección automática de issues
- **WAVE**: Visualización de problemas en la página

### Manuales:
- **Keyboard**: Navegación sin mouse
- **Screen Reader**: NVDA (Windows), VoiceOver (Mac), JAWS
- **Contrast Checker**: WebAIM Contrast Checker
- **Color Blindness Simulator**: Chrome extensions

### Código:
- **ESLint Plugin**: eslint-plugin-jsx-a11y
- **React Testing Library**: @testing-library/react
- **Jest-axe**: jest-axe para tests automatizados

---

## 📈 REPORTES

### Generar reporte automático:
```bash
# GET /api/usability/wcag/version/1.0
# Retorna última auditoría de esa versión
```

### Ver métricas generales:
```bash
# GET /api/usability/metrics
# Retorna todas las métricas (SUS + WCAG)
```

---

## 📝 PLANTILLA DE REPORTE

```markdown
# Auditoría WCAG AA - Vital App v1.0

**Fecha**: 2025-10-12
**Auditor**: [Nombre]
**Ambiente**: Staging
**URL**: https://staging.vitalapp.com

## Resultados

### Criterios Críticos
- ✅/❌ Contraste texto: [Detalles]
- ✅/❌ Contraste UI: [Detalles]
- ✅/❌ Navegación teclado: [Detalles]
- ✅/❌ Foco visible: [Detalles]
- ✅/❌ Tamaño objetivos: [Detalles]

### Estado: ✅ APROBADO / ❌ RECHAZADO

### Fallos Críticos
[Listar issues que impiden aprobación]

### Recomendaciones
[Mejoras no críticas]

### Próximos Pasos
[Acciones a tomar]
```

---

## 🎓 RECURSOS ADICIONALES

- **WCAG 2.1**: https://www.w3.org/WAI/WCAG21/quickref/?currentsidebar=%23col_customize&levels=aa
- **WebAIM**: https://webaim.org/resources/contrastchecker/
- **A11y Project**: https://www.a11yproject.com/checklist/
- **MDN Accessibility**: https://developer.mozilla.org/en-US/docs/Web/Accessibility

---

✅ **Meta**: No fallos críticos en staging → Listo para producción
