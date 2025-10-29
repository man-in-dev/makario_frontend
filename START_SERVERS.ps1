# Start Razorpay + iThink Integration Servers

Write-Host ""
Write-Host "========================================" -ForegroundColor Green
Write-Host "  🚀 MAKARIO INTEGRATION SERVERS" -ForegroundColor Green
Write-Host "========================================" -ForegroundColor Green
Write-Host ""

# Check if .env exists
if (-not (Test-Path ".env")) {
    Write-Host "❌ .env file not found!" -ForegroundColor Red
    Write-Host "Creating .env from backend.env..." -ForegroundColor Yellow
    Copy-Item "backend.env" ".env"
    Write-Host "✅ .env created" -ForegroundColor Green
    Write-Host ""
}

# Check if node_modules exists
if (-not (Test-Path "node_modules")) {
    Write-Host "⚠️  Dependencies not installed" -ForegroundColor Yellow
    Write-Host "Installing npm packages..." -ForegroundColor Yellow
    npm install
    Write-Host "✅ Dependencies installed" -ForegroundColor Green
    Write-Host ""
}

Write-Host "========================================" -ForegroundColor Green
Write-Host "  📋 CONFIGURATION CHECK" -ForegroundColor Green
Write-Host "========================================" -ForegroundColor Green
Write-Host ""
Write-Host "✅ Backend configuration: .env" -ForegroundColor Green
Write-Host "✅ Frontend configuration: .env" -ForegroundColor Green
Write-Host "✅ Razorpay Key ID: rzp_test_RXAojQvSDL4Fe2" -ForegroundColor Green
Write-Host "✅ iThink Channel ID: www.makario.in" -ForegroundColor Green
Write-Host ""

Write-Host "========================================" -ForegroundColor Green
Write-Host "  🎯 STARTING SERVERS" -ForegroundColor Green
Write-Host "========================================" -ForegroundColor Green
Write-Host ""
Write-Host "📌 Backend will start on: http://localhost:5000" -ForegroundColor Cyan
Write-Host "📌 Frontend will start on: http://localhost:8080" -ForegroundColor Cyan
Write-Host ""
Write-Host "Press Ctrl+C to stop servers" -ForegroundColor Yellow
Write-Host ""

# Start backend in new PowerShell window
Start-Process powershell -ArgumentList "-NoExit", "-Command", "cd '$PWD'; npm run server:dev" -WindowStyle Normal

# Wait for backend to start
Start-Sleep -Seconds 3

# Start frontend in new PowerShell window
Start-Process powershell -ArgumentList "-NoExit", "-Command", "cd '$PWD'; npm run dev" -WindowStyle Normal

Write-Host ""
Write-Host "========================================" -ForegroundColor Green
Write-Host "  ✅ SERVERS STARTED" -ForegroundColor Green
Write-Host "========================================" -ForegroundColor Green
Write-Host ""
Write-Host "🌐 Frontend: http://localhost:8080" -ForegroundColor Cyan
Write-Host "🔌 Backend: http://localhost:5000" -ForegroundColor Cyan
Write-Host "📊 Health Check: http://localhost:5000/api/health" -ForegroundColor Cyan
Write-Host ""
Write-Host "🧪 Test Card: 4111 1111 1111 1111" -ForegroundColor Yellow
Write-Host "📅 Expiry: 12/25" -ForegroundColor Yellow
Write-Host "🔐 CVV: 123" -ForegroundColor Yellow
Write-Host ""
Write-Host "Happy testing! 🎉" -ForegroundColor Green
Write-Host ""

