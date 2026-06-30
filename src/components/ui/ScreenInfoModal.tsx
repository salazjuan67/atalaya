import { useEffect } from 'react'
import { createPortal } from 'react-dom'
import { X } from 'lucide-react'
import type { ScreenInfo } from '../../content/screenInfo'

interface ScreenInfoModalProps {
  info: ScreenInfo
  onClose: () => void
}

export function ScreenInfoModal({ info, onClose }: ScreenInfoModalProps) {
  useEffect(() => {
    const prev = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    return () => {
      document.body.style.overflow = prev
    }
  }, [])

  return createPortal(
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
      <button
        type="button"
        aria-label="Cerrar"
        className="absolute inset-0 bg-black/30 backdrop-blur-[2px]"
        onClick={onClose}
      />

      <div
        role="dialog"
        aria-modal="true"
        aria-labelledby="screen-info-title"
        className="card-base relative flex max-h-[min(90dvh,640px)] w-full max-w-md flex-col overflow-hidden"
      >
        <div className="flex shrink-0 items-start justify-between gap-3 border-b border-border px-5 py-4">
          <h3
            id="screen-info-title"
            className="pr-2 text-base font-semibold leading-snug tracking-tight text-gray-900"
          >
            {info.title}
          </h3>
          <button
            type="button"
            onClick={onClose}
            className="shrink-0 rounded-lg p-1.5 text-gray-400 transition-colors hover:bg-surface-muted hover:text-gray-600"
            aria-label="Cerrar"
          >
            <X className="h-4 w-4" strokeWidth={2} />
          </button>
        </div>

        <div className="min-h-0 flex-1 overflow-y-auto overscroll-contain px-5 py-4">
          <p className="text-sm leading-relaxed text-gray-600">{info.description}</p>
          {info.bullets && info.bullets.length > 0 && (
            <ul className="mt-4 space-y-2.5">
              {info.bullets.map((bullet) => (
                <li key={bullet} className="flex gap-2.5 text-sm leading-relaxed text-gray-600">
                  <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-accent" />
                  <span>{bullet}</span>
                </li>
              ))}
            </ul>
          )}
        </div>

        <div className="shrink-0 border-t border-border px-5 py-4 pb-[max(1rem,env(safe-area-inset-bottom))]">
          <button
            type="button"
            onClick={onClose}
            className="w-full rounded-xl bg-accent px-4 py-3 text-sm font-medium text-white transition-colors hover:bg-accent/90"
          >
            Entendido
          </button>
        </div>
      </div>
    </div>,
    document.body,
  )
}
