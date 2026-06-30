import type { LucideIcon } from 'lucide-react'
import { IconBox, type IconBoxVariant } from './IconBox'

interface StatCardProps {
  label: string
  value: string | number
  icon: LucideIcon
  iconVariant?: IconBoxVariant
  valueClassName?: string
}

export function StatCard({
  label,
  value,
  icon,
  iconVariant = 'accent',
  valueClassName = 'text-gray-900',
}: StatCardProps) {
  return (
    <div className="card-base p-4 sm:p-5">
      <div className="flex items-start justify-between gap-3">
        <p className="text-xs font-medium text-gray-500 sm:text-sm">{label}</p>
        <IconBox icon={icon} variant={iconVariant} size="sm" />
      </div>
      <p className={`mt-2 text-2xl font-semibold tabular-nums tracking-tight sm:mt-3 sm:text-3xl ${valueClassName}`}>
        {value}
      </p>
    </div>
  )
}
