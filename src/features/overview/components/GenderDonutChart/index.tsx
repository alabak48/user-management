import { PieChart, Pie, Cell, Tooltip, Legend, Label } from 'recharts'
import ChartContainer from '../../../../components/shared/ChartContainer'
import { useCSSVars } from '../../../../hooks/useCSSVars'
import styles from './GenderDonutChart.module.css'

interface GenderDonutChartProps {
  maleCount: number
  femaleCount: number
  showTitle?: boolean
}

interface TooltipEntry {
  name: string
  value: number
  payload: { color: string }
}

interface CustomTooltipProps {
  active?: boolean
  payload?: TooltipEntry[]
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

function GenderDonutChart({ maleCount, femaleCount, showTitle = true }: GenderDonutChartProps) {
  const cv = useCSSVars(CSS_VAR_NAMES)
  const border   = cv['--color-border']     || '#e5e7eb'
  const muted    = cv['--color-text-muted'] || '#6b7280'
  const surface  = cv['--color-surface']    || '#f9fafb'
  const text     = cv['--color-text']       || '#2d2d2d'
  const fontBody = cv['--font-body']        || "'Inter', system-ui, sans-serif"

  const total = maleCount + femaleCount
  const data = [
    { name: 'Male',   value: maleCount,   color: MALE_COLOR   },
    { name: 'Female', value: femaleCount, color: FEMALE_COLOR },
  ]

  function CustomTooltip({ active, payload }: CustomTooltipProps) {
    if (!active || !payload?.length) return null
    const { name, value, payload: p } = payload[0]
    const pct = ((value / total) * 100).toFixed(1)
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
        <div style={{ display: 'flex', alignItems: 'center', gap: 6, fontWeight: 600, marginBottom: 4 }}>
          <span style={{ width: 8, height: 8, borderRadius: '50%', background: p.color, display: 'inline-block', flexShrink: 0 }} />
          {name}
        </div>
        <div style={{ color: muted }}>
          {value.toLocaleString()} korisnika · {pct}%
        </div>
      </div>
    )
  }

  const rootClass = [styles.chart, !showTitle && styles.chartEmbedded].filter(Boolean).join(' ')
  const innerRadius = showTitle ? '50%' : '52%'
  const outerRadius = showTitle ? '72%' : '74%'
  const cy = showTitle ? '50%' : '47%'

  return (
    <div className={rootClass}>
      {showTitle && <h3 className={styles.title}>Gender Distribution</h3>}
      <ChartContainer className={styles.chartPlot} fixedHeight={showTitle} minHeight={showTitle ? undefined : 200}>
        {({ width, height }) => {
          const innerRPx = Math.min(width / 2, height / 2) * (showTitle ? 0.50 : 0.52)
          const valueSize = Math.max(12, Math.min(24, Math.round(innerRPx * 0.38)))
          const labelSize = Math.max(8, Math.min(11, Math.round(innerRPx * 0.20)))
          const gap = 4
          const y1 = parseFloat(cy) / 100 * height - (gap + labelSize) / 2
          const y2 = parseFloat(cy) / 100 * height + (gap + valueSize) / 2

          return (
          <PieChart width={width} height={height} margin={{ top: 4, right: 8, bottom: 4, left: 8 }}>
            <Pie
              data={data}
              cx="50%"
              cy={cy}
              innerRadius={innerRadius}
              outerRadius={outerRadius}
              dataKey="value"
              paddingAngle={3}
              cornerRadius={4}
              stroke="none"
            >
              {data.map((entry) => (
                <Cell key={entry.name} fill={entry.color} />
              ))}
              <Label
                content={() => (
                  <g>
                    <text
                      x={width / 2}
                      y={y1}
                      textAnchor="middle"
                      dominantBaseline="middle"
                      style={{ fontFamily: fontBody, fontSize: `${valueSize}px`, fontWeight: 700, fill: text }}
                    >
                      {total.toLocaleString()}
                    </text>
                    <text
                      x={width / 2}
                      y={y2}
                      textAnchor="middle"
                      dominantBaseline="middle"
                      style={{ fontFamily: fontBody, fontSize: `${labelSize}px`, fill: muted }}
                    >
                      total users
                    </text>
                  </g>
                )}
              />
            </Pie>

            <Tooltip content={<CustomTooltip />} />

            <Legend
              formatter={(value) => (
                <span style={{ fontFamily: fontBody, fontSize: 12, color: text }}>
                  {value}
                </span>
              )}
            />
          </PieChart>
          )
        }}
      </ChartContainer>
    </div>
  )
}

export default GenderDonutChart
