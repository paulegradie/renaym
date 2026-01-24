#!/usr/bin/env pwsh
# Update Next.js to fix Windows issues and run dev server

$ErrorActionPreference = "Stop"

Write-Host "🔧 Fixing Windows compatibility issues..." -ForegroundColor Cyan
Write-Host ""

# Remove old cache and build files
Write-Host "🗑️  Cleaning old build files..." -ForegroundColor Yellow
if (Test-Path ".next") {
    Remove-Item -Recurse -Force ".next"
    Write-Host "   ✓ Removed .next directory" -ForegroundColor Green
}

if (Test-Path "node_modules") {
    Write-Host "   Removing node_modules (this may take a moment)..." -ForegroundColor Yellow
    Remove-Item -Recurse -Force "node_modules"
    Write-Host "   ✓ Removed node_modules" -ForegroundColor Green
}

if (Test-Path "package-lock.json") {
    Remove-Item -Force "package-lock.json"
    Write-Host "   ✓ Removed package-lock.json" -ForegroundColor Green
}

Write-Host ""
Write-Host "📦 Installing Next.js 15 (better Windows support)..." -ForegroundColor Cyan
Write-Host "   This will take a few minutes..." -ForegroundColor Yellow
Write-Host ""

npm install

if ($LASTEXITCODE -ne 0) {
    Write-Host "❌ npm install failed!" -ForegroundColor Red
    exit 1
}

Write-Host ""
Write-Host "✅ Installation complete!" -ForegroundColor Green
Write-Host ""

# Check if .env.local exists
if (-not (Test-Path ".env.local")) {
    Write-Host "⚠️  Warning: .env.local not found" -ForegroundColor Yellow
    Write-Host "   The site will run, but Stripe integration won't work." -ForegroundColor Yellow
    Write-Host "   Copy .env.example to .env.local and add your Stripe keys." -ForegroundColor Yellow
    Write-Host ""
}

Write-Host "🌐 Starting development server..." -ForegroundColor Cyan
Write-Host "   Site will be available at: http://localhost:3000" -ForegroundColor Green
Write-Host ""
Write-Host "Press Ctrl+C to stop" -ForegroundColor Yellow
Write-Host ""

npm run dev

