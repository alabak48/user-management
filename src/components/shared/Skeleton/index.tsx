import type { CSSProperties } from 'react'
import styles from './Skeleton.module.css'

interface SkeletonProps {
  animationDelay?: string
  className?: string
  style?: CSSProperties
}

function Skeleton({ animationDelay, className, style }: SkeletonProps) {
  return (
    <div
      className={[styles.skeleton, className].filter(Boolean).join(' ')}
      style={{ '--skeleton-delay': animationDelay, ...style } as CSSProperties}
      aria-hidden="true"
    />
  )
}

export default Skeleton
