# VitalApp Backend - Documentación Técnica

Backend del sistema VitalApp desarrollado con Spring Boot 3 y Java 17.

## Estructura del Proyecto

El proyecto sigue una arquitectura limpia con las siguientes capas:

```
src/main/java/com/vitalapp/
├── VitalAppApplication.java               # Clase principal
├── persistence/                           # Capa de persistencia
│   ├── entity/                           # Entidades JPA
│   │   ├── CategoryEntity.java           # Categorías de rutinas
│   │   ├── IntensityEntity.java          # Niveles de intensidad
│   │   ├── RoutineEntity.java            # Rutinas de ejercicios
│   │   ├── PersonEntity.java             # Usuarios del sistema
│   │   └── UserActivityLogEntity.java    # Log de actividades
│   └── repository/                       # Repositorios JPA
│       ├── RoutineRepository.java
│       └── UserActivityLogRepository.java
├── presentation/                         # Capa de presentación
│   ├── controller/                       # Controladores REST
│   │   ├── RoutineController.java        # API de rutinas
│   │   └── ActivityLogController.java    # API de progreso
│   └── dto/                              # Objetos de transferencia
│       ├── RoutineSummaryDTO.java
│       ├── RoutineDetailDTO.java
│       ├── ActivityLogRequestDTO.java
│       └── ActivityLogConfirmationDTO.java
├── service/                              # Capa de negocio
│   ├── interfaces/                       # Interfaces de servicio
│   │   ├── RoutineService.java
│   │   └── ActivityLogService.java
│   └── implementation/                   # Implementaciones
│       ├── RoutineServiceImpl.java
│       └── ActivityLogServiceImpl.java
└── infrastructure/                       # Infraestructura
    └── web/
        └── HealthController.java         # Endpoint de salud
```

## Configuración de Base de Datos

### Prerequisitos
- MySQL 8.0 o superior
- Java 17
- Maven 3.6 o superior

### Configuración de MySQL

1. Instalar MySQL y crear la base de datos:
```sql
CREATE DATABASE vital_app_db CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
```

2. Crear un usuario (opcional):
```sql
CREATE USER 'vitalapp'@'localhost' IDENTIFIED BY 'vitalapp123';
GRANT ALL PRIVILEGES ON vital_app_db.* TO 'vitalapp'@'localhost';
FLUSH PRIVILEGES;
```

3. Actualizar las credenciales en `application.yml` si es necesario.

## Ejecución del Proyecto

### Usando Maven
```bash
# Compilar
mvn clean compile

# Ejecutar
mvn spring-boot:run

# Compilar y crear JAR
mvn clean package

# Ejecutar JAR
java -jar target/vitalapp-backend-0.0.1-SNAPSHOT.jar
```

### Usando IDE
1. Importar el proyecto como un proyecto Maven
2. Ejecutar la clase `VitalAppApplication.java`

El servidor se iniciará en `http://localhost:8080`

## Endpoints de la API

### Módulo de Rutinas

#### 1. Obtener todas las rutinas
```
GET /api/routines
GET /api/routines?categoryId=1
GET /api/routines?intensityId=2
GET /api/routines?categoryId=1&intensityId=1
```

**Respuesta:**
```json
[
  {
    "id": 1,
    "title": "Equilibrio para Empezar el Día",
    "durationMinutes": 15,
    "intensityName": "Suave",
    "categoryName": "Fortalece tu Equilibrio",
    "thumbnailUrl": "https://url.a.una.imagen.previa.jpg"
  }
]
```

#### 2. Obtener detalles de una rutina
```
GET /api/routines/{id}
```

**Respuesta:**
```json
{
  "id": 1,
  "title": "Equilibrio para Empezar el Día",
  "description": "Una serie de ejercicios suaves...",
  "durationMinutes": 15,
  "intensityName": "Suave",
  "categoryName": "Fortalece tu Equilibrio",
  "videoUrl": "https://drive.google.com/file/d/CODIGO_DEL_VIDEO/view?usp=sharing"
}
```

### Módulo de Progreso

#### 1. Registrar finalización de rutina
```
POST /api/me/activities
```

**Cuerpo de la petición:**
```json
{
  "activityType": "ROUTINE_COMPLETED",
  "relatedEntityId": 1
}
```

**Respuesta:**
```json
{
  "status": "success",
  "message": "Actividad registrada correctamente.",
  "newAchievements": []
}
```

### Endpoint de Salud
```
GET /api/health
```

## Datos de Prueba

El sistema incluye datos de prueba que se cargan automáticamente:

- 4 categorías de ejercicios
- 3 niveles de intensidad
- 5 rutinas de ejemplo
- 3 usuarios de prueba
- Algunos logs de actividad

## Tecnologías Utilizadas

- **Spring Boot 3.3.0** - Framework principal
- **Spring Data JPA** - Persistencia de datos
- **MySQL** - Base de datos
- **SpringDoc OpenAPI** - Documentación de API
- **Spring Boot Validation** - Validación de datos

## Documentación de API

Una vez ejecutado el proyecto, la documentación interactiva estará disponible en:
- Swagger UI: `http://localhost:8080/swagger-ui.html`
- OpenAPI JSON: `http://localhost:8080/v3/api-docs`

## Próximas Funcionalidades

- Sistema de autenticación JWT
- Gestión de logros y medallas
- Estadísticas de progreso
- Notificaciones
- Sistema de recomendaciones personalizadas
