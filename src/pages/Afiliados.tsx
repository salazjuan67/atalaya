import { useMemo, useState } from 'react'
import { Search } from 'lucide-react'
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
      <div className="relative">
        <Search
          className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400"
          strokeWidth={1.75}
        />
        <input
          type="search"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Buscar por nombre, documento o empresa…"
          className="w-full rounded-xl border border-border bg-card py-2.5 pl-10 pr-4 text-sm text-gray-900 placeholder:text-gray-400 focus:border-accent focus:outline-none focus:ring-1 focus:ring-accent"
        />
      </div>

      <p className="text-sm text-gray-500">
        {filtered.length} {filtered.length === 1 ? 'afiliado' : 'afiliados'}
        {query.trim() ? ' encontrados' : ''}
      </p>

      <div className="overflow-hidden rounded-xl border border-border bg-card">
        <div className="overflow-x-auto">
          <table className="w-full min-w-[640px] text-left text-sm">
            <thead>
              <tr className="border-b border-border bg-surface">
                <th className="px-5 py-3 font-medium text-gray-500">Nombre</th>
                <th className="px-5 py-3 font-medium text-gray-500">Documento</th>
                <th className="px-5 py-3 font-medium text-gray-500">Empresa</th>
                <th className="px-5 py-3 font-medium text-gray-500">Fecha de alta</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border">
              {filtered.length > 0 ? (
                filtered.map((a) => {
                  const empresa = getEmpresa(a.empresaId)
                  return (
                    <tr key={a.id} className="hover:bg-gray-50">
                      <td className="px-5 py-3.5 font-medium text-gray-900">{a.nombre}</td>
                      <td className="px-5 py-3.5 text-gray-600">{a.documento}</td>
                      <td className="px-5 py-3.5 text-gray-600">
                        {empresa?.razonSocial ?? '—'}
                      </td>
                      <td className="px-5 py-3.5 text-gray-600">{formatFecha(a.fechaAlta)}</td>
                    </tr>
                  )
                })
              ) : (
                <tr>
                  <td colSpan={4} className="px-5 py-8 text-center text-gray-500">
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
