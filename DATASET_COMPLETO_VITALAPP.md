# 📊 DATASET COMPLETO - VITAL APP

**Fecha:** 18 de Octubre, 2025  
**Base de Datos:** vital_app_db  
**Versión:** 1.3 (Docker)

---

## 📋 TABLA DE CONTENIDO

1. [Categorías](#categorías-5-registros)
2. [Intensidades](#intensidades-4-registros)
3. [Tipos de Ejercicio](#tipos-de-ejercicio-5-registros)
4. [Ejercicios](#ejercicios-22-registros)
5. [Rutinas](#rutinas-7-registros)
6. [Relaciones Rutina-Ejercicio](#relaciones-rutina-ejercicio-30-registros)
7. [Archivos SQL](#archivos-sql-disponibles)
8. [Estructura de Directorios](#estructura-de-directorios)

---

## 📁 CATEGORÍAS (5 registros)

```sql
INSERT INTO categories (id, name, description) VALUES 
(1, 'Fortalecimiento', 'Ejercicios para mejorar la fuerza muscular de forma segura'),
(2, 'Equilibrio', 'Ejercicios para mejorar la estabilidad y prevenir caídas'),
(3, 'Flexibilidad', 'Ejercicios para mantener y mejorar la movilidad articular'),
(4, 'Cardio', 'Ejercicios cardiovasculares de bajo impacto'),
(5, 'Movilidad', 'Ejercicios para mejorar el rango de movimiento');
```

| ID | Categoría | Descripción |
|----|-----------|-------------|
| 1 | Fortalecimiento | Ejercicios para mejorar la fuerza muscular de forma segura |
| 2 | Equilibrio | Ejercicios para mejorar la estabilidad y prevenir caídas |
| 3 | Flexibilidad | Ejercicios para mantener y mejorar la movilidad articular |
| 4 | Cardio | Ejercicios cardiovasculares de bajo impacto |
| 5 | Movilidad | Ejercicios para mejorar el rango de movimiento |

---

## ⚡ INTENSIDADES (4 registros)

```sql
INSERT INTO intensities (id, name, level) VALUES 
(1, 'Muy Suave', 1),
(2, 'Suave', 2), 
(3, 'Moderado', 3),
(4, 'Intermedio', 4);
```

| ID | Intensidad | Nivel |
|----|------------|-------|
| 1 | Muy Suave | 1 |
| 2 | Suave | 2 |
| 3 | Moderado | 3 |
| 4 | Intermedio | 4 |

---

## 🎯 TIPOS DE EJERCICIO (5 registros)

```sql
INSERT INTO exercise_types (id, name, description, location_type) VALUES
(1, 'Ejercicio Sentado', 'Ejercicios que se realizan desde una silla', 'HOME'),
(2, 'Ejercicio de Pie', 'Ejercicios que se realizan de pie con apoyo', 'HOME'),
(3, 'Con Implementos', 'Ejercicios que requieren bandas elásticas o pesas', 'HOME'),
(4, 'Funcional', 'Ejercicios que simulan movimientos de la vida diaria', 'HOME'),
(5, 'Resistencia', 'Ejercicios que mejoran la resistencia muscular', 'HOME');
```

| ID | Tipo | Descripción | Ubicación |
|----|------|-------------|-----------|
| 1 | Ejercicio Sentado | Desde una silla | HOME |
| 2 | Ejercicio de Pie | De pie con apoyo | HOME |
| 3 | Con Implementos | Requiere bandas/pesas | HOME |
| 4 | Funcional | Movimientos diarios | HOME |
| 5 | Resistencia | Mejora resistencia | HOME |

---

## 💪 EJERCICIOS (22 registros)

### Ejercicios de Fortalecimiento

#### 1. **Abductores**
- **Categoría:** Fortalecimiento
- **Intensidad:** Suave (2)
- **Tipo:** Ejercicio Sentado
- **Repeticiones:** 10
- **Series:** 2
- **Descripción:** Ejercicio para fortalecer los músculos abductores de la cadera
- **Instrucciones:** 
  1. Siéntate en una silla con respaldo recto
  2. Coloca los pies firmes en el suelo
  3. Separa lentamente las rodillas hacia los lados
  4. Mantén 3 segundos y regresa lentamente
- **Beneficios:** Fortalece músculos de cadera, mejora estabilidad pélvica
- **Video:** `videos/ejercicios/abductores.mp4`

#### 2. **Extensión de Cuadríceps**
- **Categoría:** Fortalecimiento
- **Intensidad:** Suave (2)
- **Tipo:** Ejercicio Sentado
- **Repeticiones:** 10
- **Series:** 2
- **Descripción:** Fortalece los músculos cuádriceps
- **Beneficios:** Fortalece cuádriceps, mejora capacidad para levantarse
- **Video:** `videos/ejercicios/extension_cuadriceps.mp4`

#### 3. **Elevación de Brazos y Hombros**
- **Categoría:** Fortalecimiento
- **Intensidad:** Moderado (3)
- **Tipo:** Ejercicio de Pie
- **Repeticiones:** 10
- **Series:** 2
- **Descripción:** Fortalece deltoides y mejora movilidad del hombro
- **Video:** `videos/ejercicios/elevacion_brazos_hombros.mp4`

#### 4. **Elevación de Rodilla (Sentado)**
- **Categoría:** Fortalecimiento
- **Intensidad:** Moderado (3)
- **Tipo:** Ejercicio Sentado
- **Repeticiones:** 10
- **Series:** 2
- **Descripción:** Fortalece flexores de cadera y core
- **Video:** `videos/ejercicios/elevacion_rodilla_sentado.mp4`

#### 5. **Elevación de Talones y Puntas**
- **Categoría:** Fortalecimiento
- **Intensidad:** Moderado (3)
- **Tipo:** Ejercicio de Pie
- **Repeticiones:** 15
- **Series:** 2
- **Descripción:** Fortalece pantorrillas y músculos del pie
- **Video:** `videos/ejercicios/elevacion_talones_puntas.mp4`

#### 6. **Elevación Lateral de Pierna**
- **Categoría:** Fortalecimiento
- **Intensidad:** Moderado (3)
- **Tipo:** Ejercicio de Pie
- **Repeticiones:** 10
- **Series:** 2
- **Descripción:** Fortalece abductores de cadera
- **Video:** `videos/ejercicios/elevacion_lateral_pierna.mp4`

#### 7. **Flexiones en la Pared (Wall Push-up)**
- **Categoría:** Fortalecimiento
- **Intensidad:** Moderado (3)
- **Tipo:** Ejercicio de Pie
- **Repeticiones:** 8
- **Series:** 2
- **Descripción:** Adaptación segura de flexiones tradicionales
- **Video:** `videos/ejercicios/flexiones_pared_wall_push_up.mp4`

#### 8. **Sentarse y Levantarse de una Silla**
- **Categoría:** Fortalecimiento
- **Intensidad:** Moderado (3)
- **Tipo:** Funcional
- **Repeticiones:** 8
- **Series:** 2
- **Descripción:** Ejercicio funcional esencial
- **Video:** `videos/ejercicios/sentarse_levantarse_silla_chair_squat.mp4`

#### 9. **Remo con Banda Elástica**
- **Categoría:** Fortalecimiento
- **Intensidad:** Moderado (3)
- **Tipo:** Con Implementos
- **Repeticiones:** 10
- **Series:** 2
- **Descripción:** Fortalece espalda usando banda elástica
- **Video:** `videos/ejercicios/remo_banda_elastica_si_tienes.mp4`

#### 10. **Remo con barra**
- **Categoría:** Fortalecimiento
- **Intensidad:** Moderado (3)
- **Tipo:** Con Implementos
- **Repeticiones:** 10
- **Series:** 2
- **Descripción:** Fortalece espalda media
- **Video:** `videos/ejercicios/remo_barra.mp4`

#### 11. **Peso muerto con mancuernas**
- **Categoría:** Fortalecimiento
- **Intensidad:** Intermedio (4)
- **Tipo:** Con Implementos
- **Repeticiones:** 8
- **Series:** 2
- **Descripción:** Fortalece cadena posterior
- **Video:** `videos/ejercicios/peso_muerto_mancuernas.mp4`

#### 12. **Sentadilla**
- **Categoría:** Fortalecimiento
- **Intensidad:** Intermedio (4)
- **Tipo:** Funcional
- **Repeticiones:** 8
- **Series:** 2
- **Descripción:** Ejercicio fundamental para piernas
- **Video:** `videos/ejercicios/sentadilla.mp4`

### Ejercicios de Equilibrio

#### 13. **Equilibrio sobre un Pie**
- **Categoría:** Equilibrio
- **Intensidad:** Moderado (3)
- **Tipo:** Ejercicio de Pie
- **Duración:** 30 segundos
- **Series:** 3
- **Descripción:** Ejercicio fundamental para mejorar el equilibrio
- **Video:** `videos/ejercicios/equilibrio_un_pie.mp4`

#### 14. **Caminar Talón-Punta**
- **Categoría:** Equilibrio
- **Intensidad:** Moderado (3)
- **Tipo:** Ejercicio de Pie
- **Repeticiones:** 10
- **Series:** 2
- **Descripción:** Ejercicio de equilibrio dinámico
- **Video:** `videos/ejercicios/caminar_talon_punta.mp4`

#### 15. **Paso Lateral**
- **Categoría:** Equilibrio
- **Intensidad:** Moderado (3)
- **Tipo:** Ejercicio de Pie
- **Repeticiones:** 10
- **Series:** 2
- **Descripción:** Equilibrio dinámico y fortalecimiento
- **Video:** `videos/ejercicios/paso_lateral.mp4`

### Ejercicios de Flexibilidad y Movilidad

#### 16. **Círculos de Tobillo**
- **Categoría:** Movilidad
- **Intensidad:** Muy Suave (1)
- **Tipo:** Ejercicio Sentado
- **Repeticiones:** 10
- **Series:** 2
- **Descripción:** Mantiene flexible la articulación del tobillo
- **Video:** `videos/ejercicios/circulos_tobillo.mp4`

#### 17. **Rotación de Cuello**
- **Categoría:** Flexibilidad
- **Intensidad:** Muy Suave (1)
- **Tipo:** Ejercicio Sentado
- **Repeticiones:** 5
- **Series:** 2
- **Descripción:** Mantiene movilidad cervical
- **Video:** `videos/ejercicios/rotacion_cuello.mp4`

#### 18. **Estiramiento Gato-Vaca (Sentado)**
- **Categoría:** Flexibilidad
- **Intensidad:** Suave (2)
- **Tipo:** Ejercicio Sentado
- **Repeticiones:** 8
- **Series:** 2
- **Descripción:** Mejora movilidad espinal
- **Video:** `videos/ejercicios/estiramiento_gato_vaca_sentado.mp4`

#### 19. **Torsión Suave de Columna (Sentado)**
- **Categoría:** Flexibilidad
- **Intensidad:** Moderado (3)
- **Tipo:** Ejercicio Sentado
- **Repeticiones:** 6
- **Series:** 2
- **Descripción:** Movilidad rotacional de la columna
- **Video:** `videos/ejercicios/torsion_suave_columna_sentado.mp4`

### Ejercicios Cardiovasculares

#### 20. **Puñetazos al Aire**
- **Categoría:** Cardio
- **Intensidad:** Suave (2)
- **Tipo:** Ejercicio de Pie
- **Duración:** 180 segundos
- **Descripción:** Ejercicio cardiovascular suave
- **Video:** `videos/ejercicios/punetazos_aire.mp4`

#### 21. **Jumping Jacks sin Salto**
- **Categoría:** Cardio
- **Intensidad:** Moderado (3)
- **Tipo:** Ejercicio de Pie
- **Duración:** 180 segundos
- **Descripción:** Versión adaptada del ejercicio clásico
- **Video:** `videos/ejercicios/jumping_jacks_sin_salto.mp4`

#### 22. **Marcha en el Sitio**
- **Categoría:** Cardio
- **Intensidad:** Moderado (3)
- **Tipo:** Ejercicio de Pie
- **Duración:** 180 segundos
- **Descripción:** Ejercicio cardiovascular fundamental
- **Video:** `videos/ejercicios/marcha_sitio.mp4`

---

## 🏃 RUTINAS (7 registros)

### 1. **Calentamiento y Movilidad Matutina**
- **Duración:** 15 minutos
- **Intensidad:** Muy Suave (1)
- **Categoría:** Flexibilidad
- **Premium:** No
- **Ejercicios:** 5
  1. Rotación de Cuello (180s, descanso 30s)
  2. Círculos de Tobillo (180s, descanso 30s)
  3. Elevación de Brazos y Hombros (240s, descanso 30s)
  4. Estiramiento Gato-Vaca (300s, descanso 30s)
  5. Torsión Suave de Columna (240s, descanso 0s)
- **Video:** `videos/rutinas/calentamiento_matutino.mp4`

### 2. **Fortalecimiento Suave en Casa**
- **Duración:** 20 minutos
- **Intensidad:** Suave (2)
- **Categoría:** Fortalecimiento
- **Premium:** No
- **Ejercicios:** 5
  1. Abductores (2 series × 10 reps, descanso 60s)
  2. Extensión de Cuadríceps (2 series × 8 reps, descanso 60s)
  3. Elevación de Rodilla (2 series × 10 reps, descanso 60s)
  4. Flexiones en la Pared (2 series × 8 reps, descanso 60s)
  5. Elevación de Talones y Puntas (2 series × 12 reps, descanso 0s)
- **Video:** `videos/rutinas/fortalecimiento_suave.mp4`

### 3. **Equilibrio y Coordinación**
- **Duración:** 18 minutos
- **Intensidad:** Moderado (3)
- **Categoría:** Equilibrio
- **Premium:** No
- **Ejercicios:** 5
  1. Caminar Talón-Punta (240s, descanso 60s)
  2. Equilibrio sobre un Pie (180s, descanso 60s)
  3. Paso Lateral (240s, descanso 60s)
  4. Elevación Lateral de Pierna (240s, descanso 60s)
  5. Marcha en el Sitio (300s, descanso 0s)
- **Video:** `videos/rutinas/equilibrio_coordinacion.mp4`

### 4. **Cardio Activo y Suave**
- **Duración:** 25 minutos
- **Intensidad:** Moderado (3)
- **Categoría:** Cardio
- **Premium:** No
- **Ejercicios:** 5
  1. Marcha en el Sitio (300s, descanso 60s)
  2. Jumping Jacks sin Salto (240s, descanso 60s)
  3. Puñetazos al Aire (300s, descanso 60s)
  4. Paso Lateral (240s, descanso 60s)
  5. Elevación de Rodilla (180s, descanso 0s)
- **Video:** `videos/rutinas/cardio_activo_suave.mp4`

### 5. **Fuerza Funcional** ⭐ PREMIUM
- **Duración:** 30 minutos
- **Intensidad:** Intermedio (4)
- **Categoría:** Fortalecimiento
- **Premium:** Sí
- **Ejercicios:** 5
  1. Sentarse y Levantarse (3 series × 10 reps, descanso 90s)
  2. Peso muerto con mancuernas (3 series × 8 reps, descanso 90s)
  3. Remo con barra (3 series × 10 reps, descanso 90s)
  4. Sentadilla (3 series × 8 reps, descanso 90s)
  5. Remo con Banda Elástica (3 series × 12 reps, descanso 0s)
- **Video:** `videos/rutinas/fuerza_funcional.mp4`

### 6. **Movilidad Completa**
- **Duración:** 22 minutos
- **Intensidad:** Suave (2)
- **Categoría:** Movilidad
- **Premium:** No
- **Ejercicios:** 5
  1. Rotación de Cuello (180s, descanso 30s)
  2. Elevación de Brazos y Hombros (240s, descanso 30s)
  3. Torsión Suave de Columna (300s, descanso 30s)
  4. Estiramiento Gato-Vaca (300s, descanso 30s)
  5. Círculos de Tobillo (240s, descanso 0s)
- **Video:** `videos/rutinas/movilidad_completa.mp4`

### 7. **Resistencia General**
- **Duración:** 35 minutos
- **Intensidad:** Moderado (3)
- **Categoría:** Cardio
- **Premium:** No
- **Descripción:** Rutina completa de resistencia cardiovascular
- **Video:** `videos/rutinas/resistencia_general.mp4`

---

## 🔗 RELACIONES RUTINA-EJERCICIO (30 registros)

| Rutina | Ejercicio | Orden | Duración | Series | Reps | Descanso |
|--------|-----------|-------|----------|--------|------|----------|
| Calentamiento Matutino | Rotación de Cuello | 1 | 180s | - | - | 30s |
| Calentamiento Matutino | Círculos de Tobillo | 2 | 180s | - | - | 30s |
| Calentamiento Matutino | Elevación de Brazos | 3 | 240s | - | - | 30s |
| Calentamiento Matutino | Gato-Vaca | 4 | 300s | - | - | 30s |
| Calentamiento Matutino | Torsión Columna | 5 | 240s | - | - | 0s |
| Fortalecimiento Suave | Abductores | 1 | - | 2 | 10 | 60s |
| Fortalecimiento Suave | Extensión Cuadríceps | 2 | - | 2 | 8 | 60s |
| Fortalecimiento Suave | Elevación Rodilla | 3 | - | 2 | 10 | 60s |
| Fortalecimiento Suave | Flexiones Pared | 4 | - | 2 | 8 | 60s |
| Fortalecimiento Suave | Elevación Talones | 5 | - | 2 | 12 | 0s |
| Equilibrio y Coordinación | Caminar Talón-Punta | 1 | 240s | - | - | 60s |
| Equilibrio y Coordinación | Equilibrio un Pie | 2 | 180s | - | - | 60s |
| Equilibrio y Coordinación | Paso Lateral | 3 | 240s | - | - | 60s |
| Equilibrio y Coordinación | Elevación Lateral | 4 | 240s | - | - | 60s |
| Equilibrio y Coordinación | Marcha en Sitio | 5 | 300s | - | - | 0s |
| Cardio Activo | Marcha en Sitio | 1 | 300s | - | - | 60s |
| Cardio Activo | Jumping Jacks | 2 | 240s | - | - | 60s |
| Cardio Activo | Puñetazos al Aire | 3 | 300s | - | - | 60s |
| Cardio Activo | Paso Lateral | 4 | 240s | - | - | 60s |
| Cardio Activo | Elevación Rodilla | 5 | 180s | - | - | 0s |
| Fuerza Funcional | Sentarse y Levantarse | 1 | - | 3 | 10 | 90s |
| Fuerza Funcional | Peso Muerto | 2 | - | 3 | 8 | 90s |
| Fuerza Funcional | Remo con Barra | 3 | - | 3 | 10 | 90s |
| Fuerza Funcional | Sentadilla | 4 | - | 3 | 8 | 90s |
| Fuerza Funcional | Remo Banda Elástica | 5 | - | 3 | 12 | 0s |
| Movilidad Completa | Rotación de Cuello | 1 | 180s | - | - | 30s |
| Movilidad Completa | Elevación de Brazos | 2 | 240s | - | - | 30s |
| Movilidad Completa | Torsión Columna | 3 | 300s | - | - | 30s |
| Movilidad Completa | Gato-Vaca | 4 | 300s | - | - | 30s |
| Movilidad Completa | Círculos de Tobillo | 5 | 240s | - | - | 0s |

---

## 📂 ARCHIVOS SQL DISPONIBLES

Todos los archivos están en: `Backend/src/main/resources/sql/`

### Archivos Principales (En orden de ejecución)

1. **`00-init.sql`** - Creación del esquema base de datos
2. **`datos-basicos-compatible.sql`** - Categorías, Intensidades, Tipos de Ejercicio
3. **`ejercicios-completos-clasificados.sql`** - 22 ejercicios con toda la información
4. **`rutinas-completas-con-ejercicios.sql`** - 7 rutinas con relaciones

### Archivos de Respaldo

- **`create-tables.sql`** - Creación de tablas
- **`data.sql`** - Datos iniciales legacy
- **`data-updated.sql`** - Datos actualizados
- **`ejercicios-con-google-drive-urls.sql`** - Ejercicios con URLs de Google Drive
- **`google-drive-urls-final.sql`** - URLs finales de Google Drive
- **`routine-exercises-relations.sql`** - Solo relaciones rutina-ejercicio
- **`todos-los-ejercicios-completos.sql`** - Ejercicios completos sin clasificar

---

## 📁 ESTRUCTURA DE DIRECTORIOS

### Para Videos y Imágenes

```
Backend/src/main/resources/static/
├── videos/
│   ├── ejercicios/
│   │   ├── abductores.mp4
│   │   ├── caminar_talon_punta.mp4
│   │   ├── circulos_tobillo.mp4
│   │   ├── elevation_brazos_hombros.mp4
│   │   ├── elevacion_lateral_pierna.mp4
│   │   ├── elevacion_rodilla_sentado.mp4
│   │   ├── elevacion_talones_puntas.mp4
│   │   ├── equilibrio_un_pie.mp4
│   │   ├── estiramiento_gato_vaca_sentado.mp4
│   │   ├── extension_cuadriceps.mp4
│   │   ├── flexiones_pared_wall_push_up.mp4
│   │   ├── jumping_jacks_sin_salto.mp4
│   │   ├── marcha_sitio.mp4
│   │   ├── paso_lateral.mp4
│   │   ├── peso_muerto_mancuernas.mp4
│   │   ├── punetazos_aire.mp4
│   │   ├── remo_banda_elastica_si_tienes.mp4
│   │   ├── remo_barra.mp4
│   │   ├── rotacion_cuello.mp4
│   │   ├── sentadilla.mp4
│   │   ├── sentarse_levantarse_silla_chair_squat.mp4
│   │   └── torsion_suave_columna_sentado.mp4
│   └── rutinas/
│       ├── calentamiento_matutino.mp4
│       ├── cardio_activo_suave.mp4
│       ├── equilibrio_coordinacion.mp4
│       ├── fortalecimiento_suave.mp4
│       ├── fuerza_funcional.mp4
│       ├── movilidad_completa.mp4
│       └── resistencia_general.mp4
└── images/
    ├── ejercicios/
    │   ├── abductores.jpg
    │   ├── caminar_talon_punta.jpg
    │   └── ... (miniaturas de cada ejercicio)
    └── rutinas/
        ├── calentamiento_matutino.jpg
        ├── cardio_activo_suave.jpg
        └── ... (miniaturas de cada rutina)
```

---

## 🔄 CÓMO CARGAR LOS DATOS

### Opción 1: Automática con Docker (RECOMENDADO)

Los datos se cargan automáticamente al iniciar Docker:

```powershell
.\build-docker.ps1
```

O ejecutar el script de población:

```powershell
.\populate-database.ps1
```

### Opción 2: Manual desde MySQL

```bash
# Conectar a MySQL Docker
docker exec -it vitalapp-mysql mysql -uroot -proot1234 vital_app_db

# Ejecutar scripts en orden
source /docker-entrypoint-initdb.d/datos-basicos-compatible.sql;
source /docker-entrypoint-initdb.d/ejercicios-completos-clasificados.sql;
source /docker-entrypoint-initdb.d/rutinas-completas-con-ejercicios.sql;
```

### Opción 3: Desde Adminer (Interfaz Web)

1. Abre http://localhost:8082
2. Login con: root / root1234
3. Selecciona base de datos: vital_app_db
4. Ve a "SQL command"
5. Copia y pega el contenido de cada script
6. Ejecuta en orden

---

## 📊 ESTADÍSTICAS DEL DATASET

| Elemento | Cantidad |
|----------|----------|
| **Categorías** | 5 |
| **Intensidades** | 4 |
| **Tipos de Ejercicio** | 5 |
| **Ejercicios** | 22 |
| **Rutinas** | 7 (1 premium) |
| **Relaciones** | 30 |
| **Videos de Ejercicios** | 22 |
| **Videos de Rutinas** | 7 |
| **Total de Videos** | 29 |

### Distribución por Categoría

| Categoría | Ejercicios | Rutinas |
|-----------|------------|---------|
| Fortalecimiento | 12 | 2 |
| Equilibrio | 3 | 1 |
| Flexibilidad | 2 | 1 |
| Cardio | 3 | 2 |
| Movilidad | 2 | 1 |

### Distribución por Intensidad

| Intensidad | Ejercicios | Rutinas |
|------------|------------|---------|
| Muy Suave (1) | 2 | 1 |
| Suave (2) | 5 | 2 |
| Moderado (3) | 13 | 3 |
| Intermedio (4) | 2 | 1 |

---

## ✅ VERIFICAR DATOS CARGADOS

### Desde línea de comandos:

```powershell
# Ver número de rutinas
docker exec vitalapp-mysql mysql -uroot -proot1234 vital_app_db -e "SELECT COUNT(*) as rutinas FROM routines;"

# Ver número de ejercicios
docker exec vitalapp-mysql mysql -uroot -proot1234 vital_app_db -e "SELECT COUNT(*) as ejercicios FROM exercises;"

# Ver todas las categorías
docker exec vitalapp-mysql mysql -uroot -proot1234 vital_app_db -e "SELECT * FROM categories;"
```

### Desde la API:

```bash
# Ver rutinas
curl http://localhost:8080/api/routines

# Ver ejercicios
curl http://localhost:8080/api/exercises
```

---

## 📝 NOTAS IMPORTANTES

1. **Videos:** Las rutas de video están configuradas pero necesitas los archivos reales en la carpeta `/static/videos/`

2. **Google Drive:** Si prefieres usar Google Drive para los videos, los IDs están en el archivo `google-drive-urls-final.sql`

3. **Persistencia:** Los datos se mantienen en el volumen Docker `mysqldata` aunque reinicies los contenedores

4. **Actualizaciones:** Si necesitas actualizar datos, modifica los archivos SQL en `Backend/src/main/resources/sql/`

5. **Backup:** Siempre puedes crear un backup con:
   ```bash
   docker exec vitalapp-mysql mysqldump -uroot -proot1234 vital_app_db > backup.sql
   ```

---

**¡Dataset completo y listo para usar! 🎉**
