# Script para Poblar la Base de Datos con Datos Iniciales
# Ejecutar después de iniciar Docker

Write-Host ""
Write-Host "=== POBLACION DE BASE DE DATOS VITAL APP ===" -ForegroundColor Cyan
Write-Host "Este script carga los datos iniciales en MySQL Docker" -ForegroundColor Yellow
Write-Host ""

# Verificar que MySQL está corriendo
Write-Host "[1/4] Verificando MySQL..." -ForegroundColor Yellow
$mysqlRunning = docker ps --filter "name=vitalapp-mysql" --filter "status=running" --format "{{.Names}}"
if (-not $mysqlRunning) {
    Write-Host "ERROR: MySQL no esta corriendo" -ForegroundColor Red
    Write-Host "Ejecuta primero: docker-compose up -d" -ForegroundColor Yellow
    exit 1
}
Write-Host "OK MySQL corriendo" -ForegroundColor Green

# Verificar que backend está corriendo (para que cree las tablas)
Write-Host ""
Write-Host "[2/4] Verificando Backend..." -ForegroundColor Yellow
$backendRunning = docker ps --filter "name=vitalapp-backend" --filter "status=running" --format "{{.Names}}"
if (-not $backendRunning) {
    Write-Host "Backend no esta corriendo. Iniciando..." -ForegroundColor Yellow
    docker-compose up -d backend
    Write-Host "Esperando 45 segundos para que el backend cree las tablas..." -ForegroundColor Yellow
    Start-Sleep -Seconds 45
}
Write-Host "OK Backend corriendo" -ForegroundColor Green

# Esperar a que las tablas estén creadas
Write-Host ""
Write-Host "[3/4] Esperando a que se creen las tablas..." -ForegroundColor Yellow
$maxAttempts = 10
$attempt = 0
$tablesCreated = $false

while ($attempt -lt $maxAttempts -and -not $tablesCreated) {
    $attempt++
    Write-Host "Intento $attempt de $maxAttempts..." -ForegroundColor Gray
    
    $tables = docker exec vitalapp-mysql mysql -uroot -proot1234 vital_app_db -e "SHOW TABLES;" 2>$null
    if ($tables -and ($tables.Contains("routines")) -and ($tables.Contains("exercises"))) {
        $tablesCreated = $true
        Write-Host "OK Tablas creadas correctamente" -ForegroundColor Green
    } else {
        Start-Sleep -Seconds 5
    }
}

if (-not $tablesCreated) {
    Write-Host "ERROR: Las tablas no se crearon" -ForegroundColor Red
    Write-Host "Verifica los logs: docker logs vitalapp-backend" -ForegroundColor Yellow
    exit 1
}

# Cargar datos
Write-Host ""
Write-Host "[4/4] Cargando datos iniciales..." -ForegroundColor Yellow

# Verificar si ya hay datos
$countResult = docker exec vitalapp-mysql mysql -uroot -proot1234 vital_app_db -e "SELECT COUNT(*) as total FROM routines;" 2>$null
if ($countResult -match "total\s+(\d+)") {
    $count = [int]$matches[1]
    if ($count -ge 6) {
        Write-Host "Advertencia: Ya existen $count rutinas en la base de datos" -ForegroundColor Yellow
        $response = Read-Host "Deseas recargar los datos? (s/n)"
        if ($response -ne "s" -and $response -ne "S") {
            Write-Host "Operacion cancelada" -ForegroundColor Yellow
            exit 0
        }
        
        Write-Host "Limpiando datos existentes..." -ForegroundColor Yellow
        docker exec vitalapp-mysql mysql -uroot -proot1234 vital_app_db -e "SET FOREIGN_KEY_CHECKS=0; TRUNCATE TABLE routine_exercises; TRUNCATE TABLE routines; TRUNCATE TABLE exercises; TRUNCATE TABLE categories; TRUNCATE TABLE intensities; TRUNCATE TABLE exercise_types; SET FOREIGN_KEY_CHECKS=1;" 2>$null
    }
}

Write-Host "Cargando datos basicos..." -ForegroundColor Gray
Get-Content Backend/src/main/resources/sql/datos-basicos-compatible.sql | docker exec -i vitalapp-mysql mysql -uroot -proot1234 vital_app_db 2>$null

Write-Host "Cargando ejercicios completos..." -ForegroundColor Gray
Get-Content Backend/src/main/resources/sql/ejercicios-completos-clasificados.sql | docker exec -i vitalapp-mysql mysql -uroot -proot1234 vital_app_db 2>$null

Write-Host "Cargando rutinas..." -ForegroundColor Gray
Get-Content Backend/src/main/resources/sql/rutinas-completas-con-ejercicios.sql | docker exec -i vitalapp-mysql mysql -uroot -proot1234 vital_app_db 2>$null

# Verificar datos cargados
Write-Host ""
Write-Host "=== VERIFICACION ===" -ForegroundColor Cyan
$stats = docker exec vitalapp-mysql mysql -uroot -proot1234 vital_app_db -e "SELECT 'Categorias' as tipo, COUNT(*) as total FROM categories UNION ALL SELECT 'Intensidades', COUNT(*) FROM intensities UNION ALL SELECT 'Ejercicios', COUNT(*) FROM exercises UNION ALL SELECT 'Rutinas', COUNT(*) FROM routines UNION ALL SELECT 'Relaciones', COUNT(*) FROM routine_exercises;" 2>$null

Write-Host $stats -ForegroundColor Green

Write-Host ""
Write-Host "OK DATOS CARGADOS EXITOSAMENTE" -ForegroundColor Green
Write-Host ""
Write-Host "Puedes verificar en:" -ForegroundColor Yellow
Write-Host "  - API Rutinas: http://localhost:8080/api/routines" -ForegroundColor Cyan
Write-Host "  - Adminer: http://localhost:8082" -ForegroundColor Cyan
Write-Host ""
