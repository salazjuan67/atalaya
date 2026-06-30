import { useMemo, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Building2, CheckCircle2 } from 'lucide-react'
import { Badge } from '../components/ui/Badge'
import { IconBox } from '../components/ui/IconBox'
import { SearchInput } from '../components/ui/SearchInput'
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
      className="card-base w-full p-5 text-left transition-all hover:border-accent/20 hover:shadow-md"
    >
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex min-w-0 flex-1 items-start gap-3">
          <IconBox icon={Building2} variant="neutral" size="sm" />
          <div className="min-w-0">
            <h3 className="truncate text-sm font-semibold text-gray-900">{empresa.razonSocial}</h3>
            <p className="mt-1 text-sm text-gray-500">
              {empresa.cuit} · {empresa.rubro}
            </p>
            <p className="mt-0.5 text-sm text-gray-400">{empresa.cantTrabajadores} trabajadores</p>
          </div>
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
      <SearchInput
        value={query}
        onChange={setQuery}
        placeholder="Buscar por razón social o CUIT…"
      />

      <p className="text-sm text-gray-500">
        {filtered.length} {filtered.length === 1 ? 'empresa' : 'empresas'}
        {query.trim() ? ' encontradas' : ''}
      </p>

      {filtered.length > 0 ? (
        <div className="space-y-3">
          {filtered.map((empresa) => (
            <EmpresaRow key={empresa.id} empresa={empresa} />
          ))}
        </div>
      ) : (
        <div className="card-base p-8 text-center">
          <p className="text-sm text-gray-500">No se encontraron empresas con ese criterio.</p>
        </div>
      )}
    </div>
  )
}
