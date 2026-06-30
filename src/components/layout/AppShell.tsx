import { NavLink, Outlet, useLocation } from 'react-router-dom'
import {
  Building2,
  ClipboardPlus,
  GraduationCap,
  LayoutGrid,
  Users,
} from 'lucide-react'
import { AtalayaLogo } from '../brand/AtalayaLogo'
import { IconBox } from '../ui/IconBox'
import { ScreenInfoButton } from '../ui/ScreenInfoButton'
import { getScreenSubtitle } from '../../content/screenInfo'

const navItems = [
  { to: '/tablero', label: 'Tablero', shortLabel: 'Tablero', icon: LayoutGrid, variant: 'accent' as const },
  { to: '/empresas', label: 'Empresas', shortLabel: 'Empresas', icon: Building2, variant: 'neutral' as const },
  { to: '/cargar-visita', label: 'Cargar visita', shortLabel: 'Visita', icon: ClipboardPlus, variant: 'prog' as const },
  { to: '/afiliados', label: 'Afiliados', shortLabel: 'Afiliados', icon: Users, variant: 'done' as const },
  { to: '/cursos', label: 'Cursos', shortLabel: 'Cursos', icon: GraduationCap, variant: 'accent' as const },
]

const routeTitles: Record<string, string> = {
  '/tablero': 'Tablero',
  '/empresas': 'Empresas',
  '/cargar-visita': 'Cargar visita',
  '/afiliados': 'Afiliados',
  '/cursos': 'Cursos',
}

function getPageTitle(pathname: string): string {
  if (pathname.startsWith('/empresas/')) {
    return 'Empresa 360'
  }
  return routeTitles[pathname] ?? 'Atalaya'
}

function NavItem({
  to,
  label,
  shortLabel,
  icon,
  variant,
  mobile = false,
}: {
  to: string
  label: string
  shortLabel: string
  icon: typeof LayoutGrid
  variant: 'accent' | 'neutral' | 'prog' | 'done'
  mobile?: boolean
}) {
  return (
    <NavLink
      to={to}
      end={to !== '/empresas'}
      className={({ isActive }) =>
        mobile
          ? [
              'flex min-w-0 flex-1 flex-col items-center gap-1 rounded-xl px-1 py-2 text-[10px] font-medium transition-all',
              isActive ? 'text-accent' : 'text-gray-500',
            ].join(' ')
          : [
              'flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium transition-all',
              isActive
                ? 'bg-accent-soft text-accent shadow-sm'
                : 'text-gray-600 hover:bg-surface-muted',
            ].join(' ')
      }
    >
      {({ isActive }) =>
        mobile ? (
          <>
            <IconBox icon={icon} variant={isActive ? 'accent' : 'neutral'} size="sm" />
            <span className="truncate">{shortLabel}</span>
          </>
        ) : (
          <>
            <IconBox icon={icon} variant={isActive ? 'accent' : variant} size="sm" />
            {label}
          </>
        )
      }
    </NavLink>
  )
}

export function AppShell() {
  const { pathname } = useLocation()
  const title = getPageTitle(pathname)
  const subtitle = getScreenSubtitle(pathname)

  return (
    <div className="flex min-h-screen bg-surface">
      {/* Sidebar — desktop */}
      <aside className="fixed hidden h-screen w-64 flex-col border-r border-border bg-card shadow-sm lg:flex">
        <div className="border-b border-border px-5 py-5">
          <AtalayaLogo size="sm" subtitle="Delegación central" />
        </div>
        <nav className="flex flex-1 flex-col gap-1 p-3">
          {navItems.map((item) => (
            <NavItem key={item.to} {...item} />
          ))}
        </nav>
      </aside>

      <div className="flex min-h-screen flex-1 flex-col lg:ml-64">
        {/* Header */}
        <header className="sticky top-0 z-40 border-b border-border bg-card/95 px-4 py-3 shadow-sm backdrop-blur-sm sm:px-6 sm:py-4">
          <div className="flex items-start justify-between gap-3">
            <div className="flex min-w-0 items-start gap-3">
              <div className="shrink-0 lg:hidden">
                <AtalayaLogo size="sm" showWordmark={false} />
              </div>
              <div className="min-w-0">
                <h1 className="truncate text-base font-semibold tracking-tight text-gray-900">
                  {title}
                </h1>
                {subtitle && (
                  <p className="mt-0.5 truncate text-xs text-gray-500 sm:text-sm">{subtitle}</p>
                )}
              </div>
            </div>
            <div className="flex shrink-0 items-center gap-2 sm:gap-3">
              <ScreenInfoButton pathname={pathname} compact className="sm:hidden" />
              <ScreenInfoButton pathname={pathname} className="hidden sm:inline-flex" />
              <div className="flex h-9 w-9 items-center justify-center rounded-full bg-accent-soft text-xs font-semibold text-accent ring-2 ring-accent/10">
                CR
              </div>
            </div>
          </div>
        </header>

        <main className="flex-1 px-4 py-4 pb-24 sm:px-6 sm:py-6 lg:pb-6">
          <Outlet />
        </main>

        {/* Bottom nav — mobile */}
        <nav className="fixed bottom-0 left-0 right-0 z-40 border-t border-border bg-card/95 px-2 pb-[env(safe-area-inset-bottom)] pt-1 shadow-[0_-1px_3px_rgb(0_0_0/0.04)] backdrop-blur-sm lg:hidden">
          <div className="flex items-stretch justify-around gap-0.5">
            {navItems.map((item) => (
              <NavItem key={item.to} {...item} mobile />
            ))}
          </div>
        </nav>
      </div>
    </div>
  )
}
