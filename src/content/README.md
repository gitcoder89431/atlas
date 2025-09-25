Content structure

- Place markdown in `src/content/` so the site picks it up at build time.
- Supported folders (by type):
  - `src/content/dialogues` → `type: dialogue`
  - `src/content/monologues` → `type: monologue`
  - `src/content/posts` → mixed; if not specified, filenames containing `dialogue` default to `dialogue`, otherwise `monologue`.

Minimal frontmatter

---
title: "Your Title"
date: "2025-09-24"
summary: "One–sentence summary."
type: "dialogue" | "monologue"   # optional if placed under dialogues/monologues
slug: "your-slug"
tags: ["tag1", "tag2"]
channel: "conversations" | "biology" | "physics" | "mathematics" | "ethics" | "editorial" | "philosophy"  # optional (auto-inferred if omitted)
published: true
---

Notes

- Channels are auto–inferred from tags/content if omitted (dialogues → conversations).
- Files under `src/content` are preferred over `content/` at the repo root.
- Slug should match filename (without `.md`).

