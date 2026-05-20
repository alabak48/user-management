import styles from "./MetricCard.module.css"

interface MetricCardProps {
  title: string
  value: string | number
  subtitle?: string
}

function MetricCard({ title, value, subtitle }: MetricCardProps) {
  return (
    <div className={styles.card}>
      <p className={styles.title}>{title}</p>
      <p className={styles.value}>{value}</p>
      {subtitle && <p className={styles.subtitle}>{subtitle}</p>}
    </div>
  )
}

export default MetricCard
