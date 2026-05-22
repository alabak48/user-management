import { LuMenu } from "react-icons/lu"
import ThemeToggle from '../../shared/ThemeToggle'
import Button from "../../shared/Button"
import styles from "./Navbar.module.css"
import Header from "../../shared/Header"

interface NavbarProps {
  title: string
  onMobileMenuOpen?: () => void
  scrolled?: boolean
}

function Navbar({ title, onMobileMenuOpen, scrolled }: NavbarProps) {
  return (
    <header className={`${styles.navbar}${scrolled ? ` ${styles.scrolled}` : ""}`}>
      <div className={styles.start}>
        <div className={styles.menuBtnWrap}>
          <Button
            variant="custom"
            className={styles.menuBtn}
            onClick={onMobileMenuOpen}
            aria-label="Open navigation menu"
            startIcon={LuMenu}
            iconSize={20}
          />
        </div>
        <Header>{title}</Header>
      </div>
      <div className={styles.actions}>
        <ThemeToggle />
      </div>
    </header>
  )
}

export default Navbar
