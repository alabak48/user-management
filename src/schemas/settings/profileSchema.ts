import * as z from "zod"

export const profileSchema = z.object({
  name: z.string().min(1, "Name is required"),
  lastName: z.string().min(1, "Last name is required"),
  email: z.email("Invalid email"),
})

export type ProfileForm = z.infer<typeof profileSchema>
