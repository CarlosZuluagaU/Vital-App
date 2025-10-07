# 📹 INSTRUCCIONES PARA SUBIR LOS VIDEOS DE EJERCICIOS

## 📂 Estructura de Carpetas Creada

```
Backend/src/main/resources/static/
├── videos/
│   └── ejercicios/
│       └── [Aquí van todos tus videos .mp4]
└── images/
    └── ejercicios/
        └── [Aquí van las miniaturas .jpg]
```

## 🎯 Pasos para Configurar los Videos

### 1. **Renombrar tus videos** según esta tabla:

| Video Original | Nuevo Nombre del Archivo |
|----------------|--------------------------|
| Abductores.mp4 | `abductores.mp4` |
| Caminar Talón-Punta.mp4 | `caminar_talon_punta.mp4` |
| Círculos de Tobillo.mp4 | `circulos_tobillo.mp4` |
| Elevación de Brazos y Hombros.mp4 | `elevacion_brazos_hombros.mp4` |
| Elevación de Rodilla (Sentado).mp4 | `elevacion_rodilla_sentado.mp4` |
| Elevación de Talones y Puntas.mp4 | `elevacion_talones_puntas.mp4` |
| Elevación Lateral de Pierna.mp4 | `elevacion_lateral_pierna.mp4` |
| Equilibrio sobre un Pie.mp4 | `equilibrio_un_pie.mp4` |
| Estiramiento de Gato-Vaca (Sentado).mp4 | `estiramiento_gato_vaca_sentado.mp4` |
| Extensión de Cuadríceps.mp4 | `extension_cuadriceps.mp4` |
| Flexiones en la Pared (Wall Push-up).mp4 | `flexiones_pared_wall_push_up.mp4` |
| Jumping Jacks sin Salto.mp4 | `jumping_jacks_sin_salto.mp4` |
| Marcha en el Sitio.mp4 | `marcha_sitio.mp4` |
| Paso Lateral.mp4 | `paso_lateral.mp4` |
| Peso muerto con mancuernas.mp4 | `peso_muerto_mancuernas.mp4` |
| Puñetazos al Aire.mp4 | `punetazos_aire.mp4` |
| Remo con Banda Elástica (si tienes).mp4 | `remo_banda_elastica_si_tienes.mp4` |
| Remo con barra.mp4 | `remo_barra.mp4` |
| Rotación de Cuello.mp4 | `rotacion_cuello.mp4` |
| Sentadilla.mp4 | `sentadilla.mp4` |
| Sentarse y Levantarse de una Silla (Chair Squat).mp4 | `sentarse_levantarse_silla_chair_squat.mp4` |
| Torsión Suave de Columna (Sentado).mp4 | `torsion_suave_columna_sentado.mp4` |

### 2. **Copiar los videos renombrados** a:
```
d:\Programacion\Vital-App\Backend\src\main\resources\static\videos\ejercicios\
```

### 3. **Crear miniaturas** (opcional pero recomendado):
- Captura una imagen representativa de cada video
- Guárdalas como `.jpg` con el mismo nombre del video
- Cópialas a: `d:\Programacion\Vital-App\Backend\src\main\resources\static\images\ejercicios\`

## 🔗 URLs de Acceso

Una vez subidos los videos, podrás acceder a ellos desde:

- **Videos**: `http://localhost:8080/videos/ejercicios/nombre_ejercicio.mp4`
- **Imágenes**: `http://localhost:8080/images/ejercicios/nombre_ejercicio.jpg`

### Ejemplos:
- `http://localhost:8080/videos/ejercicios/abductores.mp4`
- `http://localhost:8080/videos/ejercicios/sentadilla.mp4`
- `http://localhost:8080/images/ejercicios/abductores.jpg`

## 📊 Ejecutar el Script de Datos

Después de subir los videos, ejecuta el script SQL para cargar todos los ejercicios:

1. **Navega a**: `Backend/src/main/resources/sql/ejercicios-completos-clasificados.sql`
2. **Ejecuta el script** en tu base de datos H2 o MySQL
3. **Verifica** que los ejercicios se cargaron correctamente

## 🧪 Probar la Funcionalidad

```bash
# 1. Iniciar el servidor
mvn spring-boot:run

# 2. Probar acceso a video
curl -I http://localhost:8080/videos/ejercicios/abductores.mp4

# 3. Consultar ejercicios con videos
curl http://localhost:8080/api/exercises/1
```

## ⚡ Respuesta JSON Esperada

```json
{
  "success": true,
  "data": {
    "id": 1,
    "name": "Abductores",
    "description": "Ejercicio para fortalecer los músculos abductores...",
    "videoUrl": "videos/ejercicios/abductores.mp4",
    "imageUrl": "images/ejercicios/abductores.jpg",
    "category": "Fortalecimiento",
    "intensity": "Suave",
    "instructions": "Sentado en una silla, coloque las manos...",
    "benefits": "Fortalece músculos de cadera, mejora estabilidad...",
    "safetyTips": "Mantenga la espalda recta. No fuerce el movimiento..."
  }
}
```

## 🚨 Notas Importantes

1. **Tamaño de archivos**: Los videos grandes pueden afectar el rendimiento
2. **Formatos soportados**: `.mp4`, `.webm`, `.ogg`
3. **Cache**: Los archivos se cachean por 1 hora para mejor rendimiento
4. **Seguridad**: Los archivos estáticos son públicos (no requieren autenticación)

## 🔧 Resolución de Problemas

### Video no se reproduce:
- Verifica que el archivo esté en la carpeta correcta
- Confirma que el nombre coincida exactamente con la base de datos
- Revisa la consola del navegador para errores CORS

### Error 404:
- Verifica la ruta en la base de datos
- Confirma que StaticResourceConfig esté configurado
- Reinicia el servidor después de agregar videos

¡Una vez completados estos pasos, tendrás un sistema completo de ejercicios con videos integrados! 🎉