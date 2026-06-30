import { useMemo, useState } from 'react'
import { Users } from 'lucide-react'
import { SearchInput } from '../components/ui/SearchInput'
import { getAfiliados, getEmpresa } from '../data/mock'
import { formatFecha } from '../lib/date'

export function Afiliados() {
  const [query, setQuery] = useState('')

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase()
    return getAfiliados().filter((a) => {
      if (!q) return true
      const empresa = getEmpresa(a.empresaId)
      return (
        a.nombre.toLowerCase().includes(q) ||
        a.documento.replace(/\./g, '').includes(q.replace(/\./g, '')) ||
        (empresa?.razonSocial.toLowerCase().includes(q) ?? false)
      )
    })
  }, [query])

  return (
    <div className="space-y-6">
      <SearchInput
        value={query}
        onChange={setQuery}
        placeholder="Buscar por nombre, documento o empresa…"
      />

      <p className="text-sm text-gray-500">
        {filtered.length} {filtered.length === 1 ? 'afiliado' : 'afiliados'}
        {query.trim() ? ' encontrados' : ''}
      </p>

      <div className="card-base overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full min-w-[640px] text-left text-sm">
            <thead>
              <tr className="border-b border-border bg-surface-muted">
                <th className="px-5 py-3.5 text-xs font-semibold uppercase tracking-wide text-gray-500">
                  Nombre
                </th>
                <th className="px-5 py-3.5 text-xs font-semibold uppercase tracking-wide text-gray-500">
                  Documento
                </th>
                <th className="px-5 py-3.5 text-xs font-semibold uppercase tracking-wide text-gray-500">
                  Empresa
                </th>
                <th className="px-5 py-3.5 text-xs font-semibold uppercase tracking-wide text-gray-500">
                  Fecha de alta
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border">
              {filtered.length > 0 ? (
                filtered.map((a) => {
                  const empresa = getEmpresa(a.empresaId)
                  return (
                    <tr key={a.id} className="transition-colors hover:bg-surface-muted">
                      <td className="px-5 py-3.5 font-medium text-gray-900">{a.nombre}</td>
                      <td className="px-5 py-3.5 text-gray-600">{a.documento}</td>
                      <td className="px-5 py-3.5 text-gray-600">{empresa?.razonSocial ?? '—'}</td>
                      <td className="px-5 py-3.5 text-gray-600">{formatFecha(a.fechaAlta)}</td>
                    </tr>
                  )
                })
              ) : (
                <tr>
                  <td colSpan={4} className="px-5 py-10 text-center text-gray-500">
                    <Users className="mx-auto mb-2 h-8 w-8 text-gray-300" strokeWidth={1.5} />
                    No se encontraron afiliados con ese criterio.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}
