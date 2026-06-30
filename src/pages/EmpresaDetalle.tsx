import { useState } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom'
import type { LucideIcon } from 'lucide-react'
import {
  AlertTriangle,
  BarChart3,
  Binoculars,
  CalendarDays,
  Camera,
  CheckSquare,
  ClipboardPlus,
  History,
  Lock,
  ShieldAlert,
  Users,
  X,
} from 'lucide-react'
import { Badge } from '../components/ui/Badge'
import { IconBox, type IconBoxVariant } from '../components/ui/IconBox'
import { StatCard } from '../components/ui/StatCard'
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

function SectionCard({
  title,
  icon,
  iconVariant = 'neutral',
  actionLabel,
  onAction,
  children,
}: {
  title: string
  icon: LucideIcon
  iconVariant?: IconBoxVariant
  actionLabel?: string
  onAction?: () => void
  children: React.ReactNode
}) {
  return (
    <div className="card-base p-4 sm:p-6">
      <div className="mb-4 flex flex-col gap-3 sm:mb-5 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex items-center gap-3">
          <IconBox icon={icon} variant={iconVariant} size="sm" />
          <h2 className="text-base font-semibold tracking-tight text-gray-800">{title}</h2>
        </div>
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
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/25 p-4 backdrop-blur-[2px]">
      <div className="card-base w-full max-w-md p-6">
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
      <div className="card-base p-8 text-center">
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
      <div className="card-base flex flex-col gap-4 p-4 sm:flex-row sm:items-start sm:justify-between sm:p-6">
        <div className="flex min-w-0 flex-1 items-start gap-3 sm:gap-4">
          <IconBox icon={Binoculars} variant="accent" size="md" className="hidden sm:flex" />
          <div className="min-w-0">
            <h1 className="text-lg font-semibold tracking-tight text-gray-900 sm:text-xl">
              {empresa.razonSocial}
            </h1>
            <p className="mt-2 text-xs leading-relaxed text-gray-500 sm:text-sm">
              <span className="block sm:inline">{empresa.cuit} · {empresa.rubro}</span>
              <span className="hidden sm:inline"> · Delegación central · </span>
              <span className="block sm:inline">{empresa.telefono}</span>
              <span className="block sm:inline sm:before:content-['·_']">{empresa.direccion}</span>
            </p>
          </div>
        </div>

        <div className="flex w-full shrink-0 flex-col gap-3 sm:w-auto sm:items-end">
          <Badge variant="prog">Última visita {formatHaceDias(diasVisita)}</Badge>
          <button
            type="button"
            onClick={() => navigate(`/cargar-visita?empresa=${empresa.id}`)}
            className="inline-flex w-full items-center justify-center gap-2 rounded-xl bg-accent px-5 py-3 text-sm font-medium text-white shadow-sm transition-colors hover:bg-accent/90 sm:w-auto sm:py-2.5"
          >
            <ClipboardPlus className="h-4 w-4" strokeWidth={2} />
            Cargar visita
          </button>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-3 sm:gap-4 lg:grid-cols-4">
        <StatCard label="Última visita (días)" value={diasVisita} icon={CalendarDays} />
        <StatCard
          label="Problemas abiertos"
          value={empresa.problemasAbiertos}
          icon={AlertTriangle}
          iconVariant="open"
          valueClassName="text-status-open"
        />
        <StatCard
          label="Casos ART abiertos"
          value={empresa.casosArtAbiertos}
          icon={ShieldAlert}
          iconVariant="prog"
          valueClassName="text-status-prog"
        />
        <StatCard label="Afiliados" value={empresa.afiliados} icon={Users} iconVariant="done" />
      </div>

      {/* Grilla 2 columnas */}
      <div className="grid gap-6 lg:grid-cols-2">
        <SectionCard
          title="Problemas abiertos"
          icon={AlertTriangle}
          iconVariant="open"
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
          icon={ShieldAlert}
          iconVariant="prog"
          actionLabel="Ver seguimiento"
          onAction={() => setModal('Seguimiento de casos ART')}
        >
          {casosArt.length > 0 ? (
            casosArt.map((c) => <CasoArtItem key={c.id} caso={c} />)
          ) : (
            <EmptyState message="Sin casos ART registrados." />
          )}
        </SectionCard>

        <SectionCard title="Trámites de ministerio" icon={Lock} iconVariant="neutral">
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

        <SectionCard title="Indicadores del mes" icon={BarChart3} iconVariant="accent">
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
      <div className="card-base p-6">
        <div className="mb-5 flex items-center gap-3">
          <IconBox icon={History} variant="accent" size="sm" />
          <h2 className="text-base font-semibold tracking-tight text-gray-800">Historial de visitas</h2>
        </div>
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
