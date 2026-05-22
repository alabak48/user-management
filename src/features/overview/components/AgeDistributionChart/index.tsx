import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
} from 'recharts'
import ChartContainer from '../../../../components/shared/ChartContainer'
import type { AgeGroup } from '../../../../api/demographicsApi'
import { useCSSVars } from '../../../../hooks/useCSSVars'
import styles from './AgeDistributionChart.module.css'
import { useUIStore } from '../../../../store/uiStore'
import Header from '../../../../components/shared/Header'

interface AgeDistributionChartProps {
  data: AgeGroup[]
  showTitle?: boolean
}

interface TooltipEntry {
  dataKey: string
  value: number
  color: string
}

interface CustomTooltipProps {
  active?: boolean
  payload?: TooltipEntry[]
  label?: string
}

const MALE_COLOR   = '#6e78b4' // --navy-400
const FEMALE_COLOR = '#ff2e5d' // --rose-500

const CSS_VAR_NAMES = [
  '--color-border',
  '--color-text-muted',
  '--color-surface',
  '--color-text',
  '--font-body',
] as const

function AgeDistributionChart({ data, showTitle = true }: AgeDistributionChartProps) {
  const cv = useCSSVars(CSS_VAR_NAMES)
  const border   = cv['--color-border']   || '#e5e7eb'
  const muted    = cv['--color-text-muted'] || '#6b7280'
  const surface  = cv['--color-surface']  || '#f9fafb'
  const text     = cv['--color-text']     || '#2d2d2d'
  const fontBody = cv['--font-body']      || "'Inter', system-ui, sans-serif"

  const tickStyle = { fontFamily: fontBody, fontSize: 12, fill: muted }

  const isSidebarTransitioning = useUIStore((state) => state.isSidebarTransitioning)

  function CustomTooltip({ active, payload, label }: CustomTooltipProps) {
    if (!active || !payload?.length) return null
    return (
      <div style={{
        background: surface,
        border: `1px solid ${border}`,
        borderRadius: 8,
        padding: '8px 12px',
        fontFamily: fontBody,
        fontSize: 12,
        color: text,
        boxShadow: '0 4px 6px -1px rgba(0,0,0,.12)',
        minWidth: 140,
      }}>
        <div style={{ fontWeight: 600, marginBottom: 6 }}>{label}</div>
        {payload.map(entry => (
          <div key={entry.dataKey as string} style={{ display: 'flex', alignItems: 'center', gap: 6, marginBottom: 2 }}>
            <span style={{ width: 8, height: 8, borderRadius: '50%', background: entry.color as string, display: 'inline-block', flexShrink: 0 }} />
            <span style={{ color: muted }}>{entry.dataKey === 'male' ? 'Male' : 'Female'}</span>
            <span style={{ fontWeight: 600, marginLeft: 'auto', paddingLeft: 12 }}>{entry.value}</span>
          </div>
        ))}
      </div>
    )
  }

  const rootClass = [styles.chart, !showTitle && styles.chartEmbedded, isSidebarTransitioning && styles.freezed ].filter(Boolean).join(' ')

  return (
    <div className={rootClass}>
      {showTitle && <Header>Age Distribution by Gender</Header>}
      <ChartContainer className={styles.chartPlot} fixedHeight={showTitle} debounce={150}>
        {({ width, height }) => (
        <BarChart width={width} height={height} data={data} margin={{ top: 8, right: 16, left: -16, bottom: 0 }} barCategoryGap="30%" barGap={3}>
          <CartesianGrid vertical={false} stroke={border} strokeDasharray="4 4" />

          <XAxis
            dataKey="label"
            tick={tickStyle}
            axisLine={false}
            tickLine={false}
          />
          <YAxis
            tick={tickStyle}
            axisLine={false}
            tickLine={false}
          />

          <Tooltip content={<CustomTooltip />} cursor={{ fill: border, fillOpacity: 0.4 }} />

          <Legend
            formatter={(value) => (
              <span style={{ fontFamily: fontBody, fontSize: 12, color: text }}>
                {value === 'male' ? 'Male' : 'Female'}
              </span>
            )}
          />

          <Bar dataKey="male" fill={MALE_COLOR} radius={[4, 4, 0, 0]} isAnimationActive={!isSidebarTransitioning} />
          <Bar dataKey="female" fill={FEMALE_COLOR} radius={[4, 4, 0, 0]} isAnimationActive={!isSidebarTransitioning} />
        </BarChart>
        )}
      </ChartContainer>
    </div>
  )
}

export default AgeDistributionChart
