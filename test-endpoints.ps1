# JWT Authentication API Test Script
Write-Host "Testing JWT Authentication Endpoints..." -ForegroundColor Green

# Test root endpoint
try {
    Write-Host "`n1. Testing root endpoint..." -ForegroundColor Yellow
    $rootResponse = Invoke-RestMethod -Uri "http://localhost:8080/" -Method GET
    Write-Host "✅ Root endpoint works" -ForegroundColor Green
    $rootResponse | ConvertTo-Json
} catch {
    Write-Host "❌ Root endpoint failed: $($_.Exception.Message)" -ForegroundColor Red
}

# Test public endpoint
try {
    Write-Host "`n2. Testing public endpoint..." -ForegroundColor Yellow
    $publicResponse = Invoke-RestMethod -Uri "http://localhost:8080/api/public/hello" -Method GET
    Write-Host "✅ Public endpoint works" -ForegroundColor Green
    $publicResponse | ConvertTo-Json
} catch {
    Write-Host "❌ Public endpoint failed: $($_.Exception.Message)" -ForegroundColor Red
}

# Test signin endpoint
try {
    Write-Host "`n3. Testing signin endpoint..." -ForegroundColor Yellow
    $signinBody = @{
        username = "user"
        password = "password"
    } | ConvertTo-Json
    
    $signinResponse = Invoke-RestMethod -Uri "http://localhost:8080/api/auth/signin" -Method POST -ContentType "application/json" -Body $signinBody
    Write-Host "✅ Signin endpoint works" -ForegroundColor Green
    $signinResponse | ConvertTo-Json
} catch {
    Write-Host "❌ Signin endpoint failed: $($_.Exception.Message)" -ForegroundColor Red
    if ($_.Exception.Response) {
        $statusCode = $_.Exception.Response.StatusCode.value__
        Write-Host "   Status Code: $statusCode" -ForegroundColor Red
        try {
            $errorStream = $_.Exception.Response.GetResponseStream()
            $reader = New-Object System.IO.StreamReader($errorStream)
            $errorBody = $reader.ReadToEnd()
            Write-Host "   Error Body: $errorBody" -ForegroundColor Red
        } catch {
            Write-Host "   Could not read error details" -ForegroundColor Red
        }
    }
}

# Test server token endpoint
try {
    Write-Host "`n4. Testing server token endpoint..." -ForegroundColor Yellow
    $serverTokenBody = @{
        serverName = "service-a"
        roles = @("SERVER")
    } | ConvertTo-Json
    
    $serverTokenResponse = Invoke-RestMethod -Uri "http://localhost:8080/api/auth/server-token" -Method POST -ContentType "application/json" -Body $serverTokenBody
    Write-Host "✅ Server token endpoint works" -ForegroundColor Green
    $serverTokenResponse | ConvertTo-Json
} catch {
    Write-Host "❌ Server token endpoint failed: $($_.Exception.Message)" -ForegroundColor Red
    if ($_.Exception.Response) {
        $statusCode = $_.Exception.Response.StatusCode.value__
        Write-Host "   Status Code: $statusCode" -ForegroundColor Red
    }
}

Write-Host "`nTest completed." -ForegroundColor Green
