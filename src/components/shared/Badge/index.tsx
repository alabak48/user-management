import type { ReactNode } from "react"
import styles from "./Badge.module.css"

export type BadgeVariant = "primary" | "success" | "neutral" | "danger"

interface BadgeProps {
  children: ReactNode
  variant?: BadgeVariant
  className?: string
}

const variantClass: Record<BadgeVariant, string> = {
  primary: styles.primary,
  success: styles.success,
  neutral: styles.neutral,
  danger: styles.danger,
}

function Badge({ children, variant = "primary", className }: BadgeProps) {
  return (
    <span className={[styles.badge, variantClass[variant], className].filter(Boolean).join(" ")}>
      {children}
    </span>
  )
}

export default Badge
