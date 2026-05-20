import React from "react"
import styles from "./Button.module.css"

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "secondary" | "ghost"
  size?: "sm" | "md" | "lg"
  label?: string
}

function Button({ variant = "primary", size = "md", label, className, children, ...props }: ButtonProps) {
  return (
    <button className={[styles.btn, styles[variant], styles[size], className].filter(Boolean).join(" ")} {...props}>
      {label ?? children}
    </button>
  )
}

export default Button
