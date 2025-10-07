-- =====================================================
-- SCRIPT COMPLETO DE EJERCICIOS PARA ADULTOS MAYORES
-- Basado en los videos proporcionados
-- =====================================================

-- Primero, insertar las categorías si no existen
INSERT IGNORE INTO categories (name, description) VALUES
('Fortalecimiento', 'Ejercicios para mejorar la fuerza muscular de forma segura'),
('Equilibrio', 'Ejercicios para mejorar la estabilidad y prevenir caídas'),
('Flexibilidad', 'Ejercicios para mantener y mejorar la movilidad articular'),
('Cardio', 'Ejercicios cardiovasculares de bajo impacto'),
('Movilidad', 'Ejercicios para mejorar el rango de movimiento');

-- Insertar intensidades si no existen
INSERT IGNORE INTO intensities (name, level) VALUES
('Muy Suave', 1),
('Suave', 2), 
('Moderado', 3),
('Intermedio', 4);

-- Insertar tipos de ejercicio si no existen
INSERT IGNORE INTO exercise_types (name, description, location_type) VALUES
('Ejercicio Sentado', 'Ejercicios que se realizan desde una silla', 'HOME'),
('Ejercicio de Pie', 'Ejercicios que se realizan de pie con apoyo', 'HOME'),
('Con Implementos', 'Ejercicios que requieren bandas elásticas o pesas', 'HOME'),
('Funcional', 'Ejercicios que imitan movimientos de la vida diaria', 'HOME');

-- =====================================================
-- EJERCICIOS CLASIFICADOS Y DETALLADOS
-- =====================================================

-- CATEGORÍA: FORTALECIMIENTO - INTENSIDAD SUAVE
INSERT INTO exercises (
    name, description, instructions, benefits, safety_tips, modifications,
    duration_seconds, repetitions, sets, is_premium, is_active,
    category_id, intensity_id, exercise_type_id, 
    video_url, image_url
) VALUES

-- 1. Abductores
('Abductores', 
'Ejercicio para fortalecer los músculos abductores de la cadera, esenciales para la estabilidad pélvica.',
'Sentado en una silla, coloque las manos en las rodillas. Separe las piernas contra la resistencia de sus manos. Mantenga 3 segundos y relaje.',
'Fortalece músculos de cadera, mejora estabilidad pélvica, previene caídas',
'Mantenga la espalda recta. No fuerce el movimiento. Respire normalmente.',
'Puede usar una banda elástica entre las rodillas para mayor resistencia.',
NULL, 10, 2, false, true,
(SELECT id FROM categories WHERE name = 'Fortalecimiento'),
(SELECT id FROM intensities WHERE name = 'Suave'),
(SELECT id FROM exercise_types WHERE name = 'Ejercicio Sentado'),
'videos/ejercicios/abductores.mp4',
'images/ejercicios/abductores.jpg'),

-- 2. Extensión de Cuadríceps  
('Extensión de Cuadríceps',
'Ejercicio sentado para fortalecer los músculos cuádriceps, fundamentales para levantarse y caminar.',
'Sentado en una silla, extienda lentamente una pierna hasta que esté recta. Mantenga 3 segundos y baje lentamente. Alterne piernas.',
'Fortalece cuádriceps, mejora capacidad para levantarse, estabiliza rodillas',
'Movimientos lentos y controlados. No bloquee completamente la rodilla.',
'Agregue peso en el tobillo para mayor dificultad.',
NULL, 10, 2, false, true,
(SELECT id FROM categories WHERE name = 'Fortalecimiento'),
(SELECT id FROM intensities WHERE name = 'Suave'),
(SELECT id FROM exercise_types WHERE name = 'Ejercicio Sentado'),
'videos/ejercicios/extension_cuadriceps.mp4',
'images/ejercicios/extension_cuadriceps.jpg'),

-- 3. Puñetazos al Aire
('Puñetazos al Aire',
'Ejercicio cardiovascular suave que combina coordinación y fortalecimiento de brazos.',
'De pie o sentado, alterne puñetazos hacia adelante con cada brazo. Mantenga movimientos controlados y rítmicos.',
'Mejora coordinación, fortalece brazos y core, ejercicio cardiovascular suave',
'Evite movimientos bruscos. Mantenga los hombros relajados.',
'Puede realizarse sentado para mayor estabilidad.',
180, NULL, NULL, false, true,
(SELECT id FROM categories WHERE name = 'Cardio'),
(SELECT id FROM intensities WHERE name = 'Suave'),
(SELECT id FROM exercise_types WHERE name = 'Ejercicio de Pie'),
'videos/ejercicios/punetazos_aire.mp4',
'images/ejercicios/punetazos_aire.jpg'),

-- CATEGORÍA: EQUILIBRIO - INTENSIDAD SUAVE A MODERADA
-- 4. Equilibrio sobre un Pie
('Equilibrio sobre un Pie',
'Ejercicio fundamental para mejorar el equilibrio y prevenir caídas.',
'De pie cerca de una silla para apoyo, levante un pie del suelo y mantenga el equilibrio. Comience con 10 segundos y aumente gradualmente.',
'Mejora equilibrio, fortalece músculos estabilizadores, previene caídas',
'Mantenga siempre una silla cerca para apoyo. Comience con tiempos cortos.',
'Apoye un dedo en la silla si es necesario. Cierre los ojos para mayor dificultad.',
30, NULL, 3, false, true,
(SELECT id FROM categories WHERE name = 'Equilibrio'),
(SELECT id FROM intensities WHERE name = 'Moderado'),
(SELECT id FROM exercise_types WHERE name = 'Ejercicio de Pie'),
'videos/ejercicios/equilibrio_un_pie.mp4',
'images/ejercicios/equilibrio_un_pie.jpg'),

-- 5. Caminar Talón-Punta
('Caminar Talón-Punta',
'Ejercicio de equilibrio dinámico que mejora la coordinación y estabilidad.',
'Camine en línea recta colocando el talón de un pie directamente frente a los dedos del otro pie. Use los brazos para equilibrarse.',
'Mejora equilibrio dinámico, coordinación, confianza al caminar',
'Realice cerca de una pared para apoyo. Vaya lentamente.',
'Comience con pasos normales y gradualmente acérquelos.',
NULL, 10, 2, false, true,
(SELECT id FROM categories WHERE name = 'Equilibrio'),
(SELECT id FROM intensidades WHERE name = 'Moderado'),
(SELECT id FROM exercise_types WHERE name = 'Ejercicio de Pie'),
'videos/ejercicios/caminar_talon_punta.mp4',
'images/ejercicios/caminar_talon_punta.jpg'),

-- CATEGORÍA: FLEXIBILIDAD Y MOVILIDAD
-- 6. Círculos de Tobillo
('Círculos de Tobillo',
'Ejercicio de movilidad para mantener flexibles las articulaciones del tobillo.',
'Sentado, levante un pie y realice círculos lentos con el tobillo en ambas direcciones. Repita con el otro pie.',
'Mejora circulación, mantiene movilidad del tobillo, previene rigidez',
'Movimientos suaves y lentos. No fuerce la amplitud.',
'Puede realizarse con ambos pies simultáneamente.',
NULL, 10, 2, false, true,
(SELECT id FROM categories WHERE name = 'Movilidad'),
(SELECT id FROM intensities WHERE name = 'Muy Suave'),
(SELECT id FROM exercise_types WHERE name = 'Ejercicio Sentado'),
'videos/ejercicios/circulos_tobillo.mp4',
'images/ejercicios/circulos_tobillo.jpg'),

-- 7. Rotación de Cuello
('Rotación de Cuello',
'Ejercicio suave para mantener la movilidad cervical y reducir tensión.',
'Sentado con espalda recta, gire lentamente la cabeza hacia un lado, luego al otro. Evite movimientos hacia atrás.',
'Reduce tensión cervical, mejora movilidad del cuello, alivia rigidez',
'Nunca gire hacia atrás. Movimientos muy lentos y suaves.',
'Puede realizarse con inclinaciones laterales solamente.',
NULL, 5, 2, false, true,
(SELECT id FROM categories WHERE name = 'Flexibilidad'),
(SELECT id FROM intensities WHERE name = 'Muy Suave'),
(SELECT id FROM exercise_types WHERE name = 'Ejercicio Sentado'),
'videos/ejercicios/rotacion_cuello.mp4',
'images/ejercicios/rotacion_cuello.jpg'),

-- 8. Estiramiento Gato-Vaca (Sentado)
('Estiramiento de Gato-Vaca (Sentado)',
'Adaptación del ejercicio clásico de yoga para mejorar la movilidad espinal.',
'Sentado, arquee suavemente la espalda mirando hacia arriba (vaca), luego curve la espalda hacia adelante (gato). Alterne lentamente.',
'Mejora movilidad espinal, reduce dolor de espalda, aumenta flexibilidad',
'Movimientos suaves sin forzar. Coordine con la respiración.',
'Puede realizarse con las manos en las rodillas para mayor apoyo.',
NULL, 8, 2, false, true,
(SELECT id FROM categories WHERE name = 'Flexibilidad'),
(SELECT id FROM intensities WHERE name = 'Suave'),
(SELECT id FROM exercise_types WHERE name = 'Ejercicio Sentado'),
'videos/ejercicios/estiramiento_gato_vaca_sentado.mp4',
'images/ejercicios/estiramiento_gato_vaca_sentado.jpg'),

-- 9. Torsión Suave de Columna (Sentado)
('Torsión Suave de Columna (Sentado)',
'Ejercicio de movilidad para mantener la flexibilidad rotacional de la columna.',
'Sentado con espalda recta, gire suavemente el tronco hacia un lado, ayudándose con las manos. Regrese al centro y repita al otro lado.',
'Mejora movilidad rotacional, reduce rigidez espinal, mejora postura',
'Mantenga las caderas fijas. No fuerce el movimiento.',
'Puede colocar las manos en el pecho para menor intensidad.',
NULL, 6, 2, false, true,
(SELECT id FROM categories WHERE name = 'Flexibilidad'),
(SELECT id FROM intensities WHERE name = 'Moderado'),
(SELECT id FROM exercise_types WHERE name = 'Ejercicio Sentado'),
'videos/ejercicios/torsion_suave_columna_sentado.mp4',
'images/ejercicios/torsion_suave_columna_sentado.jpg'),

-- CATEGORÍA: FORTALECIMIENTO - INTENSIDAD MODERADA
-- 10. Elevación de Brazos y Hombros
('Elevación de Brazos y Hombros',
'Ejercicio para fortalecer deltoides y mejorar la movilidad del hombro.',
'De pie o sentado, levante los brazos hacia los lados hasta la altura de los hombros. Baje lentamente.',
'Fortalece deltoides, mejora movilidad del hombro, mejora postura',
'No levante por encima de los hombros si hay dolor. Movimientos controlados.',
'Use pesas ligeras o botellas de agua para mayor resistencia.',
NULL, 10, 2, false, true,
(SELECT id FROM categories WHERE name = 'Fortalecimiento'),
(SELECT id FROM intensities WHERE name = 'Moderado'),
(SELECT id FROM exercise_types WHERE name = 'Ejercicio de Pie'),
'videos/ejercicios/elevacion_brazos_hombros.mp4',
'images/ejercicios/elevacion_brazos_hombros.jpg'),

-- 11. Elevación de Rodilla (Sentado)
('Elevación de Rodilla (Sentado)',
'Ejercicio para fortalecer flexores de cadera y core.',
'Sentado con espalda recta, levante una rodilla hacia el pecho. Baje lentamente y repita con la otra pierna.',
'Fortalece flexores de cadera, mejora core, facilita el caminar',
'Mantenga la espalda recta. No se impulse con las manos.',
'Puede sostener la rodilla por 3 segundos para mayor dificultad.',
NULL, 10, 2, false, true,
(SELECT id FROM categories WHERE name = 'Fortalecimiento'),
(SELECT id FROM intensities WHERE name = 'Moderado'),
(SELECT id FROM exercise_types WHERE name = 'Ejercicio Sentado'),
'videos/ejercicios/elevacion_rodilla_sentado.mp4',
'images/ejercicios/elevacion_rodilla_sentado.jpg'),

-- 12. Elevación de Talones y Puntas
('Elevación de Talones y Puntas',
'Ejercicio para fortalecer pantorrillas y músculos del pie.',
'De pie con apoyo, levante los talones (puntas de pie), luego levante las puntas (talones). Alterne lentamente.',
'Fortalece pantorrillas, mejora equilibrio, facilita el caminar',
'Use apoyo siempre. Movimientos controlados.',
'Puede realizar solo talones o solo puntas si es muy difícil.',
NULL, 15, 2, false, true,
(SELECT id FROM categories WHERE name = 'Fortalecimiento'),
(SELECT id FROM intensities WHERE name = 'Moderado'),
(SELECT id FROM exercise_types WHERE name = 'Ejercicio de Pie'),
'videos/ejercicios/elevacion_talones_puntas.mp4',
'images/ejercicios/elevacion_talones_puntas.jpg'),

-- 13. Elevación Lateral de Pierna
('Elevación Lateral de Pierna',
'Ejercicio para fortalecer abductores de cadera y mejorar estabilidad lateral.',
'De pie con apoyo, levante una pierna hacia el lado manteniendo el cuerpo recto. Baje lentamente.',
'Fortalece abductores, mejora estabilidad lateral, previene caídas',
'Mantenga el cuerpo recto. No se incline hacia el lado contrario.',
'Comience con elevaciones pequeñas y aumente gradualmente.',
NULL, 10, 2, false, true,
(SELECT id FROM categories WHERE name = 'Fortalecimiento'),
(SELECT id FROM intensities WHERE name = 'Moderado'),
(SELECT id FROM exercise_types WHERE name = 'Ejercicio de Pie'),
'videos/ejercicios/elevacion_lateral_pierna.mp4',
'images/ejercicios/elevacion_lateral_pierna.jpg'),

-- 14. Flexiones en la Pared (Wall Push-up)
('Flexiones en la Pared (Wall Push-up)',
'Adaptación segura de las flexiones tradicionales para adultos mayores.',
'De pie frente a una pared, coloque las palmas contra ella. Inclínese hacia adelante y empuje de vuelta.',
'Fortalece pecho, brazos y core de forma segura',
'Mantenga los pies firmes. Controle la velocidad del movimiento.',
'Aléjese más de la pared para mayor dificultad.',
NULL, 8, 2, false, true,
(SELECT id FROM categories WHERE name = 'Fortalecimiento'),
(SELECT id FROM intensities WHERE name = 'Moderado'),
(SELECT id FROM exercise_types WHERE name = 'Ejercicio de Pie'),
'videos/ejercicios/flexiones_pared_wall_push_up.mp4',
'images/ejercicios/flexiones_pared_wall_push_up.jpg'),

-- 15. Sentarse y Levantarse de una Silla (Chair Squat)
('Sentarse y Levantarse de una Silla (Chair Squat)',
'Ejercicio funcional esencial para mantener independencia en actividades diarias.',
'Sentado al borde de una silla, levántese usando principalmente las piernas. Siéntese lentamente.',
'Fortalece piernas, mejora independencia funcional, facilita actividades diarias',
'Use brazos solo si es necesario. Controle el descenso.',
'Coloque almohadas en la silla para reducir la profundidad.',
NULL, 8, 2, false, true,
(SELECT id FROM categories WHERE name = 'Fortalecimiento'),
(SELECT id FROM intensities WHERE name = 'Moderado'),
(SELECT id FROM exercise_types WHERE name = 'Funcional'),
'videos/ejercicios/sentarse_levantarse_silla_chair_squat.mp4',
'images/ejercicios/sentarse_levantarse_silla_chair_squat.jpg'),

-- CATEGORÍA: CARDIO - INTENSIDAD MODERADA
-- 16. Jumping Jacks sin Salto
('Jumping Jacks sin Salto',
'Versión adaptada del ejercicio clásico, segura para adultos mayores.',
'De pie, dé un paso lateral mientras levanta los brazos. Regrese al centro y repita al otro lado.',
'Ejercicio cardiovascular, mejora coordinación, fortalece todo el cuerpo',
'Mantenga siempre un pie en el suelo. Use apoyo si es necesario.',
'Puede realizarse sentado moviendo solo brazos y una pierna.',
180, NULL, NULL, false, true,
(SELECT id FROM categories WHERE name = 'Cardio'),
(SELECT id FROM intensities WHERE name = 'Moderado'),
(SELECT id FROM exercise_types WHERE name = 'Ejercicio de Pie'),
'videos/ejercicios/jumping_jacks_sin_salto.mp4',
'images/ejercicios/jumping_jacks_sin_salto.jpg'),

-- 17. Marcha en el Sitio
('Marcha en el Sitio',
'Ejercicio cardiovascular fundamental y seguro para adultos mayores.',
'De pie, levante alternadamente las rodillas como si estuviera marchando. Mueva los brazos naturalmente.',
'Mejora cardiovascular, coordinación, fortalece piernas',
'Levante las rodillas a altura cómoda. Use apoyo si es necesario.',
'Puede realizarse sentado para menor intensidad.',
180, NULL, NULL, false, true,
(SELECT id FROM categories WHERE name = 'Cardio'),
(SELECT id FROM intensities WHERE name = 'Moderado'),
(SELECT id FROM exercise_types WHERE name = 'Ejercicio de Pie'),
'videos/ejercicios/marcha_sitio.mp4',
'images/ejercicios/marcha_sitio.jpg'),

-- 18. Paso Lateral
('Paso Lateral',
'Ejercicio de equilibrio dinámico y fortalecimiento de piernas.',
'De pie, dé pasos laterales controlados hacia un lado y luego hacia el otro. Mantenga el equilibrio.',
'Mejora equilibrio lateral, fortalece piernas, mejora coordinación',
'Pasos pequeños y controlados. Use apoyo si es necesario.',
'Comience con pasos muy pequeños.',
NULL, 10, 2, false, true,
(SELECT id FROM categories WHERE name = 'Equilibrio'),
(SELECT id FROM intensities WHERE name = 'Moderado'),
(SELECT id FROM exercise_types WHERE name = 'Ejercicio de Pie'),
'videos/ejercicios/paso_lateral.mp4',
'images/ejercicios/paso_lateral.jpg'),

-- CATEGORÍA: FORTALECIMIENTO CON IMPLEMENTOS
-- 19. Remo con Banda Elástica (si tienes)
('Remo con Banda Elástica (si tienes)',
'Ejercicio para fortalecer espalda y mejorar postura usando banda elástica.',
'Sentado, sujete la banda elástica y tire hacia atrás apretando los omóplatos. Controle el regreso.',
'Fortalece espalda, mejora postura, contrarresta encorvamiento',
'Mantenga la espalda recta. Controle ambas fases del movimiento.',
'Use toalla si no tiene banda elástica.',
NULL, 10, 2, false, true,
(SELECT id FROM categories WHERE name = 'Fortalecimiento'),
(SELECT id FROM intensities WHERE name = 'Moderado'),
(SELECT id FROM exercise_types WHERE name = 'Con Implementos'),
'videos/ejercicios/remo_banda_elastica_si_tienes.mp4',
'images/ejercicios/remo_banda_elastica_si_tienes.jpg'),

-- 20. Remo con barra
('Remo con barra',
'Ejercicio de fortalecimiento de espalda usando barra ligera o palo de escoba.',
'De pie o sentado, sujete una barra con ambas manos y tire hacia el pecho apretando los omóplatos.',
'Fortalece espalda media, mejora postura, desarrolla fuerza funcional',
'Use peso ligero. Mantenga la espalda recta durante todo el movimiento.',
'Puede usar palo de escoba o toalla enrollada.',
NULL, 10, 2, false, true,
(SELECT id FROM categories WHERE name = 'Fortalecimiento'),
(SELECT id FROM intensities WHERE name = 'Moderado'),
(SELECT id FROM exercise_types WHERE name = 'Con Implementos'),
'videos/ejercicios/remo_barra.mp4',
'images/ejercicios/remo_barra.jpg'),

-- CATEGORÍA: FORTALECIMIENTO - INTENSIDAD MODERADA-ALTA
-- 21. Peso muerto con mancuernas
('Peso muerto con mancuernas',
'Ejercicio funcional para fortalecer cadena posterior (espalda baja, glúteos, isquiotibiales).',
'De pie con mancuernas ligeras, inclínese hacia adelante desde las caderas manteniendo la espalda recta. Regrese a la posición inicial.',
'Fortalece cadena posterior, mejora postura, facilita levantamiento de objetos',
'Use peso muy ligero. Mantenga la espalda recta. Movimiento desde las caderas.',
'Comience sin peso, solo con el movimiento.',
NULL, 8, 2, false, true,
(SELECT id FROM categories WHERE name = 'Fortalecimiento'),
(SELECT id FROM intensities WHERE name = 'Intermedio'),
(SELECT id FROM exercise_types WHERE name = 'Con Implementos'),
'videos/ejercicios/peso_muerto_mancuernas.mp4',
'images/ejercicios/peso_muerto_mancuernas.jpg'),

-- 22. Sentadilla
('Sentadilla',
'Ejercicio funcional fundamental para fortalecer piernas y glúteos.',
'De pie, baje como si fuera a sentarse en una silla, manteniendo el peso en los talones. Levántese lentamente.',
'Fortalece cuádriceps, glúteos, mejora independencia funcional',
'No baje más allá de 90 grados. Mantenga las rodillas alineadas con los pies.',
'Use una silla detrás para mayor seguridad.',
NULL, 8, 2, false, true,
(SELECT id FROM categories WHERE name = 'Fortalecimiento'),
(SELECT id FROM intensities WHERE name = 'Intermedio'),
(SELECT id FROM exercise_types WHERE name = 'Funcional'),
'videos/ejercicios/sentadilla.mp4',
'images/ejercicios/sentadilla.jpg');

-- =====================================================
-- CONFIGURACIÓN DE RUTAS DE VIDEO
-- =====================================================

/*
SISTEMA DE VÍNCULOS DE VIDEO:

1. ESTRUCTURA DE CARPETAS RECOMENDADA:
   /src/main/resources/static/
   ├── videos/
   │   └── ejercicios/
   │       ├── abductores.mp4
   │       ├── caminar_talon_punta.mp4
   │       ├── circulos_tobillo.mp4
   │       └── ... (todos los demás videos)
   └── images/
       └── ejercicios/
           ├── abductores.jpg
           ├── caminar_talon_punta.jpg
           └── ... (miniaturas de cada ejercicio)

2. RUTAS EN LA BASE DE DATOS:
   - video_url: 'videos/ejercicios/nombre_ejercicio.mp4'
   - image_url: 'images/ejercicios/nombre_ejercicio.jpg'

3. ACCESO DESDE EL FRONTEND:
   - Videos: http://localhost:8080/videos/ejercicios/nombre_ejercicio.mp4
   - Imágenes: http://localhost:8080/images/ejercicios/nombre_ejercicio.jpg

4. CONFIGURACIÓN EN application.yml:
   spring:
     web:
       resources:
         static-locations: classpath:/static/

5. PARA SUBIR TUS VIDEOS:
   - Renombra cada video según el patrón: nombre_ejercicio.mp4
   - Colócalos en: Backend/src/main/resources/static/videos/ejercicios/
   - Crea miniaturas y colócalas en: Backend/src/main/resources/static/images/ejercicios/
*/

-- =====================================================
-- CONSULTAS DE VERIFICACIÓN
-- =====================================================

-- Ver todos los ejercicios insertados con sus clasificaciones
SELECT 
    e.name as ejercicio,
    c.name as categoria,
    i.name as intensidad,
    et.name as tipo,
    e.video_url
FROM exercises e
JOIN categories c ON e.category_id = c.id
JOIN intensities i ON e.intensity_id = i.id  
JOIN exercise_types et ON e.exercise_type_id = et.id
ORDER BY c.name, i.level, e.name;