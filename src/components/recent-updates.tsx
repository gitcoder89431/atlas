"use client";

import { cn } from "@/lib/utils";
import { PersonaBadge } from "@/components/persona-badge";
import { personaMap } from "@/data/personas";
import { Clock, TrendingUp, Zap } from "lucide-react";
import { useRouter } from "next/navigation";

interface RecentUpdate {
  type: "new" | "trending" | "active";
  title: string;
  author: string;
  time: string;
  channel: string;
  slug: string;
}

// Recent updates - actual latest content from Atlas
const recentUpdates: RecentUpdate[] = [
  {
    type: "new",
    title: "Tinkering with Ancient Code: From Neanderthal Cognition to API Democracy",
    author: "Ruixen",
    time: "1h",
    channel: "editorial",
    slug: "tinkering-ancient-code-neanderthal-api-democracy"
  },
  {
    type: "new",
    title: "When Feynman Meets Turing: APIs as Cognitive Architecture",
    author: "Richard Feynman & Alan Turing",
    time: "2h",
    channel: "conversations",
    slug: "richard-feynman-alan-turing-api-cognitive-architectures-dialogue"
  },
  {
    type: "trending",
    title: "When π Meets e: The Infinite Dance of Computation and Story",
    author: "π & e",
    time: "6h",
    channel: "mathematics",
    slug: "pi-e-infinity-computation-dialogue"
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
  const router = useRouter();

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
          const authors = update.author.split('&').map(a => a.trim());
          const isDialogue = authors.length > 1;

          // Determine correct route based on channel/content type
          const getArticleRoute = (slug: string) => {
            // Check if it's a book based on slug pattern
            if (slug.includes('essential-') || slug.includes('-essential')) {
              return `/atlas/books/${slug}`;
            }
            // For now, assume dialogue if multiple authors, monologue if single
            const isDialogue = update.author.includes('&');
            return isDialogue ? `/atlas/dialogue/${slug}` : `/atlas/monologue/${slug}`;
          };

          return (
            <div key={index}>
              <div
                onClick={() => router.push(getArticleRoute(update.slug))}
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
                  {/* Author badges */}
                  <div className="flex items-center gap-1">
                    {isDialogue ? (
                      // Show both personas for dialogues
                      <>
                        {authors.map((author, authorIndex) => {
                          const persona = personaMap[author];
                          return persona ? (
                            <PersonaBadge
                              key={authorIndex}
                              imageSrc={persona.imageSrc}
                              size="sm"
                            />
                          ) : (
                            <div key={authorIndex} className="w-6 h-6 rounded-full bg-neutral-200 dark:bg-neutral-700" />
                          );
                        })}
                      </>
                    ) : (
                      // Single author
                      (() => {
                        const persona = personaMap[authors[0]];
                        return persona ? (
                          <PersonaBadge
                            imageSrc={persona.imageSrc}
                            size="sm"
                          />
                        ) : (
                          <div className="w-6 h-6 rounded-full bg-neutral-200 dark:bg-neutral-700" />
                        );
                      })()
                    )}
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
