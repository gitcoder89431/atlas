#!/bin/bash

# Atlas Thumbnail Optimization Script
# Usage: ./optimize-thumbnails.sh [input_directory] [output_directory]
#
# This script optimizes MP4 videos and PNG images for Atlas thumbnails
# - Videos: 300x300px, 24fps, 800kbps, baseline H.264
# - Images: 300x300px, high quality JPG fallbacks

set -e

# Default directories
INPUT_DIR="${1:-./input}"
OUTPUT_DIR="${2:-./output}"

# Create output directories
mkdir -p "$OUTPUT_DIR/video/portraits"
mkdir -p "$OUTPUT_DIR/images/portraits"

echo "🎬 Atlas Thumbnail Optimizer"
echo "================================"
echo "Input:  $INPUT_DIR"
echo "Output: $OUTPUT_DIR"
echo ""

# Function to optimize video
optimize_video() {
    local input_file="$1"
    local filename=$(basename "$input_file" | sed 's/\.[^.]*$//')
    local output_file="$OUTPUT_DIR/video/portraits/${filename}_optimized.mp4"

    echo "📹 Optimizing video: $filename"

    ffmpeg -i "$input_file" \
        -vf scale=300:300 \
        -b:v 800k \
        -r 24 \
        -profile:v baseline \
        -y \
        "$output_file" \
        2>/dev/null

    local original_size=$(du -h "$input_file" | cut -f1)
    local optimized_size=$(du -h "$output_file" | cut -f1)

    echo "   ✅ $filename: $original_size → $optimized_size"
}

# Function to optimize image
optimize_image() {
    local input_file="$1"
    local filename=$(basename "$input_file" | sed 's/\.[^.]*$//')
    local output_file="$OUTPUT_DIR/images/portraits/${filename}_optimized.jpg"

    echo "🖼️  Optimizing image: $filename"

    ffmpeg -i "$input_file" \
        -vf scale=300:300 \
        -q:v 2 \
        -y \
        "$output_file" \
        2>/dev/null

    local original_size=$(du -h "$input_file" | cut -f1)
    local optimized_size=$(du -h "$output_file" | cut -f1)

    echo "   ✅ $filename: $original_size → $optimized_size"
}

# Check if input directory exists
if [ ! -d "$INPUT_DIR" ]; then
    echo "❌ Error: Input directory '$INPUT_DIR' does not exist"
    exit 1
fi

# Process MP4 files
echo "🎥 Processing videos..."
video_count=0
for file in "$INPUT_DIR"/*.mp4 "$INPUT_DIR"/**/*.mp4; do
    if [ -f "$file" ]; then
        optimize_video "$file"
        ((video_count++))
    fi
done

echo ""

# Process PNG files
echo "🖼️  Processing images..."
image_count=0
for file in "$INPUT_DIR"/*.png "$INPUT_DIR"/**/*.png; do
    if [ -f "$file" ]; then
        optimize_image "$file"
        ((image_count++))
    fi
done

echo ""
echo "🎉 Optimization complete!"
echo "   Videos processed: $video_count"
echo "   Images processed: $image_count"
echo ""
echo "📁 Optimized files saved to:"
echo "   Videos: $OUTPUT_DIR/video/portraits/"
echo "   Images: $OUTPUT_DIR/images/portraits/"
echo ""
echo "💡 Next steps:"
echo "   1. Copy optimized files to your Atlas public directory"
echo "   2. Update your markdown frontmatter with new paths"
echo "   3. Test thumbnails in your grid layout"