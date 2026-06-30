import { useMemo, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { CheckCircle2, Search } from 'lucide-react'
import { Badge } from '../components/ui/Badge'
import { getEmpresas, type Empresa } from '../data/mock'
import { daysSince, formatHaceDias } from '../lib/date'

function getVisitaVariant(days: number): 'done' | 'prog' | 'open' {
  if (days <= 30) return 'done'
  if (days <= 60) return 'prog'
  return 'open'
}

function sortEmpresas(list: Empresa[]): Empresa[] {
  return [...list].sort((a, b) => {
    const urgencyA = a.problemasAbiertos + a.casosArtAbiertos
    const urgencyB = b.problemasAbiertos + b.casosArtAbiertos
    if (urgencyB !== urgencyA) return urgencyB - urgencyA
    return a.razonSocial.localeCompare(b.razonSocial, 'es')
  })
}

function EmpresaRow({ empresa }: { empresa: Empresa }) {
  const navigate = useNavigate()
  const diasVisita = daysSince(empresa.ultimaVisita)
  const alDia = empresa.problemasAbiertos === 0 && empresa.casosArtAbiertos === 0

  return (
    <button
      type="button"
      onClick={() => navigate(`/empresas/${empresa.id}`)}
      className="w-full rounded-xl border border-border bg-card p-5 text-left transition-colors hover:bg-gray-50"
    >
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div className="min-w-0 flex-1">
          <h3 className="truncate text-sm font-semibold text-gray-900">
            {empresa.razonSocial}
          </h3>
          <p className="mt-1 text-sm text-gray-500">
            {empresa.cuit} · {empresa.rubro}
          </p>
          <p className="mt-0.5 text-sm text-gray-400">
            {empresa.cantTrabajadores} trabajadores
          </p>
        </div>

        <div className="flex shrink-0 flex-wrap items-center gap-2 sm:justify-end">
          <Badge variant={getVisitaVariant(diasVisita)}>
            Última visita: {formatHaceDias(diasVisita)}
          </Badge>

          {empresa.problemasAbiertos > 0 && (
            <Badge variant="open">
              {empresa.problemasAbiertos}{' '}
              {empresa.problemasAbiertos === 1 ? 'problema' : 'problemas'}
            </Badge>
          )}

          {empresa.casosArtAbiertos > 0 && (
            <Badge variant="prog">
              {empresa.casosArtAbiertos}{' '}
              {empresa.casosArtAbiertos === 1 ? 'caso ART' : 'casos ART'}
            </Badge>
          )}

          {alDia && (
            <span className="inline-flex items-center gap-1.5 text-xs font-medium text-status-done">
              <CheckCircle2 className="h-3.5 w-3.5" strokeWidth={2} />
              Al día
            </span>
          )}
        </div>
      </div>
    </button>
  )
}

export function Empresas() {
  const [query, setQuery] = useState('')

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase()
    const list = q
      ? getEmpresas().filter(
          (e) =>
            e.razonSocial.toLowerCase().includes(q) ||
            e.cuit.replace(/-/g, '').includes(q.replace(/-/g, '')),
        )
      : getEmpresas()
    return sortEmpresas(list)
  }, [query])

  return (
    <div className="space-y-6">
      <div className="relative">
        <Search
          className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400"
          strokeWidth={1.75}
        />
        <input
          type="search"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Buscar por razón social o CUIT…"
          className="w-full rounded-xl border border-border bg-card py-2.5 pl-10 pr-4 text-sm text-gray-900 placeholder:text-gray-400 focus:border-accent focus:outline-none focus:ring-1 focus:ring-accent"
        />
      </div>

      <p className="text-sm text-gray-500">
        {filtered.length}{' '}
        {filtered.length === 1 ? 'empresa' : 'empresas'}
        {query.trim() ? ' encontradas' : ''}
      </p>

      {filtered.length > 0 ? (
        <div className="space-y-3">
          {filtered.map((empresa) => (
            <EmpresaRow key={empresa.id} empresa={empresa} />
          ))}
        </div>
      ) : (
        <div className="rounded-xl border border-border bg-card p-8 text-center">
          <p className="text-sm text-gray-500">No se encontraron empresas con ese criterio.</p>
        </div>
      )}
    </div>
  )
}
