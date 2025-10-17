-- Script para vincular ejercicios específicos a rutinas
-- Ejecutar DESPUÉS de que ya existan rutinas y ejercicios en la base de datos

-- ==================================================
-- RUTINAS DE EJEMPLO PARA ADULTOS MAYORES
-- ==================================================

-- Rutina 1: "Estiramiento Matutino Suave" (ID = 1)
INSERT INTO routine_exercises (routine_id, exercise_id, exercise_order, duration_seconds, rest_seconds) VALUES
-- Ejercicios de calentamiento y estiramiento
(1, 1, 1, 300, 30),   -- Estiramiento de cuello
(1, 2, 2, 240, 30),   -- Rotación de hombros
(1, 3, 3, 300, 30),   -- Estiramiento de brazos
(1, 4, 4, 360, 30),   -- Estiramiento de piernas
(1, 5, 5, 180, 0);    -- Respiración profunda

-- Rutina 2: "Fortalecimiento en Casa" (ID = 2) 
INSERT INTO routine_exercises (routine_id, exercise_id, exercise_order, sets, repetitions, rest_seconds) VALUES
-- Ejercicios de fuerza adaptados
(2, 6, 1, 2, 10, 60),  -- Sentadillas asistidas
(2, 7, 2, 2, 8, 60),   -- Flexiones de pared
(2, 8, 3, 2, 12, 60),  -- Elevación de talones
(2, 9, 4, 2, 10, 60),  -- Ejercicio con brazos
(2, 10, 5, 1, 5, 0);   -- Equilibrio en un pie

-- Rutina 3: "Cardio Suave" (ID = 3)
INSERT INTO routine_exercises (routine_id, exercise_id, exercise_order, duration_seconds, rest_seconds) VALUES
-- Ejercicios cardiovasculares de bajo impacto
(3, 11, 1, 300, 60),   -- Caminata en el lugar
(3, 12, 2, 240, 60),   -- Movimientos de brazos
(3, 13, 3, 180, 60),   -- Marcha suave
(3, 14, 4, 300, 60),   -- Balanceo corporal
(3, 15, 5, 180, 0);    -- Enfriamiento

-- Rutina 4: "Flexibilidad y Movilidad" (ID = 4)
INSERT INTO routine_exercises (routine_id, exercise_id, exercise_order, duration_seconds, rest_seconds) VALUES
-- Ejercicios de flexibilidad
(4, 16, 1, 240, 30),   -- Estiramiento lateral
(4, 17, 2, 300, 30),   -- Rotación de tronco
(4, 18, 3, 240, 30),   -- Estiramiento de cadera
(4, 19, 4, 300, 30),   -- Flexión hacia adelante
(4, 20, 5, 180, 0);    -- Relajación final

-- Rutina 5: "Equilibrio y Coordinación" (ID = 5)
INSERT INTO routine_exercises (routine_id, exercise_id, exercise_order, duration_seconds, rest_seconds) VALUES
-- Ejercicios de equilibrio
(5, 21, 1, 180, 60),   -- Equilibrio estático
(5, 22, 2, 240, 60),   -- Caminata en línea
(5, 23, 3, 180, 60),   -- Levantamiento de pierna
(5, 24, 4, 240, 60),   -- Movimientos coordinados
(5, 25, 5, 180, 0);    -- Estabilización final

-- ==================================================
-- RUTINAS ESPECÍFICAS BASADAS EN TUS VIDEOS
-- ==================================================
-- INSTRUCCIONES: 
-- 1. Reemplaza estos ejemplos con los nombres reales de tus rutinas y ejercicios
-- 2. Ajusta los IDs según tu base de datos
-- 3. Personaliza duraciones, repeticiones y descansos

-- Ejemplo de plantilla para tus rutinas:
-- RUTINA: "[Nombre de tu video/rutina]" 
-- INSERT INTO routine_exercises (routine_id, exercise_id, exercise_order, duration_seconds, sets, repetitions, rest_seconds) VALUES
-- ([ID_RUTINA], [ID_EJERCICIO_1], 1, [DURACION], [SERIES], [REPETICIONES], [DESCANSO]),
-- ([ID_RUTINA], [ID_EJERCICIO_2], 2, [DURACION], [SERIES], [REPETICIONES], [DESCANSO]),
-- etc...

-- ==================================================
-- CONSULTAS ÚTILES PARA VERIFICAR LAS RELACIONES
-- ==================================================

-- Ver todas las rutinas con sus ejercicios
SELECT 
    r.title as rutina,
    e.name as ejercicio,
    re.exercise_order as orden,
    re.duration_seconds as duracion,
    re.sets as series,
    re.repetitions as repeticiones,
    re.rest_seconds as descanso
FROM routines r
JOIN routine_exercises re ON r.id = re.routine_id
JOIN exercises e ON re.exercise_id = e.id
ORDER BY r.title, re.exercise_order;

-- Ver ejercicios de una rutina específica
SELECT 
    e.name as ejercicio,
    e.description as descripcion,
    re.exercise_order as orden,
    re.duration_seconds as duracion,
    c.name as categoria,
    i.name as intensidad
FROM routine_exercises re
JOIN exercises e ON re.exercise_id = e.id
JOIN categories c ON e.category_id = c.id
JOIN intensities i ON e.intensity_id = i.id
WHERE re.routine_id = 1  -- Cambiar por el ID de la rutina que quieras ver
ORDER BY re.exercise_order;

-- ==================================================
-- INSTRUCCIONES PARA PERSONALIZAR
-- ==================================================

/*
Para personalizar este script con tus videos:

1. IDENTIFICA TUS RUTINAS:
   - Lista los nombres de tus videos de rutinas
   - Anota qué ejercicios específicos contiene cada rutina
   
2. OBTÉN LOS IDs DE LA BASE DE DATOS:
   - Ejecuta: SELECT id, title FROM routines; 
   - Ejecuta: SELECT id, name FROM exercises;
   
3. CREA LAS RELACIONES:
   - Usa los IDs reales en lugar de los ejemplos
   - Ajusta duraciones, series, repeticiones según tus videos
   - Mantén el exercise_order para el orden correcto
   
4. EJEMPLO DE TUS DATOS:
   Si tienes una rutina "Yoga Matutino para Seniors" con:
   - Respiración (30 segundos)
   - Estiramiento de cuello (45 segundos) 
   - Postura del gato (60 segundos)
   
   El código sería:
   INSERT INTO routine_exercises (routine_id, exercise_id, exercise_order, duration_seconds, rest_seconds) VALUES
   (ID_RUTINA_YOGA, ID_EJERCICIO_RESPIRACION, 1, 30, 15),
   (ID_RUTINA_YOGA, ID_EJERCICIO_CUELLO, 2, 45, 15),
   (ID_RUTINA_YOGA, ID_EJERCICIO_GATO, 3, 60, 0);
*/