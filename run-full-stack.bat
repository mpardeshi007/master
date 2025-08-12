@echo off
echo Starting Transfer Agency Hub Full Stack Application...

echo.
echo === Building React Frontend ===
call build-frontend.bat

echo.
echo === Starting Spring Boot Backend ===
call mvn clean spring-boot:run

pause
