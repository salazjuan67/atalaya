import { X } from 'lucide-react'
import type { ScreenInfo } from '../../content/screenInfo'

interface ScreenInfoModalProps {
  info: ScreenInfo
  onClose: () => void
}

export function ScreenInfoModal({ info, onClose }: ScreenInfoModalProps) {
  return (
    <div className="fixed inset-0 z-[60] flex items-end justify-center bg-black/25 p-0 backdrop-blur-[2px] sm:items-center sm:p-4">
      <div className="card-base max-h-[85vh] w-full overflow-y-auto rounded-b-none p-6 sm:max-w-md sm:rounded-2xl">
        <div className="mb-4 flex items-start justify-between gap-3">
          <h3 className="text-base font-semibold tracking-tight text-gray-900">{info.title}</h3>
          <button
            type="button"
            onClick={onClose}
            className="rounded-lg p-1.5 text-gray-400 transition-colors hover:bg-surface-muted hover:text-gray-600"
            aria-label="Cerrar"
          >
            <X className="h-4 w-4" strokeWidth={2} />
          </button>
        </div>
        <p className="text-sm leading-relaxed text-gray-600">{info.description}</p>
        {info.bullets && info.bullets.length > 0 && (
          <ul className="mt-4 space-y-2">
            {info.bullets.map((bullet) => (
              <li key={bullet} className="flex gap-2 text-sm text-gray-600">
                <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-accent" />
                {bullet}
              </li>
            ))}
          </ul>
        )}
        <button
          type="button"
          onClick={onClose}
          className="mt-6 w-full rounded-xl bg-accent px-4 py-3 text-sm font-medium text-white transition-colors hover:bg-accent/90"
        >
          Entendido
        </button>
      </div>
    </div>
  )
}
