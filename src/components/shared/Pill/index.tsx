import { useRef } from "react"
import styles from "./Pill.module.css"

export interface PillItem {
  id: string
  label: string
}

interface PillProps {
  items: PillItem[]
  active: string
  onChange: (id: string) => void
}

function Pill({ items, active, onChange }: PillProps) {
  const refs = useRef<(HTMLButtonElement | null)[]>([])

  function handleKeyDown(e: React.KeyboardEvent, index: number) {
    let next: number | null = null
    if (e.key === "ArrowRight") next = (index + 1) % items.length
    else if (e.key === "ArrowLeft") next = (index - 1 + items.length) % items.length
    else if (e.key === "Home") next = 0
    else if (e.key === "End") next = items.length - 1

    if (next !== null) {
      e.preventDefault()
      refs.current[next]?.focus()
      onChange(items[next].id)
    }
  }

  return (
    <div className={styles.pillList} role="tablist">
      {items.map((item, index) => (
        <button
          key={item.id}
          ref={(el) => { refs.current[index] = el }}
          role="tab"
          type="button"
          aria-selected={active === item.id}
          tabIndex={active === item.id ? 0 : -1}
          className={[styles.pill, active === item.id ? styles.pillActive : ""].filter(Boolean).join(" ")}
          onClick={() => onChange(item.id)}
          onKeyDown={(e) => handleKeyDown(e, index)}
        >
          {item.label}
        </button>
      ))}
    </div>
  )
}

export default Pill
