import { useEffect, useState } from "react"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import Input from "../../components/shared/Input"
import Button from "../../components/shared/Button"
import Pill from "../../components/shared/Pill"
import { useTheme } from "../../context/ThemeContext"
import { profileSchema, type ProfileForm } from "../../schemas/settings/profileSchema"
import { securitySchema, type SecurityForm } from "../../schemas/settings/securitySchema"
import { dummySubmit } from "../../api/axiosInstance"
import styles from "./SettingsPage.module.css"

const TABS = [
  { id: "profile", label: "Profile" },
  { id: "security", label: "Security" },
  { id: "appearance", label: "Appearance" },
]

function SettingsPage() {
  const [activeTab, setActiveTab] = useState("profile")
  const [profileSaved, setProfileSaved] = useState(false)
  const [securitySaved, setSecuritySaved] = useState(false)
  const { theme, toggleTheme } = useTheme()

  useEffect(() => {
    if (!profileSaved) return
    const t = setTimeout(() => setProfileSaved(false), 3000)
    return () => clearTimeout(t)
  }, [profileSaved])

  useEffect(() => {
    if (!securitySaved) return
    const t = setTimeout(() => setSecuritySaved(false), 3000)
    return () => clearTimeout(t)
  }, [securitySaved])


const profileForm = useForm<ProfileForm>({
    resolver: zodResolver(profileSchema),
    defaultValues: { name: "Admin", lastName: "Admin", email: "admin@admin.com" },
  })

  const securityForm = useForm<SecurityForm>({
    resolver: zodResolver(securitySchema),
    defaultValues: { currentPassword: "", newPassword: "", confirmPassword: "" },
  })

  async function onProfileSubmit(data: ProfileForm) {
    await dummySubmit({ name: data.name, lastName: data.lastName, email: data.email })
    setProfileSaved(true)
  }

  async function onSecuritySubmit(data: SecurityForm) {
    await dummySubmit({ currentPassword: data.currentPassword, newPassword: data.newPassword, confirmPassword: data.confirmPassword })
    setSecuritySaved(true)
    securityForm.reset()
  }

  return (
    <div className={`stack ${styles.contentAnimated}`}>
      <Pill items={TABS} active={activeTab} onChange={setActiveTab} />

      {activeTab === "profile" && (
        <form className={styles.panel} onSubmit={profileForm.handleSubmit(onProfileSubmit)}>
          <Input
            label="Name"
            {...profileForm.register("name")}
            error={profileForm.formState.errors.name?.message}
          />
          <Input
            label="Last Name"
            {...profileForm.register("lastName")}
            error={profileForm.formState.errors.lastName?.message}
          />
          <Input
            label="Email"
            {...profileForm.register("email")}
            error={profileForm.formState.errors.email?.message}
          />
          <div className={styles.panelActions}>
            <Button type="submit">Save Profile</Button>
            {profileSaved && <span className={styles.savedMsg}>Profile saved.</span>}
          </div>
        </form>
      )}

      {activeTab === "security" && (
        <form className={styles.panel} onSubmit={securityForm.handleSubmit(onSecuritySubmit)}>
          <Input
            label="Current Password"
            type="password"
            {...securityForm.register("currentPassword")}
            error={securityForm.formState.errors.currentPassword?.message}
          />
          <Input
            label="New Password"
            type="password"
            {...securityForm.register("newPassword")}
            error={securityForm.formState.errors.newPassword?.message}
          />
          <Input
            label="Confirm Password"
            type="password"
            {...securityForm.register("confirmPassword")}
            error={securityForm.formState.errors.confirmPassword?.message}
          />
          <div className={styles.panelActions}>
            <Button type="submit">Update Password</Button>
            {securitySaved && <span className={styles.savedMsg}>Password updated.</span>}
          </div>
        </form>
      )}

      {activeTab === "appearance" && (
        <div className={styles.panel}>
          <div className={styles.themeGrid}>
            <button
              type="button"
              aria-pressed={theme === "light"}
              className={[styles.themeCard, theme === "light" ? styles.themeCardActive : ""].filter(Boolean).join(" ")}
              onClick={() => theme === "dark" && toggleTheme()}
            >
              <div className={[styles.themePreview, styles.themePreviewLight].join(" ")}>
                <div className={[styles.themePreviewSidebar, styles.themePreviewSidebarLight].join(" ")} />
                <div className={styles.themePreviewContent}>
                  <div className={[styles.themePreviewBar, styles.themePreviewBarLight].join(" ")} />
                  <div className={[styles.themePreviewBar, styles.themePreviewBarLight, styles.themePreviewBarShort].join(" ")} />
                </div>
              </div>
              <span className={styles.themeCardLabel}>Light</span>
              {theme === "light" && <span className={styles.themeCardBadge}>Active</span>}
            </button>

            <button
              type="button"
              aria-pressed={theme === "dark"}
              className={[styles.themeCard, theme === "dark" ? styles.themeCardActive : ""].filter(Boolean).join(" ")}
              onClick={() => theme === "light" && toggleTheme()}
            >
              <div className={[styles.themePreview, styles.themePreviewDark].join(" ")}>
                <div className={[styles.themePreviewSidebar, styles.themePreviewSidebarDark].join(" ")} />
                <div className={styles.themePreviewContent}>
                  <div className={[styles.themePreviewBar, styles.themePreviewBarDark].join(" ")} />
                  <div className={[styles.themePreviewBar, styles.themePreviewBarDark, styles.themePreviewBarShort].join(" ")} />
                </div>
              </div>
              <span className={styles.themeCardLabel}>Dark</span>
              {theme === "dark" && <span className={styles.themeCardBadge}>Active</span>}
            </button>
          </div>
        </div>
      )}
    </div>
  )
}

export default SettingsPage
