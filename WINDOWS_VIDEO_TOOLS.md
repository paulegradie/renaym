# Windows Video & Screenshot Tools - Quick Reference

## 🎯 TL;DR - Best Free Tools for Windows

| Purpose | Tool | Download | Why? |
|---------|------|----------|------|
| **Screenshots** | ShareX | https://getsharex.com/ | Best all-in-one, free, powerful |
| **Screen Recording** | OBS Studio | https://obsproject.com/ | Professional quality, free |
| **Video Editing** | DaVinci Resolve | https://www.blackmagicdesign.com/products/davinciresolve | Hollywood-grade, free version |
| **Quick GIFs** | ScreenToGif | https://www.screentogif.com/ | Simple, fast, perfect for GIFs |
| **Video Compression** | HandBrake | https://handbrake.fr/ | Best free video compressor |

---

## 📸 Screenshot Tools

### 1. ShareX ⭐ RECOMMENDED
**Download**: https://getsharex.com/

**Why it's the best**:
- ✅ Completely free and open-source
- ✅ Automatic upload and sharing
- ✅ Built-in image editor
- ✅ Window shadows and effects
- ✅ Hotkey support
- ✅ Region, window, or full-screen capture
- ✅ Scrolling capture for long pages
- ✅ OCR (text recognition)

**Quick Setup**:
1. Download and install
2. Press `Print Screen` to capture region
3. Edit with built-in editor
4. Auto-save to your chosen folder

**Pro Tip**: Set auto-save to `public/screenshots/` folder!

### 2. Greenshot
**Download**: https://getgreenshot.org/

**Good for**:
- Simple, lightweight alternative
- Quick annotations
- Basic editing needs

### 3. Windows Snipping Tool (Built-in)
**Access**: `Win + Shift + S`

**Good for**:
- Quick captures
- No installation needed
- Basic cropping

---

## 🎥 Screen Recording Tools

### 1. OBS Studio ⭐ RECOMMENDED
**Download**: https://obsproject.com/

**Why it's the best**:
- ✅ Professional-quality recording
- ✅ Completely free and open-source
- ✅ 1080p/4K support
- ✅ Low CPU usage
- ✅ Scene management
- ✅ Audio mixing
- ✅ Streaming capability

**Quick Setup for Demo Recording**:
1. Install OBS Studio
2. Create new scene
3. Add source: "Window Capture" (select Renaym window)
4. Settings → Output → Recording Quality: "High Quality, Medium File Size"
5. Settings → Video → Base Resolution: 1920x1080, FPS: 30
6. Click "Start Recording"
7. Do your demo
8. Click "Stop Recording"
9. Find video in: `Videos` folder

**Recommended Settings**:
```
Output:
- Format: MP4
- Encoder: x264
- Rate Control: CRF
- CRF: 23

Video:
- Base Resolution: 1920x1080
- Output Resolution: 1920x1080
- FPS: 30
```

### 2. ScreenToGif
**Download**: https://www.screentogif.com/

**Why it's great**:
- ✅ Perfect for short demos (GIFs)
- ✅ Built-in editor
- ✅ Can export as MP4 or GIF
- ✅ Very easy to use
- ✅ Small file sizes

**Best for**:
- Quick feature demonstrations
- Animated UI walkthroughs
- Social media posts

### 3. Xbox Game Bar (Built-in Windows)
**Access**: `Win + G`

**Good for**:
- Quick recordings
- No installation needed
- Simple interface

**Limitations**:
- Can't record desktop (only apps)
- Limited editing options
- Larger file sizes

---

## 🎬 Video Editing Tools

### 1. DaVinci Resolve ⭐ RECOMMENDED
**Download**: https://www.blackmagicdesign.com/products/davinciresolve

**Why it's amazing**:
- ✅ Hollywood-grade professional tool
- ✅ Free version is incredibly powerful
- ✅ Color grading, effects, transitions
- ✅ Text overlays and titles
- ✅ Audio editing
- ✅ 4K support

**Good for**:
- Adding text overlays to explain features
- Trimming and cutting clips
- Adding transitions
- Professional polish

**Note**: Large download (~3GB), requires registration

### 2. Shotcut
**Download**: https://shotcut.org/

**Good for**:
- Lighter alternative to DaVinci
- Simpler interface
- Basic editing needs

### 3. Windows Video Editor (Built-in)
**Access**: Search "Video Editor" in Windows

**Good for**:
- Very basic trimming
- Simple text overlays
- No installation needed

---

## 🗜️ Video Compression Tools

### 1. HandBrake ⭐ RECOMMENDED
**Download**: https://handbrake.fr/

**Why it's essential**:
- ✅ Best free video compressor
- ✅ Reduce file size by 70-90%
- ✅ Maintain quality
- ✅ Batch processing
- ✅ Web-optimized presets

**Quick Compression**:
1. Open HandBrake
2. Load your video
3. Select "Web" preset
4. Set Quality: 22-24 (lower = better quality, larger file)
5. Click "Start Encode"

**Target for Web**:
- Resolution: 1920x1080
- Frame rate: 30fps
- File size: <10MB
- Format: MP4 (H.264)

---

## 🎨 Image Editing Tools (Optional)

### 1. Paint.NET
**Download**: https://www.getpaint.net/

**Good for**:
- Adding arrows and callouts
- Cropping and resizing
- Basic image editing

### 2. GIMP
**Download**: https://www.gimp.org/

**Good for**:
- Advanced image editing
- Photoshop alternative
- Free and powerful

---

## 🚀 Recommended Workflow

### For Screenshots:
1. **Install ShareX**
2. Configure auto-save to `public/screenshots/`
3. Press `Print Screen` to capture
4. Edit with built-in editor (add arrows, highlights)
5. Save as PNG

### For Video Demo:
1. **Install OBS Studio**
2. Set up window capture of Renaym
3. Configure 1080p, 30fps, MP4 output
4. Record 60-90 second demo
5. **Install HandBrake**
6. Compress video to <10MB
7. Save to `public/demo-video.mp4`

### For Quick GIFs:
1. **Install ScreenToGif**
2. Record short feature demo (10-20 seconds)
3. Edit in built-in editor
4. Export as GIF (<5MB)

---

## 📊 File Size Guidelines

| Asset Type | Recommended Size | Max Size |
|------------|------------------|----------|
| Screenshots (PNG) | <500KB | 1MB |
| Video (MP4) | 5-10MB | 15MB |
| GIF | 2-5MB | 8MB |
| Thumbnail (JPG) | <200KB | 500KB |

---

## 💡 Pro Tips

1. **Record at 1080p**: It's the sweet spot for quality vs. file size
2. **Use 30fps**: Smoother than 24fps, smaller than 60fps
3. **Compress everything**: Always run through HandBrake
4. **Test on slow connection**: Make sure assets load quickly
5. **Keep videos short**: 60-90 seconds max for web demos
6. **No audio needed**: Most people watch muted
7. **Add text overlays**: Explain features visually

---

## 🎯 Quick Start Checklist

- [ ] Install ShareX for screenshots
- [ ] Install OBS Studio for video recording
- [ ] Install HandBrake for compression
- [ ] (Optional) Install DaVinci Resolve for editing
- [ ] (Optional) Install ScreenToGif for quick GIFs
- [ ] Configure OBS settings (1080p, 30fps, MP4)
- [ ] Set ShareX auto-save folder
- [ ] Test record a short clip
- [ ] Compress with HandBrake
- [ ] Verify file size <10MB

---

## 📚 Video Tutorials

- **ShareX Tutorial**: https://www.youtube.com/watch?v=E3RKqNlwBLI
- **OBS Studio Basics**: https://www.youtube.com/watch?v=r7teWxV5BCE
- **HandBrake Guide**: https://www.youtube.com/watch?v=IEyBnWb9kKI
- **DaVinci Resolve Basics**: https://www.youtube.com/watch?v=63Ln33O4p4c

---

That's everything you need! All tools are free and work great on Windows. 🎉

