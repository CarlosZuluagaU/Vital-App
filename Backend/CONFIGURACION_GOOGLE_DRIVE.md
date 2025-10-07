# 🎥 CONFIGURACIÓN DE VIDEOS CON GOOGLE DRIVE

## 📋 CÓMO OBTENER LAS URLs DE GOOGLE DRIVE

### **PASO 1: Hacer Públicos los Videos**

1. **Abrir Google Drive** donde están tus 22 videos de ejercicios
2. **Seleccionar todos los videos** (Ctrl+A o Cmd+A)
3. **Clic derecho** → **"Obtener enlace"** o **"Get link"**
4. **Cambiar permisos** a **"Cualquier persona con el enlace"**
5. **Copiar enlace** de cada video

### **PASO 2: Extraer FILE_ID de cada URL**

**URL original de Google Drive:**
```
https://drive.google.com/file/d/1ABC123XYZ789DEF456/view?usp=sharing
```

**FILE_ID es la parte del medio:**
```
1ABC123XYZ789DEF456
```

**URLs que necesitas para el sistema:**
- **Para videos:** `https://drive.google.com/file/d/FILE_ID/preview`
- **Para imágenes:** `https://drive.google.com/uc?export=view&id=FILE_ID`

---

## 🎯 TABLA DE CORRESPONDENCIA

**Copia esta tabla y complétala con tus FILE_IDs reales:**

| Nombre del Ejercicio | Nombre del Video en Drive | FILE_ID |
|---------------------|---------------------------|---------|
| Abductores | ? | ? |
| Caminar Talón-Punta | ? | ? |
| Círculos de Tobillo | ? | ? |
| Elevación de Brazos y Hombros | ? | ? |
| Elevación de Rodilla (Sentado) | ? | ? |
| Elevación de Talones y Puntas | ? | ? |
| Elevación Lateral de Pierna | ? | ? |
| Equilibrio sobre un Pie | ? | ? |
| Estiramiento de Gato-Vaca (Sentado) | ? | ? |
| Extensión de Cuadríceps | ? | ? |
| Flexiones en la Pared (Wall Push-up) | ? | ? |
| Jumping Jacks sin Salto | ? | ? |
| Marcha en el Sitio | ? | ? |
| Paso Lateral | ? | ? |
| Peso muerto con mancuernas | ? | ? |
| Puñetazos al Aire | ? | ? |
| Remo con barra | ? | ? |
| Remo con Banda Elástica | ? | ? |
| Rotación de Cuello | ? | ? |
| Sentadilla | ? | ? |
| Sentarse y Levantarse de una Silla | ? | ? |
| Torsión Suave de Columna (Sentado) | ? | ? |

---

## ⚙️ CONFIGURACIÓN DEL BACKEND

### **Eliminar Configuración de Archivos Estáticos**

Ya no necesitas servir videos localmente, así que puedes comentar o eliminar:

```java
// StaticResourceConfig.java - YA NO NECESARIO
@Configuration
public class StaticResourceConfig implements WebMvcConfigurer {
    // ... código de configuración estática
}
```

### **Actualizar application.yml**

```yaml
# Quitar configuraciones de recursos estáticos
# spring:
#   web:
#     resources:
#       static-locations: classpath:/static/
```

---

## 🛠️ INSTRUCCIONES DE IMPLEMENTACIÓN

### **PASO 1: Completar la Tabla**
1. Ve a tu carpeta de Google Drive con los 22 videos
2. Para cada video, obtén su FILE_ID
3. Completa la tabla de arriba

### **PASO 2: Actualizar el Script SQL**
1. Abrir: `ejercicios-con-google-drive-urls.sql`
2. Reemplazar cada `FILE_ID_AQUI` con el ID real
3. Ejemplo:
   ```sql
   -- ANTES:
   UPDATE exercises SET video_url = 'https://drive.google.com/file/d/FILE_ID_ABDUCTORES/preview'
   
   -- DESPUÉS:
   UPDATE exercises SET video_url = 'https://drive.google.com/file/d/1ABC123XYZ789DEF456/preview'
   ```

### **PASO 3: Ejecutar Scripts**
```sql
-- 1. Ejecutar primero (si no lo has hecho):
ejercicios-completos-clasificados.sql

-- 2. Ejecutar después con tus FILE_IDs:
ejercicios-con-google-drive-urls.sql
```

---

## 🎯 VENTAJAS DE USAR GOOGLE DRIVE

✅ **Sin ocupar espacio en servidor**
✅ **Google maneja el streaming de video**
✅ **URLs permanentes y confiables**
✅ **Fácil actualización de videos**
✅ **Control de acceso centralizado**
✅ **Funciona perfecto con React/web**

---

## 🔧 CÓDIGO DE REACT PARA REPRODUCIR

```typescript
// Componente VideoPlayer.tsx
interface VideoPlayerProps {
  videoUrl: string;
  title: string;
}

const VideoPlayer: React.FC<VideoPlayerProps> = ({ videoUrl, title }) => {
  return (
    <div className="video-container">
      <iframe
        src={videoUrl}
        title={title}
        width="100%"
        height="315"
        frameBorder="0"
        allowFullScreen
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
      />
    </div>
  );
};

// Uso en el componente de ejercicio:
<VideoPlayer 
  videoUrl={exercise.videoUrl} 
  title={exercise.name} 
/>
```

---

## 📱 TESTING

### **Verificar URLs en el Navegador:**
```
https://drive.google.com/file/d/TU_FILE_ID_AQUI/preview
```

### **Verificar en la API:**
```bash
curl http://localhost:8080/api/exercises/1
# Debería retornar exercise.videoUrl con la URL de Google Drive
```

---

## 🚨 SOLUCIÓN DE PROBLEMAS

**Problema:** Video no se reproduce
**Solución:** Verificar que el video sea público y usar `/preview` al final

**Problema:** Video dice "acceso denegado"  
**Solución:** Cambiar permisos del video a "Cualquier persona con el enlace"

**Problema:** URL muy larga
**Solución:** Es normal, Google Drive genera IDs largos

---

**💡 TIP:** Guarda los FILE_IDs en un archivo de texto para futuras referencias.