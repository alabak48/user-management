import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from 'recharts'
import type { AgeGroup } from '../../../../api/demographicsApi'
import styles from "./AgeDistributionChart.module.css"

interface AgeDistributionChartProps {
  data: AgeGroup[]
}

function AgeDistributionChart({ data }: AgeDistributionChartProps) {
  return (
    <div className={styles.chart}>
      <h3 className={styles.title}>Age Distribution by Gender</h3>
      <ResponsiveContainer width="100%" height={300} debounce={50}>
        <LineChart data={data} margin={{ top: 5, right: 20, left: 0, bottom: 5 }}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="label" />
          <YAxis />
          <Tooltip
            formatter={(value: number, name: string) => [value, name === 'male' ? 'Male' : 'Female']}
          />
          <Legend formatter={(value) => (value === 'male' ? 'Male' : 'Female')} />
          <Line
            type="monotone"
            dataKey="male"
            stroke="#3B82F6"
            strokeWidth={2}
            dot={{ r: 4 }}
            activeDot={{ r: 6 }}
          />
          <Line
            type="monotone"
            dataKey="female"
            stroke="#EC4899"
            strokeWidth={2}
            dot={{ r: 4 }}
            activeDot={{ r: 6 }}
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  )
}

export default AgeDistributionChart
