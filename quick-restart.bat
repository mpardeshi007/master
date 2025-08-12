@echo off
echo Quick restart after fixing handler conflict...

echo.
echo === Stopping Spring Boot (if running) ===
taskkill /f /im java.exe 2>nul

echo.
echo === Starting Spring Boot Backend ===
mvn spring-boot:run

pause
