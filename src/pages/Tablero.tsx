import { Link } from 'react-router-dom'
import {
  AlertTriangle,
  ArrowRight,
  BarChart3,
  Building2,
  ClipboardList,
  LineChart,
  PieChart,
  Radar,
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
  LineChart as RechartsLine,
  Pie,
  PieChart as RechartsPie,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from 'recharts'
import { Badge } from '../components/ui/Badge'
import { IconBox } from '../components/ui/IconBox'
import { StatCard } from '../components/ui/StatCard'
import {
  evolucionAfiliados,
  getEmpresasAtencion,
  getProblemasPorTipo,
  getTableroKpis,
  getVisitasPorMes,
} from '../data/mock'

const CHART_COLORS = ['#2563eb', '#dc2626', '#d97706', '#16a34a', '#6b7280', '#9333ea']

function ChartCard({
  title,
  icon,
  children,
}: {
  title: string
  icon: typeof BarChart3
  children: React.ReactNode
}) {
  return (
    <div className="card-base p-4 sm:p-6">
      <div className="mb-5 flex items-center gap-3">
        <IconBox icon={icon} variant="accent" size="sm" />
        <h2 className="text-base font-semibold tracking-tight text-gray-800">{title}</h2>
      </div>
      {children}
    </div>
  )
}

const tooltipStyle = {
  contentStyle: {
    borderRadius: '0.75rem',
    border: '1px solid #e2e8f0',
    fontSize: '0.75rem',
    boxShadow: '0 1px 3px rgb(0 0 0 / 0.04)',
  },
}

export function Tablero() {
  const kpis = getTableroKpis()
  const visitasPorMes = getVisitasPorMes()
  const problemasPorTipo = getProblemasPorTipo()
  const empresasAtencion = getEmpresasAtencion(5)

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-2 gap-3 xl:grid-cols-3 2xl:grid-cols-6 sm:gap-4">
        <StatCard label="Total de empresas" value={kpis.totalEmpresas} icon={Building2} />
        <StatCard label="Visitas del mes" value={kpis.visitasDelMes} icon={ClipboardList} />
        <StatCard
          label="Problemas abiertos"
          value={kpis.problemasAbiertos}
          icon={AlertTriangle}
          iconVariant="open"
          valueClassName="text-status-open"
        />
        <StatCard
          label="Casos ART abiertos"
          value={kpis.casosArtAbiertos}
          icon={ShieldAlert}
          iconVariant="prog"
          valueClassName="text-status-prog"
        />
        <StatCard label="Afiliados totales" value={kpis.afiliadosTotales} icon={Users} iconVariant="done" />
        <StatCard
          label="Afiliaciones nuevas del mes"
          value={kpis.afiliacionesNuevasMes}
          icon={UserPlus}
        />
      </div>

      <div className="grid gap-6 lg:grid-cols-2">
        <ChartCard title="Visitas por mes" icon={BarChart3}>
          <ResponsiveContainer width="100%" height={240}>
            <BarChart data={visitasPorMes} margin={{ top: 4, right: 4, left: -20, bottom: 0 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="#eef1f5" vertical={false} />
              <XAxis dataKey="mes" tick={{ fontSize: 12, fill: '#64748b' }} axisLine={false} tickLine={false} />
              <YAxis tick={{ fontSize: 12, fill: '#64748b' }} axisLine={false} tickLine={false} allowDecimals={false} />
              <Tooltip {...tooltipStyle} />
              <Bar dataKey="visitas" fill="#2563eb" radius={[6, 6, 0, 0]} maxBarSize={40} />
            </BarChart>
          </ResponsiveContainer>
        </ChartCard>

        <ChartCard title="Problemas por tipo" icon={PieChart}>
          <ResponsiveContainer width="100%" height={240}>
            <RechartsPie>
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
            </RechartsPie>
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

        <ChartCard title="Evolución de afiliados" icon={LineChart}>
          <ResponsiveContainer width="100%" height={240}>
            <RechartsLine data={evolucionAfiliados} margin={{ top: 4, right: 4, left: -10, bottom: 0 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="#eef1f5" vertical={false} />
              <XAxis dataKey="mes" tick={{ fontSize: 12, fill: '#64748b' }} axisLine={false} tickLine={false} />
              <YAxis
                tick={{ fontSize: 12, fill: '#64748b' }}
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
            </RechartsLine>
          </ResponsiveContainer>
        </ChartCard>
      </div>

      <div className="card-base p-4 sm:p-6">
        <div className="mb-5 flex items-center gap-3">
          <IconBox icon={Radar} variant="open" size="sm" />
          <div>
            <h2 className="text-base font-semibold tracking-tight text-gray-800">
              Empresas que requieren atención
            </h2>
            <p className="mt-0.5 text-xs text-gray-500">
              Priorizadas por problemas abiertos, casos ART y antigüedad de la última visita.
            </p>
          </div>
        </div>

        <ul className="divide-y divide-border">
          {empresasAtencion.map(({ empresa, motivos }) => (
            <li key={empresa.id}>
              <Link
                to={`/empresas/${empresa.id}`}
                className="group -mx-2 flex items-center justify-between gap-4 rounded-xl px-2 py-4 transition-all hover:bg-surface-muted"
              >
                <div className="min-w-0 flex-1">
                  <p className="text-sm font-semibold text-gray-900 group-hover:text-accent">
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
