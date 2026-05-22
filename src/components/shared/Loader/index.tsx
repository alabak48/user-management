import styles from "./Loader.module.css"

interface LoaderProps {
  size?: "sm" | "md" | "lg"
}

function Loader({ size = "md" }: LoaderProps) {
  return (
    <div className={styles.wrap} role="status" aria-label="Loading">
      <div className={`${styles.balls} ${styles[size]}`}>
        <span className={`${styles.ball} ${styles.ballPurple}`} />
        <span className={`${styles.ball} ${styles.ballSky}`} />
        <span className={`${styles.ball} ${styles.ballRose}`} />
      </div>
    </div>
  )
}

export default Loader
