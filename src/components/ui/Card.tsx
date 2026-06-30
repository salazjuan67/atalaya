import type { LucideIcon } from 'lucide-react'
import { IconBox, type IconBoxVariant } from './IconBox'

interface CardProps {
  title?: string
  icon?: LucideIcon
  iconVariant?: IconBoxVariant
  children: React.ReactNode
  className?: string
}

export function Card({
  title,
  icon,
  iconVariant = 'neutral',
  children,
  className = '',
}: CardProps) {
  return (
    <div className={`card-base p-6 ${className}`}>
      {title && (
        <div className="mb-5 flex items-center gap-3">
          {icon && <IconBox icon={icon} variant={iconVariant} size="sm" />}
          <h2 className="text-base font-semibold tracking-tight text-gray-800">{title}</h2>
        </div>
      )}
      {children}
    </div>
  )
}
