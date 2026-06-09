# ============================================================
#  dev.ps1  -  Inicia o site em modo DESENVOLVIMENTO
#  Recompila SOZINHO a cada vez que voce salva um arquivo.
#  Uso: clique com o botao direito > "Executar com o PowerShell"
#       ou no terminal:  .\dev.ps1
# ============================================================

# Vai para a pasta onde este script esta (funciona de qualquer lugar)
Set-Location -Path $PSScriptRoot

# Instala as dependencias automaticamente, so se ainda nao existirem
if (-not (Test-Path "node_modules")) {
    Write-Host "Instalando dependencias (so na primeira vez, aguarde)..." -ForegroundColor Cyan
    npm install
}

Write-Host ""
Write-Host "Iniciando o servidor de desenvolvimento..." -ForegroundColor Green
Write-Host "Abra no navegador:  http://localhost:3000" -ForegroundColor Yellow
Write-Host "Pode editar os arquivos: o site recompila e atualiza sozinho." -ForegroundColor DarkGray
Write-Host "Para parar: aperte Ctrl + C" -ForegroundColor DarkGray
Write-Host ""

npm run dev
