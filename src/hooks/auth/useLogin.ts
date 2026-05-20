import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { useState } from "react"
import { useNavigate } from "react-router-dom"
import { useAuthStore } from "../../store/authStore"
import { loginApi } from "../../api/authApi"
import { loginSchema, type LoginForm } from "../../schemas/auth/loginSchema"

function useLogin() {
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const login = useAuthStore((state) => state.login)
  const navigate = useNavigate()

  const form = useForm<LoginForm>({
    resolver: zodResolver(loginSchema),
  })

  const onSubmit = form.handleSubmit(async (data) => {
    try {
      setIsLoading(true)
      setError(null)
      const response = await loginApi(data)
      login(response.token)
      navigate("/overview")
    } catch {
      setError("Invalid credentials")
    } finally {
      setIsLoading(false)
    }
  })

  return { form, onSubmit, isLoading, error }
}

export default useLogin
