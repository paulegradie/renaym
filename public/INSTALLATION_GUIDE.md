# Renaym Installation Guide

## Why Am I Seeing Security Warnings?

Renaym is a new software product, and operating systems are cautious about new publishers. **This is completely normal and doesn't mean the software is unsafe.**

### What We've Done for Security

- ✅ **macOS**: Fully code-signed and notarized by Apple
- ⚠️ **Windows**: Code signing in progress (you may see warnings)
- ✅ **Privacy**: AI runs 100% locally on your device
- ✅ **Open Source**: View our releases on GitHub
- ✅ **No Malware**: Clean, honest software

---

## Installation Instructions

### macOS (No Warnings!)

Our macOS app is fully code-signed and notarized by Apple. Installation is smooth:

1. **Download** the `.dmg` file
2. **Open** the downloaded file
3. **Drag** Renaym to your Applications folder
4. **Launch** from Applications

**First Launch:**
- Right-click Renaym → Select "Open"
- Click "Open" in the dialog
- This is only needed once

---

### Windows (SmartScreen Warning Expected)

Windows Defender SmartScreen will show a warning because we're a new publisher. Here's how to install safely:

#### Step 1: Download
- Click the download button
- Your browser may warn about the file
- Click "Keep" or "Save anyway"

#### Step 2: Run Installer
- Double-click the downloaded `.exe` file
- You'll see: **"Windows protected your PC"**

#### Step 3: Bypass SmartScreen
1. Click **"More info"** (small text link)
2. Click **"Run anyway"** button
3. Proceed with installation normally

**Why This Happens:**
- New publishers need to build "reputation" with Microsoft
- This takes time and download volume
- We're working on verified code signing
- More downloads = fewer warnings over time

**Is It Safe?**
- Yes! This is standard for new software
- Our macOS version is fully verified by Apple
- Same codebase, just different signing status
- No viruses, no malware, no tracking

---

### Linux

1. **Download** the `.tar.gz` file
2. **Extract** to your preferred location
3. **Run** the executable:
   ```bash
   tar -xzf Renaym-Client-*.tar.gz
   cd Renaym-Client-*/
   chmod +x Client
   ./Client
   ```

---

## Browser Download Warnings

### Chrome
- Click "Keep" or "Keep anyway"
- May need to click the arrow (^) next to the download

### Edge
- Click "Keep"
- Then "Show more" → "Keep anyway"

### Firefox
- Click the download arrow
- Click "Unblock" or right-click → "Allow download"

### Safari (macOS)
- No warnings (our app is notarized!)

---

## Antivirus Software

Some antivirus programs may flag new software. If this happens:

1. **Check the file** on VirusTotal (optional)
2. **Add exception** in your antivirus
3. **Proceed** with installation

**Why This Happens:**
- Antivirus uses heuristics for unknown files
- New software = unknown = cautious flagging
- Not an indication of actual malware

---

## Verifying Your Download (Advanced)

For extra peace of mind, verify the download:

1. **Check file size** matches the website
2. **View on GitHub** - all releases are public
3. **Compare checksums** (SHA-256 hashes available)

---

## Still Having Issues?

### Common Problems

**"The app is damaged and can't be opened" (macOS)**
- This shouldn't happen with our notarized app
- If it does: Right-click → Open (don't double-click)

**"Missing DLL" or "Runtime Error" (Windows)**
- Download the installer version (not portable)
- Installer includes all dependencies

**Permission Denied (Linux)**
- Run: `chmod +x Client`
- Or use your file manager to make it executable

### Get Help

- **Email**: support@renaym.com
- **GitHub Issues**: github.com/yourusername/renaym
- **Documentation**: renaym.com/docs

---

## What Happens After Installation?

### First Run Setup Wizard

1. **Download AI Model** (~2.3 GB one-time download)
2. **Configure TMDB API Key** (free from themoviedb.org)
3. **Start Renaming!**

### System Requirements

**Windows:**
- Windows 10 or later (64-bit)
- 4 GB RAM minimum
- 5 GB free disk space (for AI model)

**macOS:**
- macOS 11 (Big Sur) or later
- Intel or Apple Silicon (M1/M2/M3/M4)
- 4 GB RAM minimum
- 5 GB free disk space

**Linux:**
- Ubuntu 20.04+ or equivalent
- 4 GB RAM minimum
- 5 GB free disk space

---

## Privacy & Security

- ✅ **No telemetry** - we don't track you
- ✅ **No cloud processing** - AI runs locally
- ✅ **No account required** - just download and use
- ✅ **Your data stays yours** - never leaves your device

---

## Future Updates

We're actively working on:
- ✅ Windows code signing certificate (in progress)
- 🔄 Auto-update functionality
- 🔄 Windows Store distribution
- 🔄 Homebrew/Chocolatey packages

As we grow, security warnings will decrease naturally!

---

**Thank you for trusting Renaym!** 🎉

We're a small startup building honest software to help you organize your media library. Your support means everything.

