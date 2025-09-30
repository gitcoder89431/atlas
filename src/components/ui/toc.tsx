"use client";
import React, { useEffect, useMemo, useRef, useState } from "react";
import { cn } from "@/lib/utils";
import { PersonaBadge } from "@/components/persona-badge";
import { getPersonaByName } from "@/data/personas";
import { ChevronDown, ChevronRight } from "lucide-react";

export function Toc({
  contentHtml,
  author,
  scrollContainerId = "scroll-container",
  articleRootId = "article-root",
  offset = 200,
}: {
  contentHtml: string;
  author?: string;
  scrollContainerId?: string;
  articleRootId?: string;
  offset?: number;
}) {
  const items = useMemo(() => {
    const matches = contentHtml.match(/<h[2-3][^>]*id="([^"]*)"[^>]*>(.*?)<\/h[2-3]>/g) || [];
    return matches.map((heading, idx) => {
      const levelMatch = heading.match(/<h([2-3])/);
      const level = parseInt(levelMatch?.[1] || "2", 10);
      const idMatch = heading.match(/id="([^"]*)"/);
      const id = idMatch?.[1] || "";
      const text = heading.replace(/<[^>]*>/g, "");
      return { level, text, id, idx };
    });
  }, [contentHtml]);

  // Group items into chapters (h2) and their subsections (h3)
  const chapters = useMemo(() => {
    const grouped: Array<{ chapter: typeof items[0]; subsections: typeof items }> = [];
    let currentChapter: typeof items[0] | null = null;
    let currentSubsections: typeof items = [];

    items.forEach(item => {
      if (item.level === 2) {
        // Save previous chapter if exists
        if (currentChapter) {
          grouped.push({ chapter: currentChapter, subsections: currentSubsections });
        }
        // Start new chapter
        currentChapter = item;
        currentSubsections = [];
      } else if (item.level === 3 && currentChapter) {
        // Add subsection to current chapter
        currentSubsections.push(item);
      }
    });

    // Add the last chapter
    if (currentChapter) {
      grouped.push({ chapter: currentChapter, subsections: currentSubsections });
    }

    return grouped;
  }, [items]);

  const [activeId, setActiveId] = useState<string | null>(null);
  const [expandedChapters, setExpandedChapters] = useState<Set<string>>(new Set());
  const navRef = useRef<HTMLDivElement>(null);
  const linkRefs = useRef<Record<string, HTMLAnchorElement | null>>({});
  const [scrolled, setScrolled] = useState(false);

  // Initialize with first chapter expanded
  useEffect(() => {
    if (chapters.length > 0 && expandedChapters.size === 0) {
      setExpandedChapters(new Set([chapters[0].chapter.id]));
    }
  }, [chapters, expandedChapters.size]);

  useEffect(() => {
    const container = document.getElementById(scrollContainerId) as HTMLElement | null;
    const root = document.getElementById(articleRootId) as HTMLElement | null;
    if (!container || !root) return;

    const headings = Array.from(root.querySelectorAll("h2, h3"));
    const obs = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((e) => e.isIntersecting)
          .sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top);
        if (visible[0]) setActiveId((visible[0].target as HTMLElement).id);
      },
      { root: container, rootMargin: "-20% 0px -60% 0px", threshold: [0, 0.25, 0.6, 1] },
    );
    headings.forEach((h) => obs.observe(h));
    const onScroll = () => setScrolled((container.scrollTop ?? 0) > 8);
    container.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    return () => {
      obs.disconnect();
      container.removeEventListener("scroll", onScroll);
    };
  }, [contentHtml, scrollContainerId, articleRootId]);

  const onClick = (id: string) => (e: React.MouseEvent) => {
    e.preventDefault();
    const container = document.getElementById(scrollContainerId) as HTMLElement | null;
    const target = document.getElementById(id);
    if (!container || !target) return;
    const cRect = container.getBoundingClientRect();
    const tRect = target.getBoundingClientRect();
    const top = tRect.top - cRect.top + container.scrollTop - offset;
    container.scrollTo({ top, behavior: "smooth" });
  };

  const toggleChapter = (chapterId: string) => {
    setExpandedChapters(prev => {
      const newSet = new Set(prev);
      if (newSet.has(chapterId)) {
        newSet.delete(chapterId);
      } else {
        newSet.add(chapterId);
      }
      return newSet;
    });
  };

  if (!chapters.length) return null;

  return (
    <div
      className={cn(
        "sticky top-8 self-start bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-700 rounded-lg p-4 w-64 shrink-0 transition-shadow",
        scrolled ? "shadow-sm" : "shadow-none",
      )}
      style={{ maxHeight: "calc(100vh - 4rem)" }}
    >
      <h3 className="font-semibold text-neutral-900 dark:text-neutral-100 mb-3 text-sm">Table of Contents</h3>
      <div ref={navRef} className="relative">
        <nav className="space-y-1 pl-1 pr-2 overflow-auto"
             style={{ maxHeight: "calc(100vh - 10rem)" }}>
          {chapters.map(({ chapter, subsections }) => {
            const isExpanded = expandedChapters.has(chapter.id);
            const isChapterActive = activeId === chapter.id;
            const hasActiveSubsection = subsections.some(sub => activeId === sub.id);
            
            return (
              <div key={chapter.id} className="space-y-1">
                {/* Chapter Header */}
                <div className="flex items-center">
                  <button
                    onClick={() => toggleChapter(chapter.id)}
                    className="flex items-center gap-1 flex-1 text-left p-1 rounded hover:bg-neutral-50 dark:hover:bg-neutral-800/50 transition-colors"
                  >
                    {subsections.length > 0 && (
                      isExpanded ? (
                        <ChevronDown className="w-3 h-3 text-neutral-400 flex-shrink-0" />
                      ) : (
                        <ChevronRight className="w-3 h-3 text-neutral-400 flex-shrink-0" />
                      )
                    )}
                    <span className="flex-1 min-w-0">
                      <a
                        ref={(el) => {
                          linkRefs.current[chapter.id] = el
                        }}
                        href={`#${chapter.id}`}
                        onClick={onClick(chapter.id)}
                        className={cn(
                          "block text-sm font-medium rounded-md px-2 py-1 transition-colors border-l-2 break-words whitespace-normal leading-snug",
                          isChapterActive || hasActiveSubsection
                            ? "border-blue-500 text-blue-600 dark:text-blue-400 bg-neutral-50 dark:bg-neutral-800/50"
                            : "text-neutral-700 dark:text-neutral-300 border-transparent hover:bg-neutral-50 dark:hover:bg-neutral-800/30"
                        )}
                      >
                        {chapter.text}
                      </a>
                    </span>
                  </button>
                </div>

                {/* Subsections */}
                {isExpanded && subsections.length > 0 && (
                  <div className="ml-4 space-y-1">
                    {subsections.map((subsection) => (
                      <a
                        key={subsection.id}
                        ref={(el) => {
                          linkRefs.current[subsection.id] = el
                        }}
                        href={`#${subsection.id}`}
                        onClick={onClick(subsection.id)}
                        className={cn(
                          "block text-sm rounded-md px-2 py-1 transition-colors border-l-2 break-words whitespace-normal leading-snug",
                          activeId === subsection.id
                            ? "border-blue-500 text-blue-600 dark:text-blue-400 bg-neutral-50 dark:bg-neutral-800/50"
                            : "text-neutral-500 dark:text-neutral-500 border-transparent hover:bg-neutral-50 dark:hover:bg-neutral-800/30"
                        )}
                      >
                        {subsection.text}
                      </a>
                    ))}
                  </div>
                )}
              </div>
            );
          })}
        </nav>
      </div>
      {author && (() => {
        const authors = author.includes('&') ? author.split('&').map(a => a.trim()) : [author];
        const isDialogue = authors.length > 1;

        return (
          <div className="mt-6 pt-4 border-t border-neutral-200 dark:border-neutral-700">
            <h4 className="font-medium text-neutral-900 dark:text-neutral-100 mb-3 text-sm">
              {isDialogue ? 'Authors' : 'Author'}
            </h4>
            <div className="space-y-3">
              {authors.slice(0, 2).map((authorName, index) => {
                const persona = getPersonaByName(authorName);
                if (!persona) return null;

                return (
                  <div key={index} className="flex gap-3 items-center">
                    <PersonaBadge
                      imageSrc={persona.imageSrc}
                      alt={persona.name}
                      size="md"
                    />
                    <div className="flex-1">
                      <h5 className="font-semibold text-neutral-900 dark:text-neutral-100 text-sm mb-1">
                        {persona.name}
                      </h5>
                      <p className="text-neutral-600 dark:text-neutral-400 text-xs">
                        {persona.title}
                      </p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        );
      })()}
    </div>
  );
}
