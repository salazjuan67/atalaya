import { useNavigate } from 'react-router-dom'
import { AtalayaLogo } from '../components/brand/AtalayaLogo'

export function Login() {
  const navigate = useNavigate()

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    navigate('/tablero')
  }

  return (
    <div className="flex min-h-screen items-center justify-center bg-surface p-6">
      <div className="w-full max-w-sm rounded-xl border border-border bg-card p-8">
        <header className="mb-8 flex flex-col items-center">
          <AtalayaLogo size="lg" subtitle="Delegación central" />
        </header>

        <form onSubmit={handleSubmit} className="space-y-5">
          <div className="space-y-1.5">
            <label htmlFor="usuario" className="block text-sm font-medium text-gray-700">
              Usuario
            </label>
            <input
              id="usuario"
              type="text"
              autoComplete="username"
              placeholder="nombre.apellido"
              className="w-full rounded-lg border border-border bg-white px-3 py-2.5 text-sm text-gray-900 placeholder:text-gray-400 focus:border-accent focus:outline-none focus:ring-1 focus:ring-accent"
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
              className="w-full rounded-lg border border-border bg-white px-3 py-2.5 text-sm text-gray-900 placeholder:text-gray-400 focus:border-accent focus:outline-none focus:ring-1 focus:ring-accent"
            />
          </div>

          <button
            type="submit"
            className="mt-2 w-full rounded-lg bg-accent px-4 py-2.5 text-sm font-medium text-white transition-colors hover:bg-accent/90"
          >
            Ingresar
          </button>
        </form>
      </div>
    </div>
  )
}
