interface PersonaBadgeProps {
  videoSrc: string
  imageSrc: string
  size?: 'sm' | 'md' | 'lg' | 'xl'
  className?: string
}

const sizeClasses = {
  sm: 'w-8 h-8 rounded-full',     // 32px for small contexts
  md: 'w-12 h-12 rounded-lg',     // 48px for cards - more square
  lg: 'w-16 h-16 rounded-lg',     // 64px for headers - more square
  xl: 'w-24 h-24 rounded-xl'      // 96px for modals - square like agency
}

export function PersonaBadge({
  videoSrc,
  imageSrc,
  size = 'sm',
  className = ''
}: PersonaBadgeProps) {
  return (
    <div className={`relative ${sizeClasses[size]} overflow-hidden border border-neutral-200 dark:border-neutral-700 flex-shrink-0 ${className}`}>
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