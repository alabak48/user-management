import type { ReactNode } from 'react'
import styles from './Header.module.css'

interface HeaderProps {
  children: ReactNode
  subtitle?: string
  as?: 'h1' | 'h2' | 'h3' | 'h4'
}

function Header({ children, subtitle, as: Tag = 'h1' }: HeaderProps) {
  return (
    <div className={styles.wrapper}>
      <Tag className={styles.title}>{children}</Tag>
      {subtitle && <p className={styles.subtitle}>{subtitle}</p>}
    </div>
  )
}

export default Header
