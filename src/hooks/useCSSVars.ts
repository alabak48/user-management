import { useEffect, useRef, useState } from 'react'
import { useTheme } from '../context/ThemeContext'

function readVars(names: readonly string[]): Record<string, string> {
  const style = getComputedStyle(document.documentElement)
  const out: Record<string, string> = {}
  for (const name of names) {
    out[name] = style.getPropertyValue(name).trim()
  }
  return out
}

export function useCSSVars(names: readonly string[]): Record<string, string> {
  const { theme } = useTheme()
  const namesRef = useRef(names)
  namesRef.current = names
  const key = names.join('\0')
  const [vars, setVars] = useState(() => readVars(names))

  useEffect(() => {
    const raf = requestAnimationFrame(() => {
      setVars(readVars(namesRef.current))
    })
    return () => cancelAnimationFrame(raf)
  }, [theme, key])

  return vars
}
