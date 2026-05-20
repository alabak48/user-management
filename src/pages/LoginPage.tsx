import { Navigate } from "react-router-dom"
import { useAuthStore } from "../store/authStore"
import Input from "../components/shared/Input"
import Button from "../components/shared/Button"
import useLogin from "../hooks/auth/useLogin"

function LoginPage() {
  const isAuthenticated = useAuthStore((state) => state.isAuthenticated)
  const { form, onSubmit, isLoading, error } = useLogin()
  const { register, formState: { errors } } = form

  if (isAuthenticated) {
    return <Navigate to="/overview" />
  }

  return (
    <div>
      <h2>Login</h2>
      <form onSubmit={onSubmit}>
        <Input
          type="email"
          label="Email"
          error={errors.email?.message}
          {...register("email")}
        />
        <Input
          type="password"
          label="Password"
          error={errors.password?.message}
          {...register("password")}
        />
        {error && <p>{error}</p>}
        <Button type="submit" disabled={isLoading}>
          {isLoading ? "Loading..." : "Login"}
        </Button>
      </form>
    </div>
  )
}

export default LoginPage
