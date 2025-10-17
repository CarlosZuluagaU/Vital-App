# ============================================
# VITAL APP - SCRIPT DE INICIO AUTOMÁTICO
# ============================================
# Este script inicia todos los servicios necesarios para Vital App

Write-Host ""
Write-Host "╔════════════════════════════════════════╗" -ForegroundColor Cyan
Write-Host "║   🚀 INICIANDO VITAL APP (DOCKER)    ║" -ForegroundColor Cyan
Write-Host "╚════════════════════════════════════════╝" -ForegroundColor Cyan
Write-Host ""

# ============================================
# 1. DOCKER COMPOSE
# ============================================
Write-Host "📦 Paso 1/3: Iniciando contenedores Docker..." -ForegroundColor Yellow
Write-Host "   - MySQL en puerto 3307" -ForegroundColor Gray
Write-Host "   - Adminer en puerto 8082" -ForegroundColor Gray
Write-Host ""

docker-compose up -d

if ($LASTEXITCODE -ne 0) {
    Write-Host "❌ Error al iniciar Docker. Verifica que Docker Desktop esté corriendo." -ForegroundColor Red
    exit 1
}

Write-Host "   ✅ Docker iniciado correctamente" -ForegroundColor Green
Write-Host ""
Write-Host "   ⏳ Esperando a que MySQL esté saludable..." -ForegroundColor Gray
Start-Sleep -Seconds 10

# Verificar health
$healthCheck = docker ps --filter "name=vitalapp-mysql" --format "{{.Status}}"
Write-Host "   Estado: $healthCheck" -ForegroundColor Gray
Write-Host ""

# ============================================
# 2. BACKEND SPRING BOOT
# ============================================
Write-Host "⚙️  Paso 2/3: Iniciando Backend (Spring Boot)..." -ForegroundColor Yellow
Write-Host "   - Puerto: 8080" -ForegroundColor Gray
Write-Host "   - Profile: docker" -ForegroundColor Gray
Write-Host "   - MySQL Docker: localhost:3307" -ForegroundColor Gray
Write-Host ""

cd Backend
Start-Process powershell -ArgumentList "-NoExit", "-Command", "Write-Host '⚙️  BACKEND - VITAL APP' -ForegroundColor Cyan; Write-Host 'Profile: docker (MySQL puerto 3307)' -ForegroundColor Gray; Write-Host ''; mvn spring-boot:run -Dspring-boot.run.profiles=docker"
cd ..

Write-Host "   ✅ Backend iniciado (compilando...)" -ForegroundColor Green
Write-Host "   ⏳ La compilación puede tardar 1-2 minutos" -ForegroundColor Gray
Write-Host ""

# ============================================
# 3. FRONTEND REACT
# ============================================
Write-Host "💻 Paso 3/3: Iniciando Frontend (React + Vite)..." -ForegroundColor Yellow
Write-Host "   - Puerto: 5173" -ForegroundColor Gray
Write-Host "   - URL: http://localhost:5173" -ForegroundColor Gray
Write-Host ""

Start-Sleep -Seconds 2
cd Frontend
Start-Process powershell -ArgumentList "-NoExit", "-Command", "Write-Host '💻 FRONTEND - VITAL APP' -ForegroundColor Cyan; Write-Host 'Vite + React + TypeScript' -ForegroundColor Gray; Write-Host ''; npm run dev"
cd ..

Write-Host "   ✅ Frontend iniciado" -ForegroundColor Green
Write-Host ""

# ============================================
# RESUMEN FINAL
# ============================================
Start-Sleep -Seconds 3

Write-Host ""
Write-Host "╔════════════════════════════════════════╗" -ForegroundColor Green
Write-Host "║   ✅ VITAL APP INICIADO EXITOSAMENTE  ║" -ForegroundColor Green
Write-Host "╚════════════════════════════════════════╝" -ForegroundColor Green
Write-Host ""

Write-Host "📊 SERVICIOS DISPONIBLES:" -ForegroundColor Cyan
Write-Host ""
Write-Host "   🌐 Frontend:    " -NoNewline -ForegroundColor White
Write-Host "http://localhost:5173" -ForegroundColor Yellow
Write-Host ""
Write-Host "   ⚙️  Backend API: " -NoNewline -ForegroundColor White
Write-Host "http://localhost:8080/api" -ForegroundColor Yellow
Write-Host ""
Write-Host "   🗄️  Adminer:    " -NoNewline -ForegroundColor White
Write-Host "http://localhost:8082" -ForegroundColor Yellow
Write-Host "      (Usuario: root / Contraseña: root1234)" -ForegroundColor Gray
Write-Host ""

Write-Host "⏳ NOTAS IMPORTANTES:" -ForegroundColor Cyan
Write-Host "   • El Backend puede tardar 1-2 minutos en estar listo" -ForegroundColor Gray
Write-Host "   • Espera el mensaje 'Started VitalAppApplication'" -ForegroundColor Gray
Write-Host "   • Una vez listo, abre: http://localhost:5173" -ForegroundColor Gray
Write-Host ""

Write-Host "🔍 VERIFICAR ESTADO:" -ForegroundColor Cyan
Write-Host "   docker ps                              " -ForegroundColor Gray -NoNewline
Write-Host "# Ver contenedores" -ForegroundColor DarkGray
Write-Host "   curl http://localhost:8080/api/routines" -ForegroundColor Gray -NoNewline
Write-Host "# Probar API" -ForegroundColor DarkGray
Write-Host ""

Write-Host "📚 DOCUMENTACIÓN:" -ForegroundColor Cyan
Write-Host "   INTEGRACION_FINAL.md    - Guía completa" -ForegroundColor Gray
Write-Host "   INICIO_RAPIDO_DOCKER.md - Comandos rápidos" -ForegroundColor Gray
Write-Host ""

Write-Host "🎉 ¡Listo para desarrollar!" -ForegroundColor Green
Write-Host ""

# Abrir navegador automáticamente después de 30 segundos
Write-Host "⏳ Abriendo navegador en 30 segundos..." -ForegroundColor Yellow
Start-Sleep -Seconds 30
Start-Process "http://localhost:5173"

Write-Host "✅ Navegador abierto en http://localhost:5173" -ForegroundColor Green
Write-Host ""
