# Atlas Channel Management Guide

## Overview
Atlas uses a color-coded channel system to categorize articles by topic. **Each article belongs to exactly one channel** - its primary category. Each channel has a specific color, icon, and focus area. This guide provides clear procedures for frontend teams to maintain channel assignments and keep the system organized.

## Channel System

### Available Channels

| Channel | Color | Icon | Focus Area | Examples |
|---------|-------|------|------------|----------|
| **Physics** | `#3b82f6` (blue) | Atom ⚛️ | Physics, quantum mechanics, energy | Feynman consciousness, quantum computation |
| **Philosophy** | `#8b5cf6` (purple) | Brain 🧠 | Philosophy, ethics, consciousness | Philosophical dialogues, moral reasoning |
| **Mathematics** | `#10b981` (emerald) | Calculator 🧮 | Math, computation, logic, algorithms | Turing machines, computational thinking |
| **Biology** | `#f59e0b` (amber) | DNA 🧬 | Biology, evolution, life sciences | Darwin evolution, biological systems |
| **Ethics** | `#ef4444` (red) | Scale ⚖️ | Ethics, morality, justice, governance | Institutional design, moral philosophy |
| **Editorial** | `#ec4899` (pink) | Zap ⚡ | Editorial content, commentary, analysis | Ruixen's posts, meta-discussions |

### Channel Assignment Rules

#### Explicit Assignment (Recommended)
Add a single `channel` field to article frontmatter:

```yaml
---
title: "Your Article Title"
date: "2025-09-24"
tags: ["tag1", "tag2"]
channel: "biology"  # ← Add this line (single channel)
type: "monologue"
author: "Author Name"
---
```

#### Automatic Detection (Fallback)
If no explicit channel is defined, the system automatically detects the primary channel based on:
- **Tags**: Matches specific keywords in tags array
- **Content**: Searches article content for relevant terms
- **Title**: Analyzes title for key domain indicators
- **Priority**: Biology > Physics > Mathematics > Ethics > Editorial > Philosophy

## Frontend Team Procedures

### 1. New Article Channel Assignment

**When adding a new article:**

1. **Read the article** to understand its primary theme
2. **Select the single most relevant channel** (be decisive!)
3. **Add explicit channel** to frontmatter:
   ```yaml
   channel: "biology"
   ```
4. **Verify badge appears** correctly in Atlas feed and Explore table

### 2. Channel Updates

**When updating existing articles:**

1. **Review current assignment** in article frontmatter
2. **Update channel** as needed:
   ```yaml
   # Before
   channel: "physics"

   # After
   channel: "consciousness"
   ```
3. **Test in both views**: Atlas feed (single badge top-right) and Explore table (channels column)

### 3. Channel System Maintenance

**Monthly review process:**

1. **Audit article distributions**:
   ```bash
   # Check channel balance
   grep -r "channel:" src/content/ | sort | uniq -c
   ```
2. **Update channel counts** in `channels-sidebar.tsx` if needed
3. **Review auto-detection rules** for accuracy

### 4. Quality Guidelines

**Channel Assignment Best Practices:**

- ✅ **Focus on THE primary theme**: What is the main topic?
- ✅ **Consider target audience**: Which channel would readers expect to find this in?
- ✅ **Balance distribution**: Avoid overloading single channels
- ✅ **Be decisive**: Choose the most important/relevant channel
- ❌ **Don't overthink**: One channel per article keeps it clean
- ❌ **Avoid generic assignments**: Be specific to content

**Examples of Good Channel Assignments:**

```yaml
# Darwin evolution article - clearly about biology
channel: "biology"

# Turing computation monologue - primarily mathematical
channel: "mathematics"

# Feynman consciousness piece - physics perspective on mind
channel: "physics"

# Ethics governance dialogue - moral/political philosophy
channel: "ethics"

# Editorial piece by Ruixen - meta-commentary
channel: "editorial"

# Current Article Distribution:
# - Biology: 2 articles (Darwin evolution content)
# - Physics: 1 article (Feynman)
# - Mathematics: 1 article (Turing)
# - Ethics: 1 article (Governance)
# - Editorial: 1 article (Ruixen bridges piece)
```

## Technical Implementation

### Component Structure
```
src/
├── components/
│   ├── channel-badge.tsx         # Badge components
│   └── channels-sidebar.tsx      # Sidebar with channel definitions
├── app/
│   ├── atlas/page.tsx            # Atlas feed with badges
│   └── explore/page.tsx          # Explore table with channels column
└── content/
    ├── monologues/               # Articles with channel frontmatter
    └── dialogues/
```

### Channel Badge Features
- **Color-coded**: Matches channel system colors perfectly
- **Single badge**: Clean, uncluttered display
- **Responsive**: Different sizes (sm/md/lg)
- **Hover effects**: Subtle animations and scaling
- **Text-only**: No icons by default for minimal design

### Badge Placement
- **Atlas Feed**: Single badge in top-right corner of article cards
- **Explore Table**: Single badge in dedicated "Channels" column
- **Article Pages**: Could be added to headers/footers

## Automation Opportunities

### Current System
- ✅ **Explicit channel**: Direct frontmatter specification (singular)
- ✅ **Auto-detection**: Prioritized fallback logic based on tags/content/title
- ✅ **Component reuse**: Centralized badge components
- ✅ **Clean UI**: Single badge per article for uncluttered design

### Future Enhancements
- 🔄 **Content analysis**: ML-based primary topic classification
- 🔄 **Bulk updates**: Scripts for batch single channel assignments
- 🔄 **Validation**: Pre-commit hooks to check channel assignments
- 🔄 **Analytics**: Track channel engagement and distribution

## Quick Reference Commands

```bash
# Find all articles with explicit channels
grep -r "channel:" src/content/

# Count articles per channel
grep -r "channel:" src/content/ | cut -d'"' -f2 | sort | uniq -c

# Find articles without explicit channels (using auto-detection)
grep -L "channel:" src/content/**/*.md

# Current channel distribution
# Biology: 2, Mathematics: 1, Physics: 1, Ethics: 1, Editorial: 1

# Update article to new channel
sed -i 's/channel: "old"/channel: "new"/' src/content/path/to/article.md
```

## Support & Troubleshooting

### Common Issues
1. **Badge not appearing**: Check `channel: "value"` syntax and spelling
2. **Wrong colors**: Verify channel ID matches `CHANNELS` constant exactly
3. **"Uncategorized" showing**: Article has no explicit channel and auto-detection failed
4. **Layout issues**: Test responsive behavior on different screen sizes

### Channel System Files
- `src/components/channel-badge.tsx` - Single badge component and logic
- `src/components/channels-sidebar.tsx` - Channel definitions and colors
- `src/app/atlas/page.tsx` - Atlas feed integration (top-right badge)
- `src/app/explore/page.tsx` - Explore table integration (channels column)

## Decision Rationale

**Why Single Channel?**
- ✅ **Cleaner UI**: No visual clutter from multiple badges
- ✅ **Better navigation**: Users expect articles in one primary category
- ✅ **Easier management**: Forces decisive content categorization
- ✅ **More useful**: Channels as categories, not tags
- ✅ **Scalable**: Works well as content library grows

---

**Last Updated**: September 24, 2025
**Version**: 2.0 (Single Channel System)
**Maintained by**: Frontend Team

*This guide ensures consistent, maintainable channel management across the Atlas platform. Each article gets exactly one channel - its primary home. For questions or updates, consult the frontend team lead.*