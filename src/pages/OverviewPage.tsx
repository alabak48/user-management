import { useDemographics } from '../hooks/useDemographics'
import AgeDistributionChart from '../features/overview/components/AgeDistributionChart'
import GenderDonutChart from '../features/overview/components/GenderDonutChart'
import MetricCard from '../features/overview/components/MetricCard'
import styles from './OverviewPage.module.css'

function OverviewPage() {
  const { data, isLoading, isError } = useDemographics()

  if (isLoading) return <div className={styles.loading}>Loading demographics...</div>
  if (isError || !data) return <div className={styles.error}>Failed to load data</div>

  const { totalUsers, averageAge, femaleCount, maleCount, ageGroups } = data
  const mfRatio = (maleCount / femaleCount).toFixed(2)

  return (
    <div className={styles.page}>
      <div className={styles.metrics}>
        <MetricCard title="Total Users" value={totalUsers} />
        <MetricCard title="Average Age" value={`${averageAge} yrs`} />
        <MetricCard
          title="M/F Ratio"
          value={`${mfRatio}:1`}
          subtitle={`${maleCount} male / ${femaleCount} female`}
        />
      </div>
      <div className={styles.charts}>
        <AgeDistributionChart data={ageGroups} />
        <GenderDonutChart maleCount={maleCount} femaleCount={femaleCount} />
      </div>
    </div>
  )
}

export default OverviewPage
