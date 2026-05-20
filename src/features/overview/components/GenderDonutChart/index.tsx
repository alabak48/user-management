import { PieChart, Pie, Cell, Tooltip, Legend, ResponsiveContainer } from 'recharts'
import styles from "./GenderDonutChart.module.css"

interface GenderDonutChartProps {
  maleCount: number
  femaleCount: number
}

const COLORS = {
  male: '#3B82F6',
  female: '#EC4899',
}

function GenderDonutChart({ maleCount, femaleCount }: GenderDonutChartProps) {
  const data = [
    { name: 'Male', value: maleCount },
    { name: 'Female', value: femaleCount },
  ]

  return (
    <div className={styles.chart}>
      <h3 className={styles.title}>Gender Distribution</h3>
      <ResponsiveContainer width="100%" height={300} debounce={50}>
        <PieChart>
          <Pie
            data={data}
            cx="50%"
            cy="50%"
            innerRadius={70}
            outerRadius={110}
            dataKey="value"
            paddingAngle={3}
          >
            <Cell fill={COLORS.male} />
            <Cell fill={COLORS.female} />
          </Pie>
          <Tooltip formatter={(value: number, name: string) => [`${value} users`, name]} />
          <Legend />
        </PieChart>
      </ResponsiveContainer>
    </div>
  )
}

export default GenderDonutChart
