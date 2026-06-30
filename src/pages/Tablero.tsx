import { Link } from 'react-router-dom'
import {
  AlertTriangle,
  ArrowRight,
  Building2,
  ClipboardList,
  ShieldAlert,
  UserPlus,
  Users,
} from 'lucide-react'
import {
  Bar,
  BarChart,
  CartesianGrid,
  Cell,
  Line,
  LineChart,
  Pie,
  PieChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from 'recharts'
import { Badge } from '../components/ui/Badge'
import {
  evolucionAfiliados,
  getEmpresasAtencion,
  getProblemasPorTipo,
  getTableroKpis,
  getVisitasPorMes,
} from '../data/mock'

const CHART_COLORS = ['#2563eb', '#dc2626', '#d97706', '#16a34a', '#6b7280', '#9333ea']

function StatCard({
  label,
  value,
  icon: Icon,
  valueClassName = 'text-gray-900',
}: {
  label: string
  value: number
  icon: React.ComponentType<{ className?: string; strokeWidth?: number }>
  valueClassName?: string
}) {
  return (
    <div className="rounded-xl border border-border bg-card p-5">
      <div className="flex items-start justify-between gap-3">
        <p className="text-sm text-gray-500">{label}</p>
        <Icon className="h-4 w-4 shrink-0 text-gray-400" strokeWidth={1.75} />
      </div>
      <p className={`mt-2 text-3xl font-semibold tabular-nums ${valueClassName}`}>{value}</p>
    </div>
  )
}

function ChartCard({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div className="rounded-xl border border-border bg-card p-6">
      <h2 className="mb-5 text-sm font-medium text-gray-700">{title}</h2>
      {children}
    </div>
  )
}

const tooltipStyle = {
  contentStyle: {
    borderRadius: '0.5rem',
    border: '1px solid #e5e7eb',
    fontSize: '0.75rem',
    boxShadow: 'none',
  },
}

export function Tablero() {
  const kpis = getTableroKpis()
  const visitasPorMes = getVisitasPorMes()
  const problemasPorTipo = getProblemasPorTipo()
  const empresasAtencion = getEmpresasAtencion(5)

  return (
    <div className="space-y-6">
      {/* KPIs */}
      <div className="grid grid-cols-2 gap-4 xl:grid-cols-3 2xl:grid-cols-6">
        <StatCard label="Total de empresas" value={kpis.totalEmpresas} icon={Building2} />
        <StatCard label="Visitas del mes" value={kpis.visitasDelMes} icon={ClipboardList} />
        <StatCard
          label="Problemas abiertos"
          value={kpis.problemasAbiertos}
          icon={AlertTriangle}
          valueClassName="text-status-open"
        />
        <StatCard
          label="Casos ART abiertos"
          value={kpis.casosArtAbiertos}
          icon={ShieldAlert}
          valueClassName="text-status-prog"
        />
        <StatCard label="Afiliados totales" value={kpis.afiliadosTotales} icon={Users} />
        <StatCard
          label="Afiliaciones nuevas del mes"
          value={kpis.afiliacionesNuevasMes}
          icon={UserPlus}
        />
      </div>

      {/* Gráficos */}
      <div className="grid gap-6 lg:grid-cols-2">
        <ChartCard title="Visitas por mes">
          <ResponsiveContainer width="100%" height={240}>
            <BarChart data={visitasPorMes} margin={{ top: 4, right: 4, left: -20, bottom: 0 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="#f3f4f6" vertical={false} />
              <XAxis
                dataKey="mes"
                tick={{ fontSize: 12, fill: '#6b7280' }}
                axisLine={false}
                tickLine={false}
              />
              <YAxis
                tick={{ fontSize: 12, fill: '#6b7280' }}
                axisLine={false}
                tickLine={false}
                allowDecimals={false}
              />
              <Tooltip {...tooltipStyle} />
              <Bar dataKey="visitas" fill="#2563eb" radius={[4, 4, 0, 0]} maxBarSize={40} />
            </BarChart>
          </ResponsiveContainer>
        </ChartCard>

        <ChartCard title="Problemas por tipo">
          <ResponsiveContainer width="100%" height={240}>
            <PieChart>
              <Pie
                data={problemasPorTipo}
                dataKey="cantidad"
                nameKey="tipo"
                cx="50%"
                cy="50%"
                innerRadius={55}
                outerRadius={90}
                paddingAngle={2}
              >
                {problemasPorTipo.map((_, i) => (
                  <Cell key={i} fill={CHART_COLORS[i % CHART_COLORS.length]} />
                ))}
              </Pie>
              <Tooltip {...tooltipStyle} />
            </PieChart>
          </ResponsiveContainer>
          <div className="mt-3 flex flex-wrap gap-x-4 gap-y-1.5">
            {problemasPorTipo.map((item, i) => (
              <span key={item.tipo} className="flex items-center gap-1.5 text-xs text-gray-500">
                <span
                  className="h-2 w-2 rounded-full"
                  style={{ backgroundColor: CHART_COLORS[i % CHART_COLORS.length] }}
                />
                {item.tipo} ({item.cantidad})
              </span>
            ))}
          </div>
        </ChartCard>

        <ChartCard title="Evolución de afiliados">
          <ResponsiveContainer width="100%" height={240}>
            <LineChart
              data={evolucionAfiliados}
              margin={{ top: 4, right: 4, left: -10, bottom: 0 }}
            >
              <CartesianGrid strokeDasharray="3 3" stroke="#f3f4f6" vertical={false} />
              <XAxis
                dataKey="mes"
                tick={{ fontSize: 12, fill: '#6b7280' }}
                axisLine={false}
                tickLine={false}
              />
              <YAxis
                tick={{ fontSize: 12, fill: '#6b7280' }}
                axisLine={false}
                tickLine={false}
                domain={['dataMin - 20', 'dataMax + 10']}
              />
              <Tooltip {...tooltipStyle} />
              <Line
                type="monotone"
                dataKey="total"
                stroke="#2563eb"
                strokeWidth={2}
                dot={{ fill: '#2563eb', r: 3 }}
                activeDot={{ r: 5 }}
              />
            </LineChart>
          </ResponsiveContainer>
        </ChartCard>
      </div>

      {/* Empresas que requieren atención */}
      <div className="rounded-xl border border-border bg-card p-6">
        <h2 className="text-sm font-medium text-gray-700">Empresas que requieren atención</h2>
        <p className="mt-1 text-xs text-gray-500">
          Priorizadas por problemas abiertos, casos ART y antigüedad de la última visita.
        </p>

        <ul className="mt-5 divide-y divide-border">
          {empresasAtencion.map(({ empresa, motivos }) => (
            <li key={empresa.id}>
              <Link
                to={`/empresas/${empresa.id}`}
                className="group flex items-center justify-between gap-4 py-4 transition-colors hover:bg-gray-50 -mx-2 px-2 rounded-lg"
              >
                <div className="min-w-0 flex-1">
                  <p className="text-sm font-medium text-gray-900 group-hover:text-accent">
                    {empresa.razonSocial}
                  </p>
                  <p className="mt-0.5 text-xs text-gray-500">
                    {empresa.rubro} · {empresa.cuit}
                  </p>
                  <div className="mt-2 flex flex-wrap gap-2">
                    {motivos.map((motivo) => (
                      <Badge
                        key={motivo}
                        variant={
                          motivo.includes('problema')
                            ? 'open'
                            : motivo.includes('ART')
                              ? 'prog'
                              : 'neutral'
                        }
                      >
                        {motivo}
                      </Badge>
                    ))}
                  </div>
                </div>
                <ArrowRight
                  className="h-4 w-4 shrink-0 text-gray-300 transition-colors group-hover:text-accent"
                  strokeWidth={2}
                />
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </div>
  )
}
