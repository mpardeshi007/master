@echo off
echo === Transfer Agency Hub - Restart ===

echo.
echo [1/3] Stopping any running Java processes...
powershell -Command "Stop-Process -Name java -Force -ErrorAction SilentlyContinue"
timeout /t 2 > nul

echo.
echo [2/3] Verifying static resources...
if not exist "src\main\resources\static\index.html" (
  echo ERROR: index.html not found in static directory!
  exit /b 1
)
echo Index.html found in static directory.

echo.
echo [3/3] Starting Spring Boot application...
call mvn spring-boot:run

pause
