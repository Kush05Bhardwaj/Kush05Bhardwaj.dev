# API Testing Script for Windows PowerShell

Write-Host "🧪 Testing Next.js API Routes..." -ForegroundColor Cyan
Write-Host ""

# Test Health Check
Write-Host "1️⃣  Testing Health Check..." -ForegroundColor Yellow
try {
    $response = Invoke-RestMethod -Uri "http://localhost:3000/api/health" -Method Get
    Write-Host "✅ Health Check:" -ForegroundColor Green
    $response | ConvertTo-Json
} catch {
    Write-Host "❌ Health Check Failed: $_" -ForegroundColor Red
}

Write-Host ""
Write-Host "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━" -ForegroundColor Gray
Write-Host ""

# Test Skills API
Write-Host "2️⃣  Testing Skills API..." -ForegroundColor Yellow
try {
    $response = Invoke-RestMethod -Uri "http://localhost:3000/api/skills" -Method Get
    Write-Host "✅ Skills API: Found $($response.count) skills" -ForegroundColor Green
    if ($response.count -gt 0) {
        Write-Host "   First skill: $($response.data[0].name)" -ForegroundColor Cyan
    }
} catch {
    Write-Host "❌ Skills API Failed: $_" -ForegroundColor Red
}

Write-Host ""
Write-Host "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━" -ForegroundColor Gray
Write-Host ""

# Test Experience API
Write-Host "3️⃣  Testing Experience API..." -ForegroundColor Yellow
try {
    $response = Invoke-RestMethod -Uri "http://localhost:3000/api/experience" -Method Get
    Write-Host "✅ Experience API: Found $($response.count) experiences" -ForegroundColor Green
    if ($response.count -gt 0) {
        Write-Host "   First: $($response.data[0].position) at $($response.data[0].company)" -ForegroundColor Cyan
    }
} catch {
    Write-Host "❌ Experience API Failed: $_" -ForegroundColor Red
}

Write-Host ""
Write-Host "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━" -ForegroundColor Gray
Write-Host ""

# Test Projects API
Write-Host "4️⃣  Testing Projects API..." -ForegroundColor Yellow
try {
    $response = Invoke-RestMethod -Uri "http://localhost:3000/api/projects" -Method Get
    Write-Host "✅ Projects API: Found $($response.count) projects" -ForegroundColor Green
    if ($response.count -gt 0) {
        Write-Host "   First project: $($response.data[0].title)" -ForegroundColor Cyan
    }
} catch {
    Write-Host "❌ Projects API Failed: $_" -ForegroundColor Red
}

Write-Host ""
Write-Host "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━" -ForegroundColor Gray
Write-Host ""

# Test Testimonials API
Write-Host "5️⃣  Testing Testimonials API..." -ForegroundColor Yellow
try {
    $response = Invoke-RestMethod -Uri "http://localhost:3000/api/testimonials" -Method Get
    Write-Host "✅ Testimonials API: Found $($response.count) testimonials" -ForegroundColor Green
    if ($response.count -gt 0) {
        Write-Host "   First: $($response.data[0].name) - $($response.data[0].company)" -ForegroundColor Cyan
    }
} catch {
    Write-Host "❌ Testimonials API Failed: $_" -ForegroundColor Red
}

Write-Host ""
Write-Host "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━" -ForegroundColor Gray
Write-Host ""

# Test Contact API (POST)
Write-Host "6️⃣  Testing Contact Form API..." -ForegroundColor Yellow
try {
    $body = @{
        name = "Test User"
        email = "test@example.com"
        subject = "API Test Message"
        message = "This is a test message to verify the contact form API is working correctly."
    } | ConvertTo-Json

    $response = Invoke-RestMethod -Uri "http://localhost:3000/api/contact" -Method Post -Body $body -ContentType "application/json"
    Write-Host "✅ Contact API: $($response.message)" -ForegroundColor Green
} catch {
    Write-Host "❌ Contact API Failed: $_" -ForegroundColor Red
}

Write-Host ""
Write-Host "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━" -ForegroundColor Gray
Write-Host ""
Write-Host "✨ API Testing Complete!" -ForegroundColor Green
Write-Host ""
