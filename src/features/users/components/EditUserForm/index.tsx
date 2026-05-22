import { useRef, useState } from "react"
import { useForm, Controller } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { LuCamera } from "react-icons/lu"
import Button from "../../../../components/shared/Button"
import Input from "../../../../components/shared/Input"
import { editUserSchema, type EditUserData } from "../../../../schemas/users/editUserSchema"
import styles from "./EditUserForm.module.css"

interface EditUserFormProps {
  defaultValues: EditUserData
  picture: string
  onSave: (data: EditUserData, pictureUrl: string) => void
  onCancel: () => void
}

function EditUserForm({ defaultValues, picture, onSave, onCancel }: EditUserFormProps) {
  const { register, handleSubmit, control, watch, formState: { errors } } = useForm<EditUserData>({
    resolver: zodResolver(editUserSchema),
    defaultValues,
  })

  const [previewUrl, setPreviewUrl] = useState(picture)
  const fileInputRef = useRef<HTMLInputElement>(null)
  const isActive = watch("active")

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) setPreviewUrl(URL.createObjectURL(file))
  }

  return (
    <form className={styles.form} onSubmit={handleSubmit((data) => onSave(data, previewUrl))} noValidate>
      <div className={styles.avatar}>
        <div className={styles.avatarWrapper} onClick={() => fileInputRef.current?.click()}>
          <img src={previewUrl} alt="User avatar" className={styles.avatarImg} />
          <div className={styles.avatarOverlay}>
            <LuCamera className={styles.avatarOverlayIcon} size={22} />
          </div>
        </div>
        <input
          ref={fileInputRef}
          type="file"
          accept="image/*"
          className={styles.fileInput}
          onChange={handleFileChange}
        />
      </div>

      <Input
        label="First Name"
        error={errors.firstName?.message}
        {...register("firstName")}
      />
      <Input
        label="Last Name"
        error={errors.lastName?.message}
        {...register("lastName")}
      />
      <Input
        label="Email"
        type="email"
        error={errors.email?.message}
        {...register("email")}
      />

      <div className={styles.statusRow}>
        <span className={styles.statusLabel}>Status</span>
        <Controller
          name="active"
          control={control}
          render={({ field }) => (
            <label className={styles.toggle} aria-label="Toggle active status">
              <input
                type="checkbox"
                className={styles.toggleInput}
                checked={field.value}
                onChange={field.onChange}
              />
              <span className={`${styles.toggleTrack} ${field.value ? styles.toggleTrackOn : ""}`}>
                <span className={styles.toggleThumb} />
              </span>
              <span className={`${styles.toggleText} ${isActive ? styles.toggleTextOn : styles.toggleTextOff}`}>
                {isActive ? "Active" : "Inactive"}
              </span>
            </label>
          )}
        />
      </div>

      <div className={styles.actions}>
        <Button type="submit">Save</Button>
        <Button type="button" variant="secondary" onClick={onCancel}>Cancel</Button>
      </div>
    </form>
  )
}

export default EditUserForm
