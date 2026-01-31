# Demo Page Setup Checklist

Use this checklist to create and publish your demo page.

## Phase 1: Install Tools (15 minutes)

### Screenshot Tool
- [ ] Download ShareX from https://getsharex.com/
- [ ] Install ShareX
- [ ] Configure auto-save folder to `public/screenshots/`
- [ ] Test capture with `Print Screen` key

### Video Recording Tool
- [ ] Download OBS Studio from https://obsproject.com/
- [ ] Install OBS Studio
- [ ] Create new scene
- [ ] Add "Window Capture" source
- [ ] Configure settings:
  - [ ] Output format: MP4
  - [ ] Resolution: 1920x1080
  - [ ] Frame rate: 30fps
  - [ ] Encoder: x264, CRF 23

### Video Compression Tool
- [ ] Download HandBrake from https://handbrake.fr/
- [ ] Install HandBrake
- [ ] Test with a sample video

## Phase 2: Create Screenshots (30 minutes)

### Screenshot 1: AI Parsing
- [ ] Open Renaym application
- [ ] Navigate to filename parsing view
- [ ] Load some messy filenames
- [ ] Show AI extraction in progress
- [ ] Capture screenshot with ShareX
- [ ] Save as `public/screenshots/ai-parsing.png`
- [ ] Verify file size <1MB

### Screenshot 2: TMDB Matching
- [ ] Show TMDB search results
- [ ] Display movie posters and metadata
- [ ] Highlight confidence scores
- [ ] Capture screenshot
- [ ] Save as `public/screenshots/tmdb-matching.png`
- [ ] Verify file size <1MB

### Screenshot 3: Batch Rename
- [ ] Load multiple files
- [ ] Show before/after preview
- [ ] Display batch operation controls
- [ ] Capture screenshot
- [ ] Save as `public/screenshots/batch-rename.png`
- [ ] Verify file size <1MB

### Screenshot 4: Subtitle Support
- [ ] Show subtitle files being detected
- [ ] Display pairing logic
- [ ] Show different subtitle formats
- [ ] Capture screenshot
- [ ] Save as `public/screenshots/subtitle-support.png`
- [ ] Verify file size <1MB

## Phase 3: Create Video Demo (45 minutes)

### Preparation
- [ ] Clean up desktop (close unnecessary apps)
- [ ] Prepare sample files with messy names
- [ ] Write demo script (see below)
- [ ] Do a practice run

### Demo Script (60-90 seconds)
- [ ] **0-10s**: Show folder with messy filenames
- [ ] **10-20s**: Open Renaym and drag files in
- [ ] **20-35s**: Show AI parsing extracting metadata
- [ ] **35-50s**: Display TMDB matching with scores
- [ ] **50-60s**: Preview renamed files
- [ ] **60-70s**: Execute rename operation
- [ ] **70-80s**: Show perfectly organized library
- [ ] **80-90s**: Quick feature highlights

### Recording
- [ ] Open OBS Studio
- [ ] Select Renaym window capture
- [ ] Click "Start Recording"
- [ ] Follow demo script
- [ ] Move cursor slowly and deliberately
- [ ] Click "Stop Recording"
- [ ] Find video in Videos folder

### Post-Processing
- [ ] Open HandBrake
- [ ] Load recorded video
- [ ] Select "Web" preset
- [ ] Set quality to 22-24
- [ ] Click "Start Encode"
- [ ] Verify output file size <10MB
- [ ] Save as `public/demo-video.mp4`

### Create Thumbnail
- [ ] Open video in media player
- [ ] Find compelling frame (UI clearly visible)
- [ ] Take screenshot
- [ ] (Optional) Add text overlay: "Watch Demo"
- [ ] Save as JPG
- [ ] Compress to <200KB
- [ ] Save as `public/demo-thumbnail.jpg`

## Phase 4: Update Demo Page (10 minutes)

### Enable Screenshots
- [ ] Open `app/demo/page.tsx`
- [ ] Find line ~288 (ScreenshotCard component)
- [ ] Uncomment the `<Image>` component
- [ ] Remove the placeholder `<div>`
- [ ] Save file

### Enable Video
- [ ] In `app/demo/page.tsx`
- [ ] Find line ~56 (video section)
- [ ] Uncomment the `<video>` element
- [ ] Remove the placeholder `<div>`
- [ ] Save file

## Phase 5: Test Locally (5 minutes)

### Run Development Server
- [ ] Open terminal in project root
- [ ] Run `npm run dev`
- [ ] Wait for server to start
- [ ] Open browser to http://localhost:3000/demo

### Verify Everything Works
- [ ] Page loads without errors
- [ ] All 4 screenshots display correctly
- [ ] Video player appears
- [ ] Video plays when clicked
- [ ] Thumbnail shows before playing
- [ ] Before/After section displays
- [ ] Feature highlights render
- [ ] CTA buttons work
- [ ] Navigation "Demo" link works
- [ ] Page is responsive (test mobile view)

### Check Performance
- [ ] Page loads in <3 seconds
- [ ] Images load progressively
- [ ] Video doesn't auto-play
- [ ] No console errors
- [ ] Smooth scrolling

## Phase 6: Optimize Assets (15 minutes)

### Optimize Screenshots
- [ ] Check each PNG file size
- [ ] If >1MB, compress with TinyPNG.com
- [ ] Re-save optimized versions
- [ ] Verify quality is still good

### Optimize Video
- [ ] Check MP4 file size
- [ ] If >10MB, re-compress with HandBrake
- [ ] Lower quality setting (increase CRF to 25-26)
- [ ] Verify video still looks good

### Optimize Thumbnail
- [ ] Check JPG file size
- [ ] If >200KB, compress with TinyJPG.com
- [ ] Re-save optimized version

## Phase 7: Deploy (10 minutes)

### Commit Changes
```bash
git add .
git commit -m "Add demo page with screenshots and video"
git push origin main
```

### Verify Deployment
- [ ] Wait for GitHub Actions to complete
- [ ] Visit https://renaym.com/demo
- [ ] Test all functionality on live site
- [ ] Check on mobile device
- [ ] Share with team for feedback

## Phase 8: Promote (Ongoing)

### Update Links
- [ ] Add demo link to README.md
- [ ] Add to social media profiles
- [ ] Include in email signatures
- [ ] Share on Twitter/LinkedIn

### Analytics (Optional)
- [ ] Add Google Analytics to track views
- [ ] Monitor video play rate
- [ ] Track CTA click-through rate

---

## Quick Reference

### File Locations
```
public/
├── screenshots/
│   ├── ai-parsing.png          (<1MB)
│   ├── tmdb-matching.png       (<1MB)
│   ├── batch-rename.png        (<1MB)
│   └── subtitle-support.png    (<1MB)
├── demo-video.mp4              (<10MB)
└── demo-thumbnail.jpg          (<200KB)
```

### Code to Uncomment
1. `app/demo/page.tsx` line ~56: Video element
2. `app/demo/page.tsx` line ~288: Image components

### Tools Download Links
- ShareX: https://getsharex.com/
- OBS Studio: https://obsproject.com/
- HandBrake: https://handbrake.fr/

---

## Troubleshooting

### Screenshots not showing?
- Check file names match exactly
- Verify files are in `public/screenshots/`
- Check browser console for errors
- Clear browser cache

### Video not playing?
- Verify MP4 format (H.264 codec)
- Check file is in `public/` folder
- Test in different browser
- Check file size <10MB

### Page loads slowly?
- Compress images with TinyPNG
- Compress video with HandBrake
- Check file sizes
- Use browser dev tools to identify bottleneck

---

## Estimated Time

- **Total**: ~2.5 hours
- **Tools setup**: 15 min
- **Screenshots**: 30 min
- **Video**: 45 min
- **Integration**: 10 min
- **Testing**: 5 min
- **Optimization**: 15 min
- **Deploy**: 10 min

---

## Success Criteria

✅ Demo page loads in <3 seconds
✅ All 4 screenshots display correctly
✅ Video plays smoothly
✅ Total asset size <15MB
✅ Mobile responsive
✅ No console errors
✅ CTA buttons work
✅ Navigation integrated

---

Good luck! 🚀

