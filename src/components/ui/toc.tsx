"use client";
import React, { useEffect, useMemo, useRef, useState } from "react";
import { cn } from "@/lib/utils";
import { PersonaBadge } from "@/components/persona-badge";
import { getPersonaByName } from "@/data/personas";

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

  const [activeId, setActiveId] = useState<string | null>(null);
  const navRef = useRef<HTMLDivElement>(null);
  const linkRefs = useRef<Record<string, HTMLAnchorElement | null>>({});
  const [scrolled, setScrolled] = useState(false);

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

  // No animated indicator; keep logic simple and responsive

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

  if (!items.length) return null;

  return (
    <div
      className={cn(
        "sticky top-8 self-start bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-700 rounded-lg p-4 w-64 shrink-0 transition-shadow",
        scrolled ? "shadow-sm" : "shadow-none",
      )}
      style={{ maxHeight: "calc(100vh - 4rem)" }}
    >
      <h3 className="font-semibold text-neutral-900 dark:text-neutral-100 mb-3 text-sm">On this page</h3>
      <div ref={navRef} className="relative">
        <nav className="space-y-2 pl-1 pr-2 overflow-auto"
             style={{ maxHeight: "calc(100vh - 10rem)" }}>
          {items.map((item) => (
            <a
              ref={(el) => {
                linkRefs.current[item.id] = el
              }}
              key={item.idx}
              href={`#${item.id}`}
              onClick={onClick(item.id)}
              className={cn(
                "block text-sm rounded-md px-2 py-1 transition-colors border-l-2 break-words whitespace-normal leading-snug",
                item.level === 2
                  ? "text-neutral-700 dark:text-neutral-300 border-transparent"
                  : "text-neutral-500 dark:text-neutral-500 ml-3 border-transparent",
                activeId === item.id && "border-blue-500 text-blue-600 dark:text-blue-400 bg-neutral-50 dark:bg-neutral-800/50"
              )}
            >
              {item.text}
            </a>
          ))}
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
