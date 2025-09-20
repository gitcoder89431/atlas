"use client";
import React, { useEffect, useMemo, useState } from "react";
import { cn } from "@/lib/utils";

export function Toc({
  contentHtml,
  scrollContainerId = "scroll-container",
  articleRootId = "article-root",
  offset = 80,
}: {
  contentHtml: string;
  scrollContainerId?: string;
  articleRootId?: string;
  offset?: number;
}) {
  const items = useMemo(() => {
    const matches = contentHtml.match(/<h[2-3][^>]*>(.*?)<\/h[2-3]>/g) || [];
    return matches.map((heading, idx) => {
      const levelMatch = heading.match(/<h([2-3])/);
      const level = parseInt(levelMatch?.[1] || "2", 10);
      const text = heading.replace(/<[^>]*>/g, "");
      const id = text.toLowerCase().replace(/[^a-z0-9]+/g, "-");
      return { level, text, id, idx };
    });
  }, [contentHtml]);

  const [activeId, setActiveId] = useState<string | null>(null);

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
    return () => obs.disconnect();
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

  if (!items.length) return null;

  return (
    <div className="sticky top-8 bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-700 rounded-lg p-4 w-64 shrink-0">
      <h3 className="font-semibold text-neutral-900 dark:text-neutral-100 mb-3 text-sm">On this page</h3>
      <nav className="space-y-2">
        {items.map((item) => (
          <a
            key={item.idx}
            href={`#${item.id}`}
            onClick={onClick(item.id)}
            className={cn(
              "block text-sm transition-colors",
              item.level === 2 ? "text-neutral-700 dark:text-neutral-300" : "text-neutral-500 dark:text-neutral-500 ml-4",
              activeId === item.id && "text-blue-600 dark:text-blue-400 font-semibold"
            )}
          >
            {item.text}
          </a>
        ))}
      </nav>
    </div>
  );
}

