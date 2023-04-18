import { z } from 'zod'

export const loginSchema = z.object({
  email: z.string().email().nonempty(),
  password: z
    .string()
    .min(3, { message: 'Must be 3 or more characters long' })
    .max(16, { message: 'Must be 16 or fewer characters long' })
    .nonempty()
})
export const masterRegistrationSchema = z.object({
  name: z.string(255).nonempty(),
  email: z.string().email().nonempty(),
  password: z
    .string()
    .min(3, { message: 'Must be 3 or more characters long' })
    .max(16, { message: 'Must be 16 or fewer characters long' })
    .nonempty(),
  cities: z.array(z.number().int().positive())
})
export const customerRegistrationSchema = z.object({
  name: z.string(255).nonempty(),
  email: z.string().email().nonempty(),
  password: z
    .string()
    .min(3, { message: 'Must be 3 or more characters long' })
    .max(16, { message: 'Must be 16 or fewer characters long' })
    .nonempty()
})
export const authSchema = z.object({
  id: z.number().int().positive(),
  email: z.string().email().nonempty(),
  role: z.string(255).nonempty().optional(),
  isEmailActivated: z.boolean()
})
export const activateSchema = z.object({
  activationLink: z.string(255).nonempty()
})
