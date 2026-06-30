import { NavLink, Outlet, useLocation } from 'react-router-dom'
import {
  Building2,
  ClipboardPlus,
  GraduationCap,
  LayoutDashboard,
  Users,
} from 'lucide-react'
import { AtalayaLogo } from '../brand/AtalayaLogo'

const navItems = [
  { to: '/tablero', label: 'Tablero', icon: LayoutDashboard },
  { to: '/empresas', label: 'Empresas', icon: Building2 },
  { to: '/cargar-visita', label: 'Cargar visita', icon: ClipboardPlus },
  { to: '/afiliados', label: 'Afiliados', icon: Users },
  { to: '/cursos', label: 'Cursos', icon: GraduationCap },
] as const

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

export function AppShell() {
  const { pathname } = useLocation()
  const title = getPageTitle(pathname)

  return (
    <div className="flex min-h-screen bg-surface">
      <aside className="fixed flex h-screen w-60 flex-col border-r border-border bg-card">
        <div className="border-b border-border px-5 py-5">
          <AtalayaLogo size="sm" subtitle="Delegación central" />
        </div>

        <nav className="flex flex-1 flex-col gap-1 p-3">
          {navItems.map(({ to, label, icon: Icon }) => (
            <NavLink
              key={to}
              to={to}
              end={to !== '/empresas'}
              className={({ isActive }) =>
                [
                  'flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition-colors',
                  isActive
                    ? 'border-l-2 border-accent bg-accent/10 text-accent'
                    : 'border-l-2 border-transparent text-gray-600 hover:bg-gray-50',
                ].join(' ')
              }
            >
              <Icon className="h-4 w-4 shrink-0" strokeWidth={1.75} />
              {label}
            </NavLink>
          ))}
        </nav>
      </aside>

      <div className="ml-60 flex min-h-screen flex-1 flex-col">
        <header className="flex items-center justify-between border-b border-border bg-card px-6 py-4">
          <h1 className="text-base font-medium text-gray-900">{title}</h1>
          <div className="flex items-center gap-3">
            <span className="text-sm text-gray-600">C. Ramírez</span>
            <div className="flex h-8 w-8 items-center justify-center rounded-full bg-accent/10 text-xs font-medium text-accent">
              CR
            </div>
          </div>
        </header>

        <main className="flex-1 p-6">
          <Outlet />
        </main>
      </div>
    </div>
  )
}
