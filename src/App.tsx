import { BrowserRouter, Route, Routes, Navigate } from "react-router-dom"
import { QueryClient, QueryClientProvider } from "@tanstack/react-query"
import LoginPage from "./pages/LoginPage"
import UserManagementPage from "./pages/UserManagementPage"
import PrivateRoute from "./router/PrivateRoute"
import SettingsPage from "./pages/SettingsPage"
import OverviewPage from "./pages/OverviewPage"
import Layout from "./components/layout/Layout"

const queryClient = new QueryClient()

function App() {
  return (
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
  )
}

export default App
