import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useRef,
  useState,
} from "react"
import { LuCircleCheck, LuCircleX, LuCircleAlert, LuInfo, LuX } from "react-icons/lu"
import Button from "../Button"
import styles from "./Toast.module.css"

export type ToastVariant = "success" | "error" | "warning" | "info"

interface ToastItem {
  id: string
  message: string
  variant: ToastVariant
  exiting: boolean
}

interface ToastContextValue {
  toast: (message: string, variant?: ToastVariant) => void
}

const ToastContext = createContext<ToastContextValue | null>(null)

export function useToast() {
  const ctx = useContext(ToastContext)
  if (!ctx) throw new Error("useToast must be used within ToastProvider")
  return ctx
}

export function ToastProvider({ children }: { children: React.ReactNode }) {
  const [toasts, setToasts] = useState<ToastItem[]>([])

  const toast = useCallback((message: string, variant: ToastVariant = "info") => {
    setToasts(prev => [
      ...prev,
      { id: crypto.randomUUID(), message, variant, exiting: false },
    ])
  }, [])

  const dismiss = useCallback((id: string) => {
    setToasts(prev => prev.map(t => t.id === id ? { ...t, exiting: true } : t))
    setTimeout(() => {
      setToasts(prev => prev.filter(t => t.id !== id))
    }, 320)
  }, [])

  return (
    <ToastContext.Provider value={{ toast }}>
      {children}
      <div className={styles.container} aria-live="polite" aria-atomic="false">
        {toasts.map(t => (
          <ToastItem key={t.id} toast={t} onDismiss={dismiss} />
        ))}
      </div>
    </ToastContext.Provider>
  )
}

const ICONS: Record<ToastVariant, React.ElementType> = {
  success: LuCircleCheck,
  error:   LuCircleX,
  warning: LuCircleAlert,
  info:    LuInfo,
}

const DURATION = 4000

function ToastItem({
  toast,
  onDismiss,
}: {
  toast: ToastItem
  onDismiss: (id: string) => void
}) {
  const Icon = ICONS[toast.variant]
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null)

  useEffect(() => {
    timerRef.current = setTimeout(() => onDismiss(toast.id), DURATION)
    return () => { if (timerRef.current) clearTimeout(timerRef.current) }
  }, [toast.id, onDismiss])

  return (
    <div
      className={[
        styles.toast,
        styles[toast.variant],
        toast.exiting ? styles.exiting : "",
      ].filter(Boolean).join(" ")}
      role="alert"
    >
      <span className={styles.icon}>
        <Icon size={18} />
      </span>
      <span className={styles.message}>{toast.message}</span>
      <Button
        variant="custom"
        className={styles.close}
        onClick={() => onDismiss(toast.id)}
        aria-label="Dismiss"
        startIcon={LuX}
        iconSize={14}
      />
      <span className={styles.progress} />
    </div>
  )
}
