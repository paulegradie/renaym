# Demo Assets Guide

This guide will help you create professional screenshots and video demos for the Renaym demo page.

## 📁 File Structure

Create the following directories and add your assets:

```
public/
├── screenshots/
│   ├── ai-parsing.png
│   ├── tmdb-matching.png
│   ├── batch-rename.png
│   └── subtitle-support.png
├── demo-video.mp4
└── demo-thumbnail.jpg
```

## 📸 Creating Screenshots (Windows)

### Recommended Tools

#### 1. **ShareX** (FREE - Best for Windows)
- **Download**: https://getsharex.com/
- **Why it's great**:
  - Automatic screenshot capture with hotkeys
  - Built-in editor for annotations
  - Can capture specific windows or regions
  - Supports shadows and borders
  - Free and open-source

**Setup**:
1. Download and install ShareX
2. Set up hotkeys (e.g., `Ctrl+Print Screen` for region capture)
3. Configure auto-save to `public/screenshots/` folder
4. Enable window shadow effects for professional look

#### 2. **Greenshot** (FREE)
- **Download**: https://getgreenshot.org/
- Simple and lightweight
- Good for quick captures with basic editing

#### 3. **Snagit** (PAID - $62.99)
- **Download**: https://www.techsmith.com/screen-capture.html
- Professional-grade tool
- Advanced editing and annotation features
- Great for creating polished marketing screenshots

### Screenshot Tips

1. **Clean Your Desktop**: Remove clutter before capturing
2. **Use High Resolution**: Capture at 1920x1080 or higher
3. **Consistent Styling**: Use the same window size for all screenshots
4. **Add Annotations**: Highlight key features with arrows or callouts
5. **Use Shadows**: Window shadows make screenshots look more professional
6. **Optimize File Size**: Use PNG for UI screenshots, compress if needed

### What to Capture

1. **AI Parsing** (`ai-parsing.png`):
   - Show the filename parsing interface
   - Highlight extracted metadata
   - Show confidence scores

2. **TMDB Matching** (`tmdb-matching.png`):
   - Display search results with movie posters
   - Show matching scores
   - Highlight the selected match

3. **Batch Rename** (`batch-rename.png`):
   - Show a list of files before/after
   - Display the preview pane
   - Show batch operation controls

4. **Subtitle Support** (`subtitle-support.png`):
   - Show subtitle files being paired
   - Display different subtitle formats
   - Show the pairing logic

## 🎥 Creating Video Demos (Windows)

### Recommended Tools

#### 1. **OBS Studio** (FREE - Best Overall)
- **Download**: https://obsproject.com/
- **Why it's great**:
  - Professional-quality recording
  - Free and open-source
  - Supports 1080p/4K recording
  - Low performance impact
  - Great for live demos

**Setup**:
1. Download and install OBS Studio
2. Create a new scene
3. Add "Display Capture" or "Window Capture" source
4. Set output to 1920x1080, 30fps
5. Use MP4 format with H.264 codec
6. Record your demo!

#### 2. **ScreenToGif** (FREE - Great for Quick GIFs)
- **Download**: https://www.screentogif.com/
- Perfect for short animated demos
- Can export as GIF or MP4
- Built-in editor

#### 3. **Camtasia** (PAID - $299)
- **Download**: https://www.techsmith.com/video-editor.html
- Professional video editing
- Built-in effects and transitions
- Great for polished marketing videos

#### 4. **Loom** (FREE/PAID)
- **Download**: https://www.loom.com/
- Quick and easy screen recording
- Cloud-hosted (no file management)
- Can embed directly or download MP4

### Video Recording Tips

1. **Script Your Demo**: Plan what you'll show before recording
2. **Clean Your Desktop**: Close unnecessary apps
3. **Use 1080p Resolution**: 1920x1080 is the sweet spot
4. **Keep It Short**: 60-90 seconds is ideal for web demos
5. **No Audio Needed**: Most web demos are watched muted
6. **Add Captions**: Use text overlays to explain features
7. **Smooth Cursor Movement**: Move slowly and deliberately
8. **Optimize File Size**: Compress video for web (aim for <10MB)

### Video Demo Script Suggestion

**Duration**: 60-90 seconds

1. **0-10s**: Show messy filenames in a folder
2. **10-20s**: Drag files into Renaym
3. **20-35s**: Show AI parsing in action
4. **35-50s**: Display TMDB matching results
5. **50-60s**: Preview renamed files
6. **60-70s**: Execute rename operation
7. **70-80s**: Show perfectly organized library
8. **80-90s**: Quick feature highlights

### Video Compression

After recording, compress your video:

**Using HandBrake** (FREE):
1. Download: https://handbrake.fr/
2. Load your video
3. Use "Web" preset
4. Set quality to 22-24 (good balance)
5. Export as MP4

**Target specs**:
- Resolution: 1920x1080
- Frame rate: 30fps
- Codec: H.264
- File size: <10MB for web

## 🎨 Creating Thumbnails

Use any of the screenshot tools above to capture a compelling frame from your video.

**Tips**:
- Choose a frame showing the UI clearly
- Add text overlay: "Watch Demo" or "See It In Action"
- Use 1920x1080 resolution
- Save as JPG (smaller file size)

## 📦 Adding Assets to the Demo Page

Once you have your assets:

1. **Add Screenshots**:
   - Place PNG files in `public/screenshots/`
   - Uncomment the `<Image>` components in `app/demo/page.tsx`

2. **Add Video**:
   - Place `demo-video.mp4` in `public/`
   - Place `demo-thumbnail.jpg` in `public/`
   - Uncomment the `<video>` element in `app/demo/page.tsx`

3. **Test Locally**:
   ```bash
   npm run dev
   ```
   Visit http://localhost:3000/demo

## 🚀 Alternative: Use Animated GIFs

If video file size is a concern, create animated GIFs instead:

1. Record with **ScreenToGif**
2. Edit and optimize in the built-in editor
3. Export as GIF (aim for <5MB)
4. Replace `<video>` with `<Image>` component

## 📊 Recommended Dimensions

- **Screenshots**: 1920x1080 (16:9 aspect ratio)
- **Video**: 1920x1080, 30fps, H.264
- **Thumbnail**: 1920x1080, JPG
- **GIFs**: 1280x720 (smaller file size)

## 🎯 Quick Start Recommendation

**For fastest results**:
1. Install **ShareX** for screenshots
2. Install **OBS Studio** for video
3. Record a 60-second demo
4. Capture 4 key screenshots
5. Compress with **HandBrake**
6. Add to `public/` folder
7. Uncomment code in `app/demo/page.tsx`

That's it! You'll have a professional demo page ready to go. 🎉

