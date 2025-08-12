# JWT Authentication API Detailed Test Script
Write-Host "===== JWT Authentication Detailed Testing =====" -ForegroundColor Cyan

# 1. Test root endpoint
try {
    Write-Host "`n1. Testing root endpoint (sanity check)..." -ForegroundColor Yellow
    $response = Invoke-WebRequest -Uri "http://localhost:8080/" -Method GET -UseBasicParsing
    Write-Host "✅ Root endpoint returned HTTP $($response.StatusCode)" -ForegroundColor Green
} catch {
    Write-Host "❌ Root endpoint failed: $($_.Exception.Message)" -ForegroundColor Red
}

# 2. Test auth/signin with detailed error trapping
try {
    Write-Host "`n2. Testing signin endpoint with detailed error handling..." -ForegroundColor Yellow
    $body = @{
        username = "user"
        password = "password"
    } | ConvertTo-Json
    
    try {
        $response = Invoke-WebRequest -Uri "http://localhost:8080/api/auth/signin" -Method POST -ContentType "application/json" -Body $body -UseBasicParsing
        Write-Host "✅ Signin endpoint returned HTTP $($response.StatusCode)" -ForegroundColor Green
        Write-Host "Response Body:" -ForegroundColor Green
        $response.Content | ConvertFrom-Json | ConvertTo-Json -Depth 4
    } catch {
        $statusCode = $_.Exception.Response.StatusCode.value__
        Write-Host "❌ Signin endpoint failed with HTTP $statusCode" -ForegroundColor Red
        
        # Get detailed error response if available
        try {
            $stream = $_.Exception.Response.GetResponseStream()
            $reader = New-Object System.IO.StreamReader($stream)
            $errorBody = $reader.ReadToEnd()
            Write-Host "Error Details: $errorBody" -ForegroundColor Red
        } catch {
            Write-Host "Could not read error details: $($_.Exception.Message)" -ForegroundColor Red
        }
        
        # Check common 500 error causes
        Write-Host "`nChecking common error causes:" -ForegroundColor Yellow
        Write-Host "1. H2 Database connection - Checking if H2 console is accessible..." -ForegroundColor Yellow
        try {
            $h2Response = Invoke-WebRequest -Uri "http://localhost:8080/h2-console" -Method GET -UseBasicParsing
            Write-Host "  ✅ H2 Console accessible - HTTP $($h2Response.StatusCode)" -ForegroundColor Green
        } catch {
            Write-Host "  ❌ H2 Console inaccessible - HTTP $($_.Exception.Response.StatusCode.value__)" -ForegroundColor Red
        }
        
        Write-Host "2. User initialization - Checking DataInitializer class..." -ForegroundColor Yellow
        $initializerPath = "c:/Users/797609/Downloads/BNY team project/src/main/java/com/bny/jwt/init/DataInitializer.java"
        if (Test-Path $initializerPath) {
            Write-Host "  ✅ DataInitializer exists" -ForegroundColor Green
        } else {
            Write-Host "  ❌ DataInitializer missing" -ForegroundColor Red
        }
    }
} catch {
    Write-Host "❌ Outer exception: $($_.Exception.Message)" -ForegroundColor Red
}

# 3. Test server-token endpoint with detailed error trapping
try {
    Write-Host "`n3. Testing server-token endpoint..." -ForegroundColor Yellow
    $body = @{
        serverName = "service-a"
        roles = @("SERVER")
    } | ConvertTo-Json
    
    try {
        $response = Invoke-WebRequest -Uri "http://localhost:8080/api/auth/server-token" -Method POST -ContentType "application/json" -Body $body -UseBasicParsing
        Write-Host "✅ Server token endpoint returned HTTP $($response.StatusCode)" -ForegroundColor Green
        Write-Host "Response Body:" -ForegroundColor Green
        $response.Content | ConvertFrom-Json | ConvertTo-Json -Depth 4
    } catch {
        $statusCode = $_.Exception.Response.StatusCode.value__
        Write-Host "❌ Server token endpoint failed with HTTP $statusCode" -ForegroundColor Red
        
        # Get detailed error response
        try {
            $stream = $_.Exception.Response.GetResponseStream()
            $reader = New-Object System.IO.StreamReader($stream)
            $errorBody = $reader.ReadToEnd()
            Write-Host "Error Details: $errorBody" -ForegroundColor Red
        } catch {
            Write-Host "Could not read error details: $($_.Exception.Message)" -ForegroundColor Red
        }
    }
} catch {
    Write-Host "❌ Outer exception: $($_.Exception.Message)" -ForegroundColor Red
}

Write-Host "`n===== Test Complete =====" -ForegroundColor Cyan
