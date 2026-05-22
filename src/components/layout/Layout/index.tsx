import { useState } from "react"
import { Outlet, useLocation } from "react-router-dom"
import { LuChevronLeft } from "react-icons/lu"
import Sidebar from "../Sidebar"
import Navbar from "../Navbar"
import Button from "../../shared/Button"
import Icon from "../../shared/Icon"
import styles from "./Layout.module.css"

const pages: Record<string, string> = {
  "/overview": "Overview",
  "/users": "Users",
  "/settings": "Settings",
  "/statistics": "Statistics"
}

function Layout() {
  const [collapsed, setCollapsed] = useState(false)
  const [mobileOpen, setMobileOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const { pathname } = useLocation()

  return (
    <div className={styles.layout}>
      {mobileOpen && (
        <div
          className={styles.backdrop}
          onClick={() => setMobileOpen(false)}
          aria-hidden="true"
        />
      )}
      <div className={styles.sidebarWrapper}>
        <Sidebar
          collapsed={collapsed}
          mobileOpen={mobileOpen}
          onMobileClose={() => setMobileOpen(false)}
        />
        <Button
          variant="custom"
          className={styles.sidebarToggle}
          onClick={() => setCollapsed((c) => !c)}
          aria-label={collapsed ? "Expand sidebar" : "Collapse sidebar"}
          startIcon={
            <Icon
              icon={LuChevronLeft}
              size={14}
              className={`${styles.sidebarToggleIcon}${collapsed ? ` ${styles.sidebarToggleIconCollapsed}` : ""}`}
            />
          }
        />
      </div>
      <div
        className={styles.main}
        onScroll={(e) => setScrolled(e.currentTarget.scrollTop > 0)}
      >
        <Navbar
          title={pages[pathname] ?? ""}
          onMobileMenuOpen={() => setMobileOpen(true)}
          scrolled={scrolled}
        />
        <main className={styles.content}>
          <Outlet />
        </main>
      </div>
    </div>
  )
}

export default Layout
