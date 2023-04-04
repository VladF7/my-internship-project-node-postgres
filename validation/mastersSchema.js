import { z } from 'zod'

export const getFreeMastersSchema = z.object({
  cityId: z
    .string()
    .regex(/^[1-9]\d*$/)
    .transform(Number),
  startTime: z.coerce.date(),
  endTime: z.coerce.date()
})
export const getFreeMastersForCurrentOrder = z.object({
  orderId: z
    .string()
    .regex(/^[1-9]\d*$/)
    .transform(Number),
  cityId: z
    .string()
    .regex(/^[1-9]\d*$/)
    .transform(Number),
  startTime: z.coerce.date(),
  endTime: z.coerce.date()
})
export const getMasterByIdSchema = z.object({
  id: z
    .string()
    .regex(/^[1-9]\d*$/)
    .transform(Number)
})
export const addMasterSchema = z.object({
  name: z.string().max(255).nonempty(),
  rating: z.number().int().positive(),
  cities: z.array(z.number().int().positive())
})
export const editMasterSchema = z.object({
  id: z
    .string()
    .regex(/^[1-9]\d*$/)
    .transform(Number),
  name: z.string().max(255).nonempty(),
  rating: z.number().int().positive(),
  cities: z.array(z.number().int().positive())
})
export const deleteMasterSchema = z.object({
  id: z
    .string()
    .regex(/^[1-9]\d*$/)
    .transform(Number)
})
