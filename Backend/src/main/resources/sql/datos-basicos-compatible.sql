-- =====================================================
-- DATOS BÁSICOS PARA VITALAPP - COMPATIBLE CON TABLAS ACTUALES
-- =====================================================

-- Insertar categorías
INSERT INTO categories (name, description) VALUES 
('Fortalecimiento', 'Ejercicios para fortalecer músculos y huesos'),
('Flexibilidad', 'Ejercicios de estiramiento y movilidad'),
('Equilibrio', 'Ejercicios para mejorar el balance y estabilidad'),
('Cardio', 'Ejercicios cardiovasculares de bajo impacto'),
('Movilidad', 'Ejercicios para mantener y mejorar el rango de movimiento');

-- Insertar intensidades
INSERT INTO intensities (name, level) VALUES 
('Muy Suave', 1),
('Suave', 2),
('Moderado', 3),
('Intermedio', 4);

-- Insertar tipos de ejercicio
INSERT INTO exercise_types (name, description) VALUES 
('Resistencia', 'Ejercicios que mejoran la resistencia muscular'),
('Estiramiento', 'Ejercicios de elongación muscular'),
('Equilibrio', 'Ejercicios para mejorar la estabilidad'),
('Aeróbico', 'Ejercicios cardiovasculares'),
('Funcional', 'Ejercicios que simulan movimientos diarios');

-- Insertar ejercicios básicos
INSERT INTO exercises (name, description, instructions, duration_seconds, repetitions, sets, video_url, image_url, category_id, intensity_id, exercise_type_id, benefits, safety_tips, modifications, created_at) VALUES

-- 1. Abductores
('Abductores', 
'Ejercicio suave para fortalecer los músculos abductores de cadera, mejorando estabilidad pélvica y equilibrio.',
'1. Siéntate en una silla con respaldo recto\n2. Coloca los pies firmes en el suelo\n3. Separa lentamente las rodillas hacia los lados\n4. Mantén 3 segundos y regresa lentamente\n5. Repite el movimiento de forma controlada',
180, 10, 2, 
'videos/ejercicios/abductores.mp4', 
'images/ejercicios/abductores.jpg',
(SELECT id FROM categories WHERE name = 'Fortalecimiento'),
(SELECT id FROM intensities WHERE name = 'Muy Suave'),
(SELECT id FROM exercise_types WHERE name = 'Funcional'),
'Fortalece músculos estabilizadores de cadera, mejora postura sentado, previene dolores lumbares',
'Mantener espalda apoyada en respaldo, no forzar el rango de movimiento, detenerse si hay molestias',
'Reducir rango de movimiento si hay limitaciones, usar cojín para mayor comodidad',
NOW()),

-- 2. Caminar Talón-Punta
('Caminar Talón-Punta',
'Ejercicio de equilibrio dinámico que mejora la coordinación y fortalece músculos estabilizadores.',
'1. Párate derecho junto a una pared o baranda\n2. Coloca un pie directamente delante del otro\n3. El talón del pie delantero toca la punta del trasero\n4. Camina lentamente manteniendo esta posición\n5. Usa apoyo si es necesario',
240, NULL, NULL,
'videos/ejercicios/caminar_talon_punta.mp4',
'images/ejercicios/caminar_talon_punta.jpg',
(SELECT id FROM categories WHERE name = 'Equilibrio'),
(SELECT id FROM intensities WHERE name = 'Moderado'),
(SELECT id FROM exercise_types WHERE name = 'Equilibrio'),
'Mejora equilibrio dinámico, fortalece músculos del core, previene caídas',
'Usar apoyo de pared o baranda, superfic ie antideslizante, no mirar hacia abajo',
'Comenzar con pasos más separados, aumentar apoyo si es necesario',
NOW()),

-- 3. Círculos de Tobillo
('Círculos de Tobillo',
'Ejercicio de movilidad que mantiene flexible la articulación del tobillo y mejora circulación.',
'1. Siéntate cómodamente en una silla\n2. Levanta un pie del suelo ligeramente\n3. Realiza círculos lentos con el tobillo\n4. 10 círculos hacia cada dirección\n5. Repite con el otro pie',
180, 10, 1,
'videos/ejercicios/circulos_tobillo.mp4',
'images/ejercicios/circulos_tobillo.jpg',
(SELECT id FROM categories WHERE name = 'Movilidad'),
(SELECT id FROM intensities WHERE name = 'Muy Suave'),
(SELECT id FROM exercise_types WHERE name = 'Estiramiento'),
'Mejora circulación en piernas, mantiene movilidad articular, previene rigidez',
'Movimientos lentos y controlados, no forzar si hay dolor articular',
'Apoyar el pie si levantar es difícil, reducir número de repeticiones',
NOW());

-- Verificar que se insertaron correctamente
SELECT 'Categorías insertadas:' as mensaje, COUNT(*) as cantidad FROM categories;
SELECT 'Intensidades insertadas:' as mensaje, COUNT(*) as cantidad FROM intensities;
SELECT 'Tipos de ejercicio insertados:' as mensaje, COUNT(*) as cantidad FROM exercise_types;
SELECT 'Ejercicios insertados:' as mensaje, COUNT(*) as cantidad FROM exercises;