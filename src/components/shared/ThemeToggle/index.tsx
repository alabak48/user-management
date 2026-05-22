import { LuSun, LuMoon } from 'react-icons/lu'
import { useTheme } from '../../../context/ThemeContext'
import Icon from '../Icon'
import styles from './ThemeToggle.module.css'

function ThemeToggle() {
  const { theme, toggleTheme } = useTheme()
  const isDark = theme === 'dark'

  return (
    <button
      className={styles.toggle}
      onClick={toggleTheme}
      aria-label={isDark ? 'Switch to light mode' : 'Switch to dark mode'}
      title={isDark ? 'Switch to light mode' : 'Switch to dark mode'}
    >
      <div className={`${styles.knob} ${isDark ? styles.knobRight : ''}`} />
      <span className={`${styles.icon} ${!isDark ? styles.iconSunActive : ''}`}>
        <Icon icon={LuSun} size={15} />
      </span>
      <span className={`${styles.icon} ${isDark ? styles.iconMoonActive : ''}`}>
        <Icon icon={LuMoon} size={14} />
      </span>
    </button>
  )
}

export default ThemeToggle
 