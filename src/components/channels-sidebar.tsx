"use client";

import { cn } from "@/lib/utils";
import { useState } from "react";
import { Checkbox } from "@/components/ui/checkbox";
import type { Article } from "@/lib/markdown";
import {
  Circle,
  Atom,
  Brain,
  Calculator,
  Dna,
  Scale,
  Zap,
  MessageCircle
} from "lucide-react";

interface Channel {
  id: string;
  name: string;
  icon: React.ComponentType<{ className?: string; style?: React.CSSProperties }>;
  color: string;
  count?: number;
}

// Base channel definitions (counts will be calculated dynamically)
const baseChannels: Omit<Channel, 'count'>[] = [
  { id: "editorial", name: "Editorial", icon: Zap, color: "#ec4899" },
  { id: "conversations", name: "Discussions", icon: MessageCircle, color: "#8b5cf6" },
  { id: "biology", name: "Biology", icon: Dna, color: "#f59e0b" },
  { id: "physics", name: "Physics", icon: Atom, color: "#3b82f6" },
  { id: "mathematics", name: "Mathematics", icon: Calculator, color: "#10b981" },
  { id: "ethics", name: "Ethics", icon: Scale, color: "#ef4444" }
];

// Article type comes from lib/markdown (supports additional types but we only use monologue/dialogue logic)

interface ChannelsSidebarProps {
  selectedChannels: string[]; // Changed to array for multi-select
  onChannelToggle: (channelId: string) => void; // Changed to toggle instead of select
  articles?: Article[]; // Optional for automatic counts
  className?: string;
}

export function ChannelsSidebar({
  selectedChannels,
  onChannelToggle,
  articles = [],
  className
}: ChannelsSidebarProps) {
  const [hoveredChannel, setHoveredChannel] = useState<string | null>(null);

  // Helper function to determine article's primary channel (same logic as Atlas page)
  const getArticleChannel = (article: Article): string | null => {
    // First check if explicit channel is defined in frontmatter
    const explicitChannel = (article.frontmatter as any).channel;
    if (explicitChannel && typeof explicitChannel === 'string') {
      return explicitChannel;
    }

    // Fallback to detection logic - return most relevant single channel
    const tags = article.frontmatter.tags || [];
    const content = article.content.toLowerCase();
    const title = article.frontmatter.title.toLowerCase();

    // Conversations (highest priority for dialogues)
    if (article.frontmatter.type === 'dialogue') {
      return 'conversations';
    }

    // Biology (high priority for evolution/life sciences)
    if (tags.some(tag => ['biology', 'evolution', 'life', 'natural-selection'].includes(tag.toLowerCase())) ||
        content.includes('evolution') || content.includes('darwin') || title.includes('evolution')) {
      return 'biology';
    }

    // Physics (high priority for physics concepts)
    if (tags.some(tag => ['physics', 'quantum', 'mechanics'].includes(tag.toLowerCase())) ||
        content.includes('physics') || content.includes('quantum') || content.includes('feynman')) {
      return 'physics';
    }

    // Mathematics (for computation/algorithms)
    if (tags.some(tag => ['mathematics', 'computation', 'logic', 'turing'].includes(tag.toLowerCase())) ||
        content.includes('computation') || content.includes('algorithm') || content.includes('turing')) {
      return 'mathematics';
    }

    // Ethics (for moral/governance topics)
    if (tags.some(tag => ['ethics', 'morality', 'justice', 'governance'].includes(tag.toLowerCase())) ||
        content.includes('ethics') || content.includes('governance') || content.includes('morality')) {
      return 'ethics';
    }

    // Editorial (for Ruixen's editorial content)
    if (article.frontmatter.author === 'Ruixen' ||
        tags.some(tag => ['editorial', 'commentary'].includes(tag.toLowerCase()))) {
      return 'editorial';
    }

    // Philosophy (fallback for general philosophical content)
    if (tags.some(tag => ['philosophy'].includes(tag.toLowerCase())) ||
        content.includes('philosophy')) {
      return 'philosophy';
    }

    return null;
  };

  // Calculate automatic counts if articles are provided
  const channelCounts = articles.length > 0 ? (() => {
    const counts: Record<string, number> = {
      conversations: 0,
      biology: 0,
      physics: 0,
      mathematics: 0,
      ethics: 0,
      editorial: 0,
      philosophy: 0
    };

    articles.forEach(article => {
      const channel = getArticleChannel(article);
      if (channel && counts[channel] !== undefined) {
        counts[channel]++;
      }
    });

    return counts;
  })() : null;

  // Create channels array with dynamic counts
  const channels: Channel[] = baseChannels.map(baseChannel => {
    if (baseChannel.id === 'all') {
      return {
        ...baseChannel,
        count: channelCounts ? articles.length : 6 // fallback to total articles or default
      };
    }

    return {
      ...baseChannel,
      count: channelCounts ? channelCounts[baseChannel.id] || 0 : undefined
    };
  });

  return (
    <div
      className={cn(
        "sticky top-2 self-start bg-neutral-50 dark:bg-neutral-800",
        "border border-neutral-200 dark:border-neutral-700 rounded-lg",
        "hidden md:block w-48 lg:w-56 shrink-0 transition-shadow shadow-none hover:shadow-sm",
        className
      )}
      style={{ maxHeight: "calc(100vh - 4rem)" }}
    >
      {/* Header */}
      <div className="p-4 border-b border-neutral-200 dark:border-neutral-700">
        <h3 className="font-medium text-neutral-900 dark:text-neutral-100 text-sm">
          Channels
        </h3>
      </div>

      {/* Channel List */}
      <nav className="p-2 space-y-1">
        {channels.map((channel) => {
          const isSelected = selectedChannels.includes(channel.id);
          const isHovered = hoveredChannel === channel.id;

          return (
            <label
              key={channel.id}
              onMouseEnter={() => setHoveredChannel(channel.id)}
              onMouseLeave={() => setHoveredChannel(null)}
              className={cn(
                "w-full flex items-center gap-3 px-3 py-2 rounded-md cursor-pointer",
                "transition-all duration-200 group relative",
                "hover:bg-neutral-50 dark:hover:bg-neutral-800/50",
                isSelected && "bg-neutral-100 dark:bg-neutral-800"
              )}
            >
              {/* Checkbox */}
              <Checkbox
                checked={isSelected}
                onCheckedChange={() => onChannelToggle(channel.id)}
                className={cn(
                  "transition-all duration-200",
                  "border-neutral-300 dark:border-neutral-600",
                  isSelected && "border-current bg-current text-white"
                )}
                style={{
                  borderColor: isSelected ? channel.color : undefined,
                  backgroundColor: isSelected ? channel.color : undefined
                }}
              />

              {/* Icon */}
              <channel.icon
                className={cn(
                  "w-5 h-5 flex-shrink-0 transition-all duration-200",
                  isSelected ? "scale-110 opacity-100" : "opacity-70"
                )}
                style={{ color: isSelected ? channel.color : "#6b7280" }}
              />

              {/* Channel Name */}
              <span
                className={cn(
                  "text-sm font-medium truncate transition-all duration-200",
                  isSelected
                    ? "text-neutral-900 dark:text-neutral-100"
                    : "text-neutral-600 dark:text-neutral-400"
                )}
              >
                {channel.name}
              </span>

              {/* Count Badge */}
              {channel.count !== undefined && channel.count > 0 && (
                <span
                  className={cn(
                    "ml-auto text-xs px-1.5 py-0.5 rounded-full transition-all duration-200",
                    "bg-neutral-200 dark:bg-neutral-700 text-neutral-600 dark:text-neutral-400"
                  )}
                >
                  {channel.count}
                </span>
              )}
            </label>
          );
        })}
      </nav>

      {/* Zen Space - intentional emptiness */}
      <div className="h-8" />
    </div>
  );
}
