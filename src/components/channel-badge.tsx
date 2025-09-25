import { cn } from "@/lib/utils";
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
  icon: React.ComponentType<{ className?: string }>;
  color: string;
}


// Centralized channel definitions (matches channels-sidebar.tsx)
export const CHANNELS: Record<string, Channel> = {
  conversations: { id: "conversations", name: "Conversations", icon: MessageCircle, color: "#8b5cf6" },
  biology: { id: "biology", name: "Biology", icon: Dna, color: "#f59e0b" },
  physics: { id: "physics", name: "Physics", icon: Atom, color: "#3b82f6" },
  mathematics: { id: "mathematics", name: "Mathematics", icon: Calculator, color: "#10b981" },
  ethics: { id: "ethics", name: "Ethics", icon: Scale, color: "#ef4444" },
  editorial: { id: "editorial", name: "Editorial", icon: Zap, color: "#ec4899" },
  philosophy: { id: "philosophy", name: "Philosophy", icon: Brain, color: "#6b7280" }
};

interface ChannelBadgeProps {
  channelId: string;
  size?: "sm" | "md" | "lg";
  showIcon?: boolean;
  showName?: boolean;
  className?: string;
}

export function ChannelBadge({
  channelId,
  size = "sm",
  showIcon = false, // Default to no icon for cleaner look
  showName = true,
  className
}: ChannelBadgeProps) {
  const channel = CHANNELS[channelId];

  if (!channel) {
    return null;
  }

  const sizeClasses = {
    sm: "text-xs px-2 py-1 gap-1",
    md: "text-sm px-3 py-1.5 gap-1.5",
    lg: "text-base px-4 py-2 gap-2"
  };

  const iconSizeClasses = {
    sm: "w-3 h-3",
    md: "w-4 h-4",
    lg: "w-5 h-5"
  };

  return (
    <span
      className={cn(
        "inline-flex items-center rounded-full font-medium border transition-all duration-200",
        "bg-white/90 dark:bg-neutral-800/90 backdrop-blur-sm",
        "border-neutral-200/50 dark:border-neutral-700/50",
        "hover:shadow-sm hover:scale-105",
        sizeClasses[size],
        className
      )}
      style={{
        borderColor: channel.color + "40",
        color: channel.color
      }}
    >
      {showIcon && (
        <channel.icon
          className={iconSizeClasses[size]}
          style={{ color: channel.color }}
        />
      )}
      {showName && (
        <span className="font-medium">
          {channel.name}
        </span>
      )}
    </span>
  );
}

// Simple helper for single channel display
export function getChannelInfo(channelId: string) {
  return CHANNELS[channelId] || null;
}