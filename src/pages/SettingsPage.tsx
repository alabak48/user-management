import { useState } from "react"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import Input from "../components/shared/Input"
import Button from "../components/shared/Button"
import { profileSchema, type ProfileForm } from "../schemas/settings/profileSchema"

const DEFAULT_VALUES: ProfileForm = {
  name: "Admin",
  lastName: "Admin",
  email: "admin@admin.com",
  password: "admin123",
}

function SettingsPage() {
  const [saved, setSaved] = useState(false)

  const { register, handleSubmit, formState: { errors } } = useForm<ProfileForm>({
    resolver: zodResolver(profileSchema),
    defaultValues: DEFAULT_VALUES,
  })

  function onSubmit(_data: ProfileForm) {
    setSaved(true)
  }

  return (
    <div>
      <form onSubmit={handleSubmit(onSubmit)}>
        <Input label="Name" {...register("name")} error={errors.name?.message} />
        <Input label="Last Name" {...register("lastName")} error={errors.lastName?.message} />
        <Input label="Email" {...register("email")} error={errors.email?.message} />
        <Input label="Password" type="password" {...register("password")} error={errors.password?.message} />
        <Button type="submit" label="Submit" />
      </form>
      {saved && <p>Settings saved.</p>}
    </div>
  )
}

export default SettingsPage
