import { z } from 'zod'

export const addCitySchema = z.object({
  name: z.string().max(255).nonempty()
})

export const delCitySchema = z.object({
  id: z
    .string()
    .regex(/^[1-9]\d*$/)
    .transform(Number)
})
