# ============================================================
#  build.ps1  -  Compila a versao de PRODUCAO e executa
#  Use quando for publicar / testar a versao final (mais rapida).
#  Uso: clique com o botao direito > "Executar com o PowerShell"
#       ou no terminal:  .\build.ps1
# ============================================================

Set-Location -Path $PSScriptRoot

if (-not (Test-Path "node_modules")) {
    Write-Host "Instalando dependencias..." -ForegroundColor Cyan
    npm install
}

Write-Host "Compilando a versao de producao..." -ForegroundColor Cyan
npm run build

# $LASTEXITCODE = 0 significa que o build deu certo
if ($LASTEXITCODE -eq 0) {
    Write-Host ""
    Write-Host "Build concluido com sucesso!" -ForegroundColor Green
    Write-Host "Iniciando em  http://localhost:3000  ..." -ForegroundColor Yellow
    Write-Host "Para parar: aperte Ctrl + C" -ForegroundColor DarkGray
    Write-Host ""
    npm run start
} else {
    Write-Host ""
    Write-Host "A compilacao falhou. Veja as mensagens de erro acima." -ForegroundColor Red
    Read-Host "Aperte Enter para fechar"
}
