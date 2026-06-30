import { Calendar, GraduationCap, Users } from 'lucide-react'
import { getCursos } from '../data/mock'
import { formatFecha } from '../lib/date'

export function Cursos() {
  const cursos = getCursos().sort((a, b) => a.fecha.localeCompare(b.fecha))

  return (
    <div className="space-y-6">
      <p className="text-sm text-gray-500">
        {cursos.length} {cursos.length === 1 ? 'curso' : 'cursos'} programados
      </p>

      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
        {cursos.map((curso) => (
          <div
            key={curso.id}
            className="rounded-xl border border-border bg-card p-5"
          >
            <div className="mb-4 flex h-9 w-9 items-center justify-center rounded-lg bg-accent/10">
              <GraduationCap className="h-4 w-4 text-accent" strokeWidth={1.75} />
            </div>
            <h3 className="text-sm font-semibold text-gray-900">{curso.nombre}</h3>
            <div className="mt-3 space-y-1.5">
              <p className="flex items-center gap-2 text-sm text-gray-500">
                <Calendar className="h-3.5 w-3.5 shrink-0" strokeWidth={1.75} />
                {formatFecha(curso.fecha)}
              </p>
              <p className="flex items-center gap-2 text-sm text-gray-500">
                <Users className="h-3.5 w-3.5 shrink-0" strokeWidth={1.75} />
                {curso.inscriptos} {curso.inscriptos === 1 ? 'inscripto' : 'inscriptos'}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
