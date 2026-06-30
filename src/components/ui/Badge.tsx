type BadgeVariant = 'open' | 'prog' | 'done' | 'neutral'

interface BadgeProps {
  variant: BadgeVariant
  children: React.ReactNode
}

const variantStyles: Record<BadgeVariant, string> = {
  open: 'bg-red-50 text-status-open',
  prog: 'bg-amber-50 text-status-prog',
  done: 'bg-green-50 text-status-done',
  neutral: 'bg-gray-100 text-status-neutral',
}

export function Badge({ variant, children }: BadgeProps) {
  return (
    <span
      className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium ${variantStyles[variant]}`}
    >
      {children}
    </span>
  )
}
