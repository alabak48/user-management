import React from "react"
import { type IconType } from "react-icons"
import Icon from "../Icon"
import styles from "./Button.module.css"

type IconProp = IconType | React.ReactNode

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "secondary" | "ghost" | "danger" | "custom"
  size?: "sm" | "md" | "lg"
  loading?: boolean
  startIcon?: IconProp
  endIcon?: IconProp
  iconSize?: number
}

function resolveIcon(icon: IconProp | undefined, size: number): React.ReactNode {
  if (typeof icon === "function") return <Icon icon={icon as IconType} size={size} />
  return icon as React.ReactNode
}

const variantClass: Record<NonNullable<ButtonProps["variant"]>, string> = {
  primary: styles.primary,
  secondary: styles.secondary,
  ghost: styles.ghost,
  danger: styles.danger,
  custom: ""
}

const sizeClass: Record<NonNullable<ButtonProps["size"]>, string> = {
  sm: styles.sm,
  md: "",
  lg: styles.lg,
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(function Button(
  {
    variant = "primary",
    size = "md",
    loading = false,
    startIcon,
    endIcon,
    iconSize = 16,
    className,
    children,
    disabled,
    type = "button",
    ...props
  },
  ref
) {
  const isDisabled = disabled || loading
  const spinner = <span className={styles.spinner} aria-hidden="true" />

  return (
    <button
      ref={ref}
      type={type}
      className={[styles.btn, variantClass[variant], sizeClass[size], className].filter(Boolean).join(" ")}
      disabled={isDisabled}
      aria-busy={loading}
      {...props}
    >
      {loading ? spinner : resolveIcon(startIcon, iconSize)}
      {children}
      {!loading && resolveIcon(endIcon, iconSize)}
    </button>
  )
})

export default Button
