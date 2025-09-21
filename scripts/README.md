# Atlas Thumbnail Optimization

This script automatically optimizes MP4 videos and PNG images for Atlas thumbnails.

## Quick Start

```bash
# Make script executable (if not already)
chmod +x scripts/optimize-thumbnails.sh

# Optimize files from input directory
./scripts/optimize-thumbnails.sh ./input_portraits ./public

# Or use default directories
./scripts/optimize-thumbnails.sh
```

## Output Specifications

### Videos
- **Resolution:** 300x300px
- **Frame Rate:** 24fps (for realistic motion)
- **Bitrate:** 800kbps
- **Profile:** H.264 Baseline
- **Target Size:** ~700KB-1MB

### Images (Fallbacks)
- **Resolution:** 300x300px
- **Format:** JPG (high quality)
- **Target Size:** ~15-20KB

## Directory Structure

```
input/                  # Your original files
├── persona1.mp4
├── persona1.png
├── persona2.mp4
└── persona2.png

output/                 # Optimized files
├── video/portraits/
│   ├── persona1_optimized.mp4
│   └── persona2_optimized.mp4
└── images/portraits/
    ├── persona1_optimized.jpg
    └── persona2_optimized.jpg
```

## Integration Workflow

1. **Generate portraits** in your POST repo
2. **Run optimization** script on batch
3. **Copy optimized files** to Atlas `public/` directory
4. **Update markdown** frontmatter with paths:
   ```yaml
   thumbnail: "/images/portraits/persona_optimized.jpg"
   video_thumbnail: "/video/portraits/persona_optimized.mp4"
   ```

## Performance Target

For 15 thumbnails simultaneously:
- **Total video:** ~10-15MB
- **Total images:** ~300KB
- **Load time:** <3 seconds on good connection