"use client";

import { cn } from "@/lib/utils";
import { useState } from "react";
import {
  Circle,
  Atom,
  Brain,
  Calculator,
  Dna,
  Scale,
  Zap
} from "lucide-react";

interface Channel {
  id: string;
  name: string;
  icon: React.ComponentType<{ className?: string; style?: React.CSSProperties }>;
  color: string;
  count?: number;
}

const channels: Channel[] = [
  { id: "all", name: "All Channels", icon: Circle, color: "#6b7280", count: 24 },
  { id: "physics", name: "Physics", icon: Atom, color: "#3b82f6", count: 8 },
  { id: "philosophy", name: "Philosophy", icon: Brain, color: "#8b5cf6", count: 6 },
  { id: "mathematics", name: "Mathematics", icon: Calculator, color: "#10b981", count: 4 },
  { id: "biology", name: "Biology", icon: Dna, color: "#f59e0b", count: 3 },
  { id: "ethics", name: "Ethics", icon: Scale, color: "#ef4444", count: 2 },
  { id: "consciousness", name: "Consciousness", icon: Zap, color: "#ec4899", count: 1 }
];

interface ChannelsSidebarProps {
  selectedChannel: string;
  onChannelSelect: (channelId: string) => void;
  className?: string;
}

export function ChannelsSidebar({
  selectedChannel,
  onChannelSelect,
  className
}: ChannelsSidebarProps) {
  const [hoveredChannel, setHoveredChannel] = useState<string | null>(null);

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
          const isActive = selectedChannel === channel.id;
          const isHovered = hoveredChannel === channel.id;

          return (
            <button
              key={channel.id}
              onClick={() => onChannelSelect(channel.id)}
              onMouseEnter={() => setHoveredChannel(channel.id)}
              onMouseLeave={() => setHoveredChannel(null)}
              className={cn(
                "w-full flex items-center gap-3 px-3 py-2 rounded-md",
                "transition-all duration-200 group relative",
                "hover:bg-neutral-50 dark:hover:bg-neutral-800/50",
                isActive && "bg-neutral-100 dark:bg-neutral-800"
              )}
            >
              {/* Icon */}
              <channel.icon
                className={cn(
                  "w-5 h-5 flex-shrink-0 transition-transform",
                  isActive && "scale-110"
                )}
                style={{ color: isActive ? channel.color : undefined }}
              />

              {/* Channel Name - always visible */}
              <span
                className={cn(
                  "text-sm font-medium truncate transition-all duration-200",
                  "opacity-100 translate-x-0",
                  "text-[var(--text-primary)] dark:text-[var(--text-primary)]"
                )}
              >
                {channel.name}
              </span>

              {/* Count Badge - always visible */}
              {channel.count && channel.count > 0 && (
                <span
                  className={cn(
                    "ml-auto text-xs px-1.5 py-0.5 rounded-full",
                    "bg-neutral-200 dark:bg-neutral-700 text-neutral-600 dark:text-neutral-400",
                    "transition-all duration-200",
                    "opacity-100"
                  )}
                >
                  {channel.count}
                </span>
              )}

              {/* Active indicator */}
              {isActive && (
                <div
                  className="absolute left-0 top-1/2 -translate-y-1/2 w-1 h-6 rounded-r-full"
                  style={{ backgroundColor: channel.color }}
                />
              )}
            </button>
          );
        })}
      </nav>

      {/* Zen Space - intentional emptiness */}
      <div className="h-8" />
    </div>
  );
}