# =============================================================================
# Script de inicio del Frontend de Vital App
# =============================================================================

Write-Host "`n" -NoNewline
Write-Host "╔═══════════════════════════════════════════════════════════╗" -ForegroundColor Cyan
Write-Host "║                                                           ║" -ForegroundColor Cyan
Write-Host "║           VITAL APP - INICIO FRONTEND                    ║" -ForegroundColor Cyan
Write-Host "║                                                           ║" -ForegroundColor Cyan
Write-Host "╚═══════════════════════════════════════════════════════════╝" -ForegroundColor Cyan
Write-Host ""

# Verificar que el backend esté corriendo
Write-Host "[1/4] Verificando Backend..." -ForegroundColor Yellow
$backendRunning = docker ps --filter "name=vitalapp-backend" --format "{{.Names}}" 2>$null

if (-not $backendRunning) {
    Write-Host "   × Backend no está corriendo" -ForegroundColor Red
    Write-Host "`n¿Deseas iniciar el backend ahora? (S/N): " -NoNewline -ForegroundColor Yellow
    $response = Read-Host
    
    if ($response -eq "S" -or $response -eq "s") {
        Write-Host "`nIniciando Backend..." -ForegroundColor Cyan
        & "$PSScriptRoot\build-docker.ps1"
        
        Write-Host "`nEsperando que el backend esté listo..." -ForegroundColor Yellow
        Start-Sleep -Seconds 10
    } else {
        Write-Host "`n× No se puede iniciar el frontend sin el backend" -ForegroundColor Red
        Write-Host "  Ejecuta primero: .\build-docker.ps1" -ForegroundColor Yellow
        exit 1
    }
} else {
    Write-Host "   OK Backend corriendo: $backendRunning" -ForegroundColor Green
}

# Verificar que MySQL esté healthy
Write-Host "`n[2/4] Verificando Base de Datos..." -ForegroundColor Yellow
$mysqlHealth = docker inspect vitalapp-mysql --format='{{.State.Health.Status}}' 2>$null

if ($mysqlHealth -ne "healthy") {
    Write-Host "   ! MySQL no está healthy (estado: $mysqlHealth)" -ForegroundColor Yellow
    Write-Host "   Esperando que MySQL esté listo..." -ForegroundColor Yellow
    Start-Sleep -Seconds 5
}

# Verificar nuevamente
$mysqlHealth = docker inspect vitalapp-mysql --format='{{.State.Health.Status}}' 2>$null
if ($mysqlHealth -eq "healthy") {
    Write-Host "   OK MySQL healthy" -ForegroundColor Green
} else {
    Write-Host "   ! Advertencia: MySQL puede no estar listo" -ForegroundColor Yellow
}

# Verificar que existan rutinas en la base de datos
Write-Host "`n[3/4] Verificando datos en base de datos..." -ForegroundColor Yellow
try {
    $response = Invoke-RestMethod -Uri "http://localhost:8080/api/routines" -Method Get -ErrorAction Stop
    $routineCount = $response.Count
    
    if ($routineCount -gt 0) {
        Write-Host "   OK $routineCount rutinas disponibles" -ForegroundColor Green
    } else {
        Write-Host "   ! No hay rutinas en la base de datos" -ForegroundColor Yellow
        Write-Host "   Ejecutando script de población..." -ForegroundColor Cyan
        & "$PSScriptRoot\populate-database.ps1"
    }
} catch {
    Write-Host "   × Error al verificar rutinas: $($_.Exception.Message)" -ForegroundColor Red
    Write-Host "   El backend puede estar iniciándose aún..." -ForegroundColor Yellow
}

# Cambiar al directorio del Frontend
Write-Host "`n[4/4] Iniciando Frontend..." -ForegroundColor Yellow

if (Test-Path "$PSScriptRoot\Frontend") {
    Set-Location "$PSScriptRoot\Frontend"
    Write-Host "   OK Directorio Frontend encontrado" -ForegroundColor Green
} else {
    Write-Host "   × Directorio Frontend no encontrado" -ForegroundColor Red
    exit 1
}

# Verificar si existe node_modules
if (-not (Test-Path "node_modules")) {
    Write-Host "`n   ! node_modules no encontrado" -ForegroundColor Yellow
    Write-Host "   Instalando dependencias..." -ForegroundColor Cyan
    npm install
}

# Verificar archivo .env
if (Test-Path ".env") {
    Write-Host "   OK Archivo .env encontrado" -ForegroundColor Green
    $envContent = Get-Content ".env" -Raw
    if ($envContent -match "VITE_API_BASE=http://localhost:8080") {
        Write-Host "   OK Configuración API correcta" -ForegroundColor Green
    } else {
        Write-Host "   ! Advertencia: Verifica VITE_API_BASE en .env" -ForegroundColor Yellow
    }
} else {
    Write-Host "   ! Archivo .env no encontrado, creándolo..." -ForegroundColor Yellow
    @"
VITE_API_BASE=http://localhost:8080
VITE_AUTH_MODE=cookie
"@ | Out-File -FilePath ".env" -Encoding UTF8
    Write-Host "   OK Archivo .env creado" -ForegroundColor Green
}

Write-Host "`n" -NoNewline
Write-Host "╔═══════════════════════════════════════════════════════════╗" -ForegroundColor Green
Write-Host "║                                                           ║" -ForegroundColor Green
Write-Host "║              SISTEMA LISTO - INICIANDO VITE              ║" -ForegroundColor Green
Write-Host "║                                                           ║" -ForegroundColor Green
Write-Host "╚═══════════════════════════════════════════════════════════╝" -ForegroundColor Green
Write-Host ""
Write-Host "Backend:  " -NoNewline -ForegroundColor Cyan
Write-Host "http://localhost:8080" -ForegroundColor White
Write-Host "Frontend: " -NoNewline -ForegroundColor Cyan
Write-Host "http://localhost:5173" -ForegroundColor White
Write-Host "Adminer:  " -NoNewline -ForegroundColor Cyan
Write-Host "http://localhost:8082" -ForegroundColor White
Write-Host ""
Write-Host "Presiona Ctrl+C para detener el servidor" -ForegroundColor Yellow
Write-Host ""

# Iniciar Vite
npm run dev
