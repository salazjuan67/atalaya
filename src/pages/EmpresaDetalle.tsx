import { useState } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom'
import {
  Camera,
  CheckSquare,
  ClipboardPlus,
  Lock,
  X,
} from 'lucide-react'
import { Badge } from '../components/ui/Badge'
import {
  getCasosArtByEmpresa,
  getEmpresa,
  getIndicadoresByEmpresa,
  getProblemasAbiertosByEmpresa,
  getTramitesByEmpresa,
  getVisitasByEmpresa,
  type CasoArt,
  type Problema,
  type ProblemaEstado,
  type TramiteMinisterio,
  type Visita,
} from '../data/mock'
import { daysSince, formatFecha, formatHaceDias } from '../lib/date'

function problemaEstadoBadge(estado: ProblemaEstado) {
  const map = {
    abierto: { variant: 'open' as const, label: 'Abierto' },
    en_proceso: { variant: 'prog' as const, label: 'En proceso' },
    resuelto: { variant: 'done' as const, label: 'Resuelto' },
  }
  const { variant, label } = map[estado]
  return <Badge variant={variant}>{label}</Badge>
}

function StatCard({
  label,
  value,
  valueClassName = 'text-gray-900',
}: {
  label: string
  value: string | number
  valueClassName?: string
}) {
  return (
    <div className="rounded-xl border border-border bg-card p-5">
      <p className="text-sm text-gray-500">{label}</p>
      <p className={`mt-1 text-3xl font-semibold tabular-nums ${valueClassName}`}>{value}</p>
    </div>
  )
}

function SectionCard({
  title,
  actionLabel,
  onAction,
  children,
}: {
  title: string
  actionLabel?: string
  onAction?: () => void
  children: React.ReactNode
}) {
  return (
    <div className="rounded-xl border border-border bg-card p-6">
      <div className="mb-4 flex items-center justify-between gap-3">
        <h2 className="text-sm font-medium text-gray-700">{title}</h2>
        {actionLabel && onAction && (
          <button
            type="button"
            onClick={onAction}
            className="shrink-0 text-sm font-medium text-accent hover:text-accent/80"
          >
            {actionLabel}
          </button>
        )}
      </div>
      {children}
    </div>
  )
}

function ProblemaItem({ problema }: { problema: Problema }) {
  return (
    <div className="border-b border-border py-3 last:border-0 last:pb-0 first:pt-0">
      <div className="flex items-start justify-between gap-3">
        <div className="min-w-0 flex-1">
          <p className="text-sm text-gray-900">{problema.descripcion}</p>
          <p className="mt-1 text-xs text-gray-500">
            {problema.tipo} · {formatFecha(problema.fecha)}
          </p>
        </div>
        {problemaEstadoBadge(problema.estado)}
      </div>
    </div>
  )
}

function CasoArtItem({ caso }: { caso: CasoArt }) {
  return (
    <div className="border-b border-border py-3 last:border-0 last:pb-0 first:pt-0">
      <div className="flex items-start justify-between gap-3">
        <div className="min-w-0 flex-1">
          <p className="text-sm text-gray-900">
            {caso.descripcion} — {caso.afiliado}
          </p>
          <p className="mt-1 text-xs text-gray-500">{formatFecha(caso.fecha)}</p>
        </div>
        <Badge variant={caso.estado === 'en_seguimiento' ? 'prog' : 'done'}>
          {caso.estado === 'en_seguimiento' ? 'En seguimiento' : 'Cerrado'}
        </Badge>
      </div>
    </div>
  )
}

function TramiteItem({ tramite }: { tramite: TramiteMinisterio }) {
  return (
    <div className="border-b border-border py-3 last:border-0 last:pb-0 first:pt-0">
      <div className="flex items-start justify-between gap-3">
        <div className="min-w-0 flex-1">
          <p className="text-sm text-gray-900">
            {tramite.descripcion} — {tramite.afiliado}
          </p>
        </div>
        <Badge variant={tramite.estado === 'en_seguimiento' ? 'prog' : 'done'}>
          {tramite.estado === 'en_seguimiento' ? 'En seguimiento' : 'Cerrado'}
        </Badge>
      </div>
    </div>
  )
}

function VisitaRow({ visita }: { visita: Visita }) {
  const isChecklist = visita.origen === 'checklist'

  return (
    <div className="flex flex-col gap-2 border-b border-border py-4 last:border-0 last:pb-0 first:pt-0 sm:flex-row sm:items-start sm:justify-between">
      <div className="min-w-0 flex-1">
        <div className="flex flex-wrap items-center gap-2">
          <span className="text-sm font-medium text-gray-900">{formatFecha(visita.fecha)}</span>
          <span className="inline-flex items-center gap-1 rounded-full bg-gray-100 px-2.5 py-0.5 text-xs font-medium text-gray-600">
            {isChecklist ? (
              <CheckSquare className="h-3 w-3" strokeWidth={2} />
            ) : (
              <Camera className="h-3 w-3" strokeWidth={2} />
            )}
            {isChecklist ? 'Checklist' : 'Foto / OCR'}
          </span>
        </div>
        <p className="mt-1.5 text-sm text-gray-600">{visita.observaciones}</p>
      </div>
      <p className="shrink-0 text-xs text-gray-500 sm:pt-0.5">{visita.visitador}</p>
    </div>
  )
}

function PlaceholderModal({ title, onClose }: { title: string; onClose: () => void }) {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/20 p-4">
      <div className="w-full max-w-md rounded-xl border border-border bg-card p-6">
        <div className="mb-4 flex items-center justify-between">
          <h3 className="text-sm font-medium text-gray-900">{title}</h3>
          <button
            type="button"
            onClick={onClose}
            className="rounded-lg p-1 text-gray-400 hover:bg-gray-50 hover:text-gray-600"
            aria-label="Cerrar"
          >
            <X className="h-4 w-4" strokeWidth={2} />
          </button>
        </div>
        <p className="text-sm text-gray-500">Contenido próximo.</p>
        <button
          type="button"
          onClick={onClose}
          className="mt-6 w-full rounded-lg border border-border px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50"
        >
          Cerrar
        </button>
      </div>
    </div>
  )
}

function EmptyState({ message }: { message: string }) {
  return <p className="text-sm text-gray-500">{message}</p>
}

export function EmpresaDetalle() {
  const { id } = useParams<{ id: string }>()
  const navigate = useNavigate()
  const [modal, setModal] = useState<string | null>(null)

  const empresa = id ? getEmpresa(id) : undefined

  if (!empresa) {
    return (
      <div className="rounded-xl border border-border bg-card p-8 text-center">
        <p className="text-sm text-gray-500">No se encontró la empresa.</p>
        <Link to="/empresas" className="mt-4 inline-block text-sm font-medium text-accent">
          Volver al listado
        </Link>
      </div>
    )
  }

  const diasVisita = daysSince(empresa.ultimaVisita)
  const problemasAbiertos = getProblemasAbiertosByEmpresa(empresa.id)
  const casosArt = getCasosArtByEmpresa(empresa.id)
  const tramites = getTramitesByEmpresa(empresa.id)
  const indicadores = getIndicadoresByEmpresa(empresa.id)
  const visitas = getVisitasByEmpresa(empresa.id)

  return (
    <div className="space-y-6">
      {/* Cabecera */}
      <div className="flex flex-col gap-4 rounded-xl border border-border bg-card p-6 sm:flex-row sm:items-start sm:justify-between">
        <div className="min-w-0 flex-1">
          <h1 className="text-xl font-semibold text-gray-900">{empresa.razonSocial}</h1>
          <p className="mt-2 text-sm text-gray-500">
            {empresa.cuit} · {empresa.rubro} · Delegación central · {empresa.telefono} ·{' '}
            {empresa.direccion}
          </p>
        </div>

        <div className="flex shrink-0 flex-col items-start gap-3 sm:items-end">
          <Badge variant="prog">Última visita {formatHaceDias(diasVisita)}</Badge>
          <button
            type="button"
            onClick={() => navigate(`/cargar-visita?empresa=${empresa.id}`)}
            className="inline-flex items-center gap-2 rounded-lg bg-accent px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-accent/90"
          >
            <ClipboardPlus className="h-4 w-4" strokeWidth={2} />
            Cargar visita
          </button>
        </div>
      </div>

      {/* Indicadores */}
      <div className="grid grid-cols-2 gap-4 lg:grid-cols-4">
        <StatCard label="Última visita (días)" value={diasVisita} valueClassName="text-gray-900" />
        <StatCard
          label="Problemas abiertos"
          value={empresa.problemasAbiertos}
          valueClassName="text-status-open"
        />
        <StatCard
          label="Casos ART abiertos"
          value={empresa.casosArtAbiertos}
          valueClassName="text-status-prog"
        />
        <StatCard label="Afiliados" value={empresa.afiliados} />
      </div>

      {/* Grilla 2 columnas */}
      <div className="grid gap-6 lg:grid-cols-2">
        <SectionCard
          title="Problemas abiertos"
          actionLabel="Ver todos"
          onAction={() => setModal('Problemas abiertos')}
        >
          {problemasAbiertos.length > 0 ? (
            problemasAbiertos.map((p) => <ProblemaItem key={p.id} problema={p} />)
          ) : (
            <EmptyState message="Sin problemas abiertos." />
          )}
        </SectionCard>

        <SectionCard
          title="Casos ART"
          actionLabel="Ver seguimiento"
          onAction={() => setModal('Seguimiento de casos ART')}
        >
          {casosArt.length > 0 ? (
            casosArt.map((c) => <CasoArtItem key={c.id} caso={c} />)
          ) : (
            <EmptyState message="Sin casos ART registrados." />
          )}
        </SectionCard>

        <SectionCard title="Trámites de ministerio">
          <p className="mb-4 flex items-center gap-1.5 text-xs text-gray-400">
            <Lock className="h-3 w-3" strokeWidth={2} />
            Uso interno — no visible para la empresa
          </p>
          {tramites.length > 0 ? (
            tramites.map((t) => <TramiteItem key={t.id} tramite={t} />)
          ) : (
            <EmptyState message="Sin trámites registrados." />
          )}
        </SectionCard>

        <SectionCard title="Indicadores del mes">
          {indicadores ? (
            <dl className="grid grid-cols-2 gap-x-4 gap-y-4">
              <div>
                <dt className="text-xs text-gray-500">Afiliaciones nuevas</dt>
                <dd className="mt-0.5 text-lg font-semibold tabular-nums text-gray-900">
                  {indicadores.afiliacionesNuevas}
                </dd>
              </div>
              <div>
                <dt className="text-xs text-gray-500">Obra social atendidos</dt>
                <dd className="mt-0.5 text-lg font-semibold tabular-nums text-gray-900">
                  {indicadores.osAtendidos}
                </dd>
              </div>
              <div>
                <dt className="text-xs text-gray-500">Obra social ausentes</dt>
                <dd className="mt-0.5 text-lg font-semibold tabular-nums text-gray-900">
                  {indicadores.osAusentes}
                </dd>
              </div>
              <div>
                <dt className="text-xs text-gray-500">Beneficios de turismo</dt>
                <dd className="mt-0.5 text-lg font-semibold tabular-nums text-gray-900">
                  {indicadores.beneficiosTurismo}
                </dd>
              </div>
              <div className="col-span-2">
                <dt className="text-xs text-gray-500">Inscriptos a cursos</dt>
                <dd className="mt-0.5 text-lg font-semibold tabular-nums text-gray-900">
                  {indicadores.inscriptosCursos}
                </dd>
              </div>
            </dl>
          ) : (
            <EmptyState message="Sin indicadores del mes." />
          )}
        </SectionCard>
      </div>

      {/* Historial de visitas */}
      <div className="rounded-xl border border-border bg-card p-6">
        <h2 className="mb-4 text-sm font-medium text-gray-700">Historial de visitas</h2>
        {visitas.length > 0 ? (
          visitas.map((v) => <VisitaRow key={v.id} visita={v} />)
        ) : (
          <EmptyState message="Sin visitas registradas." />
        )}
      </div>

      {modal && <PlaceholderModal title={modal} onClose={() => setModal(null)} />}
    </div>
  )
}
