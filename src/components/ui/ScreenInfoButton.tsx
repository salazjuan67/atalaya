import { useState } from 'react'
import { Info } from 'lucide-react'
import { getScreenInfo } from '../../content/screenInfo'
import { ScreenInfoModal } from './ScreenInfoModal'

interface ScreenInfoButtonProps {
  pathname: string
  className?: string
  compact?: boolean
}

export function ScreenInfoButton({
  pathname,
  className = '',
  compact = false,
}: ScreenInfoButtonProps) {
  const [open, setOpen] = useState(false)
  const info = getScreenInfo(pathname)

  return (
    <>
      <button
        type="button"
        onClick={() => setOpen(true)}
        aria-label="Información de la pantalla"
        className={`inline-flex items-center justify-center gap-2 rounded-xl border border-border bg-card text-sm font-medium text-gray-600 shadow-sm transition-colors hover:border-accent/30 hover:bg-accent-soft hover:text-accent ${
          compact ? 'h-10 w-10 shrink-0' : 'px-3 py-2'
        } ${className}`}
      >
        <Info className="h-4 w-4 shrink-0" strokeWidth={1.75} />
        {!compact && (
          <>
            <span className="hidden sm:inline">Información de la pantalla</span>
            <span className="sm:hidden">Info</span>
          </>
        )}
      </button>
      {open && <ScreenInfoModal info={info} onClose={() => setOpen(false)} />}
    </>
  )
}
