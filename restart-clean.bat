@echo off
echo === Transfer Agency Hub - Clean Restart ===

echo.
echo Stopping any running Java processes...
powershell -Command "Stop-Process -Name java -Force -ErrorAction SilentlyContinue"

echo.
echo Starting Spring Boot application...
mvn spring-boot:run

pause
