import type { ReactNode } from 'react'
import CardSkeleton, { resolveSkeletonVariant, type CardSkeletonVariant } from './CardSkeleton'
import styles from './Card.module.css'

export type { CardSkeletonVariant } from './CardSkeleton'

interface CardProps {
  title?: string
  action?: ReactNode
  children?: ReactNode
  className?: string
  interactive?: boolean
  loading?: boolean
  skeleton?: CardSkeletonVariant
}

function Card({
  title,
  action,
  children,
  className,
  interactive = false,
  loading = false,
  skeleton,
}: CardProps) {
  const skeletonVariant = resolveSkeletonVariant(skeleton, title)

  return (
    <div
      className={[
        styles.card,
        loading && styles.cardLoading,
        interactive && !loading && styles.interactive,
        className,
      ]
        .filter(Boolean)
        .join(' ')}
      aria-busy={loading || undefined}
      aria-label={loading ? 'Loading' : undefined}
    >
      {loading ? (
        <CardSkeleton variant={skeletonVariant} />
      ) : (
        <>
          {title && (
            <div className={styles.header}>
              <span className={styles.title}>{title}</span>
              {action && <div className={styles.actions}>{action}</div>}
            </div>
          )}
          {children}
        </>
      )}
    </div>
  )
}

export default Card
