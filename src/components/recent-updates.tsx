"use client";

import { cn } from "@/lib/utils";
import { PersonaBadge } from "@/components/persona-badge";
import { personaMap } from "@/data/personas";
import { Clock, TrendingUp, Zap } from "lucide-react";

interface RecentUpdate {
  type: "new" | "trending" | "active";
  title: string;
  author: string;
  time: string;
  channel: string;
  slug: string;
}

// Mock data - in real app this would come from API
const recentUpdates: RecentUpdate[] = [
  {
    type: "new",
    title: "Evolution from Field to Theory",
    author: "Charles Darwin",
    time: "2h",
    channel: "biology",
    slug: "evolution-field-to-theory-darwin"
  },
  {
    type: "trending",
    title: "Consciousness Adaptation",
    author: "Richard Feynman",
    time: "4h",
    channel: "physics",
    slug: "consciousness-adaptation-feynman"
  },
  {
    type: "active",
    title: "Cybernetic Governance",
    author: "Elinor Ostrom & Norbert Wiener",
    time: "6h",
    channel: "philosophy",
    slug: "cybernetic-governance-commons-dialogue"
  },
  {
    type: "new",
    title: "Computing Machinery",
    author: "Alan Turing",
    time: "1d",
    channel: "mathematics",
    slug: "computing-machinery-turing"
  }
];

const typeIcons = {
  new: <Zap className="w-3 h-3" />,
  trending: <TrendingUp className="w-3 h-3" />,
  active: <Clock className="w-3 h-3" />
};

const typeColors = {
  new: "text-green-500",
  trending: "text-orange-500",
  active: "text-blue-500"
};

interface RecentUpdatesProps {
  className?: string;
}

export function RecentUpdates({ className }: RecentUpdatesProps) {
  return (
    <div
      className={cn(
        "sticky top-2 self-start bg-neutral-50 dark:bg-neutral-800",
        "border border-neutral-200 dark:border-neutral-700 rounded-lg",
        "hidden lg:block w-56 xl:w-64 shrink-0 transition-shadow shadow-none hover:shadow-sm",
        className
      )}
      style={{ maxHeight: "calc(100vh - 4rem)" }}
    >
      {/* Header */}
      <div className="p-4 border-b border-neutral-200 dark:border-neutral-700">
        <h3 className="font-medium text-neutral-900 dark:text-neutral-100 text-sm">
          Recent Posts
        </h3>
      </div>

      {/* Updates List */}
      <div className="p-2 space-y-1">
        {recentUpdates.map((update, index) => {
          const mainAuthor = update.author.split('&')[0].trim();
          const persona = personaMap[mainAuthor];

          return (
            <div key={index}>
              <div
                className={cn(
                  "group p-3 rounded-md transition-all duration-200",
                  "hover:bg-white dark:hover:bg-neutral-700",
                  "cursor-pointer border border-transparent",
                  "hover:border-neutral-300 dark:hover:border-neutral-600",
                  "hover:shadow-sm"
                )}
              >
              {/* Type indicator & time */}
              <div className="flex items-center justify-between mb-2">
                <div className={cn("flex items-center gap-1", typeColors[update.type])}>
                  {typeIcons[update.type]}
                  <span className="text-xs font-medium capitalize">
                    {update.type}
                  </span>
                </div>
                <span className="text-xs text-neutral-400">
                  {update.time}
                </span>
              </div>

              {/* Content */}
              <div className="space-y-3">
                <h4 className="text-sm font-medium text-neutral-900 dark:text-neutral-100 line-clamp-2 leading-tight">
                  {update.title}
                </h4>

                {/* Author and Channel Tag - bottom row */}
                <div className="flex items-center justify-between">
                  {/* Author */}
                  <div className="flex items-center gap-2">
                    {persona ? (
                      <PersonaBadge
                        imageSrc={persona.imageSrc}
                        size="sm"
                      />
                    ) : (
                      <div className="w-6 h-6 rounded-full bg-neutral-200 dark:bg-neutral-700" />
                    )}
                    <span className="text-xs text-neutral-600 dark:text-neutral-400 truncate">
                      {mainAuthor}
                    </span>
                  </div>

                  {/* Channel tag */}
                  <span className="text-xs px-2 py-0.5 rounded-full bg-neutral-100 dark:bg-neutral-800 text-neutral-500 dark:text-neutral-400">
                    #{update.channel}
                  </span>
                </div>
              </div>
              </div>

              {/* Separator - don't show after last item */}
              {index < recentUpdates.length - 1 && (
                <div className="mx-4 my-2 h-px bg-neutral-200 dark:bg-neutral-700" />
              )}
            </div>
          );
        })}
      </div>

      {/* Zen Space - intentional emptiness */}
      <div className="h-8" />
    </div>
  );
}