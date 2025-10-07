/**
 * SCRIPT AUTOMÁTICO PARA GENERAR URLs DE GOOGLE DRIVE
 * 
 * Instrucciones:
 * 1. Copia los enlaces completos de tus 22 videos de Google Drive
 * 2. Pégalos en el array 'googleDriveLinks' abajo
 * 3. Ejecuta este script en una consola de JavaScript del navegador
 * 4. Copiará el SQL completo actualizado al portapapeles
 */

// 🔧 PASO 1: ENLACES DE GOOGLE DRIVE ORGANIZADOS
const googleDriveLinks = [
    // 1. Abductores
    'https://drive.google.com/file/d/1-PFFba41QMR-o7-uxS1Hn-LPs92disTL/view?usp=sharing',
    
    // 2. Caminar Talón-Punta
    'https://drive.google.com/file/d/13cX7egRaeK9zeewbs7SA_3Y1uIDuj_Nx/view?usp=sharing',
    
    // 3. Círculos de Tobillo
    'https://drive.google.com/file/d/14J9030mEBfAXSMpQvNHsV9GC3FdbTo-q/view?usp=sharing',
    
    // 4. Elevación de Brazos y Hombros
    'https://drive.google.com/file/d/1AC--CGD0trWIbbEmBodSzYuD2mGJABAO/view?usp=sharing',
    
    // 5. Elevación de Rodilla (Sentado)
    'https://drive.google.com/file/d/1ETK0Uq1Whe5J3hS-K9rLEntNBbj9r14P/view?usp=sharing',
    
    // 6. Elevación de Talones y Puntas
    'https://drive.google.com/file/d/1IRb5e6PHvtQj6cxkieeuGE-u_ehkNX5A/view?usp=sharing',
    
    // 7. Elevación Lateral de Pierna
    'https://drive.google.com/file/d/1J6sxowcvmAJxo1A8S6aooPnm8S-fm05H/view?usp=sharing',
    
    // 8. Equilibrio sobre un Pie
    'https://drive.google.com/file/d/1Pu077sE3QL22e1MX-SITjVQ2MGT5LdOp/view?usp=sharing',
    
    // 9. Estiramiento de Gato-Vaca (Sentado)
    'https://drive.google.com/file/d/1SH_qLOr5jaFQyiUTCY1-FjNcN5TmSS_x/view?usp=sharing',
    
    // 10. Extensión de Cuadríceps
    'https://drive.google.com/file/d/1Sr0WC4sOy1SWIEd3GoeAFwbrod5q4ZaZ/view?usp=sharing',
    
    // 11. Flexiones en la Pared (Wall Push-up)
    'https://drive.google.com/file/d/1_RT3mZ4cLctx1JLk6L_bYwUorCvy7Lih/view?usp=sharing',
    
    // 12. Jumping Jacks sin Salto
    'https://drive.google.com/file/d/1_WieqLriX9ccZWIeiuZ3Po41Iyhz0YFe/view?usp=sharing',
    
    // 13. Marcha en el Sitio
    'https://drive.google.com/file/d/1h784l-aYYANrX02al64zGZPjL5DM_mVb/view?usp=sharing',
    
    // 14. Paso Lateral
    'https://drive.google.com/file/d/1hCyporUKsOIuFiHz7PE3CfocJf-SYkUV/view?usp=sharing',
    
    // 15. Peso muerto con mancuernas
    'https://drive.google.com/file/d/1hUHxF3iDZ_2jGViFT3H6cqlaLS7SwkJ1/view?usp=sharing',
    
    // 16. Puñetazos al Aire
    'https://drive.google.com/file/d/1j01Wd6X_Atzn3sgta5sp4iow6o-JmM1X/view?usp=sharing',
    
    // 17. Remo con barra
    'https://drive.google.com/file/d/1qy7qToU3n44lJT2IJT-lBfEW_rKoQ7gA/view?usp=sharing',
    
    // 18. Remo con Banda Elástica (si tienes)
    'https://drive.google.com/file/d/1uF9DfCtDFOA1teTO4K9LjgXrfG4naiKf/view?usp=sharing',
    
    // 19. Rotación de Cuello
    'https://drive.google.com/file/d/1uarQnmcFWA09fLSWxHXVOlJmyvZBXxsJ/view?usp=sharing',
    
    // 20. Sentadilla
    'https://drive.google.com/file/d/1vUQbZSy_e1QeZTUj32FFO0iyBi40-41N/view?usp=sharing',
    
    // 21. Sentarse y Levantarse de una Silla (Chair Squat)
    'https://drive.google.com/file/d/1yPI4qOE-WOLTTGpzp9tam7Am6z6Sp-EG/view?usp=sharing',
    
    // 22. Torsión Suave de Columna (Sentado)
    'https://drive.google.com/file/d/1yvNBjUb0zZ3VM1bu6ERSRNF0j05gkj2k/view?usp=sharing'
];

// 📋 NOMBRES DE LOS EJERCICIOS (EN ORDEN)
const exerciseNames = [
    'Abductores',
    'Caminar Talón-Punta',
    'Círculos de Tobillo',
    'Elevación de Brazos y Hombros',
    'Elevación de Rodilla (Sentado)',
    'Elevación de Talones y Puntas',
    'Elevación Lateral de Pierna',
    'Equilibrio sobre un Pie',
    'Estiramiento de Gato-Vaca (Sentado)',
    'Extensión de Cuadríceps',
    'Flexiones en la Pared (Wall Push-up)',
    'Jumping Jacks sin Salto',
    'Marcha en el Sitio',
    'Paso Lateral',
    'Peso muerto con mancuernas',
    'Puñetazos al Aire',
    'Remo con barra',
    'Remo con Banda Elástica (si tienes)',
    'Rotación de Cuello',
    'Sentadilla',
    'Sentarse y Levantarse de una Silla (Chair Squat)',
    'Torsión Suave de Columna (Sentado)'
];

// 🔧 FUNCIÓN PARA EXTRAER FILE_ID DE UN ENLACE DE GOOGLE DRIVE
function extractFileId(url) {
    const match = url.match(/\/file\/d\/([a-zA-Z0-9_-]+)/);
    return match ? match[1] : null;
}

// 🔧 FUNCIÓN PARA GENERAR URL DE PREVIEW
function generatePreviewUrl(fileId) {
    return `https://drive.google.com/file/d/${fileId}/preview`;
}

// 🔧 FUNCIÓN PRINCIPAL PARA GENERAR EL SQL
function generateSQL() {
    let sqlScript = `-- =====================================================
-- EJERCICIOS CON URLs DE GOOGLE DRIVE - SCRIPT GENERADO AUTOMÁTICAMENTE
-- Fecha de generación: ${new Date().toLocaleDateString()}
-- =====================================================

`;

    // Verificar que tenemos el mismo número de enlaces y nombres
    if (googleDriveLinks.length !== exerciseNames.length) {
        console.error(`❌ ERROR: Tienes ${googleDriveLinks.length} enlaces pero ${exerciseNames.length} nombres de ejercicios`);
        return;
    }

    // Generar SQL para cada ejercicio
    for (let i = 0; i < googleDriveLinks.length; i++) {
        const link = googleDriveLinks[i];
        const exerciseName = exerciseNames[i];
        
        // Saltar si el enlace no ha sido reemplazado
        if (link.includes('PEGAR_ENLACE') || link.includes('_AQUI')) {
            console.warn(`⚠️ Saltando ${exerciseName} - enlace no proporcionado`);
            continue;
        }
        
        const fileId = extractFileId(link);
        
        if (!fileId) {
            console.error(`❌ ERROR: No se pudo extraer FILE_ID de: ${link}`);
            continue;
        }
        
        const previewUrl = generatePreviewUrl(fileId);
        
        sqlScript += `-- ${i + 1}. ${exerciseName}
UPDATE exercises SET 
    video_url = '${previewUrl}',
    image_url = 'https://drive.google.com/uc?export=view&id=${fileId}'
WHERE name = '${exerciseName}';

`;
    }

    // Agregar consultas de verificación
    sqlScript += `-- =====================================================
-- VERIFICAR ACTUALIZACIONES
-- =====================================================

-- Ver ejercicios con sus URLs actualizadas
SELECT 
    id,
    name as 'Ejercicio',
    video_url as 'URL del Video',
    CASE 
        WHEN video_url LIKE '%drive.google.com%' THEN '✅ Google Drive'
        ELSE '❌ Sin configurar'
    END as 'Estado'
FROM exercises 
ORDER BY name;

-- Contar ejercicios configurados
SELECT 
    COUNT(*) as 'Total Ejercicios',
    COUNT(CASE WHEN video_url LIKE '%drive.google.com%' THEN 1 END) as 'Con Google Drive',
    COUNT(CASE WHEN video_url IS NULL OR video_url = '' THEN 1 END) as 'Sin Video'
FROM exercises;
`;

    return sqlScript;
}

// 🚀 EJECUTAR AUTOMÁTICAMENTE AL CARGAR
console.log('🎬 Generador de URLs de Google Drive para VitalApp');
console.log('================================================');
console.log('🔢 Enlaces encontrados:', googleDriveLinks.length);
console.log('📋 Ejercicios configurados:', exerciseNames.length);

// Mostrar vista previa de las correspondencias
console.log('\n📊 CORRESPONDENCIA DE EJERCICIOS:');
console.log('================================');
for (let i = 0; i < Math.min(googleDriveLinks.length, exerciseNames.length); i++) {
    const fileId = extractFileId(googleDriveLinks[i]);
    console.log(`${i + 1}. ${exerciseNames[i]} → ${fileId ? '✅' : '❌'} ${fileId || 'ERROR'}`);
}

console.log('\n🎯 GENERANDO SQL...');

try {
    const sqlResult = generateSQL();
    
    if (sqlResult) {
        console.log('✅ SQL generado exitosamente!');
        console.log('📋 Copiando al portapapeles...');
        
        // Intentar copiar al portapapeles (funciona en navegadores modernos)
        if (navigator.clipboard) {
            navigator.clipboard.writeText(sqlResult).then(() => {
                console.log('✅ SQL copiado al portapapeles!');
                console.log('📝 Ahora pégalo en tu herramienta de base de datos');
            }).catch(() => {
                console.log('⚠️ No se pudo copiar automáticamente. Mostrando SQL:');
                console.log('\n' + '='.repeat(60));
                console.log(sqlResult);
                console.log('='.repeat(60));
            });
        } else {
            console.log('⚠️ Clipboard no disponible. Aquí está tu SQL:');
            console.log('\n' + '='.repeat(60));
            console.log(sqlResult);
            console.log('='.repeat(60));
        }
        
        console.log('\n🎯 PRÓXIMOS PASOS:');
        console.log('1. Copiar el SQL mostrado arriba');
        console.log('2. Pegarlo en tu herramienta de base de datos (MySQL Workbench, phpMyAdmin, etc.)');
        console.log('3. Ejecutar el script');
        console.log('4. Verificar que los ejercicios tienen URLs de Google Drive');
        console.log('5. Probar un video: https://drive.google.com/file/d/1-PFFba41QMR-o7-uxS1Hn-LPs92disTL/preview');
        
        return sqlResult;
    }
    
} catch (error) {
    console.error('❌ ERROR:', error.message);
}

// 🔍 FUNCIÓN DE AYUDA PARA VERIFICAR UN ENLACE
function testLink(url) {
    const fileId = extractFileId(url);
    if (fileId) {
        const previewUrl = generatePreviewUrl(fileId);
        console.log(`🔗 Original: ${url}`);
        console.log(`🆔 File ID: ${fileId}`);
        console.log(`🎥 Preview URL: ${previewUrl}`);
        console.log(`🧪 Test en navegador: ${previewUrl}`);
        return previewUrl;
    } else {
        console.log(`❌ URL inválida: ${url}`);
        return null;
    }
}

// Ejemplos de uso:
console.log('\n💡 AYUDA:');
console.log('Para probar un enlace individual: testLink("tu_enlace_de_google_drive")');
console.log('Para regenerar el SQL después de actualizar enlaces: generateSQL()');