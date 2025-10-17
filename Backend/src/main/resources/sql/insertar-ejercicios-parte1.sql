-- =====================================================
-- INSERTAR TODOS LOS 22 EJERCICIOS CON GOOGLE DRIVE URLs
-- =====================================================

-- Insertar los 22 ejercicios con sus datos completos
INSERT INTO exercises (name, description, instructions, duration_seconds, repetitions, sets, video_url, image_url, category_id, intensity_id, exercise_type_id, benefits, safety_tips, modifications, created_at) VALUES

-- 1. Abductores
('Abductores', 
'Ejercicio suave para fortalecer los músculos abductores de cadera, mejorando estabilidad pélvica y equilibrio.',
'1. Siéntate en una silla con respaldo recto\n2. Coloca los pies firmes en el suelo\n3. Separa lentamente las rodillas hacia los lados\n4. Mantén 3 segundos y regresa lentamente\n5. Repite el movimiento de forma controlada',
180, 10, 2, 
'https://drive.google.com/file/d/1-PFFba41QMR-o7-uxS1Hn-LPs92disTL/preview', 
'https://drive.google.com/uc?export=view&id=1-PFFba41QMR-o7-uxS1Hn-LPs92disTL',
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
'https://drive.google.com/file/d/13cX7egRaeK9zeewbs7SA_3Y1uIDuj_Nx/preview',
'https://drive.google.com/uc?export=view&id=13cX7egRaeK9zeewbs7SA_3Y1uIDuj_Nx',
(SELECT id FROM categories WHERE name = 'Equilibrio'),
(SELECT id FROM intensities WHERE name = 'Moderado'),
(SELECT id FROM exercise_types WHERE name = 'Equilibrio'),
'Mejora equilibrio dinámico, fortalece músculos del core, previene caídas',
'Usar apoyo de pared o baranda, superficie antideslizante, no mirar hacia abajo',
'Comenzar con pasos más separados, aumentar apoyo si es necesario',
NOW()),

-- 3. Círculos de Tobillo
('Círculos de Tobillo',
'Ejercicio de movilidad que mantiene flexible la articulación del tobillo y mejora circulación.',
'1. Siéntate cómodamente en una silla\n2. Levanta un pie del suelo ligeramente\n3. Realiza círculos lentos con el tobillo\n4. 10 círculos hacia cada dirección\n5. Repite con el otro pie',
180, 10, 1,
'https://drive.google.com/file/d/14J9030mEBfAXSMpQvNHsV9GC3FdbTo-q/preview',
'https://drive.google.com/uc?export=view&id=14J9030mEBfAXSMpQvNHsV9GC3FdbTo-q',
(SELECT id FROM categories WHERE name = 'Movilidad'),
(SELECT id FROM intensities WHERE name = 'Muy Suave'),
(SELECT id FROM exercise_types WHERE name = 'Estiramiento'),
'Mejora circulación en piernas, mantiene movilidad articular, previene rigidez',
'Movimientos lentos y controlados, no forzar si hay dolor articular',
'Apoyar el pie si levantar es difícil, reducir número de repeticiones',
NOW()),

-- 4. Elevación de Brazos y Hombros
('Elevación de Brazos y Hombros',
'Ejercicio de movilidad para mantener flexibles los hombros y mejorar postura.',
'1. Siéntate o párate con postura erguida\n2. Levanta lentamente ambos brazos hacia los lados\n3. Eleva hasta donde sea cómodo\n4. Baja lentamente\n5. Repite con movimientos controlados',
240, 12, 2,
'https://drive.google.com/file/d/1AC--CGD0trWIbbEmBodSzYuD2mGJABAO/preview',
'https://drive.google.com/uc?export=view&id=1AC--CGD0trWIbbEmBodSzYuD2mGJABAO',
(SELECT id FROM categories WHERE name = 'Movilidad'),
(SELECT id FROM intensities WHERE name = 'Suave'),
(SELECT id FROM exercise_types WHERE name = 'Estiramiento'),
'Mantiene movilidad del hombro, mejora postura, alivia tensión cervical',
'No elevar más allá del rango cómodo, detenerse si hay dolor',
'Alternar un brazo por vez si es más cómodo',
NOW()),

-- 5. Elevación de Rodilla (Sentado)
('Elevación de Rodilla (Sentado)',
'Ejercicio para fortalecer músculos abdominales y flexores de cadera desde posición sentada.',
'1. Siéntate en el borde de una silla\n2. Mantén espalda recta\n3. Levanta una rodilla hacia el pecho\n4. Baja lentamente\n5. Alterna entre piernas',
NULL, 10, 2,
'https://drive.google.com/file/d/1ETK0Uq1Whe5J3hS-K9rLEntNBbj9r14P/preview',
'https://drive.google.com/uc?export=view&id=1ETK0Uq1Whe5J3hS-K9rLEntNBbj9r14P',
(SELECT id FROM categories WHERE name = 'Fortalecimiento'),
(SELECT id FROM intensities WHERE name = 'Suave'),
(SELECT id FROM exercise_types WHERE name = 'Funcional'),
'Fortalece core, mejora estabilidad, ayuda con el equilibrio sentado',
'Mantener espalda recta, no usar impulso, respirar normalmente',
'Reducir altura de elevación, usar respaldo para apoyo',
NOW());

-- Continúo con los ejercicios restantes...

-- Verificar que los primeros 5 ejercicios se insertaron
SELECT 'Ejercicios insertados hasta ahora:' as mensaje, COUNT(*) as cantidad FROM exercises;