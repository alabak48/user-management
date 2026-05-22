import { Navigate } from "react-router-dom"
import { useAuthStore } from "../../store/authStore"
import Input from "../../components/shared/Input"
import Button from "../../components/shared/Button"
import Logo from "../../components/shared/Logo"
import useLogin from "../../hooks/auth/useLogin"
import styles from "./LoginPage.module.css"


function LoginPage() {
  const isAuthenticated = useAuthStore((state) => state.isAuthenticated)
  const { form, onSubmit, isLoading, error } = useLogin()
  const { register, formState: { errors } } = form

  if (isAuthenticated) {
    return <Navigate to="/overview" />
  }

  return (
    <div className={styles.splitScreen}>
      <div className={styles.orbContainer}>
        <div className={`${styles.orb} ${styles.orbPurple}`} />
        <div className={`${styles.orb} ${styles.orbSky}`} />
        <div className={`${styles.orb} ${styles.orbRose}`} />
      </div>

      <div className={styles.media}>
        <div className={styles.mediaContent}>
          <div className={styles.mediaBrand}>
            <Logo dark size={28} />
            <span className={styles.mediaBrandName}>UserHub</span>
          </div>

          <h1 className={styles.mediaTitle}>
            Your users,<br />all in one place.
          </h1>

          <p className={styles.mediaSubtitle}>
            Real-time analytics and insights for modern teams.
          </p>

        </div>
      </div>

      <div className={styles.formPanel}>
        <div className={styles.formCard}>
          <div className={styles.formBrand}>
            <Logo size={28} />
            <span className={styles.formBrandName}>UserHub</span>
          </div>

          <div className={styles.formHeader}>
            <h1 className={styles.formTitle}>Welcome back!</h1>
            <p className={styles.formSubtitle}>
              Enter your credentials to access your dashboard
            </p>
          </div>

          <form className={styles.form} onSubmit={onSubmit}>
            <div className={styles.fields}>
              <Input
                type="email"
                label="Email address"
                placeholder="you@company.com"
                size="lg"
                error={errors.email?.message}
                {...register("email")}
              />
              <Input
                type="password"
                label="Password"
                placeholder="••••••••"
                size="lg"
                error={errors.password?.message}
                {...register("password")}
              />
            </div>

{error && <p className={styles.formError}>{error}</p>}

            <Button
              type="submit"
              disabled={isLoading}
              loading={isLoading}
              size="lg"
              className={styles.submitBtn}
            >
              Sign in
            </Button>
          </form>
        </div>
      </div>
    </div>
  )
}

export default LoginPage
