"use client";

import { cn } from "@/lib/utils";
import React, { useEffect, useMemo, useState } from "react";

export const InfiniteMovingCards = ({
  items,
  direction = "left",
  speed = "fast",
  pauseOnHover = true,
  className,
}: {
  items: {
    quote: string;
    name: string;
    title: string;
  }[];
  direction?: "left" | "right";
  speed?: "fast" | "normal" | "slow";
  pauseOnHover?: boolean;
  className?: string;
}) => {
  const containerRef = React.useRef<HTMLDivElement>(null);
  const [started, setStarted] = useState(false);

  // Duplicate items at render time instead of mutating the DOM.
  // This keeps the animation seamless across responsive breakpoints and resizes.
  const displayItems = useMemo(() => {
    const base = items.slice(0, 8);
    return [...base, ...base];
  }, [items]);

  // Apply speed and direction using CSS variables; reapply on changes or resize.
  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;

    const setVars = () => {
      el.style.setProperty(
        "--animation-direction",
        direction === "left" ? "forwards" : "reverse",
      );
      el.style.setProperty(
        "--animation-duration",
        speed === "fast" ? "20s" : speed === "normal" ? "40s" : "80s",
      );
    };

    setVars();
    setStarted(true);

    // Reapply on resize so responsive width changes stay in sync.
    const onResize = () => setVars();
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, [direction, speed]);

  return (
    <div
      ref={containerRef}
      className={cn(
        "scroller relative z-0 w-full overflow-hidden",
        className,
      )}
    >
      {/* Visual edge fades as overlays for robust cross-browser behavior */}
      <div className="pointer-events-none absolute inset-y-0 left-0 w-32 z-20 bg-gradient-to-r from-white to-transparent dark:from-neutral-900" />
      <div className="pointer-events-none absolute inset-y-0 right-0 w-32 z-20 bg-gradient-to-l from-white to-transparent dark:from-neutral-900" />

      <ul
        className={cn(
          "flex min-w-full shrink-0 gap-4 py-4 w-max flex-nowrap",
          started && "animate-scroll",
          pauseOnHover && "hover:[animation-play-state:paused]",
        )}
      >
        {displayItems.map((item, idx) => (
          <li
            className="w-[320px] sm:w-[360px] md:w-[400px] lg:w-[450px] max-w-full relative rounded-2xl border flex-shrink-0 border-neutral-200 dark:border-slate-700 px-6 md:px-8 py-6 bg-white dark:bg-slate-800 shadow-md"
            key={idx}
          >
            <blockquote>
              <span className="relative z-20 text-sm leading-[1.6] text-neutral-800 dark:text-gray-100 font-normal">
                &ldquo;{item.quote}&rdquo;
              </span>
              <div className="relative z-20 mt-6 flex flex-row items-center">
                <span className="flex flex-col gap-1">
                  <span className="text-sm leading-[1.6] text-neutral-600 dark:text-gray-400 font-medium">
                    {item.name}
                  </span>
                  <span className="text-xs leading-[1.4] text-neutral-500 dark:text-gray-500 font-normal">
                    {item.title}
                  </span>
                </span>
              </div>
            </blockquote>
          </li>
        ))}
      </ul>
    </div>
  );
};
