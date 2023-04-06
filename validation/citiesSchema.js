import { z } from 'zod'

export const addCitySchema = z.object({
  name: z.string().max(255).nonempty(),
  priceForHour: z.number().int().positive()
})

export const deleteCitySchema = z.object({
  id: z
    .string()
    .regex(/^[1-9]\d*$/)
    .transform(Number)
})
export const getCityByIdSchema = z.object({
  id: z
    .string()
    .regex(/^[1-9]\d*$/)
    .transform(Number)
})
export const editCitySchema = z.object({
  id: z
    .string()
    .regex(/^[1-9]\d*$/)
    .transform(Number),
  name: z.string().max(255).nonempty(),
  priceForHour: z.number().int().positive()
})
