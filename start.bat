@echo off
echo.
echo Starting Renaime Website...
echo.

cd /d "%~dp0"

if not exist "node_modules" (
    echo Installing dependencies...
    call npm install
    if errorlevel 1 (
        echo.
        echo Failed to install dependencies!
        pause
        exit /b 1
    )
)

if not exist ".env.local" (
    echo.
    echo WARNING: .env.local not found
    echo The site will run, but Stripe integration won't work.
    echo Copy .env.example to .env.local and add your Stripe keys.
    echo.
)

echo.
echo Starting development server...
echo Site will be available at: http://localhost:3000
echo.
echo Press Ctrl+C to stop
echo.

call npm run dev

