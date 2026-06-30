import { useNavigate } from 'react-router-dom'
import { AtalayaLogo } from '../components/brand/AtalayaLogo'
import { ScreenInfoButton } from '../components/ui/ScreenInfoButton'

export function Login() {
  const navigate = useNavigate()

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    navigate('/tablero')
  }

  return (
    <div className="flex min-h-screen min-h-[100dvh] items-center justify-center bg-surface p-4 sm:p-6">
      <div className="card-base relative w-full max-w-sm p-6 sm:p-8">
        <div className="absolute right-3 top-3 sm:right-4 sm:top-4">
          <ScreenInfoButton pathname="/login" compact />
        </div>

        <header className="mb-6 flex flex-col items-center pt-8 sm:mb-8 sm:pt-6">
          <AtalayaLogo size="lg" subtitle="Delegación central" />
        </header>

        <form onSubmit={handleSubmit} className="space-y-4 sm:space-y-5">
          <div className="space-y-1.5">
            <label htmlFor="usuario" className="block text-sm font-medium text-gray-700">
              Usuario
            </label>
            <input
              id="usuario"
              type="text"
              autoComplete="username"
              placeholder="nombre.apellido"
              className="w-full rounded-xl border border-border bg-white px-3 py-3 text-base text-gray-900 placeholder:text-gray-400 focus:border-accent focus:outline-none focus:ring-2 focus:ring-accent/20 sm:py-2.5 sm:text-sm"
            />
          </div>

          <div className="space-y-1.5">
            <label htmlFor="contrasena" className="block text-sm font-medium text-gray-700">
              Contraseña
            </label>
            <input
              id="contrasena"
              type="password"
              autoComplete="current-password"
              placeholder="••••••••"
              className="w-full rounded-xl border border-border bg-white px-3 py-3 text-base text-gray-900 placeholder:text-gray-400 focus:border-accent focus:outline-none focus:ring-2 focus:ring-accent/20 sm:py-2.5 sm:text-sm"
            />
          </div>

          <button
            type="submit"
            className="mt-2 w-full rounded-xl bg-accent px-4 py-3 text-sm font-medium text-white transition-colors hover:bg-accent/90 sm:py-2.5"
          >
            Ingresar
          </button>
        </form>
      </div>
    </div>
  )
}
