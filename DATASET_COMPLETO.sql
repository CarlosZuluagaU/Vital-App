-- =====================================================-- =====================================================

-- DATASET COMPLETO - VITALAPP-- DATASET COMPLETO - VITAL APP

-- Base de datos completa con todos los ejercicios, rutinas y videos-- Fecha: 18 de Octubre, 2025

-- Fecha: 21 de Octubre, 2025-- Versión: 1.3 (Docker)

-- Versión: 2.0 - Con todos los videos de Google Drive-- =====================================================

-- =====================================================-- Este archivo contiene TODOS los datos necesarios

-- para poblar completamente la base de datos

-- IMPORTANTE: Este archivo contiene TODA la información de la base de datos-- =====================================================

-- Incluye 22 ejercicios con URLs reales de Google Drive y 7 rutinas completas

-- =====================================================

-- =====================================================-- 1. CATEGORÍAS (5 registros)

-- PARTE 1: DATOS BÁSICOS (Categorías, Intensidades, Tipos)-- =====================================================

-- =====================================================

INSERT INTO categories (name, description) VALUES 

-- Categorías de ejercicios('Fortalecimiento', 'Ejercicios para mejorar la fuerza muscular de forma segura'),

INSERT INTO categories (name, description, icon, created_at) VALUES('Equilibrio', 'Ejercicios para mejorar la estabilidad y prevenir caídas'),

('Fortalecimiento', 'Ejercicios para desarrollar y mantener la fuerza muscular', '💪', NOW()),('Flexibilidad', 'Ejercicios para mantener y mejorar la movilidad articular'),

('Equilibrio', 'Ejercicios para mejorar la estabilidad y prevenir caídas', '⚖️', NOW()),('Cardio', 'Ejercicios cardiovasculares de bajo impacto'),

('Flexibilidad', 'Ejercicios de estiramiento para mantener amplitud de movimiento', '🤸', NOW()),('Movilidad', 'Ejercicios para mejorar el rango de movimiento');

('Cardio', 'Ejercicios cardiovasculares de bajo impacto', '❤️', NOW()),

('Movilidad', 'Ejercicios para mantener el rango de movimiento articular', '🔄', NOW());SELECT 'OK - Categorias insertadas:' as status, COUNT(*) as cantidad FROM categories;



-- Niveles de intensidad-- =====================================================

INSERT INTO intensities (name, description, level, color_hex, created_at) VALUES-- 2. INTENSIDADES (4 registros)

('Muy Suave', 'Ideal para principiantes y personas con movilidad limitada', 1, '#90EE90', NOW()),-- =====================================================

('Suave', 'Para personas que buscan ejercicio de bajo impacto', 2, '#87CEEB', NOW()),

('Moderado', 'Para personas con experiencia en ejercicio regular', 3, '#FFD700', NOW()),INSERT INTO intensities (name, level) VALUES 

('Intermedio', 'Requiere fuerza y resistencia moderada', 4, '#FF8C00', NOW());('Muy Suave', 1),

('Suave', 2), 

-- Tipos de ejercicio('Moderado', 3),

INSERT INTO exercise_types (name, description, created_at) VALUES('Intermedio', 4);

('Aeróbico', 'Ejercicios que mejoran la capacidad cardiovascular', NOW()),

('Resistencia', 'Ejercicios con pesas o bandas para fortalecer músculos', NOW()),SELECT 'OK - Intensidades insertadas:' as status, COUNT(*) as cantidad FROM intensities;

('Equilibrio', 'Ejercicios específicos para mejorar la estabilidad', NOW()),

('Estiramiento', 'Ejercicios para aumentar la flexibilidad muscular', NOW()),-- =====================================================

('Funcional', 'Ejercicios que simulan movimientos de la vida diaria', NOW()),-- 3. TIPOS DE EJERCICIO (5 registros)

('Coordinación', 'Ejercicios que mejoran la sincronización de movimientos', NOW());-- =====================================================



-- =====================================================INSERT INTO exercise_types (name, description, location_type) VALUES

-- PARTE 2: EJERCICIOS COMPLETOS CON GOOGLE DRIVE URLS('Ejercicio Sentado', 'Ejercicios que se realizan desde una silla', 'HOME'),

-- Total: 22 ejercicios('Ejercicio de Pie', 'Ejercicios que se realizan de pie con apoyo', 'HOME'),

-- =====================================================('Con Implementos', 'Ejercicios que requieren bandas elásticas o pesas', 'HOME'),

('Funcional', 'Ejercicios que simulan movimientos de la vida diaria', 'HOME'),

-- Ejercicio 1: Abductores('Resistencia', 'Ejercicios que mejoran la resistencia muscular', 'HOME');

INSERT INTO exercises (name, description, instructions, duration_seconds, repetitions, sets, video_url, image_url, category_id, intensity_id, exercise_type_id, benefits, safety_tips, modifications, created_at) VALUES

('Abductores',SELECT 'OK - Tipos de ejercicio insertados:' as status, COUNT(*) as cantidad FROM exercise_types;

'Ejercicio para fortalecer los músculos abductores de cadera, mejorando estabilidad y movilidad lateral.',

'1. Acuéstate de lado con piernas extendidas\n2. Levanta la pierna superior lentamente\n3. Mantén 2 segundos arriba\n4. Baja controladamente\n5. Cambia de lado después de completar series',-- =====================================================

NULL, 10, 2,-- 4. EJERCICIOS (22 registros)

'https://drive.google.com/file/d/1-oTnwJF2sEVjxM5igJFVfPuNsN0OTnPT/preview',-- =====================================================

'https://drive.google.com/uc?export=view&id=1-oTnwJF2sEVjxM5igJFVfPuNsN0OTnPT',

(SELECT id FROM categories WHERE name = 'Fortalecimiento'),-- FORTALECIMIENTO - SUAVE

(SELECT id FROM intensities WHERE name = 'Moderado'),INSERT INTO exercises (

(SELECT id FROM exercise_types WHERE name = 'Resistencia'),    name, description, instructions, benefits, safety_tips, modifications,

'Fortalece caderas, mejora estabilidad pélvica, previene lesiones de cadera',    duration_seconds, repetitions, sets, is_premium, is_active,

'Superficie cómoda, movimientos controlados, no balancear la pierna',    category_id, intensity_id, exercise_type_id, 

'Reducir altura de elevación, apoyar cabeza en almohada',    video_url, image_url

NOW());) VALUES



-- Ejercicio 2: Caminar Talón-Punta-- 1. Abductores

INSERT INTO exercises (name, description, instructions, duration_seconds, repetitions, sets, video_url, image_url, category_id, intensity_id, exercise_type_id, benefits, safety_tips, modifications, created_at) VALUES('Abductores', 

('Caminar Talón-Punta','Ejercicio para fortalecer los músculos abductores de la cadera, esenciales para la estabilidad pélvica.',

'Ejercicio de equilibrio que consiste en caminar colocando un pie justo delante del otro.','Sentado en una silla, coloque las manos en las rodillas. Separe las piernas contra la resistencia de sus manos. Mantenga 3 segundos y relaje.',

'1. Párate cerca de una pared para apoyo\n2. Coloca talón de un pie frente a dedos del otro\n3. Da pasos lentos y controlados\n4. Mantén vista al frente\n5. Usa apoyo solo si es necesario','Fortalece músculos de cadera, mejora estabilidad pélvica, previene caídas',

180, NULL, 3,'Mantenga la espalda recta. No fuerce el movimiento. Respire normalmente.',

'https://drive.google.com/file/d/10FqL7rB0kslMsNMdvVvCFQkAyp3nfTR0/preview','Puede usar una banda elástica entre las rodillas para mayor resistencia.',

'https://drive.google.com/uc?export=view&id=10FqL7rB0kslMsNMdvVvCFQkAyp3nfTR0',NULL, 10, 2, false, true,

(SELECT id FROM categories WHERE name = 'Equilibrio'),(SELECT id FROM categories WHERE name = 'Fortalecimiento'),

(SELECT id FROM intensities WHERE name = 'Intermedio'),(SELECT id FROM intensities WHERE name = 'Suave'),

(SELECT id FROM exercise_types WHERE name = 'Equilibrio'),(SELECT id FROM exercise_types WHERE name = 'Ejercicio Sentado'),

'Mejora equilibrio dinámico, fortalece músculos estabilizadores del tobillo','videos/ejercicios/abductores.mp4',

'Tener pared o silla cerca para apoyo, superficie antideslizante','images/ejercicios/abductores.jpg'),

'Separar ligeramente los pies, usar apoyo continuo',

NOW());-- 2. Extensión de Cuadríceps  

('Extensión de Cuadríceps',

-- Ejercicio 3: Círculos de Tobillo'Ejercicio sentado para fortalecer los músculos cuádriceps, fundamentales para levantarse y caminar.',

INSERT INTO exercises (name, description, instructions, duration_seconds, repetitions, sets, video_url, image_url, category_id, intensity_id, exercise_type_id, benefits, safety_tips, modifications, created_at) VALUES'Sentado en una silla, extienda lentamente una pierna hasta que esté recta. Mantenga 3 segundos y baje lentamente. Alterne piernas.',

('Círculos de Tobillo','Fortalece cuádriceps, mejora capacidad para levantarse, estabiliza rodillas',

'Ejercicio de movilidad para mejorar la flexibilidad y circulación en los tobillos.','Movimientos lentos y controlados. No bloquee completamente la rodilla.',

'1. Siéntate en una silla con espalda recta\n2. Levanta un pie del suelo\n3. Realiza círculos con el tobillo en sentido horario\n4. Repite en sentido antihorario\n5. Cambia de pie','Agregue peso en el tobillo para mayor dificultad.',

120, 10, 2,NULL, 10, 2, false, true,

'https://drive.google.com/file/d/11vETSPFrcfHyHE8FpmXtU7eAT6gNGF01/preview',(SELECT id FROM categories WHERE name = 'Fortalecimiento'),

'https://drive.google.com/uc?export=view&id=11vETSPFrcfHyHE8FpmXtU7eAT6gNGF01',(SELECT id FROM intensities WHERE name = 'Suave'),

(SELECT id FROM categories WHERE name = 'Movilidad'),(SELECT id FROM exercise_types WHERE name = 'Ejercicio Sentado'),

(SELECT id FROM intensities WHERE name = 'Muy Suave'),'videos/ejercicios/extension_cuadriceps.mp4',

(SELECT id FROM exercise_types WHERE name = 'Estiramiento'),'images/ejercicios/extension_cuadriceps.jpg'),

'Mejora movilidad del tobillo, reduce rigidez, estimula circulación',

'Movimientos suaves y controlados, no forzar el rango de movimiento',-- CARDIO - SUAVE

'Reducir tamaño de los círculos, hacer más despacio',-- 3. Puñetazos al Aire

NOW());('Puñetazos al Aire',

'Ejercicio cardiovascular suave que combina coordinación y fortalecimiento de brazos.',

-- Ejercicio 4: Elevación de Brazos y Hombros'De pie o sentado, alterne puñetazos hacia adelante con cada brazo. Mantenga movimientos controlados y rítmicos.',

INSERT INTO exercises (name, description, instructions, duration_seconds, repetitions, sets, video_url, image_url, category_id, intensity_id, exercise_type_id, benefits, safety_tips, modifications, created_at) VALUES'Mejora coordinación, fortalece brazos y core, ejercicio cardiovascular suave',

('Elevación de Brazos y Hombros','Evite movimientos bruscos. Mantenga los hombros relajados.',

'Ejercicio para mantener movilidad y fuerza en hombros y brazos.','Puede realizarse sentado para mayor estabilidad.',

'1. Párate o siéntate con espalda recta\n2. Levanta ambos brazos hacia adelante\n3. Continúa hasta arriba de la cabeza si es posible\n4. Baja lentamente por el mismo camino\n5. Respira profundamente durante el movimiento',180, NULL, NULL, false, true,

NULL, 10, 2,(SELECT id FROM categories WHERE name = 'Cardio'),

'https://drive.google.com/file/d/13kLNkQ7jjm2_-Jp_w5-Bmu4qMPVSI3QT/preview',(SELECT id FROM intensities WHERE name = 'Suave'),

'https://drive.google.com/uc?export=view&id=13kLNkQ7jjm2_-Jp_w5-Bmu4qMPVSI3QT',(SELECT id FROM exercise_types WHERE name = 'Ejercicio de Pie'),

(SELECT id FROM categories WHERE name = 'Movilidad'),'videos/ejercicios/punetazos_aire.mp4',

(SELECT id FROM intensities WHERE name = 'Suave'),'images/ejercicios/punetazos_aire.jpg'),

(SELECT id FROM exercise_types WHERE name = 'Estiramiento'),

'Mejora movilidad de hombros, mantiene rango de movimiento, alivia tensión',-- EQUILIBRIO - MODERADO

'No forzar si hay dolor, mantener hombros relajados',-- 4. Equilibrio sobre un Pie

'Elevar solo hasta donde sea cómodo, alternar brazos',('Equilibrio sobre un Pie',

NOW());'Ejercicio fundamental para mejorar el equilibrio y prevenir caídas.',

'De pie cerca de una silla para apoyo, levante un pie del suelo y mantenga el equilibrio. Comience con 10 segundos y aumente gradualmente.',

-- Ejercicio 5: Elevación de Rodilla (Sentado)'Mejora equilibrio, fortalece músculos estabilizadores, previene caídas',

INSERT INTO exercises (name, description, instructions, duration_seconds, repetitions, sets, video_url, image_url, category_id, intensity_id, exercise_type_id, benefits, safety_tips, modifications, created_at) VALUES'Mantenga siempre una silla cerca para apoyo. Comience con tiempos cortos.',

('Elevación de Rodilla (Sentado)','Apoye un dedo en la silla si es necesario. Cierre los ojos para mayor dificultad.',

'Ejercicio para fortalecer músculos abdominales y flexores de cadera desde posición sentada.',30, NULL, 3, false, true,

'1. Siéntate en el borde de una silla resistente\n2. Agarra los lados de la silla para estabilidad\n3. Levanta una rodilla hacia el pecho\n4. Baja lentamente sin tocar el suelo\n5. Alterna entre piernas',(SELECT id FROM categories WHERE name = 'Equilibrio'),

NULL, 8, 2,(SELECT id FROM intensities WHERE name = 'Moderado'),

'https://drive.google.com/file/d/15v3Px30RI9g-1jnElGXg24eKaB4u-6_v/preview',(SELECT id FROM exercise_types WHERE name = 'Ejercicio de Pie'),

'https://drive.google.com/uc?export=view&id=15v3Px30RI9g-1jnElGXg24eKaB4u-6_v','videos/ejercicios/equilibrio_un_pie.mp4',

(SELECT id FROM categories WHERE name = 'Fortalecimiento'),'images/ejercicios/equilibrio_un_pie.jpg'),

(SELECT id FROM intensities WHERE name = 'Suave'),

(SELECT id FROM exercise_types WHERE name = 'Funcional'),-- 5. Caminar Talón-Punta

'Fortalece abdomen y flexores de cadera, mejora control del core',('Caminar Talón-Punta',

'Silla estable, mantener espalda erguida, no balancearse','Ejercicio de equilibrio dinámico que mejora la coordinación y estabilidad.',

'Reducir altura de elevación, aumentar tiempo de descanso','Camine en línea recta colocando el talón de un pie directamente frente a los dedos del otro pie. Use los brazos para equilibrarse.',

NOW());'Mejora equilibrio dinámico, coordinación, confianza al caminar',

'Realice cerca de una pared para apoyo. Vaya lentamente.',

-- Ejercicio 6: Elevación de Talones y Puntas'Comience con pasos normales y gradualmente acérquelos.',

INSERT INTO exercises (name, description, instructions, duration_seconds, repetitions, sets, video_url, image_url, category_id, intensity_id, exercise_type_id, benefits, safety_tips, modifications, created_at) VALUESNULL, 10, 2, false, true,

('Elevación de Talones y Puntas',(SELECT id FROM categories WHERE name = 'Equilibrio'),

'Ejercicio para fortalecer pantorrillas y músculos del pie, mejorando equilibrio y circulación.',(SELECT id FROM intensities WHERE name = 'Moderado'),

'1. Párate derecho con apoyo de silla o pared\n2. Levanta lentamente los talones del suelo\n3. Mantén 2 segundos en puntas\n4. Baja lentamente\n5. Repite de forma controlada',(SELECT id FROM exercise_types WHERE name = 'Ejercicio de Pie'),

NULL, 12, 2,'videos/ejercicios/caminar_talon_punta.mp4',

'https://drive.google.com/file/d/1IRb5e6PHvtQj6cxkieeuGE-u_ehkNX5A/preview','images/ejercicios/caminar_talon_punta.jpg'),

'https://drive.google.com/uc?export=view&id=1IRb5e6PHvtQj6cxkieeuGE-u_ehkNX5A',

(SELECT id FROM categories WHERE name = 'Fortalecimiento'),-- MOVILIDAD - MUY SUAVE

(SELECT id FROM intensities WHERE name = 'Suave'),-- 6. Círculos de Tobillo

(SELECT id FROM exercise_types WHERE name = 'Funcional'),('Círculos de Tobillo',

'Fortalece pantorrillas, mejora equilibrio, estimula circulación en piernas','Ejercicio de movilidad para mantener flexibles las articulaciones del tobillo.',

'Usar apoyo para equilibrio, superficie antideslizante, no forzar altura','Sentado, levante un pie y realice círculos lentos con el tobillo en ambas direcciones. Repita con el otro pie.',

'Alternar un pie por vez, reducir rango si hay molestias','Mejora circulación, mantiene movilidad del tobillo, previene rigidez',

NOW());'Movimientos suaves y lentos. No fuerce la amplitud.',

'Puede realizarse con ambos pies simultáneamente.',

-- Ejercicio 7: Elevación Lateral de PiernaNULL, 10, 2, false, true,

INSERT INTO exercises (name, description, instructions, duration_seconds, repetitions, sets, video_url, image_url, category_id, intensity_id, exercise_type_id, benefits, safety_tips, modifications, created_at) VALUES(SELECT id FROM categories WHERE name = 'Movilidad'),

('Elevación Lateral de Pierna',(SELECT id FROM intensities WHERE name = 'Muy Suave'),

'Ejercicio para fortalecer músculos abductores y mejorar estabilidad lateral de cadera.',(SELECT id FROM exercise_types WHERE name = 'Ejercicio Sentado'),

'1. Párate derecho con apoyo de silla\n2. Levanta una pierna hacia el lado\n3. Mantén tronco erguido\n4. Baja lentamente\n5. Alterna entre piernas','videos/ejercicios/circulos_tobillo.mp4',

NULL, 8, 2,'images/ejercicios/circulos_tobillo.jpg'),

'https://drive.google.com/file/d/1J6sxowcvmAJxo1A8S6aooPnm8S-fm05H/preview',

'https://drive.google.com/uc?export=view&id=1J6sxowcvmAJxo1A8S6aooPnm8S-fm05H',-- FLEXIBILIDAD - MUY SUAVE

(SELECT id FROM categories WHERE name = 'Fortalecimiento'),-- 7. Rotación de Cuello

(SELECT id FROM intensities WHERE name = 'Moderado'),('Rotación de Cuello',

(SELECT id FROM exercise_types WHERE name = 'Funcional'),'Ejercicio suave para mantener la movilidad cervical y reducir tensión.',

'Fortalece abductores, mejora estabilidad pélvica, previene dolores de espalda','Sentado con espalda recta, gire lentamente la cabeza hacia un lado, luego al otro. Evite movimientos hacia atrás.',

'Mantener tronco erguido, no balancearse, usar apoyo constante','Reduce tensión cervical, mejora movilidad del cuello, alivia rigidez',

'Reducir altura de elevación, aumentar apoyo si es necesario','Nunca gire hacia atrás. Movimientos muy lentos y suaves.',

NOW());'Puede realizarse con inclinaciones laterales solamente.',

NULL, 5, 2, false, true,

-- Ejercicio 8: Equilibrio sobre un Pie(SELECT id FROM categories WHERE name = 'Flexibilidad'),

INSERT INTO exercises (name, description, instructions, duration_seconds, repetitions, sets, video_url, image_url, category_id, intensity_id, exercise_type_id, benefits, safety_tips, modifications, created_at) VALUES(SELECT id FROM intensities WHERE name = 'Muy Suave'),

('Equilibrio sobre un Pie',(SELECT id FROM exercise_types WHERE name = 'Ejercicio Sentado'),

'Ejercicio específico para mejorar equilibrio estático y fortalecer músculos estabilizadores.','videos/ejercicios/rotacion_cuello.mp4',

'1. Párate junto a una pared o silla\n2. Levanta un pie del suelo\n3. Mantén equilibrio todo el tiempo posible\n4. Usa apoyo solo si es necesario\n5. Alterna entre pies','images/ejercicios/rotacion_cuello.jpg'),

30, NULL, 3,

'https://drive.google.com/file/d/1Pu077sE3QL22e1MX-SITjVQ2MGT5LdOp/preview',-- FLEXIBILIDAD - SUAVE

'https://drive.google.com/uc?export=view&id=1Pu077sE3QL22e1MX-SITjVQ2MGT5LdOp',-- 8. Estiramiento Gato-Vaca (Sentado)

(SELECT id FROM categories WHERE name = 'Equilibrio'),('Estiramiento de Gato-Vaca (Sentado)',

(SELECT id FROM intensities WHERE name = 'Moderado'),'Adaptación del ejercicio clásico de yoga para mejorar la movilidad espinal.',

(SELECT id FROM exercise_types WHERE name = 'Equilibrio'),'Sentado, arquee suavemente la espalda mirando hacia arriba (vaca), luego curve la espalda hacia adelante (gato). Alterne lentamente.',

'Mejora equilibrio estático, fortalece músculos del pie, previene caídas','Mejora movilidad espinal, reduce dolor de espalda, aumenta flexibilidad',

'Tener apoyo cerca, superficie estable, progresar gradualmente','Movimientos suaves sin forzar. Coordine con la respiración.',

'Comenzar con apoyo ligero, reducir tiempo inicial','Puede realizarse con las manos en las rodillas para mayor apoyo.',

NOW());NULL, 8, 2, false, true,

(SELECT id FROM categories WHERE name = 'Flexibilidad'),

-- Ejercicio 9: Estiramiento de Gato-Vaca (Sentado)(SELECT id FROM intensities WHERE name = 'Suave'),

INSERT INTO exercises (name, description, instructions, duration_seconds, repetitions, sets, video_url, image_url, category_id, intensity_id, exercise_type_id, benefits, safety_tips, modifications, created_at) VALUES(SELECT id FROM exercise_types WHERE name = 'Ejercicio Sentado'),

('Estiramiento de Gato-Vaca (Sentado)','videos/ejercicios/estiramiento_gato_vaca_sentado.mp4',

'Ejercicio de movilidad espinal adaptado para realizar sentado, mejora flexibilidad de columna.','images/ejercicios/estiramiento_gato_vaca_sentado.jpg'),

'1. Siéntate al borde de una silla\n2. Coloca manos en rodillas\n3. Arquea espalda mirando hacia arriba (vaca)\n4. Redondea espalda mirando hacia abajo (gato)\n5. Alterna lentamente',

300, NULL, NULL,-- 9. Torsión Suave de Columna (Sentado)

'https://drive.google.com/file/d/1SH_qLOr5jaFQyiUTCY1-FjNcN5TmSS_x/preview',('Torsión Suave de Columna (Sentado)',

'https://drive.google.com/uc?export=view&id=1SH_qLOr5jaFQyiUTCY1-FjNcN5TmSS_x','Ejercicio de movilidad para mantener la flexibilidad rotacional de la columna.',

(SELECT id FROM categories WHERE name = 'Flexibilidad'),'Sentado con espalda recta, gire suavemente el tronco hacia un lado, ayudándose con las manos. Regrese al centro y repita al otro lado.',

(SELECT id FROM intensities WHERE name = 'Suave'),'Mejora movilidad rotacional, reduce rigidez espinal, mejora postura',

(SELECT id FROM exercise_types WHERE name = 'Estiramiento'),'Mantenga las caderas fijas. No fuerce el movimiento.',

'Mejora movilidad espinal, alivia tensión en espalda, reduce rigidez','Puede colocar las manos en el pecho para menor intensidad.',

'Movimientos lentos y controlados, no forzar rango de movimiento',NULL, 6, 2, false, true,

'Reducir amplitud de movimiento si hay molestias',(SELECT id FROM categories WHERE name = 'Flexibilidad'),

NOW());(SELECT id FROM intensities WHERE name = 'Moderado'),

(SELECT id FROM exercise_types WHERE name = 'Ejercicio Sentado'),

-- Ejercicio 10: Extensión de Cuadríceps'videos/ejercicios/torsion_suave_columna_sentado.mp4',

INSERT INTO exercises (name, description, instructions, duration_seconds, repetitions, sets, video_url, image_url, category_id, intensity_id, exercise_type_id, benefits, safety_tips, modifications, created_at) VALUES'images/ejercicios/torsion_suave_columna_sentado.jpg'),

('Extensión de Cuadríceps',

'Ejercicio para fortalecer músculos frontales del muslo, importante para caminar y levantarse.',-- FORTALECIMIENTO - MODERADO

'1. Siéntate en una silla con espalda recta\n2. Extiende lentamente una pierna\n3. Mantén 3 segundos\n4. Baja lentamente sin tocar el suelo\n5. Alterna entre piernas',-- 10. Elevación de Brazos y Hombros

NULL, 10, 2,('Elevación de Brazos y Hombros',

'https://drive.google.com/file/d/1Sr0WC4sOy1SWIEd3GoeAFwbrod5q4ZaZ/preview','Ejercicio para fortalecer deltoides y mejorar la movilidad del hombro.',

'https://drive.google.com/uc?export=view&id=1Sr0WC4sOy1SWIEd3GoeAFwbrod5q4ZaZ','De pie o sentado, levante los brazos hacia los lados hasta la altura de los hombros. Baje lentamente.',

(SELECT id FROM categories WHERE name = 'Fortalecimiento'),'Fortalece deltoides, mejora movilidad del hombro, mejora postura',

(SELECT id FROM intensities WHERE name = 'Moderado'),'No levante por encima de los hombros si hay dolor. Movimientos controlados.',

(SELECT id FROM exercise_types WHERE name = 'Resistencia'),'Use pesas ligeras o botellas de agua para mayor resistencia.',

'Fortalece cuadríceps, mejora función de rodilla, facilita levantarse',NULL, 10, 2, false, true,

'Mantener espalda apoyada, no bloquear rodilla completamente',(SELECT id FROM categories WHERE name = 'Fortalecimiento'),

'Reducir rango de extensión, usar menos repeticiones',(SELECT id FROM intensities WHERE name = 'Moderado'),

NOW());(SELECT id FROM exercise_types WHERE name = 'Ejercicio de Pie'),

'videos/ejercicios/elevacion_brazos_hombros.mp4',

-- Ejercicio 11: Flexiones en la Pared'images/ejercicios/elevacion_brazos_hombros.jpg'),

INSERT INTO exercises (name, description, instructions, duration_seconds, repetitions, sets, video_url, image_url, category_id, intensity_id, exercise_type_id, benefits, safety_tips, modifications, created_at) VALUES

('Flexiones en la Pared (Wall Push-up)',-- 11. Elevación de Rodilla (Sentado)

'Ejercicio de fortalecimiento para brazos, pecho y hombros adaptado para adultos mayores.',('Elevación de Rodilla (Sentado)',

'1. Párate a un brazo de distancia de la pared\n2. Coloca palmas contra la pared a altura del pecho\n3. Flexiona brazos acercándote a la pared\n4. Empuja para volver a posición inicial\n5. Mantén cuerpo recto','Ejercicio para fortalecer flexores de cadera y core.',

NULL, 8, 2,'Sentado con espalda recta, levante una rodilla hacia el pecho. Baje lentamente y repita con la otra pierna.',

'https://drive.google.com/file/d/1_RT3mZ4cLctx1JLk6L_bYwUorCvy7Lih/preview','Fortalece flexores de cadera, mejora core, facilita el caminar',

'https://drive.google.com/uc?export=view&id=1_RT3mZ4cLctx1JLk6L_bYwUorCvy7Lih','Mantenga la espalda recta. No se impulse con las manos.',

(SELECT id FROM categories WHERE name = 'Fortalecimiento'),'Puede sostener la rodilla por 3 segundos para mayor dificultad.',

(SELECT id FROM intensities WHERE name = 'Moderado'),NULL, 10, 2, false, true,

(SELECT id FROM exercise_types WHERE name = 'Resistencia'),(SELECT id FROM categories WHERE name = 'Fortalecimiento'),

'Fortalece pecho, hombros y tríceps, mejora fuerza funcional de brazos',(SELECT id FROM intensities WHERE name = 'Moderado'),

'Mantener cuerpo alineado, no acercar demasiado la cara a la pared',(SELECT id FROM exercise_types WHERE name = 'Ejercicio Sentado'),

'Aumentar distancia de la pared para menor intensidad','videos/ejercicios/elevacion_rodilla_sentado.mp4',

NOW());'images/ejercicios/elevacion_rodilla_sentado.jpg'),



-- Ejercicio 12: Jumping Jacks sin Salto-- 12. Elevación de Talones y Puntas

INSERT INTO exercises (name, description, instructions, duration_seconds, repetitions, sets, video_url, image_url, category_id, intensity_id, exercise_type_id, benefits, safety_tips, modifications, created_at) VALUES('Elevación de Talones y Puntas',

('Jumping Jacks sin Salto','Ejercicio para fortalecer pantorrillas y músculos del pie.',

'Ejercicio cardiovascular de bajo impacto que simula jumping jacks tradicionales.','De pie con apoyo, levante los talones (puntas de pie), luego levante las puntas (talones). Alterne lentamente.',

'1. Párate con pies juntos y brazos a los lados\n2. Da un paso lateral mientras subes brazos\n3. Regresa pies juntos bajando brazos\n4. Alterna lados de forma rítmica\n5. Mantén movimiento continuo','Fortalece pantorrillas, mejora equilibrio, facilita el caminar',

300, NULL, NULL,'Use apoyo siempre. Movimientos controlados.',

'https://drive.google.com/file/d/1_WieqLriX9ccZWIeiuZ3Po41Iyhz0YFe/preview','Puede realizar solo talones o solo puntas si es muy difícil.',

'https://drive.google.com/uc?export=view&id=1_WieqLriX9ccZWIeiuZ3Po41Iyhz0YFe',NULL, 15, 2, false, true,

(SELECT id FROM categories WHERE name = 'Cardio'),(SELECT id FROM categories WHERE name = 'Fortalecimiento'),

(SELECT id FROM intensities WHERE name = 'Moderado'),(SELECT id FROM intensities WHERE name = 'Moderado'),

(SELECT id FROM exercise_types WHERE name = 'Aeróbico'),(SELECT id FROM exercise_types WHERE name = 'Ejercicio de Pie'),

'Mejora capacidad cardiovascular, coordina extremidades, bajo impacto','videos/ejercicios/elevacion_talones_puntas.mp4',

'Superficie antideslizante, mantener ritmo cómodo, parar si hay fatiga','images/ejercicios/elevacion_talones_puntas.jpg'),

'Reducir amplitud de brazos, hacer movimiento más lento',

NOW());-- 13. Elevación Lateral de Pierna

('Elevación Lateral de Pierna',

-- Ejercicio 13: Marcha en el Sitio'Ejercicio para fortalecer abductores de cadera y mejorar estabilidad lateral.',

INSERT INTO exercises (name, description, instructions, duration_seconds, repetitions, sets, video_url, image_url, category_id, intensity_id, exercise_type_id, benefits, safety_tips, modifications, created_at) VALUES'De pie con apoyo, levante una pierna hacia el lado manteniendo el cuerpo recto. Baje lentamente.',

('Marcha en el Sitio','Fortalece abductores, mejora estabilidad lateral, previene caídas',

'Ejercicio cardiovascular básico que simula caminar sin desplazamiento.','Mantenga el cuerpo recto. No se incline hacia el lado contrario.',

'1. Párate derecho con brazos relajados\n2. Levanta una rodilla como si caminaras\n3. Alterna piernas de forma rítmica\n4. Balancea brazos naturalmente\n5. Mantén postura erguida','Comience con elevaciones pequeñas y aumente gradualmente.',

300, NULL, NULL,NULL, 10, 2, false, true,

'https://drive.google.com/file/d/1h784l-aYYANrX02al64zGZPjL5DM_mVb/preview',(SELECT id FROM categories WHERE name = 'Fortalecimiento'),

'https://drive.google.com/uc?export=view&id=1h784l-aYYANrX02al64zGZPjL5DM_mVb',(SELECT id FROM intensities WHERE name = 'Moderado'),

(SELECT id FROM categories WHERE name = 'Cardio'),(SELECT id FROM exercise_types WHERE name = 'Ejercicio de Pie'),

(SELECT id FROM intensities WHERE name = 'Suave'),'videos/ejercicios/elevacion_lateral_pierna.mp4',

(SELECT id FROM exercise_types WHERE name = 'Aeróbico'),'images/ejercicios/elevacion_lateral_pierna.jpg'),

'Mejora coordinación, activa sistema cardiovascular, bajo impacto articular',

'Mantener equilibrio, no levantar rodillas demasiado alto al inicio',-- 14. Flexiones en la Pared (Wall Push-up)

'Reducir altura de las rodillas, usar apoyo si es necesario',('Flexiones en la Pared (Wall Push-up)',

NOW());'Adaptación segura de las flexiones tradicionales para adultos mayores.',

'De pie frente a una pared, coloque las palmas contra ella. Inclínese hacia adelante y empuje de vuelta.',

-- Ejercicio 14: Paso Lateral'Fortalece pecho, brazos y core de forma segura',

INSERT INTO exercises (name, description, instructions, duration_seconds, repetitions, sets, video_url, image_url, category_id, intensity_id, exercise_type_id, benefits, safety_tips, modifications, created_at) VALUES'Mantenga los pies firmes. Controle la velocidad del movimiento.',

('Paso Lateral','Aléjese más de la pared para mayor dificultad.',

'Ejercicio que combina fortalecimiento y equilibrio mediante pasos controlados hacia los lados.',NULL, 8, 2, false, true,

'1. Párate con pies separados al ancho de hombros\n2. Da un paso lateral amplio con una pierna\n3. Lleva la otra pierna para juntar pies\n4. Repite hacia el mismo lado\n5. Cambia dirección después de serie',(SELECT id FROM categories WHERE name = 'Fortalecimiento'),

240, NULL, NULL,(SELECT id FROM intensities WHERE name = 'Moderado'),

'https://drive.google.com/file/d/1hCyporUKsOIuFiHz7PE3CfocJf-SYkUV/preview',(SELECT id FROM exercise_types WHERE name = 'Ejercicio de Pie'),

'https://drive.google.com/uc?export=view&id=1hCyporUKsOIuFiHz7PE3CfocJf-SYkUV','videos/ejercicios/flexiones_pared_wall_push_up.mp4',

(SELECT id FROM categories WHERE name = 'Equilibrio'),'images/ejercicios/flexiones_pared_wall_push_up.jpg'),

(SELECT id FROM intensities WHERE name = 'Moderado'),

(SELECT id FROM exercise_types WHERE name = 'Funcional'),-- 15. Sentarse y Levantarse de una Silla (Chair Squat)

'Mejora estabilidad lateral, fortalece piernas, mejora coordinación',('Sentarse y Levantarse de una Silla (Chair Squat)',

'Superficie estable, pasos controlados, tener apoyo disponible','Ejercicio funcional esencial para mantener independencia en actividades diarias.',

'Reducir amplitud del paso, usar baranda para apoyo','Sentado al borde de una silla, levántese usando principalmente las piernas. Siéntese lentamente.',

NOW());'Fortalece piernas, mejora independencia funcional, facilita actividades diarias',

'Use brazos solo si es necesario. Controle el descenso.',

-- Ejercicio 15: Peso muerto con mancuernas'Coloque almohadas en la silla para reducir la profundidad.',

INSERT INTO exercises (name, description, instructions, duration_seconds, repetitions, sets, video_url, image_url, category_id, intensity_id, exercise_type_id, benefits, safety_tips, modifications, created_at) VALUESNULL, 8, 2, false, true,

('Peso muerto con mancuernas',(SELECT id FROM categories WHERE name = 'Fortalecimiento'),

'Ejercicio avanzado de fortalecimiento para espalda baja, glúteos y piernas.',(SELECT id FROM intensities WHERE name = 'Moderado'),

'1. Párate con pies al ancho de hombros sosteniendo mancuernas\n2. Mantén espalda recta\n3. Flexiona caderas empujándolas hacia atrás\n4. Baja mancuernas manteniendo cerca del cuerpo\n5. Regresa a posición inicial',(SELECT id FROM exercise_types WHERE name = 'Funcional'),

NULL, 6, 2,'videos/ejercicios/sentarse_levantarse_silla_chair_squat.mp4',

'https://drive.google.com/file/d/1hUHxF3iDZ_2jGViFT3H6cqlaLS7SwkJ1/preview','images/ejercicios/sentarse_levantarse_silla_chair_squat.jpg'),

'https://drive.google.com/uc?export=view&id=1hUHxF3iDZ_2jGViFT3H6cqlaLS7SwkJ1',

(SELECT id FROM categories WHERE name = 'Fortalecimiento'),-- CARDIO - MODERADO

(SELECT id FROM intensities WHERE name = 'Intermedio'),-- 16. Jumping Jacks sin Salto

(SELECT id FROM exercise_types WHERE name = 'Resistencia'),('Jumping Jacks sin Salto',

'Fortalece cadena posterior, mejora postura, fortalece core','Versión adaptada del ejercicio clásico, segura para adultos mayores.',

'Mantener espalda neutra, no redondear columna, peso apropiado','De pie, dé un paso lateral mientras levanta los brazos. Regrese al centro y repita al otro lado.',

'Usar peso más liviano, reducir rango de movimiento','Ejercicio cardiovascular, mejora coordinación, fortalece todo el cuerpo',

NOW());'Mantenga siempre un pie en el suelo. Use apoyo si es necesario.',

'Puede realizarse sentado moviendo solo brazos y una pierna.',

-- Ejercicio 16: Puñetazos al Aire180, NULL, NULL, false, true,

INSERT INTO exercises (name, description, instructions, duration_seconds, repetitions, sets, video_url, image_url, category_id, intensity_id, exercise_type_id, benefits, safety_tips, modifications, created_at) VALUES(SELECT id FROM categories WHERE name = 'Cardio'),

('Puñetazos al Aire',(SELECT id FROM intensities WHERE name = 'Moderado'),

'Ejercicio cardiovascular que combina movimiento de brazos con activación del core.',(SELECT id FROM exercise_types WHERE name = 'Ejercicio de Pie'),

'1. Párate con pies separados, rodillas ligeramente flexionadas\n2. Puños cerrados a altura del pecho\n3. Extiende un brazo como dando un puñetazo\n4. Alterna brazos de forma rítmica\n5. Mantén core activado','videos/ejercicios/jumping_jacks_sin_salto.mp4',

300, NULL, NULL,'images/ejercicios/jumping_jacks_sin_salto.jpg'),

'https://drive.google.com/file/d/1j01Wd6X_Atzn3sgta5sp4iow6o-JmM1X/preview',

'https://drive.google.com/uc?export=view&id=1j01Wd6X_Atzn3sgta5sp4iow6o-JmM1X',-- 17. Marcha en el Sitio

(SELECT id FROM categories WHERE name = 'Cardio'),('Marcha en el Sitio',

(SELECT id FROM intensities WHERE name = 'Moderado'),'Ejercicio cardiovascular fundamental y seguro para adultos mayores.',

(SELECT id FROM exercise_types WHERE name = 'Aeróbico'),'De pie, levante alternadamente las rodillas como si estuviera marchando. Mueva los brazos naturalmente.',

'Mejora coordinación, activa sistema cardiovascular, fortalece brazos','Mejora cardiovascular, coordinación, fortalece piernas',

'No extender completamente los brazos, mantener control en todo momento','Levante las rodillas a altura cómoda. Use apoyo si es necesario.',

'Reducir velocidad e intensidad, hacer movimientos más pequeños','Puede realizarse sentado para menor intensidad.',

NOW());180, NULL, NULL, false, true,

(SELECT id FROM categories WHERE name = 'Cardio'),

-- Ejercicio 17: Remo con barra(SELECT id FROM intensities WHERE name = 'Moderado'),

INSERT INTO exercises (name, description, instructions, duration_seconds, repetitions, sets, video_url, image_url, category_id, intensity_id, exercise_type_id, benefits, safety_tips, modifications, created_at) VALUES(SELECT id FROM exercise_types WHERE name = 'Ejercicio de Pie'),

('Remo con barra','videos/ejercicios/marcha_sitio.mp4',

'Ejercicio de fortalecimiento para músculos de la espalda y brazos usando barra.','images/ejercicios/marcha_sitio.jpg'),

'1. Párate con pies al ancho de hombros sosteniendo barra\n2. Inclínate ligeramente hacia adelante\n3. Tira de la barra hacia el abdomen\n4. Mantén codos cerca del cuerpo\n5. Baja controladamente',

NULL, 8, 3,-- EQUILIBRIO - MODERADO

'https://drive.google.com/file/d/1qy7qToU3n44lJT2IJT-lBfEW_rKoQ7gA/preview',-- 18. Paso Lateral

'https://drive.google.com/uc?export=view&id=1qy7qToU3n44lJT2IJT-lBfEW_rKoQ7gA',('Paso Lateral',

(SELECT id FROM categories WHERE name = 'Fortalecimiento'),'Ejercicio de equilibrio dinámico y fortalecimiento de piernas.',

(SELECT id FROM intensities WHERE name = 'Intermedio'),'De pie, dé pasos laterales controlados hacia un lado y luego hacia el otro. Mantenga el equilibrio.',

(SELECT id FROM exercise_types WHERE name = 'Resistencia'),'Mejora equilibrio lateral, fortalece piernas, mejora coordinación',

'Fortalece espalda media y alta, mejora postura, equilibra musculatura','Pasos pequeños y controlados. Use apoyo si es necesario.',

'Mantener espalda recta, no usar impulso, peso apropiado','Comience con pasos muy pequeños.',

'Usar peso más liviano, reducir rango de movimiento',NULL, 10, 2, false, true,

NOW());(SELECT id FROM categories WHERE name = 'Equilibrio'),

(SELECT id FROM intensities WHERE name = 'Moderado'),

-- Ejercicio 18: Remo con Banda Elástica(SELECT id FROM exercise_types WHERE name = 'Ejercicio de Pie'),

INSERT INTO exercises (name, description, instructions, duration_seconds, repetitions, sets, video_url, image_url, category_id, intensity_id, exercise_type_id, benefits, safety_tips, modifications, created_at) VALUES'videos/ejercicios/paso_lateral.mp4',

('Remo con Banda Elástica (si tienes)','images/ejercicios/paso_lateral.jpg'),

'Ejercicio de fortalecimiento para espalda usando banda elástica como resistencia.',

'1. Siéntate con piernas extendidas\n2. Coloca banda alrededor de los pies\n3. Tira de la banda hacia el abdomen\n4. Mantén espalda recta\n5. Regresa controladamente',-- FORTALECIMIENTO CON IMPLEMENTOS - MODERADO

NULL, 12, 2,-- 19. Remo con Banda Elástica (si tienes)

'https://drive.google.com/file/d/1uF9DfCtDFOA1teTO4K9LjgXrfG4naiKf/preview',('Remo con Banda Elástica (si tienes)',

'https://drive.google.com/uc?export=view&id=1uF9DfCtDFOA1teTO4K9LjgXrfG4naiKf','Ejercicio para fortalecer espalda y mejorar postura usando banda elástica.',

(SELECT id FROM categories WHERE name = 'Fortalecimiento'),'Sentado, sujete la banda elástica y tire hacia atrás apretando los omóplatos. Controle el regreso.',

(SELECT id FROM intensities WHERE name = 'Moderado'),'Fortalece espalda, mejora postura, contrarresta encorvamiento',

(SELECT id FROM exercise_types WHERE name = 'Resistencia'),'Mantenga la espalda recta. Controle ambas fases del movimiento.',

'Fortalece músculos de la espalda, mejora postura, resistencia ajustable','Use toalla si no tiene banda elástica.',

'Mantener tensión constante en la banda, no permitir que se suelte bruscamente',NULL, 10, 2, false, true,

'Usar banda de menor resistencia, reducir rango de movimiento',(SELECT id FROM categories WHERE name = 'Fortalecimiento'),

NOW());(SELECT id FROM intensities WHERE name = 'Moderado'),

(SELECT id FROM exercise_types WHERE name = 'Con Implementos'),

-- Ejercicio 19: Rotación de Cuello'videos/ejercicios/remo_banda_elastica_si_tienes.mp4',

INSERT INTO exercises (name, description, instructions, duration_seconds, repetitions, sets, video_url, image_url, category_id, intensity_id, exercise_type_id, benefits, safety_tips, modifications, created_at) VALUES'images/ejercicios/remo_banda_elastica_si_tienes.jpg'),

('Rotación de Cuello',

'Ejercicio suave de movilidad para mantener flexible la zona cervical.',-- 20. Remo con barra

'1. Siéntate o párate con espalda recta\n2. Gira lentamente la cabeza hacia la derecha\n3. Regresa al centro\n4. Gira hacia la izquierda\n5. Movimientos lentos y controlados',('Remo con barra',

180, 5, 1,'Ejercicio de fortalecimiento de espalda usando barra ligera o palo de escoba.',

'https://drive.google.com/file/d/1uarQnmcFWA09fLSWxHXVOlJmyvZBXxsJ/preview','De pie o sentado, sujete una barra con ambas manos y tire hacia el pecho apretando los omóplatos.',

'https://drive.google.com/uc?export=view&id=1uarQnmcFWA09fLSWxHXVOlJmyvZBXxsJ','Fortalece espalda media, mejora postura, desarrolla fuerza funcional',

(SELECT id FROM categories WHERE name = 'Movilidad'),'Use peso ligero. Mantenga la espalda recta durante todo el movimiento.',

(SELECT id FROM intensities WHERE name = 'Muy Suave'),'Puede usar palo de escoba o toalla enrollada.',

(SELECT id FROM exercise_types WHERE name = 'Estiramiento'),NULL, 10, 2, false, true,

'Mantiene movilidad cervical, alivia tensión del cuello, mejora flexibilidad',(SELECT id FROM categories WHERE name = 'Fortalecimiento'),

'Movimientos muy lentos, no forzar rango, parar si hay mareo',(SELECT id FROM intensities WHERE name = 'Moderado'),

'Reducir rango de rotación, hacer solo hacia un lado si es más cómodo',(SELECT id FROM exercise_types WHERE name = 'Con Implementos'),

NOW());'videos/ejercicios/remo_barra.mp4',

'images/ejercicios/remo_barra.jpg'),

-- Ejercicio 20: Sentadilla

INSERT INTO exercises (name, description, instructions, duration_seconds, repetitions, sets, video_url, image_url, category_id, intensity_id, exercise_type_id, benefits, safety_tips, modifications, created_at) VALUES-- FORTALECIMIENTO - INTERMEDIO

('Sentadilla',-- 21. Peso muerto con mancuernas

'Ejercicio fundamental para fortalecer piernas y glúteos, versión adaptada para adultos mayores.',('Peso muerto con mancuernas',

'1. Párate frente a una silla con pies separados\n2. Baja como si fueras a sentarte\n3. Detente justo antes de tocar la silla\n4. Regresa a posición de pie\n5. Usa la silla como referencia','Ejercicio funcional para fortalecer cadena posterior (espalda baja, glúteos, isquiotibiales).',

NULL, 8, 2,'De pie con mancuernas ligeras, inclínese hacia adelante desde las caderas manteniendo la espalda recta. Regrese a la posición inicial.',

'https://drive.google.com/file/d/1vUQbZSy_e1QeZTUj32FFO0iyBi40-41N/preview','Fortalece cadena posterior, mejora postura, facilita levantamiento de objetos',

'https://drive.google.com/uc?export=view&id=1vUQbZSy_e1QeZTUj32FFO0iyBi40-41N','Use peso muy ligero. Mantenga la espalda recta. Movimiento desde las caderas.',

(SELECT id FROM categories WHERE name = 'Fortalecimiento'),'Comience sin peso, solo con el movimiento.',

(SELECT id FROM intensities WHERE name = 'Intermedio'),NULL, 8, 2, false, true,

(SELECT id FROM exercise_types WHERE name = 'Funcional'),(SELECT id FROM categories WHERE name = 'Fortalecimiento'),

'Fortalece piernas y glúteos, mejora función de levantarse, aumenta independencia',(SELECT id FROM intensities WHERE name = 'Intermedio'),

'Mantener peso en talones, rodillas alineadas con pies, usar silla como guía',(SELECT id FROM exercise_types WHERE name = 'Con Implementos'),

'Sentarse completamente en la silla si es necesario, usar apoyo de brazos','videos/ejercicios/peso_muerto_mancuernas.mp4',

NOW());'images/ejercicios/peso_muerto_mancuernas.jpg'),



-- Ejercicio 21: Sentarse y Levantarse de una Silla-- 22. Sentadilla

INSERT INTO exercises (name, description, instructions, duration_seconds, repetitions, sets, video_url, image_url, category_id, intensity_id, exercise_type_id, benefits, safety_tips, modifications, created_at) VALUES('Sentadilla',

('Sentarse y Levantarse de una Silla (Chair Squat)','Ejercicio funcional fundamental para fortalecer piernas y glúteos.',

'Ejercicio funcional que practica el movimiento esencial de sentarse y levantarse.','De pie, baje como si fuera a sentarse en una silla, manteniendo el peso en los talones. Levántese lentamente.',

'1. Párate frente a una silla resistente\n2. Siéntate lentamente en la silla\n3. Levántate sin usar las manos si es posible\n4. Controla el movimiento en ambas direcciones\n5. Repite de forma controlada','Fortalece cuádriceps, glúteos, mejora independencia funcional',

NULL, 10, 2,'No baje más allá de 90 grados. Mantenga las rodillas alineadas con los pies.',

'https://drive.google.com/file/d/1yPI4qOE-WOLTTGpzp9tam7Am6z6Sp-EG/preview','Use una silla detrás para mayor seguridad.',

'https://drive.google.com/uc?export=view&id=1yPI4qOE-WOLTTGpzp9tam7Am6z6Sp-EG',NULL, 8, 2, false, true,

(SELECT id FROM categories WHERE name = 'Fortalecimiento'),(SELECT id FROM categories WHERE name = 'Fortalecimiento'),

(SELECT id FROM intensities WHERE name = 'Moderado'),(SELECT id FROM intensities WHERE name = 'Intermedio'),

(SELECT id FROM exercise_types WHERE name = 'Funcional'),(SELECT id FROM exercise_types WHERE name = 'Funcional'),

'Fortalece piernas, practica movimiento funcional, mejora independencia','videos/ejercicios/sentadilla.mp4',

'Silla resistente y estable, usar brazos de silla si es necesario','images/ejercicios/sentadilla.jpg');

'Permitir uso de brazos para apoyo, silla más alta si es necesario',

NOW());SELECT 'OK - Ejercicios insertados:' as status, COUNT(*) as cantidad FROM exercises;



-- Ejercicio 22: Torsión Suave de Columna-- =====================================================

INSERT INTO exercises (name, description, instructions, duration_seconds, repetitions, sets, video_url, image_url, category_id, intensity_id, exercise_type_id, benefits, safety_tips, modifications, created_at) VALUES-- 5. RUTINAS (7 registros)

('Torsión Suave de Columna (Sentado)',-- =====================================================

'Ejercicio de movilidad espinal que mejora la rotación de la columna vertebral.',

'1. Siéntate en el borde de una silla\n2. Coloca manos en hombros opuestos\n3. Gira lentamente el tronco hacia un lado\n4. Regresa al centro\n5. Repite hacia el otro lado',-- RUTINA 1: Calentamiento y Movilidad Matutina

240, 5, 1,INSERT INTO routines (title, description, duration_minutes, is_premium, category_id, intensity_id, video_url, thumbnail_url) 

'https://drive.google.com/file/d/1yvNBjUb0zZ3VM1bu6ERSRNF0j05gkj2k/preview',VALUES (

'https://drive.google.com/uc?export=view&id=1yvNBjUb0zZ3VM1bu6ERSRNF0j05gkj2k',    'Calentamiento y Movilidad Matutina',

(SELECT id FROM categories WHERE name = 'Movilidad'),    'Rutina suave de calentamiento perfecta para comenzar el día. Incluye ejercicios de movilidad articular y estiramientos suaves que preparan el cuerpo para las actividades diarias.',

(SELECT id FROM intensities WHERE name = 'Suave'),    15,

(SELECT id FROM exercise_types WHERE name = 'Estiramiento'),    false,

'Mejora rotación espinal, alivia rigidez de espalda, mantiene flexibilidad',    (SELECT id FROM categories WHERE name = 'Flexibilidad'),

'Mantener pelvis estable, no forzar rotación, movimientos lentos',    (SELECT id FROM intensities WHERE name = 'Muy Suave'),

'Reducir rango de rotación, hacer solo hacia un lado si es más cómodo',    'videos/rutinas/calentamiento_matutino.mp4',

NOW());    'images/rutinas/calentamiento_matutino.jpg'

);

-- =====================================================

-- PARTE 3: RUTINAS COMPLETAS-- RUTINA 2: Fortalecimiento Suave en Casa

-- Total: 7 rutinas (5 gratuitas + 2 premium)INSERT INTO routines (title, description, duration_minutes, is_premium, category_id, intensity_id, video_url, thumbnail_url)

-- =====================================================VALUES (

    'Fortalecimiento Suave en Casa',

-- Rutina 1: Calentamiento y Movilidad Matutina    'Rutina de fortalecimiento diseñada para adultos mayores. Ejercicios seguros y efectivos que se pueden realizar en casa con una silla como apoyo principal.',

INSERT INTO routines (title, description, duration_minutes, is_premium, video_url, thumbnail_url, category_id, intensity_id, created_at) VALUES    20,

('Calentamiento y Movilidad Matutina',    false,

'Rutina perfecta para comenzar el día con ejercicios suaves de movilidad que despiertan el cuerpo. Incluye movimientos para cuello, hombros, tobillos y columna. Ideal para personas que buscan activarse sin impacto.',    (SELECT id FROM categories WHERE name = 'Fortalecimiento'),

15, 0, NULL, NULL,    (SELECT id FROM intensities WHERE name = 'Suave'),

(SELECT id FROM categories WHERE name = 'Movilidad'),    'videos/rutinas/fortalecimiento_suave.mp4',

(SELECT id FROM intensities WHERE name = 'Muy Suave'),    'images/rutinas/fortalecimiento_suave.jpg'

NOW()););



-- Rutina 2: Fortalecimiento Suave en Casa-- RUTINA 3: Equilibrio y Coordinación

INSERT INTO routines (title, description, duration_minutes, is_premium, video_url, thumbnail_url, category_id, intensity_id, created_at) VALUESINSERT INTO routines (title, description, duration_minutes, is_premium, category_id, intensity_id, video_url, thumbnail_url)

('Fortalecimiento Suave en Casa',VALUES (

'Rutina diseñada para fortalecer principales grupos musculares usando el peso del propio cuerpo y una silla. Ejercicios seguros y efectivos para mantener la fuerza funcional.',    'Equilibrio y Coordinación',

20, 0, NULL, NULL,    'Rutina especializada en mejorar el equilibrio y la coordinación. Esencial para prevenir caídas y mantener la independencia en las actividades diarias.',

(SELECT id FROM categories WHERE name = 'Fortalecimiento'),    18,

(SELECT id FROM intensities WHERE name = 'Suave'),    false,

NOW());    (SELECT id FROM categories WHERE name = 'Equilibrio'),

    (SELECT id FROM intensities WHERE name = 'Moderado'),

-- Rutina 3: Equilibrio y Coordinación    'videos/rutinas/equilibrio_coordinacion.mp4',

INSERT INTO routines (title, description, duration_minutes, is_premium, video_url, thumbnail_url, category_id, intensity_id, created_at) VALUES    'images/rutinas/equilibrio_coordinacion.jpg'

('Equilibrio y Coordinación',);

'Rutina enfocada en mejorar el equilibrio estático y dinámico. Incluye ejercicios progresivos que ayudan a prevenir caídas y mejorar la estabilidad en actividades diarias.',

18, 0, NULL, NULL,-- RUTINA 4: Cardio Activo y Suave

(SELECT id FROM categories WHERE name = 'Equilibrio'),INSERT INTO routines (title, description, duration_minutes, is_premium, category_id, intensity_id, video_url, thumbnail_url)

(SELECT id FROM intensities WHERE name = 'Moderado'),VALUES (

NOW());    'Cardio Activo y Suave',

    'Rutina cardiovascular de bajo impacto diseñada para mejorar la resistencia y energía. Ejercicios dinámicos pero seguros para el sistema cardiovascular.',

-- Rutina 4: Cardio Activo y Suave    25,

INSERT INTO routines (title, description, duration_minutes, is_premium, video_url, thumbnail_url, category_id, intensity_id, created_at) VALUES    false,

('Cardio Activo y Suave',    (SELECT id FROM categories WHERE name = 'Cardio'),

'Rutina cardiovascular de bajo impacto que aumenta la frecuencia cardíaca sin sobrecargar las articulaciones. Combina marcha, pasos laterales y movimientos de brazos.',    (SELECT id FROM intensities WHERE name = 'Moderado'),

25, 0, NULL, NULL,    'videos/rutinas/cardio_activo_suave.mp4',

(SELECT id FROM categories WHERE name = 'Cardio'),    'images/rutinas/cardio_activo_suave.jpg'

(SELECT id FROM intensities WHERE name = 'Moderado'),);

NOW());

-- RUTINA 5: Fuerza Funcional (PREMIUM)

-- Rutina 5: Fuerza Funcional (Premium)INSERT INTO routines (title, description, duration_minutes, is_premium, category_id, intensity_id, video_url, thumbnail_url)

INSERT INTO routines (title, description, duration_minutes, is_premium, video_url, thumbnail_url, category_id, intensity_id, created_at) VALUESVALUES (

('Fuerza Funcional',    'Fuerza Funcional',

'Rutina premium de fortalecimiento que incluye ejercicios más desafiantes con mancuernas livianas o bandas elásticas. Diseñada para personas con experiencia en ejercicio regular.',    'Rutina premium de fortalecimiento funcional. Incluye ejercicios más avanzados con implementos para desarrollar fuerza práctica para las actividades diarias.',

30, 1, NULL, NULL,    30,

(SELECT id FROM categories WHERE name = 'Fortalecimiento'),    true,

(SELECT id FROM intensities WHERE name = 'Intermedio'),    (SELECT id FROM categories WHERE name = 'Fortalecimiento'),

NOW());    (SELECT id FROM intensities WHERE name = 'Intermedio'),

    'videos/rutinas/fuerza_funcional.mp4',

-- Rutina 6: Flexibilidad y Relajación    'images/rutinas/fuerza_funcional.jpg'

INSERT INTO routines (title, description, duration_minutes, is_premium, video_url, thumbnail_url, category_id, intensity_id, created_at) VALUES);

('Flexibilidad y Relajación',

'Rutina suave centrada en estiramientos y ejercicios de flexibilidad. Perfecta para finalizar el día o después de otras actividades físicas. Incluye respiración consciente.',-- RUTINA 6: Movilidad Completa

12, 0, NULL, NULL,INSERT INTO routines (title, description, duration_minutes, is_premium, category_id, intensity_id, video_url, thumbnail_url)

(SELECT id FROM categories WHERE name = 'Flexibilidad'),VALUES (

(SELECT id FROM intensities WHERE name = 'Suave'),    'Movilidad Completa',

NOW());    'Rutina integral de movilidad que trabaja todas las articulaciones principales. Ideal para días de recuperación o como rutina de mantenimiento.',

    22,

-- Rutina 7: Resistencia General (Premium)    false,

INSERT INTO routines (title, description, duration_minutes, is_premium, video_url, thumbnail_url, category_id, intensity_id, created_at) VALUES    (SELECT id FROM categories WHERE name = 'Movilidad'),

('Resistencia General',    (SELECT id FROM intensities WHERE name = 'Suave'),

'Rutina completa que combina ejercicios de fuerza, equilibrio y cardio en formato circuito. Desafía múltiples sistemas del cuerpo para mejorar la resistencia general.',    'videos/rutinas/movilidad_completa.mp4',

35, 1, NULL, NULL,    'images/rutinas/movilidad_completa.jpg'

(SELECT id FROM categories WHERE name = 'Fortalecimiento'),);

(SELECT id FROM intensities WHERE name = 'Intermedio'),

NOW());-- RUTINA 7: Resistencia General

INSERT INTO routines (title, description, duration_minutes, is_premium, category_id, intensity_id, video_url, thumbnail_url)

-- =====================================================VALUES (

-- PARTE 4: RELACIONES RUTINA-EJERCICIO    'Resistencia General',

-- Total: 30 relaciones    'Rutina completa de resistencia cardiovascular que combina ejercicios de cardio moderado para mejorar la resistencia general y la energía diaria.',

-- =====================================================    35,

    false,

-- Rutina 1: Calentamiento y Movilidad Matutina (5 ejercicios)    (SELECT id FROM categories WHERE name = 'Cardio'),

INSERT INTO routine_exercises (routine_id, exercise_id, order_in_routine, duration_seconds, rest_time_seconds) VALUES    (SELECT id FROM intensities WHERE name = 'Moderado'),

((SELECT id FROM routines WHERE title = 'Calentamiento y Movilidad Matutina'), (SELECT id FROM exercises WHERE name = 'Rotación de Cuello'), 1, 180, 30),    'videos/rutinas/resistencia_general.mp4',

((SELECT id FROM routines WHERE title = 'Calentamiento y Movilidad Matutina'), (SELECT id FROM exercises WHERE name = 'Elevación de Brazos y Hombros'), 2, NULL, 30),    'images/rutinas/resistencia_general.jpg'

((SELECT id FROM routines WHERE title = 'Calentamiento y Movilidad Matutina'), (SELECT id FROM exercises WHERE name = 'Círculos de Tobillo'), 3, 120, 30),);

((SELECT id FROM routines WHERE title = 'Calentamiento y Movilidad Matutina'), (SELECT id FROM exercises WHERE name = 'Estiramiento de Gato-Vaca (Sentado)'), 4, 300, 30),

((SELECT id FROM routines WHERE title = 'Calentamiento y Movilidad Matutina'), (SELECT id FROM exercises WHERE name = 'Torsión Suave de Columna (Sentado)'), 5, 240, 0);SELECT 'OK - Rutinas insertadas:' as status, COUNT(*) as cantidad FROM routines;



-- Rutina 2: Fortalecimiento Suave en Casa (4 ejercicios)-- =====================================================

INSERT INTO routine_exercises (routine_id, exercise_id, order_in_routine, duration_seconds, rest_time_seconds) VALUES-- 6. RELACIONES RUTINA-EJERCICIO (30 registros)

((SELECT id FROM routines WHERE title = 'Fortalecimiento Suave en Casa'), (SELECT id FROM exercises WHERE name = 'Sentarse y Levantarse de una Silla (Chair Squat)'), 1, NULL, 60),-- =====================================================

((SELECT id FROM routines WHERE title = 'Fortalecimiento Suave en Casa'), (SELECT id FROM exercises WHERE name = 'Flexiones en la Pared (Wall Push-up)'), 2, NULL, 60),

((SELECT id FROM routines WHERE title = 'Fortalecimiento Suave en Casa'), (SELECT id FROM exercises WHERE name = 'Elevación de Rodilla (Sentado)'), 3, NULL, 45),-- RUTINA 1: Calentamiento y Movilidad Matutina (5 ejercicios)

((SELECT id FROM routines WHERE title = 'Fortalecimiento Suave en Casa'), (SELECT id FROM exercises WHERE name = 'Elevación de Talones y Puntas'), 4, NULL, 45);INSERT INTO routine_exercises (routine_id, exercise_id, exercise_order, duration_seconds, rest_seconds) 

VALUES

-- Rutina 3: Equilibrio y Coordinación (4 ejercicios)((SELECT id FROM routines WHERE title = 'Calentamiento y Movilidad Matutina'), 

INSERT INTO routine_exercises (routine_id, exercise_id, order_in_routine, duration_seconds, rest_time_seconds) VALUES (SELECT id FROM exercises WHERE name = 'Rotación de Cuello'), 1, 180, 30),

((SELECT id FROM routines WHERE title = 'Equilibrio y Coordinación'), (SELECT id FROM exercises WHERE name = 'Equilibrio sobre un Pie'), 1, 30, 60),((SELECT id FROM routines WHERE title = 'Calentamiento y Movilidad Matutina'), 

((SELECT id FROM routines WHERE title = 'Equilibrio y Coordinación'), (SELECT id FROM exercises WHERE name = 'Caminar Talón-Punta'), 2, 180, 60), (SELECT id FROM exercises WHERE name = 'Círculos de Tobillo'), 2, 180, 30),

((SELECT id FROM routines WHERE title = 'Equilibrio y Coordinación'), (SELECT id FROM exercises WHERE name = 'Paso Lateral'), 3, 240, 60),((SELECT id FROM routines WHERE title = 'Calentamiento y Movilidad Matutina'), 

((SELECT id FROM routines WHERE title = 'Equilibrio y Coordinación'), (SELECT id FROM exercises WHERE name = 'Elevación Lateral de Pierna'), 4, NULL, 45); (SELECT id FROM exercises WHERE name = 'Elevación de Brazos y Hombros'), 3, 240, 30),

((SELECT id FROM routines WHERE title = 'Calentamiento y Movilidad Matutina'), 

-- Rutina 4: Cardio Activo y Suave (4 ejercicios) (SELECT id FROM exercises WHERE name = 'Estiramiento de Gato-Vaca (Sentado)'), 4, 300, 30),

INSERT INTO routine_exercises (routine_id, exercise_id, order_in_routine, duration_seconds, rest_time_seconds) VALUES((SELECT id FROM routines WHERE title = 'Calentamiento y Movilidad Matutina'), 

((SELECT id FROM routines WHERE title = 'Cardio Activo y Suave'), (SELECT id FROM exercises WHERE name = 'Marcha en el Sitio'), 1, 300, 60), (SELECT id FROM exercises WHERE name = 'Torsión Suave de Columna (Sentado)'), 5, 240, 0);

((SELECT id FROM routines WHERE title = 'Cardio Activo y Suave'), (SELECT id FROM exercises WHERE name = 'Jumping Jacks sin Salto'), 2, 300, 90),

((SELECT id FROM routines WHERE title = 'Cardio Activo y Suave'), (SELECT id FROM exercises WHERE name = 'Puñetazos al Aire'), 3, 300, 90),-- RUTINA 2: Fortalecimiento Suave en Casa (5 ejercicios)

((SELECT id FROM routines WHERE title = 'Cardio Activo y Suave'), (SELECT id FROM exercises WHERE name = 'Paso Lateral'), 4, 240, 60);INSERT INTO routine_exercises (routine_id, exercise_id, exercise_order, sets, repetitions, rest_seconds)

VALUES

-- Rutina 5: Fuerza Funcional (5 ejercicios - Premium)((SELECT id FROM routines WHERE title = 'Fortalecimiento Suave en Casa'),

INSERT INTO routine_exercises (routine_id, exercise_id, order_in_routine, duration_seconds, rest_time_seconds) VALUES (SELECT id FROM exercises WHERE name = 'Abductores'), 1, 2, 10, 60),

((SELECT id FROM routines WHERE title = 'Fuerza Funcional'), (SELECT id FROM exercises WHERE name = 'Sentadilla'), 1, NULL, 90),((SELECT id FROM routines WHERE title = 'Fortalecimiento Suave en Casa'),

((SELECT id FROM routines WHERE title = 'Fuerza Funcional'), (SELECT id FROM exercises WHERE name = 'Peso muerto con mancuernas'), 2, NULL, 90), (SELECT id FROM exercises WHERE name = 'Extensión de Cuadríceps'), 2, 2, 8, 60),

((SELECT id FROM routines WHERE title = 'Fuerza Funcional'), (SELECT id FROM exercises WHERE name = 'Remo con barra'), 3, NULL, 90),((SELECT id FROM routines WHERE title = 'Fortalecimiento Suave en Casa'),

((SELECT id FROM routines WHERE title = 'Fuerza Funcional'), (SELECT id FROM exercises WHERE name = 'Flexiones en la Pared (Wall Push-up)'), 4, NULL, 90), (SELECT id FROM exercises WHERE name = 'Elevación de Rodilla (Sentado)'), 3, 2, 10, 60),

((SELECT id FROM routines WHERE title = 'Fuerza Funcional'), (SELECT id FROM exercises WHERE name = 'Abductores'), 5, NULL, 60);((SELECT id FROM routines WHERE title = 'Fortalecimiento Suave en Casa'),

 (SELECT id FROM exercises WHERE name = 'Flexiones en la Pared (Wall Push-up)'), 4, 2, 8, 60),

-- Rutina 6: Flexibilidad y Relajación (4 ejercicios)((SELECT id FROM routines WHERE title = 'Fortalecimiento Suave en Casa'),

INSERT INTO routine_exercises (routine_id, exercise_id, order_in_routine, duration_seconds, rest_time_seconds) VALUES (SELECT id FROM exercises WHERE name = 'Elevación de Talones y Puntas'), 5, 2, 12, 0);

((SELECT id FROM routines WHERE title = 'Flexibilidad y Relajación'), (SELECT id FROM exercises WHERE name = 'Estiramiento de Gato-Vaca (Sentado)'), 1, 300, 30),

((SELECT id FROM routines WHERE title = 'Flexibilidad y Relajación'), (SELECT id FROM exercises WHERE name = 'Torsión Suave de Columna (Sentado)'), 2, 240, 30),-- RUTINA 3: Equilibrio y Coordinación (5 ejercicios)

((SELECT id FROM routines WHERE title = 'Flexibilidad y Relajación'), (SELECT id FROM exercises WHERE name = 'Rotación de Cuello'), 3, 180, 30),INSERT INTO routine_exercises (routine_id, exercise_id, exercise_order, duration_seconds, rest_seconds)

((SELECT id FROM routines WHERE title = 'Flexibilidad y Relajación'), (SELECT id FROM exercises WHERE name = 'Círculos de Tobillo'), 4, 120, 0);VALUES

((SELECT id FROM routines WHERE title = 'Equilibrio y Coordinación'),

-- Rutina 7: Resistencia General (6 ejercicios - Premium) (SELECT id FROM exercises WHERE name = 'Caminar Talón-Punta'), 1, 240, 60),

INSERT INTO routine_exercises (routine_id, exercise_id, order_in_routine, duration_seconds, rest_time_seconds) VALUES((SELECT id FROM routines WHERE title = 'Equilibrio y Coordinación'),

((SELECT id FROM routines WHERE title = 'Resistencia General'), (SELECT id FROM exercises WHERE name = 'Marcha en el Sitio'), 1, 300, 60), (SELECT id FROM exercises WHERE name = 'Equilibrio sobre un Pie'), 2, 180, 60),

((SELECT id FROM routines WHERE title = 'Resistencia General'), (SELECT id FROM exercises WHERE name = 'Sentadilla'), 2, NULL, 60),((SELECT id FROM routines WHERE title = 'Equilibrio y Coordinación'),

((SELECT id FROM routines WHERE title = 'Resistencia General'), (SELECT id FROM exercises WHERE name = 'Remo con Banda Elástica (si tienes)'), 3, NULL, 60), (SELECT id FROM exercises WHERE name = 'Paso Lateral'), 3, 240, 60),

((SELECT id FROM routines WHERE title = 'Resistencia General'), (SELECT id FROM exercises WHERE name = 'Extensión de Cuadríceps'), 4, NULL, 60),((SELECT id FROM routines WHERE title = 'Equilibrio y Coordinación'),

((SELECT id FROM routines WHERE title = 'Resistencia General'), (SELECT id FROM exercises WHERE name = 'Elevación Lateral de Pierna'), 5, NULL, 60), (SELECT id FROM exercises WHERE name = 'Elevación Lateral de Pierna'), 4, 240, 60),

((SELECT id FROM routines WHERE title = 'Resistencia General'), (SELECT id FROM exercises WHERE name = 'Puñetazos al Aire'), 6, 300, 0);((SELECT id FROM routines WHERE title = 'Equilibrio y Coordinación'),

 (SELECT id FROM exercises WHERE name = 'Marcha en el Sitio'), 5, 300, 0);

-- =====================================================

-- VERIFICACIONES FINALES-- RUTINA 4: Cardio Activo y Suave (5 ejercicios)

-- =====================================================INSERT INTO routine_exercises (routine_id, exercise_id, exercise_order, duration_seconds, rest_seconds)

VALUES

SELECT '==================================================' as separador;((SELECT id FROM routines WHERE title = 'Cardio Activo y Suave'),

SELECT 'VERIFICACIÓN DEL DATASET COMPLETO' as titulo; (SELECT id FROM exercises WHERE name = 'Marcha en el Sitio'), 1, 300, 60),

SELECT '==================================================' as separador;((SELECT id FROM routines WHERE title = 'Cardio Activo y Suave'),

 (SELECT id FROM exercises WHERE name = 'Jumping Jacks sin Salto'), 2, 240, 60),

SELECT ((SELECT id FROM routines WHERE title = 'Cardio Activo y Suave'),

    'Categorías' as tabla, (SELECT id FROM exercises WHERE name = 'Puñetazos al Aire'), 3, 300, 60),

    COUNT(*) as total((SELECT id FROM routines WHERE title = 'Cardio Activo y Suave'),

FROM categories (SELECT id FROM exercises WHERE name = 'Paso Lateral'), 4, 240, 60),

UNION ALL((SELECT id FROM routines WHERE title = 'Cardio Activo y Suave'),

SELECT  (SELECT id FROM exercises WHERE name = 'Elevación de Rodilla (Sentado)'), 5, 180, 0);

    'Intensidades' as tabla,

    COUNT(*) as total-- RUTINA 5: Fuerza Funcional (PREMIUM) (5 ejercicios)

FROM intensitiesINSERT INTO routine_exercises (routine_id, exercise_id, exercise_order, sets, repetitions, rest_seconds)

UNION ALLVALUES

SELECT ((SELECT id FROM routines WHERE title = 'Fuerza Funcional'),

    'Tipos de Ejercicio' as tabla, (SELECT id FROM exercises WHERE name = 'Sentarse y Levantarse de una Silla (Chair Squat)'), 1, 3, 10, 90),

    COUNT(*) as total((SELECT id FROM routines WHERE title = 'Fuerza Funcional'),

FROM exercise_types (SELECT id FROM exercises WHERE name = 'Peso muerto con mancuernas'), 2, 3, 8, 90),

UNION ALL((SELECT id FROM routines WHERE title = 'Fuerza Funcional'),

SELECT  (SELECT id FROM exercises WHERE name = 'Remo con barra'), 3, 3, 10, 90),

    'Ejercicios' as tabla,((SELECT id FROM routines WHERE title = 'Fuerza Funcional'),

    COUNT(*) as total (SELECT id FROM exercises WHERE name = 'Sentadilla'), 4, 3, 8, 90),

FROM exercises((SELECT id FROM routines WHERE title = 'Fuerza Funcional'),

UNION ALL (SELECT id FROM exercises WHERE name = 'Remo con Banda Elástica (si tienes)'), 5, 3, 12, 0);

SELECT 

    'Rutinas' as tabla,-- RUTINA 6: Movilidad Completa (5 ejercicios)

    COUNT(*) as totalINSERT INTO routine_exercises (routine_id, exercise_id, exercise_order, duration_seconds, rest_seconds)

FROM routinesVALUES

UNION ALL((SELECT id FROM routines WHERE title = 'Movilidad Completa'),

SELECT  (SELECT id FROM exercises WHERE name = 'Rotación de Cuello'), 1, 180, 30),

    'Relaciones Rutina-Ejercicio' as tabla,((SELECT id FROM routines WHERE title = 'Movilidad Completa'),

    COUNT(*) as total (SELECT id FROM exercises WHERE name = 'Elevación de Brazos y Hombros'), 2, 240, 30),

FROM routine_exercises;((SELECT id FROM routines WHERE title = 'Movilidad Completa'),

 (SELECT id FROM exercises WHERE name = 'Torsión Suave de Columna (Sentado)'), 3, 300, 30),

SELECT '==================================================' as separador;((SELECT id FROM routines WHERE title = 'Movilidad Completa'),

SELECT 'Ejercicios con videos de Google Drive:' as info, COUNT(*) as total  (SELECT id FROM exercises WHERE name = 'Estiramiento de Gato-Vaca (Sentado)'), 4, 300, 30),

FROM exercises ((SELECT id FROM routines WHERE title = 'Movilidad Completa'),

WHERE video_url LIKE '%drive.google.com%'; (SELECT id FROM exercises WHERE name = 'Círculos de Tobillo'), 5, 240, 0);



SELECT '==================================================' as separador;SELECT 'OK - Relaciones rutina-ejercicio insertadas:' as status, COUNT(*) as cantidad FROM routine_exercises;

SELECT 'Rutinas por intensidad:' as info;

SELECT -- =====================================================

    i.name as intensidad,-- VERIFICACIÓN FINAL

    COUNT(r.id) as total_rutinas,-- =====================================================

    SUM(CASE WHEN r.is_premium = 1 THEN 1 ELSE 0 END) as premium,

    SUM(CASE WHEN r.is_premium = 0 THEN 1 ELSE 0 END) as gratuitasSELECT '========================================' as separator;

FROM intensities iSELECT 'RESUMEN FINAL DE DATOS CARGADOS' as titulo;

LEFT JOIN routines r ON i.id = r.intensity_idSELECT '========================================' as separator;

GROUP BY i.id, i.name

ORDER BY i.level;SELECT 'Categorias:' as tabla, COUNT(*) as registros FROM categories

UNION ALL

SELECT '==================================================' as separador;SELECT 'Intensidades:' as tabla, COUNT(*) as registros FROM intensities

SELECT '✅ DATASET CARGADO EXITOSAMENTE' as resultado;UNION ALL

SELECT '==================================================' as separador;SELECT 'Tipos de Ejercicio:' as tabla, COUNT(*) as registros FROM exercise_types

UNION ALL

-- =====================================================SELECT 'Ejercicios:' as tabla, COUNT(*) as registros FROM exercises

-- FIN DEL DATASET COMPLETO - VITALAPPUNION ALL

-- =====================================================SELECT 'Rutinas:' as tabla, COUNT(*) as registros FROM routines

UNION ALL
SELECT 'Relaciones Rutina-Ejercicio:' as tabla, COUNT(*) as registros FROM routine_exercises;

SELECT '========================================' as separator;
SELECT 'DATOS CARGADOS EXITOSAMENTE' as resultado;
SELECT '========================================' as separator;

-- =====================================================
-- FIN DEL SCRIPT
-- =====================================================
