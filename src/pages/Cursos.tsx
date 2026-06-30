import { Calendar, GraduationCap, Users } from 'lucide-react'
import { IconBox } from '../components/ui/IconBox'
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
            className="card-base p-5 transition-all hover:border-accent/20 hover:shadow-md"
          >
            <IconBox icon={GraduationCap} variant="accent" size="md" className="mb-4" />
            <h3 className="text-sm font-semibold leading-snug text-gray-900">{curso.nombre}</h3>
            <div className="mt-4 space-y-2">
              <p className="flex items-center gap-2.5 text-sm text-gray-500">
                <Calendar className="h-4 w-4 shrink-0 text-gray-400" strokeWidth={1.75} />
                {formatFecha(curso.fecha)}
              </p>
              <p className="flex items-center gap-2.5 text-sm text-gray-500">
                <Users className="h-4 w-4 shrink-0 text-gray-400" strokeWidth={1.75} />
                {curso.inscriptos} {curso.inscriptos === 1 ? 'inscripto' : 'inscriptos'}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
