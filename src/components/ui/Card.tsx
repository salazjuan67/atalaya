import type { LucideIcon } from 'lucide-react'

interface CardProps {
  title?: string
  icon?: LucideIcon
  children: React.ReactNode
  className?: string
}

export function Card({ title, icon: Icon, children, className = '' }: CardProps) {
  return (
    <div className={`rounded-xl border border-border bg-card p-6 ${className}`}>
      {title && (
        <div className="mb-4 flex items-center gap-2">
          {Icon && <Icon className="h-4 w-4 text-gray-500" strokeWidth={1.75} />}
          <h2 className="text-sm font-medium text-gray-700">{title}</h2>
        </div>
      )}
      {children}
    </div>
  )
}
