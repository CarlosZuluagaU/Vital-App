# Script para configurar Google OAuth2 en Vital App
# Ejecuta este script DESPUÉS de obtener tus credenciales de Google Cloud Console

Write-Host "==================================" -ForegroundColor Cyan
Write-Host "   Configuración Google OAuth2    " -ForegroundColor Cyan
Write-Host "==================================" -ForegroundColor Cyan
Write-Host ""

# Solicitar credenciales al usuario
Write-Host "Por favor, ingresa tus credenciales de Google Cloud Console:" -ForegroundColor Yellow
Write-Host ""

$clientId = Read-Host "Google Client ID (xxxxx.apps.googleusercontent.com)"
$clientSecret = Read-Host "Google Client Secret (GOCSPX-xxxxx)"

Write-Host ""
Write-Host "Validando credenciales..." -ForegroundColor Yellow

# Validar que no estén vacías
if ([string]::IsNullOrWhiteSpace($clientId) -or [string]::IsNullOrWhiteSpace($clientSecret)) {
    Write-Host "❌ Error: Las credenciales no pueden estar vacías" -ForegroundColor Red
    Write-Host "Por favor, ejecuta el script de nuevo con credenciales válidas" -ForegroundColor Red
    exit 1
}

# Crear archivo .env
$envPath = Join-Path $PSScriptRoot ".env"
Write-Host "Creando archivo .env en: $envPath" -ForegroundColor Yellow

$envContent = @"
# Google OAuth2 Configuration
# Generado automáticamente - NO SUBIR A GIT
GOOGLE_CLIENT_ID=$clientId
GOOGLE_CLIENT_SECRET=$clientSecret
"@

try {
    Set-Content -Path $envPath -Value $envContent -Encoding UTF8
    Write-Host "✅ Archivo .env creado correctamente" -ForegroundColor Green
} catch {
    Write-Host "❌ Error al crear .env: $_" -ForegroundColor Red
    exit 1
}

# Verificar que .env esté en .gitignore
$gitignorePath = Join-Path $PSScriptRoot ".gitignore"
if (Test-Path $gitignorePath) {
    $gitignoreContent = Get-Content $gitignorePath -Raw
    if ($gitignoreContent -match "\.env") {
        Write-Host "✅ .env está protegido en .gitignore" -ForegroundColor Green
    } else {
        Write-Host "⚠️  Advertencia: .env NO está en .gitignore" -ForegroundColor Yellow
        Write-Host "   Agregando .env a .gitignore..." -ForegroundColor Yellow
        Add-Content -Path $gitignorePath -Value "`n.env"
        Write-Host "✅ .env agregado a .gitignore" -ForegroundColor Green
    }
}

Write-Host ""
Write-Host "==================================" -ForegroundColor Cyan
Write-Host "  Configuración completada ✅     " -ForegroundColor Cyan
Write-Host "==================================" -ForegroundColor Cyan
Write-Host ""
Write-Host "Siguientes pasos:" -ForegroundColor Yellow
Write-Host "1. Reconstruir el backend:" -ForegroundColor White
Write-Host "   docker-compose build backend" -ForegroundColor Gray
Write-Host ""
Write-Host "2. Reiniciar los servicios:" -ForegroundColor White
Write-Host "   docker-compose down" -ForegroundColor Gray
Write-Host "   docker-compose up -d" -ForegroundColor Gray
Write-Host ""
Write-Host "3. Iniciar el frontend:" -ForegroundColor White
Write-Host "   cd Frontend" -ForegroundColor Gray
Write-Host "   npm run dev" -ForegroundColor Gray
Write-Host ""
Write-Host "4. Probar el login:" -ForegroundColor White
Write-Host "   http://localhost:5173/welcome" -ForegroundColor Gray
Write-Host ""
Write-Host "📖 Documentación completa: GOOGLE_LOGIN_QUICKSTART.md" -ForegroundColor Cyan
Write-Host ""
