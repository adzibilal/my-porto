import { z } from "zod"

// We're keeping a simple non-relational schema here.
// IRL, you will have a schema for your data models.
export const taskSchema = z.object({
  id: z.string(),
  title: z.string(),
  status: z.string(),
  label: z.string(),
  priority: z.string(),
})

export type Task = z.infer<typeof taskSchema>

export const userSchema = z.object({
  username: z.string(),
  email: z.string(),
  password: z.string(),
  fullname: z.string(),
  phone: z.string(),
  role: z.number(),
  avatar: z.string().optional(),
})

export type User = z.infer<typeof userSchema>
