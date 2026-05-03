# start.ps1 — Inicia backend e frontend da Copa 2026
# Uso: .\start.ps1
# Pré-requisito: backend\.venv criado e npm install executado

$root = Split-Path -Parent $MyInvocation.MyCommand.Path
$backendDir = Join-Path $root "backend"
$frontendDir = Join-Path $root "frontend"
$venv = Join-Path $backendDir ".venv\Scripts\python.exe"

Write-Host "=== Copa 2026 ===" -ForegroundColor Green

# Verificar .venv
if (-not (Test-Path $venv)) {
    Write-Host "[AVISO] .venv nao encontrado em backend\.venv" -ForegroundColor Yellow
    Write-Host "Execute primeiro: cd backend && python -m venv .venv && .venv\Scripts\activate && pip install -r requirements.txt"
    exit 1
}

# Verificar .env
$envFile = Join-Path $backendDir ".env"
if (-not (Test-Path $envFile)) {
    Copy-Item (Join-Path $backendDir ".env.example") $envFile
    Write-Host "[OK] .env criado a partir de .env.example. Edite ADMIN_KEY antes de usar o painel admin." -ForegroundColor Yellow
}

# Iniciar backend em background
Write-Host "[INFO] Iniciando backend em http://localhost:8000 ..." -ForegroundColor Cyan
$backendProc = Start-Process -PassThru -NoNewWindow `
    -FilePath $venv `
    -ArgumentList "-m", "uvicorn", "main:app", "--reload", "--port", "8000" `
    -WorkingDirectory $backendDir

# Aguardar backend subir
Start-Sleep -Seconds 2

# Iniciar frontend em background
Write-Host "[INFO] Iniciando frontend em http://localhost:5173 ..." -ForegroundColor Cyan
$frontendProc = Start-Process -PassThru -NoNewWindow `
    -FilePath "npm" `
    -ArgumentList "run", "dev" `
    -WorkingDirectory $frontendDir

Write-Host ""
Write-Host "Servidores iniciados!" -ForegroundColor Green
Write-Host "  Frontend: http://localhost:5173" -ForegroundColor White
Write-Host "  Backend:  http://localhost:8000" -ForegroundColor White
Write-Host "  API docs: http://localhost:8000/docs" -ForegroundColor White
Write-Host "  Admin:    http://localhost:5173/admin" -ForegroundColor White
Write-Host ""
Write-Host "Pressione Ctrl+C para encerrar ambos os servidores." -ForegroundColor Gray

try {
    Wait-Process -Id $backendProc.Id
} finally {
    Write-Host "`nEncerrando servidores..." -ForegroundColor Yellow
    if (-not $backendProc.HasExited)  { Stop-Process -Id $backendProc.Id  -Force -ErrorAction SilentlyContinue }
    if (-not $frontendProc.HasExited) { Stop-Process -Id $frontendProc.Id -Force -ErrorAction SilentlyContinue }
    Write-Host "Encerrado." -ForegroundColor Gray
}
