import { type MouseEvent } from "react"
import { LuUsers, LuCalendar, LuTrendingUp } from "react-icons/lu"
import type { IconType } from "react-icons"
import Icon from "../../../../components/shared/Icon"
import Card from "../../../../components/shared/Card"
import Badge, { type BadgeVariant } from "../../../../components/shared/Badge"
import styles from "./MetricCard.module.css"

type MetricKind = "totalUsers" | "averageAge" | "mfRatio"

interface MetricCardProps {
  title: string
  value: string | number
  subtitle?: string
  metric: MetricKind
  /** Radial color glow that follows the pointer on hover */
  hoverGlow?: boolean
  loading?: boolean
}

const METRIC_CONFIG: Record<
  MetricKind,
  { icon: IconType; pill: string; pillVariant: BadgeVariant }
> = {
  totalUsers: { icon: LuUsers, pill: "+12% this month", pillVariant: "success" },
  averageAge: { icon: LuCalendar, pill: "Stable", pillVariant: "neutral" },
  mfRatio: { icon: LuTrendingUp, pill: "Balanced", pillVariant: "primary" },
}

function MetricCard({ title, value, subtitle, metric, hoverGlow = false, loading = false }: MetricCardProps) {
  const { icon, pill, pillVariant } = METRIC_CONFIG[metric]

  if (loading) {
    return <Card loading skeleton="metric" className={styles.skeletonCard} />
  }

  const handleMouseMove = (e: MouseEvent<HTMLDivElement>) => {
    if (!hoverGlow) return
    const rect = e.currentTarget.getBoundingClientRect()
    e.currentTarget.style.setProperty("--glow-x", `${e.clientX - rect.left}px`)
    e.currentTarget.style.setProperty("--glow-y", `${e.clientY - rect.top}px`)
  }

  const handleMouseLeave = (e: MouseEvent<HTMLDivElement>) => {
    if (!hoverGlow) return
    e.currentTarget.style.removeProperty("--glow-x")
    e.currentTarget.style.removeProperty("--glow-y")
  }

  return (
    <div
      className={[styles.card, hoverGlow && styles.cardGlow].filter(Boolean).join(" ")}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
    >
      {hoverGlow && <div className={styles.glow} aria-hidden="true" />}
      <div className={styles.content}>
      <div className={styles.header}>
        <span className={styles.iconWrap}>
          <Icon icon={icon} size={18} />
        </span>
        <Badge variant={pillVariant}>{pill}</Badge>
      </div>
      <p className={styles.title}>{title}</p>
      <p className={styles.value}>{value}</p>
      {subtitle && <p className={styles.subtitle}>{subtitle}</p>}
      </div>
    </div>
  )
}

export default MetricCard
