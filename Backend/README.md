# VitalApp Backend

## Descripción

Backend para VitalApp - Una aplicación para adultos mayores que proporciona rutinas de ejercicio personalizadas.

## Tecnologías

- **Java 17+** 
- **Spring Boot 3.3.0**
- **Spring Data JPA**
- **H2 Database** (desarrollo)
- **MySQL** (producción)
- **Maven**

## Estructura del Proyecto

```
src/
├── main/
│   ├── java/com/vitalapp/
│   │   ├── persistence/          # Entidades y repositorios
│   │   │   ├── entity/          # Entidades JPA
│   │   │   └── repository/      # Repositorios Spring Data
│   │   ├── service/             # Lógica de negocio
│   │   │   ├── interfaces/      # Interfaces de servicios
│   │   │   └── implementation/  # Implementaciones
│   │   ├── presentation/        # Controllers y DTOs
│   │   │   ├── controller/      # Rest Controllers
│   │   │   └── dto/            # Data Transfer Objects
│   │   └── VitalAppApplication.java
│   └── resources/
│       ├── application.yml      # Configuración
│       └── sql/data.sql        # Datos iniciales
```

## Configuración y Ejecución

### Ejecutar con H2 (Base de datos en memoria - Desarrollo)

```bash
# Compilar el proyecto
mvn clean compile

# Ejecutar la aplicación
mvn spring-boot:run
```

### Ejecutar con MySQL (Producción)

1. **Instalar y configurar MySQL:**
   ```sql
   CREATE DATABASE vital_app_db;
   CREATE USER 'vitalapp'@'localhost' IDENTIFIED BY 'password';
   GRANT ALL PRIVILEGES ON vital_app_db.* TO 'vitalapp'@'localhost';
   ```

2. **Ejecutar con perfil MySQL:**
   ```bash
   mvn spring-boot:run -Dspring-boot.run.profiles=mysql
   ```

## APIs Disponibles

### Módulo de Rutinas

#### 1. Obtener todas las rutinas
- **GET** `/api/routines`
- **Parámetros opcionales:**
  - `categoryId`: Filtrar por categoría
  - `intensityId`: Filtrar por intensidad

**Ejemplo:**
```bash
curl http://localhost:8080/api/routines
curl http://localhost:8080/api/routines?categoryId=1&intensityId=1
```

#### 2. Obtener detalles de una rutina
- **GET** `/api/routines/{id}`

**Ejemplo:**
```bash
curl http://localhost:8080/api/routines/1
```

### Módulo de Ejercicios

#### 1. Obtener todos los ejercicios
- **GET** `/api/exercises`
- **Parámetros opcionales:**
  - `categoryId`: Filtrar por categoría
  - `intensityId`: Filtrar por intensidad
  - `exerciseTypeId`: Filtrar por tipo de ejercicio
  - `locationType`: Filtrar por ubicación (GYM o HOME)

**Ejemplo:**
```bash
curl http://localhost:8080/api/exercises
curl http://localhost:8080/api/exercises?categoryId=1&locationType=HOME
```

#### 2. Obtener ejercicios de gimnasio
- **GET** `/api/exercises/gym`
- **Parámetros opcionales:**
  - `categoryId`: Filtrar por categoría
  - `intensityId`: Filtrar por intensidad

**Ejemplo:**
```bash
curl http://localhost:8080/api/exercises/gym
curl http://localhost:8080/api/exercises/gym?categoryId=5&intensityId=2
```

#### 3. Obtener ejercicios para casa
- **GET** `/api/exercises/home`
- **Parámetros opcionales:**
  - `categoryId`: Filtrar por categoría
  - `intensityId`: Filtrar por intensidad

**Ejemplo:**
```bash
curl http://localhost:8080/api/exercises/home
curl http://localhost:8080/api/exercises/home?categoryId=1&intensityId=1
```

#### 4. Obtener detalles de un ejercicio
- **GET** `/api/exercises/{id}`

**Ejemplo:**
```bash
curl http://localhost:8080/api/exercises/1
```

#### 5. Obtener ejercicios por categoría
- **GET** `/api/exercises/category/{categoryId}`
- **Parámetros opcionales:**
  - `locationType`: Filtrar por ubicación (GYM o HOME)

**Ejemplo:**
```bash
curl http://localhost:8080/api/exercises/category/1
curl http://localhost:8080/api/exercises/category/1?locationType=HOME
```

### Módulo de Progreso

#### 1. Registrar actividad completada
- **POST** `/api/me/activities`
- **Body:**
```json
{
  "activityType": "ROUTINE_COMPLETED",
  "relatedEntityId": 1
}
```

**Ejemplo:**
```bash
curl -X POST http://localhost:8080/api/me/activities \
  -H "Content-Type: application/json" \
  -d '{"activityType":"ROUTINE_COMPLETED","relatedEntityId":1}'
```

## Categorías de Ejercicios Disponibles

### Ejercicios para Casa (HOME)
1. **Fortalece tu Equilibrio** (ID: 1)
   - Equilibrio sobre un Pie
   - Caminar Talón-Punta
   - Elevación Lateral de Pierna
   - Elevación de Talones y Puntas

2. **Articulaciones Felices** (ID: 2)
   - Círculos de Tobillo
   - Rotación de Cuello
   - Estiramiento Gato-Vaca Sentado
   - Elevación de Brazos y Hombros

3. **Corazón Contento** (ID: 4)
   - Marcha en el Sitio
   - Paso Lateral (Paso-Toco)
   - Jumping Jacks sin Salto
   - Puñetazos al Aire

4. **Fuerza Funcional** (ID: 3)
   - Sentarse y Levantarse de una Silla
   - Flexiones en la Pared
   - Elevación de Rodilla Sentado

### Ejercicios de Gimnasio (GYM)
1. **Tren Inferior** (ID: 5)
   - Máquina de Prensa de Piernas
   - Máquina de Extensión de Cuádriceps
   - Máquina de Curl Femoral Sentado
   - Elevación de Talones en Máquina

2. **Tren Superior** (ID: 6)
   - Máquina de Press de Pecho
   - Remo Sentado en Polea
   - Jalón al Pecho en Polea Alta
   - Curl de Bíceps con Mancuernas Sentado

3. **Corazón Contento** (ID: 4)
   - Bicicleta Reclinada
   - Caminadora
   - Máquina Elíptica

## Acceso a la Base de Datos H2

Cuando ejecutas en modo desarrollo (H2), puedes acceder a la consola web:

- **URL:** http://localhost:8080/h2-console
- **JDBC URL:** `jdbc:h2:mem:vitalapp`
- **Usuario:** `sa`
- **Contraseña:** (vacía)

## Datos de Prueba

La aplicación viene con datos de prueba precargados:

- **Categorías:** Fortalece tu Equilibrio, Articulaciones Felices, etc.
- **Intensidades:** Suave, Moderado, Intenso
- **Rutinas:** 5 rutinas de ejemplo con videos de Google Drive
- **Usuarios:** 3 usuarios de prueba
- **Logs de actividad:** Algunas actividades completadas

## Documentación API (Swagger)

Una vez ejecutando la aplicación, puedes acceder a la documentación interactiva de la API:

- **URL:** http://localhost:8080/swagger-ui.html

## Comandos Útiles

```bash
# Limpiar y compilar
mvn clean compile

# Ejecutar tests
mvn test

# Generar JAR
mvn clean package

# Ejecutar JAR generado
java -jar target/vitalapp-backend-0.0.1-SNAPSHOT.jar

# Ejecutar con perfil específico
java -jar target/vitalapp-backend-0.0.1-SNAPSHOT.jar --spring.profiles.active=mysql
```

## Próximas Funcionalidades

- [ ] Autenticación JWT
- [ ] Sistema de logros/medallas
- [ ] Estadísticas de progreso
- [ ] Filtros avanzados de rutinas
- [ ] Subida de videos a Google Drive API
- [ ] Notificaciones
