import * as z from "zod"

export const editUserSchema = z.object({
  firstName: z.string().min(1, "First name is required"),
  lastName:  z.string().min(1, "Last name is required"),
  email:     z.email("Invalid email address"),
  active:    z.boolean(),
})

export type EditUserData = z.infer<typeof editUserSchema>
