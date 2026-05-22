import {
  AreaChart,
  Area,
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

  const rootClass = [styles.chart, !showTitle && styles.chartEmbedded].filter(Boolean).join(' ')

  return (
    <div className={rootClass}>
      {showTitle && <h3 className={styles.title}>Age Distribution by Gender</h3>}
      <ChartContainer className={styles.chartPlot} fixedHeight={showTitle}>
        {({ width, height }) => (
        <AreaChart width={width} height={height} data={data} margin={{ top: 8, right: 16, left: -16, bottom: 0 }}>
          <defs>
            <linearGradient id="ageMaleGrad" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%"  stopColor={MALE_COLOR}   stopOpacity={0.25} />
              <stop offset="95%" stopColor={MALE_COLOR}   stopOpacity={0}    />
            </linearGradient>
            <linearGradient id="ageFemaleGrad" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%"  stopColor={FEMALE_COLOR} stopOpacity={0.2}  />
              <stop offset="95%" stopColor={FEMALE_COLOR} stopOpacity={0}    />
            </linearGradient>
          </defs>

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

          <Tooltip content={<CustomTooltip />} />

          <Legend
            formatter={(value) => (
              <span style={{ fontFamily: fontBody, fontSize: 12, color: text }}>
                {value === 'male' ? 'Male' : 'Female'}
              </span>
            )}
          />

          <Area
            type="monotone"
            dataKey="male"
            stroke={MALE_COLOR}
            strokeWidth={2}
            fill="url(#ageMaleGrad)"
            dot={false}
            activeDot={{ r: 4, strokeWidth: 0, fill: MALE_COLOR }}
          />
          <Area
            type="monotone"
            dataKey="female"
            stroke={FEMALE_COLOR}
            strokeWidth={2}
            fill="url(#ageFemaleGrad)"
            dot={false}
            activeDot={{ r: 4, strokeWidth: 0, fill: FEMALE_COLOR }}
          />
        </AreaChart>
        )}
      </ChartContainer>
    </div>
  )
}

export default AgeDistributionChart
