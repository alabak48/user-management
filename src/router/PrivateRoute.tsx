import { Navigate } from "react-router-dom"
import { useAuthStore } from "../store/authStore"

function PrivateRoute({ children }: { children: React.ReactNode }) {
  const token = useAuthStore((state) => state.token)

  if (!token) {
    return <Navigate to="/login" />
  }

  return children
}

export default PrivateRoute
