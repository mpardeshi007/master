@echo off
echo Restarting Transfer Agency Hub Application...

echo.
echo === Stopping any existing Spring Boot process ===
taskkill /f /im java.exe 2>nul

echo.
echo === Starting Spring Boot Backend ===
start /b mvn spring-boot:run

echo.
echo Waiting for application to start...
timeout /t 10

echo.
echo Application should be starting now. Check:
echo - Main app: http://localhost:8080
echo - Debug endpoint: http://localhost:8080/debug/check
echo - API test: http://localhost:8080/api/auth/validate

pause
