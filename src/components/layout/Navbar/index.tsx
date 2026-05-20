import styles from "./Navbar.module.css"

interface NavbarProps {
  title: string
}

function Navbar({ title }: NavbarProps) {
  return (
    <header className={styles.navbar}>
      <h1 className={styles.title}>{title}</h1>
    </header>
  )
}

export default Navbar
