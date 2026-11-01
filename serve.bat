@echo off
rem Starts the local test server for this site, the same as `make run`, without needing make installed.
rem Usage: serve.bat [port]    e.g. serve.bat 8000    (default 5173)
setlocal
cd /d "%~dp0"
if "%~1"=="" (set "PORT=5173") else (set "PORT=%~1")
where node >nul 2>nul || (echo Node.js is not installed or not on PATH. Get it from https://nodejs.org/ & pause & exit /b 1)
echo Serving http://127.0.0.1:%PORT%/ - press Ctrl+C to stop
node scripts\serve.mjs
if errorlevel 1 pause
