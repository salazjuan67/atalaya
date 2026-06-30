import { useState } from 'react'
import { useNavigate, useSearchParams } from 'react-router-dom'
import { Building2, Camera, CheckCircle2, CheckSquare, Upload, X } from 'lucide-react'
import { IconBox } from '../components/ui/IconBox'
import { getEmpresas, type VisitaItemEstado } from '../data/mock'

const CHECKLIST_ITEMS = [
  'Matafuegos vigentes',
  'Salidas de emergencia señalizadas',
  'Elementos de protección personal',
  'Botiquín de primeros auxilios',
  'Cartelería de riesgos visible',
  'Registro de delegados sindicales',
  'Condiciones de higiene en comedor',
  'Cumplimiento de descansos',
  'Documentación de afiliación al día',
] as const

const OCR_EJEMPLO: Record<string, VisitaItemEstado> = {
  'Matafuegos vigentes': 'ok',
  'Salidas de emergencia señalizadas': 'ok',
  'Elementos de protección personal': 'observado',
  'Botiquín de primeros auxilios': 'ok',
  'Cartelería de riesgos visible': 'ok',
  'Registro de delegados sindicales': 'ok',
  'Condiciones de higiene en comedor': 'na',
  'Cumplimiento de descansos': 'ok',
  'Documentación de afiliación al día': 'observado',
}

type Tab = 'checklist' | 'foto'

function ItemEstadoSelector({
  value,
  onChange,
}: {
  value: VisitaItemEstado | undefined
  onChange: (estado: VisitaItemEstado) => void
}) {
  const options: { estado: VisitaItemEstado; label: string; active: string; idle: string }[] = [
    {
      estado: 'ok',
      label: 'OK',
      active: 'border-green-200 bg-green-50 text-status-done',
      idle: 'border-border text-gray-500 hover:bg-gray-50',
    },
    {
      estado: 'observado',
      label: 'Observado',
      active: 'border-amber-200 bg-amber-50 text-status-prog',
      idle: 'border-border text-gray-500 hover:bg-gray-50',
    },
    {
      estado: 'na',
      label: 'N/A',
      active: 'border-gray-300 bg-gray-100 text-status-neutral',
      idle: 'border-border text-gray-500 hover:bg-gray-50',
    },
  ]

  return (
    <div className="grid w-full grid-cols-3 gap-1.5 sm:flex sm:w-auto sm:shrink-0 sm:gap-1.5">
      {options.map(({ estado, label, active, idle }) => (
        <button
          key={estado}
          type="button"
          onClick={() => onChange(estado)}
          className={`rounded-lg border px-2 py-2 text-xs font-medium transition-colors sm:px-2.5 sm:py-1 ${
            value === estado ? active : idle
          }`}
        >
          {label}
        </button>
      ))}
    </div>
  )
}

function ChecklistForm({
  items,
  onChange,
}: {
  items: Record<string, VisitaItemEstado>
  onChange: (item: string, estado: VisitaItemEstado) => void
}) {
  return (
    <ul className="divide-y divide-border">
      {CHECKLIST_ITEMS.map((item) => (
        <li
          key={item}
          className="flex flex-col gap-3 py-3.5 first:pt-0 last:pb-0 sm:flex-row sm:items-center sm:justify-between"
        >
          <span className="text-sm text-gray-900">{item}</span>
          <ItemEstadoSelector
            value={items[item]}
            onChange={(estado) => onChange(item, estado)}
          />
        </li>
      ))}
    </ul>
  )
}

function Toast({ message, onClose }: { message: string; onClose: () => void }) {
  return (
    <div className="fixed bottom-6 left-1/2 z-50 flex -translate-x-1/2 items-center gap-3 rounded-2xl border border-border bg-card px-5 py-3.5 shadow-lg">
      <CheckCircle2 className="h-4 w-4 shrink-0 text-status-done" strokeWidth={2} />
      <p className="text-sm font-medium text-gray-900">{message}</p>
      <button
        type="button"
        onClick={onClose}
        className="ml-1 rounded p-0.5 text-gray-400 hover:text-gray-600"
        aria-label="Cerrar"
      >
        <X className="h-3.5 w-3.5" strokeWidth={2} />
      </button>
    </div>
  )
}

export function CargarVisita() {
  const navigate = useNavigate()
  const [searchParams] = useSearchParams()
  const empresas = getEmpresas()

  const [empresaId, setEmpresaId] = useState(
    () => searchParams.get('empresa') ?? empresas[0]?.id ?? '',
  )
  const [tab, setTab] = useState<Tab>('checklist')
  const [items, setItems] = useState<Record<string, VisitaItemEstado>>({})
  const [ocrDetectado, setOcrDetectado] = useState(false)
  const [archivoNombre, setArchivoNombre] = useState<string | null>(null)
  const [observaciones, setObservaciones] = useState('')
  const [toast, setToast] = useState(false)
  const [dragOver, setDragOver] = useState(false)

  function handleItemChange(item: string, estado: VisitaItemEstado) {
    setItems((prev) => ({ ...prev, [item]: estado }))
  }

  function simularCarga(foto?: string) {
    setArchivoNombre(foto ?? 'hoja_visita_2026.jpg')
    setItems(OCR_EJEMPLO)
    setOcrDetectado(true)
    setObservaciones(
      'Relevamiento automático desde foto. Verificar ítems marcados como observados antes de guardar.',
    )
  }

  function handleDrop(e: React.DragEvent) {
    e.preventDefault()
    setDragOver(false)
    simularCarga(e.dataTransfer.files[0]?.name)
  }

  function handleGuardar() {
    setToast(true)
    setTimeout(() => navigate(`/empresas/${empresaId}`), 1800)
  }

  const tabs: { id: Tab; label: string; icon: typeof CheckSquare }[] = [
    { id: 'checklist', label: 'Checklist', icon: CheckSquare },
    { id: 'foto', label: 'Foto de la hoja', icon: Camera },
  ]

  return (
    <div className="mx-auto max-w-3xl space-y-6">
      {/* Selector de empresa */}
      <div className="card-base p-6">
        <div className="mb-3 flex items-center gap-3">
          <IconBox icon={Building2} variant="neutral" size="sm" />
          <label htmlFor="empresa" className="text-sm font-semibold text-gray-800">
            Empresa
          </label>
        </div>
        <select
          id="empresa"
          value={empresaId}
          onChange={(e) => setEmpresaId(e.target.value)}
          className="w-full rounded-xl border border-border bg-white px-3 py-2.5 text-sm text-gray-900 focus:border-accent focus:outline-none focus:ring-2 focus:ring-accent/20"
        >
          {empresas.map((e) => (
            <option key={e.id} value={e.id}>
              {e.razonSocial} — {e.cuit}
            </option>
          ))}
        </select>
      </div>

      {/* Pestañas de carga */}
      <div className="card-base overflow-hidden">
        <div className="flex flex-col gap-1.5 p-1.5 sm:flex-row">
          {tabs.map(({ id, label, icon }) => (
            <button
              key={id}
              type="button"
              onClick={() => setTab(id)}
              className={`flex flex-1 items-center justify-center gap-2 rounded-xl px-3 py-3 text-sm font-medium transition-all sm:px-4 ${
                tab === id
                  ? 'bg-card text-accent shadow-sm'
                  : 'text-gray-500 hover:text-gray-700'
              }`}
            >
              <IconBox icon={icon} variant={tab === id ? 'accent' : 'neutral'} size="sm" />
              <span className="truncate">{id === 'foto' ? 'Foto de la hoja' : label}</span>
            </button>
          ))}
        </div>

        <div className="p-4 sm:p-6">
          {tab === 'checklist' && (
            <div>
              <p className="mb-5 text-sm text-gray-500">
                Marcá cada ítem según lo relevado en la visita. Podés agregar detalle en
                observaciones abajo.
              </p>
              <ChecklistForm items={items} onChange={handleItemChange} />
            </div>
          )}

          {tab === 'foto' && (
            <div className="space-y-6">
              {!ocrDetectado ? (
                <div
                  onDragOver={(e) => {
                    e.preventDefault()
                    setDragOver(true)
                  }}
                  onDragLeave={() => setDragOver(false)}
                  onDrop={handleDrop}
                  className={`flex flex-col items-center rounded-2xl border-2 border-dashed px-6 py-14 transition-all ${
                    dragOver
                      ? 'border-accent bg-accent-soft'
                      : 'border-border bg-surface-muted/50'
                  }`}
                >
                  <IconBox icon={Upload} variant="accent" size="lg" />
                  <p className="mt-4 text-sm font-medium text-gray-700">
                    Arrastrá una foto acá o seleccioná un archivo
                  </p>
                  <p className="mt-2 max-w-sm text-center text-sm text-gray-500">
                    El sistema leerá los campos automáticamente (OCR).
                  </p>
                  <button
                    type="button"
                    onClick={() => simularCarga()}
                    className="mt-6 rounded-xl border border-border bg-card px-4 py-2.5 text-sm font-medium text-gray-700 shadow-sm transition-colors hover:bg-surface-muted"
                  >
                    Seleccionar foto
                  </button>
                </div>
              ) : (
                <div className="space-y-5">
                  <div className="flex items-start gap-3 rounded-lg border border-green-200 bg-green-50 px-4 py-3">
                    <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-status-done" strokeWidth={2} />
                    <div>
                      <p className="text-sm font-medium text-gray-900">Campos detectados</p>
                      <p className="mt-0.5 text-xs text-gray-600">
                        {archivoNombre} — revisá y corregí los ítems antes de guardar.
                      </p>
                    </div>
                  </div>
                  <ChecklistForm items={items} onChange={handleItemChange} />
                  <button
                    type="button"
                    onClick={() => {
                      setOcrDetectado(false)
                      setArchivoNombre(null)
                      setItems({})
                      setObservaciones('')
                    }}
                    className="text-sm font-medium text-gray-500 hover:text-gray-700"
                  >
                    Subir otra foto
                  </button>
                </div>
              )}
            </div>
          )}
        </div>
      </div>

      {/* Observaciones — siempre visible */}
      <div className="card-base p-6">
        <label htmlFor="observaciones" className="block text-sm font-semibold text-gray-800">
          Observaciones
        </label>
        <p className="mt-1 text-xs text-gray-500">
          Siempre disponible, independientemente del método de carga.
        </p>
        <textarea
          id="observaciones"
          value={observaciones}
          onChange={(e) => setObservaciones(e.target.value)}
          rows={4}
          placeholder="Notas de la visita, acuerdos, pendientes…"
          className="mt-3 w-full resize-none rounded-xl border border-border bg-white px-3 py-2.5 text-sm text-gray-900 placeholder:text-gray-400 focus:border-accent focus:outline-none focus:ring-2 focus:ring-accent/20"
        />
      </div>

      <div className="flex justify-end pb-4">
        <button
          type="button"
          onClick={handleGuardar}
          disabled={!empresaId}
          className="rounded-xl bg-accent px-6 py-2.5 text-sm font-medium text-white shadow-sm transition-colors hover:bg-accent/90 disabled:cursor-not-allowed disabled:opacity-50"
        >
          Guardar visita
        </button>
      </div>

      {toast && (
        <Toast message="Visita guardada correctamente" onClose={() => setToast(false)} />
      )}
    </div>
  )
}
