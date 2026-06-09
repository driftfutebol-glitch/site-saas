@echo off
chcp 65001 >nul
REM ============================================================
REM   INICIAR-SITE.bat
REM   De dois cliques neste arquivo para ligar o site.
REM   Ele recompila SOZINHO cada vez que voce salva um arquivo.
REM ============================================================

REM Vai para a pasta onde este arquivo esta (funciona de qualquer lugar)
cd /d "%~dp0"

REM Instala as dependencias automaticamente, so na primeira vez
if not exist "node_modules" (
    echo.
    echo Instalando as dependencias pela primeira vez. Pode demorar 1-2 min, aguarde...
    echo.
    call npm install
)

echo.
echo ============================================================
echo   Site iniciando...
echo.
echo   Abra no navegador:   http://localhost:3000
echo.
echo   Pode editar os arquivos: o site se atualiza sozinho.
echo   Para PARAR: feche esta janela (ou aperte Ctrl + C).
echo ============================================================
echo.

call npm run dev

REM Se o servidor parar ou der erro, mantem a janela aberta pra ler a mensagem
echo.
echo O servidor foi encerrado.
pause
