import type { LucideIcon } from 'lucide-react'

export type IconBoxVariant = 'accent' | 'open' | 'prog' | 'done' | 'neutral'
type IconBoxSize = 'sm' | 'md' | 'lg'

interface IconBoxProps {
  icon: LucideIcon
  variant?: IconBoxVariant
  size?: IconBoxSize
  className?: string
}

const variantStyles: Record<IconBoxVariant, string> = {
  accent: 'bg-accent-soft text-accent',
  open: 'bg-red-50 text-status-open',
  prog: 'bg-amber-50 text-status-prog',
  done: 'bg-green-50 text-status-done',
  neutral: 'bg-surface-muted text-status-neutral',
}

const sizeStyles: Record<IconBoxSize, { box: string; icon: string }> = {
  sm: { box: 'h-8 w-8 rounded-lg', icon: 'h-4 w-4' },
  md: { box: 'h-10 w-10 rounded-xl', icon: 'h-5 w-5' },
  lg: { box: 'h-12 w-12 rounded-xl', icon: 'h-6 w-6' },
}

export function IconBox({
  icon: Icon,
  variant = 'accent',
  size = 'md',
  className = '',
}: IconBoxProps) {
  const s = sizeStyles[size]
  return (
    <div
      className={`flex shrink-0 items-center justify-center ${s.box} ${variantStyles[variant]} ${className}`}
    >
      <Icon className={s.icon} strokeWidth={1.75} />
    </div>
  )
}
