@echo off
echo Testing Authentication System...

echo.
echo === 1. Checking if users exist ===
curl -s http://localhost:8080/debug/users

echo.
echo.
echo === 2. Testing direct login with curl ===
curl -s -X POST http://localhost:8080/api/auth/signin ^
  -H "Content-Type: application/json" ^
  -d "{\"username\": \"user\", \"password\": \"password\"}"

echo.
echo.
echo === 3. Testing debug login ===
curl -s -X POST http://localhost:8080/debug/test-login ^
  -H "Content-Type: application/json" ^
  -d "{\"username\": \"user\", \"password\": \"password\"}"

echo.
echo.
echo === 4. Checking static resources ===
curl -s http://localhost:8080/debug/check

echo.
echo.
pause
