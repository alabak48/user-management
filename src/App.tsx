import { BrowserRouter, Route, Routes, Navigate } from "react-router-dom"
import { QueryClient, QueryClientProvider } from "@tanstack/react-query"
import { ThemeProvider } from "./context/ThemeContext"
import { ToastProvider } from "./components/shared/Toast"
import LoginPage from "./pages/LoginPage"
import UserManagementPage from "./pages/UserManagementPage"
import PrivateRoute from "./router/PrivateRoute"
import SettingsPage from "./pages/SettingsPage"
import OverviewPage from "./pages/OverviewPage"
import Layout from "./components/layout/Layout"

const queryClient = new QueryClient()

function App() {
  return (
    <ThemeProvider>
    <ToastProvider>
    <QueryClientProvider client={queryClient}>
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<LoginPage />} />
        <Route element={<PrivateRoute><Layout /></PrivateRoute>}>
          <Route path="/overview" element={<OverviewPage />} />
          <Route path="/users" element={<UserManagementPage />} />
          <Route path="/settings" element={<SettingsPage />} />
        </Route>
        <Route path="*" element={<Navigate to="/login" replace />} />
      </Routes>
    </BrowserRouter>
    </QueryClientProvider>
    </ToastProvider>
    </ThemeProvider>
  )
}

export default App
