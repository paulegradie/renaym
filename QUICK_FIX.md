# Quick Fix for Windows G: Drive Issue

## The Problem

Next.js 14.2.0 **cannot run on Windows G: drive** due to ESM module path issues.

## The Solution

You have **3 options**:

---

### Option 1: Upgrade to Next.js 15 (Recommended)

Run these commands in PowerShell:

```powershell
# Stop the current dev server (Ctrl+C if running)

# Clean and reinstall
Remove-Item -Recurse -Force .next
Remove-Item -Recurse -Force node_modules
Remove-Item -Force package-lock.json
npm install
npm run dev
```

This will install Next.js 15.1.6 which fixes the Windows path issues.

---

### Option 2: Move to C: Drive (Fastest)

```powershell
# Copy the entire project to C: drive
xcopy /E /I G:\code\TheGradieCatalog\Renaime C:\code\Renaime

# Navigate to new location
cd C:\code\Renaime\website-nextjs

# Run the site
npm run dev
```

Next.js works fine on C: drive even with version 14.2.0.

---

### Option 3: Use WSL (Best Long-term)

If you have Windows Subsystem for Linux:

```bash
# In WSL terminal
cd /mnt/g/code/TheGradieCatalog/Renaime/website-nextjs
npm run dev
```

WSL doesn't have the Windows drive letter issues.

---

## Recommended: Option 1

I've already updated your `package.json` to use Next.js 15, so **Option 1** is the easiest.

Just run:

```powershell
cd g:\code\TheGradieCatalog\Renaime\website-nextjs
Remove-Item -Recurse -Force .next, node_modules, package-lock.json
npm install
npm run dev
```

This will take 3-5 minutes but will fix the issue permanently.

---

## Why This Happens

Next.js 14.2.0 has a bug where it tries to load modules using Windows paths like `G:\...` but Node's ESM loader requires `file://` URLs. Next.js 15 fixes this.

The G: drive specifically triggers this because it's not the system drive (C:).

