interface PersonaBadgeProps {
  videoSrc: string
  imageSrc: string
  size?: 'sm' | 'md' | 'lg'
  className?: string
}

const sizeClasses = {
  sm: 'w-6 h-6',   // 24px for table rows
  md: 'w-8 h-8',   // 32px for cards
  lg: 'w-12 h-12'  // 48px for headers
}

export function PersonaBadge({
  videoSrc,
  imageSrc,
  size = 'sm',
  className = ''
}: PersonaBadgeProps) {
  return (
    <div className={`relative ${sizeClasses[size]} rounded-full overflow-hidden border border-neutral-200 dark:border-neutral-700 flex-shrink-0 ${className}`}>
      <video
        className="w-full h-full object-cover"
        autoPlay
        loop
        muted
        playsInline
        poster={imageSrc}
      >
        <source src={videoSrc} type="video/mp4" />
      </video>
    </div>
  )
}