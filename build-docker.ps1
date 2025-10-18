# =============================================
# VITAL APP - CONSTRUCCIÓN Y EJECUCIÓN DOCKER
# =============================================
# Este script construye las imágenes Docker y 
# ejecuta toda la aplicación en contenedores
# =============================================

Write-Host ""
Write-Host "╔═══════════════════════════════════════════════════╗" -ForegroundColor Cyan
Write-Host "║   🐳 VITAL APP - BUILD & RUN CON DOCKER          ║" -ForegroundColor Cyan  
Write-Host "╚═══════════════════════════════════════════════════╝" -ForegroundColor Cyan
Write-Host ""

# Verificar que Docker Desktop esté corriendo
Write-Host "🔍 Verificando Docker Desktop..." -ForegroundColor Yellow
$dockerRunning = docker ps 2>$null
if ($LASTEXITCODE -ne 0) {
    Write-Host "❌ Docker Desktop no está corriendo" -ForegroundColor Red
    Write-Host "   Por favor, inicia Docker Desktop y vuelve a ejecutar este script" -ForegroundColor Gray
    exit 1
}
Write-Host "   ✅ Docker Desktop está corriendo`n" -ForegroundColor Green

# Paso 1: Detener contenedores existentes
Write-Host "🛑 Paso 1/5: Deteniendo contenedores existentes..." -ForegroundColor Yellow
docker-compose down 2>$null
Write-Host "   ✅ Contenedores detenidos`n" -ForegroundColor Green

# Paso 2: Construir imagen del backend
Write-Host "🏗️  Paso 2/5: Construyendo imagen Docker del Backend..." -ForegroundColor Yellow
Write-Host "   (Esto puede tardar 2-3 minutos la primera vez)`n" -ForegroundColor Gray

docker-compose build backend

if ($LASTEXITCODE -ne 0) {
    Write-Host "`n❌ Error al construir la imagen del backend" -ForegroundColor Red
    exit 1
}

Write-Host "`n   ✅ Imagen del backend construida exitosamente`n" -ForegroundColor Green

# Paso 3: Iniciar todos los servicios
Write-Host "🚀 Paso 3/5: Iniciando todos los servicios..." -ForegroundColor Yellow
Write-Host "   - MySQL" -ForegroundColor Gray
Write-Host "   - Backend Spring Boot" -ForegroundColor Gray
Write-Host "   - Adminer`n" -ForegroundColor Gray

docker-compose up -d

if ($LASTEXITCODE -ne 0) {
    Write-Host "`n❌ Error al iniciar los servicios" -ForegroundColor Red
    exit 1
}

Write-Host "`n   ✅ Servicios iniciados`n" -ForegroundColor Green

# Paso 4: Esperar a que MySQL esté listo
Write-Host "⏳ Paso 4/5: Esperando a que MySQL esté saludable..." -ForegroundColor Yellow
$maxAttempts = 30
$attempt = 0

while ($attempt -lt $maxAttempts) {
    $health = docker inspect vitalapp-mysql --format='{{.State.Health.Status}}' 2>$null
    
    if ($health -eq 'healthy') {
        Write-Host "   ✅ MySQL está saludable`n" -ForegroundColor Green
        break
    }
    
    $attempt++
    Write-Host "   Intento $attempt/$maxAttempts - Estado: $health" -ForegroundColor Gray
    Start-Sleep -Seconds 2
}

if ($attempt -eq $maxAttempts) {
    Write-Host "`n⚠️  MySQL tardó mucho en estar listo" -ForegroundColor Yellow
    Write-Host "   Puedes verificar los logs con: docker logs vitalapp-mysql`n" -ForegroundColor Gray
}

# Paso 5: Verificar que el backend esté respondiendo
Write-Host "⏳ Paso 5/5: Esperando a que Backend esté listo..." -ForegroundColor Yellow
Write-Host "   (Puede tardar 60-90 segundos)`n" -ForegroundColor Gray

$maxAttempts = 45
$attempt = 0

while ($attempt -lt $maxAttempts) {
    try {
        $response = Invoke-RestMethod -Uri "http://localhost:8080/actuator/health" -TimeoutSec 2 -ErrorAction Stop
        if ($response.status -eq 'UP') {
            Write-Host "   ✅ Backend está respondiendo`n" -ForegroundColor Green
            break
        }
    } catch {
        # Ignorar errores y continuar esperando
    }
    
    $attempt++
    if ($attempt % 5 -eq 0) {
        Write-Host "   Esperando... ($attempt segundos)" -ForegroundColor Gray
    }
    Start-Sleep -Seconds 1
}

if ($attempt -eq $maxAttempts) {
    Write-Host "`n⚠️  Backend tardó mucho en responder" -ForegroundColor Yellow
    Write-Host "   Puedes verificar los logs con: docker logs vitalapp-backend`n" -ForegroundColor Gray
}

# Mostrar estado final
Write-Host ""
Write-Host "╔═══════════════════════════════════════════════════╗" -ForegroundColor Green
Write-Host "║         ✅ VITAL APP EJECUTÁNDOSE EN DOCKER      ║" -ForegroundColor Green
Write-Host "╚═══════════════════════════════════════════════════╝" -ForegroundColor Green
Write-Host ""

# Ver estado de contenedores
Write-Host "📊 ESTADO DE CONTENEDORES:" -ForegroundColor Cyan
docker ps --filter "name=vitalapp" --format "table {{.Names}}\t{{.Status}}\t{{.Ports}}"
Write-Host ""

# Información de acceso
Write-Host "🔗 ACCESOS:" -ForegroundColor Cyan
Write-Host ""
Write-Host "   🌐 Backend API:  " -NoNewline -ForegroundColor White
Write-Host "http://localhost:8080/api" -ForegroundColor Yellow
Write-Host ""
Write-Host "   📊 Health Check: " -NoNewline -ForegroundColor White
Write-Host "http://localhost:8080/actuator/health" -ForegroundColor Yellow
Write-Host ""
Write-Host "   🗄️  Adminer:     " -NoNewline -ForegroundColor White
Write-Host "http://localhost:8082" -ForegroundColor Yellow
Write-Host "      (Server: mysql, User: root, Pass: root1234)" -ForegroundColor Gray
Write-Host ""

# Comandos útiles
Write-Host "🔧 COMANDOS ÚTILES:" -ForegroundColor Cyan
Write-Host ""
Write-Host "   Ver logs Backend:  " -NoNewline -ForegroundColor White
Write-Host "docker logs -f vitalapp-backend" -ForegroundColor Gray
Write-Host ""
Write-Host "   Ver logs MySQL:    " -NoNewline -ForegroundColor White
Write-Host "docker logs -f vitalapp-mysql" -ForegroundColor Gray
Write-Host ""
Write-Host "   Detener todo:      " -NoNewline -ForegroundColor White
Write-Host "docker-compose down" -ForegroundColor Gray
Write-Host ""
Write-Host "   Reiniciar Backend: " -NoNewline -ForegroundColor White
Write-Host "docker-compose restart backend" -ForegroundColor Gray
Write-Host ""

# Verificar API
Write-Host "🧪 PRUEBA RÁPIDA:" -ForegroundColor Cyan
Write-Host ""
try {
    $routines = Invoke-RestMethod -Uri "http://localhost:8080/api/routines" -TimeoutSec 5
    Write-Host "   ✅ API funcionando - $($routines.Count) rutinas disponibles" -ForegroundColor Green
} catch {
    Write-Host "   ⏳ API todavía iniciando (espera 30-60 seg más)" -ForegroundColor Yellow
}
Write-Host ""

Write-Host "🎉 ¡Todo listo! Backend corriendo en Docker" -ForegroundColor Green
Write-Host ""
