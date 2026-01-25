#!/usr/bin/env pwsh
# Start the Next.js development server

$ErrorActionPreference = "Stop"

Write-Host "🚀 Starting Renaym Website..." -ForegroundColor Cyan
Write-Host ""

# Check if node_modules exists
if (-not (Test-Path "node_modules")) {
    Write-Host "📦 Installing dependencies (this may take a few minutes)..." -ForegroundColor Yellow
    npm install
    
    if ($LASTEXITCODE -ne 0) {
        Write-Host "❌ npm install failed!" -ForegroundColor Red
        exit 1
    }
    
    Write-Host "✅ Dependencies installed" -ForegroundColor Green
    Write-Host ""
}

# Check if .env.local exists
if (-not (Test-Path ".env.local")) {
    Write-Host "⚠️  Warning: .env.local not found" -ForegroundColor Yellow
    Write-Host "   The site will run, but Stripe integration won't work." -ForegroundColor Yellow
    Write-Host "   Copy .env.example to .env.local and add your Stripe keys." -ForegroundColor Yellow
    Write-Host ""
    
    $continue = Read-Host "Continue anyway? (y/N)"
    if ($continue -ne 'y' -and $continue -ne 'Y') {
        exit 1
    }
    Write-Host ""
}

Write-Host "🌐 Starting development server..." -ForegroundColor Cyan
Write-Host "   Site will be available at: http://localhost:3000" -ForegroundColor Green
Write-Host ""
Write-Host "Press Ctrl+C to stop" -ForegroundColor Yellow
Write-Host ""

npm run dev

