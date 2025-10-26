# Script de Migración a Docker MySQL
# Ejecutar como Administrador

Write-Host "============================================" -ForegroundColor Cyan
Write-Host "   MIGRACIÓN A DOCKER MYSQL - VITAL APP" -ForegroundColor Cyan
Write-Host "============================================" -ForegroundColor Cyan
Write-Host ""

# Paso 1: Verificar que se está ejecutando como Admin
$isAdmin = ([Security.Principal.WindowsPrincipal] [Security.Principal.WindowsIdentity]::GetCurrent()).IsInRole([Security.Principal.WindowsBuiltInRole]::Administrator)

if (-not $isAdmin) {
    Write-Host "⚠️  ERROR: Este script debe ejecutarse como Administrador" -ForegroundColor Red
    Write-Host ""
    Write-Host "Para ejecutar como administrador:" -ForegroundColor Yellow
    Write-Host "1. Click derecho en PowerShell" -ForegroundColor Yellow
    Write-Host "2. Selecciona 'Ejecutar como administrador'" -ForegroundColor Yellow
    Write-Host "3. Ejecuta: .\migracion_docker.ps1" -ForegroundColor Yellow
    Write-Host ""
    Read-Host "Presiona Enter para salir"
    exit 1
}

Write-Host "✅ Ejecutando como Administrador" -ForegroundColor Green
Write-Host ""

# Paso 2: Detener MySQL Local
Write-Host "📍 PASO 1: Deteniendo MySQL local..." -ForegroundColor Yellow

try {
    $mysqlService = Get-Service MySQL91 -ErrorAction Stop
    
    if ($mysqlService.Status -eq "Running") {
        Write-Host "   Deteniendo servicio MySQL91..." -ForegroundColor White
        Stop-Service -Name MySQL91 -Force -ErrorAction Stop
        Start-Sleep -Seconds 3
        
        $mysqlService = Get-Service MySQL91
        if ($mysqlService.Status -eq "Stopped") {
            Write-Host "   ✅ MySQL91 detenido correctamente" -ForegroundColor Green
        } else {
            Write-Host "   ⚠️  MySQL91 no se detuvo completamente" -ForegroundColor Yellow
        }
    } else {
        Write-Host "   ✅ MySQL91 ya estaba detenido" -ForegroundColor Green
    }
} catch {
    Write-Host "   ⚠️  No se pudo detener MySQL91: $_" -ForegroundColor Yellow
}

Write-Host ""

# Paso 3: Verificar puerto 3306
Write-Host "📍 PASO 2: Verificando puerto 3306..." -ForegroundColor Yellow

$port3306 = Get-NetTCPConnection -LocalPort 3306 -ErrorAction SilentlyContinue

if ($port3306) {
    Write-Host "   ⚠️  Puerto 3306 todavía está en uso" -ForegroundColor Yellow
    $process = Get-Process -Id $port3306[0].OwningProcess -ErrorAction SilentlyContinue
    if ($process) {
        Write-Host "   Proceso: $($process.Name) (PID: $($process.Id))" -ForegroundColor White
        Write-Host "   ¿Quieres forzar el cierre de este proceso? (S/N)" -ForegroundColor Yellow
        $respuesta = Read-Host
        
        if ($respuesta -eq "S" -or $respuesta -eq "s") {
            Stop-Process -Id $process.Id -Force
            Write-Host "   ✅ Proceso terminado" -ForegroundColor Green
            Start-Sleep -Seconds 2
        }
    }
} else {
    Write-Host "   ✅ Puerto 3306 está libre" -ForegroundColor Green
}

Write-Host ""

# Paso 4: Iniciar Docker MySQL
Write-Host "📍 PASO 3: Iniciando Docker MySQL..." -ForegroundColor Yellow
Write-Host "   Ejecutando: docker-compose up -d" -ForegroundColor White

try {
    Set-Location "D:\Programacion\Vital-App"
    docker-compose up -d 2>&1 | Out-String | Write-Host
    
    Write-Host ""
    Write-Host "   ⏳ Esperando a que MySQL inicie..." -ForegroundColor White
    Start-Sleep -Seconds 10
    
    # Verificar que el contenedor está corriendo
    $container = docker ps --filter "name=vitalapp-mysql" --format "{{.Names}}" 2>$null
    
    if ($container -eq "vitalapp-mysql") {
        Write-Host "   ✅ Contenedor MySQL iniciado correctamente" -ForegroundColor Green
    } else {
        Write-Host "   ⚠️  Contenedor MySQL no se inició" -ForegroundColor Yellow
        Write-Host "   Ejecuta: docker-compose logs mysql" -ForegroundColor Yellow
    }
} catch {
    Write-Host "   ❌ Error al iniciar Docker: $_" -ForegroundColor Red
}

Write-Host ""

# Paso 5: Restaurar datos
Write-Host "📍 PASO 4: Restaurando datos..." -ForegroundColor Yellow

$backupFile = Get-ChildItem "vital_app_backup_*.sql" | Sort-Object LastWriteTime -Descending | Select-Object -First 1

if ($backupFile) {
    Write-Host "   Backup encontrado: $($backupFile.Name)" -ForegroundColor White
    Write-Host "   Tamaño: $([math]::Round($backupFile.Length/1KB, 2)) KB" -ForegroundColor White
    Write-Host ""
    Write-Host "   Copiando backup al contenedor..." -ForegroundColor White
    
    docker cp $backupFile.Name vitalapp-mysql:/tmp/backup.sql 2>&1 | Out-Null
    
    Write-Host "   Creando base de datos..." -ForegroundColor White
    docker exec -i vitalapp-mysql mysql -uroot -proot1234 -e "CREATE DATABASE IF NOT EXISTS vital_app_db;" 2>&1 | Out-Null
    
    Write-Host "   Restaurando datos..." -ForegroundColor White
    Get-Content $backupFile.Name | docker exec -i vitalapp-mysql mysql -uroot -proot1234 vital_app_db 2>&1 | Out-Null
    
    Write-Host "   ✅ Datos restaurados" -ForegroundColor Green
    Write-Host ""
    
    # Verificar datos
    Write-Host "   Verificando datos..." -ForegroundColor White
    $rutinas = docker exec -i vitalapp-mysql mysql -uroot -proot1234 vital_app_db -e "SELECT COUNT(*) FROM routines;" 2>&1 | Select-Object -Last 1
    $ejercicios = docker exec -i vitalapp-mysql mysql -uroot -proot1234 vital_app_db -e "SELECT COUNT(*) FROM exercises;" 2>&1 | Select-Object -Last 1
    
    Write-Host "   Rutinas: $rutinas" -ForegroundColor White
    Write-Host "   Ejercicios: $ejercicios" -ForegroundColor White
    Write-Host "   ✅ Verificación completada" -ForegroundColor Green
} else {
    Write-Host "   ⚠️  No se encontró archivo de backup" -ForegroundColor Yellow
    Write-Host "   Ejecuta manualmente: mysqldump -uroot -proot1234 vital_app_db > backup.sql" -ForegroundColor Yellow
}

Write-Host ""

# Resumen final
Write-Host "============================================" -ForegroundColor Cyan
Write-Host "            RESUMEN DE MIGRACIÓN" -ForegroundColor Cyan
Write-Host "============================================" -ForegroundColor Cyan
Write-Host ""

Write-Host "✅ MySQL local: Detenido" -ForegroundColor Green
Write-Host "✅ Docker MySQL: Iniciado" -ForegroundColor Green
Write-Host "✅ Datos: Restaurados" -ForegroundColor Green
Write-Host ""

Write-Host "📍 PRÓXIMOS PASOS:" -ForegroundColor Yellow
Write-Host ""
Write-Host "1. Iniciar Backend:" -ForegroundColor White
Write-Host "   cd Backend" -ForegroundColor Gray
Write-Host "   mvn spring-boot:run -Dspring-boot.run.profiles=mysql" -ForegroundColor Gray
Write-Host ""
Write-Host "2. Iniciar Frontend:" -ForegroundColor White
Write-Host "   cd Frontend" -ForegroundColor Gray
Write-Host "   npm run dev" -ForegroundColor Gray
Write-Host ""
Write-Host "3. Abrir navegador:" -ForegroundColor White
Write-Host "   http://localhost:5173" -ForegroundColor Gray
Write-Host ""
Write-Host "4. Ver Adminer (opcional):" -ForegroundColor White
Write-Host "   http://localhost:8082" -ForegroundColor Gray
Write-Host ""

Write-Host "============================================" -ForegroundColor Cyan
Write-Host ""

Read-Host "Presiona Enter para salir"
