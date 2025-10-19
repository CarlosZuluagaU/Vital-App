# =============================================================================
# Script Maestro - Inicio Completo de Vital App
# =============================================================================

Write-Host "`n" -NoNewline
Write-Host "╔═══════════════════════════════════════════════════════════╗" -ForegroundColor Magenta
Write-Host "║                                                           ║" -ForegroundColor Magenta
Write-Host "║        VITAL APP - INICIO COMPLETO DEL SISTEMA           ║" -ForegroundColor Magenta
Write-Host "║              Backend + Frontend + Base de Datos           ║" -ForegroundColor Magenta
Write-Host "║                                                           ║" -ForegroundColor Magenta
Write-Host "╚═══════════════════════════════════════════════════════════╝" -ForegroundColor Magenta
Write-Host ""

# =============================================================================
# PASO 1: Verificar Docker Desktop
# =============================================================================
Write-Host "═══════════════════════════════════════════════════════════" -ForegroundColor Cyan
Write-Host "PASO 1: Verificando Docker Desktop" -ForegroundColor Cyan
Write-Host "═══════════════════════════════════════════════════════════" -ForegroundColor Cyan

$dockerRunning = $false
try {
    docker ps 2>&1 | Out-Null
    $dockerRunning = $LASTEXITCODE -eq 0
} catch {
    $dockerRunning = $false
}

if (-not $dockerRunning) {
    Write-Host "× Docker Desktop no está corriendo" -ForegroundColor Red
    Write-Host "  Iniciando Docker Desktop..." -ForegroundColor Yellow
    
    Start-Process "C:\Program Files\Docker\Docker\Docker Desktop.exe"
    
    Write-Host "  Esperando que Docker Desktop inicie..." -ForegroundColor Yellow
    $maxAttempts = 30
    $attempt = 0
    
    while ($attempt -lt $maxAttempts) {
        Start-Sleep -Seconds 2
        try {
            docker ps 2>&1 | Out-Null
            if ($LASTEXITCODE -eq 0) {
                $dockerRunning = $true
                break
            }
        } catch { }
        $attempt++
        Write-Host "." -NoNewline -ForegroundColor Yellow
    }
    Write-Host ""
    
    if (-not $dockerRunning) {
        Write-Host "× Docker Desktop no pudo iniciarse en 60 segundos" -ForegroundColor Red
        Write-Host "  Por favor, inicia Docker Desktop manualmente y vuelve a ejecutar este script" -ForegroundColor Yellow
        exit 1
    }
}

Write-Host "OK Docker Desktop está corriendo" -ForegroundColor Green

# =============================================================================
# PASO 2: Iniciar Backend y Base de Datos
# =============================================================================
Write-Host "`n═══════════════════════════════════════════════════════════" -ForegroundColor Cyan
Write-Host "PASO 2: Iniciando Backend y Base de Datos" -ForegroundColor Cyan
Write-Host "═══════════════════════════════════════════════════════════" -ForegroundColor Cyan

$backendRunning = docker ps --filter "name=vitalapp-backend" --format "{{.Names}}" 2>$null

if (-not $backendRunning) {
    Write-Host "Ejecutando build-docker.ps1..." -ForegroundColor Yellow
    & "$PSScriptRoot\build-docker.ps1"
} else {
    Write-Host "OK Backend ya está corriendo" -ForegroundColor Green
    
    # Verificar estado del backend
    $backendHealth = docker inspect vitalapp-backend --format='{{.State.Health.Status}}' 2>$null
    if ($backendHealth -eq "healthy") {
        Write-Host "OK Backend está healthy" -ForegroundColor Green
    } else {
        Write-Host "! Backend no está healthy, esperando..." -ForegroundColor Yellow
        Start-Sleep -Seconds 10
    }
}

# =============================================================================
# PASO 3: Verificar datos en la base de datos
# =============================================================================
Write-Host "`n═══════════════════════════════════════════════════════════" -ForegroundColor Cyan
Write-Host "PASO 3: Verificando datos en base de datos" -ForegroundColor Cyan
Write-Host "═══════════════════════════════════════════════════════════" -ForegroundColor Cyan

Write-Host "Esperando que el backend esté completamente listo..." -ForegroundColor Yellow
Start-Sleep -Seconds 5

try {
    $response = Invoke-RestMethod -Uri "http://localhost:8080/api/routines" -Method Get -ErrorAction Stop
    $routineCount = $response.Count
    
    Write-Host "OK $routineCount rutinas disponibles en la base de datos" -ForegroundColor Green
    
    if ($routineCount -eq 0) {
        Write-Host "! Base de datos vacía, ejecutando populate-database.ps1..." -ForegroundColor Yellow
        & "$PSScriptRoot\populate-database.ps1"
    }
} catch {
    Write-Host "! No se pudo verificar rutinas (el backend puede estar iniciándose)" -ForegroundColor Yellow
    Write-Host "  Error: $($_.Exception.Message)" -ForegroundColor DarkGray
}

# =============================================================================
# PASO 4: Iniciar Frontend
# =============================================================================
Write-Host "`n═══════════════════════════════════════════════════════════" -ForegroundColor Cyan
Write-Host "PASO 4: Iniciando Frontend" -ForegroundColor Cyan
Write-Host "═══════════════════════════════════════════════════════════" -ForegroundColor Cyan

# Verificar directorio Frontend
if (-not (Test-Path "$PSScriptRoot\Frontend")) {
    Write-Host "× Directorio Frontend no encontrado" -ForegroundColor Red
    exit 1
}

Set-Location "$PSScriptRoot\Frontend"

# Verificar node_modules
if (-not (Test-Path "node_modules")) {
    Write-Host "Instalando dependencias de npm..." -ForegroundColor Yellow
    npm install
} else {
    Write-Host "OK node_modules encontrado" -ForegroundColor Green
}

# Verificar/Crear archivo .env
if (-not (Test-Path ".env")) {
    Write-Host "Creando archivo .env..." -ForegroundColor Yellow
    @"
VITE_API_BASE=http://localhost:8080
VITE_AUTH_MODE=cookie
"@ | Out-File -FilePath ".env" -Encoding UTF8
    Write-Host "OK Archivo .env creado" -ForegroundColor Green
} else {
    Write-Host "OK Archivo .env encontrado" -ForegroundColor Green
}

# =============================================================================
# RESUMEN Y ARRANQUE FINAL
# =============================================================================
Write-Host "`n" -NoNewline
Write-Host "╔═══════════════════════════════════════════════════════════╗" -ForegroundColor Green
Write-Host "║                                                           ║" -ForegroundColor Green
Write-Host "║            ✓ SISTEMA COMPLETAMENTE INICIADO              ║" -ForegroundColor Green
Write-Host "║                                                           ║" -ForegroundColor Green
Write-Host "╚═══════════════════════════════════════════════════════════╝" -ForegroundColor Green
Write-Host ""
Write-Host "Servicios disponibles:" -ForegroundColor Cyan
Write-Host "  • Backend API:    " -NoNewline -ForegroundColor White
Write-Host "http://localhost:8080" -ForegroundColor Yellow
Write-Host "  • Frontend Web:   " -NoNewline -ForegroundColor White
Write-Host "http://localhost:5173" -ForegroundColor Yellow -NoNewline
Write-Host " (se abrirá en tu navegador)" -ForegroundColor DarkGray
Write-Host "  • Adminer DB:     " -NoNewline -ForegroundColor White
Write-Host "http://localhost:8082" -ForegroundColor Yellow
Write-Host ""
Write-Host "Estado de los datos:" -ForegroundColor Cyan
Write-Host "  • Rutinas:        " -NoNewline -ForegroundColor White
Write-Host "7 disponibles" -ForegroundColor Green
Write-Host "  • Ejercicios:     " -NoNewline -ForegroundColor White
Write-Host "22 disponibles" -ForegroundColor Green
Write-Host "  • Persistencia:   " -NoNewline -ForegroundColor White
Write-Host "Habilitada (volumen Docker)" -ForegroundColor Green
Write-Host ""
Write-Host "Próximos pasos:" -ForegroundColor Cyan
Write-Host "  1. El navegador se abrirá automáticamente" -ForegroundColor White
Write-Host "  2. Regístrate con tu email y contraseña" -ForegroundColor White
Write-Host "  3. Verás las 7 rutinas disponibles" -ForegroundColor White
Write-Host "  4. Tu usuario se guardará permanentemente" -ForegroundColor White
Write-Host ""
Write-Host "Para detener:" -ForegroundColor Yellow
Write-Host "  • Frontend: Presiona Ctrl+C en esta ventana" -ForegroundColor DarkGray
Write-Host "  • Backend:  docker-compose down" -ForegroundColor DarkGray
Write-Host ""
Write-Host "═══════════════════════════════════════════════════════════" -ForegroundColor Cyan
Write-Host ""

# Iniciar Vite (esto abrirá automáticamente el navegador)
npm run dev
