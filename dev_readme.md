# Atlas Developer Guide

This document covers environment configuration, deployment notes, and the content publishing workflow. The public README is intentionally user‑focused.

## Environment & URLs

Set this environment variable so `sitemap.xml` and `robots.txt` generate correct absolute URLs:

- `NEXT_PUBLIC_SITE_URL` — your site origin.
  - Local dev: `http://localhost:3000`
  - Vercel preview: `https://<your-app>.vercel.app`
  - Production: `https://your-domain.com`

Local setup:
1. Copy `.env.example` to `.env.local`.
2. Set `NEXT_PUBLIC_SITE_URL` appropriately.

Vercel setup:
- Project Settings → Environment Variables → add `NEXT_PUBLIC_SITE_URL` for Production, Preview, and Development.

## Rendering & Caching Model

- Explore and Atlas are server-rendered with ISR (`revalidate = 60`). The initial HTML is static for SEO and fast TTFB; client hydration powers interactions (search, channels, load more).
- API `/api/articles` returns cache headers: `public, s-maxage=60, stale-while-revalidate=300`.
- Per-article pages (`/atlas/monologue/[slug]`, `/atlas/dialogue/[slug]`) export `generateStaticParams` and `generateMetadata` for full SSG + SEO.

## Publishing Content

This project uses SSG from Markdown:
1. Add `.md` files under `src/content/monologues` or `src/content/dialogues`.
2. Commit and push to trigger a Vercel build.
3. New content appears automatically (sorted by `date` in frontmatter). Explore/Atlas lists are refreshed via ISR.

Frontmatter reference (minimal):
```
title: "My Article Title"
date: "2025-09-24"
type: "monologue" # or "dialogue"
tags: ["topic", "keyword"]
summary: "Optional 1–2 sentences for SEO/social."
author: "Author Name" # For dialogues, use "A & B"
```

## SEO

- `generateMetadata` creates page `title`/`description` and OpenGraph/Twitter tags from frontmatter/summary.
- `src/app/sitemap.ts` and `src/app/robots.ts` use `NEXT_PUBLIC_SITE_URL`.

## Performance Notes

- Images use `next/image` where appropriate (avatars, logo, testimonials). Videos on Agency lazy‑load and autoplay only in viewport, respecting reduced motion.
- Long lists use `content-visibility: auto` to defer off‑screen rendering.
- Explore search input is debounced (200ms).

## File Map (related changes)

- Explore: `src/app/explore/page.tsx` (SSR) + `src/app/explore/ExploreClient.tsx` (client UI)
- Atlas: `src/app/atlas/page.tsx` (SSR) + `src/app/atlas/AtlasClient.tsx` (client UI)
- SEO: `src/app/atlas/monologue/[slug]/page.tsx`, `src/app/atlas/dialogue/[slug]/page.tsx`
- Caching: `src/app/api/articles/route.ts`
- Indexing: `src/app/sitemap.ts`, `src/app/robots.ts`

## Development Tips

- Set `NEXT_PUBLIC_SITE_URL` even locally to sanity‑check sitemap/robots.
- If you later add thumbnails, extend `generateMetadata` to include `openGraph.images`.

