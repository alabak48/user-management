import { create } from "zustand"
import { persist } from "zustand/middleware"

interface User {
  id: number
  email: string
}

interface AuthState {
  isAuthenticated: boolean
  token: string | null
  user: User | null
  login: (token: string) => void
  logout: () => void
}

export const decodeToken = (token: string): User | null => {
  try {
    const payload = JSON.parse(atob(token.split(".")[1]))
    return { id: payload.id, email: payload.email }
  } catch {
    return null
  }
}

const tokenStorage = {
  getItem: (name: string) => {
    const token = localStorage.getItem(name)
    return token ? { state: { token }, version: 0 } : null
  },
  setItem: (name: string, value: { state: { token: string | null } }) => {
    if (value.state.token) {
      localStorage.setItem(name, value.state.token)
    } else {
      localStorage.removeItem(name)
    }
  },
  removeItem: (name: string) => localStorage.removeItem(name),
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      isAuthenticated: false,
      token: null,
      user: null,
      login: (token: string) => {
        const user = decodeToken(token)
        set({ isAuthenticated: true, token, user })
      },
      logout: () => set({ isAuthenticated: false, token: null, user: null }),
    }),
    {
      name: "token",
      storage: tokenStorage,
      partialize: (state) => ({ token: state.token }),
      onRehydrateStorage: () => (state) => {
        if (state?.token) {
          const user = decodeToken(state.token)
          state.isAuthenticated = !!user
          state.user = user
        }
      },
    }
  )
)
