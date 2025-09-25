# Article Publishing Workflow

## Overview
This document defines the workflow for moving articles from draft status to published status on the Atlas website.

## Content Directory Structure

```
/Users/dev/prod/ruixen/atlas/
├── content/                          # DRAFT CONTENT (not served to website)
│   ├── posts/                       # Raw generated posts from backend
│   │   ├── 20250925T080553Z/        # Timestamped generation runs
│   │   └── plato-seneca-*.md        # Individual generated articles
│   ├── post_dialogue.md             # Templates for backend
│   ├── post_monologue.md
│   └── post_bridge.md
└── src/content/                      # PUBLISHED CONTENT (served to website)
    ├── dialogues/                   # Published dialogue articles
    ├── monologues/                  # Published monologue articles
    └── editorials/                  # Published editorial/bridge articles
```

## Publishing Process

### Step 1: Review Draft Article
1. Locate the draft article in `/content/posts/[article-name].md`
2. Review content for:
   - Authentic persona voices
   - Natural conversation flow (for dialogues)
   - Proper frontmatter structure
   - Appropriate channel assignment
   - Working internal links

### Step 2: Quality Assurance Checklist

#### Content Quality
- [ ] **Authentic voices**: Do personas sound genuinely like themselves?
- [ ] **Natural flow**: Does conversation develop organically?
- [ ] **Substantial content**: Adequate length and intellectual depth?
- [ ] **Clear hook**: Compelling opening question?
- [ ] **Strong conclusion**: Meaningful synthesis of ideas?

#### Technical Quality
- [ ] **Proper frontmatter**: All required fields present?
- [ ] **Channel assignment**: Appropriate channel selected?
- [ ] **Slug format**: Follows naming conventions?
- [ ] **Working links**: All internal links use correct paths?
- [ ] **SEO keywords**: Relevant keywords included?

#### Formatting
- [ ] **Clean markdown**: No formatting errors?
- [ ] **Consistent structure**: Follows template structure?
- [ ] **No UI-breaking elements**: Remove any subtitle artifacts?

### Step 3: Move to Published Location
Based on article type, move to appropriate directory:

- **Dialogues** → `/src/content/dialogues/[slug].md`
- **Monologues** → `/src/content/monologues/[slug].md`
- **Bridges (Ruixen editorials)** → `/src/content/editorials/[slug].md`

### Step 4: Final Verification
1. Check that website can read the article
2. Verify article appears in Atlas feed
3. Test all internal links work correctly
4. Confirm channel badge displays correctly

## Article Type Guidelines

### Dialogues
- **Filename**: `persona1-persona2-topic.md`
- **Slug**: `persona1-persona2-topic`
- **Location**: `/src/content/dialogues/`
- **No "bridge-" prefix**

### Monologues
- **Filename**: `persona-topic-treatise.md` or `persona-topic-monologue.md`
- **Slug**: `persona-topic-treatise` or `persona-topic-monologue`
- **Location**: `/src/content/monologues/`
- **No "bridge-" prefix**

### Bridges (Editorial)
- **Filename**: `bridge-persona1-persona2-theme.md`
- **Slug**: `bridge-persona1-persona2-theme`
- **Location**: `/src/content/editorials/`
- **Author**: Always "Ruixen"
- **Channel**: Always "editorial"

## Website Configuration

The website **ONLY** reads from `/src/content/` directory. Draft content in `/content/` is never served to users.

This ensures:
- Clean separation between drafts and published content
- Prevents accidental publication of unreviewed content
- Allows for proper QA workflow

## Commands for Publishing

```bash
# Review draft article
cat /Users/dev/prod/ruixen/atlas/content/posts/[article-name].md

# Copy to published location with QA
cp /Users/dev/prod/ruixen/atlas/content/posts/[article-name].md \
   /Users/dev/prod/ruixen/atlas/src/content/[type]/[final-name].md

# Edit for any final QA fixes
# Then commit to git
```

## Rollback Process

If an article needs to be unpublished:
1. Remove from `/src/content/[type]/` directory
2. Article will no longer appear on website
3. Draft remains available in `/content/posts/` for revision

---

**Last Updated**: September 25, 2025
**Version**: 1.0
**Maintained by**: Ruixen