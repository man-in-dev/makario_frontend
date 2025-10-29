@echo off
REM Start Razorpay + iThink Integration Servers

echo.
echo ========================================
echo  🚀 MAKARIO INTEGRATION SERVERS
echo ========================================
echo.

REM Check if .env exists
if not exist .env (
    echo ❌ .env file not found!
    echo Creating .env from backend.env...
    copy backend.env .env
    echo ✅ .env created
    echo.
)

REM Check if node_modules exists
if not exist node_modules (
    echo ⚠️  Dependencies not installed
    echo Installing npm packages...
    call npm install
    echo ✅ Dependencies installed
    echo.
)

echo ========================================
echo  📋 CONFIGURATION CHECK
echo ========================================
echo.
echo ✅ Backend configuration: .env
echo ✅ Frontend configuration: .env
echo ✅ Razorpay Key ID: rzp_test_RXAojQvSDL4Fe2
echo ✅ iThink Channel ID: www.makario.in
echo.

echo ========================================
echo  🎯 STARTING SERVERS
echo ========================================
echo.
echo 📌 Backend will start on: http://localhost:5000
echo 📌 Frontend will start on: http://localhost:8080
echo.
echo Press Ctrl+C to stop servers
echo.

REM Start backend in new window
start "Backend Server" cmd /k npm run server:dev

REM Wait a bit for backend to start
timeout /t 3 /nobreak

REM Start frontend in new window
start "Frontend Server" cmd /k npm run dev

echo.
echo ========================================
echo  ✅ SERVERS STARTED
echo ========================================
echo.
echo 🌐 Frontend: http://localhost:8080
echo 🔌 Backend: http://localhost:5000
echo 📊 Health Check: http://localhost:5000/api/health
echo.
echo 🧪 Test Card: 4111 1111 1111 1111
echo 📅 Expiry: 12/25
echo 🔐 CVV: 123
echo.
echo Happy testing! 🎉
echo.
pause

