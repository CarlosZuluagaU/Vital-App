-- =====================================================
-- EJERCICIOS CON URLs DE GOOGLE DRIVE
-- Actualización para usar videos desde Google Drive
-- =====================================================

-- IMPORTANTE: 
-- 1. Los enlaces de Google Drive deben ser públicos
-- 2. Usar formato: https://drive.google.com/file/d/FILE_ID/preview
-- 3. También funciona: https://drive.google.com/uc?export=view&id=FILE_ID

-- =====================================================
-- TEMPLATE DE URLs PARA GOOGLE DRIVE
-- =====================================================

-- FORMATO DE URL DE GOOGLE DRIVE:
-- Enlace original: https://drive.google.com/file/d/1ABC123XYZ789/view?usp=sharing  
-- URL para embed:  https://drive.google.com/file/d/1ABC123XYZ789/preview
-- URL directa:     https://drive.google.com/uc?export=view&id=1ABC123XYZ789

-- =====================================================
-- ACTUALIZAR EJERCICIOS CON URLs DE GOOGLE DRIVE
-- =====================================================

-- NOTA: Reemplaza 'FILE_ID_AQUI' con los IDs reales de tus archivos de Google Drive

-- 1. Abductores
UPDATE exercises SET 
    video_url = 'https://drive.google.com/file/d/FILE_ID_ABDUCTORES/preview',
    image_url = 'https://drive.google.com/uc?export=view&id=IMAGE_ID_ABDUCTORES'
WHERE name = 'Abductores';

-- 2. Caminar Talón-Punta  
UPDATE exercises SET 
    video_url = 'https://drive.google.com/file/d/FILE_ID_CAMINAR_TALON_PUNTA/preview',
    image_url = 'https://drive.google.com/uc?export=view&id=IMAGE_ID_CAMINAR_TALON_PUNTA'
WHERE name = 'Caminar Talón-Punta';

-- 3. Círculos de Tobillo
UPDATE exercises SET 
    video_url = 'https://drive.google.com/file/d/FILE_ID_CIRCULOS_TOBILLO/preview',
    image_url = 'https://drive.google.com/uc?export=view&id=IMAGE_ID_CIRCULOS_TOBILLO'  
WHERE name = 'Círculos de Tobillo';

-- 4. Elevación de Brazos y Hombros
UPDATE exercises SET 
    video_url = 'https://drive.google.com/file/d/FILE_ID_ELEVACION_BRAZOS/preview',
    image_url = 'https://drive.google.com/uc?export=view&id=IMAGE_ID_ELEVACION_BRAZOS'
WHERE name = 'Elevación de Brazos y Hombros';

-- 5. Elevación de Rodilla (Sentado)
UPDATE exercises SET 
    video_url = 'https://drive.google.com/file/d/FILE_ID_ELEVACION_RODILLA/preview',
    image_url = 'https://drive.google.com/uc?export=view&id=IMAGE_ID_ELEVACION_RODILLA'
WHERE name = 'Elevación de Rodilla (Sentado)';

-- 6. Elevación de Talones y Puntas
UPDATE exercises SET 
    video_url = 'https://drive.google.com/file/d/FILE_ID_ELEVACION_TALONES/preview',
    image_url = 'https://drive.google.com/uc?export=view&id=IMAGE_ID_ELEVACION_TALONES'
WHERE name = 'Elevación de Talones y Puntas';

-- 7. Elevación Lateral de Pierna
UPDATE exercises SET 
    video_url = 'https://drive.google.com/file/d/FILE_ID_ELEVACION_LATERAL/preview',
    image_url = 'https://drive.google.com/uc?export=view&id=IMAGE_ID_ELEVACION_LATERAL'
WHERE name = 'Elevación Lateral de Pierna';

-- 8. Equilibrio sobre un Pie
UPDATE exercises SET 
    video_url = 'https://drive.google.com/file/d/FILE_ID_EQUILIBRIO_UN_PIE/preview',
    image_url = 'https://drive.google.com/uc?export=view&id=IMAGE_ID_EQUILIBRIO_UN_PIE'
WHERE name = 'Equilibrio sobre un Pie';

-- 9. Estiramiento de Gato-Vaca (Sentado)
UPDATE exercises SET 
    video_url = 'https://drive.google.com/file/d/FILE_ID_GATO_VACA/preview',
    image_url = 'https://drive.google.com/uc?export=view&id=IMAGE_ID_GATO_VACA'
WHERE name = 'Estiramiento de Gato-Vaca (Sentado)';

-- 10. Extensión de Cuadríceps
UPDATE exercises SET 
    video_url = 'https://drive.google.com/file/d/FILE_ID_EXTENSION_CUADRICEPS/preview',
    image_url = 'https://drive.google.com/uc?export=view&id=IMAGE_ID_EXTENSION_CUADRICEPS'
WHERE name = 'Extensión de Cuadríceps';

-- 11. Flexiones en la Pared (Wall Push-up)
UPDATE exercises SET 
    video_url = 'https://drive.google.com/file/d/FILE_ID_FLEXIONES_PARED/preview',
    image_url = 'https://drive.google.com/uc?export=view&id=IMAGE_ID_FLEXIONES_PARED'
WHERE name = 'Flexiones en la Pared (Wall Push-up)';

-- 12. Jumping Jacks sin Salto
UPDATE exercises SET 
    video_url = 'https://drive.google.com/file/d/FILE_ID_JUMPING_JACKS/preview',
    image_url = 'https://drive.google.com/uc?export=view&id=IMAGE_ID_JUMPING_JACKS'
WHERE name = 'Jumping Jacks sin Salto';

-- 13. Marcha en el Sitio
UPDATE exercises SET 
    video_url = 'https://drive.google.com/file/d/FILE_ID_MARCHA_SITIO/preview',
    image_url = 'https://drive.google.com/uc?export=view&id=IMAGE_ID_MARCHA_SITIO'
WHERE name = 'Marcha en el Sitio';

-- 14. Paso Lateral
UPDATE exercises SET 
    video_url = 'https://drive.google.com/file/d/FILE_ID_PASO_LATERAL/preview',
    image_url = 'https://drive.google.com/uc?export=view&id=IMAGE_ID_PASO_LATERAL'
WHERE name = 'Paso Lateral';

-- 15. Peso muerto con mancuernas
UPDATE exercises SET 
    video_url = 'https://drive.google.com/file/d/FILE_ID_PESO_MUERTO/preview',
    image_url = 'https://drive.google.com/uc?export=view&id=IMAGE_ID_PESO_MUERTO'
WHERE name = 'Peso muerto con mancuernas';

-- 16. Puñetazos al Aire
UPDATE exercises SET 
    video_url = 'https://drive.google.com/file/d/FILE_ID_PUÑETAZOS_AIRE/preview',
    image_url = 'https://drive.google.com/uc?export=view&id=IMAGE_ID_PUÑETAZOS_AIRE'
WHERE name = 'Puñetazos al Aire';

-- 17. Remo con barra
UPDATE exercises SET 
    video_url = 'https://drive.google.com/file/d/FILE_ID_REMO_BARRA/preview',
    image_url = 'https://drive.google.com/uc?export=view&id=IMAGE_ID_REMO_BARRA'
WHERE name = 'Remo con barra';

-- 18. Remo con Banda Elástica (si tienes)
UPDATE exercises SET 
    video_url = 'https://drive.google.com/file/d/FILE_ID_REMO_BANDA/preview',
    image_url = 'https://drive.google.com/uc?export=view&id=IMAGE_ID_REMO_BANDA'
WHERE name = 'Remo con Banda Elástica (si tienes)';

-- 19. Rotación de Cuello
UPDATE exercises SET 
    video_url = 'https://drive.google.com/file/d/FILE_ID_ROTACION_CUELLO/preview',
    image_url = 'https://drive.google.com/uc?export=view&id=IMAGE_ID_ROTACION_CUELLO'
WHERE name = 'Rotación de Cuello';

-- 20. Sentadilla
UPDATE exercises SET 
    video_url = 'https://drive.google.com/file/d/FILE_ID_SENTADILLA/preview',
    image_url = 'https://drive.google.com/uc?export=view&id=IMAGE_ID_SENTADILLA'
WHERE name = 'Sentadilla';

-- 21. Sentarse y Levantarse de una Silla (Chair Squat)
UPDATE exercises SET 
    video_url = 'https://drive.google.com/file/d/FILE_ID_CHAIR_SQUAT/preview',
    image_url = 'https://drive.google.com/uc?export=view&id=IMAGE_ID_CHAIR_SQUAT'
WHERE name = 'Sentarse y Levantarse de una Silla (Chair Squat)';

-- 22. Torsión Suave de Columna (Sentado)
UPDATE exercises SET 
    video_url = 'https://drive.google.com/file/d/FILE_ID_TORSION_COLUMNA/preview',
    image_url = 'https://drive.google.com/uc?export=view&id=IMAGE_ID_TORSION_COLUMNA'
WHERE name = 'Torsión Suave de Columna (Sentado)';

-- =====================================================
-- VERIFICAR ACTUALIZACIONES
-- =====================================================

-- Ver ejercicios con sus URLs actualizadas
SELECT 
    id,
    name as 'Ejercicio',
    video_url as 'URL del Video',
    image_url as 'URL de la Imagen',
    intensity_name as 'Intensidad'
FROM exercises 
WHERE video_url LIKE '%drive.google.com%'
ORDER BY name;

-- Contar ejercicios con videos de Google Drive
SELECT 
    COUNT(*) as 'Ejercicios con Google Drive',
    COUNT(CASE WHEN video_url IS NOT NULL THEN 1 END) as 'Con Video',
    COUNT(CASE WHEN image_url IS NOT NULL THEN 1 END) as 'Con Imagen'
FROM exercises 
WHERE video_url LIKE '%drive.google.com%';

-- =====================================================
-- INSTRUCCIONES DE USO
-- =====================================================

/*
PASOS PARA USAR ESTE SCRIPT:

1. HACER PÚBLICOS LOS VIDEOS EN GOOGLE DRIVE:
   - Clic derecho en cada video → "Obtener enlace"
   - Cambiar permisos a "Cualquier persona con el enlace"
   
2. OBTENER LOS FILE_ID DE CADA VIDEO:
   - URL original: https://drive.google.com/file/d/1ABC123XYZ789/view?usp=sharing
   - FILE_ID es: 1ABC123XYZ789
   
3. REEMPLAZAR EN ESTE SCRIPT:
   - Buscar "FILE_ID_AQUI" por el ID real de cada video
   - Ejemplo: 'FILE_ID_ABDUCTORES' → '1ABC123XYZ789'
   
4. EJECUTAR EL SCRIPT:
   - Primero ejecutar: ejercicios-completos-clasificados.sql
   - Luego ejecutar: este script con los IDs actualizados

VENTAJAS DE USAR GOOGLE DRIVE:
✅ No ocupas espacio en tu servidor
✅ Google Drive maneja el streaming de video
✅ Fácil de actualizar videos
✅ URLs permanentes
✅ Control de acceso centralizado
*/