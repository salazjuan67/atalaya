interface AtalayaLogoProps {
  size?: 'sm' | 'md' | 'lg'
  showWordmark?: boolean
  subtitle?: string
  className?: string
}

const sizes = {
  sm: { icon: 28, word: 'text-sm', sub: 'text-xs' },
  md: { icon: 36, word: 'text-base', sub: 'text-sm' },
  lg: { icon: 44, word: 'text-xl', sub: 'text-sm' },
}

export function AtalayaMark({ size = 32 }: { size?: number }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 32 32"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
    >
      <defs>
        <linearGradient id="atalayaGrad" x1="0" y1="0" x2="32" y2="32" gradientUnits="userSpaceOnUse">
          <stop stopColor="#3b82f6" />
          <stop offset="1" stopColor="#1d4ed8" />
        </linearGradient>
      </defs>
      <rect width="32" height="32" rx="9" fill="url(#atalayaGrad)" />
      <path d="M7 23h18" stroke="white" strokeOpacity="0.35" strokeWidth="1.5" strokeLinecap="round" />
      <path
        d="M16 7.5v2M13.5 21V11.5L16 9l2.5 2.5V21"
        stroke="white"
        strokeWidth="1.75"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path d="M11 13.5h10" stroke="white" strokeWidth="1.75" strokeLinecap="round" />
      <path d="M9.5 21h13" stroke="white" strokeWidth="1.75" strokeLinecap="round" />
      <circle cx="16" cy="7.5" r="1.75" fill="white" />
    </svg>
  )
}

export function AtalayaLogo({
  size = 'md',
  showWordmark = true,
  subtitle,
  className = '',
}: AtalayaLogoProps) {
  const s = sizes[size]

  return (
    <div className={`flex items-center gap-3 ${className}`}>
      <AtalayaMark size={s.icon} />
      {showWordmark && (
        <div className="min-w-0">
          <p className={`font-semibold leading-tight tracking-tight text-gray-900 ${s.word}`}>
            Atalaya
          </p>
          {subtitle && (
            <p className={`leading-snug text-gray-500 ${s.sub}`}>{subtitle}</p>
          )}
        </div>
      )}
    </div>
  )
}
