import { cn } from "@/lib/utils";


// Centralized channel definitions (matches channels-sidebar.tsx)
const CHANNELS = {
  editorial: { name: "Editorial", color: "#ec4899", icon: "⚡" },
  books: { name: "Books", color: "#8b5cf6", icon: "📚" },
  biology: { name: "Biology", color: "#f59e0b", icon: "🧬" },
  physics: { name: "Physics", color: "#3b82f6", icon: "⚛️" },
  mathematics: { name: "Mathematics", color: "#10b981", icon: "🧮" },
  ethics: { name: "Ethics", color: "#ef4444", icon: "⚖️" },
  philosophy: { name: "Philosophy", color: "#a855f7", icon: "🤔" }
} as const;

type ChannelId = keyof typeof CHANNELS;

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
  const channel = CHANNELS[channelId as ChannelId];

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
        <span className={iconSizeClasses[size]}>{channel.icon}</span>
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
  return CHANNELS[channelId as ChannelId] || null;
}
