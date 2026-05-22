import { NavLink } from "react-router-dom"
import { LuLayoutGrid, LuUsers, LuLogOut, LuSettings, LuChevronLeft } from "react-icons/lu"
import styles from "./Sidebar.module.css"
import Button from "../../shared/Button"
import Icon from "../../shared/Icon"
import Logo from "../../shared/Logo"
import { useAuthStore } from "../../../store/authStore"
import { useUIStore } from "../../../store/uiStore"


interface NavItem {
  to: string
  label: string
  icon: React.ReactNode
}

const navItems: NavItem[] = [
  {
    to: "/overview",
    label: "Overview",
    icon: <Icon icon={LuLayoutGrid} />,
  },
  {
    to: "/users",
    label: "Users",
    icon: <Icon icon={LuUsers} />,
  },
  {
    to: "/settings",
    label: "Settings",
    icon: <Icon icon={LuSettings} />,
  },
]

interface SidebarProps {
  collapsed: boolean
  mobileOpen?: boolean
  onMobileClose?: () => void
}

function getDisplayName(email: string) {
  const username = email.split("@")[0]
  const parts = username.split(/[._-]/)
  const capitalize = (s: string) => s.charAt(0).toUpperCase() + s.slice(1).toLowerCase()
  const firstName = capitalize(parts[0])
  const lastName = parts.length >= 2 ? capitalize(parts[1]) : ""
  const initials = firstName.charAt(0) + (lastName ? lastName.charAt(0) : "")
  return { firstName, lastName, initials }
}

function Sidebar({ collapsed, mobileOpen, onMobileClose }: SidebarProps) {
  const logout = useAuthStore((state) => state.logout)
  const user = useAuthStore((state) => state.user)
  const setIsSidebarTransitioning = useUIStore((state) => state.setIsSidebarTransitioning)

  const { firstName, lastName, initials } = user
    ? getDisplayName(user.email)
    : { firstName: "Admin", lastName: "", initials: "A" }

  return (
    <aside
      className={`${styles.sidebar}${collapsed ? ` ${styles.collapsed}` : ""}${mobileOpen ? ` ${styles.mobileOpen}` : ""}`}
      aria-label="Main navigation"
      onTransitionStart={(e) => {
        if (e.target === e.currentTarget && e.propertyName === "width") {
          setIsSidebarTransitioning(true)
        }
      }}
    >
      <div className={styles.brand}>
        <span className={styles.brandIcon}>
          <Logo size={32} />
        </span>
        <span className={styles.brandName}>UserHub</span>
        <Button
          variant="custom"
          className={styles.closeBtn}
          onClick={onMobileClose}
          aria-label="Close navigation menu"
          startIcon={LuChevronLeft}
          iconSize={18}
        />
      </div>

      <nav className={styles.nav}>
        <ul className={styles.navList}>
          {navItems.map((item) => (
            <li key={item.to}>
              <NavLink
                to={item.to}
                className={({ isActive }) =>
                  `${styles.navLink}${isActive ? ` ${styles.navLinkActive}` : ""}`
                }
                title={collapsed ? item.label : undefined}
                onClick={onMobileClose}
              >
                <span className={styles.navIcon}>{item.icon}</span>
                <span className={styles.navLabel}>{item.label}</span>
              </NavLink>
            </li>
          ))}
        </ul>
      </nav>

      <div className={styles.footer}>
        <div className={styles.user}>
          <div className={styles.userAvatarWrapper}>
            <div className={styles.userAvatar}>{initials}</div>
            <span className={styles.userStatus} aria-label="Active" />
          </div>
          <div className={styles.userInfo}>
            <span className={styles.userName}>{firstName}{lastName ? ` ${lastName}` : ""}</span>
            <span className={styles.userEmail}>{user?.email}</span>
          </div>
        </div>
        <Button
          variant="custom"
          className={styles.logout}
          onClick={logout}
          title={collapsed ? "Logout" : undefined}
          startIcon={<span className={styles.navIcon}><Icon icon={LuLogOut} /></span>}
        >
          <span className={styles.logoutLabel}>Logout</span>
        </Button>
      </div>
    </aside>
  )
}

export default Sidebar
