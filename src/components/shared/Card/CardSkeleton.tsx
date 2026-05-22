import Skeleton from '../Skeleton'
import styles from './CardSkeleton.module.css'

export type CardSkeletonVariant = 'default' | 'insights' | 'metric' | 'chart'

export function resolveSkeletonVariant(
  skeleton: CardSkeletonVariant | undefined,
  title: string | undefined,
): CardSkeletonVariant {
  if (skeleton) return skeleton
  if (title) return 'chart'
  return 'default'
}

function CardSkeleton({ variant }: { variant: CardSkeletonVariant }) {
  if (variant === 'insights') {
    return (
      <div className={styles.skeletonBody} aria-hidden="true">
        <Skeleton className={styles.skeletonBadge} />
        <Skeleton className={styles.skeletonLineLg} />
        <Skeleton className={styles.skeletonLineMd} />
        <Skeleton className={styles.skeletonLineSm} />
      </div>
    )
  }

  if (variant === 'metric') {
    return (
      <div className={styles.skeletonBody} aria-hidden="true">
        <div className={styles.skeletonMetricHeader}>
          <Skeleton className={styles.skeletonIcon} />
          <Skeleton className={styles.skeletonPill} />
        </div>
        <Skeleton className={styles.skeletonLineSm} />
        <Skeleton className={styles.skeletonLineXl} />
      </div>
    )
  }

  if (variant === 'chart') {
    return (
      <div className={styles.skeletonBody} aria-hidden="true">
        <div className={styles.skeletonHeader}>
          <Skeleton className={styles.skeletonTitle} />
        </div>
        <div className={styles.skeletonStatsRow}>
          <Skeleton className={styles.skeletonStatValue} />
          <Skeleton className={styles.skeletonStatBadge} />
        </div>
        <div className={styles.skeletonChips}>
          <Skeleton className={styles.skeletonChip} />
          <Skeleton className={styles.skeletonChip} />
        </div>
        <Skeleton className={styles.skeletonChart} />
      </div>
    )
  }

  return (
    <div className={styles.skeletonBody} aria-hidden="true">
      <Skeleton className={styles.skeletonLineMd} />
      <Skeleton className={styles.skeletonLineLg} />
      <Skeleton className={styles.skeletonLineSm} />
    </div>
  )
}

export default CardSkeleton
