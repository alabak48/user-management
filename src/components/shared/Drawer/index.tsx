import { useEffect, type ReactNode } from "react"
import styles from "./Drawer.module.css"

interface DrawerProps {
  isOpen: boolean
  onClose: () => void
  title?: string
  children: ReactNode
}

function Drawer({ isOpen, onClose, title, children }: DrawerProps) {
  useEffect(() => {
    const handler = (e: KeyboardEvent) => { if (e.key === "Escape") onClose() }
    document.addEventListener("keydown", handler)
    return () => document.removeEventListener("keydown", handler)
  }, [onClose])

  return (
    <div className={`${styles.overlay}${isOpen ? ` ${styles.overlayVisible}` : ""}`} onClick={onClose}>
      <div className={`${styles.panel}${isOpen ? ` ${styles.panelOpen}` : ""}`} onClick={(e) => e.stopPropagation()}>
        <div className={styles.header}>
          <h2 className={styles.title}>{title}</h2>
          <button className={styles.close} onClick={onClose}>✕</button>
        </div>
        <div className={styles.body}>{children}</div>
      </div>
    </div>
  )
}

export default Drawer
