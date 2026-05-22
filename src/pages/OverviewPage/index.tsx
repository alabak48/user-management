import { useDemographics } from '../../hooks/useDemographics'
import AgeDistributionChart from '../../features/overview/components/AgeDistributionChart'
import GenderDonutChart from '../../features/overview/components/GenderDonutChart'
import MetricCard from '../../features/overview/components/MetricCard'
import Card from '../../components/shared/Card'
import styles from './OverviewPage.module.css'


function SparkleIcon() {
  return (
    <svg width="11" height="11" viewBox="0 0 12 12" fill="currentColor" aria-hidden="true">
      <path d="M6 0 7.5 4.5 12 6 7.5 7.5 6 12 4.5 7.5 0 6 4.5 4.5Z"/>
    </svg>
  )
}

function OverviewPage() {
  const { data, isLoading, isError } = useDemographics()

  if (isError || (!isLoading && !data)) return <div className={styles.error}>Failed to load data</div>

  const totalUsers = data?.totalUsers ?? 0
  const averageAge = data?.averageAge ?? 0
  const femaleCount = data?.femaleCount ?? 0
  const maleCount = data?.maleCount ?? 0
  const ageGroups = data?.ageGroups ?? []
  const mfRatio = femaleCount > 0 ? (maleCount / femaleCount).toFixed(2) : '—'

  return (
    <div className={`stack ${styles.page}`}>
      <div className={`stack ${styles.container} ${!isLoading ? styles.cardAnimated : ''}`}>
        <div className={styles.row}>
          <Card loading={isLoading} skeleton="insights" className={styles.insightsCard}>
            {!isLoading && (
              <>
                <div className={styles.insightsOrbPurple} />
                <div className={styles.insightsOrbSky} />
                <div className={styles.insightsOrbRose} />

                <div className={styles.insightsBadgeRow}>
                  <div className={styles.insightsBadge}>
                    <SparkleIcon />
                    Insights
                  </div>
                </div>

                <p className={styles.insightsText}>
                  Your user base has grown by{' '}
                  <span className={styles.insightsHighlight}>12%</span>{' '}
                  since last month
                </p>

                <div className={styles.insightsMeta}>
                  <span className={styles.insightsMetaDot} style={{ background: '#9370d8' }} />
                  {totalUsers.toLocaleString()} total users
                </div>
              </>
            )}
          </Card>
          <MetricCard
            loading={isLoading}
            hoverGlow
            metric="totalUsers"
            title="Total Users"
            value={totalUsers.toLocaleString()}
          />
          <MetricCard
            loading={isLoading}
            hoverGlow
            metric="averageAge"
            title="Average Age"
            value={`${averageAge} yrs`}
          />
          <MetricCard
            loading={isLoading}
            hoverGlow
            metric="mfRatio"
            title="M/F Ratio"
            value={`${mfRatio}:1`}
            subtitle={`${maleCount.toLocaleString()} male / ${femaleCount.toLocaleString()} female`}
          />
        </div>

        <div className={`${styles.row} ${styles.rowCharts}`}>
          <Card
            loading={isLoading}
            skeleton="chart"
            interactive={!isLoading}
            title="User Growth"
            className={styles.growthCard}
          >
            {!isLoading && (
            <div className={styles.growthCardTop}>
              <div className={styles.statsRow}>
                <span className={styles.statsValue}>{totalUsers.toLocaleString()}</span>
                <span className={styles.statsBadge}>
                  12% from last month
                </span>
              </div>
              <div className={styles.statsChips}>
                <div className={styles.statsChip}>
                  <span className={styles.statsChipDot} style={{ background: '#6e78b4' }} />
                  {maleCount.toLocaleString()} male
                </div>
                <div className={styles.statsChip}>
                  <span className={styles.statsChipDot} style={{ background: '#ff2e5d' }} />
                  {femaleCount.toLocaleString()} female
                </div>
              </div>
            </div>
            )}
            {!isLoading && <AgeDistributionChart data={ageGroups} showTitle={false} />}
          </Card>

          <Card
            loading={isLoading}
            skeleton="chart"
            interactive={!isLoading}
            title="Gender Split"
            className={styles.genderCard}
          >
            {!isLoading && (
              <GenderDonutChart maleCount={maleCount} femaleCount={femaleCount} showTitle={false} />
            )}
          </Card>
        </div>

      </div>
    </div>
  )
}

export default OverviewPage