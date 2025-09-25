import { cn } from "@/lib/utils"

interface FooterProps {
  className?: string
}

export function Footer({ className }: FooterProps) {
  return (
    <footer className={cn(
      "relative z-10 mt-auto py-3 px-4 md:px-8 border-t border-neutral-200/50 dark:border-neutral-700/50 bg-white/80 dark:bg-neutral-900/80 backdrop-blur-sm",
      className
    )}>
      <div className="max-w-4xl mx-auto text-center">
        <p className="text-xs text-neutral-500 dark:text-neutral-400 font-light leading-tight">
          The personas, dialogues, and quotes presented here are simulated reconstructions.<br />
          Please verify with original sources where accuracy matters.
        </p>
      </div>
    </footer>
  )
}