import { z } from 'zod'

export const loginSchema = z.object({
  email: z.string().email().nonempty(),
  password: z
    .string()
    .min(3, { message: 'Must be 3 or more characters long' })
    .max(16, { message: 'Must be 16 or fewer characters long' })
    .nonempty()
})

export const authSchema = z.object({
  email: z.string().email().nonempty()
})
