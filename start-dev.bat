@echo off
echo ====================================
echo   Portfolio Next.js Full-Stack App
echo ====================================
echo.
echo Starting development server...
echo.

cd frontend
start cmd /k "npm run dev"

echo.
echo Development server starting at http://localhost:3000
echo.
echo Press any key to exit...
pause >nul
