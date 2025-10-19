# Guía de Inicialización con Docker Compose

## Problema Resuelto

Este documento explica cómo se solucionaron los siguientes problemas:

1. ✅ **ERR_EMPTY_RESPONSE**: El backend no se conectaba correctamente a MySQL
2. ✅ **Datos seed no cargados**: Las tablas se creaban vacías
3. ✅ **Rutinas y ejercicios ausentes**: No aparecían los datos de ejemplo

## Cambios Realizados

### 1. Archivo de Inicialización SQL Único

Se creó `Backend/src/main/resources/sql/00-init-database.sql` que:
- Crea todas las tablas en orden correcto
- Inserta datos de catálogos (categorías, intensidades, tipos de ejercicio)
- Inserta ejercicios de ejemplo (11 ejercicios)
- Inserta rutinas de ejemplo (4 rutinas)
- Establece las relaciones rutina-ejercicio

**Importante**: Los archivos SQL en `docker-entrypoint-initdb.d` se ejecutan **solo la primera vez** que se crea el contenedor o cuando el volumen está vacío.

### 2. Configuración de Application.yml

Se actualizó el perfil `docker` en `application.yml`:
- **URL correcta**: `jdbc:mysql://mysql:3306/...` (usa el nombre del servicio, no localhost)
- **ddl-auto: none**: Las tablas se crean vía SQL, no por Hibernate
- **Hikari pool**: Configuración optimizada de conexiones

### 3. Docker Compose

Se mejoró `compose.yml`:
- Red `vitalapp-network` para comunicación entre contenedores
- Health checks apropiados
- `start_period: 90s` para dar tiempo al backend a iniciar
- Dependencias correctas entre servicios

## Cómo Usar

### Primera Vez (Instalación Limpia)

```powershell
# 1. Detener y limpiar todo (si existe)
docker compose down -v

# 2. Levantar los servicios
docker compose up -d

# 3. Ver los logs para verificar
docker compose logs -f backend

# 4. Esperar a que el backend esté listo (aprox 2-3 minutos)
# Verás en los logs: "Started VitalAppApplication"
```

### Verificar que Funciona

1. **Health Check del Backend**:
   ```
   http://localhost:8080/actuator/health
   ```
   Debería responder: `{"status":"UP"}`

2. **Ver Rutinas**:
   ```
   http://localhost:8080/api/routines
   ```
   Debería devolver 4 rutinas

3. **Ver Ejercicios**:
   ```
   http://localhost:8080/api/exercises
   ```
   Debería devolver 11 ejercicios

4. **Adminer (BD)**:
   ```
   http://localhost:8082
   ```
   - Server: `mysql`
   - Usuario: `root`
   - Password: `root1234`
   - Database: `vital_app_db`

### Comandos Útiles

```powershell
# Ver estado de los contenedores
docker compose ps

# Ver logs del backend
docker compose logs backend

# Ver logs de MySQL
docker compose logs mysql

# Reiniciar solo el backend
docker compose restart backend

# Entrar al contenedor de MySQL
docker exec -it vitalapp-mysql mysql -uroot -proot1234 vital_app_db

# Ver tablas en MySQL
docker exec -it vitalapp-mysql mysql -uroot -proot1234 -e "USE vital_app_db; SHOW TABLES;"

# Contar rutinas
docker exec -it vitalapp-mysql mysql -uroot -proot1234 -e "USE vital_app_db; SELECT COUNT(*) FROM routines;"

# Contar ejercicios
docker exec -it vitalapp-mysql mysql -uroot -proot1234 -e "USE vital_app_db; SELECT COUNT(*) FROM exercises;"
```

## Solución de Problemas

### Problema: Backend no inicia

**Síntoma**: `docker compose logs backend` muestra errores de conexión a MySQL

**Solución**:
```powershell
# Verificar que MySQL está saludable
docker compose ps

# Si MySQL no está healthy, revisar sus logs
docker compose logs mysql

# Reiniciar todo
docker compose down
docker compose up -d
```

### Problema: Tablas vacías

**Síntoma**: Las tablas existen pero no tienen datos

**Causa**: El volumen de MySQL ya existía con datos antiguos

**Solución**:
```powershell
# ADVERTENCIA: Esto borrará TODOS los datos
docker compose down -v
docker compose up -d
```

### Problema: ERR_EMPTY_RESPONSE

**Síntoma**: Al acceder a `http://localhost:8080/api/...` no responde

**Posibles causas**:
1. El backend aún está iniciando (espera 2-3 minutos)
2. El backend falló al conectarse a MySQL
3. Puerto 8080 está ocupado

**Solución**:
```powershell
# Verificar logs
docker compose logs backend

# Verificar puertos
netstat -ano | findstr :8080

# Si el puerto está ocupado, cambiar en compose.yml:
# ports:
#   - "8081:8080"  # Usar puerto 8081 en su lugar
```

### Problema: "Access denied for user"

**Solución**:
Verificar que las credenciales en `compose.yml` y `application.yml` coincidan:
- Usuario: `root`
- Password: `root1234`

## Datos de Ejemplo Incluidos

### Rutinas (4 rutinas):
1. **Equilibrio Básico para Principiantes** (15 min, Suave)
2. **Movilidad Matutina** (20 min, Muy Suave)
3. **Fuerza Funcional Completa** (25 min, Moderado)
4. **Cardio Activo Sin Impacto** (20 min, Suave)

### Ejercicios (11 ejercicios):
- 3 de Equilibrio
- 3 de Flexibilidad
- 3 de Fortalecimiento
- 2 de Cardio

### Catálogos:
- 10 Categorías
- 5 Niveles de Intensidad
- 9 Tipos de Ejercicio
- 2 Planes de Suscripción

## Notas Importantes

1. **Primer inicio**: MySQL ejecuta los scripts SQL automáticamente
2. **Reinicios posteriores**: Los datos persisten en el volumen `mysqldata`
3. **Limpiar datos**: Usa `docker compose down -v` para borrar el volumen
4. **Tiempo de inicio**: El backend puede tardar 60-90 segundos en estar listo
5. **Nombres de archivos SQL**: Los archivos con prefijo numérico (00-, 01-, etc.) se ejecutan en orden

## Próximos Pasos

Para agregar más datos:
1. Edita `00-init-database.sql`
2. Ejecuta `docker compose down -v` (borra datos existentes)
3. Ejecuta `docker compose up -d`

O bien, inserta datos directamente en MySQL usando Adminer o comandos SQL.
