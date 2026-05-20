import { useState } from "react"
import { Outlet, useLocation } from "react-router-dom"
import Sidebar from "../Sidebar"
import Navbar from "../Navbar"
import styles from "./Layout.module.css"

const pages: Record<string, string> = {
  "/overview": "Overview",
  "/users": "Users",
  "/statistics": "Statistics"
}

function Layout() {
  const [collapsed, setCollapsed] = useState(false)
  const { pathname } = useLocation()

  return (
    <div className={styles.layout}>
      <Sidebar collapsed={collapsed} onToggle={() => setCollapsed((c) => !c)} />
      <div className={styles.main}>
        <Navbar title={pages[pathname] ?? ""} />
        <main className={styles.content}>
          <Outlet />
        </main>
      </div>
    </div>
  )
}

export default Layout
