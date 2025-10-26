@echo off
echo Starting Data Analysis Dashboard...
echo.

echo Installing Python dependencies...
cd backend
pip install -r ../requirements.txt
if %errorlevel% neq 0 (
    echo Error installing Python dependencies
    pause
    exit /b 1
)

echo.
echo Starting Flask backend server...
start "Flask Backend" cmd /k "python app.py"

echo.
echo Waiting for backend to start...
timeout /t 3 /nobreak > nul

echo Installing Node.js dependencies...
cd ../frontend
npm install
if %errorlevel% neq 0 (
    echo Error installing Node.js dependencies
    pause
    exit /b 1
)

echo.
echo Starting React frontend...
start "React Frontend" cmd /k "npm start"

echo.
echo ========================================
echo Data Analysis Dashboard is starting!
echo ========================================
echo Backend: http://localhost:5000
echo Frontend: http://localhost:3000
echo.
echo Press any key to exit...
pause > nul
