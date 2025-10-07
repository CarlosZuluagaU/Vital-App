-- =====================================================
-- RUTINAS COMPLETAS CON EJERCICIOS ESPECÍFICOS
-- Basado en los ejercicios clasificados anteriormente
-- =====================================================

-- NOTA: Este script debe ejecutarse DESPUÉS del script de ejercicios-completos-clasificados.sql

-- =====================================================
-- RUTINA 1: "CALENTAMIENTO Y MOVILIDAD MATUTINA" 
-- Duración: 15 minutos | Intensidad: Muy Suave | Categoría: Flexibilidad
-- =====================================================

-- Insertar la rutina
INSERT INTO routines (title, description, duration_minutes, is_premium, category_id, intensity_id, video_url, thumbnail_url) 
VALUES (
    'Calentamiento y Movilidad Matutina',
    'Rutina suave de calentamiento perfecta para comenzar el día. Incluye ejercicios de movilidad articular y estiramientos suaves que preparan el cuerpo para las actividades diarias.',
    15,
    false,
    (SELECT id FROM categories WHERE name = 'Flexibilidad'),
    (SELECT id FROM intensities WHERE name = 'Muy Suave'),
    'videos/rutinas/calentamiento_matutino.mp4',
    'images/rutinas/calentamiento_matutino.jpg'
);

-- Vincular ejercicios a la rutina (ajustar routine_id según sea necesario)
INSERT INTO routine_exercises (routine_id, exercise_id, exercise_order, duration_seconds, rest_seconds) 
VALUES
-- Calentamiento suave
((SELECT id FROM routines WHERE title = 'Calentamiento y Movilidad Matutina'), 
 (SELECT id FROM exercises WHERE name = 'Rotación de Cuello'), 1, 180, 30),

((SELECT id FROM routines WHERE title = 'Calentamiento y Movilidad Matutina'), 
 (SELECT id FROM exercises WHERE name = 'Círculos de Tobillo'), 2, 180, 30),

((SELECT id FROM routines WHERE title = 'Calentamiento y Movilidad Matutina'), 
 (SELECT id FROM exercises WHERE name = 'Elevación de Brazos y Hombros'), 3, 240, 30),

((SELECT id FROM routines WHERE title = 'Calentamiento y Movilidad Matutina'), 
 (SELECT id FROM exercises WHERE name = 'Estiramiento de Gato-Vaca (Sentado)'), 4, 300, 30),

((SELECT id FROM routines WHERE title = 'Calentamiento y Movilidad Matutina'), 
 (SELECT id FROM exercises WHERE name = 'Torsión Suave de Columna (Sentado)'), 5, 240, 0);

-- =====================================================
-- RUTINA 2: "FORTALECIMIENTO SUAVE EN CASA"
-- Duración: 20 minutos | Intensidad: Suave | Categoría: Fortalecimiento  
-- =====================================================

INSERT INTO routines (title, description, duration_minutes, is_premium, category_id, intensity_id, video_url, thumbnail_url)
VALUES (
    'Fortalecimiento Suave en Casa',
    'Rutina de fortalecimiento diseñada para adultos mayores. Ejercicios seguros y efectivos que se pueden realizar en casa con una silla como apoyo principal.',
    20,
    false,
    (SELECT id FROM categories WHERE name = 'Fortalecimiento'),
    (SELECT id FROM intensities WHERE name = 'Suave'),
    'videos/rutinas/fortalecimiento_suave.mp4',
    'images/rutinas/fortalecimiento_suave.jpg'
);

INSERT INTO routine_exercises (routine_id, exercise_id, exercise_order, sets, repetitions, rest_seconds)
VALUES
-- Ejercicios de fuerza progresivos
((SELECT id FROM routines WHERE title = 'Fortalecimiento Suave en Casa'),
 (SELECT id FROM exercises WHERE name = 'Abductores'), 1, 2, 10, 60),

((SELECT id FROM routines WHERE title = 'Fortalecimiento Suave en Casa'),
 (SELECT id FROM exercises WHERE name = 'Extensión de Cuadríceps'), 2, 2, 8, 60),

((SELECT id FROM routines WHERE title = 'Fortalecimiento Suave en Casa'),
 (SELECT id FROM exercises WHERE name = 'Elevación de Rodilla (Sentado)'), 3, 2, 10, 60),

((SELECT id FROM routines WHERE title = 'Fortalecimiento Suave en Casa'),
 (SELECT id FROM exercises WHERE name = 'Flexiones en la Pared (Wall Push-up)'), 4, 2, 8, 60),

((SELECT id FROM routines WHERE title = 'Fortalecimiento Suave en Casa'),
 (SELECT id FROM exercises WHERE name = 'Elevación de Talones y Puntas'), 5, 2, 12, 0);

-- =====================================================
-- RUTINA 3: "EQUILIBRIO Y COORDINACIÓN"
-- Duración: 18 minutos | Intensidad: Moderado | Categoría: Equilibrio
-- =====================================================

INSERT INTO routines (title, description, duration_minutes, is_premium, category_id, intensity_id, video_url, thumbnail_url)
VALUES (
    'Equilibrio y Coordinación',
    'Rutina especializada en mejorar el equilibrio y la coordinación. Esencial para prevenir caídas y mantener la independencia en las actividades diarias.',
    18,
    false,
    (SELECT id FROM categories WHERE name = 'Equilibrio'),
    (SELECT id FROM intensities WHERE name = 'Moderado'),
    'videos/rutinas/equilibrio_coordinacion.mp4',
    'images/rutinas/equilibrio_coordinacion.jpg'
);

INSERT INTO routine_exercises (routine_id, exercise_id, exercise_order, duration_seconds, rest_seconds)
VALUES
-- Progresión de equilibrio
((SELECT id FROM routines WHERE title = 'Equilibrio y Coordinación'),
 (SELECT id FROM exercises WHERE name = 'Caminar Talón-Punta'), 1, 240, 60),

((SELECT id FROM routines WHERE title = 'Equilibrio y Coordinación'),
 (SELECT id FROM exercises WHERE name = 'Equilibrio sobre un Pie'), 2, 180, 60),

((SELECT id FROM routines WHERE title = 'Equilibrio y Coordinación'),
 (SELECT id FROM exercises WHERE name = 'Paso Lateral'), 3, 240, 60),

((SELECT id FROM routines WHERE title = 'Equilibrio y Coordinación'),
 (SELECT id FROM exercises WHERE name = 'Elevación Lateral de Pierna'), 4, 240, 60),

((SELECT id FROM routines WHERE title = 'Equilibrio y Coordinación'),
 (SELECT id FROM exercises WHERE name = 'Marcha en el Sitio'), 5, 300, 0);

-- =====================================================
-- RUTINA 4: "CARDIO ACTIVO Y SUAVE"
-- Duración: 25 minutos | Intensidad: Moderado | Categoría: Cardio
-- =====================================================

INSERT INTO routines (title, description, duration_minutes, is_premium, category_id, intensity_id, video_url, thumbnail_url)
VALUES (
    'Cardio Activo y Suave',
    'Rutina cardiovascular de bajo impacto diseñada para mejorar la resistencia y energía. Ejercicios dinámicos pero seguros para el sistema cardiovascular.',
    25,
    false,
    (SELECT id FROM categories WHERE name = 'Cardio'),
    (SELECT id FROM intensities WHERE name = 'Moderado'),
    'videos/rutinas/cardio_activo_suave.mp4',
    'images/rutinas/cardio_activo_suave.jpg'
);

INSERT INTO routine_exercises (routine_id, exercise_id, exercise_order, duration_seconds, rest_seconds)
VALUES
-- Circuito cardiovascular
((SELECT id FROM routines WHERE title = 'Cardio Activo y Suave'),
 (SELECT id FROM exercises WHERE name = 'Marcha en el Sitio'), 1, 300, 60),

((SELECT id FROM routines WHERE title = 'Cardio Activo y Suave'),
 (SELECT id FROM exercises WHERE name = 'Jumping Jacks sin Salto'), 2, 240, 60),

((SELECT id FROM routines WHERE title = 'Cardio Activo y Suave'),
 (SELECT id FROM exercises WHERE name = 'Puñetazos al Aire'), 3, 300, 60),

((SELECT id FROM routines WHERE title = 'Cardio Activo y Suave'),
 (SELECT id FROM exercises WHERE name = 'Paso Lateral'), 4, 240, 60),

((SELECT id FROM routines WHERE title = 'Cardio Activo y Suave'),
 (SELECT id FROM exercises WHERE name = 'Elevación de Rodilla (Sentado)'), 5, 180, 0);

-- =====================================================
-- RUTINA 5: "FUERZA FUNCIONAL" (PREMIUM)
-- Duración: 30 minutos | Intensidad: Intermedio | Categoría: Fortalecimiento
-- =====================================================

INSERT INTO routines (title, description, duration_minutes, is_premium, category_id, intensity_id, video_url, thumbnail_url)
VALUES (
    'Fuerza Funcional',
    'Rutina premium de fortalecimiento funcional. Incluye ejercicios más avanzados con implementos para desarrollar fuerza práctica para las actividades diarias.',
    30,
    true,
    (SELECT id FROM categories WHERE name = 'Fortalecimiento'),
    (SELECT id FROM intensities WHERE name = 'Intermedio'),
    'videos/rutinas/fuerza_funcional.mp4',
    'images/rutinas/fuerza_funcional.jpg'
);

INSERT INTO routine_exercises (routine_id, exercise_id, exercise_order, sets, repetitions, rest_seconds)
VALUES
-- Ejercicios funcionales avanzados
((SELECT id FROM routines WHERE title = 'Fuerza Funcional'),
 (SELECT id FROM exercises WHERE name = 'Sentarse y Levantarse de una Silla (Chair Squat)'), 1, 3, 10, 90),

((SELECT id FROM routines WHERE title = 'Fuerza Funcional'),
 (SELECT id FROM exercises WHERE name = 'Peso muerto con mancuernas'), 2, 3, 8, 90),

((SELECT id FROM routines WHERE title = 'Fuerza Funcional'),
 (SELECT id FROM exercises WHERE name = 'Remo con barra'), 3, 3, 10, 90),

((SELECT id FROM routines WHERE title = 'Fuerza Funcional'),
 (SELECT id FROM exercises WHERE name = 'Sentadilla'), 4, 3, 8, 90),

((SELECT id FROM routines WHERE title = 'Fuerza Funcional'),
 (SELECT id FROM exercises WHERE name = 'Remo con Banda Elástica (si tienes)'), 5, 3, 12, 0);

-- =====================================================
-- RUTINA 6: "MOVILIDAD COMPLETA"
-- Duración: 22 minutos | Intensidad: Suave | Categoría: Movilidad
-- =====================================================

INSERT INTO routines (title, description, duration_minutes, is_premium, category_id, intensity_id, video_url, thumbnail_url)
VALUES (
    'Movilidad Completa',
    'Rutina integral de movilidad que trabaja todas las articulaciones principales. Ideal para días de recuperación o como rutina de mantenimiento.',
    22,
    false,
    (SELECT id FROM categories WHERE name = 'Movilidad'),
    (SELECT id FROM intensities WHERE name = 'Suave'),
    'videos/rutinas/movilidad_completa.mp4',
    'images/rutinas/movilidad_completa.jpg'
);

INSERT INTO routine_exercises (routine_id, exercise_id, exercise_order, duration_seconds, rest_seconds)
VALUES
-- Secuencia completa de movilidad
((SELECT id FROM routines WHERE title = 'Movilidad Completa'),
 (SELECT id FROM exercises WHERE name = 'Rotación de Cuello'), 1, 180, 30),

((SELECT id FROM routines WHERE title = 'Movilidad Completa'),
 (SELECT id FROM exercises WHERE name = 'Elevación de Brazos y Hombros'), 2, 240, 30),

((SELECT id FROM routines WHERE title = 'Movilidad Completa'),
 (SELECT id FROM exercises WHERE name = 'Torsión Suave de Columna (Sentado)'), 3, 300, 30),

((SELECT id FROM routines WHERE title = 'Movilidad Completa'),
 (SELECT id FROM exercises WHERE name = 'Estiramiento de Gato-Vaca (Sentado)'), 4, 300, 30),

((SELECT id FROM routines WHERE title = 'Movilidad Completa'),
 (SELECT id FROM exercises WHERE name = 'Círculos de Tobillo'), 5, 240, 0);

-- =====================================================
-- CONSULTAS DE VERIFICACIÓN
-- =====================================================

-- Ver todas las rutinas con sus ejercicios
SELECT 
    r.title as 'Rutina',
    r.duration_minutes as 'Duración (min)',
    c.name as 'Categoría',
    i.name as 'Intensidad',
    r.is_premium as 'Premium',
    COUNT(re.exercise_id) as 'Num. Ejercicios'
FROM routines r
LEFT JOIN routine_exercises re ON r.id = re.routine_id
JOIN categories c ON r.category_id = c.id
JOIN intensities i ON r.intensity_id = i.id
GROUP BY r.id, r.title, r.duration_minutes, c.name, i.name, r.is_premium
ORDER BY r.is_premium, i.level, r.duration_minutes;

-- Ver ejercicios de una rutina específica (ejemplo: Rutina 1)
SELECT 
    r.title as 'Rutina',
    re.exercise_order as 'Orden',
    e.name as 'Ejercicio',
    COALESCE(re.duration_seconds, 'Por repeticiones') as 'Duración',
    COALESCE(re.sets, 'N/A') as 'Series',
    COALESCE(re.repetitions, 'N/A') as 'Repeticiones',
    re.rest_seconds as 'Descanso (seg)',
    e.video_url as 'Video'
FROM routines r
JOIN routine_exercises re ON r.id = re.routine_id
JOIN exercises e ON re.exercise_id = e.id
WHERE r.title = 'Calentamiento y Movilidad Matutina'
ORDER BY re.exercise_order;

-- =====================================================
-- ESTADÍSTICAS DE LAS RUTINAS
-- =====================================================

-- Resumen por categorías
SELECT 
    c.name as 'Categoría',
    COUNT(r.id) as 'Número de Rutinas',
    AVG(r.duration_minutes) as 'Duración Promedio (min)',
    SUM(CASE WHEN r.is_premium = true THEN 1 ELSE 0 END) as 'Rutinas Premium'
FROM categories c
LEFT JOIN routines r ON c.id = r.category_id
GROUP BY c.id, c.name
ORDER BY COUNT(r.id) DESC;

-- Rutinas por intensidad
SELECT 
    i.name as 'Intensidad',
    i.level as 'Nivel',
    COUNT(r.id) as 'Número de Rutinas',
    GROUP_CONCAT(r.title SEPARATOR ', ') as 'Rutinas'
FROM intensities i
LEFT JOIN routines r ON i.id = r.intensity_id
GROUP BY i.id, i.name, i.level
ORDER BY i.level;