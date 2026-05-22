import { useRef, useState, useEffect, type ReactNode } from "react"
import styles from "./ChartContainer.module.css"

export interface ChartSize {
  width: number
  height: number
}

interface ChartContainerProps {
  children: (size: ChartSize) => ReactNode
  className?: string
  fixedHeight?: boolean
  minHeight?: number
}

function ChartContainer({ children, className, fixedHeight = false, minHeight }: ChartContainerProps) {
  const ref = useRef<HTMLDivElement>(null)
  const [size, setSize] = useState<ChartSize>({ width: 0, height: 0 })

  useEffect(() => {
    const el = ref.current
    if (!el) return

    const update = () => {
      const { width, height } = el.getBoundingClientRect()
      const w = Math.floor(width)
      const h = Math.floor(height)
      if (w > 0 && h > 0) {
        setSize((prev) => (prev.width === w && prev.height === h ? prev : { width: w, height: h }))
      }
    }

    update()
    const ro = new ResizeObserver(update)
    ro.observe(el)
    return () => ro.disconnect()
  }, [])

  const rootClass = [styles.page, fixedHeight && styles.fixed, className].filter(Boolean).join(" ")

  return (
    <div ref={ref} className={rootClass} style={minHeight !== undefined ? { minHeight } : undefined}>
      {size.width > 0 && size.height > 0 && children(size)}
    </div>
  )
}

export default ChartContainer
