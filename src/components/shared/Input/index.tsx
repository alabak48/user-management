import React from "react"
import styles from "./Input.module.css"

interface InputProps extends Omit<React.InputHTMLAttributes<HTMLInputElement>, "size"> {
  label?: string
  hint?: string
  error?: string
  size?: "sm" | "md" | "lg"
}

function Input({ label, hint, error, size = "md", id, className, disabled, ...props }: InputProps) {
  const inputId = id ?? (label ? label.toLowerCase().replace(/\s+/g, "-") : undefined)

  const wrapperClass = [
    styles.wrapper,
    styles[size],
    error ? styles.error : "",
    disabled ? styles.disabled : "",
    className ?? "",
  ].filter(Boolean).join(" ")

  return (
    <div className={wrapperClass}>
      {label && (
        <label className={styles.label} htmlFor={inputId}>
          {label}
        </label>
      )}
      <input id={inputId} className={styles.control} disabled={disabled} {...props} />
      {(error || hint) && (
        <span className={styles.message}>{error ?? hint}</span>
      )}
    </div>
  )
}

export default Input
